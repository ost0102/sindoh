document.addEventListener("DOMContentLoaded", function () {

    gsap.registerPlugin(ScrollTrigger);

    // 768px 이상 ~ 1024px 이하 구간 (태블릿) 새로고침
    let isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;

    window.addEventListener("resize", () => {
        const currentIsTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;

        if (currentIsTablet !== isTablet) {
            location.reload();
        }

        isTablet = currentIsTablet;
    });

    if (window.innerWidth >= 1025) {
        const video = document.getElementById("video");
        video.addEventListener("loadedmetadata", () => {
            gsap.to(video, {
                currentTime: video.duration,
                ease: "none",
                scrollTrigger: {
                    trigger: ".s1-inner",
                    start: "0% 0%",
                    end: "100% 100%",
                    scrub: true,
                    anticipatePin: 1,
                }
            });
        });

        gsap.set(".point-box img", { y: "16%", opacity: 0 });
        gsap.set(".point-box .txt-wrap .txt1 p, .point-box .txt-wrap .txt2 p", { y: "100%", opacity: 0 });

        const video2 = document.getElementById("video2");

        const PointTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".s3-inner",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                anticipatePin: 1,
                onUpdate: self => {
                    if (video2.duration) {
                        const startAt = 0.8;
                        const endAt = 1.0;
                        if (self.progress >= startAt) {
                            const localProgress = (self.progress - startAt) / (endAt - startAt);
                            video2.currentTime = video2.duration * gsap.utils.clamp(0, 1, localProgress);
                        }
                    }
                }
            }
        });

        PointTl
            .to("#PointBox1 img", { y: "0%", opacity: 1, duration: 1 })
            .to("#PointBox1 .txt-wrap .txt1 p, #PointBox1 .txt-wrap .txt2 p", { y: "0%", opacity: 1, duration: 1 }, "<")
            .to("#PointBox1 img", { y: "-16%", opacity: 0, duration: 1 })
            .to("#PointBox1 .txt-wrap .txt1 p, #PointBox1 .txt-wrap .txt2 p", { y: "-50%", opacity: 0, duration: 1 }, "<")
            .to("#PointBox2 img", { y: "0%", opacity: 1, duration: 1 }, ">-0.3")
            .to("#PointBox2 .txt-wrap .txt1 p, #PointBox2 .txt-wrap .txt2 p", { y: "0%", opacity: 1, duration: 1 }, "<")
            .to("#PointBox2 img", { y: "-16%", opacity: 0, duration: 1 })
            .to("#PointBox2 .txt-wrap .txt1 p, #PointBox2 .txt-wrap .txt2 p", { y: "-50%", opacity: 0, duration: 1 }, "<")
            .to("#PointBox3 img", { y: "0%", opacity: 1, duration: 1 }, ">-0.3")
            .to("#PointBox3 .txt-wrap .txt1 p, #PointBox3 .txt-wrap .txt2 p", { y: "0%", opacity: 1, duration: 1 }, "<")
            .to("#PointBox3", { y: "-50%", opacity: 0, duration: 1 })
            .to(".s3 .video-wrap", { opacity: 1, duration: 1 }, ">");

        video2.addEventListener("loadedmetadata", () => {
            video2.currentTime = 0;
        });

    } else if(window.innerWidth >= 768 && window.innerWidth <= 1024) {
        const Movideo1 = document.getElementById("Movideo1");
        Movideo1.addEventListener("loadedmetadata", () => {
            gsap.to(Movideo1, {
                currentTime: Movideo1.duration,
                ease: "none",
                scrollTrigger: {
                    trigger: ".s1-inner",
                    start: "0% 0%",
                    end: "100% 100%",
                    scrub: true,
                    anticipatePin: 1,
                }
            });
        });

        const Movideo3 = document.getElementById("Movideo3");
        Movideo3.addEventListener("loadedmetadata", () => {
            gsap.to(Movideo3, {
                currentTime: Movideo3.duration,
                ease: "none",
                scrollTrigger: {
                    trigger: ".s4",
                    start: "0% 0%",
                    end: "100% 100%",
                    scrub: true,
                    anticipatePin: 1,
                }
            });
        });

        gsap.fromTo(
            ".point-wrap",
            { opacity: 0, y:"10%"}, 
            { 
                opacity: 1,
                y: 0,  
                scrollTrigger: {
                    trigger: ".s3-inner",
                    start: "top 90%",   
                    end: "30% bottom",       
                    scrub: true,
                }
            }
        );

        gsap.fromTo(
            ".point-wrap",
            {opacity:1, y:0},
            {
                opacity:0,
                y:"-10%",
                scrollTrigger:{
                    trigger: ".s3-inner",
                    start: "60% top",   
                    end: "bottom 30%",       
                    scrub: true,
                }
            }
        );

    } else if(window.innerWidth < 768) {
        const Movideo1 = document.getElementById("Movideo1");
        Movideo1.addEventListener("loadedmetadata", () => {
            gsap.to(Movideo1, {
                currentTime: Movideo1.duration,
                ease: "none",
                scrollTrigger: {
                    trigger: ".s1-inner",
                    start: "0% 0%",
                    end: "100% 100%",
                    scrub: true,
                    anticipatePin: 1,
                }
            });
        });

        gsap.fromTo(
            ".point-wrap",
            { opacity: 0, y:"10%"}, 
            { 
                opacity: 1,
                y: 0,  
                scrollTrigger: {
                    trigger: ".s3-inner",
                    start: "top 90%",   
                    end: "30% bottom",       
                    scrub: true,
                }
            }
        );

        const Movideo2 = document.getElementById("Movideo2");
        Movideo2.addEventListener("loadedmetadata", () => {
            gsap.to(Movideo2, {
                currentTime: Movideo2.duration,
                ease: "none",
                scrollTrigger: {
                    trigger: ".s5",
                    start: "0% 0%",
                    end: "100% 100%",
                    scrub: true,
                    anticipatePin: 1,
                }
            });
        });

        gsap.fromTo(
            ".point-wrap",
            {opacity:1, y:0},
            {
                opacity:0,
                y:"-10%",
                scrollTrigger:{
                    trigger: ".s3-inner",
                    start: "60% top",   
                    end: "bottom 30%",       
                    scrub: true,
                }
            }
        );
    }

});
