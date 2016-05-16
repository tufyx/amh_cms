import React from 'react'
import { Provider} from 'react-redux'
import { createStore } from 'redux'

import seasonsReducer from './reducers'
import { addSeasonAction, didFetchDataAction } from './actions'
import SeasonService from "../../services/SeasonService.js"
import { SectionHeader } from '../general/section_header.js'
import { SeasonAddEditForm } from "./form.js"
import { SeasonList } from "./list.js"

const store = createStore(seasonsReducer);

export class SeasonBox extends React.Component {
  	
    constructor(props) {
      super(props);
    }

  	componentDidMount() {
      store.subscribe(() =>
        this.forceUpdate()
      );
      this.seasonService = new SeasonService("http://127.0.0.1:8000/api");
      this.seasonService.getSeasonList(
        this.getSeasonsCompletionHandler, 
        this.getSeasonsErrorHandler, 
        store.getState().nextPage
      );
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

  	expandForm() {
  		this.addEdit(null);
    }
    	
  	didClickItem(e) {
  		this.addEdit(e.detail);
  	}
  	
  	addEdit(item) {
      store.dispatch(editSeasonAction(item));
  		$('#addEditForm').animate({height:"show"},200);
  	}
  	
  	collapse() {
  		$('#addEditForm').animate({height:"hide"},200);
  	}
  	
  	getSeasonsCompletionHandler(result) {
      store.dispatch(
        didFetchDataAction(
          result.data.results, 
          result.data.next
        )
      );
  	}
  	
  	getSeasonsErrorHandler(error) {
  		console.error(error.toString());
  	}
  	
  	addSeasonListener(e) {
  		this.seasonService.createSeason(
  			e.detail, 
  			this.createUpdateSeasonCompletionHandler, 
  			this.createUpdateSeasonErrorHandler
  		);	
  	}
  	
  	editSeasonListener(e) {
  		this.seasonService.editSeason(
  			e.detail, 
  			this.createUpdateSeasonCompletionHandler,
  			this.createUpdateSeasonErrorHandler
  		);
  	}
  	
  	deleteSeasonListener(e) {
  		this.seasonService.deleteSeason(
  			e.detail, 
  			this.deleteSeasonCompletionHandler, 
  			this.deleteSeasonErrorHandler
  		);
  	}
  	
  	createUpdateSeasonCompletionHandler(result) {
  		console.log("data successfully added");
  	}
  	
  	createUpdateSeasonErrorHandler(error) {
  		console.error(error.toString());
  	}
  	
  	deleteSeasonCompletionHandler(result) {
  		console.log("season successfully deleted");
  	}
  	
  	deleteSeasonErrorHandler(error) {
  		console.error(error.toString());
  	}
  	
  	handleScroll(event) {
  		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  			if (this.state.nextPage) {
  				this.seasonService.getSeasonList(
  					this.getSeasonsCompletionHandler, 
  					this.getSeasonsErrorHandler, 
  					this.state.nextPage
  				);	
  			}
    	}
  	}
  	
  	render() {
  		return (
            <Provider store={store}>
              <div>
            		<SectionHeader name="Seasons"/>
            		<SeasonAddEditForm 
            			completionHandler={this.collapse} 
            			selectedItem={store.getState().selectedItem}
            		/>
            		<SeasonList />
              </div>
            </Provider>
      	);
    }
}