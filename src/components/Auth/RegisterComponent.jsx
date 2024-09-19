import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import axios from 'axios';

function RegisterComponent() {
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: []
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const authContext = useAuth();

    useEffect(() => {
        axios.get('http://localhost:8089/api/roles')
            .then((response) => {
                setRoles(response.data);
            })
            .catch((error) => {
                console.error('Error fetching roles:', error);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleRoleChange = (e) => {
        const selectedRole = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({...formData, role: selectedRole});
    };

    function handleConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value);
    }

    async function handleSubmit() {
        const { username, email, password } = formData;
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            setShowErrorMessage(true);
            return;
        }
        const result = await authContext.register(username, email, password);
        console.log(result);
        if (result.success) {
            navigate('/login');

        } else {
            setErrorMessage(result.message || 'Registration failed.');
            setShowErrorMessage(true);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

                {showErrorMessage && 
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                }

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">User Name</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Roles</label>
                        <select
                            multiple={true}
                            value={formData.role}
                            onChange={handleRoleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            {roles.map(role => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterComponent;
