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
      cartTotal: 0,
    }
    this.cartService = new CartService()
  }

  getUsersCart = () => {
    this.cartService.grabUserAndCart()
      .then((theUsersInfo) => {
        this.setState({ cartRecipes: theUsersInfo.cart })
      })
  }

  isReady = () => {
    this.setState({ ready: true })
  }

  componentDidMount() {
    this.getUsersCart();
    this.isReady();
  }



  displayCartRecipes = () => {
    return this.state.cartRecipes.map((eachRecipe) => {
      return (
        <div key={eachRecipe._id}>
          <CartRecipe recipeInfo={eachRecipe}
            getUsersCart={this.getUsersCart} />
        </div>
      )
    })
  }

  checkout = () => {
    this.cartService.checkout()
  }

  render() {
    if (this.state.ready)
      return (
        <div>
          <div>
            <div>Total: {this.state.cartTotal}</div>
            <button onClick={() => { this.checkout() }}>Checkout</button>
          </div>
          {this.displayCartRecipes()}
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
