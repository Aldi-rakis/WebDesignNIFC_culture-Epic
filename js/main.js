import Destination from "./destination.js";
import DestinationText from "./destiText.js";
import DestinationBg from "./destiBg.js";

//Filter
$(document).ready(function () {
  $(".filter-item").click(function () {
      const value = $(this).attr("data-filter");
      if (value == "all"){
          $(".post-box").show("1000")
      } else{
          $(".post-box")
              .not("." + value)
              .hide(1000);
          $(".post-box")
          .filter("." + value)
          .show("1000")
      }
  });
  $(".filter-item").click(function () {
      $(this).addClass("active-filter").siblings().removeClass("active-filter")
  });
});



 // Function to fetch JSON data
 function fetchJSON(callback) {
  // Assuming data.json is in the same directory
  fetch('data.json')
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => console.error('Error fetching JSON:', error));
}

// Function to render posts
function renderPosts(data) {
  const postsContainer = document.getElementById('post');

  data.forEach(post => {
    const postBox = document.createElement('div');
    postBox.classList.add('post', 'post_container');
    postBox.id = `post-${post.id}`;

    postBox.innerHTML = `
      <div class="post-box ${post.category}">
        <img src="${post['post-img']}" alt="" class="post-img">
        <h2 class="category">${post.category}</h2>
        <a href="detail.html?id=${post.id}" class="post-title">${post['post-title']}</a>
        <span class="post-date">${post['post-date']}</span>
        <p class="post-description">${post['post-description']}</p>
        <div class="profile">
          <img src="${post['profile-img']}" alt="" class="profile-img">
          <span class="profile-name">${post['profile-name']}</span>
        </div>
      </div>
    `;

     // Add click event listener to each post
     postBox.addEventListener('click', () => {
      window.location.href = `detail.html?id=${post.id}`;
    });

    postsContainer.appendChild(postBox);



  });
}
// Wait for the DOM content to be loaded
document.addEventListener('DOMContentLoaded', function () {
  // Fetch JSON data and render posts
  
  fetchJSON(renderPosts);
});





const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// document.getElementById("explore-btn").addEventListener("click", function() {
//   document.getElementById("about").scrollIntoView({ behavior: "smooth" });
// });

// header container
ScrollReveal().reveal(".header__container h1", scrollRevealOption);

ScrollReveal().reveal(".header__container h4", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__container .btn", {
  ...scrollRevealOption,
  delay: 1000,
});

// about container
ScrollReveal().reveal(".about__container .section__header", scrollRevealOption);
ScrollReveal().reveal(".about__container .section__subheader", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".about__image", {
  ...scrollRevealOption,
  interval: 500,
  delay: 200,
});

ScrollReveal().reveal(".about__container .btn", {
  ...scrollRevealOption,
  delay: 1500,
});

// discover container
ScrollReveal().reveal(".discover__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".discover__card__content", {
  ...scrollRevealOption,
  interval: 500,
  delay: 200,
});

// blogs container
ScrollReveal().reveal(".blogs__card", {
  duration: 1000,
  interval: 400,
});

// post-box container
ScrollReveal().reveal(".post", {
  ...scrollRevealOption,
  interval: 200,
});


// journals container
ScrollReveal().reveal(".journals__card", {
  ...scrollRevealOption,
  interval: 400,
});

import Destination from "./destination.js";
import DestinationText from "./destiText.js";
import DestinationBg from "./destiBg.js";
import Blog from "./blog.js";
import Testimonial from "./testimonial.js";

const navBar = document.querySelector(".header"),
    menuBtn = document.querySelector(".header__menu-icon"),
    closeMenuBtn = document.querySelector(".close-icon"),
    sections = document.querySelectorAll("section[id]"),
    destiSliderWrapper = document.querySelector(".destinations__slider-wrapper"),
    destinationsText = document.querySelector(".destinations__text"),
    destinationsBg = document.querySelector(".destinations__bg"),
    blogContent = document.querySelector(".blogs__content"),
    testiSliderWrapper = document.querySelector(".testimonials__wrapper"),
    scrollUpBtn = document.querySelector(".scroll-up");

const DESTINATIOS_API = "../assets/apis/destinations.json";
const BLOG_API = "../assets/apis/blogs.json";
const TESTIMONIALS_API = "../assets/apis/testimonials.json";

// initialize Scroll Reveal
const sr = ScrollReveal({ origin: "top", distance: "100px", duration: 2000, delay: 200 });

/* ============== Header ============== */

menuBtn.addEventListener("click", () => document.body.classList.add("menu-toggled"));

