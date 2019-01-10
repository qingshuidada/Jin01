$(function(){	
	$('#officeGoodsIn #officeGoodsIndg').css('height',$('#loadarea').height()-64 + 'px');
	//点击添加入库单事件
	$('#officeGoodsIn .maintop .addIn').click(function(){
		$('#officeGoodsIn .popups .addIn').show();
		$('#officeGoodsIn .popups .addIn input[name=stockNo]').removeAttr('buyid');
		$('#officeGoodsIn .popups .addIn input[name=supplies]').removeAttr('suppliesid');
		$('#officeGoodsIn .popups .addIn input[name=buyer]').removeAttr('userid');
		$('#officeGoodsIn .popups .addIn .popuparea input').not('.button').val(null);
		$('#officeGoodsIn .popups .addIn .popuparea select').val(null);
	})
	//添加办公用品
	$('#officeGoodsIn .popups .addIn input[name=suppliesSelect]').click(function(){
		chooseSupplies()
		$('#chooseSupplies .confirm').unbind();
	    $('#chooseSupplies .confirm').click(function(){
	    	$('#chooseSupplies').css('display','none');
	    	var chooseSupplies = $('#chooseSupplies .popuparea .supplies').datagrid('getSelections');
	    	if(chooseSupplies.length == 0){
	    		$('#officeGoodsIn .popups .addIn input[name=supplies]').val(null);
		    	$('#officeGoodsIn .popups .addIn input[name=supplies]').attr('suppliesid',null);
	    	}else{
	    		$('#officeGoodsIn .popups .addIn input[name=supplies]').val(chooseSupplies[0].suppliesName);
		    	$('#officeGoodsIn .popups .addIn input[name=supplies]').attr('suppliesid',chooseSupplies[0].suppliesId);	
	    	}
	    })
	})
	//添加购买人
	$('#officeGoodsIn .popups .addIn input[name=buyerSelect]').click(function(){
		chooseUser();
		$('#chooseUser .confirm').unbind();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	var selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	if(selectUser.length == 0){
	    		$('#officeGoodsIn .popups .addIn input[name=buyer]').val(null);
		    	$('#officeGoodsIn .popups .addIn input[name=buyer]').attr('userid',null);
	    	}else{
	    		$('#officeGoodsIn .popups .addIn input[name=buyer]').val(selectUser[0].userName);
		    	$('#officeGoodsIn .popups .addIn input[name=buyer]').attr('userid',selectUser[0].userId);
	    	}
	    })
	})
	//系统自动生成编号
	$('#officeGoodsIn .popups .addIn .sysgen').click(function(){
		var myDate = new Date();
        var myYear = myDate.getFullYear();
        var myMonth = myDate.getMonth();
        var myHour= myDate.getHours();
        var myMinute = myDate.getMinutes();
        var mySecond = myDate.getSeconds();
        var stockNo = "MD"+myYear+myMonth+myHour+myMinute+mySecond;
        $('#officeGoodsIn  .popups .addIn input[name=stockNo]').val(stockNo);
	})
	//计算总金额
	$('#officeGoodsIn .popups .addIn input[name=price]').blur(function(){
		officeGoodsIncalculate();
	})
	$('#officeGoodsIn .popups .addIn input[name=inCounts]').blur(function(){
		officeGoodsIncalculate();
	})
	$('#officeGoodsIn .popups .addIn .comfirm').click(function(){
		var stockNo = $('#officeGoodsIn .popups .addIn input[name=stockNo]').val();//编号*
		var suppliesId = $('#officeGoodsIn .popups .addIn input[name=supplies]').attr('suppliesid');//商品名称*
		var providerName = $('#officeGoodsIn .popups .addIn input[name=providerName]').val();//供应商
		var price = $('#officeGoodsIn .popups .addIn input[name=price]').val();//价格*
		var inCounts = $('#officeGoodsIn .popups .addIn input[name=inCounts]').val();//总数*
		var amount = $('#officeGoodsIn .popups .addIn input[name=amount]').val();//总计
		var inDateStr = $('#officeGoodsIn .popups .addIn input[name=inDate]').val();//进货日期*
		var buyer = $('#officeGoodsIn .popups .addIn input[name=buyer]').attr('userid');//购买人*
		
		var buyId = $('#officeGoodsIn .popups .addIn input[name=stockNo]').attr('buyid');//ID
		
		if(stockNo == null || stockNo == ''){
			windowControl("请生成编号！")
			return ;
		}else if(suppliesId == null || suppliesId == ''){
			windowControl("请选择商品！")
			return ;
		}else if(price ==null || price == ''){
			windowControl("请输入价格！")
			return ;
		}else if(inCounts ==null || inCounts == ''){
			windowControl("请输入入库总数！")
			return ;
		}else if(inDateStr ==null || inDateStr == ''){
			windowControl("请选择进货日期！")
			return ;
		}else if(buyer ==null || buyer == ''){
			windowControl("请选择购买人！")
			return ;
		}
		var list = {
			stockNo:stockNo,
			suppliesId:suppliesId,
			providerName:providerName,
			price:price,
			inCounts:inCounts,
			amount:amount,
			inDateStr:inDateStr,
			buyer:buyer
		};		
		var url = '';
		if(buyId){
			list.buyId = buyId;
			url = '../../admin/updateInStock.do?getMs='+getMS();
		}else{			
			url = '../../admin/addInStock.do?getMs='+getMS();
		}
		$.ajax({
			url:url,
			data:list,
			type:'post',
			success:function(data){
				if(data == 200){
					windowControl("操作成功！")
					$('#officeGoodsIndg').datagrid("reload");
				}else{
					windowControl("操作失败！")
				}	
			},
			error:function(){
				windowControl("服务器未响应");
			}
		})
		$('#officeGoodsIn .popups .addIn').hide();
	})
	
	//产生数据网格
	$('#officeGoodsIndg').datagrid({
		url:'../../admin/selectInStock.do?getMs='+getMS(),
		singleSelect:true,
		pagination:true,
		toolbar:"#officeGoodsIn .invitetop",
		method:"post",
		columns:[[
			{
				field:'stockNo',
				title:'入库单号',
				width:120,
				align:"center"
			},
			{
				field:'suppliesName',
				title:'商品名称',
				width:100,
				align:"center"
			},
			{
				field:'providerName',
				title:'供应商',
				width:100,
				align:"center"
			},
			{
				field:'price',
				title:'价格',
				width:100,
				align:"center"
			},
			{
				field:'inCounts',
				title:'入库数量',
				width:100,
				align:"center"
			},
			{
				field:'amount',
				title:'总额',
				width:100,
				align:"center"
			},
			{
				field:'inDateStr',
				title:'入库日期',
				width:100,
				align:"center"
			},
			{
				field:'userName',
				title:'购买人',
				width:100,
				align:"center"
			},
			{
				field:"_opera",
				title:"操作",
				width:60,
				align:"center",
				formatter:function(value,row,index){
					var opera = '';
					var buyId = "'" + row.buyId + "'";
					var stockNo = "'" + row.stockNo + "'";
					var suppliesId = "'" + row.suppliesId + "'";
					var suppliesName = "'" + row.suppliesName + "'";
					var providerName = "'" + row.providerName + "'";
					var price = "'" + row.price + "'";
					var inCounts = "'" + row.inCounts + "'";
					var amount = "'" + row.amount + "'";
					var inDateStr = "'" + row.inDateStr + "'";
					var buyer = "'" + row.buyer + "'";
					var userName = "'" + row.userName + "'";
					opera = '<div class="imgBox">'+
							'<span style="float:left;" class="small-button edit" title="修改" onclick="officeGoodsInUpdate('+ buyId +
							','+ stockNo +
							','+ suppliesId +
							','+ suppliesName +
							','+ providerName +
							','+ price +
							','+ inCounts +
							','+ amount +
							','+ inDateStr +
							','+ buyer +
							','+ userName +')"></span>'+
							'<span style="float:left;" class="small-button delete" title="删除" onclick="officeGoodsInDelete('+ buyId +')"></span>'+
							'</div>';
					return opera;
				}
			}
	    ]]
	});
	//查询
	$('#officeGoodsIn .invitetop .select').click(function(){
		var suppliesName = $('#officeGoodsIn .invitetop .suppliesName').val();
		var providerName = $('#officeGoodsIn .invitetop .providerName').val();
		var buyer = $('#officeGoodsIn .invitetop .buyer').val();
		$('#officeGoodsIndg').datagrid({					
			queryParams: {
				suppliesName:suppliesName,
				providerName:providerName,
				userName:buyer
			}
		});
		
	});
	
})
//修改入库单
function officeGoodsInUpdate(buyerId,stockNo,suppliesId,suppliesName,providerName,price,inCounts,amount,inDateStr,buyer,userName){
	$('#officeGoodsIn .popups .addIn').show();
	$('#officeGoodsIn .popups .addIn input[name=stockNo]').val(stockNo);//编号*
	$('#officeGoodsIn .popups .addIn input[name=supplies]').attr('suppliesid',suppliesId);//商品名称*
	$('#officeGoodsIn .popups .addIn input[name=supplies]').val(suppliesName)
	$('#officeGoodsIn .popups .addIn input[name=providerName]').val(providerName);//供应商
	$('#officeGoodsIn .popups .addIn input[name=price]').val(price);//价格*
	$('#officeGoodsIn .popups .addIn input[name=inCounts]').val(inCounts);//总数*
	$('#officeGoodsIn .popups .addIn input[name=amount]').val(amount);//总计
	$('#officeGoodsIn .popups .addIn input[name=inDate]').val(inDateStr);//进货日期*
	$('#officeGoodsIn .popups .addIn input[name=buyer]').attr('userid',buyer);//购买人*
	$('#officeGoodsIn .popups .addIn input[name=buyer]').val(userName)
	$('#officeGoodsIn .popups .addIn input[name=stockNo]').attr('buyid',buyerId);//ID
}
//删除入库单
function officeGoodsInDelete(buyId){
	ui.confirm('确定删除该入库单吗？',function(z){
		if(z){
			$.ajax({
				url:'../../admin/deleteInStock.do?getMs='+getMS(),
				data:{
					buyId:buyId
				},
				type:'post',
				success:function(data){
					if(data == 200){
						windowControl("删除成功！")
						$('#officeGoodsIndg').datagrid("reload");
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
//计算
function officeGoodsIncalculate(){
	var price = $('#officeGoodsIn .popups .addIn input[name=price]').val();//价格*
	var inCounts = $('#officeGoodsIn .popups .addIn input[name=inCounts]').val();//总数*
	if(price && inCounts){
		var amount = Number(price) * Number(inCounts);
		$('#officeGoodsIn .popups .addIn input[name=amount]').val(amount);
	}
}



