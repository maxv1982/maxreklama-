//Preview
var canvas = document.getElementById("canvas");
function introAnimation() {
  (function () {
    (ctx = canvas.getContext("2d")),
      (w = canvas.width = innerWidth - 20),
      (h = canvas.height = innerHeight - 20),
      (particles = []),
      (properties = {
        bgColor: "rgba(17, 17, 19, 1)",
        particleColor: "rgba(255, 40, 40, 1)",
        particleRadius: 3,
        particleCount: 60,
        particleMaxVelocity: 2,
        lineLength: 150,
        particleLife: 6,
      });
    document.querySelector("body").appendChild(canvas);

    window.onresize = function () {
      (w = canvas.width = innerWidth), (h = canvas.height = innerHeight);
    };

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.velocityX =
          Math.random() * (properties.particleMaxVelocity * 2) -
          properties.particleMaxVelocity;
        this.velocityY =
          Math.random() * (properties.particleMaxVelocity * 2) -
          properties.particleMaxVelocity;
        this.life = Math.random() * properties.particleLife * 60;
      }

      position() {
        (this.x + this.velocityX > w && this.velocityX > 0) ||
        (this.x + this.velocityX < 0 && this.velocityX < 0)
          ? (this.velocityX *= -1)
          : this.velocityX;
        (this.y + this.velocityY > h && this.velocityY > 0) ||
        (this.y + this.velocityY < 0 && this.velocityY < 0)
          ? (this.velocityY *= -1)
          : this.velocityY;
        this.x += this.velocityX;
        this.y += this.velocityY;
      }
      reDraw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = properties.particleColor;
        ctx.fill();
      }
      reCalculateLife() {
        if (this.life < 1) {
          this.x = Math.random() * w;
          this.y = Math.random() * h;
          this.velocityX =
            Math.random() * (properties.particleMaxVelocity * 2) -
            properties.particleMaxVelocity;
          this.velocityY =
            Math.random() * (properties.particleMaxVelocity * 2) -
            properties.particleMaxVelocity;
          this.life = Math.random() * particles.particleLife * 60;
        }
        this.life--;
      }
    }

    function reDrawBackgrond() {
      ctx.fillStyle = properties.bgColor;
      ctx.fillRect(0, 0, w, h);
    }

    function reDrawParticles() {
      for (var i in particles) {
        particles[i].reCalculateLife();
        particles[i].position();
        particles[i].reDraw();
      }
    }

    function drawLines() {
      var x1, y1, x2, y2, length, opacity;
      for (var i in particles) {
        for (var j in particles) {
          x1 = particles[i].x;
          y1 = particles[i].y;
          x2 = particles[j].x;
          y2 = particles[j].y;
          length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          if (length < properties.lineLength) {
            opacity = 1 - length / properties.lineLength;
            ctx.lineWidth = "0.5";
            ctx.strokeStyle = "rgba(255, 40, 40, " + opacity + ")";
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.stroke();
          }
        }
      }
    }

    function loop() {
      reDrawBackgrond();
      reDrawParticles();
      drawLines();
      requestAnimationFrame(loop);
    }

    function init() {
      for (var i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle());
      }
      loop();
    }
    init();
  })();
}
introAnimation();
setTimeout(function () {
  canvas.style.display = "none";
}, 1000);

var wrapper = document.querySelector(".wrapper");
setTimeout(function () {
  wrapper.style.opacity = 1;
}, 1000);

//сдвиг хедера, кнопка наверх
const header = document.querySelector(".header-conteiner");
const headerHead = document.querySelector(".header");
const noneBlock = document.querySelector(".none");
const iconTop = document.querySelector(".icone_top");
const callMe = document.querySelector(".callMe");

window.addEventListener("scroll", checkScroll);
document.addEventListener("DOMcontetLoaded", checkScroll);


