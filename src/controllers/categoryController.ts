import { Request, Response } from 'express';
import { getAllCategoriesService, createCategoryService, updateCategoryService, deleteCategoryService } from '../services/categoryService';

const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await getAllCategoriesService();
        res.json(categories);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const category = await createCategoryService(name);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const updateCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const category = await updateCategoryService(Number(req.params.id), name);
        if (category) {
            res.json(category);
        } else {
            res.status(404).send('Category not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const deleteCategory = async (req: Request, res: Response) => {
    try {
        const success = await deleteCategoryService(Number(req.params.id));
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).send('Category not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

export {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
};