var noInvoiceCollectExcel = [];
$(function(){	
	$('#noInvoiceCollect #noInvoiceCollectdg').css('height',$('#loadarea').height()-64 + 'px');
	/**********供应商*********/
	$('#noInvoiceCollect .invitetop .chooseProvider').click(function(){
		chooseProvider();
		$('#chooseProvider .confirm').unbind('click');
		$('#chooseProvider .confirm').click(function(){
			$('#chooseProvider').css('display','none');
			selectProvider = $('#chooseProvider .popuparea .provider').datagrid('getSelections');
			if(selectProvider.length == 0){
				$('#noInvoiceCollect .invitetop input[name=providerCode]').val(null);
				$('#noInvoiceCollect .invitetop input[name=providerName]').val(null);
			}else{
				$('#noInvoiceCollect .invitetop input[name=providerCode]').val(selectProvider[0].providerCode);
				$('#noInvoiceCollect .invitetop input[name=providerName]').val(selectProvider[0].providerName);
			}			
		});
	});
	/*------汇总--------*/
	function addsumBarOut(id,data){
		$('#'+id).find('.sumBar').css({
			'width':$('#'+id).width()-2+'px',
		});
		var node = $('#repertoryouttg').tree('getSelected');
		var str = '';
		data = $.parseJSON(data).rows;
		if(data){
			str +='<span style="font-weight:800;margin-right:10px;">汇总</span>';
			str +='<span style="font-weight:800;">上期未核销金额：</span>';
			str +='<span>'+keepDecimals(data[0].currentNoWriteAmountTotal)+'</span>';
			str +='<span style="font-weight:800;">本期入库金额：</span>';
			str +='<span>'+keepDecimals(data[0].currentTaxAmountTotal)+'</span>';
			str +='<span style="font-weight:800;">本期核销金额：</span>';
			str +='<span>'+keepDecimals(data[0].currentWriteAmountTotal)+'</span>';
			str +='<span style="font-weight:800;">本期未核销金额：</span>';
			str +='<span>'+keepDecimals(data[0].previousNoWriteAmountTotal)+'</span>';
		}
		$('#'+id).find('.sumBar').html(str);
	}
	//产生数据网格
	$('#noInvoiceCollectdg').datagrid({		
		singleSelect:true,
		pagination:true,
		toolbar:"#noInvoiceCollect .invitetop",
		method:"post",
		onLoadSuccess:function(data){
			var providerName = $('#noInvoiceCollect .invitetop input[name=providerName]').val();
			var startTimeStr = $('#noInvoiceCollect .invitetop .startTimeStr').val();
			var endTimeStr = $('#noInvoiceCollect .invitetop .endTimeStr').val();			
			$.ajax({
				url:'../../invoice/gatherInvoiceAmount.do?getMs='+getMS(),
				data: {
					providerName:providerName,
					startTimeStr:startTimeStr + ' 00:00:00',
					endTimeStr:endTimeStr + ' 23:59:59',
					sumFlag:1
				},
				success:function(data){
					adjustsumBar('noInvoiceCollect');
					addsumBarOut('noInvoiceCollect',data);
				},
				error:function(err){
				}
			})
		},
		columns:[[			
			{
				field:'providerName',
				title:'供应商',
				width:120,
				align:"center"
			},
			{
				field:'previousNoWriteAmount',
				title:'上期未核销金额',
				width:150,
				align:"center"
				,formatter:function(value,row,index){
					return keepDecimals(value);
				}
			 },
			{
				field:'currentTaxAmount',
				title:'本期入库金额',
				width:150,
				align:"center"
				,formatter:function(value,row,index){
					return keepDecimals(value);
				}
			 },
			{
				field:'currentWriteAmount',
				title:'本期核销金额',
				width:150,
				align:"center"
				,formatter:function(value,row,index){
					return keepDecimals(value);
				}
			 },
			{
				field:'currentNoWriteAmount',
				title:'本期未核销金额',
				width:150,
				align:"center"
				,formatter:function(value,row,index){
					return keepDecimals(value);
				}
			 },
	    ]]
	});
	//显示隐藏汇总bar
	var controlFlag = true;
	$('#noInvoiceCollect .controlSumBar').click(function(){
		if($(this).val() == '隐藏' && controlFlag){
			controlFlag = false;
			$('#noInvoiceCollect .sumBar').animate({
				'bottom':'-=30px',
				'opacity':0,
			},500,function(){
				controlFlag = true;
				$('#noInvoiceCollect .sumBar').css('display','none');
				$('#noInvoiceCollect .controlSumBar').val('显示');
			});
		}else if($(this).val() == '显示' && controlFlag){
			controlFlag = false;
			$('#noInvoiceCollect .sumBar').css('display','block');
			$('#noInvoiceCollect .sumBar').animate({
				'bottom':'+=30px',
				'opacity':1,
			},500,function(){
				controlFlag = true;
				$('#noInvoiceCollect .controlSumBar').val('隐藏');
			});
		}
	});
	/*****************设置上下移span的title****************/
	$("#noInvoiceCollect .popups .writetoexcel .upset").attr("title","上移");
	$("#noInvoiceCollect .popups .writetoexcel .downset").attr("title","下移");
	
	/*****************导出到Excel点击弹窗******************/
	$('#noInvoiceCollect .write').click(function(){
		$('#noInvoiceCollect .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#noInvoiceCollect .popups .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'providerName',tableHeader:'供应商',date:false},
			         {propertyName:'previousNoWriteAmount',propertyType:"Double",tableHeader:'上期未核销金额',date:false},
			         {propertyName:'currentTaxAmount',propertyType:"Double",tableHeader:'本期入库金额',date:false},
			         {propertyName:'currentWriteAmount',propertyType:"Double",tableHeader:'本期核销金额',date:false},
			         {propertyName:'currentNoWriteAmount',propertyType:"Double",tableHeader:'本期未核销金额',date:false}
				 ]
		})
	})
	
	/*******************重置按钮点击事件***********************/
	$("#noInvoiceCollect .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#noInvoiceCollect .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#noInvoiceCollect .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#noInvoiceCollect .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#noInvoiceCollect .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#noInvoiceCollect .popups .writetoexcel"));
		
		var noInvoiceCollectExcel2 = [];
		for(var i = 0 ; i < noInvoiceCollectExcel.length ; i++){
			noInvoiceCollectExcel2.push(noInvoiceCollectExcel[i]);
		}
		noInvoiceCollectExcel2.push({
			name:'jsonString',value:jsonString
		})
		//提交导出excel所需要的参数
		excelplugin.submit({
			type:'post',
			array:noInvoiceCollectExcel2,
			action:'../../invoice/writeGatherInvoiceAmountToExcel.do?'
		})
	});
	
	//打印
	$('#noInvoiceCollect .print').click(function(){
		var providerName = $('#noInvoiceCollect .invitetop input[name=providerName]').val();
		var startTimeStr = $('#noInvoiceCollect .invitetop .startTimeStr').val();
		var endTimeStr = $('#noInvoiceCollect .invitetop .endTimeStr').val();
		if(startTimeStr == ''||startTimeStr == null){
			return;
		}else if(endTimeStr == ''||endTimeStr == null){
			return;
		}else{
			if(startTimeStr > endTimeStr){
				return;
			}else{
				var url = "../../invoice/printNoInvoiceCollect.do?" + "providerName=" + providerName + "&startTimeStr=" + startTimeStr + "&endTimeStr=" + endTimeStr;
				$('#noInvoiceCollect .printNoInvoiceCollect').attr("action",url);
				$('#noInvoiceCollect .printNoInvoiceCollect').submit();
			}
		}
	});
	
	//查询
	$('#noInvoiceCollect .invitetop .selectGroup').click(function(){
		var providerName = $('#noInvoiceCollect .invitetop input[name=providerName]').val();
		var startTimeStr = $('#noInvoiceCollect .invitetop .startTimeStr').val();
		var endTimeStr = $('#noInvoiceCollect .invitetop .endTimeStr').val();
		if(startTimeStr == ''||startTimeStr == null){
			windowControl('请选择开始日期！');
		}else if(endTimeStr == ''||endTimeStr == null){
			windowControl('请选择结束日期！');
		}else{
			if(startTimeStr > endTimeStr){
				windowControl('结束日期不得晚于开始日期！');
			}else{
				$('#noInvoiceCollectdg').datagrid({
					url:'../../invoice/gatherInvoiceAmount.do?getMs='+getMS(),
					queryParams: {
						providerName:providerName,
						startTimeStr:startTimeStr + ' 00:00:00',
						endTimeStr:endTimeStr + ' 23:59:59'
					}
				});
				noInvoiceCollectExcel = [
							         		{name:'providerName',value:providerName},
							      	   		{name:'startTimeStr',value:startTimeStr + ' 00:00:00'},
							      	   		{name:'endTimeStr',value:endTimeStr + ' 23:59:59'},
						         ];
			}			
		}
		
	});
	//打印
