import "../../css/item.css"
import "../../css/level.css"
import React from 'react'

export var Level = React.createClass({
	
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
  		dispatchEvent(new CustomEvent("DELETE_LEVEL", { 'detail': this.props.level }));
  	},
  	
  	editItem: function() {
  		dispatchEvent(new CustomEvent("ITEM_CLICK", { 'detail': this.props.level }));
  	},
  	
  	render: function() {
  		var style = "level" + (this.state.hover ? " level-hover" : "");
    	return (
	      	<div className={style} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
	      		<p className="level-name">{this.props.level.description}</p>
	      		<div className="level-toolbar">
	      			<button id="editButton" type="button" className="btn btn-primary item-action-button" onClick={this.editItem}>Edit</button>
	      			<button id="deleteButton" type="button" className="btn btn-danger item-action-button item-action-button-delete" onClick={this.deleteItem}>Delete</button> 
	      		</div>
	      	</div>
    	);
  	}
});