import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../components/common/ProfileImage';

// 목 데이터
const mockNotifications = [
  {
    id: 1,
    type: 'like',
    sender: {
      username: 'user1',
      nickname: '유저1',
      profile_image: null,
    },
    message: '님이 회원님의 게시물을 좋아합니다',
    time: '5분 전',
    post_thumbnail: 'https://picsum.photos/50/50?random=1',
  },
  {
    id: 2,
    type: 'follow',
    sender: {
      username: 'user2',
      nickname: '유저2',
      profile_image: null,
    },
    message: '님이 회원님을 팔로우하기 시작했습니다',
    time: '1시간 전',
  },
  {
    id: 3,
    type: 'comment',
    sender: {
      username: 'user3',
      nickname: '유저3',
      profile_image: null,
    },
    message: '님이 댓글을 남겼습니다: "멋진 사진이네요!"',
    time: '3시간 전',
    post_thumbnail: 'https://picsum.photos/50/50?random=2',
  },
];

/**
 * 알림 페이지
 *
 * 기능:
 * - 알림 목록 표시
 * - 좋아요, 댓글, 팔로우 알림
 */
function NotificationsPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
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
          <Typography variant="h3">알림</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 2 }}>
        <List>
          {mockNotifications.map((notification) => (
            <ListItem
              key={notification.id}
              sx={{
                px: 0,
                alignItems: 'flex-start',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemAvatar>
                <ProfileImage
                  src={notification.sender.profile_image}
                  size="medium"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box>
                    <Typography component="span" variant="body2" fontWeight={600}>
                      {notification.sender.nickname}
                    </Typography>
                    <Typography component="span" variant="body2">
                      {notification.message}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                }
              />
              {notification.post_thumbnail && (
                <Box
                  component="img"
                  src={notification.post_thumbnail}
                  alt="Post"
                  sx={{
                    width: 50,
                    height: 50,
                    objectFit: 'cover',
                    borderRadius: '4px',
                    ml: 2,
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
}

export default NotificationsPage;
