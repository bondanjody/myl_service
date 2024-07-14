import pool from '../config/database';
import { InputNewVideoService, OutputNewVideoService } from '../models/videoModel';

const createVideoService = async (data: InputNewVideoService): Promise<OutputNewVideoService> => {
    let result: OutputNewVideoService = {
        status: false,
        message: `FAILED to save video !`
    }

    // Validasi jika Channel ID valid
    const [querySelectChannelId] = await pool.execute(
        'SELECT * FROM channel WHERE createdBy = ? AND id = ?',
        [data.userId, data.channelId]
    );
    if (Array.isArray(querySelectChannelId) && querySelectChannelId.length == 0) {
        // Video sudah ada
        result.message = `Invalid Channel ID !`
        return result
    }

    // Validasi jika Category ID valid
    const [querySelectCategoryId] = await pool.execute(
        'SELECT * FROM category WHERE createdBy = ? AND id = ?',
        [data.userId, data.categoryId]
    );
    if (Array.isArray(querySelectCategoryId) && querySelectCategoryId.length == 0) {
        // Video sudah ada
        result.message = `Invalid Category ID !`
        return result
    }

    // Validasi jika video sudah ada
    const [querySelectVideo] = await pool.execute(
        'SELECT * FROM video WHERE createdBy = ? AND link = ?',
        [data.userId, data.link]
    );
    if (Array.isArray(querySelectVideo) && querySelectVideo.length > 0) {
        // Video sudah ada
        result.message = `Video already exists !`
        return result
    }

    const [queryInsert] = await pool.execute(
        'INSERT INTO video (title, link, category, channel, createdBy, createdAt) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
        [data.title, data.link, data.categoryId, data.channelId, data.userId]
    );
    if (queryInsert) {
        result.status = true
        result.message = "Video saved !"
    }
    return result;
};

export {
    createVideoService
}