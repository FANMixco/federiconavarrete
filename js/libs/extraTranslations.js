let totalServices = 0,
    isHandlingVisibility = false,
    fullData,
    failedDMenu = null;

//const bookEdition = 'second;'
const imgPreview = getImgBasicTag('{URL}', '', '', '', '{Title}', 'style="max-width: 90%"'),
    noreferrer = 'rel="noreferrer"',
    tBlank = 'target="_blank"',
    w100 = 'class="w-100"',
    divSmall = '<div class="col-sm">';

fetchData(`${jsonLoc}/extraInfo.json`)
    .then(data => {
        fullData = data;
        loadServices(data.servicesList);
        loadSoftSkills(data.softSkills, data.softSkillsOthers);
        loadTechSkills(data.techSkills, data.techSkillsOthers);
        loadSocialMedias(data.socialBasicList, data.socialOthersList);

        function loadServices(serviceList) {
            try {
                const { services } = serviceList;

                const servicesList = gId('servicesList'),
                    dropdownMenu = gId('dServices');
                let items = (smallScreen) ? '' : `<div class="row justify-content-center">`;

                services.flat().forEach(elem => {
                    const tmlLink = `${urlB}${elem.link}`;

                    // Create dropdown item
                    let newListItem = document.createElement('li');
                    newListItem.innerHTML = `<a class="dropdown-item" id="lSer${totalServices}" ${tBlank} href="${tmlLink}">➤&nbsp;${elem.title}</a>`;
                    dropdownMenu.appendChild(newListItem);

                    // Append to items            
                    items += getSCItem(totalServices, getCard(tmlLink, `${elem.icon} fSize65`, 'text-white', elem.title, 'card-services', 'fa-icon-services', null, '', true, `service${totalServices}`));

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

                if (smallScreen) {
                    new bootstrap.Carousel('#carouselServices');
                }
            }
            catch (e) { return e; }
        }

        function loadSoftSkills(softSkills, softSkillsOthers) {
            try {
                loadSkills(softSkills, softSkillsOthers, "divSoftSkills", "divSoftSkillsOther", "-business");
            }
            catch (e) { return e; }
        }

        function loadTechSkills(techSkills, techSkillsOthers) {
            try {
                loadSkills(techSkills, techSkillsOthers, "divTechSkills", "divTechSkillsOthers", "");
            }
            catch (e) { return e; }
        }

        function loadSkills(skills, skillsOthers, divContainer, divOthersContainer, classCollapse) {
            try {
                skills.forEach(item => {
                    gId(divContainer).insertAdjacentHTML('afterbegin', `${divSmall}<p class="lead">${item.join("<br /><br />")}</p></div>`);
                });

                skillsOthers.forEach((item) => {
                    gId(divOthersContainer).insertAdjacentHTML('afterbegin', `${divSmall}<div class="collapse multi-collapse${classCollapse}"><div class="card card-body mini-cards">${item.join("<br /><br />")}</div></div></div>`);
                });
            }
            catch (e) { return e; }
        }

        function loadSocialMedias(socialBasicList, socialOthersList) {
            try {
                const { socialMedia } = socialBasicList;

                const socialMediaBasic = gId('socialMediaBasic'),
                    socialMediaBasicExtended = gId('social-medias-extended-list'),
                    itemsArray = socialMedia.map(item => getListItem(getImage(item.title, `${urlB}${item.link}`, `${item.icon}`, true, true, `btn-footer ${item.id}`, false, "iconFooter")));

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

                socialOthersList.socialMedia.forEach(elem => {
                    gId('socialMediaOthers').innerHTML += getListItem(getImage(elem.title, `${urlB}${elem.link}`, `${elem.icon}`, true, true, "btn-footer", false, "iconFooter"));
                });

                if (smallScreenMobileOS) {
                    gAll('.uTubeLink').forEach(item => {
                        item.href = item.href.replace('www', 'm');
                    });
                }
            }
            catch (e) { return e; }

            function getBtnOthers(loc, cls, extra = "", id = '') {
                const ext = genericTranslations.extras ? genericTranslations.extras : '';
                extra += `title="${ext}" aria-label="${ext}"`;
                return getListItem(getBtnModal(loc, `btn btn-outline-light btn-social ${tCenter} rounded-circle ${cls}`, id, getFinalIcon('plus'), extra));
            }

            function getBtnShare() {
                let icon = 'share';
                const isMac = /Macintosh|MacIntel|iPad|iPhone|iPod/i.test(navigator.userAgent),
                    isWindows = /Windows/i.test(navigator.userAgent),
                    share = genericTranslations.share ? genericTranslations.share : '';

                icon = isMac ? `ios_${icon}` : isWindows ? `windows_${icon}` : icon;

                return getListItem(getImage('', '#', icon, false, true, "btn-footer", false, "iconFooter", `id="btnShare" title="${share}" alt="${share}"`));
            }
        }

    }).catch((e) => { console.error(e); });

const loadSectionIfVisible = () => {
    let fullReviews = [];

    gAll('section, div').forEach(section => {
        const rect = section.getBoundingClientRect(),
            windowHeight = window.innerHeight || document.documentElement.clientHeight,
            triggerPoint = windowHeight * 0.15, // 15% of window height
            loaded = section.getAttribute('data-loaded');

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

    function loadAwards(awardList) {
        try {
            const { awards } = awardList;

            const awardsList = gId('awardsList');
            let availableLinks = [],
                items = (smallScreen) ? '' : `<div class="row justify-content-center">`;

            awards.flat().forEach((elem, index) => {
                const tmpLink = `${urlB}${elem.link}`,
                    title = getBtnModal('linkPreviews', 'clean-btn card-link text-dark', `linkPreview${index}`, getCard(tmpLink, `trophy fSize50`, 'text-dark', elem.title, 'card-awards', 'fa-icon-awards', null, ''), '', '', true, elem.type, tmpLink);

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

            if (smallScreen) {
                new bootstrap.Carousel(`#carouselAwards`);
            }

            availableLinks.forEach(item => {
                if (item.type !== "_blank") {
                    gId(`linkPreview${item.id}`).addEventListener(eClick, () => {
                        const btnFullScreenPreview = gId('btn-full-screen-preview'),
                            tmpLink = item.link,
                            modalPreview = gId('modal-preview');

                        gId('gTitle').classList.add(nVis);
                        gId('gDivTitle').classList.add('border-0');

                        modalPreview.classList.remove('modal-xl');

                        if (item.type === "img") {
                            modalPreview.classList.add('modal-xl');
                        }

                        btnFullScreenPreview.href = tmpLink;
                        btnFullScreenPreview.setAttribute('title', item.title);
                        btnFullScreenPreview.setAttribute('aria-label', item.title);

                        gId('iframeGeneric').innerHTML = !(tmpLink.includes("storage.live.com")) ? getIframe(item.title, tmpLink, dIframe('previewerIframeI', 'previewerIframe')) : imgPreview.replace("{URL}", tmpLink).replace("{Title}", item.title);

                        iFrameHResize('previewerIframeI');
                    });
                }
            });
        }
        catch (e) { return e; }
    }

    function loadReviews(reviewsList) {
        try {
            const { reviews } = reviewsList;

            const divReviewsPreviews = gId('divReviewsPreviews'),
                divGenericContent = gId('divGenericContent');

            let reviewsHTML = '';
            reviews.forEach((item, index) => {
                const currentReview = index + 1,
                    name = item.externalLink !== "" ? getFLink("text-warning", item.externalLink, item.name, `${noreferrer} ${tBlank}`) : item.name,
                    reviewPreview = `${getCItem(`${tCenter}${item.isActive ? " active" : ""}`)}${getReviewContainer(item.img, '', currentReview, name, item.title, "", item.review, true)}</div>`;

                reviewsHTML += reviewPreview;

                const longReview = getReviewContainer(item.img, "picReviewers", currentReview, name, item.title, item.date, item.review, false, true, item.isPDF);

                fullReviews.push({ review: longReview, isPDF: item.isPDF, pdfLocation: item.pdfLocation });
            });

            divReviewsPreviews.innerHTML = reviewsHTML;

            fullReviews.forEach((item, index) => {
                gId(`readMore${index + 1}`).addEventListener(eClick, (e) => {
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

        function getContent(content, color, isTitle = false) {
            const extras = (isTitle) ? 'text-center fst-italic p-1' : 'pt-3';
            return `<p class="m-0 text-${color} ${extras}">${content}</p>`;
        }

        function getReviewContainer(img, cssImg, reviewIndex, name, title, subtitle, content, isShort = true, isLarge = true, isPDF = false) {
            const titleColor = (isShort) ? 'white' : 'dark';
            content = (isShort) ?
                getContent(`${getShortReview(content)}&nbsp;${getBtnModal("reviewGeneric", "text-material-link", `readMore${reviewIndex}`, genericTranslations.readMore, '', 'reviewGeneric')}</p>`, 'white') :
                (isPDF) ?
                    `<br><div id="review${reviewIndex}PDF"></div><br><div class="text-center">${getFLink("btn btn-dark", content, `${getFinalIcon(`download`, 14)}&nbsp;${genericTranslations.download}`, tBlank)}</div>` :
                    getContent(content, 'black');

            return `${getImgName(name, img, reviewIndex, cssImg, isLarge)}${getContent(title, titleColor, true)}${(subtitle) ? getContent(subtitle, titleColor, true) : ''}${content}`;
        }


        function getImgName(name, img, currentReview, extraClass, isLarge) {
            return `${getImgPreview(img, currentReview, extraClass)}${getReviewName(name, isLarge)}`;
        }

        function getImgPreview(img, currentReview, extraClass) {
            return `<div class="img-box p-1 border rounded-circle m-auto ${extraClass}">${getImgReview(img, currentReview)}</div>`;
        }

        function getImgReview(src, rev) {
            return getPicture(`srcset="${src.replace('.jpg', '.webp')}"`, `srcset="${src}"`, getImgBasicTag(src, lazyLoading, 'd-block w-100 h-auto rounded-circle', '', `review${rev} slide`, 'height="151" width="151"'));
        }

        function getReviewName(name, isLarge) {
            return `<p class="mt-4 mb-0 ${tCenter} h5 p-1 text-material-orange text-uppercase" ${(smallScreen) && isLarge ? "style='font-size: larger!important'" : ''}>${name}</p>`;
        }

        function getShortReview(str) {
            const words = str.split(/\s+/),
                first30Words = words.slice(0, 30);

            return first30Words.join(' ') + ' …';
        }
    }

    function getImgTag(id, alt) {
        return getFinalImg(id, 'img-fluid', alt, '');
    }

    function getH4Tag(body, extras = '', cls = '') {
        return `<p class="${tCenter} text-uppercase text-secondary mb-0 h4 mt-2 mb-2 ${cls}" ${extras}>${body}</p>`;
    }

    function loadPersonalProjects(personalProjects) {
        try {
            const items = personalProjects.map(item => {
                const isActive = item.isActive ? " active" : "",
                    link = `${getFLink("text-material-link-dark", `${urlB}${item.link}`, item.title, `${noreferrer} ${tBlank}`)}, ${item.timeFrame}`;
                return `${getCItem(isActive)}<div class="carousel-video-inner">${getUTubeLite(item)}${getH4Tag(link, '')}</div></div>`;
            }).join('');
            gId('personalProjects').innerHTML = items;
        }
        catch (e) { return e; }
    }

    function loadVideosAndPresentations(youtubeTrainings, presentationsLinks, presentationsVideos) {
        loadVideos(presentationsVideos);
        loadYouTubeVideos(youtubeTrainings);
        loadPresentations(presentationsLinks);

        function loadYouTubeVideos(youtubeTrainings) {
            try {
                const { presentations } = youtubeTrainings;

                loadVideosUTube(presentations, gId('divYouTubeVideos'), 'uTubeDiv');
            }
            catch (e) { return e; }
        }
    }

    function loadPresentations(presentationsLinks) {
        try {
            const { presentations } = presentationsLinks;

            loadDivPresentations(presentations, gId('divPPTs'), 'presentationsDiv');
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

        function setPPTImg(presentations) {
            presentations.forEach(item => setImage(item.imgID, item.imgBasicName, imgLocPortfolio));
        }
    }

    function loadOrganizedEvents(organizedEvents) {
        const { events } = organizedEvents;
        loadImgSection(events, 'divEvents', imgLocPortfolio, 'Łódźarts', '');
    }

    function loadArticles(articlesList) {
        const { articles } = articlesList;
        loadImgSection(articles, 'divArticles', imgLocArticles, '', '');
    }

    function loadNewsArticles(newsArticlesList) {
        const { articles } = newsArticlesList;
        loadImgSection(articles, 'divMMArticles', imgLocArticles, '');
    }

    function loadBookPreview() {
        loadIframe("bookPreview", 'Timeless Stories of El Salvador', `${urlB}leer.amazon.es/kp/card?asin=B09Z33ZPTV&preview=inline&linkCode=kpe&ref_=cm_sw_r_kb_dp_HJ6YDMXY6BRE1FA9AWE3`, `type="text/html" sandbox="allow-scripts allow-same-origin allow-popups" width="336" height="550" frameborder="0" style="max-width:100%;margin:auto;display:block"`);
    }

    function setWebPImage(id, img) {
        return getPicture(`id='srcWebP${id}'`, `id='srcJPG${id}'`, img);
    }

    function getPicture(src1, src2, img) {
        return `<picture><source ${src1} type="image/webp"><source ${src2} type="image/jpeg">${img}</picture>`;
    }

    function loadImgSection(list, section, imgPath, optTitle = '', cls = '') {
        try {
            const divSection = gId(section);
            list.forEach(item => {
                divSection.innerHTML += getImgContainer(`${urlB}${item.link}`, setWebPImage(item.imgID, getImgTag(item.imgID, !(optTitle) ? item.title : optTitle)), item.title, cls);
                setImage(item.imgID, item.imgBasicName, imgPath);
            });
        }
        catch (e) { return e; }
    }

    function getImgContainer(link, img, title, cls) {
        return `${divSmall}${getFLink('', link, img, `${noreferrer} ${tBlank} aria-label='${getCleanTitle(title)}'`)}${getH4Tag(title, '', cls)}</div>`
    }

    function setImage(imgID, imgBasic, imgLoc) {
        //let imgBookSize = '';
        const imgSize = deviceType() == devs[0] ? '_small' : deviceType() == devs[1] ? '_medium' : '',
            imgTemp = gId(imgID);
        //,
        //srcWebP = gId(`srcWebP${imgID}`),
        //srcJPG = gId(`srcJPG${imgID}`);

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

        gId(`srcWebP${imgID}`).srcset = `${imgLoc}${imgBasic}${imgSize}.webp`;
        gId(`srcJPG${imgID}`).srcset = `${imgLoc}${imgBasic}${imgSize}.jpg`;

        /*if (validDate) {
            imgBook.src = `img/mybook/${bookEdition}${imgBookSize}.png`;
            divBook.classList.add('block');
        }*/

        imgTemp.setAttribute("loading", "lazy");
    }

    function loadVideos(presentationsVideos) {
        try {
            const { presentations } = presentationsVideos;

            loadVideosUTube(presentations, gId('divVideos'), 'publicSpeakingDiv');
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

        function getUTubeContainer(item, cls) {
            return `${divSmall}${getUTubeLite(item)}${getH4Tag(item.title, '', cls)}</div>`;
        }
    }

    function getUTubeLite(item) {
        return `<lite-youtube class="iVideos" videoid="${item.youTubeID}" playlabel="${item.title}"></lite-youtube>`;
    }
};

window.addEventListener('scroll', loadSectionIfVisible);

// Initial load check
loadSectionIfVisible();

setTimeout(() => {
    addIFrameModal('service');
    addIFrameModal('lSer');

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
}, 1000);

function getCarousel(items, id, arrowsColor = 'text-muted', isVideo = false) {
    return `${!isVideo ? `<div class="container-fluid" id="div${id}">` : ''}<div id="${id}" class="carousel slide"><div class="carousel-inner">${items}</div><a class="carousel-control-prev icon-size-22 ${isVideo ? 'carousel-control-prev-video' : 'carousel-control-prev'}" type="button" data-bs-target="#${id}" data-bs-slide="prev" aria-label="Previous" rel="nofollow"><span class="${arrowsColor} icon-chevron-left-solid"></span></a><a class="carousel-control-next icon-size-22 ${isVideo ? 'carousel-control-next-video' : 'carousel-control-next'}" type="button" data-bs-target="#${id}" data-bs-slide="next" aria-label="Next" rel="nofollow"><span class="${arrowsColor} icon-chevron-right-solid"></span></a></div>${!!isVideo ? '</div>' : ''}`;
}

function getSCItem(index, title) {
    return (smallScreen) ? `${getCItem(`${(index === 0) ? "active" : ""}"`)}<div class='text-center card-holder'>${title}</div></div>` : `<div class='col-lg-4 col-md-6 col-sm-12 col-12 p-2 text-center card-holder'>${title}</div>`;
}

function getCard(link, icon, txtColor, title, cOption, iOption, iHeight, extras = '', hasLink = false, idL = '') {
    return `${hasLink ? `<a href="${link}" ${idL != '' ? `id='${idL}'` : ''} class='card-link ${txtColor}'>` : ''}<div class="card card-ser ${cOption}" ${(!extras) ? '' : `style="${extras}"`}><div class="card-body ${tCenter}"><h5 class="card-title"><div class='${iOption} card-icon'>${getFinalIcon(icon, iHeight)}</div></h5><br /><h6 class="card-subtitle mb-2">${title}</h6></div></div>${hasLink ? '</a>' : ''}`;
}

function getImgBasicTag(src, lazyLoading = '', extraClass = '', id = '', alt = '', extras = '') {
    return getFinalImg(id, extraClass, alt, `src='${src}' ${extras}`, lazyLoading);
}

function getFinalImg(id, imgCls, alt, extras, lLoading = lazyLoading) {
    return `<img ${(id != '') ? `id="${id}"` : ''} ${(imgCls != '') ? `class="${imgCls}"` : ''} ${lLoading} ${extras} alt="${getCleanTitle(alt)}" />`
}

function getCleanTitle(alt) {
    tagRegExp = !(tagRegExp) ? new RegExp('<\s*[^>]*>', 'g') : tagRegExp;
    return alt.replace(tagRegExp, '');
}

function getListItem(elem, extra = "", extraCls = "") {
    return getInLi(elem, extraCls, extra);
}

function getBtnModal(target, cls, id, body, extras = '', href = '', isBtn = false, targetBlank = '', link = '') {
    const tmpTag = (isBtn) ? 'button' : 'a';

    return (targetBlank != '_blank') ? `<${tmpTag} ${(id != '') ? `id="${id}"` : ''} class="${cls} ${(!isBtn) ? 'text-decoration-none' : ''}" data-bs-toggle="modal" data-bs-target="#${target}" ${(isBtn) ? '' : `href="#${href}"`} ${extras}>${body}</${tmpTag}>` : `<a href='${link}' target='${targetBlank}' class="${cls}" ${extras}>${body}</a>`;
}

function getCItem(extras) {
    return `<div class="carousel-item ${extras}">`;
}

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

        if (window.matchMedia("(orientation: landscape)").matches || equalScreen || actualDev === devs[3]) {
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

    const sMenu = gId('sMenu'),
        dMenu = gId('dMenu'),
        display = ['display:flex !important', 'display:none !important'];

    if (window.getComputedStyle(gId('navbarResponsive')).display === 'flex') {
        // Navbar is not visible, remove the dynamicNavItem
        [...document.getElementsByClassName('dynamicNavItem')].forEach((elem) => {
            if (elem) {
                elem.parentNode.removeChild(elem);
            }
        });
        menuHideShow(sMenu, display[0]);
        menuHideShow(dMenu, display[0]);
    }
    else {
        menuHideShow(sMenu, display[1]);
        menuHideShow(dMenu, display[1]);
        if (!genericTranslations) {
            failedDMenu = true;
        }
        else {
            try {
                loadDynamicMenu();
            } catch {
                failedDMenu = true;
            }
        }
    }

    isHandlingVisibility = false;

    function menuHideShow(menu, display) {
        menu.setAttribute('style', display);
    }
}

function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this,
            args = arguments;
        const later = () => {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function loadDynamicMenu() {
    // Navbar is visible, add the dynamicNavItem
    if (document.getElementsByClassName('dynamicNavItem').length === 0) {
        const ul = gId('nElems');
        let li = document.createElement('li'),
            liC = createLiContent('divServices', genericTranslations.servicesM, '');
        li.className = liC[0];
        li.innerHTML = liC[1];

        ul.insertBefore(li, ul.children[1]);

        li = document.createElement('li');//,

        liC = createLiContent('mobileContactMe', `${genericTranslations.contactMe}&nbsp;💡`, 'text-white');
        li.className = liC[0];
        li.innerHTML = liC[1];

        ul.append(li);

        gId("mobileContactMe").addEventListener(eClick, contactMeForm);

        failedDMenu = false;
    }

    function createLiContent(id, text, color) {
        return ['nav-item mx-0 mx-lg-1 dynamicNavItem', `<a class="nav-link py-3 px-0 px-lg-3 rounded ${color}" href="#${id}">${text}</a>`];
    }
}

const debouncedHandleNavbarVisibility = debounce(handleNavbarVisibility, 250);

if (document.readyState !== "loading") {
    handlingResize();
} else {
    document.addEventListener("DOMContentLoaded", handlingResize);
}

function handlingResize() {
    handleNavbarVisibility();
    window.addEventListener('resize', () => {
        loadSectionIfVisible();
        debouncedHandleNavbarVisibility();
    });
}