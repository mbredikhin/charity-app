import { Router } from 'express';
import { requestsController } from '@/controllers/requests.controller';

export const requestsRouter = Router().use(
  '/requests',
  Router()
    .get('/favourites', requestsController.getFavouriteRequests)
    .post('/favourites', requestsController.addRequestToFavourites)
    .delete('/favourites', requestsController.removeRequestFromFavourites)
    .get('/:id', requestsController.getRequest)
    .get('/', requestsController.getAllRequests)
);
