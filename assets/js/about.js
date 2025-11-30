document.addEventListener("DOMContentLoaded", function () {

    // GSAP 플러그인 로드
    gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

    // ----------------------------------------
    // section1
    // ----------------------------------------
    gsap.to(".s1-bg", {
        clipPath: "inset(0 0 0 100%)", 
        scrollTrigger: {
            trigger: ".s1",
            start: "5% top",
            end: "bottom bottom",
            scrub: true,
            toggleActions: "play none none reverse",
        }
    });


    // ----------------------------------------
    // section2
    // ----------------------------------------
    let s2Tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".s2",
            start: "top top",
            end: "40% 30%",
            scrub: true,
            toggleActions: "play none none reverse",
        },
    });

    s2Tl
        .fromTo(".s2-cont", { top: "100%" }, { top: "50%" })
        .to(".s2 .s2-inner .s2-cont .pain-point", { gap: "42px", ease: "none" }, 0)
        .to(".s2 .s2-inner .s2-cont .s2-list", { gap: "42px", ease: "none" }, 0);


    // ----------------------------------------
    // section3 clipPath
    // ----------------------------------------
    gsap.fromTo(
        ".s3-cont",
        { clipPath: "inset(100% 0 0 0)" }, 
        { 
            clipPath: "inset(0% 0 0 0)",  
            scrollTrigger: {
                trigger: ".s3-cont",
                start: "80% 70%",   
                end: "bottom top",     
                scrub: true,
                toggleActions: "play none none reverse",
            },
        }
    );


    // ----------------------------------------
    // section3 rolling text
    // ----------------------------------------
    ScrollTrigger.create({
        trigger: ".s3-inner",
        start: "100% top",
        end: "750% top",
        scrub: true,
        toggleActions: "play none none reverse",
        onUpdate: function (self) {
            var $el = $('.rolling-txt');
            if (!$el.length) return;

            var p = self.progress;
            var stepIndex =
                (p >= 0.8) ? 5 :
                (p >= 0.6) ? 4 :
                (p >= 0.4) ? 3 :
                (p >= 0.2) ? 2 : 1;

            for (var i = 1; i <= 5; i++) {
                $el.removeClass('step0' + i);
            }
            $el.addClass('step0' + stepIndex);
        }
    });


    // ----------------------------------------
    // section4 - s4-list 자동 슬라이드 + 드래그
    // ----------------------------------------
    const list = document.querySelector(".s4-list");
    const listContainer = document.querySelector(".s4-cont");

    function getS5Bounds() {
        if (!list || !listContainer) return { minX: 0, maxX: 0, needsSlide: false };
        const containerWidth = listContainer.clientWidth;
        const contentWidth = list.scrollWidth;
        return {
            minX: Math.min(containerWidth - contentWidth, 0),
            maxX: 0,
            needsSlide: contentWidth > containerWidth
        };
    }

    let s5Bounds = getS5Bounds();
    let autoSlideTween = null;
    let autoSlideInProgress = false;
    const autoSpeedPxPerSec = 80;

    // ------------------------------------
    // 자동 슬라이드 함수 (1024px 이상에서만 작동)
    // ------------------------------------
    function restartAutoSlide() {
        if (window.innerWidth <= 1024) return; // 모바일/태블릿에서는 자동 슬라이드 금지
        if (!list || !s5Bounds.needsSlide || autoSlideInProgress) return;

        if (autoSlideTween) autoSlideTween.kill();

        const currentX = gsap.getProperty(list, "x");
        const distance = Math.max(0.01, currentX - s5Bounds.minX);
        const duration = distance / autoSpeedPxPerSec;

        if (distance <= 0.01) return;

        autoSlideInProgress = true;

        autoSlideTween = gsap.to(list, {
            x: s5Bounds.minX,
            duration: duration,
            ease: "none",
            onComplete: () => {
                autoSlideTween = null;
                autoSlideInProgress = false;
            }
        });
    }

    // ------------------------------------
    // Draggable 생성 (모바일에서도 드래그는 허용)
    // ------------------------------------
    let s5Drag = Draggable.create(list, {
        type: "x",
        inertia: true,
        bounds: s5Bounds,
        edgeResistance: 0.8,
        dragResistance: 0.2,
        cursor: "grab",
        activeCursor: "grabbing",

        // 드래그 시 자동 슬라이드 중지
        onDragStart: () => autoSlideTween?.kill(),

        onDragEnd: function () {
            s5Bounds = getS5Bounds();
            this.applyBounds(s5Bounds);

            if (window.innerWidth > 1024 && gsap.getProperty(list, "x") > s5Bounds.minX) {
                restartAutoSlide();
            }
        },

        onThrowUpdate: () => autoSlideTween?.kill(),

        onThrowComplete: function () {
            s5Bounds = getS5Bounds();
            this.applyBounds(s5Bounds);

            if (window.innerWidth > 1024 && gsap.getProperty(list, "x") > s5Bounds.minX) {
                restartAutoSlide();
            }
        }
    })[0];

    // ------------------------------------
    // 리사이즈 시 처리
    // ------------------------------------
    window.addEventListener("resize", function () {
        s5Bounds = getS5Bounds();
        if (s5Drag) s5Drag.applyBounds(s5Bounds);

        if (window.innerWidth > 1024) {
            restartAutoSlide();
        } else {
            // 모바일에서는 자동 슬라이드 제거
            autoSlideTween?.kill();
            autoSlideInProgress = false;
        }
    });

    // ------------------------------------
    // ScrollTrigger (1024px 이상에서만 자동 슬라이드 실행)
    // ------------------------------------
    if (window.innerWidth > 1024) {
        ScrollTrigger.create({
            trigger: ".s4",
            start: "40% 80%",
            end: "bottom top",

            onEnter: () => {
                if (!autoSlideInProgress) restartAutoSlide();
            },

            onLeave: () => {
                autoSlideTween?.kill();
                autoSlideInProgress = false;
            },

            onEnterBack: () => {
                if (!autoSlideInProgress) restartAutoSlide();
            }
        });
    }
});