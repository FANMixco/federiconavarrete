let tErr1,
    currentLoc = '',
    genericTranslations,
    basicInfo,
    totalGenerics;

fetchData(`${jsonLoc}/generics.json`)
    .then(data => {
        genericTranslations = data;

        loadTranslationsWithRetry(loadTranslations, (err) => {
            if (!err) {
                // handle result
                fetchData(`${jsonLoc}/basicInfo.json`).then(data => {
                    basicInfo = data;
                    loadTranslationsWithRetry(loadBasicInfo, () => { });
                    addExtraIcons();
                })
                    .catch((e) => {
                        console.error(e);
                    });
            }
        });
    }).catch((e) => { console.error(e); });

function addExtraIcons() {
    gAll('.btn-preview').forEach(item => {
        item.innerHTML = `${getFinalIcon('gallery', 21)}&ensp;${item.innerHTML}`;
    });

    gAll('.btn-book').forEach(item => {
        item.innerHTML = `${getFinalIcon('download')}&nbsp;&nbsp;${item.innerHTML}`;
    });
}

// the retry function that takes a callback
function retry(maxRetries, delay, fn, callback) {
    // call the function and get a result
    let result = fn();
    // check the result
    if (result) {
        // if the result is truthy, call the callback with the result
        callback(null, result);
    } else {
        // if the result is falsy, check the maxRetries and delay
        if (maxRetries <= 0) {
            // if no more retries left, call the callback with an error
            callback(new Error('Max retries reached'));
        } else {
            // if there are retries left, wait for the delay and try again
            setTimeout(() => {
                // call retry recursively with one less retry
                retry(maxRetries - 1, delay, fn, callback);
            }, delay);
        }
    }
}

// wrap loadTranslations with retry and delay
let loadTranslationsWithRetry = function (fn, callback) {
    retry(3, 150, fn, callback);
};

function loadGenerics(dTrans) {
    dTrans.forEach(item => {
        item.innerHTML = genericTranslations[item.dataset.translation];
    });
}

function loadTranslations() {
    try {
        gAll('button.btn-close').forEach(item => {
            item.setAttribute("aria-label", genericTranslations.close);
        });

        gAll('[data-title-translation]').forEach(item => {
            const trans = genericTranslations[item.dataset.titleTranslation];
            item.setAttribute("aria-label", trans);
            item.title = trans;
        });

        const dTrans = gAll('[data-translation]');
    
        totalGenerics = dTrans.length;

        loadGenerics(dTrans);

        gAll('.btn-preview').forEach(item => {
            item.addEventListener(eClick, () => {
                currentLoc = (currentLoc != item.dataset.action) ? item.dataset.action : currentLoc;
                const url = `${urlB}${currentLoc}.federiconavarrete.com`,
                      pTitle = (currentLoc == 'apps') ? genericTranslations.projectsGallery : genericTranslations.presentationsGallery,
                      btnFullScreen = gId('btn-full-screen'),
                      hFrameGeneric = 450;

                gId('zoomTitle').innerHTML = pTitle;

                loadIframe("divPreview", pTitle, `${url}?isIframe=true`, 'id="gPreview" allowfullscreen');

                btnFullScreen.href = url;
                btnFullScreen.setAttribute('title', pTitle);
                btnFullScreen.setAttribute('aria-label', pTitle);

                let hPreviewHeight = `${hFrameGeneric}px`;
                if (smallScreen) {
                    const height = equalScreen ? document.documentElement.clientHeight * 0.6 : window.matchMedia("(orientation: portrait)").matches ? document.documentElement.clientHeight * 0.85 : document.documentElement.clientHeight * 0.7;
                    hPreviewHeight = `${height}px`;
                }
                else if (devicePortraitAndLong) {
                    hPreviewHeight = `${hFrameGeneric * 1.5}px`;
                }
                gId('gPreview').style.height = hPreviewHeight;
            });
        });

        return true;
    }
    catch {
        return false;
    }
}

