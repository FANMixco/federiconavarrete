const shareLink=document.getElementById("shareLink"),shareIcon=document.getElementById("share-icon");if(navigator.share){let e=navigator.userAgent.match(/Macintosh|MacIntel|iPad|iPhone|iPod/g);e&&e.length>0&&(shareIcon.classList.remove("icon-share-alt"),shareIcon.classList.add("icon-ios_share"))}else shareLink.style.display="none";shareLink.addEventListener("click",e=>{e.preventDefault(),navigator.share({title:"Get to know Federico Navarrete!",text:"Here you can check Federico Navarrete’s official websites: https://bit.ly/fanmixco",url:window.location.href}).then(()=>{console.log("Shared successfully!")}).catch(e=>{console.log("Error sharing:",e)})});