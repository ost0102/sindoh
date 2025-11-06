gsap.registerPlugin(ScrollTrigger);

// 768px 이상 ~ 1024px 이하 구간 (태블릿) 새로고침
let isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;

window.addEventListener("resize", () => {
    const currentIsTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;

    if (currentIsTablet !== isTablet) {
        location.reload();
    }

    isTablet = currentIsTablet;
});

// 비디오가 로드된 후 애니메이션 실행 함수
function setupVideoAnimation(video, triggerSelector, start, end) {
    video.addEventListener("loadedmetadata", () => {
        gsap.to(video, {
            currentTime: video.duration,
            ease: "none",
            scrollTrigger: {
                trigger: triggerSelector,
                start: start,
                end: end,
                scrub: true,
                anticipatePin: 1,
            }
        });
    });
}

if (window.innerWidth >= 1025) {
    const video = document.getElementById("video");
    setupVideoAnimation(video, ".s1-inner", "0% 0%", "100% 100%");

    const video2 = document.querySelector(".s3 .video-wrap video");
    video2.addEventListener("loadedmetadata", () => {
        video2.currentTime = 0;  // 비디오가 준비된 후 초기화
    });

    const PointTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".s3-inner",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            anticipatePin: 1,
            onUpdate: self => {
                if (video2.duration) {
                    const startAt = 0.8;
                    const endAt = 1.0;
                    if (self.progress >= startAt) {
                        const localProgress = (self.progress - startAt) / (endAt - startAt);
                        video2.currentTime = video2.duration * gsap.utils.clamp(0, 1, localProgress);
                    }
                }
            }
        }
    });

    PointTl
        .to("#PointBox1 img", { y: "0%", opacity: 1, duration: 1 })
        .to("#PointBox1 .txt-wrap .txt1 p, #PointBox1 .txt-wrap .txt2 p", { y: "0%", opacity: 1, duration: 1 }, "<")
        .to("#PointBox1 img", { y: "-16%", opacity: 0, duration: 1 })
        .to("#PointBox1 .txt-wrap .txt1 p, #PointBox1 .txt-wrap .txt2 p", { y: "-50%", opacity: 0, duration: 1 }, "<")
        .to("#PointBox2 img", { y: "0%", opacity: 1, duration: 1 }, ">-0.3")
        .to("#PointBox2 .txt-wrap .txt1 p, #PointBox2 .txt-wrap .txt2 p", { y: "0%", opacity: 1, duration: 1 }, "<")
        .to("#PointBox2 img", { y: "-16%", opacity: 0, duration: 1 })
        .to("#PointBox2 .txt-wrap .txt1 p, #PointBox2 .txt-wrap .txt2 p", { y: "-50%", opacity: 0, duration: 1 }, "<")
        .to("#PointBox3 img", { y: "0%", opacity: 1, duration: 1 }, ">-0.3")
        .to("#PointBox3 .txt-wrap .txt1 p, #PointBox3 .txt-wrap .txt2 p", { y: "0%", opacity: 1, duration: 1 }, "<")
        .to("#PointBox3", { y: "-50%", opacity: 0, duration: 1 })
        .to(".s3 .video-wrap", { opacity: 1, duration: 1 }, ">");

} else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
    const Movideo1 = document.getElementById("Movideo1");
    setupVideoAnimation(Movideo1, ".s1-inner", "0% 0%", "100% 100%");

    const Movideo3 = document.getElementById("Movideo3");
    setupVideoAnimation(Movideo3, ".s4", "0% 0%", "100% 100%");

    gsap.fromTo(
        ".point-wrap",
        { opacity: 0, y: "10%" },
        {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: ".s3-inner",
                start: "top 90%",
                end: "30% bottom",
                scrub: true,
            }
        }
    );

    gsap.fromTo(
        ".point-wrap",
        { opacity: 1, y: 0 },
        {
            opacity: 0,
            y: "-10%",
            scrollTrigger: {
                trigger: ".s3-inner",
                start: "60% top",
                end: "bottom 30%",
                scrub: true,
            }
        }
    );

} else if (window.innerWidth < 768) {
    const Movideo1 = document.getElementById("Movideo1");
    setupVideoAnimation(Movideo1, ".s1-inner", "0% 0%", "100% 100%");

    gsap.fromTo(
        ".point-wrap",
        { opacity: 0, y: "10%" },
        {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: ".s3-inner",
                start: "top 90%",
                end: "30% bottom",
                scrub: true,
            }
        }
    );

    const Movideo2 = document.getElementById("Movideo2");
    setupVideoAnimation(Movideo2, ".s5", "0% 0%", "100% 100%");

    gsap.fromTo(
        ".point-wrap",
        { opacity: 1, y: 0 },
        {
            opacity: 0,
            y: "-10%",
            scrollTrigger: {
                trigger: ".s3-inner",
                start: "60% top",
                end: "bottom 30%",
                scrub: true,
            }
        }
    );
}