//	$('#noInvoiceCollect .print').click(function(){
//		var providerName = $('#noInvoiceCollect .invitetop input[name=providerName]').val();
//		var startTimeStr = $('#noInvoiceCollect .invitetop .startTimeStr').val();
//		var endTimeStr = $('#noInvoiceCollect .invitetop .endTimeStr').val();
//		printObject ={
//			url:'../../invoice/gatherInvoiceAmount.do?getMs='+getMS(),
//			data:{
//				providerName:providerName,
//				startTimeStr:startTimeStr + ' 00:00:00',
//				endTimeStr:endTimeStr + ' 23:59:59'
//			},	
//			column:[
//			    {field:'providerName',title:'供应商'},
//			    {field:'previousNoWriteAmount',title:'上期未核销金额'},
//			    {field:'currentTaxAmount',title:'本期入库金额'},
//			    {field:'currentWriteAmount',title:'本期核销金额'},
//			    {field:'currentNoWriteAmount',title:'本期未核销金额'}
//			 ],
//			width: 1200
//		}
//		setUpAdjustPrint(printObject);
//	});
//
//	$('.printWindow .confirm').click(function(){
//		lookPrint(printObject);
//		$('.printLook .confir').unbind('click');
//		$('.printLook .confir').click(function(){
//			$('.printLook .popuparea').jqprint();
//		});
//	});
	
})