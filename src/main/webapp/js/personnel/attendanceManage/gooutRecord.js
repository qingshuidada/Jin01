$(function(){
	/*待我备案的外出流程*/
	$('#gooutRecorddg').datagrid({
		   //url:'../../goout/findStream.do?getMs='+getMS(),
		   queryParams:{
			   streamType:'2'
		   },
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#gooutRecord .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       //{field:"ck",checkbox:true },
		       {field:"userName",title:"申请人",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"goOutUserName",title:"外出人",fitColumns:true,sortable:true,align:"center",sortable:true,width:75},
		       {field:"startTimeStr",title:"外出时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"endTimeStr",title:"返回时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"reason",title:"外出原因",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		       {field:"backFlag",title:"是否已返回",fitColumns:true,resizable:true,align:"center",sortable:true,width:70,formatter:function(value,row,index){
		    	   if(value ==0){
		     		   return "未返回";
		     	   }else if(value ==1){
		     		  return "返回";
		     	   }
		       }},
		       {field:"createTimeStr",title:"创建时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"updateTimeStr",title:"修改时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"recordUserName",title:"备案人姓名",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"recordIdea",title:"备案意见",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:status,width:150},
		       {field:"recordTimeStr",title:"备案时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"examineStatus",title:"审批状态",fitColumns:true,resizable:true,align:"center",width:60,sortable:true,formatter:function(value,row,index){
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
		       {field:"_op",title:"管理",width:100,resizable:true,align:"center",width:100,sortable:true,formatter:function(value,row,index){
		    	   var id="'"+row.goOutApplyId+"'";
		    	   var streamId="'"+row.goOutStreamId+"'";
		    	   var examineStatus = "'"+row.examineStatus+"'";
		    	   var userName = "'"+row.userName+"'";
		    	   var backFlag = row.backFlag;
		    	   if(backFlag == 0){
		    		   return'<span class="small-button edit" title="审批" onclick="gooutrecord('+id+','+streamId+')"></span><span class="small-button edit" title="确认返回" onclick="confirmBack('+id+','+userName+','+examineStatus+')"></span>'		    		   
		    	   }else{
		    		   return'<span class="small-button edit" title="审批" onclick="gooutrecord('+id+','+streamId+')"></span>'	
		    	   }
		    	   
		       }},
		    ]]
	});
	//条件查询
	$('#gooutRecord .invitetop .query').click(function(){
		var userName = $("#gooutRecord .invitetop .userName").val();
		var examineStatus=$("#gooutRecord .invitetop .examineStatus").val();
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
				examineStatus : examineStatus
		}
		$('#gooutRecorddg').datagrid({
			url:"../../goout/findStream.do?getMs="+getMS(),
			queryParams:inviteQueryInfo
		})
	})
	//清空
	cleanQuery($("#gooutRecord .list .invitetop .clean"));
	
	
	//驳回
	$('#gooutRecord .rejectWindow .save').click(function(){
		var examineIdea = $("#gooutRecord .rejectWindow .examineIdea").val();
		var goOutApplyId = $("#gooutRecord .flow .showView .goOutApplyId").val();
		var goOutStreamId = $("#gooutRecord .flow .showView .goOutStreamId").val(); 
		$.ajax({
			data:{goOutApplyId:goOutApplyId,examineIdea:examineIdea,goOutStreamId:goOutStreamId},
			type:"post",
			url:"../../goout/rejectRecordApply.do?getMs="+getMS(),
			success : function(data){
				windowControl(data);
				//$("#gooutRecord .rejectWindow").css('display','none');
				$('#gooutRecord .list').css('display','block');
				$('#gooutRecord .flow').css('display','none');
				$('#gooutRecorddg').datagrid('reload');
			},
			error:function(){
				windowControl("请求失败");
			}
		})
	});
	//备案
	$('#gooutRecord .referenceWindow .save').click(function(){
		var examineIdea = $("#gooutRecord .rejectWindow .examineIdea").val();
		var goOutApplyId = $("#gooutRecord .flow .showView .goOutApplyId").val();
		var goOutStreamId = $("#gooutRecord .flow .showView .goOutStreamId").val(); 
		$.ajax({
			data:{goOutApplyId:goOutApplyId,examineIdea:examineIdea,goOutStreamId:goOutStreamId},
			type:"post",
			url:"../../goout/recordGoOutApply.do?getMs="+getMS(),
			success : function(data){
				windowControl(data);
				//$("#gooutRecord .referenceWindow").css('display','none');
				$('#gooutRecord .list').css('display','block');
				$('#gooutRecord .flow').css('display','none');
				$('#gooutRecorddg').datagrid('reload');
			},
			error:function(){
				windowControl("请求失败");
			}
		})
	});
	//重新审批
	$('#gooutRecord .pastWindow .save').click(function(){
		var examineIdea = $("#gooutRecord .pastWindow textarea[name=examineIdea]").val();
		var goOutApplyId = $("#gooutRecord .flow .showView .goOutApplyId").val();
		var goOutStreamId = $("#gooutRecord .flow .showView .goOutStreamId").val();
		var examineUserId=$('#gooutRecord .pastWindow input[name=nextExamineUser]').val();
		var examineUserName=$('#gooutRecord .pastWindow input[name=nextExamineUserName]').val();
		$.ajax({
			data:{goOutApplyId:goOutApplyId,examineIdea:examineIdea,goOutStreamId:goOutStreamId,examineUserId:examineUserId,examineUserName:examineUserName},
			type:"post",
			url:"../../goout/rejectRecordApply.do?getMs="+getMS(),
			success : function(data){
				if(data == '200'){
					windowControl("重新审批成功");
					$('#gooutRecord .list').css('display','block');
					$('#gooutRecord .flow').css('display','none');
					$("#gooutRecord .pastWindow").css('display','none');
					$('#gooutRecorddg').datagrid('reload');
				}else{
					windowControl("驳回失败");
				}
			},
			error:function(){
				windowControl("请求失败");
			}
		})	
	});
	//选择下一个审批人
	$('#gooutRecord .pastWindow .chooseUser').click(function(){
		chooseUser();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#gooutRecord .pastWindow input[name=nextExamineUserName]').val(selectUser[0].userName);
	    	$('#gooutRecord .pastWindow input[name=nextExamineUser]').val(selectUser[0].userId);
	    })
	})
	
})
//审批
function gooutrecord(id,streamId){//审批待备案的流程
	$('#gooutRecord .list').css('display','none');
	$('#gooutRecord .flow').css('display','block');
	$('#gooutRecord .flow .flowbar .reject').css('display','inline-block');
	$('#gooutRecord .flow .flowbar .reference').css('display','inline-block');
	$('#gooutRecord .flow .flowbar .past').css('display','inline-block');
	$.ajax({
		data:{goOutApplyId:id},
		url:'../../goout/findStream.do?getMs='+getMS(),
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
				}else if(obj[i].streamType == '2'){
					html = html + "备案";
				}
				html = html +'</span><span class="righttime">下一级审批人：'+obj[i].nextExamineUserName+'</span></p>'
				+ '<div class="opinionbox"><div class="opiniontit">审批意见：'+obj[i].examineIdea+'</div>'
				+ '<div class="opinionarea"></div></div>'
				+ '</div></div><div class="arrdown"><span></span></div>'
			}
			var str = '<input type="text" style="display:none;" class="goOutApplyId" value="'+id+'"/>'+
			'<input type="text" style="display:none;" class="goOutStreamId" value="'+streamId+'"/>';
			html += str;
			$('#gooutRecord .flow .showView').html(html);
		}
	})
	
	$.ajax({
		data:{goOutApplyId:id},
		url:'../../goout/findApplyByCondition.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			$('#gooutRecord .flow .flowplan .createUserName').val(obj[0].goOutUserName);
			$('#gooutRecord .flow .flowplan .createTimeStr').val(obj[0].createTimeStr);
			if(obj[0].examineStatus == 1)
				$('#gooutRecord .flow .flowplan .inviteStatus').val('审批中');
			else if(obj[0].examineStatus == 2)
				$('#gooutRecord .flow .flowplan .inviteStatus').val('撤回');
			else if(obj[0].examineStatus == 3)
				$('#gooutRecord .flow .flowplan .inviteStatus').val('招聘中');
			else if(obj[0].examineStatus == 4)
				$('#gooutRecord .flow .flowplan .inviteStatus').val('驳回');
			else if(obj[0].examineStatus == 5)
				$('#gooutRecord .flow .flowplan .inviteStatus').val('招满');
			$('#gooutRecord .flow .flowplan .text').html(obj[0].text);
			$('#gooutRecord .flow .flowplan .reason').html(obj[0].reason);
		},
		error:function(err){
			windowControl(err.status);
		}
	})
}
//确认外出人员返回
function confirmBack(id,userName,examineStatus){
	if(examineStatus == 5){
		ui.confirm('确定'+userName+'员工返回吗?',function(z){
			if(z){
				$.ajax({
					url:'../../goout/confirmUserBack.do?getMs='+getMS(),
					data:{goOutApplyId:id},
					success:function(data){
						if(data == 200){
							windowControl('确认返回成功');
							$('#gooutRecorddg').datagrid('reload');
						}else{
							windowControl('确认返回失败');
						}
					},
					error:function(err){
						windowControl('网络异常');
					}
				});
			}
		},false);	
	}else{
		windowControl('此流程未通过审批，不可对人员进行确认返回操作');
	}
}
/*********如果点击了返回按钮，则返回到列表********/
$('#gooutRecord .flow .flowbar .back').click(function(){
	$('#gooutRecord .list').css('display','block');
	$('#gooutRecord .flow').css('display','none');
});
//通过，驳回，备案按钮相对应的取消按钮
$("#gooutRecord .rejectWindow .cannel").click(function(){
	$("#gooutRecord .rejectWindow").css('display','none');	
})
$("#gooutRecord .referenceWindow .cannel").click(function(){
	$("#gooutRecord .referenceWindow").css('display','none');	
})
$("#gooutRecord .pastWindow .cannel").click(function(){
	$("#gooutRecord .pastWindow").css('display','none');	
})
/******通过，驳回，备案按钮相对应的监听事件*******/
$("#gooutRecord .reject").click(function(){
	$("#gooutRecord .rejectWindow").css('display','block');						
})
$("#gooutRecord .reference").click(function(){
	$("#gooutRecord .referenceWindow").css('display','block');
})
$("#gooutRecord .reExamine").click(function(){
	$("#gooutRecord .pastWindow").css('display','block');
})