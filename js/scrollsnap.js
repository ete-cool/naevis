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
tl.to(".quote_txt", { 
    opacity: 1, 
    y: 0, 
    duration: 5,
    onStart: () => changeBackground("../img/intro-new2.png") // quote_txt일 때 백그라운드 변경
  }) 
  .to(".quote_txt", { opacity: 0, y: -50, duration: 5 }) 
  .to(".naevis_typo", { 
    opacity: 1, 
    y: 0, 
    duration: 5, 
    onStart: () => changeBackground("../img/intro-new1.png"), // naevis_typo일 때 백그라운드 변경
    onStartParams: [".naevis_typo"],
    onComplete: resetPosition 
  }) 
  .to(".naevis_typo", { opacity: 0, y: -50, duration: 5 }) 
  .to(".naevis_card", { 
    opacity: 1, 
    y: 0, 
    duration: 5, 
    onStart: () => changeBackground("../img/intro-new3.png"), // naevis_card일 때 백그라운드 변경
    onStartParams: [".naevis_card"],
    onComplete: resetPosition 
  }) 
  .to(".naevis_card", { opacity: 0, y: -50, duration: 5 }) 
  .to(".intro_text", { 
    opacity: 1, 
    y: 0, 
    duration: 5, 
    onStart: () => changeBackground("../img/intro-new4.png") // intro_text일 때 백그라운드 변경
  }); 

// 초기 위치를 설정하여 애니메이션이 작동하도록 보장
gsap.set(".quote_txt, .naevis_typo, .naevis_card, .intro_text", { opacity: 0, y: 50 });

// 함수: 배경 이미지 변경 (부드러운 전환 포함)
function changeBackground(imagePath) {
  const introElement = document.querySelector('.intro');
  gsap.to(introElement, { // 현재 배경을 천천히 페이드 아웃
    opacity: 0, 
    duration: 0.3,
    onComplete: () => {
      introElement.style.backgroundImage = `url(${imagePath})`; // 배경 이미지 변경
      gsap.to(introElement, { // 새 배경을 페이드 인
        opacity: 1, 
        duration: 0.3 
      });
    }
  });
}

// 함수: 요소 위치 초기화
function resetPosition(selector) {
  gsap.set(selector, { opacity: 0, y: 50 }); 
}

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





// 통합 타임라인 - Part 2 및 Photo Area
const part2Tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".part2", 
    start: "top 80%", // .part2의 상단이 뷰포트의 80% 지점에 도달할 때 시작
    end: "+=3000", // 애니메이션이 실행되는 기간 (필요에 따라 조정)
    scrub: 1,
    markers: false, 
  }
});

// Part 2 요소들이 위에서부터 차례대로 등장
part2Tl.from(".part2 .logo_part .part_label", { opacity: 0, y: -50, duration: 1 })
  .from(".part2-cloud1", { opacity: 0, y: -50, duration: 1 }, "-=0.8")
  .from(".logo_text", { opacity: 0, y: -50, duration: 1 }, "-=0.8")
  .from(".part2-cloud2", { opacity: 0, y: -50, duration: 1 }, "-=0.8")
  .from(".text_line1", { opacity: 0, y: -50, duration: 1 }, "-=0.8")
  .from(".text_line2", { opacity: 0, y: -50, duration: 1 }, "-=0.8")
  .from(".part2_flower_cloud", { opacity: 0, y: -50, duration: 1 }, "-=0.8")
   // 이미지 요소들 더 빨리 등장하도록 타이밍 조정
   .fromTo(
    ".photo_img.img1",
    { opacity: 0, x: -100 }, 
    { opacity: 1, x: 0, duration: 1 },
    "-=0.6" // 이전 애니메이션과 더 빨리 겹치게 조정
  )
  .fromTo(
    ".photo_img.img2",
    { opacity: 0, x: 100 }, 
    { opacity: 1, x: 0, duration: 1 },
    "-=0.8" // 이미지가 더 빠르게 등장하도록 조정
  )


// 초기 위치 설정
gsap.set(".part2 .logo_part .part_label, .part2-cloud1, .logo_text, .part2-cloud2, .text_line1, .text_line2, .part2_flower_cloud, .photo_img.img1, .photo_img.img2", { opacity: 0, y: -50 });


