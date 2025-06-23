import { User, Project } from './models.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const users: User[] = [];
const projects: Project[] = [];

// Initialize admin user from env
const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
const adminHash = bcrypt.hashSync(adminPassword, 10);
users.push({ id: 1, email: adminEmail, passwordHash: adminHash, role: 'Admin' });

export { users, projects };
