import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { supabase } from '../../utils/supabase';

/**
 * Guestbook 컴포넌트 - 방명록 입력 및 목록
 *
 * Props: 없음
 *
 * Example usage:
 * <Guestbook />
 */
function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    author: '',
    job: '',
    content: '',
    rating: 5,
    contact: '',
    isContactPublic: false,
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (err) {
      setError('방명록을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (event, newValue) => {
    setFormData((prev) => ({ ...prev, rating: newValue }));
  };

  const handleSwitchChange = (e) => {
    setFormData((prev) => ({ ...prev, isContactPublic: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.author.trim() || !formData.content.trim()) {
      setError('이름과 내용은 필수입니다.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const { error } = await supabase.from('guestbook').insert([
        {
          author: formData.author.trim(),
          job: formData.job.trim() || null,
          content: formData.content.trim(),
          rating: formData.rating,
          contact: formData.contact.trim() || null,
          is_contact_public: formData.isContactPublic,
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      setFormData({
        author: '',
        job: '',
        content: '',
        rating: 5,
        contact: '',
        isContactPublic: false,
      });

      fetchEntries();

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('방명록 등록에 실패했습니다.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'var(--color-bg-primary)',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            GUESTBOOK
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: 'var(--color-text-primary)',
              fontWeight: 600,
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            방명록
          </Typography>
        </Box>

        {/* 입력 폼 */}
        <Card
          sx={{
            bgcolor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border-dark)',
            mb: 4,
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h6"
              sx={{
                color: 'var(--color-text-primary)',
                mb: 3,
                fontWeight: 600,
              }}
            >
              방명록 작성
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                방명록이 등록되었습니다!
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="이름"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'var(--color-text-primary)',
                        '& fieldset': {
                          borderColor: 'var(--color-border-dark)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'var(--color-primary)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'var(--color-primary)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'var(--color-text-secondary)',
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="직업 (선택)"
                    name="job"
                    value={formData.job}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'var(--color-text-primary)',
                        '& fieldset': {
                          borderColor: 'var(--color-border-dark)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'var(--color-primary)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'var(--color-primary)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'var(--color-text-secondary)',
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="내용"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'var(--color-text-primary)',
                        '& fieldset': {
                          borderColor: 'var(--color-border-dark)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'var(--color-primary)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'var(--color-primary)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'var(--color-text-secondary)',
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box>
                    <Typography
                      component="legend"
                      sx={{
                        color: 'var(--color-text-secondary)',
                        mb: 1,
                        fontSize: '0.875rem',
                      }}
                    >
                      별점
                    </Typography>
                    <Rating
                      name="rating"
                      value={formData.rating}
                      onChange={handleRatingChange}
                      size="large"
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: 'var(--color-primary)',
                        },
                        '& .MuiRating-iconEmpty': {
                          color: 'var(--color-border-dark)',
                        },
                      }}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="연락처 (선택)"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="이메일 또는 전화번호"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'var(--color-text-primary)',
                        '& fieldset': {
                          borderColor: 'var(--color-border-dark)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'var(--color-primary)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'var(--color-primary)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'var(--color-text-secondary)',
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isContactPublic}
                        onChange={handleSwitchChange}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: 'var(--color-primary)',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: 'var(--color-primary)',
                          },
                        }}
                      />
                    }
                    label="연락처 공개"
                    sx={{
                      color: 'var(--color-text-secondary)',
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={submitting}
                    sx={{
                      bgcolor: 'var(--color-primary)',
                      color: 'var(--color-bg-primary)',
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: 'var(--color-primary-light)',
                      },
                      '&:disabled': {
                        bgcolor: 'var(--color-bg-tertiary)',
                      },
                    }}
                  >
                    {submitting ? <CircularProgress size={24} /> : '등록하기'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>

        {/* 방명록 목록 */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: 'var(--color-text-primary)',
              mb: 3,
              fontWeight: 600,
            }}
          >
            방명록 목록 ({entries.length})
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress sx={{ color: 'var(--color-primary)' }} />
            </Box>
          ) : entries.length === 0 ? (
            <Card
              sx={{
                bgcolor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border-dark)',
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography sx={{ color: 'var(--color-text-muted)' }}>
                  아직 작성된 방명록이 없습니다. 첫 번째 방명록을 남겨주세요!
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {entries.map((entry) => (
                <Card
                  key={entry.id}
                  sx={{
                    bgcolor: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border-dark)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'var(--color-primary)',
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    {/* 헤더: 이름, 직업, 별점 */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PersonIcon sx={{ color: 'var(--color-primary)', fontSize: '1.2rem' }} />
                        <Typography
                          sx={{
                            color: 'var(--color-text-primary)',
                            fontWeight: 600,
                          }}
                        >
                          {entry.author}
                        </Typography>
                      </Box>

                      {entry.job && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <WorkIcon sx={{ color: 'var(--color-text-muted)', fontSize: '1rem' }} />
                          <Typography
                            sx={{
                              color: 'var(--color-text-secondary)',
                              fontSize: '0.875rem',
                            }}
                          >
                            {entry.job}
                          </Typography>
                        </Box>
                      )}

                      <Rating
                        value={entry.rating}
                        readOnly
                        size="small"
                        sx={{
                          '& .MuiRating-iconFilled': {
                            color: 'var(--color-primary)',
                          },
                          '& .MuiRating-iconEmpty': {
                            color: 'var(--color-border-dark)',
                          },
                        }}
                      />
                    </Box>

                    <Divider sx={{ borderColor: 'var(--color-border-dark)', mb: 2 }} />

                    {/* 내용 */}
                    <Typography
                      sx={{
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.8,
                        mb: 2,
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {entry.content}
                    </Typography>

                    {/* 푸터: 시간, 연락처 */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: 2,
                        mt: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon sx={{ color: 'var(--color-text-muted)', fontSize: '1rem' }} />
                        <Typography
                          sx={{
                            color: 'var(--color-text-muted)',
                            fontSize: '0.75rem',
                          }}
                        >
                          {formatDate(entry.created_at)}
                        </Typography>
                      </Box>

                      {entry.contact && entry.is_contact_public && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <ContactPhoneIcon sx={{ color: 'var(--color-text-muted)', fontSize: '1rem' }} />
                          <Typography
                            sx={{
                              color: 'var(--color-text-muted)',
                              fontSize: '0.75rem',
                            }}
                          >
                            {entry.contact}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Guestbook;
