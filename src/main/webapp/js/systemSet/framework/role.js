$(function(){
	if(existPermission('admin:personnel:framework:role:add'))
		$('#framework-role .maintop').append('<div><span class="maintopicon mainicon2"></span> <span class="add">添加</span></div>');

	/**设置内部网格内容的高度**/
	$("#framework-role .roleList").css('height',$('#loadarea').height()-63);
	
	/***设定部门的列表内容***/
	$('#framework-role .roleList').datagrid({
	    //url:'../../role/getRoleList.do?getMs='+getMS(),
	    method:"post",
	    columns:[[
	        {checkbox:true},
	        {field:'roleId',title:'角色Id',sortable:true,width:100,hidden:true},
			{field:'roleName',title:'角色名',sortable:true,width:100,align:'left'},
			{field:'remark',title:'备注',width:100,sortable:true,align:'left'},
			{field:'createUserName',title:'创建人',sortable:true,width:100,align:'right'},
			{field:'createTimeStr',title:'创建时间',sortable:true,width:130,align:'right'},
			{field:'updateUserName',title:'修改人',sortable:true,width:100,align:'right'},
			{field:'updateTimeStr',title:'修改时间',sortable:true,width:130,align:'right'},
			{field:'_operation',title:'操作', width:80,align:'center',
				formatter: function(value,row,index){
					var id = "'"+row.roleId+"'";
					var name = "'"+row.roleName+"'";
					var remark = "'"+row.remark+"'";
					
					var opera = '';
		    		  if(existPermission('admin:personnel:framework:role:update'))
		    				opera +='<span class="small-button addbtn" title="角色授权" onclick="updateRolePower('+id+','+name+')"/>';
		    		  if(existPermission('admin:personnel:framework:role:update'))
		    			  opera +='<span class="small-button edit" title="修改角色名" onclick="updateRoleName('+id+','+name+','+remark+')"/>';
		    		  if(existPermission('admin:personnel:framework:role:delete'))
		    			  opera +='<span class="small-button delete" title="删除角色" onclick="deleteRole('+id+','+name+')"/>';
		    		 return opera;
				}
			}
	    ]],
	    toolbar:'#framework-role .invitetop',
	    striped:true,
	    loadMsg:'数据加载中',
	    checkbox:true,
	    pagination:true,
    	rownumbers:true
	});
	
	/***添加查询监听事件***/
	$("#framework-role .select").click(function(){
		$('#framework-role .roleList').datagrid({
			url:'../../role/getRoleList.do?getMs='+getMS(),
			queryParams: {
	    		roleName:function(){
	    			return $('#framework-role input[name=roleName]').val();
	    		}
	    	},
		});
	});
	
	$('#framework-role .maintop .add').parent().click(function(){
		$('#framework-role .popups .addRole').css('display','block');
	});
	
	$('#framework-role .popups .addRole .confirm').click(function(){
		$.ajax({
			url:'../../role/addRole.do?getMs='+getMS(),
			type:'post',
			data:{
				operaTab:'添加',
				operaInfo:'添加了一个角色名'+$("#framework-role .popups .addRole input[name=roleName]").val(),
				roleName:$("#framework-role .popups .addRole input[name=roleName]").val(),
				remark:$("#framework-role .popups .addRole textarea[name=remark]").val()
			},
			success:function(data){
				if(data == 200){
					windowControl('添加角色信息成功');
					$('#framework-role .roleList').datagrid('reload');
					$("#framework-role .popups .addRole").css('display','none');
				}else{
					windowControl('添加角色失败');
				}
			},
			error:function(){
				windowControl('服务器未响应');
			}
		})
	});
})
/*----------删除角色------------*/
function deleteRole(id,name){
	ui.confirm('确定要删除该角色？',function(z){
		if(z){
			id = '"' + id + '"';
			$.ajax({
				url:'../../role/deleteRole.do?getMs='+getMS(),
				data:{
					operaTab:'删除',
					operaInfo:'删除角色'+name,
					roleIds:id
				},
				type:'post',
				success:function(data){
					if(data == 200){
						windowControl('删除角色成功');
						$('#framework-role .roleList').datagrid('reload');
					}else{
						windowControl('删除角色失败');
					}
				},
				error:function(){
					windowControl('响应超时');
				}
			});
		}
	},false);
}

function updateRolePower(id,name){
	$('#choosePowers .power').tree('reload');
	$.ajax({
		url:'../../role/queryRolePower.do?getMs='+getMS(),
		data:{
			roleId:id
		},
		type:'post',
		success:function(data){
			if(data == 500){
				windowControl('服务器异常');
			}else{
				if(data != '[null]'){
					obj = eval('('+data+')');
					for(var i = 0 ; i<obj.length ; i++){
						var doc = $('#choosePowers .power').tree('find', "'"+obj[i].power+"'")
						if(doc){
							var target = doc.target;
							$('#choosePowers .power').tree('check', target);
						}
					}
				}
				$('#choosePowers .power').tree('collapseAll');
				//$('#choosePowers .power').tree('expand',
					//$('#choosePowers .power').tree('find', 'admin').target);
				choosePowers();
				//添加提交的点击事件
				$('#choosePowers .confirm').unbind();
				$('#choosePowers .confirm').click(function(){
			    	var selectPowers = $('#choosePowers .power').tree('getChecked');
			    	var powers = '';
			    	for(i = 0 ;i < selectPowers.length;i++){
			    		powers = powers + "'" + selectPowers[i].id + '",';
			    	}
			    	powers.substring(0, powers.length - 1);
			    	$.ajax({
			    		url:'../../role/updatePower.do?getMs='+getMS(),
			    		type:'post',
			    		data:{
			    			operaTab:'修改',
			    			operaInfo:'对角色'+name+'进行了授权',
			    			powers:powers,
			    			roleId:id
			    		},
			    		success:function(data){
			    			if(data == 200){
			    				windowControl('修改权限成功');
			    				$('#choosePowers').css('display','none');
			    			}else{
			    				windowControl('修改权限失败');
			    			}
			    		},
			    		error:function(){
			    			windowControl('修改权限失败');
			    		}
			    	})
				});
			}
		},
		error:function(){
			windowControl('服务器未响应');
		}
	})
}

function updateRoleName(id,name,remark){
	$("#framework-role .popups .updateRoleName input[name=roleName]").val(name);
	$("#framework-role .popups .updateRoleName textarea[name=remark]").val(remark),
	$("#framework-role .popups .updateRoleName").css('display','block');
	$("#framework-role .popups .updateRoleName .confirm").unbind('click');
	$("#framework-role .popups .updateRoleName .confirm").click(function(){
		$.ajax({
			url:'../../role/updateRole.do?getMs='+getMS(),
			type:'post',
			data:{
				operaTab:'修改',
				operaInfo:'将角色名从'+name+"改成了"+$("#framework-role .popups .updateRoleName input[name=roleName]").val(),
				roleName:$("#framework-role .popups .updateRoleName input[name=roleName]").val(),
				remark:$("#framework-role .popups .updateRoleName textarea[name=remark]").val(),
				roleId:id
			},
			success:function(data){
				if(data == 200){
					windowControl('更新角色信息成功');
					$('#framework-role .roleList').datagrid('reload');
					$("#framework-role .popups .updateRoleName").css('display','none');
				}else{
					windowControl('更新角色失败');
				}
			},
			error:function(){
				windowControl('更新角色失败');
			}
		})
		$("#framework-role .popups .updateRoleName .confirm").unbind();
	});
}

