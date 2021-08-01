getScript(`${langLoc}${lang}/hobbiesList.js`) .then(() => { loadHobbies(); }).catch(() => { console.error('Could not load script'); });

getScript(`${langLoc}${lang}/awardsList.js`).then(() => { loadAwards(); }).catch(() => { console.error('Could not load script'); });

getScript(`${langLoc}${lang}/servicesList.js`).then(() => { loadServices(); }).catch(() => { console.error('Could not load script'); });

getScript(`${langLoc}${lang}/techSkillsLists.js`)
.then(() => { loadTechSkills(); }).catch(() => { console.error('Could not load script'); });

getScript(`${langLoc}${lang}/softSkillsLists.js`).then(() => { loadSoftSkills(); }).catch(() => { console.error('Could not load script'); });

getScript(`${langLoc}${lang}/personalProjects.js`).then(() => { loadPersonalProjects(); }).catch(() => { console.error('Could not load script'); });

getScript(`${langLoc}${lang}/presentationsLists.js`).then(() => { loadVideosAndPresentations(); }).catch(() => { console.error('Could not load script'); });

getScript(`${langLoc}${lang}/organizedEvents.js`).then(() => { loadOrganizedEvents(); }).catch(() => { console.error('Could not load script'); });

getScript(`${langLoc}${lang}/articlesList.js`).then(() => { loadArticles(); }).catch(() => { console.error('Could not load script'); });

getScript(`${langLoc}${lang}/newsArticleList.js`).then(() => { loadNewsArticles(); }).catch(() => { console.error('Could not load script'); });

getScript(`${langLoc}${lang}/socialMediasLists.js`).then(() => { loadSocialMedias(); }).catch(() => { console.error('Could not load script'); });

getScript(`${langLoc}${lang}/reviewsList.js`).then(() => { loadReviews(); }).catch(() => { console.error('Could not load script'); });

function loadReviews() {
    const { reviews, isVisible } = reviewsList;

    if (isVisible) {
        const divReviewsPreviews = document.getElementById('divReviewsPreviews');
        let currentDivReview;

        reviews.forEach(function(item, index) {

            let name = item.externalLink !== "" ? `<a href="${item.externalLink}" rel="noreferrer" target="_blank" class="text-warning">${item.name}</a>` : item.name;

            let active = item.isActive ? " active" : "";

            let currentReview = index + 1;

            let review = `<div class="carousel-item text-center${active}">
                <div class="img-box p-1 border rounded-circle m-auto">
                    <img loading="lazy" class="d-block w-100 rounded-circle" src="${item.img}" alt="review${currentReview} slide" />
                </div>
                <h5 class="mt-4 mb-0"><strong class="text-material-orange text-uppercase">${name}</strong></h5>
                <h6 class="text-white m-0">${item.title}</h6>
                <p class="m-0 pt-3 text-white">${item.shortReview}<a class="text-material-link" data-toggle="modal" data-target="#review${currentReview}" href="#review${currentReview}">${genericTranslations.readMore}</a></p>
            </div>`;

            divReviewsPreviews.innerHTML += review;

            let longReview = "";

            if (item.isPDF) {
                longReview = `<div class="picReviewers img-box p-1 border rounded-circle m-auto">
                <img class="d-block w-100 rounded-circle" loading="lazy" src="${item.img}" alt="review${currentReview} slide" />
                </div>
                <h5 class="mt-4 mb-0"><strong class="text-material-orange text-uppercase">${name}</strong></h5>
                <h6 class="text-dark m-0">${item.title}</h6>
                <p class="text-dark m-0 centerText">${item.date}</p>
                <div id="review${currentReview}PDF"></div>
                <div class="centerText">
                <a class="btn btn btn-outline-dark" target="_blank" href="${item.pdfLocation}">
                <img src="${iconsPath}download.svg" alt="download" style="filter: invert(0)!important" class="mr-2 btnIcons" loading="lazy" />&nbsp;${genericTranslations.download}
                </a>
                </div>`;
            }
            else {
                longReview = `<div class="picReviewers img-box p-1 border rounded-circle m-auto">
                <img class="d-block w-100 rounded-circle" src="${item.img}" loading="lazy" alt="review${index + 1} slide" />
                </div>
                <h5 class="mt-4 mb-0"><strong class="text-material-orange text-uppercase">${name}</strong></h5>
                <p class="text-dark m-0">${item.title}</p>
                <h6 class="text-dark m-0 centerText">${item.date}</h6>
                <p class="m-0 pt-3 text-black">${item.review}</p>`;
            }

            let divTmpReviews = document.getElementById(`divReview${currentReview}`);

            divTmpReviews.innerHTML += longReview;

            if (item.isPDF) {
                PDFObject.embed("/testimonials/references.pdf", `#review${currentReview}PDF`);
                $('[data-toggle="tooltip"]').tooltip();
            }
        });
    }
    else {
        const divReviews = document.getElementById("divReviews");
        divReviews.style.display = "none";
    }
}

