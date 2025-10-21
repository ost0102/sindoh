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


// section4