function checkScroll() {
  let scrollPos = window.scrollY;
  if (scrollPos > 40) {
    header.classList.add("_active");
    noneBlock.classList.add("_active");
    callMe.classList.add("_call");
    
    //header.style.width = document.documentElement.clientWidth + 'px';
  } if(scrollPos >= 0 && scrollPos <= 40) {
    header.classList.remove("_active");
    noneBlock.classList.remove("_active");
    callMe.classList.remove("_call");
  }
  var screenHeight = window.screen.height;
  var scrolled;
  if (scrollPos >= 0 && scrollPos < screenHeight) {
    iconTop.classList.add("_active");
  } else {
    iconTop.classList.remove("_active");
  }
  document.querySelector(".icone_top").onclick = function () {
    scrolled = window.pageYOffset;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
}
setTimeout(checkScroll, 1000);
// userAgent
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBarry: function () {
    return navigator.userAgent.match(/BlackBarry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBarry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  document.body.classList.add("_touch");
} else {
  document.body.classList.add("_pc");
}

// Меню бургер
const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
const menuLinkMobile = document.querySelectorAll(".menu__link-mobile");
const menuSubLinkMobile = document.querySelectorAll(".menu-sub__link");
const menuSubList = document.querySelector(".menu-sub__list");
let dx;

function moveLeft() {
  for (let i = 0; i < menuLinkMobile.length; i++) {
    let menuLinkMobiles = menuLinkMobile[i];
    if (i != 1) {
      menuLinkMobiles.addEventListener("click", function () {
        iconMenu.classList.remove("_active");
        menuBody.classList.remove("_active");
        window.document.body.classList.remove("_scroll-hidden");
      });
    }
    if (i == 1) {
      menuLinkMobiles.addEventListener("click", function () {
        //window.document.body.classList.remove("_scroll-hidden");
      });
    }
  }
  for (let i = 0; i < menuSubLinkMobile.length; i++) {
    let menuSubLinkMobiles = menuSubLinkMobile[i];
    menuSubLinkMobiles.addEventListener("click", function () {
      iconMenu.classList.remove("_active");
      menuBody.classList.remove("_active");
      window.document.body.classList.remove("_scroll-hidden");
      menuSubList.style.left = "-150px";
      resizeScreenWidth();
    });
  }
}

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
    menuSubList.style.left = "" + dx + "px";
    window.document.body.classList.toggle("_scroll-hidden");
    menuBody.style.top = addHeight + 70 + "px";
  });
}

//слайдер
const slider = document.querySelectorAll(".slider_img");
const blockText = document.querySelectorAll(".text-block__slider");

document.addEventListener("DOMcontetLoaded", resizeScreenWidth);
window.addEventListener("resize", resizeScreenWidth);
function resizeScreenWidth() {
  let windowInnerWidth = document.documentElement.clientWidth;
  if (windowInnerWidth <= 1000) {
    posRight = 0;
  }
  if (windowInnerWidth > 1000) {
    posRight = 220;
  }
  if (windowInnerWidth < 500) {
    dx = 120;
    moveLeft();
  }
  if (windowInnerWidth > 767) {
    menuSubList.style.left = "30px";
  }
  if (windowInnerWidth > 500 && windowInnerWidth <= 767) {
    dx = 150;
    moveLeft();
  }
}

let posRight = 220;
let count = 0;
document.querySelector(".btn-next").onclick = function () {
  sliderBar();
};
document.querySelector(".btn-prev").onclick = function () {
  if (count < 0) {
    count = slider.length - 1;
  }
  sliderBar();
};

function sliderBar() {
  for (let index = 0; index < slider.length; index++) {
    const imgs = slider[index];
    imgs.style.opacity = 0;
  }
  for (let index = 0; index < blockText.length; index++) {
    const blockTexts = blockText[index];
    blockTexts.style.opacity = 0;
    blockTexts.style.left = posRight;
  }
  imgSlider();
  count++;
  if (count >= slider.length) {
    count = 0;
  }
  blockText[count].style.transform = "translate(" + posRight + "px)";
}
setInterval(sliderBar, 7000);

function imgSlider() {
  slider[count].style.transition = "3s";
  slider[count].style.opacity = 1;
  sliderText();
}
function sliderText() {
  blockText[count].style.transition = "2s";
  blockText[count].style.opacity = 1;
  blockText[count].style.transitionDuration = "2s";
  blockText[count].style.transform = "translate(-" + posRight + "px)";
}

function init() {
  let sliderHeight = document.querySelector(".slider-wrapper");
  let width = document.querySelector(".slider").offsetWidth;
  for (let i = 0; i < slider.length; i++) {
    const image = slider[i];
    image.style.width = width + "px";
    image.style.height = "auto";
    sliderHeight.style.height = image.offsetHeight + "px";
  }
  sliderBar();
}
window.addEventListener("resize", init);
setTimeout(init, 2000);
setTimeout(resizeScreenWidth, 2000);

// Прокрутка при клике
window.addEventListener("scroll", scrollHeader);
document.addEventListener("DOMcontetLoaded", scrollHeader);
let addHeight = 0;

function scrollHeader() {
  let scrollPos = window.scrollY;
  if (scrollPos > 40) {
    addHeight = 0;
  }
  if (scrollPos >= 0 && scrollPos <= 40) {
    addHeight = 10;
  }
  console.log(addHeight);
}
const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        addHeight +
        pageYOffset -
        document.querySelector(".header-conteiner").offsetHeight;
      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}
setTimeout(scrollHeader, 2000);

