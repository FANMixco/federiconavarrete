// Select the share icon element
const shareIcon = document.getElementById('shareIcon');

// Add a click event listener to the share icon
shareIcon.addEventListener('click', (e) => {
  e.preventDefault();
  // Check if the Web Share API is supported by the browser
  if (navigator.share) {
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
        console.error('Error sharing:', error);
      });
  } else {
    console.log('Web Share API not supported in this browser.');
  }
});
