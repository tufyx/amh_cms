import React from 'react'

import {SeasonService} from "../../services/SeasonService.js"

import {SectionHeader} from '../general/section_header.js'
import {SeasonAddEditForm} from "./form.js"
import {SeasonList} from "./list.js"

export var SeasonBox = React.createClass({
  	getInitialState: function() {
    	return {
    		data: [],
    		nextPage: null,
    		selectedItem: null
    	};
  	},
  	
  	componentDidMount: function() {
  		addEventListener("EXPAND_FORM", this.expandForm);
  		addEventListener("ITEM_CLICK", this.didClickItem);
  		addEventListener("ADD_SEASON", this.addSeasonListener);
    	addEventListener("EDIT_SEASON", this.editSeasonListener);
    	addEventListener("DELETE_SEASON", this.deleteSeasonListener);
  		window.addEventListener("scroll", this.handleScroll);
  		
    	this.seasonService = new SeasonService("http://127.0.0.1:8000/api");
    	this.seasonService.getSeasonList(
    		this.getSeasonsCompletionHandler, 
    		this.getSeasonsErrorHandler, 
    		this.state.nextPage
    	);
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
  	
  	getSeasonsCompletionHandler: function(result) {
  		this.setState(
  			{
  				data: this.state.data.concat(result.data.results), 
  				nextPage: result.data.next
  			}
  		);
  	},
  	
  	getSeasonsErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	addSeasonListener: function(e) {
		this.seasonService.createSeason(
			e.detail, 
			this.createUpdateSeasonCompletionHandler, 
			this.createUpdateSeasonErrorHandler
		);	
	},
	
	editSeasonListener: function(e) {
		this.seasonService.editSeason(
			e.detail, 
			this.createUpdateSeasonCompletionHandler,
			this.createUpdateSeasonErrorHandler
		);
	},
	
	deleteSeasonListener: function(e) {
		this.seasonService.deleteSeason(
			e.detail, 
			this.deleteSeasonCompletionHandler, 
			this.deleteSeasonErrorHandler
		);
	},
  	
  	createUpdateSeasonCompletionHandler: function(result) {
  		console.log("data successfully added");
  	},
  	
  	createUpdateSeasonErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	deleteSeasonCompletionHandler: function(result) {
  		console.log("season successfully deleted");
  	},
  	
  	deleteSeasonErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	handleScroll: function(event) {
  		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  			if (this.state.nextPage) {
  				this.seasonService.getSeasonList(
  					this.getSeasonsCompletionHandler, 
  					this.getSeasonsErrorHandler, 
  					this.state.nextPage
  				);	
  			}
    	}
  	},
  	
	render: function() {
		return (
      		<div>
        		<SectionHeader name="Seasons"/>
        		<SeasonAddEditForm 
        			completionHandler={this.collapse} 
        			selectedItem={this.state.selectedItem}
        		/>
        		<SeasonList data={this.state.data}/>
      		</div>
    	);
  }
});