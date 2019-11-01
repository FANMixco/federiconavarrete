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
        
        let androidUnsupported = [];
        let w10Unsupported = [];
        let wXPUnsupported = [];
        
        let wpUnsupported = [];
        let w8Unsupported = [];
        let webUnsupported = [];

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
        }

        setApps(androidSupported, "playStore", androidSupportedTechs);
        setApps(w10Supported, "msStore", w10SupportedTechs, customIconsArray);

        setApps(androidUnsupported, "unsupportedAndroid");
        setApps(w8Unsupported, "unsupportedWindows8");
        setApps(w10Unsupported, "unsupportedWindows10");
        setApps(wpUnsupported, "unsupportedWindowsPhone");
        setApps(webUnsupported, "unsupportedWeb");
        setApps(webSupported, "webStore");
        setApps(wXPUnsupported, "unsupportedVB");

        setTechUsed(androidSupportedTechs, "techsPlayStore");
        setTechUsed(w10SupportedTechs, "techsMSStore");

        $('[data-toggle="popover"]').popover();

        $('.popover-dismiss').popover({
            trigger: 'focus'
        });
    }

    load();
});

function setTechUsed(techs, container) {
    const result = { }

    for (let i = 0; i < techs.length; i++) result[techs[i]] = (result[techs[i]] || 0) + 1;
    
    let techResult = Object.keys(result).map(key => ({ [key]: result[key] }));

    let conclusions = "";

    for (let item in techResult) {
        $.each(techResult[item], function(i, v) {
            if (!i.includes("id_")) {
                conclusions += getTechPrint(i.replaceAll("__", "-").replaceAll("_", " "), `×${v}&nbsp;&nbsp;&nbsp;`);
            }
            else {
                //technologies += getTechPrint(appCollection[item].technologies[technology], '&nbsp;');
            }
        });
    }

    $(`#${container}`).append(conclusions);
}

function getTechPrint(tech, extra) {
    if (!Array.isArray(tech))
        return`<i class="${tech}"></i>${extra}`;
    else {
        switch (tech[0].type) {
            case "text":
                return `<span class='oneLineIcon'>${tech[0].text}</span>${extra}`;
            case "mix-left-icon":
                return `<span class='oneLineIcon'><i class="${tech[0].icon}"></i>${tech[0].text}</span>${extra}`;
            case "mix-right-icon":
                return `<span class='oneLineIcon'>${tech[0].text}<i class="${tech[0].icon}"></i></span>${extra}`;
            case "mix-left-img":
                return `<span class='oneLineIcon'><img class='icons' src='img/icons/${tech[0].icon}' alt='icon' />${tech[0].text}</span>${extra}`;
            case "mix-right-img":
                return `<span class='oneLineIcon'>${tech[0].text}<img class='icons' src='img/icons/${tech[0].icon}' alt='icon' /></span>${extra}`;
            case "img":
                return `<img class='icons' src='img/icons/${tech[0].icon}' alt='icon' />${extra}`;
        }
    }
}

function setApps(appCollection, control, techs, customIcons) {
    for (let item in appCollection) {
        let content = '';
        if (appCollection[item].storeLink !== '')
            content += `<a href="${appCollection[item].storeLink}" class="btn btn-info btn-circle text-white" target="_blank"><i class="fas fa-download"></i></a>`;
        if (appCollection[item].link !== '')
            content += `<a href="${appCollection[item].link}" class="btn btn-success btn-circle text-white" target="_blank"><i class="fas fa-globe"></i></a>`;
        if (appCollection[item].preview !== '')
            content += `<a href="${appCollection[item].preview}" class="btn btn-danger btn-circle text-white" target="_blank"><i class="fas fa-images"></i></a>`;

        let years = appCollection[item].yearStart;

        if (appCollection[item].yearStart !== appCollection[item].yearEnd) {
            years += appCollection[item].yearEnd !== undefined ? ` - ${appCollection[item].yearEnd}` : " -";
        }
        
        let tooltip = `${years}<br><br>${appCollection[item].description}`;

        let technologies = '';
        for (let technology in appCollection[item].technologies) {
            if (!Array.isArray(appCollection[item].technologies[technology])) {
                technologies += getTechPrint(appCollection[item].technologies[technology], '&nbsp;');
                addTech(techs, appCollection[item].technologies[technology]);
            }
            else {
                technologies += getTechPrint(appCollection[item].technologies[technology], '&nbsp;');
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
        if (!Array.isArray(techs)) { 
            techs.push(tech.replaceAll(" ", "_").replaceAll("-", "__"));
        }
        else {
            techs.push(tech);
        }
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