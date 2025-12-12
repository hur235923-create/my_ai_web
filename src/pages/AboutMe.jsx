import { Box, Container, Typography, Card, CardContent } from '@mui/material';

function AboutMe() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: 'var(--color-bg-primary)',
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
                color: 'var(--color-primary)',
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              About Me
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
              About Me 페이지가 개발될 공간입니다.
              <br />
              상세한 자기소개가 들어갈 예정입니다.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default AboutMe;
