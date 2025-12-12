import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const sectionStyles = {
  hero: {
    backgroundColor: 'var(--color-bg-tertiary)',
    color: 'var(--color-text-inverse)',
    py: { xs: 8, md: 12 },
    textAlign: 'center',
  },
  aboutMe: {
    backgroundColor: 'var(--color-bg-primary)',
    py: { xs: 6, md: 8 },
  },
  skillTree: {
    backgroundColor: 'var(--color-bg-secondary)',
    py: { xs: 6, md: 8 },
  },
  projects: {
    backgroundColor: 'var(--color-bg-primary)',
    py: { xs: 6, md: 8 },
  },
  contact: {
    backgroundColor: 'var(--color-primary-dark)',
    color: 'var(--color-text-inverse)',
    py: { xs: 6, md: 8 },
  },
};

function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={sectionStyles.hero}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: 'var(--color-text-inverse)',
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Hero Section
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'var(--color-cream)',
              mb: 4,
              lineHeight: 1.8,
            }}
          >
            여기는 Hero 섹션입니다.
            <br />
            메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-text-primary)',
              px: 4,
              py: 1.5,
              '&:hover': {
                backgroundColor: 'var(--color-secondary-dark)',
              },
            }}
          >
            자세히 보기
          </Button>
        </Container>
      </Box>

      {/* About Me Section */}
      <Box sx={sectionStyles.aboutMe}>
        <Container maxWidth="md">
          <Card
            sx={{
              backgroundColor: 'var(--color-bg-card)',
              textAlign: 'center',
            }}
          >
            <CardContent sx={{ py: { xs: 4, md: 6 }, px: { xs: 3, md: 6 } }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: 'var(--color-primary)',
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                }}
              >
                About Me
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'var(--color-text-secondary)',
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.8,
                }}
              >
                여기는 About Me 섹션입니다.
                <br />
                간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
              </Typography>
              <Button
                component={Link}
                to="/about"
                variant="outlined"
                sx={{
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                  '&:hover': {
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-text-inverse)',
                  },
                }}
              >
                더 알아보기
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Skill Tree Section */}
      <Box sx={sectionStyles.skillTree}>
        <Container maxWidth="md">
          <Card
            sx={{
              backgroundColor: 'var(--color-bg-card)',
              textAlign: 'center',
            }}
          >
            <CardContent sx={{ py: { xs: 4, md: 6 }, px: { xs: 3, md: 6 } }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: 'var(--color-green-forest)',
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                }}
              >
                Skill Tree
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'var(--color-text-secondary)',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.8,
                }}
              >
                여기는 Skill Tree 섹션입니다.
                <br />
                기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Projects Section */}
      <Box sx={sectionStyles.projects}>
        <Container maxWidth="md">
          <Card
            sx={{
              backgroundColor: 'var(--color-bg-card)',
              textAlign: 'center',
            }}
          >
            <CardContent sx={{ py: { xs: 4, md: 6 }, px: { xs: 3, md: 6 } }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: 'var(--color-secondary-dark)',
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                }}
              >
                Projects
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'var(--color-text-secondary)',
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.8,
                }}
              >
                여기는 Projects 섹션입니다.
                <br />
                대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.
              </Typography>
              <Button
                component={Link}
                to="/projects"
                variant="contained"
                sx={{
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-text-primary)',
                  '&:hover': {
                    backgroundColor: 'var(--color-secondary-dark)',
                  },
                }}
              >
                더 보기
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={sectionStyles.contact}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 600,
                mb: 3,
                color: 'var(--color-text-inverse)',
                fontSize: { xs: '1.75rem', md: '2.5rem' },
              }}
            >
              Contact
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'var(--color-cream)',
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
              }}
            >
              여기는 Contact 섹션입니다.
              <br />
              연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
