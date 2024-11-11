import React from 'react';
import { AuthContextValues } from './AuthContextValues';

export const AuthContext: React.Context<AuthContextValues> = React.createContext<AuthContextValues>({
    authenticated: false,
    login: () => {},
    logout: () => {}
});
