import { toast } from 'react-toastify';
import apiService from '../api.service';
import { routes } from '@/utils/constants';

export class ServerErrorHandler {
  static maxRetries = 3;

  canHandle(error) {
    return error.response?.status === 500;
  }

  async handle(error, httpInstance) {
    const { status, config } = error.response;
    const retriesCount = config?.retriesCount ?? 0;
    if (status === 500 && retriesCount < ServerErrorHandler.maxRetries) {
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

export class ForbiddenErrorHandler {
  canHandle(error) {
    return error.response && error.response.status === 403;
  }

  async handle() {
    apiService.removeHeader('Authorization');
    localStorage.removeItem('token');
    window.location.replace(routes.login());
  }
}

let handlers = [new ServerErrorHandler(), new ForbiddenErrorHandler()];

export const errorHandler = async (error, httpInstance) => {
  for await (let handler of handlers) {
    if (handler.canHandle(error)) {
      return await handler.handle(error, httpInstance);
    }
  }
};
