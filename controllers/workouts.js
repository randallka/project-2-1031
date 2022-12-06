const Workout = require("../models/workout");

// Import the performer model
const Exercise = require("../models/exercise");

module.exports = {
  index
};

function index(req, res) { 
    res.render('workouts/index')
}