import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://13.203.104.23:3000',
  timeout: 3000,
});
