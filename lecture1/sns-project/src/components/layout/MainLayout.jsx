import { Box } from '@mui/material';
import TopBar from '../common/TopBar';
import BottomBar from '../common/BottomBar';

/**
 * 메인 레이아웃 컴포넌트
 *
 * Props:
 * @param {ReactNode} children - 자식 컴포넌트 [Required]
 *
 * Example usage:
 * <MainLayout><FeedPage /></MainLayout>
 */
function MainLayout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <TopBar />
      <Box
        component="main"
        sx={{
          flex: 1,
          pb: '80px', // BottomBar 높이만큼 패딩
          backgroundColor: 'background.default',
        }}
      >
        {children}
      </Box>
      <BottomBar />
    </Box>
  );
}

export default MainLayout;
