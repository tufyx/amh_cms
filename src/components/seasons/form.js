import "../../css/item.css"
import React from 'react'
import DatePicker from "react-bootstrap-date-picker"

export class SeasonAddEditForm extends React.Component {

	constructor(props) {
      super(props);
    }

	componentDidMount() {
		$('#addEditForm').hide()
	}
	
	saveItem() {
		var seasonName = $('#seasonName').val();
		var seasonId = this.props.selectedItem != null ? this.props.selectedItem.id : undefined;
		var season = {
			'name': seasonName, 
			'id': seasonId, 
			'startDate': new Date($('#startDate').val()).toISOString().slice(0,10), 
			'endDate': new Date($('#endDate').val()).toISOString().slice(0,10)
			};
		dispatchEvent(new CustomEvent(seasonId == undefined ? "ADD_SEASON" : "EDIT_SEASON", { 'detail': season }));
	}
	
	cancelAction() {
		this.props.completionHandler()
	}
	
	render() {
		var title = this.props.selectedItem != undefined ? "Edit season" : "Add new season";
		$('#seasonName').val(this.props.selectedItem != undefined ? this.props.selectedItem.name : "");
		var startDate = new Date().toISOString();
		var endDate = startDate;
		if (this.props.selectedItem != null) {
			startDate = new Date(this.props.selectedItem.start_date).toISOString();
			endDate = new Date(this.props.selectedItem.end_date).toISOString();
		}
		
		return (
			<div id="addEditForm" className="panel panel-default">
  				<div className="panel-heading">{title}</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
			    			<label htmlFor="seasonName">Season name</label>
			    			<input id="seasonName" type="text" className="form-control" placeholder="Enter season name here ..."/>
			  			</div>
			  			<DatePicker id="startDate" className="date-picker" value={startDate} onChange={this.handleDateChange}/>
			  			<DatePicker id="endDate" className="date-picker" value={endDate} onChange={this.handleDateChange}/>
			  			<button id="saveButton"   type="button" className="btn btn-success form-button" onClick={this.saveItem}>Save</button>
			  			<button id="cancelButton" type="button" className="btn btn-default form-button" onClick={this.cancelAction}>Cancel</button>
					</form>	
				</div>
			</div>
		)
	}
}

SeasonAddEditForm.contextTypes = {
  store: React.PropTypes.object
};
