import axios from 'axios'


class FoodService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_FOODSERVICE_BASE_URL,
      withCredentials: true,
    });
    this.service = service;
  }


  test = () => {
    return 'test works'
  }

  searchRecipes = (query) => {
    return this.service.post('/search/' + query)
      .then(response => {
        console.log("the response in the component >>>>>>>> ", response.data)
        return response.data
      })
  }

  getRecipeSummary = (recipeID) => {
    return this.service.get(`/${recipeID}/information`)
      .then(response => response.data)
  }

  // CHANGE TO GET PRICE OF RECIPE'S INGREDIENTS
  getRecipeIngredients = (recipeID) => {
    return this.service.get(`/${recipeID}/ingredients`)
      .then(response => response.data)
  }

  // DO NOT USE
  getRecipeInstructions = (recipeID) => {
    return this.service.get(`/${recipeID}/instructions`)
      .then(response => response.data)
  }

  // addIngredients = (theIngredients, apiID) => {
  //   return this.service.post('/cart/addIngredients', { theIngredients, apiID })
  //     .then(response => response.data)
  // }
}

export default FoodService