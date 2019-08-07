const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient')


// Create
// Will need to use with Spoonacular API
router.post('/', (req, res, next) => {

  //not adding value from req.body
  Ingredient.create(req.body)
    .then((singleIngredient) => {
      res.json(singleIngredient);
    })
    .catch((err) => {
      res.json(err);
    })


})



// Read

// List all ingredients
// Will Probably not be used
router.get('/', (req, res, next) => {

  Ingredient.find()
    .then((allTheIngredients) => {
      res.json(allTheIngredients);
    })
    .catch((err) => {
      res.json(err);
    })
});

//List single Ingredient
router.get('/details/:id', (req, res, next) => {
  Ingredient.findById(req.params.id)
    .then((singleIngredient) => {
      res.json(singleIngredient);
    })
    .catch((err) => {
      res.json(err);
    })
})




// Update
router.post('/update/:id', (req, res, next) => {
  Ingredient.findByIdAndUpdate(req.params.id, {
    name: req.body.theName,
  })
    .then((singleIngredient) => {
      res.json(singleIngredient);
    })
    .catch((err) => {
      res.json(err);
    })
})



// Delete
router.delete('/:id', (req, res, next) => {

  Ingredient.findByIdAndRemove(req.params.id)
    .then((singleIngredient) => {
      res.json(singleIngredient);
    })
    .catch((err) => {
      res.json(err);
    })

})




module.exports = router;
