const iframeElSalvador = `<iframe title='El Salvador Map' id='iframeElSalvador' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984252.4374393197!2d-90.05167866086293!3d13.749114461377241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6327a659640657%3A0x6f9a16eb98854832!2sEl+Salvador!5e0!3m2!1sen!2spl!4v1555793789038!5m2!1sen!2spl" class="previewerIframe" allowfullscreen></iframe>`;

const iframeApps = `<iframe title='Projects' id='iframeApps' src="apps.html?isIframe=true" class="previewerIframe" allowfullscreen></iframe>`;

const iframePrezis = `<iframe title="Presentations" id='iframePrezis' src="prezis.html?isIframe=true" class="previewerIframe" allowfullscreen></iframe>`;

const review1 = `<div class="picReviewers img-box p-1 border rounded-circle m-auto">
<img class="d-block w-100 rounded-circle" src="https://blogs-images.forbes.com/forbescoachescouncil/files/2019/01/nataliawiechowski_avatar_1546534855.png" loading="lazy" alt="Natalia's slide" />
</div>
<h5 class="mt-4 mb-0"><strong class="text-warning text-uppercase"><a href="https://thinknatalia.com" rel="noreferrer" target="_blank" class="text-dark">Dr. Natalia Wiechowski</a></strong></h5>
<h6 class="text-dark m-0">Personal Branding Coachsultant | Keynote Speaker 🇩🇪️/🇺🇸 | LinkedIn Strategist |The Middle East's leading Edutainer</h6>
<p class="m-0 pt-3 text-black">Frederico is a wonderful human being I had the pleasure to meet at #DES2019 in Madrid. We also recorded an interview about my Toastmasters journey for his TM club/region. Frederico also is an awesome interviewer. He was well prepared, is a good listener and created a wonderful video out of our conversation. Furthermore, Frederico seems to be a person that truly cares, that wants to add value and make a difference. Keep up the great work and thank you for your time!</p>`;

const review2 = `<div class="picReviewers img-box p-1 border rounded-circle m-auto">
<img class="d-block w-100 rounded-circle" loading="lazy" src="img/photos/District-108010.jpg" alt="Gabriela's slide" />
</div>
<h5 class="mt-4 mb-0"><strong class="text-warning text-uppercase">Gabriela Roivainen</strong></h5>
<h6 class="text-dark m-0">Program Quality Director 2018/2019 at <a target="_blank" rel="noreferrer" href="https://toastmastersd108.org" class="text-dark">District 108</a>, <a target="_blank" rel="noreferrer" href="https://www.toastmasters.org" class="text-dark">Toastmasters International</a></h6>
<div id="reviewGabrielaPDF"></div>
<div id="downloadReview" class="centerText">
<a class="btn" target="_blank" href="testimonials/20190603165400926.pdf">
   <i class="fas fa-download mr-2"></i> Download
</a>
</div>`;

const review3 = `<div class="picReviewers img-box p-1 border rounded-circle m-auto">
<img class="d-block w-100 rounded-circle" loading="lazy" src="img/photos/edgar.jpeg" alt="Edgar's slide">
</div>
<h5 class="mt-4 mb-0"><strong class="text-warning text-uppercase">Edgar Regalado</strong></h5>
<h6 class="text-dark m-0">Java Consultant at Adastra Czech Republic</h6>
<p class="m-0 pt-3 text-black">I've known Federico for about 20 years so I speak from actual experience when I say that he's trustworthy, responsible, intelligent and loyal to his principles. Federico and I were classmates during school and college. During this time I developed a strong friendship relationship with him. My close association to him made me witness his stupendous growth as a person and as a professional. He's the most agile developer I've ever known. He creates clean, maintainable code in half the time of his peers. This is a consequence of his highly analytical 
personality and strong passion for computer science.<br /><br />On the other hand, Federico has been working hard to develop his interpersonal skills. To do so, he participated in various communities that require him to take a leadership role, such as Microsoft Student Partners and Toastmasters. In the latter, Federico gained confidence and developed the art of public speaking.<br /><br />There's no doubt that Federico is a person of integrity, with a well-balanced set of technical and interpersonal skills. For all of this, it is my pleasure to recommend Federico.
</p>`;

const imgLocPortfolio = 'img/portfolio/';
const imgLocArticles = 'img/articles/';

