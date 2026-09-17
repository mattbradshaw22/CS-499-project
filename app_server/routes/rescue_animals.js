var express = require('express');
var router = express.Router();
var controller = require('../controllers/rescue_animals');

/* GET rescue_animals page */
router.get('/', controller.rescue_animals);

module.exports = router;
