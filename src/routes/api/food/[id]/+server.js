// @ts-nocheck
// src/routes/api/food/[id]/+server.js
import { deleteFoodItemById } from '$lib/db'; // Correct import for your delete function
import { json } from '@sveltejs/kit';
import { del } from '@vercel/blob';
import { pool } from '$lib/db'; // Correct path to your database pool
import { patchFoodItem, getOldImageUrl, updateVisibility } from '$lib/db'; // Add updateVisibility from db.js

// DELETE endpoint for deleting a food item and its image
export async function DELETE({ params }) {
    const { id } = params;  // Get the food item ID from the request

    try {
        const result = await deleteFoodItemById(id);

        if (!result || !result.success) {
            return json({ error: 'Food item not found' }, { status: 404 });
        }

        return json({ message: 'Food item and image deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Failed to delete food item:', error);
        return json({ error: 'Failed to delete food item' }, { status: 500 });
    }
}

// PATCH endpoint for updating a food item
// Helper function to upload images to Vercel Blob (implement this)
async function uploadImageToBlob(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);
    const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    return data.uploaded;  // return the new image URL
}

export async function PATCH({ params, request }) {
    const { id } = params;  // Get the food item ID from the request
    const data = await request.json(); // Parse the incoming update data

    try {
        // Check if visibility update is requested
        if (data.hasOwnProperty('visible')) {
            // Handle visibility update
            await updateVisibility(id, data.visible);
            return json({ message: 'Visibility updated successfully' }, { status: 200 });
        }

        // For other regular updates (e.g., name, description, image)
        const oldImageUrl = await getOldImageUrl(id);  // Get old image URL

        const updatedItem = await patchFoodItem(id, data);  // Update the item

        // If new image uploaded, delete old image
        if (data.imageUrl && oldImageUrl) {
            try {
                await del(oldImageUrl, {
                    token: process.env.BLOB_READ_WRITE_TOKEN
                });
                console.log(`Deleted old image: ${oldImageUrl}`);
            } catch (urlError) {
                console.error('Failed to delete old image from blob:', urlError);
            }
        }

        return json({ message: 'Food item updated successfully', updatedItem }, { status: 200 });
    } catch (error) {
        console.error('Failed to update food item:', error);
        return json({ error: 'Failed to update food item' }, { status: 500 });
    }
}

