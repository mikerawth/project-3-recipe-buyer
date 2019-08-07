import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './recipesearchresult.css'

function RecipeSearchResult(props) {

  return (
    <Link to={`recipes/summary/${props.recipeID}`}>
      {props.recipeTitle}
    </Link>
  )

}

export default RecipeSearchResult;