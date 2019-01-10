//==========================================奖惩页面========================================================================
var rewardPenaltiesExcel = [];
$(function(){	
	if(existPermission('admin:repertory:reportForm:resultJianCe:add'))
		$('#rewardPenalties .maintop').append('<div><input type="button" class="button add" value="添加" /></div>');

	$('#resultJianCedg').datagrid({
		//url:'../../personnel/selectPunishRecord.do?getMs='+getMS(), 
		rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#rewardPenalties .invitetop",
		   method:"post",
		   fit: true,
		   columns:[[
             {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
			    	var id = "'"+row.punishRecordId+"'";
			    	var type = row.type;
			    	var opera = '';
		    		if(existPermission('admin:repertory:reportForm:resultJianCe:update'))
		    			opera +='<span class="small-button edit" title="修改" onclick="updatePunish('+id+','+type+')"></span>';
		    		if(existPermission('admin:repertory:reportForm:resultJianCe:delete'))
		    			opera +='<span class="small-button delete" title="删除" onclick="deletePunish('+id+')"></span>';
			    	return opera;
		       }},
		       {field:"resultHot",title:"干度",fitColumns:true,resizable:true,align:"center",sortable:true,width:120},
		       {field:"resultMaoZhi",title:"毛沾",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"resultWet",title:"湿度",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"resultMianZhi",title:"棉沾",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		  ]]	
	})
	//导入excel
	$('#rewardPenalties .maintop .leadin').click(function(){
		$('#rewardPenalties .popups .leadinExcel').css('display','block');
	});
	$('#rewardPenalties .popups .leadinExcel .confirm').click(function(){
		var excelPath = $('#rewardPenalties .popups .leadinExcel input[type=file]').val();
		if(excelPath == ''){  
            alert("请选择excel,再上传");  
        }else if(excelPath.lastIndexOf(".xls")<0){//可判断以.xls和.xlsx结尾的excel  
            alert("只能上传Excel文件");  
        }else{
        	var excel = $('#rewardPenalties .popups .leadinExcel input[type=file]');
    		excel.upload({
    			url:"../../personnel/leadInExcel.do?getMs="+getMS(),
    			params: {},
    			onComplate: function (data) {
    				if(data ==200){
    					windowControl('导入成功');
    				}else{
    					windowControl('失败');
    				}				
    			}
    		})
    			excel.upload("ajaxSubmit");	
        }
	});
	//打印
	$('#rewardPenalties .maintop .print').click(function(){
		var dateStr = $('#rewardPenalties input[name=workTimeStartStr]').val();
		var endTimeStr = $('#rewardPenalties input[name=workTimeEndStr]').val();
		if(!dateStr || !endTimeStr){
			windowControl('请选择打印扣款记录的时间段（必选且仅支持该筛选条件）');
			return;
		}
		var url = "../../personnel/printRewardPenalties.do?" + "dateStr=" + dateStr + "&endTimeStr=" + endTimeStr;
		$('#rewardPenalties .printRewardPenalties').attr("action",url);
		$('#rewardPenalties .printRewardPenalties').submit();
	});
	
	//cento
	/*****************设置上下移span的title****************/
	$("#rewardPenalties .popups .writetoexcel .upset").attr("title","上移");
	$("#rewardPenalties .popups .writetoexcel .downset").attr("title","下移");
	
	/*****************导出到Excel点击弹窗******************/
	$("#rewardPenalties .maintop .write").click(function(){
		$('#rewardPenalties .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#rewardPenalties .popups .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'dateStr',tableHeader:'登记日期',date:true},
			         {propertyName:'departmentName',tableHeader:'部门',date:false},
			         {propertyName:'userName',tableHeader:'姓名',date:false},
			         {propertyName:'reason',tableHeader:'扣奖原因',date:false},
			         {propertyName:'amount',propertyType:'Integer',tableHeader:'扣奖金额',date:false},
			         {propertyName:'executorName',tableHeader:'执行人',date:false},
			         {propertyName:'text',tableHeader:'备注',date:true}
				 ]
		})
	})
	
	/*******************重置按钮点击事件***********************/
	$("#rewardPenalties .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#rewardPenalties .maintop .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#rewardPenalties .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#rewardPenalties .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#rewardPenalties .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#rewardPenalties .popups .writetoexcel"));
		var rewardPenaltiesExcel2 = [];
		for(var i = 0 ; i < rewardPenaltiesExcel.length ; i++){
			rewardPenaltiesExcel2.push(rewardPenaltiesExcel[i]);
		}
		rewardPenaltiesExcel2.push({
			name:'jsonString',value:jsonString
		});
		//提交导出excel所需要的参数
		
		excelplugin.submit({
			type:'post',
			array:rewardPenaltiesExcel2,
			action:'../../personnel/writeRewardPenaltiesToExcel.do?'
		})
	});
});
$(function(){
/*********************添加奖惩信息选项卡******************************/
	for(var i=0;i<$('.btn').length;i++){
		$('.btn')[i].index = i;
		$('.btn')[i].onclick=function(){
			
             for(var j=0;j<$('.contentBtn').length;j++){
            	 $('.contentBtn')[j].style.display='none'//隐藏表单
             }
             console.log($(this).index())
             $('.contentBtn')[this.index].style.display='block';
         }
	}
	//选择部门
	$('#rewardPenalties .invitetop .departmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#rewardPenalties .invitetop input[name=departmentName]').val(chooseDept.text);
		     $('#rewardPenalties .invitetop input[name=departmentUrl]').val(chooseDept.id);
		     $('#chooseDept .confirm').unbind();
		})
	})
