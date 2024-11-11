import { useContext } from 'react';

import { AuthContext } from './AuthContext';
import { AuthContextValues } from './AuthContextValues';


export const useAuth = (): AuthContextValues => useContext(AuthContext);
