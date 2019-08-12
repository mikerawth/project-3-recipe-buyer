import React from 'react';
import IngredientsAddedScreen from '../ingredientsaddedscreen/IngredientsAddedScreen'



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
        }, () => console.log("theThing", theThing))
      })
  }

  displayRecipeIngredients = () => {
    return this.state.theIngredients.map((eachIngredient, i) => {
      return (
        <div key={i}>
          <img className="ingredient-img" src={eachIngredient.image} alt={`${eachIngredient.name} image`} />
          <span className="ingredient-name">{eachIngredient.name} / </span>
          <span className="ingredient-amount-us">{eachIngredient.usAmount} {eachIngredient.usUnit} / </span>
          {/* <span className="ingredient-amount-metric">{eachIngredient.metricAmount} {eachIngredient.metricUnit}</span> */}
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
        <div>
          <img src={this.state.theImg} />

          {this.props.theUser &&
            <button onClick={this.addIngredientsToCart}>Add Ingredients</button>
          }

          <div className="recipe-name">
            <h2>{this.state.theTitle}</h2>
          </div>

          <div className="recipe-ingredient-list">
            <h3>Ingredients</h3>
            {this.displayRecipeIngredients()}
          </div>


          <div className="recipe-directions">
            <h3>Directions</h3>
            <ol>
              {this.displayRecipeInstructions()}
            </ol>
          </div>

          <div className="recipe-tags">
            <h3>Tags</h3>
            <ol>
              {this.displayRecipeTags()}
            </ol>
          </div>


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