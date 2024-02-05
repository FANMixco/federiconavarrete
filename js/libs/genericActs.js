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

function getCard(link, icon, txtColor, title, cOption, iOption, iHeight, extras = '', hasLink = false, idL = '') {
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

function getActionBtn(link, iconsPath, icon, title) {
    return getFLink("btn btn-xl btn-outline-light btn-home", link, `${getFinalIcon(`${icon}`)}&nbsp;&nbsp;${title}`, `rel="noreferrer" target="_blank"`);
    //return getFLink("btn btn-xl btn-outline-light btn-home", link, `${getFinalImg('', 'mr-2 btnIcons', title, `src="${iconsPath}${icon}.svg" ${extras}`)}&nbsp;&nbsp;${title}`, `rel="noreferrer" target="_blank"`);
}

function getInLineBtn(btnAction, action, icon, isTargetBlank = false) {
    return getInLi(getImage(btnAction, action, `${icon}`, isTargetBlank, true, "btn-footer", false, "iconFooter"));
}

function getInLi(body, extraCls = '', extras = '') {
    return `<li class="list-inline-item${extraCls}" ${extras}>${body}</li>`;
}

function getHMenu(icon = 'bars-solid') {
    return getFinalIcon(icon);
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