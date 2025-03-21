import { toast } from 'react-toastify';
import apiService from '../api.service';
import { routes } from '@/utils/constants';
import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

type RequestConfig = InternalAxiosRequestConfig & {
  retriesCount?: number;
};

type Response = AxiosResponse & { config: RequestConfig };

class ServerErrorHandler {
  static maxRetries = 3;

  canHandle(error: AxiosError) {
    return error.response?.status === 500;
  }

  async handle(error: AxiosError, httpInstance: AxiosInstance) {
    if (!error.response) {
      return;
    }
    const { config }: Response = error.response;
    const retriesCount = config?.retriesCount ?? 0;
    if (retriesCount < ServerErrorHandler.maxRetries) {
      config.retriesCount = retriesCount + 1;
      return httpInstance.request(config);
    }

    toast.error('Ошибка! Попробуйте еще раз', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  }
}

class UnauthorizedErrorHandler {
  canHandle(error: AxiosError) {
    return error.response?.status === 401;
  }

  async handle() {
    if (apiService.http.defaults.headers.common.Authorization) {
      apiService.removeHeader('Authorization');
      localStorage.removeItem('token');
    }
    if (window.location.pathname !== routes.login()) {
      window.location.replace(routes.login());
    }
  }
}

let handlers = [new ServerErrorHandler(), new UnauthorizedErrorHandler()];

export const errorHandler = async (
  error: AxiosError,
  httpInstance: AxiosInstance
) => {
  for await (let handler of handlers) {
    if (handler.canHandle(error)) {
      return await handler.handle(error, httpInstance);
    }
  }
};
