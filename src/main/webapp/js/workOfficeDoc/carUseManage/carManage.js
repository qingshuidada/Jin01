$(function(){	
	$('#carManage #carManagedg').css('height',$('#loadarea').height()-64 + 'px');
	//点击添加车辆事件
	$('#carManage .maintop .addCar').click(function(){
		$('#carManage .popups .addCar').show();
		$('#carManage .popups .addCar input[name=carNo]').removeAttr('carid');
		$('#carManage .popups .addCar .popuparea input').val(null);
		$('#carManage .popups .addCar .popuparea select').val(null);
	})
	$('#carManage .popups .addCar .comfirm').click(function(){
		var carId = $('#carManage .popups .addCar input[name=carNo]').attr('carid');
		var carNo = $('#carManage .popups .addCar input[name=carNo]').val();//车牌号*
		var carType = $('#carManage .popups .addCar input[name=carType]').val();//车辆类型*
		var engineNo = $('#carManage .popups .addCar input[name=engineNo]').val();//发动机号码
		var buyInsureTime = $('#carManage .popups .addCar input[name=buyInsureTime]').val();//保险买入时间
		var auditTime = $('#carManage .popups .addCar input[name=auditTime]').val();//年审时间
		var factoryModel = $('#carManage .popups .addCar input[name=factoryModel]').val();//厂牌型号*
		var driver = $('#carManage .popups .addCar input[name=driver]').val();//驾驶员*
		var buyDate = $('#carManage .popups .addCar input[name=buyDate]').val();//购置日期*
		var status = $('#carManage .popups .addCar select[name=status]').val();//当前状态*
		var notes = $('#carManage .popups .addCar input[name=notes]').val();//备注
		
		if(carNo == null || carNo == ''){
			windowControl("请填写车牌号！")
			return ;
		}else if(carType == null || carType == ''){
			windowControl("请填写车辆类型！")
			return ;
		}else if(factoryModel ==null || factoryModel == ''){
			windowControl("请填写厂牌号码！")
			return ;
		}else if(driver ==null || driver == ''){
			windowControl("请填写驾驶员！")
			return ;
		}else if(buyDate ==null || buyDate == ''){
			windowControl("请选择购置日期！")
			return ;
		}else if(status ==null || status == ''){
			windowControl("请选择当前状态！")
			return ;
		}
		var list = {
				carNo:carNo,
				carType:carType,
				engineNo:engineNo,
				buyInsureTimeStr:buyInsureTime,
				auditTimeStr:auditTime,
				factoryModel:factoryModel,
				driver:driver,
				buyDateStr:buyDate,
				status:status,
				notes:notes
		};		
		var url = '';
		if(carId){
			list.carId = carId;
			url = '../../admin/updateCarMessage.do?getMs='+getMS();
		}else{			
			url = '../../admin/addCarMessage.do?getMs='+getMS();
		}
		$.ajax({
			url:url,
			data:list,
			type:'post',
			success:function(data){
				if(data == 200){
					windowControl("操作成功！")
					$('#carManagedg').datagrid("reload");
				}else{
					windowControl("操作失败！")
				}	
			},
			error:function(){
				windowControl("服务器未响应");
			}
		})
		$('#carManage .popups .addCar').hide();
	})
	
	//产生数据网格
	$('#carManagedg').datagrid({
		url:'../../admin/selectCarMessage.do?getMs='+getMS(),
		singleSelect:true,
		pagination:true,
		toolbar:"#carManage .invitetop",
		method:"post",
		columns:[[
			{
				field:'carNo',
				title:'车牌号码',
				width:100,
				align:"center"
			},
			{
				field:'carType',
				title:'车辆类型',
				width:60,
				align:"center"
			},
			{
				field:'engineNo',
				title:'发动机型号',
				width:100,
				align:"center"
			},
			{
				field:'buyInsureTimeStr',
				title:'购买保险时间',
				width:90,
				align:"center"
			},
			{
				field:'auditTimeStr',
				title:'年审时间',
				width:80,
				align:"center"
			},
			{
				field:'factoryModel',
				title:'厂牌型号',
				width:100,
				align:"center"
			},
			{
				field:'driver',
				title:'驾驶员',
				width:60,
				align:"center"
			},
			{
				field:'buyDateStr',
				title:'购置日期',
				width:80,
				align:"center"
			},
			{
				field:'status',
				title:'当前状态',
				width:60,
				align:"center",
				formatter:function(value,row,index){
					var textHtml = '';
					if(value == 0){
						textHtml = '已报废'
					}else if(value == 1){
						textHtml = '可用'
					}else if(value == 2){
						textHtml = '维修中'
					}
					return textHtml;
				}
			},
			{
				field:"_opera",
				title:"操作",
				width:60,
				align:"center",
				formatter:function(value,row,index){
					var opera = '';
					var carId = "'" + row.carId + "'";
					var carNo = "'" + row.carNo + "'";
					var carType = "'" + row.carType + "'";
					var engineNo = "'" + row.engineNo + "'";
					var buyInsureTime = "'" + row.buyInsureTimeStr + "'";
					var auditTime = "'" + row.auditTimeStr + "'";
					var factoryModel = "'" + row.factoryModel + "'";
					var driver = "'" + row.driver + "'";
					var buyDate = "'" + row.buyDateStr + "'";
					var status = "'" + row.status + "'";
					var notes = "'" + row.notes + "'";
					opera = '<div class="imgBox">'+
							'<span style="float:left;" class="small-button edit" title="修改" onclick="carManageUpdate('+ carId +
							','+ carNo +
							','+ carType +
							','+ engineNo +
							','+ buyInsureTime +
							','+ auditTime +
							','+ factoryModel +
							','+ driver +
							','+ buyDate +
							','+ status +
							','+ notes +')"></span>'+
							'<span style="float:left;" class="small-button delete" title="删除" onclick="carManageDelete('+ carId +')"></span>'+
							'</div>';
					return opera;
				}
			}
	    ]]
	});
	//查询
	$('#carManage .invitetop .selectCar').click(function(){
		var carNo = $('#carManage .invitetop .carNo').val();
		var carType = $('#carManage .invitetop .carType').val();
		var status = $('#carManage .invitetop .status').val();
		$('#carManagedg').datagrid({					
			queryParams: {
				carNo:carNo,
				carType:carType,
				status:status
			}
		});
		
	});
	
})
//修改车辆信息
function carManageUpdate(carId,carNo,carType,engineNo,buyInsureTime,auditTime,factoryModel,driver,buyDate,status,notes){
	$('#carManage .popups .addCar').show();
	$('#carManage .popups .addCar input[name=carNo]').attr('carid',carId);//ID
	$('#carManage .popups .addCar input[name=carNo]').val(carNo);//车牌号*
	$('#carManage .popups .addCar input[name=carType]').val(carType);//车辆类型*
	$('#carManage .popups .addCar input[name=engineNo]').val(engineNo);//发动机号码
	$('#carManage .popups .addCar input[name=buyInsureTime]').val(buyInsureTime);//保险买入时间
	$('#carManage .popups .addCar input[name=auditTime]').val(auditTime);//年审时间
	$('#carManage .popups .addCar input[name=factoryModel]').val(factoryModel);//厂牌型号*
	$('#carManage .popups .addCar input[name=driver]').val(driver);//驾驶员*
	$('#carManage .popups .addCar input[name=buyDate]').val(buyDate);//购置日期*
	$('#carManage .popups .addCar select[name=status]').val(status);//当前状态*
	$('#carManage .popups .addCar input[name=notes]').val(notes);//备注
}
//删除车辆
function carManageDelete(carId){
	ui.confirm('确定删除该车辆吗？',function(z){
		if(z){
			$.ajax({
				url:'../../admin/deleteCarMessage.do?getMs='+getMS(),
				data:{
					carId:carId
				},
				type:'post',
				success:function(data){
					if(data == 200){
						windowControl("删除成功！")
						$('#carManagedg').datagrid("reload");
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



