let totalServices = 0;
const bookEdition = 'second;'

window.addEventListener('DOMContentLoaded', (event) => {
    loadMainImage();

    getScript(`${langLoc}${lang}/hobbiesList.js`) .then(() => { loadHobbies(); }).catch((e) => { console.error(e); });

    getScript(`${langLoc}${lang}/awardsList.js`).then(() => { loadAwards(); }).catch((e) => { console.error(e); });

    getScript(`${langLoc}${lang}/servicesList.js`).then(() => { loadServices(); }).catch((e) => { console.error(e); });

    getScript(`${langLoc}${lang}/techSkillsLists.js`)
    .then(() => { loadTechSkills(); }).catch((e) => { console.error(e); });

    getScript(`${langLoc}${lang}/softSkillsLists.js`).then(() => { loadSoftSkills(); }).catch((e) => { console.error(e); });

    getScript(`${langLoc}${lang}/personalProjects.js`).then(() => { loadPersonalProjects(); }).catch((e) => { console.error(e); });

    getScript(`${langLoc}${lang}/presentationsLists.js`).then(() => { loadVideosAndPresentations(); }).catch((e) => { console.error(e); });

    getScript(`${langLoc}${lang}/organizedEvents.js`).then(() => { loadOrganizedEvents(); }).catch((e) => { console.error(e); });

    getScript(`${langLoc}${lang}/articlesList.js`).then(() => { loadArticles(); }).catch((e) => { console.error(e); });

    getScript(`${langLoc}${lang}/newsArticleList.js`).then(() => { loadNewsArticles(); }).catch((e) => { console.error(e); });

    getScript(`${langLoc}${lang}/socialMediasLists.js`).then(() => { loadSocialMedias(); }).catch((e) => { console.error(e); });

    getScript(`${langLoc}${lang}/reviewsList.js`).then(() => { loadReviews(); }).catch((e) => { console.error(e); });

    setTimeout(function() {
        addIFrameModal();
    }, 1000);
});

function loadMainImage() {
    try {
        let size = WURFL.form_factor == "Smartphone" ? "_small" : WURFL.form_factor == "Tablet" ? "_medium" : "";
        const imgProfile = document.getElementById('imgProfile');

        imgProfile.src = `img/photos/profile${size}.jpg`;
        imgProfile.setAttribute("loading", "lazy");

        imgProfile.style.display = "";
        imgProfile.style.display = "block";
    }
    catch (e) { console.error(e); }
}

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
                <p class="m-0 pt-3 text-white">${item.shortReview}<a class="text-material-link" data-bs-toggle="modal" data-target="#review${currentReview}" href="#review${currentReview}">${genericTranslations.readMore}</a></p>
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
            <a href="#otherHobbies" class="btn btn-outline-light btn-social text-center rounded-circle externalImg" data-bs-toggle="modal" data-target="#otherHobbies">
            <img src="${iconsPath}plus.svg" alt="extra" loading="lazy" />
            </a>
        </li>`;

        const hobbiesOthers = _.where(hobbies, { isOpt: true });

        const optHobbies = document.getElementById('optHobbies');
        hobbiesOthers.forEach(elem => {
            optHobbies.innerHTML += `<li class="list-inline-item">${getHobbyImg(elem)}</li>`;
        });

        [...document.querySelectorAll('.ignore-click')].forEach(function(element) {
            element.addEventListener("click", function(e) {
                e.preventDefault();
            });
        });

        document.getElementById("linkContactMe").addEventListener("click", function(e) {
            e.preventDefault();
        });
    
        let smallScreenMobileOS = WURFL.is_mobile && WURFL.form_factor === "Smartphone";

        if (!smallScreenMobileOS) {
            const btnExtraHobbies = document.getElementById("btnExtraHobbies");
            btnExtraHobbies.style.display = "none";

            if (WURFL.is_mobile) {
                const bntOpt = document.getElementsByClassName('.btnOptional');
                bntOpt.style.display = "none;"

                btnExtraHobbies.style.display = "block";
            }
        } else {
            const bntOpt = document.getElementsByClassName('.btnOptional');
            bntOpt.style.display = "none;"
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
            let items = `<div class="col-lg ml-auto"><p class="lead">`;
            item.forEach(elem => {
                let title = "";
                if (elem.link)
                    title = `<a id="service${totalServices}" style='width: 100%; font-weight: bold' href=${elem.link} target="_blank" class="btn btn-light serviceLink" rel="noreferrer"><img src='${iconsPath}${elem.icon}.svg' alt='${elem.title}' style='height:24px;width:24px' loading="lazy" class='mr-2' />&nbsp;&nbsp;${elem.title}</a>`;
                else
                    title = `<b>${elem.title}</b>`;
                items += `<span>${title}</span><br /><br />`;
                totalServices++;
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

function addIFrameModal() {
    for (let serv = 0; serv < totalServices; serv++) {
        let cService = document.getElementById(`service${serv}`);
        cService.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById("serviceForm").innerHTML = `<iframe src="${cService.href}" height="${heightIFrame * 0.8}px" width="100%" frameborder="0" scrolling="yes" style="margin-top:${marginTop}px"></iframe>`;
        
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
            <lite-youtube style="margin: auto" class="iVideos" videoid="${item.youTubeID}" playlabel="${item.title}"></lite-youtube>

            <h4 class="text-center text-uppercase text-secondary mb-0"><a class="text-material-link-dark" href="${item.link}" rel="noreferrer" target="_blank">${item.title}</a>, ${item.timeFrame}</h4>
            </div>
        </div>`;

        personalProjectsDiv.innerHTML += pp;
    });
}

