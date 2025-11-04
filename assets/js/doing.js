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
	.to(s3Chars2,{color:"#7038FF", stagger:1})


// section4
let numod;
ScrollTrigger.matchMedia({
    "(min-width: 1081px)": function() {

        gsap.fromTo(
            ".mobile-img",
            { left: "-50%" },
            {
                left: "15vw",
                duration: 1,
                scrollTrigger: {
                    trigger: ".s4",
                    start: "top top",
                    end: "20% bottom",
                    scrub: true,
                }
            }
        );

        let numod = new Odometer({
            el: document.querySelector('.s4 .num p'),
        });

        let s4Tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".s4",
                start: "21% top",
                end: "90% bottom",
                scrub: true,
            }
        });

        s4Tl
            .to(".mobile-img", { left: "50%", duration: 1 }) 
            .to(".intro", { opacity: 0})
            .to(".mobile-img", { rotate: -90, scale: .9, duration: 1 })
            .to(".mobile3 img", { clipPath: "inset(0% 0% 0% 0%)", duration: 1 })
            .to(".mobile-txt", { opacity: 1, duration: .3 })
            .to(".pop-inner", {width:"100%", height:"100%", duration:1})
            .to(".mobile-img", { top: "4.4vw", duration: 1 })
            .to(".pop-inner", { top: "-100%", duration: 1 },'<')
            .to(".mobile-txt", { opacity: 0, duration: 1 },'<')
            .to(".mobile4", {opacity: 1, duration: 1})
            .to(".mobile4 img", {left:"41.2vw", duration: 1})
            .to(".mobile_behind", { opacity:1, top:"35vw" , duration: 1 })
            .to(".num", { opacity:1, ease:"none" })
            .to(".recipt-txt", { opacity:1, ease:"none" },'<')
            .to({}, { 
                duration: 1,
                ease: "none",
                onUpdate: function() {
                    let progress = this.progress();
                    let value = Math.round(progress * 119000);
                    numod.update(value);
                }
            },'<');
    },
    "(min-width:769px) and (max-width: 1080px)": function(){
        gsap.fromTo(
            ".mobile-img",
            { top: "150%" },
            {
                top: "50vw",
                duration: 1,
                scrollTrigger: {
                    trigger: ".s4",
                    start: "top top",
                    end: "20% bottom",
                    scrub: true,
                }
            }
        )

        let numod = new Odometer({
            el: document.querySelector('.s4 .num p'),
        });

        gsap.set(".mobile-txt",{top:"250px"})
        gsap.set(".mobile_behind",{top:"240px"})
        let s4Tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".s4",
                start: "21% top",
                end: "90% bottom",
                scrub: true,
            }
        })

        s4Tl2
            .to(".intro", { opacity: 0, duration:1})
            .to(".intro-txt", {top: "-100px", opacity:0, duration:1},'<')
            .to(".mobile-txt", {opacity:1, top: "140px", duration:1},'<')
            .to(".mobile3 img", { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },'<')
            .to(".pop-area_mo .pop-inner", {top:"70%", duration:1}) 
            .to(".pop-area_mo .pop-inner", {top:"-30%", opacity:0, duration:1}) 
            .to(".mobile5 img", {clipPath:"inset(0% 0% 0% 0%)", duration: 1})
            .to(".mobile-txt", {opacity:0, top: "70px", duration:1},'<')
            .to(".mobile_behind", {opacity:1, top:"130px", duration: 1},'<')
            .to(".num", { opacity:1, ease:"none" })
            .to(".recipt-txt", { opacity:1, ease:"none" },'<')
            .to({}, { 
                duration: .1,
                ease: "none",
                onUpdate: function() {
                    let progress = this.progress();
                    let value = Math.round(progress * 119000);
                    numod.update(value);
                }
            });
    },

    "(max-width: 768px)": function(){
        gsap.fromTo(
            ".mobile-img",
            { top: "150%" },
            {
                top: "50%",
                duration: 1,
                scrollTrigger: {
                    trigger: ".s4",
                    start: "top top",
                    end: "20% bottom",
                    scrub: true,
                }
            }
        )

        let numod = new Odometer({
            el: document.querySelector('.s4 .num p'),
        });

        gsap.set(".mobile-txt",{top:"250px"})
        gsap.set(".mobile_behind",{top:"240px"})
        let s4Tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".s4",
                start: "21% top",
                end: "90% bottom",
                scrub: true,
            }
        })

        s4Tl2
            .to(".intro", { opacity: 0, duration:1})
            .to(".intro-txt", {top: "-100px", opacity:0, duration:1},'<')
            .to(".mobile-txt", {opacity:1, top: "140px", duration:1},'<')
            .to(".mobile3 img", { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },'<')
            .to(".pop-area_mo .pop-inner", {top:"50%", duration:1}) 
            .to(".pop-area_mo .pop-inner", {top:"-30%", opacity:0, duration:1}) 
            .to(".mobile5 img", {clipPath:"inset(0% 0% 0% 0%)", duration: 1})
            .to(".mobile-txt", {opacity:0, top: "70px", duration:1},'<')
            .to(".mobile_behind", {opacity:1, top:"130px", duration: 1},'<')
            .to(".num", { opacity:1, ease:"none" })
            .to(".recipt-txt", { opacity:1, ease:"none" },'<')
            .to({}, { 
                duration: 1,
                ease: "none",
                onUpdate: function() {
                    let progress = this.progress();
                    let value = Math.round(progress * 119000);
                    numod.update(value);
                }
            });
    }
});



