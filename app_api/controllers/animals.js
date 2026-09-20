var animals = require('../../data/animals');

/* GET animal list */
const animalsList = (req, res) => {
  res.status(200).json(animals);
};

/* GET animal by ID */
const animalsReadOne = (req, res) => {
  const animalId = Number(req.params.animalId);
  const animal = animals.find(record => record.id === animalId);

  if (!animal) {
    return res.status(404).json({ message: 'Animal not found' });
  }

  return res.status(200).json(animal);
};

module.exports = {
  animalsList,
  animalsReadOne
};
