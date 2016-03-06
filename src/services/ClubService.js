export class ClubService {
	constructor(url) {
		this.baseUrl = url + '/clubs/';	
	}
	
	getAllClubs(completionHandler, errorHandler, next) {
		var url = this.baseUrl + "all";
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
	
	getClubList(completionHandler, errorHandler, next) {
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
	
	createClub(club, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl,
			method: "POST",
			data: club,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
	
	updateClub(club, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl + club.id + "/",
			method: "PUT",
			data: club,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
	
	deleteClub(club, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl + club.id + "/",
			method: 'DELETE',
			data: club,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
}