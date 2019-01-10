/*----------------------------------------------待我备案的福利--------------------------------------------------------*/
$(function(){
	/*-----------------------*/
	$('#welfarerecord .flow').css('height',$('#loadarea').height()-64+'px');
	$('#welfarerecord .welfareLookObj .lookObjdg').parent().css('height',$('#loadarea').height()-64+'px');
	$('#welfarerecorddg').datagrid({
		   url:'../../welfare/findStreamByCondition.do?getMs='+getMS(),
		   queryParams:{
			   streamType:'2',
			   examineStatus:"1"
		   },
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#welfarerecord .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		      {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
		    	   var id ="'"+row.welfareId+"'";
		    	   var streamId = "'"+row.welfareStreamId+"'";
		    	   var opera = '';
		    	   var budgetAmount = "'"+row.budgetAmount+"'";
		    	   var population = "'"+row.population+"'";
		    	   var welfareId = "'"+row.welfareId+"'";
		    	   if(row.examineStatus == '1'){
		    		   if(existPermission('admin:personnel:socialSecurity:welfarerecord:examine'))
		    				opera +='<span class="small-button edit" onclick="examineWelfareRecord('+id+','+streamId+','+budgetAmount+','+population+')" title="终审"></span>';
		    		  if(existPermission('admin:personnel:socialSecurity:welfarerecord:select'))
		    			  opera +='<span class="small-button lookflow" onclick="lookWelfareRecord('+id+','+streamId+')" title="查看"></span>';
		    	   }else{
		    		   if(existPermission('admin:personnel:socialSecurity:welfarerecord:select'))
			    			  opera +='<span class="small-button lookflow" onclick="lookWelfareRecord('+id+','+streamId+')" title="查看"></span>';
		    	   }
		    	   if(existPermission('admin:personnel:socialSecurity:welfarerecord:select'))
	    			   opera +='<span class="small-button look" onclick="lookwelfareObjRecord('+welfareId+')" title="查看发放对象"></span>';
		    	   return opera;
		       }},
		       {field:"welfareName",title:"福利名称",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"welfareCode",title:"福利码",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"population",title:"人数",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
		       {field:"budgetAmount",title:"预算金额",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
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
		    	   
		    	   //return getValueFromKey("examine_status",row.examineStatus);
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
	//查询
	$('#welfarerecord a[name=queryWelfare]').click(function(){
		var createUserName = $('#welfarerecord .people').val();
		var welfareName = $('#welfarerecord .invitetop input[name=welfareName]').val();
		var welfareCode = $('#welfarerecord .invitetop input[name=welfareCode]').val();
		var examineStatus = $('#welfarerecord .invitetop select[name=examineStatus] option:selected').val();
		//var objFlag = $('#welfarerecord .invitetop select[name=objFlag] option:selected').val();
		$('#welfarerecorddg').datagrid({
			url:'../../welfare/findStreamByCondition.do?getMs='+getMS(),
			queryParams:{
				createUserName:createUserName,
				examineStatus:examineStatus,
				welfareName:welfareName,
				welfareCode:welfareCode,
				/*objFlag:objFlag,*/
				streamType:'2'
				//examineStatus:'1'
			}
		});
	});
	
	/**************examineStatus****************/
	//$('#welfarerecord .invitetop select[name=examineStatus]').html(getDataBySelectKeyNo("examine_status"));
	/**************objFlag****************/
	//$('#welfarerecord .invitetop select[name=objFlag]').html(getDataBySelectKeyNo("provide_obj_flag"));
	/******点击备案保存按钮*********/
	$('#welfarerecord .referenceWindow .save').click(function(){
		var examineIdea = $("#welfarerecord .referenceWindow textarea[name=examineIdea]").val();
		var welfareId = $("#welfarerecord .flow .showView .welfareId").val();
		var welfareStreamId = $("#welfarerecord .flow .showView .welfareStreamId").val();
		var budgetAmount = $('#welfarerecord .flow').attr('budgetAmount');
		var population = $('#welfarerecord .flow').attr('population');
		$.ajax({
			data:{welfareId:welfareId,welfareStreamId:welfareStreamId,examineIdea:examineIdea,examineStatus:'3',budgetAmount:budgetAmount,population:population},
			type:"post",
			url:"../../welfare/recordWelfareApply.do?getMs="+getMS(),
			success : function(data){
				if(data == 200){
					windowControl('备案成功');
				}else{
					windowControl('备案失败');
				}
				$('#welfarerecord .list').css('display','block');
				$('#welfarerecord .flow').css('display','none');
				$('#welfarerecorddg').datagrid('reload');
			},
			error:function(){
				windowControl("请求失败");
			}
		})
		
	});
	/******点击驳回保存按钮*********/
	$('#welfarerecord .rejectWindow .save').click(function(){
		var examineIdea = $("#welfarerecord .rejectWindow textarea[name=examineIdea]").val();
		var welfareId = $("#welfarerecord .flow .showView .welfareId").val();
		var welfareStreamId = $("#welfarerecord .flow .showView .welfareStreamId").val();
		$.ajax({
			data:{welfareId:welfareId,welfareStreamId:welfareStreamId,examineIdea:examineIdea,examineStatus:'4'},
			type:"post",
			url:"../../welfare/rejectWelfareApply.do?getMs="+getMS(),
			success : function(data){
				$("#welfarerecord .rejectWindow").css('display','none');
				$('#welfarerecord .list').css('display','block');
				$('#welfarerecord .flow').css('display','none');
				$('#welfarerecorddg').datagrid('reload');
			}
		})
	});
	/**返回***/
	$('#welfarerecord .maintop .back').click(function(){
		$('#welfarerecord .list').css('display','block');
		$('#welfarerecord .welfareLookObj').css('display','none');
		$('#welfarerecord .flow').css('display','none');
		$('#welfarerecord .welfareLookObj .lookObjdg').datagrid({
			 queryParams:{
				   welfareId:"11111"
			   },
		});
	});

	/******点击重审保存按钮*********/
	$('#welfarerecord .reExamineWindow .save').click(function(){
		var examineIdea = $("#welfarerecord .reExamineWindow textarea[name=examineIdea]").val();
		var welfareId = $("#welfarerecord .flow .showView .welfareId").val();
		var welfareStreamId = $("#welfarerecord .flow .showView .welfareStreamId").val();
		var welfareStreamId = $("#welfarerecord .flow .showView .welfareStreamId").val();
		var welfareStreamId = $("#welfarerecord .flow .showView .welfareStreamId").val();
		var nextExamineUserId=$('#welfarerecord .reExamineWindow input[name=nextExamineUserId]').val();
		var nextExamineUserName=$('#welfarerecord .reExamineWindow input[name=nextExamineUserName]').val();
		if(nextExamineUserName == null || nextExamineUserName ==""){
			windowControl("下一级审批人不能为空");
		}else{
			$.ajax({
				data:{welfareId:welfareId,examineIdea:examineIdea,welfareStreamId:welfareStreamId,examineStatus:'3',nextExamineUserId:nextExamineUserId,nextExamineUserName:nextExamineUserName},
				type:"post",
				url:"../../welfare/rejectRecordApply.do?getMs="+getMS(),
				success : function(data){
					$('#welfarerecord .list').css('display','block');
					$('#welfarerecord .flow').css('display','none');
					$('#welfarerecorddg').datagrid('reload');
					$("#welfarerecord .reExamineWindow").css('display','none');
				},
				error:function(){
					windowControl("请求失败");
				}
			})
		}
		
	});
	/******选择下一个审批人*********/
	$('#welfarerecord .reExamineWindow .chooseUser').click(function(){
		chooseUser();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#welfarerecord .reExamineWindow input[name=nextExamineUserName]').val(selectUser[0].userName);
	    	$('#welfarerecord .reExamineWindow input[name=nextExamineUserId]').val(selectUser[0].userId);
	    })
	})

	/******重审，驳回，备案按钮相对应的取消事件*********/
	$("#welfarerecord .rejectWindow .cannel").click(function(){
		$("#welfarerecord .rejectWindow").css('display','none');	
	})
	$("#welfarerecord .referenceWindow .cannel").click(function(){
		$("#welfarerecord .referenceWindow").css('display','none');	
	})
	$("#welfarerecord .reExamineWindow .cannel").click(function(){
		$("#welfarerecord .reExamineWindow").css('display','none');	
	})
	/******通过，驳回，备案按钮相对应的监听事件*******/
	$("#welfarerecord .reject").click(function(){
		$("#welfarerecord .rejectWindow").css('display','block');				
	})
	$("#welfarerecord .reference").click(function(){
		$("#welfarerecord .referenceWindow").css('display','block');
	})
	$("#welfarerecord .reExamine").click(function(){
		$("#welfarerecord .reExamineWindow").css('display','block');
	})
	/*************返回按钮******************/
	$('#welfarerecord .flow .flowbar .back').click(function(){
		$('#welfarerecord .list').css('display','block');
		$('#welfarerecord .flow').css('display','none');
		$('#welfarerecord .welfareLookObj').css('display','none');
	});
	//
	$('#welfarerecord .welfareLookObj .lookObjdg').datagrid({
		   url:'../../welfare/findRecordByCondition.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#welfarerecord .welfareLookObj .invitetop",
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
})
//查看发放对象
function lookwelfareObjRecord(welfareId){
	$('#welfarerecord .list').css('display','none');
	$('#welfarerecord .flow').css('display','none');
	$('#welfarerecord .welfareLookObj').css('display','block');
	$('#welfarerecord .welfareLookObj .lookObjdg').datagrid({
		 queryParams:{
			   welfareId:welfareId
		   },
	});
}
function examineWelfareRecord(id,streamId,budgetAmount,population){//点击审批待备案流程
	$('#welfarerecord .list').css('display','none');
	$('#welfarerecord .flow').css('display','block');
	$('#welfarerecord .welfareLookObj').css('display','none');
	$('#welfarerecord .flow').attr('budgetAmount',budgetAmount);
	$('#welfarerecord .flow').attr('population',population);
	$('#welfarerecord .flow .reject').css('display','inline-block');
	$('#welfarerecord .flow .reference').css('display','inline-block');
	$('#welfarerecord .flow .reExamine').css('display','inline-block');
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
			$('#welfarerecord .flow .showView').html(html);
			/****************信息*******************/
			$('#welfarerecord .flow .flowplan .welfareName').val(obj[0].welfareName);
			$('#welfarerecord .flow .flowplan .welfareCode').val(obj[0].welfareCode);
			$('#welfarerecord .flow .flowplan .giveTimeStr').val(obj[0].giveTimeStr);
			$('#welfarerecord .flow .flowplan .text').html(obj[0].text);
			$('#welfarerecord .flow .flowplan .reason').html(obj[0].reason);
			
		}
	})
}

function lookWelfareRecord(id,streamId){//点击查看待备案流程
	$('#welfarerecord .list').css('display','none');
	$('#welfareExamine .welfareLookObj').css('display','none');
	$('#welfarerecord .flow').css('display','block');
	$('#welfarerecord .flow .reject').css('display','none');
	$('#welfarerecord .flow .reference').css('display','none');
	$('#welfarerecord .flow .reExamine').css('display','none');
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
			$('#welfarerecord .flow .showView').html(html);
			/****************信息*******************/
			$('#welfarerecord .flow .flowplan .welfareName').val(obj[0].welfareName);
			$('#welfarerecord .flow .flowplan .welfareCode').val(obj[0].welfareCode);
			$('#welfarerecord .flow .flowplan .giveTimeStr').val(obj[0].giveTimeStr);
			$('#welfarerecord .flow .flowplan .text').html(obj[0].text);
			$('#welfarerecord .flow .flowplan .reason').html(obj[0].reason);
			
		}
	})
	
}

