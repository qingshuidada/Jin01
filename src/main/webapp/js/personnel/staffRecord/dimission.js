var dimissionExcel = [];
$(function(){
	//选择部门
	$('#dimission .invitetop .departmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#dimission .invitetop input[name=departmentName]').val(chooseDept.text);
		     $('#dimission .invitetop input[name=departmentUrl]').val(chooseDept.id);
		     //$('#dimission .invitetop input[name=departmentUrl]').attr("departmentText",chooseDept.text);
		     $('#chooseDept .confirm').unbind();
		})
	});
	//选择岗位
	$('#dimission .invitetop .postChooseObj').click(function(){
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
	    	$('#dimission .invitetop input[name=postName]').val(postNames);
	    	$('#dimission .invitetop input[name=postId]').val(postIds);
	    	$('#dimission .invitetop input[name=postId]').attr("postNames",postNames);
	    	$('#choosePost .confirm').unbind();
	    })
	});
	/*//失去焦点的时候清除部门ID
	 $('#dimission .invitetop input[name=departmentName]').blur(function(){
		 var compareDepartmentName = $('#dimission .invitetop input[name=departmentUrl]').attr("departmentText");
		 var departmentName = $('#dimission .invitetop input[name=departmentName]').val();
		 var departmentUrl =  $('#dimission .invitetop input[name=departmentUrl]').val();
		 if(compareDepartmentName != departmentName){
			 $('#dimission .invitetop input[name=departmentUrl]').val(null);
		 }
	 })*/
	 //失去焦点的时候清除岗位ID
	 $('#dimission .invitetop input[name=postName]').blur(function(){
		 var comparePostName=$('#dimission .invitetop input[name=postId]').attr("postNames");
		 var postName = $('#dimission .invitetop input[name=postName]').val();
		 if(comparePostName != postName){
			 $('#dimission .invitetop input[name=postId]').val(null);
		 }
	 });
	 
	 $('#dimission .invitetop .selectUserInfo').click(function(){
		 if(existPermission('admin:personnel:staffRecord:dimission:select')){
			 var userName = $('#dimission .invitetop input[name=peopleName]').val();
			 var sex = $('#dimission .invitetop select[name=sex]').val();
			 var postName = $('#dimission .invitetop input[name=postName]').val();
			 var postId = $('#dimission .invitetop input[name=postId]').val();
			 var dimissionFlag = $('#dimission .invitetop select[name=dimissionFlag]').val();
			 var dimissionTimeStart = $('#dimission .invitetop input[name=dimissionTimeStart]').val();
			 var dimissionTimeEnd = $('#dimission .invitetop input[name=dimissionTimeEnd]').val();
			 var departmentUrl = $('#dimission .invitetop input[name=departmentUrl]').val();
			 var departmentName = $('#dimission .invitetop input[name=departmentName]').val();
			 var inviteFlag = $('#dimission .invitetop select[name=inviteFlag]').val();
			 $('#dimission .dimissiondg').datagrid({
				 url:'../../dimission/getDimissionList.do?getMs='+getMS(),
				 queryParams: {
						userName: function(){
							return $('#dimission .invitetop input[name=peopleName]').val();
						},
						sex: function(){
							return $('#dimission .invitetop select[name=sex]').val();
						},
						postName: function(){
							return $('#dimission .invitetop input[name=postName]').val();
						},
						postId: function(){
							return $('#dimission .invitetop input[name=postId]').val();
						},
						dimissionFlag: function(){
							return $('#dimission .invitetop select[name=dimissionFlag]').val();
						},
						dimissionTimeStart: function(){
							return $('#dimission .invitetop input[name=dimissionTimeStart]').val();
						},
						dimissionTimeEnd: function(){
							return $('#dimission .invitetop input[name=dimissionTimeEnd]').val();
						},
						departmentUrl: function(){
							return $('#dimission .invitetop input[name=departmentUrl]').val();
						},
						departmentName: function(){
							return $('#dimission .invitetop input[name=departmentName]').val();
						},
						inviteFlag :function(){
							return $('#dimission .invitetop select[name=inviteFlag]').val();
						}
				  }
			 });
			 dimissionExcel = [
	                     {name:'userName',value:userName},
			             {name:'sex',value:sex},
			             {name:'postName',value:postName},
			             {name:'postId',value:postId},
			             {name:'dimissionFlag',value:dimissionFlag},
			             {name:'dimissionTimeStart',value:dimissionTimeStart},
			             {name:'dimissionTimeEnd',value:dimissionTimeEnd},
			             {name:'departmentUrl',value:departmentUrl},
			             {name:'departmentName',value:departmentName},
			             {name:'inviteFlag',value:inviteFlag}
			             ];
		 }
	 })
	
	$('#dimission .dimissiondg').parent().css('height',$('#loadarea').height()-64+'px');
	
	$('#dimission .dimissiondg').datagrid({
		   //url:'../../dimission/getDimissionList.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#dimission .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
				{field:"_opera",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
					   var id = "'"+row.userId+"'";
					   var createUserId = "'"+row.createUserId+"'";
					   var userName = "'"+row.userName+"'";
					   var opera = '';
					   if(row.inviteFlag == 2){
						  if(existPermission('admin:personnel:staffRecord:dimission:manage'))
							  opera +='<span class="small-button recall" title="撤销离职" onclick="backDimission('+id+','+createUserId+','+userName+')"></span>';
						  if(existPermission('admin:personnel:staffRecord:dimission:manage'))
							  opera +='<span class="small-button edit" title="手续齐全离职" onclick="dimission('+id+','+createUserId+','+userName+')"></span>';
					   }else{
						   if(existPermission('admin:personnel:staffRecord:dimission:manage'))
							  opera +='<span class="small-button recall" title="撤销离职" onclick="adminBackDimission('+id+','+createUserId+','+userName+')"></span>';
					   }
					   return opera;
				}},
		       {field:"userName",title:"员工姓名",resizable:true,align:"center",sortable:true,width:60},
		       {field:"sex",title:"性别",resizable:true,align:"center",sortable:true,width:60,formatter:function(value,row,index){
		    	   var sex = row.sex;
		    	   if(sex == 1){
		    		   return '男';
		    	   }else{
		    		   return '女';
		    	   }
		    	}},
		       {field:"dimissionTime",title:"离职时间",resizable:true,align:"center",sortable:true,width:90},
		       {field:"dimissionFlag",title:"离职类别",resizable:true,align:"center",sortable:true,width:60,formatter:function(value,row,index){
		    	  /* if(value ==01){
		    		  return "辞退";
		    	   }else if(value ==02){
		    		  return "开除";
		    	   }else if(value ==03){
		    		  return "急辞";
		    	   }else if(value ==04){
		    		  return "辞职";
		    	   }*/
		    	   return getValueFromKey("dimission_flag",row.dimissionFlag);
		       }},
		       {field:"inviteFlag",title:"离职状态",resizable:true,align:"center",sortable:true,width:90,formatter:function(value,row,index){
		    	   	if(value == 2){
			    		  return "离职无手续";
			    	  }else if(value == 3){
			    		  return "离职有手续";
			    	  }else{
			    		  return "";
			    	  }
			   }},
		       {field:"departmentName",title:"部门",resizable:true,align:"center",sortable:true,width:60},
		       {field:"postName",title:"岗位",resizable:true,align:"center",sortable:true,width:60},
		       {field:"createUserName",title:"操作人",resizable:true,align:"center",sortable:true,width:80},
		       {field:"createTime",title:"操作时间",resizable:true,align:"center",sortable:true,width:90},
		       {field:"remark",title:"备注",resizable:true,align:"center",sortable:true,width:300},
		  ]],
	});
	/**************dimission_flag****************/
	$('#dimission .invitetop select[name=dimissionFlag]').html(getDataBySelectKeyNo("dimission_flag"));
	/*****************设置上下移span的title****************/
	$("#dimission .writetoexcel .upset").attr("title","上移");
	$("#dimission .writetoexcel .downset").attr("title","下移");
	/*****************导出到Excel点击弹窗******************/
	$('#dimission .maintop .write').click(function(){
		$('#dimission .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#dimission .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'userName',tableHeader:'员工姓名',date:false},
			         {propertyName:'sex',tableHeader:'性别',date:false},
			         {propertyName:'dimissionTime',tableHeader:'离职时间',date:true},
			         {propertyName:'inviteFlag',tableHeader:'离职状态',date:false},
			         {propertyName:'departmentName',tableHeader:'部门',date:false},
			         {propertyName:'postName',tableHeader:'岗位',date:false},
			         {propertyName:'createUserName',tableHeader:'操作人',date:false},
			         {propertyName:'createTime',tableHeader:'操作时间',date:true},
			         {propertyName:'remark',tableHeader:'备注',date:true}
				 ]
		})
	});
	/*******************重置按钮点击事件***********************/
	$("#dimission .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#dimission .maintop .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#dimission .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#dimission .writetoexcel").css("display","none");
	})
	/*******************导出按钮点击事件***********************/
	$("#dimission .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#dimission .writetoexcel"));
		var dimissionExcel2 = [];
		for(var i = 0 ; i < dimissionExcel.length ; i++){
			dimissionExcel2.push(dimissionExcel[i]);
		}
		dimissionExcel2.push({
			name:'jsonString',value:jsonString
		});
		//提交导出excel所需要的参数
		
		excelplugin.submit({
			type:'post',
			array:dimissionExcel2,
			action:'../../dimission/writeDimissionToExcel.do?'
		})
	});
	
});

