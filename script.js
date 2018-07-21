
$(window).load(function(){
        $("[data-toggle]").click(function() {
          var toggle_el = $(this).data("toggle");
          $(toggle_el).toggleClass("open-sidebar");
          $('.swipe-area').toggleClass("open-sidebar");
        });
      });


function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    var scrollTop = window.pageYOffset;
    var top  = box.top + scrollTop;

    return { top: Math.round(top) };
}

window.onscroll = function(){
	firstAnim();
}

function firstAnim(){
	var anim_block = document.getElementsByClassName('row');

	if(anim_block[anim_block.length-1].style.opacity == ''){
		for (var i = 1; i < anim_block.length; i++) {
			if(getCoords(anim_block[i]).top - $(window).height()/1.3 < window.pageYOffset && anim_block[i].style.opacity == ''){
				thisAnim(anim_block[i], anim_block[anim_block.length-1], i);
			}
		}
	}
}

function thisAnim(animElem, lastElem, count){
	var count_block = document.getElementsByClassName('number');

	if(count % 2 == 0){
		console.log($(window).width() - animElem.getBoundingClientRect().right, 'yes');
		$(animElem).css('transform', 'translate(-' + $(window).width() + 'px, 0px)');
	} else {
		console.log($(window).width() - animElem.getBoundingClientRect().right);
		$(animElem).css('transform', 'translate(' + $(window).width()+ 'px, 0px)');
	}

	$(animElem).animate({
		opacity: 1
	}, 50, function(){
		var single_block = this.getElementsByClassName('single-block');
		for (var i = 0; i < single_block.length; i++) {
			setTimeout( function(locI){
				return function(){ $(single_block[locI]).css('transform', 'scale(1)'); }
			}(i), 500*i);
		}
		this.style.transform = 'translate(0px, 0px)';
	});

	if (animElem == lastElem) {
		for (var i = count_block.length - 1; i >= 0; i--) {
	  	showCount(count_block[i]);
	  	}
	}
}


function showCount(countElem){
	 var endCount = countElem.innerHTML;
	$({numberValue: 0}).animate({numberValue: +endCount}, { 
		duration: 2500,
		easing: "linear", 
		step: function(val) {  
			$(countElem).html(Math.ceil(val));
		}
	}); 
}