/*********************条件查询奖惩信息******************************/
	$('#rewardPenalties .selectByName').click(function(){
		if(existPermission('admin:personnel:performanceManage:rewardPenalties:select')){
			var userName = $('#rewardPenalties .userName').val();
			var invoiceNumber = $('#rewardPenalties .invoiceNumber').val();
			var departmentName = $('#rewardPenalties input[name=departmentName]').val();
			var dateStr = $('#rewardPenalties input[name=workTimeStartStr]').val();
			var executorName = $('#rewardPenalties input[name=executorName]').val();
			var reason = $('#rewardPenalties input[name=reason]').val();
			var endTimeStr = $('#rewardPenalties input[name=workTimeEndStr]').val();
			var type = $('#rewardPenalties select[name=type]').val();
			$('#rewardPenaltiesdg').datagrid({
				url:'../../personnel/selectPunishRecord.do?getMs='+getMS(),
				method:"post",
				queryParams: {
					userName:userName,
					departmentName:departmentName,
					invoiceNumber:invoiceNumber,
					dateStr:dateStr,
					endTimeStr:endTimeStr,
					type:type,
					executorName:executorName,
					reason:reason
				},
			});
			rewardPenaltiesExcel = [
			             {name:'userName',value:userName},
			             {name:'invoiceNumber',value:invoiceNumber},
			             {name:'departmentName',value:departmentName},
			             {name:'dateStr',value:dateStr},
			             {name:'endTimeStr',value:endTimeStr},
			             {name:'type',value:type},
			             {name:'reason',value:reason},
			             {name:'executorName',value:executorName}
			          	];
		}
	})
