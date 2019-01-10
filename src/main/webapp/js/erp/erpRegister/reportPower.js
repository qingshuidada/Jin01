$(function(){
	$("#reportPowerdg").datagrid({
		  url:'../../erpRegister/selectRepotAuthorityUser.do?getMs='+getMS(),
		  rownumbers:"true",
		   pagination:true,
		   toolbar:"#reportPower .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"userName",title:"员工名称",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		       {field:"sex",title:"性别",fitColumns:true,resizable:true,align:"center",width:50,sortable:true,formatter:function(value,row,index){
		    	   var sex = row.sex;
		    	   if(sex == 1){
		    		   return '男';
		    	   }else{
		    		   return '女';
		    	   }
		       }},
		       {field:"departmentName",title:"部门",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"qywxUserId",title:"企业微信id",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		       {field:"reportAuthorityFlag",title:"是否有权限",fitColumns:true,resizable:true,align:"center",width:70,sortable:true,formatter:function(value,row,index){
		    	   var sex = row.reportAuthorityFlag;
		    	   if(sex == 1){
		    		   return '有';
		    	   }else{
		    		   return '无';
		    	   }
		       }},
		       {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
		    	   var id="'"+row.userId+"'";
		    	   var opera = '';
		    	   opera +='<span class="small-button edit" title="赋予权限" onclick="edit('+id+')"></span>';
		    	   return opera;
		       }},
		    ]]		
	});
	$('#reportPower .invitetop .selectUserInfo').click(function(){
		$('#reportPowerdg').datagrid({
			url:'../../erpRegister/selectRepotAuthorityUser.do?getMs='+getMS(),
			queryParams: {
				userName: function(){
					return $('#reportPower .invitetop input[name=peopleName]').val();
				},
			}
		});
	});
	//清空按钮的点击事件
	$('#reportPower .invitetop .qingkong').click(function(){
		$('#reportPower .invitetop input[name=peopleName]').val(null);
	})
});
function edit(id){
	ui.confirm('确定要赋予此员工查看生产报表的权限吗？',function(z){
		if(z){
			$.ajax({
				data:{userId:id},
				url:'../../erpRegister/updateReportAuthorityFlag.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == '200'){
						$("#reportPowerdg").datagrid("reload");
						windowControl("赋予成功");
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