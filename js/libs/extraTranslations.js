let totalServices = 0;
let fullReviews = [];
let isHandlingVisibility = false;

//const bookEdition = 'second;'
const imgPreview = getImgBasicTag('{URL}', '', '', '', '{Title}', 'style="max-width: 90%"');
const noreferrer = 'rel="noreferrer"';
const tBlank = 'target="_blank"';
const divSmall = '<div class="col-sm">';
const w100 = 'class="w-100"';
const navbarCollapse = gId('navbarResponsive');

let fullData;

fetchData(`${jsonLoc}/extraInfo.json`)
.then(data => {
    fullData = data;
    loadServices(data.servicesList);
    loadSoftSkills(data.softSkills, data.softSkillsOthers);
    loadTechSkills(data.techSkills, data.techSkillsOthers);
    loadSocialMedias(data.socialBasicList, data.socialOthersList);
}).catch((e) => { console.error(e); });

const sections = gAll('section, div');

const loadSectionIfVisible = () => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const triggerPoint = windowHeight * 0.15; // 15% of window height
        const loaded = section.getAttribute('data-loaded');

        if (rect.top < windowHeight - triggerPoint && rect.bottom >= 0 && loaded === "false") {
            //const sectionId = section.getAttribute('id');
            switch (section.getAttribute('id')) {
                case 'divAwards':
                    loadAwards(fullData.awardsList);
                    break;
                case 'divReviews':
                    loadReviews(fullData.reviewsList);
                    break;
                case 'projects':
                    loadPersonalProjects(fullData.personalProjects);
                    break;
                case 'presentations':
                    loadVideosAndPresentations(fullData.youtubeTrainings, fullData.presentationsLinks, fullData.presentationsVideos);
                    loadOrganizedEvents(fullData.organizedEvents);
                    break;
                case 'articles':
                    loadArticles(fullData.articlesList);
                    break;
                case 'newsArticles':
                    loadNewsArticles(fullData.newsArticlesList);
                    break;
                case 'books':
                    loadBookPreview();
                    break;
                default:
                    break;
            }
            section.setAttribute('data-loaded', 'true'); // Mark section as loaded
        }
    });
};

window.addEventListener('scroll', loadSectionIfVisible);
window.addEventListener('resize', loadSectionIfVisible);

// Initial load check
loadSectionIfVisible();

function loadOrganizedEvents(organizedEvents) {
    const { events } = organizedEvents;
    loadImgSection(events, 'divEvents', 'divEvents', imgLocPortfolio, 'Łódźarts', '');
}

function loadArticles(articlesList) {
    const { articles } = articlesList;
    loadImgSection(articles, 'divArticles', 'articlesDiv', imgLocArticles, '', '');
}

function loadNewsArticles(newsArticlesList) {
    const { articles } = newsArticlesList;
    loadImgSection(articles, 'divMMArticles', 'newsArticles', imgLocArticles, '');
}

setTimeout(() => {
    addIFrameModal('service');
    addIFrameModal('lSer');
}, 1000);

function loadBookPreview() {
    loadIframe("bookPreview", 'Timeless Stories of El Salvador', `${urlB}leer.amazon.es/kp/card?asin=B09Z33ZPTV&preview=inline&linkCode=kpe&ref_=cm_sw_r_kb_dp_HJ6YDMXY6BRE1FA9AWE3`, `type="text/html" sandbox="allow-scripts allow-same-origin allow-popups" width="336" height="550" frameborder="0" style="max-width:100%;margin:auto;display:block"`);
}

