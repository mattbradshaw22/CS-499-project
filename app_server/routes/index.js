var express = require('express');
var router = express.Router();
const main = require('../controllers/main');
const animals = require('../controllers/rescue_animals');
router.get('/', main.index);
router.get('/about', main.about);
router.get('/animal-intake', animals.intake);
router.get('/find-an-animal', animals.find);
module.exports = router;
