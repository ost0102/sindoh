document.addEventListener("DOMContentLoaded", () => {

    function waitForLenis(callback) {
        if (window.lenis) callback(window.lenis);
        else setTimeout(() => waitForLenis(callback), 50);
    }
    waitForLenis(lenis => lenis.stop());

    function getDeviceType() {
        const w = window.innerWidth;
        if (w >= 1081) return "pc";
        if (w >= 1025 && w <= 1080) return "smallPc"; // 해당 사이즈에서 영상 재생이 안되어 추가
        if (w >= 768 && w <= 1024) return "tablet";
        return "mobile";
    }
    let deviceType = getDeviceType();
    window.addEventListener("resize", () => {
        const newType = getDeviceType();
        if (newType !== deviceType) location.reload();
        deviceType = newType;
    });

    const videoMap = {
        pc: ["video", "video2"],
        smallPc: ["Movideo1", "Movideo3"], // SmallPC 추가
        tablet: ["Movideo1", "Movideo3"],
        mobile: ["Movideo1", "Movideo2"]
    };
    const requiredVideos = videoMap[deviceType];
    const loadedVideos = new Set();

    function checkAllVideosLoaded() {
        if (requiredVideos.every(id => loadedVideos.has(id))) {
            waitForLenis(lenis => lenis.start());
        }
    }

    function addVideoLoadListeners(id, video) {
        const loadHandler = () => {
            if (!loadedVideos.has(id)) {
                loadedVideos.add(id);
                checkAllVideosLoaded();
            }
        };
        ["loadeddata", "canplay", "canplaythrough"].forEach(evt =>
            video.addEventListener(evt, loadHandler)
        );
        if (video.readyState >= 2) loadHandler();
    }

    requiredVideos.forEach(id => {
        const video = document.getElementById(id);
        if (!video) return console.warn(`${id} 요소를 찾을 수 없습니다.`);
        addVideoLoadListeners(id, video);
    });

    gsap.registerPlugin(ScrollTrigger);

    function createVideoScrubAnimation(video, trigger) {
        if (!video) return;
        const init = () => {
            if (!video.duration || isNaN(video.duration) || video.duration === 0) {
                requestAnimationFrame(init);
                return;
            }
            gsap.to(video, {
                currentTime: video.duration,
                ease: "none",
                scrollTrigger: {
                    trigger,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                }
            });
        };
        if (video.readyState >= 1) init();
        else video.addEventListener("loadedmetadata", init);
    }

    function fadePointCommon() {
        gsap.fromTo(".point-wrap", { opacity: 0, y: "10%" }, {
            opacity: 1,
            y: 0,
            scrollTrigger: { trigger: ".s3-inner", start: "top 90%", end: "30% bottom", scrub: true }
        });
        gsap.fromTo(".point-wrap", { opacity: 1, y: 0 }, {
            opacity: 0,
            y: "-10%",
            scrollTrigger: { trigger: ".s3-inner", start: "60% top", end: "bottom 30%", scrub: true }
        });
    }

    function initPC() {
        const video = document.getElementById("video");
        const video2 = document.getElementById("video2");
        if (video) createVideoScrubAnimation(video, ".s1-inner");

        gsap.set(".point-box img", { y: "16%", opacity: 0 });
        gsap.set(".point-box .txt-wrap .txt1 p, .point-box .txt-wrap .txt2 p", { y: "100%", opacity: 0 });

        if (video2) {
            video2.addEventListener("loadedmetadata", () => video2.currentTime = 0);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".s3-inner",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                    onUpdate: self => {
                        if (!video2.duration) return;
                        const startAt = 0.8;
                        const endAt = 1.0;
                        if (self.progress >= startAt) {
                            const p = (self.progress - startAt) / (endAt - startAt);
                            video2.currentTime = video2.duration * gsap.utils.clamp(0, 1, p);
                        }
                    }
                }
            });

            tl
                .to("#PointBox1 img", { y: "0%", opacity: 1 })
                .to("#PointBox1 .txt1 p, #PointBox1 .txt2 p", { y: "0%", opacity: 1 }, "<")
                .to("#PointBox1 img", { y: "-16%", opacity: 0 })
                .to("#PointBox1 .txt1 p, #PointBox1 .txt2 p", { y: "-50%", opacity: 0 }, "<")
                .to("#PointBox2 img", { y: "0%", opacity: 1 }, ">-0.3")
                .to("#PointBox2 .txt1 p, #PointBox2 .txt2 p", { y: "0%", opacity: 1 }, "<")
                .to("#PointBox2 img", { y: "-16%", opacity: 0 })
                .to("#PointBox2 .txt1 p, #PointBox2 .txt2 p", { y: "-50%", opacity: 0 }, "<")
                .to("#PointBox3 img", { y: "0%", opacity: 1 }, ">-0.3")
                .to("#PointBox3 .txt1 p, #PointBox3 .txt2 p", { y: "0%", opacity: 1 }, "<")
                .to("#PointBox3", { y: "-50%", opacity: 0 })
                .to(".s3 .video-wrap", { opacity: 1 });
        }
    }

    function initTablet() {
        fadePointCommon();
        const v1 = document.getElementById("Movideo1");
        const v3 = document.getElementById("Movideo3");
        createVideoScrubAnimation(v1, ".s1-inner");
        createVideoScrubAnimation(v3, ".s4");
    }

    function initSmallPc() {
        initTablet(); // SmallPC는 Tablet과 동일
    }

    function initMobile() {
        fadePointCommon();
        const v1 = document.getElementById("Movideo1");
        const v2 = document.getElementById("Movideo2");
        createVideoScrubAnimation(v1, ".s1-inner");
        createVideoScrubAnimation(v2, ".s5");
    }

    // 섹션1 텍스트 애니메이션
    const s1Tl = gsap.timeline({
        scrollTrigger: { trigger: ".s1", start: "28% top", end: "bottom bottom", scrub: true }
    });
    s1Tl
        .to(".s1 .txt-cont.txt1", { opacity: 1, ease: "power2.out" })
        .to(".video-txt", { top: 0, ease: "power2.out" })
        .to(".video-txt", { top: "-90%", ease: "power2.out" });

    if (deviceType === "pc") initPC();
    else if (deviceType === "smallPc") initSmallPc();
    else if (deviceType === "tablet") initTablet();
    else initMobile();

});