function loadHobbies() {
    const { hobbies, isVisible } = hobbiesList;

    if (isVisible) {
        const hobbiesList = document.getElementById('hobbiesList');

        hobbies.forEach(item => {
            let btnOptional = item.isOpt ? " btnOptional" : "";

            hobbiesList.innerHTML += `<li class="list-inline-item${btnOptional}">${getHobbyImg(item)}</li>`;
        });

        hobbiesList.innerHTML += `<li class="list-inline-item" id='btnExtraHobbies'>
            <a href="#otherHobbies" class="btn btn-outline-light btn-social text-center rounded-circle externalImg" data-toggle="modal" data-target="#otherHobbies">
            <img src="${iconsPath}plus.svg" alt="extra" loading="lazy" />
            </a>
        </li>`;

        const hobbiesOthers = _.where(hobbies, { isOpt: true });

        const optHobbies = document.getElementById('optHobbies');
        hobbiesOthers.forEach(elem => {
            optHobbies.innerHTML += `<li class="list-inline-item">${getHobbyImg(elem)}</li>`;
        });

        $('[data-toggle="tooltip"]').tooltip();

        $('[data-toggle="tooltip"]').on("click", function(e){
            e.preventDefault();
        });
    
        let smallScreenMobileOS = WURFL.is_mobile && WURFL.form_factor === "Smartphone";

        if (!smallScreenMobileOS) {
            const btnExtraHobbies = document.getElementById("btnExtraHobbies");
            btnExtraHobbies.style.display = "none";

            if (WURFL.is_mobile) {
                $(".btnOptional").hide();
                btnExtraHobbies.style.display = "block";
            }
        } else {
            $(".btnOptional").hide();
        }
    }
    else {
        const divHobbies = document.getElementById("divHobbies");
        divHobbies.style.display = "none";
    }
}

function getHobbyImg(item) {
    let externalClass = "";

    if (item.externalClass) {
        externalClass = item.externalClass;
    }

    return getImage(item.title, "#", `${iconsPath}${item.icon}.svg`, false, item.isIcon, externalClass, true);
}

function loadServices() {
    const { services, isVisible } = servicesList;

    if (isVisible) {
        const servicesList = document.getElementById('servicesList');
        services.forEach(item => {
            let items = `<div class="col-lg-4 ml-auto"><p class="lead">`;
            item.forEach(elem => {
                let title = "";
                if (elem.link)
                    title = `<a style='width: 100%; font-weight: bold' href=${elem.link} target="_blank" class="btn btn-light"><img src='${iconsPath}${elem.icon}.svg' alt='${elem.title}' style='height:24px;width:24px' loading="lazy" class='mr-2' />${elem.title}</a>`;
                else
                    title = `<b>${elem.title}</b>`;
                items += `<span>${title}</span><br /><br />`;
            });
            items = `${items.substring(0, items.length - 12)}</div>`;

            servicesList.innerHTML += items;
        });
    }
    else {
        const divServices = document.getElementById('divServices');
        divServices.style.display = "none";
    }
}

function loadAwards() {
    const { awards, isVisible } = awardsList;

    if (isVisible) {
        const awardsList = document.getElementById('awardsList');
        awards.forEach(item => {
            let items = `<div class="col-lg-4 ml-auto"><p class="lead">`;
            item.forEach(elem => {
                let title = "";
                if (elem.link)
                    title = `<a style='width: 100%; font-weight: bold' rel="noopener" href=${elem.link} target="_blank" class="btn btn-warning">${elem.title}</a>`;
                else
                    title = `<button style='width: 100%; font-weight: bold' type="button" class="btn btn-light">${elem.title}</button>`;
                items += `${title}<br /><br />`;
            });
            items = `${items.substring(0, items.length - 12)}</div>`;

            awardsList.innerHTML += items;
        });
    }
    else {
        const divAwards = document.getElementById('divAwards');
        divAwards.style.display = "none";
    }
}

