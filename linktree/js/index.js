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
document.getElementById("popup-close").addEventListener("touchstart", goBack);

function goBack() {
  history.back();
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