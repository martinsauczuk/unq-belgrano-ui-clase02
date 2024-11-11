import React from 'react';
import { Link } from 'react-router-dom';

export const Nav: React.FC = () =>
    <div>
        <Link to="/cyan">Cyan</Link>
        <Link to="/yellow">Yellow</Link>
        <Link to="/magenta">Magenta</Link>
        <Link to="/green">Green</Link>
        <Link to="/purple">Purple</Link>
        <Link to="/orange">Orange</Link>
        <Link to="/black">Black</Link>
        <Link to="/white">White</Link>
    </div>