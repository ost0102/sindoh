document.addEventListener("DOMContentLoaded", () => {

    // GSAP 플러그인 로드
    gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

    // -------------------------------
    // section2
    // -------------------------------
    const offset = window.innerHeight * 0.7;

    gsap.fromTo(".s2-bg img",
        { y: 0 },
        {
            y: -200,
            scrollTrigger: {
                trigger: ".s2",
                start: `top-=${offset} top`,
                end: "top top",
                scrub: true,
            }
        }
    );

    let s2Split = new SplitType(".s2-cont h2", { types: "chars" });
    let s2Chars = s2Split.chars;

    gsap.to(s2Chars, {
        color: "#fff",
        ease: "none",
        stagger: 1,
        scrollTrigger: {
            trigger: ".s2",
            start: "10% top",
            end: "90% bottom",
            scrub: true,
        }
    });

    // -------------------------------
    // section3
    // -------------------------------
    let s3Tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".s3",
            start: "top top",
            end: "30% 10%",
            scrub: true,
        },
    });

    s3Tl
        .fromTo(".s3-cont", { top: "100%" }, { top: "50%" })
        .to(".s3 .s3-inner .s3-cont .pain-point", { gap: "42px", ease: "none" }, 0)
        .to(".s3 .s3-inner .s3-cont .s3-list", { gap: "42px", ease: "none" }, 0);

    // -------------------------------
    // section4
    // -------------------------------
    const s4Items = document.querySelectorAll(".s4-list .list-cont");

    function toggleS4Background(target, shouldActivate) {
        if (!target) return;
        const bg = target.querySelector(".list-bg");
        if (!bg) return;

        gsap.killTweensOf(bg);
        gsap.to(bg, {
            scaleX: shouldActivate ? 1 : 0,
            transformOrigin: shouldActivate ? "left center" : "right center",
            duration: 0.35,
            ease: "power2.out"
        });
    }

    if (s4Items.length) {
        ScrollTrigger.create({
            trigger: ".s4",
            start: "30% top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: function (self) {
                const p = self.progress;
                const len = s4Items.length;

                if (p === 0) {
                    s4Items.forEach(item => {
                        if (item.classList.contains("on")) {
                            item.classList.remove("on");
                            toggleS4Background(item, false);
                        }
                    });
                    return;
                }

                const section = 1 / len;

                s4Items.forEach((item, i) => {
                    const shouldActivate = p >= section * i && p < section * (i + 1);
                    if (shouldActivate && !item.classList.contains("on")) {
                        item.classList.add("on");
                        toggleS4Background(item, true);
                    } else if (!shouldActivate && item.classList.contains("on")) {
                        item.classList.remove("on");
                        toggleS4Background(item, false);
                    }
                });
            }
        });
    }

    gsap.fromTo(
        ".s4-clippath",
        { clipPath: "inset(100% 0 0 0)" },
        {
            clipPath: "inset(0% 0 0 0)",
            scrollTrigger: {
                trigger: ".s4-clippath",
                start: "80% 80%",
                end: "bottom top",
                scrub: true,
            },
        }
    );

    // -------------------------------
    // section7
    // -------------------------------
    const s7List = document.querySelector(".s7-list");

    if (s7List) {
        const totalWidth = s7List.scrollWidth;

        const slideTl = gsap.to(".s7-list", {
            xPercent: -totalWidth,
            duration: 5000,
            ease: "none",
            repeat: -1,
        });

        s7List.querySelectorAll(".list-img").forEach((imgWrap) => {
            const onImg = imgWrap.querySelector(".on");
            const offImg = imgWrap.querySelector(".off");

            imgWrap.addEventListener("mouseenter", () => {
                slideTl.pause();
                gsap.to(onImg, { opacity: 1, duration: 0.3, ease: "power2.out" });
                gsap.to(offImg, { opacity: 0, duration: 0.3, ease: "power2.out" });
            });

            imgWrap.addEventListener("mouseleave", () => {
                slideTl.play();
                gsap.to(onImg, { opacity: 0, duration: 0.3, ease: "power2.out" });
                gsap.to(offImg, { opacity: 1, duration: 0.3, ease: "power2.out" });
            });
        });
    }

    
}); // DOMContentLoaded end
