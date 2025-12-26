import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, Search, AddCircleOutline, Person } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * 하단바 컴포넌트 (모바일 네비게이션)
 *
 * 기능:
 * - 홈
 * - 검색
 * - 업로드
 * - 프로필
 */
function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentValue = () => {
    const path = location.pathname;
    if (path.startsWith('/feed')) return 0;
    if (path.startsWith('/search')) return 1;
    if (path.startsWith('/upload')) return 2;
    if (path.startsWith('/profile')) return 3;
    return 0;
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: 1,
        borderColor: 'divider',
        zIndex: 1000,
      }}
      elevation={0}
    >
      <BottomNavigation
        value={getCurrentValue()}
        onChange={(event, newValue) => {
          const paths = ['/feed', '/search', '/upload', '/profile'];
          navigate(paths[newValue]);
        }}
        showLabels={false}
        sx={{
          height: '64px',
          backgroundColor: 'background.paper',
        }}
      >
        <BottomNavigationAction icon={<Home />} />
        <BottomNavigationAction icon={<Search />} />
        <BottomNavigationAction icon={<AddCircleOutline />} />
        <BottomNavigationAction icon={<Person />} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomBar;
