import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid, TextField, MenuItem,
  Select, InputLabel, FormControl, CircularProgress, Chip, Tooltip,
  Divider, ToggleButtonGroup, ToggleButton
} from '@mui/material';
import { LocationOn, CalendarToday, LocalOffer, Map, List } from '@mui/icons-material';
import api from '../utils/api';
import PostMapView from './PostMapView'; // Make sure to create this component

const ActivePostsList = () => {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({ type: '', expiryDate: '', distance: '' });
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list');

  useEffect(() => {
    api.get('/food-posts')
      .then(response => {
        setPosts(response?.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  const handleClaim = async (postId) => {
  const token = localStorage.getItem('token'); // or your auth method
  const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

  if (!token || !userId) {
    window.location.href = '/login'; // redirect if not logged in
    return;
  }

  try {
    await api.post(`/posts/${postId}/claim/?userId=${userId}`);
    alert('Claim request sent successfully!');
  } catch (error) {
    console.error('Error sending claim request:', error);
    alert('Failed to send claim request.');
  }
};


  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleViewChange = (_, newView) => {
    if (newView) setView(newView);
  };

  const filteredPosts = posts.filter(post => {
    const { type, expiryDate, distance } = filters;
    return (
      (!type || post.type === type) &&
      (!expiryDate || post.expiryDate <= expiryDate) &&
      (!distance || (post.distanceKm ?? 0) <= parseInt(distance))
    );
  });

  if (loading) {
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box px={{ xs: 2, md: 4 }} py={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight="bold">
          🍱 Active Food Posts
        </Typography>

        {/* View Toggle */}
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          size="small"
        >
          <ToggleButton value="list"><List sx={{ mr: 1 }} /> List</ToggleButton>
          <ToggleButton value="map"><Map sx={{ mr: 1 }} /> Map</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Filter Section */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={filters.type}
              label="Type"
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Donate">Donate</MenuItem>
              <MenuItem value="Request">Request</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Max Expiry Date"
            name="expiryDate"
            type="date"
            value={filters.expiryDate}
            onChange={handleFilterChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Distance</InputLabel>
            <Select
              name="distance"
              value={filters.distance}
              label="Distance"
              onChange={handleFilterChange}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="5">Less than 5 km</MenuItem>
              <MenuItem value="10">Less than 10 km</MenuItem>
              <MenuItem value="20">Less than 20 km</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* View Rendering */}
      {view === 'map' ? (
        <PostMapView posts={filteredPosts} />
      ) : (
        <Grid container spacing={3}>
          {filteredPosts.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="body1" color="text.secondary">
                No posts match the selected filters.
              </Typography>
            </Grid>
          ) : (
            filteredPosts.map(post => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 4,
                    boxShadow: 3,
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.02)' },
                  }}
                >
                  <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Chip
                            label={post.type}
                            color={post.type === 'Donate' ? 'success' : 'warning'}
                            size="small"
                            />
                            <Tooltip title="Distance from you">
                            <Typography variant="body2" color="text.secondary">
                                📍 {post.distanceKm ?? 'N/A'} km
                            </Typography>
                            </Tooltip>
                        </Box>

                        <Typography variant="h6" gutterBottom>
                            {post.description}
                        </Typography>

                        <Box display="flex" alignItems="center" mb={1}>
                            <LocalOffer fontSize="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">Qty: {post.quantity}</Typography>
                        </Box>

                        <Box display="flex" alignItems="center" mb={1}>
                            <LocationOn fontSize="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">{post.location}</Typography>
                        </Box>

                        <Box display="flex" alignItems="center" mb={1}>
                            <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">Expiry: {post.expiryDate}</Typography>
                        </Box>

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="caption" color="text.secondary">
                            Last updated: {post.updatedAt || 'N/A'}
                        </Typography>

                        {post.type === 'DONATE' && (
                            <Box mt={2} textAlign="right">
                            <button
                                onClick={() => handleClaim(post.id)}
                                style={{
                                padding: '6px 12px',
                                backgroundColor: '#1976d2',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                }}
                            >
                                Claim
                            </button>
                            </Box>
                        )}
                        </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Box>
  );
};

export default ActivePostsList;
