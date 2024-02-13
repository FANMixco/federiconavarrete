let totalServices = 0;
let fullReviews = [];
let isHandlingVisibility = false;

//const bookEdition = 'second;'
const imgPreview = getImgBasicTag('{URL}', '', '', '', '{Title}', 'style="max-width: 90%"');
const noreferrer = 'rel="noreferrer"';
const tBlank = 'target="_blank"';
const divSmall = '<div class="col-sm">';
const cDiv = '</div>';
const w100 = 'class="w-100"';
const fontMobile = (smallScreenMobileOS) ? 'font-mobile' : '';
const navbarCollapse = document.getElementById('navbarResponsive');

fetchData(`${langLoc}${lang}/otherTranslations.json`)
.then(data => {
    loadAwards(data.awardsList);
    loadServices(data.servicesList);
    loadTechSkills(data.techSkills, data.techSkillsOthers);
    loadSoftSkills(data.softSkills, data.softSkillsOthers);
    loadPersonalProjects(data.personalProjects);
    loadVideosAndPresentations(data.youtubeTrainings, data.presentationsLinks, data.presentationsVideos);
    loadOrganizedEvents(data.organizedEvents);
    loadArticles(data.articlesList);
    loadNewsArticles(data.newsArticlesList);
    loadSocialMedias(data.socialBasicList, data.socialOthersList);
    loadReviews(data.reviewsList);
}).catch((e) => { console.error(e); });

function loadOrganizedEvents(organizedEvents) {
    const { events, isVisible } = organizedEvents;
    loadImgSection(events, isVisible, 'divEvents', 'divEvents', imgLocPortfolio, 'Łódźarts', fontMobile);
}

function loadArticles(articlesList) {
    const { articles, isVisible } = articlesList;
    loadImgSection(articles, isVisible, 'divArticles', 'articlesDiv', imgLocArticles, '', fontMobile);
}

function loadNewsArticles(newsArticlesList) {
    const { articles, isVisible } = newsArticlesList;
    loadImgSection(articles, isVisible, 'divMMArticles', 'newsArticles', imgLocArticles, fontMobile);
}

loadBookPreview();

setTimeout(function () {
    addIFrameModal('service');
    addIFrameModal('lSer');
}, 1000);

function loadBookPreview() {
    const bookPreview = document.getElementById("bookPreview");

    bookPreview.innerHTML += getIframe('Timeless Stories of El Salvador', 'https://leer.amazon.es/kp/card?asin=B09Z33ZPTV&preview=inline&linkCode=kpe&ref_=cm_sw_r_kb_dp_HJ6YDMXY6BRE1FA9AWE3', `type="text/html" sandbox="allow-scripts allow-same-origin allow-popups" width="336" height="550" frameborder="0" style="max-width:100%;margin:auto;display:block"`, '');
}

function loadReviews(reviewsList) {
    try {
        const { reviews, isVisible } = reviewsList;

        if (isVisible) {
            const divReviewsPreviews = document.getElementById('divReviewsPreviews');

            reviews.forEach(function(item, index) {

                const name = item.externalLink !== "" ? getFLink("text-warning", item.externalLink, item.name, `${noreferrer} ${tBlank}`) : item.name;

                const currentReview = index + 1;

                let rTmp = `${item.shortReview}${getBtnModal("reviewGeneric", "text-material-link", `readMore${currentReview}`, genericTranslations.readMore, '', 'reviewGeneric')}`;

                const review = `${getCItem(`${tCenter}${item.isActive ? " active" : ""}`)}
                                ${getReviewContainer("", item.img, currentReview, name, item.title, "", "white", "white", rTmp, "", true)}
                                ${cDiv}`;

                divReviewsPreviews.innerHTML += review;

                let longReview = "";

                const tTemp = item.title.replaceAll('text-material-link', "text-material-link-dark");
                if (item.isPDF) {
                    longReview = `${getImgName(name, item.img, currentReview, "picReviewers")}
                    ${getReviewTitle('dark', tTemp)}
                    ${getInnerTitle(item.date)}
                    <div id="review${currentReview}PDF">${cDiv}
                    <div class="centerText">
                        ${getFLink("btn btn btn-outline-dark", item.pdfLocation, `${getFinalIcon(`download`, 14)}&nbsp;${genericTranslations.download}`, tBlank)}
                    ${cDiv}`;
                }
                else {
                    longReview = getReviewContainer("picReviewers", item.img, index + 1, name, item.date, getInnerTitle(tTemp), 'dark', 'black', item.review, "centerText", false);
                }

                fullReviews.push({ 
                    review: longReview,
                    isPDF: item.isPDF
                });
            });
        }
        else {
            const divReviews = document.getElementById("divReviews");
            divReviews.classList.add(nVis);
        }

        fullReviews.forEach(function(item, index) { 

            let rmCurrent = document.getElementById(`readMore${index + 1}`);
            rmCurrent.addEventListener(eClick, (e) => {
                e.preventDefault();
                let divGenericContent = document.getElementById('divGenericContent');
                divGenericContent.innerHTML = item.review;

                if (item.isPDF) {
                    PDFObject.embed("/testimonials/references.pdf", `#review${index + 1}PDF`);
                    if (deviceType() === "Smartphone" || deviceType() === "Tablet")
                        document.getElementById("review2PDF").style.height = "auto";
                }
            });
        });
    }
    catch (e) { return e; }
}

