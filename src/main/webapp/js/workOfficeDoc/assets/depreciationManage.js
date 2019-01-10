$(function(){
	//折旧类型数据网格
	$('#depreciationManagedg').datagrid({
		   url:'../../admin/selectDepreType.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#depreciationManage .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"depreTypeName",title:"分类名称",resizable:true,fitColumns:true,align:"center",sortable:true,width:100},
		       {field:"deprePeriod",title:"折旧周期(月)",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"calMethod",title:"折旧方法",resizable:true,fitColumns:true,align:"center",sortable:true,width:150,formatter:function(value,row,index){
					if(row.calMethod == "1"){
						return '平均年限法'
					}else if(row.calMethod == "2"){
						return '工作量法';
					}else if(row.calMethod == "3"){
						return '双倍余额递减法';
					}else if(row.calMethod == "4"){
						return '年数综合法';
					}
		       }},
		       {field:"typeDesc",title:"方法描述",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"_op",title:"管理",width:100,resizable:true,align:"center",fitColumns:true,width:100,sortable:true,formatter:function(value,row,index){
		    		var id = "'"+row.depreTypeId+"'";
		    		var opera = '';
			    	opera +='<span class="small-button edit" title="编辑" onclick="editDepreciation('+id+')"></span>';
			    	opera +='<span class="small-button delete" title="删除" onclick="deleteDepreciation('+id+')"></span>';
		    		return opera;
		    	}},
		  ]]
	});
	
	//条件查询
	$('#depreciationManage .query').click(function(){
		var depreTypeName = $.trim($('#depreciationManage .depreTypeName').val());
		var calMethod = $.trim($('#depreciationManage .calMethod').val());
		var dataInfo;
		dataInfo = {
			depreTypeName:depreTypeName,
			calMethod : calMethod,
		};
		$('#depreciationManagedg').datagrid({
			url:"../../admin/selectDepreType.do?getMs="+getMS(),
			queryParams:dataInfo
		});
	});
	$('#depreciationManage .clean').click(function(){
		$('#depreciationManage .depreTypeName').val('');
	});
	//添加折旧类型
	$('#depreciationManage .maintop .add').click(function(){
		$('#depreciationManage .addDepreciation').css('display','block');
	});
	$('#depreciationManage .addDepreciation .confirm').click(function(){
		var depreTypeName = $.trim($('#depreciationManage .addDepreciation .depreTypeName').val());
		var deprePeriod = $.trim($('#depreciationManage .addDepreciation .deprePeriod').val());
		var calMethod = $.trim($('#depreciationManage .addDepreciation .calMethod').val());
		var typeDesc = $.trim($('#depreciationManage .addDepreciation .typeDesc').val());
		if(depreTypeName == null ||depreTypeName == ''){
			windowControl('分类名称不能为空');
			return false;
		}else if(deprePeriod == null||deprePeriod == ''){
			windowControl('折旧周期不能为空');
			return false;
		}else if(calMethod == null||calMethod == ''){
			windowControl('折旧计算方法不能为空');
			return false;
		}else if(typeDesc == null||typeDesc == ''){
			windowControl('类型说明不能为空');
			return false;
		}else{
			var info = {
					depreTypeName:depreTypeName,
					deprePeriod:deprePeriod,
					calMethod:calMethod,
					typeDesc:typeDesc,
			}
			$.ajax({
				url:'../../admin/insertDepreType.do?getMs='+getMS(),
				data:info,
				success:function(data){
					if(data == 200){
						$('#depreciationManage .addDepreciation').css('display','none');
						$('#depreciationManage .addDepreciation .popuparea input').val('');
						$('#depreciationManage .addDepreciation .popuparea select').val('');
						$('#depreciationManage .addDepreciation .popuparea textarea').val('');
						$('#depreciationManagedg').datagrid('reload');
						windowControl('添加成功');
					}else{
						windowControl('添加失败');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	});
});
/*------------------编辑--------------------*/
function editDepreciation(id){
	$('#depreciationManage .editDepreciation').css('display','block');
	$.ajax({
		url:'../../admin/selectDepreType.do?getMs='+getMS(),
		data:{depreTypeId:id},
		success:function(data){
			var data = eval('(' + data + ')'); 
			$('#depreciationManage .editDepreciation .depreTypeName').val(data.rows[0].depreTypeName);
			$('#depreciationManage .editDepreciation .deprePeriod').val(data.rows[0].deprePeriod);
			$('#depreciationManage .editDepreciation .typeDesc').val(data.rows[0].typeDesc);
		},
		error:function(err){
			windowControl('网络异常');
		}	
	})
	
	//修改折旧类型
	$('#depreciationManage .editDepreciation .confirm').click(function(){
		var depreTypeName = $.trim($('#depreciationManage .editDepreciation .depreTypeName').val());
		var deprePeriod = $.trim($('#depreciationManage .editDepreciation .deprePeriod').val());
		var calMethod = $.trim($('#depreciationManage .editDepreciation .calMethod').val());
		var typeDesc = $.trim($('#depreciationManage .editDepreciation .typeDesc').val());
		if(depreTypeName == ''||depreTypeName == null){
			windowControl('分类名称不能为空');
			return false;
		}else if(deprePeriod == ''||deprePeriod == null){
			windowControl('折旧周期不能为空');
			return false;
		}else if(calMethod == ''||calMethod == null){
			windowControl('折旧计算方法不能为空');
			return false;
		}else if(typeDesc == ''||typeDesc == null){
			windowControl('类型说明不能为空');
			return false;
		}else{
			var info = {
					depreTypeName:depreTypeName,
					deprePeriod:deprePeriod,
					calMethod:calMethod,
					typeDesc:typeDesc,
					depreTypeId:id,
			}
			$.ajax({
				url:'../../admin/updateDepreType.do?getMs='+getMS(),
				data:info,
				success:function(data){
					if(data == 200){
						$('#depreciationManage .editDepreciation').css('display','none');
						$('#depreciationManage .editDepreciation .popuparea input').val('');
						$('#depreciationManage .editDepreciation .popuparea select').val('');
						$('#depreciationManage .editDepreciation .popuparea textarea').val('');
						$('#depreciationManagedg').datagrid('reload');
						windowControl('添加成功');
					}else{
						windowControl('添加失败');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	});
	
}
/*------------------删除--------------------*/
function deleteDepreciation(id){
	$.ajax({
		url:'../../admin/selectFixedAssets.do?getMs='+getMS(),
		data:{depreTypeId:id},
		success:function(data){
			var data = eval('(' + data + ')'); 
			if(data.rows.length != 0){
				windowControl('此折旧类型下还有资产，请把资产移走后，再进行删除');
			}else{
				ui.confirm('确认要删除这条折旧类型吗?',function(z){
					if(z){
						$.ajax({
							url:'../../admin/deleteDepreType.do?getMs='+getMS(),
							data:{depreTypeId:id},
							success:function(data){
								if(data=200){
									$('#depreciationManagedg').datagrid('reload');
									windowControl('删除成功');
								}else{
									windowControl('删除失败');
								}
							},
							error:function(err){
								windowControl('网络异常');
							}
						});
					}
				},false);
			}
		}
	})
	
	
}
/************************动态加载数据字典的计算方法*****************************/
$('#depreciationManage .addDepreciation .calMethod').html(getDataBySelectKeyNo("cal_method"));
$('#depreciationManage .editDepreciation .calMethod').html(getDataBySelectKeyNo("cal_method"));
$('#depreciationManage .invitetop .calMethod').html(getDataBySelectKeyNo("cal_method"));


