$.getScript("js/data/translations/en-us/basicInfo.js").done(loadBasicInfo);
$.getScript("js/data/translations/en-us/hobbiesList.js").done(loadHobbies);
$.getScript("js/data/translations/en-us/awardsList.js").done(loadAwards);
$.getScript("js/data/translations/en-us/techSkillsLists.js").done(loadTechSkills);
$.getScript("js/data/translations/en-us/softSkillsLists.js").done(loadSoftSkills);

function loadBasicInfo() {
    const { name, headline, headlineIntro, aboutDesc, favApp } = basicInfo;

    $("#hName").html(name);
    $("#hHeadline").html(headline);
    $("#hIntro").html(headlineIntro);

    aboutDesc.forEach(item => {
        $("#divAbout").append(`<div class="col-sm"><p class="lead">` + item + `</p></div>`);
    });

    if (favApp.isVisible) {
        $("#favApp").append(`<a class="btn btn-xl btn-outline-light" rel="noreferrer" target="_blank" href="` + favApp.link +`"><i class="fas fa-download mr-2"></i> ` + favApp.title  +`</a>`);
    }
    else {
        $("#favApp").hide();
    }
}

function loadHobbies() {
    const { hobbies, isVisible } = hobbiesList;

    if (isVisible) {
        hobbies.forEach(item => {
            const btnOptional = item.isOpt ? " btnOptional" : "";

            if (!item.isIcon) {
                $("#hobbiesList").append(`<li class="list-inline-item"` + btnOptional + `><a data-toggle="tooltip" title="` + item.title + `" class="btn btn-outline-light btn-social text-center rounded-circle ignore-click externalImg" href="#"><img alt="" src="` +  item.icon + `" /></a></li>`);
            }
            else {
                $("#hobbiesList").append(`<li class="list-inline-item"` + btnOptional + `><a data-toggle="tooltip" title="` + item.title + `" class="btn btn-outline-light btn-social text-center rounded-circle ignore-click" href="#"><i class="` +  item.icon + `"></i></a>`);
            }
        });
        $('[data-toggle="tooltip"]').tooltip();
    }
    else {
        $("#divHobbies").hide();
    }
}

function loadAwards() {
    const { awards, isVisible } = awardsList;

    if (isVisible) {
        awards.forEach(item => {
            let items = `<div class="col-lg-4 ml-auto"><p class="lead">`;
            item.forEach(elem => {
                items += elem.title + "<br /><br />";
            });
            items = items.substring(0, items.length - 12) + "</div>";

            $("#awardsList").append(items);
        });
    }
    else {
        $("#divAwards").hide();
    }
}

function loadTechSkills() {
    techSkills.forEach(item => {
        let items = `<div class="col"><p class="lead">`;
        item.forEach(elem => {
            items += elem + "<br /><br />";
        });
        items = items.substring(0, items.length - 12) + "</p></div>";

        $("#divTechSkills").prepend(items);
    });

    let i = techSkillsOthers.length;
    techSkillsOthers.forEach(item => {
        let items = `<div class="col"><div class="collapse multi-collapse" id="multiDev` + i + `"><div class="card card-body mini-cards">`;
        item.forEach(elem => {
            items += elem + "<br /><br />";
        });
        items = items.substring(0, items.length - 12) + "</div></div></div>";

        $("#divTechSkillsOthers").prepend(items);
        i--;
    });
}

function loadSoftSkills() {
    softSkills.forEach(item => {
        let items = `<div class="col"><p class="lead">`;
        item.forEach(elem => {
            items += elem + "<br /><br />";
        });
        items = items.substring(0, items.length - 12) + "</p></div>";

        $("#divSoftSkills").prepend(items);
    });

    softSkillsOthers.forEach(function(item, index) {
        let items = `<div class="col"><div class="collapse multi-collapse-business" id="multiBS` + index + `"><div class="card card-body mini-cards">`;
        item.forEach(elem => {
            items += elem + "<br /><br />";
        });
        items = items.substring(0, items.length - 12) + "</div></div></div>";

        $("#divSoftSkillsOther").prepend(items);
    });
}