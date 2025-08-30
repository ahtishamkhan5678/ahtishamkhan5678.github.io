//jquery-click-scroll
//by syamsul'isul' Arifin

var sectionArray = [1, 2, 3, 4, 6, 7];

$.each(sectionArray, function(index, value){
    
    // Check if section exists before proceeding
    var sectionElement = $('#' + 'section_' + value);
    if (sectionElement.length === 0) {
        return; // Skip if section doesn't exist
    }
          
    $(document).scroll(function(){
        var offsetSection = sectionElement.offset().top - 90;
        var docScroll = $(document).scrollTop();
        var docScroll1 = docScroll + 1;
        
       
        if ( docScroll1 >= offsetSection ){
            $('.navbar-nav .nav-item .nav-link').removeClass('active');
            $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');  
            $('.navbar-nav .nav-item .nav-link').eq(index).addClass('active');
            $('.navbar-nav .nav-item .nav-link').eq(index).removeClass('inactive');
        }
        
    });
   
   $('.click-scroll').eq(index).click(function(e){
       var offsetClick = sectionElement.offset().top - 90;
       e.preventDefault();
       $('html, body').animate({
           'scrollTop':offsetClick
       }, 300)
   });
   
});

$(document).ready(function(){
    $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');    
    $('.navbar-nav .nav-item .nav-link').eq(0).addClass('active');
    $('.navbar-nav .nav-item .nav-link:link').eq(0).removeClass('inactive');
});