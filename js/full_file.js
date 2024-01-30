/* Generic acts */

let tagRegExp;
let extraContact = 0;
let isMenuTriggered = false;

const lazyLoading = 'loading="lazy"';
const eClick = 'click';
const nVis = 'd-none';
const tCenter = "text-center";
const iconsPath = 'img/icons/website/';
const marginTop = 0;
const heightIFrame = 600;

const deviceType = () => {
    const ua = navigator.userAgent.toLowerCase();
  
    if (
      ua.match(/(tablet|ipad|playbook|silk|kindle fire)|(android(?!.*mobi))/i) !== null
    ) {
      return "Tablet";
    } else if (
        ua.match(/watch\\b|wear os\\b|huawei watch|gt 2|galaxy watch/g) !== null
    ) {
        return "Watch";
    } else if (
      ua.match(/iphone|ipod/i) !== null ||
      ua.match(/mobile|android|ip(hone|od)|windows phone|iemobile|blackberry|silk-accelerated|(hpw|web)os|opera m(obi|ini)|tizen|harmonyos|kaios/) !== null
    ) {
      return "Smartphone";
    }
  
    return "Desktop";
};

const actualDev = deviceType();
const smallScreenMobileOS = (actualDev === "Smartphone" || actualDev === "Watch");
let devicePortraitAndLong = (actualDev === "Desktop" || actualDev === "Tablet") && window.innerHeight > window.innerWidth;
const equalScreen = window.innerWidth == window.innerHeight;

function hFixCMenu() {
    setTimeout(function() {
        closeMenu();
    }, 500);
}

function closeMenu() {
    if (document.getElementById("navbarResponsive").classList.contains("show")) {
        document.getElementById("menuExpander").click();
    }
}

function getHeight() {
    let body = document.body,
        html = document.documentElement;

    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight, body.getBoundingClientRect().height);
}

function contactMeForm(e) {
    try {
        e.preventDefault();
    } catch { }
    if (document.getElementById("contactMeForm").innerHTML.trim().length == 0) {
        document.getElementById("contactMeForm").innerHTML += `<iframe title="contact me" id="contactMeI" src="pages/contact${language.includes('es') ? "_es" : ""}.html" height="${heightIFrame * 0.8}px" width="100%" frameborder="0" scrolling="yes" style="margin-top:${marginTop}px"></iframe>`;
        iFrameHResize('contactMeI');
    }

    let contactMe = new bootstrap.Modal(document.getElementById("contactMe"), {});
    contactMe.show();
    extraContact++;
}

function iFrameHResize(id, percentage = 0.7) {
    let landscape = window.matchMedia("(orientation: landscape)");
    if (equalScreen)
        document.getElementById(id).style.height = `${document.documentElement.clientHeight * 0.7}px`;
    else if (landscape.matches)
        document.getElementById(id).style.height = `${document.documentElement.clientHeight * percentage}px`;
    else if (devicePortraitAndLong)
        document.getElementById(id).style.height = `${heightIFrame * 1.2}px`;
    else
        document.getElementById(id).style.height = `${heightIFrame * 0.8}px`;
}

function getImage(title, link, icon, isTargetBlank, isIcon = true, classExternal = "", isIgnoredClick = false, imgClass = "", extras = '') {
    let targetBlank = isTargetBlank ? `target="_blank"` : "";
    let ignoreClick = isIgnoredClick ? "ignore-click" : "";
    let noreferrer = link !== "#" ? 'rel="noreferrer"' : "";
    let img = isIcon ? `<i class="icon-${icon}"></i>` : `${getFinalImg('', imgClass, title, `src="${icon}"`)}`;

    return getFLink(`btn btn-outline-light btn-social ${tCenter} rounded-circle ${ignoreClick} ${classExternal}`, link, img, `${extras} title="${title}" ${targetBlank} data-bs-toggle="tooltip" ${noreferrer}`);
}

function getIframe(title, src, extras, fullscreen = 'allowfullscreen', lazy = lazyLoading) {
    return `<iframe title="${title}" src="${src}" ${extras} ${lazy} ${fullscreen}></iframe>`;
}

function getFLink(cls, link, body, extras = '') {
    return `<a class='${cls}' href="${link}" ${extras}>${body}</a>`;
}

function getCard(link, icon, txtColor, title, cOption, iOption, iHeight, iWidth, invert = '0%', extras = '', hasLink = false, idL = '') {
    let idC = idL != '' ? `id='${idL}'` : '';
    let lStart = hasLink ? `<a href="${link}" ${idC} class='card-link ${txtColor}'>` : '';
    let lEnd = hasLink ? '</a>' : '';
    let style = (!extras) ? '' : `style="${extras}"`;

    return `${lStart}<div class="card card-ser ${cOption}" ${style}>
    <div class="card-body text-center">
      <h5 class="card-title"><div class='${iOption} card-icon'>${getFinalIcon(icon, iHeight)}</div></h5>
      <br />
      <h6 class="card-subtitle mb-2">${title}</h6>
    </div>
  </div>${lEnd}`
}

function getActionBtn(link, iconsPath, icon, title, extras = "") {
    return getFLink("btn btn-xl btn-outline-light btn-home", link, `${getFinalIcon(`${icon}`)}&nbsp;&nbsp;${title}`, `rel="noreferrer" target="_blank"`);
    //return getFLink("btn btn-xl btn-outline-light btn-home", link, `${getFinalImg('', 'mr-2 btnIcons', title, `src="${iconsPath}${icon}.svg" ${extras}`)}&nbsp;&nbsp;${title}`, `rel="noreferrer" target="_blank"`);
}

function getInLineBtn(btnAction, action, icon, isTargetBlank = false) {
    return getInLi(getImage(btnAction, action, `${icon}`, isTargetBlank, true, "btn-footer", false, "iconFooter"));
}

function getInLi(body, extraCls = '', extras = '') {
    return `<li class="list-inline-item${extraCls}" ${extras}>${body}</li>`;
}

function getHMenu(extras = "") {
    return getFinalIcon('bars-solid');
    //return getFinalImg('', 'hMenu ml-2', 'menu', `src="${iconsPath}bars-solid.svg" height="13" width="11.2" ${extras}`);
}

