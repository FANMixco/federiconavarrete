const popup = document.getElementById("popup");
popup.addEventListener("click", goBack);
popup.addEventListener("touchstart", goBack);
//document.getElementById("popup-close").addEventListener("touchstart", goBack);

if (window.location.hash) {
  let urlWithoutHash = window.location.href.split('#')[0];
  window.location.href = urlWithoutHash;
}

window.addEventListener('load', function() {
    let imgPopups = document.getElementsByClassName('imgPopup');
    for (let i = 0; i < imgPopups.length; i++) {
      imgPopups[i].style.display = 'block';
    }
});

window.addEventListener('load', function () {
  // Add a new history entry when the app is loaded
  window.history.pushState({}, '')
})

window.addEventListener('popstate', function () {
  // Check if the history state has an identifier
  if (history.state && history.state.id === 'prevent-back') {
    // Re-push the history entry when the user presses back
    window.history.pushState({ id: 'prevent-back' }, '')
  }
});

window.onload = function() {
  const ua = navigator.userAgent.toLowerCase().match(/watch\\b|wear os\\b|huawei watch|gt 2|galaxy watch|android|iphone|ipod|kaios|tizen|harmonyos|bdos/g);

  if (ua && ua.length > 0) {
    const uTubeLink = document.getElementById('uTubeLink');
    uTubeLink.href = uTubeLink.href.replace('www', 'm');

    // Get the viewport height and multiply it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  const uaWatches = navigator.userAgent.toLowerCase().match(/watch\\b|wear os\\b|huawei watch|gt 2|galaxy watch/g);

  if (uaWatches && uaWatches.length > 0 || isSquareScreen()) { 
    popup.style.height = `${window.screen.height}px`;
  }
};

function isSquareScreen() {
  // Get the screen width and height in pixels
  let screenWidth = window.screen.width;
  let screenHeight = window.screen.height;

  // Calculate the difference between width and height
  let diff = Math.abs(screenWidth - screenHeight);

  // Define a threshold for the difference (you can adjust this value)
  const threshold = 10;

  // Return true if the difference is less than or equal to the threshold, false otherwise
  return diff <= threshold;
}

function goBack() {
  if (document.referrer === "" || new URL(document.referrer).hostname !== window.location.hostname) {
    const currentURL = window.location.href;
    const baseUrl = currentURL.split('/').slice(0, -1).join('/');
    window.location.href = `${baseUrl}/index.html`; // Replace with the appropriate URL of your index page
  } else {
    history.back();
  }
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    const overlay = document.querySelector(".overlay");
    const overlayStyles = getComputedStyle(overlay);
    const isOverlayVisible = overlayStyles.display !== "none";
    
    if (isOverlayVisible) {
      goBack();
    }
  }
});

// JavaScript to handle body overflow
document.addEventListener('DOMContentLoaded', function () {
  const overlayTmp = document.querySelector('.overlay');

  // Function to toggle body class when overlay is targeted
  function toggleBodyOverflow() {
    document.body.classList.toggle('no-scroll', overlayTmp.matches(':target'));
  }

  // Event listener for hash change (when overlay is targeted)
  window.addEventListener('hashchange', toggleBodyOverflow);

  // Initial check in case there's an initial target
  toggleBodyOverflow();
});