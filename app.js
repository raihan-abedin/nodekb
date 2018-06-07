const express = require("express");
const path = require("path"); // no installation needed with express
const mongoose = require("mongoose");

//connect mongodb
mongoose.connect("mongodb://localhost/todos"); //check this- it could be MongoDB
let db = mongoose.connection;

//check DB connection
db.once("open", ()=>{
    console.log("Successfully connected to MongoDB");
});

//check for DB errors
db.on("error", (err)=>{
    console.log(err);
});


//init appp
const app = express();

//bring in models (i.e. todo.js)
let Todo = require("./models/todo");

//load view engine (pug) - 'npm install --save pug'
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug");


//home route
app.get("/", (req, res)=>{
    /*
    let todos = [
        {id:1, title: "ToDo Number One", category: "Important", description: "Todo 1 description"},
        {id:1, title: "ToDo Number Two", category: "Normal", description: "Todo 2 description"},
        {id:1, title: "ToDo Number Three", category: "Important", description: "Todo 3 description"}
    ];
    
    res.render("index", {
        title: "Todos",
        todos: todos
    });*/
    
    Todo.find({}, (err, todos)=>{
        if(err){
            console.log(err);
        } else {
            res.render("index", {
                title: "Raihan ToDo List",
                todos: todos
            });
            console.log({todos});
        }
         
    });
});

//add todo route
app.get("/todos/add", (req, res) => {
    res.render("add_todo", {
        title: "Add new todo"
    });
})


//listen to server
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`ToDo app is listening on port ${port} oka frans...`)
);

//app.listen(3000, ()=> console.log("server started at port 3000..."));