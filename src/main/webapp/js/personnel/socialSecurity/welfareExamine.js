/*----------------------------------------------待我审核的福利--------------------------------------------------------*/
$(function(){
	
	
	$('#welfareExamine .welfareLookObj .lookObjdg').parent().css('height',$('#loadarea').height()-64+'px');
	/*-------------------------------------查询---------------------------------------------------*/
	$('#welfareExamine .queryWelfare').click(function(){
		
		var createUserName = $('#welfareExamine .people').val();
		var welfareName = $('#welfareExamine .invitetop input[name=welfareName]').val();
		var welfareCode = $('#welfareExamine .invitetop input[name=welfareCode]').val();
		var examineStatus = $('#welfareExamine .invitetop select[name=examineStatus] option:selected').val();
		//var objFlag = $('#welfareExamine .invitetop select[name=objFlag] option:selected').val();
		$('#welfareExaminedg').datagrid({
			url:'../../welfare/findMyExamineStream.do?getMs='+getMS(),
			queryParams:{
				createUserName:createUserName,
				examineStatus:examineStatus,
				welfareName:welfareName,
				welfareCode:welfareCode, 
				streamType:'1'
			}
		});
	})

/*******清空按钮清空事件******/
	cleanQuery($('#welfareExamine .invitetop input[name=clean]'));
	
	$('#welfareExaminedg').parent().css('height',$('#loadarea').height()-62);
/*-------------------------福利审批----------------------------*/
	$('#welfareExaminedg').datagrid({
		   url:'../../welfare/findMyExamineStream.do?getMs='+getMS(),
		   queryParams:{
			   streamType:'1',
			   examineStatus:'1', 
		   },
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#welfareExamine .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
		    	   var streamId = "'"+row.welfareStreamId+"'";
		    	   var id = "'"+row.welfareId+"'";
		    	   var welfareId = "'"+row.welfareId+"'";
		    	   var opera = '';
		    	   
		    	   if(row.examineStatus == '1'){
		    		   if(existPermission('admin:personnel:socialSecurity:welfareExamine:examine'))
			    			opera +='<span class="small-button edit" onclick="examineWelfareExamine('+streamId+','+id+')" title="审批"></span>';
			    	   if(existPermission('admin:personnel:socialSecurity:welfareExamine:select'))
			    		   opera +='<span class="small-button lookflow" onclick="lookWelfareExamine('+streamId+','+id+')" title="查看流程"></span>';
		    	   }else{
		    		   if(existPermission('admin:personnel:socialSecurity:welfareExamine:select'))
			    		   opera +='<span class="small-button lookflow" onclick="lookWelfareExamine('+streamId+','+id+')" title="查看流程"></span>';
		    	   }
		    	   if(existPermission('admin:personnel:socialSecurity:welfareExamine:select'))
	    			   opera +='<span class="small-button look" onclick="lookwelfareObjExamine('+welfareId+')" title="查看发放对象"></span>';
		    	   return opera;
		       }},
		       {field:"welfareName",title:"福利名称",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"welfareCode",title:"福利码",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"population",title:"人数",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
		       {field:"budgetAmount",title:"预算金额",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
		       {field:"examineUserName",title:"审批人",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"createUserName",title:"申请人",fitColumns:true,sortable:true,align:"center",sortable:true,width:75},
		       {field:"createTimeStr",title:"申请日期",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"updateTimeStr",title:"更新日期",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"examineStatus",title:"审批状态",fitColumns:true,resizable:true,align:"center",sortable:true,width:60,formatter:function(value,row,index){
		    	   if(row.examineStatus == '1'){
		    		   return "待审";
		    	   }else if(row.examineStatus == '2'){
		    		   return "撤回";
		    	   }else if(row.examineStatus == '3'){
		    		   return "通过";
		    	   }else if(row.examineStatus == '4'){
		    		   return "驳回";
		    	   }
		    	   
		    	  // return getValueFromKey("examine_status",row.examineStatus);
		       }},
		       {field:"streamType",title:"流类型",fitColumns:true,resizable:true,align:"center",width:60,sortable:true,formatter:function(value,row,index){
		    	   if(value ==1){
		     		   return "审批";
		     	   }else if(value ==2){
		     		  return "备案";
		     	   }
		       }},
		    ]]
	});
	//
	$('#welfareExamine .welfareLookObj .lookObjdg').datagrid({
		   url:'../../welfare/findRecordByCondition.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#welfareExamine .welfareLookObj .invitetop",
		   method:"post",
		   fit: true,
		   queryParams:{
			   welfareId:"s1s1"
		   },
		   columns:[[
		       //{field:"ck",checkbox:true },
		       {field:"getUserName",title:"姓名",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"getUserIdCard",title:"身份证",fitColumns:true,resizable:true,align:"center",sortable:true,width:135},
		       {field:"welfareName",title:"福利名称",fitColumns:true,resizable:true,align:"center",sortable:true,width:120},
		       {field:"welfareCode",title:"福利编码",fitColumns:true,resizable:true,align:"center",sortable:true,width:90},
		       {field:"text",title:"描述",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"reason",title:"原因",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"departmentName",title:"所属部门",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"postName",title:"所属岗位",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"giveTimeStr",title:"发放时间",fitColumns:true,sortable:true,align:"center",sortable:true,width:130},
		       {field:"getTimeStr",title:"领取时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"getFlag",title:"是否领取",fitColumns:true,resizable:true,align:"center",width:60,sortable:true,formatter:function(value,row,index){
		    	   if(value ==0){
		     		   return "未领取";
		     	   }else if(value ==1){
		     		  return "已领取";
		     	   }
		       }},
		    ]]
		}); 
	/**************examineStatus****************/
	//$('#welfareExamine .invitetop select[name=examineStatus]').html(getDataBySelectKeyNo("examine_status"));
	/**************objFlag****************/
	//$('#welfareExamine .invitetop select[name=objFlag]').html(getDataBySelectKeyNo("provide_obj_flag"));
})
//查看发放对象
function lookwelfareObjExamine(welfareId){
	$('#welfareExamine .list').css('display','none');
	$('#welfareExamine .flow').css('display','none');
	$('#welfareExamine .welfareLookObj').css('display','block');
	$.ajax({
		data:{welfareId:welfareId},
		url:'../../welfare/findRecordByCondition.do?getMs='+getMS(),
		success:function(data){
		}
	})
	$('#welfareExamine .welfareLookObj .lookObjdg').datagrid({
		 queryParams:{
			   welfareId:welfareId
		   },
		   onLoadSuccess:function(data){
		   }
	});
}
function examineWelfareExamine(streamId,id){//点击审批
	$('#welfareExamine .list').css('display','none');
	$('#welfareExamine .flow').css('display','block');
	$('#welfareExamine .welfareLookObj').css('display','none');
	$('#welfareExamine .flow .flowbar .reject').css('display','inline-block');
	$('#welfareExamine .flow .flowbar .reference').css('display','inline-block');
	$('#welfareExamine .flow .flowbar .past').css('display','inline-block');
	$.ajax({
		data:{welfareStreamId:streamId,welfareId:id},
		url:'../../welfare/findStreamByCondition.do?getMs='+getMS(),
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			var html = '';
			for(var i = 0; i<obj.length; i++){
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
			var str = '<input type="text" style="display:none;" class="welfareId" value="'+id+'"/>'+
			'<input type="text" style="display:none;" class="welfareStreamId" value="'+streamId+'"/>';
			html += str;
			$('#welfareExamine .flow .showView').html(html);
			/****************信息*******************/
			$('#welfareExamine .flow .flowplan .welfareName').val(obj[0].welfareName);
			$('#welfareExamine .flow .flowplan .welfareCode').val(obj[0].welfareCode);
			$('#welfareExamine .flow .flowplan .giveTimeStr').val(obj[0].giveTimeStr);
			if(obj[0].inviteStatus == 1)
				$('#invitelist .flow .flowplan .inviteStatus').val('审批中');
			else if(obj[0].inviteStatus == 2)
				$('#invitelist .flow .flowplan .inviteStatus').val('撤回');
			else if(obj[0].inviteStatus == 3)
				$('#invitelist .flow .flowplan .inviteStatus').val('招聘中');
			else if(obj[0].inviteStatus == 4)
				$('#invitelist .flow .flowplan .inviteStatus').val('驳回');
			else if(obj[0].inviteStatus == 5)
				$('#invitelist .flow .flowplan .inviteStatus').val('招满');
			$('#welfareExamine .flow .flowplan .text').html(obj[0].text);
			$('#welfareExamine .flow .flowplan .reason').html(obj[0].reason);		
		}
	})
}

