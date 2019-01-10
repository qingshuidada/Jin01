$(function(){	
	$('#carApplyFor #carApplyFordg').css('height',$('#loadarea').height()-64 + 'px');
	//点击添加维修单事件
	$('#carApplyFor .maintop .addApply').click(function(){
		$('#carApplyFor .popups .addApply').show();
		$('#carApplyFor .popups .addApply input[name=userFullName]').removeAttr('userid');
		$('#carApplyFor .popups .addApply input[name=proposer]').removeAttr('userid');
		$('#carApplyFor .popups .addApply .popuparea input').not('.button').val(null);		
	})
	//添加车牌号
	$('#carApplyFor .popups .addApply input[name=selectCar]').click(function(){
		chooseCar()
		$('#chooseCar .confirm').unbind();
	    $('#chooseCar .confirm').click(function(){
	    	$('#chooseCar').css('display','none');
	    	var chooseCar = $('#chooseCar .popuparea .car').datagrid('getSelections');
	    	if(chooseCar.length == 0){
	    		$('#carApplyFor .popups .addApply input[name=carNo]').val(null);
		    	$('#carApplyFor .popups .addApply input[name=carNo]').attr('carid',null);
	    	}else{
	    		$('#carApplyFor .popups .addApply input[name=carNo]').val(chooseCar[0].carNo);
		    	$('#carApplyFor .popups .addApply input[name=carNo]').attr('carid',chooseCar[0].carId);	
	    	}
	    })
	})
	//选择部门
	$('#carApplyFor .popups .addApply input[name=selectDepartment]').click(function(){
		chooseDept();
		$('#chooseDept .confirm').unbind();
	    $('#chooseDept .confirm').click(function(){
	    	$('#chooseDept').css('display','none');
	    	var chooseDept = $('#chooseDept .dept').tree('getSelected')
	    	if(!chooseDept){
	    		$('#carApplyFor .popups .addApply input[name=department]').val(null);
	    	}else{
	    		$('#carApplyFor .popups .addApply input[name=department]').val(chooseDept.text);
	    	}
	    })
	})
	//添加用车人
	$('#carApplyFor .popups .addApply input[name=selectUserFullName]').click(function(){
		chooseUser();
		$('#chooseUser .confirm').unbind();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	var selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	if(selectUser.length == 0){
	    		$('#carApplyFor .popups .addApply input[name=userFullName]').val(null);
		    	$('#carApplyFor .popups .addApply input[name=userFullName]').attr('userid',null);
	    	}else{
	    		$('#carApplyFor .popups .addApply input[name=userFullName]').val(selectUser[0].userName);
		    	$('#carApplyFor .popups .addApply input[name=userFullName]').attr('userid',selectUser[0].userId);
	    	}
	    })
	})
	//添加申请人
	$('#carApplyFor .popups .addApply input[name=selectProposer]').click(function(){
		chooseUser();
		$('#chooseUser .confirm').unbind();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	var selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	if(selectUser.length == 0){
	    		$('#carApplyFor .popups .addApply input[name=proposer]').val(null);
		    	$('#carApplyFor .popups .addApply input[name=proposer]').attr('userid',null);
	    	}else{
	    		$('#carApplyFor .popups .addApply input[name=proposer]').val(selectUser[0].userName);
		    	$('#carApplyFor .popups .addApply input[name=proposer]').attr('userid',selectUser[0].userId);
	    	}
	    })
	})
	$('#carApplyFor .popups .addApply .comfirm').click(function(){
		var carId = $('#carApplyFor .popups .addApply input[name=carNo]').attr('carid');//车牌号*
		var department = $('#carApplyFor .popups .addApply input[name=department]').val();//用车部门*
		var userFullName = $('#carApplyFor .popups .addApply input[name=userFullName]').val();//用车人*
		var proposer = $('#carApplyFor .popups .addApply input[name=proposer]').val();//申请人*
		var applyDate = $('#carApplyFor .popups .addApply input[name=applyDate]').val();//申请日期*
		var reason = $('#carApplyFor .popups .addApply input[name=reason]').val();//申请原因*
		var startTime = $('#carApplyFor .popups .addApply input[name=startTime]').val();//开始日期*
		var endTime = $('#carApplyFor .popups .addApply input[name=endTime]').val();//结束日期*
		var mileage = $('#carApplyFor .popups .addApply input[name=mileage]').val();//里程
		var oilUse = $('#carApplyFor .popups .addApply input[name=oilUse]').val();//油耗
		var notes = $('#carApplyFor .popups .addApply input[name=notes]').val();//备注
		
		if(carId == null || carId == ''){
			windowControl("请选择车辆！")
			return ;
		}else if(department == null || department == ''){
			windowControl("请选择用车部门！")
			return ;
		}else if(userFullName ==null || userFullName == ''){
			windowControl("请选择用车人！")
			return ;
		}else if(proposer ==null || proposer == ''){
			windowControl("请选择申请人！")
			return ;
		}else if(applyDate ==null || applyDate == ''){
			windowControl("请选择申请日期！")
			return ;
		}else if(reason ==null || reason == ''){
			windowControl("请填写申请原因！")
			return ;
		}else if(startTime ==null || startTime == ''){
			windowControl("请选择开始日期！")
			return ;
		}else if(endTime ==null || endTime == ''){
			windowControl("请选择结束日期！")
			return ;
		}
		$.ajax({
			url:'../../admin/addCarApplyNote.do?getMs='+getMS(),
			data:{
				carId:carId,
				department:department,
				userFullName:userFullName,
				proposer:proposer,
				applyDateStr:applyDate,
				reason:reason,
				startTimeStr:startTime,
				endTimeStr:endTime,
				mileage:mileage,
				oilUse:oilUse,
				notes:notes
			},
			type:'post',
			success:function(data){
				if(data == 200){
					windowControl("操作成功！")
					$('#carApplyFordg').datagrid("reload");
				}else{
					windowControl("操作失败！")
				}	
			},
			error:function(){
				windowControl("服务器未响应");
			}
		})
		$('#carApplyFor .popups .addApply').hide();
	})
	
	//产生数据网格
	$('#carApplyFordg').datagrid({
		url:'../../admin/selectCarApplyNote.do?getMs='+getMS(),
		singleSelect:true,
		pagination:true,
		toolbar:"#carApplyFor .invitetop",
		method:"post",
		columns:[[
			{
				field:'carNo',
				title:'车牌号码',
				width:100,
				align:"center"
			},
			{
				field:'department',
				title:'用车部门',
				width:100,
				align:"center"
			},
			{
				field:'userFullName',
				title:'用车人',
				width:100,
				align:"center"
			},
			{
				field:'applyDateStr',
				title:'申请日期',
				width:100,
				align:"center"
			},
			{
				field:'reason',
				title:'申请理由',
				width:100,
				align:"center"
			},
			{
				field:'startTimeStr',
				title:'开始时间',
				width:100,
				align:"center"
			},
			{
				field:'endTimeStr',
				title:'结束时间',
				width:100,
				align:"center"
			},
			{
				field:'proposer',
				title:'申请人',
				width:100,
				align:"center"
			},
			{
				field:'approvalStatus',
				title:'审批状态',
				width:100,
				align:"center",
				formatter:function(value,row,index){
					var status = '';
					if(value == 0){
						status = '审批中'
					}else if(value == 1){
						status = '审批通过'
					}else if(value == 2){
						status = '审批未通过'
					}
					return status;
				}
			},
			{
				field:"_opera",
				title:"操作",
				width:60,
				align:"center",
				formatter:function(value,row,index){
					var opera = '';
					var applyId = "'" + row.applyId + "'";					
					opera = '<div class="imgBox">'+						
							'<span style="float:left;" class="small-button delete" title="删除" onclick="carApplyForDelete('+ applyId +')"></span>'+
							'</div>';
					return opera;
				}
			}
	    ]]
	});
	//查询
	$('#carApplyFor .invitetop .select').click(function(){
		var carNo = $('#carApplyFor .invitetop .carNo').val();
		var approvalStatus = $('#carApplyFor .invitetop .approvalStatus').val();
		$('#carApplyFordg').datagrid({					
			queryParams: {
				carNo:carNo,
				approvalStatus:approvalStatus
			}
		});
		
	});
	
})
//删除申请单
function carApplyForDelete(applyId){
	ui.confirm('确定删除该申请单吗？',function(z){
		if(z){
			$.ajax({
				url:'../../admin/updateCarApplyNote.do?getMs='+getMS(),
				data:{
					applyId:applyId,
					aliveFlag:0
				},
				type:'post',
				success:function(data){
					if(data == 200){
						windowControl("删除成功！")
						$('#carApplyFordg').datagrid("reload");
					}else{
						windowControl("删除失败！")
					}	
				},
				error:function(){
					windowControl("服务器未响应");
				}
			})
		}
	})
	
}



