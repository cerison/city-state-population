
const express = require('express');
const populationController = require('../controllers/populationController');

const router = express.Router();

router.route('/state/:state/city/:city')
.get(populationController.getPopulationByCityState)
.put(populationController.setPopulationByCityState)

module.exports = router;