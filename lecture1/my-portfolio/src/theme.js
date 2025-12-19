import { createTheme } from '@mui/material/styles';

/**
 * Hasselblad 스타일 테마
 * 컬러 팔레트 디자인 시스템.md 기반
 */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#C9A962',
      light: '#D4B978',
      dark: '#A88B4A',
      contrastText: '#0D0D0D',
    },
    secondary: {
      main: '#F8F8F5',
      contrastText: '#1A1A1A',
    },
    background: {
      default: '#0D0D0D',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A0A0A0',
      disabled: '#666666',
    },
    divider: '#2A2A2A',
  },
  typography: {
    fontFamily: '"Pretendard", "Noto Sans KR", "Roboto", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#FFFFFF',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#FFFFFF',
    },
    body1: {
      fontSize: '1rem',
      color: '#A0A0A0',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#666666',
    },
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          backgroundColor: '#FFFFFF',
          color: '#0D0D0D',
          '&:hover': {
            backgroundColor: '#C9A962',
            color: '#0D0D0D',
          },
        },
        outlined: {
          borderColor: '#FFFFFF',
          color: '#FFFFFF',
          '&:hover': {
            borderColor: '#C9A962',
            color: '#C9A962',
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A',
          borderRadius: 0,
          border: '1px solid #2A2A2A',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: '1px solid #2A2A2A',
        },
      },
    },
  },
});

export default theme;
