export class TeamService {
	constructor(url) {
		this.baseUrl = url + '/teams/';	
	}
	
	getTeamList(completionHandler, errorHandler, next) {
		var url = next ? next : this.baseUrl;
		$.ajax({
			url: url,
			dataType: 'json',
      		cache: false,
      		success: function(data) {
      			completionHandler({data: data});
      		}.bind(this),
      		error: function(xhr, status, err) {
      			errorHandler(err.toString());
      		}.bind(this)
    	});
	};
	
	createTeam(team, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl,
			method: "POST",
			data: team,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
	
	updateTeam(team, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl + team.id + "/",
			method: "PUT",
			data: team,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
	
	deleteTeam(team, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl + team.id + "/",
			method: 'DELETE',
			data: team,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
}