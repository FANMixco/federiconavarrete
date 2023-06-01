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