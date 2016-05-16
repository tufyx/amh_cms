export const addSeasonAction = (season) => {
	return {
		type: "ADD_SEASON",
		season
	}
}

export const editSeasonAction = (season) => {
	console.log('edit season');
	return {
		type: "EDIT_SEASON",
		season
	}
}

export const deleteSeasonAction = (seasonId) => {
	console.log('delete season');
	return {
		type: "DELETE_SEASON",
		seasonId
	}
}

export const loadNextPageAction = (nextPage) => {
	return {
		type: "LOAD_NEXT_PAGE",
		nextPage
	}
}

export const didFetchDataAction = (data, nextPage) => {
	return {
		type: "DID_FETCH_DATA",
		seasons: data,
		nextPage
	}
}