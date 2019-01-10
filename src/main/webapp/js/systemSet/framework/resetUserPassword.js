$(function(){	
	//产生数据网格
	$('#resetUserPassworddg').datagrid({
	  // url:'../../userInfo/selectUserInfo.do?getMs='+getMS(),
	   rownumbers:"true",
	   singleSelect:true,
	   pagination:true,
	   toolbar:"#resetUserPassword .invitetop",
	   method:"post",
	   fit: true, 
	   columns:[[
	       {field:"ck",checkbox:true },					       
	       {field:"userName",title:"员工名字",fitColumns:true,sortable:true,align:"center",sortable:true,width:100 },
	       {field:"userAccount",title:"个人账户",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"departmentName",title:"部门",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"postName",title:"岗位",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"phoneNum",title:"电话号码",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"accidentPhoneNum",title:"紧急联系方式",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"birthdayStr",title:"出生日期",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"idCard",title:"身份证号码",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"sex",title:"性别",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
	    	   var sex = row.sex;
	    	   if(sex == 1){
	    		   return '男';
	    	   }else{
	    		   return '女';
	    	   }
	       }},
	       {field:"invite_flag",title:"在职状态",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
	    	   var inviteFlag = row.inviteFlag;
	    	   return getValueFromKey("invite_flag",row.inviteFlag);
	       }},
	       /*{field:"retire_flag",title:"退休状态",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
	    	   var retireFlag = row.retireFlag;
	    	   if(typeof retireFlag == 'undefined'){
	    		   return '';
	    	   }else if(retireFlag == 1){
	    		   return '正常';
	    	   }else if(retireFlag == 2){
	    		   return '退休';
	    	   }else if(retireFlag == 3){
	    		   return '退休返聘';
	    	   }else{
	    		   return '';
	    	   }
	    	   return getValueFromKey("retire_flag",row.retireFlag);
	       }},*/
	       {field:"workTimeStr",title:"入职时间",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:status},
	       {field:"address",title:"地址",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:status},
	       {field:"_opera",title:"管理",width:150,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
	    	   var id = "'"+row.userId+"'";
	    	   var name = "'"+row.userName+"'";
	    	   var opera = '';
	    		  if(existPermission('admin:personnel:framework:resetUserPassword:manage'))
	    				opera +='<span class="small-button resetPW" title="重置密码" onclick="flashPassword('+id+','+name+')"></span>';
	    		 //return opera;
	    	   //var opera = '<span class="small-button resetPW" title="重置密码" onclick="flashPassword('+id+')"></span>';
	    	   return opera;
	       }},
	   ]]
	});
	//查询
	$('#resetUserPassword .invitetop .query').click(function(){
		$('#resetUserPassworddg').datagrid({
			url:'../../userInfo/selectUserInfo.do?getMs='+getMS(),
			queryParams: {
				userName: function(){
					return $('#resetUserPassword .invitetop input[name=peopleName]').val();
				},
				idCard: function(){
					return $('#resetUserPassword .invitetop input[name=idCard]').val();
				},
				departmentUrl: function(){
					return $('#resetUserPassword .invitetop input[name=departmentUrl]').val();
				},
				postId:function(){
					return $('#resetUserPassword .invitetop input[name=postId]').val();
				},
				postName: function(){
					return $('#resetUserPassword .invitetop input[name=postName]').val();
				},
				inviteFlag:'1'
			}
		});
	});
	//选择部门
	$('#resetUserPassword .invitetop .departmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#resetUserPassword .invitetop input[name=departmentName]').val(chooseDept.text);
		     $('#resetUserPassword .invitetop input[name=departmentUrl]').val(chooseDept.id);
		     //$('#roleGive .invitetop input[name=departmentUrl]').attr("departmentText",chooseDept.text);
		     $('#chooseDept .confirm').unbind();
		})
	})
	//选择岗位
	$('#resetUserPassword .invitetop .postChooseObj').click(function(){
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
	    	$('#resetUserPassword .invitetop input[name=postName]').val(postNames);
	    	$('#resetUserPassword .invitetop input[name=postId]').val(postIds);
	    	$('#resetUserPassword .invitetop input[name=postId]').attr("postNames",postNames);
	    	$('#choosePost .confirm').unbind();
	    })
	})
})

//重置密码
function flashPassword(id,name){
	ui.confirm('确定要重置这位员工的密码？',function(z){
		if(z){
			$.ajax({
				data:{userId:id,operaTab:'修改',operaInfo:'对员工'+name+'进行了密码重置'},
				url:'../../userInfo/resetPassword.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == '200'){
						$("#resetUserPassworddg").datagrid("reload");
						windowControl("重置成功");
					}else{
						windowControl("重置失败");
					}
				},
				error:function(err){
					windowControl(err.status);
				}
			});
		}
	},false);
}