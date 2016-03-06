import "../../css/item.css"
import "../../css/referee.css"
import React from 'react'

export var Referee = React.createClass({
	
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
  		dispatchEvent(new CustomEvent("DELETE_REFEREE", { 'detail': this.props.referee }));
  	},
  	
  	editItem: function() {
  		dispatchEvent(new CustomEvent("ITEM_CLICK", { 'detail': this.props.referee }));
  	},
  	
  	render: function() {
  		var style = "item" + (this.state.hover ? " item-hover" : "");
    	return (
	      	<div className={style} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
	      		<h4 className="referee-name">{this.props.referee.first_name} {this.props.referee.last_name}</h4>
	      		<div className="item-toolbar">
	      			<button id="editButton" type="button" className="btn btn-primary item-action-button" onClick={this.editItem}>Edit</button>
	      			<button id="deleteButton" type="button" className="btn btn-danger item-action-button item-action-button-delete" onClick={this.deleteItem}>Delete</button> 
	      		</div>
	      	</div>
    	);
  	}
});