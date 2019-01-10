var waitExamineProcess = {};

/**
 * 查看流程的信息
 */
waitExamineProcess.lookProcess = function(processRecordId,formUrl){
	$('#waitExamineProcess .processList').css('display', 'none');
	$('#waitExamineProcess .processStart').css('display', 'block');
	process_plugin.loadingForm({
		dom:$('#waitExamineProcess .include-form'),
		formUrl:formUrl,
		data:{
			processRecordId:processRecordId
		},
		readonly:true,
		loadingData:true
	});
	process_plugin.loadingProcess({
		data:{
			processRecordId:processRecordId
		},
		dom:$('#waitExamineProcess .processStart .processMessage .box'),
		readonly:true,
		getUrl:'../../relatedProcess/getProcessExecutor.do'
	});
	process_plugin.createExamineIdea({
		dom:$('#waitExamineProcess .processStart .taskMessage'),
		processRecordId:processRecordId,
		isExamine:true,
	});
};



$(function(){
	$('#waitExamineProcess .processdg').parent().css('height',$('#loadarea').height()-64+'px');
	$('#waitExamineProcess .processStart').css('height',$('#loadarea').height()-62+"px");
	
	$('#waitExamineProcess .processdg').datagrid({
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#waitExamineProcess .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
				{field:"canCallBack",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
					var opera = '<span class="small-button look" title="查看流程" onclick="waitExamineProcess.lookProcess(\''
						+row.processRecordId+'\',\''+row.formUrl+'\')"/></span>';
				    return opera;
				}},
		       {field:"title",title:"标题",resizable:true,align:"center",sortable:true,width:150},
		       {field:"userName",title:"发起人姓名",resizable:true,align:"center",sortable:true,width:120},
		       {field:"processTypeName",title:"流程类型",resizable:true,align:"center",sortable:true,width:80},
		       {field:"createTime",title:"创建时间",resizable:true,align:"center",sortable:true,width:150},
		       {field:"updateTime",title:"修改时间",resizable:true,align:"center",sortable:true,width:150},
		  ]],
	});
	
	$('#waitExamineProcess .invitetop .select').click(function(){
		$('#waitExamineProcess .processdg').datagrid({
			 url:'../../myProcess/getWaitExamineProcess.do?getMs='+getMS(),
			 queryParams: {
				 createUserName: function(){
						return $('#waitExamineProcess .invitetop input[name=createUserName]').val();
				 },
				 createTimeStart: function(){
						return $('#waitExamineProcess .invitetop input[name=createTimeStart]').val();
				 },
				 createTimeEnd: function(){
						return $('#waitExamineProcess .invitetop input[name=createTimeEnd]').val();
				 },
				 processType: function(){
						return $('#waitExamineProcess .invitetop select[name=processType]').val();
				 },
			 }
		 });
	});
	
	process_plugin.createTypeSelected($('#waitExamineProcess .invitetop select[name=processType]'));
	
	$('#waitExamineProcess .processStart .backUp').click(function(){
		$('#waitExamineProcess .processList').css('display', 'block');
		$('#waitExamineProcess .processStart').css('display', 'none');
	})
	
	$('#waitExamineProcess .processStart .submit').click(function(){
		var idea = $('#waitExamineProcess .processStart .taskMessage textarea[name=idea]').val();
		var taskId = $('#waitExamineProcess .processStart .taskMessage textarea[name=idea]').attr('taskId');
		var examineStatus = '';
		if($(this).val() == '通过'){
			examineStatus = '2';
		}else{
			examineStatus = '3';
		}
		$.ajax({
			data:{
				executorIdea:idea,
				examineStatus:examineStatus,
				taskId:taskId
			},
			url:'../../myProcess/examineTask.do?getMs='+getMS(),
			type:'post',
			success:function(data){
				if(data == '200'){
					$('#waitExamineProcess .processList').css('display', 'block');
					$('#waitExamineProcess .processStart').css('display', 'none');
					$('#waitExamineProcess .processdg').datagrid('reload');
					if(examineStatus == '3'){
						alert('流程驳回成功！');
					}else{
						alert('流程通过成功！');
					}
				}else{
					alert('审批失败');
				}
			},
			error:function(){
				alert('服务器未响应');
			}
		})
	});
	//个人桌面前往流程
	if(desktopToExamine){
		var id = (desktopToExamine).split(',')[0]
		var url = (desktopToExamine).split(',')[1];
		waitExamineProcess.lookProcess(id,url);
	}
})

