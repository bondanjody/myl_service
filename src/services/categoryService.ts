import pool from '../config/database';
import { InputNewCategoryService, OutputNewCategoryService } from '../models/categoryModel';

const getAllCategoriesService = async () => {
    const [rows]: any = await pool.execute('SELECT * FROM category');
    return rows;
};

const createCategoryService = async (data: InputNewCategoryService): Promise<OutputNewCategoryService> => {
    const [query] = await pool.execute(
        'INSERT INTO category (name, createdBy, createdAt) VALUES (?, ?, CURRENT_TIMESTAMP)',
        [data.name, data.userId]
    );
    let result: OutputNewCategoryService = {
        status: false,
        message: `${query}`
    }
    if (query) {
        result.status = true
        result.message = "Category created !"
    }
    return result;
};

const updateCategoryService = async (id: number, name: string) => {
    const [result] = await pool.execute(
        'UPDATE category SET name = ? WHERE id = ?',
        [name, id]
    );
    return result;
};

const deleteCategoryService = async (id: number) => {
    const [result] = await pool.execute(
        'DELETE FROM category WHERE id = ?',
        [id]
    );
    return result;
};

export {
    getAllCategoriesService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService
}
