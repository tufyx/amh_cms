import "../../css/item.css"
import {Venue} from "./venue.js"
import React from 'react'


export var VenueList = React.createClass({
  render: function() {
  	var venueNodes = this.props.data.map(function(venue, index) {
  	  var key = venue.id + "_" + index;
      return (
        <Venue venue={venue} key={key} id={index}>A venue</Venue>
      );
    });
  	
    return (
      <div className="list">
      	{venueNodes}
      </div>
    );
  }
});