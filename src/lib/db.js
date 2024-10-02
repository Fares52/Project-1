import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg;

const client = new Client({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));

export default client;


import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';

// Create a pool to reuse connections
const pool = createPool({
    connectionString: POSTGRES_URL
});

// Define a function to get food items
export async function getFoodItems() {
    const client = await pool.connect();

    try {
        const { rows } = await client.query(`
            SELECT 
              food.id, 
              food.name,
              food.label,
              food.description, 
              food.image_url, 
              food.date_added AT TIME ZONE 'Europe/Paris' AS date_added, 
              category.category_name 
            FROM food 
            JOIN category 
            ON food.category_id = category.id
            ORDER BY food.date_added DESC
        `);
        
        // Map the result and return as a simple array
        return rows.map(row => ({
            id: row.id,
            name: row.name,
            label: row.label,
            description: row.description,
            image_url: row.image_url,
            date_added: row.date_added.toISOString(),
            category_name: row.category_name
        }));
    } finally {
        client.release();
    }
}
