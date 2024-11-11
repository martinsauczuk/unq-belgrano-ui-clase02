import React from 'react';
import { useAuth } from '../../contexts';

export const Login: React.FC = () => {
    const { authenticated, login, logout } = useAuth();

    const handleLogin = () => {
        login();
    }

    const handleLogout = () => {
        logout();
    }

    return (
        <div>
            <h1>{authenticated ? 'Loggeado' : 'NO loggeado'}</h1>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
