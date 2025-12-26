import { Container, Box, Typography, Button, Grid } from '@mui/material';
import { Settings } from '@mui/icons-material';
import MainLayout from '../components/layout/MainLayout';
import ProfileImage from '../components/common/ProfileImage';

// 목 데이터
const mockUser = {
  username: 'myusername',
  nickname: '내닉네임',
  profile_image: null,
  bio: '안녕하세요! MintGram을 사용하는 유저입니다 ✨',
  website: 'https://example.com',
  posts_count: 24,
  followers_count: 156,
  following_count: 98,
};

const mockUserPosts = [
  { id: 1, image: 'https://picsum.photos/300/300?random=1' },
  { id: 2, image: 'https://picsum.photos/300/300?random=2' },
  { id: 3, image: 'https://picsum.photos/300/300?random=3' },
  { id: 4, image: 'https://picsum.photos/300/300?random=4' },
  { id: 5, image: 'https://picsum.photos/300/300?random=5' },
  { id: 6, image: 'https://picsum.photos/300/300?random=6' },
];

/**
 * 프로필 페이지
 *
 * 기능:
 * - 프로필 정보 표시
 * - 게시물, 팔로워, 팔로잉 수
 * - 게시물 그리드 (3열)
 * - 프로필 편집 버튼
 */
function ProfilePage() {
  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: 3 }}>
        {/* 프로필 헤더 */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4, gap: 3 }}>
          <ProfileImage src={mockUser.profile_image} size="large" />

          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
              <Typography variant="h3">{mockUser.nickname}</Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Settings />}
                sx={{ minWidth: 'auto' }}
              >
                설정
              </Button>
            </Box>

            {/* 통계 */}
            <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  {mockUser.posts_count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  게시물
                </Typography>
              </Box>
              <Box sx={{ cursor: 'pointer' }}>
                <Typography variant="body1" fontWeight={600}>
                  {mockUser.followers_count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  팔로워
                </Typography>
              </Box>
              <Box sx={{ cursor: 'pointer' }}>
                <Typography variant="body1" fontWeight={600}>
                  {mockUser.following_count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  팔로잉
                </Typography>
              </Box>
            </Box>

            {/* 바이오 */}
            <Typography variant="body2" sx={{ mb: 1 }}>
              {mockUser.bio}
            </Typography>
            {mockUser.website && (
              <Typography
                variant="body2"
                color="primary.main"
                sx={{ cursor: 'pointer' }}
              >
                {mockUser.website}
              </Typography>
            )}
          </Box>
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 4 }}
        >
          프로필 편집
        </Button>

        {/* 게시물 그리드 */}
        <Grid container spacing={0.5}>
          {mockUserPosts.map((post) => (
            <Grid key={post.id} size={{ xs: 4 }}>
              <Box
                component="img"
                src={post.image}
                alt={`Post ${post.id}`}
                sx={{
                  width: '100%',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainLayout>
  );
}

export default ProfilePage;
