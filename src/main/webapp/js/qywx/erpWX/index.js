$(function(){
	//var wx = $(window).width();   //获取可视区屏幕的宽度
	//var wy = $(window).height();  //获取可视区屏幕的高度
	//var fontSize = (wx*wy)*100/(720*980);
	$('html').css('font-size','80px');
	LineHeight($('header'));
	//获取信息
	
	var url = window.location.href;
	url = decodeURI(decodeURI(url));
	var arr = url.split('&');
	var account = arr[0].split('=')[1];
	var flag = arr[1].split('=')[1];
	$('header').html('欢迎您，'+account);
	account = encodeURI(encodeURI(account));
	/*if(flag != 1){
		$('setion figure').eq(0).hide();
	}*/
	$('setion figure').eq(0).hide();
	$('setion figure').eq(0).click(function(){
		window.location.href='erpQuery.html?user='+account+'&flag='+flag+'&type=QueryClient';
	});
	$('setion figure').eq(1).click(function(){
		window.location.href='erpQuery.html?user='+account+'&flag='+flag+'&type=tofoDateils';
	});
	$('setion figure').eq(2).click(function(){
		window.location.href='erpQuery.html?user='+account+'&flag='+flag+'&type=tofoStock';
	});
	$('setion figure').eq(3).click(function(){
		window.location.href='erpQuery.html?user='+account+'&flag='+flag+'&type=orderQuery';
	});
	$('setion figure').eq(4).click(function(){
		window.location.href='erpQuery.html?user='+account+'&flag='+flag+'&type=productionProgress';
	});
	$('setion figure').eq(5).click(function(){
		window.location.href='erpQuery.html?user='+account+'&flag='+flag+'&type=productDateils';
	});
	$('setion figure').eq(6).click(function(){
		window.location.href='erpQuery.html?user='+account+'&flag='+flag+'&type=productStock';
	});
	//修改密码
	$('button').click(function(){
		window.location.href='editWord.html?user='+account+'&flag='+flag+'&type=productStock';
	});
});
//设置行高
function LineHeight(ele){
	var liH = ele.height();
	ele.css("line-height",liH+"px");
}