function loadServices(servicesList) {
    try {
        const { services, isVisible } = servicesList;

        if (isVisible) {
            const servicesList = document.getElementById('servicesList');
            const dropdownMenu = document.getElementById('dServices');
            let items = (smallScreenMobileOS || equalScreen) ? '' : `<div class="row justify-content-center">`;
            services.forEach(item => {
                item.forEach(elem => {

                    let newListItem = document.createElement('li');
                    newListItem.innerHTML = `<a class="dropdown-item" id="lSer${totalServices}" target="_blank" href="${elem.link}">➤&nbsp;${elem.title}</a>`;
                    dropdownMenu.appendChild(newListItem);

                    const title = getCard(elem.link, `${elem.icon} fSize65`, 'text-white', elem.title, 'card-services', 'fa-icon-services', null, '', true, `service${totalServices}`);

                    items += (smallScreenMobileOS || equalScreen) ? `<div class="carousel-item ${(totalServices == 0) ? "active" : ""}"><div class='text-center card-holder'>${title}</div></div>` : `<div class='col-lg-4 col-md-6 col-sm-12 col-12 p-2 text-center card-holder'>${title}</div>`;

                    totalServices++;
                });
            });

            items = (smallScreenMobileOS || equalScreen) ? items : `${items}${cDiv}`;

            if (smallScreenMobileOS || equalScreen) {
                items = getCarousel(items, "carouselServices", 'text-dark');
                const servicesListDiv = document.getElementById("servicesList");
                servicesListDiv.classList.remove("row");
                servicesListDiv.classList.add("container");
            }

            servicesList.innerHTML += items;

            if (smallScreenMobileOS || equalScreen)
                new bootstrap.Carousel(`#carouselServices`);
        }
        else {
            const divServices = document.getElementById('divServices');
            divServices.classList.add(nVis);
        }
    }
    catch (e) { return e; }
}

function getCarousel(items, cId, arrowsColor = 'text-muted') {
    return `<div class="container-fluid" id="div${cId}">
    <div id="${cId}" class="carousel slide">
        <div class="carousel-inner">
            ${items}
        </div>
        <button class="carousel-control-prev icon-size-22" type="button" data-bs-target="#${cId}" data-bs-slide="prev" aria-label="Previous">
            <span class="${arrowsColor} icon-chevron-left-solid"></span>
        </button>
        <button class="carousel-control-next icon-size-22" type="button" data-bs-target="#${cId}" data-bs-slide="next" aria-label="Next">
            <span class="${arrowsColor} icon-chevron-right-solid"></span>
        </button>
        </div>
    </div>`;
}

