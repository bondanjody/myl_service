import { Request, Response } from 'express';
import { InputNewVideoService, OutputNewVideoService } from '../models/videoModel';
import { createVideoService } from '../services/videoService';

const createVideController = async (req: Request, res: Response) => {
    let result: OutputNewVideoService = {
        status : false,
        message : "Failed to create channel !"
    }
    try {
        const data: InputNewVideoService = req.body;

        // Validasi input
        const titleTest: string = data.title.trim()
        const linkTest: string = data.link.trim()
        if (!data.title || typeof data.title !== 'string' || titleTest.length == 0) {
            result.message = "Video 'title' harus diisi dan bernilai string !"
            return res.status(500).json(result);
        }
        if (!data.link || typeof data.link !== 'string' || linkTest.length == 0) {
            result.message = "Video 'link' harus diisi dan bernilai string !"
            return res.status(500).json(result);
        }
        if (typeof data.categoryId !== 'number') {
            result.message = "Video 'categoryId' harus diisi dan bernilai number !"
            return res.status(500).json(result);
        }
        if (typeof data.channelId !== 'number') {
            result.message = "Video 'channelId' harus diisi dan bernilai number !"
            return res.status(500).json(result);
        }
        const videoInsert = await createVideoService(data);

        if (!videoInsert.status) {
            // Jika error
            res.status(500).json(videoInsert);
        } else {
            // Jika berhasil
            res.status(201).json(videoInsert);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

export {
    createVideController
}