function getFinalImg(id, imgCls, alt, extras, lLoading = lazyLoading) {
    let idT = (id != '') ? `id="${id}"` : '';
    let clsT = (imgCls != '') ? `class="${imgCls}"` : '';
    return `<img ${idT} ${clsT} ${lLoading} ${extras} alt="${getCleanTitle(alt)}" />`
}

function getFinalIcon(id, fontSize = '', extraCls = '') {
    const font = (fontSize) ? `style="font-size: ${fontSize}px; max-height: ${fontSize}px;"` : '';
    return `<span class="icon-${id} ${extraCls}" ${font}></span>`;
}

function getCleanTitle(alt) {
    tagRegExp = !(tagRegExp) ? new RegExp('<\s*[^>]*>', 'g') : tagRegExp;
    return alt.replace(tagRegExp, '');
}

window.addEventListener("load", function() {
    if (window.matchMedia('(hover: hover)').matches) {
      try {
        let tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        let tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  
        for (let i = 0; i < tooltipList.length; i++) {
          tooltipList[i].hide();
        }
      } catch (error) {
        console.error(error);
      }
    }
});


/* basic translations */

//getScripts.js
const getScript = url => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
  
    script.onerror = reject;
  
    script.onload = script.onreadystatechange = function() {
      const loadState = this.readyState;
  
      if (loadState && loadState !== 'loaded' && loadState !== 'complete') return;
  
      script.onload = script.onreadystatechange = null;
  
      resolve();
    }
  
    document.head.appendChild(script);
});

//basicTranslations.js
var tErr1;

const language = window.navigator.userLanguage || window.navigator.language;
let lang = "en-us/min";
let currentLoc = '';

const langLoc = "js/data/translations/";

const validLang = ['en', 'es', 'zh'];

lang = (language.includes('es')) ? "es-sv/min": (language.includes('zh')) ? 'zh-zh/min' : lang;

getScript(`${langLoc}${lang}/generics.js`)
.then(() => {
    // call loadTranslationsWithRetry and handle the result or error
    loadTranslationsWithRetry(loadTranslations, function(err, result) {
        if (!err) {
            // handle result
            getScript(`${langLoc}${lang}/basicInfo.js`).then(() => {
                loadTranslationsWithRetry(loadBasicInfo, function(err, result) { });
                addExtraIcons();
            })
            .catch((e) => { 
                console.error(e);
            });
        }
    });
})
.catch((e) => {
    console.error(e);
});

function addExtraIcons() {
    //const dStyle = `style='filter: invert(1)'`;
    [...document.getElementsByClassName('btn-preview')].forEach(function(element) {
        element.innerHTML = getFinalIcon(`gallery`, 21) + '&ensp;' + element.innerHTML;
        //element.innerHTML = `${getFinalImg('', '', 'preview', `src="${iconsPath}gallery.svg" height="22" width="22" ${dStyle}`)}&ensp;` + element.innerHTML;
    });
  
    [...document.getElementsByClassName('btn-book')].forEach(function(element) {
        element.innerHTML = getFinalIcon(`download`) + '&nbsp;&nbsp;' + element.innerHTML;
        //element.innerHTML = `${getFinalImg('', '', 'download book', `src="${iconsPath}download.svg" height="18" width="18" ${dStyle}`)}&nbsp;&nbsp;` + element.innerHTML;
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
            item.innerHTML = genericTranslations[`${item.dataset.translation}`];
        });

        [...document.querySelectorAll('.btn-preview')].forEach(function(element) {
            element.addEventListener(eClick, function(e) {
                currentLoc = (currentLoc != element.dataset.action) ? element.dataset.action : currentLoc;
                const pTitle = (currentLoc == 'apps') ? genericTranslations.projectsGallery : genericTranslations.presentationsGallery;

                const iframePreview = getIframe(pTitle, `${currentLoc}.html?isIframe=true`, 'id="gPreview" allowfullscreen');

                const divPreview = document.getElementById("divPreview");

                const title = document.getElementById('zoomTitle');
                title.innerHTML = pTitle;

                divPreview.innerHTML = iframePreview;

                const btnFullScreen = document.getElementById('btn-full-screen');

                btnFullScreen.href = `${fURL}${currentLoc}.html`;
                btnFullScreen.setAttribute('title', pTitle);
                btnFullScreen.setAttribute('aria-label', pTitle);

                let gPreview = document.getElementById('gPreview');
                const hFrameGeneric = 450;
                let hPreviewHeight = `${hFrameGeneric}px`; 
                if (smallScreenMobileOS || equalScreen) {
                    let portrait = window.matchMedia("(orientation: portrait)");
                    let height = equalScreen ? document.documentElement.clientHeight * 0.6 : portrait.matches ? document.documentElement.clientHeight * 0.85 : document.documentElement.clientHeight * 0.7;
                    hPreviewHeight = `${height}px`;
                }
                else if (devicePortraitAndLong) 
                    hPreviewHeight = `${hFrameGeneric * 1.5}px`;
                gPreview.style.height = hPreviewHeight;
            });
        });

        const spanMenu = document.getElementById('spanMenu');
        spanMenu.innerHTML = (!(smallScreenMobileOS || equalScreen)) ? getHMenu() : getHMenu('style="margin-top:0px!important"');
        
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
        
        //linkName.innerHTML = name;
        hName.innerHTML = name;
        hHeadline.innerHTML = headline;
        hIntro.innerHTML = headlineIntro;

        const detectScreenSize = window.matchMedia('screen and (max-width: 320px) and (orientation: portrait)');

        /*function resizeTitleName(detectScreenSize) {
            if (detectScreenSize.matches || equalScreen) {
                // Media query matches
                let sName = name.split(' ');
                linkName.innerHTML = Array.from(sName[0])[0] + '. ' + sName[1];
            } else {
                linkName.innerHTML = name;
            }
        }
        
        // Initial check
        resizeTitleName(detectScreenSize);
        
        // Add listener for changes to the media query
        detectScreenSize.addEventListener('change', resizeTitleName);*/  

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
            favPodcastDiv.innerHTML += getActionBtn(favPodcast.link, iconsPath, 'spotify', favPodcast.title, ` style="height:24px;width:24px"`);
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

                iFrameHResize('iframeElSalvador');
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

            iframeGeneric.innerHTML = getIframe('Federico Navarrete', 'https://www.youtube.com/embed/IcWZ962uYy0', `id="yIframeP" class="previewerIframe" style='background: url("img/icons/loading.gif") center/7em no-repeat'`);

            iFrameHResize('yIframeP', 0.7);

            const btnFullScreenPreview = document.getElementById('btn-full-screen-preview');
            btnFullScreenPreview.href = 'https://bit.ly/3p9hMGJ';
            btnFullScreenPreview.setAttribute('title', genericTranslations.winning);
            btnFullScreenPreview.setAttribute('aria-label', genericTranslations.winning);
        });
        return true;
    }
    catch {
        return false;
    }
}

