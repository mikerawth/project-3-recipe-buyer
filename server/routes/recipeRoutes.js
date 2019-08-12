const express = require('express');
const router = express.Router();
const axios = require('axios');

const SeedQueryAndResults = require('../models/SeedQueryAndResults')
const SeedRecipe = require('../models/SeedRecipe')



function generateFoodApi(queryString) {
  return (
    axios.create({
      baseURL: `${process.env.APIBASEURL}${queryString}`,
      headers: {
        'x-rapidapi-key': process.env.APIKEY,
        'x-rapidapi-host': process.env.APIHOST
      }
    })
  )
}

router.post('/search/:theQuery', (req, res, next) => {

  SeedQueryAndResults.findOne({ query: req.params.theQuery })
    .then((theQuery) => {
      if (theQuery) {
        res.json(theQuery)
      }
      else {
        const theSearch = `/recipes/search/?query=${req.params.theQuery}`

        generateFoodApi(theSearch).get()
          .then((theResult) => {
            SeedQueryAndResults.create({
              query: req.params.theQuery,
              results: theResult.data.results,
            })
              .then((theCreatedQuery) => {
                res.json(theCreatedQuery) // returns array of recipes
              })
              .catch((err) => {
                res.json(err)
              })
          })
          .catch((err) => {
            res.json(err)
          })
      }
    })
    .catch((err) => {
      res.json(err)
    })
})


// Checks to see if Recipe was already created
// If already in DB, then pass in that recipe
// If not, then call to Spoonacular, get the info, and create the recipe on my end
router.get('/:recipeID/information', (req, res, next) => {
  // check if recipeID exists in my seedRecipe
  SeedRecipe.findOne({ spoonID: req.params.recipeID })
    .then((theResult) => {
      if (theResult) {
        // if it does, then send to React Side
        res.json(theResult)
      } else {
        const priceSearch = `/recipes/${req.params.recipeID}/priceBreakdownWidget.json`
        generateFoodApi(priceSearch).get()
          .then((recipePriceObject) => {
            let grabbedIngredients = recipePriceObject.data.ingredients.map((eachI) => {
              return ({
                name: eachI.name,
                usAmount: Number((eachI.amount.us.value).toFixed(2)),
                usUnit: eachI.amount.us.unit,
                metricAmount: Number((eachI.amount.metric.value).toFixed(2)),
                metricUnit: eachI.amount.metric.unit,
                price: Number((eachI.price / 100).toFixed(2)),
                image: `https://spoonacular.com/cdn/ingredients_100x100/${eachI.image}`
              })
            })
            const theSearch = `/recipes/${req.params.recipeID}/information`
            generateFoodApi(theSearch).get()
              .then((spoonData) => {
                const tagsArray = ['vegetarian', 'vegan', 'glutenFree', 'dairyFree', 'veryHealthy', 'cheap', 'veryPopular', 'sustainable', 'lowFodmap', 'ketogenic', 'whole30']
                let grabbedTags = [];
                tagsArray.forEach((eachT) => {
                  if (spoonData.data[eachT]) { grabbedTags.push(eachT) }
                })
                let totalCost = 0;
                grabbedIngredients.forEach((eachI) => {
                  totalCost += eachI.price;
                })
                SeedRecipe.create({
                  spoonID: spoonData.data.id,
                  title: spoonData.data.title,
                  ingredients: grabbedIngredients,
                  instructions: spoonData.data.analyzedInstructions[0].steps,
                  tags: grabbedTags,
                  cost: Number(totalCost.toFixed(2)),
                  image: spoonData.data.image
                })
                  .then((freshlyCreatedRecipe) => {
                    res.json(freshlyCreatedRecipe)
                  })
                  .catch((err) => {
                    res.json(err)
                  })
              })
              .catch((err) => {
                res.json(err)
              })
          })
          .catch((err) => {
            res.json(err)
          })
      }
    })
    .catch((err) => {
      res.json(err)
    })
})


module.exports = router;