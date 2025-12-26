import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import {
  FavoriteBorder,
  Favorite,
  ChatBubbleOutline,
  BookmarkBorder,
  Bookmark,
  MoreVert,
} from '@mui/icons-material';
import ProfileImage from '../common/ProfileImage';

/**
 * 게시물 카드 컴포넌트
 *
 * Props:
 * @param {object} post - 게시물 데이터 [Required]
 * @param {function} onLike - 좋아요 클릭 핸들러 [Optional]
 * @param {function} onComment - 댓글 클릭 핸들러 [Optional]
 * @param {function} onSave - 저장 클릭 핸들러 [Optional]
 *
 * Example usage:
 * <PostCard post={postData} onLike={handleLike} />
 */
function PostCard({ post, onLike, onComment, onSave }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if (onLike) onLike(post.id);
  };

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
    if (onSave) onSave(post.id);
  };

  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: '12px',
        boxShadow: 1,
      }}
    >
      {/* 프로필 영역 */}
      <CardHeader
        avatar={
          <ProfileImage
            src={post.user?.profile_image}
            size="small"
          />
        }
        action={
          <IconButton>
            <MoreVert />
          </IconButton>
        }
        title={
          <Typography variant="body1" fontWeight={600}>
            {post.user?.nickname || post.user?.username}
          </Typography>
        }
        subheader={post.location}
        sx={{ pb: 1 }}
      />

      {/* 이미지 영역 */}
      {post.images && post.images.length > 0 && (
        <CardMedia
          component="img"
          image={post.images[0]}
          alt="Post image"
          sx={{
            width: '100%',
            maxHeight: '600px',
            objectFit: 'cover',
          }}
        />
      )}

      {/* 리액션 영역 */}
      <CardActions disableSpacing sx={{ px: 2, py: 1 }}>
        <IconButton onClick={handleLikeClick}>
          {isLiked ? (
            <Favorite sx={{ color: 'secondary.main' }} />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
        <IconButton onClick={onComment}>
          <ChatBubbleOutline />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={handleSaveClick}>
          {isSaved ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
      </CardActions>

      {/* 좋아요 수 & 캡션 */}
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
          좋아요 {post.likes_count || 0}개
        </Typography>
        <Box>
          <Typography
            component="span"
            variant="body2"
            fontWeight={600}
            sx={{ mr: 1 }}
          >
            {post.user?.nickname || post.user?.username}
          </Typography>
          <Typography component="span" variant="body2">
            {post.caption}
          </Typography>
        </Box>
        {post.comments_count > 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, cursor: 'pointer' }}
            onClick={onComment}
          >
            댓글 {post.comments_count}개 모두 보기
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {post.created_at}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PostCard;
