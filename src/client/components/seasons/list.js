import "../../css/item.css"
import "../../css/season.css"
import {Season} from "./season.js"
import React from 'react'

export var SeasonList = React.createClass({
  render: function() {
  	var seasonNodes = this.props.data.map(function(season, index) {
  	  var key = season.id + "_" + index;
      return (
        <Season season={season} key={key} id={index}>A season</Season>
      );
    });
  	
    return (
      <div className="season-list">
      	{seasonNodes}
      </div>
    );
  }
});