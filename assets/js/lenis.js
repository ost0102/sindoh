document.addEventListener("DOMContentLoaded", () => {
  // 전역(window)에 붙여서 어디서든 접근 가능하게
  window.lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: true,
      infinite: false,
      inertia: 0.6
  });

  function raf(time) {
      window.lenis.raf(time);
      requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
});