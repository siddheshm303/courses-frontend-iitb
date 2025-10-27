import axios from 'axios';

const api = axios.create({
  baseURL: "http://13.127.249.183/api",
});

export default api;