// section5 - s5-list 자동 슬라이드 + 드래그 연동 (px 단위로 일원화)
const list = document.querySelector(".s5-list");
const listContainer = document.querySelector(".s5-cont");

function getS5Bounds() {
	if (!list || !listContainer) {
		return { minX: 0, maxX: 0 };
	}
	const containerWidth = listContainer.clientWidth;
	const contentWidth = list.scrollWidth;
	const minX = Math.min(containerWidth - contentWidth, 0);
	
	// 슬라이드가 필요한지 확인 (내용물이 컨테이너보다 클 때만)
	const needsSlide = contentWidth > containerWidth;
	
	return { minX, maxX: 0, needsSlide };
}

let s5Bounds = getS5Bounds();
let autoSlideTween = null;
const autoSpeedPxPerSec = 80; // 자동 슬라이드 속도(px/s)

function restartAutoSlide() {
	if (!list) {
		return;
	}
	
	// 경계값 재계산
	s5Bounds = getS5Bounds();
	
	// 슬라이드가 필요한지 확인
	if (!s5Bounds.needsSlide) {
		return;
	}
	
	if (autoSlideTween) autoSlideTween.kill();
	
	// 현재 위치에서 왼쪽 끝(minX)까지 이동한 뒤 멈춤
	const currentX = gsap.getProperty(list, "x");
	const distance = Math.max(0.01, (currentX - s5Bounds.minX));
	const duration = distance / autoSpeedPxPerSec;
	
	// 슬라이드할 내용이 있는지 확인
	if (distance <= 0.01) {
		return;
	}
	
	autoSlideTween = gsap.to(list, {
		x: s5Bounds.minX,
		duration: duration,
		ease: "none",
		onComplete: function() {
			// 끝에 도달하면 자동 슬라이드를 중지
			autoSlideTween = null;
		}
	});
}

// Draggable 생성
let s5Drag = Draggable.create(list, {
	type: "x",
	inertia: true,
	bounds: s5Bounds,
	edgeResistance: 0.8,
	dragResistance: 0.2,
	cursor: "grab",
	activeCursor: "grabbing",

	onDragStart: function() {
		if (autoSlideTween) autoSlideTween.kill();
	},
	onDragEnd: function() {
		s5Bounds = getS5Bounds();
		this.applyBounds(s5Bounds);
		// 드래그 종료 후, 끝에 도달했는지 확인하고 필요 시에만 자동 슬라이드 재시작
		const currentX = gsap.getProperty(list, "x");
		if (currentX > s5Bounds.minX) {
			restartAutoSlide();
		}
	},
	onThrowUpdate: function() {
		if (autoSlideTween) autoSlideTween.kill();
	},
	onThrowComplete: function() {
		s5Bounds = getS5Bounds();
		this.applyBounds(s5Bounds);
		// 관성 스크롤 종료 후, 끝에 도달했는지 확인하고 필요 시에만 자동 슬라이드 재시작
		const currentX = gsap.getProperty(list, "x");
		if (currentX > s5Bounds.minX) {
			restartAutoSlide();
		}
	}
})[0];

// 리사이즈 시 경계 재설정 및 자동 슬라이드 보정
window.addEventListener('resize', function() {
	s5Bounds = getS5Bounds();
	if (s5Drag) s5Drag.applyBounds(s5Bounds);
	restartAutoSlide();
});

document.addEventListener('DOMContentLoaded', function() {
	s5Bounds = getS5Bounds();
	if (s5Drag) s5Drag.applyBounds(s5Bounds);
	
	const s5Element = document.querySelector('.s5');
	if (s5Element) {
		const rect = s5Element.getBoundingClientRect();
		if (rect.top < window.innerHeight * 0.8) {
			restartAutoSlide();
		}
	}
});

// s5 섹션에 진입할 때 자동 슬라이드 시작
ScrollTrigger.create({
	trigger: ".s5",
	start: "top 80%",
	onEnter: function() {
		restartAutoSlide();
	},
	onLeave: function() {
		// s5 섹션을 벗어나면 자동 슬라이드 중지
		if (autoSlideTween) {
			autoSlideTween.kill();
			autoSlideTween = null;
		}
	},
	onEnterBack: function() {
		// 다시 s5 섹션에 진입하면 자동 슬라이드 재시작
		restartAutoSlide();
	}
});