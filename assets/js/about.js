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

    function getS4Bounds() {
        if (!list || !listContainer) return { minX: 0, maxX: 0 };
        const containerWidth = listContainer.clientWidth;
        const contentWidth = list.scrollWidth;
        const minX = Math.min(containerWidth - contentWidth, 0);
        return { minX, maxX: 0 };
    }

    let s4Bounds = getS4Bounds();
    let autoSlideTween = null;
    const autoSpeedPxPerSec = 80;

    function restartAutoSlide() {
        if (!list) return;
        if (autoSlideTween) autoSlideTween.kill();

        const currentX = gsap.getProperty(list, "x");
        const distance = Math.max(0.01, (currentX - s4Bounds.minX));
        const duration = distance / autoSpeedPxPerSec;

        autoSlideTween = gsap.to(list, {
            x: s4Bounds.minX,
            duration: duration,
            ease: "none",
            onComplete: () => autoSlideTween = null,
        });
    }

    let s4Drag = Draggable.create(list, {
        type: "x",
        inertia: true,
        bounds: s4Bounds,
        edgeResistance: 0.8,
        dragResistance: 0.2,
        cursor: "grab",
        activeCursor: "grabbing",

        onDragStart() {
            if (autoSlideTween) autoSlideTween.kill();
        },
        onDragEnd() {
            s4Bounds = getS4Bounds();
            this.applyBounds(s4Bounds);

            const currentX = gsap.getProperty(list, "x");
            if (currentX > s4Bounds.minX) restartAutoSlide();
        },
        onThrowUpdate() {
            if (autoSlideTween) autoSlideTween.kill();
        },
        onThrowComplete() {
            s4Bounds = getS4Bounds();
            this.applyBounds(s4Bounds);

            const currentX = gsap.getProperty(list, "x");
            if (currentX > s4Bounds.minX) restartAutoSlide();
        }
    })[0];

    window.addEventListener("resize", () => {
        s4Bounds = getS4Bounds();
        if (s4Drag) s4Drag.applyBounds(s4Bounds);
        restartAutoSlide();
    });

    ScrollTrigger.create({
        trigger: ".s4",
        start: "40% 80%",
        onEnter: restartAutoSlide,
        onLeave: () => {
            if (autoSlideTween) {
                autoSlideTween.kill();
                autoSlideTween = null;
            }
        },
        onEnterBack: restartAutoSlide
    });

});
