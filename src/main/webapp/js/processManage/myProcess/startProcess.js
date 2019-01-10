var startProcess = {};

/**
 * 创建流程信息列表
 */
startProcess.createProcesses = function(data){
	var desktopArea = $('#startProcess .desktopArea');
	var i = 0;
	for(var idx in data){
		if(data[idx].typeId != '007'){
			var desktopMoudleBox = $('<div>');
			desktopMoudleBox.attr('typeId', data[idx].typeId);
			desktopMoudleBox.attr('formUrl', data[idx].formUrl);
			desktopMoudleBox.attr('class','desktopMoudleBox');
			var desktopTop = $('<div>');
			desktopTop.attr('class','desktopTop');
			desktopTop.text(data[idx].name);
			desktopMoudleBox.append(desktopTop);
			var desktopBarArea = $('<span>');
			var start = '<span class="barblock start" onclick="startProcess.start(\''+
				data[idx].typeId+'\',\''+data[idx].formUrl+'\',\''+data[idx].hasUsers+'\',\''+data[idx].hasFile+'\')">发起</span>';
			var close = '<span class="barblock open" onclick="startProcess.foldDesktop(this)">展开</span>';
			desktopBarArea.attr('class','desktopBarArea');
			desktopBarArea.append(start);
			desktopBarArea.append(close);
			desktopMoudleBox.append(desktopBarArea);
			if(i%2 == 0){
				desktopArea.find('.leftDesktop').append(desktopMoudleBox);
			}else{
				desktopArea.find('.rightDesktop').append(desktopMoudleBox);
			}
			i++;
		}		
	}
}

/**
 * 切换到启动流程页面
 */
startProcess.start = function(typeId,formUrl,hasUsers, hasFile){
	$('#startProcess .processList').css('display', 'none');
	$('#startProcess .processStart').css('display', 'block');
	process_plugin.loadingForm({
		dom:$('#startProcess .include-form'),
		formUrl:formUrl,
		typeId:typeId,
		readonly:false,
		loadingData:false,
		hasUsers:hasUsers,
		hasFile:hasFile
	});
	process_plugin.loadingProcess({
		getUrl:'../../myProcess/getProcessMessage.do',
		data:{
			typeId:typeId,
		},
		readonly:false,
		dom:$('#startProcess .processStart .processMessage .box')
	});
	if(typeId == '005'){
		process_function.presentContract('.process-form table td select[name=executorContract]');
	}
	if(typeId == '003'){
		$.ajax({
			url:'../../userInfo/selectUserInfo.do?getMs='+getMS(),
			data:{
				userAccount:$('body').attr('useraccount')
			},
			type:'post',
			dataType:'json',
			success:function(data){
				if(data.rows.length == 1){
					var obj = data.rows[0];
					$('.process-form table td input[name=idCard]').val(obj.idCard);
				}else{
					windowControl('身份证没有获取到！');
				}
			},
			error:function(error){
				windowControl(error.status);
			}
		});
	}
}

/**
 * 对流程进行展开或者关闭
 */
startProcess.foldDesktop = function(ele){
	var dom = $(ele).parents('.desktopMoudleBox').find('.processMessage');
	var dom2 = $(ele).parents('.desktopMoudleBox').find('.desktopBottom');
	if($(ele).attr('class')=='barblock close'){
		dom.animate({
			'height':"0px"
		},200,function(){
			$(ele).removeClass('close').addClass('open');
			$(ele).text("展开");
		});
		dom2.animate({
			'height':"0px",
		},200);
	}else if($(ele).attr('class')=='barblock open'){
		if(dom.length < 1){
			startProcess.createProcess($(ele).parents('.desktopMoudleBox'));
			dom = $(ele).parents('.desktopMoudleBox').find('.processMessage');
			dom2 = $(ele).parents('.desktopMoudleBox').find('.desktopBottom');
		}
		$(ele).removeClass('open').addClass('close');
		$(ele).text("收起");
		dom.animate({
			'height':dom.find('.box').height()+10,
		},200);
		dom2.animate({
			'height':"30px",
		},200);
	}
}

/**
 * 创建流程信息
 */
startProcess.createProcess = function(dom){
	var processMessage = $('<div>');
	processMessage.attr('class','processMessage');
	var box = $('<div>');
	box.attr('class','box');
	box.text('加载中，请稍候...');
	processMessage.append(box);
	var desktopBottom = $('div');
	dom.append(processMessage);
	var desktopBottom = $('<div>');
	desktopBottom.attr('class','desktopBottom');
	dom.append(desktopBottom);
	processMessage.html();
	process_plugin.loadingProcess({
		getUrl:'../../myProcess/getProcessMessage.do',
		data:{
			typeId:dom.attr('typeId'),
		},
		readonly:false,
		dom:dom.find('.processMessage').find('.box')
	});
}

$(function(){
	$('#startProcess').css('height',$('#loadarea').height()-31+"px");
	$('#startProcess .desktopArea').css('height',$('#loadarea').height()-62+"px");
	$('#startProcess .processStart').css('height',$('#loadarea').height()-32+"px");
	/**
	 * 创建流程类别
	 */
	$.ajax({
		url:'../../myProcess/getProcesses.do',
		type:'post',
		dataType:'json',
		success:function(data){
			startProcess.createProcesses(data);
		},
		error:function(){
			alert('服务器未响应');
		}
	});
	
	
	/**
	 * 发起按钮点击事件
	 */
	$('#startProcess .processStart .submitProcess').click(function(){
		process_plugin.submitForm({
			dom:$('#startProcess .processStart .include-form'),
			success:function(data){
				if(data == '200'){
					$('#startProcess .processList').css('display', 'block');
					$('#startProcess .processStart').css('display', 'none');
					alert('发起流程成功');
				}else{
					alert('发起流程失败');
				}
			},
			error:function(){
				alert('服务器未响应');
			}
		})
	});
	
	/**
	 * 返回按钮点击事件
	 */
	$('#startProcess .processStart .backUp').click(function(){
		$('#startProcess .processList').css('display', 'block');
		$('#startProcess .processStart').css('display', 'none');
	});
	/**/
});
