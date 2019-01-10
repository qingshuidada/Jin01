$(function(){
	if(existPermission('admin:workOfficeDoc:cattiManage:cattiManage:add'))
		$("#certificateManage .maintop").append('<div><input type="button" value="添加证书" class="button addCertificate" /></div>');
	//证书类别选择	
	$.ajax({
		url:'../../dictionary/queryDictionary.do?getMs='+getMS(),
		data:{
			selectKey:'certificate_type'
		},
		type:'post',
		dataType:'json',
		success:function(data){
			var str = '<option value=""></option>';			
			var data = data.rows;
			for(var i=0;i<data.length;i++){
				str += '<option value=' + data[i].optionKey + '>' + data[i].optionValue + '</option>';
			}
		    $('#certificateManage .invitetop .certificateId').html(str);
		    $('#certificateManage .add .certificateId').html(str);
		},
		error:function(error){
			windowControl(error.status);
		}
	});
	$("#certificateManagedg").datagrid({
		url:"../../certificate/queryCertificate.do?getMs="+getMS(),
	    rownumbers:"true",
	    singleSelect:true,
	    pagination:true,
	    toolbar:"#certificateManage .invitetop",
	    method:"post",
	    fit: true,
	    columns:[[
  	        {
  	        	field:"certificateName",
  	        	title:"证书名称",
  	        	align:"center",
  	        	width:130
  	        },
  	        {
  	        	field:"certificateDescribe",
  	        	title:"描述",
  	        	align:"center",
  	        	width:130
  	        },
  	        {
  	        	field:"createUserName",
  	        	title:"上传人",
  	        	align:"center",
  	        	width:100
  	        },
  	        {
  	        	field:"effectiveTime",
  	        	title:"有效日期",
  	        	align:"center",
  	        	width:100
  	        },
  	        {
  	        	field:"releaseTime",
  	        	title:"发证日期",
  	        	align:"center",
  	        	width:100
  	        },
  	        {
  	        	field:"createTime",
  	        	title:"上传时间",
  	        	align:"center",
  	        	width:100,
  	        	formatter:function(value,row,index){
  	        		return value.substr(0,10);
				}
  	        },
  	        {
				field:"_opera",
				title:"管理",
				align:"center",
				width:70,				
				formatter:function(value,row,index){
				   var opera = '';
				   var certificateId = "'"+ row.certificateId +"'";
				   var certificateName = "'"+ row.certificateName +"'";
				   opera += '<div class="imgBox">';
				   if(existPermission('admin:workOfficeDoc:cattiManage:cattiManage:update'))
					   opera += '<span style="float:left;" class="small-button edit" title="修改" onclick="certificateManageUpdata('+ certificateId +')"></span>';
				   if(existPermission('admin:workOfficeDoc:cattiManage:cattiManage:delete'))
					   opera += '<span style="float:left;" class="small-button delete" title="删除" onclick="certificateManageDelete('+ certificateName +','+ certificateId +')"></span>';
				   opera += '<span style="float:left;" class="small-button look" title="查看" onclick="certificateManageLook('+ certificateId +')"></span>';
				   opera += '</div>';
				   return opera;
				}
			}
  	        
  	    ]]
	});
	//查询
	$('#certificateManage .query').click(function(){
		var certificateName = $('#certificateManage .invitetop .certificateName').val();
		var validStartTimeStr = $('#certificateManage .invitetop .validStartTimeStr').val();
		var validEndTimeStr = $('#certificateManage .invitetop .validEndTimeStr').val();
		var publishStartTimeStr = $('#certificateManage .invitetop .publishStartTimeStr').val();
		var publishEndTimeStr = $('#certificateManage .invitetop .publishEndTimeStr').val();
		var optionKey = $('#certificateManage .invitetop .certificateId').val();
		
		$("#certificateManagedg").datagrid({
			queryParams: {
				certificateName:certificateName,
				effectiveStartTime:validStartTimeStr,
				effectiveEndTime:validEndTimeStr,
				releaseStartTime:publishStartTimeStr,
				releaseEndTime:publishEndTimeStr,
				optionKey:optionKey
			}
		})
	});
	
	//添加证书的高度
	var height = $('#certificateManage .list').css('height');
	$('#certificateManage .add').css('height',height);
	//添加证书
	$('#certificateManage .maintop .addCertificate').click(function(){
		certificateManageIn();
	})
	//返回
	$('#certificateManage .maintop .back').click(function(){
		$('#certificateManage .list').show();
		$('#certificateManage .add').hide();
		$('#certificateManage .addCertificate').show();
		$('#certificateManage .back').hide();
		$("#certificateManagedg").datagrid('reload');
		$('#certificateManage .add .submitCertificate').show();
		$('#certificateManage .add li input[type=button]').removeAttr('disabled');
		$('#certificateManage .add #lookEditor').hide();
		$('#certificateManage .add #certificateEditor').show();
		certificateManageReset();
	})
	UE.delEditor("certificateEditor");
	UE.getEditor('certificateEditor', {
	    theme:"default", //皮肤
	    lang:'zh-cn',//语言
	    autoHeightEnabled:false,  //不长高
	    initialFrameWidth:1000,  //初始化编辑器宽度,默认1000
        initialFrameHeight:320, //初始化编辑器高度,默认320
        enableAutoSave: false,      //去掉保存
	});
	
	//选择附件	
	$('#certificateManage .add .selectFile').click(function(){
		$('#certificateManage .add .inputFile').click();
	});
	$('#certificateManage .add .inputFile').change(function(){
		var fileName = $('#certificateManage .add .inputFile').val();
		$('#certificateManage .add .fileName').val(fileName);
		$('#certificateManage .add .fileName').removeAttr('name');
		$('#certificateManage .add .fileName').removeAttr('url');
	});
	//上传附件	
	$('#certificateManage .add .submitFile').click(function(){
		var fileUrl = $('#certificateManage .add .fileName').val();
		if(fileUrl == '' || fileUrl == null){
			windowControl('请先选择上传的附件！');
			return ;
		}else{
			$('#certificateManage .add input[type=file]').upload({
				url:"../../certificate/uploadAttachmentFile.do?getMs="+getMS(),
				onComplate: function (data) {
					if(data){						
						$('#certificateManage .add .fileName').attr('name',data.attachmentFileName);
						$('#certificateManage .add .fileName').attr('url',data.attachmentFileUrl);
						windowControl('上传成功！');
					}
						
				}
			});
			$('#certificateManage .add input[type=file]').upload("ajaxSubmit");
		}		
	});
	//提交证书
	$('#certificateManage .add .submitCertificate').click(function(){
		var value = $('#certificateManage #hInput').val();
		if(value){
			certificateManageSubmit(value);			
		}else{
			certificateManageSubmit('add');
		}		
	})
	
});
//清空
function certificateManageReset(){
	$('#certificateManage .add input[type=text]').val(null);
	$('#certificateManage .add select').val(null);
	UE.getEditor('certificateEditor').setContent('');					
	$('#certificateManage .add .fileName').removeAttr('name');
	$('#certificateManage .add .fileName').removeAttr('url');
	$('#certificateManage #hInput').val(null);
	$('#certificateManage .add .inputFile').val('');
	$('#certificateManage .add .load').hide();
}
//证书编辑页面
function certificateManageIn(){
	$('#certificateManage .list').hide();
	$('#certificateManage .add').show();
	$('#certificateManage .addCertificate').hide();
	$('#certificateManage .back').show();
}
//删除证书
function certificateManageDelete(certificateName,certificateId){
	ui.confirm('确定将证书： '+certificateName+' 删除吗？',function(z){
		if(z){
			$.ajax({
				url:'../../certificate/deleteCertificate.do?getMs='+getMS(),
				data:{
					certificateId:certificateId
				},
				type:'post',
				dataType:'json',
				success:function(data){
					if(data == '200'){
						$("#certificateManagedg").datagrid('reload');
					}
				},
				error:function(error){
					windowControl(error.status);
				}
			});
		}		
	},false)	
}
//修改证书
function certificateManageUpdata(certificateId){	
	$.ajax({
		url:"../../certificate/queryCertificate.do?getMs="+getMS(),
		data:{
			certificateId:certificateId
		},
		type:'post',
		dataType:'json',
		success:function(data){
			if(data){
				var obj = data.rows[0];
				certificateManageIn();				
				$('#certificateManage .add .certificateName').val(obj.certificateName);
				$('#certificateManage .add .certificateDescribe').val(obj.certificateDescribe);
				$('#certificateManage .add .effectiveTime').val(obj.effectiveTime);
				$('#certificateManage .add .releaseTime').val(obj.releaseTime);		
				$('#certificateManage .add .certificateId').val(obj.optionKey);
				UE.getEditor('certificateEditor').setContent(obj.certificateMessage);
				$('#certificateManage .add .fileName').val(obj.attachmentFileName);
				$('#certificateManage .add .fileName').attr('name',obj.attachmentFileName);
				$('#certificateManage .add .fileName').attr('url',obj.attachmentFileUrl);
				$('#certificateManage #hInput').val(certificateId);
				$('#certificateManage .add .load').show();
				$('#certificateManage .add .check').show();
				var href = '../../certificate/downLoadAttachmentFile.do?attachmentFileUrl='+ obj.attachmentFileUrl +
				'&amp;attachmentFileName='+ obj.attachmentFileName;
				$('#certificateManage .add .load a').attr('href',href);
				var href1 = '../../certificate/showPhoto1.do?path='+ obj.attachmentFileUrl;
				$('#certificateManage .add .check a').attr('href',href1);
			}		
		},
		error:function(error){
			windowControl(error.status);
		}
	});
	
}
//查看证书
function certificateManageLook(certificateId){
	$.ajax({
		url:"../../certificate/queryCertificate.do?getMs="+getMS(),
		data:{
			certificateId:certificateId
		},
		type:'post',
		dataType:'json',
		success:function(data){
			if(data){
				var obj = data.rows[0];
				certificateManageIn();
				$('#certificateManage .add .certificateName').val(obj.certificateName);
				$('#certificateManage .add .certificateDescribe').val(obj.certificateDescribe);
				$('#certificateManage .add .effectiveTime').val(obj.effectiveTime);
				$('#certificateManage .add .releaseTime').val(obj.releaseTime);
				$('#certificateManage .add .certificateId').val(obj.optionKey);
//				UE.getEditor('certificateEditor').setContent(obj.certificateMessage);
				$('#certificateManage .add #lookEditor').show();
				$('#certificateManage .add #certificateEditor').hide();
				$('#certificateManage .add #lookEditor').html(obj.certificateMessage);
				$('#certificateManage .add .fileName').val(obj.attachmentFileName);
				$('#certificateManage .add .fileName').attr('name',obj.attachmentFileName);
				$('#certificateManage .add .fileName').attr('url',obj.attachmentFileUrl);
				$('#certificateManage .add .submitCertificate').hide();
				$('#certificateManage .add li input[type=button]').attr('disabled','disabled');
				$('#certificateManage .add .load').show();
				$('#certificateManage .add .check').show();
				var href = '../../certificate/downLoadAttachmentFile.do?attachmentFileUrl='+ obj.attachmentFileUrl +
				'&amp;attachmentFileName='+ obj.attachmentFileName;
				$('#certificateManage .add .load a').attr('href',href);
				var href1 = '../../certificate/showPhoto1.do?path='+ obj.attachmentFileUrl;
				$('#certificateManage .add .check a').attr('href',href1);
			}		
		},
		error:function(error){
			windowControl(error.status);
		}
	});
}
//提交
function certificateManageSubmit(type){
	var certificateName =  $('#certificateManage .add .certificateName').val();
	var certificateDescribe =  $('#certificateManage .add .certificateDescribe').val();
	var effectiveTime =  $('#certificateManage .add .effectiveTime').val();
	var releaseTime =  $('#certificateManage .add .releaseTime').val();		
	var optionKey = $('#certificateManage .add .certificateId').val();	
	var certificateMessage = UE.getEditor('certificateEditor').getContent();
	
	var attachmentFileName = $('#certificateManage .add .fileName').attr('name');
	var attachmentFileUrl = $('#certificateManage .add .fileName').attr('url');
	
	if(certificateName == '' || certificateName == null){
		windowControl('请填写证书名称！');
		return ;
	}else if(certificateDescribe == '' || certificateDescribe == null){
		windowControl('请填写证书描述！');
		return ;
	}else if(effectiveTime == '' || effectiveTime == null){
		windowControl('请选择有效日期！');
		return ;
	}else if(optionKey == '' || optionKey == null){
		windowControl('请选择证书类别！');
		return ;
	}else if(releaseTime == '' || releaseTime == null){
		windowControl('请选择发证日期！');
		return ;
	}else if(certificateMessage == '' || certificateMessage == null){
		windowControl('请编辑证书信息！');
		return ;
	}else if(attachmentFileUrl == '' || attachmentFileUrl == null){
		windowControl('请先上传附件！');
		return ;
	}
	var data = '',url = '';
	if(type=='add'){
		data = {
			certificateName:certificateName,
			certificateDescribe:certificateDescribe,
			effectiveTime:effectiveTime,
			releaseTime:releaseTime,
			optionKey:optionKey,
			certificateMessage:certificateMessage,
			attachmentFileName:attachmentFileName,
			attachmentFileUrl:attachmentFileUrl
		};
		url = '../../certificate/addCertificate.do?getMs='+getMS()
	}else{
		data = {
			certificateId:type,
			certificateName:certificateName,
			certificateDescribe:certificateDescribe,
			effectiveTime:effectiveTime,
			releaseTime:releaseTime,
			optionKey:optionKey,
			certificateMessage:certificateMessage,
			attachmentFileName:attachmentFileName,
			attachmentFileUrl:attachmentFileUrl
		};
		
		url = '../../certificate/updateCertificate.do?getMs='+getMS()
	}	
	$.ajax({
		url:url,
		data:data,
		type:'post',
		dataType:'json',
		success:function(data){
			if(data == '200'){
				if(type=='add'){
					windowControl('提交成功！');
					certificateManageReset();
				}else{
					windowControl('修改成功！');
					$('#certificateManage .maintop .back').click();
				}
				
			}
		},
		error:function(error){
			windowControl(error.status);
		}
	});
}