jQuery(function($){
		
        
    // Supersized background slider    		
	$.supersized({
	
		// Functionality
		slide_interval          :   7000,		// Length between transitions
		transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed		:	3000,		// Speed of transition
		thumbnail_navigation    :   0,										   
		// Components							
		slide_links				:	'false',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
		slides 					:  	[			// Slideshow Images
										{image : 'img/slider/slider_1.jpg', title : ''},
										{image : 'img/slider/slider_2.jpg', title : ''},  
										{image : 'img/slider/slider_3.jpg', title : ''}
									]
	});



    // Set the custom date - jQuery Countdown
    var austDay = new Date(2014,5,20,0,0,0); // Year, Month, Day, Hour, Minute, Second
    
	$('#defaultCountdown').countdown({
	   until: austDay,
       labels:  ['Ano', 'Mes', 'Semanas', 'Dias', 'Horas', 'Minutos', 'Segundos'],
       labels1: ['Ano', 'Mes', 'Semanas', 'Dias', 'Horas', 'Minutos', 'Segundos']
    });
	$('#year').text(austDay.getFullYear());
    
    
    
    // Subscribe form 
    var mouseDown;
    var ajaxResult;
     
    // Sending email by Ajax 
	$('#submit').mousedown(function(){

        mouseDown = true;
        	
		$.ajax({
			type: 'POST',
			url: 'subscribe.php',
			data: 'email=' + $('#email').val(),
			success: function(data) {
			 
                $('.subscribe-title').animate({
                    opacity: 0
                    }, 500, 'linear', function() {
                        $(this).animate({fontSize:"1em"},{ queue: false, duration: 0 });
                        $(this).html(data);
                        $(this).animate({opacity:1},500);
                        ajaxResult = true;  
                });
			}
		});

		return false;
	});

	$('#submit').mouseup(function(){
        mouseDown = false;
    });
    
    
    // Animtaion focus and blur
    $('#email').on({
		'focus': function() {
		    
            if(ajaxResult) {
                $('#subscribe_form').animate({marginTop:20},500);
            } 
			$('.social-container').animate({opacity:0}, {duration: 500});
            $('.subscribe-title').show().animate({marginBottom:0, opacity:1}, {duration: 750});
            $('#social').animate({opacity: 1}, {duration: 500})
                        .animate({ marginTop:-60});
                        
		},
		'blur': function() {
		  
            if (mouseDown) { // cancel blur event
                mouseDown = false;
            } else {
    			$('#social').show()
    				.animate({opacity: 1}, {duration: 500})
    				.animate({marginTop:0});
                    
    			$('.social-container').show().animate({ opacity: 0 }, {duration: 500})
                                             .animate({opacity:1});
                $('.subscribe-title').show().animate({marginBottom:-20, opacity:0});
                
                if(ajaxResult) {
                    $('#subscribe_form').animate({marginTop:-20},1000);
                }
            }
		}
	});
    
});