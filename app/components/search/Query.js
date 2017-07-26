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
  
// ----------------------------- CODE FOR MAKING DATES USABLE ----------------------------------------
swap: function(array,firstIndex,secondIndex) {
    var temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
  },

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

getYears: function() {
  // yearArray stores the publishing year, graphArray matches the years to the num. published, is used to make the chart. 
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

//draws the chart using graphArray.
drawChart: function(array){
        var diseasename = this.state.disease_name.toUpperCase();
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Year');
        data.addColumn('number', 'Articles');
        data.addRows(graphArray);
        var Title = {'title': diseasename + ' ARTICLES PUBLISHED',
              'width':400,
              'height':300,
              'hAxis': {
                "title":"YEAR PUBLISHED"},
              'vAxis': {
                "title": "NUM. OF ARTICLES"}
              };
      var chart = new google.visualization.LineChart(document.getElementById('chart'));
        chart.draw(data,Title);
                
    
}, 

// Collects User's Input, saves it as disease name in this.state.
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

// runs setQuery passed down from Search.js
	handleSubmit: function(e) {
		console.log('Submitted');
		e.preventDefault();
		this.props.setQuery(this.state.disease_name);
},

	render: function(){

		return (
			<div className="jumbotron-container">

        <div className="row" id="second-row">
         
      
          <div className="col-lg-5 col-lg-offset-1">

            <div className="panel panel-primary" id='query-div' >
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
                	<button id='search-btn' type='Submit' className='btn btn-danger'>
                	Search
                	</button>
                      </div>
          
             </div>
             </form>
           <button id='graph-btn' className='btn btn-warning' onClick={this.getYears}> Graph </button>
            </div>
             </div>
              <div className='col-lg-6'>
             <li className="list-group-item" id='chart'>
          <h3>
            <span>
              <em> Graph of Articles</em>
            </span>
          </h3>

        </li>
        </div>
             </div>
             </div>



			);
	}
});
module.exports = Query;