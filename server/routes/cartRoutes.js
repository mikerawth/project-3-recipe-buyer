const express = require('express');
const router = express.Router();

const Ingredient = require('../models/Ingredient')
const Recipe = require('../models/Recipe')
const User = require('../models/User')

router.post('/addRecipeAndIngredients', (req, res, next) => {
  const ingredients = req.body.theIngredients;
  const recipeApiID = req.body.recipeApiID;
  const recipeName = req.body.recipeName;
  const recipeCost = req.body.recipeCost;

  const arrayOfIng = [];


  ingredients.forEach((eachIngredient) => {

    arrayOfIng.push(Ingredient.create({
      name: eachIngredient.name,
      usAmount: eachIngredient.usAmount,
      usUnit: eachIngredient.usUnit,
      metricAmount: eachIngredient.metricAmount,
      metricUnit: eachIngredient.metricUnit,
      price: eachIngredient.price,
    }))
  })
  Promise.all(arrayOfIng)
    .then((eachThing) => {


      arrayOfIngIDs = eachThing.map((eachIng) => {
        return eachIng._id;
      })


      Recipe.create({
        name: recipeName,
        apiID: recipeApiID,
        ingredients: arrayOfIngIDs,
        cost: recipeCost,
      })
        .then((theCreatedRecipe) => {
          console.log(theCreatedRecipe._id)
          User.findByIdAndUpdate(req.user._id, {
            $push: { cart: theCreatedRecipe._id },
          })
            .then((response) => {
              res.json(response)
            })
            .catch((err) => {
              res.json(err)
            })
        })
        .catch((err) => {
          res.json(err)
        })
    })

})

// removes ALL Ingredients
router.post('/removeIngredients', (req, res, next) => {
  Ingredient.deleteMany()
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.get('/getIngredients', (req, res, next) => {
  Ingredient.find()
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.post('/usersCart', (req, res, next) => {
  User.findById(req.user._id).populate({
    path: 'cart',
    populate: {
      path: 'ingredients',
      model: 'Ingredient'
    }
  })
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.get('/ing/:theID', (req, res, next) => {
  Ingredient.findById(req.params.theID)
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.post('/ing/', (req, res, next) => {
  let theID = req.body.theID
  Ingredient.findById(theID)
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.post('/ing/toggle/', (req, res, next) => {
  const theID = req.body.ingID;
  const bool = !req.body.currentStatus;

  Ingredient.findByIdAndUpdate(theID, {
    include: bool
  })
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.json(err)
    })
})


router.delete('/recipe/single', (req, res, next) => {
  const theID = req.body.recipeID;

  Recipe.findById(theID)
    .then((theRecipe) => {

      theRecipe.ingredients.forEach((eachIngID) => {
        Ingredient.findByIdAndDelete(eachIngID)
      })

      Recipe.findByIdAndDelete(theID)
        .then((response) => {
          res.json(response)
        })
        .catch((err) => {
          res.json(err)
        })
    })
    .catch((err) => {
      res.json(err)
    })
})

router.delete('/recipe/ingredients', (req, res, next) => {
  const theID = req.body.recipeID;

  Recipe.findById(theID)
    .then((theRecipe) => {

      theRecipe.ingredients.forEach((eachIngID) => {
        Ingredient.findByIdAndDelete(eachIngID)
          .then((response) => {
            res.json(response)
          })
          .catch((err) => {
            res.json(err)
          })
      })
    })
    .catch((err) => {
      res.json(err)
    })
})

router.delete('/allUsersRecipesAndIngredients', (req, res, next) => {
  User.deleteMany()
    .then(() => {
      Recipe.deleteMany()
        .then(() => {
          Ingredient.deleteMany()
            .then((response) => {
              res.json(response)
            })
            .catch((err) => {
              res.json(err)
            })
        })
    })
    .catch((err) => {
      res.json(err)
    })
})

module.exports = router;