window.addEventListener('load', function() {
    var imgPopups = document.getElementsByClassName('imgPopup');
    for (var i = 0; i < imgPopups.length; i++) {
      imgPopups[i].style.display = 'block';
    }
});

// Check if the user agent string indicates macOS or iOS
let matches = navigator.userAgent.match(/Macintosh|MacIntel|iPad|iPhone|iPod/g);
// Check if the array is not null or empty
if (matches && matches.length > 0) {
  let shareIcon = document.getElementById('share-icon');
  shareIcon.classList.remove('icon-share-alt');
  shareIcon.classList.add('icon-ios_share');
}