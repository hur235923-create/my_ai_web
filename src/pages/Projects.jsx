import { Box, Container, Typography, Card, CardContent } from '@mui/material';

function Projects() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: 'var(--color-bg-secondary)',
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            backgroundColor: 'var(--color-bg-card)',
            textAlign: 'center',
          }}
        >
          <CardContent sx={{ py: { xs: 6, md: 10 }, px: { xs: 3, md: 6 } }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 4,
                color: 'var(--color-secondary-dark)',
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Projects
            </Typography>
            <Box
              sx={{
                width: 100,
                height: 4,
                backgroundColor: 'var(--color-secondary)',
                mx: 'auto',
                mb: 4,
                borderRadius: 2,
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: 'var(--color-text-secondary)',
                lineHeight: 2,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
              }}
            >
              Projects 페이지가 개발될 공간입니다.
              <br />
              포트폴리오 작품들이 들어갈 예정입니다.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Projects;
