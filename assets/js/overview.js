gsap.registerPlugin(ScrollTrigger, TextPlugin);


lenis.stop(); // 최초 lenis 멈춤
// gsap.set("html, body", { overflow: "hidden" }); // 최초 스크롤 안보이게

const tl = gsap.timeline({
    onComplete: () => {
        lenis.start();
        // $("html, body").css("overflow", "auto");
    }
});

// s1 애니메이션
tl.
    to("#S1Tl", {
        duration: 1,
        text: "1960년, 대한민국에서<br>시작된 사무혁신",
        ease: "none"
    })
    .to(".s1 .s1-inner .s1-cont .s1-bg_img", {
        opacity: 1,
        duration: 1
    })
    // .to(".txt-top", {
    //     top: 0,
    //     y: 0,
    //     duration: 1,
    //     ease: "power2.out"
    // })
    // .to(".s1 .s1-txt .txt-top span", {
    //     opacity: 1,
    //     top: 0,
    //     duration: 1,
    //     ease: "power2.out"
    // }, "<");



let s1Split = new SplitType(".s1_sub", { types: "lines, words, chars" });
let s1Lines = s1Split.lines;
let s1Chars = s1Split.chars;


gsap.set(s1Lines, { opacity: 0 });

setTimeout(() => {
    gsap.to(s1Lines, {
        opacity: 1,
        duration: 2.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".s1",
            start: "2% top",
            end: "50% bottom",
            scrub: true, 
            onEnter: () => {
                gsap.to(".txt-top", {
                    top: 0,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".s1",
                        start: "2% top",
                        end: "50% bottom",
                        scrub: true,
                        onEnter: () => {
                            gsap.to(".s1 .s1-txt .txt-top span", {
                                opacity: 1,
                                top: 0,
                                duration: 1,
                                ease: "power2.out",
                                stagger: 0.1
                            });
                        }
                    }
                });
            },
        },
    });
}, 1000);

setTimeout(() => {
    gsap.to(s1Chars, {
        color: "#fff",
        stagger: 1,
        scrollTrigger: {
            trigger: ".s1",
            start: "50% bottom",
            end: "bottom bottom",
            scrub: true,
        }
    });
},1000)

function initClipPathAnim() {
    ScrollTrigger.getAll().forEach(st => st.kill());

    let startClipPath = window.innerWidth <= 768
        ? "inset(25% 35% 25% 35%)"
        : "inset(25% 43% 25% 43%)";

    gsap.fromTo(
        ".s1 .s1-inner .s1-cont .s1-bg_img",
        { clipPath: startClipPath },
        { 
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 2.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".s1",
                start: "2% top",
                end: "50% bottom",
                scrub: true,
            }
        }
    );
}

  // 초기 실행
initClipPathAnim();

// 윈도우 크기 바뀔 때 다시 실행
window.addEventListener("resize", initClipPathAnim);


