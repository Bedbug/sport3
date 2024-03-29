"use strict";
$.sidebarMenu = function(menu) {
  var animationSpeed = 300,
      subMenuSelector = '.sidebar-submenu',
      permenteSate = '.always-open';
  $(menu).on('click', 'li a', function(e) {
    var $this = $(this);
    var checkElement = $this.next();
    if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
      
      if(checkElement.parent("li").is(permenteSate))
      return;
      
      checkElement.slideUp(animationSpeed, function() {
        checkElement.removeClass('menu-open');
      });
      checkElement.parent("li").removeClass("active");
    }
    else if ((checkElement.is(subMenuSelector)) && (!checkElement.is(':visible'))) {
      var parent = $this.parents('ul').first();
      var ul = parent.find('ul:visible').toggle(animationSpeed);
      ul.removeClass('menu-open');
      var parent_li = $this.parent("li");
      checkElement.toggle(animationSpeed, function() {
        checkElement.addClass('menu-open');
        parent.find('li.active').removeClass('active');
        parent_li.addClass('active');
      });
    }
    if (checkElement.is(subMenuSelector)) {
      e.preventDefault();
    }
  });
}
$(".mobile-sidebar .switch-state").click(function(){
  $(".page-body-wrapper").toggleClass("sidebar-close");
});
$.sidebarMenu($('.sidebar-menu'));

