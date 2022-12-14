const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
    name: String, 
    description: String,
    difficulty: { 
        type: Number, 
        min: 1, 
        max: 5, 
    },
        exercises: [{
        id: { type: Schema.Types.ObjectId, ref: 'Exercise' },
        count: String}],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  },
  {
    timestamps: true,
  });
  
  module.exports = mongoose.model("Workout", workoutSchema);