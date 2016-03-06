import "../../css/item.css"
import "../../css/venue.css"
import React from 'react'

export var Venue = React.createClass({
	
	getInitialState: function() {
        return {
            hover: false
        };
   	},
    
  	onMouseOver: function() {
  		this.setState({
  			hover: true
  		});
  	},
  
  	onMouseOut: function() {
  		this.setState({
  			hover: false
  		});
  	},
  	
  	deleteItem: function() {
  		dispatchEvent(new CustomEvent("DELETE_VENUE", { 'detail': this.props.venue }));
  	},
  	
  	editItem: function() {
  		dispatchEvent(new CustomEvent("ITEM_CLICK", { 'detail': this.props.venue }));
  	},
  	
  	render: function() {
  		var style = "item" + (this.state.hover ? " item-hover" : "");
    	return (
	      	<div className={style} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
	      		<h4 className="venue-name">{this.props.venue.name}</h4>
	      		<h5 className="venue-address">{this.props.venue.address}</h5>
	      		<div className="item-toolbar">
	      			<button id="editButton" type="button" className="btn btn-primary item-action-button" onClick={this.editItem}>Edit</button>
	      			<button id="deleteButton" type="button" className="btn btn-danger item-action-button item-action-button-delete" onClick={this.deleteItem}>Delete</button> 
	      		</div>
	      	</div>
    	);
  	}
});