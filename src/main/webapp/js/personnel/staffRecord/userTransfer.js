$(function(){
	$('#userTransfer .userTransferDg').parent().css('height',$('#loadarea').height()-63);
	//产生数据网格
	$('#userTransfer .userTransferDg').datagrid({
	   //url:'../../userInfo/selectUserTransfer.do?getMs='+getMS(),
	   rownumbers:"true",
	   singleSelect:true,
	   pagination:true,
	   toolbar:"#userTransfer .invitetop",
	   method:"post",
	   fit: true, 
	   columns:[[
			{field:"_opera",title:"管理",fitColumns:true,sortable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
				   var opera = '';
				   var id = "'"+row.userTransferInfoId+"'";
				   var userId = "'"+row.userId+"'";
				   var userName = "'"+row.userName+"'";
				   var oldPostName = "'"+row.oldPostName+"'";
				   var oldDepartmentName = "'"+row.oldDepartmentName+"'";
				   var newPostName = "'"+row.newPostName+"'";
				   var newDepartmentName = "'"+row.newDepartmentName+"'";
				   var oldPostId = "'"+row.oldPostId+"'";
				   var oldDepartmentUrl = "'"+row.oldDepartmentUrl+"'";
				   var newPostId = "'"+row.newPostId+"'";
				   var newDepartmentUrl = "'"+row.newDepartmentUrl+"'";
				   var transferTimeStr = "'"+row.transferTimeStr+"'";
				   var remark = "'"+row.remark+"'";
				   if(existPermission('admin:personnel:staffRecord:userTransfer:update'))
				       opera +='<span class="small-button edit" title="修改调岗记录" onclick="updateTransfer('
				    	   +id+','+userId+','+userName+','+oldPostName+','+oldDepartmentName+','+newPostName+','+newDepartmentName+','
				    	   +oldPostId+','+oldDepartmentUrl+','+newPostId+','+newDepartmentUrl+','+transferTimeStr+','+remark+
				    	   ')"></span>';
				   if(existPermission('admin:personnel:staffRecord:userTransfer:delete'))
				       opera +='<span class="small-button delete" title="删除调岗记录" onclick="deleteTransfer('
				    	   +id+','+userId+','+oldPostName+','+oldDepartmentName+','+oldPostId+','+oldDepartmentUrl+
				    	   ','+userName+')"></span>';
				   return opera;
			}},     
	       {field:"userName",title:"员工姓名",fitColumns:true,sortable:true,align:"center",sortable:true,width:100 },
	       {field:"oldPostName",title:"原岗位",fitColumns:true,sortable:true,align:"center",sortable:true,width:100 },
	       {field:"oldDepartmentName",title:"原部门",fitColumns:true,sortable:true,align:"center",sortable:true,width:100 },
	       {field:"newPostName",title:"新岗位",fitColumns:true,sortable:true,align:"center",sortable:true,width:100 },
	       {field:"newDepartmentName",title:"新部门",fitColumns:true,sortable:true,align:"center",sortable:true,width:100 },
	       {field:"transferTimeStr",title:"调动时间",fitColumns:true,sortable:true,align:"center",sortable:true,width:100 },
	       {field:"createUserName",title:"调动人",fitColumns:true,sortable:true,align:"center",sortable:true,width:100 },
	       {field:"remark",title:"备注",fitColumns:true,sortable:true,align:"center",sortable:true,width:100 },
	       
	   ]],
	});
	
	//==========查询按钮点击事件===================
	$('#userTransfer .invitetop .query').click(function(){
		if(existPermission('admin:personnel:staffRecord:userTransfer:select')){
			$('#userTransfer .userTransferDg').datagrid({
				url:'../../userInfo/selectUserTransfer.do?getMs='+getMS(),
				 queryParams: {
					   userName:function(){
						   return $('#userTransfer .invitetop input[name=peopleName]').val();
					   },
					   oldPostName:function(){
						   return $('#userTransfer .invitetop input[name=oldPostName]').val();
					   },
					   newPostName:function(){
						   return $('#userTransfer .invitetop input[name=newPostName]').val();
					   },
					   oldDepartmentName:function(){
						   return $('#userTransfer .invitetop input[name=oldDepartmentName]').val();
					   },
					   newDepartmentName:function(){
						   return $('#userTransfer .invitetop input[name=newDepartmentName]').val();
					   },
					   startTimeStr:function(){
						   return $('#userTransfer .invitetop input[name=startTimeStr]').val();
					   },
					   endTimeStr:function(){
						   return $('#userTransfer .invitetop input[name=endTimeStr]').val();
					   },
					}
			});
		}else{
			windowControl('无访问权限');
		}
	});
	//选择老部门
	$('#userTransfer .invitetop .oldDepartmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#userTransfer .invitetop input[name=oldDepartmentName]').val(chooseDept.text);
		     //$('#userTransfer .invitetop input[name=departmentUrl]').val(chooseDept.id);
		     $('#chooseDept .confirm').unbind();
		})
	})
	//选择新部门
	$('#userTransfer .invitetop .newDepartmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#userTransfer .invitetop input[name=newDepartmentName]').val(chooseDept.text);
		     //$('#userTransfer .invitetop input[name=departmentUrl]').val(chooseDept.id);
		     $('#chooseDept .confirm').unbind();
		})
	})
	//选择老岗位
	$('#userTransfer .invitetop .oldPostChooseObj').click(function(){
		choosePost();
		$('#choosePost .confirm').click(function(){
	    	$('#choosePost').css('display','none');
	    	var selectPost = $('#choosePost .popuparea .post').datagrid('getSelections');
	    	var postNames = '';
	    	var postIds = '';
	    	for(var i = 0 ; i<selectPost.length ; i++ ){
	    		postNames = postNames  + selectPost[i].postName + ',';
	    		postIds = postIds + selectPost[i].postId + ',';
	    	}
	    	postNames = postNames.substring(0, postNames.length - 1);
	    	postIds = postIds.substring(0, postIds.length - 1);
	    	$('#userTransfer .invitetop input[name=oldPostName]').val(postNames);
//	    	$('#userInviteManage .invitetop input[name=postId]').val(postIds);
//	    	$('#userInviteManage .invitetop input[name=postId]').attr("postNames",postNames);
	    	$('#choosePost .confirm').unbind();
	    })
	})
	//选择新岗位
	$('#userTransfer .invitetop .newPostChooseObj').click(function(){
		choosePost();
		$('#choosePost .confirm').click(function(){
	    	$('#choosePost').css('display','none');
	    	var selectPost = $('#choosePost .popuparea .post').datagrid('getSelections');
	    	var postNames = '';
	    	var postIds = '';
	    	for(var i = 0 ; i<selectPost.length ; i++ ){
	    		postNames = postNames  + selectPost[i].postName + ',';
	    		postIds = postIds + selectPost[i].postId + ',';
	    	}
	    	postNames = postNames.substring(0, postNames.length - 1);
	    	postIds = postIds.substring(0, postIds.length - 1);
	    	$('#userTransfer .invitetop input[name=newPostName]').val(postNames);
//	    	$('#userInviteManage .invitetop input[name=postId]').val(postIds);
//	    	$('#userInviteManage .invitetop input[name=postId]').attr("postNames",postNames);
	    	$('#choosePost .confirm').unbind();
	    })
	})
	
})

