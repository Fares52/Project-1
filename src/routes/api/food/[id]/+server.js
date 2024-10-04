// @ts-nocheck
// src/routes/api/food/[id]/+server.js
import { deleteFoodItemById } from '$lib/db'; // Correct import for your delete function
import { json } from '@sveltejs/kit';
import { del } from '@vercel/blob';
import { pool } from '$lib/db'; // Correct path to your database pool
import { patchFoodItem, getOldImageUrl } from '$lib/db';

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
    const { id } = params; // Get the food item ID from the request
    const data = await request.json(); // Parse the incoming update data

    try {
        // Step 1: Retrieve the old image URL before updating
        const oldImageUrl = await getOldImageUrl(id);

        // Step 2: Update the food item in the database
        const updatedItem = await patchFoodItem(id, data);

        // Step 3: If a new image is uploaded, delete the old image from the blob store
        if (data.imageUrl && oldImageUrl) {
            // Validate old image URL before processing
            try {
                const oldImageKey = new URL(oldImageUrl).pathname.substring(1); // Get the blob key (strip leading "/")
                
                if (oldImageKey) {
                    await del(oldImageKey, {
                        token: process.env.BLOB_READ_WRITE_TOKEN // Ensure you use the correct token
                    });
                    console.log(`Deleted old image: ${oldImageUrl}`);
                } else {
                    console.error('Old image key is invalid.');
                }
            } catch (urlError) {
                console.error('Failed to parse old image URL:', urlError);
            }
        }

        return json({ message: 'Food item updated successfully', updatedItem }, { status: 200 });
    } catch (error) {
        console.error('Failed to update food item:', error);
        return json({ error: 'Failed to update food item' }, { status: 500 });
    }
}