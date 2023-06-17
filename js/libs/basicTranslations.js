var tErr1;

let language = window.navigator.userLanguage || window.navigator.language;
let lang = "en-us/min";
let currentLoc = '';

const langLoc = "js/data/translations/";

lang = (language.includes('es')) ? "es-sv/min": (language.includes('zh')) ? 'zh-zh/min' : lang;

getScript(`${langLoc}${lang}/generics.js`)
.then(() => {
    // call loadTranslationsWithRetry and handle the result or error
    loadTranslationsWithRetry(function(err, result) {
        if (err) {
            // handle error
            console.error(err.message);
        } else {
            // handle result
            getScript(`${langLoc}${lang}/basicInfo.js`).then(() => { loadBasicInfo(); }).catch((e) => { console.error(e); });
        }
    });      
})
.catch((e) => {
  console.error(e);
});

// the retry function that takes a callback
function retry(maxRetries, delay, fn, callback) {
    // call the function and get a result
    var result = fn();
    // check the result
    if (result) {
      // if the result is truthy, call the callback with the result
      callback(null, result);
    } else {
      // if the result is falsy, check the maxRetries and delay
      if (maxRetries <= 0) {
        // if no more retries left, call the callback with an error
        callback(new Error('Max retries reached'));
      } else {
        // if there are retries left, wait for the delay and try again
        setTimeout(function() {
          // call retry recursively with one less retry
          retry(maxRetries - 1, delay, fn, callback);
        }, delay);
      }
    }
  }
  
// wrap loadTranslations with retry and delay
let loadTranslationsWithRetry = function(callback) {
    retry(3, 150, loadTranslations, callback);
};  

function loadTranslations() {
    try {
        [...document.querySelectorAll('button.btn-close')].forEach(element => {
            element.setAttribute("aria-label", genericTranslations.close);
        });

        document.querySelectorAll('[data-translation]').forEach(item => {
            item.innerHTML = genericTranslations[`${item.dataset.translation}`];
        });

        [...document.querySelectorAll('.btn-preview')].forEach(function(element) {
            element.addEventListener(eClick, function(e) {
                currentLoc = (currentLoc != element.dataset.action) ? element.dataset.action : currentLoc;
                const pTitle = (currentLoc == 'apps') ? genericTranslations.projectsGallery : genericTranslations.presentationsGallery;

                const iframePreview = getIframe(pTitle, `${currentLoc}.html?isIframe=true`, 'class="previewerIframe" allowfullscreen');

                const divPreview = document.getElementById("divPreview");

                const title = document.getElementById('zoomTitle');
                title.innerHTML = pTitle;

                divPreview.innerHTML = iframePreview;

                const btnFullScreen = document.getElementById('btn-full-screen');

                btnFullScreen.href = `${fURL}${currentLoc}.html`;
                btnFullScreen.setAttribute('title', pTitle);
                btnFullScreen.setAttribute('aria-label', pTitle);
            });
        });

        const spanMenu = document.getElementById('spanMenu');
        if (!smallScreenMobileOS) {
            spanMenu.innerHTML = getHMenu();
        } else {
            spanMenu.innerHTML = getHMenu('style="margin-top:0px!important"');
        }
        
        return true;
    }
    catch {
        return false;
    }
}

function setTranslation(elem, text) {
    [...document.querySelectorAll(elem)].forEach(function(element) {
        element.innerHTML = text;
    });
}

