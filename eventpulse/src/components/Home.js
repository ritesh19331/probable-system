// src/components/Dashboard.jsx
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Container } from 'lucide-react';
import ActivePostsList from './ActivePostsList';

const Home = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
     <div sx={{ mt: 4 }}>
        <ActivePostsList />
    </div>
  );
};

export default Home;
