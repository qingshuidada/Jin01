var groupManage = {};

groupManage.updateGroup = function(groupId){
	$("#groupManage .popups .updateGroup input[name=groupId]").val(groupId);
	$("#groupManage .popups .updateGroup").css('display','block');
}

groupManage.deleteGroup = function(groupId){
	$.ajax({
		url:'../../processManage/deleteGroup.do',
		type:'post',
		data:{
			groupId:groupId
		},
		success:function(data){
			if(data == 500)
				alert('删除用户组失败');
			else{
				alert("删除用户组成功");
				$('#groupManage .groupdg').datagrid('reload');
			}
		}
	})
}

groupManage.updateGroupTask = function(groupId){
	$("#groupManage .popups .updateGroupTask").css('display','block');
	$("#groupManage .popups .updateGroupTask input[name=groupId]").val(groupId);
	groupManage.createProcess();
}

/**
 * 加载流程信息
 */
groupManage.createProcess = function(){
	var dom = $("#groupManage .popups .updateGroupTask .taskMessage");
	dom.html('');
	var processMessage = $('<div>');
	processMessage.attr('class','processMessage');
	var box = $('<div>');
	box.attr('class','box');
	box.text('加载中，请稍候...');
	processMessage.append(box);
	var desktopBottom = $('div');
	dom.append(processMessage);
	var desktopBottom = $('<div>');
	desktopBottom.attr('class','desktopBottom');
	dom.append(desktopBottom);
	processMessage.html();
	process_plugin.loadingMustTask({
		getUrl:'../../processManage/getMustTask.do',
		data:{
			processTypeId:$("#groupManage .popups .updateGroupTask select[name=processType]").val(),
			groupId:$("#groupManage .popups .updateGroupTask input[name=groupId]").val()
		},
		processTypeId:$("#groupManage .popups .updateGroupTask select[name=processType]").val(),
		groupId:$("#groupManage .popups .updateGroupTask input[name=groupId]").val(),
		readonly:false,
		dom:dom.find('.processMessage').find('.box')
	});
}

