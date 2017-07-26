// DEPENDENCIES ----------------------------------------------------
var React = require('react');
var createReactClass = require('create-react-class');
var R = require("ramda");
google.charts.load('current', {'packages':['corechart']});

var graphArray = [];    

var Query = createReactClass({
	getInitialState: function(){
		return {
    disease_name:"",
    }

	},
  
//  CODE FOR MAKING DATES USABLE -----------------------------------
  swap: function(array,firstIndex,secondIndex) {
    var temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
  },
// SORT ALGORITHM----------------
  selectionSort: function(array) {
  
    var len = array.length;
    var min;

    for (var i = 0; i < len; i++) {
    // set index of minimum to this position
      min = i;

    // check the rest of the array to see if anything is smaller
      for (var j = i + 1; j < len; j++) {
        if (array[j] < array[min]) {
          min = j;
      }
    }

    // if the current position isn't the minimum, swap it and the minimum
      if (i !== min) {
        this.swap(array, i, min);
    }
  }

    return array;
},
// CREATES USABLE YEARS --------------------------------------------------------------
  getYears: function() {

  // yearArray stores the publishing year, graphArray matches the years to the num. published 
    var yearArray = [];
    graphArray = [];

  // sends alert when users press graph without first pressing search.
    if (!this.props.results.data) {
    alert("Please press search first");
    }

  // Gets the publishing years for all of the articles. Pushes them to yearArray  
    for (var i =0; i< this.props.results.data.results.length; i++) {
      var string = this.props.results.data.results[i].datePublished;
      var yearPub = string.substring(0,4);
      yearArray.push(yearPub);
  }
  //  Counts the # of articles published each year.
    var sortedYearArray = this.selectionSort(yearArray);
    var countedYearObj = R.countBy(Math.floor)(sortedYearArray);  
        
  // Saves the keys (years) and values (number published).
    var keys = R.keys(countedYearObj); 
    var values = R.values(countedYearObj);
    
  // Pushes them to array. 
    for (var i = 0; i < keys.length; i++) {
      graphArray.push([keys[i],values[i]]);
  }

    this.drawChart(graphArray);
},

//CREATES GRAPH ----------------------------------------------------
  drawChart: function(array){
    $('#chart').show();
      var diseasename = this.state.disease_name.toUpperCase();
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Year');
      data.addColumn('number', 'Articles');
      data.addRows(graphArray);
      var Title = {'title': diseasename + ' ARTICLES',
              'width':200,
              'height':200,
              'hAxis': {
                "title":"YEAR PUBLISHED"},
              'vAxis': {
                "title": "NUMBER"}
              };
      var chart = new google.visualization.LineChart(document.getElementById('chart'));
      chart.draw(data,Title);
                
    
}, 

  // Collects User's Input, saves it as disease_name in this.state --------------------------
	handleChange: function(e){
		console.log("Component Changed");
		var newState = {};
            console.log(graphArray);
		newState = (e.target_id = e.target.value);
		this.setState(
			{disease_name: newState}
		);
      console.log("disease_name: ", this.state.disease_name);
},

  // srch button on click hides query div and displays the div and loading animation. When 
  // runs setQuery passed down from Search.js
	handleSubmit: function(e) {

		console.log('Submitted');
		e.preventDefault();
		this.props.setQuery(this.state.disease_name);

},
  hideQueryDiv: function(){
    console.log('clicked');
    
  },

	render: function(){

		return (
			<div className="jumbotron-container">

        <div className="row">
         
      

            <div className="panel-primary" id='query-div' >
         		<form onSubmit={this.handleSubmit}>
         		 <div className="form-group">
                	<input 
                  placeholder='Press Enter to Search'
                	type='text'
                	id="disease_name"
                	value={this.state.disease_name}
                	className='form-control'
                	onChange={this.handleChange}
                	/>
                	
                <div id='submit-btn-div'>
                	<button onClick={this.hideQueryDiv} id='search-btn' type='Submit' className='btn btn-danger'>
                	Search
                	</button>
                </div>
          
             </div>
            </form>
              <button id='graph-btn' className='btn btn-warning' onClick={this.getYears}> Graph </button>
            </div>
             <div className="panel-primary" id='chart' hidden>
          <h3>
            <span hidden>
              <em> Graph of Articles</em>
            </span>
          </h3>
          <button className='hide-btn' onClick={this.hideChart}> Hide </button>
          </div>
             </div>
             </div>



			);
	}
});
module.exports = Query;