function lookWelfareExamine(streamId,id){//点击查看
	$('#welfareExamine .welfareLookObj').css('display','none');
	$('#welfareExamine .list').css('display','none');
	$('#welfareExamine .flow').css('display','block');
	$('#welfareExamine .flow .flowbar .reject').css('display','none');
	$('#welfareExamine .flow .flowbar .reference').css('display','none');
	$('#welfareExamine .flow .flowbar .past').css('display','none');
	$.ajax({
		data:{welfareId:id},
		url:'../../welfare/findStreamByCondition.do?getMs='+getMS(),
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			var html = '';
			for(var i = 0; i<obj.length; i++){
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
			var str = '<input type="text" style="display:none;" class="welfareId" value="'+id+'"/>'+
			'<input type="text" style="display:none;" class="welfareStreamId" value="'+streamId+'"/>';
			html += str;
			$('#welfareExamine .flow .showView').html(html);
			/****************信息*******************/
			$('#welfareExamine .flow .flowplan .welfareName').val(obj[0].welfareName);
			$('#welfareExamine .flow .flowplan .welfareCode').val(obj[0].welfareCode);
			$('#welfareExamine .flow .flowplan .giveTimeStr').val(obj[0].giveTimeStr);
			$('#welfareExamine .flow .flowplan .text').html(obj[0].text);
			$('#welfareExamine .flow .flowplan .reason').html(obj[0].reason);
			
		}
	})
}

