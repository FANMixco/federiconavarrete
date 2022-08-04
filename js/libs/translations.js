let totalServices = 0;
let fullReviews = [];

const bookEdition = 'second;'
const iframeLinkPreviews = `<iframe title="{Title}" id='iframeLinks' src="{URL}" class="previewerIframe" loading="lazy" style='background: url("img/icons/loading.gif") center/7em no-repeat' allowfullscreen></iframe>`;
const imgPreview = '<img src="{URL}" alt="{Title}" style="width: 90%" />';

loadMainImage();

getScript(`${langLoc}${lang}/hobbiesList.js`).then(() => { loadHobbies(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/awardsList.js`).then(() => { loadAwards(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/servicesList.js`).then(() => { loadServices(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/techSkillsLists.js`).then(() => { loadTechSkills(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/softSkillsLists.js`).then(() => { loadSoftSkills(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/personalProjects.js`).then(() => { loadPersonalProjects(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/presentationsLists.js`).then(() => { loadVideosAndPresentations(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/organizedEvents.js`).then(() => { loadOrganizedEvents(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/articlesList.js`).then(() => { loadArticles(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/newsArticleList.js`).then(() => { loadNewsArticles(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/socialMediasLists.js`).then(() => { loadSocialMedias(); }).catch((e) => { console.error(e); });

getScript(`${langLoc}${lang}/reviewsList.js`).then(() => { loadReviews(); }).catch((e) => { console.error(e); });

loadBookPreview();

setTimeout(function () {
    addIFrameModal();
}, 1000);

function loadBookPreview() {
    let bookPreview = document.getElementById("bookPreview");

    bookPreview.innerHTML += `<iframe title='Timeless Stories of El Salvador' type="text/html" sandbox="allow-scripts allow-same-origin allow-popups" width="336" height="550" frameborder="0" allowfullscreen style="max-width:100%;margin:auto;display:block" src="https://leer.amazon.es/kp/card?asin=B09Z33ZPTV&preview=inline&linkCode=kpe&ref_=cm_sw_r_kb_dp_HJ6YDMXY6BRE1FA9AWE3"></iframe>`;
}

function loadReviews() {
    try {
        const { reviews, isVisible } = reviewsList;

        if (isVisible) {
            const divReviewsPreviews = document.getElementById('divReviewsPreviews');

            reviews.forEach(function(item, index) {

                let name = item.externalLink !== "" ? `<a href="${item.externalLink}" rel="noreferrer" target="_blank" class="text-warning">${item.name}</a>` : item.name;

                let active = item.isActive ? " active" : "";

                let currentReview = index + 1;

                let rTmp = `${item.shortReview}<a class="text-material-link" data-bs-toggle="modal" data-target="#reviewGeneric" href="#reviewGeneric" id="readMore${currentReview}">${genericTranslations.readMore}</a>`;
                let review = `<div class="carousel-item text-center${active}">
                                ${getReviewContainer("", item.img, currentReview, name, item.title, "", "white", "white", rTmp, "", true)}
                                </div>`;

                divReviewsPreviews.innerHTML += review;

                let longReview = "";

                if (item.isPDF) {
                    longReview = `${getImgName(name, item.img, currentReview, "picReviewers")}
                    ${getReviewTitle('dark', item.title)}
                    ${getInnerTitle(item.date)}
                    <div id="review${currentReview}PDF"></div>
                    <div class="centerText">
                        <a class="btn btn btn-outline-dark" target="_blank" href="${item.pdfLocation}">
                            <img src="${iconsPath}download.svg" alt="download" style="filter: invert(0)!important" class="mr-2 btnIcons" loading="lazy" />&nbsp;${genericTranslations.download}
                        </a>
                    </div>`;
                }
                else {
                    longReview = getReviewContainer("picReviewers", item.img, index + 1, name, item.date, getInnerTitle(item.title), 'dark', 'black', item.review, "centerText", false);
                }

                fullReviews.push({ 
                    review: longReview,
                    isPDF: item.isPDF
                });
            });
        }
        else {
            const divReviews = document.getElementById("divReviews");
            divReviews.style.display = "none";
        }

        fullReviews.forEach(function(item, index) { 

            let rmCurrent = document.getElementById(`readMore${index + 1}`);
            rmCurrent.addEventListener("click", (e) => {
                e.preventDefault();
                let divGenericContent = document.getElementById('divGenericContent');
                divGenericContent.innerHTML = item.review;

                if (item.isPDF) {
                    PDFObject.embed("/testimonials/references.pdf", `#review${index + 1}PDF`);
                }
            });
        });
    }
    catch (e) { return e; }
}

function loadHobbies() {
    try {
        const smallScreenMobileOS = WURFL.is_mobile && WURFL.form_factor === "Smartphone";

        const { hobbies, isVisible } = hobbiesList;

        if (isVisible) {
            const hobbiesList = document.getElementById('hobbiesList');

            let finalH = !(smallScreenMobileOS) ? hobbies : hobbies.slice(0, 4);

            finalH.forEach(item => {
                let btnOptional = item.isOpt ? " btnOptional" : "";

                hobbiesList.innerHTML += `<li class="list-inline-item${btnOptional}">${getHobbyImg(item)}</li>`;
            });

            hobbiesList.innerHTML += `<li class="list-inline-item" id='btnExtraHobbies'>
                <a href="#otherHobbies" class="btn btn-outline-light btn-social text-center rounded-circle externalImg" data-bs-toggle="modal" data-target="#otherHobbies">
                <img src="${iconsPath}plus.svg" alt="extra" loading="lazy" />
                </a>
            </li>`;

            const hobbiesOthers = hobbies.filter(({isOpt}) => isOpt === true);

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
        
            if (!smallScreenMobileOS) {
                let btnExtraHobbies = document.getElementById("btnExtraHobbies");
                btnExtraHobbies.style.display = "none";
            }
        }
        else {
            const divHobbies = document.getElementById("divHobbies");
            divHobbies.style.display = "none";
        }
    }
    catch (e) { return e; }
}

function loadServices() {
    try {
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
    catch (e) { return e; }
}

function loadAwards() {
    try {
        const { awards, isVisible } = awardsList;

        if (isVisible) {
            const awardsList = document.getElementById('awardsList');
            let availableLinks = [];
            let i = 0;
            awards.forEach(item => {
                let items = `<div class="col-lg-4 ml-auto"><p class="lead">`;
                item.forEach(elem => {
                    let title = "";
                    if (elem.link) {
                        title = `<a id="linkPreview${i}" data-bs-toggle="modal" data-bs-target="#linkPreviews" class="btn btn-warning" style='width: 100%; font-weight: bold'>${elem.title}</a>`;
                        availableLinks.push({ 
                            id: i,
                            title: elem.title,
                            link: elem.link,
                        });
                    }
                    else
                        title = `<button style='width: 100%; font-weight: bold' type="button" class="btn btn-light">${elem.title}</button>`;
                    items += `${title}<br /><br />`;
                    i++;
                });
                items = `${items.substring(0, items.length - 12)}</div>`;

                awardsList.innerHTML += items;
            });

            availableLinks.forEach(item => {
                const linkPreview = document.getElementById(`linkPreview${item.id}`);
                let iframeGeneric = document.getElementById('iframeGeneric');

                linkPreview.addEventListener("click", () => {
                    const gTitle = document.getElementById('gTitle');
                    gTitle.style.display = "none";
                    let lPreview = !(item.link.includes("storage.live.com")) ? iframeLinkPreviews : imgPreview;
                    lPreview = lPreview.replace('{URL}', item.link);
                    lPreview = lPreview.replace('{Title}', item.title);
                    iframeGeneric.innerHTML = lPreview;    
            });
            });
        }
        else {
            const divAwards = document.getElementById('divAwards');
            divAwards.style.display = "none";
        }
    }
    catch (e) { return e; }
}

function loadTechSkills() {
    try {
        loadSkills(techSkills, techSkillsOthers, "divTechSkills", "divTechSkillsOthers", "", "btnMoreTechSkills", "multiDev");
    }
    catch (e) { return e; }
}

function loadSoftSkills() {
    try {
        loadSkills(softSkills, softSkillsOthers, "divSoftSkills", "divSoftSkillsOther", "-business", "btnMoreSoftSkills", "multiBS");
    }
    catch (e) { return e; }
}

function loadPersonalProjects() {
    try {
        const personalProjectsDiv = document.getElementById('personalProjects');
        personalProjects.forEach(item => {
            let isActive = item.isActive ? " active" : "";

            let hOpt = WURFL.is_mobile && WURFL.form_factor === "Smartphone" ? "style='font-size: larger!important'" : "";

            let pp = `<div class="carousel-item${isActive}">
                <div class="carousel-video-inner">
                    ${getUTubeLite(item)}
                    <p class="text-center text-uppercase text-secondary mb-0 h4 mt-2 mb-2" ${hOpt}><a class="text-material-link-dark" href="${item.link}" rel="noreferrer" target="_blank">${item.title}</a>, ${item.timeFrame}</p>
                </div>
            </div>`;

            personalProjectsDiv.innerHTML += pp;
        });
    }
    catch (e) { return e; }
}

function loadVideos() {
    try {
        const { presentations, isVisible } = presentationsVideos;

        const divVideos = document.getElementById('divVideos');
        if (isVisible) {
            let count = 0;
            presentations.forEach(item => {
                divVideos.innerHTML += getUTubeContainer(item);
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
    catch (e) { return e; }
}

function loadYouTubeVideos() {
    try {
        const { presentations, isVisible } = youtubeTrainings;

        const divYouTubeVideos = document.getElementById('divYouTubeVideos');
        if (isVisible) {
            let count = 0;
            presentations.forEach(item => {
                divYouTubeVideos.innerHTML += getUTubeContainer(item);
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
    catch (e) { return e; }
}

function loadPresentations() {
    try {
        const { presentations, isVisible } = presentationsLinks;

        const divPPTs = document.getElementById('divPPTs');
        if (isVisible) {
            presentations.forEach(item => {
                let ppt = `<div class="col-sm">
                    <a href="${item.link}" rel="noreferrer" target="_blank">
                        <img id="${item.imgID}" loading="lazy" class="img-fluid" alt="${item.title}" />
                    </a>
                    <p class="text-center text-uppercase text-secondary mb-0 h4 mt-2 mb-2">${item.title}</p>
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
    catch (e) { return e; }
}

function loadOrganizedEvents() {
    try {
        const { events, isVisible } = organizedEvents;

        const divEvents = document.getElementById('divEvents');
        if (isVisible) {
            events.forEach(item => {
                let event = `<div class="col-sm">
                    <a href="${item.link}" rel="noreferrer" target="_blank">
                        <img alt='events' loading="lazy" class="img-fluid" id="${item.imgID}" />
                    </a>
                    <p class="text-center text-uppercase text-secondary mb-0 h4 mt-2 mb-2">${item.title}</p>
                </div>`;
                divEvents.innerHTML += event;
                setImage(item.imgID, item.imgBasicName, imgLocPortfolio, item.imgFormat);
            });
        }
        else {
            divEvents.style.display = "none";
        }
    }
    catch (e) { return e; }
}

function loadArticles() {
    try {
        const { articles, isVisible } = articlesList;

        if (isVisible) {
            const divArticles = document.getElementById('divArticles');
            articles.forEach(item => {
                let event = `<div class="col-sm">
                    <a href="${item.link}" class="text-decoration-none" target="_blank" rel="noreferrer">
                        <img loading="lazy" class="img-fluid" id="${item.imgID}" alt="${item.title}" />
                    </a>
                    <p class="text-center text-uppercase text-secondary mb-0 h4 mt-2 mb-2">${item.title}</p>
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
    catch (e) { return e; }
}

function loadNewsArticles() {
    try {
        const { articles, isVisible } = newsArticlesList;

        if (isVisible) {
            const divMMArticles = document.getElementById('divMMArticles');
            articles.forEach(item => {
                let event = `<div class="col-sm">
                    <a href="${item.link}" class="text-decoration-none" target="_blank" rel="noreferrer">
                        <img loading="lazy" class="img-fluid" id="${item.imgID}" alt="${item.title}" />
                    </a>
                    <p class="text-center text-uppercase text-secondary mb-0 h4">${item.title}</p>
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
    catch (e) { return e; }
}

function loadSocialMedias() {
    try {
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
    catch (e) { return e; }
}

function loadSkills(skills, skillsOthers, divContainer, divOthersContainer, classCollapse, btnMore, itemCollapseID) {
    try {
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
    catch (e) { return e; }
}

function getHobbyImg(item) {
    let externalClass = "";

    if (item.externalClass) {
        externalClass = item.externalClass;
    }

    return getImage(item.title, "#", `${iconsPath}${item.icon}.svg`, false, item.isIcon, externalClass, true);
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

function loadVideosAndPresentations() {
    loadVideos();
    loadYouTubeVideos();
    loadPresentations();
}

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

function setImage(imgID, imgBasic, imgLoc, imgFormat) {
    let imgBookSize = '';
    let imgSize = '';

    let imgTemp = document.getElementById(imgID);
    //let divBook = document.getElementById("myBookDiv");
    //divBook.style.display = 'none';

    //let imgBook = document.getElementById("imgBook");
    //let currentDate = new Date();
    //let validDate = !((currentDate.getMonth() + 1 >= 7) && (currentDate.getFullYear() >= 2022) && (currentDate.getDate() >= 15));

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

    /*if (validDate) {
        imgBook.src = `img/mybook/${bookEdition}${imgBookSize}.png`;
        divBook.style.display = 'block';
    }*/

    imgTemp.setAttribute("loading", "lazy");
}

function getUTubeContainer(item) {
    return `<div class="col-sm">
        ${getUTubeLite(item)}
        <p class="text-center text-uppercase text-secondary mb-0 h4 mt-2 mb-2">${item.title}</p>
    </div>`;
}

function getUTubeLite(item) {
    return `<lite-youtube style="margin: auto" class="iVideos" videoid="${item.youTubeID}" playlabel="${item.title}"></lite-youtube>`;
}

function getImgPreview(img, currentReview, extraClass) {
    return `<div class="img-box p-1 border rounded-circle m-auto ${extraClass}">
                ${getImgReview(img, currentReview)}
            </div>`;
}

function getReviewName(name, isLarge) {
    let extraCss = (WURFL.is_mobile && WURFL.form_factor === "Smartphone") && isLarge ? "style='font-size: larger!important'" : '';
    return `<p class="mt-4 mb-0 text-center h5 p-1 text-material-orange text-uppercase" ${extraCss}>${name}</p>`;
}

function getReviewTitle(color, title, cssCentered) {
    return `<p class="text-${color} m-0 ${cssCentered} text-center h6 p-1">${title}</p>`;
}

function getInnerTitle(title) {
    return `<p class="text-dark m-0 text-center p-2">${title}</p>`;
}

function getImgReview(src, rev) {
    return `<img loading="lazy" class="d-block w-100 rounded-circle" src="${src}" alt="review${rev} slide" />`;
}

function getReviewContainer(extraClass, img, currentReview, name, title, extraTitle, txtColor, txtColor2, content, cssCentered, isLarge = false) {
    return `${getImgName(name, img, currentReview, extraClass, isLarge)}
    ${extraTitle}
    ${getReviewTitle(txtColor, title, cssCentered)}
    <p class="m-0 pt-3 text-${txtColor2}">${content}</p>`;
}

function getImgName(name, img, currentReview, extraClass, isLarge) {
    return `${getImgPreview(img, currentReview, extraClass)}
    ${getReviewName(name, isLarge)}`;
}
