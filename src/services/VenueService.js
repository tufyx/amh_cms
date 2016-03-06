export class VenueService {
	constructor(url) {
		this.baseUrl = url + '/venues/';	
	}
	
	
	getVenueList(completionHandler, errorHandler, next) {
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
	
	createVenue(venue, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl,
			method: "POST",
			data: venue,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
	
	updateVenue(venue, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl + venue.id + "/",
			method: "PUT",
			data: venue,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
	
	deleteVenue(venue, completionHandler, errorHandler) {
		$.ajax({
			url: this.baseUrl + venue.id + "/",
			method: 'DELETE',
			data: venue,
			success: function(data) {
				completionHandler({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				errorHandler(err.toString());
			}.bind(this)
		});
	};
}