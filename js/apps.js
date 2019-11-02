const cardTemplate = 
`<div class="card border-0 transform-on-hover">
   <img src="img/apps/{0}" alt="{1}" class="card-img-top">
   <div class="card-body">
      <h6><a href="#">{2}</a></h6>
      <p class="card-text">{3}<a tabindex="0" data-trigger="focus" data-html="true" data-placement="top" data-toggle="popover" data-container="body" title="{4}" data-content="{5}" role="button" class="popMore btn btn-warning btn-circle text-white"><i class="fas fa-ellipsis-h"></i></a></p>
   </div>
</div>`;

$(function(){
    function load() {
        let androidSupported = [];
        let androidSupportedTechs = [];
        let w10Supported = [];
        let w10SupportedTechs = [];
        let webSupported = [];
        let webSupportedTechs = [];
        let nugetSupported = [];
        let libsSupportedTechs = [];
        let jsLibSupported = [];
        let uwpLibSupported = [];
        
        let androidUnsupported = [];
        let w10Unsupported = [];
        let wXPUnsupported = [];
        let wpUnsupported = [];
        let w8Unsupported = [];
        let webUnsupported = [];
        let nugetUnsupported = [];
        let unsupportedTechs = [];

        let customIconsArray = [];

        if (!new URLSearchParams(window.location.search).get('isIframe')) {
            $("#header").show();
            $(".gallery-block").css('padding-top', '60px');
        }

        for(let item in apps) {
            filterElem(apps[item], 'android', true, androidSupported);

            filterElem(apps[item], 'windows10', true, w10Supported);

            filterElem(apps[item], 'android', false, androidUnsupported);

            filterElem(apps[item], 'windows10', false, w10Unsupported);

            filterElem(apps[item], 'windowsPhone', false, wpUnsupported);

            filterElem(apps[item], 'windows8', false, w8Unsupported);

            filterElem(apps[item], 'web', true, webSupported);

            filterElem(apps[item], 'web', false, webUnsupported);

            filterElem(apps[item], 'windowsXP', false, wXPUnsupported);

            filterElem(apps[item], 'nuget', true, nugetSupported);

            filterElem(apps[item], 'js_lib', true, jsLibSupported);

            filterElem(apps[item], 'uwp_lib', true, uwpLibSupported);

            filterElem(apps[item], 'nuget', false, nugetUnsupported);
        }

        setApps(androidSupported, "playStore", androidSupportedTechs, customIconsArray);
        setApps(w10Supported, "msStore", w10SupportedTechs, customIconsArray);
        setApps(webSupported, "webStore", webSupportedTechs, customIconsArray);
        setApps(nugetSupported, "nugetsStore", libsSupportedTechs, customIconsArray);
        setApps(jsLibSupported, "jsLibStore", libsSupportedTechs, customIconsArray);
        setApps(uwpLibSupported, "uwpLibStore", libsSupportedTechs, customIconsArray);

        setApps(androidUnsupported, "unsupportedAndroid", unsupportedTechs, customIconsArray);
        setApps(w8Unsupported, "unsupportedWindows8", unsupportedTechs, customIconsArray);
        setApps(w10Unsupported, "unsupportedWindows10", unsupportedTechs, customIconsArray);
        setApps(wpUnsupported, "unsupportedWindowsPhone", unsupportedTechs, customIconsArray);
        setApps(webUnsupported, "unsupportedWeb", unsupportedTechs, customIconsArray);
        setApps(wXPUnsupported, "unsupportedVB", unsupportedTechs, customIconsArray);
        setApps(nugetUnsupported, "unsupportedNuget", unsupportedTechs, customIconsArray);

        setTechUsed(androidSupportedTechs, "techsPlayStore", customIconsArray);
        setTechUsed(w10SupportedTechs, "techsMSStore", customIconsArray);
        setTechUsed(webSupportedTechs, "techsWebStore", customIconsArray);
        setTechUsed(unsupportedTechs, "techsOldStore", customIconsArray);
        setTechUsed(libsSupportedTechs, "techsLibsStore", customIconsArray);

        $('[data-toggle="popover"]').popover();

        $('.popover-dismiss').popover({ trigger: 'focus' });
    }

    load();
});

function setTechUsed(techs, container, customIcons) {
    const result = { }

    for (let i = 0; i < techs.length; i++) result[techs[i]] = (result[techs[i]] || 0) + 1;

    var sortable = [];
    for (var item in result) {
        sortable.push([item, result[item]]);
    }
    
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    let conclusions = "";

    for (let item in sortable) {
        if (!sortable[item][0].includes("id_"))
            conclusions += getTechPrint(sortable[item][0], `×${sortable[item][1]}`, 3);
        else
            conclusions += getTechPrint(customIcons.filter(x=>x.id == sortable[item][0]), `×${sortable[item][1]}`, 3);
    }

    $(`#${container}`).append(conclusions);
}

