var noVerificationRecordExcel = [];
$(function(){	
	$('#noVerificationRecord #noVerificationRecorddg').css('height',$('#loadarea').height()-64 + 'px');
	
	/*****************设置上下移span的title****************/
	$("#noVerificationRecord .popups .writetoexcel .upset").attr("title","上移");
	$("#noVerificationRecord .popups .writetoexcel .downset").attr("title","下移");
	
	/*****************导出到Excel点击弹窗******************/
	$('#noVerificationRecord .write').click(function(){
		$('#noVerificationRecord .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#noVerificationRecord .popups .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'providerName',tableHeader:'供应商',date:false},
			         {propertyName:'inTimeStr',tableHeader:'入库日期',date:true},
			         {propertyName:'inRecordId',tableHeader:'入库流水号',date:false},
			         {propertyName:'goodsName',tableHeader:'品名',date:false},
			         {propertyName:'goodsSize',tableHeader:'规格',date:false},
			         {propertyName:'inNumber',propertyType:"Integer",tableHeader:'数量',date:false},
			         {propertyName:'taxAmount',propertyType:"Double",tableHeader:'入库金额（无税）',date:false,formatter:function(value,row,index){
							return keepDecimals(value);
						 }
					 },
			         {propertyName:'noWriteAmount',propertyType:"Double",tableHeader:'未核销金额',date:false,formatter:function(value,row,index){
							return keepDecimals(value);
						}
					 },
				 ]
		})
	})
	
	/*******************重置按钮点击事件***********************/
	$("#noVerificationRecord .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#noVerificationRecord .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#noVerificationRecord .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#noVerificationRecord .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#noVerificationRecord .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#noVerificationRecord .popups .writetoexcel"));
		
		var noVerificationRecordExcel2 = [];
		for(var i = 0 ; i < noVerificationRecordExcel.length ; i++){
			noVerificationRecordExcel2.push(noVerificationRecordExcel[i]);
		}
		noVerificationRecordExcel2.push({
			name:'jsonString',value:jsonString
		})
		//提交导出excel所需要的参数
		excelplugin.submit({
			type:'post',
			array:noVerificationRecordExcel2,
			action:'../../invoice/writeNoInvoiceRecordToExcel.do?'
		})
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
			str +='<span style="font-weight:800;">入库金额：</span>';
			str +='<span>'+keepDecimals(data[0].taxAmountTotal)+'</span>';
			str +='<span style="font-weight:800;">上期未核销金额：</span>';
			str +='<span>'+keepDecimals(data[0].noWriteAmountTotal)+'</span>';
		}
		$('#'+id).find('.sumBar').html(str);
	}
	//产生数据网格
	$('#noVerificationRecorddg').datagrid({
		url:'../../invoice/queryNoInvoiceRecord.do?getMs='+getMS(),
		toolbar:"#noVerificationRecord .invitetop",
		singleSelect:true,
		pagination:true,
		method:"post",
		onLoadSuccess:function(data){		
			var start = $('#noVerificationRecord .invitetop .startTimeStr').val();
			if(start){
				start += ' 00:00:00'
			}
			var end = $('#noVerificationRecord .invitetop .endTimeStr').val();
			if(end){
				end += ' 23:59:59';
			}
			$.ajax({
				url:'../../invoice/queryNoInvoiceRecord.do?getMs='+getMS(),
				data: {
					goodsName:$('#noVerificationRecord .invitetop input[name=goodsName]').val(),
					providerName:$('#noVerificationRecord .invitetop input[name=providerName]').val(),
					startTimeStr:start,
					endTimeStr:end,
					sumFlag:1
				},
				success:function(data){
					adjustsumBar('noVerificationRecord');
					addsumBarOut('noVerificationRecord',data);
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
				field:'inTimeStr',
				title:'入库日期',
				width:90,
				align:"center",
				formatter:function(value,row,index){
				   return row.inTimeStr.substr(0,10) ;
				}
			},
			{
				field:'inRecordId',
				title:'入库流水号',
				width:260,
				align:"center"
			},
			{
				field:'goodsName',
				title:'品名',
				width:70,
				align:"center"
			},
			{
				field:'goodsSize',
				title:'规格',
				width:70,
				align:"center"
			},
			{
				field:'inNumber',
				title:'数量',
				width:70,
				align:"center"
			},
			{
				field:'taxAverPrice',
				title:'单价(无税)',
				width:90,
				align:"center"
			},
			{field:'taxAverPrice',title:'单价(无税)',align:'center',width:90,formatter:function(value,row,index){
					return keepDecimals(value);
				}
			},
			{
				field:'taxAmount',
				title:'入库金额(无税)',
				width:100,
				align:"center"
			},
			{field:'taxAmount',title:'入库金额(无税)',align:'center',width:100,formatter:function(value,row,index){
					return keepDecimals(value);
				}
			},
			{
				field:'noWriteAmount',
				title:'未核销金额',
				width:100,
				align:"center"
			},
			{field:'noWriteAmount',title:'未核销金额',align:'center',width:100,formatter:function(value,row,index){
					return keepDecimals(value);
				}
			},
			{
				field:"_opera",
				title:"冲红",
				width:60,
				align:"center",
				formatter:function(value,row,index){
					var opera = '';
					var noWriteAmount = "'" + row.noWriteAmount + "'";
	    			var inRecordId = "'" + row.inRecordId + "'";
	    			var providerCode = "'" + row.providerCode + "'";
					if(row.isRed){
						opera += '<input type="button" class="button" style="font-size:12px;" onclick="noVerificationRecordRed('+ noWriteAmount +','+ inRecordId +','+ providerCode +')" value="冲红" />'
					}
					return opera;
				}
			}
	    ]]
	});
	//显示隐藏汇总bar
	var controlFlag = true;
	$('#noVerificationRecord .controlSumBar').click(function(){
		if($(this).val() == '隐藏' && controlFlag){
			controlFlag = false;
			$('#noVerificationRecord .sumBar').animate({
				'bottom':'-=30px',
				'opacity':0,
			},500,function(){
				controlFlag = true;
				$('#noVerificationRecord .sumBar').css('display','none');
				$('#noVerificationRecord .controlSumBar').val('显示');
			});
		}else if($(this).val() == '显示' && controlFlag){
			controlFlag = false;
			$('#noVerificationRecord .sumBar').css('display','block');
			$('#noVerificationRecord .sumBar').animate({
				'bottom':'+=30px',
				'opacity':1,
			},500,function(){
				controlFlag = true;
				$('#noVerificationRecord .controlSumBar').val('隐藏');
			});
		}
	});
	/**********供应商*********/
	$('#noVerificationRecord .invitetop .chooseProvider').click(function(){
		chooseProvider();
		$('#chooseProvider .confirm').unbind('click');
		$('#chooseProvider .confirm').click(function(){
			$('#chooseProvider').css('display','none');
			var selectProvider = $('#chooseProvider .popuparea .provider').datagrid('getSelected');
			if(selectProvider.length == 0){
				$('#noVerificationRecord .invitetop input[name=providerCode]').val(null);
				$('#noVerificationRecord .invitetop input[name=providerName]').val(null);
			}else{
				$('#noVerificationRecord .invitetop input[name=providerCode]').val(selectProvider.providerCode);
				$('#noVerificationRecord .invitetop input[name=providerName]').val(selectProvider.providerName);
			}			
		});
	});
	//打印
	$('#noVerificationRecord .print').click(function(){
		var goodsName = $('#noVerificationRecord .invitetop input[name=goodsName]').val();		
		var startTimeStr = $('#noVerificationRecord .invitetop .startTimeStr').val();
		if(startTimeStr){
			startTimeStr += ' 00:00:00'
		}
		var endTimeStr = $('#noVerificationRecord .invitetop .endTimeStr').val();
		if(endTimeStr){
			endTimeStr += ' 23:59:59';
		}
		var url = "../../invoice/printNoInvoiceRecord.do?" + "goodsName=" + goodsName + "&startTimeStr=" + startTimeStr + "&endTimeStr=" + endTimeStr;
		$('#noVerificationRecord .printNoInvoiceRecord').attr("action",url);
		$('#noVerificationRecord .printNoInvoiceRecord').submit();
	});
	
	//查询
	$('#noVerificationRecord .invitetop .selectGroup').click(function(){
		$('#noVerificationRecorddg').datagrid({
			queryParams: {
				goodsName: function(){
					return $('#noVerificationRecord .invitetop input[name=goodsName]').val();
				},
				providerName: function(){
					return $('#noVerificationRecord .invitetop input[name=providerName]').val();
				},
				startTimeStr:function(){					
					var start = $('#noVerificationRecord .invitetop .startTimeStr').val();
					if(start){
						start += ' 00:00:00'
					}					
					return start;
				},
				endTimeStr:function(){
					var end = $('#noVerificationRecord .invitetop .endTimeStr').val();
					if(end){
						end += ' 23:59:59';
					}
					return end;
				}
			}
		});
		var start = $('#noVerificationRecord .invitetop .startTimeStr').val();
		if(start){
			start += ' 00:00:00'
		}
		var end = $('#noVerificationRecord .invitetop .endTimeStr').val();
		if(end){
			end += ' 23:59:59';
		}
		noVerificationRecordExcel = [
					         		{name:'goodsName',value:$('#noVerificationRecord .invitetop input[name=goodsName]').val()},
					      	   		{name:'startTimeStr',value:start},
					      	   		{name:'endTimeStr',value:end}
				         ];
	});
	//打印
//	$('#noVerificationRecord .print').click(function(){
//		printObject ={
//			url:'../../invoice/queryNoInvoiceRecord.do?getMs='+getMS(),
//			data:{
//				goodsName: function(){
//					return $('#noVerificationRecord .invitetop input[name=goodsName]').val();
//				},
//				startTimeStr:function(){					
//					var start = $('#noVerificationRecord .invitetop .startTimeStr').val();
//					if(start){
//						start += ' 00:00:00'
//					}					
//					return start;
//				},
//				endTimeStr:function(){
//					var end = $('#noVerificationRecord .invitetop .endTimeStr').val();
//					if(end){
//						end += ' 23:59:59';
//					}
//					return end;
//				}
//			},	
//			column:[
//			         {field:'providerName',title:'供应商'},
//			         {field:'inTimeStr',title:'入库日期',formatter:function(value,row,index){
//			      	   return row.inTimeStr.substr(0,10) ;
//			     	 }},
//			         {field:'inRecordId',title:'入库流水号'},
//			         {field:'goodsName',title:'品名'},
//			         {field:'goodsSize',title:'规格'},
//			         {field:'inNumber',title:'数量'},
//			         {field:'taxAverPrice',title:'单价(无税)'},
//			         {field:'taxAmount',title:'入库金额(无税)'},
//			         {field:'noWriteAmount',title:'未核销金额'}
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
//点击冲红
function noVerificationRecordRed(number,id,provider){
	ui.confirm('确定要冲红吗？',function(z){
		if(z){
			$.ajax({
				url:'../../invoice/redInRecordGoodsByInvoice.do?getMs='+getMS(),
				data:{
					noWriteAmount:number,
					inRecordId:id,
					providerCode:provider
				},
				type:'post',
				success:function(data){
					if(data == 200){
						windowControl('冲红成功');
						$('#noVerificationRecorddg').datagrid('reload');
					}else if(data == 400){
						windowControl('冲红失败');
					}else{
						windowControl('服务器异常');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	},false);
}
