import { Request, Response } from 'express';
import { getAllChannelService, createChannelService, updateChannelService, deleteChannelService } from '../services/channelService';
import { GetAllChannelByUserId, InputNewChannelService, OutputNewChannelService } from '../models/channelModel';

const getAllChannelsController = async (req: Request, res: Response) => {
    try {
        const newChannel: GetAllChannelByUserId = req.body
        const getChannel = await getAllChannelService(newChannel);
        res.json(getChannel);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const createChannelController = async (req: Request, res: Response) => {
    let result: OutputNewChannelService = {
        status : false,
        message : "Failed to create channel !"
    }
    try {
        const data: InputNewChannelService = req.body;

        // Validasi input
        if (!data.name || typeof data.name !== 'string') {
            result.message = "Channel 'name' harus diisi dan bernilai string !"
            return res.status(500).json(result);
        }
        if (!data.link || typeof data.link !== 'string') {
            result.message = "Channel 'link' harus diisi dan bernilai string !"
            return res.status(500).json(result);
        }
        const category = await createChannelService(data);

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