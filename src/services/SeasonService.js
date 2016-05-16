export default class SeasonService {
	constructor(url) {
		this.baseUrl = url + '/seasons/';	
	}
	
	getSeasonList(completionHandler, errorHandler, next) {
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
	
	createSeason(season, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl,
			method: "POST",
			data: season,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
	
	updateSeason(season, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl + season.id + "/",
			method: "PUT",
			data: season,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
	
	deleteSeason(season, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl + season.id + "/",
			method: 'DELETE',
			data: season,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
}