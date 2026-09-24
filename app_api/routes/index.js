// Registers API endpoints for rescue animal data.

const express = require('express');
const router = express.Router();
const ctrlAnimals = require('../controllers/animals');

/* GET animals list. 
* POST new animal */

router
    .route("/animals")
    .get(ctrlAnimals.animalsList)
    .post(ctrlAnimals.animalsAddAnimal);

/* GET animal by ID. */
router.get('/animals/:_id', ctrlAnimals.animalsReadOne);

module.exports = router;
