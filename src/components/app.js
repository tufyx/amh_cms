import {Router, Route, Link, IndexRoute, browserHistory} from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom'

import Menu from './menu.js'
import { SeasonBox } from './seasons/container.js'
import { CompetitionBox } from './competitions/container.js'
import { LevelBox } from './levels/container.js'
import { ClubBox } from './clubs/container.js'
import { TeamBox } from './teams/container.js'
import { VenueBox } from './venues/container.js'
import { RefereeBox } from './referees/container.js'
import { PlayerBox } from './players/container.js'

const App = React.createClass({
  render() {
    return (
    	<div>
    		<Menu></Menu>
    		{this.props.children}
      	</div>
    )
  }
})

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="seasons" component={SeasonBox} />
      <Route path="competitions" component={CompetitionBox} />
      <Route path="levels" component={LevelBox} />
      <Route path="venues" component={VenueBox} />
      <Route path="clubs" component={ClubBox} />
      <Route path="teams" component={TeamBox} />
      <Route path="players" component={PlayerBox} />
      <Route path="referees" component={RefereeBox} />
    </Route>
  </Router>
), document.getElementById('content'))