function loadBasicInfo() {
    try {
        const { name, headline, headlineIntro, aboutDesc, favBook, favPodcast, company } = basicInfo;

        const hName = gId('hName'),
            hHeadline = gId('hHeadline'),
            hIntro = gId('hIntro'),
            divAbout = gId('divAbout'),
            favBookDiv = gId('favBook'),
            favPodcastDiv = gId('favPodcast'),
            listContacts = gId('listContacts');

        gAll('.nav-link').forEach(item => {
            item.addEventListener(eClick, () => {
                isMenuTriggered = true;
                if (extraContact === 0) {
                    setTimeout(contactMeForm, 5000);
                }
                extraContact++;
            });
        });

        hName.innerHTML = name;
        hHeadline.innerHTML = headline;
        hIntro.innerHTML = headlineIntro;
        divAbout.innerHTML = '';

        aboutDesc.forEach(item => {
            divAbout.innerHTML += `<div class="col-sm"><p class="lead">${item}</p></div>`;
        });

        favBookDiv.innerHTML = getActionBtn(`${urlB}${favBook.link}`, 'download', favBook.title);

        favPodcastDiv.innerHTML = getActionBtn(`${urlB}${favPodcast.link}`, 'spotify', favPodcast.title);

        listContacts.innerHTML = getInLineBtn(company.name, `${urlB}${company.link}`, "building-solid", true) + listContacts.innerHTML;

        gId('aElSalvador').addEventListener(eClick, () => {
            if (!gId('iframeElSalvador')) {
                loadIframe('divIframElSalvador', 'SV Map', `${urlB}www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984252.4374393197!2d-90.05167866086293!3d13.749114461377241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6327a659640657%3A0x6f9a16eb98854832!2sEl+Salvador!5e0!3m2!1sen!2spl!4v1555793789038!5m2!1sen!2spl`, dIframe('iframeElSalvador', 'previewerIframe'));

                iFrameHResize('iframeElSalvador');
            }
        }, false);

        gAll("#linkContactMe, #linkContactMeAbout, #contactMeFloat").forEach(item => {
            item.addEventListener(eClick, contactMeForm);
        });

        gId('youTubePreview').addEventListener(eClick, () => {
            const gTitle = gId('gTitle'),
                  btnFullScreenPreview = gId('btn-full-screen-preview');

            gTitle.innerHTML = genericTranslations.winning;
            gTitle.classList.remove(nVis);

            gId('gDivTitle').classList.remove('border-0');

            gId('modal-preview').classList.add('modal-xl');

            loadIframe('iframeGeneric', 'Federico Navarrete', `${urlB}www.youtube.com/embed/IcWZ962uYy0`, dIframe('yIframeP', 'previewerIframe'), true);

            iFrameHResize('yIframeP', 0.7);

            btnFullScreenPreview.href = `${urlB}bit.ly/3p9hMGJ`;
            btnFullScreenPreview.setAttribute('title', genericTranslations.winning);
            btnFullScreenPreview.setAttribute('aria-label', genericTranslations.winning);
        });

        gAll('.iLang').forEach(item => {
            item.src = `pages/${item.getAttribute('data-page')}.html?lang=${uLang}`;
        });
        return true;
    }
    catch {
        return false;
    }

    function getActionBtn(link, icon, title) {
        return getFLink("btn btn-xl btn-outline-light btn-home", link, `${getFinalIcon(`${icon}`)}&nbsp;&nbsp;${title}`, `rel="noreferrer" target="_blank"`);
    }

    function getInLineBtn(btnAction, action, icon, isTargetBlank = false) {
        return getInLi(getImage(btnAction, action, icon, isTargetBlank, true, "btn-footer", false, "iconFooter"));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const hMenu = getHMenu();

    gId('menuExpander').addEventListener(eClick, () => {
        spanMenu.innerHTML = (spanMenu.innerHTML === hMenu) ? getHMenu('cross') : hMenu;
    });

    function getHMenu(icon = 'bars-solid') {
        return getFinalIcon(icon);
    }
});