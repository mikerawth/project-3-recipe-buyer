import React from 'react';
import CartService from '../../services/CartService'

import CartRecipe from '../cartrecipe/CartRecipe'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartIngredients: [],
      cartRecipes: [],
      ready: false,
    }
    this.cartService = new CartService()
  }

  getUsersCart = () => {
    this.cartService.grabUserAndCart()
      .then((theUsersInfo) => {
        console.log(theUsersInfo)
        this.setState({ cartRecipes: theUsersInfo.cart })
      })
  }

  isReady = () => {
    this.setState({ ready: true })
  }

  componentDidMount() {
    // this.getCartIngredients();
    this.getUsersCart();
    this.isReady();

  }

  displayCartRecipes = () => {
    return this.state.cartRecipes.map((eachRecipe) => {
      return (
        <div key={eachRecipe._id}>
          <CartRecipe recipeInfo={eachRecipe} />
        </div>
      )
    })
  }

  render() {
    if (this.state.ready)
      return (
        <div>
          {this.displayCartRecipes()}
          {/* Testing */}
        </div>
      )
    else {
      return (
        <div>Loading Cart</div>
      )
    }
  }
}

export default Cart
