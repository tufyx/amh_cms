import "../../css/item.css"
import React from 'react'
import DatePicker from "react-bootstrap-date-picker"

export var PlayerAddEditForm = React.createClass({
	componentDidMount: function() {
		$('#addEditForm').hide()
	},
	
	saveItem: function() {
		var firstName = $('#playerFirstName').val();
		var lastName = $('#playerLastName').val();
		var dateOfBirth = new Date($('#playerDOB').val()).toISOString().slice(0,10);
		var playerId = this.props.selectedItem != null ? this.props.selectedItem.id : undefined;
		var player = {
			'id': playerId,
			'firstName': firstName,
			'lastName': lastName,
			'dateOfBirth': dateOfBirth,
			'clubId': $('#playerClub').val()
		};
		dispatchEvent(new CustomEvent(playerId == undefined ? "ADD_PLAYER" : "EDIT_PLAYER", { 'detail': player }));
	},
	
	cancelAction: function() {
		this.props.completionHandler()
	},
	
	onChangeHandler: function(e) {
		console.log(e);
	},
	
	prefillForm: function(item) {
		$('#playerFirstName').val(item != undefined ? item.first_name : "");
		$('#playerLastName').val(item != undefined ? item.last_name : "");
		
		if (item != undefined) {
			$('#playerClub option[value="'+ item.club.id +'"]').prop('selected', true);
			$('#playerGender option[value="'+ item.gender +'"]').prop('selected', true);
		} else {
			$('#playerClub').val(-1);
		}
		
		var dateOfBirth = new Date().toISOString();
		if (item != undefined) {
			dateOfBirth = new Date(item.date_of_birth).toISOString();
		}
		return dateOfBirth;
	},
	
	render: function() {
		var title = this.props.selectedItem != undefined ? "Edit player" : "Add new player";
		
		var clubs = this.props.clubs.map(function(club, index) {
  	  		var key = club.id + "_" + index;
      		return (
        		<option value={club.id} key={key}>{club.name}</option>
      		);
    	});
    	
    	var dob = this.prefillForm(this.props.selectedItem);
		
		return (
			<div id="addEditForm" className="panel panel-default">
  				<div className="panel-heading">{title}</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
			    			<label htmlFor="playerFirstName">First name</label>
			    			<input id="playerFirstName" type="text" className="form-control" placeholder="Enter player first name here ..."/>
			  			</div>
			  			<div className="form-group">
			    			<label htmlFor="playerLastName">Last name</label>
			    			<input id="playerLastName" type="text" className="form-control" placeholder="Enter player last name here ..."/>
			  			</div>
			  			<div className="form-group">
			    			<label htmlFor="playerDOB">Date of birth</label>
			    			<DatePicker id="playerDOB" className="date-picker" value={dob} onChange={this.handleDateChange}/>
			  			</div>
			  			<div className="form-group">
			    			<label htmlFor="playerGender">Gender</label>
			    			<select id="playerGender" className="form-control">
							  <option value="1">Male</option>
							  <option value="2">Female</option>
							</select>
			  			</div>
			  			<div className="form-group">
			  				<label htmlFor="playerImage">Player image</label>
      						<input id="playerImage" type="file" className="form-control" placeholder="Choose an image" onChange={this.onChangeHandler} accept=".png"/>
			  			</div>
			  			<div className="form-group">
			  				<label htmlFor="playerClub">Club</label>
			  				<select id="playerClub" className="form-control" defaultValue="-1">
			  					<option value="-1" disabled>Select club</option>
			  					{clubs}
							</select>
						</div>
			  			<button id="saveButton"   type="button" className="btn btn-success form-button" onClick={this.saveItem}>Save</button>
			  			<button id="cancelButton" type="button" className="btn btn-default form-button" onClick={this.cancelAction}>Cancel</button>
					</form>	
				</div>
			</div>
		)
	}
});