//离职无手续的撤销离职
function backDimission(id,createUserId,userName){
	//获取当前登录的人员信息
	var userId = $('#dimission .maintop input[name=userId]').val();
	if(userId == createUserId){
		ui.confirm('取消离职员工'+userName+'？',function(z){
			if(z){
				$.ajax({
					url:'../../dimission/fireCancel.do?getMs='+getMS(),
					data:{
						operaTab:'修改',
						operaInfo:'对员工'+userName+"进行离职无手续的撤销离职",
						userId:id
					},
					success:function(data){
						if(data == 200){
							windowControl('取消离职成功');
							$('#dimission .dimissiondg').datagrid('reload');
						}else{
							windowControl('取消离职失败');
						}
					},
					error:function(){
						windowControl('服务器未响应');
					}
				});
			}
		},false);	
	}else{
		windowControl("你不是此离职记录的操作员，没有权限操作");
	}
}
//离职有手续的撤销离职，只有admin有权限
function adminBackDimission(id,createUserId,userName){
	var userId = $('#dimission .maintop input[name=userId]').val();
	if(userId == 'admin'){
		ui.confirm('取消离职员工'+userName+'？',function(z){
			if(z){
				$.ajax({
					url:'../../dimission/fireCancel.do?getMs='+getMS(),
					data:{
						operaTab:'修改',
						operaInfo:'对员工'+userName+"进行离职有手续的撤销离职",
						userId:id
					},
					success:function(data){
						if(data == 200){
							windowControl('取消离职成功');
							$('#dimission .dimissiondg').datagrid('reload');
						}else{
							windowControl('取消离职失败');
						}
					},
					error:function(){
						windowControl('服务器未响应');
					}
				});
			}
		},false);
	}else{
		windowControl("因此记录已确认离职，所以只有admin账户才有撤销离职记录的权限");
	}
	
}
//离职无手续变成离职有手续
function dimission(id,createUserId,userName){
	//获取当前登录的人员信息
	var userId = $('#dimission .maintop input[name=userId]').val();
	if(userId == createUserId){
		ui.confirm('确定完成员工'+userName+'的离职吗？',function(z){
			if(z){
				var dom = $('#dimission .popups .dimission');
				$.ajax({
					url:'../../dimission/fireFinish.do?getMs='+getMS(),
					data:{
						operaTab:'修改',
						operaInfo:'将员工'+userName+"从离职无手续变成离职有手续",
						userId:id
					},
					success:function(data){
						if(data == 200){
							windowControl('离职完成成功');
							$('#dimission .dimissiondg').datagrid('reload');
						}else{
							windowControl('离职完成失败');
						}
					},
					error:function(){
						windowControl('服务器未响应');
					}
				})
			}
		})
	}else{
		windowControl("你不是此离职记录的操作员，没有权限操作");
	}
	
}

/*************************获取当前登录人员信息********************************/
function getDocumentMaker(){
	$.ajax({
		url:'../../user/getUserInfo.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var str = '';
			var data = eval('(' + data + ')'); 
			$('#dimission .maintop input[name=userId]').val(data.userId);
		},
		error:function(error){
			windowControl(error.status);
		}
	});
}
getDocumentMaker();