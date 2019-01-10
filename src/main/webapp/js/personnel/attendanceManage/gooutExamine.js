$(function(){
	/* 待我审核的外出流程*/
	$('#gooutExaminedg').datagrid({
		  // url:'../../goout/findMyExamineStream.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#gooutExamine .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		      // {field:"ck",checkbox:true },
		       {field:"userName",title:"申请人姓名",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"goOutUserName",title:"外出人姓名",fitColumns:true,sortable:true,align:"center",sortable:true,width:75},
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
		       {field:"examineIdea",title:"审批意见",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"examineStatus",title:"审批状态",fitColumns:true,resizable:true,align:"center",sortable:true,width:60,formatter:function(value,row,index){
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
		       {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
		    	   var id="'"+row.goOutApplyId+"'";
		    	   var goOutStreamId = "'"+row.goOutStreamId+"'";
		    	   var opera = '';
		    	   if(row.examineStatus == '1'){
		    		   return'<span class="small-button edit" title="审批" onclick="updata('+id+','+goOutStreamId+')"></span><span class="small-button lookflow" onclick="look('+id+','+goOutStreamId+')"></span>'		    		   
		    	   }else{
		    		   return'<span class="small-button lookflow" title="查看流程" onclick="look('+id+','+goOutStreamId+')"></span>'
		    	   }
		       }},
		    ]]
	});
	//条件查询
	$('#gooutExamine .invitetop .query').click(function(){
		var userName = $("#gooutExamine .invitetop .userName").val();
		var examineStatus=$("#gooutExamine .invitetop .examineStatus").val();
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
		$('#gooutExaminedg').datagrid({
			url:"../../goout/findMyExamineStream.do?getMs="+getMS(),
			queryParams:inviteQueryInfo
		})
	})
	//清空
	cleanQuery($("#gooutExamine .list .invitetop .clean"));
	
	//点击驳回保存按钮
	$('#gooutExamine .rejectWindow .save').click(function(){
		var examineIdea = $("#gooutExamine .rejectWindow textarea[name=examineIdea]").val();
		var goOutApplyId = $("#gooutExamine .flow .showView .goOutApplyId").val();
		var goOutStreamId = $("#gooutExamine .flow .showView .goOutStreamId").val();
		$.ajax({
			data:{goOutApplyId:goOutApplyId,examineIdea:examineIdea,goOutStreamId:goOutStreamId},
			type:"post",
			url:"../../goout/rejectGoOutApply.do?getMs="+getMS(),
			success : function(data){
				if(data == '200'){
					windowControl("驳回成功");
					$("#gooutExamine .rejectWindow").css('display','none');
					$('#gooutExamine .list').css('display','block');
					$('#gooutExamine .flow').css('display','none');
					$('#gooutExaminedg').datagrid('reload');
				}else{
					windowControl("驳回失败");
				}
			},
			error:function(){
				windowControl("请求失败");
			}
		})
	});
	//通过外出申请且无需再审核
	$('#gooutExamine .referenceWindow .save').click(function(){
		var examineIdea = $("#gooutExamine .referenceWindow textarea[name=examineIdea]").val();
		var goOutApplyId = $("#gooutExamine .flow .showView .goOutApplyId").val();
		var goOutStreamId = $("#gooutExamine .flow .showView .goOutStreamId").val();
		$.ajax({
			data:{goOutApplyId:goOutApplyId,examineIdea:examineIdea,goOutStreamId:goOutStreamId},
			type:"post",
			url:"../../goout/finallyPassGoOutApply.do?getMs="+getMS(),
			success : function(data){
				if(data == '200'){
					windowControl("进入备案流程成功");
					$("#gooutExamine .referenceWindow").css('display','none');
					$('#gooutExamine .list').css('display','block');
					$('#gooutExamine .flow').css('display','none');
					$('#gooutExaminedg').datagrid('reload');
				}else{
					windowControl("进入备案流程失败");
				}
			},
			error:function(){
				windowControl("请求失败");
			}
		})
	});
	//点击通过保存按钮,并指向下一个人
	$('#gooutExamine .pastWindow .save').click(function(){
		var examineIdea = $('#gooutExamine .pastWindow textarea[name=examineIdea]').val();
		var goOutApplyId = $("#gooutExamine .flow .showView .goOutApplyId").val();
		var goOutStreamId = $("#gooutExamine .flow .showView .goOutStreamId").val();
		var nextExamineUserId=$('#gooutExamine .pastWindow input[name=nextExamineUser]').val();
		var nextExamineUserName=$('#gooutExamine .pastWindow input[name=nextExamineUserName]').val();
		$.ajax({
			data:{goOutApplyId:goOutApplyId,examineIdea:examineIdea,goOutStreamId:goOutStreamId,nextExamineUserId:nextExamineUserId,nextExamineUserName:nextExamineUserName},
			type:"post",
			url:"../../goout/passGoOutApply.do?getMs="+getMS(),
			success : function(data){
				if(data == '200'){
					windowControl("通过成功");
					$('#gooutExamine .list').css('display','block');
					$('#gooutExamine .flow').css('display','none');
					$("#gooutExamine .pastWindow").css('display','none');
					$('#gooutExaminedg').datagrid('reload');
				}else{
					windowControl("通过失败");
				}
			},
			error:function(){
				windowControl("请求失败");
			}
		})
	});
	//选择下一个审批人
	$('#gooutExamine .pastWindow .chooseUser').click(function(){
		chooseUser();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#gooutExamine .pastWindow input[name=nextExamineUserName]').val(selectUser[0].userName);
	    	$('#gooutExamine .pastWindow input[name=nextExamineUser]').val(selectUser[0].userId);
	    })
	})
	
});
//查看
function look(id,goOutStreamId){
	$('#gooutExamine .list').css('display','none');
	$('#gooutExamine .flow').css('display','block');
	$('#gooutExamine .flow .flowbar .reject').css('display','none');
	$('#gooutExamine .flow .flowbar .reference').css('display','none');
	$('#gooutExamine .flow .flowbar .past').css('display','none');
	$.ajax({
		data:{goOutApplyId:id},
		url:'../../goout/findStreamByCondition.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			//console.log(obj);
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
			'<input type="text" style="display:none;" class="goOutStreamId" value="'+goOutStreamId+'"/>';
			html += str;
			$('#gooutExamine .flow .showView').html(html);
		}
	})
	
	$.ajax({
		data:{goOutApplyId:id},
		url:'../../goout/findApplyByCondition.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			$('#gooutExamine .flow .flowplan .createUserName').val(obj[0].goOutUserName);
			$('#gooutExamine .flow .flowplan .createTimeStr').val(obj[0].createTimeStr);
			if(obj[0].examineStatus == 1)
				$('#gooutExamine .flow .flowplan .inviteStatus').val('审批中');
			else if(obj[0].examineStatus == 2)
				$('#gooutExamine .flow .flowplan .inviteStatus').val('撤回');
			else if(obj[0].examineStatus == 3)
				$('#gooutExamine .flow .flowplan .inviteStatus').val('招聘中');
			else if(obj[0].examineStatus == 4)
				$('#gooutExamine .flow .flowplan .inviteStatus').val('驳回');
			else if(obj[0].examineStatus == 5)
				$('#gooutExamine .flow .flowplan .inviteStatus').val('招满');
			$('#gooutExamine .flow .flowplan .text').html(obj[0].text);
			$('#gooutExamine .flow .flowplan .reason').html(obj[0].reason);
		},
		error:function(err){
			windowControl(err.status);
		}
	})
}
//审批
function updata(id,goOutStreamId){
	$('#gooutExamine .list').css('display','none');
	$('#gooutExamine .flow').css('display','block');
	$('#gooutExamine .flow .flowbar .reject').css('display','inline-block');
	$('#gooutExamine .flow .flowbar .reference').css('display','inline-block');
	$('#gooutExamine .flow .flowbar .past').css('display','inline-block');
	$.ajax({
		data:{goOutApplyId:id},
		url:'../../goout/findStreamByCondition.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			//console.log(obj);
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
			'<input type="text" style="display:none;" class="goOutStreamId" value="'+goOutStreamId+'"/>';
			html += str;
			$('#gooutExamine .flow .showView').html(html);
		}
	})
	
	$.ajax({
		data:{goOutApplyId:id},
		url:'../../goout/findApplyByCondition.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			$('#gooutExamine .flow .flowplan .createUserName').val(obj[0].goOutUserName);
			$('#gooutExamine .flow .flowplan .createTimeStr').val(obj[0].createTimeStr);
			if(obj[0].examineStatus == 1)
				$('#gooutExamine .flow .flowplan .inviteStatus').val('审批中');
			else if(obj[0].examineStatus == 2)
				$('#gooutExamine .flow .flowplan .inviteStatus').val('撤回');
			else if(obj[0].examineStatus == 3)
				$('#gooutExamine .flow .flowplan .inviteStatus').val('招聘中');
			else if(obj[0].examineStatus == 4)
				$('#gooutExamine .flow .flowplan .inviteStatus').val('驳回');
			else if(obj[0].examineStatus == 5)
				$('#gooutExamine .flow .flowplan .inviteStatus').val('招满');
			$('#gooutExamine .flow .flowplan .text').html(obj[0].text);
			$('#gooutExamine .flow .flowplan .reason').html(obj[0].reason);
		},
		error:function(err){
			windowControl(err.status);
		}
	})
}
//如果点击了返回按钮，则返回到列表
$('#gooutExamine .flow .flowbar .back').click(function(){
	$('#gooutExamine .list').css('display','block');
	$('#gooutExamine .flow').css('display','none');
});
//通过，驳回，备案按钮相对应的取消按钮
$("#gooutExamine .rejectWindow .cannel").click(function(){
	$("#gooutExamine .rejectWindow").css('display','none');	
})
$("#gooutExamine .referenceWindow .cannel").click(function(){
	$("#gooutExamine .referenceWindow").css('display','none');	
})
$("#gooutExamine .pastWindow .cannel").click(function(){
	$("#gooutExamine .pastWindow").css('display','none');	
})
//通过，驳回，备案按钮相对应的监听事件
$("#gooutExamine .reject").click(function(){
	$("#gooutExamine .rejectWindow").css('display','block');						
})
$("#gooutExamine .reference").click(function(){
	$("#gooutExamine .referenceWindow").css('display','block');
})
$("#gooutExamine .past").click(function(){
	$("#gooutExamine .pastWindow").css('display','block');
})