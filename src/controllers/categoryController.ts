import { Request, Response } from 'express';
import { getAllCategoriesService, createCategoryService, updateCategoryService, deleteCategoryService } from '../services/categoryService';
import { InputNewCategoryService, OutputNewCategoryService } from '../models/categoryModel';

const getAllCategoriesController = async (req: Request, res: Response) => {
    try {
        const categories = await getAllCategoriesService();
        res.json(categories);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const createCategoryController = async (req: Request, res: Response) => {
    let result: OutputNewCategoryService = {
        status : false,
        message : "Failed to create category !"
    }
    try {
        const data: InputNewCategoryService = req.body;

        // Validasi input
        if (!data.name || typeof data.name !== 'string') {
            result.message = "Category 'name' harus diisi dan bernilai string !"
            return res.status(500).json(result);
        }
        const category = await createCategoryService(data);
        
        if (!category.status) {
            // Jika error
            res.status(500).json(category);
        } else {
            // Jika berhasil
            res.status(201).json(category);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const updateCategoryController = async (req: Request, res: Response) => {
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

const deleteCategoryController = async (req: Request, res: Response) => {
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
    getAllCategoriesController,
    createCategoryController,
    updateCategoryController,
    deleteCategoryController
};