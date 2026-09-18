const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const app = require('../app');
const animals = require('../data/animals');

const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

function request(server, requestPath) {
  const { port } = server.address();

  return new Promise((resolve, reject) => {
    const req = http.get({ port, path: requestPath }, res => {
      let body = '';

      res.setEncoding('utf8');
      res.on('data', chunk => {
        body += chunk;
      });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body });
      });
    });

    req.on('error', reject);
  });
}

test('animal records include the fields used by the views', () => {
  assert.equal(animals.length, 40);

  for (const animal of animals) {
    assert.ok(animal.id, `${animal.name} is missing id`);
    assert.ok(animal.name, `${animal.id} is missing name`);
    assert.match(animal.animalType, /^(Dog|Monkey)$/);
    assert.ok(animal.gender, `${animal.name} is missing gender`);
    assert.ok(animal.age, `${animal.name} is missing age`);
    assert.ok(animal.weight, `${animal.name} is missing weight`);
    assert.ok(animal.acquisitionDate, `${animal.name} is missing acquisitionDate`);
    assert.ok(animal.trainingStatus, `${animal.name} is missing trainingStatus`);
    assert.equal(typeof animal.reserved, 'boolean', `${animal.name} reserved must be boolean`);
    assert.ok(animal.imagePath, `${animal.name} is missing imagePath`);

    assert.ok(animal.acquisitionLocation, `${animal.name} is missing acquisitionLocation`);
    assert.ok(animal.acquisitionLocation.city, `${animal.name} is missing acquisition city`);
    assert.ok(animal.acquisitionLocation.state, `${animal.name} is missing acquisition state`);
    assert.ok(animal.acquisitionLocation.country, `${animal.name} is missing acquisition country`);
    assert.equal(typeof animal.acquisitionLocation.latitude, 'number');
    assert.equal(typeof animal.acquisitionLocation.longitude, 'number');

    if (animal.animalType === 'Dog') {
      assert.ok(animal.breed, `${animal.name} dog record is missing breed`);
    }

    if (animal.animalType === 'Monkey') {
      assert.ok(animal.species, `${animal.name} monkey record is missing species`);
      assert.ok(animal.tailLength, `${animal.name} monkey record is missing tailLength`);
      assert.ok(animal.height, `${animal.name} monkey record is missing height`);
      assert.ok(animal.bodyLength, `${animal.name} monkey record is missing bodyLength`);
    }
  }
});

test('all image paths point to files in public', () => {
  for (const animal of animals) {
    const imageFile = path.join(__dirname, '..', 'public', animal.imagePath);
    assert.ok(fs.existsSync(imageFile), `${animal.name} image does not exist: ${animal.imagePath}`);
  }
});

test('animal ids and acquisition locations are unique', () => {
  const ids = new Set(animals.map(animal => animal.id));
  const locations = new Set(animals.map(animal => `${animal.acquisitionLocation.city}, ${animal.acquisitionLocation.state}`));

  assert.equal(ids.size, animals.length);
  assert.equal(locations.size, animals.length);
});

test('website routes render expected pages', async () => {
  const server = app.listen(0);

  try {
    const home = await request(server, '/');
    assert.equal(home.statusCode, 200);
    assert.match(home.body, /Animal Rescue System/);
    assert.match(home.body, /SearchAndRescueDog\.jfif/);
    assert.match(home.body, /SearchAndRescueDog2\.jfif/);
    assert.match(home.body, /Featured Animal/);
    assert.equal((home.body.match(/animal-card/g) || []).length, 1);

    const featuredAnimal = animals.find(animal => home.body.includes(`<h3>${animal.name}</h3>`));
    assert.ok(featuredAnimal, 'home page should display a featured animal from data/animals.js');
    assert.equal(featuredAnimal.reserved, true, 'featured animal should be reserved');

    const allAnimals = await request(server, '/rescue_animals');
    assert.equal(allAnimals.statusCode, 200);
    assert.match(allAnimals.body, /Rescue Animals/);
    assert.match(allAnimals.body, /Rocky/);
    assert.match(allAnimals.body, /Kiki/);
    assert.match(allAnimals.body, /animal-card/);
    assert.match(allAnimals.body, /<dt>Breed<\/dt>/);
    assert.match(allAnimals.body, /<dt>Species<\/dt>/);
    assert.match(allAnimals.body, /<dt>Tail Length<\/dt>/);

    const findAnimal = await request(server, '/find-an-animal');
    assert.equal(findAnimal.statusCode, 200);
    assert.match(findAnimal.body, /Find an Animal/);
    assert.match(findAnimal.body, /Rocky/);
    assert.match(findAnimal.body, /Kiki/);
    assert.match(findAnimal.body, /animal-card/);

    const intake = await request(server, '/animal-intake');
    assert.equal(intake.statusCode, 200);
    assert.match(intake.body, /ANIMAL INTAKE/);
    assert.doesNotMatch(intake.body, /<form/i);
  } finally {
    server.close();
  }
});

(async () => {
  let failures = 0;

  for (const { name, fn } of tests) {
    try {
      await fn();
      console.log(`PASS ${name}`);
    } catch (error) {
      failures += 1;
      console.error(`FAIL ${name}`);
      console.error(error);
    }
  }

  if (failures > 0) {
    process.exitCode = 1;
  }
})();
