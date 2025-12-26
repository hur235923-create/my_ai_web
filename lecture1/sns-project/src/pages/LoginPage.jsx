import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
} from '@mui/material';

/**
 * 로그인 페이지
 *
 * 기능:
 * - 아이디/비밀번호 입력
 * - 로그인 상태 유지 체크박스
 * - 회원가입 링크
 * - 아이디/비밀번호 찾기
 */
function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 로그인 로직 구현
    console.log('로그인 시도:', formData);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* 로고 영역 */}
          <Typography
            variant="h1"
            sx={{
              mb: 6,
              fontSize: { xs: '32px', md: '40px' },
              fontWeight: 700,
              background: 'linear-gradient(135deg, #00F5B8 0%, #00D9A3 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            MintGram
          </Typography>

          {/* 로그인 폼 */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: '100%' }}
          >
            <TextField
              fullWidth
              name="username"
              label="아이디"
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
              sx={{ mb: 3 }}
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
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  sx={{
                    color: 'text.secondary',
                    '&.Mui-checked': {
                      color: 'primary.main',
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  로그인 상태 유지
                </Typography>
              }
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mb: 2,
                height: '48px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              로그인
            </Button>

            {/* 아이디/비밀번호 찾기 */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                mb: 4,
              }}
            >
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                아이디 찾기
              </Link>
              <Typography variant="body2" color="text.secondary">
                |
              </Typography>
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                비밀번호 찾기
              </Link>
            </Box>

            <Divider sx={{ mb: 4 }}>
              <Typography variant="body2" color="text.secondary">
                또는
              </Typography>
            </Divider>

            {/* 회원가입 버튼 */}
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/signup')}
              sx={{
                height: '48px',
                fontSize: '16px',
                fontWeight: 600,
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'transparent',
                },
              }}
            >
              회원가입
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
