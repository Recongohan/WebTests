import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useRoute } from 'wouter';

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

export default function ProjectPage() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute('/project/:id');
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/');
    axios.get('/api/projects', { headers: { Authorization: `Bearer ${token}` } }).then(res => {
      const p = res.data.find((x: Project) => x.id === parseInt(params!.id));
      setProject(p);
    });
  }, [navigate, params]);

  if (!project) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-2">{project.name}</h1>
      <p>{project.description}</p>
      <p className="text-sm text-gray-500">Deadline: {project.deadline}</p>
      <h2 className="mt-4 mb-2 font-semibold">Documents</h2>
      <ul>
        {project.documents.map(doc => (
          <li key={doc}><a href={`/${doc}`} className="text-blue-600">{doc}</a></li>
        ))}
      </ul>
    </div>
  );
}
