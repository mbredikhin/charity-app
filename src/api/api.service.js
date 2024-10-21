import axios from 'axios';
import { errorHandler } from './errors/errorHandler';

class ApiService {
  http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  constructor() {
    this.http.defaults.headers.common.Accept = 'application/json';
    this.http.defaults.headers.common['Content-Type'] =
      'application/json;charset=UTF-8';
    this.http.interceptors.response.use(
      (response) => response.data,
      (error) => {
        errorHandler(error);
        return Promise.reject(error);
      }
    );
  }

  addHeader({ name, value }) {
    this.http.defaults.headers.common[name] = value;
  }

  removeHeader(name) {
    delete this.http.defaults.headers.common[name];
  }
}

export default new ApiService();
