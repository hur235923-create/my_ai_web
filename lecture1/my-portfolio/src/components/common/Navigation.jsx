import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

/**
 * Navigation 컴포넌트
 *
 * Props: 없음 (내부 상태로 관리)
 *
 * Example usage:
 * <Navigation />
 */
function Navigation() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const location = useLocation();

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Projects', path: '/projects' },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'rgba(13, 13, 13, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-border-dark)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* 로고 - 데스크톱 */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'var(--color-primary)',
              textDecoration: 'none',
              letterSpacing: '0.1em',
            }}
          >
            PORTFOLIO
          </Typography>

          {/* 모바일 메뉴 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: 'var(--color-text-primary)' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  bgcolor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border-dark)',
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.path}
                  sx={{
                    color: isActive(page.path)
                      ? 'var(--color-primary)'
                      : 'var(--color-text-primary)',
                  }}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* 로고 - 모바일 */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'var(--color-primary)',
              textDecoration: 'none',
              letterSpacing: '0.1em',
            }}
          >
            PORTFOLIO
          </Typography>

          {/* 데스크톱 메뉴 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mx: 1,
                  color: isActive(page.path)
                    ? 'var(--color-primary)'
                    : 'var(--color-text-primary)',
                  display: 'block',
                  fontWeight: isActive(page.path) ? 600 : 400,
                  borderBottom: isActive(page.path)
                    ? '2px solid var(--color-primary)'
                    : '2px solid transparent',
                  borderRadius: 0,
                  '&:hover': {
                    color: 'var(--color-primary)',
                    bgcolor: 'transparent',
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
