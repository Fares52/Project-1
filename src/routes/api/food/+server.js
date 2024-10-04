    // @ts-nocheck
    import { getFoodItems } from '$lib/db';
    import { json } from '@sveltejs/kit';


    export async function GET() {
        try {
            const items = await getFoodItems();
            return json({ items });
        } catch (error) {
            console.error('Failed to fetch food items:', error);
            return new Response('Error fetching food items', { status: 500 });
        }
    }
