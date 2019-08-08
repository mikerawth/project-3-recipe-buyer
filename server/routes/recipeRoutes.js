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

function getRecipeIngPricingObject(recipeID) {
  const priceSearch = `/recipes/${recipeID}/priceBreakdownWidget.json`

  generateFoodApi(priceSearch).get()
    .then((recipePriceObject) => {
      let nameArr = recipePriceObject.data.ingredients.map((eachIng) => {
        return eachIng.name
      })

      let priceArr = recipePriceObject.data.ingredients.map((eachIng) => {
        return eachIng.price
      })

      let myPriceObject = {}
      for (let i = 0; i < nameArr.length; i++) {
        myPriceObject[nameArr[i]] = priceArr[i]
      }
      return myPriceObject;

    })
    .catch((err) => {
      res.json(err)
    })
}

router.get('/', (req, res, next) => {
  res.json(foodApi)
})


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


        const priceSearch = `/recipes/219957/priceBreakdownWidget.json`

        generateFoodApi(priceSearch).get()
          .then((recipePriceObject) => {
            let grabbedIngredients = recipePriceObject.data.ingredients.map((eachI) => {
              console.log(eachI)
              return ({
                name: eachI.name,
                usAmount: Number((eachI.amount.us.value).toFixed(2)),
                usUnit: eachI.amount.us.unit,
                metricAmount: Number((eachI.amount.metric.value).toFixed(2)),
                metricUnit: eachI.amount.metric.unit,
                price: Number((eachI.price / 100).toFixed(2)),
              })
            })

            const theSearch = `/recipes/${req.params.recipeID}/information`

            generateFoodApi(theSearch).get()
              .then((spoonData) => {

                const tagsArray = [
                  'vegetarian',
                  'vegan',
                  'glutenFree',
                  'dairyFree',
                  'veryHealthy',
                  'cheap',
                  'veryPopular',
                  'sustainable',
                  'lowFodmap',
                  'ketogenic',
                  'whole30']


                let grabbedTags = [];
                tagsArray.forEach((eachT) => {
                  if (spoonData.data[eachT]) {
                    grabbedTags.push(eachT)
                  }
                })


                SeedRecipe.create({
                  spoonID: spoonData.data.id,
                  title: spoonData.data.title,
                  ingredients: grabbedIngredients,
                  instructions: spoonData.data.analyzedInstructions[0].steps,
                  tags: grabbedTags,
                })
                  .then((freshlyCreatedRecipe) => {
                    res.json(freshlyCreatedRecipe)
                  })
                  .catch((err) => {
                    res.json(err)
                  })
                // res.json(response.data) // should return summary of a single recipe
              })
              .catch((err) => {
                res.json(err)
              })





            // code ends here
          })
          .catch((err) => {
            res.json(err)
          })


      }
    })
    .catch((err) => {
      res.json(err)
    })

  // once created, then pass my seedRecipe that I just created


})


// get ingredients for recipe
// CHANGE TO USE FOR ONLY PRICE.  GET INGREDIENTS THROUGH INFORMATION
router.get('/:recipeID/price', (req, res, next) => {
  const theSearch = `/recipes/${req.params.recipeID}/priceBreakdownWidget.json`
  generateFoodApi(theSearch).get()
    .then((response) => {
      res.json(response.data) // should return summary of a single recipe
    })
    .catch((err) => {
      res.json(err)
    })
})

router.get('/test/', (req, res, next) => {
  // const theSearch = `/recipes/${req.params.recipeID}/priceBreakdownWidget.json`
  // generateFoodApi(theSearch).get()


  const priceSearch = `/recipes/219957/priceBreakdownWidget.json`

  generateFoodApi(priceSearch).get()
    .then((recipePriceObject) => {
      let nameArr = recipePriceObject.data.ingredients.map((eachIng) => {
        return eachIng.name
      })

      let priceArr = recipePriceObject.data.ingredients.map((eachIng) => {
        return Number.parseFloat((eachIng.price / 100).toFixed(2))
      })

      let myPriceObject = {}
      for (let i = 0; i < nameArr.length; i++) {
        myPriceObject[nameArr[i]] = priceArr[i]
      }







      res.json(recipePriceObject.data.ingredients)
    })
    .catch((err) => {
      res.json(err)
    })
})

module.exports = router;