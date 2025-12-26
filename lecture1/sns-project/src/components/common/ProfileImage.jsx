import { Avatar } from '@mui/material';

/**
 * 프로필 이미지 컴포넌트 (둥근 사각형 스타일)
 *
 * Props:
 * @param {string} src - 이미지 URL [Optional]
 * @param {string} alt - 이미지 alt 텍스트 [Optional, 기본값: 'Profile']
 * @param {string} size - 크기 ('large': 80px, 'medium': 48px, 'small': 32px, 'mini': 24px) [Optional, 기본값: 'medium']
 * @param {function} onClick - 클릭 이벤트 핸들러 [Optional]
 *
 * Example usage:
 * <ProfileImage src="/profile.jpg" size="large" />
 */
function ProfileImage({ src, alt = 'Profile', size = 'medium', onClick }) {
  const sizeMap = {
    large: 80,
    medium: 48,
    small: 32,
    mini: 24,
  };

  const borderRadiusMap = {
    large: '20px',
    medium: '12px',
    small: '8px',
    mini: '6px',
  };

  return (
    <Avatar
      src={src}
      alt={alt}
      onClick={onClick}
      sx={{
        width: sizeMap[size],
        height: sizeMap[size],
        borderRadius: borderRadiusMap[size],
        cursor: onClick ? 'pointer' : 'default',
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        '&:hover': onClick && {
          borderColor: 'primary.main',
        },
      }}
    />
  );
}

export default ProfileImage;
