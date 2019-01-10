$(function(){
	$('#clientCodeResetdg').datagrid({
		   url:'../../erpRegister/queryParentCustomer.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#clientCodeReset .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"customerName",title:"客户名称",resizable:true,fitColumns:true,align:"center",sortable:true,width:100},
		       {field:"phoneNumber",title:"手机号",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"_op",title:"操作",resizable:true,align:"center",sortable:true,width:60,formatter:function(value,row,index){
		    	   var opera = '';
		    	   if(existPermission('admin:erp:erpRegister:clientCodeReset:manage'))
		    	   opera +=  '<span class="small-button resetPW" title="重置密码" onclick=resetCode('+index+')></span>';
		    	   return opera;
		    	}},
		    ]]
	});
	//查询
	$('#clientCodeReset .query').click(function(){
		$('#clientCodeResetdg').datagrid({
			 queryParams:{
				 customerName:$('#clientCodeReset .invitetop .customerName').val()
			   }
		});
	});
	//重置验证密码是否一致
	$('#clientCodeReset .codeReset .passwordNext').blur(function(){
		if($(this).val() == $('#clientCodeReset .codeReset .password').val()){
			$('#clientCodeReset .codeReset .prompt').hide();
		}else{
			$('#clientCodeReset .codeReset .prompt').show();
		}
	});
	//修改密码
	$('#clientCodeReset .codeReset .confirm').click(function(){
		var customerName = $.trim($('#clientCodeReset .codeReset .customerName').val());
		var customerId = $('#clientCodeReset .codeReset .customerName').attr('id');
		var password = $.trim($('#clientCodeReset .codeReset .password').val());
		var passwordNext = $.trim($('#clientCodeReset .codeReset .passwordNext').val());
		if(customerName == '' || customerName == null){
			windowControl('客户名称不能为空');
			return;
		}else if(password == '' || password == null){
			windowControl('密码不能为空');
			return;
		}else if(password != passwordNext){
			windowControl('两次密码不一致');
			$('#clientCodeReset .codeReset .prompt').show();
			return;
		}else{
			var info = {
				customerName:customerName,	
				customerId:customerId,
				password:password
			}
			$.ajax({
				url:'../../erpRegister/updateParentCustomerPassword.do?getMs='+getMS(),
				data:info,
				success:function(data){
					if(data == 200){
						windowControl('修改密码成功');
					}else{
						windowControl('修改密码失败');
					}
					$('#clientCodeReset .codeReset .popuparea input[type!=button]').val('');
					$('#clientCodeReset .codeReset').hide();
					$('#clientCodeResetdg').datagrid('reload');
				},
				error:function(err){
					windowComntrol('网络异常');
				}
			});
		}
	});
});
//
function resetCode(index){
	var row = $('#clientCodeResetdg').datagrid('getRows')[index];
	$('#clientCodeReset .codeReset .customerName').val(row.customerName);
	$('#clientCodeReset .codeReset .customerName').attr('id',row.customerId);
	$('#clientCodeReset .codeReset').show();
}