import "../../css/item.css"
import {Player} from "./player.js"
import React from 'react'


export var PlayerList = React.createClass({
  render: function() {
  	var playerNodes = this.props.data.map(function(player, index) {
  	  var key = player.id + "_" + index;
      return (
        <Player player={player} key={key} id={index}>A player</Player>
      );
    });
  	
    return (
      <div className="list">
      	{playerNodes}
      </div>
    );
  }
});