const router = require('express').Router();
const workoutCtrl = require('../controllers/workouts')
router.get('/', workoutCtrl.index);
module.exports = router;