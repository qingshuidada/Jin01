$(function(){
	$('#clientNameRegisterdg').datagrid({
		   url:'../../erpRegister/querySubCustomer.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#clientNameRegister .invitetop",
		   method:"post",
		   fit: true, 
		   queryParams:{
				 customerId:toRegister,
		   },
		   columns:[[
		       {field:"customerName",title:"客户名称",resizable:true,fitColumns:true,align:"center",width:100,formatter:function(value,row,index){
		    	   return toCustomerName;
		       }},
		       {field:"dataSourceName",title:"车间名",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"customerNameSub",title:"车间用名",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"_op",title:"操作",resizable:true,align:"center",sortable:true,width:60,formatter:function(value,row,index){
		    	   var opera = '';
		    	   var id = "'"+row.customerNameId+"'"
		    	   opera +=  '<span class="small-button delete" title="删除" onclick="deleteClientName('+id+')"></span>';
		    	   return opera;
		    	}},
		    ]]
	});
	//查询
	$('#clientNameRegister .query').click(function(){
		var customerNameSub = $('#clientNameRegister .invitetop .customerNameSub').val();
		var dataSourceKey = $('#clientNameRegister .invitetop .dataSource option:selected').val();
		$('#clientNameRegisterdg').datagrid({
			 queryParams:{
				 customerId:toRegister,
				 customerNameSub:customerNameSub,
				 dataSourceKey:dataSourceKey
			 }
		});
	});
	$('#clientNameRegister .newClientName .customerName').val(toCustomerName);
	//添加子客户按钮
	$('#clientNameRegister .addClientName').click(function(){
		$('#clientNameRegister .newClientName').show();
	});
	//添加子客户
	$('#clientNameRegister .newClientName .confirm').click(function(){
		var customerName = toCustomerName;
		var customerId = toRegister;
		var customerNameSub = $.trim($('#clientNameRegister .newClientName .customerNameSub').val());
		var dataSourceKey = $('#clientNameRegister .newClientName .dataSource').val();
		var dataSourceName = $('#clientNameRegister .newClientName .dataSource  option:selected').text();
		if(customerNameSub == ''&&customerNameSub == null){
			windowControl('车间用名不能为空');
		}else{
			var info = {
				dataSourceKey:dataSourceKey,
				dataSourceName:dataSourceName,
				customerNameSub:customerNameSub,
				customerName:customerName,
				customerId:customerId
			}
			$.ajax({
				url:'../../erpRegister/addSubCustomer.do?getMs='+getMS(),
				data:info,
				success:function(data){
					if(data==200){
						windowControl('添加车间用名成功');
					}else{
						windowControl('添加车间用名失败');
					}
					$('#clientNameRegister .newClientName ').hide();
					$('#clientNameRegister .newClientName .customerNameSub').val('');
					$('#clientNameRegisterdg').datagrid('reload');
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	});
});
//加载车间
$.ajax({
	url:'../../erpRegister/queryDataResourceName.do?getMs='+getMS(),
	success:function(data){
		data = $.parseJSON(data);
		var str = '';
		for(var i=0;i<data.length;i++){
			str += '<option value="'+data[i].dataSourceKey+'">'+data[i].dataSourceName+'</option>';
		}
		$('#clientNameRegister .newClientName .dataSource').html(str);
		var str1 = '<option></option>' + str;
		$('#clientNameRegister .invitetop .dataSource').html(str1);
	},
	error:function(err){
		windowComntrol('网络异常');
	}
});
function deleteClientName(id){
	ui.confirm('确认要删除这个客户吗?',function(z){
		if(z){
			$.ajax({
				url:'../../erpRegister/deleteSubCustomer.do?getMs='+getMS(),
				data:{customerNameId:id},
				success:function(data){
					if(data == 200){
						windowControl('删除客户成功');
					}else{
						windowControl('删除客户失败');
					}
					$('#clientNameRegisterdg').datagrid('reload');
				},
				error:function(err){
					windowComntrol('网络异常');
				}
			});
		}
	},false);
}