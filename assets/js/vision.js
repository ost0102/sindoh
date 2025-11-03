// GSAP 플러그인 로드
gsap.registerPlugin(ScrollTrigger);


const video = document.getElementById("video");
if (window.innerWidth >= 1025) {
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
} else {
    video.play();
}

gsap.set(".point-box img", { y: "16%", opacity: 0 });
gsap.set(".point-box .txt-wrap .txt1 p, .point-box .txt-wrap .txt2 p", { y: "100%", opacity: 0 });

// ================================
// 🟢 메인 타임라인 (비디오 재생 포함)
// ================================
const video2 = document.querySelector(".s3 .video-wrap video");

const PointTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".s3-inner",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        anticipatePin: 1,
        // markers: true,
        onUpdate: self => {
            // 데스크탑일 때만 비디오 시간 제어
            if (window.innerWidth >= 1025 && video2.duration) {
                // 비디오 구간을 타임라인의 마지막 20%에 배치
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

// === PointBox1 ===
PointTl.to("#PointBox1 img", { y: "0%", opacity: 1, duration: 1 })
    .to("#PointBox1 .txt-wrap .txt1 p, #PointBox1 .txt-wrap .txt2 p", { y: "0%", opacity: 1, duration: 1 }, "<")

// === PointBox1 → PointBox2 ===
    .to("#PointBox1 img", { y: "-16%", opacity: 0, duration: 1 })
    .to("#PointBox1 .txt-wrap .txt1 p, #PointBox1 .txt-wrap .txt2 p", { y: "-50%", opacity: 0, duration: 1 }, "<")
    .to("#PointBox2 img", { y: "0%", opacity: 1, duration: 1 }, ">-0.3")
    .to("#PointBox2 .txt-wrap .txt1 p, #PointBox2 .txt-wrap .txt2 p", { y: "0%", opacity: 1, duration: 1 }, "<")

// === PointBox2 → PointBox3 ===
    .to("#PointBox2 img", { y: "-16%", opacity: 0, duration: 1 })
    .to("#PointBox2 .txt-wrap .txt1 p, #PointBox2 .txt-wrap .txt2 p", { y: "-50%", opacity: 0, duration: 1 }, "<")
    .to("#PointBox3 img", { y: "0%", opacity: 1, duration: 1 }, ">-0.3")
    .to("#PointBox3 .txt-wrap .txt1 p, #PointBox3 .txt-wrap .txt2 p", { y: "0%", opacity: 1, duration: 1 }, "<")

// === PointBox3 → 비디오 등장 ===
    .to("#PointBox3", { y: "-50%", opacity: 0, duration: 1 })
    .to(".s3 .video-wrap", { opacity: 1, duration: 1 }, ">");

// ================================
// 🎥 비디오 초기화
// ================================
if (window.innerWidth >= 1025) {
    video2.addEventListener("loadedmetadata", () => {
        video2.currentTime = 0;
    });
} else {
    video2.play();
}