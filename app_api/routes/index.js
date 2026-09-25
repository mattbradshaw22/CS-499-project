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
    
/* GET animal by name. */
router
    .route('/animals/name/:name')
    .get(ctrlAnimals.animalsFindByName);


/* GET animal by ID. */
router
    .route('/animals/:_id')
    .get(ctrlAnimals.animalsReadOne);


module.exports = router;