function loadAwards(awardsList) {
    try {
        const { awards, isVisible } = awardsList;

        if (isVisible) {
            const awardsList = document.getElementById('awardsList');
            let availableLinks = [];
            let i = 0;
            let items = (smallScreenMobileOS || equalScreen) ? '' : `<div class="row justify-content-center">`;
            awards.forEach(item => {
                item.forEach(elem => {
                    let title = getBtnModal('linkPreviews', 'clean-btn card-link text-dark', `linkPreview${i}`, getCard(elem.link, `trophy fSize50`, 'text-dark', elem.title, 'card-awards', 'fa-icon-awards', null, ''), '', '', true, elem.type, elem.link);

                    availableLinks.push({ 
                        id: i,
                        title: elem.title,
                        link: elem.link,
                        type: elem.type
                    });
                    
                    items += (smallScreenMobileOS || equalScreen) ? `<div class="carousel-item ${(i == 0) ? "active" : ""}"><div class='text-center card-holder'>${title}</div></div>` : `<div class='col-lg-4 col-md-6 col-sm-12 col-12 p-2 text-center card-holder'>${title}</div>`;
    
                    i++;
                });
            });

            items = (smallScreenMobileOS || equalScreen) ? items : `${items}${cDiv}`;

            if (smallScreenMobileOS || equalScreen) {
                items = getCarousel(items, "carouselAwards", 'text-dark');
                const awardsListDiv = document.getElementById("awardsList");
                awardsListDiv.classList.remove("row");
                awardsListDiv.classList.add("container");
            }

            awardsList.innerHTML += items;

            if (smallScreenMobileOS || equalScreen)
                new bootstrap.Carousel(`#carouselAwards`);

            availableLinks.forEach(item => {
                if (item.type !== "_blank") {
                    const linkPreview = document.getElementById(`linkPreview${item.id}`);

                    linkPreview.addEventListener(eClick, () => {
                        const iframeGeneric = document.getElementById('iframeGeneric');
                        const btnFullScreenPreview = document.getElementById('btn-full-screen-preview');
                        const gTitle = document.getElementById('gTitle');

                        gTitle.classList.add(nVis);

                        const gDivTitle = document.getElementById('gDivTitle');
                        gDivTitle.classList.add('border-0');

                        const lPreview = !(item.link.includes("storage.live.com")) ? getIframe(item.title, item.link, `class="previewerIframe" id="previewerIframeI" style='background: url("img/icons/loading.gif") center/7em no-repeat'`) : imgPreview.replace("{URL}", item.link).replace("{Title}", item.title);

                        const modalPreview = document.getElementById('modal-preview');

                        modalPreview.classList.remove('modal-xl');

                        if (item.type === "img") {
                            modalPreview.classList.add('modal-xl');
                        }

                        btnFullScreenPreview.href = item.link;
                        btnFullScreenPreview.setAttribute('title', item.title);
                        btnFullScreenPreview.setAttribute('aria-label', item.title);
                    
                        iframeGeneric.innerHTML = lPreview;

                        iFrameHResize('previewerIframeI');
                    });
                }
            });
            //screenResizeCardHolders();
        }
        else {
            const divAwards = document.getElementById('divAwards');
            divAwards.classList.add(nVis);
        }
    }
    catch (e) { return e; }
}

function loadTechSkills(techSkills, techSkillsOthers) {
    try {
        loadSkills(techSkills, techSkillsOthers, "divTechSkills", "divTechSkillsOthers", "", "btnMoreTechSkills", "multiDev");
    }
    catch (e) { return e; }
}

function loadSoftSkills(softSkills, softSkillsOthers) {
    try {
        loadSkills(softSkills, softSkillsOthers, "divSoftSkills", "divSoftSkillsOther", "-business", "btnMoreSoftSkills", "multiBS");
    }
    catch (e) { return e; }
}

function loadPersonalProjects(personalProjects) {
    try {
        const personalProjectsDiv = document.getElementById('personalProjects');
        personalProjects.forEach(item => {
            const isActive = item.isActive ? " active" : "";

            const hOpt = smallScreenMobileOS || equalScreen ? "style='font-size: larger!important'" : "";

            const pp = `${getCItem(isActive)}
                <div class="carousel-video-inner">
                    ${getUTubeLite(item)}
                    ${getH4Tag(`${getFLink("text-material-link-dark", item.link, item.title, `${noreferrer} ${tBlank}`)}, ${item.timeFrame}`, hOpt)}
                    ${cDiv}
                ${cDiv}`;

            personalProjectsDiv.innerHTML += pp;
        });
    }
    catch (e) { return e; }
}

