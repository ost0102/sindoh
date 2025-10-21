// GSAP 플러그인 로드
gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);


// section2
const offset = window.innerHeight * 0.7; // .s1의 높이(70vh) → px로 변환

gsap.fromTo(".s2-bg",
    { y: 0 },
    {
        y: -150,
        scrollTrigger: {
            trigger: ".s2",
            start: `top-=${offset} top`,
            end: "top 70vh",
			scrub: true,
        }
    }
);

let s2Split = new SplitType(".s2-cont h2", { types: "chars" });
let s2Chars = s2Split.chars;

gsap.to(s2Chars, {
	color: "#fff",
	ease: "none",
	stagger: 1,
	scrollTrigger: {
		trigger: ".s2",
		start: "top top",
		end: "bottom bottom",
		scrub: true,
	}
});

// section3
let s3Tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".s3",
        start: "top top",
        end: "30% 10%",
        scrub: true,
    },
});

s3Tl
    .fromTo(".s3-cont", { top: "100%" }, { top: "50%" })
    .to(".s3 .s3-inner .s3-cont .s3-list", { gap: "42px", ease: "none" }, 0);


// section4
ScrollTrigger.create({
    trigger: ".s4",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: function (self) {
        var p = self.progress;
        var items = document.querySelectorAll(".s4-list .list-cont");
        var len = items.length;

        var section = 1 / len;

        items.forEach((item, i) => {
            if (p >= section * i && p < section * (i + 1)) {
                item.classList.add("on");
            } else {
                item.classList.remove("on");
            }
        });
    }
});

// section6
const slideTl = gsap.to(".s6-list", {
	x: "-30%",
	duration: 10,
	ease: "none",
	repeat: -1,
});
document.querySelectorAll(".list-img").forEach((imgWrap) => {
	const onImg = imgWrap.querySelector(".on");
	const offImg = imgWrap.querySelector(".off");

	imgWrap.addEventListener("mouseenter", () => {
		// 슬라이드 전체 멈춤
		slideTl.pause();

		// 개별 이미지 전환
		gsap.to(onImg, { opacity: 1, duration: 0.3, ease: "power2.out" });
		gsap.to(offImg, { opacity: 0, duration: 0.3, ease: "power2.out" });
	});

	imgWrap.addEventListener("mouseleave", () => {
		// 슬라이드 재시작
		slideTl.play();

		// 개별 이미지 원복
		gsap.to(onImg, { opacity: 0, duration: 0.3, ease: "power2.out" });
		gsap.to(offImg, { opacity: 1, duration: 0.3, ease: "power2.out" });
	});
});