const router = require('express').Router();
const exerciseCtrl = require('../controllers/exercise');

router.get('/new', exerciseCtrl.new);
router.post('/', exerciseCtrl.create);
module.exports = router;