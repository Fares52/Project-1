import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

const pool = createPool({
    connectionString: POSTGRES_URL,
});

export async function load() {
    const { rows } = await pool.query('SELECT * FROM foods');
    return { foods: rows };
}

export const actions = {
    default: async ({ request }) => {  // Change 'create' to 'default'
        const form = await request.formData();
        const info = form.get('info');
        const text = form.get('text');

        try {
            await pool.query('INSERT INTO foods (info, text) VALUES ($1, $2)', [info, text]);

            // Redirect after successful creation to avoid form resubmission issues
            throw redirect(303, '/test');
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
