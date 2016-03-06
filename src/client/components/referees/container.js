import React from 'react'

import {RefereeService} from "../../services/RefereeService.js"

import {SectionHeader} from '../general/section_header.js'
import {RefereeAddEditForm} from "./form.js"
import {RefereeList} from "./list.js"

export var RefereeBox = React.createClass({
  	getInitialState: function() {
    	return {
    		data: [],
    		nextPage: null
    	};
  	},
  
  	componentDidMount: function() {
  		addEventListener("EXPAND_FORM", this.expandForm);
    	addEventListener("ITEM_CLICK", this.didClickItem);
    	addEventListener("ADD_REFEREE", this.addRefereeListener);
    	addEventListener("EDIT_REFEREE", this.editRefereeListener);
    	addEventListener("DELETE_REFEREE", this.deleteRefereeListener);
    	window.addEventListener("scroll", this.handleScroll);
    	
    	this.refereeService = new RefereeService("http://127.0.0.1:8000/api");
    	this.refereeService.getRefereeList(
    		this.getRefereesCompletionHandler, 
    		this.getRefereesErrorHandler, 
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
  	
  	getRefereesCompletionHandler: function(result) {
  		this.setState(
  			{
  				data: this.state.data.concat(result.data.results), 
  				nextPage: result.data.next
  			}
  		);
  	},
  	
  	getRefereesErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	addRefereeListener: function(e) {
		this.refereeService.createReferee(
			e.detail,
			this.createUpdateRefereeCompletionHandler, 
			this.createUpdateRefereeErrorHandler
		);
	},
	
	editRefereeListener: function(e) {
		this.refereeService.updateReferee(
			e.detail, 
			this.createUpdateRefereeCompletionHandler, 
			this.createUpdateRefereeErrorHandler
		);
	},
	
	deleteRefereeListener: function(e) {
		this.clubService.deleteClub(
			e.detail, 
			this.deleteRefereeCompletionHandler, 
			this.deleteRefereeErrorHandler
		);
	},
  	
  	createUpdateRefereeCompletionHandler: function(result) {
  		console.log("data successfully added");
  	},
  	
  	createUpdateRefereeErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	deleteRefereeCompletionHandler: function(result) {
  		console.log("club successfully deleted");
  	},
  	
  	deleteRefereeErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	handleScroll: function(event) {
  		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  			if (this.state.nextPage) {
  				this.refereeService.getRefereeList(
  					this.getRefereesCompletionHandler, 
  					this.getRefereesErrorHandler, 
  					this.state.nextPage
  				);
  			}
    	}
  	},
  	
	render: function() {
		return (
      		<div>
        		<SectionHeader name="Referees"/>
        		<RefereeAddEditForm 
        			completionHandler={this.collapse} 
        			selectedItem={this.state.selectedItem}
        		/>
        		<RefereeList data={this.state.data}/>
      		</div>
    	);
  }
});