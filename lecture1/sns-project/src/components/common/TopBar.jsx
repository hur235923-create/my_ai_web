import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from '@mui/material';
import { Notifications, Mail } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * 상단바 컴포넌트
 *
 * 기능:
 * - 로고
 * - 알림 아이콘
 * - 메시지 아이콘
 */
function TopBar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h2"
          onClick={() => navigate('/feed')}
          sx={{
            fontSize: '24px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #00F5B8 0%, #00D9A3 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          MintGram
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={() => navigate('/notifications')}>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton onClick={() => navigate('/messages')}>
            <Badge badgeContent={2} color="error">
              <Mail />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
