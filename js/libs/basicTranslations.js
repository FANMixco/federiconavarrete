var tErr1;

let language = window.navigator.userLanguage || window.navigator.language;
let lang = "en-us/min";
let langLoc = "js/data/translations/";
let extraContact = 0;
let isMenuTriggered = false;
let tagRegExp;
let currentLoc = '';

const lazyLoading = 'loading="lazy"';
const eClick = 'click';
const nVis = 'none';
const iconsPath = 'img/icons/website/';
const tCenter = "text-center";
const marginTop = 0;
const heightIFrame = 600;

const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "Tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "Smartphone";
    }
    return "Desktop";
};

const smallScreenMobileOS = deviceType() === "Smartphone";

lang = (language.includes('es')) ? "es-sv/min" : lang;

getScript(`${langLoc}${lang}/generics.js`)
.then(() => {
    loadTranslations();
    getScript(`${langLoc}${lang}/basicInfo.js`).then(() => { loadBasicInfo(); }).catch((e) => { console.error(e); });
})
.catch((e) => {
  console.error(e);
});

function loadTranslations() {
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

            btnFullScreen.addEventListener(eClick, function(e) {
                window.open(`${fURL}/${currentLoc}.html`);
            });
        });
    });

    if (!smallScreenMobileOS) {
        const btnPause = document.getElementById('spanMenu');

        btnPause.innerHTML = `${genericTranslations.menu}&nbsp;&nbsp;${getHMenu()}`;

        setTimeout(function() {
            const divSkillsContainer = document.getElementById('divSkillsContainer');

            divSkillsContainer.style.backgroundColor = "rgba(12,12,12,0.95)";
            divSkillsContainer.style.paddingTop = "15px";
            divSkillsContainer.style.borderRadius = "20px";
        }, 100);
    } else {
        const spanMenu = document.getElementById('spanMenu');

        spanMenu.innerHTML = getHMenu('style="margin-top:0px!important"');
    }
}

function setTranslation(elem, text) {
    [...document.querySelectorAll(elem)].forEach(function(element) {
        element.innerHTML = text;
    });
}

function closeMenu() {
    setTimeout(function() {
        if (document.getElementById("navbarResponsive").classList.contains("show")) {
            document.getElementById("menuExpander").click();
        }
    }, 500);
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
            if (!isMenuTriggered) {
                setTimeout(function() {
                    contactMeForm();
                }, 5000);
                isMenuTriggered = true;    
            }
        });
    });

    [...document.querySelectorAll('.mFix')].forEach(function(element) {
        element.addEventListener(eClick, function(e) {
            tErr1 = setTimeout(function(self) {
                self.click();
                clearTimeout(tErr1);
                closeMenu();
            }, 500, this);
        });
    });
    
    linkName.innerHTML = name;
    hName.innerHTML = name;
    hHeadline.innerHTML = headline;
    hIntro.innerHTML = headlineIntro;

    aboutDesc.forEach(item => {
        divAbout.innerHTML += `<div class="col-sm"><p class="lead">${item}</p></div>`;
    });

    if (favBook.isVisible) { 
        favBookDiv.innerHTML += getActionBtn(favBook.link, iconsPath, 'download', favBook.title, 'height="24" width="24"');
    }
    else {
        favBookDiv.style.display = nVis;
    }

    if (favPodcast.isVisible) {
        favPodcastDiv.innerHTML += getActionBtn(favPodcast.link, iconsPath, 'podcast-solid', favPodcast.title, ` style="height:24px;width:24px"`);
    }
    else {
        favPodcastDiv.style.display = nVis;
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
        gTitle.style.display = "block";
        iframeGeneric.innerHTML = getIframe('Federico Navarrete', 'https://www.youtube.com/embed/IcWZ962uYy0', ` class="previewerIframe" style='background: url("img/icons/loading.gif") center/7em no-repeat'`);
    });
}

