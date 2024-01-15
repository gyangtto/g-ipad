// 당신에게 맞는 iPad는? 랜더링에 필요한 파일
// 가지고 오는 자바스크립트 코드는 최상단에 작성 필요
import ipads from '../data/ipads.js';
import navigations from '../data/navigations.js';

// 장바구니 시작
const basketStarterEl = document.querySelector('header .basket-starter');
// basket-starter 내 basket 찾아줘
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', function (event) {
  // 버블현상 제거
  event.stopPropagation();
  // contains >> 클래스가 포함이 되어있지 않은지 확인
  if (basketEl.classList.contains('show')) {
    hideBasket();
    // basketEl.classList.remove('show');
    // true > hide show 라는 클래스 제거 
  } else {
    showBasket();
    // basketEl.classList.add('show');
    // false > show 라는 클래스 추가 
  }
});

// 드롭다운 메뉴를 클릭을 했을 때 사라지지 않도록 클릭 이벤트 추가
basketEl.addEventListener('click', function (event) {
  // showBasket ();
  // 버블현상 제거
  event.stopPropagation();
});

// 윈도우를 눌렀을 때 show 클래스 제거 필요
// window.addEventListener('click', function () {
//   hideBasket ();
//   // basketEl.classList.remove('show');
// });
window.addEventListener('click', hideBasket);

// 추상화 시킴
function showBasket() {
  basketEl.classList.add('show');
};

function hideBasket() {
  basketEl.classList.remove('show');
};

// 장바구니 끝

// 검색
const headerEl = document.querySelector('header');
// 검색창 transition-delay 속성을 li들에 모두 적용해야 함 그래서 querySelectorAll 로 찾기
// [] 배열 형식 > [...] "..." 추가 시 전개 연산자를 사용하는 얕은 복사
// const headerMenuEls = headerEl.querySelectorAll('ul.menu > li');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
// 서치 안에 있는 딜레이를 해야하는 요소들
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];

searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', hideSearch);
searchShadowEl.addEventListener('click', hideSearch);

function showSearch() {
  headerEl.classList.add('searching');
  // 문서의 최상위요소에서 HTML에 fixed 클래스 추가
  document.documentElement.classList.add('fixed');
  headerMenuEls.reverse().forEach(function (el, index) {
    // foreach 라는 메소드로 el 이라는 매개변수에 반복 처리
    // index를 사용하여 revers 순서로 transition-delay 처리
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    // headerMenuEls.length >> 배열 대이터의 아이템 갯수
  });

  // index를 사용하여 순서로 transition-delay 처리해줘
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  });

  // 애니메이션이 완료되고 나서 input에 포커스 처리  
  // transition을 .6s 로 맞췄기 때문에 setTimeout 처리 시 600 시간 추가 필요
  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
};

function hideSearch() {
  headerEl.classList.remove('searching');
  // 검색 창 열릴 때 스크롤이 작동되지 않도록 요청한 거 지워줘
  document.documentElement.classList.remove('fixed');

  headerMenuEls.reverse().forEach(function (el, index) {
    // foreach 라는 메소드로 el 이라는 매개변수에 반복 처리
    // index를 사용하여 revers의 reverse 순서로 transition-delay 처리
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    // headerMenuEls.length >> 배열 대이터의 아이템 갯수
  });

  // index를 사용하여 reverse 순서로 transition-delay 처리
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  });

  // reverse()를 통해 뒤집은 경우 한번 더 뒤집어 줘야지 정상적으로 돌아옴
  searchDelayEls.reverse();

  // input 내 입력 후 닫을 경우 초기화 되도록 설정
  searchInputEl.value = ''
};

function playScroll() {
  // documentElement is <html>
  document.documentElement.classList.remove('fixed')
}
function stopScroll() {
  document.documentElement.classList.add('fixed')
}

// 헤더 메뉴 토글! [모바일]
const menuStarterEl = document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click', () => {
  if (headerEl.classList.contains('menuing')) {
    headerEl.classList.remove('menuing')
    searchInputEl.value = ''
    playScroll()
  } else {
    headerEl.classList.add('menuing')
    stopScroll()
  }
})

