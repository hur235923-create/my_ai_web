import { useState } from 'react';
import {
  Container,
  TextField,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import MainLayout from '../components/layout/MainLayout';
import ProfileImage from '../components/common/ProfileImage';

// 목 데이터
const mockUsers = [
  {
    id: 1,
    username: 'user1',
    nickname: '추천유저1',
    profile_image: null,
    bio: '안녕하세요! 팔로우해주세요 🙏',
  },
  {
    id: 2,
    username: 'user2',
    nickname: '추천유저2',
    profile_image: null,
    bio: '일상을 공유하는 계정입니다',
  },
  {
    id: 3,
    username: 'user3',
    nickname: '추천유저3',
    profile_image: null,
    bio: '사진 찍는 것을 좋아합니다 📸',
  },
];

/**
 * 검색 페이지
 *
 * 기능:
 * - 유저 검색
 * - 추천 사용자 목록
 * - 팔로우 버튼
 */
function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      // 실제로는 API 호출
      setSearchResults(mockUsers.filter(user =>
        user.nickname.includes(query) || user.username.includes(query)
      ));
    } else {
      setSearchResults([]);
    }
  };

  const displayUsers = searchQuery.trim() ? searchResults : mockUsers;

  return (
    <MainLayout>
      <Container maxWidth="sm" sx={{ py: 2 }}>
        {/* 검색바 */}
        <TextField
          fullWidth
          placeholder="검색"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        {/* 제목 */}
        <Typography variant="h3" sx={{ mb: 2 }}>
          {searchQuery.trim() ? '검색 결과' : '추천 사용자'}
        </Typography>

        {/* 사용자 목록 */}
        <List>
          {displayUsers.map((user) => (
            <ListItem key={user.id} sx={{ px: 0 }}>
              <ListItemAvatar>
                <ProfileImage src={user.profile_image} size="medium" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight={600}>
                    {user.nickname}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {user.bio}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <Button variant="contained" size="small">
                  팔로우
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        {searchQuery.trim() && searchResults.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              검색 결과가 없습니다
            </Typography>
          </Box>
        )}
      </Container>
    </MainLayout>
  );
}

export default SearchPage;
