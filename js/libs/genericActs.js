let tagRegExp;
let extraContact = 0;

const lazyLoading = 'loading="lazy"';
const eClick = 'click';
const nVis = 'd-none';
const tCenter = "text-center";
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
    const body = document.body,
        html = document.documentElement;

    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight, body.getBoundingClientRect().height);
}

function contactMeForm(e) {
    try {
        e.preventDefault();
    } catch { }
    const cMe = 'contactMe';
    if (document.getElementById(`${cMe}Form`).innerHTML.trim().length == 0) {
        document.getElementById(`${cMe}Form`).innerHTML += `<iframe title="contact me" id="${cMe}I" src="pages/contact${uLang.includes('es') ? "_es" : ""}.html" height="${heightIFrame * 0.8}px" width="100%" frameborder="0" scrolling="yes" style="margin-top:${marginTop}px"></iframe>`;
        iFrameHResize(`${cMe}I`);
    }

    const contactMe = new bootstrap.Modal(document.getElementById(cMe), {});
    contactMe.show();
    extraContact++;
}

function iFrameHResize(id, percentage = 0.7) {
    const landscape = window.matchMedia("(orientation: landscape)");
    const height = equalScreen ? document.documentElement.clientHeight * 0.7
                 : landscape.matches ? document.documentElement.clientHeight * percentage
                 : devicePortraitAndLong ? heightIFrame * 1.2
                 : heightIFrame * 0.8;

    document.getElementById(id).style.height = `${height}px`;
}

function getImage(title, link, icon, isTargetBlank, isIcon = true, classExternal = "", isIgnoredClick = false, imgClass = "", extras = '') {
    const targetBlank = isTargetBlank ? `target="_blank"` : "";
    const ignoreClick = isIgnoredClick ? "ignore-click" : "";
    const noreferrer = link !== "#" ? 'rel="noreferrer"' : "";
    const img = isIcon ? `<i class="icon-${icon}"></i>` : `${getFinalImg('', imgClass, title, `src="${icon}"`)}`;

    return getFLink(`btn btn-outline-light btn-social ${tCenter} rounded-circle ${ignoreClick} ${classExternal}`, link, img, `${extras} title="${title}" ${targetBlank} data-bs-toggle="tooltip" ${noreferrer}`);
}

function getIframe(title, src, extras, fullscreen = 'allowfullscreen', lazy = lazyLoading) {
    return `<iframe title="${title}" src="${src}" ${extras} ${lazy} ${fullscreen}></iframe>`;
}

function getFLink(cls, link, body, extras = '') {
    return `<a class='${cls}' href="${link}" ${extras}>${body}</a>`;
}

function getCard(link, icon, txtColor, title, cOption, iOption, iHeight, extras = '', hasLink = false, idL = '') {
    const idC = idL != '' ? `id='${idL}'` : '';
    const lStart = hasLink ? `<a href="${link}" ${idC} class='card-link ${txtColor}'>` : '';
    const lEnd = hasLink ? '</a>' : '';
    const style = (!extras) ? '' : `style="${extras}"`;

    return `${lStart}<div class="card card-ser ${cOption}" ${style}><div class="card-body text-center"><h5 class="card-title"><div class='${iOption} card-icon'>${getFinalIcon(icon, iHeight)}</div></h5><br /><h6 class="card-subtitle mb-2">${title}</h6></div></div>${lEnd}`;
}

function getActionBtn(link, icon, title) {
    return getFLink("btn btn-xl btn-outline-light btn-home", link, `${getFinalIcon(`${icon}`)}&nbsp;&nbsp;${title}`, `rel="noreferrer" target="_blank"`);
}

function getInLineBtn(btnAction, action, icon, isTargetBlank = false) {
    return getInLi(getImage(btnAction, action, `${icon}`, isTargetBlank, true, "btn-footer", false, "iconFooter"));
}

function getInLi(body, extraCls = '', extras = '') {
    return `<li class="list-inline-item${extraCls}" ${extras}>${body}</li>`;
}

function getHMenu(icon = 'bars-solid') {
    return getFinalIcon(icon);
}

function getFinalImg(id, imgCls, alt, extras, lLoading = lazyLoading) {
    const idT = (id != '') ? `id="${id}"` : '';
    const clsT = (imgCls != '') ? `class="${imgCls}"` : '';
    return `<img ${idT} ${clsT} ${lLoading} ${extras} alt="${getCleanTitle(alt)}" />`
}

function getFinalIcon(id, fontSize = '', extraCls = '') {
    const font = (fontSize) ? ` style="font-size: ${fontSize}px; max-height: ${fontSize}px;"` : '';
    return `<span class="icon-${id}${extraCls}"${font}></span>`;
}

function getCleanTitle(alt) {
    tagRegExp = !(tagRegExp) ? new RegExp('<\s*[^>]*>', 'g') : tagRegExp;
    return alt.replace(tagRegExp, '');
}

function hideToolTips() {
    try {
        let tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl)).forEach(tooltip => {
            tooltip.hide();
        });
    } catch { }
}

window.addEventListener("load", function() {
    if (window.matchMedia('(hover: hover)').matches) {
        hideToolTips();
    }
});