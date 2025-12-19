import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff88',
      light: '#66ffb2',
      dark: '#00cc6a',
      contrastText: '#0a0a0a',
    },
    secondary: {
      main: '#00ffff',
      light: '#66ffff',
      dark: '#00cccc',
      contrastText: '#0a0a0a',
    },
    background: {
      default: '#0a0a0a',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
    error: {
      main: '#ff4444',
    },
    success: {
      main: '#00ff88',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#00ff88',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#00ff88',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#b0b0b0',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
        contained: {
          boxShadow: '0 0 10px rgba(0, 255, 136, 0.3)',
          '&:hover': {
            boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
          },
        },
        outlined: {
          borderColor: '#00ff88',
          '&:hover': {
            borderColor: '#66ffb2',
            boxShadow: '0 0 10px rgba(0, 255, 136, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
          '&:hover': {
            borderColor: '#00ff88',
            boxShadow: '0 0 15px rgba(0, 255, 136, 0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#2a2a2a',
            },
            '&:hover fieldset': {
              borderColor: '#00ff88',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00ff88',
              boxShadow: '0 0 10px rgba(0, 255, 136, 0.2)',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0a0a',
          borderBottom: '1px solid #2a2a2a',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
        },
      },
    },
  },
});

export default theme;
