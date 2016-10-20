/**
 * @name dom  linkto 属性增强
 * @author topqiang
 * @version 1.0
 * **/
function top_linkto(){
	$("[linkto]").on('click',function(){
		var self = $(this);
		var url = $.trim(self.attr("linkto"));
		if( url == ""){
			return;
		}
		//匹配全路径跳转
		if( url.indexOf("http://") == 0 || url.indexOf("https://") == 0 ){
			window.location.href = url;
		}else if( url.indexOf("/") == 0 ){
			//匹配   类似于Thinkphp类型的URL {:U('Index/index')} => /项目名/index.php/Index/index  
			var hostname = getRootPath();
			url = hostname + url;
			window.location.href = url;
		}else if( url.indexOf("javascript:") == 0){
			var start = url.indexOf(":");
			var str = url.substring(start+1);
			eval(str);
		}else if( url.indexOf("./") == 0 || url.indexOf("/") == -1){
			//匹配静态跳转，已经相对路径跳转。
			var curUrl = window.location.href;
			url = curUrl.substr(0,curUrl.lastIndexOf("/")+1) + url;
			window.location.href = url;
		}
	});
}
function getRootPath(){
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    var localhostPaht=curWwwPath.substring(0,pos);
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}
/**
 * @name check响应
 * @author topqiang
 * @version 1.0
 * **/
function top_check(){
	$(".top_radio").on('click',function(){
		var self = $(this);
		self.addClass("on");
		self.siblings().removeClass("on");
	});
	$(".top_check").on('click',function(){
		var self = $(this);
		if(self.hasClass("on")){
			self.removeClass("on");
		}else{
			self.addClass("on");
		}
	});
}
/**
 * @name  星级评价组件
 * @author topqiang
 * @version 1.0
 * **/
function top_rate(){
	$(".top_rate span").on('click',function(){
		var self = $(this);
		self.nextAll().removeClass("on");
		self.prevAll().addClass("on");
		if(!self.hasClass("on")){
			self.addClass("on");
		}
	});
}
/**
 * @name  购物车显示隐藏
 * @author topqiang
 * @version 1.0
 * **/
function top_ingley(){
	$(".gley .icongley").on('click',function(){
		if($(this).parents('.gley').hasClass('on')){
			$(".zhao").toggleClass('disn');
			$(".zhcon").toggleClass('disn');
		}
	});
}
/**
 * @name 隐式下拉框交互
 * @author topqiang
 * @version 1.0
 * **/
function top_select(){
	$("select.selpstime").on('change',function(){
		var self = $(this);
		var elename = self.attr("forele");
		if($.trim(elename) != ""){
			var ele = self.parent().find("[ele="+elename+"]");
			ele.text(self.val());
		}
	});
}
$(function(){
	//吊起linkto增强页面跳转
	top_linkto();
	//吊起check响应
	top_check();
	//开启星级评价
	top_rate();
	//开启购物车
	top_ingley();
	//吊起统一下拉框
	top_select();
});