function loadReviews(reviewsList) {
    try {
        const { reviews } = reviewsList;

        const divReviewsPreviews = gId('divReviewsPreviews');
        //const divReviews = gId("divReviews");
        const divGenericContent = gId('divGenericContent');

        //if (isVisible) {
        let reviewsHTML = '';
        reviews.forEach((item, index) => {
            const currentReview = index + 1;
            const name = item.externalLink !== "" ? getFLink("text-warning", item.externalLink, item.name, `${noreferrer} ${tBlank}`) : item.name;
            const reviewPreview = `${getCItem(`${tCenter}${item.isActive ? " active" : ""}`)}${getReviewContainer("", item.img, currentReview, name, item.title, "", "white", "white", `${item.shortReview}${getBtnModal("reviewGeneric", "text-material-link", `readMore${currentReview}`, genericTranslations.readMore, '', 'reviewGeneric')}`, "", true)}</div>`;
            reviewsHTML += reviewPreview;

            const longReview = item.isPDF ?
                                    `${getImgName(name, item.img, currentReview, "picReviewers")}${getReviewTitle('dark', item.title.replaceAll('text-material-link', "text-material-link-dark"))}${getInnerTitle(item.date)}<div id="review${currentReview}PDF"></div><div class="centerText">${getFLink("btn btn btn-outline-dark", item.pdfLocation, `${getFinalIcon(`download`, 14)}&nbsp;${genericTranslations.download}`, tBlank)}</div>` :
                                    getReviewContainer("picReviewers", item.img, index + 1, name, item.date, getInnerTitle(item.title.replaceAll('text-material-link', "text-material-link-dark")), 'dark', 'black', item.review, "centerText", false);
            
            fullReviews.push({ review: longReview, isPDF: item.isPDF, pdfLocation: item.pdfLocation });
        });

        divReviewsPreviews.innerHTML = reviewsHTML;
        //} else {
        //    divReviews.classList.add(nVis);
        //}

        fullReviews.forEach((item, index) => {
            const rmCurrent = gId(`readMore${index + 1}`);
            rmCurrent.addEventListener(eClick, (e) => {
                e.preventDefault();
                divGenericContent.innerHTML = item.review;

                if (item.isPDF) {
                    PDFObject.embed(item.pdfLocation, `#review${index + 1}PDF`);
                    if (deviceType() === devs[0] || deviceType() === devs[1])
                        gId("review2PDF").style.height = "auto";
                }
            });
        });
    } catch (e) {
        return e;
    }
}

function loadServices(serviceList) {
    try {
        const { services } = serviceList;

        //if (isVisible) {
        const servicesList = gId('servicesList');
        const dropdownMenu = gId('dServices');
        let items = (smallScreen) ? '' : `<div class="row justify-content-center">`;

        services.flat().forEach(elem => {
            const tmlLink = `${urlB}${elem.link}`;

            // Create dropdown item
            let newListItem = document.createElement('li');
            newListItem.innerHTML = `<a class="dropdown-item" id="lSer${totalServices}" ${tBlank} href="${tmlLink}">➤&nbsp;${elem.title}</a>`;
            dropdownMenu.appendChild(newListItem);

            // Create card title
            const title = getCard(tmlLink, `${elem.icon} fSize65`, 'text-white', elem.title, 'card-services', 'fa-icon-services', null, '', true, `service${totalServices}`);

            // Append to items            
            items += getSCItem(totalServices, title);

            totalServices++;
        });

        items = (smallScreen) ? items : `${items}</div>`;

        if (smallScreen) {
            items = getCarousel(items, "carouselServices", 'text-dark');
            const servicesListDiv = gId("servicesList");
            servicesListDiv.classList.remove("row");
            servicesListDiv.classList.add("container");
        }

        servicesList.innerHTML += items;

        if (smallScreen)
            new bootstrap.Carousel('#carouselServices');
        //}
        //else {
        //    const divServices = gId('divServices');
        //    divServices.classList.add(nVis);
        //}
    }
    catch (e) { return e; }
}

function getCarousel(items, id, arrowsColor = 'text-muted', isVideo = false) {
    return `${!isVideo ? `<div class="container-fluid" id="div${id}">` : ''}<div id="${id}" class="carousel slide"><div class="carousel-inner">${items}</div><button class="carousel-control-prev icon-size-22 ${isVideo ? 'carousel-control-prev-video' : 'carousel-control-prev'}" type="button" data-bs-target="#${id}" data-bs-slide="prev" aria-label="Previous"><span class="${arrowsColor} icon-chevron-left-solid"></span></button><button class="carousel-control-next icon-size-22 ${isVideo ? 'carousel-control-next-video' : 'carousel-control-next'}" type="button" data-bs-target="#${id}" data-bs-slide="next" aria-label="Next"><span class="${arrowsColor} icon-chevron-right-solid"></span></button></div>${!!isVideo ? '</div>' : ''}`;
}

