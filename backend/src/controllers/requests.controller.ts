import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError, ApiResponse } from '@/helpers/api.helper';
import { RequestsService, requestsService } from '@/services/requests.service';

export class RequestsController {
  private service: RequestsService;
  constructor(service: RequestsService) {
    this.service = service;
    this.getAllRequests = this.getAllRequests.bind(this);
    this.getRequest = this.getRequest.bind(this);
    this.getFavouriteRequests = this.getFavouriteRequests.bind(this);
    this.addRequestToFavourites = this.addRequestToFavourites.bind(this);
    this.removeRequestFromFavourites =
      this.removeRequestFromFavourites.bind(this);
  }

  async getAllRequests(req: Request, res: Response) {
    try {
      const requests = await this.service.getAllRequests();
      return new ApiResponse(StatusCodes.OK, requests).send(res);
    } catch (error: any) {
      return new ApiError(error.status, error.message).send(res);
    }
  }
  async getRequest(req: Request, res: Response) {
    try {
      const request = await this.service.getRequest(+req.params.id);
      return new ApiResponse(StatusCodes.OK, request).send(res);
    } catch (error: any) {
      return new ApiError(error.status, error.message).send(res);
    }
  }
  async getFavouriteRequests(req: Request, res: Response) {
    try {
      const requestsIds = await this.service.getFavouriteRequests(
        res.locals.user_id
      );
      return new ApiResponse(StatusCodes.OK, requestsIds).send(res);
    } catch (error: any) {
      return new ApiError(error.status, error.message).send(res);
    }
  }
  async addRequestToFavourites(req: Request, res: Response) {
    try {
      await this.service.addRequestToFavourites(
        res.locals.user_id,
        req.body.id
      );
      return new ApiResponse(StatusCodes.CREATED, { status: 'ok' }).send(res);
    } catch (error: any) {
      return new ApiError(error.status, error.message).send(res);
    }
  }
  async removeRequestFromFavourites(req: Request, res: Response) {
    try {
      await this.service.removeRequestFromFavourites(
        res.locals.user_id,
        req.body.id
      );
      return new ApiResponse(StatusCodes.OK, { status: 'ok' }).send(res);
    } catch (error: any) {
      return new ApiError(error.status, error.message).send(res);
    }
  }
}

export const requestsController = new RequestsController(requestsService);
