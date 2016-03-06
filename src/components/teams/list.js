import "../../css/item.css"
import {Team} from "./team.js"
import React from 'react'

export var TeamList = React.createClass({
  render: function() {
  	var teamNodes = this.props.data.map(function(team, index) {
  	  var key = team.id + "_" + index;
      return (
        <Team team={team} key={key} id={index}>A team</Team>
      );
    });
  	
    return (
      <div className="list">
      	{teamNodes}
      </div>
    );
  }
});