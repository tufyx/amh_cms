import "../../css/item.css"
import React from 'react'

export var SectionHeader = React.createClass({

	didClickButton: function() {
		dispatchEvent(new CustomEvent("EXPAND_FORM"));
	},

	render: function() {
    	return (
			<div className="side-by-side">
    			<h3 className="left">{this.props.name}</h3>
        		<button type="button" className="btn btn-primary right" onClick={this.didClickButton}>
        			<span className="glyphicon glyphicon-plus"></span>
        		</button>
        	</div>
	    );
	}
});