import "../../css/item.css"
import "../../css/competition.css"
import React from 'react'

export var Competition = React.createClass({
	
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
  		dispatchEvent(new CustomEvent("DELETE_COMPETITION", { 'detail': this.props.competition }));
  	},
  	
  	editItem: function() {
  		dispatchEvent(new CustomEvent("ITEM_CLICK", { 'detail': this.props.competition }));
  	},
  	
  	render: function() {
  		var style = "competition" + (this.state.hover ? " competition-hover" : "");
    	return (
	      	<div className={style} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
	      		<p className="competition-name">{this.props.competition.name}</p>
	      		<div className="competition-toolbar">
	      			<button id="editButton" type="button" className="btn btn-primary item-action-button" onClick={this.editItem}>Edit</button>
	      			<button id="deleteButton" type="button" className="btn btn-danger item-action-button item-action-button-delete" onClick={this.deleteItem}>Delete</button> 
	      		</div>
	      	</div>
    	);
  	}
});