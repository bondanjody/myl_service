import { Router } from 'express';
import { getAllCategoriesController, updateCategoryController, deleteCategoryController, createCategoryController } from '../controllers/categoryController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getAllCategoriesController);
router.post('/', authMiddleware, createCategoryController);
router.put('/:id', authMiddleware, updateCategoryController);
router.delete('/:id', authMiddleware, deleteCategoryController);

export default router;
