import React, { useState, useEffect } from 'react';
import { Label, TextInput, Textarea, Button, Select } from 'flowbite-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'

const ProjectForm = ({ projectData }) => {
  const [formData, setFormData] = useState(projectData || {
    projectName: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    status: '',
    projectManagerId: '',
    assignedEmployeeIds: [],
    tasks: [{ taskName: '', taskDescription: '', status: '', startDate: '', dueDate: '' }]
  });
  const [employees, setEmployees] = useState([]);
  const [projectManagers, setProjectManagers] = useState([]);

  const { token } = useAuth();

  useEffect(() => {
    // Fetch employees and project managers on component mount
    const fetchData = async () => {
      try {
       const [employeeResponse, projectManagerResponse] = await Promise.all([
          axios.get('http://localhost:8089/api/pm/employees', { headers: { Authorization: token } }),
          axios.get('http://localhost:8089/api/pm/project-managers', { headers: { Authorization: token } })
        ]);
        setEmployees(employeeResponse.data);
        setProjectManagers(projectManagerResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (index, e) => {
    const { name, value } = e.target;
    const tasks = [...formData.tasks];
    tasks[index] = { ...tasks[index], [name]: value };
    setFormData({ ...formData, tasks });
  };

  const handleAddTask = () => {
    setFormData({
      ...formData,
      tasks: [...formData.tasks, { taskName: '', taskDescription: '', status: '', startDate: '', dueDate: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
            ...formData,
        };

        // Send projectData to backend
        axios.post('http://localhost:8089/api/pm', {
           headers: {
            Authorization: token,
           }
        }, projectData)
            .then(response => {
                console.log('Project created successfully:', response.data);
            })
            .catch(error => {
                console.error('Error creating project:', error);
            });
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">{projectData ? 'Edit Project' : 'Create New Project'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="project name" value="Project Name" />
          <TextInput
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
            placeholder="Enter project name"
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="description" value="Project Description" />
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the project"
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="startDate" value="Start Date" />
          <TextInput
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="dueDate" value="Due Date" />
          <TextInput
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="budget" value="Budget" />
          <TextInput
            id="budget"
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleInputChange}
            placeholder="Enter project budget"
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="status" value="Status" />
          <Select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="projectManagerId" value="Project Manager" />
          <Select
            id="projectManagerId"
            name="projectManagerId"
            value={formData.projectManagerId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Project Manager</option>
            {projectManagers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </Select>
        </div>
        
        <div className="mb-4">
          <Label htmlFor="assignedEmployees" value="Assigned Employees" />
          <Select
            id="assignedEmployees"
            name="assignedEmployeeIds"
            value={formData.assignedEmployeeIds}
            onChange={(e) => setFormData({ ...formData, assignedEmployeeIds: [...e.target.selectedOptions].map(option => option.value) })}
            multiple
            required
          >
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Tasks</h3>
          {formData.tasks.map((task, index) => (
            <div key={index} className="mb-4">
              <div className="mb-2">
                <Label htmlFor={`taskName_${index}`} value={`Task Name ${index + 1}`} />
                <TextInput
                  id={`taskName_${index}`}
                  name="taskName"
                  value={task.taskName}
                  onChange={(e) => handleArrayChange(index, e)}
                  placeholder="Task name"
                  required
                />
              </div>
              <div className="mb-2">
                <Label htmlFor={`taskDescription_${index}`} value={`Task Description ${index + 1}`} />
                <Textarea
                  id={`taskDescription_${index}`}
                  name="taskDescription"
                  value={task.taskDescription}
                  onChange={(e) => handleArrayChange(index, e)}
                  placeholder="Task description"
                  required
                />
              </div>
              <div className="mb-2">
                <Label htmlFor={`status_${index}`} value={`Task Status ${index + 1}`} />
                <Select
                  id={`status_${index}`}
                  name="status"
                  value={task.status}
                  onChange={(e) => handleArrayChange(index, e)}
                  required
                >
                  <option value="">Select status</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Select>
              </div>
              <div className="mb-2">
                <Label htmlFor={`startDate_${index}`} value={`Task Start Date ${index + 1}`} />
                <TextInput
                  id={`startDate_${index}`}
                  name="startDate"
                  type="date"
                  value={task.startDate}
                  onChange={(e) => handleArrayChange(index, e)}
                  required
                />
              </div>
              <div className="mb-2">
                <Label htmlFor={`dueDate_${index}`} value={`Task Due Date ${index + 1}`} />
                <TextInput
                  id={`dueDate_${index}`}
                  name="dueDate"
                  type="date"
                  value={task.dueDate}
                  onChange={(e) => handleArrayChange(index, e)}
                  required
                />
              </div>
            </div>
          ))}
          <Button type="button" onClick={handleAddTask}>Add Task</Button>
        </div>
        <Button type="submit">{projectData ? 'Update Project' : 'Create Project'}</Button>
      </form>
    </div>
  );
};

export default ProjectForm;
