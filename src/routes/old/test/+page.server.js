import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';

const pool = createPool({
    connectionString: POSTGRES_URL,
});

export async function load() {
    const { rows } = await pool.query('SELECT * FROM foods');
    return { foods: rows };
}

export const actions = {
    create: async ({ request }) => {
        const form = await request.formData();
        const info = form.get('info');
        const text = form.get('text');

        try {
            await pool.query('INSERT INTO foods (info, text) VALUES ($1, $2)', [info, text]);
            return { success: true };
        } catch (error) {
            if (error instanceof Error) {
                return {
                    error: true,
                    message: error.message,
                };
            } else {
                return {
                    error: true,
                    message: 'Unknown error occurred',
                };
            }
        }
    },

    delete: async ({ request }) => {
        const form = await request.formData();
        const id = form.get('id');

        try {
            await pool.query('DELETE FROM foods WHERE id = $1', [id]);
            return { success: true };
        } catch (error) {
            if (error instanceof Error) {
                return {
                    error: true,
                    message: error.message,
                };
            } else {
                return {
                    error: true,
                    message: 'Unknown error occurred',
                };
            }
        }
    }
};
