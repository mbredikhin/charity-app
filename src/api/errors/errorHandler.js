import { toast } from 'react-toastify';

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

let handlers = [new ServerErrorHandler()];

export const errorHandler = async (error) => {
  for await (let handler of handlers) {
    if (handler.canHandle(error)) {
      await handler.handle();
      break;
    }
  }
};
