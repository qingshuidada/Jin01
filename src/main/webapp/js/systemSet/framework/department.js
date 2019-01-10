$(function(){
	/**设置内部网格内容的高度**/
	$("#framework-dept .departmentList").css('height',$('#loadarea').height()-63);
	$("#framework-dept .departmentLeft").css('height',$('#loadarea').height()-63);
	/****设定部门树的内容********/
	$('#framework-dept .departmentTree').tree({
	    url:'../../department/getFramework.do?getMs='+getMS(),
		lines:true,
		dnd:true,
		onContextMenu:function(e, node){
			e.preventDefault();
			var id = node.id;
			$('#rightDeptPopupWindow input[name=url]').val(id);
			$('#rightDeptPopupWindow').menu('show', {
				left: e.pageX,
				top: e.pageY
			});
		},
		onDrop:function(target, source, point){
			if(point != 'append'){
				return false;
			}
			var startNode = source.id;
			var endNode = $('#framework-dept .departmentTree').tree('getNode',target).id;
			$.ajax({
				url:'../../department/moveDepartment.do?getMs='+getMS(),
				type:'post',
				data:{
					operaTab:'修改',
					operaInfo:'更新部门结构(拖动)',
					startNodeUrl:startNode,
					endNodeUrl:endNode
				},
				success:function(data){
					if(data == 200){
						windowControl('更新部门成功');
						$('#framework-dept .departmentList').datagrid('reload');
						$('#framework-dept .departmentTree').tree('reload');
					}else{
						windowControl('更新部门失败');
						$('#framework-dept .departmentTree').tree('reload');
					}
				},
				error:function(){
					windowControl('服务器未响应');
					$('#framework-dept .departmentTree').tree('reload');
				}
			})
		}
    });
	/**********右键单击树结构 添加子部门************/
	$('#rightDeptPopupWindow .addChildDept').click(function(){
		$('#framework-dept .popups .addDept input[name=departmentName]').val(null);
		var url = $('#rightDeptPopupWindow input[name=url]').val();
		$('#framework-dept .popups .addDept input[name=superDepartmentUrl]').val(url);
		$('#framework-dept .popups .addDept').css('display','block');
	})
	/**********右键单击树结构 修改部门名************/
	$('#rightDeptPopupWindow .updateDept').click(function(){
		var url = $('#rightDeptPopupWindow input[name=url]').val();
		updateDept(url);
	})
	/**********右键单击树结构 删除部门************/
	$('#rightDeptPopupWindow .deleteDept').click(function(){
		var url = $('#rightDeptPopupWindow input[name=url]').val();
		deleteDept(url);
	})
	/**********添加部门弹窗保存信息点击事件***********/
	$('#framework-dept .popups .addDept .confirm').click(function(){
		var url = $('#framework-dept .popups .addDept input[name=superDepartmentUrl]').val();
		var departmentName = $('#framework-dept .popups .addDept input[name=departmentName]').val();
		$.ajax({
			url:'../../department/insertDepartment.do?getMs='+getMS(),
			data:{
				operaTab:'添加',
				operaInfo:'添加了一个子部门',
				superDepartmentUrl:url,
				departmentName:departmentName
			},
			success:function(data){
				if(data == 200){
					windowControl('添加成功');
					$('#framework-dept .departmentList').datagrid('reload');
					$('#framework-dept .departmentTree').tree('reload');
					$('#framework-dept .popups .addDept').css('display','none');
				}else{
					windowControl('添加失败');
				}
			},
			error:function(){
				windowControl('服务器未响应');
			}
		})
	})
	/***设定部门的列表内容***/
	$('#framework-dept .departmentList').datagrid({
	   // url:'../../department/getList.do?getMs='+getMS(),
	    method:"post",
	    columns:[[
	        {checkbox:true},
	        {field:'departmentId',title:'部门Id',sortable:true,width:100,hidden:true},
	        {field:'url',title:'部门Url',width:100,sortable:true,hidden:true},
			{field:'departmentName',title:'部门名称',sortable:true,width:100,align:'left'},
			{field:'superDepartmentName',title:'上级部门名',sortable:true,width:100,align:'right'},
			{field:'createUserName',title:'创建人',sortable:true,width:100,align:'right'},
			{field:'createTimeStr',title:'创建时间',sortable:true,width:130,align:'right'},
			{field:'updateUserName',title:'修改人',sortable:true,width:100,align:'right'},
			{field:'updateTimeStr',title:'修改时间',sortable:true,width:130,align:'right'},
			{field:'_operation',title:'操作', width:80,align:'center',
				formatter: function(value,row,index){
					var id = "'"+row.departmentId+"'";
					var name = "'"+row.departmentName+"'";
					var departmentUrl = "'"+row.url+"'";
					var opera = '';
	    		    if(existPermission('admin:personnel:framework:department:update'))
	    				opera +='<span class="small-button edit" title="修改部门名称" onclick="updateDept('+departmentUrl+','+name+')"/>';
	    		    return opera;
					//return '<span class="small-button edit" title="修改部门名称" onclick="updateDept('+departmentUrl+','+name+')"/>'
				}
			}
	    ]],
	    toolbar:'#framework-dept .invitetop',
	    striped:true,
	    loadMsg:'数据加载中',
	    checkbox:true,
	    pagination:true,
    	rownumbers:true
	});
	
	/***添加查询监听事件***/
	$("#framework-dept .select").click(function(){
		$('#framework-dept .departmentList').datagrid({
			url:'../../department/getList.do?getMs='+getMS(),
			queryParams: {
	    		departmentName:function(){
	    			if($('#framework-dept .departmentTree').tree('getSelected') != null && $('#framework-dept .departmentTree').tree('getSelected').text){
	    				var departmentName = $('#framework-dept .departmentTree').tree('getSelected').text;
	    				if(departmentName == '总公司' ||departmentName == '杭州航民达美染整有限公司'){
	    					departmentName = '';
	    				}
	    			}
	    			return $('#framework-dept input[name=departmentName]').val()||departmentName;
	    		},
	    		superDepartmentName:function(){
					return $('#framework-dept input[name=superDepartmentName]').val();
				}
	    	},
		});
	});
	
	/****添加打开管理窗口的点击事件****/
	$("#framework-dept .manger").click(function(){
		$("#framework-dept .inviteissue").css("display","block");
	})
	
})

