import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { users } from './data.js';
import { Role } from './models.js';

const secret = process.env.JWT_SECRET || 'change_me';

export interface AuthRequest extends Request {
  user?: { id: number; role: Role };
}

export function generateToken(id: number, role: Role) {
  return jwt.sign({ id, role }, secret, { expiresIn: '1h' });
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'Missing token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, secret) as { id: number; role: Role };
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export function requireRole(role: Role) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}
