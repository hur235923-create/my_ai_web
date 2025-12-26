import { createTheme } from '@mui/material/styles';

/**
 * SNS 프로젝트 디자인 시스템 테마
 * - 민트 그린 포인트 컬러
 * - 라이트/다크 모드 지원
 * - 둥근 사각형 스타일
 */

// 라이트 모드 테마
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00D9A3', // 민트 그린
      hover: '#00BF8F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF3B5C', // 좋아요 분홍색
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FA', // Surface
    },
    text: {
      primary: '#212529',
      secondary: '#6C757D',
      disabled: '#ADB5BD',
    },
    divider: '#E9ECEF',
    error: {
      main: '#DC3545',
    },
    success: {
      main: '#28A745',
    },
  },
  typography: {
    fontFamily: '"Pretendard", "Inter", -apple-system, system-ui, sans-serif',
    h1: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontSize: '14px',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  spacing: 4, // 4px 기준
  shape: {
    borderRadius: 8, // 기본 8px
  },
  shadows: [
    'none',
    '0 1px 2px rgba(0, 0, 0, 0.05)', // sm
    '0 1px 2px rgba(0, 0, 0, 0.05)',
    '0 1px 2px rgba(0, 0, 0, 0.05)',
    '0 4px 6px rgba(0, 0, 0, 0.07)', // md
    '0 4px 6px rgba(0, 0, 0, 0.07)',
    '0 4px 6px rgba(0, 0, 0, 0.07)',
    '0 4px 6px rgba(0, 0, 0, 0.07)',
    '0 10px 15px rgba(0, 0, 0, 0.1)', // lg
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          height: '40px',
          padding: '0 20px',
          transition: 'all 0.2s ease-in-out',
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
        sizeLarge: {
          height: '48px',
        },
        sizeSmall: {
          height: '32px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            height: '44px',
            '&.Mui-focused fieldset': {
              borderWidth: '2px',
              borderColor: '#00D9A3',
            },
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: '20px', // 둥근 사각형
        },
      },
    },
  },
});

// 다크 모드 테마
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00F5B8', // 밝은 민트
      hover: '#00D9A3',
      contrastText: '#0A0A0A',
    },
    secondary: {
      main: '#FF547C', // 좋아요 분홍색
    },
    background: {
      default: '#0A0A0A',
      paper: '#1A1A1A', // Surface
    },
    text: {
      primary: '#F8F9FA',
      secondary: '#ADB5BD',
      disabled: '#6C757D',
    },
    divider: '#3A3A3A',
    error: {
      main: '#FF4D5E',
    },
    success: {
      main: '#3DD879',
    },
  },
  typography: {
    fontFamily: '"Pretendard", "Inter", -apple-system, system-ui, sans-serif',
    h1: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontSize: '14px',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  spacing: 4, // 4px 기준
  shape: {
    borderRadius: 8, // 기본 8px
  },
  shadows: [
    'none',
    '0 1px 2px rgba(0, 0, 0, 0.3)', // sm
    '0 1px 2px rgba(0, 0, 0, 0.3)',
    '0 1px 2px rgba(0, 0, 0, 0.3)',
    '0 4px 6px rgba(0, 0, 0, 0.4)', // md
    '0 4px 6px rgba(0, 0, 0, 0.4)',
    '0 4px 6px rgba(0, 0, 0, 0.4)',
    '0 4px 6px rgba(0, 0, 0, 0.4)',
    '0 10px 15px rgba(0, 0, 0, 0.5)', // lg
    '0 10px 15px rgba(0, 0, 0, 0.5)',
    '0 10px 15px rgba(0, 0, 0, 0.5)',
    '0 10px 15px rgba(0, 0, 0, 0.5)',
    '0 10px 15px rgba(0, 0, 0, 0.5)',
    '0 10px 15px rgba(0, 0, 0, 0.5)',
    '0 10px 15px rgba(0, 0, 0, 0.5)',
    '0 10px 15px rgba(0, 0, 0, 0.5)',
    '0 10px 15px rgba(0, 0, 0, 0.5)',
    '0 10px 15px rgba(0, 0, 0, 0.5)',
    '0 10px 15px rgba(0, 0, 0, 0.5)',
    '0 10px 15px rgba(0, 0, 0, 0.5)',
    '0 10px 15px rgba(0, 0, 0, 0.5)',
    '0 10px 15px rgba(0, 0, 0, 0.5)',
    '0 10px 15px rgba(0, 0, 0, 0.5)',
    '0 10px 15px rgba(0, 0, 0, 0.5)',
    '0 10px 15px rgba(0, 0, 0, 0.5)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          height: '40px',
          padding: '0 20px',
          transition: 'all 0.2s ease-in-out',
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
        sizeLarge: {
          height: '48px',
        },
        sizeSmall: {
          height: '32px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          backgroundColor: '#1A1A1A',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            height: '44px',
            '&.Mui-focused fieldset': {
              borderWidth: '2px',
              borderColor: '#00F5B8',
            },
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: '20px', // 둥근 사각형
        },
      },
    },
  },
});

// 기본 테마 (다크 모드)
export default darkTheme;
