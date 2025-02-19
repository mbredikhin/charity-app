import { Router } from 'express';
import { profileController } from '@/controllers/profile.controller';

export const profileRouter = Router().use(
  '/profile',
  Router().get('/', profileController.getProfile)
);
