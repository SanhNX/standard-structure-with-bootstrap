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
    });

    // scroll body to 0px on click
    jQuery('.scroll-top').click(function () {
        scrollToY(0, true);
        return false;
    });


    $('.res-nav_click').click(function(){
        $('.main-nav').slideToggle();
        return false;
    });

    $('.res-nav_click').click(function(){
        $('ul.toggle').slideToggle(600) 
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