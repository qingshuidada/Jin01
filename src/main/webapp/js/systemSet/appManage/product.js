$(function(){
	$("#productdg").datagrid({
		  url:'../../thirdPage/selectProdutBySortId.do?getMs='+getMS(),
		  queryParams:{
			   sortId:toSort,
		  }, 
		  rownumbers:"true",
		   pagination:true,
		   toolbar:"#product .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"productName",title:"产品名称",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		       {field:"productNumber",title:"产品编号",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"productSize",title:"产品型号",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"productDescribe",title:"产品描述",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		       {field:"productImageUrl",title:"产品图片url",fitColumns:true,resizable:true,align:"center",sortable:true,width:170},
		       {field:"sortId",title:"sortId",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
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
	$('#product .maintop .add').click(function(){
		$('#product .popups .addProduct').css('display','block');
		$.ajax({
			data:{sortId:toSort},
			url:'../../thirdPage/selectProductTypeBySortId.do?getMs='+getMS(),
			type:'post',
			success:function(data){
				var str = "<option style>--请选择--</option>";
				var data = eval('(' + data + ')'); 
				for(var i=0;i<data.rows.length;i++){
					str +="<option value=" + data.rows[i].productTypeId + ">"+data.rows[i].productTypeName+"</option>";
				}
				$('#product .popups .addProduct .productType').html(str);
			},
			error:function(err){
				windowControl(err.status);
			}
		});
	});
	$('#product .popups .addProduct .confirm').click(function(){
		var productName = $('#product .popups .addProduct .productName').val();
		var productNumber = $('#product .popups .addProduct .productNumber').val();
		var productSize = $('#product .popups .addProduct .productSize').val();
		var productDescribe = $('#product .popups .addProduct .productDescribe').val();
		var productTypeId = $('#product .popups .addProduct .productType option:selected').val();
		var productTypeName = $('#product .popups .addProduct .productType').find("option:selected").text();
		
		var file = $('#product .popups .addProduct .imageFile').val();
	
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
			$('#product .popups .addProduct .imageFile').upload({
				url:"../../thirdPage/addProduct.do?getMs="+getMS(),
				params:{
					productName:productName,
					productNumber:productNumber,
					productSize:productSize,
					productDescribe:productDescribe,
					productTypeId:productTypeId
				},
				onComplate: function (data) {
					if(data == 200){
						windowControl('添加成功');
						$('#product .popups .addProduct').css('display','none');
						$("#productdg").datagrid('reload');
					}else{
						windowControl('添加失败');
					}
				}
			});
			$('#product .popups .addProduct .imageFile').upload("ajaxSubmit");
		}
	});
});
function lookProductImage(imageUrl){
	$('#product .popups .lookImage').css('display','block');
	$('#product .popups .lookImage .imageUrl').attr('src','../..'+imageUrl);
}
function deleteProduct(id){
	ui.confirm('确定要删除此产品？',function(z){
		if(z){
			$.ajax({
				data:{productId:id},
				url:'../../thirdPage/deleteProductById.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == '200'){
						$("newProduct #productdg").datagrid("reload");
						windowControl("删除成功");
					}else{
						windowControl("删除信息失败");
					}
				},
				error:function(err){
					windowControl(err.status);
				}
			});
		}
	},false);
}