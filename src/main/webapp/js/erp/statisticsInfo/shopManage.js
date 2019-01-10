$(function(){
	if(existPermission('admin:erp:statisticsInfo:shopManage:add'))
		$('#shopManage .maintop').append('<input type="button" class="button addshop" value="添加车间"/>');
	$('#shopManagedg').datagrid({
		   url:"../../ErpStatistics/queryWorkshop.do?getMs="+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   method:"post",
		   toolbar:"#shopManage .invitetop",
		   fit: true, 
		   columns:[[
		       {
		    	   field:"workshopName",
		    	   title:"车间",
		    	   align:"center",
		    	   width:150
		       },
		       {
		    	   field:"countFlag",
		    	   title:"是否计入产值汇总",
		    	   align:"center",
		    	   width:150,
		    	   formatter:function(value,row,index){
		    		   if(value=='0')
		    			   return '否';
		    		   return '是';
		    	   }
		       },
		       {
		    	   field:"_op",
		    	   title:"管理",
		    	   width:60,
		    	   align:"center",
		    	   formatter:function(value,row,index){
					   var opera = '';
					   var workshopId = "'"+ row.workshopId +"'";
					   var workshopName = "'"+ row.workshopName +"'";
					   var countFlag = "'"+ row.countFlag +"'";
					   opera += '<div class="imgBox">';
					   if(existPermission('admin:erp:statisticsInfo:shopManage:update'))
						   opera += '<span style="float:left;" class="small-button edit" title="修改" onclick="shopManageUpdate('+workshopName+','+workshopId+')"></span>';
					   if(existPermission('admin:erp:statisticsInfo:shopManage:update'))
						   opera += '<span style="float:left;" class="small-button delete" title="删除" onclick="shopManageDelete('+workshopName+','+workshopId+','+countFlag+')"></span>';
					   opera += '</div>';
					   return opera;
					}
		       }
		  ]]
	}); 
	
	/** 条件查询  */
	$('#shopManage .query').click(function(){
		var workshopName = $.trim($('#shopManage .invitetop .workshopName').val());
		var dataInfo = {
			workshopName:workshopName
		};
		$('#shopManagedg').datagrid({
			queryParams:dataInfo
		});
		
	});
	//添加车间
	$('#shopManage .maintop .addshop').click(function(){
		$('#shopManage .addShop').show();
		
		$('#shopManage .addShop .confirm').unbind('click');
		$('#shopManage .addShop .confirm').click(function(){
			var name = $('#shopManage .addShop .shopName').val();
			if(name==null||name==''){
				windowControl('车间名称不能为空！');
			}else{
				$.ajax({
					url:'../../ErpStatistics/addWorkshop.do?getMs='+getMS(),
					data:{
						workshopName:name
					},
					type:'post',
					dataType:'json',
					success:function(data){
						if(data == '200'){
							windowControl('添加成功！');
							$('#shopManage .addShop').hide()
							$('#shopManagedg').datagrid('reload');
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
//删除车间
function shopManageDelete(workshopName,workshopId){
	ui.confirm('确定将车间： '+workshopName+' 删除吗？',function(z){
		if(z){
			$.ajax({
				url:'../../ErpStatistics/updateWorkshop.do?getMs='+getMS(),
				data:{
					workshopId:workshopId,
					deleteFlag:1
				},
				type:'post',
				dataType:'json',
				success:function(data){
					if(data == '200'){
						windowControl('删除成功！');
						$("#shopManagedg").datagrid('reload');
					}
				},
				error:function(error){
					windowControl(error.status);
				}
			});
		}		
	},false)	
}
//修改车间
function shopManageUpdate(workshopName,workshopId,countFlag){
	$('#shopManage .updataShop').show()
	$('#shopManage .updataShop .shopName').val(workshopName);
	$('#shopManage .updataShop .countFlag').val(countFlag);
	
	$('#shopManage .updataShop .confirm').unbind('click');
	$('#shopManage .updataShop .confirm').click(function(){
		var name = $('#shopManage .updataShop .shopName').val();
		var countFlag = $('#shopManage .updataShop .countFlag').val();
		if(name == null || name == ''){
			windowControl('车间名称不能为空！');
		}else{
			$.ajax({
				url:'../../ErpStatistics/updateWorkshop.do?getMs='+getMS(),
				data:{
					workshopId:workshopId,
					workshopName:name,
					countFlag:countFlag
				},
				type:'post',
				dataType:'json',
				success:function(data){
					if(data == '200'){
						windowControl('修改成功！');
						$('#shopManage .updataShop').hide()
						$("#shopManagedg").datagrid('reload');
					}
				},
				error:function(error){
					windowControl(error.status);
				}
			});
		}
	})	
}
