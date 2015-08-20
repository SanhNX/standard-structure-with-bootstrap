/**
 * Created by SanhNX on 19/08/2015.
 */
$(document).ready(function() {

	// hide #back-top first
    jQuery(".scroll-top").hide();

	// fade in #back-top
    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > 100) {
            jQuery('.scroll-top').stop(false,true).fadeIn(600);
        } else {
            jQuery('.scroll-top').stop(false,true).fadeOut(600);
        }

        if(jQuery(this).scrollTop() == 500/* || jQuery(this).scrollTop() == 3071*/){
            wow.init();
        }
    });

    // scroll body to 0px on click
    jQuery('.scroll-top').click(function () {
        scrollToY(0, true);
        return false;
    });

    jQuery(window).bind('scroll', function() {
		 if (jQuery(window).scrollTop() > 0) {
			 jQuery('#header_outer').addClass('fixed');
		 }
		 else {
			 jQuery('#header_outer').removeClass('fixed');
		 }
	});	

	wow = new WOW(
      {
    		boxClass:     'wow',      // default
			animateClass: 'animated', // default
			offset:       0,          // default
			mobile:       true,       // default
			live:         true
      }
    );
    wow.init();

    $('#header_outer').scrollToFixed();
    $('.res-nav_click').click(function(){
        $('.main-nav').slideToggle();
        return false;
    });

    $('.res-nav_click').click(function(){
        $('ul.toggle').slideToggle(600) 
    });

    $('a').bind('click',function(event){
		var $anchor = $(this);
		
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top - 91
		}, 1500,'easeInOutExpo');
		/*
		if you don't want to use the easing effects:
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1000);
		*/
		event.preventDefault();
	});
});

function scrollToY(y, animate) {
    if(animate !== false)
        jQuery('html, body').animate({
            scrollTop: y
        }, 800);
    else
        jQuery('html, body').scrollTop(y);
}