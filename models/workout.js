const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    Name: String, 
    Description: String,
    Difficulty: { 
        type: Number, 
        min: 1, 
        max: 5, 
    },
    Exercises: [{type: Schema.Types.ObjectId, ref: 'Exercise'}],
    Likes: [{type: Schema.Types.ObjectId, ref: 'User'}], 
    Creator: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  });
  
  // movies collection (if you looked in mongdob, after you put something in it!)
  module.exports = mongoose.model("Workout", workoutSchema);