/**************************************************kpi组**********************************************************************************/
$(function(){
	if(existPermission('admin:personnel:performanceManage:KPIgroup:add'))
		$('#KPIgroup .maintop').append('<div><span class="maintopicon mainicon2"></span> <span class="add">添加</span></div>');
	$('#KPIgroupdg').datagrid({
		  // url:'../../personnel/selectKpiGroupByTime.do?getMs='+getMS(), 
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#KPIgroup .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
		    	   var id = "'"+row.kpiGroupId+"'";
		    	   var opera = '';
		    		  if(existPermission('admin:personnel:performanceManage:KPIgroup:update'))
		    				opera +='<span class="small-button edit" title="修改" onclick="updateKPIgroup('+id+')"></span>';
		    		  if(existPermission('admin:personnel:performanceManage:KPIgroup:delete'))
		    			  opera +='<span class="small-button delete" title="删除" onclick="deleteKPIgroup('+id+')"></span>';
		    		 return opera;
		    	  // return '<span class="small-button edit" title="修改" onclick="updateKPIgroup('+id+')"></span><span class="small-button delete" title="删除" onclick="deleteKPIgroup('+id+')"></span>';
		       }},
		       {field:"kpiGroupName",title:"KPI组名",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"note",title:"描述",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		       {field:"createTimeStr",title:"创建日期",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		  ]]
	}); 
})
/*****************************添加kpi组**********************************************/
$(function(){
	//KPI组点击事件
    $("#KPIgroup .maintop .add").click(function(){
	   $("#KPIgroup .popups .saveKpiGroup").css("display","block");
    })
	$('#KPIgroup .saveKpiGroup .confirm').click(function(){
		var kpiGroupName1 = $('#KPIgroup .saveKpiGroup .kpiGroupName').val();
		var note1 = $('#KPIgroup .saveKpiGroup .note').val();
		if(kpiGroupName1==''|| kpiGroupName1==null){
			windowControl("KPI组名不能为空");
		}
		else if(note1==''|| note1==null){
			windowControl("KPI申请原因描述不能为空");
		}else{
			
			$.ajax({
				data:{kpiGroupName:kpiGroupName1,note:note1},
				url : '../../personnel/addKpiGroup.do?getMs='+getMS(),
				type : 'post',
				success:function(data) {
					if(data == 200){
						$('#KPIgroup .popup').css('display', 'none');
						$('#KPIgroup .saveKpiGroup .popuparea input').val(null);
						$('#KPIgroup .saveKpiGroup .popuparea textarea').val(null);
						$('#KPIgroupdg').datagrid({
							url:'../../personnel/selectKpiGroupByTime.do?getMs='+getMS(),
						});
						windowControl('保存kpi组成功');
					}else{
						windowControl('保存kpi组失败');
					}
				},
				error : function(err) {
					windowControl(err.status);
				}
			})
		}
	});
/*****************************条件查询kpi组*************************************/
	$('#KPIgroup .invitetop .query').click(function(){
		var kpiGroupName = $("#KPIgroup .invitetop .kpiGroupName").val();
		var createUserName = $("#KPIgroup .invitetop .createUserName").val();
		$('#KPIgroupdg').datagrid({
			url:'../../personnel/selectKpiGroupByTime.do?getMs='+getMS(),
			method:"post",
			queryParams: {
				kpiGroupName : kpiGroupName,
				createUserName : createUserName,
			},
		})
	});
})
/*****************************删除kpi组*************************************/
function deleteKPIgroup(id){
	ui.confirm('确定要删除该kpi组？',function(z){
		if(z){
			$.ajax({
				data:{kpiGroupId:id},
				url:'../../personnel/deleteKpiGroup.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == '200'){
						$("#KPIgroup #KPIgroupdg").datagrid("reload");
						windowControl("删除kpi组成功");
					}else{
						windowControl('删除kpi组失败');
					}
				},
				error:function(err){
					windowControl(err.status);
				}
			});
		}
	},false);
}
/*****************************修改kpi组信息*************************************/
function updateKPIgroup(id){
	$("#KPIgroup .updateKpiGroup").css("display","block");
	$.ajax({
		data:{kpiGroupId:id},
		url:'../../personnel/selectKpiGroupByTime.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var obj = eval('('+data+')').rows[0];
			$("#KPIgroup .updateKpiGroup .alreadyNumber").removeAttr('readonly');
			$("#KPIgroup .updateKpiGroup").css("display","block");
			$("#KPIgroup .updateKpiGroup .kpiGroupName").val(obj.kpiGroupName);
			$("#KPIgroup .updateKpiGroup .note").val(obj.note);
		},
		error:function(err){
			windowControl(err.status);
		}
	});
	$('#KPIgroup .updateKpiGroup .confirm').unbind('click');
	$('#KPIgroup .updateKpiGroup .confirm').click(function(){
		var kpiGroupName1 = $("#KPIgroup .updateKpiGroup .kpiGroupName").val();
		var note1 = $("#KPIgroup .updateKpiGroup .note").val();
		if(kpiGroupName1==''|| kpiGroupName1==null){
			windowControl("KPI组名不能为空");
		}
		else if(note1==''|| note1==null){
			windowControl("KPI申请原因描述不能为空");
		}else{
			$.ajax({
				data:{kpiGroupId:id,kpiGroupName:kpiGroupName1,note:note1},
				url : '../../personnel/updateKpiGroup.do?getMs='+getMS(),
				type : 'post',
				success:function(data){
					if(data == 200){
						$('#KPIgroup .updateKpiGroup').css('display', 'none');
						$('#KPIgroup .updateKpiGroup .popuparea input').val(null);
						$('#KPIgroup .updateKpiGroup .popuparea textarea').val(null);
						$('#KPIgroupdg').datagrid({
							url:'../../personnel/selectKpiGroupByTime.do?getMs='+getMS(),
						});
						windowControl('修改成功');
					}else{
						windowControl('修改失败');
					}
				},
				error:function(err) {
					windowControl(err.status);
				}
			})
		}
	});
}
