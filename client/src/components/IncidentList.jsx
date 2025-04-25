import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get(`${API_URL}/incidents`);
        setIncidents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch incidents');
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

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

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        AI Safety Incidents
      </Typography>
      {incidents.length === 0 ? (
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography>No incidents reported yet.</Typography>
        </Paper>
      ) : (
        <List>
          {incidents.map((incident) => (
            <Paper
              key={incident._id}
              sx={{ mb: 2, cursor: 'pointer' }}
              onClick={() => navigate(`/incidents/${incident._id}`)}
            >
              <ListItem>
                <ListItemText
                  primary={incident.title}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {new Date(incident.reported_at).toLocaleDateString()}
                      </Typography>
                      {' — '}
                      {incident.description.substring(0, 100)}...
                    </>
                  }
                />
                <Chip
                  label={incident.severity}
                  color={getSeverityColor(incident.severity)}
                  sx={{ ml: 2 }}
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Container>
  );
}

export default IncidentList; 