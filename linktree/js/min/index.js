const popup=document.getElementById("popup");if(popup.addEventListener("click",goBack),popup.addEventListener("touchstart",goBack),window.location.hash){let e=window.location.href.split("#")[0];window.location.href=e}function isSquareScreen(){let e=window.screen.width,t;return 10>=Math.abs(e-window.screen.height)}function goBack(){if(""===document.referrer||new URL(document.referrer).hostname!==window.location.hostname){let e=window.location.href,t=e.split("/").slice(0,-1).join("/");window.location.href=`${t}/index.html`}else history.back()}window.addEventListener("load",function(){let e=document.getElementsByClassName("imgPopup");for(let t=0;t<e.length;t++)e[t].style.display="block"}),window.addEventListener("load",function(){window.history.pushState({},"")}),window.addEventListener("popstate",function(){history.state&&"prevent-back"===history.state.id&&window.history.pushState({id:"prevent-back"},"")}),window.onload=function(){let e=navigator.userAgent.toLowerCase().match(/watch\\b|wear os\\b|huawei watch|gt 2|galaxy watch|android|iphone|ipod|kaios|tizen|harmonyos|bdos/g);if(e&&e.length>0){let t=document.getElementById("uTubeLink");t.href=t.href.replace("www","m");let n=.01*window.innerHeight;document.documentElement.style.setProperty("--vh",`${n}px`)}let a=navigator.userAgent.toLowerCase().match(/watch\\b|wear os\\b|huawei watch|gt 2|galaxy watch/g);(a&&a.length>0||isSquareScreen())&&(popup.style.height=`${window.screen.height}px`)},document.addEventListener("keydown",function(e){"Escape"===e.key&&"none"!==getComputedStyle(document.querySelector(".overlay")).display&&goBack()});