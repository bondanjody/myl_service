import pool from '../config/database';
import { GetAllChannelByUserId, InputNewChannelService, OutputNewChannelService } from '../models/channelModel';

const getAllChannelService = async (data: GetAllChannelByUserId) => {
    const [rows]: any = await pool.execute('SELECT * FROM channel WHERE createdBy = ?',[data.userId]);
    return rows;
};

const createChannelService = async (data: InputNewChannelService): Promise<OutputNewChannelService> => {
    let result: OutputNewChannelService = {
        status: false,
        message: `Create channel FAILED !`
    }

    // Validasi jika channel sudah ada
    const [querySelect] = await pool.execute(
        'SELECT link FROM channel WHERE createdBy = ? AND link = ?',
        [data.userId, data.link]
    );
    if (Array.isArray(querySelect) && querySelect.length > 0) {
        // Channel sudah ada
        result.message = `Channel sudah ada !`
        return result
    }

    // Insert ke database
    const [queryInsert] = await pool.execute(
        'INSERT INTO channel (name, link, createdBy, createdAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
        [data.name, data.link, data.userId]
    );
    if (queryInsert) {
        // Berhasil insert
        result.status = true
        result.message = "Channel created !"
    }
    return result;
};

const updateChannelService = async (id: number, name: string) => {
    const [result] = await pool.execute(
        'UPDATE channel SET name = ? WHERE id = ?',
        [name, id]
    );
    return result;
};

const deleteChannelService = async (id: number) => {
    const [result] = await pool.execute(
        'DELETE FROM channel WHERE id = ?',
        [id]
    );
    return result;
};

export {
    getAllChannelService,
    createChannelService,
    updateChannelService,
    deleteChannelService
}
