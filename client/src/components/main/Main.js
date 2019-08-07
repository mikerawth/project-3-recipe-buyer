import React from 'react';
import './main.css';
import RecipeSearch from '../recipesearch/RecipeSearch';


function Main(props) {

  return (
    <div className="Main">
      <RecipeSearch
        {...props}
      />
    </div>
  );

}

export default Main;