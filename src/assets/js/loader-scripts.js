"use strict";
// $(document).ready(function () {
// 	/*----------------------------------------
//      Pre Loader
//      ----------------------------------------*/
//     var anim;
//     var elem = document.getElementById('lottie');
//     var animData = {
//         container: elem,
//         renderer: 'svg',
//         loop: false,
//         autoplay: false,
//         rendererSettings: {
//             progressiveLoad: false,
//             preserveAspectRatio: 'xMidYMid meet',
//             imagePreserveAspectRatio: 'xMidYMid meet',
//             title: 'TEST TITLE',
//             description: 'TEST DESCRIPTION',
//         },
//         path: './assets/json/loader.json'
//     };
//     // lottie.setQuality('low');
//     anim = lottie.loadAnimation(animData);

//     $(window).on('load', function () {
    
//      $('#lottie').fadeIn();
//      anim.play();
//      //    var lines = document.getElementById('lines');
 
//      console.log("-- #lines fadeOut");
//      $('#lines').fadeOut();
 
//      setTimeout(function () {
//          $('.loader-wrapper').fadeOut('slow');
//          $('.loader-wrapper').remove('slow');
//      }, 5000)
 
 
//      });
// });

    $(window).on('load', function () {
       /*----------------------------------------
     Pre Loader
     ----------------------------------------*/
    var anim;
    var elem = document.getElementById('lottie');
    var animData = {
        container: elem,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad: false,
            preserveAspectRatio: 'xMidYMid meet',
            imagePreserveAspectRatio: 'xMidYMid meet',
            title: 'TEST TITLE',
            description: 'TEST DESCRIPTION',
        },
        path: './assets/json/loader.json'
    };
    // lottie.setQuality('low');
    // anim = lottie.loadAnimation(animData);

    // $('#lottie').fadeIn();
    // anim.play();
    
    // $('#lines').fadeOut();

    setTimeout(function () {
        $('.loader-wrapper').fadeOut('slow');
        $('.loader-wrapper').remove('slow');
    }, 2000)


    });