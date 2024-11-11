import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './contexts';

export const Protected: React.FC = () => {
  const { authenticated } = useAuth();

  return authenticated ? <Outlet/> : <Navigate to="/cyan"/>;
}