/* Translations */

let totalServices = 0;
let fullReviews = [];

const bookEdition = 'second;'
const imgPreview = getImgBasicTag('{URL}', '', '', '', '{Title}', 'style="max-width: 90%"');
const noreferrer = 'rel="noreferrer"';
const tBlank = 'target="_blank"';
const divSmall = '<div class="col-sm">';
const cDiv = '</div>';
const w100 = 'class="w-100"';
const fontMobile = (smallScreenMobileOS) ? 'font-mobile' : '';

//getScript(`${langLoc}${lang}/hobbiesList.js`).then(() => { loadHobbies(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/awardsList.js`).then(() => { loadAwards(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/servicesList.js`).then(() => { loadServices(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/techSkillsLists.js`).then(() => { loadTechSkills(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/softSkillsLists.js`).then(() => { loadSoftSkills(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/personalProjects.js`).then(() => { loadPersonalProjects(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/presentationsLists.js`).then(() => { loadVideosAndPresentations(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/organizedEvents.js`).then(() => { 
    const { events, isVisible } = organizedEvents;
    loadImgSection(events, isVisible, 'divEvents', 'divEvents', imgLocPortfolio, 'Łódźarts', fontMobile);
}).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/articlesList.js`).then(() => {
    const { articles, isVisible } = articlesList;
    loadImgSection(articles, isVisible, 'divArticles', 'articlesDiv', imgLocArticles, '', fontMobile);
}).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/newsArticleList.js`).then(() => { 
    const { articles, isVisible } = newsArticlesList;
    loadImgSection(articles, isVisible, 'divMMArticles', 'newsArticles', imgLocArticles, fontMobile);
}).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/socialMediasLists.js`).then(() => { loadSocialMedias(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/reviewsList.js`).then(() => { loadReviews(); }).catch((e) => { console.error(e); });

loadBookPreview();

setTimeout(function () {
    addIFrameModal();
}, 1000);

function loadBookPreview() {
    const bookPreview = document.getElementById("bookPreview");

    bookPreview.innerHTML += getIframe('Timeless Stories of El Salvador', 'https://leer.amazon.es/kp/card?asin=B09Z33ZPTV&preview=inline&linkCode=kpe&ref_=cm_sw_r_kb_dp_HJ6YDMXY6BRE1FA9AWE3', `type="text/html" sandbox="allow-scripts allow-same-origin allow-popups" width="336" height="550" frameborder="0" style="max-width:100%;margin:auto;display:block"`, '');
}

function loadReviews() {
    try {
        const { reviews, isVisible } = reviewsList;

        if (isVisible) {
            const divReviewsPreviews = document.getElementById('divReviewsPreviews');

            reviews.forEach(function(item, index) {

                const name = item.externalLink !== "" ? getFLink("text-warning", item.externalLink, item.name, `${noreferrer} ${tBlank}`) : item.name;

                const currentReview = index + 1;

                let rTmp = `${item.shortReview}${getBtnModal("reviewGeneric", "text-material-link", `readMore${currentReview}`, genericTranslations.readMore, '', 'reviewGeneric')}`;

                const review = `${getCItem(`${tCenter}${item.isActive ? " active" : ""}`)}
                                ${getReviewContainer("", item.img, currentReview, name, item.title, "", "white", "white", rTmp, "", true)}
                                ${cDiv}`;

                divReviewsPreviews.innerHTML += review;

                let longReview = "";

                const tTemp = item.title.replaceAll('text-material-link', "text-material-link-dark");
                if (item.isPDF) {
                    longReview = `${getImgName(name, item.img, currentReview, "picReviewers")}
                    ${getReviewTitle('dark', tTemp)}
                    ${getInnerTitle(item.date)}
                    <div id="review${currentReview}PDF">${cDiv}
                    <div class="centerText">
                        ${getFLink("btn btn btn-outline-dark", item.pdfLocation, `${getFinalIcon(`download`, 14)}&nbsp;${genericTranslations.download}`, tBlank)}
                    ${cDiv}`;
                }
                else {
                    longReview = getReviewContainer("picReviewers", item.img, index + 1, name, item.date, getInnerTitle(tTemp), 'dark', 'black', item.review, "centerText", false);
                }

                fullReviews.push({ 
                    review: longReview,
                    isPDF: item.isPDF
                });
            });
        }
        else {
            const divReviews = document.getElementById("divReviews");
            divReviews.classList.add(nVis);
        }

        fullReviews.forEach(function(item, index) { 

            let rmCurrent = document.getElementById(`readMore${index + 1}`);
            rmCurrent.addEventListener(eClick, (e) => {
                e.preventDefault();
                let divGenericContent = document.getElementById('divGenericContent');
                divGenericContent.innerHTML = item.review;

                if (item.isPDF) {
                    PDFObject.embed("/testimonials/references.pdf", `#review${index + 1}PDF`);
                    if (deviceType() === "Smartphone" || deviceType() === "Tablet")
                        document.getElementById("review2PDF").style.height = "auto";
                }
            });
        });
    }
    catch (e) { return e; }
}

