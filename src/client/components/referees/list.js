import "../../css/item.css"
import {Referee} from "./referee.js"
import React from 'react'


export var RefereeList = React.createClass({
  render: function() {
  	var refereeNodes = this.props.data.map(function(referee, index) {
  	  var key = referee.id + "_" + index;
      return (
        <Referee referee={referee} key={key} id={index}>A referee</Referee>
      );
    });
  	
    return (
      <div className="list">
      	{refereeNodes}
      </div>
    );
  }
});