$(function() {
    let cYear = new Date().getFullYear();
    $("#spanYear").text(cYear === 2019 ? `${cYear}` : `2019 - ${cYear}`);

    $("#appsFullScreen").click(function(){
        window.open("https://federiconavarrete.com/apps.html");
    });
    $("#pptsFullScreen").click(function(){
        window.open("https://federiconavarrete.com/prezis.html");
    });

    $('[data-toggle="tooltip"]').tooltip();
    $(".ignore-click").click(function() {
        return false;
    });

    let marginTop = 0;
    let heightIFrame = 600;

    let smallScreenMobileOS = WURFL.is_mobile && WURFL.form_factor === "Smartphone";

    if (!smallScreenMobileOS) {
        $("#spanMenu").html("Menu&nbsp;<i class='fas fa-bars'></i>");
        $("#btnExtraHobbies").hide();
        if (WURFL.is_mobile) {
            $(".btnOptional").hide();
            $("#btnExtraHobbies").show();
        }

        setTimeout(function() {
            $("#divSkillsContainer").css("background-color", "rgba(12,12,12,0.95)");
            $("#divSkillsContainer").css("padding-top", "15px");
            $("#divSkillsContainer").css("border-radius", "20px");
        }, 100);
    } else {
        $(".btnOptional").hide();
        $("#spanMenu").html("<i class='fas fa-bars'></i>");
        marginTop = -40;
        heightIFrame = 560;
    }

    switch (WURFL.form_factor) {
        case "Smartphone":
            $("#imgPPT1").attr("src",`${imgLocPortfolio}rfriends_small.jpg`);
            $('#imgPPT1').data('src',`${imgLocPortfolio}rfriends_small.jpg`);
            $("#imgPPT2").attr("src",`${imgLocPortfolio}ponline_small.jpg`);
            $('#imgPPT2').data('src',`${imgLocPortfolio}ponline_small.jpg`);
            $("#imgLodzarts").attr("src",`${imgLocPortfolio}lodzarts_small.jpg`);
            $('#imgLodzarts').data('src',`${imgLocPortfolio}lodzarts_small.jpg`);
            break;
        case "Tablet":
            $("#imgPPT1").attr("src",`${imgLocPortfolio}rfriends_medium.jpg`);
            $('#imgPPT1').data('src',`${imgLocPortfolio}rfriends_medium.jpg`);
            $("#imgPPT2").attr("src",`${imgLocPortfolio}ponline_medium.jpg`);
            $('#imgPPT2').data('src',`${imgLocPortfolio}ponline_medium.jpg`);
            $("#imgLodzarts").attr("src",`${imgLocPortfolio}lodzarts_medium.jpg`);
            $('#imgLodzarts').data('src',`${imgLocPortfolio}lodzarts_medium.jpg`);
            break;
        default:
            $("#imgPPT1").attr("src",`${imgLocPortfolio}rfriends.jpg`);
            $('#imgPPT1').data('src',`${imgLocPortfolio}rfriends.jpg`);
            $("#imgPPT2").attr("src",`${imgLocPortfolio}ponline.jpg`);
            $('#imgPPT2').data('src',`${imgLocPortfolio}ponline.jpg`);
            $("#imgLodzarts").attr("src",`${imgLocPortfolio}lodzarts.jpg`);
            $('#imgLodzarts').data('src',`${imgLocPortfolio}lodzarts.jpg`);
            break;
    }

    switch (WURFL.form_factor) {
        case "Smartphone":
            $("#imgArt1").attr("src",`${imgLocArticles}lowCode_small.png`);
            $('#imgArt1').data('src',`${imgLocArticles}lowCode_small.png`);
            $("#imgArt2").attr("src",`${imgLocArticles}faces_small.jpg`);
            $('#imgArt2').data('src',`${imgLocArticles}faces_small.jpg`);
            $("#imgProfile").attr("src",`img/photos/profile_small.jpg`);
            break;
        default:
            $("#imgArt1").attr("src",`${imgLocArticles}lowCode.png`);
            $('#imgArt1').data('src',`${imgLocArticles}lowCode.png`);
            $("#imgArt2").attr("src",`${imgLocArticles}faces.jpg`);
            $('#imgArt2').data('src',`${imgLocArticles}faces.jpg`);
            $("#imgProfile").attr("src",`img/photos/profile.jpg`);
            break;
    }

    $("#divReview1").append(review1);
    $("#divReview2").append(review2);
    $("#divReview3").append(review3);
    $("#imgProfile").show();

    let lastScrollTop = 0;
    let $navbar = $('.navbar');
    let navbarHeight = $navbar.outerHeight();
    let movement = 0;
    let lastDirection = 0;

    $(window).scroll(function(event) {
        if (smallScreenMobileOS) {
            let st = $(this).scrollTop();
            movement += st - lastScrollTop;

            if (st > lastScrollTop) { // scroll down
                if (lastDirection != 1) {
                    movement = 0;
                }
                let margin = Math.abs(movement);
                if (margin > navbarHeight) {
                    margin = navbarHeight;
                }
                margin = -margin;
                $navbar.css('margin-top', margin + "px")

                lastDirection = 1;
            } else { // scroll up
                if (lastDirection != -1) {
                    movement = 0;
                }
                let margin = Math.abs(movement);
                if (margin > navbarHeight) {
                    margin = navbarHeight;
                }
                margin = margin - navbarHeight;
                $navbar.css('margin-top', margin + "px")

                lastDirection = -1;
            }

            lastScrollTop = st;
        }
    });

    $('#contactMeForm').html(`<iframe src="pages/contact.html" height="${heightIFrame}px" width="100%" frameborder="0" scrolling="no" style="margin-top:${marginTop}px"></iframe>`);

    $("#linkContactMe").click(function(e) {
        e.preventDefault();
        $(this).tooltip('hide');
        $("#contactMe").modal("show");
    });

    $("#aElSalvador").click(function(){
        if ($("#iframeElSalvador").length == 0)
            $("#divIframElSalvador").append(iframeElSalvador);
    });

    $("#aAppsPreview").click(function(){
        if ($("#iframeApps").length == 0)
            $("#divApps").append(iframeApps);
    });

    $("#aPPTPreview").click(function(){
        if ($("#iframePrezis").length == 0)
            $("#divPrezis").append(iframePrezis);
    });

    PDFObject.embed("/testimonials/20190603165400926.pdf", "#reviewGabrielaPDF");
});