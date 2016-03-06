import "../../css/item.css"
import React from 'react'

export var VenueAddEditForm = React.createClass({
	componentDidMount: function() {
		$('#addEditForm').hide()
	},
	
	saveItem: function() {
		var venueName = $('#venueName').val();
		var venueAddress = $('#venueAddress').val();
		var venueId = this.props.selectedItem != null ? this.props.selectedItem.id : undefined;
		var venue = {'name': venueName, 'id': venueId};
		dispatchEvent(new CustomEvent(venueId == undefined ? "ADD_VENUE" : "EDIT_VENUE", { 'detail': venue }));
	},
	
	cancelAction: function() {
		this.props.completionHandler()
	},
	
	onChangeHandler: function(e) {
		console.log(e);
	},
	
	render: function() {
		var title = this.props.selectedItem != undefined ? "Edit venue" : "Add new venue";
		$('#venueName').val(this.props.selectedItem != undefined ? this.props.selectedItem.name : "");
		$('#venueAddress').val(this.props.selectedItem != undefined ? this.props.selectedItem.address : "");
		return (
			<div id="addEditForm" className="panel panel-default">
  				<div className="panel-heading">{title}</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
			    			<label htmlFor="venueName">Venue name</label>
			    			<input id="venueName" type="text" className="form-control" placeholder="Enter venue name here ..."/>
			  			</div>
			  			<div className="form-group">
			    			<label htmlFor="venueAddress">Venue Address</label>
			    			<input id="venueAddress" type="text" className="form-control" placeholder="Enter venue address here ..."/>
			  			</div>
			  			<button id="saveButton"   type="button" className="btn btn-success form-button" onClick={this.saveItem}>Save</button>
			  			<button id="cancelButton" type="button" className="btn btn-default form-button" onClick={this.cancelAction}>Cancel</button>
					</form>	
				</div>
			</div>
		)
	}
});