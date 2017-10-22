// Include Server Dependencies

 var express = require("express");
 var bodyParser = require("body-parser");
 var logger  = require("morgan");
 var mongoose  = require("mongoose");
 var Article = require("./server/article");

// Create a new express app
 var app = express();

// Sets an initial port. We'll use this later in our listener
 var PORT = process.env || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB configuration
mongoose.connect("mongodb://heroku_89thh096:vo7ncpqck3b3vv15l1up0aovc0@ds125262.mlab.com:25262/heroku_89thh096");

 var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// ---------------------- ROUTES ----------------------

// sends index.html for homepage.
app.get('/', function(req,res){
	res.send("index.html");
});

// retrieves saved articles from DB when /api/saved is accessed.
app.get("/api/saved", function(req,res){
	Article.find({})
	.exec(function(err,article){
		if (err) {
			console.log(err);
		}
		else{
			res.json(article);
		}
	});

});

// posts new articles to /api/saved. Saves new articles to DB.
app.post('/api/saved', function(req,res){
	console.log("req.body in server /post " + JSON.stringify(req.body));
	var newArticle = new Article (req.body);
	newArticle.save(function(err,article){
		if (err) {
			console.log(err);
		}
		else {
			console.log(article);
			res.json(article);
		}
	});
});


app.listen(PORT,function(){
console.log("App listening on port 3000!");
});
