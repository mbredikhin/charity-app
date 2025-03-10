import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { profileService, ProfileService } from '@/services/profile.service';
import { ApiError, ApiResponse } from '@/helpers/api.helper';

export class ProfileController {
  private service: ProfileService;
  constructor(service: ProfileService) {
    this.service = service;
    this.getProfile = this.getProfile.bind(this);
  }

  async getProfile(req: Request, res: Response) {
    try {
      const profile = await this.service.getProfile(res.locals.user_id);
      return new ApiResponse(StatusCodes.OK, profile).send(res);
    } catch (error: any) {
      return new ApiError(error.status, error.message, error.errors).send(res);
    }
  }
}

export const profileController = new ProfileController(profileService);
