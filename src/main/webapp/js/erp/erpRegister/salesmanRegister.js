$(function(){
	if(existPermission('admin:erp:erpRegister:salesmanRegister:add'))
		$('#salesmanRegister .maintop').append('<input type="button" class="button addSalesman" value="添加"/>');
	$('#salesmanRegisterdg').datagrid({
		   url:'../../erpRegister/queryParentSalesman.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#salesmanRegister .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"salesmanName",title:"业务员名称",resizable:true,fitColumns:true,align:"center",sortable:true,width:100},
		       {field:"nickName",title:"微信名",resizable:true,fitColumns:true,align:"center",sortable:true,width:100},
		       {field:"bindStatus",title:"绑定状态",resizable:true,fitColumns:true,align:"center",sortable:true,width:100},
		       {field:"_op",title:"操作",resizable:true,align:"center",sortable:true,width:60,formatter:function(value,row,index){
			    	var opera = '';
			    	var id = "'"+row.salesmanId+"'";
			    	var name = "'"+row.salesmanName+"'";
			    	var openId = "'"+row.openId+"'";
			    	if(existPermission('admin:erp:erpRegister:salesmanRegister:manage'))
			    		opera += '<span class="small-button xiugai" title="注册姓名" onclick="salesmanName('+id+','+name+')"></span>';
			    	if(existPermission('admin:erp:erpRegister:salesmanRegister:delete'))
			    		opera += '<span class="small-button delete" title="删除" onclick="deleteSalesman('+id+')"></span>';
			    	if(row.bindStatus == '已绑定')
			    		opera += '<span class="small-button delete" title="解除绑定" onclick="unBind('+openId+')"></span>';
			    	return opera;
		       }},
		    ]]
	});
	//查询
	$('#salesmanRegister .query').click(function(){
		$('#salesmanRegisterdg').datagrid({
			 queryParams:{
				   salesmanName:$('#salesmanRegister .invitetop .salesmanName').val()
			   }
		});
	});
	//添加业务员按钮
	$('#salesmanRegister .maintop .addSalesman').click(function(){
		$('#salesmanRegister .newSalesman').show();
	});
	//添加业务员
	$('#salesmanRegister .newSalesman .popuparea .button').click(function(){
		chooseUser();
		$('#chooseUser .confirm').one('click',function(){
			$('#chooseUser').css('display','none');	
			selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
			$('#salesmanRegister .newSalesman .popuparea .salesmanName').val(selectUser[0].userName);
			$('#salesmanRegister .newSalesman .popuparea .salesmanName').attr('id',selectUser[0].userId);
			$('#salesmanRegister .newSalesman .popuparea .salesmanName').attr('userAccount',selectUser[0].userAccount);
			$('#salesmanRegister .newSalesman .popuparea .salesmanName').attr('password',selectUser[0].password);
		});
	});
	//添加业务员弹窗
	$('#salesmanRegister .newSalesman .confirm').click(function(){
		var salesmanName = $('#salesmanRegister .newSalesman .salesmanName').val();
		var userId = $('#salesmanRegister .newSalesman .salesmanName').attr('id');
		var userAccount = $('#salesmanRegister .newSalesman .salesmanName').attr('userAccount');
		var password = $('#salesmanRegister .newSalesman .salesmanName').attr('password');
		$.ajax({
			url:'../../erpRegister/addParentSalesman.do?getMs='+getMS(),
			data:{
				salesmanName:salesmanName,
				userId:userId,
				userAccount:userAccount,
				password:password
			},
			success:function(data){
				console.log(data);
				if(data == 400 || data == 500){
					windowControl('添加业务员失败');
				}else{
					windowControl(data);
				}
				$('#salesmanRegister .newSalesman').hide();
				$('#salesmanRegister .newSalesman .salesmanName').val('');
				$('#salesmanRegisterdg').datagrid('reload');
			},
			error:function(err){
				windowComntrol('网络异常');
			}
		})
	});
});
//
var toSalesmanName;
function salesmanName(id,name){
	toRegister = id;
	toSalesmanName = name;
	if(existPermission('admin:erp:erpRegister:salesmanRegister:manage'))
		loadPage('erp/erpRegister','salesmanNameRegister','业务员姓名注册');
}
//删除
function deleteSalesman(id){
	ui.confirm('确认要删除这个业务员吗?',function(z){
		if(z){
			$.ajax({
				url:'../../erpRegister/deleteParentSalesman.do?getMs='+getMS(),
				data:{salesmanId:id},
				success:function(data){
					if(data == 200){
						windowControl('删除业务员成功');
					}else{
						windowControl('删除业务员失败');
					}
					$('#salesmanRegisterdg').datagrid('reload');
				},
				error:function(err){
					windowComntrol('网络异常');
				}
			});
		}
	},false);
}
//解除绑定
function unBind(openId){
	ui.confirm('确认要解除绑定吗?',function(z){
		if(z){
			$.ajax({
				url:'../../erpRegister/unBind.do?getMs='+getMS(),
				data:{openId:openId},
				dataType:"json",
				success:function(data){
					if(data.success){
						windowControl('解除绑定成功');
					}else{
						windowControl(data.message);
					}
					$('#salesmanRegisterdg').datagrid('reload');
				},
				error:function(err){
					windowComntrol('网络异常');
				}
			});
		}
	},false);
}