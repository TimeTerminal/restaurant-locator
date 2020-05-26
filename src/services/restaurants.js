import axios from 'axios';
import { API_URL, RESTAURANTS } from '../constants/index';

const restaurantsService = axios => ({
  getRestaurantsFromApi: async city => {
    const url = `${API_URL}${RESTAURANTS}?city=${city}&per_page=100`;

    return axios.get(url);
  }
});

export default restaurantsService(axios);