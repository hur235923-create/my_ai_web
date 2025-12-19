import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

/**
 * AboutMe 페이지 컴포넌트
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutMe />
 */
function AboutMe() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'var(--color-bg-primary)',
        pt: { xs: 10, md: 12 },
        pb: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              color: 'var(--color-primary)',
              fontWeight: 300,
              letterSpacing: '0.2em',
              mb: 2,
              fontSize: { xs: '0.9rem', md: '1rem' },
            }}
          >
            ABOUT ME
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: 'var(--color-text-primary)',
              fontWeight: 700,
              mb: 4,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            About Me
          </Typography>
          <Card
            sx={{
              bgcolor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border-dark)',
              p: { xs: 4, md: 6 },
            }}
          >
            <CardContent>
              <Typography
                variant="body1"
                sx={{
                  color: 'var(--color-text-secondary)',
                  lineHeight: 2,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                }}
              >
                About Me 페이지가 개발될 공간입니다.
                <br />
                상세한 자기소개가 들어갈 예정입니다.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutMe;
