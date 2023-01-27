$(function() {
  "use strict";

  var window_width = $(window).width(),
      window_height = window.innerHeight,
      header_height = $(".default-header").height(),
      header_height_static = $(".site-header.static").outerHeight(),
      fitscreen = window_height - header_height;

  $(".fullscreen").css("height", window_height);
  $(".fitscreen").css("height", fitscreen);

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
      animation: {
          opacity: 'show'
      },
      speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
      var $mobile_nav = $('#nav-menu-container').clone().prop({
          id: 'mobile-nav'
      });
      $mobile_nav.find('> ul').attr({
          'class': '',
          'id': ''
      });
      $('body').append($mobile_nav);
      //<img src="img/icons/bars-solid.svg" loading="lazy" alt="menu" class="hMenu" />
      $('body').prepend('<button type="button" id="mobile-nav-toggle" title="menu"><img src="img/icons/bars-solid.svg" loading="lazy" alt="menu" class="hMenu" width="21.58" height="24.67" /></button>');
      $('body').append('<div id="mobile-body-overly"></div>');
      /*$('#mobile-nav').find('.menu-has-children').prepend('<i class="fas fa-chevron-down"></i>');

      $(document).on('click', '.menu-has-children i', function(e) {
          $(this).next().toggleClass('menu-item-active');
          $(this).nextAll('ul').eq(0).slideToggle();
          $(this).toggleClass("fa-chevron-up fa-chevron-down");
      });*/

      $(document).on('click', '#mobile-nav-toggle', function(e) {
          $('body').toggleClass('mobile-nav-active');
          if ($('#mobile-nav-toggle img').attr('src') == 'img/icons/close-thick.svg') {
            $('#mobile-nav-toggle img').attr('src', 'img/icons/bars-solid.svg');
            $('#mobile-nav-toggle img').attr('width', '21.58');
            $('#mobile-nav-toggle img').attr('height', '24.67');
          } else {
            $('#mobile-nav-toggle img').attr('src', 'img/icons/close-thick.svg');
            $('#mobile-nav-toggle img').attr('width', '24.67');
            $('#mobile-nav-toggle img').attr('height', '24.67');
          }
          //$('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').toggle();
      });

      $(document).click(function(e) {
          var container = $("#mobile-nav, #mobile-nav-toggle");
          if (!container.is(e.target) && container.has(e.target).length === 0) {
              if ($('body').hasClass('mobile-nav-active')) {
                  $('body').removeClass('mobile-nav-active');
                  $('#mobile-nav-toggle img').attr('src', 'img/icons/bars-solid.svg');
                  //$('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('#mobile-body-overly').fadeOut();
              }
          }
      });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
      $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  $(".user").click(function(e) {
      e.preventDefault();
  });

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          if (target.length) {
              var top_space = 0;

              if ($('#header').length) {
                  top_space = $('#header').outerHeight();

                  if (!$('#header').hasClass('header-fixed')) {
                      top_space = top_space;
                  }
              }

              $('html, body').animate({
                  scrollTop: target.offset().top - top_space
              }, 1500, 'easeInOutExpo');

              if ($(this).parents('.nav-menu').length) {
                  $('.nav-menu .menu-active').removeClass('menu-active');
                  $(this).closest('li').addClass('menu-active');
              }

              if ($('body').hasClass('mobile-nav-active')) {
                  $('body').removeClass('mobile-nav-active');
                  $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('#mobile-body-overly').fadeOut();
              }
              return false;
          }
      }
  });

  $(document).ready(function() {
      $('html, body').hide();
      if (window.location.hash) {
          setTimeout(function() {
              $('html, body').scrollTop(0).show();
              $('html, body').animate({
                  scrollTop: $(window.location.hash).offset().top
              }, 1000)
          }, 0);
      } else {
          $('html, body').show();
      }
  });

  // Header scroll class
  $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
          $('#header').addClass('header-scrolled');
      } else {
          $('#header').removeClass('header-scrolled');
      }
  });
});

window.onscroll = function(evt) { 
    let scroll = window.scrollY;

    if (scroll > getHeight() * 0.55) { 
        if (document.getElementById('aReviews').innerHTML === "") {
            const aScript = document.createElement('script');
            aScript.src = 'https://apps.elfsight.com/p/platform.js';
            document.body.appendChild(aScript);
        }
    }

    if (scroll > getHeight() * 0.7) {
        const gScriptExist = document.getElementById('g_translate');
        
        if (!gScriptExist) {
            const script = document.createElement('script');
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.id = 'g_translate';
            document.body.appendChild(script);
        }
    }
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'nl,de,fr,it,en,pt',
      autoDisplay: false,
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

document.getElementById("sDate").innerHTML = new Date().getFullYear();

function getHeight() {
    let body = document.body,
        html = document.documentElement;

    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight, body.getBoundingClientRect().height);
}