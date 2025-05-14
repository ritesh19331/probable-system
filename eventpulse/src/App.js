import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import Dashboard from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar'; // NEW

// Pages
import Signup from './Auth/Signup';
import PostForm from './components/PostForm';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/auth" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Home route with Navbar */}
        <Route path="/home" element={
          <>
            <Navbar /> {/* Navbar added */}
            <Home />
          </>
        } />

        {/* Protected routes with Navbar */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <PostForm />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/my-posts"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                {/* <MyPosts /> */}
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <>
                <Navbar />
              </>
            </PrivateRoute>
          }
        />

        {/* Redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
