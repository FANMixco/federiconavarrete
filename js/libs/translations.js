let lang = "en-us";
let langLoc = "js/data/translations/";
const iframeElSalvador = `<iframe title='El Salvador Map' id='iframeElSalvador' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984252.4374393197!2d-90.05167866086293!3d13.749114461377241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6327a659640657%3A0x6f9a16eb98854832!2sEl+Salvador!5e0!3m2!1sen!2spl!4v1555793789038!5m2!1sen!2spl" class="previewerIframe" allowfullscreen></iframe>`;

$.getScript(`${langLoc}${lang}/generics.js`).done(function() {
    loadTranslations();
    $.getScript(`${langLoc}${lang}/basicInfo.js`).done(loadBasicInfo);
    $.getScript(`${langLoc}${lang}/hobbiesList.js`).done(loadHobbies);
    $.getScript(`${langLoc}${lang}/awardsList.js`).done(loadAwards);
    $.getScript(`${langLoc}${lang}/servicesList.js`).done(loadServices);
    $.getScript(`${langLoc}${lang}/techSkillsLists.js`).done(loadTechSkills);
    $.getScript(`${langLoc}${lang}/softSkillsLists.js`).done(loadSoftSkills);
    $.getScript(`${langLoc}${lang}/personalProjects.js`).done(loadPersonalProjects);
    $.getScript(`${langLoc}${lang}/presentationsLists.js`).done(loadVideosAndPresentations);
    $.getScript(`${langLoc}${lang}/organizedEvents.js`).done(loadOrganizedEvents);
    $.getScript(`${langLoc}${lang}/articlesList.js`).done(loadArticles);
    $.getScript(`${langLoc}${lang}/socialMediasLists.js`).done(loadSocialMedias);
    $.getScript(`${langLoc}${lang}/reviewsList.js`).done(loadReviews);
});

function loadReviews() {
    const { reviews, isVisible } = reviewsList;

    if (isVisible) {
        reviews.forEach(function(item, index) {

            let name = item.externalLink !== "" ? `<a href="${item.externalLink}" rel="noreferrer" target="_blank" class="text-danger">${item.name}</a>` : item.name;

            let active = item.isActive ? " active" : "";

            let currentReview = index + 1;

            let review = `<div class="carousel-item text-center${active}">
                <div class="img-box p-1 border rounded-circle m-auto">
                    <img loading="lazy" class="d-block w-100 rounded-circle" src="${item.img}" alt="review${currentReview} slide" />
                </div>
                <h5 class="mt-4 mb-0"><strong class="text-warning text-uppercase">${name}</strong></h5>
                <h6 class="text-white m-0">${item.title}</h6>
                <p class="m-0 pt-3 text-white">${item.shortReview}<a class="text-danger" data-toggle="modal" data-target="#review${currentReview}" href="#review${currentReview}">${genericTranslations.readMore}</a></p>
            </div>`;

            $("#divReviewsPreviews").append(review);

            let longReview = "";

            if (item.isPDF) {
                longReview = `<div class="picReviewers img-box p-1 border rounded-circle m-auto">
                <img class="d-block w-100 rounded-circle" loading="lazy" src="${item.img}" alt="review${currentReview} slide" />
                </div>
                <h5 class="mt-4 mb-0"><strong class="text-warning text-uppercase">${name}</strong></h5>
                <h6 class="text-dark m-0">${item.title}</h6>
                <p class="text-dark m-0 centerText">${item.date}</p>
                <div id="review${currentReview}PDF"></div>
                <div class="centerText">
                <a class="btn" target="_blank" href="${item.pdfLocation}">
                   <i class="fas fa-download mr-2"></i> ${genericTranslations.download}
                </a>
                </div>`;
            }
            else {
                longReview = `<div class="picReviewers img-box p-1 border rounded-circle m-auto">
                <img class="d-block w-100 rounded-circle" src="${item.img}" loading="lazy" alt="review${index + 1} slide" />
                </div>
                <h5 class="mt-4 mb-0"><strong class="text-warning text-uppercase">${name}</strong></h5>
                <p class="text-dark m-0">${item.title}</p>
                <h6 class="text-dark m-0 centerText">${item.date}</h6>
                <p class="m-0 pt-3 text-black">${item.review}</p>`;
            }

            $(`#divReview${currentReview}`).append(longReview);

            if (item.isPDF) {
                PDFObject.embed("/testimonials/20190603165400926.pdf", `#review${currentReview}PDF`);
    $('[data-toggle="tooltip"]').tooltip();
            }
        });
    }
    else {
        $("#divReviews").hide();
    }
}

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
        $("#spanMenu").html(`${genericTranslations.menu}&nbsp;<i class='fas fa-bars'></i>`);
        setTimeout(function() {
            $("#divSkillsContainer").css("background-color", "rgba(12,12,12,0.95)");
            $("#divSkillsContainer").css("padding-top", "15px");
            $("#divSkillsContainer").css("border-radius", "20px");
        }, 100);
    } else {
        $("#spanMenu").html("<i class='fas fa-bars'></i>");
        marginTop = -40;
        heightIFrame = 560;
    }
}

