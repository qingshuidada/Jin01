$(function(){
	$("#contactdg").datagrid({
		   url:'../../seventhPage/selectAppContact.do?getMs='+getMS(),
		   rownumbers:"true",
		   pagination:true,
		   toolbar:"#contact .invitetop",
		   singleSelect:true,
		   method:"post",
		   fit: true, 
		   columns:[[
	       {field:"userName",title:"名字",fitColumns:true,resizable:true,align:"center",sortable:true,width:70,editor:'numberbox'},
	       {field:"department",title:"部门",fitColumns:true,resizable:true,align:"center",sortable:true,width:70},
	       {field:"telephone",title:"电话",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
	       {field:"cellphone",title:"手机",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
	       {field:"fax",title:"传真",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
	       {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
	    	   var id="'"+row.contactId+"'";
	    	   var department="'"+row.department+"'";
	    	   var telephone="'"+row.telephone+"'";
	    	   var cellphone="'"+row.cellphone+"'";
	    	   var fax="'"+row.fax+"'";
	    	   var userName="'"+row.userName+"'";
	    	   var opera = '';
	    	   if(existPermission('admin:personnel:pactManage:pact:update'))
	    			opera +='<span class="small-button edit" title="修改" onclick="editContact('+id+','+userName+','+department+','+telephone+','+cellphone+','+fax+')"></span>';
	    	   return opera;
	       }},
	    ]]
	});
	//修改的确定事件
	$('#contact .popups .editContact .confirm').click(function(){
		var contactId = $('#contact .popups .editContact .contactId').val();
		var userName = $('#contact .popups .editContact .userName').val();
		var department = $('#contact .popups .editContact .department').val();
		var telephone = $('#contact .popups .editContact .telephone').val();
		var cellphone = $('#contact .popups .editContact .cellphone').val();
		var fax = $('#contact .popups .editContact .fax').val();

		if(userName == null || userName == ''){
			windowControl('名称不能为空');
			return;
		}else if(department == null || department == ''){
			windowControl('部门不能为空');
			return;
		}else if(telephone == null || telephone == ''){
			windowControl('电话不能为空');
			return;
		}else if(cellphone == null || cellphone == ''){
			windowControl('手机不能为空');
			return;
		}else if(fax == null || fax == ''){
			windowControl('传真不能为空');
			return;
		}else{
			$.ajax({
				data:{
					contactId:contactId,
					userName:userName,
					department:department,
					telephone:telephone,
					cellphone:cellphone,
					fax:fax
				},
				url:'../../seventhPage/updateContact.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == '200'){
						$('#contact .popups .editContact').css('display','none');
						$("#contactdg").datagrid("reload");
						windowControl("修改成功");
					}else{
						windowControl(data);
					}
				},
				error:function(err){
					windowControl(err.status);
				}
			});
		}
	});
	
})
function editContact(id,userName,department,telephone,cellphone,fax){
	$('#contact .popups .editContact').css('display','block');
	$('#contact .popups .editContact .userName').val(userName);
	$('#contact .popups .editContact .department').val(department);
	$('#contact .popups .editContact .telephone').val(telephone);
	$('#contact .popups .editContact .cellphone').val(cellphone);
	$('#contact .popups .editContact .fax').val(fax);
	$('#contact .popups .editContact .contactId').val(id);
}