/*function loadHobbies() {
    try {
        const { hobbies, isVisible } = hobbiesList;

        if (isVisible) {
            const hobbiesList = document.getElementById('hobbiesList');

            const finalH = !(smallScreenMobileOS) ? hobbies : hobbies.filter(({isOpt}) => isOpt === false);

            finalH.forEach(item => {
                let btnOptional = item.isOpt ? " btnOptional" : "";

                hobbiesList.innerHTML += getListItem(getHobbyImg(item), '', btnOptional);
            });

            if (smallScreenMobileOS) {
                hobbiesList.innerHTML += getBtnOthers('otherHobbies', 'externalImg', '', '', "btnExtraHobbies");
            }

            const hobbiesOthers = hobbies.filter(({isOpt}) => isOpt === true);

            const optHobbies = document.getElementById('optHobbies');
            hobbiesOthers.forEach(elem => {
                optHobbies.innerHTML += getListItem(getHobbyImg(elem));
            });

            [...document.querySelectorAll('.ignore-click')].forEach(function(element) {
                element.addEventListener(eClick, function(e) {
                    e.preventDefault();
                });
            });

            document.getElementById("linkContactMe").addEventListener(eClick, function(e) {
                e.preventDefault();
            });
        }
        else {
            const divHobbies = document.getElementById("divHobbies");
            divHobbies.classList.add(nVis);
        }
    }
    catch (e) { return e; }
}*/

function loadServices() {
    try {
        const { services, isVisible } = servicesList;

        if (isVisible) {
            const servicesList = document.getElementById('servicesList');
            let items = (smallScreenMobileOS || equalScreen) ? '' : `<div class="row justify-content-center">`;
            services.forEach(item => {
                item.forEach(elem => {
                    let title = getCard(elem.link, `${elem.icon} fSize65`, 'text-white', elem.title, 'card-services', 'fa-icon-services', null, null, '100%', '', true, `service${totalServices}`);

                    items += (smallScreenMobileOS || equalScreen) ? `<div class="carousel-item ${(totalServices == 0) ? "active" : ""}"><div class='text-center card-holder'>${title}</div></div>` : `<div class='col-lg-4 col-md-6 col-sm-12 col-12 p-2 text-center card-holder'>${title}</div>`;

                    totalServices++;
                });
            });

            items = (smallScreenMobileOS || equalScreen) ? items : `${items}${cDiv}`;

            if (smallScreenMobileOS || equalScreen) {
                items = getCarousel(items, "carouselServices", 'text-dark');
                const servicesListDiv = document.getElementById("servicesList");
                servicesListDiv.classList.remove("row");
                servicesListDiv.classList.add("container");
            }

            servicesList.innerHTML += items;

            if (smallScreenMobileOS || equalScreen)
                new bootstrap.Carousel(`#carouselServices`);
        }
        else {
            const divServices = document.getElementById('divServices');
            divServices.classList.add(nVis);
        }
    }
    catch (e) { return e; }
}

function getCarousel(items, cId, arrowsColor = 'text-muted') {
    return `<div class="container-fluid" id="div${cId}">
    <div id="${cId}" class="carousel slide">
        <div class="carousel-inner">
            ${items}
        </div>
        <button class="carousel-control-prev icon-size-22" type="button" data-bs-target="#${cId}" data-bs-slide="prev" aria-label="Previous">
            <span class="${arrowsColor} icon-chevron-left-solid"></span>
        </button>
        <button class="carousel-control-next icon-size-22" type="button" data-bs-target="#${cId}" data-bs-slide="next" aria-label="Next">
            <span class="${arrowsColor} icon-chevron-right-solid"></span>
        </button>
        </div>
    </div>`;
}

function loadAwards() {
    try {
        const { awards, isVisible } = awardsList;

        if (isVisible) {
            const awardsList = document.getElementById('awardsList');
            let availableLinks = [];
            let i = 0;
            let items = (smallScreenMobileOS || equalScreen) ? '' : `<div class="row justify-content-center">`;
            awards.forEach(item => {
                item.forEach(elem => {
                    let title = getBtnModal('linkPreviews', 'clean-btn card-link text-dark', `linkPreview${i}`, getCard(elem.link, `trophy fSize50`, 'text-dark', elem.title, 'card-awards', 'fa-icon-awards', null, null, '0%', ''), '', '', true, elem.type, elem.link);

                    availableLinks.push({ 
                        id: i,
                        title: elem.title,
                        link: elem.link,
                        type: elem.type
                    });
                    
                    items += (smallScreenMobileOS || equalScreen) ? `<div class="carousel-item ${(i == 0) ? "active" : ""}"><div class='text-center card-holder'>${title}</div></div>` : `<div class='col-lg-4 col-md-6 col-sm-12 col-12 p-2 text-center card-holder'>${title}</div>`;
    
                    i++;
                });
            });

            items = (smallScreenMobileOS || equalScreen) ? items : `${items}${cDiv}`;

            if (smallScreenMobileOS || equalScreen) {
                items = getCarousel(items, "carouselAwards", 'text-dark');
                const awardsListDiv = document.getElementById("awardsList");
                awardsListDiv.classList.remove("row");
                awardsListDiv.classList.add("container");
            }

            awardsList.innerHTML += items;

            if (smallScreenMobileOS || equalScreen)
                new bootstrap.Carousel(`#carouselAwards`);

            availableLinks.forEach(item => {
                if (item.type !== "_blank") {
                    const linkPreview = document.getElementById(`linkPreview${item.id}`);

                    linkPreview.addEventListener(eClick, () => {
                        const iframeGeneric = document.getElementById('iframeGeneric');
                        const btnFullScreenPreview = document.getElementById('btn-full-screen-preview');
                        const gTitle = document.getElementById('gTitle');

                        gTitle.classList.add(nVis);

                        const gDivTitle = document.getElementById('gDivTitle');
                        gDivTitle.classList.add('border-0');

                        const lPreview = !(item.link.includes("storage.live.com")) ? getIframe(item.title, item.link, `class="previewerIframe" id="previewerIframeI" style='background: url("img/icons/loading.gif") center/7em no-repeat'`) : imgPreview.replace("{URL}", item.link).replace("{Title}", item.title);

                        const modalPreview = document.getElementById('modal-preview');

                        modalPreview.classList.remove('modal-xl');

                        if (item.type === "img") {
                            modalPreview.classList.add('modal-xl');
                        }

                        btnFullScreenPreview.href = item.link;
                        btnFullScreenPreview.setAttribute('title', item.title);
                        btnFullScreenPreview.setAttribute('aria-label', item.title);
                    
                        iframeGeneric.innerHTML = lPreview;

                        iFrameHResize('previewerIframeI');
                    });
                }
            });
            //screenResizeCardHolders();
        }
        else {
            const divAwards = document.getElementById('divAwards');
            divAwards.classList.add(nVis);
        }
    }
    catch (e) { return e; }
}

