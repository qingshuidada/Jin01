//===================上报水质检测报告页面======================
$(function(){
	if(existPermission('admin:erp:statisticsInfo:rainWaterReport:add'))
		$('#rainWaterReport .maintop').append('<div style="margin-right:8px;"><input type="button" value="添加雨水检测报告" class="button add" /></div>');
	$('#rainWaterReportdg').datagrid({
		url:'../../rainWaterRepor/selectRainWaterReport.erp?getMs='+getMS(), 
		rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#rainWaterReport .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
             {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
			    	var id = "'"+row.rainId+"'";
			    	var opera = '';
			    	if(existPermission('admin:erp:statisticsInfo:rainWaterReport:update'))
			    		opera +='<span class="small-button edit" title="修改" onclick="updateRainWaterReport('+id+')"></span>'; 
			    	if(existPermission('admin:erp:statisticsInfo:rainWaterReport:delete'))
			    		opera +='<span class="small-button delete" title="删除" onclick="deleteRainWaterReport('+id+')"></span>';
		    		return opera;
		       }},
		       {field:"reportDateStr",title:"上报日期日期",fitColumns:true,resizable:true,align:"center",sortable:true,width:120},
		       {field:"phValue",title:"PH值",fitColumns:true,resizable:true,align:"center",sortable:true,width:120},
		       {field:"codValue",title:"COD值(mg/L)",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"samplingPoint",title:"取样点",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"reportName",title:"上报人",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"text",title:"备注",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		  ]]
	});
	$('#rainWaterReport .invitetop .selectByTime').click(function(){
		var reportTimeStr = $('#rainWaterReport .invitetop input[name=reportTimeStr]').val();
		var reportEndTimeStr = $('#rainWaterReport .invitetop input[name=reportEndTimeStr]').val();
		var dataInfo = {
				reportDateStr:reportTimeStr,
				reportEndTimeStr:reportEndTimeStr,
			};
		$('#rainWaterReportdg').datagrid({
			url:'../../rainWaterReport/selectRainWaterReport.erp?getMs='+getMS(),
			queryParams:dataInfo
		});
	})
	$('#rainWaterReport .maintop .add').click(function(){
		$('#rainWaterReport .popups .saveRainWaterReport').css("display","block");
		getReportName();
	})
	
	//添加上报信息的确定事件
	$('#rainWaterReport .popups .saveRainWaterReport .confirm').click(function(){
		var reportName = $('#rainWaterReport .popups .saveRainWaterReport input[name=reportName]').val();
		var reportTime = $('#rainWaterReport .popups .saveRainWaterReport input[name=reportTime]').val();
		var phValue = $('#rainWaterReport .popups .saveRainWaterReport input[name=phValue]').val();
		var codValue = $('#rainWaterReport .popups .saveRainWaterReport input[name=codValue]').val();
		var samplingPoint = $('#rainWaterReport .popups .saveRainWaterReport input[name=samplingPoint]').val();
		var text = $('#rainWaterReport .popups .saveRainWaterReport input[name=text]').val();
		$.ajax({
			url:'../../rainWaterReport/insertRainWaterReport.erp?getMs='+getMS(),
			type:'post',
			data:{
				reportName:reportName,
				reportDateStr:reportTime,
				phValue:phValue,
				codValue:codValue,
				samplingPoint:samplingPoint,
				text:text
			},
			success:function(data){
				if(data == 500){
		    		windowControl('服务器异常！');
		    	}else if(data == 400){
		    		windowControl('数据异常！');
		    	}else{
		    		$('#rainWaterReport .popups .saveRainWaterReport input[type=text]').val('');
		    		$('#rainWaterReport .popups .saveRainWaterReport').css("display","none");
		    		$('#rainWaterReportdg').datagrid();
		    		windowControl('添加上报信息成功！');				    		
		    	}	
			},
			error:function(error){
				windowControl(error.status);
			}
		});
	})
	//修改上报信息的确定事件
	$('#rainWaterReport .popups .updateRainWaterReport .confirm').click(function(){
		var reportName = $('#rainWaterReport .popups .updateRainWaterReport input[name=reportName]').val();
		var rainId = $('#rainWaterReport .popups .updateRainWaterReport input[name=rainId]').val();
		var reportTime = $('#rainWaterReport .popups .updateRainWaterReport input[name=reportTime]').val();
		var phValue = $('#rainWaterReport .popups .updateRainWaterReport input[name=phValue]').val();
		var codValue = $('#rainWaterReport .popups .updateRainWaterReport input[name=codValue]').val();
		var samplingPoint = $('#rainWaterReport .popups .updateRainWaterReport input[name=samplingPoint]').val();
		var text = $('#rainWaterReport .popups .updateRainWaterReport input[name=text]').val();
		$.ajax({
			url:'../../rainWaterReport/updateRainWaterReport.erp?getMs='+getMS(),
			type:'post',
			data:{
				rainId:rainId,
				reportName:reportName,
				reportDateStr:reportTime,
				phValue:phValue,
				codValue:codValue,
				samplingPoint:samplingPoint,
				text:text
			},
			success:function(data){
				if(data == 500){
		    		windowControl('服务器异常！');
		    	}else if(data == 400){
		    		windowControl('数据异常！');
		    	}else{
		    		$('#rainWaterReport .popups .updateRainWaterReport input[type=text]').val('');
		    		$('#rainWaterReport .popups .updateRainWaterReport').css("display","none");
		    		$('#rainWaterReportdg').datagrid();
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
			$('#rainWaterReport .popups .saveRainWaterReport input[name=reportName]').val(data.userName);
			$('#rainWaterReport .popups .updateRainWaterReport input[name=reportName]').val(data.userName);
		},
		error:function(error){
			windowControl(error.status);
		}
	});
}
/**************************修改水质检测报告**************************/
function updateRainWaterReport(id){
	$('#rainWaterReport .popups .updateRainWaterReport').css("display","block");
	getReportName();
	$('#rainWaterReport .popups .updateRainWaterReport input[name=rainId]').val(id);
}
function deleteRainWaterReport(id){
	
	ui.confirm('确定要删除水质报告？',function(z){
		if(z){
			$.ajax({
				url:'../../rainWaterReport/deleteRainWaterReport.erp?getMs='+getMS(),
				data:{rainId:id},
				type:'post',
				success:function(data){
					if(data == 200){
						$('#rainWaterReportdg').datagrid('reload');
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