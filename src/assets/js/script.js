"use strict";

/*----------------------------------------
     Mobile Menu & Search
  ----------------------------------------*/
$(document).ready(function(){
    // $(".mobile-toggle").click(function(){
    //     $(".nav-menus").toggleClass("open");
    // });
    // $(".mobile-search").click(function(){
    //     $(".form-control-plaintext").toggleClass("open");
    // });
});

/*----------------------------------------
     Mobile Sidebar Menu
  ----------------------------------------*/
$(document).ready(function(){
    if($(window).width() <= 991 ) {
      $("#sidebar-toggle").prop('checked', false);
      $(".page-body-wrapper").addClass("sidebar-close");
    }
    $("#sidebar-toggle").change(function(){
      if($("#sidebar-toggle").attr('checked', true)){
        $(".page-sidebar").addClass("page-sidebar-open");
      }
    });

    $(".mobile-toggle").click(function(){
      $('.sidebar-background').toggleClass('hidden');
      $(".page-sidebar").addClass("page-sidebar-open");
      $(".page-body-wrapper").toggleClass("sidebar-close");
    });

    $(".sidebar-background").click(function(){
      $('.sidebar-background').toggleClass('hidden');
      $(".page-sidebar").addClass("page-sidebar-open");
      $(".page-body-wrapper").toggleClass("sidebar-close");
    });
  
});


/*----------------------------------------
     Popover
  ----------------------------------------*/
$('.example-popover').popover({
   container: 'body'
});

