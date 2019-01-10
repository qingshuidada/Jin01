$(function(){
	$('#inviterecord .flow').css('height',$('#loadarea').height()-31);
	$('#inviterecorddg').parent().css('height',$('#loadarea').height()-62);
	$('#inviterecorddg').datagrid({
//		   url:'../../personnel/queryInviteRecordApply.do?getMs='+getMS(), // list
//		   queryParams:{examineStatus:"1"},
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#inviterecord .invitetop",
		   method:"post",
		   fit: true,
		   columns:[[
		       {field:"planName",title:"招聘计划名",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"text",title:"招聘描述",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		       {field:"reason",title:"招聘原因",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		       {field:"planCount",title:"计划人数",fitColumns:true,resizable:true,align:"center",sortable:true,width:60},
		       {field:"applyUserName",title:"申请人",fitColumns:true,sortable:true,align:"center",sortable:true,width:75},
		       {field:"applyTimeStr",title:"申请时间",fitColumns:true,sortable:true,align:"center",sortable:true,width:130},
		       {field:"inviteStatus",title:"计划状态",fitColumns:true,resizable:true,align:"center",sortable:true,width:60,formatter:function(value,row,index){
		    	   if(row.inviteStatus == '1'){
		    		   return "审批中";
		    	   }else if(row.inviteStatus == '2'){
		    		   return "撤回";
		    	   }else if(row.inviteStatus == '3'){
		    		   return "招聘中";
		    	   }else if(row.inviteStatus == '4'){
		    		   return "驳回";
		    	   }else if(row.inviteStatus == '5'){
		    		   return "招满";
		    	   }
		    	   
		    	   //return getValueFromKey("invite_status",row.inviteStatus);
		    	}},
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
		    		//return getValueFromKey("examine_status",row.examineStatus);
			    	}},
		       {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
		    		var id = "'"+row.inviteId+"'";
		    		var inviteStreamId = "'"+row.inviteStreamId+"'";
		    		var opera = '';
		    		
		    		 if(row.examineStatus == '1'){
		    			 if(existPermission('admin:personnel:inviteManage:inviterecord:record'))
				    		 opera +='<span class="small-button edit" title="审批" onclick="recordInviteStream('+id+','+inviteStreamId+')"></span>';
			    		 if(existPermission('admin:personnel:inviteManage:inviterecord:select'))
			    			 opera +='<span class="small-button lookflow" title="查看流程" onclick="lookInviteStream('+id+','+inviteStreamId+')"></span>';
		    		 }else{
		    			 if(existPermission('admin:personnel:inviteManage:inviterecord:select'))
			    			 opera +='<span class="small-button lookflow" title="查看流程" onclick="lookInviteStream('+id+','+inviteStreamId+')"></span>';
		    		 }
		    		 return opera;
		    	}},
		  ]]
	}); 
	$('#inviterecord .flow .flowbar .back').click(function(){//返回
		$('#inviterecord .list').css('display','block');
		$('#inviterecord .flow').css('display','none');
	});
	//清空
	cleanQuery($("#inviterecord .list .invitetop .clean"));
	
	$('#inviterecord .invitetop .query').click(function(){//查询
		var planName = $("#inviterecord .invitetop .planName").val();
		var applyUserName=$("#inviterecord .invitetop .applyUserName").val();
		var createUserName=$("#inviterecord .invitetop .createUserName").val();
		var updateUserName=$("#inviterecord .invitetop .updateUserName").val();
		var inviteStatus=$("#inviterecord .invitetop .inviteStatus").val();
		var examineStatus=$("#inviterecord .invitetop .examineStatus").val();
		if(inviteStatus == "审批中")
			inviteStatus = 1;
		if(inviteStatus == "撤回")
			inviteStatus = 2;
		if(inviteStatus == "招聘中")
			inviteStatus = 3;
		if(inviteStatus == "驳回")
			inviteStatus = 4;
		if(inviteStatus == "招满")
			inviteStatus = 5;
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
				planName : planName,
				applyUserName : applyUserName,
				createUserName : createUserName,
				updateUserName : updateUserName,
				inviteStatus : inviteStatus,
				examineStatus : examineStatus
		}
		$('#inviterecorddg').datagrid({
			url:"../../personnel/queryInviteRecordApply.do?getMs="+getMS(),
			queryParams:inviteQueryInfo
		})
		
	});
	$('#inviterecord .rejectWindow .save').click(function(){//点击驳回保存
		var examineIdea = $("#inviterecord .rejectWindow textarea[name=examineIdea]").val();
		var inviteId = $("#inviterecord .flow .showView .inviteId").val();
		var inviteStreamId = $("#inviterecord .flow .showView .inviteStreamId").val(); 
		$.ajax({
			data:{inviteId:inviteId,examineIdea:examineIdea,inviteStreamId:inviteStreamId},
			type:"post",
			url:"../../personnel/rejectInviteStream.do?getMs="+getMS(),
			success : function(data){
				if(data == '200'){
					windowControl("驳回成功");
					$('#inviterecord .list').css('display','block');
					$('#inviterecord .flow').css('display','none');
					$('#inviterecorddg').datagrid('reload');
				}else{
					windowControl("驳回失败");
				}
			},
			error:function(){
				windowControl("请求失败");
			}
		})
	});
	$('#inviterecord .referenceWindow .save').click(function(){//点击备案保存
		var examineIdea = $("#inviterecord .referenceWindow textarea[name=examineIdea]").val();
		var inviteStreamId = $("#inviterecord .flow .showView .inviteStreamId").val();
		var inviteId = $("#inviterecord .flow .showView .inviteId").val();
		$.ajax({
			data:{inviteId:inviteId,examineIdea:examineIdea,inviteStreamId:inviteStreamId},
			type:"post",
			url:"../../personnel/recordUpdateInviteApply.do?getMs="+getMS(),
			success : function(data){
				if(data == '200'){
					windowControl("备案成功");
					$('#inviterecord .list').css('display','block');
					$('#inviterecord .flow').css('display','none');
					$('#inviterecorddg').datagrid('reload');
				}else{
					windowControl("备案失败");
				}
			},
			error:function(){
				windowControl("请求失败");
			}
		})
	});
	
	//选择下一个审批人
	$('#inviterecord .reExamineWindow .chooseUser').click(function(){
		chooseUser();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#inviterecord .reExamineWindow input[name=nextExamineUserName]').val(selectUser[0].userName);
	    	$('#inviterecord .reExamineWindow input[name=nextExamineUser]').val(selectUser[0].userId);
	    })
	})
	
	$('#inviterecord .reExamineWindow .save').click(function(){//驳回并给下一个人
		var examineIdea = $("#inviterecord .reExamineWindow textarea[name=examineIdea]").val();
		var inviteStreamId = $("#inviterecord .flow .showView .inviteStreamId").val();
		var inviteId = $("#inviterecord .flow .showView .inviteId").val();
		var nextExamineUser=$('#inviterecord .reExamineWindow input[name=nextExamineUser]').val();
		var nextExamineUserName=$('#inviterecord .reExamineWindow input[name=nextExamineUserName]').val();
		$.ajax({
			data:{inviteId:inviteId,examineIdea:examineIdea,inviteStreamId:inviteStreamId,nextExamineUser:nextExamineUser,nextExamineUserName:nextExamineUserName},
			type:"post",
			url:"../../personnel/rejectUpdateAddInviteApply.do?getMs="+getMS(),
			success : function(data){
				if(data == '200'){
					windowControl("重审操作成功");
					$('#inviterecord .list').css('display','block');
					$('#inviterecord .flow').css('display','none');
					$('#inviterecorddg').datagrid('reload');
					$("#inviterecord .reExamineWindow").css('display','none');
				}else{
					windowControl("重审操作失败");
				}
			},
			error:function(){
				windowControl("请求失败");
			}
		})
		
	});
	
	/**************inviteStatus****************/
	//$('#inviterecord .invitetop .inviteStatus').html(getDataBySelectKeyNo("invite_status"));
	/**************examineStatus****************/
	//$('#inviterecord .invitetop .examineStatus').html(getDataBySelectKeyNo("examine_status"));
})
function lookInviteStream(id,inviteStreamId){//查看待备案流程
	$('#inviterecord .list').css('display','none');
	$('#inviterecord .flow').css('display','block');
	$('#inviterecord .flow .reject').css('display','none');
	$('#inviterecord .flow .reference').css('display','none');
	$('#inviterecord .flow .reExamine').css('display','none');
	$.ajax({
		data:{inviteId:id},
		url:'../../personnel/queryStreamInviteApply.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			var html = '';
			for(var i = 0; i<obj.length ; i++){
				if(typeof obj[i].nextExamineUserName == 'undefined'){
					obj[i].nextExamineUserName = '';
				}
				if(typeof obj[i].examineIdea == 'undefined'){
					obj[i].examineIdea = '';
				}
				if(typeof obj[i].examineTimeStr == 'undefined'){
					obj[i].examineTimeStr = '';
				}
				if(typeof obj[i].examineUserName == 'undefined'){
					obj[i].examineUserName = '';
				}
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
			var str = '<input type="text" style="display:none;" class="inviteId" value="'+id+'"/>'+
			'<input type="text" style="display:none;" class="inviteStreamId" value="'+inviteStreamId+'"/>';
			html += str;
			$('#inviterecord .flow .showView').html(html);
		}
	})
	
	$.ajax({
		data:{inviteId:id},
		url:'../../personnel/queryInviteApply.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			$('#inviterecord .flow .flowplan .planName').val(obj[0].planName);
			$('#inviterecord .flow .flowplan .createUserName').val(obj[0].createUserName);
			$('#inviterecord .flow .flowplan .createTimeStr').val(obj[0].createTimeStr);
			$('#inviterecord .flow .flowplan .planCount').val(obj[0].planCount);
			$('#inviterecord .flow .flowplan .reallyCount').val(obj[0].reallyCount);
			$('#inviterecord .flow .flowplan .reallyCount').val(obj[0].reallyCount);
			if(obj[0].inviteStatus == 1)
				$('#inviterecord .flow .flowplan .inviteStatus').val('审批中');
			else if(obj[0].inviteStatus == 2)
				$('#inviterecord .flow .flowplan .inviteStatus').val('撤回');
			else if(obj[0].inviteStatus == 3)
				$('#inviterecord .flow .flowplan .inviteStatus').val('招聘中');
			else if(obj[0].inviteStatus == 4)
				$('#inviterecord .flow .flowplan .inviteStatus').val('驳回');
			else if(obj[0].inviteStatus == 5)
				$('#inviterecord .flow .flowplan .inviteStatus').val('招满');
			$('#inviterecord .flow .flowplan .text').html(obj[0].text);
			$('#inviterecord .flow .flowplan .reason').html(obj[0].reason);
		},
		error:function(err){
			windowControl(err.status);
		}
	})

	
}
function recordInviteStream(id,inviteStreamId){//审批待备案流程
	$('#inviterecord .list').css('display','none');
	$('#inviterecord .flow').css('display','block');
	$('#inviterecord .flow .reject').css('display','inline-block');
	$('#inviterecord .flow .reference').css('display','inline-block');
	$('#inviterecord .flow .reExamine').css('display','inline-block');
	$.ajax({
		data:{inviteId:id},
		url:'../../personnel/queryStreamInviteApply.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			var html = '';
			for(var i = 0; i<obj.length-1 ; i++){
				if(typeof obj[i].nextExamineUserName == 'undefined'){
					obj[i].nextExamineUserName = '';
				}
				if(typeof obj[i].examineIdea == 'undefined'){
					obj[i].examineIdea = '';
				}
				if(typeof obj[i].examineTimeStr == 'undefined'){
					obj[i].examineTimeStr = '';
				}
				if(typeof obj[i].examineUserName == 'undefined'){
					obj[i].examineUserName = '';
				}
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
			var str = '<input type="text" style="display:none;" class="inviteId" value="'+id+'"/>'+
			'<input type="text" style="display:none;" class="inviteStreamId" value="'+inviteStreamId+'"/>';
			html += str;
			$('#inviterecord .flow .showView').html(html);
		}
	})
	
	$.ajax({
		data:{inviteId:id},
		url:'../../personnel/queryInviteApply.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			$('#inviterecord .flow .flowplan .planName').val(obj[0].planName);
			$('#inviterecord .flow .flowplan .createUserName').val(obj[0].createUserName);
			$('#inviterecord .flow .flowplan .createTimeStr').val(obj[0].createTimeStr);
			$('#inviterecord .flow .flowplan .planCount').val(obj[0].planCount);
			$('#inviterecord .flow .flowplan .reallyCount').val(obj[0].reallyCount);
			$('#inviterecord .flow .flowplan .reallyCount').val(obj[0].reallyCount);
			if(obj[0].inviteStatus == 1)
				$('#inviterecord .flow .flowplan .inviteStatus').val('审批中');
			else if(obj[0].inviteStatus == 2)
				$('#inviterecord .flow .flowplan .inviteStatus').val('撤回');
			else if(obj[0].inviteStatus == 3)
				$('#inviterecord .flow .flowplan .inviteStatus').val('招聘中');
			else if(obj[0].inviteStatus == 4)
				$('#inviterecord .flow .flowplan .inviteStatus').val('驳回');
			else if(obj[0].inviteStatus == 5)
				$('#inviterecord .flow .flowplan .inviteStatus').val('招满');
			$('#inviterecord .flow .flowplan .text').html(obj[0].text);
			$('#inviterecord .flow .flowplan .reason').html(obj[0].reason);
		},
		error:function(err){
			windowControl(err.status);
		}
	})
}

/******重审，驳回，备案按钮相对应的取消事件*********/
$("#inviterecord .rejectWindow .cannel").click(function(){
	$("#inviterecord .rejectWindow").css('display','none');	
})
$("#inviterecord .referenceWindow .cannel").click(function(){
	$("#inviterecord .referenceWindow").css('display','none');	
})
$("#inviterecord .reExamineWindow .cannel").click(function(){
	$("#inviterecord .reExamineWindow").css('display','none');	
})
/******通过，驳回，备案按钮相对应的监听事件*******/
$("#inviterecord .reject").click(function(){
	$("#inviterecord .rejectWindow").css('display','block');						
})
$("#inviterecord .reference").click(function(){
	$("#inviterecord .referenceWindow").css('display','block');
})
$("#inviterecord .reExamine").click(function(){
	$("#inviterecord .reExamineWindow").css('display','block');
})