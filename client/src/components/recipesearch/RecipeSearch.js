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
      ready: false,
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
          ready: true
        })
      })

  }

  displayRecipeSearchResults = () => {
    if (this.state.ready) {
      // this.setState({ ready: false })
      return this.state.searchResults.map((eachRecipe, i) => {
        return (
          <div key={i} className="recipe-search-result">
            {/* //   <Link to={`recipes/summary/${eachRecipe.id}`}>
          //     {eachRecipe.title}
          //   </Link> */}
            <RecipeSearchResult
              recipeID={eachRecipe.id}
              recipeTitle={eachRecipe.title}
            />
          </div>
        )
      })
    } else {
      return (<div>Loading</div>)
    }
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


        {this.displayRecipeSearchResults()}
      </div>
    )
  }
}

export default RecipeSearch;