/*********点击驳回保存按钮********/
$('#welfareExamine .rejectWindow .save').click(function(){
	var examineIdea = $("#welfareExamine .rejectWindow textarea[name=examineIdea]").val();
	var welfareId = $("#welfareExamine .flow .showView .welfareId").val();
	var welfareStreamId = $("#welfareExamine .flow .showView .welfareStreamId").val();
	$.ajax({
		data:{welfareId:welfareId,welfareStreamId:welfareStreamId,examineIdea:examineIdea,examineStatus:'4'},
		type:"post",
		url:"../../welfare/rejectWelfareApply.do?getMs="+getMS(),
		success : function(data){
			$("#welfareExamine .rejectWindow").css('display','none');
			$('#welfareExamine .list').css('display','block');
			$('#welfareExamine .flow').css('display','none');
			$('#welfareExaminedg').datagrid('reload');
		}
	})
	
});

/*********点击备案保存按钮********/
$('#welfareExamine .referenceWindow .save').click(function(){
	var examineIdea = $("#welfareExamine .referenceWindow textarea[name=examineIdea]").val();
	var welfareId = $("#welfareExamine .flow .showView .welfareId").val();
	var welfareStreamId = $("#welfareExamine .flow .showView .welfareStreamId").val();
	$.ajax({
		data:{welfareId:welfareId,welfareStreamId:welfareStreamId,examineIdea:examineIdea,examineStatus:'3'},
		type:"post",
		url:"../../welfare/finallyPassWelfareApply.do?getMs="+getMS(),
		success : function(data){
			$("#welfareExamine .referenceWindow").css('display','none');
			$('#welfareExamine .list').css('display','block');
			$('#welfareExamine .flow').css('display','none');
			$('#welfareExaminedg').datagrid('reload');
		},
		error:function(){
			windowControl("请求失败");
		}
	})
	
});

