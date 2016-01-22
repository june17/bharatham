var maxed = false;
var maxmargin = 720;
var minmargin = 564;


function offsetMenu(){
	if($(window).width()>=1280 && $(window).height()>=730){
		maxmargin = 920;
		minmargin = 720;
	}else{
		maxmargin = 720;
		minmargin = 564;
	}

	if($(window).scrollTop()<=$('.artiste').last().offset().top-286 && $(window).scrollTop()>=$('#events').offset().top){
		$('#prog_nav, #prog_content').addClass('affix');
	}else{
		$('#prog_nav, #prog_content').removeClass('affix');
	}
	if($(window).scrollTop()>=$('.artiste').last().offset().top-286){
		$('#prog_nav, #prog_content').addClass('affix-bottom');
		$('#prog_nav').css({
			'top':$('.artiste').last().position().top
		});
	}else{
		$('#prog_nav, #prog_content').removeClass('affix-bottom');
		$('#prog_nav').removeAttr('style');
	}
	

	var winscroll = $(window).scrollTop();

	var ratio = (winscroll-600)/3000;
	var revratio = 1-ratio;

	var marginratio = (winscroll+1897)/3000;
	var revmarginratio = 1-marginratio;

	var maxwidth = 353;
	var minwidth = 298;

	var newwidth = revratio*maxwidth;
	if(newwidth<=minwidth){
		newwidth=minwidth;
	}
	if(newwidth>=maxwidth){
		newwidth = maxwidth;
	}

	var newmargin = marginratio*maxmargin;
	if(newmargin<=minmargin){
		newmargin=minmargin;
	}
	if(newmargin>=maxmargin){
		maxed = true;
		newmargin=maxmargin;
	}else{
		maxed = false;
	}
	$('#logonav').css('margin-left', newmargin);
	$('#logo').width(newwidth);

	if(maxed){
		 	$(document.documentElement).addClass('menu_maxed');
	}else{
		 	$(document.documentElement).removeClass('menu_maxed');
			
	}
}

function scrollToElement(el, offset){
	if(typeof(offset)==='undefined'){
		offset=0;
	}
	if(el.length>0){
		if($(window).scrollTop()<=el.offset().top-250 || $(window).scrollTop()>=el.offset().top+250){
			$('body,html').stop().animate({
				scrollTop:el.offset().top-offset
			}, 2000);
		}
	}
}

function setSliderInterval(){
	var sliderInterval = window.setInterval(function(){
		var slides = $('#slider .slide');
		var points = $('#slider_nav>li');
		var activeSlide = $('#slider .slide.active');
		var activePoint = $('#slider_nav li.active');

		var nextSlide = activeSlide.next('.slide');
		if(nextSlide.length<=0){
			nextSlide = slides.first();
		}

		var nextPoint = activePoint.next('li');
		if(nextPoint.length<=0){
			nextPoint = points.first();
		}

		activeSlide.removeClass('active');
		activePoint.removeClass('active');
		nextSlide.addClass('active');
		nextPoint.addClass('active');
	}, 3500);


	return sliderInterval;
}

$(document).ready(function(){
	offsetMenu();
	$(window).stellar({
		positionProperty: 'transform',
		hideDistantElements: false
	});

	var sliderInterval = setSliderInterval();
	$('#slider_nav li a').on('click', function(ev){
		var slideNum = parseInt($(this).attr('href').replace('#', ''));

		$('#slider .slide.active').removeClass('active');
		$('#slider_nav li.active').removeClass('active');

		$('#slider .slide').eq(slideNum-1).addClass('active');
		$('#slider_nav li').eq(slideNum-1).addClass('active');


		clearInterval(sliderInterval);
		sliderInterval = setSliderInterval();
		ev.preventDefault();
	});
});

$(window).on('load', function(){
	offsetMenu();
	$('#logo').on('click', function(ev){
		scrollToElement($(document.body));

		ev.preventDefault();
	});

	if(window.location.hash!=''){
		var el = $(window.location.hash);
		window.setTimeout(function(){
			scrollToElement(el);
		}, 250);
	}
	
	$('#main_menu ul li.navitem a').on('click', function(ev){
		var id = '#'+$(this).attr('href');
		var el = $(id);
		scrollToElement(el);
		ev.preventDefault();
	});

	$('#prog_nav ul li a').on('click', function(ev){
		var el = $($(this).attr('href'));
		scrollToElement(el, 146);
		ev.preventDefault();
	});

	
	// scrollspy
	$('.container').each(function(i) {
		var el = $(this);
		el.scrollspy({
			min: function(){ return el.position().top-400; },
			max: function(){ return el.position().top + el.height()-400; },
			onEnter: function(element, position) {
				$('#main_menu ul li.navitem a[href="'+$(element).attr('id')+'"]').addClass('active');
			},
			onLeave: function(element, position) {
				$('#main_menu ul li.navitem a[href="'+$(element).attr('id')+'"]').removeClass('active');
			}
		});
	});

	$('.artiste').each(function(i){
		var el = $(this);
		el.scrollspy({
			min:function(){ return el.offset().top-el.height()-146; },
			max:function(){ return el.offset().top+el.height()+80; },
			onEnter:function(element, position){
				$('#prog_nav ul li a[href=#'+$(element).attr('id')+']').addClass('active');
			},
			onLeave:function(element, position){
				$('#prog_nav ul li a[href=#'+$(element).attr('id')+']').removeClass('active');
			}
		})
	});

	// open text of artists
	$('.artiste .btn_plus').on('click', function(ev){
		$(this).parents('.artiste').toggleClass('active');
		ev.preventDefault();
	});

});

$(window).on('scroll', function(ev){
	offsetMenu();


	// look if elements of nav are up or down to change the arrow accordingly
	$('#main_menu ul li.navitem a').each(function(index, el){
		if($(document.body).scrollTop()>$('#'+$(this).attr('href')).offset().top+400){
			$(el).addClass('up');
		}else{
			$(el).removeClass('up');
		}
	});
});

$(window).on('resize', offsetMenu);