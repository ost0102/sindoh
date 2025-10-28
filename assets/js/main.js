// GSAP 플러그인 로드
gsap.registerPlugin(ScrollTrigger);

// const imgHalf = 270; // 이미지 높이 절반 (540 / 2)
// const imgTop = window.innerHeight / 2 - imgHalf;
// const imgBottom = window.innerHeight / 2 + imgHalf;
// const imgBottom2 = window.innerHeight / 2 + 270; // 50vh + 270px

// gsap.to(".img-wrap.wrap1",{
//     clipPath:"inset(0% 0% 100% 0%)",
//     scrollTrigger:{
//         trigger:".s3-box2",
//         start: `top ${imgBottom}`,
//         end:`top top`,
//         scrub:true,
//         ease:"none",
//     }
// })


const slideWrap = document.querySelector('.s5-cont--wrap');
const slides = slideWrap.querySelectorAll('.main_slide');
const extraGap = 200; // 마지막 오른쪽 여백 px

// 1️⃣ 전체 슬라이드 수평 스크롤
gsap.to(slideWrap, {
    x: -(slideWrap.scrollWidth - window.innerWidth + extraGap),
    ease: "none",
    scrollTrigger: {
        trigger: ".s5",
        start: "top top",
        end: () => "+=" + (slideWrap.scrollWidth - window.innerWidth + extraGap),
        scrub: true,
    }
});

// gsap.to(".title-inner.title1", {
//     x: 2500,
//     ease: "none",
//     scrollTrigger: {
//         trigger: ".s5",
//         start: "top top",
//         end: "40% bottom",
//         scrub: true,
//         markers: true,
//     }
// });
// const slides2 = document.querySelectorAll(".main_slide");

// slides2.forEach((slide, index) => {
//     const width = slide.offsetWidth; // 정수값
//     const widthPrecise = slide.getBoundingClientRect().width; // 소수점까지 정확

//     const title = slide.querySelector(".title-inner"); // 각 슬라이드 안 title-inner
//     const width2 = title.offsetWidth; // 정수값
//     const widthPrecise2 = title.getBoundingClientRect().width; // 소수점까지 정확

//     console.log(`slide ${index + 1} width:`, width, " / precise:", widthPrecise);
//     console.log(`slide ${index + 1} title-inner width:`, width2, "/ precise:", widthPrecise2);

//     const firstSlide = document.querySelectorAll(".main_slide")[0];
//     const secontSlide = document.querySelectorAll(".main_slide")[1];
//     const thirdSlide = document.querySelectorAll(".main_slide")[2];
//     console.log("첫 번째 main_slide width:", firstSlide.offsetWidth);
//     console.log("두 번째 main_slide width:", secontSlide.offsetWidth);
//     console.log("세 번째 main_slide width:", thirdSlide.offsetWidth);
// });
