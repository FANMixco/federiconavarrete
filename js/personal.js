const fURL = 'https://federiconavarrete.com/';

const imgLocPortfolio = 'img/portfolio/';
const imgLocArticles = 'img/articles/';

function onReadyPersonal() {
    let cYear = new Date().getFullYear();
    
    const spanYear = document.getElementById("spanYear");
    
    spanYear.innerHTML = cYear === 2019 ? `${cYear}` : `2019 - ${cYear}`;
    
    [...document.getElementsByClassName('.ignore-click')].forEach(function(element) {
        element.addEventListener('click', x => false);
    });
}
if (document.readyState !== "loading") {
    onReadyPersonal();
} else {
    document.addEventListener("DOMContentLoaded", onReadyPersonal);
}

if (smallScreenMobileOS) {
  const imgProfile = document.getElementById('imgProfile');
  imgProfile.classList.add('mb-5', 'd-block', 'mx-auto');
} else {
  const profileDiv = document.getElementById('profile-div');
  const mediaQuery = window.matchMedia('(min-width: 769px)');

  function handleTabletChange(e) {
    // Check if the media query is true
    if (!e.matches) {
      profileDiv.classList.remove('col-sm-auto');
      profileDiv.classList.add('col-sm', 'pt-4', 'mt-4', 'pb-4');
    } else {
      profileDiv.classList.remove('col-sm', 'pt-4', 'mt-4', 'pb-4');
      profileDiv.classList.add('col-sm-auto');
    }
  }

  // Register event listener
  mediaQuery.addEventListener('change', handleTabletChange);

  // Initial check
  handleTabletChange(mediaQuery);
}

// Define a function to change the class based on screen size
function screenResize() {
  // Get the div element
  const element = document.getElementById("hContent");
  // Get the current width of the window
  const width = window.innerWidth;

  element.className = (width < 1200) ? "container-fluid" :  "container";

  const divs = document.querySelectorAll(".card-holder");

  divs.forEach(function(div) {
    if (width < 992) {
      div.style.width =  "auto";
    } else {
      div.style.removeProperty("width");
    }
  });
}

// Call the function when the page loads
screenResize();

// Call the function when the window is resized
window.addEventListener("resize", screenResize);