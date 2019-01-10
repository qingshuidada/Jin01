$(function(){
	if(existPermission('admin:personnel:framework:post:add'))
		$('#framework-post .maintop').append('<div><span class="maintopicon mainicon2"></span> <span class="add">添加</span></div>');

	/**设置内部网格内容的高度**/
	$("#framework-post .postList").css('height',$('#loadarea').height()-63);
	/***设定部门的列表内容***/
	$('#framework-post .postList').datagrid({
	    method:"post",
	    columns:[[
	        {checkbox:true},
	        {field:'postId',title:'岗位Id',sortable:true,align:"center",width:100,hidden:true},
			{field:'postName',title:'岗位名',sortable:true,width:100,align:'left'},
			{field:'createUserName',sortable:true,title:'创建人',width:100,align:'right'},
			{field:'createTimeStr',sortable:true,title:'创建时间',width:130,align:'right'},
			{field:'updateUserName',sortable:true,title:'修改人',width:100,align:'right'},
			{field:'updateTimeStr',sortable:true,title:'修改时间',width:130,align:'right'},
			{field:'_operation',title:'操作', width:80,align:'center',
				formatter: function(value,row,index){
					var id = "'"+row.postId+"'";
					var name = "'"+row.postName+"'";
					var opera = '';
		    		  if(existPermission('admin:personnel:framework:post:update'))
		    				opera +='<span class="small-button edit" title="修改" onclick="updatePost('+id+','+name+')"/>';
		    		  if(existPermission('admin:personnel:framework:post:delete'))
		    			  opera +='<span class="small-button delete" title="删除" onclick="deletePost('+id+','+name+')"/>';
		    		 return opera;
					/*return '<span class="small-button edit" title="修改" onclick="updatePost('+id+')"/>'+
						'<span class="small-button delete" title="删除" onclick="deletePost('+id+')"/>'*/
				}
			}
	    ]],
	    toolbar:'#framework-post .invitetop',
	    striped:true,
	    loadMsg:'数据加载中',
	    checkbox:true,
	    pagination:true,
    	rownumbers:true
	});
	//清空
	$('#framework-post .invitetop').children("input[value=清空]").click(function(){
		$(this).parent().find('input').not('input[type=button]').val(null);
		$(this).parent().find('select').children('option:first-child').attr('selected',true);
	});
	/***添加查询监听事件***/
	$("#framework-post .select").click(function(){
		var postName = $('#framework-post input[name=postName]').val();
		$('#framework-post .postList').datagrid({
			url:'../../post/selectPostList.do?getMs='+getMS(),
			method:"post",
			queryParams: {
				postName : postName,
			},
		})
	});
	/***添加岗位***/
	$("#framework-post .add").click(function(){
		$('#framework-post .addPost').css('display','block');
	})
	/***保存添加信息***/
	$("#framework-post .addPost .confirm").click(function(){
		var postName = $.trim($("#framework-post .addPost input[name=postName]").val());
		var remark = $.trim($("#framework-post .addPost input[name=remark]").val());
		if(postName == '' || postName == null){
			windowControl("岗位名不能为空");
		}else{
			$.ajax({
				data:{postName:postName,remark:remark,operaTab:'添加',operaInfo:'添加了一个岗位名:'+postName},
				url:'../../post/insertPost.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == '200'){
						windowControl("岗位添加成功");
						$("#framework-post .addPost").css('display','none');
						$('#framework-post .addPost .popuparea input[type=text]').val("");
						$('#framework-post .addPost .popuparea textarea').val("");
						$('#framework-post .addPost .popuparea select').find('option:eq(0)').attr('select',true);
						$('#framework-post .postList').datagrid({
							url:'../../post/selectPostList.do?getMs='+getMS(),
						});
					}else{
						windowControl("岗位添加失败");
					}
				}
			})
		}
	})
	
})

function deletePost(id,name){
	ui.confirm('确定要删除这个岗位吗？',function(z){
		if(z){
			$.ajax({
				url:'../../post/deletePost.do?getMs='+getMS(),
				data:{
					operaTab:'删除',
					operaInfo:'删除了'+name+"岗位",
					postId:id
				},
				type:'get',
				success:function(data){
					if(data == 200){
						windowControl('删除成功');
						$('#framework-post .postList').datagrid('reload');
					}else{
						windowControl('删除失败');
					}
				},
				error:function(){
					windowControl('服务器未响应');
				}
			});
		}
	},false);
}

function updatePost(id,name){
	$('#framework-post .updatePost input[name=originalPostName]').val(name);
	$('#framework-post .updatePost').css('display','block');
	$('#framework-post .updatePost .confirm').click(function(){
		$.ajax({
			url:'../../post/updatePost.do?getMs='+getMS(),
			data:{
				operaTab:'修改',
				operaInfo:'将岗位:'+name+"修改为岗位:"+$('#framework-post .updatePost input[name=postName]').val(),
				postId:id,
				postName:$('#framework-post .updatePost input[name=postName]').val(),
				remark:$('#framework-post .updatePost textarea[name=remark]').val(),
			},
			type:'post',
			success:function(data){
				if(data == 200){
					windowControl('修改成功');
					$('#framework-post .postList').datagrid('reload');
					$('#framework-post .updatePost').css('display','none');
					$('#framework-post .updatePost .popuparea input[type=text]').val("");
					$('#framework-post .updatePost .popuparea textarea').val("");
					$('#framework-post .updatePost .popuparea select').find('option:eq(0)').attr('select',true);
					$('#framework-post .updatePost .confirm').unbind('click');
				}
				
			}
		})
	});

}

