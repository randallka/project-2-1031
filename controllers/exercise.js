const Exercise = require("../models/exercise");

module.exports = {
    create,
    new: newExercise,
}; 

async function create(req, res) { 
    try { 
        console.log(req.body);
        const exerciseDoc = await Exercise.create(req.body); 
        console.log(exerciseDoc);
        res.redirect('workouts/new');
    } catch(err){ 
        console.log(err) 
        res.send('error')
    } 
}

function newExercise(req, res) { 
    res.render('exercise/new');
};