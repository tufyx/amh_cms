export class CompetitionService {
	constructor(url) {
		this.baseUrl = url + '/competitions/';	
	}
	
	getCompetitionList(completionHandler, errorHandler, next) {
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
	
	createCompetition(competition, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl,
			method: "POST",
			data: competition,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
	
	updateCompetition(competition, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl + competition.id + "/",
			method: "PUT",
			data: competition,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
	
	deleteCompetition(competition, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl + competition.id + "/",
			method: 'DELETE',
			data: competition,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
}