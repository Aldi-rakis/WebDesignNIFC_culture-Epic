// Function to fetch JSON data
function fetchJSON(callback) {
    // Assuming data.json is in the same directory
    fetch('../assets/apis/data.json')
      .then(response => response.json())
      .then(data => callback(data))
      .catch(error => console.error('Error fetching JSON:', error));
  }

  // Function to render post
  function renderPost(data, postId) {
    const postContainer = document.getElementById('post-container');

    const post = data.find(post => post.id === postId);
    if (post) {
      postContainer.innerHTML = `
     
      <h1 class="title">${post['post-title']}</h1>
          <img src="${post['post-img']}" alt="" class="header-img">
          <div class="profile">
            <img src="${post['profile-img']}" alt="" class="profile-img">
            <span class="profile-name">Penulis: ${post['profile-name']}</span>
            <span class="profile-name">~diupload: ${post['post-date']}</span>
          </div>
         
          <p class="post-text">${post['post-description']}</p>
          
       
      `;
    } else {
      postContainer.innerHTML = `<p>Post not found.</p>`;
    }
  }

  // Wait for the DOM content to be loaded
  document.addEventListener('DOMContentLoaded', function () {
    // Get post ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // Fetch JSON data and render post
    fetchJSON(data => renderPost(data, parseInt(postId)));
  });



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

window.addEventListener("scroll", () => {
  changeHeaderBg();
  // showScrollUpBtn();
  // activeScroll();
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};


// post-box container
ScrollReveal().reveal(".post-container h1", {
  ...scrollRevealOption,
  interval: 200,
});

