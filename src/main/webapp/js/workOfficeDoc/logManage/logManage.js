$(function(){
	
	/*************日志列表*************/
	$('#logManagedg').datagrid({
		 url:'../../log/queryYourselfLog.do?getMs='+getMS(),
		 rownumbers:"true",
		 queryParams:{yourSelfFlag:'1'},
	     singleSelect:true,
	     pagination:true,
	     toolbar:"#logManage .invitetop",
	     method:"post",
	     fit: true, 
	     columns:[[
	        {field:"logTimeStr",title:"日期",fitColumns:true,sortable:true,align:"center",sortable:true,width:100},     
	        {field:"titleName",title:"标题",fitColumns:true,sortable:true,align:"center",sortable:true,width:100},     
	        {field:"_op",title:"管理",fitColumns:true,sortable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
	        	var id = "'"+row.workOfficeLogId+"'";
	        	var opera = '';
	        	opera +='<span class="small-button edit" onclick="updateYourselfLog('+id+')" title="修改日志"></span>';
	        	opera +='<span class="small-button delete" onclick="deleteYourselfLog('+id+')" title="删除日志"></span>';
	        	opera +='<span class="small-button look" onclick="lookYourselfLog('+id+')" title="查看日志"></span>';
	        	return opera;
	        }}
	     ]]
	})
	/*******查询*******/
	$('#logManage .invitetop .selectUserInfo').click(function(){
		var startTimeStr = $('#logManage .invitetop input[name=startTimeStr]').val();
		var endTimeStr = $('#logManage .invitetop input[name=endTimeStr]').val();
		$('#logManagedg').datagrid({
			url:'../../log/queryYourselfLog.do?getMs='+getMS(),
			queryParams:{startTimeStr:startTimeStr,endTimeStr:endTimeStr,yourSelfFlag:'1'}
		})
	});
	/*******新增*******/
	$('#logManage .maintop .add').click(function(){
		$('#logManage .initiateLogManageAdd').css('display','block');
	});
	/********添加确定*********/
	$('#logManage .initiateLogManageAdd .btnarea .confirm').click(function(){
		var titleName =  $.trim($('#logManage .initiateLogManageAdd .popuparea input[name=titleName]').val());
		var logTimeStr =  $.trim($('#logManage .initiateLogManageAdd .popuparea input[name=logTimeStr]').val());
		var text =  $.trim($('#logManage .initiateLogManageAdd .popuparea textarea[name=text]').val());
		if(titleName == null || titleName == ''){
			windowControl("标题不能为空");
			return;
		}else if(logTimeStr == null || logTimeStr == ''){
			windowControl("日志时间不能为空");
			return;
		}else if(text == null || text == ''){
			windowControl("内容不能为空");
			return;
		}
		var dataInfo = {
				titleName:titleName,
				logTimeStr:logTimeStr,
				text:text
		}
		$.ajax({
			data:dataInfo,
			url:'../../log/addLog.do',
			success:function(data){
				if(data == 200){
					$('#logManage .initiateLogManageAdd').css('display','none');
					$('#logManagedg').datagrid('reload');
					windowControl("添加成功");
				}else if(data == 400){
					windowControl("数据异常");
				}else{
					windowControl("服务器异常");
				}
			}
			
		})
	});
	/********修改确定*********/
	$('#logManage .initiateLogManageUpdate .btnarea .confirm').click(function(){
		var titleName =  $.trim($('#logManage .initiateLogManageUpdate .popuparea input[name=titleName]').val());
		var logTimeStr =  $.trim($('#logManage .initiateLogManageUpdate .popuparea input[name=logTimeStr]').val());
		var text =  $.trim($('#logManage .initiateLogManageUpdate .popuparea textarea[name=text]').val());
		var workOfficeLogId = $('#logManage .initiateLogManageUpdate .popuparea input[name=titleName]').attr('workOfficeLogId');
		if(titleName == null || titleName == ''){
			windowControl("标题不能为空");
			return;
		}else if(logTimeStr == null || logTimeStr == ''){
			windowControl("日志时间不能为空");
			return;
		}else if(text == null || text == ''){
			windowControl("内容不能为空");
			return;
		}
		var dataInfo = {
				titleName:titleName,
				logTimeStr:logTimeStr,
				text:text,
				workOfficeLogId:workOfficeLogId
		}
		$.ajax({
			data:dataInfo,
			url:'../../log/updateYourselfLog.do',
			success:function(data){
				if(data == 200){
					$('#logManage .initiateLogManageUpdate').css('display','none');
					$('#logManagedg').datagrid('reload');
					windowControl("修改成功");
				}else if(data == 400){
					windowControl("数据异常");
				}else{
					windowControl("服务器异常");
				}
			}
			
		})
	});
})
//修改日志
function updateYourselfLog(id){
	$.ajax({
		data:{workOfficeLogId:id},
		url:'../../log/queryYourselfLog.do?getMs='+getMS(),
		success:function(data){
			var content = $.parseJSON(data);
			$('#logManage .initiateLogManageUpdate .popuparea input[name=titleName]').val(content.rows[0].titleName).attr('workOfficeLogId',id);
			$('#logManage .initiateLogManageUpdate .popuparea input[name=logTimeStr]').val(content.rows[0].logTimeStr);
			$('#logManage .initiateLogManageUpdate .popuparea textarea[name=text]').val(content.rows[0].text);
			$('#logManage .initiateLogManageUpdate').css('display','block');
		}
	})
}
//删除日志
function deleteYourselfLog(id){
	ui.confirm('确认删除改日志吗?',function(z){
		if(z){
			$.ajax({
				data:{workOfficeLogId:id,aliveFlag:'0'},
				url:'../../log/updateYourselfLog.do?getMs='+getMS(),
				success:function(data){
					if(data == 200){
						windowControl("删除成功");
						$('#logManagedg').datagrid('reload');
					}else if(data == 400){
						windowControl("数据异常");
					}else{
						windowControl("服务器异常");
					}
				}
			});
		}
	},false);
}
//查看日志详情
function lookYourselfLog(id){
	$.ajax({
		data:{workOfficeLogId:id},
		url:'../../log/queryYourselfLog.do?getMs='+getMS(),
		success:function(data){
			var content = $.parseJSON(data);
			$('#logManage .initiateLogManageLook .popuparea input[name=titleName]').val(content.rows[0].titleName);
			$('#logManage .initiateLogManageLook .popuparea input[name=logTimeStr]').val(content.rows[0].logTimeStr);
			$('#logManage .initiateLogManageLook .popuparea textarea[name=text]').val(content.rows[0].text);
			$('#logManage .initiateLogManageLook').css('display','block');
		}
	})
}
	