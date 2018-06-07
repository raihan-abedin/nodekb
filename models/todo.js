let mongoose = require("mongoose");

//Todo shcema

let todoSchema = mongoose.Schema({
    title:{type: String, required: true},
    category:{type: String, required: true},
    description:{type: String, required: true},
});

let Todo = module.exports = mongoose.model("Todo", todoSchema);