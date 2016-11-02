/**
 * *
 * @name 大转盘抽奖 小插件
 * @author topqiang
 * @description 
 * @version 1.0
 * */
(function($,window,undefined){
	$.fn.xq_getgift = function(obj){
		var defaults = {};
		$.extend(defaults, obj);
		var $self = $(this);
		var $clickbtn = $self.find(".clickbtn");
		var $runbtn = $self.find(".runbtn");
		var width = $self.width();
		var $innerdiv = $self.find(".innerdiv");
		var length = $innerdiv.size();
		$self.css({"padding":defaults.padding,"background-image":"url("+defaults.bgimg+")"});
		var rotatedeg = 360/length;
		var str = "";
		str += ".outdiv .innerdiv .incon{transform: skew(-"+(90-rotatedeg)/2+"deg,-"+(90-rotatedeg)/2+"deg) rotate(-"+rotatedeg+"deg);}";
		$innerdiv.each(function(){
			var curinnerdiv = $(this);
			var index = curinnerdiv.index();
			str += ".outdiv .innerdiv:nth-child("+(index+1)+"){transform:rotate("+(index*rotatedeg)+"deg) skew("+(90-rotatedeg)/2+"deg,"+(90-rotatedeg)/2+"deg);}";
		});
		$("<style/>").html(str).appendTo("head");
		$clickbtn.css({"background-image":"url("+defaults.clickbtn.bgimg+")","width":defaults.clickbtn.width,"height":defaults.clickbtn.width,"margin-top":(-defaults.clickbtn.width/2),"margin-left":(-defaults.clickbtn.width/2)});
		$runbtn.css({"width":defaults.runbtn.width,"height":(defaults.runbtn.width),"margin-top":((-defaults.runbtn.width/2)),"margin-left":(-defaults.runbtn.width/2)});
		$innerdiv.css({"top":(width/2-defaults.padding),"left":(width/2-defaults.padding)});
		$clickbtn.on('click',function(){
			$clickbtn.attr('disabled',true).css("cursor","default"); 
			lottery($runbtn,defaults.posturl);
		});
		
		
		function lottery(runbtn,posturl){ 
		    $.ajax({ 
		        type: 'get', 
		        url: posturl, 
		        dataType: 'json', 
		        cache: false, 
		        error: function(){return false;}, 
		        success:function(obj){
					runbtn.rotate({ 
						duration:3000, //转动时间 
						angle: 0, //默认角度
						animateTo:360*6+obj.rotate, //转动角度 
						easing: $.easing.easeOutSine, 
						callback: function(){
							console.log(obj.results);
							$clickbtn.attr('disabled',false).css("cursor","pointer"); 
						} 
					});
		        } 
		    }); 
		};
	}
})(jQuery,window);
