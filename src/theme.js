import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B7355',
      light: '#A69680',
      dark: '#5C5346',
      contrastText: '#F5F5F0',
    },
    secondary: {
      main: '#E8A832',
      light: '#F5C75D',
      dark: '#D4941F',
      contrastText: '#3D3630',
    },
    error: {
      main: '#C41E3A',
      light: '#E63950',
      dark: '#9C1830',
    },
    warning: {
      main: '#E8A832',
    },
    success: {
      main: '#4A7C59',
    },
    info: {
      main: '#6B7B4C',
    },
    background: {
      default: '#F5F5F0',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3D3630',
      secondary: '#5C5346',
      disabled: '#8B7355',
    },
  },
  typography: {
    fontFamily: '"Pretendard", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#3D3630',
    },
    h2: {
      fontWeight: 600,
      color: '#3D3630',
    },
    h3: {
      fontWeight: 600,
      color: '#3D3630',
    },
    h4: {
      fontWeight: 600,
      color: '#3D3630',
    },
    h5: {
      fontWeight: 500,
      color: '#3D3630',
    },
    h6: {
      fontWeight: 500,
      color: '#3D3630',
    },
    body1: {
      color: '#5C5346',
    },
    body2: {
      color: '#5C5346',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.3s ease',
        },
        containedPrimary: {
          backgroundColor: '#E8A832',
          color: '#3D3630',
          '&:hover': {
            backgroundColor: '#D4941F',
          },
        },
        containedSecondary: {
          backgroundColor: '#8B7355',
          color: '#F5F5F0',
          '&:hover': {
            backgroundColor: '#6B5A45',
          },
        },
        outlined: {
          borderColor: '#8B7355',
          color: '#8B7355',
          '&:hover': {
            backgroundColor: '#8B7355',
            color: '#F5F5F0',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(92, 83, 70, 0.15)',
          border: '1px solid #E8DFC4',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(61, 54, 48, 0.25)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#3D3630',
          boxShadow: '0 2px 8px rgba(92, 83, 70, 0.1)',
        },
      },
    },
  },
});

export default theme;
