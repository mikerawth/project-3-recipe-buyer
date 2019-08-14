import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './recipesearchresult.css'

function RecipeSearchResult(props) {

  return (
    <div className="box columns">
      <img className="recipe-search-image" src={`https://spoonacular.com/recipeImages/${props.recipe.image}`} />
      <div className="column">
        <Link to={`recipes/summary/${props.recipeID}`}>
          {props.recipeTitle}
          {console.log(props.recipe)}
        </Link>
      </div>

    </div>
  )

}

export default RecipeSearchResult;