function getVideoCarousel(items, id) {
    return `<div id="${id}" class="carousel slide">
    <div class="carousel-inner">${items}</div>
    <button class="carousel-control-prev carousel-control-prev-video icon-size-22" href="#${id}" role="button" data-bs-slide="prev" aria-label="Previous">
        <span class="text-muted icon-chevron-left-solid"></span>
    </button>
    <button class="carousel-control-next carousel-control-next-video icon-size-22" href="#${id}" role="button" data-bs-slide="next" aria-label="Next">
        <span class="text-muted icon-chevron-right-solid"></span>
    </button>
 </div>`;
}

function loadVideos(presentationsVideos) {
    try {
        const { presentations, isVisible } = presentationsVideos;

        const divVideos = document.getElementById('divVideos');
        if (isVisible) {
            loadVideosUTube(presentations, divVideos, 'publicSpeakingDiv');
        }
        else {
            const hPublicSpeaking = document.getElementById('hPublicSpeaking');
            hPublicSpeaking.classList.add(nVis);

            divVideos.classList.add(nVis);
        }
    }
    catch (e) { return e; }
}

function loadVideosUTube(presentations, divVideo, divCar) {
    let cUTube = 0;
    if (smallScreenMobileOS || equalScreen) {
        let items = '';
        presentations.forEach(item => {
            let vTmp = getUTubeContainer(item, fontMobile);
            vTmp = vTmp.replaceAll('class="col-sm"', `class="carousel-video-inner"`);
            vTmp = `<div class="carousel-item ${(cUTube == 0) ? 'active' : ''}">${vTmp}</div>`;
            items += vTmp;
            cUTube++;
        });
        items = getVideoCarousel(items, divCar);
        divVideo.innerHTML = items;
        new bootstrap.Carousel(`#${divCar}`);
    }
    else {
        presentations.forEach(item => {
            divVideo.innerHTML += getUTubeContainer(item);
            if (cUTube === 0) {
                divVideo.innerHTML += `<div ${w100}>${cDiv}`;
            }
            cUTube++;
        });
    }
}

function loadYouTubeVideos(youtubeTrainings) {
    try {
        const { presentations, isVisible } = youtubeTrainings;

        const divYouTubeVideos = document.getElementById('divYouTubeVideos');
        if (isVisible) {
            loadVideosUTube(presentations, divYouTubeVideos, 'uTubeDiv');
        }
        else {
            const hYouTubeTraining = document.getElementById('hYouTubeTraining');
            hYouTubeTraining.classList.add(nVis);

            divYouTubeVideos.classList.add(nVis);
        }
    }
    catch (e) { return e; }
}

function loadDivPresentations(presentations, divPicture, divCar) {
    let cPresentation = 0;
    if (smallScreenMobileOS || equalScreen) {
        let items = '';
        presentations.forEach(item => {
            let vTmp = getImgContainer(item.link, setWebPImage(item.imgID, getImgTag(item.imgID, item.title)), item.title, 'font-mobile');
            vTmp = vTmp.replaceAll('class="col-sm"', `class="carousel-video-inner"`);
            vTmp = `<div class="carousel-item ${(cPresentation == 0) ? 'active' : ''}">${vTmp}</div>`;
            items += vTmp;
            cPresentation++;
        });
        items = getVideoCarousel(items, divCar);
        divPicture.innerHTML = items;
        presentations.forEach(item => {
            setImage(item.imgID, item.imgBasicName, imgLocPortfolio, item.imgFormat);
        });
        new bootstrap.Carousel(`#${divCar}`);
    }
    else {
        presentations.forEach(item => {
            const ppt = getImgContainer(item.link, setWebPImage(item.imgID, getImgTag(item.imgID, item.title)), item.title);
            divPPTs.innerHTML += ppt;
            setImage(item.imgID, item.imgBasicName, imgLocPortfolio, item.imgFormat);
        });
    }   
}

