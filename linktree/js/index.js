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

// Get a reference to the element
let hashtag = document.getElementById("hashtag");

// Create an observer instance
let observer = new IntersectionObserver(function(entries) {
  // Loop through the entries
  for (let entry of entries) {
    // If the element is visible
    if (entry.isIntersecting) {
      // Hide the scrollbar
      document.body.style.overflowY = "hidden";
    }
  }
});

// Start observing the element
observer.observe(hashtag);
