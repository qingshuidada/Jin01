$(function(){
	var userIdList = "";
	$('#noPactPersondg').datagrid({
		   //url:'../../personnel/selectNoPactPerson.do?getMs='+getMS(),
		   rownumbers:"true",
		   pagination:true,
		   toolbar:"#noPactPerson .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		           {field:"ck",checkbox:true },
			       {field:"userName",title:"用户名",fitColumns:true,resizable:true,align:"center",sortable:true,width:70},
			       {field:"userAccount",title:"员工编号",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
			       {field:"idCard",title:"身份证号码",fitColumns:true,resizable:true,align:"center",sortable:true,width:210},
			       {field:"phoneNum",title:"电话号码",fitColumns:true,resizable:true,align:"center",sortable:true,width:160},
			       {field:"departmentName",title:"部门",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
			       {field:"postName",title:"岗位",fitColumns:true,resizable:true,align:"center",sortable:true,width:100}
		    ]]
	});
	//选择部门
	$('#noPactPerson .invitetop .departmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#noPactPerson .invitetop input[name=departmentName]').val(chooseDept.text);
		     $('#noPactPerson .invitetop input[name=departmentUrl]').val(chooseDept.id);
		     $('#chooseDept .confirm').unbind();
		})
	});
	//点击查询
	$('#noPactPerson .invitetop .query').click(function(){
		if(existPermission('admin:personnel:pactManage:noPactPerson:select')){
			var userName = $('#noPactPerson .invitetop .userName').val();
			var userAccount = $('#noPactPerson .invitetop .userAccount').val();
			var departmentName = $('#noPactPerson .invitetop input[name=departmentName]').val();
			$('#noPactPersondg').datagrid({
				url:'../../personnel/selectNoPactPerson.do?getMs='+getMS(),
				queryParams:{
					userName:userName,
					userAccount:userAccount,
					departmentName:departmentName
				}
			
			})
		}
	});
	//批量添加合同
	$('#noPactPerson .maintop .batchAddPact').click(function(){
		var selRow = $('#noPactPersondg').datagrid('getSelections');
		if(selRow.length==0){
			windowControl('请选择要添加合同的员工信息！');	
		}else{
			$('#noPactPerson .popups .batchSavePact').css('display','block');
			for(i = 0;i<selRow.length;i++){
				if(userIdList==""){
					userIdList = selRow[i].userId ;
				}else{
					userIdList = selRow[i].userId +"," + userIdList;
				}
			}
		}
	});
	$('#noPactPerson .popups .batchSavePact .confirm').click(function(){
		var startTime = $('#noPactPerson .popups .batchSavePact input[name=startTime]').val();
		var endTime = $('#noPactPerson .popups .batchSavePact input[name=endTime]').val();
		if(startTime == null || startTime == ''){
			windowControl('合同开始时间不能为空');
			return ;
		}else if(endTime == null || endTime == ''){
			windowControl('合同结束不能为空');
			return ;
		}else{
			var submitOBJ = {
					startTime:startTime,
					endTime:endTime,
					userIdList:userIdList
			}
			$.ajax({
				url:'../../personnel/batchAddPact.do?getMs='+getMS(),
			    dataType:'json',
			    data:{json:JSON.stringify(submitOBJ)},
			    async:true,
			    type:'POST',
			    success:function(data){
			        //请求成功时处理
			    	if(data == 500){
			    		windowControl('服务器异常！');
			    	}else if(data == 400){
			    		windowControl('数据异常！');
			    	}else{
			    		windowControl('批量添加合同成功！');	
			    		$('#noPactPerson .popups .batchSavePact').css('display','none');
			    		$('#noPactPersondg').datagrid('reload');
			    		userIdList = "";
			    	}
			    },
			    error:function(){
			        //请求出错处理
			    }
			});
			
			
		}
		
	});
	
	
	
});
