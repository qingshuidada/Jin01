var account;
var flag;
$(function(){
	var url = window.location.href;
	url = decodeURI(decodeURI(url));
	var arr = url.split('&');
	account = arr[0].split('=')[1];
	flag = arr[1].split('=')[1];
	$('#erpTop .erpHeader .right .userAccount').text('欢迎您，'+account);
	account = encodeURI(encodeURI(account));
	$('#erpTop .nav li').eq(0).click(function(){
		var text = $(this).text();
		if(text == '主页'){
			//window.location.href='clientIndex.html?user='+account+'&flag='+flag;
			window.open('http://www.hzdamei.com/');
		}else{
			window.location.href='salesmanQueryClient.html?user='+account+'&flag='+flag;
		}
	});
	$('#erpTop .nav li').eq(1).click(function(){
		window.location.href='tofoDateils.html?user='+account+'&flag='+flag;
	});
	$('#erpTop .nav li').eq(2).click(function(){
		window.location.href='tofoStock.html?user='+account+'&flag='+flag;
	});
	$('#erpTop .nav li').eq(3).click(function(){
		window.location.href='orderQuery.html?user='+account+'&flag='+flag;
	});
	$('#erpTop .nav li').eq(4).click(function(){
		window.location.href='productionProgress.html?user='+account+'&flag='+flag;
	});
	$('#erpTop .nav li').eq(5).click(function(){
		window.location.href='productDateils.html?user='+account+'&flag='+flag;
	});
	$('#erpTop .nav li').eq(6).click(function(){
		window.location.href='productStock.html?user='+account+'&flag='+flag;
	});
	//退出
	$('#erpTop .erpHeader .right .welcome span:eq(1)').click(function(){
		$.ajax({
			url:"../../../ErpLogin/removeSession.erp",
			success:function(data){
				if(flag == 1){
					window.location.href='../salesmanLogin.html';
				}else{
					window.location.href='../clientLogin.html';
				}
			}
		})
		
	});
	//清空
	$('#dataArea .toolBar .clean').click(function(){
		$(this).parent().find('input[type=text]').val('');
	});
});
// 定义mdDateGrid option
var option;	
//加载车间(数据库名)
$.ajax({
	url:'../../../erpSelect/queryDataResourceName1.erp?getMs='+getMS(),
	success:function(data){
		if($('#dataArea .dataSelect .workshopSelect').length > 0){
			data = $.parseJSON(data);
			var str = '';
			for(var i=0;i<data.length;i++){
				str += '<li key="'+data[i].dataSourceKey+'">'+data[i].dataSourceName+'</li>';
			}
			$('#dataArea .dataSelect .workshopSelect').html(str);
			$('#dataArea .dataSelect .workshopSelect li:eq(0)').addClass('liNow');
			//切换数据库
			$('#dataArea .dataSelect .workshopSelect li').click(function(){
				$('#dataArea .dataSelect .workshopSelect .liNow').removeClass('liNow');
				$(this).addClass('liNow');
				var key = $('#dataArea .dataSelect .workshopSelect .liNow').attr('key');
				if(flag==1){
					option.queryParams = {
							ywmanFlag:1,
							dataSourceKey:key
					}
				}else{
					option.queryParams = {
							kehuFlag:1,
							dataSourceKey:key
					}
				}
				
				$('#mdDateGrid').mddatagrid(option);
				$('#dataArea .dataSelect h3').attr('key',key);
			});
			//选择数据
			var key = $('#dataArea .dataSelect .workshopSelect .liNow').attr('key');
			$('#dataArea .dataSelect h3').attr('key',key);
			loadMdDateGrid();
		}
	},
	error:function(err){
		alert('网络异常');
	}
});

function getMS(){
	var date = new Date();
	return date.getTime();
}
/*--------------验证时间格式--------------*/
function testDate(ele){
	var value = $(ele).val();
	if(!value){
	}else{
		if(value.length == 8 && value.indexOf("-") == '-1'){
			var regexp1 = /^(?:(?!0000)[0-9]{4}(?:(?:0?[1-9]|1[0-2])(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])(?:29|30)|(?:0?[13578]|1[02])31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)0?229)$/;
			if(regexp1.test(value)){//value.replace(regexp)
				//console.log(regexp.test(value));
				var Year = value.substring(0,4);
				var Month = value.substring(4,6);
				var Date = value.substring(6,8);
				var str = Year+'-'+Month+'-'+Date;
				$(ele).val(str);
			}else{
				$(ele).val('');
				alert('请输入正确的时间格式(2000-01-01或20000101)');
			}
		}else if(value.length == 10){
			var regexp2 = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
			if(regexp2.test(value)){//value.replace(regexp)
				//console.log(regexp.test(value));
			}else{
				$(ele).val('');
				alert('请输入正确的时间格式(2000-01-01或20000101)');
			}
		}else{
			$(ele).val('');
			alert('请输入正确的时间格式(2000-01-01或20000101)');
		}
	}
}