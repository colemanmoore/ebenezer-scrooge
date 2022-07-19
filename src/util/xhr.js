import axios from 'axios';

const xhr = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  'X-CSRF-TOKEN': window.csrfToken,
  withCredentials: true,
});

export default xhr
