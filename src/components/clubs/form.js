import "../../css/item.css"
import React from 'react'

export var ClubAddEditForm = React.createClass({
	componentDidMount: function() {
		$('#addEditForm').hide()
	},
	
	saveItem: function() {
		var clubName = $('#clubName').val();
		var clubImage = $('#clubImage').val();
		var clubId = this.props.selectedItem != null ? this.props.selectedItem.id : undefined;
		var club = {'name': clubName, 'id': clubId};
		if (clubImage.length > 0) {
			club.image = clubImage;
		}
		dispatchEvent(new CustomEvent(clubId == undefined ? "ADD_CLUB" : "EDIT_CLUB", { 'detail': club }));
	},
	
	cancelAction: function() {
		this.props.completionHandler()
	},
	
	onChangeHandler: function(e) {
		var file_data = $("#clubImage").prop('files')[0];
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
		var title = this.props.selectedItem != undefined ? "Edit club" : "Add new club";
		$('#clubName').val(this.props.selectedItem != undefined ? this.props.selectedItem.name : "");
		return (
			<div id="addEditForm" className="panel panel-default">
  				<div className="panel-heading">{title}</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
			    			<label htmlFor="clubName">Club name</label>
			    			<input id="clubName" type="text" className="form-control" placeholder="Enter club name here ..."/>
			  			</div>
			  			<div className="form-group">
			  				<label htmlFor="clubImage">Club image</label>
      						<input id="clubImage" type="file" className="form-control" placeholder="Choose an image" onChange={this.onChangeHandler} accept=".png"/>
			  			</div>
			  			<button id="saveButton"   type="button" className="btn btn-success form-button" onClick={this.saveItem}>Save</button>
			  			<button id="cancelButton" type="button" className="btn btn-default form-button" onClick={this.cancelAction}>Cancel</button>
					</form>	
				</div>
			</div>
		)
	}
});