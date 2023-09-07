const language = window.navigator.userLanguage || window.navigator.language;
let lang = "en";
let currentLoc = '';

const langLoc = "js/data/";

lang = (language.includes('es')) ? "es" : lang;

const validLang = ['en', 'es'];

if (validLang.indexOf(lang) === -1) {
    addTranslateElement();
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

function addTranslateElement() {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.id = 'g_translate';
    document.body.appendChild(script);
    setTimeout(() => { 
        const targetDiv = document.getElementById('userName');
        const newDiv = document.createElement('div');

        newDiv.setAttribute('id', 'google_translate_element');

        targetDiv.insertAdjacentElement('afterend', newDiv);

        new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'nl,de,fr,it,pl,pt,zh-CN', autoDisplay: false, layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
        
        newDiv.style.textAlign = 'center';
    }, 1000);
}

function createLink(item, className, addIcon = true) {
    const link = document.createElement('a');
    link.classList.add(className);
    link.href = item.link;
    link.setAttribute('aria-label', item['aria-label']);
    link.setAttribute('title', item.title);
    link.setAttribute('id', item.id);

    if (item.target) {
        link.target = item.target;
    }

    if (addIcon) {
        createIcon(item, link);
    }

    return link;
}

function createIcon(item, loc) {
    const icon = document.createElement('i');
    icon.classList.add(item.icon);

    loc.appendChild(icon);
}

function createTextElement(text) {
    const span = document.createElement('span');
    span.innerHTML = text;
    return span;
}

fetchData(`${langLoc}${lang}/basic.json`)
.then(data => {
    document.querySelectorAll('[data-translation]').forEach(item => {
        item.innerHTML = data[item.dataset.translation];
    });
});

fetchData(`${langLoc}${lang}/sublinks.json`)
.then(data => {
    const linksContainer = document.getElementById('sub-links');

    data.forEach(item => {
        const link = createLink(item, 'sub-link');
        linksContainer.appendChild(link);
    });
});

fetchData(`${langLoc}${lang}/links.json`)
.then(data => {
    const linksContainer = document.getElementById('links');

    data.forEach(item => {
        const link = createLink(item, 'link', false);

        // Create a container div
        const container = document.createElement("div");
        // Set the container style
        container.style.width = "100%";
        container.style.display = "flex";
        container.style.justifyContent = "space-between";
        container.style.alignItems = "center";
        // Append the container to the body
        link.appendChild(container);
        
        // Loop through the colors and create divs
        for (let i = 0; i < 3; i++) {
            // Create a div element
            const div = document.createElement("div");
            // Set the div style
            if (i == 0 || i == 2) {
                //const btnShare = document.createElement('a');
                //btnShare.classList.add('sub-link');
                //btnShare.href = "https://google.com";

                // Set the width to 40px for the first and last divs
                div.style.width = "0px";

                /*if (i == 2) {
                    const icon = document.createElement('i');
                    icon.classList.add('icon-ellipsis');

                    btnShare.appendChild(icon);
                    div.appendChild(btnShare);
                }*/
            } else {
                // Set the width to auto for the middle div
                div.style.width = "auto";
                div.classList.add('link-center');
                // Set the flex-grow property to 1 to make it fill the remaining space
                div.style.flexGrow = "1";
                const text = createTextElement(`&ensp;${item.text}`);

                createIcon(item, div);
                div.appendChild(text);
            }
            //div.style.backgroundColor = colors[i];
            // Append the div to the container
            container.appendChild(div);
        }
        linksContainer.appendChild(link);
    });
});
