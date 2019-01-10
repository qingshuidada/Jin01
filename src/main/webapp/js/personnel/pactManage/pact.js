var pactExcel = [];
$(function(){
	if(existPermission('admin:personnel:pactManage:pact:add'))
		$('#pact .maintop').append('<div style="margin-right:6px;"><input type="button" value="添加合同" class="button add"/></div>');
	if(existPermission('admin:personnel:pactManage:pact:export'))
		$('#pact .maintop').append('<div style="margin-right:6px;"><input type="button" value="导出查询结果到Excel" class="button write" /></div>');
	$('#pactdg').datagrid({
	   //url:'../../personnel/selectPackByTime.do?getMs='+getMS(),
	   rownumbers:"true",
	   pagination:true,
	   toolbar:"#pact .invitetop",
	   method:"post",
	   fit: true, 
	   columns:[[
	       {field:"ck",checkbox:true },
	       {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
	    	   var id="'"+row.packId+"'";
	    	   var opera = '';
	    	   if(existPermission('admin:personnel:pactManage:pact:update'))
	    			opera +='<span class="small-button edit" title="修改合同信息" onclick="pactUpdata('+id+')"></span>';
	    	   /*if(existPermission('admin:personnel:pactManage:pact:update'))
	    		   opera +='<span class="small-button addbtn" title="添加合同图片" onclick="uploadPhoto('+id+')"></span>';*/
	    	   /*opera +='<span class="small-button look" title="查看" onclick="lookPact('+id+')"></span>';*/
	    	   if(existPermission('admin:personnel:pactManage:pact:delete'))
	    		   opera +='<span class="small-button delete" title=z"删除" onclick="pactDelete('+id+')"></span>';
	    	   return opera;
	       }},
	       {field:"userName",title:"用户名",fitColumns:true,resizable:true,align:"center",sortable:true,width:70},
	       {field:"invite_flag",title:"在职状态",width:100,fitColumns:true,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
	    	   if(row.inviteFlag == '1')
	    		   return '在职';
	    	   else if(row.inviteFlag == '2')
	    		   return '离职无手续';
	    	   else if(row.inviteFlag == '3')
	    		   return '离职有手续';
	    	   else if(row.inviteFlag == '4')
	    		   return '试用期';
	    	   else if(row.inviteFlag == '5')
	    		   return '工伤';
	       }},
	       {field:"departmentName",title:"部门",fitColumns:true,resizable:true,align:"center",sortable:true,width:70},
	       {field:"strStarTime",title:"合同开始时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
	       {field:"strEndTime",title:"合同终止时间",resizable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
	    	   var id=row.strEndTime;
	    	   var time=id.split("-");
	    	   var newDate=new Date();
	    	   var month = newDate.getMonth() + 1;
	    	   var year = newDate.getFullYear();
	    	   if(time[0] - year == 0){
	    		   if(time[1] - month <= 1){
	    			   return '<span style="color:red">'+id+'</span>';
	    		   }
	    	   }else{
	    		   return '<span>'+id+'</span>'; 
	    	   }  	   
	       }},
	       {field:"strTryStarTime",title:"试用期开始时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
	       {field:"strTryEndTime",title:"试用期结束时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
	       {field:"packFlag",title:"合同类型",resizable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
	    	   if(value == 0){
	    		   return '初签';
	    	   }if(value == 1){
	    		   return '续签';
	    	   }if(value == 2){
	    		   return '返聘';
	    	   }
	       }},
	    ]]
	}); 
	//选择部门
	$('#pact .invitetop .departmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#pact .invitetop input[name=departmentName]').val(chooseDept.text);
		     $('#pact .invitetop input[name=departmentUrl]').val(chooseDept.id);
		     $('#chooseDept .confirm').unbind();
		})
	})
	
	//cento
	/*****************设置上下移span的title****************/
	$("#pact .popups .writetoexcel .upset").attr("title","上移");
	$("#pact .popups .writetoexcel .downset").attr("title","下移");
	
	/*****************导出到Excel点击弹窗******************/
	$("#pact .maintop .write").click(function(){
		$('#pact .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#pact .popups .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'userName',tableHeader:'姓名',date:false},
			         {propertyName:'departmentName',tableHeader:'部门',date:false},
			         {propertyName:'strStarTime',tableHeader:'合同开始时间',date:true},
			         {propertyName:'strEndTime',tableHeader:'合同终止时间',date:true},
			         {propertyName:'strTryStarTime',tableHeader:'试用期开始时间',date:true},
			         {propertyName:'strTryEndTime',tableHeader:'试用期结束时间',date:true},
			         {propertyName:'packFlag',tableHeader:'合同类型',date:false}
				 ]
		})
	})
	
	/*******************重置按钮点击事件***********************/
	$("#pact .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#pact .maintop .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#pact .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#pact .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#pact .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#pact .popups .writetoexcel"));
		
		var pactExcel2 = [];
		for(var i = 0 ; i < pactExcel.length ; i++){
			pactExcel2.push(pactExcel[i]);
		}
		pactExcel2.push({
			name:'jsonString',value:jsonString
		})
		//提交导出excel所需要的参数
		excelplugin.submit({
			type:'post',
			array:pactExcel2,
			action:'../../personnel/writePactToExcel.do?'
		})
	});
	
