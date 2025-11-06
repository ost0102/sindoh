// GSAP 플러그인 로드
gsap.registerPlugin(ScrollTrigger);

// 1025px 이상, 이하 리사이즈 시 새로고침
let isDesktop = window.innerWidth >= 1025;

window.addEventListener("resize", () => {
    const currentIsDesktop = window.innerWidth >= 1025;

    if (currentIsDesktop !== isDesktop) {
        location.reload();
    }

    isDesktop = currentIsDesktop;
});

// 비디오 로드 후 애니메이션 실행 함수
function setupVideoAnimation(video) {
    video.addEventListener("loadedmetadata", () => {
        gsap.to(video, {
            currentTime: video.duration,
            ease: "none",
            scrollTrigger: {
                trigger: ".s1-inner",
                start: "0% 0%",
                end: "100% 100%",
                scrub: true,
                anticipatePin: 1,
            }
        });
    });
}

// 화면 크기가 1025px 이상일 경우
const video = document.getElementById("video");
if (window.innerWidth >= 1025) {
    setupVideoAnimation(video);  // 비디오 로드 후 애니메이션 실행
} else {
    video.play();  // 1025px 이하일 때는 바로 비디오 재생
}

// 이미지 및 스크롤 애니메이션
const img = document.querySelector(".mo-s4 .img-wrap img");
const imgWidth = img.offsetWidth;
const mos4Tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".mo-s4",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
    }
});
mos4Tl
    .to(".mo-s4 .img-wrap img", { x: -imgWidth / 2, ease: "none" }, 0)
    .to(".scroll-bar .progress", { width: "100%", ease: "none" }, 0);
