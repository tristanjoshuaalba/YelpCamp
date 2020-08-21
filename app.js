// IMPORT PRELIMINARIES
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

// CONFIGURE EXPRESS APP
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// ROUTE: ROOT
app.get("/",function(req, res){
	res.render("landing")
});

// CAMPGROUNDS: [{name: name, image:image URL}]
var campgrounds = [
		{name:"Salmon Creek",
		image: "https://q-cf.bstatic.com/images/hotel/max1024x768/156/156626904.jpg"},
		{name:"Granite Hill", 
		image: "https://c8.alamy.com/comp/AAA2K5/rocky-granite-hill-country-scenery-AAA2K5.jpg"},
		{name:"Help Camp",
		image:"https://glenworth.com.au/wp-content/uploads/2018/02/ARC8133-627x385.jpg"}
	]

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds:campgrounds})
});



// CREATE FORM
// ROUTE: FORM
app.get("/campgrounds/new", function(req, res){
	res.render("new")
})

// ROUTE: POST, ADD NEW CAMPGROUNDS
app.post("/campgrounds", function(req, res){
	// GET DATA FROM FORM AND ADD TO CAMPGROUNDS ARRAY
	var nameC = req.body.name
	var urlC = req.body.image
	
	campgrounds.push({name:nameC, image:urlC})
	
	res.redirect("/campgrounds")
	
	// REDIRECT TO CAMPGROUNDS PAGE
})


// ROUTE: LISTEN (PORT = 3000)
app.listen(3000, function(req, res){
	console.log('SERVER STARTING ON PORT = 3000')
});