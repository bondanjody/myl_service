import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getAllChannelsController, createChannelController, updateChannelController, deleteChannelController } from '../controllers/channelController';

const router = Router();

router.get('/', getAllChannelsController);
router.post('/', authMiddleware, createChannelController);
router.put('/:id', authMiddleware, updateChannelController);
router.delete('/:id', authMiddleware, deleteChannelController);

export default router;
