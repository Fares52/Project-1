import { pool } from '$lib/db';  // Use pool instead of db
import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export async function POST({ request }) {
  const { username, password } = await request.json();

  // Get a connection from the pool
  const client = await pool.connect();

  try {
    // Query the database for the user's information
    const res = await client.query('SELECT id, username, password FROM users WHERE username = $1', [username]);
    const user = res.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
      // Authentication successful
      return json({ id: user.id, username: user.username });
    } else {
      // Authentication failed
      return json({ error: 'Invalid username or password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    // Always release the client back to the pool
    client.release();
  }
}
