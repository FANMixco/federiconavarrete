if (window.location.hash) {
  let urlWithoutHash = window.location.href.split('#')[0];
  window.location.href = urlWithoutHash;
}

window.addEventListener('load', function() {
    var imgPopups = document.getElementsByClassName('imgPopup');
    for (var i = 0; i < imgPopups.length; i++) {
      imgPopups[i].style.display = 'block';
    }
});

// Get the viewport height and multiply it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

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
  const ua = navigator.userAgent.toLowerCase().match(/android|iphone|ipod|kaios|tizen|harmonyos|bdos/g);
  if (ua && ua.length > 0) {
    const uTubeLink = document.getElementById('uTubeLink');
    uTubeLink.href = uTubeLink.href.replace('www', 'm');
  }
};

const popup = document.getElementById("popup");
popup.addEventListener("click", goBack);
popup.addEventListener("touchstart", goBack);
//document.getElementById("popup-close").addEventListener("touchstart", goBack);

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
    var overlay = document.querySelector(".overlay");
    var overlayStyles = getComputedStyle(overlay);
    var isOverlayVisible = overlayStyles.display !== "none";
    
    if (isOverlayVisible) {
      goBack();
    }
  }
});