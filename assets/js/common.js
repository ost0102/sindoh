window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener("DOMContentLoaded", () => {
    // Lenis 초기화
    const lenis = new Lenis({
        duration: 1.2,
        smooth: true,
    });

    // 애니메이션 프레임 설정
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 비디오가 있는 경우 처리
    const videos = document.querySelectorAll("video");

    if (videos.length > 0) {
        lenis.stop();  // 비디오 로드 전 스크롤 정지

        // 비디오 로드 체크
        let loaded = false;

        // 모든 비디오 로드 후 실행
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
            lenis.start(); // 비디오 로드 후 스크롤 재개
        });

        // 비디오가 로드되지 않으면 3초 후 "비디오 로드 안됨" 출력
        setTimeout(() => {
            if (!loaded) {
                console.log('비디오 로드 안됨');
            }
        }, 3000);
    }
});