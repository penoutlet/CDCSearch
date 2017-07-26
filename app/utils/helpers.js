var axios = require('axios');
var APIkey = "9b3adf57854f4a19b7b5782cdd6e427a";
 // var request = require()
var helpers = {
	runQuery: function(diseasename) {
		console.log("disease name in helpers: ",diseasename);
		return axios.get("https://tools.cdc.gov/api/v2/resources/media?", {
			params: {
				q: diseasename
			}
		})
	.then(function(results) {
		console.log("Axios has returned with some results", results);
		return results;
	});
},



// getReact: 
PostReact: function() {
	axios.post('/api')
	.then(function(results){
		console.log(results);
	})
},
getHomePage: function() {
	return axios.get('/api')
	.then(function(results) {
		console.log("Here's your react: ", results)

	});
},

getArticle: function(){
	return axios.get("/api/saved")
		.then(function(results){
			console.log("Axios results from api/saved", results);
			return results;

		});

},

postArticle: function(name, date, url){
	var newArticle = {name: name, date: date, url: url};
	console.log(newArticle);
	
	return axios.post("/api/saved", newArticle)
	.then(function(response){
		console.log(response);

	});
},

deleteSaved: function(name, date, url) {
    return axios.delete("/api/saved", {
      params: {
        "name": name,
        "date": date,
        "url": url
      }
    })
    .then(function(results) {
      console.log("axios results", results);
      return results;
    });
  }
};
	
module.exports = helpers;

