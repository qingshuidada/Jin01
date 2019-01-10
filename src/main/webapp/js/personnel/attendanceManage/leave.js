var leaveExcel = [];
$(function(){
	/*if(existPermission('admin:personnel:attendanceManage:leave:add'))
		$('#leave .maintop').append('<div><span class="maintopicon mainicon2"></span> <span class="add">添加</span></div>');*/
	
	$('#leave .flow').css('height',$('#loadarea').height()-$('.tabs-header').height()-34+'px');
	$('#leavedg').datagrid({
		 //  url:'../../leave/findApplyByCondition.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#leave .invitetop",
		   method:"post",
		   fit: true,  
		   columns:[[
		       {field:"userName",title:"姓名",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"leaveType",title:"请假类型",fitColumns:true,resizable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
		    	   return getValueFromKey('leave_type',value);
		       }},
		       {field:"reason",title:"请假缘由",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		       {field:"startTimeStr",title:"开始时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"endTimeStr",title:"结束时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"lastHours",title:"时长(小时)",fitColumns:true,resizable:true,align:"center",sortable:true,width:130}
		      /*{field:"_op",title:"管理",width:100,resizable:true,align:"center",width:100,sortable:true,formatter:function(value,row,index){
		    	   var id="'"+row.leaveApplyId+"'";
		    	   return'<span class="small-button lookflow" onclick="leaveUpdata('+id+')" ></span>';
		       }},*/
		  ]]
	});
	
	/*****************设置上下移span的title****************/
	$("#leave .popups .writetoexcel .upset").attr("title","上移");
	$("#leave .popups .writetoexcel .downset").attr("title","下移");
	
	/*****************导出到Excel点击弹窗******************/
	$("#leave .maintop .write").click(function(){
		$('#leave .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#leave .popups .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'userName',tableHeader:'姓名',date:false},
			         {propertyName:'leaveType',tableHeader:'请假类型',date:false},
			         {propertyName:'reason',tableHeader:'请假缘由',date:false},
			         {propertyName:'startTimeStr',tableHeader:'开始时间',date:true},
			         {propertyName:'endTimeStr',tableHeader:'结束时间',date:true},
			         {propertyName:'lastHours',propertyType:'Double',tableHeader:'时长（小时）',date:false}
				 ]
		})
	})
	
	/*******************重置按钮点击事件***********************/
	$("#leave .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#leave maintop .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#leave .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#leave .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#leave .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#leave .popups .writetoexcel"));
		
		var leaveExcel2 = [];
		for(var i = 0 ; i < leaveExcel.length ; i++){
			leaveExcel2.push(leaveExcel[i]);
		}
		leaveExcel2.push({
			name:'jsonString',value:jsonString
		})
		//提交导出excel所需要的参数
		excelplugin.submit({
			type:'post',
			array:leaveExcel2,
			action:'../../leaveRecord/writeLeaveRecordToExcel.do?'
		})
	});
	
	//添加请假申请点击事件
	$('#leave .maintop .add').click(function(){
		$('#leave .popups .savegoout').css('display','block');
		getDocumentMaker();
	});
	//查询
	$('#leave .invitetop .query').click(function(){
		var userName = $('#leave .invitetop .userName').val();
		var leaveType = $('#leave .invitetop select[name=leaveType]').val();
		var inviteQueryInfo = {
				userName : userName,
				leaveType : leaveType
		}
		$('#leavedg').datagrid({
			url:'../../leaveRecord/selectLeaveRecord.do?getMs='+getMS(),
			queryParams:inviteQueryInfo
		})
		goodsmonthFormExcel = [
				       		    {name:'userName',value:userName},
				         		{name:'leaveType',value:leaveType}
			         ];
	});
	//选择审批人员
	$('#leave .popups .savegoout .chooseUser').click(function(){
		chooseUser();
		$('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#leave .popups .savegoout input[name=examineUserName]').val(selectUser[0].userName);
	    	$('#leave .popups .savegoout input[name=examineUserId]').val(selectUser[0].userId);
	    })	
	})
	//保存员工请假申请
	$('#leave .popups .savegoout .confirm').click(function(){
		var dom = $(this).parent().parent();
		var userId = $.trim(dom.find('input[name=leaveUserId]').val());
		var userName = $.trim(dom.find('input[name=leaveUserName]').val());
		var leaveType = $.trim(dom.find('select[name=leaveType]').val());
		var reason = $.trim(dom.find('input[name=leaveReason]').val());
		var starttime = $.trim(dom.find('input[name=leaveStartTime]').val());
		var overtime = $.trim(dom.find('input[name=leaveOverTime]').val());
		var examineUserName = $.trim(dom.find('input[name=examineUserName]').val());
		var examineUserId = $.trim(dom.find('input[name=examineUserId]').val());
		if(reason == null || reason == ''){
			windowControl("理由不能为空");
		}else if(starttime == null || starttime == ''){
			windowControl("起始时间不能为空");
		}else if(overtime == null || overtime == ''){
			windowControl("结束时间不能为空");
		}else if(examineUserId == null || examineUserId == ''){
			windowControl("审核人id不能为空");
		}else if(examineUserName == null || examineUserName == ''){
			windowControl("审核人姓名不能为空");
		}else{
			$.ajax({
				data:{
					reason:reason,
					userId:userId,
					leaveType:leaveType,
					userName:userName,
					startTimeStr:starttime,
					overTimeStr:overtime,
					examineUserId:examineUserId,
					examineUserName:examineUserName
				},
				url:"../../leave/applyForLeave.do?getMs="+getMS(),
				success:function(data){
					if(data != 200){
						windowControl('添加员工请假记录失败');
						return ;
					}else{
						$('#leave .popups .savegoout .confirm').removeAttr('clicked');
						$('#leave .popups').css('display', 'none');
						$('#leave .popups input').val(null);
						$('#leave .popups textarea').val(null);
						$('#leavedg').datagrid('reload');
						windowControl('添加员工请假记录成功');
					}
				},
				fail:function(){
					windowControl(err.status);
				}
			})
		}
	});
});
/*添加请假类型*/
$('#leave .staffRecord select[name=leaveType]').html(getDataBySelectKey("leave_type"));
$('#leave .invitetop select[name=leaveType]').html(getDataBySelectKeyNo("leave_type"));
/**/
function leaveUpdata(id){
	$('#leave .list').css('display','none');
	$('#leave .flow').css('display','block');
	$.ajax({
		data:{leaveApplyId:id},
		url:'../../leave/findStreamByCondition.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			console.log(data);
			var obj = eval('(' + data + ')').rows;
			var html = '';
			for(var i = 0; i<obj.length ; i++){
				html = html + '<div class="process"><div class="processbox">'
				+ '<p><span class="jiachu expeop" style="margin-left: 2px;">&ensp;&nbsp;审批人：'+obj[i].examineUserName+'</span>'
				+ '<span class="righttime">&ensp;&ensp;&ensp;&nbsp;审批时间：'+obj[i].examineTimeStr+'</span></p>'
				+ '<p><span class="expeop">审批类型：';
				if(obj[i].streamType == '1'){
					html = html + "审批";
				}else if(obj[i].streamType == '2'){
					html = html + "备案";
				}
				html = html +'</span><span class="righttime">下一级审批人：'+obj[i].nextExamineUserName+'</span></p>'
				+ '<div class="opinionbox"><div class="opiniontit">审批意见：'+obj[i].examineIdea+'</div>'
				+ '<div class="opinionarea"></div></div>'
				+ '</div></div><div class="arrdown"><span></span></div>'
			}
			$('#leave .flow .showView').html(html);
		}
	})
