// @ts-nocheck
import jwt from 'jsonwebtoken';

export async function handle({ event, resolve }) {
  const token = event.request.headers.get('authorization')?.split(' ')[1];

  if (token) {
    try {
      const user = jwt.verify(token, 'your_jwt_secret');
      event.locals.user = user;
    } catch (error) {
      console.log('Invalid token:', error);
    }
  }

  const response = await resolve(event);
  return response;
}
