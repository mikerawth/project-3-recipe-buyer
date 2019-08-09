import React from 'react'
import { Link } from 'react-router-dom'

function IngredientsAddedScreen() {
  return (
    <div className="ing-added-window abs-window">
      <h3>Ingredients have been successfully added</h3>
      <Link to='/'>Click here to add more recipes</Link>
      <Link to='/cart'>Click here to go to your cart</Link>
    </div>
  )
}

export default IngredientsAddedScreen