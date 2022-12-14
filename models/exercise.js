const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const exerciseSchema = new Schema({
    name: String, 
    description: String,
});

module.exports = mongoose.model("Exercise", exerciseSchema);