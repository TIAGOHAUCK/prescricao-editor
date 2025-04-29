import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Box, Container, Tabs, Tab } from '@mui/material';
import PrescricaoForm from './components/PrescricaoForm';
import MedicacaoManager from './components/MedicacaoManager';
import Banner from './components/Banner';

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
          backgroundColor: '#1976d2',
          boxShadow: 'none',
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
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
          <Toolbar sx={{ minHeight: 'auto', padding: 0 }}>
            <Banner />
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={currentTab} onChange={handleTabChange} centered>
              <Tab label="Prescrição" />
              <Tab label="Gerenciar Medicações" />
            </Tabs>
          </Box>
          {currentTab === 0 && <PrescricaoForm />}
          {currentTab === 1 && <MedicacaoManager />}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App; 