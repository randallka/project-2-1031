const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const exerciseSchema = new Schema({
    Name: String, 
    Description: String,
});

// movies collection (if you looked in mongdob, after you put something in it!)
module.exports = mongoose.model("Exercise", exerciseSchema);