// 새로운 타임라인 추가 - Part 3
const part3Tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".part3", 
    start: "top 80%", // .part3의 상단이 뷰포트의 80% 지점에 도달할 때 시작
    end: "+=3000", // 애니메이션이 실행되는 기간 (필요에 따라 조정)
    scrub: 1,
    markers: false, 
  }
});

// Part 3 요소들이 위에서부터 차례대로 등장
part3Tl.from(".part3 .part_label", { opacity: 0, y: -50, duration: 1 })
  .from(".part3 .head_line", { opacity: 0, y: -50, duration: 1 }, "-=0.8")
  .from(".part3 .frame_img.img1", { opacity: 0, x: -100, duration: 1 }, "-=0.8")
  .from(".part3 .frame_img.img2", { opacity: 0, x: 100, duration: 1 }, "-=0.8")
  .from(".part3 .bubble1", { opacity: 0, scale: 0.5, duration: 1 }, "-=0.8")
  .from(".part3 .text_box p:nth-child(1)", { opacity: 0, y: -50, duration: 1 }, "-=0.5")
  .from(".part3 .text_box p:nth-child(2)", { opacity: 0, y: -50, duration: 1 }, "-=0.8");

// 초기 위치 설정
gsap.set(".part3 .part_label, .part3 .head_line, .part3 .frame_img.img1, .part3 .frame_img.img2, .part3 .bubble1, .part3 .text_box p", { opacity: 0, y: -50 });
gsap.set(".part3 .frame_img.img1, .part3 .frame_img.img2", { x: 100 });
gsap.set(".part3 .bubble1", { scale: 0.5 });


// 새로운 타임라인 추가 - Interview 섹션
const interviewTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".interview.type3", 
    start: "top 80%", // .interview의 상단이 뷰포트의 80% 지점에 도달할 때 시작
    end: "+=2000", // 애니메이션이 실행되는 기간 (필요에 따라 조정)
    scrub: 1,
    markers: false, 
  }
});

// Interview 섹션의 요소들이 등장
interviewTl.from(".interview.type3 .interview_left", { opacity: 0, x: -100, duration: 1 })
  .from(".interview.type3 .interview_right", { opacity: 0, x: 100, duration: 1 }, "-=0.8")
  .from(".official_logo", { opacity: 0, scale: 0.5, duration: 1 }, "-=0.8")
  .from(".official_logo .bubble2", { opacity: 0, scale: 0.5, duration: 1 }, "-=0.5");

// 초기 위치 설정
gsap.set(".interview.type3 .interview_left, .interview.type3 .interview_right, .official_logo, .official_logo .bubble2", { opacity: 0 });
gsap.set(".interview.type3 .interview_left", { x: -100 });
gsap.set(".interview.type3 .interview_right", { x: 100 });
gsap.set(".official_logo", { scale: 0.5 });
gsap.set(".official_logo .bubble2", { scale: 0.5 });

// 새로운 타임라인 추가 - Interview Type2 섹션
const interviewType2Tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".interview.type2", 
    start: "top 80%", // .interview.type2의 상단이 뷰포트의 80% 지점에 도달할 때 시작
    end: "+=2000", // 애니메이션이 실행되는 기간 (필요에 따라 조정)
    scrub: 1,
    markers: false, 
  }
});

// Interview Type2 섹션의 요소들이 등장
interviewType2Tl.from(".interview.type2 .interview_right", { opacity: 0, x: 100, duration: 1 })
  .from(".interview.type2 .interview_left", { opacity: 0, x: -100, duration: 1 }, "-=0.8");

// 초기 위치 설정
gsap.set(".interview.type2 .interview_left, .interview.type2 .interview_right", { opacity: 0 });
gsap.set(".interview.type2 .interview_left", { x: -100 });
gsap.set(".interview.type2 .interview_right", { x: 100 });

// Part 4 요소들이 등장
const part4Tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".part4", 
    start: "top 80%", // .part4의 상단이 뷰포트의 80% 지점에 도달할 때 시작
    end: "+=4000", // 애니메이션이 실행되는 기간 (필요에 따라 조정)
    scrub: 1,
    markers: false, 
  }
});

