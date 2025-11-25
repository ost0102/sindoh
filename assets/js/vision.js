document.addEventListener("DOMContentLoaded", function () {

    // Lenis 초기 정지
    function waitForLenis(callback) {
        if (window.lenis) {
            callback(window.lenis);
        } else {
            setTimeout(() => waitForLenis(callback), 50);
        }
    }

    waitForLenis((lenis) => {
        lenis.stop(); // 처음엔 스크롤 막기
    });

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

    // 모든 비디오 로드 추적
    const loadedVideos = new Set();
    const allVideos = [];

    function checkAllVideosLoaded() {
        const requiredVideos = [];
        
        if (window.innerWidth >= 1025) {
            requiredVideos.push('video', 'video2');
        } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
            requiredVideos.push('Movideo1', 'Movideo3');
        } else {
            requiredVideos.push('Movideo1', 'Movideo2');
        }

        console.log('필요한 비디오:', requiredVideos);
        console.log('로드된 비디오:', Array.from(loadedVideos));

        const allLoaded = requiredVideos.every(id => loadedVideos.has(id));
        
        if (allLoaded) {
            console.log('모든 비디오가 로드되었습니다!');
            waitForLenis((lenis) => {
                lenis.start();
                console.log('Lenis 스크롤이 시작되었습니다.');
            });
        } else {
            const missing = requiredVideos.filter(id => !loadedVideos.has(id));
            console.log('아직 로드되지 않은 비디오:', missing);
        }
    }

    function handleVideoLoad(videoId, videoElement) {
        if (!loadedVideos.has(videoId)) {
            loadedVideos.add(videoId);
            console.log(`비디오 로드 완료: ${videoId}`);
            checkAllVideosLoaded();
        }
    }

    // 비디오가 이미 로드되어 있는지 확인하는 함수
    function checkVideoAlreadyLoaded(videoId, videoElement) {
        if (videoElement && (videoElement.readyState >= 2 || videoElement.readyState >= 3)) {
            handleVideoLoad(videoId, videoElement);
        }
    }

    if (window.innerWidth >= 1025) {
        const video = document.getElementById("video");
        if (video) {
            allVideos.push({ id: 'video', element: video });
            // 여러 이벤트 리스너 추가
            video.addEventListener("loadeddata", () => {
                handleVideoLoad('video', video);
            });
            video.addEventListener("canplay", () => {
                handleVideoLoad('video', video);
            });
            video.addEventListener("canplaythrough", () => {
                handleVideoLoad('video', video);
            });
            // 이미 로드되어 있는지 확인
            checkVideoAlreadyLoaded('video', video);
            
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
        }

        gsap.set(".point-box img", { y: "16%", opacity: 0 });
        gsap.set(".point-box .txt-wrap .txt1 p, .point-box .txt-wrap .txt2 p", { y: "100%", opacity: 0 });

        const video2 = document.getElementById("video2");
        if (video2) {
            allVideos.push({ id: 'video2', element: video2 });
            // 여러 이벤트 리스너 추가
            video2.addEventListener("loadeddata", () => {
                handleVideoLoad('video2', video2);
            });
            video2.addEventListener("canplay", () => {
                handleVideoLoad('video2', video2);
            });
            video2.addEventListener("canplaythrough", () => {
                handleVideoLoad('video2', video2);
            });
            // 이미 로드되어 있는지 확인
            checkVideoAlreadyLoaded('video2', video2);
        } else {
            console.warn('video2 요소를 찾을 수 없습니다.');
        }

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
        if (Movideo1) {
            allVideos.push({ id: 'Movideo1', element: Movideo1 });
            Movideo1.addEventListener("loadeddata", () => {
                handleVideoLoad('Movideo1', Movideo1);
            });
            Movideo1.addEventListener("canplay", () => {
                handleVideoLoad('Movideo1', Movideo1);
            });
            Movideo1.addEventListener("canplaythrough", () => {
                handleVideoLoad('Movideo1', Movideo1);
            });
            checkVideoAlreadyLoaded('Movideo1', Movideo1);
            
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
        } else {
            console.warn('Movideo1 요소를 찾을 수 없습니다.');
        }

        const Movideo3 = document.getElementById("Movideo3");
        if (Movideo3) {
            allVideos.push({ id: 'Movideo3', element: Movideo3 });
            Movideo3.addEventListener("loadeddata", () => {
                handleVideoLoad('Movideo3', Movideo3);
            });
            Movideo3.addEventListener("canplay", () => {
                handleVideoLoad('Movideo3', Movideo3);
            });
            Movideo3.addEventListener("canplaythrough", () => {
                handleVideoLoad('Movideo3', Movideo3);
            });
            checkVideoAlreadyLoaded('Movideo3', Movideo3);
            
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
        } else {
            console.warn('Movideo3 요소를 찾을 수 없습니다.');
        }

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
        if (Movideo1) {
            allVideos.push({ id: 'Movideo1', element: Movideo1 });
            Movideo1.addEventListener("loadeddata", () => {
                handleVideoLoad('Movideo1', Movideo1);
            });
            Movideo1.addEventListener("canplay", () => {
                handleVideoLoad('Movideo1', Movideo1);
            });
            Movideo1.addEventListener("canplaythrough", () => {
                handleVideoLoad('Movideo1', Movideo1);
            });
            checkVideoAlreadyLoaded('Movideo1', Movideo1);
            
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
        } else {
            console.warn('Movideo1 요소를 찾을 수 없습니다.');
        }

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
        if (Movideo2) {
            allVideos.push({ id: 'Movideo2', element: Movideo2 });
            Movideo2.addEventListener("loadeddata", () => {
                handleVideoLoad('Movideo2', Movideo2);
            });
            Movideo2.addEventListener("canplay", () => {
                handleVideoLoad('Movideo2', Movideo2);
            });
            Movideo2.addEventListener("canplaythrough", () => {
                handleVideoLoad('Movideo2', Movideo2);
            });
            checkVideoAlreadyLoaded('Movideo2', Movideo2);
            
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
        } else {
            console.warn('Movideo2 요소를 찾을 수 없습니다.');
        }

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