/**=============添加合同信息=======================*/
	$('#pact .maintop .add').click(function(){
		$('#pact .savePact').css("display","block");
	})
	$('#pact .popups .savePact .chooseUser').click(function(){
		chooseUser();
		 $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#pact .popups .savePact input[name=peopleName]').val(selectUser[0].userName);
	    	$('#pact .popups .savePact input[name=userId]').val(selectUser[0].userId);
	    })
	})
	$('#pact .savePact .confirm').click(function(){
		if(existPermission('admin:personnel:pactManage:pact:select')){
			//获取输入框的内容
			var packFlag = $('#pact .savePact input[name=pactType]:checked').val();
			var userName = $('#pact .savePact input[name=peopleName]').val();
			var userId = $('#pact .savePact input[name=userId]').val();
			var startTime = $('#pact .savePact input[name=startTime]').val();
			var endTime = $('#pact .savePact input[name=endTime]').val();
			var tryStarTime = $('#pact .savePact input[name=tryStarTime]').val();
			var tryEndTime = $('#pact .savePact input[name=tryEndTime]').val();
			if(userName == null || userName == ''){
				windowControl('用户名不能为空');
				return ;
			}else if(packFlag == null || packFlag == ''){
				windowControl('合同类型不能为空');
				return ;
			}else if(startTime == null || startTime == ''){
				windowControl('合同开始时间不能为空');
				return ;
			}else if(endTime == null || endTime == ''){
				windowControl('合同结束不能为空');
				return ;
			}else{
				$.ajax({
					data:{
						userName:userName,
						packFlag:packFlag,
						userId:userId,
						strStarTime:startTime,
						strEndTime:endTime,
						strTryStarTime:tryStarTime,
						strTryEndTime:tryEndTime
						},
					type:"post",
					url:"../../personnel/insertPack.do?getMs="+getMS(),
					success:function(data){
						if(data == 200){
							$('#pact .savePact').css('display','none');
							$('#pact .savePact .popuparea input[type!=button][name!=pactType]').val(null);
							$('#pact .savePact .popuparea text').val(null);
							$('#pact #pactdg').datagrid('reload');
							windowControl('添加合同信息成功');
						}else{
							windowControl('添加合同信息失败');
						}
						
					},
					error:function(){
				    	windowControl("请求失败!");
				    }
				})	
			}
		}
	});
	var userIdList = "";//员工id
	//批量续签合同
	$('#pact .maintop .batchRenew').click(function(){
		var selRow = $("#pactdg").datagrid('getSelections');
		if(selRow.length==0){
			windowControl('请选择需要续签的员工！');
		}else{
			$('#pact .popups .batchRenewPact').css('display','block');
			userList = selRow;
		}
	});
	$('#pact .popups .batchRenewPact .confirm').click(function(){
		var endTime = $('#pact .popups .batchRenewPact input[name=endTime]').val();
		if(endTime == null || endTime == ''){
			windowControl('合同结束不能为空');
			return ;
		}else{
			var submitOBJ = {
					endTime:endTime,
					userList:userList
			}
			$.ajax({
				url:'../../personnel/batchRenewPact.do?getMs='+getMS(),
			    dataType:'json',
			    data:{json:JSON.stringify(submitOBJ)},
			    async:true,
			    type:'POST',
			    success:function(data){
			        //请求成功时处理
			    	if(data == 500){
			    		windowControl('服务器异常！');
			    	}else if(data == 400){
			    		windowControl('数据异常！');
			    	}else{
			    		windowControl('批量续签合同成功！');	
			    		$('#pact .popups .batchRenewPact').css('display','none');
			    		$('#pactdg').datagrid('reload');
			    		$('#pact .popups .batchRenewPact input[name=endTime]').val('');
			    		userIdList = "";
			    	}
			    },
			    error:function(){
			        //请求出错处理
			    }
			});
			
			
		}
	});
});
//修改合同信息
function pactUpdata(id){
	$('#pact .popups .updatePact').css('display','block');
	$.ajax({
		data:{packId:id,},
		url:'../../personnel/selectPackByTime.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var data = eval('(' + data + ')').rows[0];
			$('#pact .updatePact input[name=peopleName]').val(data.userName);
			$('#pact .updatePact input[name=startTime]').val(data.strStarTime);
			$('#pact .updatePact input[name=endTime]').val(data.strEndTime);
			$('#pact .updatePact input[name=tryStarTime]').val(data.strTryStarTime);
			$('#pact .updatePact input[name=tryEndTime]').val(data.strTryEndTime);
			//点击修改
			$('#pact .updatePact .confirm').click(function(){
				//获取输入框的内容
				var packFlag = $('#pact .updatePact input[name=pactType]:checked').val();
				var userName = $('#pact .updatePact input[name=peopleName]').val();
				var startTime = $('#pact .updatePact input[name=startTime]').val();
				var endTime = $('#pact .updatePact input[name=endTime]').val();
				var tryStarTime = $('#pact .updatePact input[name=tryStarTime]').val();
				var tryEndTime = $('#pact .updatePact input[name=tryEndTime]').val();
				if(userName == null || userName == ''){
					windowControl('用户名不能为空');
					return ;
				}else if(packFlag == null || packFlag == ''){
					windowControl('合同类型不能为空');
					return ;
				}else if(startTime == null || startTime == ''){
					windowControl('合同开始时间不能为空');
					return ;
				}else if(endTime == null || endTime == ''){
					windowControl('合同结束不能为空');
					return ;
				}else{
					$.ajax({
						data:{
							packId:id,
							packFlag:packFlag,
							userName:userName,
							strStarTime:startTime,
							strEndTime:endTime,
							strTryStarTime:tryStarTime,
							strTryEndTime:tryEndTime
							},
						type:"post",
						url:"../../personnel/updatePack.do?getMs="+getMS(),
						success:function(data){
							if(data == 200){
								$('#pact .updatePact').css('display','none');
								$('#pact .updatePact .popuparea input[type=text]').val(null);
								$('#pact .updatePact .popuparea text').val(null);
								$('#pact #pactdg').datagrid('reload');
								$('#pact .updatePact .confirm').unbind();
								windowControl('修改合同信息成功');
							}else{
								windowControl('修改合同信息失败');
							}
						},
						error:function(){
					    	windowControl("请求失败!");
					    }
					})
				}		
			})	
		},
		error:function(err){
			windowControl(err.status);
		}
	});
}
/***--------------添加合同图片弹窗关闭---------------****/
var fileHtml = $('#pact .popups .imgTable').html();
$('#pact .popups .saveAllPhoto .turnoff').click(function(){
	$('#pact .popups .imgTable').html(fileHtml);
	$('#pact .popups .saveAllPhoto').css('display','none');
});
$('#pact .popups .saveAllPhoto .cannel').click(function(){
	$('#pact .popups .imgTable').html(fileHtml);
	$('#pact .popups .saveAllPhoto').css('display','none');
});
/**=======================合同的搜索事件========================*/
$(function(){
	$('#pact .query').click(function(){
		var userName = $('#pact .invitetop .userName').val();
		var startTimeStr = $('#pact .invitetop .startTime').val();
		var endTimeStr = $('#pact .invitetop .endTime').val();
		var departmentName = $('#pact .invitetop input[name=departmentName]').val();
		var packFlag = $('#pact .invitetop select[name=packFlag] option:selected').val();
		var inviteFlag = $('#pact .invitetop select[name=inviteFlag]').val();
		$('#pact #pactdg').datagrid({
			url:'../../personnel/selectPackByTime.do?getMs='+getMS(),
			queryParams:{
				userName:userName,
				startTimeStr:startTimeStr,
				endTimeStr:endTimeStr,
				departmentName:departmentName,
				packFlag:packFlag,
				inviteFlag:inviteFlag
			},
		})
		pactExcel = [
		             {name:'userName',value:userName},
		             {name:'startTimeStr',value:startTimeStr},
		             {name:'endTimeStr',value:endTimeStr},
		             {name:'departmentName',value:departmentName}
		          	];
	});
	$('#pact .clean').click(function(){
		$('#pact .invitetop .userName').val(null);
	});
})
/**********************预览图片的方法****************************/
function preview(file){
	var prevDiv = $(file).parent().parent().prev().find('.preview');  
	var reader = new FileReader();
	reader.onload = function(evt){  
		prevDiv.html('<img src="' + evt.target.result + '" style="width:100%;height:100%" />');
	}    
	reader.readAsDataURL(file.files[0]);  
}
/***-------------------删除预览图片--------------------------***/
function deletePhoto(ele){
	var dom = $(ele).parent().parent();
	var domPrev = dom.prev();
	if(domPrev.find('.preview img')){
		ui.confirm('确定要删除该图片吗？',function(z){
			if(z){
				domPrev.remove();
				dom.remove();
				var imgLen = $('#pact .saveAllPhoto .imgTable tr:nth-child(2n)').children("td:first-child");
				for(var i=0; i<imgLen.length;i++){
					imgLen.eq(i).text('第'+(i+1)+'页:'); 
				}
			}
		},false);
	}else{
		windowControl('没有图片可以删除');
	}
}
/*********************批量上传图片*****************************/
function uploadPhoto(id){
	$('#pact .saveAllPhoto').css('display','block');
	//var photoNum = 1;//记录图片选择框个数
	//点击添加图片
	$('#pact .saveAllPhoto .addPhoto').unbind('click');
	$('#pact .saveAllPhoto .addPhoto').click(function(){
		var addPhotoNum = $('#pact .saveAllPhoto .tdClass').length + 1;
		var str=""; 
		str += "<tr><td colspan='3'><div class='preview'></div></td></tr><tr><td>第"
			+addPhotoNum+"页:</td><td class='tdClass' style='text-align:left;'><input size='60' class='cleanPhoto' type='file' onchange='preview(this)'/></td>"
			+"<td><span class='deletePhoto' onclick='deletePhoto(this)'>删除此图片</span></td><td><span class='showImage'></span></td></tr>"; 
		$("#pact .saveAllPhoto .imgTable").append(str);
	});
	$('#pact .saveAllPhoto .confirm').unbind('click');
	$('#pact .saveAllPhoto .confirm').click(function(){
		//判断上传的文件是否是图片格式
		var filepath = $('.tdClass input[type=file]').val();
		var extStart = filepath.lastIndexOf(".");
		var ext = filepath.substring(extStart, filepath.length).toUpperCase();
		if (ext!=".BMP"&&ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG"){
			//提示信息
			windowControl('上传的文件中有非图片格式的文件');
		}else{
			ajaxFileUpload($('.tdClass input[type=file]'),id);
		}
	});	
}
/****************************递归上传图片*******************************/
function ajaxFileUpload(photo,id){
	for(var i = 0;i<photo.length;i++){
		photo.eq(i).upload({
			url:"../../personnel/uploadImage.do?getMs="+getMS(),
			params: {packId:id,},
			onComplate: function (data) {
				if(data ==200){
					$('#pact .saveAllPhoto .showImage').html('<img src=../../img/index/ok.png />');
				}else{
					$('#pact .saveAllPhoto .showImage').html('<img src=../../img/index/turnoff.png />');
				}				
			}
		});
		photo.eq(i).upload("ajaxSubmit");	
	}	
}
/****************************上传图片**********************************/
/*function ajaxFileUpload(photonNum,photo,id){
		$("#uploadImgState"+num).html("<img src=../images/loading.gif />");
		photo.upload({
			url:"../../personnel/uploadImage.do?getMs="+getMS(),
			params: {packId:id,currentPage:photonNum},
			onComplate: function (data) {
				$('#pact .popup:eq(0)').css('display','none');
				$('#pact .popup:eq(0) input').not('.button').val(null);
				$('#pact .popup:eq(0) textarea').val(null);
				$('#pact #pactdg').datagrid('reload');
				windowControl('上传成功');
			}
		});
		photo.upload("ajaxSubmit")
}*/
/**==============当用户点击添加合同图片并上传图片===========================*/
/*function uploadPhoto(id){
	$('#pact .savePhoto').css('display','block');
	var look = document.getElementById('look');
	look.onclick = function(){
		var photoName = $("input[name=photoName]").val();
		var currentPage = $("input[name=currentPage]").val();
		$("input[name=file]").upload({
			url: "../../personnel/uploadImage.do?getMs="+getMS(),
			// 其他表单数据
			params: {packId:id,photoName:photoName,currentPage:currentPage},
			dataType: 'json',
			onComplate: function (data) {
				windowControl('上传成功');
				$('#pact .popup:eq(0)').css('display','none');
				$('#pact .popup:eq(0) input').not('.button').val(null);
				$('#pact .popup:eq(0) textarea').val(null);
				$('#pact #pactdg').datagrid('reload');
			}
		});
		$("input[name=file]").upload("ajaxSubmit")
	}
}*/
/***-----------------------查看合同照片----------------------------------*****/
function lookPact(id){
	$.get("../personnel/pactManage/lookPactPhoto.html",function(data){
		  includeLinkStyle('../../css/personnel/pactManage/lookPactPhoto.css');
		  $.getScript('../../js/personnel/pactManage/lookPactPhoto.js');
		  $('#loadarea').tabs('add',{
		        title:"查看合同图片信息",
			    content:data,
			    closable:true
		  });
			$.ajax({
				data:{packId:id},
				url:'../../personnel/selectPhotoByPackId.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					var json = eval('('+data+')');
					var str = "";
					for(var o in json){
						var url = json[o].urlSmall;
						var bigUrl = json[o].url;
						var page = json[o].currentPage;
						var photoName = json[o].photoName;
						var photoId = "'"+json[o].photoId+"'";
						str += '<div class="photoImage">'
							+  '<tr><td><img src="../../personnel/downLoadImage.do?url='+url+'&photoName='+photoName+'"/></td></tr>'
							+  '<tr><td><a class="load" href="../../personnel/downLoadImage.do?url='+bigUrl+'&photoName='+photoName+'">下载</a></td></tr>'
							+  '<div><tr><td><span class="deletePackPhoto" title="删除此照片" onclick="deletePackPhoto(this,'+photoId+')">删除照片</span></td></tr></div><hr/>'
							+  '</div>';
					}
					$('#lookPactPhotodg').append(str);
				},
				error:function(err){
					windowControl(err.status);
				}
			})
		 })
	   }
/**--------------------删除合同照片--------------***/
function deletePackPhoto(ele,photoId){
	$.ajax({
		data:{photoId:photoId},
		url:'../../personnel/deletePackPhoto.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			if(data == '200'){
				$(ele).parents('.photoImage').remove();
				$("#pact #pactdg").datagrid("reload");
				windowControl("删除成功");
			}else{
				windowControl(data);
			}
		},
		error:function(err){
			windowControl(err.status);
		}
		
	})
}

/***-----------------------------删除合同信息------------------------------------***/
function pactDelete(id){
	ui.confirm('确定要删除该合同信息？',function(z){
		if(z){
			$.ajax({
				data:{packId:id},
				url:'../../personnel/deletePack.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == '200'){
						$("#pact #pactdg").datagrid("reload");
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