part4Tl.from(".part4 .part_label", { opacity: 0, y: -50, duration: 1 })
  .from(".part4 .after_all", { opacity: 0, scale: 0.5, duration: 1 }, "-=0.8")
  .from(".part4 .descbox", { opacity: 0, y: -50, duration: 1 }, "-=0.8")
  .from(".part4 .naevis_logo", { opacity: 0, scale: 0.5, duration: 1 }, "-=0.8")
  
  // Chatbox 섹션의 요소들이 대화하는 것처럼 순차적으로 등장
  .from(".part4 .chatbox .chat_container:first-child .chat-bubble.left", { opacity: 0, x: -100, duration: 1 }, "-=0.8")
  .from(".part4 .chatbox .chat_container:first-child img:not(.chat-bubble)", { opacity: 0, y: -50, duration: 1 }, "-=0.8")
  .from(".part4 .chatbox .chat_container:first-child .chat-bubble.right", { opacity: 0, x: 100, duration: 1 }, "-=0.8")

  .from(".part4 .chatbox .chat_container:nth-child(2) .chat-bubble.left", { opacity: 0, x: -100, duration: 1 }, "-=0.8")
  .from(".part4 .chatbox .chat_container:nth-child(2) img:not(.chat-bubble)", { opacity: 0, y: -50, duration: 1 }, "-=0.8")
  .from(".part4 .chatbox .chat_container:nth-child(2) .chat-bubble.right", { opacity: 0, x: 100, duration: 1 }, "-=0.8")

  .from(".part4 .chatbox .chat_container:nth-child(3) .chat-bubble.left", { opacity: 0, x: -100, duration: 1 }, "-=0.8")
  .from(".part4 .chatbox .chat_container:nth-child(3) img:not(.chat-bubble)", { opacity: 0, y: -50, duration: 1 }, "-=0.8")
  .from(".part4 .chatbox .chat_container:nth-child(3) .chat-bubble.right", { opacity: 0, x: 100, duration: 1 }, "-=0.8")

  .from(".part4 .chatbox .chat_container:nth-child(4) .chat-bubble.left", { opacity: 0, x: -100, duration: 1 }, "-=0.8")
  .from(".part4 .chatbox .chat_container:nth-child(4) img:not(.chat-bubble)", { opacity: 0, y: -50, duration: 1 }, "-=0.8")
  .from(".part4 .chatbox .chat_container:nth-child(4) .chat-bubble.right", { opacity: 0, x: 100, duration: 1 }, "-=0.8");

// 초기 위치 설정 - part4 전용
gsap.set(".part4 .part_label, .part4 .after_all, .part4 .descbox, .part4 .naevis_logo, .part4 .chatbox .chat_container .chat-bubble, .part4 .chatbox .chat_container img", { opacity: 0 });
gsap.set(".part4 .chatbox .chat_container .chat-bubble.left", { x: -100 });
gsap.set(".part4 .chatbox .chat_container .chat-bubble.right", { x: 100 });
gsap.set(".part4 .chatbox .chat_container img:not(.chat-bubble)", { y: -50 });
// 새로운 타임라인 추가 - Last Contents 섹션
const lastContentsTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".last-contents", 
    start: "top 80%", // .last-contents의 상단이 뷰포트의 80% 지점에 도달할 때 시작
    end: "bottom 100%", // 애니메이션이 끝나는 지점을 뷰포트 끝으로 설정
    scrub: 1,
    markers: false, 
  }
});

// Last Contents 섹션의 요소들이 위에서부터 차례대로 등장
lastContentsTl.from(".last-contents__inner ul li img.cover_character", { opacity: 0, y: -50, duration: 1 })
  .from(".last-contents__inner .text-box p", { opacity: 0, y: -50, duration: 1, stagger: 0.5 }, "-=0.8")
  .from(".last-contents__inner .text-box .clouds", { opacity: 0, y: -50, duration: 1, stagger: 0.5 }, "-=0.8")
  .from(".last-contents__inner .sns-box li", { opacity: 0, y: -50, duration: 1, stagger: 0.2 }, "-=0.8");

// 초기 위치 설정
gsap.set(".last-contents__inner ul li img.cover_character, .last-contents__inner .text-box p, .last-contents__inner .text-box .clouds, .last-contents__inner .sns-box li", { opacity: 0, y: -50 });