function loadVideosAndPresentations() {
    loadVideos();
    loadYouTubeVideos();
    loadPresentations();
}

function loadVideos() {
    const { presentations, isVisible } = presentationsVideos;

    const divVideos = document.getElementById('divVideos');
    if (isVisible) {
        let count = 0;
        presentations.forEach(item => {
            let video = `<div class="col-sm">
                        <lite-youtube style="margin: auto" class="iVideos" videoid="${item.youTubeID}" playlabel="${item.title}"></lite-youtube>
                      <h4 class="text-center text-uppercase text-secondary mb-0">${item.title}</h4>
                   </div>`;
            divVideos.innerHTML += video;
            if (count === 0) {
                divVideos.innerHTML += '<div class="w-100"></div>';
            }
            count++;
        });
    }
    else {
        const hPublicSpeaking = document.getElementById('hPublicSpeaking');
        hPublicSpeaking.style.display = "none";

        divVideos.style.display = "none";
    }
}

function loadYouTubeVideos() {
    const { presentations, isVisible } = youtubeTrainings;

    const divYouTubeVideos = document.getElementById('divYouTubeVideos');
    if (isVisible) {
        let count = 0;
        presentations.forEach(item => {
            let video = `<div class="col-sm">
                        <lite-youtube style="margin: auto" class="iVideos" videoid="${item.youTubeID}" playlabel="${item.title}"></lite-youtube>
                      <h4 class="text-center text-uppercase text-secondary mb-0">${item.title}</h4>
                   </div>`;
            divYouTubeVideos.innerHTML += video;
            if (count === 0) {
                divYouTubeVideos.innerHTML += '<div class="w-100"></div>';
            }
            count++;
        });
    }
    else {
        const hYouTubeTraining = document.getElementById('hYouTubeTraining');
        hYouTubeTraining.style.display = "none";

        divYouTubeVideos.style.display = "none";
    }
}

function loadPresentations() {
    const { presentations, isVisible } = presentationsLinks;

    const divPPTs = document.getElementById('divPPTs');
    if (isVisible) {
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
                    <h4 class="text-center text-uppercase text-secondary mb-0">${item.title}</h4>
                </a>
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
            let sBasic = document.getElementById("socialMediaBasic");

            sBasic.innerHTML += `<li class="list-inline-item">
                <a href="#otherLocs" class="btn btn-outline-light btn-social text-center rounded-circle btn-footer" data-bs-toggle="modal" data-target="#otherLocs">
                <img src="${iconsPath}plus.svg" alt="extra" class="iconFooter btn-footer" loading="lazy" />
                </a>
            </li>`;

            const socialMediaOthers = document.getElementById('socialMediaOthers');
            socialOthersList.socialMedia.forEach(elem => {
                let externalClass = "";

                if (elem.externalClass) {
                    externalClass = elem.externalClass;
                }

                socialMediaOthers.innerHTML += `<li class="list-inline-item">${getImage(elem.title, elem.link, `${iconsPath}${elem.icon}.svg`, true, false, "btn-footer", false, "iconFooter")}</li>`;
            });
        }
    }
    else {
        const aroundWeb = document.getElementById('aroundWeb');
        aroundWeb.style.display = "none";
    }
}

function setImage(imgID, imgBasic, imgLoc, imgFormat) {
    let imgBookSize = '';
    let imgSize = '';

    let imgTemp = document.getElementById(imgID);
    let divBook = document.getElementById("myBookDiv");
    divBook.style.display = 'none';

    let imgBook = document.getElementById("imgBook");
    let currentDate = new Date();
    let validDate = !((currentDate.getMonth() + 1 >= 7) && (currentDate.getFullYear() >= 2022) && (currentDate.getDate() >= 15));

    switch (WURFL.form_factor) {
        case "Smartphone":
            imgBookSize = '_small';
            imgSize = '_small';
            break;
        case "Tablet":
            imgSize = '_medium';
            break;
    }
    
    imgTemp.src = `${imgLoc}${imgBasic}${imgSize}.${imgFormat}`;

    if (validDate) {
        imgBook.src = `img/mybook/${bookEdition}${imgBookSize}.png`;
        divBook.style.display = 'block';
    }

    imgTemp.setAttribute("loading", "lazy");
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