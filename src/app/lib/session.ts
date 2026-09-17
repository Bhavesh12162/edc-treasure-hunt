import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) return null;

  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { teamId: string; teamCode: string };
  } catch {
    return null;
  }
}