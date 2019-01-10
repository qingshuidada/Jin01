$(function(){
	/*************下级日志列表*************/
	$('#subLogManagedg').datagrid({
		 url:'../../log/querySubLog.do?getMs='+getMS(),
		 rownumbers:"true",
	     singleSelect:true,
	     pagination:true,
	     toolbar:"#subLogManage .invitetop",
	     method:"post",
	     fit: true, 
	     columns:[[
	        {field:"logTimeStr",title:"日期",fitColumns:true,sortable:true,align:"center",sortable:true,width:100},     
	        {field:"userName",title:"下级姓名",fitColumns:true,sortable:true,align:"center",sortable:true,width:100},     
	        {field:"titleName",title:"标题",fitColumns:true,sortable:true,align:"center",sortable:true,width:100},     
	        {field:"_op",title:"管理",fitColumns:true,sortable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
	        	var id = "'"+row.workOfficeLogId+"'";
	        	var opera = '';
	        	opera +='<span class="small-button look" onclick="lookLogDetail('+id+')" title="查看详情"></span>';
	        	return opera;
	        }}
	     ]]
	})
	/*******查询*******/
	$('#subLogManage .invitetop .selectUserInfo').click(function(){
		var startTimeStr = $('#subLogManage .invitetop input[name=startTimeStr]').val();
		var endTimeStr = $('#subLogManage .invitetop input[name=endTimeStr]').val();
		var userName = $('#subLogManage .invitetop input[name=userName]').val();
		$('#subLogManagedg').datagrid({
			url:'../../log/querySubLog.do?getMs='+getMS(),
			queryParams:{startTimeStr:startTimeStr,endTimeStr:endTimeStr,userName:userName}
		})
	});
})
//查看详情信息
function lookLogDetail(id){
	$.ajax({
		data:{workOfficeLogId:id,yourSelfFlag:'0'},
		url:'../../log/queryYourselfLog.do?getMs='+getMS(),
		success:function(data){
			var content = $.parseJSON(data);
			$('#subLogManage .initiateSubLogManageLook .popuparea input[name=userName]').val(content.rows[0].userName);
			$('#subLogManage .initiateSubLogManageLook .popuparea input[name=titleName]').val(content.rows[0].titleName);
			$('#subLogManage .initiateSubLogManageLook .popuparea input[name=logTimeStr]').val(content.rows[0].logTimeStr);
			$('#subLogManage .initiateSubLogManageLook .popuparea textarea[name=text]').val(content.rows[0].text);
			$('#subLogManage .initiateSubLogManageLook').css('display','block');
		}
	})
}