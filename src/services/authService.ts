import pool from '../config/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { InputRegister } from '../models/authModel';

dotenv.config();

const register = async (inputData: InputRegister) => {
    // Pengecekan apakah username atau email sudah terdaftar
    const [rows] = await pool.execute(
        'SELECT username, email FROM user WHERE username = ? OR email = ?',
        [inputData.username, inputData.email]
    );

    // Memastikan rows memiliki length atau menentukan cara lain untuk memeriksa hasil
    if (Array.isArray(rows) && rows.length > 0) {
        // Jika username atau email sudah terdaftar, kembalikan error
        const errorMessages = [];
        if (rows.some((user: any) => user.username === inputData.username)) {
            errorMessages.push('Username is already taken');
        }
        if (rows.some((user: any) => user.email === inputData.email)) {
            errorMessages.push('Email is already registered');
        }
        throw new Error(errorMessages.join(' and '));
    }

    // Hash password dan simpan data pengguna baru
    const lastname: string = inputData.lastname ?? ""
    const hashedPassword = await bcrypt.hash(inputData.password, 10);
    const [result] = await pool.execute(
        'INSERT INTO user (username, firstname, lastname, password, email, role, createdAt) VALUES (?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP)',
        [inputData.username, inputData.firstname, lastname, hashedPassword, inputData.email]
    );

    return result;
};

const login = async (username: string, password: string) => {
    const [rows]: any = await pool.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
    );
    const user = rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '30s' });
        return { token, user };
    }
    return null;
};

export default {
    register,
    login
}