document.addEventListener("DOMContentLoaded", function () {

    // Lenis 제어 유틸
    function waitForLenis(callback) {
        if (window.lenis) {
            callback(window.lenis);
        } else {
            setTimeout(() => waitForLenis(callback), 50);
        }
    }

    let hasStartedLenis = false;
    // waitForLenis((lenis) => {
    //     lenis.stop();
    //     console.log("Lenis 스크롤이 일시 정지되었습니다.");
    // });

    function startLenisAfterVideo() {
        if (hasStartedLenis) return;
        waitForLenis((lenis) => {
            lenis.start();
            hasStartedLenis = true;
            console.log("Lenis 스크롤이 시작되었습니다.");
        });
    }

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

    // 비디오 애니메이션 설정 함수
    function setupVideoAnimation(video) {
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
    }

    // 비디오 설정
    const video = document.getElementById("video");
    let videoLoaded = false;

    function handleVideoLoaded() {
        if (videoLoaded) return;
        videoLoaded = true;
        console.log("비디오 로드 완료: video");
        startLenisAfterVideo();
    }

    function attachVideoLoadListeners(targetVideo) {
        if (!targetVideo) return;
        ["loadeddata", "canplay", "canplaythrough"].forEach((eventName) => {
            targetVideo.addEventListener(eventName, handleVideoLoaded);
        });
        if (targetVideo.readyState >= 2) {
            handleVideoLoaded();
        }
    }

    if (video) {
        attachVideoLoadListeners(video);
    } else {
        console.warn("video 요소를 찾을 수 없습니다.");
        // 비디오가 없다면 바로 Lenis 시작
        handleVideoLoaded();
    }

    if (window.innerWidth >= 1025) {
        // 비디오 메타데이터 로드 후 애니메이션 설정
        video?.addEventListener("loadedmetadata", () => {
            setupVideoAnimation(video);
        });
    } else {
        // 1025px 이하일 때는 바로 비디오 재생
        video?.play();
    }

    // 버튼 애니메이션
    gsap.fromTo(
        ".btn-wrap",
        { bottom: "20%", opacity: 0 },
        { 
            opacity: 1,
            bottom: "25%",
            scrollTrigger: {
                trigger: ".s1-inner",
                start: "85% 0%",
                end: "100% 100%",
                scrub: true,
            }
        }
    );

    // 이미지 및 스크롤 애니메이션
    const img = document.querySelector(".mo-s4 .img-wrap img");

    // 이미지가 실제 로드된 후 width 계산이 정확해짐
    img.addEventListener("load", function () {

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
    });

});
