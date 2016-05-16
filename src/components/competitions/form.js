import "../../css/item.css"
import React from 'react'

export var CompetitionAddEditForm = React.createClass({
	componentDidMount: function() {
		$('#addEditForm').hide()
	},
	
	saveItem: function() {
		var competitionName = $('#competitionName').val();
		var competitionLegs = $('#competitionLegs').val();
		var competitionLevel = $('#competitionLevel').val();
		var competitionSeason = $('#competitionSeason').val();
		var competitionTeams = $("#competitionTeams").val();
		var competitionId = this.props.selectedItem != null ? this.props.selectedItem.id : undefined;
		
		var competition = {
			'id': competitionId,
			'name': competitionName,
			'legs': competitionLegs,
			'level': competitionLevel,
			'season': competitionSeason,
			'teams': competitionTeams,			 
		};
		dispatchEvent(new CustomEvent(competitionId == undefined ? "ADD_COMPETITION" : "EDIT_COMPETITION", { 'detail': competition }));
	},
	
	cancelAction: function() {
		this.props.completionHandler()
	},
	
	didChangeLevel: function(e) {
		var level = $("#competitionLevel").val()
		dispatchEvent(new CustomEvent("SELECTED_LEVEL", {'detail': level}));
	},
	
	prefillForm: function(item) {
		$('#competitionName').val(item != undefined ? item.name : "");
		$('#competitionLegs').val(item != undefined ? item.legs : "");
		if (item != undefined) {
			$('#competitionLevel option[value="'+ item.level.id +'"]').prop('selected', true);
			$('#competitionSeason option[value="'+ item.season.id +'"]').prop('selected', true);	
		}
	},
	
	render: function() {
		var title = this.props.selectedItem != undefined ? "Edit competition" : "Add new competition";
		
		this.prefillForm(this.props.selectedItem);
		
		var levels = this.props.levels.map(function(level, index) {
  	  		var key = level.id + "_" + index;
      		return (
        		<option value={level.id} key={key}>{level.description}</option>
      		);
    	});
    	
    	var seasons = this.props.seasons.map(function(season, index) {
  	  		var key = season.id + "_" + index;
      		return (
        		<option value={season.id} key={key}>{season.name}</option>
      		);
    	});
    	
    	var teams = this.props.teams.map(function(team, index) {
  	  		var key = team.id + "_" + index;
      		return (
        		<option value={team.id} key={key}>{team.name}</option>
      		);
    	});
		
		return (
			<div id="addEditForm" className="panel panel-default">
  				<div className="panel-heading">{title}</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
			    			<label htmlFor="competitionName">Competition name</label>
			    			<input id="competitionName" type="text" className="form-control" placeholder="Enter competition name here ..."/>
			  			</div>
			  			<div className="form-group">
			    			<label htmlFor="competitionLegs">Number of matches between two teams</label>
			    			<input id="competitionLegs" type="number" className="form-control" placeholder="Enter number of legs here ..."/>
			  			</div>
			  			<div className="form-group">
			  				<label htmlFor="competitionLevel">Level</label>
			  				<select id="competitionLevel" className="form-control" onChange={this.didChangeLevel}>
			  					<option disabled>Select level</option>
			  					{levels}
							</select>
						</div>
						<div className="form-group">
			  				<label htmlFor="competitionSeason">Season</label>
			  				<select id="competitionSeason" className="form-control">
			  					<option disabled>Select season</option>
			  					{seasons}
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="competitionTeams">Teams</label>
							<select id="competitionTeams" multiple className="form-control">
								{teams}
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