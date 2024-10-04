// @ts-nocheck
import { put } from "@vercel/blob";
import 'dotenv/config'; // This will automatically load .env variables

export const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !file.name) {
      return new Response('No valid file provided', { status: 400 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return new Response('Token not found', { status: 500 });
    }

    // Add check to ensure the file has a proper extension
    if (!file.name.toLowerCase().endsWith('.jpg') && !file.name.toLowerCase().endsWith('.jpeg') && !file.name.toLowerCase().endsWith('.png')) {
      return new Response('Unsupported file format. Only JPG, JPEG, and PNG files are allowed.', { status: 400 });
    }

    const { url } = await put(file.name, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN // Pass the token from the environment variable
    });

    if (!url) {
      return new Response('Failed to upload file', { status: 500 });
    }

    return new Response(JSON.stringify({ uploaded: url }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return new Response('Failed to upload file', { status: 500 });
  }
};
