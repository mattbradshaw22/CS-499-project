var express = require('express');
var router = express.Router();
var ctrlAnimals = require('../controllers/rescue_animals');

/* GET rescue animals page. */
router.get('/', ctrlAnimals.rescue_animals);

module.exports = router;
