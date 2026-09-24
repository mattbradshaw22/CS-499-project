// Handles API responses for rescue animal collection requests.

const mongoose = require('mongoose');
const Animal = require('../models/animals');
const Model = mongoose.model('animals');

// GET: /animals - lists all the animals
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const animalsList = async(req, res) => {
  const q = await Model
        .find({})  // no filter, return all records
        .exec();

        // Uncomment the following line to show results of query on the console
        // console.log(q);

    if (!q) 
        { // database returned no data
            return res
                .status(404)
                .json(err);

        } else { //  return resulting animal list
            return res
                .status(200)
                .json(q);
        }

};

// GET: /animals/:_id - lists a single animal record by its MongoDB _id
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const animalsReadOne = async(req, res) => {
    const q = await Model
        .find({'_id' : req.params._id})  // return single record 
        .exec();

        // uncomment the following line to show results of query on the console
        // console.log(q);

        if (!q)
        { // database returned no data
            return res
                .status(404)
                .json(err);

        } else { //  return resulting animal list
            return res
                .status(200)
                .json(q);
        }

};

// POST: /animals - adds a new animal record to the database
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const animalsAddAnimal = async(req, res) => {
    try {
        const animal = await Model.create({
            name: req.body.name,
            animalType: req.body.animalType,
            breed: req.body.breed,
            species: req.body.species,
            gender: req.body.gender,
            age: req.body.age,
            weight: req.body.weight,
            acquisitionDate: req.body.acquisitionDate,
            acquisitionLocation: {
                city: req.body.acquisitionLocation.city,
                state: req.body.acquisitionLocation.state,
                country: req.body.acquisitionLocation.country,
                latitude: req.body.acquisitionLocation.latitude,
                longitude: req.body.acquisitionLocation.longitude
            },
            trainingStatus: req.body.trainingStatus,
            reserved: req.body.reserved,
            graduationDate: req.body.graduationDate,
            description: req.body.description,
            imagePath: req.body.imagePath,
            tailLength: req.body.tailLength,
            height: req.body.height,
            bodyLength: req.body.bodyLength
        });
        return res.status(201).json(animal);
    } catch (err) {
        return res.status(400).json(err);
    }
};

module.exports = {
  animalsList,
  animalsReadOne,
  animalsAddAnimal
};
