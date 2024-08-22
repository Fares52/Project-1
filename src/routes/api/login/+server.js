import db from '$lib/db'; // Adjust the path as necessary
import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export async function POST({ request }) {
  const { username, password } = await request.json();

  const res = await db.query('SELECT id, username, password FROM users WHERE username = $1', [username]);
  const user = res.rows[0];

  if (user && await bcrypt.compare(password, user.password)) {
    // Authentication successful
    return json({ id: user.id, username: user.username });
  } else {
    // Authentication failed
    return json({ error: 'Invalid username or password' }, { status: 401 });
  }
}
