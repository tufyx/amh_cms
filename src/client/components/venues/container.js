import React from 'react'

import {VenueService} from "../../services/VenueService.js"

import {SectionHeader} from '../general/section_header.js' 
import {VenueAddEditForm} from "./form.js"
import {VenueList} from "./list.js"

export var VenueBox = React.createClass({
  	getInitialState: function() {
    	return {
    		data: [],
    		nextPage: null
    	};
  	},
  
  	componentDidMount: function() {
  		addEventListener("EXPAND_FORM", this.expandForm);
    	addEventListener("ITEM_CLICK", this.didClickItem);
    	addEventListener("ADD_VENUE", this.addVenueListener);
    	addEventListener("EDIT_VENUE", this.editVenueListener);
    	addEventListener("DELETE_VENUE", this.deleteVenueListener);
    	window.addEventListener("scroll", this.handleScroll);
    	
    	this.venueService = new VenueService("http://127.0.0.1:8000/api");
    	
    	this.venueService.getVenueList(
    		this.getVenuesCompletionHandler, 
    		this.getVenuesErrorHandler, 
    		this.state.nextPage
    	);
  	},
  	
  	addEdit: function(item) {
		this.setState({
			selectedItem: item
		});
		$('#addEditForm').animate({height:"show"},200);
	},
	
	expandForm: function() {
		this.addEdit(null);
	},
	
	didClickItem: function(e) {
		this.addEdit(e.detail);
	},
	
	collapse: function() {
		$('#addEditForm').animate({height:"hide"},200);
	},
  	
  	getVenuesCompletionHandler: function(result) {
  		this.setState(
  			{
  				data: this.state.data.concat(result.data.results), 
  				nextPage: result.data.next
  			}
  		);
  	},
  	
  	getVenuesErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	addVenueListener: function(e) {
		this.venueService.createVenue(
			e.detail, 
			this.createUpdateVenueCompletionHandler, 
			this.createUpdateVenueErrorHandler
		);
	},
	
	editVenueListener: function(e) {
		this.venueService.editVenue(
			e.detail, 
			this.createUpdateVenueCompletionHandler, 
			this.createUpdateVenueErrorHandler
		);
	},
	
	deleteVenueListener: function(e) {
		this.venueService.deleteVenue(
			e.detail, 
			this.deleteVenueCompletionHandler, 
			this.deleteVenueErrorHandler
		);
	},
  	
  	createUpdateVenueCompletionHandler: function(result) {
  		console.log("data successfully added");
  	},
  	
  	createUpdateVenueErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	deleteVenueCompletionHandler: function(result) {
  		console.log("venue successfully deleted");
  	},
  	
  	deleteVenueErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	handleScroll: function(event) {
  		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  			if (this.state.nextPage) {
  				this.venueService.getVenueList(
  					this.getVenuesCompletionHandler, 
  					this.getVenuesErrorHandler, 
  					this.state.nextPage
  				);	
  			}
    	}
  	},
  	
	render: function() {
		return (
      		<div>
      			<SectionHeader name="Venues"/>
        		<VenueAddEditForm 
        			completionHandler={this.collapse} 
        			selectedItem={this.state.selectedItem}
        		/>
        		<VenueList data={this.state.data}/>
      		</div>
    	);
  }
});