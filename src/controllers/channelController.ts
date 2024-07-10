import { Request, Response } from 'express';
import { getAllChannelService, createChannelService, updateChannelService, deleteChannelService } from '../services/channelService';

const getAllChannelsController = async (req: Request, res: Response) => {
    try {
        const categories = await getAllChannelService();
        res.json(categories);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const createChannelController = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const category = await createChannelService(name);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const updateChannelController = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const category = await updateChannelService(Number(req.params.id), name);
        if (category) {
            res.json(category);
        } else {
            res.status(404).send('Category not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const deleteChannelController = async (req: Request, res: Response) => {
    try {
        const success = await deleteChannelService(Number(req.params.id));
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
    getAllChannelsController,
    createChannelController,
    updateChannelController,
    deleteChannelController
};