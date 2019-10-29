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
        let w10Supported = [];
        let webSupported = [];
        
        let androidUnsupported = [];
        let w10Unsupported = [];
        let wXPUnsupported = [];
        
        let wpUnsupported = [];
        let w8Unsupported = [];
        let webUnsupported = [];

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

        setApps(androidSupported, "playStore");
        setApps(w10Supported, "msStore");
        setApps(androidUnsupported, "unsupportedAndroid");
        setApps(w8Unsupported, "unsupportedWindows8");
        setApps(w10Unsupported, "unsupportedWindows10");
        setApps(wpUnsupported, "unsupportedWindowsPhone");
        setApps(webUnsupported, "unsupportedWeb");
        setApps(webSupported, "webStore");
        setApps(wXPUnsupported, "unsupportedVB");

        $('[data-toggle="popover"]').popover();

        $('.popover-dismiss').popover({
            trigger: 'focus'
        });
    }

    load();
});

function setApps(appCollection, control) {
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
            if (!Array.isArray(appCollection[item].technologies[technology]))
                technologies += `<i class="${appCollection[item].technologies[technology]}"></i>&nbsp;`;
            else {
                switch (appCollection[item].technologies[technology][0].type)
                {
                    case "text":
                        technologies += `<span class='oneLineIcon'>${appCollection[item].technologies[technology][0].text}</span>&nbsp;`;
                        break;
                    case "mix-left-icon":
                        technologies += `<span class='oneLineIcon'><i class="${appCollection[item].technologies[technology][0].icon}"></i>${appCollection[item].technologies[technology][0].text}</span>&nbsp;`;
                        console.log(technologies);
                        break;
                    case "mix-right-icon":
                        technologies += `<span class='oneLineIcon'>${appCollection[item].technologies[technology][0].text}<i class="${appCollection[item].technologies[technology][0].icon}"></i></span>&nbsp;`;
                        break;
                    case "mix-left-img":
                        technologies += `<span class='oneLineIcon'><img class='icons' src='img/icons/${appCollection[item].technologies[technology][0].icon}' alt='icon' />${appCollection[item].technologies[technology][0].text}</span>&nbsp;`;
                        console.log(technologies);
                        break;
                    case "mix-right-img":
                        technologies += `<span class='oneLineIcon'>${appCollection[item].technologies[technology][0].text}<img class='icons' src='img/icons/${appCollection[item].technologies[technology][0].icon}' alt='icon' /></span>&nbsp;`;
                        break;
                    case "img":
                        technologies += `<img class='icons' src='img/icons/${appCollection[item].technologies[technology][0].icon}' alt='icon' />&nbsp;`;
                }
            }
        }

        tooltip += `<br><br><b>Technologies:<b><br><br><div class='iconsDiv'>${technologies.replaceAll('"', "'")}</div>`;

        $(`#${control}`).append(cardTemplate.format(appCollection[item].logo, appCollection[item].app, appCollection[item].app, content, appCollection[item].app, tooltip));
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