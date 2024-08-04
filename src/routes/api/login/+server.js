import client from '$lib/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '$lib/db';


export async function POST({ request }) {
  const { username, password } = await request.json();
  
  const res = await db.query('SELECT id, username, password FROM users WHERE username = $1', [username]);
  const user = res.rows[0];
  
  if (user && await bcrypt.compare(password, user.password)) {
    // Create a JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return new Response(JSON.stringify({ error: 'Invalid username or password' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
