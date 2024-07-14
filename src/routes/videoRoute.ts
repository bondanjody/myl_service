import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createVideController } from '../controllers/videoController';

const router = Router();

router.post('/', authMiddleware, createVideController);

export default router;
