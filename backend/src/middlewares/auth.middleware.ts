import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { parseJwtToken } from '@/helpers/jwt.helper';
import { ApiError } from '@/helpers/api.helper';

export const authMiddleware: RequestHandler = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return new ApiError(
      StatusCodes.UNAUTHORIZED,
      'Authorization header is empty'
    ).send(res);
  }

  const token = header.split(' ')[1];
  if (!token) {
    return new ApiError(
      StatusCodes.UNAUTHORIZED,
      'Authorization token is empty'
    ).send(res);
  }

  try {
    const { user_id } = parseJwtToken(token);
    res.locals.user_id = user_id;

    next();
  } catch (error: any) {
    return new ApiError(StatusCodes.UNAUTHORIZED, error.message).send(res);
  }
};
