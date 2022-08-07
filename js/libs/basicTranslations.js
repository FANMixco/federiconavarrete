let language = window.navigator.userLanguage || window.navigator.language;
let lang = "en-us/min";
let extraContact = 0;
const lazyLoading = `loading="lazy"`;

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
const eClick = 'click';
const nVis = 'none';

if (language.includes('es'))
    lang = "es-sv/min";

let langLoc = "js/data/translations/";

const iconsPath = 'img/icons/website/';

const marginTop = 0;
const heightIFrame = 600;

getScript(`${langLoc}${lang}/generics.js`)
.then(() => {
    loadTranslations();
    getScript(`${langLoc}${lang}/basicInfo.js`).then(() => { loadBasicInfo(); }).catch((e) => { console.error(e); });
})
.catch((e) => {
  console.error(e);
});

function loadTranslations() {
    const controlTranslation = [
        {
            "identifier": "#menuAbout",
            "value": genericTranslations.about
        },
        {
            "identifier": "#menuSkills",
            "value": genericTranslations.skills
        },
        {
            "identifier": "#menuProjects",
            "value": genericTranslations.projects
        },
        {
            "identifier": ".menuPresentations",
            "value": genericTranslations.presentations
        },
        {
            "identifier": ".menuArticles",
            "value": genericTranslations.articles
        },
        {
            "identifier": ".hMassMedia",
            "value": genericTranslations.massMedia
        },
        {
            "identifier": "#menuBooks",
            "value": genericTranslations.books
        },
        {
            "identifier": "#hAboutMe",
            "value": genericTranslations.aboutMe
        },
        {
            "identifier": "#hDownloadFavApp",
            "value": genericTranslations.downloadFavApp
        },
        {
            "identifier": "#hDownloadFavBook",
            "value": genericTranslations.getBook
        },
        {
            "identifier": "#hPodcast",
            "value": genericTranslations.hPodcast
        },
        {
            "identifier": "#hHobbies",
            "value": genericTranslations.hobbies
        },
        {
            "identifier": "#spanAwards",
            "value": genericTranslations.awards
        },
        {
            "identifier": "#spanServices",
            "value": genericTranslations.services
        },
        {
            "identifier": "#spanTechSkills",
            "value": genericTranslations.techSkills
        },
        {
            "identifier": "#spanTechSkills",
            "value": genericTranslations.techSkills
        },
        {
            "identifier": "#spanSoftSkills",
            "value": genericTranslations.softSkills
        },
        {
            "identifier": "#spanTestimonials",
            "value": genericTranslations.testimonials
        },
        {
            "identifier": "#hPersonalProjects",
            "value": genericTranslations.personalProjects
        },
        {
            "identifier": "#aAppsPreview",
            "value": genericTranslations.projectsGallery
        },
        {
            "identifier": ".spanProjectsGallery",
            "value": genericTranslations.projectsGallery
        },
        {
            "identifier": ".spanPrevious",
            "value": genericTranslations.previous
        },
        {
            "identifier": ".spanNext",
            "value": genericTranslations.next
        },
        {
            "identifier": ".btnMore",
            "value": genericTranslations.more
        },
        {
            "identifier": "#hPPTTile",
            "value": genericTranslations.pptsOrganizedEvents
        },
        {
            "identifier": "#hPPTTile",
            "value": genericTranslations.pptsOrganizedEvents
        },
        {
            "identifier": "#spanPS",
            "value": genericTranslations.publicSpeaking
        },
        {
            "identifier": "#spanYouTube",
            "value": genericTranslations.youTubeTraining
        },
        {
            "identifier": ".hPresentationsGallery",
            "value": genericTranslations.presentationsGallery
        },
        {
            "identifier": "#spanOE",
            "value": genericTranslations.organizedEvents
        },
        {
            "identifier": "#hRecommendedBooks",
            "value": genericTranslations.recommendedBooks
        },
        {
            "identifier": "#spanSalvadorean",
            "value": genericTranslations.mySalvadorean
        },
        {
            "identifier": "#hMoreWeb",
            "value": genericTranslations.moreWeb
        },
        {
            "identifier": "#hOtherHobbies",
            "value": genericTranslations.otherHobbies
        },
        {
            "identifier": "#contactMeFooter",
            "value": genericTranslations.contactMe
        },
        {
            "identifier": "#aroundWebFooter",
            "value": genericTranslations.aroundWeb
        },
        {
            "identifier": "#tmIntro",
            "value": genericTranslations.tStoriesBody
        },
        {
            "identifier": "#bookMsg1",
            "value": genericTranslations.bookMsg1
        },
        {
            "identifier": "#bookMsg2",
            "value": genericTranslations.bookMsg2
        },
        {
            "identifier": "#tmIntro",
            "value": genericTranslations.tStoriesBody
        },
        {
            "identifier": ".getBtnCopy",
            "value": genericTranslations.bookMsgGet
        },
        {
            "identifier": ".bookMsgGen",
            "value": genericTranslations.bookMsgGen
        },
        {
            "identifier": "#newsH4",
            "value": genericTranslations.news
        }
    ];

    [...document.querySelectorAll('button.btn-close')].forEach(function(element) {
        element.setAttribute("aria-label", genericTranslations.close);
    });

    controlTranslation.forEach(item => {
        setTranslation(item.identifier, item.value);
    });

    if (!smallScreenMobileOS) {
        const btnPause = document.getElementById('spanMenu');

        btnPause.innerHTML = `${genericTranslations.menu}&nbsp;&nbsp;<img src="${iconsPath}bars-solid.svg" alt='menu' class="hMenu ml-2" ${lazyLoading} />`;

        setTimeout(function() {
            const divSkillsContainer = document.getElementById('divSkillsContainer');

            divSkillsContainer.style.backgroundColor = "rgba(12,12,12,0.95)";
            divSkillsContainer.style.paddingTop = "15px";
            divSkillsContainer.style.borderRadius = "20px";
        }, 100);
    } else {
        const spanMenu = document.getElementById('spanMenu');

        spanMenu.innerHTML = `<img src="${iconsPath}bars-solid.svg" alt='menu' class="hMenu" style="margin-top:0px!important" ${lazyLoading} />`;
    }
}

