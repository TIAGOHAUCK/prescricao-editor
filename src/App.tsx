import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import PrescricaoForm from './components/PrescricaoForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
          boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', color: 'white' }}>
              EDITOR EVOLUÇÕES CLÍNICAS MÉDICAS
            </Typography>
          </Toolbar>
          <Typography variant="subtitle1" component="div" sx={{ textAlign: 'center', color: 'white', pb: 1 }}>
            Dr. Aurélio
          </Typography>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
          <PrescricaoForm />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App; 