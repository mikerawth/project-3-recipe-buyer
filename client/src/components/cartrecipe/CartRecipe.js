import React from 'react'
import CartIngredient from '../cartingredient/CartIngredient'

import './cartrecipe.css'


class CartRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipeName: props.recipeInfo.name,
      recipeIngredients: props.recipeInfo.ingredients,
      recipeTotal: props.recipeInfo.cost,
      ready: false,
    }
  }

  updateRecipePrice = (updatedCost) => {
    setTimeout(() => { this.setState({ recipeTotal: updatedCost }) }, 200)


  }

  displayRecipeIngredients = () => {
    return this.state.recipeIngredients.map((eachIng) => {
      return (
        <div className="ingredient-listing" key={eachIng._id}>
          <CartIngredient
            eachIng={eachIng}
            recipeID={this.props.recipeInfo._id}
            updateRecipePrice={this.updateRecipePrice}
            getUsersCart={this.props.getUsersCart}
          />
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
          <span className="d-flex">
            <div className="ing-checkbox"></div>
            <div className="ing-name"></div>
            <div className="ing-amount"></div>
            <div className="ing-unit">Total:</div>
            <div className="ing-cost">${this.state.recipeTotal.toFixed(2)}</div>
          </span>
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