function loadTechSkills() {
    try {
        loadSkills(techSkills, techSkillsOthers, "divTechSkills", "divTechSkillsOthers", "", "btnMoreTechSkills", "multiDev");
    }
    catch (e) { return e; }
}

function loadSoftSkills() {
    try {
        loadSkills(softSkills, softSkillsOthers, "divSoftSkills", "divSoftSkillsOther", "-business", "btnMoreSoftSkills", "multiBS");
    }
    catch (e) { return e; }
}

function loadPersonalProjects() {
    try {
        const personalProjectsDiv = document.getElementById('personalProjects');
        personalProjects.forEach(item => {
            const isActive = item.isActive ? " active" : "";

            const hOpt = smallScreenMobileOS || equalScreen ? "style='font-size: larger!important'" : "";

            const pp = `${getCItem(isActive)}
                <div class="carousel-video-inner">
                    ${getUTubeLite(item)}
                    ${getH4Tag(`${getFLink("text-material-link-dark", item.link, item.title, `${noreferrer} ${tBlank}`)}, ${item.timeFrame}`, hOpt)}
                    ${cDiv}
                ${cDiv}`;

            personalProjectsDiv.innerHTML += pp;
        });
    }
    catch (e) { return e; }
}

function getVideoCarousel(items, id) {
    return `<div id="${id}" class="carousel slide">
    <div class="carousel-inner">${items}</div>
    <button class="carousel-control-prev carousel-control-prev-video icon-size-22" href="#${id}" role="button" data-bs-slide="prev" aria-label="Previous">
        <span class="text-muted icon-chevron-left-solid"></span>
    </button>
    <button class="carousel-control-next carousel-control-next-video icon-size-22" href="#${id}" role="button" data-bs-slide="next" aria-label="Next">
        <span class="text-muted icon-chevron-right-solid"></span>
    </button>
 </div>`;
}

function loadVideos() {
    try {
        const { presentations, isVisible } = presentationsVideos;

        const divVideos = document.getElementById('divVideos');
        if (isVisible) {
            loadVideosUTube(presentations, divVideos, 'publicSpeakingDiv');
        }
        else {
            const hPublicSpeaking = document.getElementById('hPublicSpeaking');
            hPublicSpeaking.classList.add(nVis);

            divVideos.classList.add(nVis);
        }
    }
    catch (e) { return e; }
}

function loadVideosUTube(presentations, divVideo, divCar) {
    let cUTube = 0;
    if (smallScreenMobileOS || equalScreen) {
        let items = '';
        presentations.forEach(item => {
            let vTmp = getUTubeContainer(item, fontMobile);
            vTmp = vTmp.replaceAll('class="col-sm"', `class="carousel-video-inner"`);
            vTmp = `<div class="carousel-item ${(cUTube == 0) ? 'active' : ''}">${vTmp}</div>`;
            items += vTmp;
            cUTube++;
        });
        items = getVideoCarousel(items, divCar);
        divVideo.innerHTML = items;
        new bootstrap.Carousel(`#${divCar}`);
    }
    else {
        presentations.forEach(item => {
            divVideo.innerHTML += getUTubeContainer(item);
            if (cUTube === 0) {
                divVideo.innerHTML += `<div ${w100}>${cDiv}`;
            }
            cUTube++;
        });
    }
}

function loadYouTubeVideos() {
    try {
        const { presentations, isVisible } = youtubeTrainings;

        const divYouTubeVideos = document.getElementById('divYouTubeVideos');
        if (isVisible) {
            loadVideosUTube(presentations, divYouTubeVideos, 'uTubeDiv');
        }
        else {
            const hYouTubeTraining = document.getElementById('hYouTubeTraining');
            hYouTubeTraining.classList.add(nVis);

            divYouTubeVideos.classList.add(nVis);
        }
    }
    catch (e) { return e; }
}

function loadDivPresentations(presentations, divPicture, divCar) {
    let cPresentation = 0;
    if (smallScreenMobileOS || equalScreen) {
        let items = '';
        presentations.forEach(item => {
            let vTmp = getImgContainer(item.link, setWebPImage(item.imgID, getImgTag(item.imgID, item.title)), item.title, 'font-mobile');
            vTmp = vTmp.replaceAll('class="col-sm"', `class="carousel-video-inner"`);
            vTmp = `<div class="carousel-item ${(cPresentation == 0) ? 'active' : ''}">${vTmp}</div>`;
            items += vTmp;
            cPresentation++;
        });
        items = getVideoCarousel(items, divCar);
        divPicture.innerHTML = items;
        presentations.forEach(item => {
            setImage(item.imgID, item.imgBasicName, imgLocPortfolio, item.imgFormat);
        });
        new bootstrap.Carousel(`#${divCar}`);
    }
    else {
        presentations.forEach(item => {
            const ppt = getImgContainer(item.link, setWebPImage(item.imgID, getImgTag(item.imgID, item.title)), item.title);
            divPPTs.innerHTML += ppt;
            setImage(item.imgID, item.imgBasicName, imgLocPortfolio, item.imgFormat);
        });
    }   
}

function loadPresentations() {
    try {
        const { presentations, isVisible } = presentationsLinks;

        const divPPTs = document.getElementById('divPPTs');
        if (isVisible) {
            /*presentations.forEach(item => {
                let ppt = getImgContainer(item.link, setWebPImage(item.imgID, getImgTag(item.imgID, item.title)), item.title);
                divPPTs.innerHTML += ppt;
                setImage(item.imgID, item.imgBasicName, imgLocPortfolio, item.imgFormat);
            });*/
            loadDivPresentations(presentations, divPPTs, 'presentationsDiv');
        }
        else {
            const hPresentations = document.getElementById('hPresentations');
            hPresentations.classList.add(nVis);

            divPPTs.classList.add(nVis);

            const pPPTs = document.getElementById('pPPTs');
            pPPTs.classList.add(nVis);
        }
    }
    catch (e) { return e; }
}