closeMenuBtn.addEventListener("click", () => document.body.classList.remove("menu-toggled"));

function changeHeaderBg() {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
        navBar.style.backgroundColor = "var(--blue-60-opcty-70)";
        navBar.style.backdropFilter = "blur(20px)";
    } else {
        navBar.style.backgroundColor = "transparent";
        navBar.style.backdropFilter = "blur(0px)";
    }
}

/* ============== Home Section ============== */

const thumbnailsSwiper = new Swiper(".home__thumbnails", {
    slidesPerView: 3.5,
    spaceBetween: 20,
    loop: true,
    effect: "carousel",
    allowTouchMove: false,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: { slidesPerView: 1.5 },
        800: { slidesPerView: 1.8 },
        940: { slidesPerView: 2.2 },
        1000: { slidesPerView: 2.4 },
        1100: { slidesPerView: 2.5 },
        1200: { slidesPerView: 2.8 },
        1300: { slidesPerView: 3.1 },
        1380: { slidesPerView: 3.5 },
    },
});

thumbnailsSwiper.on("slideChange", () => {
    let realIndex = thumbnailsSwiper.realIndex,
        prevRealIndex = thumbnailsSwiper.previousRealIndex;
    document.querySelectorAll(".home__slide")[prevRealIndex].classList.remove("active");
    document.querySelectorAll(".home__slide")[realIndex].classList.add("active");
});

/* ============== About Section ============== */
/* ScrollReveal JS */
sr.reveal(".about__text", { origin: "left" });
sr.reveal(".about__image", { origin: "right" });
/* ============== Destinations Section ============== */

async function renderDestinations() {
    const respone = await fetch(DESTINATIOS_API);
    const data = await respone.json();
    data.map((desti) => {
        destiSliderWrapper.innerHTML += Destination(desti);
        destinationsText.innerHTML += DestinationText(desti);
        destinationsBg.innerHTML += DestinationBg(desti);
    });
    const destiSwiper = new Swiper(".destinations__slider", {
        effect: "cards",
        grabCursor: true,
        centeredSlides: true,
    });
    document.querySelectorAll(".destination-text")[0].classList.add("active");
    document.querySelectorAll(".destination-bg")[0].classList.add("active");
    destiSwiper.on("slideChange", () => {
        let realIndex = destiSwiper.realIndex,
            prevRealIndex = destiSwiper.previousRealIndex;
        document.querySelectorAll(".destination-text")[prevRealIndex].classList.remove("active");
        document.querySelectorAll(".destination-bg")[prevRealIndex].classList.remove("active");
        document.querySelectorAll(".destination-text")[realIndex].classList.add("active");
        document.querySelectorAll(".destination-bg")[realIndex].classList.add("active");
    });
    sr.reveal(".destinations__slider");
    sr.reveal(".destinations__text");
}

/* ============== Blog Section ============== */
async function renderBlogs() {
    const respone = await fetch(BLOG_API);
    const data = await respone.json();
    data.map((blog) => {
        blogContent.innerHTML += Blog(blog);
    });
    sr.reveal(".blog", { interval: 100 });
}

/* ============== Testimonials Section ============== */
async function renderTestmonials() {
    const respone = await fetch(TESTIMONIALS_API);
    const data = await respone.json();
    data.map((testi) => {
        testiSliderWrapper.innerHTML += Testimonial(testi);
    });
    const testiSwiper = new Swiper(".testimonials__content", {
        slidesPerView: 1,
        effect: "fade",
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
    });
    sr.reveal(".testimonials__content");
}

/* ============== Footer ============== */
/* ScrollReveal JS */
sr.reveal(".footer__col", { interval: 100 });

/* ============== Active Scroll ============== */

function activeScroll() {
    const scrollY = window.scrollY;
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 16,
            sectionHeight = section.offsetHeight,
            link = document.querySelector(`.header__link a[href='#${section.id}'`);
        if (scrollY >= sectionTop && scrollY <= sectionHeight + sectionTop) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

/* ============== Scroll Up ============== */

function showScrollUpBtn() {
    if (window.scrollY > 300) {
        scrollUpBtn.classList.add("show");
    } else {
        scrollUpBtn.classList.remove("show");
    }
}

scrollUpBtn.addEventListener("click", () => window.scrollTo({ behavior: "smooth", top: 0, left: 0 }));

window.addEventListener("scroll", () => {
    changeHeaderBg();
    showScrollUpBtn();
    activeScroll();
});

window.addEventListener("load", () => {
    renderDestinations();
    renderBlogs();
    renderTestmonials();
    activeScroll();
    document.querySelector(".home__thumbnails").classList.add("reveal");
});