function getSCItem(index, title) {
    return (smallScreen) ? `${getCItem(`${(index === 0) ? "active" : ""}"`)}<div class='text-center card-holder'>${title}</div></div>` : `<div class='col-lg-4 col-md-6 col-sm-12 col-12 p-2 text-center card-holder'>${title}</div>`;
}

function loadAwards(awardList) {
    try {
        const { awards } = awardList;

        //if (isVisible) {
        const awardsList = gId('awardsList');
        let availableLinks = [];

        let items = (smallScreen) ? '' : `<div class="row justify-content-center">`;
        awards.flat().forEach((elem, index) => {
            const tmpLink = `${urlB}${elem.link}`;
            const title = getBtnModal('linkPreviews', 'clean-btn card-link text-dark', `linkPreview${index}`, getCard(tmpLink, `trophy fSize50`, 'text-dark', elem.title, 'card-awards', 'fa-icon-awards', null, ''), '', '', true, elem.type, tmpLink);
        
            availableLinks.push({ 
                id: index,
                title: elem.title,
                link: tmpLink,
                type: elem.type
            });
        
            items += getSCItem(index, title);
        });

        items = (smallScreen) ? items : `${items}</div>`;

        if (smallScreen) {
            items = getCarousel(items, "carouselAwards", 'text-dark');
            const awardsListDiv = gId("awardsList");
            awardsListDiv.classList.remove("row");
            awardsListDiv.classList.add("container");
        }

        awardsList.innerHTML += items;

        if (smallScreen)
            new bootstrap.Carousel(`#carouselAwards`);

        availableLinks.forEach(item => {
            if (item.type !== "_blank") {
                const linkPreview = gId(`linkPreview${item.id}`);

                linkPreview.addEventListener(eClick, () => {
                    const btnFullScreenPreview = gId('btn-full-screen-preview');
                    const gTitle = gId('gTitle');

                    gTitle.classList.add(nVis);

                    const gDivTitle = gId('gDivTitle');
                    gDivTitle.classList.add('border-0');

                    const tmpLink = item.link;

                    const lPreview = !(tmpLink.includes("storage.live.com")) ? getIframe(item.title, tmpLink, dIframe('previewerIframeI', 'previewerIframe')) : imgPreview.replace("{URL}", tmpLink).replace("{Title}", item.title);

                    const modalPreview = gId('modal-preview');

                    modalPreview.classList.remove('modal-xl');

                    if (item.type === "img") {
                        modalPreview.classList.add('modal-xl');
                    }

                    btnFullScreenPreview.href = tmpLink;
                    btnFullScreenPreview.setAttribute('title', item.title);
                    btnFullScreenPreview.setAttribute('aria-label', item.title);
                
                    gId('iframeGeneric').innerHTML = lPreview;

                    iFrameHResize('previewerIframeI');
                });
            }
        });
        //screenResizeCardHolders();
        //}
        //else {
        //    const divAwards = gId('divAwards');
        //    divAwards.classList.add(nVis);
        //}
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
        const personalProjectsDiv = gId('personalProjects');
        const items = personalProjects.map(item => {
            const isActive = item.isActive ? " active" : "";
            const link = `${getFLink("text-material-link-dark", `${urlB}${item.link}`, item.title, `${noreferrer} ${tBlank}`)}, ${item.timeFrame}`;
            return `${getCItem(isActive)}<div class="carousel-video-inner">${getUTubeLite(item)}${getH4Tag(link, '')}</div></div>`;
        }).join('');
        personalProjectsDiv.innerHTML = items;
    }
    catch (e) { return e; }
}

