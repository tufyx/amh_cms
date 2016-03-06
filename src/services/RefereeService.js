export class RefereeService {
	constructor(url) {
		this.baseUrl = url + '/referees/';	
	}
	
	getRefereeList(completionHandler, errorHandler, next) {
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
	
	createReferee(referee, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl,
			method: "POST",
			data: referee,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
	
	updateReferee(referee, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl + referee.id + "/",
			method: "PUT",
			data: referee,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
	
	deleteReferee(referee, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl + player.id + "/",
			method: 'DELETE',
			data: referee,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
}