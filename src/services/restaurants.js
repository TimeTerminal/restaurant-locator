import axios from 'axios';

const restaurantsService = axios => ({
  getRestaurantsFromApi: async url =>
    axios.get(url)
});

export default restaurantsService(axios);