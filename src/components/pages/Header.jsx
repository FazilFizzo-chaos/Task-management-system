import React from 'react';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
    return (
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">
                    <Link to="/" className="hover:text-gray-200">
                        Task Manager
                    </Link>
                </div>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-gray-300">
                        Home
                    </Link>
                    <Link to="/login" className="hover:text-gray-300">
                        Login
                    </Link>
                    <Link to="/register" className="hover:text-gray-300">
                        Register
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;
