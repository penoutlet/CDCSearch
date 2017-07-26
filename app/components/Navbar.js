// DEPENDENCIES ---------------------------------------
var React = require('react');
var createReactClass = require('create-react-class');

// NAVBAR ---------------------------------------------		
var Navbar = createReactClass({

	
	render: function() {
	return (
		<div className='Navbar-container'>
			<div className ='row'>
				<div id = "nav-links" className = 'col-lg-12'>
					<ul className="nav nav-pills">
						  <li><a className="btn btn-lg btn-danger fp-buttons" href="/"> Home</a></li>
					  	 <li> <a className="btn btn-lg btn-danger" href= "/api/saved">Saved</a></li>
		</ul>		
			</div>
		</div>
	</div>
		);
	}
});

module.exports = Navbar;