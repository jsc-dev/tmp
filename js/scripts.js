/* ==============================================
Parallax (*)
=============================================== */
if(!Modernizr.touch){ 
    $.stellar({ 
        horizontalScrolling: false,
        responsive: true
    });  
} 

/* ==============================================
Sticky Navbar (*)
=============================================== */
$(document).ready(function(){
    $(".navbar").sticky({topSpacing:0});
});

/* ==============================================
Auto Close Responsive Navbar on Click
=============================================== */
function close_toggle() {
    if ($(window).width() <= 992) {
      $('.navbar-collapse a').on('click', function(){
          $('.navbar-collapse').collapse('hide');
      });
    }
    else {
        $('.navbar .navbar-default a').off('click');
    }
}
close_toggle();
$(window).resize(close_toggle); 


/* ==============================================
Contact Form
=============================================== */
jQuery(document).ready(function(){
	$('#contactform').submit(function(){
		var action = $(this).attr('action');
		$("#message").slideUp(750,function() {
		$('#message').hide();
 		$('#submit')
			.after('<img src="img/ajax-loader.gif" class="loader" />')
			.attr('disabled','disabled');
		$.post(action, {
			name: $('#name').val(),
			email: $('#email').val(),
			phone: $('#phone').val(),
			comments: $('#comments').val(),
		},
			function(data){
				document.getElementById('message').innerHTML = data;
				$('#message').slideDown('slow');
				$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
				$('#submit').removeAttr('disabled');
				if(data.match('success') != null) $('#contactform').slideUp('slow');
			}
		);
		});
		return false;
	});
});

/* ==============================================
Smooth scrolling to anchor
=============================================== */
$(function() {
    $('.btn-home a, .scroll, #main-nav a,.footer-menu a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 70
        }, 1000);
        event.preventDefault();
    });
});

    
/* ==============================================
Active Menu Item on Page Scroll
=============================================== */   
var sections = $('section')
  , nav = $('nav')
  , nav_height = nav.outerHeight();
 
$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();
 
  sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();
 
    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('current');
      sections.removeClass('current');
 
      $(this).addClass('current');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('current');
    }
  });
});

/***********************************************
 * QUICKSAND FILTER (*)
 ***********************************************/
$(document).ready(function() {

  // get the action filter option item on page load
  var $filterType = $('#filterOptions li.active a').data('value');
    
  // get and assign the ourHolder element to the
    // $holder varible for use later
  var $holder = $('ul.ourHolder');

  // clone all items within the pre-assigned $holder element
  var $data = $holder.clone();

  // attempt to call Quicksand when a filter option
    // item is clicked
    $('#filterOptions li a').click(function(e) {
        e.preventDefault();
        // reset the active class on all the buttons
        $('#filterOptions li').removeClass('active');
        
        // assign the class of the clicked filter option
        // element to our $filterType variable
        var $filterType = $(this).data('value');
        $(this).parent().addClass('active');
        
        if ($filterType == 'all') {
            // assign all li items to the $filteredData var when
            // the 'All' filter option is clicked
            var $filteredData = $data.find('li');
        } 
        else {
            // find all li elements that have our required $filterType
            // values for the data-type element
            var $filteredData = $data.find('li[data-type=' + $filterType + ']');
        }
        
        // call quicksand and assign transition parameters
        $holder.quicksand($filteredData, {
            duration: 800,
            //easing: 'swing'
            easing: 'easeInOutQuad'
        });
        return false;
    });
});


/***********************************************
 * SCROLL TO TOP (*)
 ***********************************************/
$(document).ready(function() {
    if($('#scrolltop').length) {
        init_scrolltop();
    }
});
function init_scrolltop(s) {
    var scrolltop = $('#scrolltop');
    // scrolltop.hide();
    var win = $(window).scroll(function() {
        if(win.scrollTop() > 800) {
            if(!scrolltop.is(':visible')) {
                scrolltop.stop(true, true).fadeIn();
            }
        } else {
            if(!scrolltop.is(':animated')) {
                scrolltop.stop(true, true).fadeOut();
            }
        }
    });
}