function loadImgSection(list, isVisible, section, divSection, imgPath, optTitle = '', cls = '') {
    try {
        if (isVisible) {
            const divSection = document.getElementById(section);
            list.forEach(item => {
                const tmpImg = getImgContainer(item.link, setWebPImage(item.imgID, getImgTag(item.imgID, !(optTitle) ? item.title : optTitle)), item.title, cls);
                divSection.innerHTML += tmpImg;
                setImage(item.imgID, item.imgBasicName, imgPath, item.imgFormat);
            });
        }
        else {
            const secDiv = document.getElementById(divSection);
            secDiv.classList.add(nVis);
        }
    }
    catch (e) { return e; }
}

function loadSocialMedias() {
    try {
        const { socialMedia, isVisible} = socialBasicList;

        if (isVisible) {
            const socialMediaBasic = document.getElementById('socialMediaBasic');
            const socialMediaBasicExtended = document.getElementById('social-medias-extended-list');

            socialMedia.forEach(item => {
                socialMediaBasic.innerHTML += getListItem(getImage(item.title, item.link, `${item.icon}`, true, true, `btn-footer ${item.id}`, false, "iconFooter"));
                socialMediaBasicExtended.innerHTML += getListItem(getImage(item.title, item.link, `${item.icon}`, true, true, `btn-footer ${item.id}`, false, "iconFooter"));
            });
            socialMediaBasicExtended.innerHTML += getBtnShare();

            const btnShare = document.getElementById('btnShare');

            btnShare.addEventListener("click", (event) => {
                event.preventDefault();

                navigator.share({
                    title: genericTranslations.knowMoreTitle,
                    text: genericTranslations.knowMoreBody,
                    url: window.location.href
                })
                .then(() => {
                    console.log('Shared successfully!');
                })
                .catch((error) => {
                    console.error('Error sharing:', error);
                });
            });

            if (socialOthersList.isVisible) {
                const sBasic = document.getElementById("socialMediaBasic");
                
                sBasic.innerHTML += getBtnOthers('otherLocs', 'btn-footer', "", '', '', 'iconFooter btn-footer');

                const socialMediaOthers = document.getElementById('socialMediaOthers');
                socialOthersList.socialMedia.forEach(elem => {
                    socialMediaOthers.innerHTML += getListItem(getImage(elem.title, elem.link, `${elem.icon}`, true, true, "btn-footer", false, "iconFooter"));
                });
            }
        }
        else {
            const aroundWeb = document.getElementById('aroundWeb');
            aroundWeb.classList.add(nVis);
        }

        if (smallScreenMobileOS) {
            [...document.getElementsByClassName('uTubeLink')].forEach(function(element) {
                element.href = element.href.replace('www', 'm');    
            });
        }
    }
    catch (e) { return e; }
}

function loadSkills(skills, skillsOthers, divContainer, divOthersContainer, classCollapse, btnMore, itemCollapseID) {
    try {
        skills.forEach(item => {
            let items = `${divSmall}<p class="lead">`;
            item.forEach(elem => {
                items += `${elem}<br /><br />`;
            });
            items = `${items.substring(0, items.length - 12)}</p>${cDiv}`;

            let divTmp = document.getElementById(`${divContainer}`);

            divTmp.innerHTML = items + divTmp.innerHTML;
        });

        let arias = "";

        for (let i = 0; i < skillsOthers.length; i++){
            arias += `${itemCollapseID}${i} `;
        }

        document.getElementById(btnMore).setAttribute("aria-controls", arias);

        const divOthersContainerDiv = document.getElementById(divOthersContainer);

        skillsOthers.forEach(function(item, index) {
            let items = `${divSmall}<div class="collapse multi-collapse${classCollapse}" id="${itemCollapseID}${index}"><div class="card card-body mini-cards">`;
            item.forEach(elem => {
                items += `${elem}<br /><br />`;
            });
            items = `${items.substring(0, items.length - 12)}${cDiv}${cDiv}${cDiv}`;

            divOthersContainerDiv.innerHTML = items + divOthersContainerDiv.innerHTML;
        });
    }
    catch (e) { return e; }
}

function getHobbyImg(item) {
    let externalClass = "";

    if (item.externalClass) {
        externalClass = item.externalClass;
    }

    return getImage(item.title, "#", `${item.icon}`, true, item.isIcon, externalClass, true);
}

function addIFrameModal() {
    for (let serv = 0; serv < totalServices; serv++) {
        let cService = document.getElementById(`service${serv}`);
        cService.addEventListener(eClick, function(e) {
            e.preventDefault();
            document.getElementById("serviceForm").innerHTML = getIframe('Contact me', cService.href, `height="${heightIFrame * 0.8}px" width="100%" id="serviceFormI" frameborder="0" scrolling="yes" style="margin-top:${marginTop}px"`);

            iFrameHResize('serviceFormI');
            
            try {
                let tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
                let tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

                for (let i = 0; i < tooltipList.length; i++) {
                    tooltipList[i].hide();
                }
            } catch { }

            let services = new bootstrap.Modal(document.getElementById("servicesModal"), {});
            services.show();
        });
    }
}

function loadVideosAndPresentations() {
    loadVideos();
    loadYouTubeVideos();
    loadPresentations();
}

