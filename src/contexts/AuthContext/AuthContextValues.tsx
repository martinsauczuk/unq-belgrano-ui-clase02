import React from 'react';

export interface AuthContextValues {
    authenticated: boolean;
    login: React.Dispatch<React.SetStateAction<void>>;
    logout: React.Dispatch<React.SetStateAction<void>>;
}
