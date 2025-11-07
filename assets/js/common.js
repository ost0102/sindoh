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
        Promise.all(
            Array.from(videos).map(
                v => new Promise(resolve => v.addEventListener('loadeddata', resolve, { once: true }))
            )
        ).then(() => {
            console.log('모든 비디오 로드 완료');
            lenis.start();
        });
    }
});