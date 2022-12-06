(function ($, Drupal) {
  'use strict';
    Drupal.behaviors.awesome = {
      attach: function(context, settings) {
      // wow-initialize
      new WOW().init();
      var slider=new WOW();
      slider.defaults.boxClass='sliderwow';
      slider.init();
      AOS.init();
      //menu hide 
      $(window).on('load', function(){
        $('.header-2 .nav-item a[href*="/admissions"]').css('display', 'none');
        $('.navbar .dropdown a[href*="/academics"]').click(function(){ location.href = this.href; });
      });
       //menu
      $('.header-1 .navbar .dropdown').hover(function() {
        $(this).find('.dropdown-menu').first().stop(true, true).delay(0).slideDown();
      },
      function() {
        $(this).find('.dropdown-menu').first().stop(true, true).delay(0).slideUp();
      });

     
      $('a.drop-toggle').on('click', function (e) {
       var $el = $(this);
       var $parent = $(this).offsetParent(".dropdown-menu");
       if(!$(this).next().hasClass('show')) {
          $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
       }
       var $subMenu = $(this).next(".dropdown-menu");
       $subMenu.toggleClass('show');
       $(this).parent("li").toggleClass('show');
       $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
           $('.dropdown-menu .show').removeClass("show");
       } );
       if(!$parent.parent().hasClass('navbar-nav')) {
          $el.next().css({"top": $el[0].offsetTop, "left": $parent.outerWidth() - 4 });
       }
       return false;
      });
      
     //responsive dropdown - viewport
        /**
         * Save DOM selectors.
         */
        var $nav_menu = $('.navbarsExampleDefault');
        var $site_container = $('body');
        var $window = $(window);
        var window_size = $window.width();
        $nav_menu.find('ul li',context).once('openLeftBehavior').hover(function() {
                if ($(this).children('ul').length) {
                    // var menu_ul_left =$(this).offset().left + $(this).width();
                    var menu_ul_element = $(this).children('ul');
                    var menu_ul_offset = menu_ul_element.offset();
                    var menu_ul_left = menu_ul_offset.left;
                    var menu_ul_width = menu_ul_element.width();
                    var site_container_width = $site_container.width();
                    var site_container_left = $site_container.offset().left;
                    // alert(site_container_width + site_container_left);
                    var is_menu_ul_visible = (menu_ul_left + menu_ul_width <= site_container_width + site_container_left);
                    if (!is_menu_ul_visible) {                        $(this).children('ul').removeClass('open-left');
                        $(this).children('ul').addClass('open-left');
                    }
                }
            },
        );
        // sticky
        jQuery(window).scroll(function(){
          var scroll = $(window).scrollTop();
          if (scroll >= 100) {
            $("header").addClass("sticky");
          } else {
            $("header").removeClass("sticky");
          }
          var height = $(window).scrollTop();
            if (height > 100) {
                $('#go-to-top').fadeIn();
            } else {
                    $('#go-to-top').fadeOut();
            }
        });
        // sticky
        $(window).on('load', function(){

          $('.js-clone-nav:first').each(function() {
            var $this = $(this);
            $this.clone().attr('class', 'site-nav-wrap').appendTo('.pt-site-mobile-menu-body .pt-site-mobile-menu-links');
          });
        $("#go-to-top").click(function(event) {
            event.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });
    // setTimeout(function() {     
    //   var counter = 0;
    //     $('.pt-site-mobile-menu .has-children').each(function(){
    //         var $this = $(this);
    //         $this.prepend('<span class="arrow-collapse collapsed">');

    //         $this.find('.arrow-collapse').attr({
    //           'data-toggle' : 'collapse',
    //           'data-target' : '#collapseItem' + counter,
    //         });

    //         $this.find('> ul').attr({
    //           'class' : 'collapse',
    //           'id' : 'collapseItem' + counter,
    //         });

    //         counter++;
    //       });

    //   }, 1000);

      //counter
        var a = 0;
        $(window).scroll(function() {
          if($('#counter').length>0){
            var oTop = $('#counter').offset().top - window.innerHeight;
            if (a == 0 && $(window).scrollTop() > oTop) {
              $('.numscroller').each(function() {
                var $this = $(this),
                  countTo = $this.attr('data-count');
                $({
                  countNum: $this.text()
                }).animate({
                    countNum: countTo
                  },

                  {

                    duration: 3000,
                    easing: 'swing',
                    step: function() {
                      $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                      $this.text(this.countNum);
                      //alert('finished');
                    }

                  });
              });
              a = 1;
            }
          }
        });

      $('body').on('click', '.arrow-collapse', function(e) {
        var $this = $(this);
        if ( $this.closest('li').find('.collapse').hasClass('show') ) {
          $this.removeClass('active');
        } else {
          $this.addClass('active');
        }
        e.preventDefault();  
        
      });

    $(window).resize(function() {
      var $this = $(this),
        w = $this.width();

      if ( w > 768 ) {
        if ( $('body').hasClass('offcanvas-menu') ) {
          $('body').removeClass('offcanvas-menu');
        }
      }
    })

    $('body').on('click', '.js-menu-toggle', function(e) {
      var $this = $(this);
      e.preventDefault();
      if ( $('body').hasClass('offcanvas-menu') ) {
        $('body').removeClass('offcanvas-menu');
        $this.removeClass('active');
      } else {
        $('body').addClass('offcanvas-menu');
        $this.addClass('active');
      }
    }) 

    // click outisde offcanvas
    $(document).mouseup(function(e) {
      var container = $(".pt-site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ( $('body').hasClass('offcanvas-menu') ) {
          $('body').removeClass('offcanvas-menu');
        }
      }
    });
  }); 
  

      // $('#search-block-form .form-submit').click(function(){return false;});

      // Tooltip
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
      //Add or remove class through js
      $( ".views-exposed-form" ).addClass( "row" );
      $( "#edit-submit-courses" ).addClass( "btn primary-btn" );
      $( "#block-coursesweoffer" ).addClass( "col-12 col-md-6 col-lg-4 we_offer" );
      $( ".comment-form #edit-submit--2" ).addClass("primary-btn");
      $( ".form-item-name-first" ).addClass("col-md-6");
      $( ".form-item-name-last" ).addClass("col-md-6");
      $( "#edit-name--wrapper .fieldset-wrapper" ).addClass("row");
      $( ".comment-comment-form #edit-submit--4" ).addClass("primary-btn");
      $( "#user-login-form .login-button #edit-submit" ).addClass("primary-btn");
      $( "#block-pt-university-pro-breadcrumbs .content" ).addClass("container");
  	  // Home Slider
  	  var owl = $('.slider_loop');
        //init default carousel
        owl.owlCarousel({
          loop: true,
          nav: true,
          navText: ["<i class='fas fa-chevron-left'></i>","<i class='fas fa-chevron-right'></i>"],
          autoplay: true,
          dots: false,
          responsive: {
            0:{
                items:1,
                dots: true
            },
            600:{
                items:1,
            },
            1000:{
                items:1,
            }    
          }
        });

        $('.galleryContainer').magnificPopup({
          delegate: 'a',
          type: 'image',
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
          },
          callbacks: {
            elementParse: function(item) {
              console.log(item.el[0].className);
              if(item.el[0].className == 'popup-youtube') {
                item.type = 'iframe',
                item.iframe = {
                   patterns: {
                     youtube: {
                       index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                       id: 'v=', // String that splits URL in a two parts, second part should be %id%
                        // Or null - full URL will be returned
                        // Or a function that should return %id%, for example:
                        // id: function(url) { return 'parsed id'; } 

                       src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe. 
                     },
                     vimeo: {
                       index: 'vimeo.com/',
                       id: '/',
                       src: '//player.vimeo.com/video/%id%?autoplay=1'
                     },
                     gmaps: {
                       index: '//maps.google.',
                       src: '%id%&output=embed'
                     }
                   }
                }
              } else {
                 item.type = 'image',
                 item.tLoading = 'Loading image #%curr%...',
                 item.mainClass = 'mfp-img-mobile',
                 item.image = {
                   tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
                 }
              }

            }
          }
        });
        

      // Gallery
      $(window).on('load', function(){
        var $grid = $('.grid').isotope({
          itemSelector: '.grid-item',
          columnWidth: 286,
          layoutMode: 'fitRows'
        });
        var filterFns = {
          numberGreaterThan50: function() {
            var number = $(this).find('.number').text();
            return parseInt( number, 10 ) > 50;
          },
          ium: function() {
            var name = $(this).find('.name').text();
            return name.match( /ium$/ );
          }
        };
        $('.filters-button-group').on( 'click', 'button', function() {
          var filterValue = $( this ).attr('data-filter');
          filterValue = filterFns[ filterValue ] || filterValue;
          $grid.isotope({ filter: filterValue });
        });
        $('.button-group').each( function( i, buttonGroup ) {
          var $buttonGroup = $( buttonGroup );
          $buttonGroup.on( 'click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
          });
        });
      });

      // Gallery 2grid
      $(window).on('load', function(){
        var $grid = $('.gal-grid-2').isotope({
          itemSelector: '.grid-item',
          columnWidth: 572,
          layoutMode: 'fitRows'
        });
        var filterFns = {
          numberGreaterThan50: function() {
            var number = $(this).find('.number').text();
            return parseInt( number, 10 ) > 50;
          },
          ium: function() {
            var name = $(this).find('.name').text();
            return name.match( /ium$/ );
          }
        };
        $('.filters-button-group').on( 'click', 'button', function() {
          var filterValue = $( this ).attr('data-filter');
          filterValue = filterFns[ filterValue ] || filterValue;
          $grid.isotope({ filter: filterValue });
        });
        $('.button-group').each( function( i, buttonGroup ) {
          var $buttonGroup = $( buttonGroup );
          $buttonGroup.on( 'click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
          });
        });
      });
      
       // Gallery 3grid
      $(window).on('load', function(){
        var $grid = $('.grid-3').isotope({
          itemSelector: '.grid-item',
          columnWidth: 381,
          layoutMode: 'fitRows'
        });
        var filterFns = {
          numberGreaterThan50: function() {
            var number = $(this).find('.number').text();
            return parseInt( number, 10 ) > 50;
          },
          ium: function() {
            var name = $(this).find('.name').text();
            return name.match( /ium$/ );
          }
        };
        $('.filters-button-group').on( 'click', 'button', function() {
          var filterValue = $( this ).attr('data-filter');
          filterValue = filterFns[ filterValue ] || filterValue;
          $grid.isotope({ filter: filterValue });
        });
        $('.button-group').each( function( i, buttonGroup ) {
          var $buttonGroup = $( buttonGroup );
          $buttonGroup.on( 'click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
          });
        });
      });

       // Gallery masonry
      $(window).on('load', function(){
        var $grid = $('.masonry').isotope({
          itemSelector: '.grid-item'
        });
        var filterFns = {
          numberGreaterThan50: function() {
            var number = $(this).find('.number').text();
            return parseInt( number, 10 ) > 50;
          },
          ium: function() {
            var name = $(this).find('.name').text();
            return name.match( /ium$/ );
          }
        };
        $('.filters-button-group').on( 'click', 'button', function() {
          var filterValue = $( this ).attr('data-filter');
          filterValue = filterFns[ filterValue ] || filterValue;
          $grid.isotope({ filter: filterValue });
        });
        $('.button-group').each( function( i, buttonGroup ) {
          var $buttonGroup = $( buttonGroup );
          $buttonGroup.on( 'click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
          });
        });
      });
      
      // Alumini testimonial
       // Testimonial
        var carousel = $(".testimonial-sec");
        carousel.owlCarousel({
          loop: true,
          dots:true,
          autoplay:true,
          autoplayTimeout:5000,
          responsive: {
            0: {
              items: 1
            },
            700: {
              items: 1,
            },
            1000: {
              items: 1
            }
          }
        });

        //search box on hover
      $(window).on('load', function(){

          var submitIcon = $('.search-block-form .search-icon');
          var inputBox = $('.js-form-type-search input.form-search');
          var searchBox = $('.search-block-form');
          var isOpen = false;
          submitIcon.click(function(){
              if(isOpen == false){
                  inputBox.addClass('searchbox-open');
                  inputBox.focus();
                  isOpen = true;
              } else {
                  inputBox.removeClass('searchbox-open');
                  inputBox.focusout();
                  isOpen = false;
              }
          });  
           submitIcon.mouseup(function(){
                  return false;
              });
         searchBox.mouseup(function(){
                  return false;
           });
          $(document).mouseup(function(){
                  if(isOpen == true){
                      $('.search-block-form .form-submit').css('display','block');
                  inputBox.removeClass('searchbox-open');
                  }
              });
      });
            function buttonUp(){
                var inputVal = $('.searchbox-input').val();
                inputVal = $.trim(inputVal).length;
                if( inputVal !== 0){
                    $('.searchbox-icon').css('display','none');
                } else {
                    $('.searchbox-input').val('');
                    $('.searchbox-icon').css('display','block');
                }
            }
  // counter coming soon
  function getTimeRemaining(endtime) {
      var t = Date.parse(settings.custom_date) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }
    function initializeClock(id, endtime) {
      var clock = document.getElementById(id);
      var daysSpan = clock.querySelector('.days');
      var hoursSpan = clock.querySelector('.hours');
      var minutesSpan = clock.querySelector('.minutes');
      var secondsSpan = clock.querySelector('.seconds');
      function updateClock() {
        var t = getTimeRemaining(endtime);
        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        if (t.total <= 0) {
          clearInterval(timeinterval);
          document.getElementById("clockdiv").innerHTML = settings.custom_message_dateExpired;
        }
      }
      updateClock();
      var timeinterval = setInterval(updateClock, 1000);
    }
    var deadline = new Date(Date.parse(new Date()));
    if($("#clockdiv").length){
        initializeClock('clockdiv', deadline);
    }

    }
  };
  $('#edit-lang-dropdown-select').select2();


})(jQuery, Drupal);