function setTranslation(id, text) {
    $(`${id}`).text(text);
}

function loadBasicInfo() {
    const { name, headline, headlineIntro, aboutDesc, favApp, telephone, email, skype } = basicInfo;

    $("#linkName").html(name);
    $("#hName").html(name);
    $("#hHeadline").html(headline);
    $("#hIntro").html(headlineIntro);

    aboutDesc.forEach(item => {
        $("#divAbout").append(`<div class="col-sm"><p class="lead">${item}</p></div>`);
    });

    if (favApp.isVisible) {
        $("#favApp").append(`<a class="btn btn-xl btn-outline-light" rel="noreferrer" target="_blank" href="${favApp.link}"><i class="fas fa-download mr-2"></i> ${favApp.title}</a>`);
    }
    else {
        $("#favApp").hide();
    }

    if (skype.isVisible) {
        $("#listContacts").prepend(`<li class="list-inline-item">${getImage(genericTranslations.skype, `skype:${skype.id}?call`, "fab fa-fw fa-skype", false)}</li>`);
    }

    if (telephone.isVisible) {
        $("#listContacts").prepend(`<li class="list-inline-item">${getImage(genericTranslations.telephone, `tel:${telephone.number}`, "fas fa-phone", false)}</li>`);
    }

    if (email.isVisible) {
        $("#listContacts").prepend(`<li class="list-inline-item">${getImage(genericTranslations.email, `mailto:${email.address}?subject=${email.subject}`, "fas fa-at", false)}</li>`);
    }
    
    $('[data-toggle="tooltip"]').tooltip();

    $("#linkContactMeAbout").click(function(e) {
        $("#contactMe").modal("show");
    });

    $("#aElSalvador").click(function(){
        if ($("#iframeElSalvador").length == 0)
            $("#divIframElSalvador").append(iframeElSalvador);
    });
}

function loadHobbies() {
    const { hobbies, isVisible } = hobbiesList;

    if (isVisible) {
        hobbies.forEach(item => {
            const btnOptional = item.isOpt ? " btnOptional" : "";
            $("#hobbiesList").append(`<li class="list-inline-item${btnOptional}">${getHobbyImg(item)}</li>`);
        });

        $("#hobbiesList").append(`<li class="list-inline-item" id='btnExtraHobbies'>
            <a href="#otherHobbies" class="btn btn-outline-light btn-social text-center rounded-circle" data-toggle="modal" data-target="#otherHobbies">
            <i class="fas fa-plus"></i>
            </a>
        </li>`);

        const hobbiesOthers = _.where(hobbies, { isOpt: true });

        hobbiesOthers.forEach(elem => {
            $("#optHobbies").append(`<li class="list-inline-item">${getHobbyImg(elem)}</li>`);
        });

        $('[data-toggle="tooltip"]').tooltip();

        let smallScreenMobileOS = WURFL.is_mobile && WURFL.form_factor === "Smartphone";

        if (!smallScreenMobileOS) {
            $("#btnExtraHobbies").hide();
            if (WURFL.is_mobile) {
                $(".btnOptional").hide();
                $("#btnExtraHobbies").show();
            }
        } else {
            $(".btnOptional").hide();
        }
    }
    else {
        $("#divHobbies").hide();
    }
}

