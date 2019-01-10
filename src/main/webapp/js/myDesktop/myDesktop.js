$(function(){
	/*单选框的变化*/
	/*$('#myDesktop .addDesktopWindow .popuparea input[type=checkbox]').change(function(){
		if($(this).attr('checked')){
			$(this).attr('disabled',true);
			$(this).parent().css('color','gray');
		}
	});*/
	//修改合同的编辑器
	UE.delEditor('contractEditorThree');
	//
	UE.getEditor('contractEditorThree', {
	    theme:"default", //皮肤
	    lang:'zh-cn',//语言
	    autoHeightEnabled:false,  //不长高
	    initialFrameWidth:1010,  //初始化编辑器宽度,默认1000
        initialFrameHeight:320, //初始化编辑器高度,默认320
        enableAutoSave: false,      //去掉保存
	});
	/************添加模块***********/
	$('#myDesktop .addDesktop').click(function(){
		$('#myDesktop .addDesktopWindow').css('display','block');
	});
	$('#myDesktop .addDesktopWindow .confirm').click(function(){
		var radio = $('#myDesktop .addDesktopWindow .popuparea input[type=checkbox][disabled!=disabled]');
		console.log(radio.length);
		for(var i=0;i<radio.length;i++){
			if(radio.eq(i).attr('checked')){
				radio.eq(i).attr('disabled',true);
				radio.eq(i).parent().css('color','gray');
			}
		}
		createDesktopModule();
	});
	/********************/
	$('#myDesktop .desktopMoudleBox .desktopMessageList').each(function(){
		$(this).find('td:nth-child(2n-1) span').css({
			'text-indent':'1em',
			'display':'inline-block',
			'vertical-align': 'middle',
			'width':'80%',
			'overflow':'hidden',
			'white-space': 'nowrap',
			'text-overflow': 'ellipsis',
		});
		$(this).find('td').eq(1).css('width','82px');
	});
	//dragDeskTop($('.desktopMoudleBox h3'));
	$('#myDesktop').css('height',(wy*0.991)-41+"px");
	$('#myDesktop .desktopArea').css('height',(wy*0.991)-72+"px");
	//返回按钮加载个人桌面
	$('#myDesktop .maintop .back').click(function(){
		loadPage('myDesktop','myDesktop','个人桌面');
	})
});
/**********关闭桌面模块***********/
function closeDesktop(ele){
	stopEvent();
	ui.confirm('确定要删除此模块吗?',function(z){
		if(z){
			$(ele).parents('.desktopMoudleBox').remove();
		}
		//console.log($('.ui_confirm').prop("outerHTML"));
	},false);
}
//桌面的展开收缩
function foldDesktop(ele){
	$(ele).parent().unbind('mousedown');
	var dom = $(ele).parents('.desktopMoudleBox').find('.desktopMessageArea');
	if($(ele).attr('class')=='barblock fold'){
		dom.animate({
			'height':"0px"
		},300,function(){
			$(ele).removeClass('fold').addClass('fold1');
		});
	}else{
		dom.animate({
			'height':dom.find('tr').length*30+26,
		},300,function(){
			$(ele).removeClass('fold1').addClass('fold');
		});
	}
}
//桌面的模块的拖拽
function dragDeskTop(ele,e){
	ele = $(ele);
	//补偿自身绝对位置
	//var compensateT = 0;ele.offset().top;
	//var compensateL = -6;ele.offset().left-6;
	//ele.mousedown(function(e){
		var parent = ele.parent();
		var parentW = parent.width();
		var parentH = parent.height();
		var domStr = parent.prop("outerHTML");
		var flag = true;
		var wx = $(window).width();   //获取可视区屏幕的宽度
		var wy = $(window).height();  //获取可视区屏幕的高度
		var interiorLeft=e.offsetX;
   		var interiorTop=e.offsetY;
   		var mdLeft = e.pageX;
   		var mdTop = e.pageY;
   		//$(document).unbind('mouseup');
		$(document).mousemove(function(e){
			e.preventDefault();
			var left = e.pageX;
        	var top = e.pageY;
			if(mdLeft != left && mdTop != top){
				if(flag){
					var str = createDesktop(parentW,parentH);
					parent.css({
						'display':'none',
					});
					parent.after(str);
					flag = false;
					parent.remove();
				}
	        	var Top = top - interiorTop;   //补偿
	        	var Left = left - interiorLeft-6;
	        	if (Left < 0) {
					Left = 0;
	        	};
	        	if (Left > wx - parent.width()) {
					Left = wx - parent.width();
	        	};
	        	if(Top < 0){
	        		Top = 0;
	        	}
	        	if(Top > wy - parent.height()-12){//12 popup padding
	        		Top = wy - parent.height()-12;
	        	}
	        	moveDesktop(top,left);
	        	$('.desktopMoveBox').css({
	        		left:Left+'px',
	        		top:Top+'px',
	        		width:parentW,
	        		height:parentH,
	        	});
	        	//$(document).unbind('mouseup');
	        	$(document).one('mouseup',function(e){
	    			$(document).unbind('mousemove');
	    			$('#myDesktop .desktopEmpty').hide();
	    			$('#myDesktop .desktopEmpty').after(domStr);
	    			parent.remove();
	    			$('#myDesktop .desktopEmpty').remove();
	    			$('.desktopMoveBox').css({
	            		left:'-1000px',
	            		top:'-1000px',
	            	});
	    			$(document).unbind('mouseup');
	    		});
			}
		});
	//});
}
//创建虚线框
function createDesktop(w,h){
	return '<div class="desktopMoudleBox desktopEmpty" style="width:100%;height:'+(h-2)+'px;"></div>';
}
//虚线框的移动
function moveDesktop(t,l){
	var leftMoudleBox = $('#myDesktop .desktopArea .leftDesktop .desktopMoudleBox');
	var leftDesktop = $('#myDesktop .desktopArea .leftDesktop');
	var lLeft = leftDesktop.offset().left;
	var lTop = leftDesktop.offset().top;
	var rightMoudleBox = $('#myDesktop .desktopArea .rightDesktop .desktopMoudleBox');
	var rightDesktop = $('#myDesktop .desktopArea .rightDesktop');
	var rLeft = rightDesktop.offset().left;
	var rTop = rightDesktop.offset().top;
	var str = $('.desktopEmpty').prop("outerHTML");
	if(l > lLeft && l < lLeft+leftDesktop.width()){
		if(t < lTop){
			$('.desktopEmpty').remove();
			leftDesktop.prepend(str);
		}else if(t > lTop+leftDesktop.height()){
			$('.desktopEmpty').remove();
			leftDesktop.append(str);
		}else{
			for(var i =0;i<leftMoudleBox.length;i++){
				if(t>leftMoudleBox.eq(i).offset().top+(leftMoudleBox.eq(i).height()/2)&&t<leftMoudleBox.eq(i).offset().top+leftMoudleBox.eq(i).height()){
					if(leftMoudleBox.eq(i).attr('class') == 'desktopMoudleBox'){
						$('.desktopEmpty').remove();
						leftMoudleBox.eq(i).after(str);	
					}
					
				}
			}
		}
	}else if(l > rLeft && l < rLeft+rightDesktop.width()){
		if(t < rTop){
			$('.desktopEmpty').remove();
			rightDesktop.prepend(str);
		}else if(t > rTop+rightDesktop.height()){
			$('.desktopEmpty').remove();
			rightDesktop.append(str);
		}else{
			for(var i =0;i<rightMoudleBox.length;i++){
				if(t>rightMoudleBox.eq(i).offset().top+(rightMoudleBox.eq(i).height()/2)&&t<rightMoudleBox.eq(i).offset().top+rightMoudleBox.eq(i).height()){
					if(rightMoudleBox.eq(i).attr('class') == 'desktopMoudleBox'){
						$('.desktopEmpty').remove();
						rightMoudleBox.eq(i).after(str);
					}
				}
			}
		}
	}
}
//创建公文
createDesktopModule({
	url:'../../document/queryDoc.do?getMs='+getMS(),
	data:'',
	moduleUrl:'"workOfficeDoc/documentManage","documentManage","公文处理"',
	moduleName:'公文',
	flag:true,
	special:'公文'
});
createDesktopModule({
	url:'../../myProcess/getWaitExamineProcess.do?getMs='+getMS(),
	data:'',
	moduleUrl:'"processManage/myProcess","waitExamineProcess","待我审批流程"',
	moduleName:'待我审批',
	flag:false,
	special:'审批'
});
createDesktopModule({
	url:'../../contract/contractRemind.do?getMs='+getMS(),
	data:'',
	moduleUrl:'"workOfficeDoc/contractManage","contractManage","合同管理"',
	moduleName:'即将到期合同',
	flag:false,
	special:'合同'
});
createDesktopModule({
	url:'../../mission/selectMyChargeMission.do?getMs='+getMS(),
	data:'',
	moduleUrl:'"workOfficeDoc/missionManage","myChargeMission","我负责的任务"',
	moduleName:'我执行的任务',
	flag:true,
	special:'任务'
});
createDesktopModule({
	url:'../../mission/selectUserToviewMission.do?getMs='+getMS(),
	data:'',
	moduleUrl:'"workOfficeDoc/missionManage","myToviewMission","我可查看的任务"',
	moduleName:'抄送我的任务',
	flag:true,
	special:'任务'
});
/*创造桌面模块*/
//url:'../../document/queryDoc.do?getMs='+getMS(),
function createDesktopModule(module){
	$.ajax({
		url:module.url,
		data:module.data,
		success:function(data){
			data = $.parseJSON(data).rows
			var str ='<div class="desktopMoudleBox"><h3 onmousedown="dragDeskTop(this,event)">'
			+module.moduleName+'</h3><span class="desktopBarArea"><span class="barblock closeDesktop" onclick="closeDesktop(this)"></span>'
			+'<span class="barblock refreshDesktop" onclick="foldDesktop(this)"></span>'
			+'<span class="barblock fold" onclick="foldDesktop(this)"></span></span>'
			+'<div class="desktopMessageArea"><table class="desktopMessageList">';
			var len = (data.length<5) ? data.length : 5;
			for(var i=0;i<len;i++){
				if(module.special == '公文'){
					str += '<tr><td><span>'+data[i].docName+'</span></td><td style="width: 82px;"><a href="../../document/downloadFile.do?fileUrl='+data[i].fileUrl+'">下载</a></td></tr>';
				}else if(module.special == '审批'){
					str += '<tr><td><span class="pointer" id="'+data[i].processRecordId+'"formUrl="'+data[i].formUrl+'" onclick=goToModule(this)>'+data[i].title+'</span></td><td style="width: 82px;">'+((data[i].createTime).split(' ')[0])+'</a></td></tr>';
				}else if(module.special == '合同'){
					str += '<tr><td style="width: 240px;"><span>'+data[i].contractName+'<span></td><td style="width: 240px;"><span>'+data[i].departmentName+'<span></td><td style="width: 240px;"><span>'+data[i].endTimeStr+'<span></td><td><span>'+data[i].orderExecutorName+'<span></td><td><span id="'+data[i].contractId+'" orderExecutorId="'+data[i].orderExecutorId+'" onclick=gotoContract(this)>查看<span></td></tr>';
				}else if(module.moduleName == '我负责的任务'){
					str += '<tr><td><span>任务名称：'+data[i].missionName+'</span></td><td><span>发起人：'+data[i].launchUserName+'</span></td><td><span>负责人：'+data[i].headUserName+'</span></td><td><span>创建时间：'+data[i].createTimeStr+'</span></td></tr>';
				}else if(module.moduleName == '我可查看的任务'){
					str += '<tr><td><span>任务名称：'+data[i].missionName+'</span></td><td><span>发起人：'+data[i].launchUserName+'</span></td><td><span>创建时间：'+data[i].createTimeStr+'</span></td></tr>';
				}
			}
			if(module.special == '合同'){
				str += 	'</table><div class="desktopMore"><span class="more" onclick=loadPage('+module.moduleUrl+')>进入合同页面</span></div></div></div>';
			}else if(module.special == '任务'){
				str += 	'</table><div class="desktopMore"><span class="more" onclick=loadPage('+module.moduleUrl+')>进入任务页面</span></div></div></div>';
			}else{
				str += 	'</table><div class="desktopMore"><span class="more" onclick=loadPage('+module.moduleUrl+')>更多...</span></div></div></div>';
			}
			if(module.flag){
				$('#myDesktop .desktopArea .leftDesktop').append(str);
			}else{
				$('#myDesktop .desktopArea .rightDesktop').append(str);
			}
		},
		error:function(err){
			
		}
	});
	
}