function loadVideos(presentationsVideos) {
    try {
        const { presentations } = presentationsVideos;

        const divVideos = gId('divVideos');
        //if (isVisible) {
        loadVideosUTube(presentations, divVideos, 'publicSpeakingDiv');
        //}
        //else {
        //    const hPublicSpeaking = gId('hPublicSpeaking');
        //    hPublicSpeaking.classList.add(nVis);

        //    divVideos.classList.add(nVis);
        //}
    }
    catch (e) { return e; }
}

function loadVideosUTube(presentations, divVideo, divCar) {
    let items = '';

    if (smallScreen) {
        items = presentations.map((item, index) => {
            const vTmp = getUTubeContainer(item, '').replaceAll('class="col-sm"', `class="carousel-video-inner"`);
            return `${getCItem(`${(index === 0) ? "active" : ""}"`)}${vTmp}</div>`;
        }).join('');
        items = getCarousel(items, divCar, 'text-muted', true);
        divVideo.innerHTML = items;
        new bootstrap.Carousel(`#${divCar}`);
    } else {
        let cUTube = 0;
        items = presentations.map(item => {
            let result = getUTubeContainer(item);
            if (cUTube === 0) {
                result += `<div ${w100}></div>`;
            }
            cUTube++;
            return result;
        }).join('');
        divVideo.innerHTML = items;
    }
}

function loadYouTubeVideos(youtubeTrainings) {
    try {
        const { presentations } = youtubeTrainings;
        const divYouTubeVideos = gId('divYouTubeVideos');

        //if (isVisible) {
        loadVideosUTube(presentations, divYouTubeVideos, 'uTubeDiv');
        /*}
        else {
            const hYouTubeTraining = gId('hYouTubeTraining');
            hYouTubeTraining.classList.add(nVis);

            divYouTubeVideos.classList.add(nVis);
        }*/
    }
    catch (e) { return e; }
}

function loadDivPresentations(presentations, divPicture, divCar) {
    let items = '';
    
    if (smallScreen) {
        items = presentations.map((item, index) => {
            const vTmp = getImgContainer(`${urlB}${item.link}`, setWebPImage(item.imgID, getImgTag(item.imgID, item.title)), item.title, '').replaceAll('class="col-sm"', `class="carousel-video-inner"`);
            return `${getCItem(`${(index === 0) ? "active" : ""}"`)}${vTmp}</div>`;
        }).join('');
        items = getCarousel(items, divCar, 'text-muted', true);
        divPicture.innerHTML = items;
    } else {
        items = presentations.map(item => getImgContainer(`${urlB}${item.link}`, setWebPImage(item.imgID, getImgTag(item.imgID, item.title)), item.title)).join('');
        divPicture.innerHTML = items;
    }
    
    setPPTImg(presentations);
    if (smallScreen) new bootstrap.Carousel(`#${divCar}`);
}

function setPPTImg(presentations) {
    presentations.forEach(item => setImage(item.imgID, item.imgBasicName, imgLocPortfolio));
}

function loadPresentations(presentationsLinks) {
    try {
        const { presentations } = presentationsLinks;

        const divPPTs = gId('divPPTs');
        //if (isVisible) {
        loadDivPresentations(presentations, divPPTs, 'presentationsDiv');
        /*}
        else {
            const hPresentations = gId('hPresentations');
            hPresentations.classList.add(nVis);

            divPPTs.classList.add(nVis);

            const pPPTs = gId('pPPTs');
            pPPTs.classList.add(nVis);
        }*/
    }
    catch (e) { return e; }
}

function loadImgSection(list, section, divSection, imgPath, optTitle = '', cls = '') {
    try {
        //if (isVisible) {
        const divSection = gId(section);
        list.forEach(item => {
            const tmpImg = getImgContainer(`${urlB}${item.link}`, setWebPImage(item.imgID, getImgTag(item.imgID, !(optTitle) ? item.title : optTitle)), item.title, cls);
            divSection.innerHTML += tmpImg;
            setImage(item.imgID, item.imgBasicName, imgPath);
        });
        /*}
        else {
            const secDiv = gId(divSection);
            secDiv.classList.add(nVis);
        }*/
    }
    catch (e) { return e; }
}

