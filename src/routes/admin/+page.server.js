// @ts-nocheck
import { error, json } from "@sveltejs/kit";
import { createPool } from '@vercel/postgres';
import { put } from "@vercel/blob"; // Import put for Blob storage
import { POSTGRES_URL } from '$env/static/private';



// Create a connection pool
const pool = createPool({
  connectionString: POSTGRES_URL
});

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    
    // Extract fields from form data
    const label = formData.get('label');
    const itemName = formData.get('itemName');
    const description = formData.get('description');
    const imageUrl = formData.get('image_url'); // Expect the image URL here
    const categoryType = formData.get('type');

    // Check for required fields
    if (!imageUrl || !itemName || !label || !categoryType) {
      console.log('Missing form data', { imageUrl, label, itemName, categoryType });
      throw error(400, 'Missing form data');
    }

    try {
      // Establish a database connection
      const client = await pool.connect();
      try {
        // Insert form data and the file URL into the database
        await client.query(
          `INSERT INTO food (name, label, description, image_url, category_id, date_added) 
          VALUES ($1, $2, $3, $4, $5, NOW())`,
          [itemName, label, description, imageUrl, categoryType]
        );
      } finally {
        client.release();
      }

      return { success: true };
    } catch (err) {
      console.error('Database insertion error:', err);
      throw error(500, 'Failed to insert data into the database');
    }
  }
};



// the bellow was being used before addapting the food api under api/food/+server.js + the modification the to /lib/db.js file 

// export const load = async () => {
//   try {
//     const client = await pool.connect();
//     try {
//       const { rows } = await client.query(`
//         SELECT 
//           food.id, 
//           food.name,
//           food.label,
//           food.description, 
//           food.image_url, 
//           food.date_added AT TIME ZONE 'Europe/Paris' AS date_added, 
//           category.category_name 
//         FROM food 
//         JOIN category 
//         ON food.category_id = category.id
//         ORDER BY food.date_added DESC
//       `);

//       // console.log('Data fetched from database:', rows);  // Add this line to log data from the DB

//       // Return data as a plain object
//       return {
//         items: rows.map(row => ({
//           id: row.id,
//           name: row.name,
//           label: row.label,
//           description: row.description,
//           image_url: row.image_url,
//           date_added: row.date_added.toISOString(),
//           category_name: row.category_name
//         }))
//       };
//     } finally {
//       client.release();
//     }
//   } catch (error) {
//     console.error('Error fetching food items:', error);  // More verbose logging
//     throw new Error('Failed to load food items.');
//   }
// };

