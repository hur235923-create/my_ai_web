import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { authService } from '../utils/supabase';

/**
 * 회원가입 페이지
 *
 * 기능:
 * - 아이디, 비밀번호, 비밀번호 확인, 닉네임 입력
 */
function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // 에러 메시지 초기화
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 유효성 검사
    if (!formData.username.trim()) {
      setError('아이디를 입력해주세요.');
      return;
    }

    if (formData.password.length < 8) {
      setError('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!formData.nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      // 회원가입 API 호출
      const { data, error: signUpError } = await authService.signUp(
        formData.username,
        formData.password,
        formData.nickname
      );

      if (signUpError) {
        if (signUpError.code === '23505') {
          setError('이미 사용 중인 아이디입니다.');
        } else {
          setError('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
        return;
      }

      // 회원가입 성공
      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    } catch (err) {
      console.error('회원가입 오류:', err);
      setError('회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 상단바 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          회원가입
        </Typography>
      </Box>

      {/* 메인 콘텐츠 */}
      <Container maxWidth="sm" sx={{ py: 4, flex: 1 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* 에러 메시지 */}
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* 입력 필드들 */}
          <TextField
            fullWidth
            name="username"
            label="아이디"
            variant="outlined"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loading}
            sx={{ mb: 3 }}
            helperText="영문, 숫자, 특수문자 사용 가능"
          />

          <TextField
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            sx={{ mb: 3 }}
            helperText="8자 이상 입력해주세요"
          />

          <TextField
            fullWidth
            name="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            variant="outlined"
            value={formData.passwordConfirm}
            onChange={handleChange}
            required
            disabled={loading}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            name="nickname"
            label="닉네임"
            variant="outlined"
            value={formData.nickname}
            onChange={handleChange}
            required
            disabled={loading}
            sx={{ mb: 4 }}
            helperText="다른 사용자에게 표시되는 이름"
          />

          {/* 회원가입 버튼 */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              height: '48px',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              '회원가입 완료'
            )}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default SignupPage;
