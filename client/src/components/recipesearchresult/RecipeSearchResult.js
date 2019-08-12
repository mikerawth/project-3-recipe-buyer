import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './recipesearchresult.css'

function RecipeSearchResult(props) {

  return (
    <div>
      <img className="recipe-search-image" src={`https://spoonacular.com/recipeImages/${props.recipe.image}`} />
      <Link to={`recipes/summary/${props.recipeID}`}>
        {props.recipeTitle}
        {console.log(props.recipe)}
      </Link>
    </div>
  )

}

export default RecipeSearchResult;