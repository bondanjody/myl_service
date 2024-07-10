import pool from '../config/database';

const getAllCategoriesService = async () => {
    const [rows]: any = await pool.execute('SELECT * FROM category');
    return rows;
};

const createCategoryService = async (name: string) => {
    const [result] = await pool.execute(
        'INSERT INTO category (name) VALUES (?)',
        [name]
    );
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
