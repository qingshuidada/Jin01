var myRelatedProcess = {};

myRelatedProcess.callBackProcess = function(processRecordId){
	$.ajax({
		url:'../../relatedProcess/callBackProcess.do',
		data:{
			processRecordId : processRecordId
		},
		type:'post',
		success:function(data){
			if(data == '200'){
				$('#myRelatedProcess .processdg').datagrid('reload');
			}else{
				alert('撤回流程失败');
			}
		},
		error:function(){
			alert("服务器未响应");
		}
	})
}

/**
 * 查看流程的信息
 */
myRelatedProcess.lookProcess = function(processRecordId,formUrl){
	$('#myRelatedProcess .processList').css('display', 'none');
	$('#myRelatedProcess .processStart').css('display', 'block');
	process_plugin.loadingForm({
		dom:$('#myRelatedProcess .include-form'),
		formUrl:formUrl,
		data:{
			processRecordId:processRecordId
		},
		loadingData:true,
		readonly:true
	});
	process_plugin.loadingProcess({
		data:{
			processRecordId:processRecordId
		},
		dom:$('#myRelatedProcess .processStart .processMessage .box'),
		readonly:true,
		getUrl:'../../relatedProcess/getProcessExecutor.do'
	});
	process_plugin.createExamineIdea({
		dom:$('#myRelatedProcess .processStart .taskMessage'),
		processRecordId:processRecordId,
		isExamine:false,
	});
};



$(function(){
	$('#myRelatedProcess .processdg').parent().css('height',$('#loadarea').height()-64+'px');
	$('#myRelatedProcess .processStart').css('height',$('#loadarea').height()-62+"px");
	
	$('#myRelatedProcess .processdg').datagrid({
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#myRelatedProcess .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
				{field:"canCallBack",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
					var opera = '<span class="small-button look" title="查看流程" onclick="myRelatedProcess.lookProcess(\''
						+row.processRecordId+'\',\''+row.formUrl+'\')"/></span>';
					if(row.canCallBack == 'true'){
						opera += '<span class="small-button recall" title="撤回" onclick="myRelatedProcess.callBackProcess(\''
							+row.processRecordId+'\')"/></span>';
					}
				    return opera;
				}},
		       {field:"title",title:"标题",resizable:true,align:"center",sortable:true,width:120},
		       {field:"userName",title:"发起人姓名",resizable:true,align:"center",sortable:true,width:120},
		       {field:"processTypeName",title:"流程类型",resizable:true,align:"center",sortable:true,width:120},
		       {field:"executeStatus",title:"审批状态",resizable:true,align:"center",sortable:true,width:80,formatter:function(value,row,index){
		    	   if(row.executeStatus == '1')
		    		   return "审批中";
 		    	   if(row.executeStatus == '2')
 		    		   return "通过";
		    	   if(row.executeStatus == '3')
		    		   return "驳回";
		    	   if(row.executeStatus == '4')
		    		   return "撤回";
		       }},
		       {field:"createTime",title:"创建时间",resizable:true,align:"center",sortable:true,width:150},
		       {field:"updateTime",title:"修改时间",resizable:true,align:"center",sortable:true,width:150},
		  ]],
	});
	
	$('#myRelatedProcess .invitetop .select').click(function(){
		$('#myRelatedProcess .processdg').datagrid({
			 url:'../../relatedProcess/getProcessList.do?getMs='+getMS(),
			 queryParams: {
				 createUserName: function(){
						return $('#myRelatedProcess .invitetop input[name=createUserName]').val();
				 },
				 createTimeStart: function(){
						return $('#myRelatedProcess .invitetop input[name=createTimeStart]').val();
				 },
				 createTimeEnd: function(){
						return $('#myRelatedProcess .invitetop input[name=createTimeEnd]').val();
				 },
				 processType: function(){
						return $('#myRelatedProcess .invitetop select[name=processType]').val();
				 },
				 relativeLeave: function(){
						return $('#myRelatedProcess .invitetop select[name=relativeLeave]').val();
				 },
			 }
		 });
	});
	
	process_plugin.createTypeSelected($('#myRelatedProcess .invitetop select[name=processType]'));
	
	$('#myRelatedProcess .processStart .backUp').click(function(){
		$('#myRelatedProcess .processList').css('display', 'block');
		$('#myRelatedProcess .processStart').css('display', 'none');
	})
})

