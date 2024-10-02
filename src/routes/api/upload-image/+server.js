// @ts-nocheck
import { put } from "@vercel/blob";
import 'dotenv/config'; // This will automatically load .env variables

export const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response('No file provided', { status: 400 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return new Response('Token not found', { status: 500 });
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

