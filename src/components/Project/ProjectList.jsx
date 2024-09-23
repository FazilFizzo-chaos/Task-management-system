import React, { useEffect, useState } from 'react';
import { Table, Badge, Spinner, Alert } from 'flowbite-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8089/api/pm/projects', {
          headers: {
            Authorization: token,
          }
        });
        setProjects(response.data);
      } catch (error) {
        setError('Failed to fetch projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <Spinner aria-label="Loading projects" />;
  if (error) return <Alert color="red">{error}</Alert>;

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>Project Name</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Budget</Table.HeadCell>
            <Table.HeadCell>Start Date</Table.HeadCell>
            <Table.HeadCell>End Date</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {projects.map((project) => (
              <Table.Row key={project.id}>

                <Table.Cell>{project.name}</Table.Cell>
                <Table.Cell>{project.description.slice(0, 50)}{project.description.length > 50 && '...'}</Table.Cell>
                <Table.Cell>{new Date(project.startDate).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{new Date(project.endDate).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  <Badge color={project.status === 'completed' ? 'green' : 'blue'}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{project.budget}</Table.Cell>
                <Table.Cell>
                  <Link to={`/dashboard/projects/${project.id}`} className="text-blue-500 hover:underline">
                       View Details
                       </Link>

                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default ProjectList;
