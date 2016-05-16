const seasons = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SEASON':
      return state;
    case 'EDIT_SEASON':
      return Object.assign({}, state, {
        selectedItem: action.selectedItem
      });
    case 'DELETE_SEASON':
      return Object.assign({}, state, {
        selectedItem: action.selectedItem
      });
    case 'LOAD_NEXT_PAGE':
      return state;
    case 'DID_FETCH_DATA':
      return Object.assign({}, state, {
          seasons: state.seasons.concat(action.seasons),
          nextPage: action.nextPage,
          selectedItem: action.selectedItem  
        });
    default:
      return {
        seasons: [],
        nextPage: null,
        selectedItem: null
      };
  }
}

export default seasons