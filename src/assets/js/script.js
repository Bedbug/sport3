"use strict";


/*----------------------------------------
     Fix for safari viewport height
  ----------------------------------------*/
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
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

// $('input').on('focus', function(e) {
//   e.preventDefault(); e.stopPropagation();
//   window.scrollTo(0,0); //the second 0 marks the Y scroll pos. Setting this to i.e. 100 will push the screen up by 100px. 
// });

$( window ).resize(function() {
  console.log( "<div>Handler for .resize() called.</div>" );
  this.calculateHeight();
});

function calculateHeight(){
  vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// let defferedPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  // Stash the event so it can be triggered later.
  // defferedPrompt = e;
  console.log("beforeinstallprompt");
  e.prompt();
});

/*----------------------------------------
     Mobile Sidebar Menu
  ----------------------------------------*/
$(document).ready(function(){
    // if($(window).width() <= 991 ) {
      $("#sidebar-toggle").prop('checked', false);
      $(".page-body-wrapper").addClass("sidebar-close");
    // }
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

