$(function(){	
	$('#carMaintain #carMaintaindg').css('height',$('#loadarea').height()-64 + 'px');
	//点击添加维修单事件
	$('#carMaintain .maintop .addRepair').click(function(){
		$('#carMaintain .popups .addRepair').show();
		$('#carMaintain .popups .addRepair input[name=carNo]').removeAttr('repairid');
		$('#carMaintain .popups .addRepair input[name=carNo]').removeAttr('carid');
		$('#carMaintain .popups .addRepair input[name=carNo]').removeAttr('userid');
		$('#carMaintain .popups .addRepair .popuparea input').not('.button').val(null);
		$('#carMaintain .popups .addRepair .popuparea select').val(null);
	})
	//添加车牌号
	$('#carMaintain .popups .addRepair input[name=selectCar]').click(function(){
		chooseCar()
		$('#chooseCar .confirm').unbind();
	    $('#chooseCar .confirm').click(function(){
	    	$('#chooseCar').css('display','none');
	    	var chooseCar = $('#chooseCar .popuparea .car').datagrid('getSelections');
	    	if(chooseCar.length == 0){
	    		$('#carMaintain .popups .addRepair input[name=carNo]').val(null);
		    	$('#carMaintain .popups .addRepair input[name=carNo]').attr('carid',null);
	    	}else{
	    		$('#carMaintain .popups .addRepair input[name=carNo]').val(chooseCar[0].carNo);
		    	$('#carMaintain .popups .addRepair input[name=carNo]').attr('carid',chooseCar[0].carId);	
	    	}
	    })
	})
	//添加经办人
	$('#carMaintain .popups .addRepair input[name=selectExecutant]').click(function(){
		chooseUser();
		$('#chooseUser .confirm').unbind();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	var selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	if(selectUser.length == 0){
	    		$('#carMaintain .popups .addRepair input[name=executant]').val(null);
		    	$('#carMaintain .popups .addRepair input[name=executant]').attr('userid',null);
	    	}else{
	    		$('#carMaintain .popups .addRepair input[name=executant]').val(selectUser[0].userName);
		    	$('#carMaintain .popups .addRepair input[name=executant]').attr('userid',selectUser[0].userId);
	    	}
	    })
	})
	$('#carMaintain .popups .addRepair .comfirm').click(function(){
		var repairId = $('#carMaintain .popups .addRepair input[name=carNo]').attr('repairid');//ID
		var carId = $('#carMaintain .popups .addRepair input[name=carNo]').attr('carid');//车牌号*
		var repairDate = $('#carMaintain .popups .addRepair input[name=repairDate]').val();//维护日期*
		var executant = $('#carMaintain .popups .addRepair input[name=executant]').attr('userid');//经办人*
		var repairType = $('#carMaintain .popups .addRepair select[name=repairType]').val();//维修类型*
		var fee = $('#carMaintain .popups .addRepair input[name=fee]').val();//费用
		var reason = $('#carMaintain .popups .addRepair input[name=reason]').val();//维护原因*
		var notes = $('#carMaintain .popups .addRepair input[name=notes]').val();//备注
		
		if(carId == null || carId == ''){
			windowControl("请选择车辆！")
			return ;
		}else if(repairDate == null || repairDate == ''){
			windowControl("请选择维护日期！")
			return ;
		}else if(executant ==null || executant == ''){
			windowControl("请选择经办人！")
			return ;
		}else if(repairType ==null || repairType == ''){
			windowControl("请选择维修类型！")
			return ;
		}else if(reason ==null || reason == ''){
			windowControl("请填写维护原因！")
			return ;
		}
		var list = {
				carId:carId,
				repairDateStr:repairDate,
				executant:executant,
				repairType:repairType,
				fee:fee,
				reason:reason,
				notes:notes
		};		
		var url = '';
		if(repairId){
			list.repairId = repairId;
			url = '../../admin/updateCarRepairbill.do?getMs='+getMS();
		}else{			
			url = '../../admin/addCarRepairbill.do?getMs='+getMS();
		}
		$.ajax({
			url:url,
			data:list,
			type:'post',
			success:function(data){
				if(data == 200){
					windowControl("操作成功！")
					$('#carMaintaindg').datagrid("reload");
				}else{
					windowControl("操作失败！")
				}	
			},
			error:function(){
				windowControl("服务器未响应");
			}
		})
		$('#carMaintain .popups .addRepair').hide();
	})
	
	//产生数据网格
	$('#carMaintaindg').datagrid({
		url:'../../admin/selectCarRepairbill.do?getMs='+getMS(),
		singleSelect:true,
		pagination:true,
		toolbar:"#carMaintain .invitetop",
		method:"post",
		columns:[[
			{
				field:'carNo',
				title:'车牌号码',
				width:100,
				align:"center"
			},
			{
				field:'repairDateStr',
				title:'维护日期',
				width:100,
				align:"center"
			},
			{
				field:'reason',
				title:'维护原因',
				width:100,
				align:"center"
			},
			{
				field:'userName',
				title:'经办人',
				width:100,
				align:"center"
			},
			{
				field:'notes',
				title:'备注',
				width:100,
				align:"center"
			},
			{
				field:'repairType',
				title:'维修类型',
				width:100,
				align:"center"
			},
			{
				field:'fee',
				title:'费用',
				width:80,
				align:"center"
			},
			{
				field:"_opera",
				title:"操作",
				width:60,
				align:"center",
				formatter:function(value,row,index){
					var opera = '';
					var repairId = "'" + row.repairId + "'";
					var carNo = "'" + row.carNo + "'";
					var carId = "'" + row.carId + "'";
					var repairDate = "'" + row.repairDateStr + "'";
					var userName = "'" + row.userName + "'";
					var executant = "'" + row.executant + "'";
					var repairType = "'" + row.repairType + "'";
					var fee = "'" + row.fee + "'";
					var reason = "'" + row.reason + "'";
					var notes = "'" + row.notes + "'";
					opera = '<div class="imgBox">'+
							'<span style="float:left;" class="small-button edit" title="修改" onclick="carMaintainUpdate('+ repairId +
							','+ carNo +
							','+ carId +
							','+ repairDate +
							','+ userName +
							','+ executant +
							','+ repairType +
							','+ fee +
							','+ reason +
							','+ notes +')"></span>'+
							'<span style="float:left;" class="small-button delete" title="删除" onclick="carMaintainDelete('+ repairId +')"></span>'+
							'</div>';
					return opera;
				}
			}
	    ]]
	});
	//查询
	$('#carMaintain .invitetop .select').click(function(){
		var carNo = $('#carMaintain .invitetop .carNo').val();
		var repairType = $('#carMaintain .invitetop .repairType').val();
		$('#carMaintaindg').datagrid({					
			queryParams: {
				carNo:carNo,
				repairType:repairType
			}
		});
		
	});
	
})
//修改维修单
function carMaintainUpdate(repairId,carNo,carId,repairDate,userName,executant,repairType,fee,reason,notes){
	$('#carMaintain .popups .addRepair').show();
	$('#carMaintain .popups .addRepair input[name=carNo]').attr('repairid',repairId);//ID
	$('#carMaintain .popups .addRepair input[name=carNo]').val(carNo);//车牌号*
	$('#carMaintain .popups .addRepair input[name=carNo]').attr('carid',carId);
	$('#carMaintain .popups .addRepair input[name=repairDate]').val(repairDate);//维护日期*
	$('#carMaintain .popups .addRepair input[name=executant]').val(userName);//经办人*
	$('#carMaintain .popups .addRepair input[name=executant]').attr('userid',executant);
	$('#carMaintain .popups .addRepair select[name=repairType]').val(repairType);//维修类型*
	$('#carMaintain .popups .addRepair input[name=fee]').val(fee);//费用
	$('#carMaintain .popups .addRepair input[name=reason]').val(reason);//维护原因*
	$('#carMaintain .popups .addRepair input[name=notes]').val(notes);//备注
}
//删除维修单
function carMaintainDelete(repairId){
	ui.confirm('确定删除该维修单吗？',function(z){
		if(z){
			$.ajax({
				url:'../../admin/deleteCarRepairbill.do?getMs='+getMS(),
				data:{
					repairId:repairId
				},
				type:'post',
				success:function(data){
					if(data == 200){
						windowControl("删除成功！")
						$('#carMaintaindg').datagrid("reload");
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