function loadPresentations(presentationsLinks) {
    try {
        const { presentations, isVisible } = presentationsLinks;

        const divPPTs = document.getElementById('divPPTs');
        if (isVisible) {
            /*presentations.forEach(item => {
                let ppt = getImgContainer(item.link, setWebPImage(item.imgID, getImgTag(item.imgID, item.title)), item.title);
                divPPTs.innerHTML += ppt;
                setImage(item.imgID, item.imgBasicName, imgLocPortfolio, item.imgFormat);
            });*/
            loadDivPresentations(presentations, divPPTs, 'presentationsDiv');
        }
        else {
            const hPresentations = document.getElementById('hPresentations');
            hPresentations.classList.add(nVis);

            divPPTs.classList.add(nVis);

            const pPPTs = document.getElementById('pPPTs');
            pPPTs.classList.add(nVis);
        }
    }
    catch (e) { return e; }
}

function loadImgSection(list, isVisible, section, divSection, imgPath, optTitle = '', cls = '') {
    try {
        if (isVisible) {
            const divSection = document.getElementById(section);
            list.forEach(item => {
                const tmpImg = getImgContainer(item.link, setWebPImage(item.imgID, getImgTag(item.imgID, !(optTitle) ? item.title : optTitle)), item.title, cls);
                divSection.innerHTML += tmpImg;
                setImage(item.imgID, item.imgBasicName, imgPath, item.imgFormat);
            });
        }
        else {
            const secDiv = document.getElementById(divSection);
            secDiv.classList.add(nVis);
        }
    }
    catch (e) { return e; }
}

function loadSocialMedias(socialBasicList, socialOthersList) {
    try {
        const { socialMedia, isVisible} = socialBasicList;

        if (isVisible) {
            const ext = 'https://';
            const socialMediaBasic = document.getElementById('socialMediaBasic');
            const socialMediaBasicExtended = document.getElementById('social-medias-extended-list');

            socialMedia.forEach(item => {
                socialMediaBasic.innerHTML += getListItem(getImage(item.title, `${ext}${item.link}`, `${item.icon}`, true, true, `btn-footer ${item.id}`, false, "iconFooter"));
                socialMediaBasicExtended.innerHTML += getListItem(getImage(item.title, `${ext}${item.link}`, `${item.icon}`, true, true, `btn-footer ${item.id}`, false, "iconFooter"));
            });
            socialMediaBasicExtended.innerHTML += getBtnShare();

            const btnShare = document.getElementById('btnShare');

            btnShare.addEventListener(eClick, (event) => {
                event.preventDefault();

                navigator.share({
                    title: genericTranslations.knowMoreTitle,
                    text: genericTranslations.knowMoreBody,
                    url: window.location.href
                })
                .then(() => {
                    console.log('Shared successfully!');
                })
                .catch((error) => {
                    console.error('Error sharing:', error);
                });
            });

            if (socialOthersList.isVisible) {
                const sBasic = document.getElementById("socialMediaBasic");
                
                //(loc, cls, extra = "", imgExtra = "", id = '', clsImg = '')
                sBasic.innerHTML += getBtnOthers('otherLocs', 'btn-footer', "");

                const socialMediaOthers = document.getElementById('socialMediaOthers');
                socialOthersList.socialMedia.forEach(elem => {
                    socialMediaOthers.innerHTML += getListItem(getImage(elem.title, `${ext}${elem.link}`, `${elem.icon}`, true, true, "btn-footer", false, "iconFooter"));
                });
            }
        }
        else {
            const aroundWeb = document.getElementById('aroundWeb');
            aroundWeb.classList.add(nVis);
        }

        if (smallScreenMobileOS) {
            [...document.getElementsByClassName('uTubeLink')].forEach(function(element) {
                element.href = element.href.replace('www', 'm');    
            });
        }
    }
    catch (e) { return e; }
}

function loadSkills(skills, skillsOthers, divContainer, divOthersContainer, classCollapse, btnMore, itemCollapseID) {
    try {
        skills.forEach(item => {
            let items = `${divSmall}<p class="lead">`;
            item.forEach(elem => {
                items += `${elem}<br /><br />`;
            });
            items = `${items.substring(0, items.length - 12)}</p>${cDiv}`;

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
            let items = `${divSmall}<div class="collapse multi-collapse${classCollapse}" id="${itemCollapseID}${index}"><div class="card card-body mini-cards">`;
            item.forEach(elem => {
                items += `${elem}<br /><br />`;
            });
            items = `${items.substring(0, items.length - 12)}${cDiv}${cDiv}${cDiv}`;

            divOthersContainerDiv.innerHTML = items + divOthersContainerDiv.innerHTML;
        });
    }
    catch (e) { return e; }
}

