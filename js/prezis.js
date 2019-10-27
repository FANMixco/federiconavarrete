const cardTemplate = 
`<div class="col-md-6 col-lg-4">
<div class="card border-0 transform-on-hover">
   <a href="{0}">
   <img src="{1}" alt="{2}" class="card-img-top">
   </a>
   <div class="card-body">
      <h6><a href="#">{3}</a></h6>
      <p class="text-muted card-text">{4}</p>
   </div>
</div>
</div>`;

$(function(){
    let preziNext = ppts.filter(x=>x.type == 'next');
    let preziClassic = ppts.filter(x=>x.type == 'classic');
    let powerPoint = ppts.filter(x=>x.type == 'ppt');

    if (new URLSearchParams(window.location.search).get('isIframe')) {
        $("#header").hide();
        $(".gallery-block").css('padding-top', '0px');
    }
    console.log(preziNext);
});