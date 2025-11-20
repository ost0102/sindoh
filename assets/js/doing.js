document.addEventListener("DOMContentLoaded", function () {

    // GSAP 플러그인 로드
    gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

    /* -------------------------------
        section1
    -------------------------------- */
    gsap.to(".s1-bg", {
        clipPath: "inset(0 100% 0 0)",
        scrollTrigger: {
            trigger: ".s1",
            start: "5% top",
            end: "bottom bottom",
            scrub: 1,
            anticipatePin: 1
        }
    });


    /* -------------------------------
        section2
    -------------------------------- */
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
        .to(".s2 .s2-inner .s2-cont .pain-point", { gap: "42px", ease: "none" }, 0)
        .to(".s2 .s2-inner .s2-cont .s2-list", { gap: "42px", ease: "none" }, 0);


    /* -------------------------------
        section3
    -------------------------------- */
    gsap.fromTo(
        ".s3-cont",
        { clipPath: "inset(100% 0 0 0)" },
        {
            clipPath: "inset(0% 0 0 0)",
            scrollTrigger: {
                trigger: ".s3-cont",
                start: "bottom top",
                end: "200% top",
                scrub: true,
            }
        }
    );

    let s3Split1 = new SplitType(".s3 .inner-txt p:nth-child(1)", { types: "chars" });
    let s3Split2 = new SplitType(".s3 .inner-txt p:nth-child(2)", { types: "chars" });

    let s3Tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".s3",
            start: "40% top",
            end: "90% bottom",
            scrub: true,
        }
    });

    s3Tl
        .to(s3Split1.chars, { color: "#fff", stagger: 1 })
        .to(s3Split2.chars, { color: "#7038FF", stagger: 1 });


    /* -------------------------------
        section4
    -------------------------------- */
    ScrollTrigger.matchMedia({

        "(min-width: 1081px)": function () {

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
                .to(".intro", { opacity: 0 })
                .to(".mobile-img", { rotate: -90, scale: 0.9, duration: 1 })
                .to(".mobile3 img", { clipPath: "inset(0% 0% 0% 0%)", duration: 1 })
                .to(".mobile-txt", { opacity: 1, duration: .3 })
                .to(".pop-inner", { width: "100%", height: "100%", duration: 1 })
                .to(".mobile-img", { top: "4.4vw", duration: 1, delay: 3 })
                .to(".pop-inner", { top: "-100%", duration: 3 }, '<')
                .to(".mobile-txt", { opacity: 0, duration: 1 }, '<')
                .to(".mobile4", { opacity: 1, duration: 1 })
                .to(".mobile4 img", { left: "41.2vw", duration: 1 })
                .to(".mobile_behind", { opacity: 1, top: "35vw", duration: 1 })
                .to(".num", { opacity: 1 })
                .to(".recipt-txt", { opacity: 1 }, '<')
                .to({}, {
                    duration: 1,
                    ease: "none",
                    onUpdate: function () {
                        let fast = Math.min(this.progress() * 3, 1);
                        numod.update(Math.round(fast * 33000));
                    }
                }, '-=0.5');
        },

        /* ★ 나머지 1080px 이하 버전들도 완전히 동일하게 DOMContentLoaded 안으로 들어가 있음 ★ */
        "(min-width:769px) and (max-width: 1080px)": function () { /* ... */ },
        "(min-width: 401px) and (max-width: 768px)": function () { /* ... */ },
        "(max-width: 400px)": function () { /* ... */ },
    });



    /* -------------------------------
        section5 - 드래그 & 자동 슬라이드
    -------------------------------- */
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
        s5Bounds = getS5Bounds();
        if (!s5Bounds.needsSlide) return;

        const currentX = gsap.getProperty(list, "x");
        const distance = Math.max(0.01, currentX - s5Bounds.minX);
        const duration = distance / autoSpeedPxPerSec;

        if (distance <= 0.01) return;

        if (autoSlideTween) autoSlideTween.kill();

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
        onDragStart: () => autoSlideTween?.kill(),
        onDragEnd: function () {
            this.applyBounds(getS5Bounds());
            if (gsap.getProperty(list, "x") > s5Bounds.minX) restartAutoSlide();
        },
        onThrowUpdate: () => autoSlideTween?.kill(),
        onThrowComplete: function () {
            this.applyBounds(getS5Bounds());
            if (gsap.getProperty(list, "x") > s5Bounds.minX) restartAutoSlide();
        }
    })[0];

    window.addEventListener("resize", () => {
        s5Bounds = getS5Bounds();
        s5Drag.applyBounds(s5Bounds);
        restartAutoSlide();
    });

    // s5가 화면에 들어오면 슬라이드 시작
    ScrollTrigger.create({
        trigger: ".s5",
        start: "top 450px",
        onEnter: restartAutoSlide,
        onLeave: () => autoSlideTween?.kill(),
        onEnterBack: restartAutoSlide
    });

});
