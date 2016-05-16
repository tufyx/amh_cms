import "../../css/item.css"
import "../../css/season.css"
import {Season} from "./season.js"
import React from 'react'

export class SeasonList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { store } = this.context;
    store.subscribe(() => 
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { store } = this.context;
    const state = store.getState();
  	var seasonNodes = state.data.seasons.map(function(season, index) {
  	  var key = season.id + "_" + index;
      return (
        <Season season={season} key={key} id={index}>A season</Season>
      );
    });
  	
    return (
      <div className="season-list">
      	{seasonNodes}
      </div>
    )
  }
}

SeasonList.contextTypes = {
  store: React.PropTypes.object
};
