import { apiClient } from "../api/ApiClient"


//for executing jwt authentication
export const executeJwtAuthenticationService
    = (username, password) => { return  apiClient.post(`/api/auth/authenticate`, {username,password})}
       

    export const registerUserService = (username, email, password) => {
    return apiClient.post(`/api/auth/register`, {
        username,
        email,
        password
    });
};