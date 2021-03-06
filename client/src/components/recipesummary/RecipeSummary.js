import React from 'react';
import IngredientsAddedScreen from '../ingredientsaddedscreen/IngredientsAddedScreen'
import FoodService from '../../services/FoodService'
import CartService from '../../services/CartService'
import './recipesummary.css'



class RecipeSummary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theTitle: "",
      theIngredients: [],
      theInstructions: [],
      theTags: [],
      theCost: 0,
      theImg: '',
      ready: false,
      ingredientScreen: false,
    }
    this.recipeID = this.props.match.params.recipeID
  }

  getRecipeSummary = () => {
    this.props.foodService.getRecipeSummary(this.recipeID)
      .then((theThing) => {
        this.setState({
          theTitle: theThing.title,
          theIngredients: theThing.ingredients,
          theInstructions: theThing.instructions,
          theTags: theThing.tags,
          theCost: theThing.cost,
          theImg: theThing.image,
          ready: true,
        })
      })
  }

  displayRecipeIngredients = () => {
    return this.state.theIngredients.map((eachIngredient, i) => {
      return (
        <div key={i} className="summary-recipe-ingredient-listing columns block">
          <div className="column is-2">
            <img className="ingredient-img " src={eachIngredient.image} alt={`${eachIngredient.name} image`} />
          </div>

          <div className="column is-2">
            <span className="ingredient-name ">{eachIngredient.name}</span>
          </div>
          <div column="column is-2">
            <span className="ingredient-amount-us ">{eachIngredient.usAmount} {eachIngredient.usUnit}</span>
          </div>
        </div>
      )
    })
  }

  displayRecipeInstructions = () => {
    return this.state.theInstructions.map((eachStep, i) => {
      return (
        <li key={i}>{eachStep.step}</li>
      )
    })
  }

  displayRecipeTags = () => {
    return this.state.theTags.map((eachTag, i) => {
      return (
        <li key={i}>{eachTag}</li>
      )
    })
  }

  addIngredientsToCart = () => {
    console.log(this.state.theIngredients, this.recipeID, this.state.theTitle)
    this.props.cartService.addIngredients(this.state.theIngredients, this.recipeID, this.state.theTitle, this.state.theCost, this.state.theImg)
    this.setState({ ingredientScreen: true })
  }


  componentDidMount() {
    this.getRecipeSummary();
  }


  render() {

    if (this.state.ready)
      return (
        <div className="block">
          <div className="block summary-top">
            <img className="summary-image" src={this.state.theImg} />
            <h3 className="title is-2 recipe-name">{this.state.theTitle}</h3>

            {this.props.theUser &&
              <button className="button is-primary add-btn" onClick={this.addIngredientsToCart}>Add Ingredients</button>
            }

          </div>


          <div className="recipe-ingredient-list block">
            <h3 className="title is-3">Ingredients</h3>
            {this.displayRecipeIngredients()}
          </div>


          <div className="recipe-directions block">
            <h3 className="title is-3">Directions</h3>
            <ol>
              {this.displayRecipeInstructions()}
            </ol>
          </div>

          {/* <div className="recipe-tags">
            <h3>Tags</h3>
            <ol>
              {this.displayRecipeTags()}
            </ol>
          </div> */}


          {this.state.ingredientScreen &&
            <IngredientsAddedScreen />}

        </div>
      )
    else {
      return (
        <div>Loading...</div>
      )
    }
  }

}

export default RecipeSummary;