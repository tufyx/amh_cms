import React from 'react'

import {ClubService} from "../../services/ClubService.js"

import {SectionHeader} from '../general/section_header.js'
import {ClubAddEditForm} from "./form.js"
import {ClubList} from "./list.js"

export var ClubBox = React.createClass({
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
  		addEventListener("ADD_CLUB", this.addClubListener);
    	addEventListener("EDIT_CLUB", this.editClubListener);
    	addEventListener("DELETE_CLUB", this.deleteClubListener);
  		
    	this.clubService = new ClubService("http://127.0.0.1:8000/api");
    	this.clubService.getClubList(
    		this.getClubsCompletionHandler, 
    		this.getClubsErrorHandler, 
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
  	
  	getClubsCompletionHandler: function(result) {
  		this.setState(
  			{
  				data: this.state.data.concat(result.data.results), 
  				nextPage: result.data.next
  			}
  		);
  	},
  	
  	getClubsErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	addClubListener: function(e) {
		this.clubService.createClub(
			e.detail, 
			this.createUpdateClubCompletionHandler, 
			this.createUpdateClubErrorHandler
		);	
	},
	
	editClubListener: function(e) {
		this.clubService.editClub(
			e.detail, 
			this.createUpdateClubCompletionHandler, 
			this.createUpdateClubErrorHandler
		);
	},
	
	deleteClubListener: function(e) {
		this.clubService.deleteClub(
			e.detail, 
			this.deleteClubCompletionHandler, 
			this.deleteClubErrorHandler
		);
	},
  	
  	createUpdateClubCompletionHandler: function(result) {
  		console.log("data successfully added");
  	},
  	
  	createUpdateClubErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	deleteClubCompletionHandler: function(result) {
  		console.log("club successfully deleted");
  	},
  	
  	deleteClubErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	handleScroll: function(event) {
  		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  			if (this.state.nextPage) {
  				this.clubService.getClubList(
  					this.getClubsCompletionHandler, 
  					this.getClubsErrorHandler, 
  					this.state.nextPage
  				);	
  			}
    	}
  	},
  	
	render: function() {
		return (
      		<div>
        		<SectionHeader name="Clubs"/>
        		<ClubAddEditForm 
        			completionHandler={this.collapse} 
        			selectedItem={this.state.selectedItem}
        		/>
        		<ClubList data={this.state.data}/>
      		</div>
    	);
  }
});