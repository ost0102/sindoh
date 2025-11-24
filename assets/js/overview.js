document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------------------------
        0. 전역 변수
    ----------------------------------------------------------- */
    const sections = ["s2", "s4", "s6", "s8"];


    /* -----------------------------------------------------------
        1. LENIS + TypeIt 초기 실행
    ----------------------------------------------------------- */
    function waitForLenis(callback) {
        if (window.lenis) {
            callback(window.lenis);
        } else {
            setTimeout(() => waitForLenis(callback), 50);
        }
    }

    waitForLenis((lenis) => {

        lenis.stop(); // 처음엔 스크롤 막기

        function typeText() {
            return new Promise((resolve) => {
                new TypeIt("#S1Tl", {
                    strings: "1960년, 대한민국에서<br>시작된 사무혁신",
                    speed: 100,
                    cursor: true,
                    cursorChar: "|",
                    lifeLike: true,
                    afterComplete: () => {
                        const cursor = document.querySelector("#S1Tl .ti-cursor");
                        setTimeout(() => {
                            if (cursor) cursor.style.display = "none";
                            lenis.start();
                            resolve();
                        }, 2000);
                    }
                },).go();
            });
        }

        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline();
        tl.add(() => typeText())
        .to(".s1 .s1-inner .s1-cont .s1-bg_img", {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        });
    });


    /* -----------------------------------------------------------
        2. SplitType 초기화
    ----------------------------------------------------------- */
    let s1Split = new SplitType(".s1_sub", { types: "lines, words, chars" });
    let s1Lines = s1Split.lines;
    let s1Chars = s1Split.chars;

    gsap.set(s1Lines, { opacity: 0 });


    /* -----------------------------------------------------------
        3. S1 ClipPath + 텍스트 애니메이션
    ----------------------------------------------------------- */
    function initClipPathAnim() {

        let startClipPath = window.innerWidth <= 768
            ? "inset(25% 35% 25% 35%)"
            : "inset(25% 43% 25% 43%)";

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".s1",
                start: "2% top",
                end: "50% bottom",
                scrub: true,
            }
        });

        timeline
            .fromTo(".s1 .s1-inner .s1-cont .s1-bg_img",
                { clipPath: startClipPath },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 2.5, ease: "power3.out" }
            )
            .to(".txt-top", {
                top: 0,
                y: 0,
                duration: 1,
                ease: "power2.out"
            }, "<")
            .to(".s1 .s1-txt .txt-top span", {
                opacity: 1,
                top: 0,
                duration: 1,
                ease: "power2.out",
                stagger: 0.1,
            }, "<")
            .to(".s1_sub", {
                top: 0,
                y: 0,
                duration: 1,
                ease: "power2.out",
            }, "<");
    }


    /* -----------------------------------------------------------
        4. S1 텍스트(line, char) 애니메이션
    ----------------------------------------------------------- */
    function initS1Animations() {

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".s1",
                start: "2% top",
                end: "50% bottom",
                scrub: true,
            }
        });

        timeline
            .to(s1Lines, {
                opacity: 1,
                duration: 2.5,
                stagger: 0.08,
                ease: "power3.out"
            })
            .to(".s1 .s1-txt .txt-top span", {
                opacity: 1,
                top: 0,
                duration: 1,
                ease: "power2.out",
                stagger: 0.1
            });

        gsap.to(s1Chars, {
            color: "#fff",
            stagger: 1,
            scrollTrigger: {
                trigger: ".s1",
                start: "50% bottom",
                end: "90% bottom",
                scrub: true,
            }
        });
    }


    /* -----------------------------------------------------------
        5. 공통 섹션 애니메이션 생성기 (s2, s4, s6, s8)
    ----------------------------------------------------------- */
    function createSectionAnimation(sectionClass) {

        gsap.timeline({
            scrollTrigger: {
                trigger: `.${sectionClass}`,
                start: "top top",
                end: "80% 70%",
                scrub: true,
                ease: "power2.out",
                invalidateOnRefresh: true,
            }
        })
        .fromTo(
            `.${sectionClass}-year-inner--cont`,
            { top: "100%" },
            { top: "50%" }
        )
        .to(".year-h2--title", { top: "-100%", ease: "none" })
        .fromTo(
            [
                `.${sectionClass} .${sectionClass}-inner .${sectionClass}-cont .${sectionClass}-img--wrap .img-cont .img-inner p`,
                `.${sectionClass} .${sectionClass}-inner .${sectionClass}-cont .${sectionClass}_sub p`
            ],
            { clipPath: "inset(0% 100% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)" }
        )
        .fromTo(
            `.${sectionClass} .img-cont img`,
            { "max-width": "715px", height: "30vh" },
            { "max-width": "100%", height: "100vh", ease: "none" },
            ">0.3"
        )
        .to(`.${sectionClass}_sub`, { color: "#fff" }, "<")
        .to(`.${sectionClass}_sub`, { bottom: "25%" }, "<");
    }


    /* -----------------------------------------------------------
        6. 섹션 전체 초기화 실행
    ----------------------------------------------------------- */
    function initSectionAnimations() {
        sections.forEach(createSectionAnimation);
    }


    /* -----------------------------------------------------------
        7. 전체 애니메이션 초기화
    ----------------------------------------------------------- */
    function initAllAnimations() {

        ScrollTrigger.getAll().forEach(st => st.kill());

        initClipPathAnim();
        initS1Animations();
        initSectionAnimations();

        ScrollTrigger.refresh();
    }


    /* -----------------------------------------------------------
        8. 초기 실행 + 리사이즈 핸들러
    ----------------------------------------------------------- */
    initAllAnimations();

    window.addEventListener("resize", () => {
        clearTimeout(window._resizeTimer);
        window._resizeTimer = setTimeout(() => {
            initAllAnimations();
        }, 500);
    });


    /* -----------------------------------------------------------
        9. 지사/월드맵 호버 이벤트
    ----------------------------------------------------------- */
    $(function () {

        const regions = ["US", "CN", "VN", "HK", "JP"];
        const $worldMap = $(".s11 .world_map");

        // 지사 hover
        $(document).on("mouseenter", ".s11 .jisa-cont .jisa", function () {
            const region = regions.find(r => $(this).hasClass(r));
            if (!region) return;
            $worldMap.find(".location_icn").removeClass("on");
            $worldMap.find(".location_icn." + region).addClass("on");
        });

        $(document).on("mouseleave", ".s11 .jisa-cont .jisa", function () {
            const region = regions.find(r => $(this).hasClass(r));
            if (!region) return;
            $worldMap.find(".location_icn." + region).removeClass("on");
        });

        // 월드맵 hover
        $(document).on("mouseenter", ".s11 .world_map .location_icn", function () {
            const region = regions.find(r => $(this).hasClass(r));
            if (!region) return;
            $(".s11 .world_map .location_icn").removeClass("on");
            $(this).addClass("on");
            $(".s11 .sindo-area .sindo_jisa .jisa-cont .jisa").removeClass("on");
            $(".s11 .sindo-area .sindo_jisa .jisa-cont .jisa." + region).addClass("on");
        });

        $(document).on("mouseleave", ".s11 .world_map .location_icn", function () {
            const region = regions.find(r => $(this).hasClass(r));
            if (!region) return;
            $(this).removeClass("on");
            $(".s11 .sindo-area .sindo_jisa .jisa-cont .jisa." + region).removeClass("on");
        });
    });

    // .year-list--cont의 높이에 따라 .left 높이를 설정하는 함수
    // function setLeftHeightByYearList(sectionSelector) {
    //     const yearListCont = document.querySelector(`${sectionSelector} .year-list--cont`);
    //     const leftElement = document.querySelector(`${sectionSelector} .left`);
        
    //     if (!yearListCont || !leftElement) {
    //         return;
    //     }
        
    //     // .year-list--cont의 실제 높이 계산 (scrollHeight 사용)
    //     const yearListHeight = yearListCont.scrollHeight;
    //     let leftHeightVh;
        
    //     // 높이에 따른 조건부 설정 (큰 값부터 작은 값 순으로 정렬)
    //     if (yearListHeight === 640) {
    //         leftHeightVh = 140;
    //     } else if (yearListHeight >= 1285) {
    //         leftHeightVh = 209;
    //     } else if (yearListHeight >= 1156) {
    //         leftHeightVh = 195;
    //     } else if (yearListHeight >= 1027) {
    //         leftHeightVh = 180;
    //     } else if (yearListHeight >= 900) {
    //         leftHeightVh = 165;
    //     } else if (yearListHeight >= 769) {
    //         leftHeightVh = 150;
    //     } else if (yearListHeight >= 500) {
    //         leftHeightVh = 125;
    //     } else {
    //         // 500px 미만일 때는 기본값 (필요시 수정)
    //         leftHeightVh = 100;
    //     }
        
    //     // .left의 높이 설정
    //     leftElement.style.height = leftHeightVh + 'vh';
        
    // }
    
    // // .s5, .s7, .s9 섹션에 적용
    // const yearSections = ['.s5', '.s7', '.s9'];
    
    // // 초기 실행
    // yearSections.forEach(section => {
    //     setLeftHeightByYearList(section);
    // });
    
    // // 리사이즈 시 재계산
    // let resizeTimer;
    // $(window).on('resize', function() {
    //     clearTimeout(resizeTimer);
    //     resizeTimer = setTimeout(function() {
    //         yearSections.forEach(section => {
    //             setLeftHeightByYearList(section);
    //         });
    //     }, 100);
    // });

    
}); // ← DOMContentLoaded 끝
