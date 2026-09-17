const animals = require('./animals');
const animalTypeOptions = ['Dog', 'Monkey'];
const options = value => animalTypeOptions.map(name => ({ name, selected: name === value }));
exports.rescue_animals = (req, res) => res.render('rescue_animals', {
  title: 'See All Animals', all: true, animals, count: animals.length, added: req.query.added === '1'
});
exports.find = (req, res) => {
  const query = typeof req.query.q === 'string' ? req.query.q.trim().slice(0, 100) : '';
  const animalType = typeof req.query.animalType === 'string' ? req.query.animalType : '';
  const results = animals.filter(animal => (!animalType || animal.animalType === animalType) &&
    [animal.name, animal.breed, animal.inServiceCountry, animal.trainingStatus, animal.description].filter(Boolean).join(' ').toLowerCase().includes(query.toLowerCase()));
  res.render('find', { title: 'Find an Animal', find: true, animals: results, count: results.length, query, animalTypeOptions: options(animalType) });
};
exports.intake = (req, res) => res.render('intake', { title: 'Animal Intake', intake: true, animalTypeOptions: options('') });
exports.create = (req, res) => {
  const values = {};
  for (const field of ['name', 'animalType', 'age', 'description']) values[field] = typeof req.body[field] === 'string' ? req.body[field].trim() : '';
  if (!values.name || values.name.length > 60 || !animalTypeOptions.includes(values.animalType) || !values.age || values.age.length > 40 || !values.description || values.description.length > 600) {
    return res.status(400).render('intake', { title: 'Animal Intake', intake: true, values, animalTypeOptions: options(values.animalType), error: 'Please complete every field and keep your description under 600 characters.' });
  }
  animals.push({ ...values, trainingStatus: 'intake', reserved: false, inServiceCountry: 'none' });
  res.redirect('/rescue_animals?added=1');
};
