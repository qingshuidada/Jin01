//===================上报水质检测报告页面======================
$(function(){
	if(existPermission('admin:erp:statisticsInfo:waterReport:add'))
		$('#waterReport .maintop').append('<div style="margin-right:8px;"><input type="button" value="添加水质检测报告" class="button add" /></div>');
	$('#waterReportdg').datagrid({
		url:'../../waterReport/selectWaterReport.erp?getMs='+getMS(), 
		rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#waterReport .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
             {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
			    	var id = "'"+row.reportId+"'";
			    	var opera = '';
			    	if(existPermission('admin:erp:statisticsInfo:waterReport:update'))
			    		opera +='<span class="small-button edit" title="修改" onclick="updateWaterReport('+id+')"></span>'; 
			    	if(existPermission('admin:erp:statisticsInfo:waterReport:delete'))
			    		opera +='<span class="small-button delete" title="删除" onclick="deleteWaterReport('+id+')"></span>';
		    		return opera;
		       }},
		       {field:"reportDateStr",title:"上报日期日期",fitColumns:true,resizable:true,align:"center",sortable:true,width:120},
		       {field:"phValue",title:"PH值",fitColumns:true,resizable:true,align:"center",sortable:true,width:120},
		       {field:"hardness",title:"硬度(ppm)",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"alkalinity",title:"碱度(ppm)",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"chlorineRoot",title:"氯根(ppm)",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"reportName",title:"上报人",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"typeFlag",title:"类型",fitColumns:true,resizable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
		    	   if(row.typeFlag == '0')
		    		   return '自来水';
		    	   else if(row.typeFlag == '1')
		    		   return '染缸水';
		       }},
		       {field:"text",title:"备注",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		  ]]
	});
	$('#waterReport .invitetop .selectByTime').click(function(){
		var reportTimeStr = $('#waterReport .invitetop input[name=reportTimeStr]').val();
		var reportEndTimeStr = $('#waterReport .invitetop input[name=reportEndTimeStr]').val();
		var dataInfo = {
				reportDateStr:reportTimeStr,
				reportEndTimeStr:reportEndTimeStr,
			};
		$('#waterReportdg').datagrid({
			url:'../../waterReport/selectWaterReport.erp?getMs='+getMS(),
			queryParams:dataInfo
		});
	})
	$('#waterReport .maintop .add').click(function(){
		$('#waterReport .popups .saveWaterReport').css("display","block");
		getReportName();
	})
	
	//添加上报信息的确定事件
	$('#waterReport .popups .saveWaterReport .confirm').click(function(){
		var typeFlag = $('#waterReport .popups .saveWaterReport input[name=btn]:checked').val();
		var reportName = $('#waterReport .popups .saveWaterReport input[name=reportName]').val();
		var reportTime = $('#waterReport .popups .saveWaterReport input[name=reportTime]').val();
		var phValue = $('#waterReport .popups .saveWaterReport input[name=phValue]').val();
		var hardness = $('#waterReport .popups .saveWaterReport input[name=hardness]').val();
		var alkalinity = $('#waterReport .popups .saveWaterReport input[name=alkalinity]').val();
		var chlorineRoot = $('#waterReport .popups .saveWaterReport input[name=chlorineRoot]').val();
		var text = $('#waterReport .popups .saveWaterReport input[name=text]').val();
		$.ajax({
			url:'../../waterReport/insertWaterReport.erp?getMs='+getMS(),
			type:'post',
			data:{
				typeFlag:typeFlag,
				reportName:reportName,
				reportDateStr:reportTime,
				phValue:phValue,
				hardness:hardness,
				alkalinity:alkalinity,
				chlorineRoot:chlorineRoot,
				text:text
			},
			success:function(data){
				if(data == 500){
		    		windowControl('服务器异常！');
		    	}else if(data == 400){
		    		windowControl('数据异常！');
		    	}else{
		    		$('#waterReport .popups .saveWaterReport input[type=text]').val('');
		    		$('#waterReport .popups .saveWaterReport').css("display","none");
		    		$('#waterReportdg').datagrid();
		    		windowControl('添加上报信息成功！');				    		
		    	}	
			},
			error:function(error){
				windowControl(error.status);
			}
		});
	})
	//修改上报信息的确定事件
	$('#waterReport .popups .updateWaterReport .confirm').click(function(){
		var reportName = $('#waterReport .popups .updateWaterReport input[name=reportName]').val();
		var reportId = $('#waterReport .popups .updateWaterReport input[name=reportId]').val();
		var reportTime = $('#waterReport .popups .updateWaterReport input[name=reportTime]').val();
		var phValue = $('#waterReport .popups .updateWaterReport input[name=phValue]').val();
		var hardness = $('#waterReport .popups .updateWaterReport input[name=hardness]').val();
		var alkalinity = $('#waterReport .popups .updateWaterReport input[name=alkalinity]').val();
		var chlorineRoot = $('#waterReport .popups .updateWaterReport input[name=chlorineRoot]').val();
		var text = $('#waterReport .popups .updateWaterReport input[name=text]').val();
		$.ajax({
			url:'../../waterReport/updateWaterReport.erp?getMs='+getMS(),
			type:'post',
			data:{
				reportId:reportId,
				reportName:reportName,
				reportDateStr:reportTime,
				phValue:phValue,
				hardness:hardness,
				alkalinity:alkalinity,
				chlorineRoot:chlorineRoot,
				text:text
			},
			success:function(data){
				if(data == 500){
		    		windowControl('服务器异常！');
		    	}else if(data == 400){
		    		windowControl('数据异常！');
		    	}else{
		    		$('#waterReport .popups .updateWaterReport input[type=text]').val('');
		    		$('#waterReport .popups .updateWaterReport').css("display","none");
		    		$('#waterReportdg').datagrid();
		    		windowControl('修改上报信息成功！');				    		
		    	}	
			},
			error:function(error){
				windowControl(error.status);
			}
		});
	})
	
})

/*************************制单人********************************/
function getReportName(){
	$.ajax({
		url:'../../user/getUserInfo.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var str = '';
			var data = eval('(' + data + ')'); 
			$('#waterReport .popups .saveWaterReport input[name=reportName]').val(data.userName);
			$('#waterReport .popups .updateWaterReport input[name=reportName]').val(data.userName);
		},
		error:function(error){
			windowControl(error.status);
		}
	});
}
/**************************修改水质检测报告**************************/
function updateWaterReport(id){
	$('#waterReport .popups .updateWaterReport').css("display","block");
	getReportName();
	$('#waterReport .popups .updateWaterReport input[name=reportId]').val(id);
}
function deleteWaterReport(id){
	
	ui.confirm('确定要删除水质报告？',function(z){
		if(z){
			$.ajax({
				url:'../../waterReport/deleteWaterReport.erp?getMs='+getMS(),
				data:{reportId:id},
				type:'post',
				success:function(data){
					if(data == 200){
						$('#waterReportdg').datagrid('reload');
						windowControl("删除成功");
					}	
				},
				error:function(error){
					windowControl(error.status);
				}
			});		
		}
	},false);
}