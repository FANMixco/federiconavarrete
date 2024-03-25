const uLang = (window.navigator.userLanguage || window.navigator.language).split('-')[0];
const validLang = ['en', 'es', 'zh'];
const jsonLoc = `js/i18n/${((validLang.indexOf(uLang) === 1) ? uLang : 'en')}/min`;
const smallScreen = smallScreenMobileOS || equalScreen;

let tErr1;
let currentLoc = '';
let genericTranslations, basicInfo;

fetchData(`${jsonLoc}/generics.json`)
.then(data => {
    genericTranslations = data;

    loadTranslationsWithRetry(loadTranslations, function(err) {
        if (!err) {
            // handle result
            fetchData(`${jsonLoc}/basicInfo.json`).then(data => {
                basicInfo = data;
                loadTranslationsWithRetry(loadBasicInfo, function() { });
                addExtraIcons();
            })
            .catch((e) => { 
                console.error(e);
            });
        }
    });
}).catch((e) => { console.error(e); });

function addExtraIcons() {
    [...document.getElementsByClassName('btn-preview')].forEach(function(element) {
        element.innerHTML = `${getFinalIcon('gallery', 21)}&ensp;${element.innerHTML}`;
    });
  
    [...document.getElementsByClassName('btn-book')].forEach(function(element) {
        element.innerHTML = `${getFinalIcon('download')}&nbsp;&nbsp;${element.innerHTML}`;
    });
}