// 헤더 검색! [모바일]
const searchTextFieldEl = document.querySelector('header .textfield')
const searchCancelEl = document.querySelector('header .search-canceler')
searchTextFieldEl.addEventListener('click', () => {
  headerEl.classList.add('searching--mobile')
  searchInputEl.focus()
})
searchCancelEl.addEventListener('click', () => {
  headerEl.classList.remove('searching--mobile')
})

// 화면 크기가 달라졌을 때 검색 모드가 종료되도록 처리.
window.addEventListener('resize', event => {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove('searching')
  } else {
    headerEl.classList.remove('searching--mobile')
  }
})


// 네비게이션 메뉴 토글! [모바일]
const navEl = document.querySelector('nav')
const navMenuToggleEl = navEl.querySelector('.menu-toggler')
const navMenuShadowEl = navEl.querySelector('.shadow')
navMenuToggleEl.addEventListener('click', () => {
  if (navEl.classList.contains('menuing')) {
    hideNavMenu()
  } else {
    showNavMenu()
  }
})
navEl.addEventListener('click', event => {
  event.stopPropagation()
})
navMenuShadowEl.addEventListener('click', hideNavMenu)
window.addEventListener('click', hideNavMenu)
function showNavMenu() {
  navEl.classList.add('menuing')
}
function hideNavMenu() {
  navEl.classList.remove('menuing')
}

// 요소의 가시성 관찰 (화면에 보일 때)
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show');
  })
});

const infoEls = document.querySelectorAll('.info');
infoEls.forEach(function (el) {
  io.observe(el);
});

// 비디오 재생
const video = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click', function () {
  video.play();
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
});

pauseBtn.addEventListener('click', function () {
  video.pause();
  playBtn.classList.remove('hide');
  pauseBtn.classList.add('hide');
});

// 데이터 기반으로 출력
// 당신에게 맞는 iPad는? 랜더링
const itmesEl = document.querySelector('.compare .items')
// 배열 데이터 forEach 함수 사용 
ipads.forEach(function (ipad) {
  // ipads를 반복하니까 단수 ipad 작성
  const itemEl = document.createElement('div');
  // createElement 메소드 요소를 자바스크립트를 통해 생성하는 스크립트
  itemEl.classList.add('item');

  // 각각의 li 아이템을 반복해서 생성해놔야 함
  let colorList = '';
  ipad.colors.forEach(function (color){
    colorList += `<li style="background-color: ${color};"></li>`
  });

  // textContent 사용 시 문자로 출력해냄
  // innerHTML 삽입한 문자를 HTML 구조로 처리해 줌
  // Comment tagged template 확장 프로그램을 통해 모듈을 통한 HTML 내용 추가 삽입
  // template literal 방식으로 작성 ``
  // ${} 보간 방법
  itemEl.innerHTML = /* html */ `
  <div class="thumbnail">
  <img src="${ipad.thumbnail}" alt="${ipad.name}" />
  </div>

  <ul class="colors">
  ${colorList}  </ul>
  <h3 class="name">${ipad.name}</h3>
  <p class="tagline">${ipad.tagline}</p>
  <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
  <button class="btn">구입하기</button>
  <a href="${ipad.url}" class="link">더 알아보기</a>
  `;


  /* 실제 요소에 넣어줘야 함 */
  itmesEl.append(itemEl);
});


// Navigations 랜더링
const navigationsEl = document.querySelector('footer .navigations');
navigations.forEach(function (nav) {
  const mapEl = document.createElement('div');
  mapEl.classList.add('map');
  
  let mapList='';
  nav.maps.forEach(function (map) {
    mapList += /* html */ `
    <li>
      <a href="${map.url}">${map.name}</a>
    </li>
    `
  });

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

navigationsEl.append(mapEl);

});


// .this year
const thisYearEl = document.querySelector('span.this-year');
thisYearEl.textContet = new Date().getFullYear;
// 생성자 함수 호출