groupManage.selectGroupUser = function(groupId){
	
	$("#groupManage .selectGroupUser").css('display','block');
	$("#groupManage .groupList").css('display','none');
	
	var param = {};
	param.dom = $("#groupManage .selectGroupUser .selectUser");
	param.dom.html('');
	
	var userGroup = $('<input>');
	userGroup.attr('name','userGroup');
	userGroup.css('display','none');
	param.dom.find('.process-form').append(userGroup);
	
	var otherBox = $('<div>');
	otherBox.attr('class','process-othersBox');
	otherBox.css('margin','0px');
	param.dom.append(otherBox);
	
	var dgSelectUser = $('<div>');
	dgSelectUser.attr('class','process-usersBox dgSelectUser');
	otherBox.append(dgSelectUser);
	
	var toolbarSelectUser = $('<div>');
	var toolbarId = 'a'+getMS()+'1';
	toolbarSelectUser.attr('id',toolbarId);
	toolbarId = '#'+toolbarId;
	//创建搜索条
	process_plugin.createSelectUserToolBar(toolbarSelectUser,param.dom.find('.dgSelectUser'));
	otherBox.append(toolbarSelectUser);
	
	param.dom.find('.dgSelectUser').datagrid({
		url:'../../process/getUserList.do?getMs='+getMS(),
		toolbar:toolbarId,
		columns:[[
		          {field:'userName',title:'员工姓名',width:100,align:'center'},
		          {field:'departmentName',title:'部门',width:100,align:'center'},
		          {field:'postName',title:'岗位',width:100,align:'center'},
		          {field:'workTimeStr',title:'入职时间',width:150,align:'center'},
		          {field:'sex',title:'性别',width:70,align:'center',formatter: function(value,row,index){
						if (row.sex == '1'){
							return '男';
						} else {
							return '女';
						}
				  }},
				  {field:'_opera',title:'操作',width:70,align:'center',formatter: function(value,row,index){
					  return '<a href="#" onclick="process_plugin.addMustUser(\''+row.userId+'\',\''+groupId+'\',this)">添加</a>';
				  }}
		          ]],
		pagination:true,
		queryParams:{
			departmentUrl:function(){
				return $(toolbarId).find('input[name=departmentUrl]').val();
			},
			userName:function(){
				return $(toolbarId).find('input[name=userName]').val();
			},
			postId:function(){
				return $(toolbarId).find('input[name=postId]').val();
			},
			workTimeStartStr:function(){
				return $(toolbarId).find('input[name=workTimeStartStr]').val();
			},
			workTimeEndStr:function(){
				return $(toolbarId).find('input[name=workTimeEndStr]').val();
			},
			sex:function(){
				return $(toolbarId).find('select[name=sex]').val();
			},
		}
	});
	
	var addAllUser = $('<input>');
	addAllUser.attr('type','button');
	addAllUser.val('全部添加');
	addAllUser.attr('class','addUser');
	otherBox.append(addAllUser);
	addAllUser.click(function(){
		$.ajax({
			url:'../../processManage/addAllMustUser.do?getMs='+getMS(),
			type:'post',
			data:{
				departmentUrl:$(toolbarId).find('input[name=departmentUrl]').val(),
				userName:$(toolbarId).find('input[name=userName]').val(),
				postId:$(toolbarId).find('input[name=postId]').val(),
				workTimeStartStr:$(toolbarId).find('input[name=workTimeStartStr]').val(),
				workTimeEndStr:$(toolbarId).find('input[name=workTimeEndStr]').val(),
				sex:$(toolbarId).find('select[name=sex]').val(),
				groupId:groupId
			},
			success:function(data){
				if(data == '500'){
					alert('添加员工失败');
				}else{
					$(toolbarId2).parents('.selectUser').find('.dgHasUser').datagrid('reload');
				}
			},
			error:function(){
				alert('服务器未响应');
			}
		})
	})
	
	var dgHasUser = $('<div>');
	dgHasUser.attr('class','process-usersBox dgHasUser');
	otherBox.append(dgHasUser);
	
	var toolbarHasUser = $('<div>');
	var toolbarId2 = 'a'+getMS()+'2';
	toolbarHasUser.attr('id',toolbarId2);
	toolbarId2 = '#'+toolbarId2;
	process_plugin.createSelectUserToolBar(toolbarHasUser,param.dom.find('.dgHasUser'));
	otherBox.append(toolbarHasUser);
	
	param.dom.find('.dgHasUser').datagrid({
		url:'../../processManage/getGroupUserList.do?getMs='+getMS(),
		toolbar:toolbarId2,
		columns:[[
		          {field:'userName',title:'员工姓名',width:100,align:'center'},
		          {field:'departmentName',title:'部门',width:100,align:'center'},
		          {field:'postName',title:'岗位',width:100,align:'center'},
		          {field:'workTimeStr',title:'入职时间',width:150,align:'center'},
		          {field:'sex',title:'性别',width:70,align:'center',formatter: function(value,row,index){
						if (row.sex == '1'){
							return '男';
						} else {
							return '女';
						}
				  }},
				  {field:'_opera',title:'操作',width:70,align:'center',formatter: function(value,row,index){
					  return '<a href="#" onclick="process_plugin.deleteMustUser(\''+row.userId+'\',\''+groupId+'\',this)">删除</a>';
				  }}
		          ]],
		pagination:true,
		queryParams:{
			departmentUrl:function(){
				return $(toolbarId2).find('input[name=departmentUrl]').val();
			},
			userName:function(){
				return $(toolbarId2).find('input[name=userName]').val();
			},
			postId:function(){
				return $(toolbarId2).find('input[name=postId]').val();
			},
			workTimeStartStr:function(){
				return $(toolbarId2).find('input[name=workTimeStartStr]').val();
			},
			workTimeEndStr:function(){
				return $(toolbarId2).find('input[name=workTimeEndStr]').val();
			},
			sex:function(){
				return $(toolbarId2).find('select[name=sex]').val();
			},
			groupId:groupId
		}
	});
}

