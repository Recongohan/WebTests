import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'wouter';

interface Project {
  id: number;
  name: string;
  description: string;
  deadline: string;
  completed: boolean;
  leadId?: number;
  developerIds: number[];
  documents: string[];
}

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/');
    axios.get('/api/projects', { headers: { Authorization: `Bearer ${token}` } }).then(res => setProjects(res.data));
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard ({role})</h1>
      <ul>
        {projects.map(p => (
          <li key={p.id} className="mb-2 border p-2">
            <a href={`/project/${p.id}`} className="text-blue-600">
              {p.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
