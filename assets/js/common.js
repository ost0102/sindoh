window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener("DOMContentLoaded", () => {
    const lenis = new Lenis({
        duration: 1.2,
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const videos = document.querySelectorAll("video");
    if (videos.length > 0) {
        lenis.stop();
    
        // loadeddata가 일정 시간 안에 안 오면 "비디오 로드 안됨" 로그 출력
        let loaded = false;
    
        Promise.all(
            Array.from(videos).map(
                v =>
                    new Promise(resolve => {
                        v.addEventListener('loadeddata', () => {
                            loaded = true;
                            resolve();
                    }, { once: true });
                })
            )
        ).then(() => {
            console.log('모든 비디오 로드 완료');
            lenis.start();
        });
    
        // ✅ 비디오가 로드 안 된 경우 체크 (예: 3초 후)
        setTimeout(() => {
            if (!loaded) {
                console.log('비디오 로드 안됨');
            }
        }, 3000);
    }
});