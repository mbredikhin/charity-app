import { toast } from 'react-toastify';
import apiService from '../api.service';
import { routes } from '@/utils/constants';

export class ServerErrorHandler {
  canHandle(error) {
    return error.response && error.response.status === 500;
  }

  async handle() {
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

export const errorHandler = async (error) => {
  for await (let handler of handlers) {
    if (handler.canHandle(error)) {
      await handler.handle();
      break;
    }
  }
};
