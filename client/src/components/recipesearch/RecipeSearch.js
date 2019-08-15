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

    if (this.state.searchResults.length == 0) {
      return (
        <div className="message box">
          <p>Hello!  Welcome to my app, Recipe Buyer!  This app is suppose to simulate a website where you do your food shopping based on the recipes you want to cook</p>
          <p>Please note that this website is just a <strong>simulation</strong> of a working website.  You won't be able to actually buy anything.</p>
          <p>Enjoy!</p>
          <p>Michael</p>
        </div>
      )
    }

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
      <div className="recipe-search-bar block field has-addons">
        <h3 className="title is-3">Look Up Recipe</h3>
        <form className="recipe-search-form" onSubmit={this.searchRecipe}>
          <input className="recipe-search-input input" value={this.state.recipeName}
            name="recipeName"
            onChange={this.handleChange}
          />

          <button className="button is-info">Submit</button>

        </form>

        <div className="block">
          {this.displayRecipeSearchResults()}
        </div>
      </div>
    )
  }
}

export default RecipeSearch;