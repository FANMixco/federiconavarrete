window.addEventListener('load', function() {
    var imgPopups = document.getElementsByClassName('imgPopup');
    for (var i = 0; i < imgPopups.length; i++) {
      imgPopups[i].style.display = 'block';
    }
});

let shareIcon = document.getElementById('share-icon');

// Check if the Web Share API is supported by the browser
if (navigator.share) { 
  // Check if the user agent string indicates macOS or iOS
  let matches = navigator.userAgent.match(/Macintosh|MacIntel|iPad|iPhone|iPod/g);
  // Check if the array is not null or empty
  if (matches && matches.length > 0) {
    shareIcon.classList.remove('icon-share-alt');
    shareIcon.classList.add('icon-ios_share');
  }
} else {
  shareIcon.style.display = 'none';
}