let lang = "en-us/min";
let langLoc = "js/data/translations/";
const iframeElSalvador = `<iframe title='El Salvador Map' id='iframeElSalvador' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984252.4374393197!2d-90.05167866086293!3d13.749114461377241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6327a659640657%3A0x6f9a16eb98854832!2sEl+Salvador!5e0!3m2!1sen!2spl!4v1555793789038!5m2!1sen!2spl" class="previewerIframe" allowfullscreen></iframe>`;
const iconsPath = 'img/icons/website/';

getScript(`${langLoc}${lang}/generics.js`)
.then(() => {
    loadTranslations();
    getScript(`${langLoc}${lang}/basicInfo.js`).then(() => { loadBasicInfo(); }).catch(() => { console.error('Could not load script'); });
})
.catch(() => {
  console.error('Could not load script');
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
        }
    ];

    $("button.close").attr("aria-label", genericTranslations.close);

    controlTranslation.forEach(item => {
        setTranslation(item.identifier, item.value);
    });

    let smallScreenMobileOS = WURFL.is_mobile && WURFL.form_factor === "Smartphone";

    if (!smallScreenMobileOS) {
        const btnPause = document.getElementById('spanMenu');

        btnPause.innerHTML = `${genericTranslations.menu}<img src="${iconsPath}bars-solid.svg" alt='menu' class="hMenu ml-2" loading="lazy" />`;

        setTimeout(function() {
            const divSkillsContainer = document.getElementById('divSkillsContainer');

            divSkillsContainer.style.backgroundColor = "rgba(12,12,12,0.95)";
            divSkillsContainer.style.paddingTop = "15px";
            divSkillsContainer.style.borderRadius = "20px";
        }, 100);
    } else {
        const spanMenu = document.getElementById('spanMenu');

        spanMenu.innerHTML = `<img src="${iconsPath}bars-solid.svg" alt='menu' class="hMenu" style="margin-top:0px!important" loading="lazy" />`;
    }
}

function setTranslation(id, text) {
    $(`${id}`).text(text);
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
        favBookDiv.innerHTML += `<a class="btn btn-xl btn-outline-light btn-home" id="aFav_${favBook.link}" data-toggle="modal" data-target="#${favBook.link}" href="#${favBook.link}"><img src="${iconsPath}download.svg" class="mr-2 btnIcons" loading="lazy" />&nbsp;${favBook.title}</a>`;
    }
    else {
        favBookDiv.style.display = "none";
    }

    if (favPodcast.isVisible) {
        favPodcastDiv.innerHTML += `<a class="btn btn-xl btn-outline-light btn-home" rel="noreferrer" target="_blank" href="${favPodcast.link}"><img src="${iconsPath}podcast-solid.svg" class="mr-2 btnIcons" style="height:24px;width:24px" loading="lazy" />&nbsp;${favPodcast.title}</a>`;
    }
    else {
        favPodcastDiv.style.display = "none";
    }

    if (skype.isVisible) {
        $("#listContacts").prepend(`<li class="list-inline-item">${getImage(genericTranslations.skype, `skype:${skype.id}?call`, `${iconsPath}skype.svg`, false, false, "btn-footer", false, "iconFooter")}</li>`);
    }

    if (telephone.isVisible) {
        $("#listContacts").prepend(`<li class="list-inline-item">${getImage(genericTranslations.telephone, `tel:${telephone.number}`, `${iconsPath}phone.svg`, false, false, "btn-footer", false, "iconFooter")}</li>`);
    }

    if (email.isVisible) {
        $("#listContacts").prepend(`<li class="list-inline-item">${getImage(genericTranslations.email, `mailto:${email.address}?subject=${email.subject}`, `${iconsPath}at.svg`, false, false, "btn-footer", false, "iconFooter")}</li>`);
    }
    
    $('[data-toggle="tooltip"]').tooltip();

    $("#linkContactMeAbout").on("click", function(e) {
        $("#contactMe").modal("show");
    });

    $("#aElSalvador").on("click", function(){
        if ($("#iframeElSalvador").length == 0)
            $("#divIframElSalvador").append(iframeElSalvador);
    });
}

function getImage(title, link, icon, isTargetBlank, isIcon = true, classExternal = "", isIgnoredClick = false, imgClass = "") {
    let targetBlank = isTargetBlank ? `target="_blank"` : "";
    let ignoreClick = isIgnoredClick ? "ignore-click" : "";
    let noreferrer = link == "#" ? rel="noreferrer" : "";
    let imgClassName = imgClass == "" ? "" : `class='${imgClass}'`;
    let img = isIcon ? `<i class="${icon}"></i>` : `<img src="${icon}" ${imgClassName} loading="lazy" />`;

    return `<a data-toggle="tooltip" title="${title}" ${targetBlank} class="btn btn-outline-light btn-social text-center rounded-circle ${ignoreClick} ${classExternal}" href="${link}" ${noreferrer}>${img}</a>`;
}