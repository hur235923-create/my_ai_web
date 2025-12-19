import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PublishIcon from '@mui/icons-material/Publish';
import supabase from '../utils/supabase';

/**
 * WritePost 컴포넌트 - 게시물 작성 페이지
 *
 * Props:
 * @param {object} user - 현재 로그인한 사용자 정보 [Required]
 *
 * Example usage:
 * <WritePost user={currentUser} />
 */
function WritePost({ user }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
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

    if (!formData.title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }

    if (!formData.content.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('posts')
        .insert([
          {
            title: formData.title.trim(),
            content: formData.content.trim(),
            author_id: user?.id,
          },
        ]);

      if (insertError) {
        setError('게시물 등록 중 오류가 발생했습니다.');
        console.error('Post creation error:', insertError);
        setIsLoading(false);
        return;
      }

      navigate('/');
    } catch (err) {
      setError('게시물 등록 중 오류가 발생했습니다.');
      console.error('Post creation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{
            color: '#00ff88',
            mb: 3,
            '&:hover': {
              backgroundColor: 'rgba(0, 255, 136, 0.1)',
            },
          }}
        >
          뒤로가기
        </Button>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: 2,
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
          <Typography
            variant="h4"
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              mb: 4,
              textAlign: 'center',
            }}
          >
            새 게시물 작성
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="title"
              label="제목"
              variant="outlined"
              value={formData.title}
              onChange={handleChange}
              placeholder="게시물 제목을 입력하세요"
              disabled={isLoading}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#121212',
                },
              }}
            />

            <TextField
              fullWidth
              name="content"
              label="내용"
              variant="outlined"
              value={formData.content}
              onChange={handleChange}
              placeholder="게시물 내용을 입력하세요"
              multiline
              rows={12}
              disabled={isLoading}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#121212',
                },
              }}
            />

            {error && (
              <Typography
                variant="body2"
                sx={{ color: '#ff4444', mb: 2, textAlign: 'center' }}
              >
                {error}
              </Typography>
            )}

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'flex-end',
              }}
            >
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={isLoading}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderColor: '#2a2a2a',
                  color: '#b0b0b0',
                  '&:hover': {
                    borderColor: '#666666',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                취소
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={isLoading ? null : <PublishIcon />}
                disabled={isLoading}
                sx={{
                  px: 4,
                  py: 1.5,
                  backgroundColor: '#00ff88',
                  color: '#0a0a0a',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#00cc6a',
                  },
                  '&:disabled': {
                    backgroundColor: '#2a2a2a',
                    color: '#666666',
                  },
                }}
              >
                {isLoading ? <CircularProgress size={24} sx={{ color: '#00ff88' }} /> : '게시물 등록'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default WritePost;
