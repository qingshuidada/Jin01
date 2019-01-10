$(function(){
	$("#newProductdg").datagrid({
		  url:'../../fourthPage/selectNewProduct.do?getMs='+getMS(),
		  queryParams:{
			   sortId:toSort,
		  }, 
		  rownumbers:"true",
		   pagination:true,
		   toolbar:"#newProduct .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"productName",title:"产品名称",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		       {field:"productNumber",title:"产品编号",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"productSize",title:"产品型号",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"productDescribe",title:"产品描述",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		       {field:"productImageUrl",title:"产品图片url",fitColumns:true,resizable:true,align:"center",sortable:true,width:170},
		       {field:"sortId",title:"sortId",fitColumns:true,resizable:true,align:"center",sortable:true,width:170},
		       {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
		    	   var id="'"+row.productId+"'";
		    	   var imageUrl = "'"+row.productImageUrl+"'";
		    	   var opera = '';
		    	   if(existPermission('admin:personnel:pactManage:pact:update'))
		    			opera +='<span class="small-button look" title="查看产品图片" onclick="lookProductImage('+imageUrl+')"></span>';
		    	   if(existPermission('admin:personnel:pactManage:pact:delete'))
		    		   opera +='<span class="small-button delete" title="删除产品" onclick="deleteProduct('+id+')"></span>';
		    	   return opera;
		       }},
		    ]]		
	});
	$('#newProduct .maintop .add').click(function(){
		$('#newProduct .popups .addNewProduct').css('display','block');
	});
	$('#newProduct .popups .addNewProduct .confirm').click(function(){
		var productName = $('#newProduct .popups .addNewProduct .productName').val();
		var productNumber = $('#newProduct .popups .addNewProduct .productNumber').val();
		var productSize = $('#newProduct .popups .addNewProduct .productSize').val();
		var productDescribe = $('#newProduct .popups .addNewProduct .productDescribe').val();
		var file = $('#newProduct .popups .addNewProduct .imageFile').val();
		var sortId = $('#newProduct .popups .addNewProduct .sortId').val();
	
		if(productName == null || productName == ''){
			windowControl('产品名称不能为空');
			return;
		}else if(productNumber == null || productNumber == ''){
			windowControl('产品编号不能为空');
			return;
		}else if(productSize == null || productSize == ''){
			windowControl('产品型号不能为空');
			return;
		}else if(productDescribe == null || productDescribe == ''){
			windowControl('产品描述不能为空');
			return;
		}else if(file ==''|| file == null){
			windowControl('产品图片不能为空');
			return;
		}else{
			$('#newProduct .popups .addNewProduct .imageFile').upload({
				url:"../../fourthPage/addNewProduct.do?getMs="+getMS(),
				params:{
					productName:productName,
					productNumber:productNumber,
					productSize:productSize,
					sortId:sortId,
					productDescribe:productDescribe
				},
				onComplate: function (data) {
					if(data == 200){
						windowControl('添加成功');
						$('#newProduct .popups .addNewProduct').css('display','none');
						$('#newProduct .popups .addNewProduct .productName').val(null);
						$('#newProduct .popups .addNewProduct .productNumber').val(null);
						$('#newProduct .popups .addNewProduct .productSize').val(null);
						$('#newProduct .popups .addNewProduct .productDescribe').val(null);
						$('#newProduct .popups .addNewProduct .imageFile').val(null);
						$("#newProduct #newProductdg").datagrid('reload');
					}else{
						windowControl('添加失败');
					}
				}
			});
			$('#newProduct .popups .addNewProduct .imageFile').upload("ajaxSubmit");
		}
	});
});
function lookProductImage(imageUrl){
	$('#newProduct .popups .lookImage').css('display','block');
	$('#newProduct .popups .lookImage .imageUrl').attr('src','../..'+imageUrl);
}
function deleteProduct(id){
	ui.confirm('确定要删除此产品？',function(z){
		if(z){
			$.ajax({
				data:{productId:id},
				url:'../../fourthPage/deleteNewProductById.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == '200'){
						windowControl("删除成功");
						$("#newProduct #newProductdg").datagrid('reload');
					}else{
						windowControl("删除失败");
					}
				},
				error:function(err){
					windowControl(err.status);
				}
			});
		}
	},false);
}