function setImage(imgID, imgBasic, imgLoc, imgFormat) {
    //let imgBookSize = '';
    let imgSize = '';

    const imgTemp = document.getElementById(imgID);
    const srcWebP = document.getElementById(`srcWebP${imgID}`);
    const srcJPG = document.getElementById(`srcJPG${imgID}`);
    //let divBook = document.getElementById("myBookDiv");
    //divBook.classList.add(nVis);

    //let imgBook = document.getElementById("imgBook");
    //let currentDate = new Date();
    //let validDate = !((currentDate.getMonth() + 1 >= 7) && (currentDate.getFullYear() >= 2022) && (currentDate.getDate() >= 15));

    switch (deviceType()) {
        case "Smartphone":
            //imgBookSize = '_small';
            imgSize = '_small';
            break;
        case "Tablet":
            imgSize = '_medium';
            break;
    }
    
    imgTemp.src = `${imgLoc}${imgBasic}${imgSize}.${imgFormat}`;

    srcWebP.srcset = `${imgLoc}${imgBasic}${imgSize}.webp`;
    srcJPG.srcset = `${imgLoc}${imgBasic}${imgSize}.jpg`;    

    /*if (validDate) {
        imgBook.src = `img/mybook/${bookEdition}${imgBookSize}.png`;
        divBook.classList.add('block');
    }*/

    imgTemp.setAttribute("loading", "lazy");
}

function getUTubeContainer(item, cls) {
    return `${divSmall}
        ${getUTubeLite(item)}
        ${getH4Tag(item.title, '', cls)}
        ${cDiv}`;
}

function getUTubeLite(item) {
    return `<lite-youtube class="iVideos" videoid="${item.youTubeID}" playlabel="${item.title}"></lite-youtube>`;
}

function getImgPreview(img, currentReview, extraClass) {
    return `<div class="img-box p-1 border rounded-circle m-auto ${extraClass}">
                ${getImgReview(img, currentReview)}
            ${cDiv}`;
}

function getReviewName(name, isLarge) {
    let extraCss = (smallScreenMobileOS || equalScreen) && isLarge ? "style='font-size: larger!important'" : '';
    return `<p class="mt-4 mb-0 ${tCenter} h5 p-1 text-material-orange text-uppercase" ${extraCss}>${name}</p>`;
}

function getReviewTitle(color, title, cssCentered) {
    return `<p class="text-${color} m-0 ${cssCentered} ${tCenter} h6 p-1">${title}</p>`;
}

function getInnerTitle(title) {
    return `<p class="text-dark m-0 ${tCenter} p-2">${title}</p>`;
}

function getImgReview(src, rev) {
    return getPicture(`srcset="${src.replace('.jpg', '.webp')}"`, `srcset="${src}"`, getImgBasicTag(src, lazyLoading, 'd-block w-100 h-auto rounded-circle', '', `review${rev} slide`, 'height="151" width="151"'));
}

function getReviewContainer(extraClass, img, currentReview, name, title, extraTitle, txtColor, txtColor2, content, cssCentered, isLarge = false) {
    return `${getImgName(name, img, currentReview, extraClass, isLarge)}
    ${extraTitle}
    ${getReviewTitle(txtColor, title, cssCentered)}
    <p class="m-0 pt-3 text-${txtColor2}">${content}</p>`;
}

function getImgName(name, img, currentReview, extraClass, isLarge) {
    return `${getImgPreview(img, currentReview, extraClass)}
    ${getReviewName(name, isLarge)}`;
}

function getPicture(src1, src2, img) {
    return `<picture>
                <source ${src1} type="image/webp">
                <source ${src2} type="image/jpeg"> 
                ${img}
            </picture>`;
}

function setWebPImage(id, img) {
    return getPicture(`id='srcWebP${id}'`, `id='srcJPG${id}'`, img);
}

function getImgContainer(link, img, title, cls) {
    return `${divSmall}
        ${getFLink('', link, img, `${noreferrer} ${tBlank} aria-label='${getCleanTitle(title)}'`)}
        ${getH4Tag(title, '', cls)}
    ${cDiv}`
}

function getH4Tag(body, extras = '', cls = '') {
    return `<p class="${tCenter} text-uppercase text-secondary mb-0 h4 mt-2 mb-2 ${cls}" ${extras}>${body}</p>`;
}

function getImgTag(id, alt) {
    return getFinalImg(id, 'img-fluid', alt, '');
}

function getImgBasicTag(src, lazyLoading = '', extraClass = '', id = '', alt = '', extras = '') {
    return getFinalImg(id, extraClass, alt, `src='${src}' ${extras}`, lazyLoading);
}

function getListItem(elem, extra = "", extraCls = "") {
    return getInLi(elem, extraCls, extra);
}

function getBtnModal(target, cls, id, body, extras='', href='', isBtn = false, targetBlank = '', link = '') {
    const tmpTag = (isBtn) ? 'button' : 'a';
    const tmpRef = (isBtn) ? '' : `href="#${href}"`;
    const idT = (id != '') ? `id="${id}"` : '';
    const tNone = (!isBtn) ? 'text-decoration-none' : '';

    return (targetBlank != '_blank') ? `<${tmpTag} ${idT} class="${cls} ${tNone}" data-bs-toggle="modal" data-bs-target="#${target}" ${tmpRef} ${extras}>${body}</${tmpTag}>` : `<a href='${link}' target='${targetBlank}' class="${cls}" ${extras}>${body}</a>`;
}

function getBtnShare() {
    let icon = 'share-android-svgrepo-com';
    const matches = navigator.userAgent.match(/Macintosh|MacIntel|iPad|iPhone|iPod/g);
    const matchesWindows = navigator.userAgent.match(/Windows/g);
    if (matches && matches.length > 0) { 
        icon = 'share-ios-export-svgrepo-com';
    } else if (matchesWindows && matchesWindows.length > 0) {
        icon = 'share-windows-svgrepo-com';
    }

    return getListItem(getImage('', '#', `${iconsPath}${icon}.svg`, false, false, "btn-footer", false, "iconFooter", `id="btnShare" title="${genericTranslations.share}" alt="${genericTranslations.share}"`));
}

function getBtnOthers(loc, cls, extra = "", imgExtra = "", id = '', clsImg = '') {
    extra += `title="${genericTranslations.extras}" alt="${genericTranslations.extras}"`;
    return getListItem(getBtnModal(loc, `btn btn-outline-light btn-social ${tCenter} rounded-circle ${cls}`, id, getFinalIcon(`plus`)), extra);
}

function getCItem(extras) {
    return `<div class="carousel-item ${extras}">`;
}

/*function screenResizeCardHolders() {
    const divs = document.querySelectorAll(".card-holder");
    const width = window.innerWidth;

    divs.forEach(function(div) {
        div.style.width = (width < 992) ? "auto" : "revert-layer";
    });
}*/