//Плавное появление картинок при скролле
function onEntry(entry) {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.add("element-show");
    }
  });
}
let optionsImg = {
  threshold: [0.5],
};
let observerImg = new IntersectionObserver(onEntry, optionsImg);
let elements = document.querySelectorAll(".bukvi-card");

for (let elm of elements) {
  observerImg.observe(elm);
}
// передний план при наведении и увеличении
var imageSection = document.querySelectorAll(".bukvi-card img");
for (let i = 0; i < imageSection.length; i++) {
  let imageSections = imageSection[i];
  imageSections.addEventListener("mouseover", function () {
    imageSections.style.zIndex = 5;
  });
  imageSections.addEventListener("mouseout", function () {
    imageSections.style.zIndex = -1;
  });
}

//slider-gallery
const imagesGallery = document.querySelectorAll(".slider-line_gallery img");
const sliderLineGallery = document.querySelector(".slider-line_gallery");
let countGallery = 0;
let widthGallery;

function initGallery() {
  widthGallery = document.querySelector(".slider-gallery").offsetWidth;
  sliderLineGallery.style.width = widthGallery * imagesGallery.length + "px";
  imagesGallery.forEach((item) => {
    item.style.width = widthGallery + "px";
    item.style.heigh = "auto";
  });
  rollSlliderGallery();
}

window.addEventListener("resize", initGallery);
setTimeout(initGallery, 3000);

document
  .querySelector(".gallery_btn-next")
  .addEventListener("click", function () {
    countGallery++;
    if (countGallery >= imagesGallery.length) {
      countGallery = 0;
    }
    rollSlliderGallery();
  });

document
  .querySelector(".gallery_btn-prev")
  .addEventListener("click", function () {
    countGallery--;
    if (countGallery < 0) {
      countGallery = imagesGallery.length - 1;
    }
    rollSlliderGallery();
  });

function rollSlliderGallery() {
  sliderLineGallery.style.transform =
    "translate(-" + countGallery * widthGallery + "px)";
}

function sliderAutoGallery() {
  countGallery++;
  if (countGallery >= imagesGallery.length) {
    countGallery = 0;
  }
  rollSlliderGallery();
}

setInterval(sliderAutoGallery, 5000);

// pop-up
function makeSite() {
  let popUp = document.querySelector(".pop_up-content");
  let iconClose = document.querySelector(".icon-close");
  popUp.classList.add("_active");
  iconClose.addEventListener("click", function () {
    popUp.classList.remove("_active");
  });
}
setTimeout(makeSite, 15000);

// form
function sendForm() {
  let formContainer = document.querySelector(".container-form");
  let btnHeder = document.querySelector(".btn-header");
  let btnFooter = document.querySelector(".btn-footer");
  let iconClose = document.querySelector(".icon-close_form");
  let btnSidebar = document.querySelector(".btn-sidebar");

  document.addEventListener("DOMcontetLoaded", resizeScreenHeight);
  window.addEventListener("resize", resizeScreenHeight);
  function resizeScreenHeight() {
    let windowInnerHeight = document.documentElement.clientHeight;
    let windowInnerWidth = document.documentElement.clientWidth;
    console.log(windowInnerHeight, windowInnerWidth);

    if(windowInnerWidth <= 767) {
      menuBody.style.height = windowInnerHeight + 'px';
      menuSubList.style.height = windowInnerHeight - menuSubList.getBoundingClientRect().top - 40 + 'px';
    }
    if(windowInnerWidth > 767) {
      menuBody.style.height = '18px';
      menuSubList.style.height = '265px';
      menuSubList.style.left = '30px';
    }
    
    //menuBody.style.height = windowInnerHeight - 90 + "px";
    btnHeder.addEventListener("click", function () {
      formContainer.style.height = windowInnerHeight + "px";
      formContainer.classList.add("_active");
      window.document.body.classList.add("_scroll-hidden");
    });
    btnSidebar.addEventListener("click", function () {
      formContainer.style.height = windowInnerHeight + "px";
      formContainer.classList.add("_active");
      window.document.body.classList.add("_scroll-hidden");
    });
    btnFooter.addEventListener("click", function () {
      formContainer.style.height = windowInnerHeight + "px";
      formContainer.classList.add("_active");
      window.document.body.classList.add("_scroll-hidden");
    });
    iconClose.addEventListener("click", function () {
      formContainer.classList.remove("_active");
      window.document.body.classList.remove("_scroll-hidden");
    });
  }
  resizeScreenHeight();
}
sendForm();
/*
let cardImg = document.querySelectorAll('.bukvi-card');
for(let i = 0; i < cardImg.length; i++) {
  let cardImgs = cardImg[i];
  cardImgs.addEventListener("click", function() {
    cardImgs.classList.toggle('_active');
  })
}*/