function getHeight() {
    let body = document.body,
        html = document.documentElement;

    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight, body.getBoundingClientRect().height);
}

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;

    if (scroll > getHeight() * 0.20 && extraContact == 0 && !isMenuTriggered) {
        contactMeForm();
        extraContact++;
    }
    else if (scroll > getHeight() * 0.7) {
        const gScriptExist = document.getElementById('g_translate');
        
        if (!gScriptExist) {
            const script = document.createElement('script');
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.id = 'g_translate';
            document.body.appendChild(script);
        }
    }
});

function contactMeForm(e) {
    try {
        e.preventDefault();
    } catch { }
    if (document.getElementById("contactMeForm").innerHTML.trim().length == 0) {
        document.getElementById("contactMeForm").innerHTML += `<iframe title="contact me" src="pages/contact${language.includes('es') ? "_es" : ""}.html" height="${heightIFrame * 0.8}px" width="100%" frameborder="0" scrolling="yes" style="margin-top:${marginTop}px"></iframe>`;
    }

    try {
        let tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        let tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

        for (let i = 0; i < tooltipList.length; i++) {
            tooltipList[i].hide();
        }
    } catch { }

    let contactMe = new bootstrap.Modal(document.getElementById("contactMe"), {});
    contactMe.show();
    extraContact++;
}

function getImage(title, link, icon, isTargetBlank, isIcon = true, classExternal = "", isIgnoredClick = false, imgClass = "") {
    let targetBlank = isTargetBlank ? `target="_blank"` : "";
    let ignoreClick = isIgnoredClick ? "ignore-click" : "";
    let noreferrer = link !== "#" ? 'rel="noreferrer"' : "";
    let img = isIcon ? `<i class="${icon}"></i>` : `${getFinalImg('', imgClass, title, `src="${icon}"`)}`;

    return `<a data-bs-toggle="tooltip" title="${title}" ${targetBlank} class="btn btn-outline-light btn-social ${tCenter} rounded-circle ${ignoreClick} ${classExternal}" href="${link}" ${noreferrer}>${img}</a>`;
}

function getIframe(title, src, extras, fullscreen = 'allowfullscreen', lazy = lazyLoading) {
    return `<iframe title="${title}" src="${src}" ${extras} ${lazy} ${fullscreen}></iframe>`;
}

function getActionBtn(link, iconsPath, icon, title, extras = "") {
    return `<a class="btn btn-xl btn-outline-light btn-home" rel="noreferrer" target="_blank" href="${link}">${getFinalImg('', 'mr-2 btnIcons', 'download', `src="${iconsPath}${icon}.svg"  alt='download' ${lazyLoading} ${extras}`)}&nbsp;&nbsp;${title}</a>`;
}

function getInLineBtn(btnAction, action, icon, isTargetBlank = false) {
    return getInLi(getImage(btnAction, action, `${iconsPath}${icon}.svg`, isTargetBlank, false, "btn-footer", false, "iconFooter"));
}

function getInLi(body, extraCls = '', extras = '') {
    return `<li class="list-inline-item${extraCls}" ${extras}>${body}</li>`;
}

function getHMenu(extras = "") {
    return getFinalImg('', 'hMenu ml-2', 'menu', `src="${iconsPath}bars-solid.svg" height="13" width="11.2" ${extras}`);
}

function getFinalImg(id, imgCls, alt, extras, lLoading = lazyLoading) {
    let idT = (id != '') ? `id="${id}"` : '';
    let clsT = (imgCls != '') ? `class="${imgCls}"` : '';
    return `<img ${idT} ${lazyLoading} ${clsT} ${lLoading} ${extras} alt="${getCleanTitle(alt)}" />`
}

function getCleanTitle(alt) {
    tagRegExp = !(tagRegExp) ? new RegExp('<\s*[^>]*>', 'g') : tagRegExp;
    return alt.replace(tagRegExp, '');
}