$(function(){
	/**设置内部网格内容的高度**/
	$("#leaveExamine .traindg").css('height',$('#loadarea').height()-62);
	$("#leaveExamine .flow").css('height',$('#loadarea').height()-62);
	
	/******创建数据培训信息网格******/
	$('#leaveExamine .traindg').datagrid({
	 //   url:'../../leave/findMyExamineStream.do?getMs='+getMS(),
	    method:"post",
	    toolbar:'#leaveExamine .invitetop',
	    striped:true,
	    loadMsg:'数据加载中',
	    checkbox:false,
	    singleSelect:true,
	    pagination:true,
    	rownumbers:true,
	    columns:[[
			{field:'userName',align:"center",title:'请假人姓名',width:75},
			{field:'leaveType',align:"center",title:'请假类型',width:75,formatter:function(value,row,index){
		    	   return getValueFromKey('leave_type',value);
		       }},
			{field:'startTimeStr',align:"center",title:'请假开始时间',width:130},
			{field:'overTimeStr',align:"center",title:'请假结束时间',width:130,align:'right'},
			{field:'applyTimeStr',align:"center",title:'请假申请时间',width:130,align:'right'},
			{field:'reason',align:"center",title:'请假原因',width:150,align:'center'},
			{field:'examineStatus',align:"center",title:'我的审批',width:60,align:'center',formatter:function(value,row,index){
				 if(row.examineStatus == '1'){
		    		   return "待审";
		    	   }else if(row.examineStatus == '2'){
		    		   return "撤回";
		    	   }else if(row.examineStatus == '3'){
		    		   return "通过";
		    	   }else if(row.examineStatus == '4'){
		    		   return "驳回";
		    	   }else if(row.examineStatus == '5'){
		    		   return "备案";
		    	   }
			}},
			{field:'examineTimeStr',align:"center",title:'审批时间',width:130,align:'center'},
			{field:'_operate',align:"center",title:'操作',align:'center',width:100,formatter:function(value,row,index){
				var id = "'"+row.leaveApplyId+"'";
				var leaveStreamId = "'"+row.leaveStreamId+"'";
				if(row.examineStatus == '1'){
					return '<span class="small-button edit" title="审批" onclick="updateLeaveFlowMessage('+id+','+leaveStreamId+')"></span><span class="small-button look" title="查看流程" onclick="selectLeaveFlowMessage('+id+','+leaveStreamId+')"></span>'					
				}else{
					return '<span class="small-button look" title="查看流程" onclick="selectLeaveFlowMessage('+id+','+leaveStreamId+')"></span>'
				}
			}}
	    ]],
	});
	//条件查询
	$('#leaveExamine .invitetop .query').click(function(){
		var userName = $("#leaveExamine .invitetop .userName").val();
		var examineStatus=$("#leaveExamine .invitetop .examineStatus").val();
		var leaveType = $("#leaveExamine .invitetop select[name=leaveType]").val();
		if(examineStatus == "待审")
			examineStatus =1;
		if(examineStatus == "撤回")
			examineStatus =2;
		if(examineStatus == "通过")
			examineStatus =3;
		if(examineStatus == "驳回")
			examineStatus =4;
		if(examineStatus == "备案")
			examineStatus =5;
		var inviteQueryInfo = {
				userName : userName,
				examineStatus : examineStatus,
				leaveType:leaveType
		}
		$('#leaveExamine .traindg').datagrid({
			url:'../../leave/findMyExamineStream.do?getMs='+getMS(),
			queryParams:inviteQueryInfo
		})
	})
	//清空
	cleanQuery($("#leaveExamine .list .invitetop .clean"));
	
	/********通过，驳回，备案操作事件********/
	//驳回
	$("#leaveExamine .rejectWindow .save").click(function(){
		var text = $('#leaveExamine .rejectWindow textarea').val();
		var leaveApplyId = $('#leaveExamine .flow .flowplan .leaveApplyId').val();
		var leaveStreamId = $('#leaveExamine .flow .flowplan .leaveStreamId').val();
		$.ajax({
			url:'../../leave/rejectLeaveApply.do?getMs='+getMS(),
			type:'post',
			data:{
				examineIdea:text,
				leaveApplyId:leaveApplyId,
				leaveStreamId:leaveStreamId,
				examineStatus:'4'
			},
			success:function(data){
				if(data == '200'){
					windowControl("驳回成功");
					$('#leaveExamine .list').css('display','block');
					$('#leaveExamine .flow').css('display','none');
					$("#leaveExamine .rejectWindow").css('display','none');
					$('#leaveExamine .traindg').datagrid('reload');
				}else{
					windowControl("驳回失败");
				}
			}
		})
	});
	//备案
	$("#leaveExamine .referenceWindow .save").click(function(){
		var text = $('#leaveExamine .referenceWindow textarea').val();
		var leaveApplyId = $('#leaveExamine .flow .flowplan .leaveApplyId').val();
		var leaveStreamId = $('#leaveExamine .flow .flowplan .leaveStreamId').val();
		var leaveType = getKeyFromValue('leave_type',$('#leaveExamine .flow .flowplan .leaveType').val());
		$.ajax({
			url:'../../leave/finallyPassLeaveApply.do?getMs='+getMS(),
			type:'post',
			data:{
				examineIdea:text,
				leaveApplyId:leaveApplyId,
				leaveStreamId:leaveStreamId,
				leaveType:leaveType,
				examineStatus:'3'
			},
			success:function(data){
				if(data == '200'){
					windowControl("进入备案流程成功");
					$('#leaveExamine .list').css('display','block');
					$('#leaveExamine .flow').css('display','none');
					$("#leaveExamine .referenceWindow").css('display','none');
					$('#leaveExamine .traindg').datagrid('reload');
				}else{
					windowControl("进入备案流程失败");
				}
			}
		});
	});
	//通过
	$("#leaveExamine .pastWindow .save").click(function(){
		var text = $('#leaveExamine .pastWindow textarea').val();
		var leaveApplyId = $('#leaveExamine .flow .flowplan .leaveApplyId').val();
		var leaveStreamId = $('#leaveExamine .flow .flowplan .leaveStreamId').val();
		var nextExamineUserName = $('#leaveExamine .pastWindow input[name=nextExamineUserName]').val();
		var nextExamineUser = $('#leaveExamine .pastWindow input[name=nextExamineUserId]').val();
		var leaveType = getKeyFromValue('leave_type',$('#leaveExamine .flow .flowplan .leaveType').val());
		if(nextExamineUserName == null || nextExamineUserName == ''){
			windowControl('下一个审批人不能为空');
		}else{
			$.ajax({
				url:'../../leave/passLeaveApply.do?getMs='+getMS(),
				type:'post',
				data:{
					examineIdea:text,
					leaveApplyId:leaveApplyId,
					leaveStreamId:leaveStreamId,
					nextExamineUserId:nextExamineUser,
					nextExamineUserName:nextExamineUserName,
					leaveType:leaveType,
					examineStatus:'3'
				},
				success:function(data){
					if(data == '200'){
						windowControl("通过成功");
						$('#leaveExamine .list').css('display','block');
						$('#leaveExamine .flow').css('display','none');
						$("#leaveExamine .pastWindow").css('display','none');
						$('#leaveExamine .traindg').datagrid('reload');
					}else{
						windowControl("通过失败");
					}
				}
			});
		}
		
	});
	//选择下一个审批人
	$('#leaveExamine .pastWindow .chooseUser').click(function(){
		chooseUser();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#leaveExamine .pastWindow input[name=nextExamineUserName]').val(selectUser[0].userName);
	    	$('#leaveExamine .pastWindow input[name=nextExamineUserId]').val(selectUser[0].userId);
	    })
	})
	
})
//
$('#leaveExamine .invitetop select[name=leaveType]').html(getDataBySelectKeyNo("leave_type"));
function updateLeaveFlowMessage(id,leaveStreamId){
	$('#leaveExamine .list').css('display','none');
	$('#leaveExamine .flow').css('display','block');
	/*******从服务器获取培训的描述原因等信息*******/
	$.ajax({
		url:'../../leave/findStreamByCondition.do?getMs='+getMS(),
		data:{
			leaveApplyId:id
		},
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			var html = '';
			for(var i = 0; i<obj.length ; i++){
				html = html + '<div class="process"><div class="processbox">'
					 + '<p><span class="jiachu expeop" style="margin-left: 2px;">&ensp;&nbsp;审批人：'+obj[i].examineUserName+'</span>'
					 + '<span class="righttime">&ensp;&ensp;&ensp;&nbsp;审批时间：'+obj[i].examineTimeStr+'</span></p>'
					 + '<p><span class="expeop">审批类型：';
				 if(obj[i].streamType == '1'){
					 html = html + "审批";
				 }else if(obj.streamType == '2'){
					 html = html + "备案";
				 }
				html = html +'</span><span class="righttime">下一级审批人：'+obj[i].nextExamineUserName+'</span></p>'
					 + '<div class="opinionbox"><div class="opiniontit">审批意见：'+obj[i].examineIdea+'</div>'
					 + '<div class="opinionarea"></div></div>'
					 + '</div></div><div class="arrdown"><span></span></div>'
			}
			$('#leaveExamine .flow .flowplan .leaveStreamId').val(leaveStreamId);
			$('#leaveExamine .flow .showView').html(html);
		}
	});
	
	/*******从服务器获取培训的流程审批信息*******/
	$.ajax({
		url:'../../leave/findApplyByCondition.do?getMs='+getMS(),
		data:{
			leaveApplyId:id
		},
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			$('#leaveExamine .flow .flowplan .leaveApplyId').val(obj[0].leaveApplyId);
			$('#leaveExamine .flow .flowplan .userName').val(obj[0].userName);
			$('#leaveExamine .flow .flowplan .leaveType').val(getValueFromKey('leave_type'),obj[0].leaveType);
			$('#leaveExamine .flow .flowplan .applyTime').val(obj[0].applyTimeStr);
			$('#leaveExamine .flow .flowplan .startTime').val(obj[0].startTimeStr);
			$('#leaveExamine .flow .flowplan .overTime').val(obj[0].overTimeStr);
			if(obj[0].examineStatus == 1)
				$('#leaveExamine .flow .flowplan .examineStatus').val('待审');
			else if(obj[0].examineStatus == 2)
				$('#leaveExamine .flow .flowplan .examineStatus').val('撤回');
			else if(obj[0].examineStatus == 3)
				$('#leaveExamine .flow .flowplan .examineStatus').val('通过');
			else if(obj[0].examineStatus == 4)
				$('#leaveExamine .flow .flowplan .examineStatus').val('驳回');
			else if(obj[0].examineStatus == 5)
				$('#leaveExamine .flow .flowplan .examineStatus').val('完成');
			$('#leaveExamine .flow .flowplan .reason').html(obj[0].reason);
		}
	})
}
/******查看请假流程******/
function selectLeaveFlowMessage(id){
	$('#leaveExamine .list').css('display','none');
	$('#leaveExamine .flow').css('display','block');
	$('#leaveExamine .flow .flowbar .reject').css('display','none');
	$('#leaveExamine .flow .flowbar .reference').css('display','none');
	$('#leaveExamine .flow .flowbar .past').css('display','none');
	/*******从服务器获取培训的描述原因等信息*******/
	$.ajax({
		url:'../../leave/findStreamByCondition.do?getMs='+getMS(),
		data:{
			leaveApplyId:id
		},
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			var html = '';
			for(var i = 0; i<obj.length ; i++){
				html = html + '<div class="process"><div class="processbox">'
					 + '<p><span class="jiachu expeop" style="margin-left: 2px;">&ensp;&nbsp;审批人：'+obj[i].examineUserName+'</span>'
					 + '<span class="righttime">&ensp;&ensp;&ensp;&nbsp;审批时间：'+obj[i].examineTimeStr+'</span></p>'
					 + '<p><span class="expeop">审批类型：';
				 if(obj[i].streamType == '1'){
					 html = html + "审批";
				 }else if(obj.streamType == '2'){
					 html = html + "备案";
				 }
				html = html +'</span><span class="righttime">下一级审批人：'+obj[i].nextExamineUserName+'</span></p>'
					 + '<div class="opinionbox"><div class="opiniontit">审批意见：'+obj[i].examineIdea+'</div>'
					 + '<div class="opinionarea"></div></div>'
					 + '</div></div><div class="arrdown"><span></span></div>'
			}
			$('#leaveExamine .flow .flowplan .leaveStreamId').val(obj[obj.length-1].leaveStreamId);
			$('#leaveExamine .flow .showView').html(html);
		}
	});
	
	/*******从服务器获取培训的流程审批信息*******/
	$.ajax({
		url:'../../leave/findApplyByCondition.do?getMs='+getMS(),
		data:{
			leaveApplyId:id
		},
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			$('#leaveExamine .flow .flowplan .leaveApplyId').val(obj[0].leaveApplyId);
			$('#leaveExamine .flow .flowplan .userName').val(obj[0].userName);
			$('#leaveExamine .flow .flowplan .applyTime').val(obj[0].applyTimeStr);
			$('#leaveExamine .flow .flowplan .startTime').val(obj[0].startTimeStr);
			$('#leaveExamine .flow .flowplan .overTime').val(obj[0].overTimeStr);
			if(obj[0].examineStatus == 1)
				$('#leaveExamine .flow .flowplan .examineStatus').val('待审');
			else if(obj[0].examineStatus == 2)
				$('#leaveExamine .flow .flowplan .examineStatus').val('撤回');
			else if(obj[0].examineStatus == 3)
				$('#leaveExamine .flow .flowplan .examineStatus').val('通过');
			else if(obj[0].examineStatus == 4)
				$('#leaveExamine .flow .flowplan .examineStatus').val('驳回');
			else if(obj[0].examineStatus == 5)
				$('#leaveExamine .flow .flowplan .examineStatus').val('完成');
			$('#leaveExamine .flow .flowplan .reason').html(obj[0].reason);
		}
	})
}
/*********如果点击了返回按钮，则返回到列表********/
$('#leaveExamine .flow .flowbar .back').click(function(){
	$('#leaveExamine .list').css('display','block');
	$('#leaveExamine .flow').css('display','none');
});
//通过，驳回，备案按钮相对应的取消按钮
$("#leaveExamine .rejectWindow .cannel").click(function(){
	$("#leaveExamine .rejectWindow").css('display','none');	
})
$("#leaveExamine .referenceWindow .cannel").click(function(){
	$("#leaveExamine .referenceWindow").css('display','none');	
})
$("#leaveExamine .pastWindow .cannel").click(function(){
	$("#leaveExamine .pastWindow").css('display','none');	
})
/******通过，驳回，备案按钮相对应的监听事件*******/
$("#leaveExamine .reject").click(function(){
	$("#leaveExamine .rejectWindow").css('display','block');
})
$("#leaveExamine .reference").click(function(){
	$("#leaveExamine .referenceWindow").css('display','block');
})
$("#leaveExamine .past").click(function(){
	$("#leaveExamine .pastWindow").css('display','block');
})
