// .loading의 hidden 상태 변화를 감지하기 위한 MutationObserver 생성
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === "class") {
      const isHidden = mutation.target.classList.contains("hidden");
      if (isHidden) {
        // hidden 상태가 되면 애니메이션 시작
        startAnimations();
        observer.disconnect(); // 더 이상 감지하지 않도록 observer 해제
      }
    }
  });
});

// .loading 요소의 class 변화를 감지하도록 설정
observer.observe(document.querySelector('.loading'), { attributes: true });

// 애니메이션 시작 함수
function startAnimations() {
  const mainTl = gsap.timeline();

  // 순차적으로 요소들이 나타나는 애니메이션 설정
  mainTl.from(".interview_txt", { opacity: 0, y: -100, duration: 1 })
    .from(".main_logo_text .text1", { opacity: 0, y: -100, duration: 0.8 }, "-=0.5")
    .from(".main_logo_text .text2", { opacity: 0, y: -100, duration: 0.8 }, "-=0.4")
    .from(".main_logo_text .text3", { opacity: 0, y: -100, duration: 0.8 }, "-=0.4")
    .from(".logo_img", { opacity: 0, y: -100, duration: 1 }, "-=0.5");

  // 초기 위치 설정
  gsap.set(".interview_txt, .main_logo_text .text1, .main_logo_text .text2, .main_logo_text .text3, .logo_img", { opacity: 0, y: -100 });
}

// 각 버튼 클릭 시 해당 섹션으로 스르륵 스크롤 이동 설정
document.querySelector('#tointro').addEventListener('click', function(event) {
  event.preventDefault(); // a 태그의 기본 동작 막기
  gsap.to(window, {duration: 1, scrollTo: ".main"});
});

document.querySelector('#topart1').addEventListener('click', function(event) {
  event.preventDefault();
  gsap.to(window, {duration: 1, scrollTo: ".part1"});
});

document.querySelector('#topart2').addEventListener('click', function(event) {
  event.preventDefault();
  gsap.to(window, {duration: 1, scrollTo: ".part2"});
});

document.querySelector('#topart3').addEventListener('click', function(event) {
  event.preventDefault();
  gsap.to(window, {duration: 1, scrollTo: ".part3"});
});

document.querySelector('#topart4').addEventListener('click', function(event) {
  event.preventDefault();
  gsap.to(window, {duration: 1, scrollTo: ".part4"});
});

gsap.registerPlugin(ScrollTrigger);

// 기존 타임라인 생성
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".intro", // 애니메이션을 시작할 요소
    start: "top top", // .row2의 상단이 뷰포트의 상단에 닿을 때 시작
    end: "+=3000", // 애니메이션이 실행되는 기간 (필요에 따라 조정)
    scrub: true,
    pin: true, // 애니메이션 동안 .row2 섹션 고정
    markers: false, // 시작과 끝 지점을 시각적으로 확인하려면 true로 설정
  }
});

// 순차적으로 각 요소가 나타나고 사라지도록 애니메이션 설정
tl.to(".quote_txt", { opacity: 1, y: 0, duration: 5 }) 
  .to(".quote_txt", { opacity: 0, y: -50, duration: 5 }) 
  .to(".naevis_typo", { opacity: 1, y: 0, duration: 5, onStart: resetPosition, onStartParams: [".naevis_typo"] }) 
  .to(".naevis_typo", { opacity: 0, y: -50, duration: 5 }) 
  .to(".naevis_card", { opacity: 1, y: 0, duration: 5, onStart: resetPosition, onStartParams: [".naevis_card"] }) 
  .to(".naevis_card", { opacity: 0, y: -50, duration: 5 }) 
  .to(".intro_text", { opacity: 1, y: 0, duration: 5 }); 

// 초기 위치를 설정하여 애니메이션이 작동하도록 보장
gsap.set(".quote_txt, .naevis_typo, .naevis_card, .intro_text", { opacity: 0, y: 50 });

// 함수: 요소 위치 초기화
function resetPosition(selector) {
  gsap.set(selector, { opacity: 0, y: 50 }); 
}

// part1-title 타임라인 생성
const part1Tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".part1-title", 
    start: "top 75%", 
    end: "bottom 50%", 
    scrub: 0.5, 
    markers: false, 
  }
});

// part_label 애니메이션
part1Tl.fromTo(
  ".part_label span",
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 1 }
);

// part_title 텍스트가 한 줄씩 순차적으로 나타나는 애니메이션
part1Tl.fromTo(
  ".part_title span:nth-child(1)", 
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 1 }
)
.fromTo(
  ".part_title span:nth-child(2)", 
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 1 },
  "+=0.3"
)
.fromTo(
  ".part_title span:nth-child(3)", 
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 1 },
  "+=0.3"
)
.fromTo(
  ".part_title span:nth-child(4)", 
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 1 },
  "+=0.3"
);

// 초기 상태 설정
gsap.set(".part_label span, .part_title span", { opacity: 0, y: 20 });

// 새로운 타임라인 추가
const questionTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".question", 
    start: "top 80%", // 요소의 상단이 뷰포트의 80% 지점에 도달할 때 시작
    end: "+=2000", // 애니메이션이 실행되는 기간 (필요에 따라 조정)
    scrub: 1, 
    markers: false, 
  }
});

// part1_01가 왼쪽에서 등장
questionTl.fromTo(
  ".part1_01",
  { opacity: 0, x: -100 }, 
  { opacity: 1, x: 0, duration: 1 }
)

// part1_02와 part1_03가 오른쪽에서 등장하고 동시에 image_layer는 왼쪽에서 빠르게 등장
.fromTo(
  ".image_layer",
  { opacity: 0, x: -100 }, 
  { opacity: 1, x: 0, duration: 1 },
  "+=0.2" 
)
.fromTo(
  ".part1_02",
  { opacity: 0, x: 100 }, 
  { opacity: 1, x: 0, duration: 1 },
  "-=1" 
)
.fromTo(
  ".part1_03",
  { opacity: 0, x: 100 }, 
  { opacity: 1, x: 0, duration: 1 },
  "-=1" 
)

// row3의 left가 왼쪽에서 등장하고 동시에 right가 오른쪽에서 등장
.fromTo(
  ".row3 .left",
  { opacity: 0, x: -100 }, 
  { opacity: 1, x: 0, duration: 1 },
  "+=0.3"
)
.fromTo(
  ".row3 .right",
  { opacity: 0, x: 100 }, 
  { opacity: 1, x: 0, duration: 1 },
  "-=1" 
);

// 초기 위치 설정
gsap.set(".part1_01, .part1_02, .part1_03, .image_layer, .row3 .left, .row3 .right", { opacity: 0, x: -100 });
