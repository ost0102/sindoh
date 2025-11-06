// GSAP 플러그인 로드
gsap.registerPlugin(ScrollTrigger);

const imgHalf = 270; // 이미지 높이 절반 (540 / 2)
const imgTop = window.innerHeight / 2 - imgHalf;
const imgBottom = window.innerHeight / 2 + imgHalf;

const wrapClass = ['.txt-wrap2', '.txt-wrap3', '.txt-wrap4', '.txt-wrap5'];
const imgWrapClass = ['.img-wrap1', '.img-wrap2', '.img-wrap3', '.img-wrap4'];

wrapClass.forEach((wrap, index) => {
    ScrollTrigger.create({
        trigger: wrap,
        start: `top ${imgBottom}px`,
        end: `top ${imgTop}px`,
        scrub: true,
        onUpdate: (self) => {
            const p = self.progress;
            const insetTop = p * 100;
            gsap.set(imgWrapClass[index], { clipPath: `inset(0% 0% ${insetTop}% 0%)` });
        }
    });
});