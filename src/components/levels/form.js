import "../../css/item.css"
import React from 'react'

export var LevelAddEditForm = React.createClass({
	componentDidMount: function() {
		$('#addEditForm').hide()
	},
	
	saveItem: function() {
		var levelName = $('#levelName').val();
		var levelGender = $('#levelGender').val();
		var levelId = this.props.selectedItem != null ? this.props.selectedItem.id : undefined;
		var level = {'name': levelName, 'id': levelId, 'gender': levelGender};
		dispatchEvent(new CustomEvent(levelId == undefined ? "ADD_LEVEL" : "EDIT_LEVEL", { 'detail': level }));
	},
	
	cancelAction: function() {
		this.props.completionHandler()
	},
	
	render: function() {
		var title = this.props.selectedItem != undefined ? "Edit level" : "Add new level";
		$('#levelName').val(this.props.selectedItem != undefined ? this.props.selectedItem.name : "");
		$('#levelGender').val(this.props.selectedItem != undefined ? this.props.selectedItem.gender : 0);
		return (
			<div id="addEditForm" className="panel panel-default">
  				<div className="panel-heading">{title}</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
			    			<label htmlFor="levelName">Level name</label>
			    			<input id="levelName" type="text" className="form-control" placeholder="Enter level name here ..."/>
			  			</div>
			  			<select id="levelGender" className="form-control" default>
			  				<option value="0" disabled>Select gender</option>
    						<option value="1">Male</option>
						    <option value="2">Female</option>
						</select>
			  			<button id="saveButton"   type="button" className="btn btn-success form-button" onClick={this.saveItem}>Save</button>
			  			<button id="cancelButton" type="button" className="btn btn-default form-button" onClick={this.cancelAction}>Cancel</button>
					</form>	
				</div>
			</div>
		)
	}
});