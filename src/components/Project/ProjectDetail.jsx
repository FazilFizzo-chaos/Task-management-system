import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from 'flowbite-react';
import { useAuth } from '../contexts/AuthContext';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const { token } = useAuth()

  useEffect(() => {
    // Fetch project by ID from the backend (API call)
    const fetchProject = async () => {
      const response = await fetch(`http://localhost:8089/api/projects/${id}`, {
        headers: {
          Authorization: token,
        }
      });
      const data = await response.json();
      setProject(data);
    };

    fetchProject();
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
      <p className="mb-2"><strong>Description:</strong> {project.description}</p>
      <p className="mb-2"><strong>Due Date:</strong> {new Date(project.dueDate).toLocaleDateString()}</p>

      {/* <div className="mt-4">
        <h3 className="text-lg font-semibold">Progress</h3>
        <Progress progress={project.progress} color={project.progress < 50 ? 'red' : 'green'} />
        <span>{project.progress}%</span>
      </div> */}

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Status</h3>
        <Badge color={project.status === 'completed' ? 'green' : 'blue'}>
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </Badge>
      </div>
    </div>
  );
};

export default ProjectDetail;
