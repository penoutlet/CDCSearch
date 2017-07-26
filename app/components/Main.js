//dependencies
var React = require('react');
var router = require('react-router');
var createReactClass = require('create-react-class');
// components

var Navbar = require("./Navbar");
var Search = require("./Search");
var Query = require("./search/Query");


var Main = createReactClass({
	
	render: function() {
				
		return(
			<div className = "main-container">
				
				<Navbar />
				<Search />
			</div>
	);
	}
});

module.exports = Main;