function updateTransfer(id,userId,userName,oldPostName,oldDepartmentName,newPostName,newDepartmentName,
 	   oldPostId,oldDepartmentUrl,newPostId,newDepartmentUrl,transferTimeStr,remark){
		var dom = $('#userTransfer .updateUserTransfer').css('display','block');
		dom.find('input[name=userTransferInfoId]').val(id);
		dom.find('input[name=userId]').val(userId);
		dom.find('input[name=oldPostName]').val(oldPostName);
		dom.find('input[name=oldDepartmentName]').val(oldDepartmentName);
		dom.find('input[name=newPostName]').val(newPostName);
		dom.find('input[name=newDepartmentName]').val(newDepartmentName);
		dom.find('input[name=oldPostId]').val(oldPostId);
		dom.find('input[name=oldDepartmentUrl]').val(oldDepartmentUrl);
		dom.find('input[name=newPostId]').val(newPostId);
		dom.find('input[name=newDepartmentUrl]').val(newDepartmentUrl);
		dom.find('input[name=transferTime]').val(transferTimeStr);
		dom.find('textarea[name=remark]').val(remark);
		//选择岗位
		$('#choosePost .confirm').unbind();
		dom.find('.choosePost').click(function(){
			choosePost();
			$('#choosePost .confirm').click(function(){
				$('#choosePost').css('display','none');
				var selectPost = $('#choosePost .popuparea .post').datagrid('getSelections');
				dom.find('input[name=newPostName]').val(selectPost[0].postName);
				dom.find('input[name=newPostId]').val(selectPost[0].postId);
				$('#choosePost').css('display','none');
			});
		});
		//选择部门
		$('#chooseDept .confirm').unbind();
		dom.find('.chooseDept').click(function(){
			chooseDept();
			$('#chooseDept .confirm').click(function(){
				var chooseDeptObj = $('#chooseDept .dept').tree('getSelected');
				dom.find('input[name=newDepartmentName]').val(chooseDeptObj.text);
				dom.find('input[name=newDepartmentUrl]').val(chooseDeptObj.id);
				$('#chooseDept').css('display','none');
			});
		});
		dom.find('.comfirm').unbind();
		dom.find('.comfirm').click(function(){
		//提交数据
		$.ajax({
			url:'../../userInfo/updateUserTransfer.do?getMs='+getMS(),
			type:'post',
			data:{
				operaTab:'修改',
				operaInfo:'对员工'+userName+"的调岗记录进行了修改",
				userTransferInfoId:dom.find('input[name=userTransferInfoId]').val(),
				oldPostName:dom.find('input[name=oldPostName]').val(),
				oldDepartmentName:dom.find('input[name=oldDepartmentName]').val(),
				newPostName:dom.find('input[name=newPostName]').val(),
				newDepartmentName:dom.find('input[name=newDepartmentName]').val(),
				oldPostId:dom.find('input[name=oldPostId]').val(),
				oldDepartmentUrl:dom.find('input[name=oldDepartmentUrl]').val(),
				newPostId:dom.find('input[name=newPostId]').val(),
				newDepartmentUrl:dom.find('input[name=newDepartmentUrl]').val(),
				transferTimeStr:dom.find('input[name=transferTime]').val(),
				remark:dom.find('textarea[name=remark]').val(),
				userId:dom.find('input[name=userId]').val()
			},
			success:function(data){
				if(data == 200){
					windowControl('修改调岗信息成功');
					$('#userTransfer .updateUserTransfer').css('display','none');
					$('#userTransfer .userTransferDg').datagrid('reload');
				}else{
					windowControl('修改调岗信息失败');
				}
			},
			error:function(){
				windowControl('服务器未响应');
			}
		});
	});
}

function deleteTransfer(id,userId,oldPostName,oldDepartmentName,oldPostId,oldDepartmentUrl,userName){
	ui.confirm('确认删除调岗信息？<br/>（删除后将会恢复调岗）',function(z){
		if(z){
			$.ajax({
				url:'../../userInfo/deleteUserTransfer.do?getMs='+getMS(),
				type:'post',
				data:{
					operaTab:'删除',
					operaInfo:'对员工'+userName+"的调岗信息进行了删除",
					userTransferInfoId:id,
					userId:userId,
					oldPostName:oldPostName,
					oldDepartmentName:oldDepartmentName,
					oldPostId:oldPostId,
					oldDepartmentUrl:oldDepartmentUrl
				},
				success:function(data){
					if(data == 200){
						windowControl('删除调岗信息成功');
						$('#userTransfer .updateUserTransfer').css('display','none');
						$('#userTransfer .userTransferDg').datagrid('reload');
					}else{
						windowControl('删除调岗信息失败');
					}
				},
				error:function(){
					windowControl('服务器未响应');
				}
			});
		}
	});
}