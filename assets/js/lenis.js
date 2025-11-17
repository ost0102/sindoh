document.addEventListener("DOMContentLoaded", () => {
  // Lenis 초기화
  const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
  });

  // 애니메이션 프레임 설정
  function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
});
