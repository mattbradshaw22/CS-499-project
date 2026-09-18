const animals = require('../../data/animals');

exports.index = (req, res) => {
  const reservedAnimals = animals.filter(animal => animal.reserved);
  const featuredAnimal = reservedAnimals[Math.floor(Math.random() * reservedAnimals.length)] || animals[0];

  res.render('index', {
    title: 'Home',
    home: true,
    featuredAnimals: [featuredAnimal]
  });
};

exports.about = (req, res) => res.render('about', { title: 'About', about: true });
