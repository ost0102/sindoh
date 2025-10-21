// GSAP 플러그인 로드
gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

// section1
gsap.to(".s1-bg", {
    clipPath: "inset(0 100% 0 0)", 
    scrollTrigger: {
        trigger: ".s1",
        start: "5% top",
        end: "bottom bottom",
        scrub: true,
    }
});


// section2 애니메이션 통합
let s2Tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".s2",
        start: "top top",
        end: "30% 10%",
        scrub: true,
    },
});

s2Tl
    .fromTo(".s2-cont", { top: "100%" }, { top: "50%" })
    .to(".s2 .s2-inner .s2-cont .s2-list", { gap: "42px", ease: "none" }, 0);


// section3
gsap.fromTo(
    ".s3",
    { clipPath: "inset(100% 0 0 0)" }, 
    { 
        clipPath: "inset(0% 0 0 0)",  
        scrollTrigger: {
        trigger: ".s2",
            start: "30% bottom",   
            end: "bottom top",       
            scrub: true,
        }
    }
);

let s3Split1 = new SplitType(".s3 .inner-txt p:nth-child(1)", { types: "chars" });
let s3Chars1 = s3Split1.chars;
let s3Split2 = new SplitType(".s3 .inner-txt p:nth-child(2)", { types: "chars" });
let s3Chars2 = s3Split2.chars;

let s3Tl = gsap.timeline({
	scrollTrigger:{
		trigger: ".s3",
		start: "30% top",
		end: "bottom bottom",
		scrub: true,
	}
})
s3Tl
	.to(s3Chars1,{color:"#fff", stagger:1})
	.to(s3Chars2,{background:"linear-gradient(90deg, #6F36FF, #B89CFE)", stagger:1})


// section4 - s4-list 자동 슬라이드 + 드래그 연동 (px 단위로 일원화)
const list = document.querySelector(".s4-list");
const listContainer = document.querySelector(".s4-cont");

function getS4Bounds() {
	if (!list || !listContainer) return { minX: 0, maxX: 0 };
	const containerWidth = listContainer.clientWidth;
	const contentWidth = list.scrollWidth;
	const minX = Math.min(containerWidth - contentWidth, 0);
	return { minX, maxX: 0 };
}

let s4Bounds = getS4Bounds();
let autoSlideTween = null;
const autoSpeedPxPerSec = 80; // 자동 슬라이드 속도(px/s)

function restartAutoSlide() {
	if (!list) return;
	if (autoSlideTween) autoSlideTween.kill();
	// 현재 위치에서 왼쪽 끝(minX)까지 이동한 뒤 멈춤
	const currentX = gsap.getProperty(list, "x");
	const distance = Math.max(0.01, (currentX - s4Bounds.minX));
	const duration = distance / autoSpeedPxPerSec;
	autoSlideTween = gsap.to(list, {
		x: s4Bounds.minX,
		duration: duration,
		ease: "none",
		onComplete: function() {
			// 끝에 도달하면 자동 슬라이드를 중지
			autoSlideTween = null;
		}
	});
}

// Draggable 생성
let s4Drag = Draggable.create(list, {
	type: "x",
	inertia: true,
	bounds: s4Bounds,
	edgeResistance: 0.8,
	dragResistance: 0.8,
	cursor: "grab",
	activeCursor: "grabbing",

	onDragStart: function() {
		if (autoSlideTween) autoSlideTween.kill();
	},
	onDragEnd: function() {
		s4Bounds = getS4Bounds();
		this.applyBounds(s4Bounds);
		// 드래그 종료 후, 끝에 도달했는지 확인하고 필요 시에만 자동 슬라이드 재시작
		const currentX = gsap.getProperty(list, "x");
		if (currentX > s4Bounds.minX) {
			restartAutoSlide();
		}
	},
	onThrowUpdate: function() {
		if (autoSlideTween) autoSlideTween.kill();
	},
	onThrowComplete: function() {
		s4Bounds = getS4Bounds();
		this.applyBounds(s4Bounds);
		// 관성 스크롤 종료 후, 끝에 도달했는지 확인하고 필요 시에만 자동 슬라이드 재시작
		const currentX = gsap.getProperty(list, "x");
		if (currentX > s4Bounds.minX) {
			restartAutoSlide();
		}
	}
})[0];

// 리사이즈 시 경계 재설정 및 자동 슬라이드 보정
window.addEventListener('resize', function() {
	s4Bounds = getS4Bounds();
	if (s4Drag) s4Drag.applyBounds(s4Bounds);
	// 현재 위치 기준으로 다시 자동 슬라이드
	restartAutoSlide();
});

// s4 섹션에 진입할 때 자동 슬라이드 시작
ScrollTrigger.create({
	trigger: ".s4",
	start: "top 80%",
	onEnter: function() {
		restartAutoSlide();
	},
	onLeave: function() {
		// s4 섹션을 벗어나면 자동 슬라이드 중지
		if (autoSlideTween) {
			autoSlideTween.kill();
			autoSlideTween = null;
		}
	},
	onEnterBack: function() {
		// 다시 s4 섹션에 진입하면 자동 슬라이드 재시작
		restartAutoSlide();
	}
});