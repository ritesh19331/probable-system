import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // or use a context/store
    navigate('/auth');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          FoodShare
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={RouterLink} to="/home" color="inherit">Home</Button>
          <Button component={RouterLink} to="/create-post" color="inherit">Create Post</Button>
          {/* <Button component={RouterLink} to="/my-posts" color="inherit">My Posts</Button> */}
          <Button onClick={handleLogout} color="inherit">Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
