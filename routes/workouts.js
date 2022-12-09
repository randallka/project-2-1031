const router = require('express').Router();
const workoutCtrl = require('../controllers/workouts');
const isLoggedIn = require('../config/auth');
router.get('/', workoutCtrl.index);
router.get('/new', isLoggedIn, workoutCtrl.new);
router.get('/myWorkouts', workoutCtrl.showUser);
router.get('/:id/edit', workoutCtrl.edit);
router.get('/:id', workoutCtrl.show);
router.post('/', workoutCtrl.create);
module.exports = router;