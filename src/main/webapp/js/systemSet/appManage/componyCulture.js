$(function(){
	$("#componyCulturedg").datagrid({
		  url:'../../sort/selectAppImage.do?getMs='+getMS(),
		  queryParams:{
			   sortId:toSort,
		  }, 
		  rownumbers:"true",
		   pagination:true,
		   toolbar:"#componyCulture .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"title",title:"图片标题",fitColumns:true,resizable:true,align:"center",sortable:true,width:70},
		       {field:"imageUrl",title:"图片url",fitColumns:true,resizable:true,align:"center",sortable:true,width:240},
		       {field:"imageDescribe",title:"图片描述",fitColumns:true,resizable:true,align:"center",sortable:true,width:200},
		       {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
		    	   var id="'"+row.imageId+"'";
		    	   var imageUrl = "'"+row.imageUrl+"'";
		    	   var opera = '';
		    	   if(existPermission('admin:personnel:pactManage:pact:update'))
		    			opera +='<span class="small-button look" title="查看图片" onclick="lookImage('+imageUrl+')"></span>';
		    	   if(existPermission('admin:personnel:pactManage:pact:delete'))
		    		   opera +='<span class="small-button delete" title="删除图片" onclick="deleteImage('+id+')"></span>';
		    	   return opera;
		       }},
		    ]]		
	});
	//添加图片
	$('#componyCulture .maintop .addImage').click(function(){
		$('#componyCulture .popups .uploadImage').css('display','block');
	});
	$('#componyCulture .popups .uploadImage .confirm').click(function(){
		var title = $('#componyCulture .popups .uploadImage .imageTitle').val();
		var imageDescribe = $('#componyCulture .popups .uploadImage .imageDescribe').val();
		var imageFile = $('#componyCulture .popups .uploadImage .imageFile').val();
		if(title == null || title == ''){
			windowControl('图片标题不能为空');
			return;
		}else if(imageDescribe == null || imageDescribe == ''){
			windowControl('图片描述不能为空');
			return;
		}else if(imageFile == null || imageFile == ''){
			windowControl('图片文件不能为空');
			return;
		}else{
			$('#componyCulture .popups .uploadImage .imageFile').upload({
				url:"../../sort/uploadImage.do?getMs="+getMS(),
				params:{
					sortId:toSort,
					title:title,
					imageDescribe:imageDescribe
				},
				onComplate: function (data) {
					if(data == 200){
						windowControl('添加成功');
						$('#componyCulture .popups .uploadImage').css('display','none');
						$("#componyCulturedg").datagrid('reload');
					}else{
						windowControl('添加失败');
					}
				}
			});
			$('#componyCulture .popups .uploadImage .imageFile').upload("ajaxSubmit");
		}
	});
});
//查看图片
function lookImage(imageUrl){
	$('#componyCulture .popups .lookImage').css('display','block');
	$('#componyCulture .popups .lookImage .imageUrl').attr('src','../..'+imageUrl);
}
//删除图片
function deleteImage(id){
	ui.confirm('确定要删除此照片？',function(z){
		if(z){
			$.ajax({
				data:{imageId:id},
				url:'../../sort/deleteImage.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == '200'){
						$("#componyCulturedg").datagrid("reload");
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