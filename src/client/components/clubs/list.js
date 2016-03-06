import "../../css/item.css"
import {Club} from "./club.js"
import React from 'react'

export var ClubList = React.createClass({
  render: function() {
  	var clubNodes = this.props.data.map(function(club, index) {
  	  var key = club.id + "_" + index;
      return (
        <Club club={club} key={key} id={index}>A club</Club>
      );
    });
  	
    return (
      <div className="list">
      	{clubNodes}
      </div>
    );
  }
});