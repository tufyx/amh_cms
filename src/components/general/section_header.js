import "../../css/item.css"
import React from 'react'

export class SectionHeader extends React.Component {

	constructor(props) {
      super(props);
    }

	render() {
    	return (
			<div className="side-by-side">
				<h3 className="left">{this.props.name}</h3>
				<button type="button" className="btn btn-primary right add-button" onClick={this.props.onClick}>
					<span className="glyphicon glyphicon-plus"></span>
				</button>
        	</div>
	    );
	}
}
