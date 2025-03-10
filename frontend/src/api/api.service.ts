import axios from 'axios';
import { errorHandler } from './errors/errorHandler';

class ApiService {
  http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  constructor() {
    this.http.defaults.headers.common.Accept = 'application/json';
    this.http.defaults.headers.common['Content-Type'] =
      'application/json;charset=UTF-8';
    this.http.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        return (
          (await errorHandler(error, this.http)) ??
          Promise.reject(error.response.data)
        );
      }
    );
  }

  addHeader({ name, value }: { name: string; value: string }) {
    this.http.defaults.headers.common[name] = value;
  }

  removeHeader(name: string) {
    delete this.http.defaults.headers.common[name];
  }
}

export default new ApiService();
