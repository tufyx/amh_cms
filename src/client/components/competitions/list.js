import "../../css/item.css"
import "../../css/competition.css"
import {Competition} from "./competition.js"
import React from 'react'

export var CompetitionList = React.createClass({
  render: function() {
  	var competitionNodes = this.props.data.map(function(competition, index) {
  	  var key = competition.id + "_" + index;
      return (
        <Competition competition={competition} key={key} id={index}>A competition</Competition>
      );
    });
  	
    return (
      <div className="competition-list">
      	{competitionNodes}
      </div>
    );
  }
});