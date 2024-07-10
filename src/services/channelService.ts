import pool from '../config/database';

const getAllChannelService = async () => {
    const [rows]: any = await pool.execute('SELECT * FROM channel');
    return rows;
};

const createChannelService = async (name: string) => {
    const [result] = await pool.execute(
        'INSERT INTO channel (name) VALUES (?)',
        [name]
    );
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
