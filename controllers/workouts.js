const Workout = require("../models/workout");
const Exercise = require("../models/exercise");
const user = require("../models/user");

module.exports = {
    index,
    new: newWorkout,
    show,
    create,
    showUser,
    edit,
    update,
    delete: deleteWorkout,
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
                }
            }
        };
        const workoutDoc = await Workout.create(req.body);
        res.redirect('workouts/index')
    } catch (err) {
        console.log(err)
        res.send('error')
    }
}

async function showUser(req, res) { 
    try { 
        const createdDocs = await Workout.find({'creator' : { $in : req.user._id}});  
        res.render("workouts/user", {user : req.user, workouts : createdDocs});
    } catch(err) { 
        console.log(err) 
        res.send("error")
    }
}

async function edit(req, res) { 
    try { 
        const workoutDoc = await Workout.findById(req.params.id)
        .populate({
        path: 'exercises._id',
        model: 'Exercise'
   }); 
    const exerciseDocs = await Exercise.find({});
    res.render('workouts/edit', {workout : workoutDoc, exercises: exerciseDocs});
    } catch (err) { 
        console.log(err); 
        res.send("eror");
    }
}; 
async function update(req, res) { 
    try {
        const workoutDoc = await Workout.findById(req.params.id);
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
        workoutDoc.name = req.body.name;
        workoutDoc.description = req.body.description;
        workoutDoc.difficulty = req.body.difficulty; 
        workoutDoc.exercises = req.body.exercises;
        workoutDoc.save();
        res.redirect(`/workouts/${req.params.id}`)
    } catch (err) {
        console.log(err);
        res.send('error');
    }
};

async function deleteWorkout(req, res) { 
    try { 
        const workoutDoc = await Workout.findById(req.params.id);
        await Workout.deleteOne(workoutDoc);
        res.redirect('/workouts/myWorkouts');
    } catch (err) { 
        console.log(err); 
        res.send("error");
    }
}