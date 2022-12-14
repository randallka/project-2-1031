const router = require('express').Router();
const workoutCtrl = require('../controllers/workouts');
const isLoggedIn = require('../config/auth');
router.get('/', workoutCtrl.index);
router.get('/new', isLoggedIn, workoutCtrl.new);
router.get('/myWorkouts', workoutCtrl.showUser);
router.post('/', workoutCtrl.create);
router.get('/:id/edit', workoutCtrl.edit);
router.post('/:id/like', workoutCtrl.like)
router.get('/:id', workoutCtrl.show);
router.put('/:id', workoutCtrl.update);
router.delete('/:id', workoutCtrl.delete);
module.exports = router;