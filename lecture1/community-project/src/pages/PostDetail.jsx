import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import supabase from '../utils/supabase';

/**
 * PostDetail 컴포넌트 - 게시물 상세 페이지
 *
 * Props:
 * @param {object} user - 현재 로그인한 사용자 정보 [Required]
 *
 * Example usage:
 * <PostDetail user={currentUser} />
 */
function PostDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchComments();
    checkLikeStatus();
  }, [id]);

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
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
        .eq('id', parseInt(id))
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        setIsLoading(false);
        return;
      }

      setPost({
        ...data,
        author: data.users?.username || 'Unknown',
      });

      const { count } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', parseInt(id));

      setLikesCount(count || 0);
    } catch (err) {
      console.error('Error fetching post:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          author_id,
          created_at,
          users (
            id,
            username
          )
        `)
        .eq('post_id', parseInt(id))
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
        return;
      }

      setComments(
        data.map((c) => ({
          ...c,
          author: c.users?.username || 'Unknown',
        }))
      );
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const checkLikeStatus = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', parseInt(id))
        .eq('user_id', user.id)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    } catch (err) {
      console.error('Error checking like status:', err);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleLike = async () => {
    if (!user?.id || !post?.id) return;

    try {
      if (isLiked) {
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', post.id)
          .eq('user_id', user.id);

        if (!error) {
          setIsLiked(false);
          setLikesCount((prev) => Math.max(0, prev - 1));
        }
      } else {
        const { error } = await supabase
          .from('likes')
          .insert([{ post_id: post.id, user_id: user.id }]);

        if (!error) {
          setIsLiked(true);
          setLikesCount((prev) => prev + 1);
        }
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !post?.id || !user?.id) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            content: comment.trim(),
            post_id: post.id,
            author_id: user.id,
          },
        ]);

      if (error) {
        console.error('Error creating comment:', error);
        setIsSubmitting(false);
        return;
      }

      setComment('');
      fetchComments();
    } catch (err) {
      console.error('Error creating comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCommentDate = (dateString) => {
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

  if (isLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#0a0a0a',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress sx={{ color: '#00ff88' }} />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#0a0a0a',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ color: '#b0b0b0' }}>
          게시물을 찾을 수 없습니다.
        </Typography>
      </Box>
    );
  }

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
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            {post.title}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 3,
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: '#00ffff',
                  color: '#0a0a0a',
                  fontSize: '0.875rem',
                }}
              >
                {post.author?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body2" sx={{ color: '#ffffff' }}>
                {post.author}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#666666' }}>
              {formatDate(post.created_at)}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: '#2a2a2a', mb: 3 }} />

          <Typography
            variant="body1"
            sx={{
              color: '#e0e0e0',
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
              mb: 4,
            }}
          >
            {post.content}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              pt: 2,
              borderTop: '1px solid #2a2a2a',
            }}
          >
            <IconButton
              onClick={handleLike}
              sx={{
                color: isLiked ? '#ff4444' : '#b0b0b0',
                '&:hover': {
                  backgroundColor: 'rgba(255, 68, 68, 0.1)',
                },
              }}
            >
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography
              variant="body2"
              sx={{ color: isLiked ? '#ff4444' : '#b0b0b0' }}
            >
              좋아요 {likesCount}
            </Typography>
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: '#ffffff', fontWeight: 600, mb: 3 }}
          >
            댓글 {comments.length}
          </Typography>

          <Box
            component="form"
            onSubmit={handleCommentSubmit}
            sx={{
              display: 'flex',
              gap: 2,
              mb: 4,
            }}
          >
            <TextField
              fullWidth
              placeholder="댓글을 입력하세요..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              variant="outlined"
              size="small"
              disabled={isSubmitting}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#121212',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!comment.trim() || isSubmitting}
              sx={{
                minWidth: 'auto',
                px: 3,
                backgroundColor: '#00ff88',
                color: '#0a0a0a',
                '&:hover': {
                  backgroundColor: '#00cc6a',
                },
                '&:disabled': {
                  backgroundColor: '#2a2a2a',
                  color: '#666666',
                },
              }}
            >
              {isSubmitting ? <CircularProgress size={20} sx={{ color: '#00ff88' }} /> : <SendIcon />}
            </Button>
          </Box>

          {comments.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" sx={{ color: '#666666' }}>
                아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {comments.map((c) => (
                <Box
                  key={c.id}
                  sx={{
                    p: 2,
                    backgroundColor: '#121212',
                    borderRadius: 1,
                    border: '1px solid #2a2a2a',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 1,
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
                        {c.author?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography
                        variant="body2"
                        sx={{ color: '#ffffff', fontWeight: 500 }}
                      >
                        {c.author}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#666666' }}>
                      {formatCommentDate(c.created_at)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                    {c.content}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default PostDetail;