/*********点击通过保存按钮********/
$('#welfareExamine .pastWindow .save').click(function(){
	var examineIdea = $('#welfareExamine .pastWindow textarea[name=examineIdea]').val();
	var welfareId = $("#welfareExamine .flow .showView .welfareId").val();
	var welfareStreamId = $("#welfareExamine .flow .showView .welfareStreamId").val();
	var nextExamineUserId=$('#welfareExamine .pastWindow input[name=nextExamineUserId]').val();
	var nextExamineUserName=$('#welfareExamine .pastWindow input[name=nextExamineUserName]').val();
	if(nextExamineUserName == null || nextExamineUserName ==""){
		windowControl("下一级审批人不能为空");
	}else{
		$.ajax({
			data:{welfareId:welfareId,examineIdea:examineIdea,welfareStreamId:welfareStreamId,examineStatus:'3',nextExamineUserId:nextExamineUserId,nextExamineUserName:nextExamineUserName},
			type:"post",
			url:"../../welfare/passWelfareApply.do?getMs="+getMS(),
			success : function(data){
				$('#welfareExamine .list').css('display','block');
				$('#welfareExamine .flow').css('display','none');
				$("#welfareExamine .pastWindow").css('display','none');
				$('#welfareExaminedg').datagrid('reload');
			},
			error:function(){
				windowControl("请求失败");
			}
		})
	}
});

/*********选择下一个审批人********/
$('#welfareExamine .pastWindow .chooseUser').click(function(){
	chooseUser();
    $('#chooseUser .confirm').click(function(){
    	$('#chooseUser').css('display','none');
    	selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
    	$('#welfareExamine .pastWindow input[name=nextExamineUserName]').val(selectUser[0].userName);
    	$('#welfareExamine .pastWindow input[name=nextExamineUserId]').val(selectUser[0].userId);
    })
})
/*********如果点击了返回按钮，则返回到列表********/
$('#welfareExamine .flow .flowbar .back').click(function(){
	$('#welfareExamine .list').css('display','block');
	$('#welfareExamine .flow').css('display','none');
	$('#welfareExamine .welfareLookObj').css('display','none');
});
/*-------返回----*/
$('#welfareExamine .maintop .back').click(function(){
	$('#welfareExamine .list').css('display','block');
	$('#welfareExamine .flow').css('display','none');
	$('#welfareExamine .welfareLookObj').css('display','none');
	$('#welfareExamine .welfareLookObj .lookObjdg').datagrid({
		 queryParams:{
			   welfareId:"s1s1"
		   },
	});
});
/******通过，驳回，备案按钮相对应的取消事件*********/
$("#welfareExamine .rejectWindow .cannel").click(function(){
	$("#welfareExamine .rejectWindow").css('display','none');	
})
$("#welfareExamine .referenceWindow .cannel").click(function(){
	$("#welfareExamine .referenceWindow").css('display','none');	
})
$("#welfareExamine .pastWindow .cannel").click(function(){
	$("#welfareExamine .pastWindow").css('display','none');	
})
/******通过，驳回，备案按钮相对应的监听事件*******/
$("#welfareExamine .reject").click(function(){
	$("#welfareExamine .rejectWindow").css('display','block');						
})
$("#welfareExamine .reference").click(function(){
	$("#welfareExamine .referenceWindow").css('display','block');
})
$("#welfareExamine .past").click(function(){
	$("#welfareExamine .pastWindow .nextpeople").html('下级审批人：'+$('#welfareExamine input[name=nextExamineName]').val());
	$("#welfareExamine .pastWindow").css('display','block');
})
/*function examineWelfareExamine(id){
	$.ajax({
		data:{welfareStreamId:id},
		url:'../../welfare/findMyExamineStream.do?getMs='+getMS(),
		success:function(data){
			toflow = data;
			$.get('../personnel/socialSecurity/welfareflow.html',function(data1){
				$.getScript('../../js/personnel/socialSecurity/welfareflow.js');
				$('#loadarea').tabs('add',{
				    title:"审核福利流程",
				    content:data1,
				    closable:true
				});
			});
		},
		error:function(err){
			windowControl(err.status);
		}
	});
}*/