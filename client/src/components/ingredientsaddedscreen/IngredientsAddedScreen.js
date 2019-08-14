import React from 'react'
import { Link } from 'react-router-dom'
import './ingredientsaddedscreen.css'

function IngredientsAddedScreen() {
  return (
    <div className="ing-added-window abs-window block">
      <h3>Ingredients have been successfully added</h3>
      <div className="navigation-btns">
        <Link className="button is-primary nav-btn" to='/'>ADD MORE RECIPES</Link>
        <Link className="button is-success nav-btn" to='/cart'>CHECKOUT</Link>
      </div>
    </div>
  )
}

export default IngredientsAddedScreen