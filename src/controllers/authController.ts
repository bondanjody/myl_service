import { Request, Response } from 'express';
import AuthService from '../services/authService';
import logger from '../config/logger';
import { InputLoginService, InputRegister } from '../models/authModel';

const register = async (req: Request, res: Response) => {
    try {
        const inputData: InputRegister = req.body;

        // Validasi input
        if (!inputData.username || typeof inputData.username !== 'string') {
            return res.status(400).json({ message: 'Username is required and must be a string' });
        }
        if (!inputData.firstname || typeof inputData.firstname !== 'string') {
            return res.status(400).json({ message: 'Firstname is required and must be a string' });
        }
        if (inputData.lastname != undefined && typeof inputData.lastname !== 'string') {
            return res.status(400).json({ message: 'Lastname must be a string' });
        }
        if (!inputData.password || typeof inputData.password !== 'string') {
            return res.status(400).json({ message: 'Password is required and must be a string' });
        }
        if (!inputData.email || typeof inputData.email !== 'string') {
            return res.status(400).json({ message: 'Email is required and must be a string' });
        }

        const user = await AuthService.register(inputData);
        res.status(201).json(user);
    } catch (error) {
        logger.error('Error registering user:', error);
        res.status(500).json({ message: `${error}` });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const data: InputLoginService = req.body;

        // Validasi input
        if (!data.username || typeof data.username !== 'string') {
            return res.status(400).json({ message: 'Username is required and must be a string' });
        }
        if (!data.password || typeof data.password !== 'string') {
            return res.status(400).json({ message: 'Password is required and must be a string' });
        }

        const result = await AuthService.login(data);
        if (result.status) {
            res.json(result);
        } else {
            res.status(401).json({...result});
        }
    } catch (error) {
        logger.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
};

export default {
    register,
    login
};

