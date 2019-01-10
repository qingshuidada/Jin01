var verificationRecordExcel = [];
$(function(){	
	$('#verificationRecord #verificationRecorddg').css('height',$('#loadarea').height()-64 + 'px');
	$('#verificationRecord .invoicelistDetail').css('height',$('#loadarea').height()-62 + 'px');
	/**********供应商*********/
	$('#verificationRecord .invitetop .chooseProvider').click(function(){
		chooseProvider();
		$('#chooseProvider .confirm').unbind('click');
		$('#chooseProvider .confirm').click(function(){
			$('#chooseProvider').css('display','none');
			var selectProvider = $('#chooseProvider .popuparea .provider').datagrid('getSelected');
			if(selectProvider.length == 0){
				$('#verificationRecord .invitetop input[name=providerCode]').val(null);
				$('#verificationRecord .invitetop input[name=providerName]').val(null);
			}else{
				$('#verificationRecord .invitetop input[name=providerCode]').val(selectProvider.providerCode);
				$('#verificationRecord .invitetop input[name=providerName]').val(selectProvider.providerName);
			}			
		});
	});
	
	/*****************设置上下移span的title****************/
	$("#verificationRecord .popups .writetoexcel .upset").attr("title","上移");
	$("#verificationRecord .popups .writetoexcel .downset").attr("title","下移");
	
	/*****************导出到Excel点击弹窗******************/
	$('#verificationRecord .write').click(function(){
		$('#verificationRecord .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#verificationRecord .popups .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'openDateStr',tableHeader:'开票日期',date:true},
			         {propertyName:'providerName',tableHeader:'供应商',date:false},
			         {propertyName:'invoiceNumber',tableHeader:'发票号',date:false},
			         {propertyName:'invoiceAmount',propertyType:"Double",tableHeader:'开票金额',date:false},
			         {propertyName:'redAmount',propertyType:"Double",tableHeader:'冲红金额',date:false},
			         {propertyName:'text',tableHeader:'备注',date:false}
				 ]
		})
	})
	
	/*******************重置按钮点击事件***********************/
	$("#verificationRecord .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#verificationRecord .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#verificationRecord .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#verificationRecord .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#verificationRecord .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#verificationRecord .popups .writetoexcel"));
		
		var verificationRecordExcel2 = [];
		for(var i = 0 ; i < verificationRecordExcel.length ; i++){
			verificationRecordExcel2.push(verificationRecordExcel[i]);
		}
		verificationRecordExcel2.push({
			name:'jsonString',value:jsonString
		})
		//提交导出excel所需要的参数
		excelplugin.submit({
			type:'post',
			array:verificationRecordExcel2,
			action:'../../invoice/writeVerificationRecordToExcel.do?'
		})
	});
	
	//产生数据网格
	$('#verificationRecorddg').datagrid({
		url:'../../invoice/queryInvoice.do?getMs='+getMS(),
		singleSelect:true,
		pagination:true,
		toolbar:"#verificationRecord .invitetop",
		method:"post",
		columns:[[			
			{
				field:'openDateStr',
				title:'开票日期',
				width:100,
				align:"center",
				
			},
			{
				field:'providerName',
				title:'供应商',
				width:120,
				align:"center"
			},
			{
				field:'invoiceNumber',
				title:'发票号',
				width:100,
				align:"center"
			},
			{
				field:'invoiceAmount',
				title:'开票金额',
				width:100,
				align:"center"
			},
			{
				field:'redAmount',
				title:'冲红金额',
				width:100,
				align:"center"
			},
			{
				field:'text',
				title:'备注',
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
					var invoiceId = "'"+ row.invoiceId +"'";
					opera += '<div class="imgBox">'
					opera += '<span style="float:left;" class="small-button look" title="查看" onclick="verificationRecordqid('+ invoiceId +')"></span>'
					if(row.isDelete){
						opera += '<span style="float:left;" class="small-button delete" title="删除" onclick="verificationRecordInvoice('+ invoiceId +')"></span>';
					}
					opera += '</div>'
					return opera;
				}
			}
	    ]]
	});
	
	//打印
	$('#verificationRecord .print').click(function(){
		var invoiceNumber = $('#verificationRecord .invitetop input[name=invoiceNumber]').val();
		var providerCode = $('#verificationRecord .invitetop input[name=providerCode]').val();
		var startTimeStr = $('#verificationRecord .invitetop .startStr').val();
		var endTimeStr = $('#verificationRecord .invitetop .endStr').val();
		var invoiceAmount = $('#verificationRecord .invitetop input[name=invoiceAmount]').val() || '';
		
		var url = "../../invoice/printVerificationRecord.do?" + "providerCode=" + providerCode + "&startTimeStr=" + startTimeStr + "&endTimeStr=" + endTimeStr
		 + "&invoiceNumber=" + invoiceNumber + "&invoiceAmount=" + invoiceAmount;
		$('#verificationRecord .printVerificationRecord').attr("action",url);
		$('#verificationRecord .printVerificationRecord').submit();
	});
	
	//查询
	$('#verificationRecord .invitetop .selectGroup').click(function(){
		$('#verificationRecorddg').datagrid({
			queryParams: {
				invoiceNumber: function(){
					return $('#verificationRecord .invitetop input[name=invoiceNumber]').val();
				},
				providerName: function(){
					return $('#verificationRecord .invitetop input[name=providerName]').val();
				},
				startTimeStr: function(){
					return $('#verificationRecord .invitetop .startStr').val();
				},
				endTimeStr: function(){
					return $('#verificationRecord .invitetop .endStr').val();
				},
				invoiceAmount: function(){
					return $('#verificationRecord .invitetop input[name=invoiceAmount]').val();
				}
			}
		});
		verificationRecordExcel = [
			       		    {name:'invoiceNumber',value:$('#verificationRecord .invitetop input[name=invoiceNumber]').val()},
			         		{name:'providerName',value:$('#verificationRecord .invitetop input[name=providerName]').val()},
			      	   		{name:'startTimeStr',value:$('#verificationRecord .invitetop .startStr').val()},
			      	   		{name:'endTimeStr',value:$('#verificationRecord .invitetop .endStr').val()},
			      	   		{name:'repertoryId',value:$('#verificationRecord .invitetop input[name=invoiceAmount]').val()}
		         ];
	});
	
	//发票核销详情返回
	$('#verificationRecord .detailBack').click(function(){
		$('#verificationRecord .invoicelist').show();
		$('#verificationRecord .invoicelistDetail').hide();
		$('#verificationRecord .operate').show();
		$('#verificationRecord .detailBack').hide();
		$('#verificationRecord .invoiceDetail input').val(null);
		$('#verificationRecorddg').datagrid('reload');
		$('#verificationRecord #verificationDetail').html('');
		$('#verificationRecord .listDetail .inTh').hide();
		$('#verificationRecord .listDetail .initTh').hide();
		$('#verificationRecord .invoiceDetail input[name=providerName]').parents('li').show();
	})
	
})
//点击查看发票登记页面
function verificationRecordqid(invoiceId){
	$('#verificationRecord .invoicelist').hide();
	$('#verificationRecord .invoicelistDetail').show();
	$('#verificationRecord .operate').hide();
	$('#verificationRecord .detailBack').show();
	$.ajax({
		url:'../../invoice/queryInvoiceDetail.do?getMs='+getMS(),
		data:{
			invoiceId:invoiceId
		},
		type:'post',
		success:function(data){
			var obj = JSON.parse(data);
			$('#verificationRecord .invoiceDetail .invoiceNumber').val(obj.invoiceNumber);
			$('#verificationRecord .invoiceDetail .openDate').val(obj.openDateStr.substr(0,10));
			$('#verificationRecord .invoiceDetail .invoiceAmount').val(obj.invoiceAmount);			
			$('#verificationRecord .invoiceDetail .text').val(obj.text);
			var list = obj.pageModel.rows;
			var tempHtml = '';
			if(list[0].inRecordId){
				$('#verificationRecord .listDetail .inTh').show();
				$('#verificationRecord .invoiceDetail input[name=providerName]').val(obj.providerName);
				for(var i=0 ; i<list.length ; i++){				
					tempHtml +=	'<tr>'+
			    		'<td>'+ list[i].inTimeStr.substr(0,10) +'</td>'+//入库日期
			    		'<td>'+ list[i].inRecordId +'</td>'+//入库流水号
			    		'<td>'+ list[i].goodsName +'</td>'+//品名
			    		'<td>'+ list[i].goodsSize +'</td>'+//规格
			    		'<td>'+ list[i].inNumber +'</td>'+//数量
			    		'<td>'+ list[i].taxAverPrice +'</td>'+//单价(无税)
			    		'<td>'+ list[i].taxAmount +'</td>'+//入库金额(无税)
			    		'<td>'+ list[i].shouldWriteAmount +'</td>'+//应核销金额
			    		'<td>'+ list[i].writeAmount +'</td>'+//核销金额
			    		'<td>'+ list[i].noWriteAmount +'</td>';//未核销金额
			    		if(list[i].isRed){
			    			var noWriteAmount = "'" + list[i].noWriteAmount + "'";
			    			var inRecordId = "'" + list[i].inRecordId + "'";
			    			var invoiceRecordId = "'" + list[i].invoiceRecordId + "'";
			    			tempHtml += '<td><input type="button" class="button" value="冲红" onclick="verificationRecordRed(this,'+ noWriteAmount +','+ inRecordId +','+ obj.providerCode +','+ invoiceRecordId +')"/></td>';
			    		}else{
			    			tempHtml += '<td></td>';//冲红
			    		}		    		
			    		tempHtml += '</tr>';
				}
			}else{
				$('#verificationRecord .listDetail .initTh').show();
				$('#verificationRecord .invoiceDetail input[name=providerName]').parents('li').hide();
				for(var i=0 ; i<list.length ; i++){				
					tempHtml +=	'<tr>'+
			    		'<td>'+ obj.providerName +'</td>'+//入库日期			    	
			    		'<td>'+ list[i].shouldWriteAmount +'</td>'+//应核销金额
			    		'<td>'+ list[i].writeAmount +'</td>'+//核销金额
			    		'<td>'+ list[i].noWriteAmount +'</td>'+//未核销金额
			    		'</tr>';
				}
			}
			$('#verificationRecord #verificationDetail').html(tempHtml);
		},
		error:function(error){
			windowControl(error.status);
		}
	})
}
//删除发票
function verificationRecordInvoice(invoiceId){
	ui.confirm('确定要删除吗？',function(z){
		if(z){
			$.ajax({
				url:'../../invoice/deleteInvoice.do?getMs='+getMS(),
				data:{
					invoiceId:invoiceId
				},
				type:'post',
				success:function(data){
					if(data == 200){
						windowControl('删除成功');
						$('#verificationRecorddg').datagrid('reload');
					}else if(data == 400){
						windowControl('删除失败');
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
//点击冲红
function verificationRecordRed(el,number,id,provider,invoiceRecordId){
	ui.confirm('确定要冲红吗？',function(z){
		if(z){
			$.ajax({
				url:'../../invoice/redInRecordGoodsByInvoiceTwo.do?getMs='+getMS(),
				data:{
					noWriteAmount:number,
					inRecordId:id,
					providerCode:provider,
					invoiceRecordId:invoiceRecordId
				},
				type:'post',
				success:function(data){
					if(data == 200){
						windowControl('冲红成功');
						$(el).remove();
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
