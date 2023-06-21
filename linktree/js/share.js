// Select the share icon element
const shareIcon = document.getElementById('shareIcon');
const shareIconI = document.getElementById('share-icon');

// Check if the Web Share API is supported by the browser
if (navigator.share) { 
  // Check if the user agent string indicates macOS or iOS
  const matches = navigator.userAgent.match(/Macintosh|MacIntel|iPad|iPhone|iPod/g);
  // Check if the array is not null or empty
  if (matches && matches.length > 0) {
    shareIconI.classList.remove('icon-share-alt');
    shareIconI.classList.add('icon-ios_share');
  }
} else {
  shareIcon.style.display = 'none';
}

// Add a click event listener to the share icon
shareIcon.addEventListener('click', (e) => {
  e.preventDefault();
  // Use the Web Share API to share the current page
  navigator.share({
    title: "Get to know Federico Navarrete!",
    text: 'Here you can check Federico Navarrete’s official websites: https://bit.ly/fanmixco',
    url: window.location.href
  })
    .then(() => {
      console.log('Shared successfully!');
    })
    .catch((error) => {
      console.log('Error sharing:', error);
    });
});
