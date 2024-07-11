import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoute'
import categoryRoutes from './routes/categoryRoute';
import channelRoute from './routes/channelRoute'
import dotenv from 'dotenv';
import logger from './config/logger';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/channel', channelRoute);

app.listen(3000, () => {
  logger.info('Server is running on port 3000');
});
