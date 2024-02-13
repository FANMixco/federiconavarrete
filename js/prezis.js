/*This code is Federico Navarrete's property and for any commercial use he must be contacted. Also, this part of code cannot be removed.*/

const cardTemplate = 
`<div class="col-md-6 col-lg-4">
<div class="card border-0 transform-on-hover">
   <a href="{0}" target="_blank">
    <img src="../img/prezis/{1}" alt="{2}" class="card-img-top">
   </a>
   <div class="card-body">
      <h6><a href="#" class="text-decoration-none">{3}</a></h6>
      <p class="text-muted card-text">{4} {5}</p>
   </div>
</div>
</div>`;

const galleryTitle = "Federico Navarrete — Presentations Gallery";

const galleryFooter = `<a rel="license" target="_blank"  href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />All presentations​ in this site are licensed under a <a target="_blank" rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a> and were designed by <a href="https://federiconavarrete.com">Federico Navarrete</a>.`;

let ppts, tabsOptions, panesOptions;

window.addEventListener('DOMContentLoaded', () => {
    fetchData(`js/data/translations/en-us/external/ppts.min.json`)
    .then(data => {
        ppts = data.ppts;
        panesOptions = data.panesOptions;
        tabsOptions = data.tabsOptions;
        load();
    }).catch((e) => { console.error(e); });
});

function load() {

    document.getElementById('pptGallery').innerHTML += createTabs() + createPanes();
    
    let preziNext = ppts.filter(x=>x.type == 'next').sort(sortByProperty('order'));
    let powerPoint = ppts.filter(x=>x.type == 'ppt').sort(sortByProperty('order'));
    
    document.getElementById('galleryTitle').innerHTML += galleryTitle;

    document.getElementById('galleryFooter').innerHTML += galleryFooter;

    if (!new URLSearchParams(window.location.search).get('isIframe')) {
        document.getElementById('header').style.display = "block";
        document.getElementById('header').classList.add("pt-4");

        [...document.getElementsByClassName('.gallery-block')].forEach(function(element) {
            element.style.paddingTop = '60px';
        });
    }

    for (let item in preziNext)
        createPPT("pptNext", preziNext[item].link, preziNext[item].preview, preziNext[item].name, preziNext[item].name, presentedOrEdited(preziNext[item].wasPresented), moment(preziNext[item].edited).format('MMM D, YYYY').toUpperCase());
    for (let item in powerPoint)
        createPPT("pptPowerPoint", powerPoint[item].link, powerPoint[item].preview, powerPoint[item].name, powerPoint[item].name, presentedOrEdited(powerPoint[item].wasPresented), moment(powerPoint[item].edited).format('MMM D, YYYY').toUpperCase());
}

function presentedOrEdited(wasPresented) {
    return wasPresented ? "PRESENTED ON" : "EDITED";
}

function createPPT(control, url, src, alt, name, presented, edited) {
    document.getElementById(`${control}`).innerHTML += cardTemplate.format(url, src, alt, name, presented, edited);
}