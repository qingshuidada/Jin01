$(function(){
	if(existPermission('admin:workOfficeDoc:contractManage:contractManage:add'))
		$("#contractManage .maintop").append('<input type="button" value="添加合同" class="button addContract" />');
	//加载合同管理表单
	$("#contractManagedg").datagrid({
		url:'../../contract/selectContract.do?getMs='+getMS(),
	    rownumbers:"true",
	    singleSelect:true,
	    pagination:true,
	    toolbar:"#contractManage .invitetop",
	    method:"post",
	    fit: true,
	    columns:[[
			{
				field:"_opera",
				title:"管理",
				align:"center",
				width:130,				
				formatter:function(value,row,index){
				   var opera = '';
				   var contractId = "'"+ row.contractId +"'";
				   var contractName = "'"+ row.contractName +"'";
				   var contractAmount = "'"+ row.contractAmount +"'";
				   var unpaidAmount = "'"+ row.unpaidAmount +"'";
				   var noInvoiceAmount = "'"+ row.noInvoiceAmount +"'";
				   var status = row.contractStatus;
				   if(existPermission('admin:workOfficeDoc:contractManage:contractManage:documentary'))
						opera += '<span  class="small-button look" title="查看跟单" onclick="contractDocumentary()"></span>';			   
					opera += '<span  class="small-button edit" title="修改合同" onclick="contractEdit('+ contractId +')"></span>';
					if(existPermission('admin:workOfficeDoc:contractManage:contractManage:close'))
						opera += '<span class="small-button delete" title="删除合同" onclick="contractClose('+ contractId +')"></span>';
					opera += '<span  class="small-button addbtn" title="合同开票" onclick="contractInvoicing('+ contractId+','+noInvoiceAmount+')"></span>';
					opera += '<span  class="small-button pay" title="合同付款" onclick="contractPayment('+ contractId+','+unpaidAmount+')"></span>';
				    return opera;
				}
			},
  	        {
  	        	field:"contractName",
  	        	title:"合同名称",
  	        	align:"center",
  	        	width:100
  	        },
  	        {
  	        	field:"departmentName",
  	        	title:"部门名称",
  	        	align:"center",
  	        	width:100
  	        },
  	        {
  	        	field:"contractSort",
  	        	title:"合同类别",
  	        	align:"center",
  	        	width:100,
  	        	formatter:function(value,row,index){
  	        		if(value == null){
  	        			return '请修改类别';
  	        		}else if(value == '0'){
  	        			return '采购合同';
  	        		}else if(value == '1'){
  	        			return '销售合同';
  	        		}else if(value == '2'){
  	        			return '服务合同';
  	        		}
				}
  	        },
  	        {
  	        	field:"orderExecutorName",
  	        	title:"跟单人",
  	        	align:"center",
  	        	width:100
  	        },
  	        {
  	        	field:"secondName",
  	        	title:"乙方名称",
  	        	align:"center",
  	        	width:100
  	        },
  	        {
  	        	field:"contractAmount",
  	        	title:"合同总金额",
  	        	align:"center",
  	        	width:100,
  	        	formatter:function(value,row,index){
  	        		var unit = row.unit;
  	        		return value + unit;
				}
  	        },
  	        {
  	        	field:"spendAmount",
  	        	title:"已付金额",
  	        	align:"center",
  	        	width:100
  	        },
  	        {
  	        	field:"unpaidAmount",
  	        	title:"未付金额",
  	        	align:"center",
  	        	width:100
  	        },
  	        {
  	        	field:"invoiceAmount",
  	        	title:"已开票金额",
  	        	align:"center",
  	        	width:100
  	        },
  	        {
  	        	field:"noInvoiceAmount",
  	        	title:"未开票金额",
  	        	align:"center",
  	        	width:100
  	        },
  	        {
  	        	field:"startTimeStr",
  	        	title:"起始日期",
  	        	align:"center",
  	        	width:100,
  	        	formatter:function(value,row,index){
  	        		return value.substr(0,10);
				}
  	        },
  	        {
  	        	field:"endTimeStr",
  	        	title:"结束日期",
  	        	align:"center",
  	        	width:100
  	        },
  	        {
  	        	field:"contractStatus",
  	        	title:"合同状态",
  	        	align:"center",
  	        	width:80,
  	        	formatter:function(value,row,index){
  	        		 if(value == '0'){
  	        			return '未交单 ';
  	        		 }else if(value == '1'){
  	        			return '已交单 ';
  	        		 }else if(value == '2'){
  	        			return '已关闭 ';
  	        		 }
  	        	}
  	        }
  	        
  	        
  	    ]]
	});
	//查询
	$('#contractManage .list .invitetop .query').click(function(){
		var contractName = $('#contractManage .list .invitetop .contractName').val();
		var orderExecutorName = $('#contractManage .list .invitetop .orderExecutorName').val();
		var secondName = $('#contractManage .list .invitetop .secondName').val();
		var contractStatus = $('#contractManage .list .invitetop .contractStatus').val();
		var startTime = $('#contractManage .list .invitetop .startTime').val();
		var endTime = $('#contractManage .list .invitetop .endTime').val();
		var departmentName = $('#contractManage .list .invitetop input[name=departmentName]').val();
		var contractSort = $('#contractManage .list .invitetop .contractSort').val();
		$("#contractManagedg").datagrid({
			queryParams: {
				contractName:contractName,
				orderExecutorName:orderExecutorName,
				secondName:secondName,
				contractStatus:contractStatus,
				startTimeStr:startTime,
				endTimeStr:endTime,
				departmentName:departmentName,
				contractSort:contractSort
			}
		})
	});
	//添加合同的高度
	var height = $('#contractManage .list').css('height');
	$('#contractManage .addContractWd').css('height',height);
	$('#contractManage .documentary').css('height',height);
	//添加合同弹窗出现
	$('#contractManage .maintop .addContract').click(function(){
		$('#contractManage .list').hide();
		$(this).hide();
		$('#contractManage .addContractWd').show();
		$('#contractManage .maintop .back').show();
	});
	
	//返回
	$('#contractManage .maintop .back').click(function(){
		$('#contractManage .list').show();
		$('#contractManage .addContract').show();
		$('#contractManage .addContractWd').hide();
		$('#contractManage .editContractWd').hide();
		$('#contractManage .documentary').hide();
		$('#contractManage .back').hide();
		$("#contractManagedg").datagrid('reload');
		$('#contractManage .addContractWd .submitCertificate').show();
		$('#contractManage .editContractWd .submitCertificate').show();
		$('#contractManage .addContractWd li input[type=button]').removeAttr('disabled');
		$('#contractManage .editContractWd li input[type=button]').removeAttr('disabled');
		$('#contractManage .editContractWd input[type=text]').val('');
		contractManageReset();
	});
	
	
	//添加合同的编辑器
	UE.delEditor('contractEditor');
	//
	UE.getEditor('contractEditor', {
	    theme:"default", //皮肤
	    lang:'zh-cn',//语言
	    autoHeightEnabled:false,  //不长高
	    initialFrameWidth:940,  //初始化编辑器宽度,默认1000
        initialFrameHeight:200, //初始化编辑器高度,默认320
        enableAutoSave: false,      //去掉保存
	});
	//修改合同的编辑器
	UE.delEditor('contractEditorSecond');
	//
	UE.getEditor('contractEditorSecond', {
	    theme:"default", //皮肤
	    lang:'zh-cn',//语言
	    autoHeightEnabled:false,  //不长高
	    initialFrameWidth:940,  //初始化编辑器宽度,默认1000
        initialFrameHeight:200, //初始化编辑器高度,默认320
        enableAutoSave: false,      //去掉保存
	});
	//修改合同的编辑器
	UE.delEditor('contractEditorFour');
	//
	UE.getEditor('contractEditorFour', {
	    theme:"default", //皮肤
	    lang:'zh-cn',//语言
	    autoHeightEnabled:false,  //不长高
	    initialFrameWidth:1010,  //初始化编辑器宽度,默认1000
        initialFrameHeight:320, //初始化编辑器高度,默认320
        enableAutoSave: false,      //去掉保存
	});
	
	
	//选择附件1	
	$('#contractManage .addContractWd .selectFile').click(function(){
		$('#contractManage .addContractWd .inputFile').click();		
	});
	//选择附件2
	$('#contractManage .addContractWd .selectFileTwo').click(function(){
		$('#contractManage .addContractWd .inputFileTwo').click();		
	});
	$('#contractManage .addContractWd .inputFile').change(function(){
		var fileName = $('#contractManage .addContractWd .inputFile').val();
		$('#contractManage .addContractWd .fileName').val(fileName);
		$('#contractManage .addContractWd .fileName').removeAttr('name');
		$('#contractManage .addContractWd .fileName').removeAttr('url');
	});
	$('#contractManage .addContractWd .inputFileTwo').change(function(){
		var fileName = $('#contractManage .addContractWd .inputFileTwo').val();
		$('#contractManage .addContractWd .fileNameTwo').val(fileName);
		$('#contractManage .addContractWd .fileNameTwo').removeAttr('name');
		$('#contractManage .addContractWd .fileNameTwo').removeAttr('url');
	});
	
	//选择跟单人
	$('#contractManage .addContractWd .selectOrderExecutorName').click(function(){
		chooseUser();
		$('#chooseUser .confirm').click(function(){
			$('#chooseUser').css('display','none');	
			selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
			$('#contractManage .addContractWd .orderExecutorName').val(selectUser[0].userName);
			$('#contractManage .addContractWd .orderExecutorName').attr('id',selectUser[0].userId);
		});
	});
	//修改合同的选择跟单人
	$('#contractManage .editContractWd .selectOrderExecutorName').click(function(){
		chooseUser();
		$('#chooseUser .confirm').click(function(){
			$('#chooseUser').css('display','none');	
			selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
			$('#contractManage .editContractWd .orderExecutorName').val(selectUser[0].userName);
			$('#contractManage .editContractWd .orderExecutorName').attr('id',selectUser[0].userId);
		});
	});
	//选择部门
	$('#contractManage .invitetop .departmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#contractManage .invitetop input[name=departmentName]').val(chooseDept.text);
		     $('#chooseDept .confirm').unbind();
		})
	})
	//选择部门
	$('#contractManage .addContractWd .departmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#contractManage .addContractWd input[name=departmentName]').val(chooseDept.text);
		     $('#chooseDept .confirm').unbind();
		})
	})
	//选择部门
	$('#contractManage .editContractWd .departmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#contractManage .editContractWd input[name=departmentName]').val(chooseDept.text);
		     $('#chooseDept .confirm').unbind();
		})
	})
	//上传附件	
	$('#contractManage .addContractWd .submitFile').click(function(){
		var fileUrl = $('#contractManage .addContractWd .fileName').val();
		if(fileUrl == '' || fileUrl == null){
			windowControl('请先选择上传的附件！');
			return ;
		}else{
			$('#contractManage .addContractWd .inputFile').upload({
				url:"../../certificate/uploadAttachmentFile.do?getMs="+getMS(),
				onComplate: function (data) {
					if(data){						
						$('#contractManage .addContractWd .fileName').attr('name',data.attachmentFileName);
						$('#contractManage .addContractWd .fileName').attr('url',data.attachmentFileUrl);
						windowControl('上传成功！');
					}	
				}
			});
			$('#contractManage .addContractWd .inputFile').upload("ajaxSubmit");
		}		
	});
	//上传附件2
	$('#contractManage .addContractWd .submitFileTwo').click(function(){
		var fileUrl = $('#contractManage .addContractWd .fileNameTwo').val();
		if(fileUrl == '' || fileUrl == null){
			windowControl('请先选择上传的附件！');
			return ;
		}else{
			$('#contractManage .addContractWd .inputFileTwo').upload({
				url:"../../certificate/uploadAttachmentFile.do?getMs="+getMS(),
				onComplate: function (data) {
					if(data){						
						$('#contractManage .addContractWd .fileNameTwo').attr('name',data.attachmentFileName);
						$('#contractManage .addContractWd .fileNameTwo').attr('url',data.attachmentFileUrl);
						windowControl('上传成功！');
					}	
				}
			});
			$('#contractManage .addContractWd .inputFileTwo').upload("ajaxSubmit");
		}		
	});
	//提交证书
	$('#contractManage .addContractWd .submitContract').click(function(){
		contractManageSubmit();	
	});
	//修改合同的提交证书
	$('#contractManage .editContractWd .submitContract').click(function(){
		var contractId = $('#contractManage .editContractWd .contractId').val();
		var contractName =  $('#contractManage .editContractWd .contractName').val();
		var describe =  $('#contractManage .editContractWd .describe').val();
		var startTime =  $('#contractManage .editContractWd .startTime').val();
		var endTime =  $('#contractManage .editContractWd .endTime').val();		
		var text = UE.getEditor('contractEditorSecond').getContent();
		var orderExecutorId = $('#contractManage .editContractWd .orderExecutorName').attr('id');
		var orderExecutorName = $('#contractManage .editContractWd .orderExecutorName').val();
		var secondName = $('#contractManage .editContractWd .secondName').val();
		var departmentName = $('#contractManage .editContractWd input[name=departmentName]').val();
		var contractSort = $('#contractManage .editContractWd .contractSort').val();
		if(contractName == '' || contractName == null){
			windowControl('请填写合同名称！');
			return ;
		}else if(describe == '' || describe == null){
			windowControl('请填写合同描述！');
			return ;
		}else if(startTime == '' || startTime == null){
			windowControl('请选择起始时间！');
			return ;
		}else if(endTime == '' || endTime == null){
			windowControl('请选择结束时间！');
			return ;
		}else if(contractSort == '' || contractSort == null){
			windowControl('请选择合同类别！');
			return ;
		}else if(text == '' || text == null){
			windowControl('请编辑合同信息！');
			return ;
		}else if(orderExecutorName == '' || orderExecutorName == null){
			windowControl('请选择跟单人！');
			return ;
		}else if(departmentName == '' || departmentName == null){
			windowControl('请选择部门！');
			return ;
		}
		var data = {
			contractId:contractId,
			contractName:contractName,
			contractDescribe:describe,
			secondName:secondName,
			startTimeStr:startTime,
			endTimeStr:endTime,
			text:text,
			orderExecutorId:orderExecutorId,
			orderExecutorName:orderExecutorName,
			departmentName:departmentName,
			contractSort:contractSort
		}
		$.ajax({
			url:'../../contract/editContract.do?getMs='+getMS(),
			data:data,
			type:'post',
			dataType:'json',
			success:function(data){
				if(data == '200'){
					windowControl('修改成功！');
					contractManageEdit();
				}else{
					windowControl('修改失败！');
				}
			},
			error:function(error){
				windowControl(error.status);
			}
		});
	});
	//合同支付的确定事件
	$('#contractManage .contractPayment .confirm').click(function(){
		var payFlag = $('#contractManage .contractPayment option:selected').text();
		var payAmount = $('#contractManage .contractPayment .payAmount').val();
		var contractId = $('#contractManage .contractPayment .contractId').val();
		var remark = $('#contractManage .contractPayment .remark').val();
		var unpaidAmount = $('#contractManage .contractPayment .unpaidAmount').val();
		if(payFlag == '' || payFlag == null){
			windowControl('请选择支付方式！');
			return ;
		}else if(payAmount == '' || payAmount == null){
			windowControl('请填写付款金额！');
			return ;
		}else if(payAmount > unpaidAmount){
			windowControl('付款金额不能大于未付金额！');
			return ;
		}
		$.ajax({
			url:'../../contract/contractPayment.do?getMs='+getMS(),
			data:{
				payFlag:payFlag,
				payAmount:payAmount,
				contractId:contractId,
				remark:remark,
				aliveFlag:'1'
			},
			success:function(data){
				if(data == 200){
					windowControl('支付成功!');
					$('#contractManage .contractPayment').css('display','none');
					$("#contractManagedg").datagrid('reload');
				}else{
					windowControl('支付失败!');
				}
			},
			error:function(data){
				windowControl('网络异常');
			}
		});
	});
	//合同开票的确定事件
	$('#contractManage .contractInvoicing .confirm').click(function(){
		var payAmount = $('#contractManage .contractInvoicing .payAmount').val();
		var contractId = $('#contractManage .contractInvoicing .contractId').val();
		var remark = $('#contractManage .contractInvoicing .remark').val();
		var noInvoiceAmount = $('#contractManage .contractInvoicing .noInvoiceAmount').val();
		if(payAmount == '' || payAmount == null){
			windowControl('请填写开票金额！');
			return ;
		}else if(payAmount > noInvoiceAmount){
			windowControl('开票金额不能大于未开票金额！');
			return ;
		}
		$.ajax({
			url:'../../contract/contractPayment.do?getMs='+getMS(),
			data:{
				payAmount:payAmount,
				contractId:contractId,
				remark:remark,
				aliveFlag:'2'
			},
			success:function(data){
				if(data == 200){
					windowControl('开票成功!');
					$('#contractManage .contractInvoicing').css('display','none');
					$("#contractManagedg").datagrid('reload');
				}else{
					windowControl('开票失败!');
				}
			},
			error:function(data){
				windowControl('网络异常');
			}
		});
	});
});
//删除合同
function contractClose(contractId){
	ui.confirm('确定将该合同删除吗? ',function(z){
		if(z){
			$.ajax({
				url:'../../contract/closeContract.do?getMs='+getMS(),
				data:{contractId:contractId},
				success:function(data){
					if(data == 200){
						windowControl('删除证书成功!');
						$("#contractManagedg").datagrid('reload');
					}else{
						windowControl('删除证书失败!');
					}
				},
				error:function(data){
					windowControl('网络异常');
				}
			});
		}
	},false);
}
//跟单
function contractDocumentary(){
	contractShowInOther('Documentary');
}
//查看
function contractLook(){
	contractShowInOther('look');
}
//显示合同
function contractShowInOther(type){
	setTimeout(function(){
		var row = $("#contractManagedg").datagrid('getSelected');
		var str = '';
		$('#contractManage .documentary .contractName').attr('id',row.contractId);
		$('#contractManage .documentary .contractName').val(row.contractName);
		$('#contractManage .documentary .secondName').val(row.secondName);
		$('#contractManage .documentary .contractAmount').val(row.contractAmount);
		$('#contractManage .documentary .unit').val(row.unit);
		$('#contractManage .documentary .describe').val(row.contractDescribe);
		if(row.contractSort == '0'){
			$('#contractManage .documentary .contractSort').val('采购合同');
		}else if(row.contractSort == '1'){
			$('#contractManage .documentary .contractSort').val('销售合同');
		}else if(row.contractSort == '2'){
			$('#contractManage .documentary .contractSort').val('服务合同');
		}else if(row.contractSort == null){
			$('#contractManage .documentary .contractSort').val('当前类别为空，请修改合同类别');
		}
		$('#contractManage .documentary .startTime').val(row.startTimeStr);
		if(row.endTimeStr != null){
			$('#contractManage .documentary .endTime').val(row.endTimeStr);
		}
		UE.getEditor('contractEditorFour').setContent(row.text);
		$('#contractManage .documentary .fileName').text(row.attachmentName);
		if(row.attachmentUrl){
			$('#contractManage .documentary .fileName').next('a').attr('href','../../certificate/downLoadAttachmentFile.do?attachmentFileUrl='+row.attachmentUrl+'&attachmentFileName='+row.attachmentName);
			var filePath = row.attachmentUrl;
			var index1 = filePath.lastIndexOf(".");
			var index2 = filePath.length;
			var postf = filePath.substring(index1,index2);
			if(postf == ".pdf"){
				$('#contractManage .documentary .open').attr('href','../../certificate/showPhoto.do?path='+row.attachmentUrl);
			}else{
				$('#contractManage .documentary .open').attr('href','../../certificate/downLoadAttachmentFile.do?attachmentFileUrl='+row.attachmentUrl+'&attachmentFileName='+row.attachmentName);
			}
		}
		if(typeof(row.fileUrl) != "undefined"){
			$('#contractManage .documentary .fileNameTwo').text(row.fileName);
			$('#contractManage .documentary .fileNameTwo').next('a').attr('href','../../certificate/downLoadAttachmentFile.do?attachmentFileUrl='+row.fileUrl+'&attachmentFileName='+row.fileName);
			var filePath = row.fileUrl;
			var index1 = filePath.lastIndexOf(".");
			var index2 = filePath.length;
			var postf = filePath.substring(index1,index2);
			if(postf == ".pdf"){
				$('#contractManage .documentary .openTwo').attr('href','../../certificate/showPhoto.do?path='+row.fileUrl);
			}else{
				$('#contractManage .documentary .openTwo').attr('href','../../certificate/downLoadAttachmentFile.do?attachmentFileUrl='+row.fileUrl+'&attachmentFileName='+row.fileName);
			}
		}else{
			$('#contractManage .documentary .fileNameTwo').text('无');
		}
		$('#contractManage .documentary .orderExecutorName').text(row.orderExecutorName);
		$('#contractManage .documentary .contractName').text(row.contractName);
		if(type == 'look'){
			$('#contractManage .documentary .addRecord').hide();
			$('#contractManage .documentary .addRecordBtn').hide();
		}else{
			$('#contractManage .documentary .addRecord').show();
			$('#contractManage .documentary .addRecordBtn').show();
		}
		//加载record
		loadingRecord(row.contractId,1);
		loadindPayRecord(row.contractId);
		loadingInvoiceRecord(row.contractId);
		$('#contractManage .documentary .addRecordBtn .button').click(function(){
			var content = $('#contractManage .documentary .addRecord .record').val();
			$.ajax({
				url:'../../contract/addRecord.do?getMs='+getMS(),
				data:{contractId:row.contractId,content:content},
				success:function(data){
					if(data == 200){
						windowControl('发表记录成功');
						$('#contractManage .documentary .addRecord .record').val('');
						loadingRecord(row.contractId,1);
					}else{
						windowControl('发表记录失败');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		});
		$('#contractManage .list').hide();
		$('#contractManage .maintop .addContract').hide();
		$('#contractManage .documentary').show();
		$('#contractManage .maintop .back').show();
	},100);
	
}
//提交合同
function contractManageSubmit(){
	var contractName =  $('#contractManage .addContractWd .contractName').val();
	var secondName = $('#contractManage .addContractWd .secondName').val();
	var contractAmount = $('#contractManage .addContractWd .contractAmount').val();
	var unit = $('#contractManage .addContractWd .unit').val();
	var describe =  $('#contractManage .addContractWd .describe').val();
	var startTime =  $('#contractManage .addContractWd .startTime').val();
	var endTime =  $('#contractManage .addContractWd .endTime').val();		
	var text = UE.getEditor('contractEditor').getContent();
	var attachmentName = $('#contractManage .addContractWd .fileName').attr('name');
	var attachmentUrl = $('#contractManage .addContractWd .fileName').attr('url');
	var fileName = $('#contractManage .addContractWd .fileNameTwo').attr('name');
	var fileUrl = $('#contractManage .addContractWd .fileNameTwo').attr('url');
	var inputFileName = $('#contractManage .addContractWd .inputFileTwo').val();//input框内的文件名称
	var orderExecutorId = $('#contractManage .addContractWd .orderExecutorName').attr('id');
	var orderExecutorName = $('#contractManage .addContractWd .orderExecutorName').val();
	var departmentName = $('#contractManage .addContractWd input[name=departmentName]').val();
	var contractSort = $('#contractManage .addContractWd .contractSort').val();
	if(contractName == '' || contractName == null){
		windowControl('请填写合同名称！');
		return ;
	}else if(secondName == '' || secondName == null){
		windowControl('请填写乙方姓名！');
		return ;
	}else if(contractAmount == '' || contractAmount == null){
		windowControl('请填写合同金额！');
		return ;
	}else if(describe == '' || describe == null){
		windowControl('请填写合同描述！');
		return ;
	}else if(contractSort == '' || contractSort == null){
		windowControl('请选择合同类别！');
		return ;
	}else if(startTime == '' || startTime == null){
		windowControl('请选择起始时间！');
		return ;
	}else if(text == '' || text == null){
		windowControl('请编辑合同信息！');
		return ;
	}else if(attachmentUrl == '' || attachmentUrl == null){
		windowControl('请先上传附件1！');
		return ;
	}else if(inputFileName != '' && typeof(fileUrl) == "undefined"){
		windowControl('请先上传附件2！');
		return ;
	}else if(orderExecutorName == '' || orderExecutorName == null){
		windowControl('请选择跟单人！');
		return ;
	}else if(departmentName == '' || departmentName == null){
		windowControl('请选择部门！');
		return ;
	}
	var data = {
		contractName:contractName,
		secondName:secondName,
		unit:unit,
		contractAmount:contractAmount,
		contractDescribe:describe,
		startTimeStr:startTime,
		endTimeStr:endTime,
		text:text,
		attachmentName:attachmentName,
		attachmentUrl:attachmentUrl,
		fileName:fileName,
		fileUrl:fileUrl,
		orderExecutorId:orderExecutorId,
		orderExecutorName:orderExecutorName,
		departmentName:departmentName,
		contractSort:contractSort
	}
	$.ajax({
		url:'../../contract/addContract.do?getMs='+getMS(),
		data:data,
		type:'post',
		dataType:'json',
		success:function(data){
			if(data == '200'){
				windowControl('提交成功！');
				contractManageReset();
			}else{
				windowControl('提交失败！');
				//$('#contractManage .maintop .back').click();
				//contractManageReset();
			}
		},
		error:function(error){
			windowControl(error.status);
		}
	});
}
//加载支付记录
function loadindPayRecord(id){
	$.ajax({
		url:'../../contract/findPayRecordById.do?getMs='+getMS(),
		data:{
			contractId:id,
			aliveFlag:'1'
		},
		type:'post',
		success:function(data){
			data = $.parseJSON(data);
			total = data.total;
			data = data.rows;
			var str = '';
			for(var i = 0;i < data.length;i++){
				str += '<li class="payrecordLi"><p><span>支付时间：</span>'
					+'<span>'+data[i].recordTimeStr+'</span></p><p><span>支付金额：</span><span>'
					+data[i].payAmount+'</span></p><p><span>支付方式：</span><span>'
					+data[i].payFlag+'</span></p></li>';
			}
			$('#contractManage .documentary .payrecordUl').html(str);
		},
		error:function(err){
			windowControl('网络异常');
		}
	});
}
function loadingInvoiceRecord(id){
	$.ajax({
		url:'../../contract/findPayRecordById.do?getMs='+getMS(),
		data:{
			contractId:id,
			aliveFlag:'2'
		},
		type:'post',
		success:function(data){
			data = $.parseJSON(data);
			total = data.total;
			data = data.rows;
			var str = '';
			for(var i = 0;i < data.length;i++){
				str += '<li class="payrecordLi"><p><span>开票时间：</span>'
					+'<span>'+data[i].recordTimeStr+'</span></p><p><span>开票金额：</span><span>'
					+data[i].payAmount+'</span></p></li>';
			}
			$('#contractManage .documentary .invoiceRecordUl').html(str);
		},
		error:function(err){
			windowControl('网络异常');
		}
	});
}
//加载记录
function loadingRecord(id,page){
	//page = Number(page);
	$.ajax({
		url:'../../contract/selectRecord.do?getMs='+getMS(),
		data:{
			contractId:id,
			page:page,
			rows:10
		},
		type:'post',
		success:function(data){
			data = $.parseJSON(data);
			total = data.total;
			data = data.rows;
			var str = '';
			for(var i = 0;i < data.length;i++){
				str += '<li class="recordLi"><p><span>记录时间：</span>'
					+'<span>'+data[i].recordTimeStr+'</span></p><p><span>记录内容：</span><span>'
					+data[i].content+'</span></p></li>';
			}
			$('#contractManage .documentary .recordUl').html(str);
			var total = Math.ceil(total/10);
			var spanStr = '';
			for(var i = 0;i < total;i++){
				if((i+1) == page){
					spanStr += '<span class="pageON" onclick="page(this)" contractId="'+id+'">'+(i+1)+'</span>';
				}else{
					spanStr += '<span onclick="page(this)" contractId="'+id+'">'+(i+1)+'</span>';
				}
				
			}
			$('#contractManage .documentary .pageLi .frist').attr('contractId',id);
			$('#contractManage .documentary .pageLi .prev').attr('contractId',id);
			$('#contractManage .documentary .pageLi .next').attr('contractId',id);
			$('#contractManage .documentary .pageLi .last').attr('contractId',id);
			$('#contractManage .documentary .pageLi .last').attr('page',total);
			$('#contractManage .documentary .pageLi .pageArea').html(spanStr);
		},
		error:function(err){
			windowControl('网络异常');
		}
	});
}
//
function page(ele){
	var a = Number($(ele).text());
	if(isNaN(a)){
		var spanClass = $(ele).attr('class');
		var nowPage = Number($('#contractManage .documentary .pageLi .pageON').text());
		var lastPage = $('#contractManage .documentary .pageLi .last').attr('page');
		console.log(spanClass+';'+nowPage+';'+lastPage);
		if(spanClass == 'frist'){
			a = 1;
		}else if(spanClass == 'prev'){
			if(nowPage == 1){
				a = 1;
			}else{
				a = nowPage-1;
			}
			
		}else if(spanClass == 'next'){
			if(nowPage == lastPage){
				a = lastPage;
			}else{
				a = nowPage+1;
			}
			
		}else if(spanClass == 'last'){
			a = $(ele).attr('page');
		}
	}
	var id = $(ele).attr('contractId');
	loadingRecord(id,a);
}
//清空添加合同
function contractManageReset(){
	$('#contractManage .addContractWd input[type=text]').val(null);
	UE.getEditor('contractEditor').setContent('');					
	$('#contractManage .addContractWd .fileName').removeAttr('name');
	$('#contractManage .addContractWd .fileName').removeAttr('url');
	$('#contractManage #contractInput').val(null);
	$('#contractManage .addContractWd .inputFile').val('');	
}
//清空修改合同
function contractManageEdit(){
	$('#contractManage .editContractWd input[type=text]').val(null);
	UE.getEditor('contractEditorSecond').setContent('');					
	$('#contractManage .editContractWd select').val(null);
	
}
//修改合同信息
function contractEdit(id){
	$('#contractManage .list').hide();
	$('#contractManage .maintop .addContract').hide();
	$('#contractManage .editContractWd').show();
	$('#contractManage .maintop .back').show();
	$('#contractManage .editContractWd .contractId').val(id);
	$.ajax({
		url:'../../contract/selectContract.do?getMs='+getMS(),
		data:{
			contractId:id
		},
		type:'post',
		dataType:'json',
		success:function(data){
			var content = eval(data).rows[0];
			$('#contractManage .editContractWd .contractName').val(content.contractName);
			$('#contractManage .editContractWd .describe').val(content.contractDescribe);
			$('#contractManage .editContractWd .contractSort').val(content.contractSort);
			$('#contractManage .editContractWd .secondName').val(content.secondName);
			$('#contractManage .editContractWd .contractAmount').val(content.contractAmount);
			$('#contractManage .editContractWd .unit').val(content.unit);
			$('#contractManage .editContractWd .startTime').val(content.startTimeStr);
			$('#contractManage .editContractWd .endTime').val(content.endTimeStr);
			$('#contractManage .editContractWd .orderExecutorName').val(content.orderExecutorName);
			UE.getEditor('contractEditorSecond').setContent(content.text);
			$('#contractManage .editContractWd .contractSort').val(content.contractSort);
			$('#contractManage .editContractWd input[name=departmentName]').val(content.departmentName);
		},
		error:function(error){
			windowControl(error.status);
		}
	});
}
//合同支付的点击事件
function contractPayment(id,unpaidAmount){
	$('#contractManage .contractPayment').css('display','block');
	$('#contractManage .contractPayment .contractId').val(id);
	$('#contractManage .contractPayment .unpaidAmount').val(unpaidAmount);
}
//合同开票的点击事件
function contractInvoicing(id,noInvoiceAmount){
	$('#contractManage .contractInvoicing').css('display','block');
	$('#contractManage .contractInvoicing .contractId').val(id);
	$('#contractManage .contractInvoicing .noInvoiceAmount').val(noInvoiceAmount);
}
//数据字典加载支付方式
$('#contractManage .contractPayment .payManner').html(getDataBySelectKeyNo("pay_manner"));
