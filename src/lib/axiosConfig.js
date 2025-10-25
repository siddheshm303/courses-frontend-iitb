import axios from 'axios';

const api = axios.create({
  baseURL: "http://65.1.64.212:8080/api",
});

export default api;
