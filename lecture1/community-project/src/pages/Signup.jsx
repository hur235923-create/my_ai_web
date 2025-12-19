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
 * Signup 컴포넌트 - 회원가입 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <Signup />
 */
function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
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

    if (formData.username.length < 3) {
      setError('아이디는 3자 이상이어야 합니다.');
      return;
    }

    if (formData.password.length < 4) {
      setError('비밀번호는 4자 이상이어야 합니다.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('username', formData.username)
        .single();

      if (existingUser) {
        setError('이미 존재하는 아이디입니다.');
        setIsLoading(false);
        return;
      }

      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            username: formData.username,
            password: formData.password,
          },
        ]);

      if (insertError) {
        if (insertError.code === '23505') {
          setError('이미 존재하는 아이디입니다.');
        } else {
          setError('회원가입 중 오류가 발생했습니다.');
          console.error('Signup error:', insertError);
        }
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/login');
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
          top: '20%',
          right: '5%',
          width: '180px',
          height: '180px',
          border: '1px solid rgba(0, 255, 136, 0.1)',
          transform: 'rotate(60deg)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '8%',
          width: '120px',
          height: '120px',
          border: '1px solid rgba(0, 255, 255, 0.1)',
          transform: 'rotate(15deg)',
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
              background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
            },
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                color: '#00ffff',
                fontWeight: 700,
                textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                mb: 1,
              }}
            >
              회원가입
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
              새로운 계정을 만들어보세요
            </Typography>
          </Box>

          {success ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography
                variant="h6"
                sx={{ color: '#00ff88', mb: 2 }}
              >
                회원가입 성공!
              </Typography>
              <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                로그인 페이지로 이동합니다...
              </Typography>
            </Box>
          ) : (
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
                helperText="3자 이상 입력해주세요"
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
                autoComplete="new-password"
                helperText="4자 이상 입력해주세요"
                disabled={isLoading}
              />
              <TextField
                fullWidth
                name="confirmPassword"
                label="비밀번호 확인"
                type="password"
                variant="outlined"
                value={formData.confirmPassword}
                onChange={handleChange}
                sx={{ mb: 2 }}
                autoComplete="new-password"
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
                  backgroundColor: '#00ffff',
                  color: '#0a0a0a',
                  '&:hover': {
                    backgroundColor: '#00cccc',
                  },
                  '&:disabled': {
                    backgroundColor: '#2a2a2a',
                    color: '#666666',
                  },
                }}
              >
                {isLoading ? <CircularProgress size={24} sx={{ color: '#00ffff' }} /> : '회원가입'}
              </Button>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={handleBackClick}
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  borderColor: '#00ffff',
                  color: '#00ffff',
                  '&:hover': {
                    borderColor: '#66ffff',
                    backgroundColor: 'rgba(0, 255, 255, 0.1)',
                  },
                }}
              >
                로그인으로 돌아가기
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default Signup;
