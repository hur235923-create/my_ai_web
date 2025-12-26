import { Container, Box } from '@mui/material';
import MainLayout from '../components/layout/MainLayout';
import PostCard from '../components/ui/PostCard';

// 목 데이터
const mockPosts = [
  {
    id: 1,
    user: {
      username: 'user1',
      nickname: '테스트유저1',
      profile_image: null,
    },
    images: ['https://picsum.photos/600/600?random=1'],
    caption: '안녕하세요! 첫 번째 게시물입니다 #MintGram',
    location: '서울, 대한민국',
    likes_count: 42,
    comments_count: 5,
    created_at: '1시간 전',
  },
  {
    id: 2,
    user: {
      username: 'user2',
      nickname: '테스트유저2',
      profile_image: null,
    },
    images: ['https://picsum.photos/600/600?random=2'],
    caption: '좋은 하루 보내세요! ☀️',
    location: null,
    likes_count: 128,
    comments_count: 12,
    created_at: '3시간 전',
  },
  {
    id: 3,
    user: {
      username: 'user3',
      nickname: '테스트유저3',
      profile_image: null,
    },
    images: ['https://picsum.photos/600/600?random=3'],
    caption: '오늘의 일상 기록 📸',
    location: '부산, 대한민국',
    likes_count: 87,
    comments_count: 8,
    created_at: '5시간 전',
  },
];

/**
 * 메인 피드 페이지
 *
 * 기능:
 * - 게시물 타임라인
 * - 좋아요, 댓글, 저장 기능
 */
function FeedPage() {
  return (
    <MainLayout>
      <Container maxWidth="sm" sx={{ py: 2 }}>
        <Box>
          {mockPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={(id) => console.log('Like post:', id)}
              onComment={() => console.log('Comment on post')}
              onSave={(id) => console.log('Save post:', id)}
            />
          ))}
        </Box>
      </Container>
    </MainLayout>
  );
}

export default FeedPage;