function getHobbyImg(item) {
    let externalClass = "";

    if (item.externalClass) {
        externalClass = item.externalClass;
    }

    return getImage(item.title, "#", item.icon, false, item.isIcon, externalClass, true);
}

function loadServices() {
    const { services, isVisible } = servicesList;

    if (isVisible) {
        services.forEach(item => {
            let items = `<div class="col-lg-4 ml-auto"><p class="lead">`;
            item.forEach(elem => {
                let title = "";
                if (elem.link)
                    title = `<a href=${elem.link} target="_blank" class="text-warning">${elem.title}</a>`;
                else
                    title = elem.title;
                items += `<b>${title}</b><br /><br />`;
            });
            items = `${items.substring(0, items.length - 12)}</div>`;

            $("#servicesList").append(items);
        });
    }
    else {
        $("#divServices").hide();
    }
}

function loadAwards() {
    const { awards, isVisible } = awardsList;

    if (isVisible) {
        awards.forEach(item => {
            let items = `<div class="col-lg-4 ml-auto"><p class="lead">`;
            item.forEach(elem => {
                let title = "";
                if (elem.link)
                    title = `<a href=${elem.link} target="_blank" class="text-danger">${elem.title}</a>`;
                else
                    title = elem.title;
                items += `${title}<br /><br />`;
            });
            items = `${items.substring(0, items.length - 12)}</div>`;

            $("#awardsList").append(items);
        });
    }
    else {
        $("#divAwards").hide();
    }
}

function loadTechSkills() {
    loadSkills(techSkills, techSkillsOthers, "divTechSkills", "divTechSkillsOthers", "", "btnMoreTechSkills", "multiDev");
}

function loadSoftSkills() {
    loadSkills(softSkills, softSkillsOthers, "divSoftSkills", "divSoftSkillsOther", "-business", "btnMoreSoftSkills", "multiBS");
}

function loadPersonalProjects() {
    personalProjects.forEach(item => {
        let isActive = item.isActive ? " active" : "";

        let pp = `<div class="carousel-item${isActive}">
            <div class="carousel-video-inner">
            <iframe title="Timer" class="iVideos" src="https://www.youtube.com/embed/${item.youTubeID}"allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <h4 class="text-center text-uppercase text-secondary mb-0"><a href="${item.link}" rel="noreferrer" target="_blank">${item.title}</a>, ${item.timeFrame}</h4>
            </div>
        </div>`;

        $("#personalProjects").append(pp);
    });
}

function loadVideosAndPresentations() {
    loadVideos();
    loadPresentations();
}

function loadVideos() {
    const { presentations, isVisible } = presentationsVideos;

    if (isVisible) {
        presentations.forEach(item => {
            let video = `<div class="col-sm">
                      <iframe class="iVideos" src="https://www.youtube.com/embed/${item.youTubeID}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" loading="lazy" allowfullscreen></iframe>
                      <h4 class="text-center text-uppercase text-secondary mb-0">${item.title}</h4>
                   </div>`;
            $("#divVideos").append(video);
        });
    }
    else {
        $("#hPublicSpeaking,#divVideos").hide();
    }
}

function loadPresentations() {
    const { presentations, isVisible } = presentationsLinks;

    if (isVisible) {
        presentations.forEach(item => {
            let ppt = `<div class="col-sm">
                <a href="${item.link}" rel="noreferrer" target="_blank">
                    <img id="${item.imgID}" loading="lazy" class="img-fluid" alt="${item.title}" />
                </a>
                <h4 class="text-center text-uppercase text-secondary mb-0">${item.title}</h4>
            </div>`;
            $("#divPPTs").append(ppt);
            setImage(item.imgID, item.imgBasicName, imgLocPortfolio, item.imgFormat);
        });
    }
    else {
        $("#hPresentations,#divPPTs,#pPPTs").hide();
    }
}

function loadOrganizedEvents() {
    const { events, isVisible } = organizedEvents;

    if (isVisible) {
        events.forEach(item => {
            let event = `<div class="col-sm">
                <a href="${item.link}" rel="noreferrer" target="_blank">
                    <img loading="lazy" class="img-fluid" id="${item.imgID}" />
                </a>
                <h4 class="text-center text-uppercase text-secondary mb-0">${item.title}</h4>
            </div>`;
            $("#divEvents").append(event);
            setImage(item.imgID, item.imgBasicName, imgLocPortfolio, item.imgFormat);
        });
    }
    else {
        $("#divEvents").hide();
    }
}

