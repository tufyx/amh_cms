import React from 'react'

import {TeamService} from "../../services/TeamService.js"
import {ClubService} from "../../services/ClubService.js"

import {SectionHeader} from '../general/section_header.js'
import {TeamAddEditForm} from "./form.js"
import {TeamList} from "./list.js"


export var TeamBox = React.createClass({
  	getInitialState: function() {
    	return {
    		nextPage: null,
    		selectedItem: null,
    		data: [],
			clubs: []
    	};
  	},
  
  	componentDidMount: function() {
  		addEventListener("EXPAND_FORM", this.expandForm);
    	addEventListener("ITEM_CLICK", this.didClickItem);
  		addEventListener("ADD_TEAM", this.addTeamListener);
    	addEventListener("EDIT_TEAM", this.editTeamListener);
    	addEventListener("DELETE_TEAM", this.deleteTeamListener);
    	window.addEventListener("scroll", this.handleScroll);
    	
    	this.teamService = new TeamService("http://127.0.0.1:8000/api");
    	this.clubService = new ClubService("http://127.0.0.1:8000/api");
    	
    	this.teamService.getTeamList(
    		this.getTeamsCompletionHandler, 
    		this.getTeamsErrorHandler, 
    		this.state.nextPage
    	);
  	},
  	
  	expandForm: function() {
		this.addEdit(null);
		this.clubService.getAllClubs(
			this.getClubsCompletionHandler, 
			this.getClubsErrorHandler
		);
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
		this.setState({clubs: result.data});
	},
	
	getClubsErrorHandler: function(error) {
		console.error(error.toString());
	},
  	
  	getTeamsCompletionHandler: function(result) {
  		this.setState(
  			{
  				data: this.state.data.concat(result.data.results), 
  				nextPage: result.data.next
  			}
  		);
  	},
  	
  	getTeamsErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	addTeamListener: function(e) {
		this.teamService.createTeam(
			e.detail, 
			this.createUpdateTeamCompletionHandler, 
			this.createUpdateTeamErrorHandler
		);	
	},
	
	editTeamListener: function(e) {
		this.teamService.editTeam(
			e.detail, 
			this.createUpdateTeamCompletionHandler, 
			this.createUpdateTeamErrorHandler
		);
	},
	
	deleteTeamListener: function(e) {
		this.teamService.deleteTeam(
			e.detail, 
			this.deleteTeamCompletionHandler, 
			this.deleteTeamErrorHandler
		);
	},
  	
  	createUpdateTeamCompletionHandler: function(result) {
  		console.log("data successfully added");
  	},
  	
  	createUpdateTeamErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	deleteTeamCompletionHandler: function(result) {
  		console.log("team successfully deleted");
  	},
  	
  	deleteTeamErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	handleScroll: function(event) {
  		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  			if (this.state.nextPage) {
  				this.teamService.getTeamList(
  					this.getTeamsCompletionHandler, 
  					this.getTeamsErrorHandler, 
  					this.state.nextPage
  				);	
  			}
    	}
  	},
  	
	render: function() {
		return (
      		<div>
      			<SectionHeader name="Teams"/>
        		<TeamAddEditForm 
	        		clubs={this.state.clubs}
	        		completionHandler={this.collapse} 
	        		selectedItem={this.state.selectedItem}
	        	/>
        		<TeamList data={this.state.data}/>
      		</div>
    	);
  }
});