function loadTechSkills() {
    loadSkills(techSkills, techSkillsOthers, "divTechSkills", "divTechSkillsOthers", "", "btnMoreTechSkills", "multiDev");
}

function loadSoftSkills() {
    loadSkills(softSkills, softSkillsOthers, "divSoftSkills", "divSoftSkillsOther", "-business", "btnMoreSoftSkills", "multiBS");
}

function loadPersonalProjects() {
    const personalProjectsDiv = document.getElementById('personalProjects');
    personalProjects.forEach(item => {
        let isActive = item.isActive ? " active" : "";

        let pp = `<div class="carousel-item${isActive}">
            <div class="carousel-video-inner">
            <iframe class="iVideos" title="${item.title}" src="https://www.youtube.com/embed/${item.youTubeID}"allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
            <h4 class="text-center text-uppercase text-secondary mb-0"><a href="${item.link}" rel="noreferrer" target="_blank">${item.title}</a>, ${item.timeFrame}</h4>
            </div>
        </div>`;

        personalProjectsDiv.innerHTML += pp;
    });
}

function loadVideosAndPresentations() {
    loadVideos();
    loadPresentations();
}

function loadVideos() {
    const { presentations, isVisible } = presentationsVideos;

    if (isVisible) {
        const divVideos = document.getElementById('divVideos');
        presentations.forEach(item => {
            let video = `<div class="col-sm">
                      <iframe class="iVideos" title="${item.title}" src="https://www.youtube.com/embed/${item.youTubeID}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" loading="lazy" allowfullscreen></iframe>
                      <h4 class="text-center text-uppercase text-secondary mb-0">${item.title}</h4>
                   </div>`;
            divVideos.innerHTML += video;
        });
    }
    else {
        const hPublicSpeaking = document.getElementById('hPublicSpeaking');
        hPublicSpeaking.style.display = "none";

        const divVideos = document.getElementById('divVideos');
        divVideos.style.display = "none";
    }
}

function loadPresentations() {
    const { presentations, isVisible } = presentationsLinks;

    if (isVisible) {
        const divPPTs = document.getElementById('divPPTs');
        presentations.forEach(item => {
            let ppt = `<div class="col-sm">
                <a href="${item.link}" rel="noreferrer" target="_blank">
                    <img id="${item.imgID}" loading="lazy" class="img-fluid" alt="${item.title}" />
                </a>
                <h4 class="text-center text-uppercase text-secondary mb-0">${item.title}</h4>
            </div>`;
            divPPTs.innerHTML += ppt;
            setImage(item.imgID, item.imgBasicName, imgLocPortfolio, item.imgFormat);
        });
    }
    else {
        const hPresentations = document.getElementById('hPresentations');
        hPresentations.style.display = "none";

        const divPPTs = document.getElementById('divPPTs');
        divPPTs.style.display = "none";

        const pPPTs = document.getElementById('pPPTs');
        pPPTs.style.display = "none";
    }
}

function loadOrganizedEvents() {
    const { events, isVisible } = organizedEvents;

    const divEvents = document.getElementById('divEvents');
    if (isVisible) {
        events.forEach(item => {
            let event = `<div class="col-sm">
                <a href="${item.link}" rel="noreferrer" target="_blank">
                    <img alt='events' loading="lazy" class="img-fluid" id="${item.imgID}" />
                </a>
                <h4 class="text-center text-uppercase text-secondary mb-0">${item.title}</h4>
            </div>`;
            divEvents.innerHTML += event;
            setImage(item.imgID, item.imgBasicName, imgLocPortfolio, item.imgFormat);
        });
    }
    else {
        divEvents.style.display = "none";
    }
}

