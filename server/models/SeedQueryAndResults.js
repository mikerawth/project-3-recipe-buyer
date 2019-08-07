const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seedQueryAndResultsSchema = new Schema({
  query: String,
  results: Array,
});

const SeedQueryAndResults = mongoose.model('seedQueryAndResults', seedQueryAndResultsSchema);

module.exports = SeedQueryAndResults;