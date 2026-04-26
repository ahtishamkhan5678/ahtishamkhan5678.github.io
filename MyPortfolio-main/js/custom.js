
  (function ($) {

  "use strict";

    // PRE LOADER
    $(window).load(function(){
      $('.preloader').fadeOut(1000); // set duration in brackets

      // Show welcome popup after preloader - always show on every visit
      setTimeout(function() {
        var welcomePopup = new bootstrap.Modal(document.getElementById('welcomePopup'));
        welcomePopup.show();

        // Add blur effect to body when popup is shown
        document.body.classList.add('popup-open');
      }, 1500);
    });

    // CUSTOM LINK
    $('.custom-link').click(function(){
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height() + 10;

    scrollToDiv(elWrapped,header_height);
    return false;

    function scrollToDiv(element,navheight){
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop-navheight;

      $('body,html').animate({
      scrollTop: totalScroll
      }, 300);
  }
});
    
  })(window.jQuery);


