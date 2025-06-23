import { Router } from 'express';
import multer from 'multer';
import { projects, users } from '../data.js';
import { authenticate, AuthRequest, requireRole } from '../auth.js';
import { Project } from '../models.js';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.use(authenticate);

router.get('/', (_req, res) => {
  res.json(projects.filter(p => !p.completed));
});

router.post('/', requireRole('Admin'), (req: AuthRequest, res) => {
  const { name, description, deadline } = req.body;
  const id = projects.length + 1;
  const project: Project = { id, name, description, deadline, completed: false, developerIds: [], documents: [] };
  projects.push(project);
  res.json(project);
});

router.delete('/:id', requireRole('Admin'), (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = projects.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  projects.splice(idx, 1);
  res.json({});
});

router.post('/:id/complete', requireRole('Admin'), (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id, 10));
  if (!project) return res.status(404).json({ message: 'Not found' });
  project.completed = true;
  res.json(project);
});

router.post('/:id/assign', requireRole('Lead'), (req: AuthRequest, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id, 10));
  if (!project) return res.status(404).json({ message: 'Not found' });
  const { developerId } = req.body;
  const user = users.find(u => u.id === developerId && u.role === 'Developer');
  if (!user) return res.status(400).json({ message: 'Invalid developer' });
  if (!project.developerIds.includes(developerId)) project.developerIds.push(developerId);
  res.json(project);
});

router.post('/:id/upload', requireRole('Lead'), upload.single('file'), (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id, 10));
  if (!project) return res.status(404).json({ message: 'Not found' });
  project.documents.push(req.file!.path);
  res.json(project);
});

export default router;
