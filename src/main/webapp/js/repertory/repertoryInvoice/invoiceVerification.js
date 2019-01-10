//全局变量
var surplus = 0;
var noWriteAmountSum = 0;//应核销金额求和
var writeAmountSum = 0;//已核销金额求和
var shouldWriteAmountSum = 0//未核销金额求和
$(function(){
	/*内容高度*/
	$('#invoiceVerification .listBody').css('height',$('#loadarea').height()-62 + 'px');
	/**********供应商*********/
	$('#invoiceVerification .filtCondition .chooseProvider').click(function(){
		chooseProvider();
		$('#chooseProvider .confirm').unbind('click');
		$('#chooseProvider .confirm').click(function(){
			$('#chooseProvider').css('display','none');
			selectProvider = $('#chooseProvider .popuparea .provider').datagrid('getSelections');
			//切换供应商，拉取列表
			if(selectProvider.length == 0){
				$('#invoiceVerification #waitSubmitIn').html('');
				$('#invoiceVerification .filtCondition input[name=providerCode]').val(null);
				$('#invoiceVerification .filtCondition input[name=providerName]').val(null);
			}else{
				$('#invoiceVerification .filtCondition input[name=providerCode]').val(selectProvider[0].providerCode);
				$('#invoiceVerification .filtCondition input[name=providerName]').val(selectProvider[0].providerName);
				surplus = Number($('#invoiceVerification .filtCondition .invoiceAmount').val());
				noWriteAmountSum = 0;
				writeAmountSum = 0;
				shouldWriteAmountSum = 0;
				$('#invoiceVerification .filtCondition .noWriteAmountSum').text(noWriteAmountSum);//合计选中的应核销金额
    			$('#invoiceVerification .filtCondition .writeAmountSum').text(writeAmountSum);//合计选中的已核销金额
    			$('#invoiceVerification .filtCondition .shouldWriteAmountSum').text(shouldWriteAmountSum);//合计选中的未核销金额
    			$('#invoiceVerification .filtCondition .openAmountSurplus').text(surplus);//开票剩余金额   			
				invoiceVerGetInRecord(selectProvider[0].providerCode)
			}			
		});
	});
	
	//获得userName信息和日期，并塞入页面
	var time = new Date;
	var month = time.getMonth()+1;
	var recordDate = time.getFullYear()+'-'+month+'-'+time.getDate();
	var recordUser = $('body').attr('userName');
	$('#invoiceVerification .filtCondition .recordDate').val(recordDate);
	$('#invoiceVerification .filtCondition .recordUser').val(recordUser);
	//清空
	$('#invoiceVerification .outPut .reset').click(function(){
		$('#invoiceVerification .filtCondition .invoiceNumber').val(null);
		$('#invoiceVerification .filtCondition .openDate').val(null);
		$('#invoiceVerification .filtCondition .invoiceAmount').val(null);
		$('#invoiceVerification .filtCondition .text').val(null);
		$('#invoiceVerification .filtCondition input[name=providerName]').val(null);
		$('#invoiceVerification .filtCondition input[name=providerCode]').val(null);
		$('#invoiceVerification #waitSubmitIn').html('');
		$('#invoiceVerification .filtCondition dd div').text(0);//合计
		surplus = 0;
		noWriteAmountSum = 0;
		writeAmountSum = 0;
		shouldWriteAmountSum = 0;
	});

	//开票金额变化事件
	$('#invoiceVerification .filtCondition .invoiceAmount').change(function(){
		$('#invoiceVerification .filtCondition dd div').text(0);//合计
		surplus = Number($(this).val());
		noWriteAmountSum = 0;
		writeAmountSum = 0;
		shouldWriteAmountSum = 0;
		$('#invoiceVerification .filtCondition .openAmountSurplus').text(surplus);
		$('#invoiceVerification #waitSubmitIn input[type=checkbox]').removeAttr('checked');
		$('#invoiceVerification #waitSubmitIn').find('.writeAmount').text('');
		$('#invoiceVerification #waitSubmitIn').find('.shouldWriteAmount').text('');
	})
	
	//一键核销
	$('#invoiceVerification .verification input[name=oneVerification]').click(function(){
		var invoiceNumber = $('#invoiceVerification .filtCondition .invoiceNumber').val();//发票号
		var openDate = $('#invoiceVerification .filtCondition .openDate').val();//开票日期
		var invoiceAmount = $('#invoiceVerification .filtCondition .invoiceAmount').val();//开票金额
		var provider = $('#invoiceVerification .filtCondition input[name=providerCode]').val();//供应商
		var text = $('#invoiceVerification .filtCondition .text').val();//备注
		//表格dom
		var trDom = $('#invoiceVerification #waitSubmitIn').find('tr');
		trDom.find('.writeAmount').text('');
		trDom.find('.shouldWriteAmount').text('');	
		trDom.find('input[type=checkbox]').removeAttr('checked');
		$('#invoiceVerification .filtCondition .noWriteAmountSum').text(0);//合计选中的应核销金额
		$('#invoiceVerification .filtCondition .writeAmountSum').text(0);//合计选中的已核销金额
		$('#invoiceVerification .filtCondition .shouldWriteAmountSum').text(0);//合计选中的未核销金额
		$('#invoiceVerification .filtCondition .openAmountSurplus').text(invoiceAmount);//显示剩余的开票金额
		noWriteAmountSum = 0;
		writeAmountSum = 0;
		shouldWriteAmountSum = 0;
		
		if(invoiceNumber == '' || invoiceNumber == null){
			windowControl('发票号不能为空！');
		}else if(openDate == '' || openDate == null){
			windowControl('开票日期不能为空！');
		}else if(invoiceAmount == '' || invoiceAmount ==null){
			windowControl('开票金额不能为空！');
		}else if(provider == '' || provider == null){
			windowControl('请选择供应商！');
		}else{
			//遍历记录一键核销			
			surplus = Number(invoiceAmount);
			for(var i = 0 ; i < trDom.length ; i++){				
				var number = Number(trDom.eq(i).find('.noWriteAmount').text());//应核销金额
//				noWriteAmountSum += number;
				noWriteAmountSum = accAdd(noWriteAmountSum,number);
				
				if(surplus > number){
					trDom.eq(i).find('input[type=checkbox]').attr('checked',true);
					trDom.eq(i).find('.writeAmount').text(number);
					trDom.eq(i).find('.shouldWriteAmount').text(0);
//					writeAmountSum += number;
//					surplus = surplus - number;
					writeAmountSum = accAdd(writeAmountSum,number);
					surplus = accAdd(surplus,-number);
				}else{
					var a = accAdd(number,-surplus);
					trDom.eq(i).find('input[type=checkbox]').attr('checked',true);
					trDom.eq(i).find('.writeAmount').text(surplus);
					trDom.eq(i).find('.shouldWriteAmount').text(a);
//					writeAmountSum += surplus;
//					shouldWriteAmountSum += number-surplus;
					writeAmountSum = accAdd(writeAmountSum,surplus);
					shouldWriteAmountSum = accAdd(shouldWriteAmountSum,a);
					surplus = 0;
					break ;
				}
			}
			$('#invoiceVerification .filtCondition .noWriteAmountSum').text(noWriteAmountSum);//合计选中的应核销金额
			$('#invoiceVerification .filtCondition .writeAmountSum').text(writeAmountSum);//合计选中的已核销金额
			$('#invoiceVerification .filtCondition .shouldWriteAmountSum').text(shouldWriteAmountSum);//合计选中的未核销金额
			$('#invoiceVerification .filtCondition .openAmountSurplus').text(surplus);//开票剩余金额
		}
	});

	//保存核销记录
	$('#invoiceVerification .outPut .save').click(function(){
		var trDom = $('#invoiceVerification #waitSubmitIn').find('tr');
		var invoiceNumber = $('#invoiceVerification .filtCondition .invoiceNumber').val();//发票号
		var openDate = $('#invoiceVerification .filtCondition .openDate').val();//开票日期
		var invoiceAmount = $('#invoiceVerification .filtCondition .invoiceAmount').val();//开票金额
		var provider = $('#invoiceVerification .filtCondition input[name=providerCode]').val();//供应商
		var text = $('#invoiceVerification .filtCondition .text').val();//备注
		if(invoiceNumber == '' || invoiceNumber == null){
			windowControl('发票号不能为空！');
		}else if(openDate == '' || openDate == null){
			windowControl('开票日期不能为空！');
		}else if(invoiceAmount == '' || invoiceAmount ==null){
			windowControl('开票金额不能为空！');
		}else if(provider == '' || provider == null){
			windowControl('供应商不能为空！');
		}else{			
			if(surplus == 0){
				var dataList = [];
				for(var i=0 ; i<trDom.length ; i++){
					var tr = trDom.eq(i);
					if(tr.find('input[type=checkbox]').attr('checked') == 'checked'){
						var obj = {
							inRecordId:tr.attr('recordid'),
							taxRate:tr.find('td:first').attr('taxrate'),
							shouldWriteAmount:tr.find('.noWriteAmount').text(),
							writeAmount:tr.find('.writeAmount').text(),
							noWriteAmount:tr.find('.shouldWriteAmount').text()
						}
						dataList.push(obj);
					}
				}
				var data = {
						invoiceNumber:invoiceNumber,
						openDateStr:openDate,
						invoiceAmount:invoiceAmount,
						providerCode:provider,
						text:text,
						list:dataList
					}
				$.ajax({
					url:'../../invoice/saveInvoiceRegister.do?getMs='+getMS(),
					data:{
						jsonString:JSON.stringify(data)
					},
					type:'post',
					success:function(data){
						if(data == 200){
							windowControl('保存成功！');
							$('#invoiceVerification .filtCondition .invoiceNumber').val(null);
							$('#invoiceVerification .filtCondition .openDate').val(null);
							$('#invoiceVerification .filtCondition .invoiceAmount').val(null);
							$('#invoiceVerification .filtCondition .text').val(null);
							$('#invoiceVerification .filtCondition input[name=providerName]').val(null);
							$('#invoiceVerification .filtCondition input[name=providerCode]').val(null);
							$('#invoiceVerification #waitSubmitIn').html('');
							$('#invoiceVerification .filtCondition dd div').text(0);//合计
							surplus = 0;
							noWriteAmountSum = 0;
							writeAmountSum = 0;
							shouldWriteAmountSum = 0;
						}
    	    		},
    	    		error:function(error){
    	    			windowControl(error.status);
    	    		}
				})	
			}else{
				windowControl('发票金额还有剩余，请继续选择核销！');
			}
		}
		
	})

})
//获取入库记录
function invoiceVerGetInRecord(obj){
	$.ajax({
		url:'../../repertory/selectGoodsInRecordForInvoice.do?getMs='+getMS(),
		data:{
			providerCode:obj
		},
		type:'post',
		success:function(data){				
			var obj = JSON.parse(data).rows;
			var tempHtml = '';
	    	for(var i = 0 ; i < obj.length ; i++){
	    		if(obj[i].taxAmount > obj[i].noWriteAmount || obj[i].invoiceId){
	    			tempHtml += '<tr style="background-color:yellow;" recordid='+ obj[i].inRecordId +'>'
	    		}else{
	    			tempHtml += '<tr recordid='+ obj[i].inRecordId +'>'
	    		}
	    		tempHtml +=	'<td taxrate='+ obj[i].taxRate +'><input type="checkbox" /></td>'+//复选框
				    		'<td>'+ obj[i].inTimeStr.substr(0,10) +'</td>'+//入库日期
				    		'<td>'+ obj[i].inRecordId +'</td>'+//入库流水号
				    		'<td>'+ obj[i].goodsName +'</td>'+//品名
				    		'<td>'+ obj[i].goodsSize +'</td>'+//规格
				    		'<td>'+ obj[i].inNumber +'</td>'+//数量
				    		'<td>'+ obj[i].taxAverPrice +'</td>'+//单价(无税)
				    		'<td class="taxAmount">'+ obj[i].taxAmount +'</td>'+//入库金额(无税)
				    		'<td class="noWriteAmount">'+ obj[i].noWriteAmount +'</td>'+//应核销金额
				    		'<td class="writeAmount"></td>'+//核销金额
				    		'<td class="shouldWriteAmount"></td>'+//未核销金额
						'</tr>';
	    	};
	    	$('#invoiceVerification #waitSubmitIn').html(tempHtml);
	    	
	    	$('#invoiceVerification #waitSubmitIn input[type=checkbox]').click(function(){
	    		var invoiceNumber = $('#invoiceVerification .filtCondition .invoiceNumber').val();//发票号
	    		var openDate = $('#invoiceVerification .filtCondition .openDate').val();//开票日期
	    		var invoiceAmount = $('#invoiceVerification .filtCondition .invoiceAmount').val();//开票金额
	    		var provider = $('#invoiceVerification .filtCondition input[name=providerCode]').val();//供应商
	    		var text = $('#invoiceVerification .filtCondition .text').val();//备注
	    		var trDom = $('#invoiceVerification #waitSubmitIn').find('tr');
	    		if(invoiceNumber == '' || invoiceNumber == null){
	    			windowControl('发票号不能为空！');
	    			$(this).removeAttr('checked');
	    		}else if(openDate == '' || openDate == null){
	    			windowControl('开票日期不能为空！');
	    			$(this).removeAttr('checked');
	    		}else if(invoiceAmount == '' || invoiceAmount ==null){
	    			windowControl('开票金额不能为空！');
	    			$(this).removeAttr('checked');
	    		}else{  			
	    			// 核销
	    			var parent = $(this).parents('tr');
	    			var number = Number(parent.find('.noWriteAmount').text());//选中记录应核销金额	    			
	    			
	    			if($(this).attr('checked') == 'checked'){	    				
//    					noWriteAmountSum += number;
    					noWriteAmountSum = accAdd(noWriteAmountSum,number)
	    				if(surplus >= number){
		    				parent.find('.writeAmount').text(number);
		    				parent.find('.shouldWriteAmount').text(0);
//		    				writeAmountSum += number;
//		    				surplus -= number;
		    				writeAmountSum = accAdd(writeAmountSum,number);
		    				surplus = accAdd(surplus,-number);		    				
						}else if(0 < surplus && surplus < number){
							var a = accAdd(number,-surplus)
							parent.find('.writeAmount').text(surplus);
							parent.find('.shouldWriteAmount').text(a);
//							writeAmountSum += surplus;
//		    				shouldWriteAmountSum += number-surplus;
							writeAmountSum = accAdd(writeAmountSum,surplus);
							shouldWriteAmountSum = accAdd(shouldWriteAmountSum,a);		    				
							surplus = 0;
						}else if(surplus == 0){
							parent.find('.writeAmount').text(0);
							parent.find('.shouldWriteAmount').text(number);
//							shouldWriteAmountSum += number;
							shouldWriteAmountSum = accAdd(shouldWriteAmountSum,number);
						}
	    			}else{
	    				var A = Number(parent.find('.writeAmount').text());//取消选中的已核销金额
	    				var B = Number(parent.find('.shouldWriteAmount').text());//取消选中的未核销金额
//	    				noWriteAmountSum -= number;
//	    				writeAmountSum -= A;
//	    				shouldWriteAmountSum -= B;
//	    				surplus += A;
	    				
	    				noWriteAmountSum = accAdd(noWriteAmountSum,-number);
	    				writeAmountSum = accAdd(writeAmountSum,-A);
	    				shouldWriteAmountSum = accAdd(shouldWriteAmountSum,-B);
	    				surplus = accAdd(surplus,A);
	    				
	    				if(A > 0 && B == 0){
	    					//遍历表格查找未核销完的记录
	    					for(var i=0 ; i<trDom.length ; i++){
	    						if(Number(trDom.eq(i).find('.shouldWriteAmount').text()) > 0){
	    							var C = Number(trDom.eq(i).find('.writeAmount').text());//核销一部分的入库记录的已核销金额
	    							var D = Number(trDom.eq(i).find('.shouldWriteAmount').text());//核销一部分的入库记录的未核销金额
	    							var E = Number(trDom.eq(i).find('.noWriteAmount').text());//核销一部分的入库记录的应核销金额
//	    							writeAmountSum -= C;
//	    							shouldWriteAmountSum -= D;
//	    							surplus += C;
	    							writeAmountSum = accAdd(writeAmountSum,-C);
	    							shouldWriteAmountSum = accAdd(shouldWriteAmountSum,-D);
	    							surplus = accAdd(surplus,C);
	    							
	    		    				if(surplus >= E){
	    		    					trDom.eq(i).find('.writeAmount').text(E);
	    		    					trDom.eq(i).find('.shouldWriteAmount').text(0);
//	    		    					writeAmountSum += E;
//	    		    					surplus -= E;
	    		    					writeAmountSum = accAdd(writeAmountSum,E);
	    		    					surplus = accAdd(surplus,-E);
	    							}else if(0 < surplus && surplus < E){
	    								var a = accAdd(E,-surplus)
	    								trDom.eq(i).find('.writeAmount').text(surplus);
	    								trDom.eq(i).find('.shouldWriteAmount').text(a);
//	    								writeAmountSum += surplus;
//	    								shouldWriteAmountSum += E-surplus;
	    								writeAmountSum = accAdd(writeAmountSum,surplus);
	    								shouldWriteAmountSum = accAdd(shouldWriteAmountSum,a);
	    								surplus = 0;
	    							}else if(surplus == 0){
	    								trDom.eq(i).find('.writeAmount').text(0);
	    								trDom.eq(i).find('.shouldWriteAmount').text(E);
//	    								shouldWriteAmountSum += E;
	    								shouldWriteAmountSum = accAdd(shouldWriteAmountSum,E);
	    							}
	    		    				
	    						}
	    					}
	    				}    					
	    				parent.find('.writeAmount').text('');
	    				parent.find('.shouldWriteAmount').text('');
	    			}
	    			
	    			$('#invoiceVerification .filtCondition .noWriteAmountSum').text(noWriteAmountSum);//合计选中的应核销金额
	    			$('#invoiceVerification .filtCondition .writeAmountSum').text(writeAmountSum);//合计选中的已核销金额
	    			$('#invoiceVerification .filtCondition .shouldWriteAmountSum').text(shouldWriteAmountSum);//合计选中的未核销金额
	    			$('#invoiceVerification .filtCondition .openAmountSurplus').text(surplus);//开票剩余金额   			
	    		}
	    		
	    	});
		},
		error:function(error){
			windowControl(error.status);
		}
	})
}

//小数浮点数,精确计算加减
function accAdd(arg1,arg2){  
    var r1,r2,m;  
    try{
    	r1=arg1.toString().split(".")[1].length
    }catch(e){
    	r1=0
    }  
    try{
    	r2=arg2.toString().split(".")[1].length
    }catch(e){
    	r2=0
    }  
    m=Math.pow(10,Math.max(r1,r2));
    var a = (arg1*m+arg2*m)/m;
    var b = Number(a.toFixed(2));
    return b
}


