import React from 'react'
import {Link} from 'react-router'

const Menu = React.createClass({
  render: function() {
    return (
      	<nav className="navbar navbar-default navbar-fixed-top" role="navigation">
      		<div className="container-fluid">
		    	<div className="navbar-header">
		      		<a className="navbar-brand" href="http://cms.amh.com/src/index.html">
		      			<span className="glyphicon glyphicon-align-left" aria-hidden="true"></span> 
		      			AMH CMS
		      		</a>
		    	</div>
				<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul className="nav navbar-nav">
						<li><Link to="/seasons">Seasons</Link></li>
						<li><Link to="/competitions">Competitions</Link></li>
						<li><Link to="/levels">Levels</Link></li>
						<li><Link to="/clubs">Clubs</Link></li>
						<li><Link to="/teams">Teams</Link></li>
						<li><Link to="/venues">Venues</Link></li>
						<li><Link to="/referees">Referees</Link></li>
						<li><Link to="/players">Players</Link></li>
					</ul>
				</div>
			</div>
		</nav>
    )
  }
})

export default Menu