function getTechPrint(tech, extra, noSpaces) {
    let totalSpaces = "";
    for (let i=0; i<=noSpaces; i++) {
        totalSpaces+="&nbsp;";
    }

    if (!Array.isArray(tech))
        return`<span class='oneLineIcon'><i class="${tech}"></i>${extra}</span>${totalSpaces}`;
    else
        switch (tech[0].type) {
            case "text":
                return `<span class='oneLineIcon'><span class='storeIcon'>${tech[0].text}</span>${extra}</span>${totalSpaces}`;
            case "mix-left-icon":
                return `<span class='oneLineIcon'><i class="${tech[0].icon}"></i><span class='storeIcon'>${tech[0].text}</span>${extra}</span>${totalSpaces}`;
            case "mix-right-icon":
                return `<span class='oneLineIcon'><span class='storeIcon'>${tech[0].text}</span><i class="${tech[0].icon}"></i>${extra}</span>${totalSpaces}`;
            case "mix-left-img":
                return `<span class='oneLineIcon'><img class='icons' src='img/icons/${tech[0].icon}' alt='icon' /><span class='storeIcon'>${tech[0].text}</span>${extra}</span>${totalSpaces}`;
            case "mix-right-img":
                return `<span class='oneLineIcon'><span class='storeIcon'>${tech[0].text}</span><img class='icons' src='img/icons/${tech[0].icon}' alt='icon' />${extra}</span>${totalSpaces}`;
            case "img":
                return `<span class='oneLineIcon'><img class='icons' src='img/icons/${tech[0].icon}' alt='icon' />${extra}</span>${totalSpaces}`;
        }
}

function setApps(appCollection, control, techs, customIcons) {
    for (let item in appCollection) {
        let content = '';
        if (appCollection[item].storeLink !== '')
            content += `<a href="${appCollection[item].storeLink}" class="btn btn-info btn-circle text-white" target="_blank"><i class="fas fa-download"></i></a>`;
        if (appCollection[item].link !== '' && appCollection[item].isSupported)
            content += `<a href="${appCollection[item].link}" class="btn btn-success btn-circle text-white" target="_blank"><i class="fas fa-globe"></i></a>`;
        if (appCollection[item].preview !== '')
            content += `<a href="${appCollection[item].preview}" class="btn btn-danger btn-circle text-white" target="_blank"><i class="fas fa-images"></i></a>`;

        let years = appCollection[item].yearStart;

        if (appCollection[item].yearStart !== appCollection[item].yearEnd) {
            years += appCollection[item].yearEnd !== undefined ? ` - ${appCollection[item].yearEnd}` : " - now";
        }
        
        let tooltip = `${years}<br><br>${appCollection[item].description}`;

        let technologies = '';
        for (let technology in appCollection[item].technologies) {
            if (!Array.isArray(appCollection[item].technologies[technology])) {
                technologies += getTechPrint(appCollection[item].technologies[technology], '', 1);
                addTech(techs, appCollection[item].technologies[technology]);
            }
            else {
                technologies += getTechPrint(appCollection[item].technologies[technology], '', 1);
                addTech(techs, appCollection[item].technologies[technology][0].id);

                if (customIcons !== undefined)
                    if (_.findWhere(customIcons, appCollection[item].technologies[technology][0]) == null)
                        customIcons.push(appCollection[item].technologies[technology][0]);
            }
        }

        tooltip += `<br><br><b>Technologies:<b><br><br><div class='iconsDiv'>${technologies.replaceAll('"', "'")}</div>`;

        $(`#${control}`).append(cardTemplate.format(appCollection[item].logo, appCollection[item].app, appCollection[item].app, content, appCollection[item].app, tooltip));
    }
}

function addTech(techs, tech){
    if (techs !== undefined)
        if (!Array.isArray(techs))
            techs.push(tech.replaceAll(" ", "_").replaceAll("-", "__"));
        else
            techs.push(tech);
}

function filterElem(item, tech, isSupported, array) {
   let filteredElem = item.edition.filter(x=>x.mainTech == tech && x.isSupported === isSupported)[0];

   if (filteredElem !== undefined) array.push(createElem(item, filteredElem));
}

function createElem(item, edition) {
   return {
       app: item.app,
         link: item.link,
         description: item.description,
         logo: item.logo,
         preview: edition.preview,
         storeLink: edition.storeLink,
         technologies: edition.technologies,
         yearStart: edition.yearStart,
         yearEnd: edition.yearEnd,
         technologies: edition.technologies
   };
}