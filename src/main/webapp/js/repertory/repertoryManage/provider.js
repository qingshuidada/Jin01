$(function(){
	$('#providerdg').datagrid({
		   url:"../../repertory/selectProviderMessage.do?getMs="+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   method:"post",
		   toolbar:"#repertoryProvider .invitetop",
		   fit: true, 
		   columns:[[
		       {field:"providerCode",title:"供应商编号",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"providerName",title:"供应商名字",fitColumns:true,sortable:true,align:"center",sortable:true,width:140},
		       {field:"noWriteAmount",title:"未核销金额",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"initAmount",title:"初始化金额",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
		    	   var providerCode = "'"+row.providerCode+"'";
		    	   var initAmount = "'"+row.initAmount+"'";
		    		return '<div style="width:60px;margin:0 auto;">'+
		    				'<span style="float:left;" class="small-button edit" title="修改 " onclick="updateProvider('+providerCode+')"></span>'+
		    				'<span style="float:left;" class="small-button delete" title="删除 " onclick="deleteProvider('+providerCode+')"></span>'+
		    				'<span style="float:left;" class="small-button govern" title="核销初始化金额 " onclick="verificationInitNumber('+providerCode+','+initAmount+')"></span>'+
		    				'</div>';
		       }},
		  ]]
	}); 
	//清空按钮
	$('#repertoryProvider .invitetop .clean').click(function(){
		$('#repertoryProvider .invitetop .providerCode').val('');
		$('#repertoryProvider .invitetop .providerName').val('');
	});
	
	/** 条件查询  */
	$('#repertoryProvider .query').click(function(){
		var providerCode = $.trim($('#repertoryProvider .invitetop .providerCode').val());
		var providerName = $.trim($('#repertoryProvider .invitetop .providerName').val());
		var dataInfo = {
				providerCode:providerCode,
				providerName:providerName
		};
		$('#providerdg').datagrid({
			url:"../../repertory/selectProviderMessage.do?getMs="+getMS(),
			queryParams:dataInfo
		});
		
	});
	//添加供应商
	$('#repertoryProvider .maintop .addProvider').click(function(){
		$('#repertoryProvider .popups .saveProvider').css('display','block');
		$('#repertoryProvider .saveProvider .confirm').unbind();
		$('#repertoryProvider .saveProvider .confirm').click(function(){
			var providerName = $.trim($('#repertoryProvider .popups .saveProvider .providerName').val());
			//var noWriteAmount = $.trim($('#repertoryProvider .popups .saveProvider .noWriteAmount').val());
			var initAmount = $.trim($('#repertoryProvider .popups .saveProvider .initAmount').val());
			if(providerName == null || providerName == ''){
				windowControl('供应商名字不能为空');
				return false;
			}else if(initAmount == null || initAmount == ''){
				windowControl('初始化金额不能为空');
				return false;
			}else{
				$.ajax({
					url:'../../repertory/insertProviderMessage.do?getMs='+getMS(),
				    dataType:'json',
				    data:{
				    	providerName:providerName,
						noWriteAmount:0,
						initAmount:initAmount	
				    },
				    async:true,
				    type:'POST',
				    success:function(data){
				        //请求成功时处理
				    	if(data == 500){
				    		windowControl('服务器异常！');
				    	}else if(data == 400){
				    		windowControl('数据异常！');
				    	}else{
				    		$('#repertoryProvider .popups .saveProvider').css('display','none');
							$('#repertoryProvider .saveProvider .popuparea input').val('');
							$('#providerdg').datagrid('reload');
				    		windowControl('添加供应商成功！');				    		
				    	}
				    },
				    error:function(){
				        //请求出错处理
				    }
				});	
			}
		})
	});
	//修改供应商
	$('#repertoryProvider .updateProvider .confirm').click(function(){
		var providerName = $.trim($('#repertoryProvider .popups .updateProvider .providerName').val());
		//var noWriteAmount = $.trim($('#repertoryProvider .popups .updateProvider .noWriteAmount').val());
		var initAmount = $.trim($('#repertoryProvider .popups .updateProvider .initAmount').val());
		var providerCode = $.trim($('#repertoryProvider .popups .updateProvider .providerCode').val());
		if(providerName == null || providerName == ''){
			windowControl('供应商名字不能为空');
			return false;
		}else if(initAmount == null || initAmount == ''){
			windowControl('初始化金额不能为空');
			return false;
		}else{
			$.ajax({
				url:'../../repertory/updateProviderMessage.do?getMs='+getMS(),
			    dataType:'json',
			    data:{
			    	providerCode:providerCode,
			    	providerName:providerName,
					noWriteAmount:0,
					initAmount:initAmount	
			    },
			    async:true,
			    type:'POST',
			    success:function(data){
			        //请求成功时处理
			    	if(data == 500){
			    		windowControl('服务器异常！');
			    	}else if(data == 400){
			    		windowControl('数据异常！');
			    	}else{
			    		$('#repertoryProvider .popups .updateProvider').css('display','none');
						$('#repertoryProvider .updateProvider .popuparea input').val('');
						$('#providerdg').datagrid('reload');
			    		windowControl('修改供应商成功！');				    		
			    	}
			    },
			    error:function(){
			        //请求出错处理
			    }
			});	
		}
	});

	
	
});
//删除供应商
function deleteProvider(providerCode){
	ui.confirm('确定要删除此供应商信息？',function(z){
		if(z){	
			$.ajax({
				data:{providerCode:providerCode},
				url:'../../repertory/deleteProvider.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == '200'){
						$("#providerdg").datagrid("reload");
						windowControl("删除成功");
					}else{
						windowControl(data);
					}
				},
				error:function(err){
					windowControl(err.status);
				}
			});
		}
	},false);
	
}
//修改供应商
function updateProvider(providerCode){
	$('#repertoryProvider .popups .updateProvider').css('display','block');	
	$.ajax({
		url:'../../repertory/selectProviderMessage.do?getMs='+getMS(),
	    dataType:'json',
	    data:{
	    	providerCode:providerCode,
	    },
	    async:true,
	    type:'POST',
	    success:function(data){
	    	var obj = data.rows;
	    	$('#repertoryProvider .updateProvider .providerName').val(obj[0].providerName);
	    	//$('#repertoryProvider .updateProvider .noWriteAmount').val(obj[0].noWriteAmount);
	    	$('#repertoryProvider .updateProvider .initAmount').val(obj[0].initAmount);
	    	$('#repertoryProvider .updateProvider .providerCode').val(obj[0].providerCode);
	    },
	    error:function(){
	        //请求出错处理
	    }
	});
	
}
//核销初始化金额
function verificationInitNumber(providerCode,initAmount){
	$('#repertoryProvider .popups .verificationInitNumber').css('display','block');	
	$('#repertoryProvider .verificationInitNumber .confirm').unbind();
	$('#repertoryProvider .verificationInitNumber .confirm').click(function(){
		var invoiceNumber = $('#repertoryProvider .verificationInitNumber .invoiceNumber').val();//发票号
		var openDate = $('#repertoryProvider .verificationInitNumber .openDate').val();//开票日期
		var invoiceAmount = $('#repertoryProvider .verificationInitNumber .invoiceAmount').val();//开票金额
		var text = $('#repertoryProvider .verificationInitNumber .text').val();//备注
		if(invoiceNumber == null || invoiceNumber == ''){
			windowControl('发票号不能为空');
			return false;
		}else if(openDate == null || openDate == ''){
			windowControl('开票日期不能为空');
			return false;
		}else if(invoiceAmount == null || invoiceAmount == ''){
			windowControl('开票金额不能为空');
			return false;
		}else{
			if(Number(invoiceAmount) > Number(initAmount)){
				windowControl('开票金额不能大于初始化金额');
			}else{
				$.ajax({
					url:'../../invoice/initVerification.do?getMs='+getMS(),
				    dataType:'json',
				    data:{
				    	invoiceNumber:invoiceNumber,
				    	openDateStr:openDate,
				    	invoiceAmount:invoiceAmount,
				    	providerCode:providerCode,
				    	initAmount:initAmount,
				    	text:text
				    },
				    async:true,
				    type:'POST',
				    success:function(data){
				        //请求成功时处理
				    	if(data == 500){
				    		windowControl('服务器异常！');
				    	}else if(data == 400){
				    		windowControl('数据异常！');
				    	}else{
				    		$("#providerdg").datagrid("reload");
				    		$('#repertoryProvider .popups .verificationInitNumber').css('display','none');	
				    		windowControl('核销成功！');				    		
				    	}
				    },
				    error:function(){
				        //请求出错处理
				    }
				});
			}
		}
	})

}
