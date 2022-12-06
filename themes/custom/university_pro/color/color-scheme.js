// Demo Code
(function ($, Drupal) {
  'use strict';
    Drupal.behaviors.color_panel = {
      attach: function(context, settings) {
        var default_primary= $(':root',context).once("colorPBehaviour").css("--primary-color");
        var default_secondary= $(':root',context).once("colorSBehaviour").css("--secondary-color");
        $( document,context).once("readyBehave").ready(function() {  
          if (typeof(Storage) !== "undefined") {
            // Retrieve
            var primary_color = sessionStorage.getItem("pt-theme-primary-color");
            var secondary_color = sessionStorage.getItem("pt-theme-secondary-color");

            if(primary_color !== "undefined" && secondary_color !== "undefined"){
              $(':root').css('--primary-color',primary_color);
              $(':root').css('--secondary-color',secondary_color);
              $('.item-color[data-primary_color="'+primary_color+'"]').filter( $( "[data-secondary_color='"+secondary_color+"']" )).addClass('active');
            }
          }
        }); 
        $('.pt-skins-panel .control-panel', context).once('color_panel').click(function(){
              if($(this).parents('.pt-skins-panel').hasClass('active')){
                  $(this).parents('.pt-skins-panel').removeClass('active');
                  $('.pt-skins-panel .control-panel .fa').addClass('fa-cog fa-spin');
                $('.pt-skins-panel .control-panel .fa-cog').removeClass('far fa-times');
                  
              }
              else{
                $(this).parents('.pt-skins-panel').addClass('active');  
                $('.pt-skins-panel .control-panel .fa').removeClass('fa-cog fa-spin');
                $('.pt-skins-panel .control-panel .fa').addClass('far fa-times');

              } 
          });

          $('#pt-reset-color', context).once('resetBehavior').click(function(){
               $(':root').css('--primary-color',default_primary);
               $(':root').css('--secondary-color',default_secondary);
               if (typeof(Storage) !== "undefined") {
                  sessionStorage.setItem("pt-theme-primary-color", default_primary);
                  sessionStorage.setItem("pt-theme-secondary-color", default_secondary);
                }
          });

          $('.pt-skins-panel .item-color', context).once('color_panel').click(function(){
              if($(this).data('primary_color')){
                var category = $(this).data('category');
                var primary_color = $(this).data('primary_color');
                var secondary_color = $(this).data('secondary_color');
                $('.pt-skins-panel .item-color').removeClass('active');
                $(this).addClass('active');
                $(':root').css('--primary-color',$(this).data('primary_color'));
                $(':root').css('--secondary-color',$(this).data('secondary_color'));
                if (typeof(Storage) !== "undefined") {
                  sessionStorage.setItem("pt-theme-primary-color", $(this).data('primary_color'));
                  sessionStorage.setItem("pt-theme-secondary-color", $(this).data('secondary_color'));
                }
              }
          });

          // Header style change on load
            // Header style On change
          $('#item_list').on('change', function() {
            $("#loader").css('display', 'flex');
            if(this.value == 'header-4'){
              $('#banner').addClass('header_4_banner');
            }
            else {
              $('#banner').removeClass('header_4_banner');
            }
            // $("#page_content").css('display', 'none');
            $(".pt_nav_header").attr('id', this.value);
            $('.pt_header_type').removeClass('active');
            var current_header_id = this.value.substr(this.value.indexOf("-") + 1);
            $('.pt_header_type.header-'+current_header_id).addClass('active');
            $('#slider').addClass('header-variation');
            $('#banner').addClass('header-variation');

              if (typeof(Storage) !== "undefined") {
                sessionStorage.setItem("pt-theme-header", this.value);
              }
            $("option[value=" + this.value + "]", this).attr("selected", true).siblings().removeAttr("selected")
              var myVar = setTimeout(showPage, 2000);
          });  
          function showPage() {
            $("#loader").css('display', 'none');
            // $("#page_content").css('display', 'block');
          }
          //checkbox 
          $('#Check1').click(function(){
            if($(this).is(":checked")){
                $("header").addClass("f-sticky");
            }
            else if($(this).is(":not(:checked)")){
                $("header").removeClass("f-sticky");

            }
          });
          $('#Check2').click(function(){
              if($(this).is(":checked")){
                  $('#page-loader').addClass('f-active');
              }
              else if($(this).is(":not(:checked)")){
                  $('#page-loader').removeClass('f-active');

              }
          });
          if($('#Check1').is(":checked")){
            $("header").addClass("f-sticky");
          }
          else if($(this).is(":not(:checked)")){
            $("header").removeClass("f-sticky");

          }
          if($('#Check2').is(":checked")){
              $('#page-loader').addClass('f-active');
          }
          else if($(this).is(":not(:checked)")){
              $('#page-loader').removeClass('f-active');

          }
    }
  };
  document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'complete') {
           document.getElementById('interactive');
           document.getElementById('page-loader').style.visibility="hidden";
    }
  }
})(jQuery, Drupal);

// Demo Code