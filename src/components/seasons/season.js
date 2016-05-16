import "../../css/item.css"
import "../../css/season.css"
import React from 'react'

import { editSeasonAction, deleteSeasonAction } from './actions'

export class Season extends React.Component {
	
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    const { store } = this.context;
    store.subscribe(() => 
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  
	// onMouseOver() {
	// 	this.state = { hover: true };
	// }

	// onMouseOut() {
	// 	this.state = { hover: false };
	// }
	
	deleteItem() {
    const { store } = this.context;
    store.dispatch(deleteSeasonAction(this.props.season));
	}
	
	editItem() {
    const { store } = this.context;
    store.dispatch(editSeasonAction(this.props.season));
	}
  	
	render() {
		var style = "season" + (this.state.hover ? " season-hover" : "");
  	return (
      	<div className={style} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
      		<p className="season-name">{this.props.season.name}</p>
      		<div className="season-toolbar">
      			<button 
              id="editButton" 
              type="button" 
              className="btn btn-primary item-action-button" 
              onClick={this.editItem}>
              Edit
            </button>
      			<button 
              id="deleteButton" 
              type="button" 
              className="btn btn-danger item-action-button item-action-button-delete" 
              onClick={this.deleteItem}>
              Delete
            </button> 
      		</div>
      	</div>
  	);
	}
}

Season.contextTypes = {
  store: React.PropTypes.object
};
