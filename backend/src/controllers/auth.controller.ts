import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authService, AuthService } from '@/services/auth.service';
import { ApiError, ApiResponse } from '@/helpers/api.helper';

export class AuthController {
  private service: AuthService;
  constructor(service: AuthService) {
    this.service = service;
    this.loginUser = this.loginUser.bind(this);
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.service.getAuthToken(email, password);
      return new ApiResponse(StatusCodes.OK, token).send(res);
    } catch (error: any) {
      return new ApiError(error.status, error.message, error.errors).send(res);
    }
  }
}

export const authController = new AuthController(authService);
