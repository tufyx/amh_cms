import "../../css/item.css"
import React from 'react'
import DatePicker from "react-bootstrap-date-picker"

export var RefereeAddEditForm = React.createClass({
	componentDidMount: function() {
		$('#addEditForm').hide()
	},
	
	saveItem: function() {
		var firstName = $('#refereeFirstName').val();
		var lastName = $('#refereeLastName').val();
		var dateOfBirth = new Date($('#refereeDOB').val()).toISOString().slice(0,10);
		var refereeId = this.props.selectedItem != null ? this.props.selectedItem.id : undefined;
		var referee = {
			'id': refereeId,
			'firstName': firstName,
			'lastName': lastName,
			'dateOfBirth': dateOfBirth,
		};
		dispatchEvent(new CustomEvent(refereeId == undefined ? "ADD_REFEREE" : "EDIT_REFEREE", { 'detail': referee }));
	},
	
	cancelAction: function() {
		this.props.completionHandler()
	},
	
	onChangeHandler: function(e) {
		console.log(e);
	},
	
	render: function() {
		var title = this.props.selectedItem != undefined ? "Edit referee" : "Add new referee";
		$('#refereeFirstName').val(this.props.selectedItem != undefined ? this.props.selectedItem.first_name : "");
		$('#refereeLastName').val(this.props.selectedItem != undefined ? this.props.selectedItem.last_name : "");
		$('#refereeDOB').val(this.props.selectedItem != undefined ? this.props.selectedItem.date_of_birth : "");
		var dateOfBirth = new Date().toISOString();
		
		if (this.props.selectedItem != undefined) {
			dateOfBirth = new Date(this.props.selectedItem.date_of_birth).toISOString();
		}
				
		return (
			<div id="addEditForm" className="panel panel-default">
  				<div className="panel-heading">{title}</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
			    			<label htmlFor="refereeFirstName">First name</label>
			    			<input id="refereeFirstName" type="text" className="form-control" placeholder="Enter referee first name here ..."/>
			  			</div>
			  			<div className="form-group">
			    			<label htmlFor="refereeLastName">Last name</label>
			    			<input id="refereeLastName" type="text" className="form-control" placeholder="Enter referee last name here ..."/>
			  			</div>
			  			<div className="form-group">
			    			<label htmlFor="refereeDOB">Date of birth</label>
			    			<DatePicker id="refereeDOB" className="date-picker" value={dateOfBirth} onChange={this.handleDateChange}/>
			  			</div>
			  			<div className="form-group">
			  				<label htmlFor="refereeImage">Referee image</label>
      						<input id="refereeImage" type="file" className="form-control" placeholder="Choose an image" onChange={this.onChangeHandler} accept=".png"/>
			  			</div>
			  			<button id="saveButton"   type="button" className="btn btn-success form-button" onClick={this.saveItem}>Save</button>
			  			<button id="cancelButton" type="button" className="btn btn-default form-button" onClick={this.cancelAction}>Cancel</button>
					</form>	
				</div>
			</div>
		)
	}
});