import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 설정
// 환경 변수는 .env 파일에 설정
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 인증 관련 유틸리티 함수들
export const authService = {
  // 회원가입
  async signUp(username, password, nickname) {
    try {
      // TODO: Supabase Auth 대신 직접 users 테이블에 삽입
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            username,
            password, // 실제로는 해시 처리 필요
            nickname,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // 로그인
  async signIn(username, password) {
    try {
      // TODO: 비밀번호 검증 로직
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error) throw error;

      // 로컬 스토리지에 저장
      if (data) {
        localStorage.setItem('user', JSON.stringify(data));
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // 로그아웃
  signOut() {
    localStorage.removeItem('user');
  },

  // 현재 사용자 가져오기
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // 사용자 인증 여부 확인
  isAuthenticated() {
    return !!this.getCurrentUser();
  },
};

// 게시물 관련 유틸리티 함수들
export const postService = {
  // 게시물 목록 가져오기
  async getPosts(limit = 20, offset = 0) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          user:users(*),
          post_images(*),
          likes(count),
          comments(count)
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // 게시물 상세 가져오기
  async getPost(postId) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          user:users(*),
          post_images(*),
          likes(count),
          comments(*)
        `)
        .eq('id', postId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // 게시물 생성
  async createPost(userId, caption, location, imageUrls) {
    try {
      // 게시물 생성
      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert([{ user_id: userId, caption, location }])
        .select()
        .single();

      if (postError) throw postError;

      // 이미지 추가
      if (imageUrls && imageUrls.length > 0) {
        const images = imageUrls.map((url, index) => ({
          post_id: post.id,
          image_url: url,
          order_index: index,
        }));

        const { error: imagesError } = await supabase
          .from('post_images')
          .insert(images);

        if (imagesError) throw imagesError;
      }

      return { data: post, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // 좋아요 추가/제거
  async toggleLike(userId, postId) {
    try {
      // 기존 좋아요 확인
      const { data: existing } = await supabase
        .from('likes')
        .select('id')
        .eq('user_id', userId)
        .eq('post_id', postId)
        .single();

      if (existing) {
        // 좋아요 제거
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('id', existing.id);

        if (error) throw error;
        return { liked: false, error: null };
      } else {
        // 좋아요 추가
        const { error } = await supabase
          .from('likes')
          .insert([{ user_id: userId, post_id: postId }]);

        if (error) throw error;
        return { liked: true, error: null };
      }
    } catch (error) {
      return { liked: false, error };
    }
  },
};

// 사용자 관련 유틸리티 함수들
export const userService = {
  // 사용자 검색
  async searchUsers(query) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, username, nickname, profile_image, bio')
        .or(`username.ilike.%${query}%,nickname.ilike.%${query}%`)
        .limit(20);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // 사용자 프로필 가져오기
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          posts(count),
          followers:follows!follows_following_id_fkey(count),
          following:follows!follows_follower_id_fkey(count)
        `)
        .eq('id', userId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // 팔로우/언팔로우
  async toggleFollow(followerId, followingId) {
    try {
      // 기존 팔로우 확인
      const { data: existing } = await supabase
        .from('follows')
        .select('id')
        .eq('follower_id', followerId)
        .eq('following_id', followingId)
        .single();

      if (existing) {
        // 언팔로우
        const { error } = await supabase
          .from('follows')
          .delete()
          .eq('id', existing.id);

        if (error) throw error;
        return { following: false, error: null };
      } else {
        // 팔로우
        const { error } = await supabase
          .from('follows')
          .insert([{ follower_id: followerId, following_id: followingId }]);

        if (error) throw error;
        return { following: true, error: null };
      }
    } catch (error) {
      return { following: false, error };
    }
  },
};
