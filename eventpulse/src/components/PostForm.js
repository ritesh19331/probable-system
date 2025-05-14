import React, { useState } from 'react';
import {
  TextField, Button, MenuItem, Grid, Typography, Paper, Box
} from '@mui/material';
import axios from 'axios';
import api from '../utils/api';

const initialFormData = {
  type: '',
  description: '',
  quantity: '',
  location: '',
  expiryDate: '',
};

const PostForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Enter a valid quantity';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess(false);
    if (!validate()) return;

    try {
      await api.post('/food-posts', {
        ...formData,
        quantity: parseInt(formData.quantity),
        status: 'POSTED',
      });
      setSuccess(true);
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" mb={3}>Create a Donation/Request Post</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              select
              label="Type"
              name="type"
              fullWidth
              value={formData.type}
              onChange={handleChange}
              error={!!errors.type}
              helperText={errors.type}
            >
              <MenuItem value="DONATE">Donate</MenuItem>
              <MenuItem value="REQUEST">Request</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              minRows={3}
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              fullWidth
              value={formData.quantity}
              onChange={handleChange}
              error={!!errors.quantity}
              helperText={errors.quantity}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              fullWidth
              value={formData.location}
              onChange={handleChange}
              error={!!errors.location}
              helperText={errors.location}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Expiry Date"
              name="expiryDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formData.expiryDate}
              onChange={handleChange}
              error={!!errors.expiryDate}
              helperText={errors.expiryDate}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </Grid>

          {success && (
            <Grid item xs={12}>
              <Typography color="green">Post submitted successfully!</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
};

export default PostForm;