/*function getHobbyImg(item) {
    let externalClass = "";

    if (item.externalClass) {
        externalClass = item.externalClass;
    }

    return getImage(item.title, "#", `${item.icon}`, true, item.isIcon, externalClass, true);
}*/

function addIFrameModal(opt) {
    for (let serv = 0; serv < totalServices; serv++) {
        let cService = document.getElementById(`${opt}${serv}`);
        cService.addEventListener(eClick, function(e) {
            e.preventDefault();
            document.getElementById("serviceForm").innerHTML = getIframe('Contact me', cService.href, `height="${heightIFrame * 0.8}px" width="100%" id="serviceFormI" frameborder="0" scrolling="yes" style="margin-top:${marginTop}px"`);

            iFrameHResize('serviceFormI');
            
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

function loadVideosAndPresentations(youtubeTrainings, presentationsLinks, presentationsVideos) {
    loadVideos(presentationsVideos);
    loadYouTubeVideos(youtubeTrainings);
    loadPresentations(presentationsLinks);
}

function setImage(imgID, imgBasic, imgLoc, imgFormat) {
    //let imgBookSize = '';
    let imgSize = '';

    const imgTemp = document.getElementById(imgID);
    const srcWebP = document.getElementById(`srcWebP${imgID}`);
    const srcJPG = document.getElementById(`srcJPG${imgID}`);
    //let divBook = document.getElementById("myBookDiv");
    //divBook.classList.add(nVis);

    //let imgBook = document.getElementById("imgBook");
    //let currentDate = new Date();
    //let validDate = !((currentDate.getMonth() + 1 >= 7) && (currentDate.getFullYear() >= 2022) && (currentDate.getDate() >= 15));

    switch (deviceType()) {
        case "Smartphone":
            //imgBookSize = '_small';
            imgSize = '_small';
            break;
        case "Tablet":
            imgSize = '_medium';
            break;
    }
    
    imgTemp.src = `${imgLoc}${imgBasic}${imgSize}.${imgFormat}`;

    srcWebP.srcset = `${imgLoc}${imgBasic}${imgSize}.webp`;
    srcJPG.srcset = `${imgLoc}${imgBasic}${imgSize}.jpg`;    

    /*if (validDate) {
        imgBook.src = `img/mybook/${bookEdition}${imgBookSize}.png`;
        divBook.classList.add('block');
    }*/

    imgTemp.setAttribute("loading", "lazy");
}

function getUTubeContainer(item, cls) {
    return `${divSmall}
        ${getUTubeLite(item)}
        ${getH4Tag(item.title, '', cls)}
        ${cDiv}`;
}

function getUTubeLite(item) {
    return `<lite-youtube class="iVideos" videoid="${item.youTubeID}" playlabel="${item.title}"></lite-youtube>`;
}

function getImgPreview(img, currentReview, extraClass) {
    return `<div class="img-box p-1 border rounded-circle m-auto ${extraClass}">
                ${getImgReview(img, currentReview)}
            ${cDiv}`;
}

function getReviewName(name, isLarge) {
    let extraCss = (smallScreenMobileOS || equalScreen) && isLarge ? "style='font-size: larger!important'" : '';
    return `<p class="mt-4 mb-0 ${tCenter} h5 p-1 text-material-orange text-uppercase" ${extraCss}>${name}</p>`;
}

function getReviewTitle(color, title, cssCentered) {
    return `<p class="text-${color} m-0 ${cssCentered} ${tCenter} h6 p-1">${title}</p>`;
}

function getInnerTitle(title) {
    return `<p class="text-dark m-0 ${tCenter} p-2">${title}</p>`;
}

function getImgReview(src, rev) {
    return getPicture(`srcset="${src.replace('.jpg', '.webp')}"`, `srcset="${src}"`, getImgBasicTag(src, lazyLoading, 'd-block w-100 h-auto rounded-circle', '', `review${rev} slide`, 'height="151" width="151"'));
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

function getPicture(src1, src2, img) {
    return `<picture>
                <source ${src1} type="image/webp">
                <source ${src2} type="image/jpeg"> 
                ${img}
            </picture>`;
}

function setWebPImage(id, img) {
    return getPicture(`id='srcWebP${id}'`, `id='srcJPG${id}'`, img);
}

function getImgContainer(link, img, title, cls) {
    return `${divSmall}
        ${getFLink('', link, img, `${noreferrer} ${tBlank} aria-label='${getCleanTitle(title)}'`)}
        ${getH4Tag(title, '', cls)}
    ${cDiv}`
}

function getH4Tag(body, extras = '', cls = '') {
    return `<p class="${tCenter} text-uppercase text-secondary mb-0 h4 mt-2 mb-2 ${cls}" ${extras}>${body}</p>`;
}

function getImgTag(id, alt) {
    return getFinalImg(id, 'img-fluid', alt, '');
}

function getImgBasicTag(src, lazyLoading = '', extraClass = '', id = '', alt = '', extras = '') {
    return getFinalImg(id, extraClass, alt, `src='${src}' ${extras}`, lazyLoading);
}

function getListItem(elem, extra = "", extraCls = "") {
    return getInLi(elem, extraCls, extra);
}

function getBtnModal(target, cls, id, body, extras = '', href = '', isBtn = false, targetBlank = '', link = '') {
    const tmpTag = (isBtn) ? 'button' : 'a';
    const tmpRef = (isBtn) ? '' : `href="#${href}"`;
    const idT = (id != '') ? `id="${id}"` : '';
    const tNone = (!isBtn) ? 'text-decoration-none' : '';

    return (targetBlank != '_blank') ? `<${tmpTag} ${idT} class="${cls} ${tNone}" data-bs-toggle="modal" data-bs-target="#${target}" ${tmpRef} ${extras}>${body}</${tmpTag}>` : `<a href='${link}' target='${targetBlank}' class="${cls}" ${extras}>${body}</a>`;
}

function getBtnShare() {
    let icon = 'share-android-svgrepo-com';
    const matches = navigator.userAgent.match(/Macintosh|MacIntel|iPad|iPhone|iPod/g);
    const matchesWindows = navigator.userAgent.match(/Windows/g);
    if (matches && matches.length > 0) { 
        icon = 'share-ios-export-svgrepo-com';
    } else if (matchesWindows && matchesWindows.length > 0) {
        icon = 'share-windows-svgrepo-com';
    }

    return getListItem(getImage('', '#', `${iconsPath}${icon}.svg`, false, false, "btn-footer", false, "iconFooter", `id="btnShare" title="${genericTranslations.share}" alt="${genericTranslations.share}"`));
}

function getBtnOthers(loc, cls, extra = "", id = '') {
    extra += `title="${genericTranslations.extras}" aria-label="${genericTranslations.extras}"`;
    return getListItem(getBtnModal(loc, `btn btn-outline-light btn-social ${tCenter} rounded-circle ${cls}`, id, getFinalIcon(`plus`), extra));
}

function getCItem(extras) {
    return `<div class="carousel-item ${extras}">`;
}

/*function screenResizeCardHolders() {
    const divs = document.querySelectorAll(".card-holder");
    const width = window.innerWidth;

    divs.forEach(function(div) {
        div.style.width = (width < 992) ? "auto" : "revert-layer";
    });
}*/

function rotatedModal() {
    //Clean old changes
    if (smallScreenMobileOS || equalScreen) {
        const mModals = document.getElementsByClassName("mFullScreen");
        for (let i = 0; i < mModals.length; i++) {
            mModals[i].classList.remove("modal-fullscreen");
        }
        const mModalsH = document.getElementsByClassName("mFullScreenH");
        for (let i = 0; i < mModalsH.length; i++) {
            mModalsH[i].classList.remove("modal-fullscreen");
        }
    }

    if (document.getElementById('contactMeI'))
        iFrameHResize('contactMeI');

    changeModalType();
}

function changeModalType() {
    if (smallScreenMobileOS || equalScreen) {
        const mModals = document.getElementsByClassName("mFullScreen");
        for (let i = 0; i < mModals.length; i++) {
            mModals[i].classList.remove("modal-xl");
            mModals[i].classList.add("modal-fullscreen");
        }

        let landscape = window.matchMedia("(orientation: landscape)");
        if (landscape.matches || equalScreen || actualDev === "Watch") {
            const mModalsH = document.getElementsByClassName("mFullScreenH");
            for (let i = 0; i < mModalsH.length; i++) {
                mModalsH[i].classList.remove("modal-xl");
                mModalsH[i].classList.add("modal-fullscreen");
            }
        }
    }
}

changeModalType();

if (window.matchMedia) {
    window.matchMedia("(orientation: portrait)").addEventListener("change", rotatedModal);
    window.matchMedia("(orientation: landscape)").addEventListener("change", rotatedModal);
} else {
    window.addEventListener("orientationchange", rotatedModal);
}

function handleNavbarVisibility() {
    if (isHandlingVisibility) {
        return;
    }

    isHandlingVisibility = true;

    const dynamicNavItem = document.getElementsByClassName('dynamicNavItem');
    const sMenu = document.getElementById('sMenu');
    const dMenu = document.getElementById('dMenu');

    if (window.getComputedStyle(navbarCollapse).display === 'flex') {
        // Navbar is not visible, remove the dynamicNavItem
        [...dynamicNavItem].forEach(function(element) {
            if (element) {
                element.parentNode.removeChild(element);
            }
        });
        sMenu.style.display = 'block';
        dMenu.style.display = 'block';
    }
    else {
        // Navbar is visible, add the dynamicNavItem
        if (dynamicNavItem.length === 0) {
            setTimeout(function () {
                const ul = document.getElementById('nElems');
                const li = document.createElement('li');
                li.className = 'nav-item mx-0 mx-lg-1 dynamicNavItem';
                li.innerHTML = `<a class="nav-link py-3 px-0 px-lg-3 rounded" href="#divServices">${genericTranslations.servicesM}</a>`;

                ul.insertBefore(li, ul.children[1]);

                const liCC = document.createElement('li');
                liCC.className = 'nav-item mx-0 mx-lg-1 dynamicNavItem';
                liCC.innerHTML = `<a class="nav-link py-3 px-0 px-lg-3 rounded text-white" id="mobileContactMe">${genericTranslations.contactMe}&nbsp;💡</a>`;

                ul.append(liCC);

                const mobileContactMe = document.getElementById("mobileContactMe");
                mobileContactMe.addEventListener(eClick, contactMeForm);
            }, 250);
        }
        sMenu.style.display = 'none';
        dMenu.style.display = 'none';
    }

    isHandlingVisibility = false;
}

function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedHandleNavbarVisibility = debounce(handleNavbarVisibility, 250);

window.addEventListener('resize', debouncedHandleNavbarVisibility);

if (document.readyState !== "loading") {
    handleNavbarVisibility();
} else {
    document.addEventListener("DOMContentLoaded", handleNavbarVisibility);
}

/*function loadHobbies() {
    try {
        const { hobbies, isVisible } = hobbiesList;

        if (isVisible) {
            const hobbiesList = document.getElementById('hobbiesList');

            const finalH = !(smallScreenMobileOS) ? hobbies : hobbies.filter(({isOpt}) => isOpt === false);

            finalH.forEach(item => {
                let btnOptional = item.isOpt ? " btnOptional" : "";

                hobbiesList.innerHTML += getListItem(getHobbyImg(item), '', btnOptional);
            });

            if (smallScreenMobileOS) {
                hobbiesList.innerHTML += getBtnOthers('otherHobbies', 'externalImg', '', '', "btnExtraHobbies");
            }

            const hobbiesOthers = hobbies.filter(({isOpt}) => isOpt === true);

            const optHobbies = document.getElementById('optHobbies');
            hobbiesOthers.forEach(elem => {
                optHobbies.innerHTML += getListItem(getHobbyImg(elem));
            });

            [...document.querySelectorAll('.ignore-click')].forEach(function(element) {
                element.addEventListener(eClick, function(e) {
                    e.preventDefault();
                });
            });

            document.getElementById("linkContactMe").addEventListener(eClick, function(e) {
                e.preventDefault();
            });
        }
        else {
            const divHobbies = document.getElementById("divHobbies");
            divHobbies.classList.add(nVis);
        }
    }
    catch (e) { return e; }
}*/