// 공통 섹션 애니메이션 생성 함수
function createSectionAnimation(sectionClass) {
    // 첫 번째 타임라인 (이미지 레이어 이동)
    gsap.timeline({
        scrollTrigger: {
            trigger: `.${sectionClass}`,
            start: "top top",
            end: sectionClass === "s2" ? "40% bottom" : "30% bottom",
            scrub: true,
            ease: "power2.out",
        }
    })
    .fromTo(
        `.${sectionClass}-img--layer`,
        { top: sectionClass === "s2" ? "80%" : "100%" },
        { top: "50%" }
    );

    // s2 제목 이동
    if (sectionClass === "s2") {
        gsap.to(`.${sectionClass}-title`, {
            top: "-100%",
            scrollTrigger: {
                trigger: `.${sectionClass}`,
                start: "top top",
                end: "160% bottom",
                scrub: true,
                markers: true,
                ease: "power2.out",
            }
        });
    }

    // 텍스트 clipPath
    gsap.timeline({
        scrollTrigger: {
            trigger: `.${sectionClass}`,
            start: sectionClass === "s2" ? "40% bottom" : "30% bottom",
            end: "50% bottom",
            scrub: true,
            ease: "power2.out",
        }
    })
    .fromTo(
        [
            `.${sectionClass} .${sectionClass}-inner .${sectionClass}-cont .${sectionClass}-img--wrap .img-cont .img-inner p`,
            `.${sectionClass} .${sectionClass}-inner .${sectionClass}-cont .${sectionClass}_sub p`
        ],
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)" }
    );

    // 이미지 확장 + 텍스트 색상 변경
    gsap.set(
        `.${sectionClass} .${sectionClass}-inner .${sectionClass}-cont .${sectionClass}-img--wrap .img-cont`,
        { maxWidth: "715px", width: "100%" }
    );

    gsap.timeline({
        scrollTrigger: {
            trigger: `.${sectionClass}`,
            start: "50% bottom",
            end: "90% bottom",
            scrub: true,
            ease: "power2.out",
        }
    })
    .to(
        `.${sectionClass} .${sectionClass}-inner .${sectionClass}-cont .${sectionClass}-img--wrap .img-cont`,
        {
            width: "100%",
            height: "100%",
            maxWidth: "100%",
        }
    )
    .to(`.${sectionClass}_sub`, { color: "#fff" }, "<");
}

// 적용할 섹션 리스트
const sections = ["s2", "s4", "s6", "s8"];

// 초기 실행
sections.forEach(createSectionAnimation);

// 리사이즈 시 재적용
window.addEventListener("resize", () => {
    clearTimeout(window._resizeTimer);
    window._resizeTimer = setTimeout(() => {
        ScrollTrigger.getAll().forEach(st => st.kill());
        sections.forEach(createSectionAnimation);
        ScrollTrigger.refresh();
    }, 500);
});


$(function(){
    // 지사 호버 시 월드맵 마커 on 토글    
    const regions = ["US", "CN", "VN", "HK", "JP"];
    const $worldMap = $(".s11 .world_map");

    $(document).on("mouseenter", ".s11 .jisa-cont .jisa", function(){
        const $jisa = $(this);
        const region = regions.find(r => $jisa.hasClass(r));
        if(!region) return;
        $worldMap.find(".location_icn").removeClass("on");
        $worldMap.find(".location_icn."+region).addClass("on");
    });

    $(document).on("mouseleave", ".s11 .jisa-cont .jisa", function(){
        const $jisa = $(this);
        const region = regions.find(r => $jisa.hasClass(r));
        if(!region) return;
        $worldMap.find(".location_icn."+region).removeClass("on");
    });

    $(document).on("mouseenter", ".s11 .world_map .location_icn", function(){
        const $marker = $(this);
        const region = regions.find(r => $marker.hasClass(r));
        if(!region) return;
        $(".s11 .world_map .location_icn").removeClass("on");
        $marker.addClass("on");
        $(".s11 .sindo-area .sindo_jisa .jisa-cont .jisa").removeClass("on");
        $(".s11 .sindo-area .sindo_jisa .jisa-cont .jisa."+region).addClass("on");
    });

    $(document).on("mouseleave", ".s11 .world_map .location_icn", function(){
        const $marker = $(this);
        const region = regions.find(r => $marker.hasClass(r));
        if(!region) return;
        $marker.removeClass("on");
        $(".s11 .sindo-area .sindo_jisa .jisa-cont .jisa."+region).removeClass("on");
    });

    // 연혁 갯수에 따른 높이 조절
    // $(".year-wrap").each(function(){
    //     const $wrap = $(this);
    //     const itemCount = $wrap.find(".right .year-list--cont > li").length;
    //     let heightVh = "200vh"; // 기본값
    //     if(itemCount >= 1 && itemCount <= 3) heightVh = "100vh";
    //     else if(itemCount >= 4 && itemCount <= 6) heightVh = "150vh";
    //     else if(itemCount >= 7 && itemCount <= 9) heightVh = "180vh";
    //     else if(itemCount >= 10) heightVh = "200vh";
    //     $wrap.find(".left").css("height", heightVh);
    // });
});