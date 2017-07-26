var React = require("react");

// for use of helpers functions for gets and posts.
var helpers = require("../../utils/helpers");

// for bypassing deprecated react.createElement err 
var createReactClass = require('create-react-class');
// requiring chart component to render it here.
// requiring Ramda packg to make counting the arrays easier.


var Results = createReactClass({

	getInitialState: function (){
		return {
			name: "",
			datePublished: "",
			url:""
		}

	},



//SAVES ARTICLE ----------------------------------------------------------------------------     
handleSubmit: function (item){
		console.log(item.name);
		
		helpers.postArticle(item.name,item.datePublished,item.contentUrl).then(function() {
			console.log("Postarticle working");

			
			
			

		});
},

scrollTop: function() {
	document.body.scrollTop=0;
},
	

	

renderArticles: function() {
		// returns buttons and divs for each item in the results array. 
		return this.props.results.data.results.map(function(item,index){
			return (
			
			<div key={index}>
				
				<li className = "list-group-item" id='result-div'>
					<h3>
						<span>
							<em> {item.name} </em>
							</span>
							<h5>Date Published: {item.datePublished} </h5>
						<span >
							<a href= {item.contentUrl} rel="noopener noreferrer" target="_blank">
								<button className= 'btn btn-default'>View Page </button>
							</a>
							<button className= "btn btn-warning" onClick={()=>this.handleSubmit(item)}> Save </button>
							<button id = 'top-button' onClick={this.scrollTop} className='btn btn-danger'> Top of Page </button>
						</span>
					</h3>
				</li>
			</div>
			
		);
	}.bind(this));

	},

// CREATES ELEMENTS FOR ARTICLE DISPLAY -----------------------------------------------------------
	renderContainer: function(){
		return (
	<div className="main-container">
        <div className="row">
          <div className="col-lg-12">
              
                <ul className="list-group">

                  {this.renderArticles()}
                </ul>

           </div>

        </div>
        
    </div>
			);
},

render: function () {
		
		// if no results have been passed down, show this Html.
			
	if (!this.props.results.data) {

		return(
			<h3>
				<span>
					<em> </em>
				</span>
			</h3>

		);
		
	}
	// if there are results, render the container and the results.
	return this.renderContainer();
	
			
}
});
module.exports = Results;
