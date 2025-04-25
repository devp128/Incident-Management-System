import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

function CreateIncident() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Medium',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await axios.post(`${API_URL}/incidents`, formData);
      toast.success('Incident reported successfully!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create incident');
      toast.error(err.response?.data?.message || 'Failed to create incident');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Report New Incident
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Severity</InputLabel>
            <Select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              label="Severity"
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateIncident; 