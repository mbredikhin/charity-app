require('dotenv').config();
import express from 'express';
import cors from 'cors';
import { authMiddleware } from './middlewares/auth.middleware';
import { authRouter } from './routes/auth.route';
import { profileRouter } from './routes/profile.route';
import { requestsRouter } from './routes/requests.route';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'API is running on /api' });
});

app.use('/auth', authRouter);
app.use('/api', authMiddleware, profileRouter, requestsRouter);

const port = process.env.APP_PORT as string;
if (!port) {
  console.error('No port specified for the app, server shutdown');
}
app.listen(port, () => {
  console.info(`Server is up and listening on port ${port}`);
});
