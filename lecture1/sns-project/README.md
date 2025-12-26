# MintGram - Instagram 스타일 SNS 프로젝트

민트 그린 포인트 컬러의 Instagram 스타일 소셜 네트워크 서비스입니다.

## 🎨 디자인 특징

- **민트 그린 포인트 컬러** (#00D9A3 라이트, #00F5B8 다크)
- **다크 모드 중심 설계** (라이트/다크 모드 전환 지원)
- **둥근 사각형 스타일** (프로필 이미지, 카드 등)
- **부드러운 애니메이션** (클릭 시 scale 효과, transition)

## 🚀 기능

### 핵심 기능
- ✅ **게시물 업로드** - 이미지 업로드, 캡션, 위치 태그
- ✅ **팔로우/팔로잉** - 사용자 팔로우 시스템
- ✅ **유저 검색** - 닉네임/아이디 검색
- ✅ **메시지** - 1:1 대화 기능

### 구현된 페이지
- 로그인/회원가입
- 메인 피드 (타임라인)
- 프로필 페이지
- 게시물 업로드
- 유저 검색
- 알림
- 메시지

## 🛠 기술 스택

- **Frontend**: React 19 + Vite
- **UI Library**: Material-UI (MUI) v7
- **Routing**: React Router v7
- **Database**: Supabase (PostgreSQL)
- **Styling**: Emotion (CSS-in-JS)
- **Icons**: Material Icons
- **Fonts**: Pretendard, Inter

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 Supabase 정보를 입력하세요:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. 데이터베이스 스키마 생성
`supabase-schema.sql` 파일의 내용을 Supabase Dashboard > SQL Editor에서 실행하세요.

### 4. 개발 서버 실행
```bash
npm run dev
```

### 5. 빌드
```bash
npm run build
```

## 📂 프로젝트 구조

```
sns-project/
├── src/
│   ├── components/
│   │   ├── common/          # 공통 컴포넌트 (TopBar, BottomBar, ProfileImage)
│   │   ├── ui/              # UI 컴포넌트 (PostCard)
│   │   └── layout/          # 레이아웃 컴포넌트 (MainLayout)
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── FeedPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── SearchPage.jsx
│   │   ├── UploadPage.jsx
│   │   ├── NotificationsPage.jsx
│   │   └── MessagesPage.jsx
│   ├── utils/               # 유틸리티 함수
│   │   └── supabase.js      # Supabase 클라이언트 & 서비스
│   ├── theme.js             # MUI 테마 설정
│   ├── index.css            # 글로벌 CSS
│   ├── App.jsx              # 메인 앱 컴포넌트
│   └── main.jsx             # 엔트리 포인트
├── supabase-schema.sql      # 데이터베이스 스키마
└── package.json
```

## 🎯 데이터베이스 스키마

- **users** - 사용자 정보
- **posts** - 게시물
- **post_images** - 게시물 이미지
- **likes** - 좋아요
- **comments** - 댓글
- **comment_likes** - 댓글 좋아요
- **follows** - 팔로우 관계
- **message_rooms** - 메시지방
- **message_room_participants** - 메시지방 참여자
- **messages** - 메시지
- **notifications** - 알림
- **saved_posts** - 저장한 게시물
- **blocked_users** - 차단한 사용자

## 🚀 Netlify 배포

### 방법 1: Netlify CLI 사용
```bash
# Netlify CLI 설치 (전역)
npm install -g netlify-cli

# Netlify 로그인
netlify login

# 배포
cd sns-project
netlify deploy --prod --dir=dist
```

### 방법 2: Netlify Dashboard 사용
1. [Netlify](https://netlify.com) 대시보드 접속
2. "Add new site" > "Deploy manually" 선택
3. `sns-project/dist` 폴더를 드래그 앤 드롭

### 배포 설정
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Environment variables**: Supabase URL 및 Key 설정

## 📝 개발 가이드

### 코드 컨벤션
- 컴포넌트명: PascalCase
- 함수명: camelCase
- 파일명: PascalCase (컴포넌트), camelCase (유틸리티)
- Props 주석 필수 작성

### 컴포넌트 구조
```jsx
/**
 * 컴포넌트 설명
 *
 * Props:
 * @param {type} name - 설명 [Required/Optional]
 *
 * Example usage:
 * <Component prop="value" />
 */
function Component({ prop }) {
  return <div>{prop}</div>;
}
```

## 🎨 디자인 시스템

### 색상
- Primary: #00D9A3 (라이트), #00F5B8 (다크)
- Secondary: #FF3B5C (라이트), #FF547C (다크)
- Background: #FFFFFF (라이트), #0A0A0A (다크)

### 타이포그래피
- Heading 1: 28px, Bold
- Heading 2: 24px, Bold
- Heading 3: 20px, SemiBold
- Body: 14px, Regular
- Caption: 12px, Regular

### 간격
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

### Border Radius
- xs: 4px (태그)
- sm: 8px (버튼)
- md: 12px (카드)
- lg: 16px (큰 카드)
- xl: 20px (프로필 이미지)

## 📄 라이선스

MIT License

## 👨‍💻 개발자

- 로키 (Claude Sonnet 4.5)
- 프로젝트 문의: [이메일 주소]

---

**Made with ❤️ using React + Vite + MUI**
