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
  const recipeImg = req.body.recipeImg;
  const arrayOfIng = [];
  ingredients.forEach((eachIngredient) => {
    arrayOfIng.push(Ingredient.create({
      name: eachIngredient.name,
      usAmount: eachIngredient.usAmount,
      usUnit: eachIngredient.usUnit,
      metricAmount: eachIngredient.metricAmount,
      metricUnit: eachIngredient.metricUnit,
      price: eachIngredient.price,
      image: eachIngredient.image,
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
        image: recipeImg,
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
  const ingID = req.body.ingID;
  const bool = !req.body.currentStatus;
  const recipeID = req.body.recipeID

  Ingredient.findByIdAndUpdate(ingID, {
    include: bool
  })
    .then(() => {
      // grab all ingredients in recipe
      Recipe.findById(recipeID).populate('ingredients')
        .then((theRecipe) => {
          let priceArray = theRecipe.ingredients.map((eachIng) => {
            if (eachIng.include) {
              return eachIng.price
            }
          })
          let recipePrice = priceArray.reduce((a, b) => {
            // if b is not null
            if (b) {
              return a + b
            }
            else {
              return a
            }
          }, 0)
          Recipe.findByIdAndUpdate(recipeID, {
            cost: Number(recipePrice.toFixed(2))
          }, { new: true })
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
    .catch((err) => {
      res.json(err)
    })
})


router.post('/checkout', (req, res, next) => {
  User.findById(req.user._id).populate({
    path: 'cart',
    populate: {
      path: 'ingredients',
      model: 'Ingredient'
    }
  })
    .then((theUser) => {
      // console.log('theUser', theUser)
      console.log('-=-=-=-=-=-=-=-=-=-')
      // console.log('theUser.cart', theUser.cart)

      // console.log('theUser.cart.ingredients', theUser.cart.ingredients)



      theUser.cart.forEach((eachR) => {
        eachR.ingredients.forEach((eachI) => {
          Ingredient.findByIdAndDelete(eachI._id)
            .then(() => {

            })
            .catch((err) => {
              res.json(err)
            })
        })
        Recipe.findByIdAndDelete(eachR._id)
          .then(() => {

          })
          .catch((err) => {
            res.json(err)
          })
      })

      User.findByIdAndUpdate(req.user._id, {
        cart: []
      }, { new: true })
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