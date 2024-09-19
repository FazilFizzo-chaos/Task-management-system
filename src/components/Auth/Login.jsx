import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function LoginComponent() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate()
    const authContext = useAuth()

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleSubmit() {
        if(await authContext.login(username, password)){
            navigate(`/dashboard`)
        } else {
            setShowErrorMessage(true)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>

                {showErrorMessage && (
                    <div className="text-red-600 text-center font-semibold py-2">
                        Authentication Failed. Please check your credentials.
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">User Name:</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleUsernameChange}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 block shadow-sm sm:text-sm"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 block shadow-sm sm:text-sm"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            name="login"
                            onClick={handleSubmit}
                            className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Log in
                        </button>
                    </div>

                    <div className="text-center text-sm text-gray-500 mt-3">
                        <a href="/forgot-password" className="underline hover:text-blue-600">Forgot your password?</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent
