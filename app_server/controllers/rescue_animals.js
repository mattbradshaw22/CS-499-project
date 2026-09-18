const animals = require('../../data/animals');

exports.rescue_animals = (req, res) => res.render('rescue_animals', {
  title: 'See All Animals',
  all: true,
  animals,
  count: animals.length
});

exports.find = (req, res) => res.render('find', {
  title: 'Find an Animal',
  find: true,
  animals,
  count: animals.length
});

exports.intake = (req, res) => res.render('intake', {
  title: 'Animal Intake',
  intake: true
});
