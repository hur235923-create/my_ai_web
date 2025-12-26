import { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
} from '@mui/material';
import { ArrowBack, AddPhotoAlternate } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * 게시물 업로드 페이지
 *
 * 기능:
 * - 이미지 선택/업로드
 * - 캡션 작성
 * - 위치 태그
 */
function UploadPage() {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // TODO: 실제 업로드 로직
    console.log('Upload post:', { caption, location });
    navigate('/feed');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* 상단바 */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h3" sx={{ flexGrow: 1 }}>
            새 게시물
          </Typography>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!previewImage}
          >
            공유
          </Button>
        </Toolbar>
      </AppBar>

      {/* 메인 콘텐츠 */}
      <Container maxWidth="sm" sx={{ py: 3, flex: 1 }}>
        {/* 이미지 선택 */}
        {!previewImage ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
              border: 2,
              borderColor: 'divider',
              borderRadius: '12px',
              borderStyle: 'dashed',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'action.hover',
              },
            }}
            onClick={() => document.getElementById('image-input').click()}
          >
            <AddPhotoAlternate sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h3" color="text.secondary">
              사진을 선택하세요
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              클릭하여 사진 업로드
            </Typography>
            <input
              type="file"
              id="image-input"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </Box>
        ) : (
          <Box>
            {/* 이미지 미리보기 */}
            <Box
              component="img"
              src={previewImage}
              alt="Preview"
              sx={{
                width: '100%',
                maxHeight: '500px',
                objectFit: 'contain',
                borderRadius: '12px',
                mb: 3,
              }}
            />

            {/* 이미지 변경 버튼 */}
            <Button
              variant="outlined"
              fullWidth
              startIcon={<AddPhotoAlternate />}
              onClick={() => document.getElementById('image-input').click()}
              sx={{ mb: 3 }}
            >
              사진 변경
            </Button>
            <input
              type="file"
              id="image-input"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />

            {/* 캡션 입력 */}
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="캡션을 입력하세요..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              sx={{ mb: 2 }}
            />

            {/* 위치 입력 */}
            <TextField
              fullWidth
              placeholder="위치 추가"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default UploadPage;
