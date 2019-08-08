const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: String,
  apiID: String,
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  cost: Number,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;