function deleteDept(url){
	ui.confirm('确定要删除该部门吗?',function(z){
		if(z){
			$.ajax({
				url:'../../department/delete.do?getMs='+getMS(),
				data:{
					operaTab:'删除',
					operaInfo:'删除了一个部门',
					departmentUrl:url
				},
				type:'post',
				success:function(data){
					if(data == 200){
						windowControl('删除部门成功');
						$('#framework-dept .departmentList').datagrid('reload');
						$('#framework-dept .departmentTree').tree('reload');
					}else{
						windowControl('删除部门失败');
					}
				}
			});
		}
	},false);
}

function updateDept(departmentUrl, name){
	$('#framework-dept .popups .updateDept input[name=departmentUrl]').val(departmentUrl);
	$('#framework-dept .popups .updateDept').css('display','block');
}

$(function(){
	$('#framework-dept .popups .updateDept .confirm').click(function(){
		var url = $('#framework-dept .popups .updateDept input[name=departmentUrl]').val();
		var name = $('#framework-dept .popups .updateDept input[name=departmentName]').val();
		if(url == null || url == ''){
			windowControl("未选中部门");
			return ;
		}else if(name == null || name == ''){
			windowControl("请输入新的部门名");
			return ;
		}
		$.ajax({
			url:'../../department/updateName.do?getMs='+getMS(),
			data:{
				operaTab:'修改',
				operaInfo:'修改了一个部门名',
				departmentUrl:url,
				departmentName:name
			},
			type:'post',
			success:function(data){
				if(data != 200){
					windowControl('修改名称失败');
				}else{
					$('#framework-dept .departmentList').datagrid('reload');
					$('#framework-dept .departmentTree').tree('reload');
					$('#framework-dept .popups .updateDept').css('display','none');
					windowControl('修改名称成功');
				}
			},
			error:function(){
				windowControl('服务器未响应');
			}
		})
	})
})


