import React, { PropsWithChildren, useState } from 'react';

import { AuthContext } from './AuthContext';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const AuthContextProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);

    const login = () => {
        setAuthenticated(true);
    }

    const logout = () => {
        setAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ authenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
