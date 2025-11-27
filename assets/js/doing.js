document.addEventListener("DOMContentLoaded", function() {

    // -------------------------------
    // GSAP 플러그인 로드
    // -------------------------------
    gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

    // -------------------------------
    // section1
    // -------------------------------
    gsap.to(".s1-bg", {
        clipPath: "inset(0 100% 0 0)",
        scrollTrigger: {
            trigger: ".s1",
            start: "5% top",
            end: "bottom bottom",
            scrub: 1,
            toggleActions: "play none none reverse",
            anticipatePin: 1
        }
    });

    // -------------------------------
    // section2
    // -------------------------------
    let s2Tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".s2",
            start: "top top",
            end: "30% 10%",
            scrub: true,
            toggleActions: "play none none reverse",
        },
    });

    s2Tl
        .fromTo(".s2-cont", { top: "100%" }, { top: "50%" })
        .to(".s2 .s2-inner .s2-cont .pain-point", { gap: "42px", ease: "none" }, 0)
        .to(".s2 .s2-inner .s2-cont .s2-list", { gap: "42px", ease: "none" }, 0);

    // -------------------------------
    // section3
    // -------------------------------
    gsap.fromTo(".s3-cont", { clipPath: "inset(100% 0 0 0)" }, {
        clipPath: "inset(0% 0 0 0)",
        scrollTrigger: {
            trigger: ".s3-cont",
            start: "bottom top",
            end: "200% top",
            scrub: true,
            toggleActions: "play none none reverse",
        }
    });

    let s3Split1 = new SplitType(".s3 .inner-txt p:nth-child(1)", { types: "chars" });
    let s3Split2 = new SplitType(".s3 .inner-txt p:nth-child(2)", { types: "chars" });

    let s3Tl = gsap.timeline({
        scrollTrigger:{
            trigger: ".s3",
            start: "40% top",
            end: "90% bottom",
            scrub: true,
            toggleActions: "play none none reverse",
        }
    });

    s3Tl
        .to(s3Split1.chars, { color: "#fff", stagger: 1 })
        .to(s3Split2.chars, { color: "#7038FF", stagger: 1 });

    // -------------------------------
    // section4 - 해상도별 독립 애니메이션
    // -------------------------------
    ScrollTrigger.matchMedia({

        "(min-width: 1081px)": function() {
            initSection4Desktop();
        },

        "(min-width: 769px) and (max-width: 1080px)": function() {
            initSection4Tablet();
        },

        "(min-width: 401px) and (max-width: 768px)": function() {
            initSection4SmallTablet();
        },

        "(max-width: 400px)": function() {
            initSection4Mobile();
        }

    });

    function initSection4Desktop() {
        const numod = new Odometer({ el: document.querySelector('.s4 .num p') });
        //숫자 롤링 변수

        gsap.fromTo(".mobile-img", { left: "-50%" }, {
            left: "15vw",
            scrollTrigger: { 
                trigger: ".s4", 
                start: "top top", 
                end: "20% bottom", 
                toggleActions: "play none none reverse",
                scrub: true 
            }
        });

        // 숫자 롤링 인터랙션 트리거
        const tl = gsap.timeline({
            scrollTrigger: { 
                trigger: ".s4", 
                start: "21% top", 
                end: "90% bottom", 
                toggleActions: "play none none reverse",
                scrub: true 
            }
        });

        tl
            .to(".mobile-img", { left: "50%" })
            .to(".intro", { opacity: 0 })
            .to(".mobile-img", { rotate: -90, scale: 0.9 })
            .to(".mobile3 img", { clipPath: "inset(0% 0% 0% 0%)" })
            .to(".mobile-txt", { opacity: 1 })
            .to(".pop-inner", { width: "100%", height: "100%" })
            .to(".mobile-img", { top: "4.4vw", delay: 3 })
            .to(".pop-inner", { top: "-100%" }, "<")
            .to(".mobile-txt", { opacity: 0 }, "<")
            .to(".mobile4", { opacity: 1 })
            .to(".mobile4 img", { left: "41.2vw" })
            .to(".mobile_behind", { opacity: 1, top: "35vw" })
            .to(".num", { opacity: 1 })
            .to(".recipt-txt", { opacity: 1 }, "<")
            .to({}, { duration: 1, ease: "none", onUpdate: function() {
                let fast = Math.min(this.progress() * 3, 1);
                numod.update(Math.round(fast * 33000));
            }});
    }

    function initSection4Tablet() {
        const numod = new Odometer({ el: document.querySelector('.s4 .num p') });

        gsap.set(".mobile-txt", { top: "250px" });
        gsap.set(".mobile_behind", { top: "240px" });

        gsap.fromTo(".mobile-img", { top: "150%" }, { top: "50vw",
            scrollTrigger: { 
                trigger: ".s4", 
                start: "top top", 
                end: "20% bottom", 
                toggleActions: "play none none reverse",
                scrub: true 
            }
        });

        // 숫자 롤링 인터랙션 트리거
        const tl = gsap.timeline({ scrollTrigger: { 
            trigger: ".s4", 
            start: "21% top", 
            end: "85% bottom", 
            toggleActions: "play none none reverse",
            scrub: true 
            } 
        });

        tl
            .to(".intro", { opacity: 0 })
            .to(".intro-txt", { top: "-100px", opacity: 0 }, "<")
            .to(".mobile-txt", { opacity: 1, top: "140px" }, "<")
            .to(".mobile3 img", { clipPath: "inset(0% 0% 0% 0%)" }, "<")
            .to(".pop-area_mo .pop-inner", { top: "70%" })
            .to(".pop-area_mo .pop-inner", { top: "-30%", opacity: 0 })
            .to(".mobile5 img", { clipPath: "inset(0% 0% 0% 0%)" })
            .to(".mobile-txt", { opacity: 0, top: "70px" }, "<")
            .to(".mobile_behind", { opacity: 1, top: "130px" })
            .to(".num", { opacity: 1 })
            .to(".recipt-txt", { opacity: 1 }, "<")
            .to({}, { duration: 0.1, onUpdate: function() {
                numod.update(Math.round(this.progress() * 33000));
            }});
    }

    function initSection4SmallTablet() {
        const numod = new Odometer({ el: document.querySelector('.s4 .num p') });

        gsap.set(".mobile-txt", { top: "250px" });
        gsap.set(".mobile_behind", { top: "240px" });

        gsap.fromTo(".mobile-img", { top: "150%" }, { top: "440px",
            scrollTrigger: { 
                trigger: ".s4", 
                start: "top top", 
                end: "20% bottom",
                toggleActions: "play none none reverse", 
                scrub: true 
            }
        });

        // 숫자 롤링 인터랙션 트리거
        const tl = gsap.timeline({ scrollTrigger: { 
            trigger: ".s4", 
            start: "21% top", 
            end: "85% bottom", 
            toggleActions: "play none none reverse",
            scrub: true 
            } 
        });

        tl
            .to(".intro", { opacity: 0 })
            .to(".intro-txt", { top: "-100px", opacity: 0 }, "<")
            .to(".mobile-txt", { opacity: 1, top: "140px" }, "<")
            .to(".mobile3 img", { clipPath: "inset(0% 0% 0% 0%)" }, "<")
            .to(".pop-area_mo .pop-inner", { top: "50%" })
            .to(".pop-area_mo .pop-inner", { top: "-30%", opacity: 0 })
            .to(".mobile5 img", { clipPath: "inset(0% 0% 0% 0%)" })
            .to(".mobile-txt", { opacity: 0, top: "70px" }, "<")
            .to(".mobile_behind", { opacity: 1, top: "130px" })
            .to(".num", { opacity: 1 })
            .to(".recipt-txt", { opacity: 1 }, "<")
            .to({}, { duration: 1, onUpdate: function() {
                numod.update(Math.round(this.progress() * 33000));
            }});
    }

    function initSection4Mobile() {
        const numod = new Odometer({ el: document.querySelector('.s4 .num p') });

        gsap.set(".mobile-txt", { top: "250px" });
        gsap.set(".mobile_behind", { top: "240px" });

        gsap.fromTo(".mobile-img", { top: "150%" }, { top: "430px",
            scrollTrigger: { 
                trigger: ".s4", 
                start: "top top", 
                end: "20% bottom", 
                toggleActions: "play none none reverse",
                scrub: true 
            }
        });

        const tl = gsap.timeline({ scrollTrigger: { 
            trigger: ".s4", 
            start: "21% top", 
            end: "85% bottom", 
            toggleActions: "play none none reverse",
            scrub: true 
            } 
        });

        tl
            .to(".intro", { opacity: 0 })
            .to(".intro-txt", { top: "-100px", opacity: 0 }, "<")
            .to(".mobile-txt", { opacity: 1, top: "140px" }, "<")
            .to(".mobile3 img", { clipPath: "inset(0% 0% 0% 0%)" }, "<")
            .to(".pop-area_mo .pop-inner", { top: "50%" })
            .to(".pop-area_mo .pop-inner", { top: "-30%", opacity: 0 })
            .to(".mobile5 img", { clipPath: "inset(0% 0% 0% 0%)" })
            .to(".mobile-txt", { opacity: 0, top: "70px" }, "<")
            .to(".mobile_behind", { opacity: 1, top: "130px" })
            .to(".num", { opacity: 1 })
            .to(".recipt-txt", { opacity: 1 }, "<")
            .to({}, { duration: 1, onUpdate: function() {
                numod.update(Math.round(this.progress() * 33000));
            }});
    }

    // -------------------------------
    // section5 - 자동 슬라이드 + 드래그
    // -------------------------------
    const list = document.querySelector(".s5-list");
    const listContainer = document.querySelector(".s5-cont");

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
    const autoSpeedPxPerSec = 80;

    function restartAutoSlide() {
        if (!list || !s5Bounds.needsSlide) return;

        if (autoSlideTween) autoSlideTween.kill();

        const currentX = gsap.getProperty(list, "x");
        const distance = Math.max(0.01, currentX - s5Bounds.minX);
        const duration = distance / autoSpeedPxPerSec;

        if (distance <= 0.01) return;

        autoSlideTween = gsap.to(list, {
            x: s5Bounds.minX,
            duration: duration,
            ease: "none",
            onComplete: () => autoSlideTween = null
        });
    }

    let s5Drag = Draggable.create(list, {
        type: "x",
        inertia: true,
        bounds: s5Bounds,
        edgeResistance: 0.8,
        dragResistance: 0.2,
        cursor: "grab",
        activeCursor: "grabbing",
        onDragStart: () => autoSlideTween?.kill(),
        onDragEnd: function() {
            s5Bounds = getS5Bounds();
            this.applyBounds(s5Bounds);
            if (gsap.getProperty(list, "x") > s5Bounds.minX) restartAutoSlide();
        },
        onThrowUpdate: () => autoSlideTween?.kill(),
        onThrowComplete: function() {
            s5Bounds = getS5Bounds();
            this.applyBounds(s5Bounds);
            if (gsap.getProperty(list, "x") > s5Bounds.minX) restartAutoSlide();
        }
    })[0];

    window.addEventListener("resize", function() {
        s5Bounds = getS5Bounds();
        if (s5Drag) s5Drag.applyBounds(s5Bounds);
        restartAutoSlide();
    });

    if(window.innerWidth > 768){
        ScrollTrigger.create({
            trigger: ".s5",
            start: "40% 80%",
            end: "bottom top",
            onEnter: restartAutoSlide,
            onLeave: () => autoSlideTween?.kill(),
            onEnterBack: restartAutoSlide
        });
    }else{
        ScrollTrigger.create({
            trigger: ".s5",
            start: "40% 80%",
            end: "bottom top",
            onEnter: restartAutoSlide,
            onLeave: () => autoSlideTween?.kill(),
            onEnterBack: restartAutoSlide
        });
    }
});
