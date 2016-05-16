import React from 'react'

import {CompetitionService} from "../../services/CompetitionService.js"
import {LevelService} from "../../services/LevelService.js"
import {SeasonService} from "../../services/SeasonService.js"

import {SectionHeader} from '../general/section_header.js'
import {CompetitionAddEditForm} from "./form.js"
import {CompetitionList} from "./list.js"

export var CompetitionBox = React.createClass({
  	getInitialState: function() {
    	return {
    		nextPage: null,
    		selectedItem: null,
    		data: [],
    		levels: [],
    		seasons: [],
			teams: []    		
    	};
  	},
  	
  	componentDidMount: function() {
  		addEventListener("EXPAND_FORM", this.expandForm);
    	addEventListener("ITEM_CLICK", this.didClickItem);
    	addEventListener("SELECTED_LEVEL", this.didChangeLevel);
  		addEventListener("ADD_COMPETITION", this.addCompetitionListener);
    	addEventListener("EDIT_COMPETITION", this.editCompetitionListener);
    	addEventListener("DELETE_COMPETITION", this.deleteCompetitionListener);
		  window.addEventListener("scroll", this.handleScroll);
    	
  		this.levelService = new LevelService("http://127.0.0.1:8000/api");
		  this.seasonService = new SeasonService("http://127.0.0.1:8000/api");
    	this.competitionService = new CompetitionService("http://127.0.0.1:8000/api");
    	
    	this.competitionService.getCompetitionList(
    		this.getCompetitionsCompletionHandler, 
    		this.getCompetitionsErrorHandler, 
    		this.state.nextPage
    	);
  	},
  	
  	expandForm: function() {
		this.addEdit(null);
  	},
  	
  	didClickItem: function(e) {
		this.addEdit(e.detail);
	},
  	
  	didChangeLevel: function(e) {
   		this.levelService.getTeamsForLevel(
   			e.detail, 
   			this.getTeamsCompletionHandler, 
   			this.getTeamsErrorHandler
   		);
	},
  	
  	getCompetitionsCompletionHandler: function(result) {
  		this.setState(
  			{
  				data: this.state.data.concat(result.data.results), 
  				nextPage: result.data.next
  			}
  		);
  	},
  	
  	getCompetitionsErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	addCompetitionListener: function(e) {
      console.log(e);
		this.competitionService.createCompetition(
			e.detail, 
			this.createUpdateCompetitionCompletionHandler, 
			this.createUpdateCompetitionErrorHandler
		);	
	},
	
	editCompetitionListener: function(e) {
		this.competitionService.editCompetition(
			e.detail, 
			this.createUpdateCompetitionCompletionHandler, 
			this.createUpdateCompetitionErrorHandler
		);
	},
		
	deleteCompetitionListener: function(e) {
		this.competitionService.deleteCompetition(
			e.detail, 
			this.deleteCompetitionCompletionHandler, 
			this.deleteCompetitionErrorHandler
		);
	},
  	
  	createUpdateCompetitionCompletionHandler: function(result) {
  		console.log("data successfully added");
  	},
  	
  	createUpdateCompetitionErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	deleteCompetitionCompletionHandler: function(result) {
  		console.log("competition successfully deleted");
  	},
  	
  	deleteCompetitionErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	handleScroll: function(event) {
  		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  			if (this.state.nextPage) {
  				this.competitionService.getCompetitionList(
  					this.getCompetitionsCompletionHandler, 
  					this.getCompetitionsErrorHandler, 
  					this.state.nextPage
  				);	
  			}
    	}
  	},
  	
	addEdit: function(item) {
		this.levelService.getLevelList(
  			this.getLevelsCompletionHandler, 
  			this.getLevelsErrorHandler
  		);
    	this.seasonService.getSeasonList(
    		this.getSeasonsCompletionHandler, 
    		this.getSeasonsErrorHandler
    	);
		this.setState({
			selectedItem: item
		});
		$('#addEditForm').animate({height:"show"},200);
	},
	
	collapse: function() {
		$('#addEditForm').animate({height:"hide"},200);
	},
	
	getLevelsCompletionHandler: function(result) {
  		this.setState({levels: result.data.results});
  	},
  	
  	getLevelsErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	getSeasonsCompletionHandler: function(result) {
  		this.setState({seasons: result.data.results});
  	},
  	
  	getSeasonsErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
	getTeamsCompletionHandler: function(result) {
  		this.setState({teams: result.data});
  	},
  	
  	getTeamsErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
	render: function() {
		return (
      		<div>
	        	<SectionHeader name="Competitions"/>
        		<CompetitionAddEditForm 
	        		teams={this.state.teams}
	        		seasons={this.state.seasons}
	        		levels={this.state.levels}
	        		completionHandler={this.collapse} 
	        		selectedItem={this.state.selectedItem}
	        	/>
        		<CompetitionList data={this.state.data}/>
      		</div>
    	);
  }
});