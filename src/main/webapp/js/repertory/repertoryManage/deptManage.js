$(function(){
	$('#deptManagedg').datagrid({
		   url:"../../repertory/selectGetDepartment.do?getMs="+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   method:"post",
		   toolbar:"#deptManage .invitetop",
		   fit: true, 
		   columns:[[
		       {field:"departmentName",title:"部门名字",fitColumns:true,resizable:true,align:"center",sortable:true,width:140},
		       {field:"createUserName",title:"创建人",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"createTimeStr",title:"创建时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"updateUserName",title:"更改人",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"updateTimeStr",title:"更改时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
		    	   var departmentId = "'"+row.departmentId+"'";
		    		return '<div style="width:40px;margin:0 auto;">'+
		    				'<span style="float:left;" class="small-button edit" title="修改" onclick="updateDepartment('+departmentId+')"></span>'+
		    				'<span style="float:left;" class="small-button delete" title="删除" onclick="deleteDepartment('+departmentId+')"></span>'+
		    				'</div>';
		       }},
		  ]]
	}); 
	
	/** 条件查询  */
	$('#deptManage .query').click(function(){
		var departmentName = $.trim($('#deptManage .invitetop .departmentName').val());
		var dataInfo = {
			departmentName:departmentName
		};
		$('#deptManagedg').datagrid({
			url:"../../repertory/selectGetDepartment.do?getMs="+getMS(),
			queryParams:dataInfo
		});
		
	});
	
	//添加部门
	$('#deptManage .maintop .addDept').click(function(){
		$('#deptManage .popups .saveDept').css('display','block');
		$('#deptManage .saveDept .confirm').unbind();
		$('#deptManage .saveDept .confirm').click(function(){
			var departmentName = $.trim($('#deptManage .popups .saveDept .departmentName').val());
			if(departmentName == null || departmentName == ''){
				windowControl('部门名字不能为空');
				return false;
			}else{
				$.ajax({
					url:'../../repertory/insertGetDepartment.do?getMs='+getMS(),
				    dataType:'json',
				    data:{
				    	departmentName:departmentName
				    },
				    async:true,
				    type:'POST',
				    success:function(data){
				        //请求成功时处理
				    	if(data == 500){
				    		windowControl('服务器异常！');
				    	}else if(data == 400){
				    		windowControl('数据异常！');
				    	}else{
				    		$('#deptManage .popups .saveDept').css('display','none');
							$('#deptManage .saveDept .popuparea input').val('');
							$('#deptManage #deptManagedg').datagrid('reload');
				    		windowControl('添加领用部门成功！');	    		
				    	}
				    },
				    error:function(){
				        //请求出错处理
				    }
				});	
			}
		})
	});
	
	
});
//删除供应商
function deleteDepartment(departmentId){
	ui.confirm('确定要删除此领用部门？',function(z){
		if(z){	
			$.ajax({
				data:{departmentId:departmentId},
				url:'../../repertory/deleteGetDepartment.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == '200'){
						$('#deptManage #deptManagedg').datagrid("reload");
						windowControl("删除成功");
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
//修改领用部门按钮点击事件
function updateDepartment(departmentId){
	$('#deptManage .popups .updateDept').css('display','block');
	//修改部门
	$('#deptManage .updateDept .confirm').unbind('click');
	$('#deptManage .updateDept .confirm').click(function(){
		var departmentName = $.trim($('#deptManage .popups .updateDept .departmentName').val());
		if(departmentName == null || departmentName == ''){
			windowControl('部门名字不能为空');
			return false;
		}else{
			$.ajax({
				url:'../../repertory/updateGetDepartment.do?getMs='+getMS(),
			    dataType:'json',
			    data:{
			    	departmentName:departmentName,
			    	departmentId:departmentId
			    },
			    async:true,
			    type:'POST',
			    success:function(data){
			        //请求成功时处理
			    	if(data == 500){
			    		windowControl('服务器异常！');
			    	}else if(data == 400){
			    		windowControl('数据异常！');
			    	}else{
			    		$('#deptManage .popups .updateDept').css('display','none');
						$('#deptManage .updateDept .popuparea input').val('');
						$('#deptManage #deptManagedg').datagrid('reload');
			    		windowControl('修改领用部门成功！');				    		
			    	}
			    },
			    error:function(){
			        //请求出错处理
			    }
			});	
		}
	});
}
//tab键换回车键

function goNextInput(){
	var inputArry = $(".queryForm input");
    for(var i =0 ;i<inputArry.length;i++){  
        inputArry[i].index = i;  
        inputArry[i].onkeydown=function  (e){   
            //e = e ? e : window.event;     //可写可不写  
        	obj=e.srcElement?e.srcElement:e.target;
        	if(e.keyCode==13 && obj.type!= 'button'&&obj.disabled!="disabled"){
        		inputArry[this.index+1].focus();  
            }  
        }  
    } 
    var inputArryTk= $(".popuparea input[disabled!='disabled']");
    for(var i =0 ;i<inputArryTk.length;i++){  
    	inputArryTk[i].index = i;  
    	inputArryTk[i].onkeydown=function  (e){   
            //e = e ? e : window.event;     //可写可不写  
        	obj=e.srcElement?e.srcElement:e.target;
        	if(e.keyCode==13 && obj.type!= 'button'){
        		inputArryTk[this.index+1].focus();  
            }  
        }  
    } 
}
goNextInput()