/**/	
	$.ajax({
		data:{leaveApplyId:id},
		url:'../../leave/findApplyByCondition.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			console.log(data);
			var obj = eval('(' + data + ')').rows;
			$('#leave .flow .flowplan .createUserName').val(obj[0].userName);
			$('#leave .flow .flowplan .createTimeStr').val(obj[0].startTimeStr);
			if(obj[0].examineStatus == 1)
				$('#leave .flow .flowplan .inviteStatus').val('审批中');
			else if(obj[0].examineStatus == 2)
				$('#leave .flow .flowplan .inviteStatus').val('撤回');
			else if(obj[0].examineStatus == 3)
				$('#leave .flow .flowplan .inviteStatus').val('招聘中');
			else if(obj[0].examineStatus == 4)
				$('#leave .flow .flowplan .inviteStatus').val('驳回');
			else if(obj[0].examineStatus == 5)
				$('#leave .flow .flowplan .inviteStatus').val('招满');
			$('#leave .flow .flowplan .text').html(obj[0].text);
			$('#leave .flow .flowplan .reason').html(obj[0].reason);
		},
		error:function(err){
			windowControl(err.status);
		}
	})
}
/*********如果点击了返回按钮，则返回到列表********/
$('#leave .flow .flowbar .back').click(function(){
	$('#leave .list').css('display','block');
	$('#leave .flow').css('display','none');
});
/*************************当前请假申请人********************************/
function getDocumentMaker(){
	$.ajax({
		url:'../../user/getUserInfo.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var str = '';
			var data = eval('(' + data + ')');
			$('#leave .popups .savegoout input[name=leaveUserName]').val(data.userName);
			$('#leave .popups .savegoout input[name=leaveUserId]').val(data.userId);
		},
		error:function(error){
			windowControl(error.status);
		}
	});
}