function loadSocialMedias(socialBasicList, socialOthersList) {
    try {
        const { socialMedia} = socialBasicList;

        //if (isVisible) {
        const socialMediaBasic = gId('socialMediaBasic');
        const socialMediaBasicExtended = gId('social-medias-extended-list');
        const itemsArray = socialMedia.map(item => getListItem(getImage(item.title, `${urlB}${item.link}`, `${item.icon}`, true, true, `btn-footer ${item.id}`, false, "iconFooter")));

        socialMediaBasic.innerHTML = itemsArray.join('');
        socialMediaBasicExtended.innerHTML = itemsArray.join('');

        socialMediaBasicExtended.innerHTML += getBtnShare();

        gId('btnShare').addEventListener(eClick, event => {
            event.preventDefault();

            navigator.share({
                title: genericTranslations.knowMoreTitle,
                text: genericTranslations.knowMoreBody,
                url: window.location.href
            })
            .then(() => {
                console.log('Shared!');
            })
            .catch((error) => {
                console.error(error);
            });
        });

        socialMediaBasic.innerHTML += getBtnOthers('otherLocs', 'btn-footer', "");

        const socialMediaOthers = gId('socialMediaOthers');
        socialOthersList.socialMedia.forEach(elem => {
            socialMediaOthers.innerHTML += getListItem(getImage(elem.title, `${urlB}${elem.link}`, `${elem.icon}`, true, true, "btn-footer", false, "iconFooter"));
        });
    //}
        /*}
        else {
            const aroundWeb = gId('aroundWeb');
            aroundWeb.classList.add(nVis);
        }*/

        if (smallScreenMobileOS) {
            gAll('.uTubeLink').forEach(item => {
                item.href = item.href.replace('www', 'm');
            });            
        }
    }
    catch (e) { return e; }
}

