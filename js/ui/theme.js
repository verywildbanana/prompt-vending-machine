// ============================================================
// 파일명: theme.js
// 역할: 다크/라이트 모드 토글 + localStorage에 테마 저장/복원
// 수정 시: 테마 로직 변경 시 이 파일만 수정
// ============================================================

// ────────────────────────────────────────────────────────────────
// ThemeManager: 테마 전환 담당
// ────────────────────────────────────────────────────────────────
const ThemeManager = {

  // localStorage 키
  STORAGE_KEY: 'promptvm-theme',

  // 앱 시작 시 저장된 테마 복원
  // 기본값: 'dark'
  init() {
    const saved = localStorage.getItem(this.STORAGE_KEY) || 'dark';
    this.apply(saved);
    this.bindToggle();
  },

  // 테마 적용
  // input: theme ('dark' | 'light')
  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    StateManager.update(s => { s.theme = theme; });
    localStorage.setItem(this.STORAGE_KEY, theme);
  },

  // 현재 테마 반환
  current() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  },

  // 테마 토글 버튼에 이벤트 바인딩
  bindToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const next = this.current() === 'dark' ? 'light' : 'dark';
      this.apply(next);
    });
  },
};
