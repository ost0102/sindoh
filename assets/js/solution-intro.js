// GSAP 플러그인 로드
gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);


// section2
const offset = window.innerHeight * 0.7; // .s1의 높이(70vh) → px로 변환

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

// section3
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
    .to(".s3 .s3-inner .s3-cont .s3-list", { gap: "42px", ease: "none" }, 0)
    .to(".s3 .s3-inner .s3-cont .square", { top: "100%", ease: "none" });

// section4
ScrollTrigger.create({
    trigger: ".s4",
    start: "30% top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: function (self) {
    var p = self.progress;
    var items = document.querySelectorAll(".s4-list .list-cont");
    var len = items.length;

    if (p === 0) {
        items.forEach(item => item.classList.remove("on"));
        return;
    }

    var section = 1 / len;

    items.forEach((item, i) => {
        if (p >= section * i && p < section * (i + 1)) {
            item.classList.add("on");
        } else {
            item.classList.remove("on");
        }
    });
}

});
gsap.fromTo(
    ".s4-clippath",
    { clipPath: "inset(100% 0 0 0)" }, 
    { 
        clipPath: "inset(0% 0 0 0)",  
        scrollTrigger: {
            trigger: ".s4-clippath",
            start: "80% bottom",   
            end: "bottom top",     
            scrub: true,
        
		},
    }
);

// section5
// const s5ListItems = document.querySelectorAll('.s5 .s5-list li');
// const s5Images = document.querySelectorAll('.s5 .s5-list .list-img img');

// s5ListItems.forEach(item => {
//     item.addEventListener('mouseenter', () => {
//         s5Images.forEach(img => {
//             img.style.width = '100%';
//             img.style.height = '100%';
//         });
//     });

//     item.addEventListener('mouseleave', () => {
//         s5Images.forEach(img => {
//             img.style.width = '';
//             img.style.height = '';
//         });
//     });
// });

// section7
const s7List = document.querySelector(".s7-list");

if (s7List) {
	const imageCount = 24;
	const loopCount = 10; // 콘텐츠를 두 번 이상 복제해 끊김 없는 루프 구성
	const fragment = document.createDocumentFragment();

	const createItem = (index) => {
		const li = document.createElement("li");
		const imgWrap = document.createElement("div");
		imgWrap.className = "list-img";

		const offImg = document.createElement("img");
		offImg.src = `../images/solution-intro/s7_img${index}-off.png`;
		offImg.alt = `솔루션 이미지 ${index} 기본`;
		offImg.className = "off";

		const onImg = document.createElement("img");
		onImg.src = `../images/solution-intro/s7_img${index}-on.png`;
		onImg.alt = `솔루션 이미지 ${index} 활성`;
		onImg.className = "on";

		imgWrap.appendChild(offImg);
		imgWrap.appendChild(onImg);
		li.appendChild(imgWrap);

		return li;
	};

	s7List.innerHTML = "";

	for (let loop = 0; loop < loopCount; loop += 1) {
		for (let i = 1; i <= imageCount; i += 1) {
			fragment.appendChild(createItem(i));
		}
	}

	s7List.appendChild(fragment);
	const speed = 150; // 1초에 150px 이동 (숫자 키우면 더 빨라짐)
	const totalWidth = s7List.scrollWidth;

	const slideTl = gsap.to(".s7-list", {
		xPercent: -totalWidth,       
		duration: 120,          
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
