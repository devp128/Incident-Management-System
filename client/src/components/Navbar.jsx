import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <SecurityIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Safety Incident Log
          </Typography>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
            sx={{
              backgroundColor: isActive('/') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Incidents
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/create"
            sx={{
              backgroundColor: isActive('/create') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Report Incident
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 