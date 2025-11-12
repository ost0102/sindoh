const lenis = new Lenis({
  duration: 3,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();  // 애니메이션이 스크롤 상태를 업데이트
  requestAnimationFrame(raf);  // 계속해서 실행
}
