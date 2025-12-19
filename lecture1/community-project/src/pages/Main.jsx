import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import supabase from '../utils/supabase';

/**
 * Main 컴포넌트 - 메인 페이지 (게시물 목록)
 *
 * Props:
 * @param {object} user - 현재 로그인한 사용자 정보 [Required]
 * @param {function} onLogout - 로그아웃 시 호출되는 함수 [Required]
 *
 * Example usage:
 * <Main user={currentUser} onLogout={handleLogout} />
 */
function Main({ user, onLogout }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          content,
          author_id,
          created_at,
          users (
            id,
            username
          )
        `)
        .order('created_at', { ascending: false });

      if (postsError) {
        console.error('Error fetching posts:', postsError);
        setIsLoading(false);
        return;
      }

      const postsWithCounts = await Promise.all(
        postsData.map(async (post) => {
          const { count: commentsCount } = await supabase
            .from('comments')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id);

          const { count: likesCount } = await supabase
            .from('likes')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id);

          return {
            ...post,
            author: post.users?.username || 'Unknown',
            commentsCount: commentsCount || 0,
            likesCount: likesCount || 0,
          };
        })
      );

      setPosts(postsWithCounts);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    onLogout();
    navigate('/login');
  };

  const handleWriteClick = () => {
    navigate('/write');
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(10, 10, 10, 0.95)',
          borderBottom: '1px solid #2a2a2a',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            sx={{
              color: '#00ff88',
              fontWeight: 700,
              textShadow: '0 0 15px rgba(0, 255, 136, 0.5)',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            beom Game
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.5,
                border: '1px solid #2a2a2a',
                borderRadius: 2,
                backgroundColor: 'rgba(0, 255, 136, 0.05)',
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: '#00ff88',
                  color: '#0a0a0a',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                {user?.username?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography
                variant="body2"
                sx={{ color: '#ffffff', fontWeight: 500 }}
              >
                {user?.username}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              size="small"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                borderColor: '#ff4444',
                color: '#ff4444',
                '&:hover': {
                  borderColor: '#ff6666',
                  backgroundColor: 'rgba(255, 68, 68, 0.1)',
                },
              }}
            >
              로그아웃
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#ffffff',
              fontWeight: 600,
            }}
          >
            게시물 목록
          </Typography>

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleWriteClick}
            sx={{
              backgroundColor: '#00ff88',
              color: '#0a0a0a',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#00cc6a',
              },
            }}
          >
            글쓰기
          </Button>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#00ff88' }} />
          </Box>
        ) : posts.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              border: '1px dashed #2a2a2a',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: '#b0b0b0', mb: 2 }}>
              아직 게시물이 없습니다
            </Typography>
            <Typography variant="body2" sx={{ color: '#666666' }}>
              첫 번째 게시물을 작성해보세요!
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {posts.map((post) => (
              <Card
                key={post.id}
                sx={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#00ff88',
                    boxShadow: '0 0 15px rgba(0, 255, 136, 0.15)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <CardActionArea onClick={() => handlePostClick(post.id)}>
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#ffffff',
                          fontWeight: 600,
                          flex: 1,
                          mr: 2,
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: '#666666', whiteSpace: 'nowrap' }}
                      >
                        {formatDate(post.created_at)}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            backgroundColor: '#00ffff',
                            color: '#0a0a0a',
                            fontSize: '0.75rem',
                          }}
                        >
                          {post.author?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                          {post.author}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip
                          icon={<ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />}
                          label={post.commentsCount}
                          size="small"
                          sx={{
                            backgroundColor: 'transparent',
                            border: '1px solid #2a2a2a',
                            color: '#b0b0b0',
                            '& .MuiChip-icon': {
                              color: '#b0b0b0',
                            },
                          }}
                        />
                        <Chip
                          icon={<FavoriteIcon sx={{ fontSize: 16 }} />}
                          label={post.likesCount}
                          size="small"
                          sx={{
                            backgroundColor: 'transparent',
                            border: '1px solid #2a2a2a',
                            color: '#ff4444',
                            '& .MuiChip-icon': {
                              color: '#ff4444',
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Main;
