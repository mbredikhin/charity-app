export class ServerErrorHandler {
  canHandle(error) {
    return error.response && error.response.status === 500;
  }

  async handle() {
    // handle error
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