$(function(){
	//调整高度
	$('#groupManage .groupdg').parent().css('height',$('#loadarea').height()-64+'px');
	$('#groupManage .selectGroupUser').css('height',$('#loadarea').height()-31+'px');
	
	//生成数据网格
	$('#groupManage .groupdg').datagrid({
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#groupManage .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
				{field:"canCallBack",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
					var opera = '<span class="small-button edit" title="修改用户组" onclick="groupManage.updateGroup(\''
							+row.groupId+'\')"/></span>';
					opera += '<span class="small-button delete" title="删除用户组" onclick="groupManage.deleteGroup(\''
						+row.groupId+'\')"/></span>';
					opera += '<span class="small-button defaultSet" title="任务设置" onclick="groupManage.updateGroupTask(\''
						+row.groupId+'\')"/></span>';
					opera += '<span class="small-button addbtn" title="用户组人员调动" onclick="groupManage.selectGroupUser(\''
						+row.groupId+'\')"/></span>';
				    return opera;
				}},
		       {field:"groupName",title:"用户组名称",resizable:true,align:"center",sortable:true,width:120},
		       {field:"createTime",title:"创建时间",resizable:true,align:"center",sortable:true,width:120},
		       {field:"createUserName",title:"创建人",resizable:true,align:"center",sortable:true,width:120},
		       {field:"updateTime",title:"修改时间",resizable:true,align:"center",sortable:true,width:150},
		       {field:"updateUserName",title:"修改人",resizable:true,align:"center",sortable:true,width:150},
		  ]],
	});
	
	//查询数据信息
	$('#groupManage .invitetop .select').click(function(){
		$('#groupManage .groupdg').datagrid({
			 url:'../../processManage/getGroupList.do?getMs='+getMS(),
			 queryParams: {
				 groupName: function(){
						return $('#groupManage .invitetop input[name=groupName]').val();
				 },
				 userId: function(){
						return $('#groupManage .invitetop input[name=userId]').val();
				 },
			 }
		 });
	 });
	
	//搜索条中的选择用户的按钮
	$('#groupManage .invitetop .selectUser').click(function(){
		chooseUser();
		$('#chooseUser .confirm').unbind();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUsers = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#chooseUser .confirm').unbind();
	    	$('#groupManage .invitetop input[name=userId]').val(selectUsers[0].userId);
	    	$('#groupManage .invitetop input[name=userName]').val(selectUsers[0].userName);
	    });
	})
	
	//提交用户组修改的点击事件
	$("#groupManage .popups .updateGroup .confirm").click(function(){
		$.ajax({
			url:'../../processManage/updateGroupName.do',
			type:'post',
			data:{
				groupId:$("#groupManage .popups .updateGroup input[name=groupId]").val(),
				groupName:$("#groupManage .popups .updateGroup input[name=groupName]").val()
			},
			success:function(data){
				if(data == 500){
					alert('修改用户组名称失败');
				}else{
					alert("修改用户组名称成功");
					$('#groupManage .groupdg').datagrid('reload');
					$("#groupManage .popups .updateGroup").css('display','none');
				}
			}
		})
	})
	
	//切换类型时重新查询新的流程审批人信息
	$("#groupManage .popups .updateGroupTask select[name=processType]").change(function(){
		groupManage.createProcess();
	})
	
	//添加新的用户组按钮点击事件
	$("#groupManage .maintop .addGroupButton").click(function(){
		$("#groupManage .popups .addGroup").css('display','block');
	})
	
	//添加新用户组点击事件
	$("#groupManage .popups .addGroup .confirm").click(function(){
		$.ajax({
			url:'../../processManage/addGroup.do?getMs='+getMS(),
			type:'post',
			data:{
				groupName:$("#groupManage .popups .addGroup input[name=groupName]").val()
			},
			success:function(data){
				if(data == 500){
					alert("添加新用户组失败");
				}else{
					alert("添加新用户组成功");
					$("#groupManage .popups .addGroup").css('display','none');
					$('#groupManage .groupdg').datagrid('reload');
				}
			},
			error:function(){
				alert("服务器未响应");
			}
		})
	})
	
	//返回用户组列表点击事件
	$("#groupManage .selectGroupUser .backUp").click(function(){
		$("#groupManage .groupList").css('display','block');
		$("#groupManage .selectGroupUser").css('display','none');
	})
	
	//在进入该界面后直接加载流程列表
	$.ajax({
		url:'../../myProcess/getProcesses.do',
		type:'post',
		dataType:'json',
		success:function(data){
			if(data == 500){
				alert('加载流程列表失败');
			}else{
				var processTypes = $("#groupManage .popups .updateGroupTask select[name=processType]");
				for(var idx in data){
					processTypes.append('<option value="'+data[idx].typeId+'">'+data[idx].name+'</option>');
				}
			}
		}
	})
})