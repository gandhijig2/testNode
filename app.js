var express =require ("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


//mongoose connection

mongoose.connect("mongodb://localhost/todo");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//mongoose schema
var todoSchema = new mongoose.Schema({
    name: String
});

var Todo = mongoose.model("Todo", todoSchema);

// var todoList = [
//     "wash the car",
//     "buy grocerices"
// ]

//default route
app.get("/", function(req, res){
    Todo.find({}, function(err, todoList){
        if(err) console.log(err);
        else{
            res.render("index.ejs" , {todoList: todoList});
        }
    })
    
});


//submit button route

app.post("/newtodo", function(req,res){
    console.log("item submited");
    var newItem = new Todo({
        name:req.body.item
    });
    Todo.create(newItem, function(err, Todo){
        if(err) console.log(err);
        else{
            console.log("Inserted Item:" +newItem);
        }
    })
   
    res.redirect("/");
});

app.get("*", function(req,res){
    res.send("<h1>invalid page</h1>");
});


app.listen(5000,function(){
    console.log("server started on port 3000");
});


