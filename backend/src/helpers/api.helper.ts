import { Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class ApiResponse<T extends any> {
  constructor(
    public status: StatusCodes = StatusCodes.OK,
    public data: T = {} as T
  ) {}

  send(res: Response) {
    res.status(this.status).json({ data: this.data });
  }
}

export class ApiError extends Error {
  status: StatusCodes;
  errors?: Record<string, string[]>;
  constructor(
    status: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
    readonly message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    errors?: Record<string, string[]>
  ) {
    super(
      status === StatusCodes.INTERNAL_SERVER_ERROR &&
        process.env.NODE_ENV === 'production'
        ? ReasonPhrases.INTERNAL_SERVER_ERROR
        : message
    );
    this.status = status;
    if (errors) {
      this.errors = errors;
    }
    Error.captureStackTrace(this, this.constructor);
  }

  send(res: Response) {
    res.status(this.status).json({
      message: this.message,
      ...(Object.keys(this.errors ?? {}).length && { errors: this.errors }),
    });
  }
}
