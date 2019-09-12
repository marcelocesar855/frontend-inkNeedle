import axios from 'axios';

const api = axios.create({
    baseURL : 'https://backend-inkneedle.herokuapp.com/'
});

export default api;