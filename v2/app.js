// IMPORT PRELIMINARIES
var express    = require('express'),
	app        = express(),
	bodyParser = require('body-parser'),
	request    = require('request'),
// 	ADDING MONGOOSE
	mongoose   = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


mongoose.connect("mongodb://localhost/yelp_camp");
// mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});


// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
	image : String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


// Campground.create(
// 	{name:"Salmon Creek",
// 	image: "https://q-cf.bstatic.com/images/hotel/max1024x768/156/156626904.jpg",
// 	description: "This is a huge Salmon Creek. With 5-star quality amenities"}
// , function(err, campground){
//     if(err){
//         console.log("ERROR!");
//         console.log(err);
//     } else{
//         console.log("THE CAMPGROUND HAS BEEN SAVED");
//         console.log(campground);
//     }
// });

// Campground.create(
// 	{name:"Granite Hill",
// 	image: "https://c8.alamy.com/comp/AAA2K5/rocky-granite-hill-country-scenery-AAA2K5.jpg"}
// , function(err, campground){
//     if(err){
//         console.log("ERROR!");
//         console.log(err);
//     } else{
//         console.log("THE CAMPGROUND HAS BEEN SAVED");
//         console.log(campground);
//     }
// });


// Campground.create(
// 	{name:"Help Camp",
// 	image: "https://glenworth.com.au/wp-content/uploads/2018/02/ARC8133-627x385.jpg"}
// , function(err, campground){
//     if(err){
//         console.log("ERROR!");
//         console.log(err);
//     } else{
//         console.log("THE CAMPGROUND HAS BEEN SAVED");
//         console.log(campground);
//     }
// });

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

// ROUTE: INDEX
app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allCampground){
    if(err){
        console.log("ERROR! PLEASE CHECK MONGODB...");
        console.log(err);
    } else{
        // console.log("ALL THE AWESOME CAMPGROUNDS: ");
        // console.log(campground);
		res.render("index", {campgrounds:allCampground})
    }
});
});



// CREATE FORM
// ROUTE: NEW - SHOW FORM TO CREATE NEW CAMPGROUNDS
app.get("/campgrounds/new", function(req, res){
	res.render("new")
})

// ROUTE: CREATE - POST AND ADD NEW CAMPGROUNDS
app.post("/campgrounds", function(req, res){
	// GET DATA FROM FORM AND ADD TO CAMPGROUNDS ARRAY
	var name = req.body.name,
		image = req.body.image,
		description = req.body.description,
		newCampground = {name:name, 
						 image:image,
						description:description}

	// campgrounds.push({name:nameC, image:urlC})
	
	// CREATE A NEW CAMPGROUND AND SAVE INTO DATABASE
	Campground.create(newCampground, 
					  function(err, campground){
							if(err){
								console.log("ERROR!");
								console.log(err);
							} else{
								console.log("NEW CAMPGROUND HAS BEEN SAVED");
								console.log(campground);
							}
						});

	res.redirect("/campgrounds")
	
	// REDIRECT TO CAMPGROUNDS PAGE
})

// ROUTE: SHOW
app.get("/campgrounds/:id",function(req, res){
	// FIND THE CAMPGROUND WITH THE PROVIDED ID 
	
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log("ERROR: PLEASE CHECK")
		} else {
	
	// RENDER SHOW TEMPLATE WITH THAT CAMPGROUND
			res.render("show", {campground: foundCampground})
		}
	})
	// res.send("THIS WILL BE A SHOW PAGE")
})








// ROUTE: LISTEN (PORT = 3000)
app.listen(3000, function(req, res){
	console.log('SERVER STARTING ON PORT = 3000')
});