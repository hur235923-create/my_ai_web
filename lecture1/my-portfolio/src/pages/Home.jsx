import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Guestbook from '../components/landing/Guestbook';

/**
 * Home 페이지 컴포넌트
 *
 * Props: 없음
 *
 * 5개 섹션으로 구성:
 * - Hero: 메인 비주얼
 * - About Me: 간단한 자기소개
 * - Skill Tree: 기술 스택
 * - Projects: 대표작 썸네일
 * - Contact: 연락처
 *
 * Example usage:
 * <Home />
 */
function Home() {
  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero 섹션 */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'var(--color-bg-primary)',
          background: 'var(--gradient-dark)',
          pt: { xs: 8, md: 0 },
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
                fontSize: { xs: '1rem', md: '1.2rem' },
              }}
            >
              HERO SECTION
            </Typography>
            <Typography
              variant="h1"
              sx={{
                color: 'var(--color-text-primary)',
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              여기는 Hero 섹션입니다
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'var(--color-text-secondary)',
                maxWidth: '600px',
                mx: 'auto',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
              }}
            >
              메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
            </Typography>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'var(--color-primary)',
                color: 'var(--color-primary)',
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'var(--color-primary-light)',
                  bgcolor: 'rgba(201, 169, 98, 0.1)',
                },
              }}
            >
              더 알아보기
            </Button>
          </Box>
        </Container>
      </Box>

      {/* About Me 섹션 */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'var(--color-bg-secondary)',
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
              variant="h3"
              sx={{
                color: 'var(--color-text-primary)',
                fontWeight: 600,
                mb: 4,
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              여기는 About Me 섹션입니다
            </Typography>
            <Card
              sx={{
                bgcolor: 'var(--color-bg-tertiary)',
                border: '1px solid var(--color-border-dark)',
                p: { xs: 3, md: 4 },
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.8,
                    mb: 3,
                  }}
                >
                  간단한 자기소개와 &apos;더 알아보기&apos; 버튼이 들어갈 예정입니다.
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  to="/about"
                  sx={{
                    bgcolor: 'var(--color-primary)',
                    color: 'var(--color-bg-primary)',
                    '&:hover': {
                      bgcolor: 'var(--color-primary-light)',
                    },
                  }}
                >
                  더 알아보기
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* Skill Tree 섹션 */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'var(--color-bg-primary)',
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
              SKILL TREE
            </Typography>
            <Typography
              variant="h3"
              sx={{
                color: 'var(--color-text-primary)',
                fontWeight: 600,
                mb: 4,
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              여기는 Skill Tree 섹션입니다
            </Typography>
            <Grid container spacing={3}>
              {['Frontend', 'Backend', 'Design', 'Tools'].map((skill) => (
                <Grid size={{ xs: 6, md: 3 }} key={skill}>
                  <Card
                    sx={{
                      bgcolor: 'var(--color-bg-secondary)',
                      border: '1px solid var(--color-border-dark)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'var(--color-primary)',
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'var(--color-text-primary)',
                          mb: 1,
                        }}
                      >
                        {skill}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'var(--color-text-muted)' }}
                      >
                        스킬 표시 예정
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Typography
              variant="body1"
              sx={{
                color: 'var(--color-text-secondary)',
                mt: 4,
                lineHeight: 1.8,
              }}
            >
              기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Projects 섹션 */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'var(--color-bg-secondary)',
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
              PROJECTS
            </Typography>
            <Typography
              variant="h3"
              sx={{
                color: 'var(--color-text-primary)',
                fontWeight: 600,
                mb: 4,
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              여기는 Projects 섹션입니다
            </Typography>
            <Grid container spacing={3}>
              {[1, 2, 3, 4].map((project) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={project}>
                  <Card
                    sx={{
                      bgcolor: 'var(--color-bg-tertiary)',
                      border: '1px solid var(--color-border-dark)',
                      aspectRatio: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: 'var(--color-primary)',
                        boxShadow: 'var(--shadow-gold)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ color: 'var(--color-text-secondary)' }}
                      >
                        Project {project}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'var(--color-text-muted)' }}
                      >
                        썸네일 예정
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Typography
              variant="body1"
              sx={{
                color: 'var(--color-text-secondary)',
                mt: 4,
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              대표작 썸네일 3-4개와 &apos;더 보기&apos; 버튼이 들어갈 예정입니다.
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              to="/projects"
              sx={{
                borderColor: 'var(--color-text-primary)',
                color: 'var(--color-text-primary)',
                '&:hover': {
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                },
              }}
            >
              더 보기
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Guestbook 섹션 (Contact 대체) */}
      <Guestbook />

      {/* Footer */}
      <Box
        sx={{
          py: 4,
          bgcolor: 'var(--color-bg-secondary)',
          borderTop: '1px solid var(--color-border-dark)',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="body2"
            sx={{
              color: 'var(--color-text-muted)',
              textAlign: 'center',
            }}
          >
            &copy; 2025 Portfolio. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