/*********************添加奖惩信息******************************/
	$('#rewardPenalties .maintop .add').click(function(){
		$("#rewardPenalties .savepunishment").css("display","block");
	})
	$('#rewardPenalties .popups .savepunishment .chooseUser').click(function(){
		chooseUser();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#rewardPenalties .popups .savepunishment input[name=peopleName]').val(selectUser[0].userName);
	    	$('#rewardPenalties .popups .savepunishment input[name=userName]').val(selectUser[0].userId);
	    	$('#rewardPenalties .popups .savepunishment input[name=departmentName]').val(selectUser[0].departmentName);
	    })
	});
	$('#rewardPenalties .popups .updatepunishment .chooseUser').click(function(){
		chooseUser();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#rewardPenalties .popups .updatepunishment input[name=peopleName]').val(selectUser[0].userName);
	    	$('#rewardPenalties .popups .updatepunishment input[name=departmentName]').val(selectUser[0].departmentName);
	    })
	});
	
	$('#rewardPenalties .popups .savepunishment .chooseExecutor').click(function(){
		chooseUsers();
	    $('#chooseUsers .confirm').click(function(){
	    	$('#chooseUsers').css('display','none');
	    	selectUser = $('#chooseUsers .popuparea .user').datagrid('getSelections');
	    	$('#rewardPenalties .popups .savepunishment input[name=executor]').val(selectUser[0].userName);
	    	$('#rewardPenalties .popups .savepunishment input[name=executorName]').val(selectUser[0].userName);
	    })
	});
	$('#rewardPenalties .popups .savepunishment .chooseExecutor1').click(function(){
		chooseUser();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#rewardPenalties .popups .savepunishment input[name=executor1]').val(selectUser[0].userName);
	    	$('#rewardPenalties .popups .savepunishment input[name=executorName1]').val(selectUser[0].userName);
	    })
	});
	$('#rewardPenalties .popups .updatepunishment .chooseExecutor1').click(function(){
		chooseUser();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#rewardPenalties .popups .updatepunishment input[name=executor1]').val(selectUser[0].userName);
	    	$('#rewardPenalties .popups .updatepunishment input[name=executorName1]').val(selectUser[0].userName);
	    })
	});
	$('#rewardPenalties .popups .updatepunishment1 .chooseExecutor1').click(function(){
		chooseUser();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#rewardPenalties .popups .updatepunishment1 input[name=executor1]').val(selectUser[0].userName);
	    	$('#rewardPenalties .popups .updatepunishment1 input[name=executorName1]').val(selectUser[0].userName);
	    })
	});
	$('#rewardPenalties .savepunishment .confirm').click(function(){
		if($("input[name='btn']:checked").attr("data-type")=="inter"){
			var amount = $('#rewardPenalties .savepunishment .amount').val();
			var reason = $('#rewardPenalties .savepunishment .reason').val();
			var dateStr = $('#rewardPenalties .savepunishment input[name=date]').val();
			var userId = $('#rewardPenalties .savepunishment input[name=userName]').val();
			var userName = $('#rewardPenalties .savepunishment input[name=peopleName]').val();
			var text = $('#rewardPenalties .savepunishment .text').val();
			var executorName = $('#rewardPenalties .savepunishment input[name=executorName]').val();
			var departmentName = $('#rewardPenalties .savepunishment input[name=departmentName]').val();
			if(userName ==''|| userName == null){			
				windowControl("员工名称不能为空");
			}else if(reason ==''|| reason == null){			
				windowControl("奖惩原因不能为空");
			}else if(dateStr ==''||dateStr == null){
				windowControl("时间不能为空");
			}else if(amount ==''||amount == null){
				windowControl("金额不能为空");
			}else{
				$.ajax({
					data:{
						userName:userName,
						userId:userId,
						dateStr:dateStr,
						reason:reason,
						amount:amount,
						executorName:executorName,
						departmentName:departmentName,
						text:text
					},
					method:"post",
					url:"../../personnel/addPunishRecord.do?getMs="+getMS(),
					success: function(data){
						if(data == 200){
							$("#rewardPenalties .savepunishment").css('display','none');
							$('#rewardPenalties .savepunishment .popuparea input[type=text]').val(null);
							$('#rewardPenalties .savepunishment .popuparea select').val(null);
							$('#rewardPenalties .savepunishment .popuparea textarea').val(null);
							$('#rewardPenaltiesdg').datagrid({
								url:'../../personnel/selectPunishRecord.do?getMs='+getMS(),
							});
							windowControl('保存奖惩信息成功');
						}else{
							windowControl('保存奖惩信息失败');
						}
						
					},
					error:function(){
				    	windowControl("请求失败!");
				    }
				})	
			}
		}else if($("input[name='btn']:checked").attr("data-type")=="out"){
			var amountOut = $('#rewardPenalties .savepunishment .amountOut').val();
			var reasonOut = $('#rewardPenalties .savepunishment .reasonOut').val();
			var dateStrOut = $('#rewardPenalties .savepunishment input[name=dateOut]').val();
			var userNameOut = $('#rewardPenalties .savepunishment input[name=userNameOut]').val();
			var invoiceNumber = $('#rewardPenalties .savepunishment .invoiceNumber').val();
			var text = $('#rewardPenalties .savepunishment .text1').val();
			var executorName = $('#rewardPenalties .savepunishment input[name=executorName1]').val();
			if(invoiceNumber ==''|| invoiceNumber == null){			
				windowControl("发票号不能为空");
			}else if(reasonOut ==''|| reasonOut == null){			
				windowControl("奖惩原因不能为空");
			}else if(dateStrOut ==''||dateStrOut == null){
				windowControl("时间不能为空");
			}else if(amountOut ==''||amountOut == null){
				windowControl("金额不能为空");
			}else{
				$.ajax({
					data:{
						userName:userNameOut,
						dateStr:dateStrOut,
						reason:reasonOut,
						amount:amountOut,
						invoiceNumber:invoiceNumber,
						executorName:executorName,
						text:text
					},
					method:"post",
					url:"../../personnel/addPunishRecord.do?getMs="+getMS(),
					success: function(data){
						if(data == 200){
							$("#rewardPenalties .savepunishment").css('display','none');
							$('#rewardPenalties .savepunishment .popuparea input[type=text]').val(null);
							$('#rewardPenalties .savepunishment .popuparea select').val(null);
							$('#rewardPenalties .savepunishment .popuparea textarea').val(null);
							$('#rewardPenaltiesdg').datagrid({
								url:'../../personnel/selectPunishRecord.do?getMs='+getMS(),
							});
							windowControl('保存奖惩信息成功');
						}else{
							windowControl('保存奖惩信息失败');
						}
						
					},
					error:function(){
				    	windowControl("请求失败!");
				    }
				})	
			}
		}
		
	});	
	
})
/*********************删除奖惩信息*********************/
function deletePunish(id){
	ui.confirm('确定要删除这条奖惩信息？',function(z){
		if(z){
		var punishRecordId=id;
			$.ajax({
				url:'../../personnel/updatePunishRecord.do?getMs='+getMS(),
				type:'post',
				data:{punishRecordId:punishRecordId,aliveFlag:'0'},
				success:function(data){
					if(data == '200'){
						windowControl('删除奖惩信息成功');
						$("#rewardPenalties #rewardPenaltiesdg").datagrid("reload");
					}else{
						windowControl('删除奖惩信息失败');
					}
				},
				error:function(){
					windowControl("服务器未响应!");
				}
			});
		}
	},false);
}
/*********************修改奖惩信息*********************/
function updatePunish(id,type){
	if(type == '1'){
		$("#rewardPenalties .updatepunishment").css("display","block");
		$.ajax({
			data:{punishRecordId:id
			},
			method:"post",
			url:"../../personnel/selectPunishRecord.do?getMs="+getMS(),
			success: function(data){
				var data = eval('(' + data + ')').rows[0];
				$("#rewardPenalties .updatepunishment input[name=peopleName]").val(data.userName);
				$("#rewardPenalties .updatepunishment input[name=dateOut]").val(data.dateStr);
				$("#rewardPenalties .updatepunishment .reasonOut").val(data.reason);
				$("#rewardPenalties .updatepunishment .amount").val(data.amount);
				$("#rewardPenalties .updatepunishment input[name=executor1]").val(data.executorName);
				$("#rewardPenalties .updatepunishment .text").val(data.text);
			},
			error:function(){
		    	windowControl("服务器未响应!");
		    }
		});
		$('#rewardPenalties .updatepunishment .confirm').unbind('click');
		$('#rewardPenalties .updatepunishment .confirm').click(function(){
			var amount = $('#rewardPenalties .updatepunishment .amount').val();
			var reason = $('#rewardPenalties .updatepunishment .reasonOut').val();
			var dateStr = $('#rewardPenalties .updatepunishment input[name=dateOut]').val();
			var userName = $('#rewardPenalties .updatepunishment input[name=peopleName]').val();
			var text = $('#rewardPenalties .updatepunishment .text').val();
			var executorName = $('#rewardPenalties .updatepunishment input[name=executor1]').val();
			var departmentName = $('#rewardPenalties .updatepunishment input[name=departmentName]').val();
			$.ajax({
				data:{
					punishRecordId:id,
					reason:reason,
					dateStr:dateStr,
					userName:userName,
					text:text,
					amount:amount,
					executorName:executorName,
					departmentName:departmentName
				},
				method:"post",
				url:"../../personnel/updatePunishRecord.do?getMs="+getMS(),
				success: function(data){
					if(data == 200){
						$("#rewardPenalties .updatepunishment").css('display','none');
						$('#rewardPenalties .updatepunishment .popuparea input[type=text]').val(null);
						$('#rewardPenaltiesdg').datagrid({
							url:'../../personnel/selectPunishRecord.do?getMs='+getMS(),
						});
						windowControl('修改奖惩信息成功');
					}else{
						windowControl('修改奖惩信息失败');
					}
				},
				error:function(){
			    	windowControl("服务器未响应!");
			    }
			});		
		});	
	}else if(type == '2'){
		$("#rewardPenalties .updatepunishment1").css("display","block");
		$.ajax({
			data:{punishRecordId:id
			},
			method:"post",
			url:"../../personnel/selectPunishRecord.do?getMs="+getMS(),
			success: function(data){
				var data = eval('(' + data + ')').rows[0];
				console.log(data);
				$("#rewardPenalties .updatepunishment1 .invoiceNumber").val(data.invoiceNumber);
				$("#rewardPenalties .updatepunishment1 input[name=dateOut]").val(data.dateStr);
				$("#rewardPenalties .updatepunishment1 .reasonOut").val(data.reason);
				$("#rewardPenalties .updatepunishment1 .amount").val(data.amount);
				$("#rewardPenalties .updatepunishment1 input[name=executor1]").val(data.executorName);
				$("#rewardPenalties .updatepunishment1 .text").val(data.text);
			},
			error:function(){
		    	windowControl("服务器未响应!");
		    }
		});
		$('#rewardPenalties .updatepunishment1 .confirm').unbind('click');
		$('#rewardPenalties .updatepunishment1 .confirm').click(function(){
			var invoiceNumber = $('#rewardPenalties .updatepunishment1 .invoiceNumber').val();
			var amount = $('#rewardPenalties .updatepunishment1 .amount').val();
			var reason = $('#rewardPenalties .updatepunishment1 .reasonOut').val();
			var dateStr = $('#rewardPenalties .updatepunishment1 input[name=dateOut]').val();
			var text = $('#rewardPenalties .updatepunishment1 .text').val();
			var executorName = $('#rewardPenalties .updatepunishment1 input[name=executor1]').val();
			$.ajax({
				data:{
					invoiceNumber:invoiceNumber,
					punishRecordId:id,
					reason:reason,
					dateStr:dateStr,
					text:text,
					amount:amount,
					executorName:executorName
				},
				method:"post",
				url:"../../personnel/updatePunishRecord.do?getMs="+getMS(),
				success: function(data){
					if(data == 200){
						$("#rewardPenalties .updatepunishment1").css('display','none');
						$('#rewardPenalties .updatepunishment1 .popuparea input[type=text]').val(null);
						$('#rewardPenaltiesdg').datagrid({
							url:'../../personnel/selectPunishRecord.do?getMs='+getMS(),
						});
						windowControl('修改奖惩信息成功');
					}else{
						windowControl('修改奖惩信息失败');
					}
				},
				error:function(){
			    	windowControl("服务器未响应!");
			    }
			});		
		});
	}
}
