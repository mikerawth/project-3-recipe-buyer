import axios from 'axios';


class CartService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_CARTSERVICE_BASE_URL,
      withCredentials: true,
    });
    this.service = service;
  }

  addIngredients = (theIngredients, recipeApiID, recipeName) => {
    return this.service.post('/addRecipeAndIngredients', { theIngredients, recipeApiID, recipeName })
      .then(response => response.data)
  }

  grabIngredients = () => {
    return this.service.get('/getIngredients')
      .then(response => response.data)
  }


  grabUserAndCart = () => {
    return this.service.post('/usersCart')
      .then(response => response.data)
  }

  grabIngredientInfo = (ingID) => {
    return this.service.get(`/ing/${ingID}`)
      .then(response => response.data)
  }

  toggleIngredient = (ingID, currentStatus) => {
    return this.service.post(`/ing/toggle/`, { ingID, currentStatus })
      .then(response => response.data)
  }
}

export default CartService;