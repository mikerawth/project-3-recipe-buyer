import React from 'react'
import CartService from '../../services/CartService'

import './cartingredient.css'


class CartIngredient extends React.Component {
  constructor(props) {
    super(props)
    this.cartService = new CartService()
    this.state = {
      id: '',
      ingInclude: false,
      ingName: '',
      ingUsAmount: 0,
      ingUsUnit: '',
      ingMetAmount: 0,
      ingMetUnit: '',
      ingCost: 0
    }
  }

  getRecipeIngredients = () => {
    this.setState({
      id: this.props.eachIng._id,
      ingInclude: this.props.eachIng.include,
      ingName: this.props.eachIng.name,
      ingUsAmount: this.props.eachIng.usAmount,
      ingUsUnit: this.props.eachIng.usUnit,
      ingMetAmount: this.props.eachIng.metricAmount,
      ingMetUnit: this.props.eachIng.metricUnit,
      ingCost: this.props.eachIng.price,
      ready: false,

    })
  }

  isReady = () => {
    this.setState({ ready: true })
  }

  componentDidMount() {
    this.getRecipeIngredients();
    this.isReady();
  }

  checkBoxToggle = () => {
    this.cartService.toggleIngredient(this.state.id, this.state.ingInclude, this.props.recipeID)
      .then((theResponse) => {
        this.setState({ ingInclude: !this.state.ingInclude }, this.props.updateRecipePrice(theResponse.cost))

      })
  }

  ingredientCheckBox = () => {
    if (this.state.ingInclude)
      return (
        <input
          onChange={() => this.checkBoxToggle()}
          type="checkbox"
          value={this.state.ingInclude}
          checked="checked"
        />
      )
    else
      return (
        <input
          onChange={() => this.checkBoxToggle()}
          type="checkbox"
          value={this.state.ingInclude}
          checked=""
        />
      )
  }

  displayRecipeIngredients = () => {
    return (
      <div className="ing-listing d-flex">
        <div className="ing">{this.ingredientCheckBox()}</div>
        <div className="ing ing-name">{this.state.ingName}</div>
        <div className="ing ing-amount">{this.state.ingUsAmount}</div>
        <div className="ing ing-unit">{this.state.ingUsUnit}</div>
        {/* <div>{this.state.ingMetAmount}</div>
        <div>{this.state.ingMetUnit}</div> */}
        <div className="ing ing-cost">${this.state.ingCost.toFixed(2)}</div>
      </div>
    )
  }

  render() {
    if (this.state.ready)
      return (
        <div className="ing-listing-container">
          {this.displayRecipeIngredients()}
        </div>
      )
    else {
      return (
        <div>Loading Recipe</div>
      )
    }
  }
}
export default CartIngredient;