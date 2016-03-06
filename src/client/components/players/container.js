import React from 'react'

import {PlayerService} from "../../services/PlayerService.js"
import {ClubService} from "../../services/ClubService.js"

import {SectionHeader} from '../general/section_header.js'
import {PlayerAddEditForm} from "./form.js"
import {PlayerList} from "./list.js"


export var PlayerBox = React.createClass({
  	getInitialState: function() {
    	return {
    		data: [],
    		clubs: [],
    		nextPage: null,
    		selectedItem: null
    	};
  	},
  
  	componentDidMount: function() {
  		addEventListener("EXPAND_FORM", this.expandForm);
  		addEventListener("ITEM_CLICK", this.didClickItem);
  		addEventListener("ADD_PLAYER", this.addPlayerListener);
    	addEventListener("EDIT_PLAYER", this.editPlayerListener);
    	addEventListener("DELETE_PLAYER", this.deletePlayerListener);
    	window.addEventListener("scroll", this.handleScroll);
    	
    	this.playerService = new PlayerService("http://127.0.0.1:8000/api");
    	this.clubService = new ClubService("http://127.0.0.1:8000/api");
    	this.playerService.getPlayerList(
    		this.getPlayersCompletionHandler, 
    		this.getPlayersErrorHandler, 
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
		this.clubService.getAllClubs(this.getClubsCompletionHandler, this.getClubsErrorHandler);
	},
	
	collapse: function() {
		$('#addEditForm').animate({height:"hide"},200);
	},
  	
  	getPlayersCompletionHandler: function(result) {
  		this.setState(
  			{
  				data: this.state.data.concat(result.data.results), 
  				nextPage: result.data.next
  			}
  		);
  	},
  	
  	getPlayersErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	addPlayerListener: function(e) {
		this.playerService.createPlayer(
			e.detail, 
			this.createUpdatePlayerCompletionHandler, 
			this.createUpdatePlayerErrorHandler
		);	
	},
	
	editPlayerListener: function(e) {
		this.playerService.editPlayer(
			e.detail, 
			this.createUpdatePlayerCompletionHandler, 
			this.createUpdatePlayerErrorHandler
		);
	},
	
	deletePlayerListener: function(e) {
		this.clubService.deleteClub(
			e.detail, 
			this.deletePlayerCompletionHandler, 
			this.deletePlayerErrorHandler
		);
	},
  	
  	createUpdatePlayerCompletionHandler: function(result) {
  		console.log("data successfully added");
  	},
  	
  	createUpdatePlayerErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	deletePlayerCompletionHandler: function(result) {
  		console.log("club successfully deleted");
  	},
  	
  	deletePlayerErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	getClubsCompletionHandler: function(result) {
  		this.setState({
  			clubs: result.data
  		});
  	},
  	
  	getClubsErrorHandler: function(error) {
  		console.error(error.toString());
  	},
  	
  	handleScroll: function(event) {
  		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  			if (this.state.nextPage) {
  				this.playerService.getPlayerList(
  					this.getPlayersCompletionHandler, 
  					this.getPlayersErrorHandler, 
  					this.state.nextPage
  				);	
  			}
    	}
  	},
  	
	render: function() {
		return (
      		<div>
      			<SectionHeader name="Players"/>
        		<PlayerAddEditForm 
        			completionHandler={this.collapse}
        			selectedItem={this.state.selectedItem}
        			clubs={this.state.clubs}
        		/>
        		<PlayerList data={this.state.data}/>
      		</div>
    	);
  }
});