function loadSkills(skills, skillsOthers, divContainer, divOthersContainer, classCollapse, btnMore, itemCollapseID) {
    try {
        const divTmp = gId(divContainer);
        const divOthersContainerDiv = gId(divOthersContainer);

        skills.forEach(item => {
            const items = `${divSmall}<p class="lead">${item.join("<br /><br />")}</p></div>`;
            divTmp.insertAdjacentHTML('afterbegin', items);
        });

        const arias = skillsOthers.map((_, i) => `${itemCollapseID}${i}`).join(' ');
        gId(btnMore).setAttribute("aria-controls", arias);

        skillsOthers.forEach((item, index) => {
            const items = `${divSmall}<div class="collapse multi-collapse${classCollapse}" id="${itemCollapseID}${index}"><div class="card card-body mini-cards">${item.join("<br /><br />")}</div></div></div>`;
            divOthersContainerDiv.insertAdjacentHTML('afterbegin', items);
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
        const cService = gId(`${opt}${serv}`);
        cService.addEventListener(eClick, (e) => {
            e.preventDefault();
            gId("serviceForm").innerHTML = getIframe('Contact me', cService.href, `height="${heightIFrame * 0.8}px" width="100%" id="serviceFormI" frameborder="0" scrolling="yes" style="margin-top:${marginTop}px"`);

            iFrameHResize('serviceFormI');

            const services = new bootstrap.Modal(gId("servicesModal"), {});
            services.show();
        });
    }
}

function loadVideosAndPresentations(youtubeTrainings, presentationsLinks, presentationsVideos) {
    loadVideos(presentationsVideos);
    loadYouTubeVideos(youtubeTrainings);
    loadPresentations(presentationsLinks);
}

function setImage(imgID, imgBasic, imgLoc) {
    //let imgBookSize = '';
    const imgSize = deviceType() == devs[0] ? '_small' : deviceType() == devs[1] ? '_medium' : '';

    const imgTemp = gId(imgID);
    const srcWebP = gId(`srcWebP${imgID}`);
    const srcJPG = gId(`srcJPG${imgID}`);
    //let divBook = gId("myBookDiv");
    //divBook.classList.add(nVis);

    //let imgBook = gId("imgBook");
    //let currentDate = new Date();
    //let validDate = !((currentDate.getMonth() + 1 >= 7) && (currentDate.getFullYear() >= 2022) && (currentDate.getDate() >= 15));

    /*let imgSize = '';
    switch (deviceType()) {
        case devs[0]:
            //imgBookSize = '_small';
            imgSize = '_small';
            break;
        case devs[1]:
            imgSize = '_medium';
            break;
    }*/
    
    imgTemp.src = `${imgLoc}${imgBasic}${imgSize}.jpg`;

    srcWebP.srcset = `${imgLoc}${imgBasic}${imgSize}.webp`;
    srcJPG.srcset = `${imgLoc}${imgBasic}${imgSize}.jpg`;    

    /*if (validDate) {
        imgBook.src = `img/mybook/${bookEdition}${imgBookSize}.png`;
        divBook.classList.add('block');
    }*/

    imgTemp.setAttribute("loading", "lazy");
}

function getUTubeContainer(item, cls) {
    return `${divSmall}${getUTubeLite(item)}${getH4Tag(item.title, '', cls)}</div>`;
}

function getUTubeLite(item) {
    return `<lite-youtube class="iVideos" videoid="${item.youTubeID}" playlabel="${item.title}"></lite-youtube>`;
}

function getImgPreview(img, currentReview, extraClass) {
    return `<div class="img-box p-1 border rounded-circle m-auto ${extraClass}">${getImgReview(img, currentReview)}</div>`;
}

function getReviewName(name, isLarge) {
    const extraCss = (smallScreen) && isLarge ? "style='font-size: larger!important'" : '';
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
    return `${getImgName(name, img, currentReview, extraClass, isLarge)}${extraTitle}${getReviewTitle(txtColor, title, cssCentered)}<p class="m-0 pt-3 text-${txtColor2}">${content}</p>`;
}

function getImgName(name, img, currentReview, extraClass, isLarge) {
    return `${getImgPreview(img, currentReview, extraClass)}
    ${getReviewName(name, isLarge)}`;
}

function getPicture(src1, src2, img) {
    return `<picture><source ${src1} type="image/webp"><source ${src2} type="image/jpeg">${img}</picture>`;
}

function setWebPImage(id, img) {
    return getPicture(`id='srcWebP${id}'`, `id='srcJPG${id}'`, img);
}

function getImgContainer(link, img, title, cls) {
    return `${divSmall}${getFLink('', link, img, `${noreferrer} ${tBlank} aria-label='${getCleanTitle(title)}'`)}${getH4Tag(title, '', cls)}</div>`
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

    return (targetBlank != '_blank') ? `<${tmpTag} ${(id != '') ? `id="${id}"` : ''} class="${cls} ${(!isBtn) ? 'text-decoration-none' : ''}" data-bs-toggle="modal" data-bs-target="#${target}" ${(isBtn) ? '' : `href="#${href}"`} ${extras}>${body}</${tmpTag}>` : `<a href='${link}' target='${targetBlank}' class="${cls}" ${extras}>${body}</a>`;
}

function getBtnShare() {
    let icon = 'share';
    const isMac = /Macintosh|MacIntel|iPad|iPhone|iPod/i.test(navigator.userAgent);
    const isWindows = /Windows/i.test(navigator.userAgent);
    const share = genericTranslations.share ? genericTranslations.share : '';

    icon = isMac ? `ios_${icon}` : isWindows ? `windows_${icon}` : icon;

    return getListItem(getImage('', '#', icon, false, true, "btn-footer", false, "iconFooter", `id="btnShare" title="${share}" alt="${share}"`));
}

function getBtnOthers(loc, cls, extra = "", id = '') {
    const ext = genericTranslations.extras ? genericTranslations.extras : '';
    extra += `title="${ext}" aria-label="${ext}"`;
    return getListItem(getBtnModal(loc, `btn btn-outline-light btn-social ${tCenter} rounded-circle ${cls}`, id, getFinalIcon('plus'), extra));
}

function getCItem(extras) {
    return `<div class="carousel-item ${extras}">`;
}

/*function screenResizeCardHolders() {
    const divs = gAll(".card-holder");
    const width = window.innerWidth;

    divs.forEach(div => {
        div.style.width = (width < 992) ? "auto" : "revert-layer";
    });
}*/

function rotatedModal() {
    //Clean old changes
    if (smallScreen) {
        gAll(".mFullScreen").forEach(modal => {
            modal.classList.remove("modal-fullscreen");
        });

        gAll(".mFullScreenH").forEach(modal => {
            modal.classList.remove("modal-fullscreen");
        });
    }

    if (gId('contactMeI'))
        iFrameHResize('contactMeI');

    changeModalType();
}

function changeModalType() {
    if (smallScreen) {
        gAll(".mFullScreen").forEach(modal => {
            modal.classList.remove("modal-xl");
            modal.classList.add("modal-fullscreen");
        });

        let landscape = window.matchMedia("(orientation: landscape)");
        if (landscape.matches || equalScreen || actualDev === devs[3]) {
            gAll(".mFullScreenH").forEach(modal => {
                modal.classList.remove("modal-xl");
                modal.classList.add("modal-fullscreen");
            });
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
    const sMenu = gId('sMenu');
    const dMenu = gId('dMenu');

    if (window.getComputedStyle(navbarCollapse).display === 'flex') {
        // Navbar is not visible, remove the dynamicNavItem
        [...dynamicNavItem].forEach((elem) => {
            if (elem) {
                elem.parentNode.removeChild(elem);
            }
        });
        sMenu.style.display = 'block';
        dMenu.style.display = 'block';
    }
    else {
        // Navbar is visible, add the dynamicNavItem
        if (dynamicNavItem.length === 0) {
            setTimeout(() => {
                const ul = gId('nElems');
                const li = document.createElement('li');
                li.className = 'nav-item mx-0 mx-lg-1 dynamicNavItem';
                li.innerHTML = `<a class="nav-link py-3 px-0 px-lg-3 rounded" href="#divServices">${genericTranslations.servicesM}</a>`;

                ul.insertBefore(li, ul.children[1]);

                const liCC = document.createElement('li');
                liCC.className = 'nav-item mx-0 mx-lg-1 dynamicNavItem';
                liCC.innerHTML = `<a class="nav-link py-3 px-0 px-lg-3 rounded text-white" id="mobileContactMe">${genericTranslations.contactMe}&nbsp;💡</a>`;

                ul.append(liCC);

                const mobileContactMe = gId("mobileContactMe");
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
        const later = () => {
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
            const hobbiesList = gId('hobbiesList');

            const finalH = !(smallScreenMobileOS) ? hobbies : hobbies.filter(({isOpt}) => isOpt === false);

            finalH.forEach(item => {
                let btnOptional = item.isOpt ? " btnOptional" : "";

                hobbiesList.innerHTML += getListItem(getHobbyImg(item), '', btnOptional);
            });

            if (smallScreenMobileOS) {
                hobbiesList.innerHTML += getBtnOthers('otherHobbies', 'externalImg', '', '', "btnExtraHobbies");
            }

            const hobbiesOthers = hobbies.filter(({isOpt}) => isOpt === true);

            const optHobbies = gId('optHobbies');
            hobbiesOthers.forEach(elem => {
                optHobbies.innerHTML += getListItem(getHobbyImg(elem));
            });

            gAll('.ignore-click').forEach(function(element) {
                element.addEventListener(eClick, function(e) {
                    e.preventDefault();
                });
            });

            gId("linkContactMe").addEventListener(eClick, function(e) {
                e.preventDefault();
            });
        }
        else {
            const divHobbies = gId("divHobbies");
            divHobbies.classList.add(nVis);
        }
    }
    catch (e) { return e; }
}*/
