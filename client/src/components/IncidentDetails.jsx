import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Chip,
  Box,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

function IncidentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await axios.get(`${API_URL}/incidents/${id}`);
        setIncident(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch incident details');
        toast.error('Failed to fetch incident details');
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`${API_URL}/incidents/${id}`);
      toast.success('Incident deleted successfully!');
      navigate('/');
    } catch (err) {
      setError('Failed to delete incident');
      toast.error('Failed to delete incident');
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!incident) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">Incident not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            {incident.title}
          </Typography>
          <Chip
            label={incident.severity}
            color={getSeverityColor(incident.severity)}
          />
        </Box>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Reported on {new Date(incident.reported_at).toLocaleString()}
        </Typography>

        <Typography variant="body1" sx={{ mt: 3, whiteSpace: 'pre-wrap' }}>
          {incident.description}
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => setDeleteDialogOpen(true)}
            disabled={deleting}
          >
            Delete Incident
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            disabled={deleting}
          >
            Back to List
          </Button>
        </Box>
      </Paper>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => !deleting && setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Incident</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this incident? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialogOpen(false)} 
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete} 
            color="error"
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default IncidentDetails; 