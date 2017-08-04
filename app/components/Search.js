// DEPENDENCIES --------------------------------------------------
var React = require('react');
var helpers = require("../utils/helpers");
var createReactClass = require('create-react-class');
var Query = require('./search/Query');
var Results = require('./search/Results');

// SEARCH --------------------------------------------------------
var Search = createReactClass({
	
	getInitialState: function(){
		return {
			results: {}
		};
	},

	// Run a query with the disease name entered. Save the response in the state.
	setQuery: function(diseasename){
		helpers.runQuery(diseasename).then(
			function(data) {
				this.setState({results: data 
			});

	// bind this fnc so that "this" inside of it refers to the state of this file. 
		}.bind(this));
	},

	render: function(){
		return(
			<div className= 'main-container'>
			 {/* Pass setQuery as a prop to Query, and the results object down to results.js*/}
				<div className='col-lg-10'>
				<div className='jumbotron'>
				<h4 className='jumbotron-text'>Search the CDC for Information on Any Subject.</h4>
				<h4 className='jumbotron-text'> Graph Publishing Trends over Time. </h4>
				<div className='row'> 
				<Query results = {this.state.results} setQuery={this.setQuery} />
				</div>
				</div>
				
				</div>
				<Results results={this.state.results} saveArticle={this.saveArticle} />
			</div>
			)

	}

});

module.exports =  Search;
