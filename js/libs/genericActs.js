let tagRegExp;
let extraContact = 0;
let isMenuTriggered = false;

const lazyLoading = 'loading="lazy"';
const eClick = 'click';
const nVis = 'none';
const tCenter = "text-center";
const iconsPath = 'img/icons/website/';
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

    return getFLink(`btn btn-outline-light btn-social ${tCenter} rounded-circle ${ignoreClick} ${classExternal}`, link, img, `title="${title}" ${targetBlank} data-bs-toggle="tooltip" ${noreferrer}`);
}

function getIframe(title, src, extras, fullscreen = 'allowfullscreen', lazy = lazyLoading) {
    return `<iframe title="${title}" src="${src}" ${extras} ${lazy} ${fullscreen}></iframe>`;
}

function getFLink(cls, link, body, extras = '') {
    return `<a class='${cls}' href="${link}" ${extras}>${body}</a>`;
}

function getActionBtn(link, iconsPath, icon, title, extras = "") {
    return getFLink("btn btn-xl btn-outline-light btn-home", link, `${getFinalImg('', 'mr-2 btnIcons', title, `src="${iconsPath}${icon}.svg" ${extras}`)}&nbsp;&nbsp;${title}`, `rel="noreferrer" target="_blank"`);
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
    return `<img ${idT} ${clsT} ${lLoading} ${extras} alt="${getCleanTitle(alt)}" />`
}

function getCleanTitle(alt) {
    tagRegExp = !(tagRegExp) ? new RegExp('<\s*[^>]*>', 'g') : tagRegExp;
    return alt.replace(tagRegExp, '');
}