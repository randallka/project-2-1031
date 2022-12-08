const Workout = require("../models/workout");
const Exercise = require("../models/exercise");
const user = require("../models/user");

module.exports = {
    index,
    new: newWorkout,
    show,
    create,
};

async function index(req, res) {
    try {
        const workoutDocs = await Workout.find({});
        res.render('workouts/index', { workouts: workoutDocs })
    } catch (err) {
        console.log(err);
        res.send("error")
    }

}

async function newWorkout(req, res) {
    try {
        const exerciseDocs = await Exercise.find({});
        res.render('workouts/new', { exercises: exerciseDocs });
    } catch (err) {
        console.log(err);
        res.send('error');
    };
};

async function show(req, res) {
    try {
        const workoutDoc = await Workout.findById(req.params.id)
        .populate({
            path: 'exercises._id',
            model: 'Exercise'
       })
       const userDoc = await user.findById(workoutDoc.creator); 
       console.log(userDoc); 
       console.log(workoutDoc);
       console.log(workoutDoc.exercises);
        res.render('workouts/show', {workout : workoutDoc, user : userDoc});
    } catch (err) {
        console.log(err);
        res.send("error")
    }
};

async function create(req, res) {
    try {
        req.body.creator = req.user._id;
        req.body.exercises = [];
        for (const key in req.body) {
            if (key.includes("exercise:")) {
                if (req.body[key][0] === "on") {
                    const exerciseObj = {};
                    exerciseObj._id = key.split(":")[1];
                    exerciseObj.count = req.body[key][1];
                    req.body.exercises.push(exerciseObj);
                    console.log(exerciseObj)
                }
            }
        };
        const workoutDoc = await Workout.create(req.body);
        console.log(workoutDoc);
        res.render('workouts/index')
    } catch (err) {
        console.log(err)
        res.send('error')
    }
}