import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import { ArrowBack, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../components/common/ProfileImage';

// 목 데이터
const mockConversations = [
  {
    id: 1,
    user: {
      username: 'user1',
      nickname: '유저1',
      profile_image: null,
    },
    last_message: '안녕하세요!',
    timestamp: '방금',
    unread_count: 2,
  },
  {
    id: 2,
    user: {
      username: 'user2',
      nickname: '유저2',
      profile_image: null,
    },
    last_message: '오늘 시간 있으세요?',
    timestamp: '10분 전',
    unread_count: 0,
  },
  {
    id: 3,
    user: {
      username: 'user3',
      nickname: '유저3',
      profile_image: null,
    },
    last_message: '좋아요! 그럼 내일 봐요~',
    timestamp: '1시간 전',
    unread_count: 0,
  },
];

/**
 * 메시지 목록 페이지
 *
 * 기능:
 * - 대화 목록 표시
 * - 마지막 메시지 미리보기
 * - 읽지 않은 메시지 수
 */
function MessagesPage() {
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
          <Typography variant="h3" sx={{ flexGrow: 1 }}>
            메시지
          </Typography>
          <IconButton>
            <Edit />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 2 }}>
        <List>
          {mockConversations.map((conversation) => (
            <ListItem
              key={conversation.id}
              sx={{
                px: 0,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemAvatar>
                <ProfileImage
                  src={conversation.user.profile_image}
                  size="medium"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body1" fontWeight={600}>
                      {conversation.user.nickname}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {conversation.timestamp}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography
                      variant="body2"
                      color={conversation.unread_count > 0 ? 'text.primary' : 'text.secondary'}
                      fontWeight={conversation.unread_count > 0 ? 600 : 400}
                    >
                      {conversation.last_message}
                    </Typography>
                    {conversation.unread_count > 0 && (
                      <Badge
                        badgeContent={conversation.unread_count}
                        color="primary"
                        sx={{ mr: 2 }}
                      />
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
}

export default MessagesPage;
