// @ts-nocheck
import { createPool } from '@vercel/postgres';  // Use @vercel/postgres for pooling
import { del } from '@vercel/blob';             // Vercel Blob delete API
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Get POSTGRES_URL from environment variables
import { POSTGRES_URL } from '$env/static/private';

// Create a connection pool
const pool = createPool({
  connectionString: POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false  // Optional: Adjust SSL config if needed
  }
});

// Export the pool for reuse
export { pool };

// Function to get food items
export async function getFoodItems() {
    const client = await pool.connect();  // Use pool connection

    try {
        const { rows } = await client.query(`
            SELECT 
              food.id, 
              food.name,
              food.label,
              food.description, 
              food.image_url, 
              food.date_added AT TIME ZONE 'Europe/Paris' AS date_added, 
              category.category_name,
              food.visible  -- Include the visible column
            FROM food 
            JOIN category 
            ON food.category_id = category.id
            ORDER BY food.date_added DESC
        `);
        
        return rows.map(row => ({
            id: row.id,
            name: row.name,
            label: row.label,
            description: row.description,
            image_url: row.image_url,
            date_added: row.date_added.toISOString(),
            category_name: row.category_name,
            visible: row.visible // Add the visible property
        }));
    } finally {
        client.release();  // Properly release the client back to the pool
    }
}
// Function to delete a food item by its ID
export async function deleteFoodItemById(id) {
    const client = await pool.connect();  // Use pool connection

    try {
        // Retrieve the image URL before deleting the record
        const { rows } = await client.query(`
            SELECT image_url 
            FROM food 
            WHERE id = $1
        `, [id]);

        if (rows.length === 0) {
            throw new Error('Food item not found');
        }

        const imageUrl = rows[0].image_url;

        // Log the image URL to check its format
        console.log('Image URL:', imageUrl);

        // Delete the image from Vercel Blob
        await del(imageUrl, {
            token: process.env.BLOB_READ_WRITE_TOKEN  // Ensure this token is set in your .env
        });

        // Delete the food item from the database
        await client.query(`
            DELETE FROM food 
            WHERE id = $1
        `, [id]);

        return { success: true };
    } catch (error) {
        console.error('Failed to delete food item:', error);
        throw error;
    } finally {
        client.release();  // Properly release the client back to the pool
    }
}


// Function to get the old image URL before replacing it
export async function getOldImageUrl(id) {
    const client = await pool.connect();

    try {
        const { rows } = await client.query(`SELECT image_url FROM food WHERE id = $1`, [id]);
        const oldImageUrl = rows[0]?.image_url || null;
        if (oldImageUrl) {
            console.log('Old image URL:', oldImageUrl);
        } else {
            console.log('Old image URL not found or bugged out');
        }
        return oldImageUrl;
    } catch (error) {
        console.error('Failed to fetch old image URL:', error);
        throw error;
    } finally {
        client.release();
    }
}


// Function to update food item data, including replacing the image URL
export async function patchFoodItem(id, updateData) {
    const client = await pool.connect();
    const { name, label, description, categoryType, imageUrl } = updateData;

    const updateFields = [];
    const updateValues = [];
    let queryIndex = 1;

    if (name) {
        updateFields.push(`name = $${queryIndex++}`);
        updateValues.push(name);
    }

    if (label) {
        updateFields.push(`label = $${queryIndex++}`);
        updateValues.push(label);
    }

    // Handle empty descriptions (set to NULL or empty string)
    if (description !== undefined) {
        updateFields.push(`description = $${queryIndex++}`);
        updateValues.push(description === '' ? '' : description);  // Convert empty string to empty string
    }

    if (categoryType) {
        updateFields.push(`category_id = $${queryIndex++}`);
        updateValues.push(categoryType);
    }

    if (imageUrl) {
        updateFields.push(`image_url = $${queryIndex++}`);
        updateValues.push(imageUrl);
    }

    if (updateFields.length > 0) {
        const updateQuery = `
            UPDATE food
            SET ${updateFields.join(', ')}
            WHERE id = $${queryIndex}
        `;
        await client.query(updateQuery, [...updateValues, id]);
    }

    return { success: true };
}


// Function to update the visibility of a food item
export async function updateVisibility(id, visible) {
    const client = await pool.connect();
    
    try {
        // Update the visibility column in the database
        await client.query(`
            UPDATE food
            SET visible = $1
            WHERE id = $2
        `, [visible, id]);

        return { success: true };
    } catch (error) {
        console.error('Failed to update visibility:', error);
        throw error;
    } finally {
        client.release();
    }
}


