$(function(){
	//产生数据网格
	$('#roleGivedg').datagrid({
	  // url:'../../userInfo/selectUserInfo.do?getMs='+getMS(),
	   rownumbers:"true",
	   singleSelect:true,
	   pagination:true,
	   toolbar:"#roleGive .invitetop",
	   method:"post",
	   fit: true, 
	   columns:[[
	        {field:"ck",checkbox:true },
			{field:"_opera",title:"管理",width:50,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
				   var id = "'"+row.userId+"'";
				   var name = "'"+row.userName+"'";
				   var opera = '';
					  if(existPermission('admin:personnel:framework:roleGive:update'))
							opera +='<span class="small-button edit" title="角色赋予" onclick="roleGive('+id+','+name+')"></span>';
				   return opera;
			}},	       					       
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
	    	   return getValueFromKey("retire_flag",row.retireFlag);
	       }},*/
	       {field:"workTimeStr",title:"入职时间",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:status},
	       {field:"address",title:"地址",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:status}	       
	    ]],
	})
	
	//选择部门
	$('#roleGive .invitetop .departmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#roleGive .invitetop input[name=departmentName]').val(chooseDept.text);
		     $('#roleGive .invitetop input[name=departmentUrl]').val(chooseDept.id);
		     //$('#roleGive .invitetop input[name=departmentUrl]').attr("departmentText",chooseDept.text);
		     $('#chooseDept .confirm').unbind();
		})
	})
	//选择岗位
	$('#roleGive .invitetop .postChooseObj').click(function(){
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
	    	$('#roleGive .invitetop input[name=postName]').val(postNames);
	    	$('#roleGive .invitetop input[name=postId]').val(postIds);
	    	$('#roleGive .invitetop input[name=postId]').attr("postNames",postNames);
	    	$('#choosePost .confirm').unbind();
	    })
	})
	/*//失去焦点的时候清除部门ID
	 $('#roleGive .invitetop input[name=departmentName]').blur(function(){
		 var compareDepartmentName = $('#roleGive .invitetop input[name=departmentUrl]').attr("departmentText");
		 var departmentName = $('#roleGive .invitetop input[name=departmentName]').val();
		 var departmentUrl =  $('#roleGive .invitetop input[name=departmentUrl]').val();
		 if(compareDepartmentName != departmentName){
			 $('#roleGive .invitetop input[name=departmentUrl]').val(null);
		 }
	 })*/
	 //失去焦点的时候清除岗位ID
	 $('#roleGive .invitetop input[name=postName]').blur(function(){
		 var comparePostName=$('#roleGive .invitetop input[name=postId]').attr("postNames");
		 var postName = $('#roleGive .invitetop input[name=postName]').val();
		 if(comparePostName != postName){
			 $('#roleGive .invitetop input[name=postId]').val(null);
		 }
	 })
	 //点击查询按钮时，根据搜索条件查询信息
	 $('#roleGive .invitetop .query').click(function(){
		 $('#roleGivedg').datagrid({
			 url:'../../userInfo/selectUserInfo.do?getMs='+getMS(),
			queryParams: {
				userName: function(){
					return $('#roleGive .invitetop input[name=peopleName]').val();
				},
				idCard: function(){
					return $('#roleGive .invitetop input[name=idCard]').val();
				},
				departmentUrl: function(){
					return $('#roleGive .invitetop input[name=departmentUrl]').val();
				},
				postId:function(){
					return $('#roleGive .invitetop input[name=postId]').val();
				},
				postName: function(){
					return $('#roleGive .invitetop input[name=postName]').val();
				},
				roleGiveFlag: function(){
					return $('#roleGive .invitetop select[name=roleGiveFlag]').val();
				},
				inviteFlag:'1'
			}
		 });
	 })
	
	//选择角色
	$("#roleGive .roleWindow .roleChooseObj").click(function(){
		chooseRoles();
		$('#chooseRoles .confirm').click(function(){
			$('#chooseRoles').css('display','none');
	    	var selectRoles = $('#chooseRoles .popuparea .role').datagrid('getSelections');
	    	var roleIds = '';
	    	var roleNames = '';
	    	for(i = 0 ;i < selectRoles.length;i++){
	    		roleIds = roleIds + "'" + selectRoles[i].roleId + "',";
	    		roleNames = roleNames + "'" + selectRoles[i].roleName + "',";
	    		
	    	}
	    	//roleIds.substring(0, roleIds.length - 1);
	    	//roleNames.substring(0, roleNames.length - 1);
	    	$("#roleGive .roleWindow input[name=roleNames]").val(roleNames.substring(0, roleNames.length - 1));
	    	$("#roleGive .roleWindow input[name=roleIds]").val(roleIds.substring(0, roleIds.length - 1));
	    	$('#chooseRoles .confirm').unbind();
	    	
		})
	})
	//确定角色赋予
	$("#roleGive .roleWindow .btnarea .save").click(function(){
		var userId = $("#roleGive input[name=userId]").val();
		var userName = $("#roleGive input[name=peopleName]").val();
		var roleIds = $("#roleGive .roleWindow input[name=roleIds]").val();
		$.ajax({
			data:{
				operaTab:'添加',
				operaInfo:'对员工'+userName+'进行了角色赋予',
				userId:userId,
				userName:userName,
				roleIds:roleIds
			},
			url:'../../userInfo/roleGive.do?getMs='+getMS(),
			type:'post',
			success:function(data){
				if(data == '200'){
					windowControl("角色赋予成功");
					$("#roleGive .roleWindow").css('display','none')
					
				}else{
					windowControl("角色赋予失败");
				}
			}
		})
	})
	
})
//角色赋予
function roleGive(id,name){
	$("#roleGive .roleWindow input[name=userId]").val(id);
	$("#roleGive .roleWindow input[name=peopleName]").val(name);
	$.ajax({
		data:{userId:id},
		url:'../../role/queryUserRoleByUserId.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			$("#roleGive .roleWindow").css('display','block');
			var data = eval('('+data+')');
			var roleIds='';
			var roleNames='';
			for(var i=0;i<data.length;i++){
				roleIds+="'"+data[i].roleId+"',";
				roleNames+="'"+data[i].roleName+"',";
			}
			$("#roleGive .roleWindow input[name=roleNames]").val(roleNames.substring(0,roleNames.length-1));
			$("#roleGive .roleWindow input[name=roleIds]").val(roleIds.substring(0,roleIds.length-1));
		},
		error:function(err){
			windowControl(err.status);
		}
	})
}
