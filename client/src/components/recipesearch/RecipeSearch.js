import React, { Component } from 'react';
import FoodService from '../../services/FoodService';
import './recipesearch.css'
import RecipeSearchResult from '../recipesearchresult/RecipeSearchResult';

class RecipeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      searchResults: [],
    };
    this.service = new FoodService();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  searchRecipe = (e) => {
    e.preventDefault();
    const rSearch = this.state.recipeName;


    this.service.searchRecipes(rSearch)
      .then((searchResults) => {
        console.log("==============", searchResults)
        this.setState({
          searchResults: searchResults.results,
        })
      })

  }

  displayRecipeSearchResults = () => {

    return this.state.searchResults.map((eachRecipe, i) => {
      return (
        <div key={i} className="recipe-search-result">
          <RecipeSearchResult
            recipe={eachRecipe}
            recipeID={eachRecipe.id}
            recipeTitle={eachRecipe.title}
          />
        </div>
      )
    })
  }



  render() {
    return (
      <div className="recipe-search-bar">
        <h3>Look Up Recipe</h3>
        <form className="recipe-search-form" onSubmit={this.searchRecipe}>
          <input className="recipe-search-input" value={this.state.recipeName}
            name="recipeName"
            onChange={this.handleChange}
          />

          <button>Submit</button>

        </form>

        <div>
          {this.displayRecipeSearchResults()}
        </div>
      </div>
    )
  }
}

export default RecipeSearch;