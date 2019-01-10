$(function(){
	if(existPermission('admin:personnel:performanceManage:KPIstandard:add'))
		$('#KPIstandard .maintop').append('<div><span class="maintopicon mainicon2"></span> <span class="add">添加</span></div>');

	$('#KPIstandarddg').datagrid({
		  // url:'../../personnel/selectKpiByTime.do?getMs='+getMS(), 
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   method:"post",
		   toolbar:"#KPIstandard .invitetop",
		   fit: true, 
		   columns:[[
				{field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
				   var id = "'"+row.kpiId+"'";
				   var kpiGroupId = "'"+row.kpiGroupId+"'";
				   var opera = '';
					  if(existPermission('admin:personnel:performanceManage:KPIstandard:update'))
							opera +='<span class="small-button edit" title="修改" onclick="updateKpi('+id+','+kpiGroupId+')"></span>';
					  if(existPermission('admin:personnel:performanceManage:KPIstandard:delete'))
						  opera +='<span class="small-button delete" title="删除" onclick="deleteKpi('+id+')"></span>';
					  
				  // return '<span class="small-button edit" title="修改" onclick="updateKpi('+id+')"></span><span class="small-button delete" title="删除" onclick="deleteKpi('+id+')"></span>';
					   return opera;
				}},
		       {field:"kpiName",title:"KPI",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"kpiGroupName",title:"KPI组名字",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"scoreStandard",title:"标准分数",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
		       {field:"text",title:"描述",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		  ]]
		}); 
});
$(function(){
	$('.kpiGroup').css({'width':$('.kpiName').width()+6+'px','margin-left':'8px',});
/*********************条件查询kpi标准*********************/
	$('#KPIstandard .selectByName').click(function(){
		var kpiName1 = $('#KPIstandard .kpiName').val();
		$('#KPIstandarddg').datagrid({
			url:'../../personnel/selectKpiByTime.do?getMs='+getMS(),
			queryParams: {
				kpiName:kpiName1,
			},
		});
	})
/*********************添加kpi标准************************/
   $("#KPIstandard .maintop .add").click(function(){
	   $("#KPIstandard .saveKPIstandard").css("display","block");
	   $.ajax({
			url:'../../personnel/selectKpiGroupByTime.do?getMs='+getMS(),
			type:'post',
			success:function(data){
				var str = "<option>--请选择--</option>";
				var data = eval('(' + data + ')'); 
				for(var i=0;i<data.rows.length;i++){
					str += "<option class='kpiGroupName' value=" + data.rows[i].kpiGroupId + ">" + data.rows[i].kpiGroupName + "</option>";  
				}
			$('#KPIstandard .saveKPIstandard .kpiGroup').html(str);
			},
			error:function(error){
				windowControl(error.status);
			}
		})
	   
   })
	$('#KPIstandard .saveKPIstandard .confirm').click(function(){
		var kpiname = $('#KPIstandard .popups .kpiName').val();
		var kpiGroupId = $('#KPIstandard .saveKPIstandard .kpiGroup').val();
		var scorestandard = $('#KPIstandard .saveKPIstandard .scoreStandard').val();
		var Text = $('#KPIstandard .saveKPIstandard .text').val();
		if(kpiname ==''|| kpiname == null){			
			windowControl("kpi名字不能为空");
		}else if(kpiGroupId ==''|| kpiGroupId == null){			
			windowControl("kpi组不能为空");
		}else if(scorestandard ==''||scorestandard == null){
			windowControl("标准分数不能为空");
	    }else if(Text == '' ||Text == null ){
			windowControl("描述不能为空");
		}else{
			$.ajax({
				data:{kpiName:kpiname,kpiGroupId:kpiGroupId,
					scoreStandard:scorestandard,
					text:Text
				},
				method:"post",
				url:"../../personnel/insertKpi.do?getMs="+getMS(),
				success: function(data){
					if(data == 200){
						$('#KPIstandard .popup').css('display','none');
						$('#KPIstandard .saveKPIstandard .popuparea input').val(null);
						$('#KPIstandard .saveKPIstandard .popuparea select').val(null);
						$('#KPIstandard .saveKPIstandard .popuparea textarea').val(null);
						$('#KPIstandarddg').datagrid({
							url:'../../personnel/selectKpiByTime.do?getMs='+getMS(),
						});
						windowControl('保存kpi考核标准成功');
					}else{
						windowControl('保存kpi考核标准失败');
					}
					
				},
				error:function(){
			    	windowControl("请求失败!");
			    }
			})	
		}
	});
})
/*********************查看kpi信息*********************/
function lookKpi(id){
	$("#KPIstandard .popups .saveKPIstandard").css("display","block");
	$.ajax({
		data:{kpiId:id},
		url:'../../personnel/selectKpiByTime.do?getMs='+getMS(),
		type:'post',
		success:function(data){
				var obj = eval('('+data+')').rows[0];
				$("#KPIstandard .saveKPIstandard input").attr('readonly','true');
				$("#KPIstandard .saveKPIstandard textarea").attr('readonly','true');
				$("#KPIstandard .saveKPIstandard .alreadyNumber").removeAttr('readonly');
				$("#KPIstandard .saveKPIstandard").css("display","block");
				$("#KPIstandard .saveKPIstandard .kpiName").val(obj.kpiName);
				$("#KPIstandard .saveKPIstandard .kpiGroup").val(obj.kpiGroup);
				$("#KPIstandard .saveKPIstandard .scoreStandard").val(obj.scoreStandard);
				$("#KPIstandard .saveKPIstandard .text").val(obj.text);
		},
		error:function(err){
			windowControl(err.status);
		}
	})	
}
/*********************删除kpi信息*********************/
function deleteKpi(id){
	ui.confirm('确定要删除这条KPI信息？',function(z){
		if(z){	
			$.ajax({
				data:{kpiId:id},
				url:'../../personnel/deleteKpi.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == '200'){
						$("#KPIstandard #KPIstandarddg").datagrid("reload");
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
/*********************修改kpi信息*********************/
function updateKpi(id,kpiGroupId){
	$("#KPIstandard .updateKPIstandard").css("display","block");
	$.ajax({
		url:'../../personnel/selectKpiGroupByTime.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var str = "<option>--请选择--</option>";
			var data = eval('(' + data + ')'); 
			console.log(data);
			for(var i=0;i<data.rows.length;i++){
				console.log(data.rows[i].kpiGroupId +","+kpiGroupId);
				if(data.rows[i].kpiGroupId == kpiGroupId){
					str += "<option class='kpiGroupName' selected='selected' value=" + data.rows[i].kpiGroupId + ">" + data.rows[i].kpiGroupName + "</option>";  
				}else{
					str += "<option class='kpiGroupName' value=" + data.rows[i].kpiGroupId + ">" + data.rows[i].kpiGroupName + "</option>";  
				}
			}
		$('#KPIstandard .updateKPIstandard .kpiGroup').html(str);
		},
		error:function(error){
			windowControl(error.status);
		}
	})
	$.ajax({
		data:{kpiId:id},
		url:'../../personnel/selectKpiByTime.do?getMs='+getMS(),
		type:'post',
		success:function(data){
				var obj = eval('('+data+')').rows[0];
				$("#KPIstandard .updateKPIstandard .alreadyNumber").removeAttr('readonly');
				$("#KPIstandard .updateKPIstandard").css("display","block");
				$("#KPIstandard .updateKPIstandard .kpiName").val(obj.kpiName);
				$("#KPIstandard .updateKPIstandard .scoreStandard").val(obj.scoreStandard);
				$("#KPIstandard .updateKPIstandard .text").val(obj.text);
		},
		error:function(err){
			windowControl(err.status);
		}
	})
	$('#KPIstandard .updateKPIstandard .confirm').unbind('click');
	$('#KPIstandard .updateKPIstandard .confirm').click(function(){
		var kpiName = $("#KPIstandard .updateKPIstandard .kpiName").val();
		var kpiGroupId = $("#KPIstandard .updateKPIstandard .kpiGroup").val();
		var scorestandard = $("#KPIstandard .updateKPIstandard .scoreStandard").val();
		var Text = $("#KPIstandard .updateKPIstandard .text").val();
		if(kpiName ==''|| kpiName == null){			
			windowControl("kpi名字不能为空");
		}else if(kpiGroupId =='--请选择--'|| kpiGroupId == null ){			
			windowControl("kpi组不能为空");
		}else if(scorestandard ==''||scorestandard == null){
			windowControl("标准分数不能为空");
	    }else if(Text == '' ||Text == null ){
			windowControl("描述不能为空");
		}else{
			$.ajax({
				data:{kpiId:id,kpiName:kpiName,kpiGroupId:kpiGroupId,
					scoreStandard:scorestandard,
					text:Text
				},
				method:"post",
				url:"../../personnel/updateKpi.do?getMs="+getMS(),
				success: function(data){
					if(data == 200){
						$('#KPIstandard .updateKPIstandard').css('display','none');
						$('#KPIstandard .updateKPIstandard .popuparea input').val(null);
						$('#KPIstandard .updateKPIstandard .popuparea select').val(null);
						$('#KPIstandard .updateKPIstandard .popuparea textarea').val(null);
						$('#KPIstandarddg').datagrid('reload');
						windowControl('修改kpi考核标准成功');
					}else{
						windowControl('修改kpi考核标准失败');
					}
					
				},
				error:function(){
			    	windowControl("请求失败!");
			    }
			})	
		}
		
	});		
}
