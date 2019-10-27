const cardTemplate = 
`<div class="col-md-6 col-lg-4">
<div class="card border-0 transform-on-hover">
   <a href="{0}" target="_blank">
    <img src="../img/prezis/{1}" alt="{2}" class="card-img-top">
   </a>
   <div class="card-body">
      <h6><a href="#">{3}</a></h6>
      <p class="text-muted card-text">EDITED {4}</p>
   </div>
</div>
</div>`;

$(function(){
    function load() {
        let preziNext = ppts.filter(x=>x.type == 'next');
        let preziClassic = ppts.filter(x=>x.type == 'classic');
        let powerPoint = ppts.filter(x=>x.type == 'ppt');

        if (!new URLSearchParams(window.location.search).get('isIframe')) {
            $("#header").show();
            $(".gallery-block").css('padding-top', '60px');
        }

        for (let item in preziNext) {
            createPPT("pptNext", preziNext[item].link, preziNext[item].preview, preziNext[item].name, preziNext[item].name, moment(preziNext[item].edited).format('MMM D, YYYY').toUpperCase());
        }
        for (let item in preziClassic) {
            createPPT("pptClassic", preziClassic[item].link, preziClassic[item].preview, preziClassic[item].name, preziClassic[item].name, moment(preziClassic[item].edited).format('MMM D, YYYY').toUpperCase());
        }
        for (let item in powerPoint) {
            createPPT("pptPowerPoint", powerPoint[item].link, powerPoint[item].preview, powerPoint[item].name, powerPoint[item].name, moment(powerPoint[item].edited).format('MMM D, YYYY').toUpperCase());
        }
    }

    function createPPT(control, url, src, alt, name, edited) {
        $(`#${control}`).append(cardTemplate.format(url, src, alt, name, edited));
    }

    load();
});