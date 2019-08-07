import React from 'react'
import CartIngredient from '../cartingredient/CartIngredient'

import './cartrecipe.css'


class CartRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipeName: props.recipeInfo.name,
      recipeIngredients: props.recipeInfo.ingredients,
      ready: false,
    }
  }

  displayRecipeIngredients = () => {
    return this.state.recipeIngredients.map((eachIng) => {
      return (
        <div className="ingredient-listing" key={eachIng._id}>
          <CartIngredient eachIng={eachIng} />
        </div>
      )
    })
  }

  componentDidMount() {
    this.isReady();
  }

  isReady = () => {
    this.setState({ ready: true })
  }

  render() {
    if (this.state.ready)
      return (
        <div className="cart-recipe d-flex-col">
          <div className="cart-recipe-header"><h3>{this.state.recipeName}</h3></div>
          <div className="cart-recipe-info d-flex-col">
            {this.displayRecipeIngredients()}
          </div>
        </div>
      )
    else {
      return (
        <div>Loading Recipe</div>
      )
    }
  }
}
export default CartRecipe;