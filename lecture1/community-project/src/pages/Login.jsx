import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import supabase from '../utils/supabase';

/**
 * Login 컴포넌트 - 로그인 페이지
 *
 * Props:
 * @param {function} onLogin - 로그인 성공 시 호출되는 함수 [Required]
 *
 * Example usage:
 * <Login onLogin={handleLogin} />
 */
function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data, error: queryError } = await supabase
        .from('users')
        .select('*')
        .eq('username', formData.username)
        .eq('password', formData.password)
        .single();

      if (queryError || !data) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify(data));
      onLogin(data);
      navigate('/');
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          border: '1px solid rgba(0, 255, 136, 0.1)',
          transform: 'rotate(45deg)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '150px',
          height: '150px',
          border: '1px solid rgba(0, 255, 255, 0.1)',
          transform: 'rotate(30deg)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '20%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          border: '1px solid rgba(0, 255, 136, 0.1)',
        }}
      />

      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            backgroundColor: 'rgba(18, 18, 18, 0.9)',
            border: '1px solid #2a2a2a',
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #00ff88, transparent)',
            },
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                color: '#00ff88',
                fontWeight: 700,
                textShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
                mb: 1,
              }}
            >
              beom Game
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
              게임 커뮤니티에 오신 것을 환영합니다
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="username"
              label="아이디"
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
              sx={{ mb: 2 }}
              autoComplete="username"
              disabled={isLoading}
            />
            <TextField
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
              autoComplete="current-password"
              disabled={isLoading}
            />

            {error && (
              <Typography
                variant="body2"
                sx={{ color: '#ff4444', mb: 2, textAlign: 'center' }}
              >
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{
                mb: 2,
                py: 1.5,
                backgroundColor: '#00ff88',
                color: '#0a0a0a',
                '&:hover': {
                  backgroundColor: '#00cc6a',
                },
                '&:disabled': {
                  backgroundColor: '#2a2a2a',
                  color: '#666666',
                },
              }}
            >
              {isLoading ? <CircularProgress size={24} sx={{ color: '#00ff88' }} /> : '로그인'}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={handleSignupClick}
              disabled={isLoading}
              sx={{
                py: 1.5,
                borderColor: '#00ff88',
                color: '#00ff88',
                '&:hover': {
                  borderColor: '#66ffb2',
                  backgroundColor: 'rgba(0, 255, 136, 0.1)',
                },
              }}
            >
              회원가입
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
