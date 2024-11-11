import React from 'react';
import { Outlet } from 'react-router-dom';

export const Secondary: React.FC = () =>
  <>
    <h1>Un color secundario</h1>
    <Outlet/>
  </>