function goToModule(ele){
	var id = $(ele).attr('id');
	var formUrl = $(ele).attr('formUrl');
	desktopToExamine = id+','+formUrl;
	$(ele).parents('.desktopMoudleBox').find('.more').click();
}
function gotoContract(ele){
	var id = $(ele).attr('id');
	var orderExecutorId = $(ele).attr('orderExecutorId');
	//获取当前登陆人的id
	$.ajax({
		url:'../../user/getUserInfo.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			if(data == '500')
				return ;
			var data = eval('(' + data + ')');
			userInfo = data;
			if(userInfo.userId != orderExecutorId){
				windowControl('您不是此合同的跟单人，无法查看！');
			}else{
				$('#myDesktop .desktopArea').hide();
				$('#myDesktop .editContractWd').show();
				$('#myDesktop .maintop .back').show();
				$.ajax({
					url:'../../contract/selectContract.do?getMs='+getMS(),
					data:{
						contractId:id
					},
					type:'post',
					dataType:'json',
					success:function(data){
						var content = eval(data).rows[0];
						$('#myDesktop .editContractWd .contractName').val(content.contractName);
						$('#myDesktop .editContractWd .contractDescribe').val(content.contractDescribe);
						$('#myDesktop .editContractWd .secondName').val(content.secondName);
						$('#myDesktop .editContractWd .contractAmount').val(content.contractAmount);
						$('#myDesktop .editContractWd .unit').val(content.unit);
						$('#myDesktop .editContractWd .startTime').val(content.startTimeStr);
						$('#myDesktop .editContractWd .endTime').val(content.endTimeStr);
						$('#myDesktop .editContractWd .orderExecutorName').val(content.orderExecutorName);
						UE.getEditor('contractEditorThree').setContent(content.text);
					},
					error:function(error){
						windowControl(error.status);
					}
				});
			}
		},
		error:function(error){
			windowControl(error.status);
		}
	});

}