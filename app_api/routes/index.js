var express = require('express');
var router = express.Router();
var ctrlAnimals = require('../controllers/animals');

/* GET animals list. */
router.get('/animals', ctrlAnimals.animalsList);

/* GET animal by ID. */
router.get('/animals/:animalId', ctrlAnimals.animalsReadOne);

module.exports = router;
