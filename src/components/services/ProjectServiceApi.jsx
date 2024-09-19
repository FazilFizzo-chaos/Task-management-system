import { apiClient } from "../api/ApiClient";

export const getAllProjects = () => {
    apiClient.get(`/api/pm/projects`)
}

export const getProjectById = (id) => {
    apiClient.get(`/api/pm/projects/${id}`)
}

export const createProject = (project) => {
    apiClient.post(`/api/pm/projects`, project)
}

export const updateProject = (id, project) => {
    apiClient.put(`/api/pm/projects/${id}`, project)
}

export const deleteProject = (id) => {
    apiClient.delete(`/api/pm/projects/${id}`)
}