import axios from 'axios';

const api = axios.create({
  baseURL: 'http://67.205.168.76:3333/',
});

export default api;
