import { Router } from 'express';
import bcrypt from 'bcrypt';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { users } from '../data.js';
import { generateToken, authenticate, AuthRequest } from '../auth.js';
import { Role } from '../models.js';

const router = Router();

router.post('/login', (req, res) => {
  const { email, password, token } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  if (!bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  if (user.totpSecret) {
    if (!token || !speakeasy.totp.verify({ secret: user.totpSecret, encoding: 'base32', token })) {
      return res.status(401).json({ message: 'Invalid TOTP' });
    }
  }
  const jwt = generateToken(user.id, user.role);
  res.json({ token: jwt, role: user.role });
});

router.post('/register', authenticate, (req: AuthRequest, res) => {
  if (req.user?.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });
  const { email, password, role } = req.body as { email: string; password: string; role: Role };
  if (users.find(u => u.email === email)) return res.status(400).json({ message: 'Exists' });
  const id = users.length + 1;
  const passwordHash = bcrypt.hashSync(password, 10);
  users.push({ id, email, passwordHash, role });
  res.json({ id, email, role });
});

router.post('/setup-mfa', authenticate, async (req: AuthRequest, res) => {
  const user = users.find(u => u.id === req.user!.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  const secret = speakeasy.generateSecret();
  user.totpSecret = secret.base32;
  const qr = await qrcode.toDataURL(secret.otpauth_url!);
  res.json({ qr });
});

export default router;
