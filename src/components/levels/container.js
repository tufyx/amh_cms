import React from 'react'

import {LevelService} from "../../services/LevelService.js"

import {SectionHeader} from '../general/section_header.js'
import {LevelAddEditForm} from "./form.js"
import {LevelList} from "./list.js"

export var LevelBox = React.createClass({
  	getInitialState: function() {
    	return {
    		data: [],
    		nextPage: null
    	};
  	},
  
  	componentDidMount: function() {
  		addEventListener("EXPAND_FORM", this.expandForm);
  		addEventListener("ITEM_CLICK", this.didClickItem);
    	addEventListener("ADD_LEVEL", this.addLevelListener);
    	addEventListener("EDIT_LEVEL", this.editLevelListener);
    	addEventListener("DELETE_LEVEL", this.deleteLevelListener);
    	
    	this.levelService = new LevelService("http://127.0.0.1:8000/api");
    	this.levelService.getLevelList(
    		this.getLevelsCompletionHandler, 
    		this.getLevelsErrorHandler, 
    		this.state.nextPage
    	);
    	window.addEventListener("scroll", this.handleScroll);
  	},

	expandForm: function() {
		this.addEdit(null);
	},
  	
  	didClickItem: function(e) {
		this.addEdit(e.detail);
	},
	
	addEdit: function(item) {
		this.setState({
			selectedItem: item
		});
		$('#addEditForm').animate({height:"show"},200);
	},
	
	collapse: function() {
		$('#addEditForm').animate({height:"hide"},200);
	},
  	
  	getLevelsCompletionHandler: function(result) {
  		this.setState(
  			{
  				data: this.state.data.concat(result.data.results), 
  				nextPage: result.data.next
  			}
  		);
  	},
  	
  	getLevelsErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	addLevelListener: function(e) {
		this.levelService.createLevel(
			e.detail, 
			this.createUpdateLevelCompletionHandler, 
			this.createUpdateLevelErrorHandler
		);	
	},
	
	editLevelListener: function(e) {
		this.levelService.editLevel(
			e.detail, 
			this.createUpdateLevelCompletionHandler, 
			this.createUpdateLevelErrorHandler
		);
	},
	
	deleteLevelListener: function(e) {
		this.levelService.deleteLevel(
			e.detail, 
			this.deleteLevelCompletionHandler, 
			this.deleteLevelErrorHandler
		);
	},
  	
  	createUpdateLevelCompletionHandler: function(result) {
  		console.log("data successfully added");
  	},
  	
  	createUpdateLevelErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	deleteLevelCompletionHandler: function(result) {
  		console.log("level successfully deleted");
  	},
  	
  	deleteLevelErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	handleScroll: function(event) {
  		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  			if (this.state.nextPage) {
  				this.levelService.getLevelList(
  					this.getLevelsCompletionHandler, 
  					this.getLevelsErrorHandler, 
  					this.state.nextPage
  				);	
  			}
    	}
  	},
  	
	render: function() {
		return (
      		<div>
        		<SectionHeader name="Levels"/>
        		<LevelAddEditForm 
        			completionHandler={this.collapse} 
        			selectedItem={this.state.selectedItem}
        		/>
        		<LevelList 
        			data={this.state.data}
        		/>
      		</div>
    	);
  }
});