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
