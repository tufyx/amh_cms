import "../../css/item.css"
import React from 'react'

export var TeamAddEditForm = React.createClass({
	componentDidMount: function() {
		$('#addEditForm').hide()
	},
	
	saveItem: function() {
		var teamName = $('#teamName').val();
		var teamImage = $('#teamImage').val();
		var teamId = this.props.selectedItem != null ? this.props.selectedItem.id : undefined;
		var team = {'name': teamName, 'id': teamId};
		if (teamImage.length > 0) {
			team.image = teamImage;
		}
		dispatchEvent(new CustomEvent(teamId == undefined ? "ADD_TEAM" : "EDIT_TEAM", { 'detail': team }));
	},
	
	cancelAction: function() {
		this.props.completionHandler()
	},
	
	onChangeHandler: function(e) {
		var file_data = $("#teamImage").prop('files')[0];
		var form_data = new FormData();
		form_data.append("file", file_data)
		form_data.append("user_id", 123)  
		$.ajax({
			type: 'POST',
            url: "http://127.0.0.1:8000/api/image/upload",
            dataType: 'text',
	        cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            success: function(data) {
      			console.log(data);
      		}.bind(this),
      		error: function(xhr, status, err) {
      			console.log(err);
      		}.bind(this)                         
      });
	},
	
	render: function() {
		var title = this.props.selectedItem != undefined ? "Edit team" : "Add new team";
		$('#teamName').val(this.props.selectedItem != undefined ? this.props.selectedItem.name : "");
		var clubs = this.props.clubs.map(function(club, index) {
  	  		var key = club.id + "_" + index;
      		return (
        		<option value={club.id} key={key}>{club.name}</option>
      		);
    	});
		
		return (
			<div id="addEditForm" className="panel panel-default">
  				<div className="panel-heading">{title}</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
			    			<label htmlFor="teamName">Team name</label>
			    			<input id="teamName" type="text" className="form-control" placeholder="Enter team name here ..."/>
			  			</div>
			  			<div className="form-group">
			  				<label htmlFor="teamImage">Club</label>
			  				<select id="competitionTeams" className="form-control">
			  					<option disabled>Select club</option>
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