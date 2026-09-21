// Handles rendering for public website pages including home, about, intake, and find.

var animals = require('../../data/animals');

/* GET Homepage */
const index = (req, res) => {
  const reservedAnimals = animals.filter(animal => animal.reserved);
  const featuredAnimal = reservedAnimals[Math.floor(Math.random() * reservedAnimals.length)] || animals[0];

  res.render('index', {
    title: 'Home',
    home: true,
    featuredAnimals: [featuredAnimal]
  });
};

/* GET About page */
const about = (req, res) => {
  res.render('about', { title: 'About', about: true });
};

module.exports = {
  index,
  about
};
