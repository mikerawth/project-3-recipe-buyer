const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: String,
  usAmount: Number,
  usUnit: { type: String, default: 'units' },
  metricAmount: Number,
  metricUnit: { type: String, default: 'units' },
  price: { type: Number, default: 0.99 },
  include: { type: Boolean, default: true },
  image: String,
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;