function rotatedModal() {
    //Clean old changes
    if (smallScreenMobileOS || equalScreen) {
        const mModals = document.getElementsByClassName("mFullScreen");
        for (let i = 0; i < mModals.length; i++) {
            mModals[i].classList.remove("modal-fullscreen");
        }
        const mModalsH = document.getElementsByClassName("mFullScreenH");
        for (let i = 0; i < mModalsH.length; i++) {
            mModalsH[i].classList.remove("modal-fullscreen");
        }
    }

    if (document.getElementById('contactMeI'))
        iFrameHResize('contactMeI');

    changeModalType();
}

function changeModalType() {
    if (smallScreenMobileOS || equalScreen) {
        const mModals = document.getElementsByClassName("mFullScreen");
        for (let i = 0; i < mModals.length; i++) {
            mModals[i].classList.remove("modal-xl");
            mModals[i].classList.add("modal-fullscreen");
        }

        let landscape = window.matchMedia("(orientation: landscape)");
        if (landscape.matches || equalScreen || actualDev === "Watch") {
            const mModalsH = document.getElementsByClassName("mFullScreenH");
            for (let i = 0; i < mModalsH.length; i++) {
                mModalsH[i].classList.remove("modal-xl");
                mModalsH[i].classList.add("modal-fullscreen");
            }
        }
    }
}

changeModalType();

if (window.matchMedia) {
    window.matchMedia("(orientation: portrait)").addEventListener("change", rotatedModal);
    window.matchMedia("(orientation: landscape)").addEventListener("change", rotatedModal);
} else {
    window.addEventListener("orientationchange", rotatedModal);
}

/* personal */
const fURL = 'https://federiconavarrete.com/';

const imgLocPortfolio = 'img/portfolio/';
const imgLocArticles = 'img/articles/';

function onReadyPersonal() {
    let cYear = new Date().getFullYear();
    
    const spanYear = document.getElementById("spanYear");
    
    spanYear.innerHTML = cYear === 2019 ? `${cYear}` : `2019 - ${cYear}`;
    
    [...document.getElementsByClassName('ignore-click')].forEach(function(element) {
        element.addEventListener('click', x => false);
    });
}
if (document.readyState !== "loading") {
    onReadyPersonal();
} else {
    document.addEventListener("DOMContentLoaded", onReadyPersonal);
}

if (smallScreenMobileOS || equalScreen) {
  const imgProfile = document.getElementById('imgProfile');
  imgProfile.classList.add('mb-5', 'd-block', 'mx-auto');
} else {
  const profileDiv = document.getElementById('profile-div');
  const mediaQuery = window.matchMedia('(min-width: 769px)');

  function handleTabletChange(e) {
    // Check if the media query is true
    if (!e.matches) {
      profileDiv.classList.remove('col-sm-auto');
      profileDiv.classList.add('col-sm', 'pt-4', 'mt-4', 'pb-4');
    } else {
      profileDiv.classList.remove('col-sm', 'pt-4', 'mt-4', 'pb-4');
      profileDiv.classList.add('col-sm-auto');
    }
  }

  // Register event listener
  mediaQuery.addEventListener('change', handleTabletChange);

  // Initial check
  handleTabletChange(mediaQuery);
}

// Define a function to change the class based on screen size
function screenResize() {
  // Get the div element
  const element = document.getElementById("hContent");
  // Get the current width of the window
  const width = window.innerWidth;

  element.className = (width < 1200) ? "container-fluid" :  "container";

  devicePortraitAndLong = (actualDev === "Desktop" || actualDev === "Tablet") && window.innerHeight > window.innerWidth;

  if (document.getElementById('contactMeI'))
    iFrameHResize('contactMeI');
}

// Call the function when the page loads
screenResize();

// Call the function when the window is resized
window.addEventListener("resize", screenResize);

/*Freelancer */
/*!
* Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
function onReadyFreelancer() {

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );

    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    if (deviceType() === "Smartphone") {

        let el_autohide = document.querySelector('.autohide');
 
        // add padding-top to bady (if necessary)
        let navbar_height = document.querySelector('.navbar').offsetHeight;
        document.body.style.paddingTop = `${navbar_height}px`;

        if (el_autohide) {
            let last_scroll_top = 0;
            window.addEventListener('scroll', function() {
                if (document.getElementById("navbarResponsive").classList.contains("show")) {
                    document.getElementById("menuExpander").click();
                }

                let scroll_top = window.scrollY;
                if (scroll_top < last_scroll_top) {
                    el_autohide.classList.remove('scrolled-down');
                    el_autohide.classList.add('scrolled-up');
                }
                else {
                    el_autohide.classList.remove('scrolled-up');
                    el_autohide.classList.add('scrolled-down');
                }
                last_scroll_top = scroll_top;
            }); 
            // window.addEventListener
        }
        // if
    }    // ...your code here...

    document.addEventListener("click", function (event) {
        // if the clicked element isn't child of the navbar, you must close it if is open
        closeMenu();
    });
}

// Navbar shrink function
var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    let scroll = window.scrollY;

    if (!navbarCollapsible) {
        return;
    }
    if (scroll === 0) {
        navbarCollapsible.classList.remove('navbar-shrink')
    } else {
        navbarCollapsible.classList.add('navbar-shrink')
    }

    extraEvents(scroll);
};

function extraEvents(scroll) {
    if (scroll > getHeight() * 0.20 && extraContact == 0 && !isMenuTriggered) {
        contactMeForm();
        extraContact++;
    }
    else if (scroll > getHeight() * 0.7) {
        const gScriptExist = document.getElementById('g_translate');
        
        if (!gScriptExist && validLang.indexOf(lang) === -1) {
            const script = document.createElement('script');
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.id = 'g_translate';
            document.body.appendChild(script);
        }
        else {
            const gte = document.getElementById('google_translate_element');
            gte.style.display = 'none';
        }
    }
}

if (document.readyState !== "loading") {
    onReadyFreelancer(); // Or setTimeout(onReady, 0); if you want it consistently async
} else {
    document.addEventListener("DOMContentLoaded", onReadyFreelancer);
}