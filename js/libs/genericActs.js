const deviceType = () => {
    const ua = navigator.userAgent.toLowerCase();

    if (
        ua.match(/(tablet|ipad|playbook|silk|kindle fire)|(android(?!.*mobi))/i) !== null
    ) {
        return devs[1];
    } else if (
        ua.match(/watch\\b|wear os\\b|huawei watch|gt 2|galaxy watch/g) !== null
    ) {
        return devs[3];
    } else if (
        ua.match(/iphone|ipod/i) !== null ||
        ua.match(/mobile|android|ip(hone|od)|windows phone|iemobile|blackberry|silk-accelerated|(hpw|web)os|opera m(obi|ini)|tizen|harmonyos|kaios/) !== null
    ) {
        return devs[0];
    }

    return devs[2];
};

const urlB = 'https://',
    uLang = (window.navigator.userLanguage || window.navigator.language).split('-')[0],
    validLang = ['en', 'es', 'zh'],
    jsonLoc = `js/i18n/${((validLang.indexOf(uLang) === 1) ? uLang : 'en')}/min`,
    lazyLoading = 'loading="lazy"',
    eClick = 'click',
    nVis = 'd-none',
    tCenter = "text-center",
    marginTop = 0,
    heightIFrame = 600,
    devs = ["Smartphone", "Tablet", "Desktop", "Watch"],
    equalScreen = window.innerWidth == window.innerHeight,
    actualDev = deviceType(),
    smallScreenMobileOS = (actualDev === devs[0] || actualDev === devs[3]),
    smallScreen = smallScreenMobileOS || equalScreen;

let devicePortraitAndLong = (actualDev === devs[1] || actualDev === devs[2]) && window.innerHeight > window.innerWidth,
    tagRegExp,
    extraContact = 0,
    rotatedScreen = false;

function gId(id) {
    return document.getElementById(id);
}

function gAll(elem) {
    return document.querySelectorAll(elem);
}

function loadIframe(iframe, title, url, extras, fScreen = false) {
    gId(iframe).innerHTML = getIframe(title, url, extras, fScreen);
}

function dIframe(id, cls) {
    return `id="${id}" class="${cls}" style='background: url("img/icons/loading.gif") center/7em no-repeat'`
}

function contactMeForm(e) {
    try {
        e.preventDefault();
    } catch { }
    const cMe = 'contactMe',
        mForm = gId(`${cMe}Form`);
    if (mForm.innerHTML.trim().length == 0) {
        mForm.innerHTML = getIframe('contact me', `pages/contact.html?lang=${uLang}`, `id="${cMe}I" height="${heightIFrame * 0.8}px" width="100%" frameborder="0" scrolling="yes" style="margin-top:${marginTop}px"`);
        iFrameHResize(`${cMe}I`, `${cMe}Form`);
    }

    const contactMe = new bootstrap.Modal(gId(cMe), {});
    contactMe.show();
    extraContact++;
}

function iFrameHResize(id, container) {
    setTimeout(() => {
        let oH = gId(container).offsetHeight;
        oH = (oH) === 0 ? 450 : oH;
        gId(id).style.height = `${devicePortraitAndLong ? heightIFrame * 1.2 : oH - ((smallScreen && window.innerWidth > window.innerHeight) ? 32 : 0)}px`;    
    }, 250);
}

function getImage(title, link, icon, isTargetBlank, isIcon = true, classExternal = "", isIgnoredClick = false, imgClass = "", extras = '') {
    return getFLink(`btn btn-outline-light btn-social ${tCenter} rounded-circle ${isIgnoredClick ? "ignore-click" : ""} ${classExternal}`, link, isIcon ? `<i class="icon-${icon}"></i>` : `${getFinalImg('', imgClass, title, `src="${icon}"`)}`, `${extras} title="${title}" ${isTargetBlank ? `target="_blank"` : ""} ${link !== "#" ? 'rel="noreferrer"' : ""}`);
}

function getIframe(title, src, extras, fullscreen, lazy = lazyLoading) {
    return `<iframe title="${title}" src="${src}" ${extras} ${lazy} ${fullscreen ? 'allowfullscreen' : ''}></iframe>`;
}

function getFLink(cls, link, body, extras = '') {
    return `<a class='${cls}' href="${link}" ${extras}>${body}</a>`;
}

function getInLi(body, extraCls = '', extras = '') {
    return `<li class="list-inline-item${extraCls}" ${extras}>${body}</li>`;
}

function getFinalIcon(id, fontSize = '', extraCls = '') {
    return `<span class="icon-${id}${extraCls}"${(fontSize) ? ` style="font-size: ${fontSize}px;"` : ''}></span>`;
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (e) {
        console.error(e);
    }
}