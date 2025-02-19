import { Request } from '@/models/request.model';
import { User } from '@/models/user.model';
import {
  requestsRepository,
  RequestsRepository,
} from '@/repositories/requests.repository';

export class RequestsService {
  constructor(private repository: RequestsRepository) {}

  async getAllRequests() {
    const requests = await this.repository.getAllRequests();
    return requests;
  }
  async getRequest(requestId: Request['id']) {
    const request = await this.repository.findRequest(requestId);
    return request;
  }
  async getFavouriteRequests(userId: User['id']) {
    const requestsIds = await this.repository.findFavouriteRequests(userId);
    return requestsIds;
  }
  async addRequestToFavourites(userId: User['id'], requestId: Request['id']) {
    await this.repository.addRequestToFavourites(userId, requestId);
  }
  async removeRequestFromFavourites(
    userId: User['id'],
    requestId: Request['id']
  ) {
    await this.repository.removeRequestFromFavourites(userId, requestId);
  }
}

export const requestsService = new RequestsService(requestsRepository);
