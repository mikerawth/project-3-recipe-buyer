import React from 'react';
import CartService from '../../services/CartService'

import CartRecipe from '../cartrecipe/CartRecipe'
import Checkout from '../checkout/Checkout'

import './cart.css'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartIngredients: [],
      cartRecipes: [],
      ready: false,
      cartTotal: 0,
      checkoutScreen: false,
    }
    this.cartService = new CartService()
  }

  getUsersCart = () => {
    this.cartService.grabUserAndCart()
      .then((theUsersInfo) => {
        this.setState({ cartRecipes: theUsersInfo.cart },
          () => {
            // console.log(this.state.cartRecipes)
            let recipeCostArray = this.state.cartRecipes.map((eachR) => {
              return eachR.cost
            })
            // console.log(recipeCostArray)
            let theCartTotal = recipeCostArray.reduce((a, b) => a + b, 0)
            this.setState({ cartTotal: theCartTotal })
          })
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
        <div className="block" key={eachRecipe._id}>
          <CartRecipe recipeInfo={eachRecipe}
            getUsersCart={this.getUsersCart} />
        </div>
      )
    })
  }

  updateCartPriceTotal = (priceUpdate) => {
    this.setState({ cartTotal: priceUpdate })
  }

  checkout = () => {
    this.cartService.checkout()
    this.setState({ checkoutScreen: true })
  }

  render() {
    if (this.state.ready)
      return (
        <div className="block">
          <div className="cart-total box">
            <div>Total: ${this.state.cartTotal.toFixed(2)}</div>
            <button className="button is-success" onClick={() => { this.checkout() }}>Checkout</button>
          </div>
          {this.displayCartRecipes()}
          {this.state.checkoutScreen &&
            <Checkout />}
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
