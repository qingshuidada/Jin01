var copyToProcess = {};

/**
 * 查看流程的信息
 */
copyToProcess.lookProcess = function(processRecordId,formUrl){
	$('#copyToProcess .processList').css('display', 'none');
	$('#copyToProcess .processStart').css('display', 'block');
	process_plugin.loadingForm({
		dom:$('#copyToProcess .include-form'),
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
		dom:$('#copyToProcess .processStart .processMessage .box'),
		readonly:true,
		getUrl:'../../relatedProcess/getProcessExecutor.do',
		
	});
	process_plugin.createExamineIdea({
		dom:$('#copyToProcess .processStart .taskMessage'),
		processRecordId:processRecordId,
		isExamine:false,
	});
};



$(function(){
	$('#copyToProcess .processdg').parent().css('height',$('#loadarea').height()-64+'px');
	$('#copyToProcess .processStart').css('height',$('#loadarea').height()-62+"px");
	
	$('#copyToProcess .processdg').datagrid({
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#copyToProcess .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
				{field:"canCallBack",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
					var opera = '<span class="small-button look" title="查看流程" onclick="copyToProcess.lookProcess(\''
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
	
	$('#copyToProcess .invitetop .select').click(function(){
		$('#copyToProcess .processdg').datagrid({
			 url:'../../myProcess/getCopyToProcessList.do?getMs='+getMS(),
			 queryParams: {
				 createUserName: function(){
						return $('#copyToProcess .invitetop input[name=createUserName]').val();
				 },
				 createTimeStart: function(){
						return $('#copyToProcess .invitetop input[name=createTimeStart]').val();
				 },
				 createTimeEnd: function(){
						return $('#copyToProcess .invitetop input[name=createTimeEnd]').val();
				 },
				 processType: function(){
						return $('#copyToProcess .invitetop select[name=processType]').val();
				 },
			 }
		 });
	 });
	
	process_plugin.createTypeSelected($('#copyToProcess .invitetop select[name=processType]'));
	
	$('#copyToProcess .processStart .backUp').click(function(){
		$('#copyToProcess .processList').css('display', 'block');
		$('#copyToProcess .processStart').css('display', 'none');
	})
})

