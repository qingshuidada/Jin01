$(function(){
	if(existPermission('admin:erp:erpRegister:clientRegister:add'))
		$('#clientRegister .maintop').append('<input type="button" class="button addClient" value="添加"/>'); 
	$('#clientRegisterdg').datagrid({
		   url:'../../erpRegister/queryParentCustomer.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#clientRegister>.invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"customerName",title:"客户名称",resizable:true,fitColumns:true,align:"center",sortable:true,width:100},
		       {field:"salesmanName",title:"业务员名称",resizable:true,fitColumns:true,align:"center",sortable:true,width:100},
		       {field:"phoneNumber",title:"手机号",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"nickName",title:"微信名",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"bindStatus",title:"绑定状态",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"_op",title:"操作",resizable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
		    	   var opera = '';
		    	   var id = "'"+row.customerId+"'";
		    	   var name = "'"+row.customerName+"'";
		    	   var openId = "'"+row.openId+"'";
		    	   if(existPermission('admin:erp:erpRegister:clientRegister:manage'))
		    		   opera += '<span class="small-button xiugai" title="注册姓名" onclick="clientRegister('+id+','+name+')"></span>';
		    	   if(existPermission('admin:erp:erpRegister:clientRegister:update'))
		    		   opera += '<span class="small-button edit" title="修改" onclick=editClient('+index+')></span>';
		    	   if(existPermission('admin:erp:erpRegister:clientRegister:delete'))
		    		   opera += '<span class="small-button delete" title="删除" onclick="deteleClient('+id+')"></span>';
		    	   if(row.bindStatus == '已绑定')
		    		   opera += '<span class="small-button delete" title="解除绑定" onclick="unBind('+openId+')"></span>';
		    	   return opera;
		       }},
		    ]]
	});
	//查询
	$('#clientRegister .query').click(function(){
		$('#clientRegisterdg').datagrid({
			 queryParams:{
				 customerName:$('#clientRegister .invitetop .customerName').val(),
				 salesmanName:$('#clientRegister .invitetop .salesmanName').val()
			   }
		});
	});
	//添加客户弹窗
	$('#clientRegister .maintop .addClient').click(function(){
		$('#clientRegister .newClient').css('display','block');
	});
	//添加验证密码是否一致
	$('#clientRegister .newClient .passwordNext').blur(function(){
		if($(this).val() == $('#clientRegister .newClient .password').val()){
			$('#clientRegister .newClient .prompt').hide();
		}else{
			$('#clientRegister .newClient .prompt').show();
		}
	});
	//选择业务员
	$('#clientRegister .newClient .popuparea .button').click(function(){
		chooseSalesmans()
		//确定选择业务员
		$('.chooseSalesman .confirm').unbind('click');
		$('.chooseSalesman .confirm').click(function(){
			var rows = $('#chooseSalesman1').datagrid('getSelections');
			console.log(rows);
			var str = "";
			var ids = "";
			for(var i=0;i < rows.length;i++){
				str += rows[i].salesmanName + ",";
				ids += rows[i].salesmanId + ",";
			}
			$('#clientRegister .newClient .salesmanIds').val(str);
			$('#clientRegister .newClient .salesmanIds').attr('ids',ids);
			$('.chooseSalesman').hide();
			$('.chooseSalesman .salesmanName').val('')
		});
	});
	//添加客户
	$('#clientRegister .newClient .confirm').click(function(){
		var customerName = $.trim($('#clientRegister .newClient .customerName').val());
		var phoneNumber = $.trim($('#clientRegister .newClient .phoneNumber').val());
		var password = $.trim($('#clientRegister .newClient .password').val());
		var passwordNext = $.trim($('#clientRegister .newClient .passwordNext').val());
		var salesmanIds = $.trim($('#clientRegister .newClient .salesmanIds').attr('ids'));
		if(customerName == '' || customerName == null){
			windowControl('客户名称不能为空');
			return;
		}else if(phoneNumber == '' || phoneNumber == null){
			windowControl('手机号不能为空');
			return;
		}else if(password != passwordNext){
			windowControl('两次密码不一致');
			$('#clientRegister .newClient .prompt').show();
			return;
		}else if(password == '' || password == null){
			windowControl('密码不能为空');
			return;
		}else if(salesmanIds == '' || salesmanIds == null){
			windowControl('业务员不能为空');
			return;
		}else{
			var info = {
				customerName:customerName,
				phoneNumber:phoneNumber,
				password:password,
				salesmanId:salesmanIds
			}
			$.ajax({
				url:'../../erpRegister/addParentCustomer.do?getMs='+getMS(),
				data:info,
				success:function(data){
					if(data == 200){
						windowControl('添加客户成功');
					}else{
						windowControl('添加客户失败');
					}
					$('#clientRegister .newClient').hide();
					$('#clientRegister .newClient .popuparea input[type!=button]').val('');
					$('#clientRegister .newClient .salesmanIds').val('');
					$('#clientRegister .newClient .salesmanIds').attr('ids','');
					$('#clientRegisterdg').datagrid('reload');
				},
				error:function(err){
					windowComntrol('网络异常');
				}
			});
		}
	});
	//修改客户业务员
	$('#clientRegister .editClient .popuparea .button').click(function(){
		chooseSalesmans()
		//确定选择业务员
		$('.chooseSalesman .confirm').unbind('click');
		$('.chooseSalesman .confirm').click(function(){
			var rows = $('#chooseSalesman1').datagrid('getSelections');
			console.log(rows);
			var str = "";
			var ids = "";
			for(var i=0;i < rows.length;i++){
				//str += "'"+ rows[i].salesmanName +"'" + ",";
				//ids += "'"+ rows[i].salesmanId +"'" + ",";
				str += rows[i].salesmanName + ",";
				ids += rows[i].salesmanId + ",";
			}
			$('#clientRegister .editClient .salesmanIds').val(str);
			$('#clientRegister .editClient .salesmanIds').attr('ids',ids);
			$('.chooseSalesman').hide();
			$('.chooseSalesman .salesmanName').val('')
		});
	});
	//修改客户
	$('#clientRegister .editClient .confirm').click(function(){
		var customerId = $('#clientRegister .editClient .customerName').attr('id');
		var customerName = $.trim($('#clientRegister .editClient .customerName').val());
		var phoneNumber = $.trim($('#clientRegister .editClient .phoneNumber').val());
		var salesmanIds = $.trim($('#clientRegister .editClient .salesmanIds').attr('ids'));
		if(customerName == '' || customerName == null){
			windowControl('客户名称不能为空');
			return;
		}else if(phoneNumber == '' || phoneNumber == null){
			windowControl('手机号不能为空');
			return;
		}else{
			var info = {
				customerId:customerId,
				customerName:customerName,
				phoneNumber:phoneNumber,
				salesmanId:salesmanIds
			}
			$.ajax({
				url:'../../erpRegister/updateParentCustomer.do?getMs='+getMS(),
				data:info,
				success:function(data){
					if(data == 200){
						windowControl('修改客户成功');
					}else{
						windowControl('修改客户失败');
					}
					$('#clientRegister .editClient').hide();
					$('#clientRegister .editClient .popuparea input[type!=button]').val('');
					$('#clientRegisterdg').datagrid('reload');
				},
				error:function(err){
					windowComntrol('网络异常');
				}
			});
		}
	});
});
/********************选择业务员******************/
function chooseSalesmans(){
	$('#chooseSalesman1').parent().css({
		'width':'230px',
		'height':'312px'
	});
	$('#chooseSalesman1').datagrid({
		   url:'../../erpRegister/queryParentSalesman.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:false,
		   toolbar:".chooseSalesman .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"salesmanName",title:"业务员名称",resizable:true,fitColumns:true,align:"center",width:100}
		    ]]
	});
	$('.chooseSalesman').show();
	//查询
	$('.chooseSalesman .queryBtn').click(function(){
		$('#chooseSalesman1').datagrid({
			queryParams:{
				   salesmanName:$('.chooseSalesman .invitetop .salesmanName').val()
			   }
		});
	});
}
//客户注册
function clientRegister(id,name){
	toRegister = id;
	toCustomerName = name;
	if(existPermission('admin:erp:erpRegister:clientRegister:manage'))
		loadPage('erp/erpRegister','clientNameRegister','客户姓名注册');
}
//修改
function editClient(index){
	var row = $('#clientRegisterdg').datagrid('getRows')[index];
	$('#clientRegister .editClient .customerName').attr('id',row.customerId);
	$('#clientRegister .editClient .customerName').val(row.customerName);
	$('#clientRegister .editClient .phoneNumber').val(row.phoneNumber);
	$('#clientRegister .editClient .salesmanIds').val(row.salesmanName);
	$('#clientRegister .editClient .salesmanIds').attr('ids',row.salesmanId);
	$('#clientRegister .editClient').show();
}
//删除
function deteleClient(id){
	ui.confirm('确定要删除该客户吗?',function(z){
		if(z){
			$.ajax({
				url:'../../erpRegister/deleteParentCustomer.do?getMs='+getMS(),
				data:{customerId:id},
				success:function(data){
					if(data == 200){
						windowControl('删除客户成功');
					}else{
						windowControl('删除客户失败');
					}
					$('#clientRegisterdg').datagrid('reload');
				},
				error:function(err){
					windowComntrol('网络异常');
				}
			});
		}
	},false)
}
//解除绑定
function unBind(openId){
	ui.confirm('确定要解除吗?',function(z){
		if(z){
			$.ajax({
				url:'../../erpRegister/unBind.do?getMs='+getMS(),
				data:{openId:openId},
				dataType:'json',
				success:function(data){
					if(data.success){
						windowControl('解除绑定成功');
					}else{
						windowControl(data.message);
					}
					$('#clientRegisterdg').datagrid('reload');
				},
				error:function(err){
					windowComntrol('网络异常');
				}
			});
		}
	},false)
}