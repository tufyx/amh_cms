import "../../css/item.css"
import "../../css/level.css"
import {Level} from "./level.js"
import React from 'react'

export var LevelList = React.createClass({
  render: function() {
  	var levelNodes = this.props.data.map(function(level, index) {
  	  var key = level.id + "_" + index;
      return (
        <Level level={level} key={key} id={index}>A level</Level>
      );
    });
  	
    return (
      <div className="level-list">
      	{levelNodes}
      </div>
    );
  }
});