function loadBasicInfo() {
    const { name, headline, headlineIntro, aboutDesc, favBook, favPodcast, telephone, email, skype, company } = basicInfo;

    const linkName = document.getElementById('linkName');
    const hName = document.getElementById('hName');
    const hHeadline = document.getElementById('hHeadline');
    const hIntro = document.getElementById('hIntro');
    const divAbout = document.getElementById('divAbout');
    const favBookDiv = document.getElementById('favBook');
    const favPodcastDiv = document.getElementById('favPodcast');

    [...document.querySelectorAll('.nav-link')].forEach(function(element) {
        element.addEventListener(eClick, function(e) {
            isMenuTriggered = true;
            if (extraContact == 0) {
                setTimeout(function() {
                    contactMeForm();
                }, 5000);
            }
            extraContact++;
        });
    });

    [...document.querySelectorAll('.mFix')].forEach(function(element) {
        element.addEventListener(eClick, function(e) {
            tErr1 = setTimeout(function(self) {
                self.click();
                clearTimeout(tErr1);
                hFixCMenu();
            }, 500, this);
        });
    });
    
    linkName.innerHTML = name;
    hName.innerHTML = name;
    hHeadline.innerHTML = headline;
    hIntro.innerHTML = headlineIntro;

    const mediaQuery = window.matchMedia('screen and (max-width: 318px) and (orientation: portrait)');

    function handleMediaQueryChange(mediaQuery) {
      if (mediaQuery.matches) {
        // Media query matches
        let sName = name.split(' ');
        linkName.innerHTML = Array.from(sName[0])[0] + '. ' + sName[1];
      } else {
        linkName.innerHTML = name;
      }
    }
    
    // Initial check
    handleMediaQueryChange(mediaQuery);
    
    // Add listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);    

    aboutDesc.forEach(item => {
        divAbout.innerHTML += `<div class="col-sm"><p class="lead">${item}</p></div>`;
    });

    if (favBook.isVisible) { 
        favBookDiv.innerHTML += getActionBtn(favBook.link, iconsPath, 'download', favBook.title, 'height="24" width="24"');
    }
    else {
        favBookDiv.classList.add(nVis);
    }

    if (favPodcast.isVisible) {
        favPodcastDiv.innerHTML += getActionBtn(favPodcast.link, iconsPath, 'podcast-solid', favPodcast.title, ` style="height:24px;width:24px"`);
    }
    else {
        favPodcastDiv.classList.add(nVis);
    }

    const listContacts = document.getElementById('listContacts');

    if (skype.isVisible) {
        listContacts.innerHTML = getInLineBtn(genericTranslations.skype, `skype:${skype.id}?call`, 'skype') + listContacts.innerHTML;
    }

    if (telephone.isVisible) {
        listContacts.innerHTML = getInLineBtn(genericTranslations.telephone, `tel:${telephone.number}`, 'phone') + listContacts.innerHTML;
    }

    if (email.isVisible) {
        listContacts.innerHTML = getInLineBtn(genericTranslations.email, `mailto:${email.address}?subject=${email.subject}`, 'at') + listContacts.innerHTML;
    }

    if (company.isVisible) {
        listContacts.innerHTML = getInLineBtn(company.name, company.link, "building-solid", true) + listContacts.innerHTML;
    }

    const aElSalvador = document.getElementById('aElSalvador');

    aElSalvador.addEventListener(eClick, function() {
        if (!document.getElementById('iframeElSalvador')) {
            const divIframElSalvador = document.getElementById('divIframElSalvador');
            divIframElSalvador.innerHTML += getIframe('El Salvador Map', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984252.4374393197!2d-90.05167866086293!3d13.749114461377241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6327a659640657%3A0x6f9a16eb98854832!2sEl+Salvador!5e0!3m2!1sen!2spl!4v1555793789038!5m2!1sen!2spl', `id="iframeElSalvador" class="previewerIframe" style='background: url("img/icons/loading.gif") center/7em no-repeat'`);
        }
    }, false);

    const linkContactMe = document.getElementById("linkContactMe");

    linkContactMe.addEventListener(eClick, contactMeForm);

    const linkContactMeAbout = document.getElementById("linkContactMeAbout");

    linkContactMeAbout.addEventListener(eClick, contactMeForm);

    const linkPreview = document.getElementById('youTubePreview');
    let iframeGeneric = document.getElementById('iframeGeneric');

    linkPreview.addEventListener(eClick, () => {
        const gTitle = document.getElementById('gTitle');
        gTitle.innerHTML = genericTranslations.winning;
        gTitle.classList.remove('d-none');

        const gDivTitle = document.getElementById('gDivTitle');
        gDivTitle.classList.remove('border-0');

        const modalPreview = document.getElementById('modal-preview');
        modalPreview.classList.add('modal-xl');

        iframeGeneric.innerHTML = getIframe('Federico Navarrete', 'https://www.youtube.com/embed/IcWZ962uYy0', ` class="previewerIframe" style='background: url("img/icons/loading.gif") center/7em no-repeat'`);

        const btnFullScreenPreview = document.getElementById('btn-full-screen-preview');
        btnFullScreenPreview.href = 'https://bit.ly/3p9hMGJ';
        btnFullScreenPreview.setAttribute('title', genericTranslations.winning);
        btnFullScreenPreview.setAttribute('aria-label', genericTranslations.winning);
    });
}