function setTranslation(elem, text) {
    [...document.querySelectorAll(elem)].forEach(function(element) {
        element.innerHTML = text;
    });
}

function loadBasicInfo() {
    const { name, headline, headlineIntro, aboutDesc, favBook, favPodcast, telephone, email, skype } = basicInfo;

    const linkName = document.getElementById('linkName');
    const hName = document.getElementById('hName');
    const hHeadline = document.getElementById('hHeadline');
    const hIntro = document.getElementById('hIntro');
    const divAbout = document.getElementById('divAbout');
    const favBookDiv = document.getElementById('favBook');
    const favPodcastDiv = document.getElementById('favPodcast');
    
    linkName.innerHTML = name;
    hName.innerHTML = name;
    hHeadline.innerHTML = headline;
    hIntro.innerHTML = headlineIntro;

    aboutDesc.forEach(item => {
        divAbout.innerHTML += `<div class="col-sm"><p class="lead">${item}</p></div>`;
    });

    if (favBook.isVisible) { 
        favBookDiv.innerHTML += getActionBtn(favBook.link, iconsPath, 'download', favBook.title);
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

    if (scroll > getHeight() * 0.20 && extraContact == 0) {
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
    let imgClassName = imgClass == "" ? "" : `class='${imgClass}'`;
    let img = isIcon ? `<i class="${icon}"></i>` : `<img alt='${title}' src="${icon}" ${imgClassName} ${lazyLoading} />`;

    return `<a data-bs-toggle="tooltip" title="${title}" ${targetBlank} class="btn btn-outline-light btn-social text-center rounded-circle ${ignoreClick} ${classExternal}" href="${link}" ${noreferrer}>${img}</a>`;
}

function getIframe(title, src, extras, fullscreen = 'allowfullscreen', lazy = lazyLoading) {
    return `<iframe title="${title}" src="${src}" ${extras} ${lazy} ${fullscreen}></iframe>`;
}

function getActionBtn(link, iconsPath, icon, title, extras = "") {
    return `<a class="btn btn-xl btn-outline-light btn-home" rel="noreferrer" target="_blank" href="${link}"><img src="${iconsPath}${icon}.svg" class="mr-2 btnIcons" alt='download' ${lazyLoading} ${extras} />&nbsp;&nbsp;${title}</a>`;
}

function getInLineBtn(btnAction, action, icon) {
    return `<li class="list-inline-item">${getImage(btnAction, action, `${iconsPath}${icon}.svg`, false, false, "btn-footer", false, "iconFooter")}</li>`;
}