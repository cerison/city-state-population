
const mongoose = require("mongoose");

const Population = mongoose.model("Population");

async function getPopulationByCityState(state, city) {
    state = state.toLowerCase();
    city = city.toLowerCase();
  
    try {
      const population = await Population.findOne({ state, city });
      if (!population) {
        return null;
      }
      return population.population;
    } catch (error) {
      throw error;
    }
  }
  
  async function setPopulationByCityState(state, city, population) {
    state = state.toLowerCase();
    city = city.toLowerCase();
  
    try {
      let populationRecord = await Population.findOne({ state, city });
  
      if (populationRecord) {
        populationRecord.population = population;
        await populationRecord.save();
        return 'Population updated';
      } else {
        // If the record doesn't exist, create a new one
        populationRecord = new Population({ state, city, population });
        await populationRecord.save();
        return 'Population created';
      }
    } catch (error) {
      throw error;
    }
  }


module.exports.getPopulationByCityState = async function (req, res) {
    const state = req.params.state;
    const city = req.params.city;
  
    try {
      const population = await getPopulationByCityState(state, city);
      if (population === null) {
        return res.status(400).json({ error: 'State or city not found' });
      }
  
      res.status(200).json({ population });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.setPopulationByCityState = async function (req, res) {
    const state = req.params.state;
    const city = req.params.city;
    const population = parseInt(req.body);
  
    if (isNaN(population)) {
      return res.status(400).json({ error: 'Invalid population format' });
    }
  
    try {
      const message = await setPopulationByCityState(state, city, population);
      res.status(message === 'Population created' ? 201 : 200).json({ message });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
}