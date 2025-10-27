// GSAP 플러그인 로드
gsap.registerPlugin(ScrollTrigger);

const imgHalf = 270; // 이미지 높이 절반 (540 / 2)
const imgTop = window.innerHeight / 2 - imgHalf;
const imgBottom = window.innerHeight / 2 + imgHalf;
const imgBottom2 = window.innerHeight / 2 + 270; // 50vh + 270px

gsap.to(".img-wrap.wrap1",{
    clipPath:"inset(0% 0% 100% 0%)",
    scrollTrigger:{
        trigger:".s3-box1",
        start: `bottom ${imgTop}`,
        end:`bottom top`,
        scrub:true,
        ease:"none",
    }
})