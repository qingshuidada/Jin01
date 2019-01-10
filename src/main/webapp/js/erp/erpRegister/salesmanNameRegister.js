$(function(){
	$('#salesmanNameRegisterdg').datagrid({
		   url:'../../erpRegister/querySubSalesman.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#salesmanNameRegister .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"salesmanName",title:"业务员名称",resizable:true,fitColumns:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
		    	   return toSalesmanName ;
		       }},
		       {field:"dataSourceName",title:"车间名",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"salesmanNameSub",title:"车间用户",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"_op",title:"操作",resizable:true,align:"center",sortable:true,width:60,formatter:function(value,row,index){
		    	   var opera = '';
		    	   var id = "'"+row.salesmanNameId+"'";
		    	   opera +=  '<span class="small-button delete" title="删除" onclick="deletesalesmanName('+id+')"></span>';
		    	   return opera;
		       }},
		    ]],
		    queryParams:{
				   salesmanId:toRegister,
		    }
	});
	//查询
	$('#salesmanNameRegister .invitetop .query').click(function(){
		$('#salesmanNameRegisterdg').datagrid({
			 queryParams:{
			   salesmanId:toRegister,
			   salesmanNameSub:$('#salesmanNameRegister .invitetop .salesmanNameSub').val(),
			   dataSourceName:$('#salesmanNameRegister .invitetop .dataSource option:selected').text()
			}
		});
	});
	//添加子业务员名字弹窗
	$('#salesmanNameRegister .maintop .addSalesmanName').click(function(){
		$('#salesmanNameRegister .newSalesmanName').show();
	});
	//添加子业务员名字
	$('#salesmanNameRegister .newSalesmanName .confirm').click(function(){
		var dataSourceKey = $('#salesmanNameRegister .newSalesmanName .dataSource').val();
		var salesmanNameSub = $('#salesmanNameRegister .newSalesmanName .salesmanNameSub').val();
		var dataSourceName = $('#salesmanNameRegister .newSalesmanName .dataSource  option:selected').text();
		var salesmanName = toSalesmanName;
		var salesmanId = toRegister;
		if(salesmanNameSub == ''&&salesmanNameSub == null){
			windowControl('车间用名不能为空');
		}else{
			var info = {
				dataSourceKey:dataSourceKey,
				dataSourceName:dataSourceName,
				salesmanNameSub:salesmanNameSub,
				salesmanName:salesmanName,
				salesmanId:salesmanId
			}
			$.ajax({
				url:'../../erpRegister/addSubSalesman.do?getMs='+getMS(),
				data:info,
				success:function(data){
					if(data==200){
						windowControl('添加车间用名成功');
					}else{
						windowControl('添加车间用名失败');
					}
					$('#salesmanNameRegister .newSalesmanName').hide();
					$('#salesmanNameRegister .newSalesmanName .salesmanNameSub').val('');
					$('#salesmanNameRegisterdg').datagrid('reload');
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	});
});
$('#salesmanNameRegister .newSalesmanName .salesmanName').val(toSalesmanName);
//加载车间
$.ajax({
	url:'../../erpRegister/queryDataResourceName.do?getMs='+getMS(),
	success:function(data){
		data = $.parseJSON(data);
		var str = '';
		for(var i=0;i<data.length;i++){
			str += '<option value="'+data[i].dataSourceKey+'">'+data[i].dataSourceName+'</option>';
		}
		$('#salesmanNameRegister .newSalesmanName .dataSource').html(str);
		var str1 = '<option></option>' + str;
		$('#salesmanNameRegister .invitetop .dataSource').html(str1);
	},
	error:function(err){
		windowComntrol('网络异常');
	}
});
//
function deletesalesmanName(id){
	ui.confirm('确认要删除这个业务员吗?',function(z){
		if(z){
			$.ajax({
				url:'../../erpRegister/deleteSubSalesman.do?getMs='+getMS(),
				data:{salesmanNameId:id},
				success:function(data){
					if(data == 200){
						windowControl('删除业务员成功');
					}else{
						windowControl('删除业务员失败');
					}
					$('#salesmanNameRegisterdg').datagrid('reload');
				},
				error:function(err){
					windowComntrol('网络异常');
				}
			});
		}
	},false);
}