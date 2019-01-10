$(function(){
	if(existPermission('admin:erp:statisticsInfo:targetManage:add'))
		$('#targetManage .maintop').append('<input type="button" class="button addtarget" value="添加经济指标"/>');
	$('#targetManagedg').datagrid({
		   url:"../../ErpStatistics/queryEconomic.do?getMs="+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   method:"post",
		   toolbar:"#targetManage .invitetop",
		   fit: true, 
		   columns:[[
		       {
		    	   field:"economicName",
		    	   title:"经济指标",
		    	   align:"center",
		    	   width:100,
		    	   formatter:function(value,row,index){
		    		   var str = '';
		    		   var outputValue = row.outputValue;
		    		   if(outputValue == 1){
		    			   str = '<span style="color:green;">'+ value +'</span>';
		    		   }else if(outputValue == 0){
		    			   str = value;
		    		   }
		    		   return str;
		    	   }
		       },
		       {
		    	   field:"countRate",
		    	   title:"是否计算数率",
		    	   align:"center",
		    	   width:100,
		    	   formatter:function(value,row,index){
		    		   var str = '';
		    		   if(value == 1){
		    			   str = '是';
		    		   }else if(value == 0){
		    			   str = '否';
		    		   }
		    		   return str;
		    	   }
		       },
		       {
		    	   field:"_op",
		    	   title:"管理",
		    	   width:80,
		    	   align:"center",
		    	   formatter:function(value,row,index){
					   var opera = '';
					   var economicId = "'"+ row.economicId +"'";
					   var economicName = "'"+ row.economicName +"'";
					   var outputValue = "'"+ row.outputValue +"'";
					   var countRate = "'"+ row.countRate +"'";
					   opera += '<div class="imgBox">';
					   if(existPermission('admin:erp:statisticsInfo:targetManage:update'))
						   opera += '<span style="float:left;" class="small-button edit" title="修改" onclick="targetManageUpdate('+economicName+','+economicId+','+countRate+','+outputValue+')"></span>';
					   if(existPermission('admin:erp:statisticsInfo:targetManage:update'))
						   opera += '<span style="float:left;" class="small-button delete" title="删除" onclick="targetManageDelete('+economicName+','+economicId+')"></span>';
					   if(row.outputValue == 0){						   
						   opera += '<span style="float:left;" class="small-button govern" title="设置产值" onclick="targetManageSet('+economicName+','+economicId+')"></span>';
					   }
					   opera += '</div>';
					   return opera;
					}
		       }
		  ]]
	}); 
	
	/** 条件查询  */
	$('#targetManage .query').click(function(){
		var economicName = $.trim($('#targetManage .invitetop .economicName').val());
		var dataInfo = {
			economicName:economicName
		};
		$('#targetManagedg').datagrid({
			queryParams:dataInfo
		});
		
	});
	//添加指标名称
	$('#targetManage .maintop .addtarget').click(function(){
		$('#targetManage .addTarget').show();
		
		$('#targetManage .addTarget .confirm').unbind('click');
		$('#targetManage .addTarget .confirm').click(function(){
			var name = $('#targetManage .addTarget .targetName').val();
			if(name==null||name==''){
				windowControl('指标名称不能为空！');
			}else{
				$.ajax({
					url:'../../ErpStatistics/addEconomic.do?getMs='+getMS(),
					data:{
						economicName:name
					},
					type:'post',
					dataType:'json',
					success:function(data){
						if(data == '200'){	
							windowControl('添加成功！');
							$('#targetManage .addTarget').hide();
							$('#targetManagedg').datagrid('reload');
						}else{
							windowControl('添加失败！');
						}
					},
					error:function(data){
						
					}
				})
			}			
		})		
	});
	
});
//设置产值
function targetManageSet(economicName,economicId){
	ui.confirm('确定将指标： '+economicName+' 设置为产值吗？',function(z){
		if(z){
			$.ajax({
				url:'../../ErpStatistics/setEcoOptValue.do?getMs='+getMS(),
				data:{
					economicId:economicId
				},
				type:'post',
				dataType:'json',
				success:function(data){
					if(data == '200'){
						windowControl('设置成功！');
						$("#targetManagedg").datagrid('reload');
					}
				},
				error:function(error){
					windowControl(error.status);
				}
			});
		}		
	},false)
}
//删除指标
function targetManageDelete(economicName,economicId){
	ui.confirm('确定将指标： '+economicName+' 删除吗？',function(z){
		if(z){
			$.ajax({
				url:'../../ErpStatistics/deleteEconomic.do?getMs='+getMS(),
				data:{
					economicId:economicId
				},
				type:'post',
				dataType:'json',
				success:function(data){
					if(data == '200'){
						windowControl('删除成功！');
						$("#targetManagedg").datagrid('reload');
					}
				},
				error:function(error){
					windowControl(error.status);
				}
			});
		}		
	},false)	
}
//修改指标
function targetManageUpdate(economicName,economicId,countRate,outputValue){
	$('#targetManage .updataTarget').show();
	$('#targetManage .updataTarget .targetName').val(economicName);
	$('#targetManage .updataTarget .countRate').val(countRate);
	if(outputValue == 1){
		$('#targetManage .updataTarget .countRate').attr('disabled','disabled');
	}else if(outputValue == 0){
		$('#targetManage .updataTarget .countRate').removeAttr('disabled');
	}
	
	$('#targetManage .updataTarget .confirm').unbind('click');
	$('#targetManage .updataTarget .confirm').click(function(){
		var name = $('#targetManage .updataTarget .targetName').val();
		var countRate = $('#targetManage .updataTarget .countRate').val();
		
		if(name == null || name == ''){
			windowControl('指标名称不能为空！');
		}else{
			$.ajax({
				url:'../../ErpStatistics/updateEconomic.do?getMs='+getMS(),
				data:{
					economicId:economicId,
					economicName:name,
					countRate:countRate
				},
				type:'post',
				dataType:'json',
				success:function(data){
					if(data == '200'){
						windowControl('修改成功！');
						$('#targetManage .updataTarget').hide();
						$("#targetManagedg").datagrid('reload');
					}
				},
				error:function(error){
					windowControl(error.status);
				}
			});
		}
		
	})
			
}