function loadArticles() {
    const { articles, isVisible } = articlesList;

    if (isVisible) {
        const divArticles = document.getElementById('divArticles');
        articles.forEach(item => {
            let event = `<div class="col-sm">
                <a href="${item.link}" target="_blank" rel="noreferrer">
                    <img loading="lazy" class="img-fluid" id="${item.imgID}" alt="${item.title}" />
                </a>
                <h4 class="text-center text-uppercase text-secondary mb-0">${item.title}</h4>
            </div>`;
            divArticles.innerHTML += event;
            setImage(item.imgID, item.imgBasicName, imgLocArticles, item.imgFormat);
        });
    }
    else {
        const articlesDiv = document.getElementById('articlesDiv');
        articlesDiv.style.display = "none";
    }
}

function loadNewsArticles() {
    const { articles, isVisible } = newsArticlesList;

    if (isVisible) {
        const divMMArticles = document.getElementById('divMMArticles');
        articles.forEach(item => {
            let event = `<div class="col-sm">
                <a href="${item.link}" target="_blank" rel="noreferrer">
                    <img loading="lazy" class="img-fluid" id="${item.imgID}" alt="${item.title}" />
                </a>
                <h4 class="text-center text-uppercase text-secondary mb-0">${item.title}</h4>
            </div>`;
            divMMArticles.innerHTML += event;
            setImage(item.imgID, item.imgBasicName, imgLocArticles, item.imgFormat);
        });
    }
    else {
        const newsArticlesDiv = document.getElementById('newsArticles');
        newsArticlesDiv.style.display = "none";
    }
}

function loadSocialMedias() {
    const { socialMedia, isVisible} = socialBasicList;

    if (isVisible) {
        const socialMediaBasic = document.getElementById('socialMediaBasic');
        socialMedia.forEach(item => {
            socialMediaBasic.innerHTML += `<li class="list-inline-item">${getImage(item.title, item.link, `${iconsPath}${item.icon}.svg`, true, false, "btn-footer", false, "iconFooter")}</li>`;
        });

        if (socialOthersList.isVisible) {
            $("#socialMediaBasic").append(`<li class="list-inline-item">
                <a href="#otherLocs" class="btn btn-outline-light btn-social text-center rounded-circle btn-footer" data-toggle="modal" data-target="#otherLocs">
                <img src="${iconsPath}plus.svg" alt="extra" class="iconFooter btn-footer" loading="lazy" />
                </a>
            </li>`);

            const socialMediaOthers = document.getElementById('socialMediaOthers');
            socialOthersList.socialMedia.forEach(elem => {
                let externalClass = "";

                if (elem.externalClass) {
                    externalClass = elem.externalClass;
                }

                socialMediaOthers.innerHTML += `<li class="list-inline-item">${getImage(elem.title, elem.link, `${iconsPath}${elem.icon}.svg`, true, false, "btn-footer", false, "iconFooter")}</li>`;
            });
        }
        $('[data-toggle="tooltip"]').tooltip();
    }
    else {
        const aroundWeb = document.getElementById('aroundWeb');
        aroundWeb.style.display = "none";
    }
}

function setImage(imgID, imgBasic, imgLoc, imgFormat) {
    let imgTemp = document.getElementById(imgID);
    switch (WURFL.form_factor) {
        case "Smartphone":
            imgTemp.src = `${imgLoc}${imgBasic}_small.${imgFormat}`;
            break;
        case "Tablet":
            imgTemp.src = `${imgLoc}${imgBasic}_medium.${imgFormat}`;
            break;
        default:
            imgTemp.src = `${imgLoc}${imgBasic}.${imgFormat}`;
            break;
    }
}

function loadSkills(skills, skillsOthers, divContainer, divOthersContainer, classCollapse, btnMore, itemCollapseID) {
    skills.forEach(item => {
        let items = `<div class="col-sm"><p class="lead">`;
        item.forEach(elem => {
            items += `${elem}<br /><br />`;
        });
        items = `${items.substring(0, items.length - 12)}</p></div>`;

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
        let items = `<div class="col-sm"><div class="collapse multi-collapse${classCollapse}" id="${itemCollapseID}${index}"><div class="card card-body mini-cards">`;
        item.forEach(elem => {
            items += `${elem}<br /><br />`;
        });
        items = `${items.substring(0, items.length - 12)}</div></div></div>`;

        divOthersContainerDiv.innerHTML = items + divOthersContainerDiv.innerHTML;
    });
}