function loadArticles() {
    const { articles, isVisible } = articlesList;

    if (isVisible) {
        articles.forEach(item => {
            let event = `<div class="col-sm">
                <a href="${item.link}" target="_blank" rel="noreferrer">
                    <img loading="lazy" class="img-fluid" id="${item.imgID}" alt="${item.title}" />
                </a>
                <h4 class="text-center text-uppercase text-secondary mb-0">${item.title}</h4>
            </div>`;
            $("#divArticles").append(event);
            setImage(item.imgID, item.imgBasicName, imgLocArticles, item.imgFormat);
        });
    }
    else {
        $("#articles").hide();
    }
}

function loadSocialMedias() {
    const { socialMedia, isVisible} = socialBasicList;

    if (isVisible) {
        socialMedia.forEach(item => {
            $("#socialMediaBasic").append(`<li class="list-inline-item">${getImage(item.title, item.link, item.icon, true, item.isIcon)}</li>`);
        });

        if (socialOthersList.isVisible) {
            $("#socialMediaBasic").append(`<li class="list-inline-item">
                <a href="#otherLocs" class="btn btn-outline-light btn-social text-center rounded-circle" data-toggle="modal" data-target="#otherLocs">
                <i class="fas fa-plus"></i>
                </a>
            </li>`);

            socialOthersList.socialMedia.forEach(elem => {
                let externalClass = "";

                if (elem.externalClass) {
                    externalClass = elem.externalClass;
                }

                $("#socialMediaOthers").append(`<li class="list-inline-item">${getImage(elem.title, elem.link, elem.icon, true, elem.isIcon,externalClass, false)}</li>`);
            });
        }
        $('[data-toggle="tooltip"]').tooltip();
    }
    else {
        $("#articles").hide();
    }
}

function getImage(title, link, icon, isTargetBlank, isIcon = true, classExternal = "", isIgnoredClick = false) {
    let targetBlank = isTargetBlank ? `target="_blank"` : "";
    let ignoreClick = isIgnoredClick ? "ignore-click" : "";
    let noreferrer = link == "#" ? rel="noreferrer" : "";
    let img = isIcon ? `<i class="${icon}"></i>` : `<img src="${icon}" loading="lazy" />`;

    return `<a data-toggle="tooltip" title="${title}" ${targetBlank} class="btn btn-outline-light btn-social text-center rounded-circle ${ignoreClick} ${classExternal}" href="${link}" ${noreferrer}>${img}</a>`;
}

function setImage(imgID, imgBasic, imgLoc, imgFormat) {
    switch (WURFL.form_factor) {
        case "Smartphone":
            $(`#${imgID}`).attr("src",`${imgLoc}${imgBasic}_small.${imgFormat}`);
            break;
        case "Tablet":
            $(`#${imgID}`).attr("src",`${imgLoc}${imgBasic}_medium.${imgFormat}`);
            break;
        default:
            $(`#${imgID}`).attr("src",`${imgLoc}${imgBasic}.${imgFormat}`);
            break;
    }
}

function loadSkills(skills, skillsOthers, divContainer, divOthersContainer, classCollapse, btnMore, itemCollapseID) {
    skills.forEach(item => {
        let items = `<div class="col"><p class="lead">`;
        item.forEach(elem => {
            items += `${elem}<br /><br />`;
        });
        items = `${items.substring(0, items.length - 12)}</p></div>`;

        $(`#${divContainer}`).prepend(items);
    });

    let arias = "";

    for (let i = 0; i < skillsOthers.length; i++){
        arias += `${itemCollapseID}${i} `;
    }

    $(`#${btnMore}`).attr("aria-controls", arias);

    skillsOthers.forEach(function(item, index) {
        let items = `<div class="col"><div class="collapse multi-collapse${classCollapse}" id="${itemCollapseID}${index}"><div class="card card-body mini-cards">`;
        item.forEach(elem => {
            items += `${elem}<br /><br />`;
        });
        items = `${items.substring(0, items.length - 12)}</div></div></div>`;

        $(`#${divOthersContainer}`).prepend(items);
    });
}