// the retry function that takes a callback
function retry(maxRetries, delay, fn, callback) {
    // call the function and get a result
    let result = fn();
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
let loadTranslationsWithRetry = function(fn, callback) {
    retry(3, 150, fn, callback);
};  

function loadTranslations() {
    try {
        [...document.querySelectorAll('button.btn-close')].forEach(element => {
            element.setAttribute("aria-label", genericTranslations.close);
        });

        document.querySelectorAll('[data-translation]').forEach(item => {
            item.innerHTML = genericTranslations[item.dataset.translation];
        });
        
        document.querySelectorAll('[data-title-translation]').forEach(item => {
            const trans = genericTranslations[item.dataset.titleTranslation];
            item.setAttribute("aria-label", trans);
            item.title = trans;
        });

        [...document.querySelectorAll('.btn-preview')].forEach(function(element) {
            element.addEventListener(eClick, function() {
                currentLoc = (currentLoc != element.dataset.action) ? element.dataset.action : currentLoc;
                const url = `${urlB}${currentLoc}.federiconavarrete.com`;
                const pTitle = (currentLoc == 'apps') ? genericTranslations.projectsGallery : genericTranslations.presentationsGallery;

                const iframePreview = getIframe(pTitle, `${url}?isIframe=true`, 'id="gPreview" allowfullscreen');

                const divPreview = document.getElementById("divPreview");

                const title = document.getElementById('zoomTitle');
                title.innerHTML = pTitle;

                divPreview.innerHTML = iframePreview;

                const btnFullScreen = document.getElementById('btn-full-screen');

                btnFullScreen.href = url;
                btnFullScreen.setAttribute('title', pTitle);
                btnFullScreen.setAttribute('aria-label', pTitle);

                const gPreview = document.getElementById('gPreview');
                const hFrameGeneric = 450;
                let hPreviewHeight = `${hFrameGeneric}px`; 
                if (smallScreen) {
                    const portrait = window.matchMedia("(orientation: portrait)");
                    const height = equalScreen ? document.documentElement.clientHeight * 0.6 : portrait.matches ? document.documentElement.clientHeight * 0.85 : document.documentElement.clientHeight * 0.7;
                    hPreviewHeight = `${height}px`;
                }
                else if (devicePortraitAndLong) {
                    hPreviewHeight = `${hFrameGeneric * 1.5}px`;
                }
                gPreview.style.height = hPreviewHeight;
            });
        });
        
        return true;
    }
    catch {
        return false;
    }
}

function loadBasicInfo() {
    try {
        const { name, headline, headlineIntro, aboutDesc, favBook, favPodcast, telephone, email, skype, company } = basicInfo;

        //const linkName = document.getElementById('linkName');
        const hName = document.getElementById('hName');
        const hHeadline = document.getElementById('hHeadline');
        const hIntro = document.getElementById('hIntro');
        const divAbout = document.getElementById('divAbout');
        const favBookDiv = document.getElementById('favBook');
        const favPodcastDiv = document.getElementById('favPodcast');

        document.querySelectorAll('.nav-link').forEach(element => {
            element.addEventListener(eClick, () => {
                isMenuTriggered = true;
                if (extraContact === 0) {
                    setTimeout(contactMeForm, 5000);
                }
                extraContact++;
            });
        });        

        document.querySelectorAll('.mFix').forEach(element => {
            element.addEventListener(eClick, function() {
                const self = this;
                tErr1 = setTimeout(() => {
                    self.click();
                    clearTimeout(tErr1);
                    hFixCMenu();
                }, 500);
            });
        });        
        
        hName.innerHTML = name;
        hHeadline.innerHTML = headline;
        hIntro.innerHTML = headlineIntro;
        divAbout.innerHTML = '';

        aboutDesc.forEach(item => {
            divAbout.innerHTML += `<div class="col-sm"><p class="lead">${item}</p></div>`;
        });

        //favBookDiv.innerHTML = '';
        //if (favBook.isVisible) {
        favBookDiv.innerHTML = getActionBtn(`${urlB}${favBook.link}`, 'download', favBook.title);
        //}
        //else {
        //    favBookDiv.classList.add(nVis);
        //}

        //if (favPodcast.isVisible) {
        favPodcastDiv.innerHTML = getActionBtn(`${urlB}${favPodcast.link}`, 'spotify', favPodcast.title);
        //}
        //else {
        //    favPodcastDiv.classList.add(nVis);
        //}

        const listContacts = document.getElementById('listContacts');

        /*if (skype.isVisible) {
            listContacts.innerHTML = getInLineBtn(genericTranslations.skype, `skype:${skype.id}?call`, 'skype') + listContacts.innerHTML;
        }

        if (telephone.isVisible) {
            listContacts.innerHTML = getInLineBtn(genericTranslations.telephone, `tel:${telephone.number}`, 'phone') + listContacts.innerHTML;
        }

        if (email.isVisible) {
            listContacts.innerHTML = getInLineBtn(genericTranslations.email, `mailto:${email.address}?subject=${email.subject}`, 'at') + listContacts.innerHTML;
        }*/

        //if (company.isVisible) {
        listContacts.innerHTML = getInLineBtn(company.name, `${urlB}${company.link}`, "building-solid", true) + listContacts.innerHTML;
        //}

        const aElSalvador = document.getElementById('aElSalvador');

        aElSalvador.addEventListener(eClick, function() {
            if (!document.getElementById('iframeElSalvador')) {
                const divIframElSalvador = document.getElementById('divIframElSalvador');
                divIframElSalvador.innerHTML += getIframe('SV Map', `${urlB}www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984252.4374393197!2d-90.05167866086293!3d13.749114461377241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6327a659640657%3A0x6f9a16eb98854832!2sEl+Salvador!5e0!3m2!1sen!2spl!4v1555793789038!5m2!1sen!2spl`, `id="iframeElSalvador" class="previewerIframe" style='background: url("img/icons/loading.gif") center/7em no-repeat'`);

                iFrameHResize('iframeElSalvador');
            }
        }, false);

        const contactForms = document.querySelectorAll("#linkContactMe, #linkContactMeAbout, #contactMeFloat");

        contactForms.forEach(element => {
            element.addEventListener(eClick, contactMeForm);
        });

        const linkPreview = document.getElementById('youTubePreview');

        linkPreview.addEventListener(eClick, () => {
            const iframeGeneric = document.getElementById('iframeGeneric');
            const gTitle = document.getElementById('gTitle');
            gTitle.innerHTML = genericTranslations.winning;
            gTitle.classList.remove(nVis);

            const gDivTitle = document.getElementById('gDivTitle');
            gDivTitle.classList.remove('border-0');

            const modalPreview = document.getElementById('modal-preview');
            modalPreview.classList.add('modal-xl');

            iframeGeneric.innerHTML = getIframe('Federico Navarrete', `${urlB}www.youtube.com/embed/IcWZ962uYy0`, `id="yIframeP" class="previewerIframe" style='background: url("img/icons/loading.gif") center/7em no-repeat'`);

            iFrameHResize('yIframeP', 0.7);

            const btnFullScreenPreview = document.getElementById('btn-full-screen-preview');
            btnFullScreenPreview.href = `${urlB}bit.ly/3p9hMGJ`;
            btnFullScreenPreview.setAttribute('title', genericTranslations.winning);
            btnFullScreenPreview.setAttribute('aria-label', genericTranslations.winning);
        });

        document.querySelectorAll('.iLang').forEach(element => {
            element.src = `pages/${element.getAttribute('data-page')}.html?lang=${uLang}`;
        });        
        return true;
    }
    catch {
        return false;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    //const menuExpander = document.getElementById('menuExpander');
    const hMenu = getHMenu();

    // Toggle between getHMenu() and getHMenu('close') on button click
    document.getElementById('menuExpander').addEventListener(eClick, function() {
        spanMenu.innerHTML = (spanMenu.innerHTML === hMenu) ? getHMenu('cross') : hMenu;
    });
});