$(function(){
	/*设置页面高100%*/
	$('#officeGoodsManage').css('height',$('#loadarea').height()-31+'px');
	$('#officeGoodsManage .listForm').css('width',$('#loadarea').width()-202);
	/*--------------------------------tree start------------------------------*/
	//办公用品类型树
	$('#suppliesTypetg').tree({
        url: "../../admin/showTree.do?getMs="+getMS(),
        method:"post",
        animate: false,
        checkbox : false,//是否显示复选框 
        cascadeCheck: false,
        dnd:true,
        onClick: function(node){
        	var suppliesTypeUrl = $('#suppliesTypetg').tree('getSelected').id;
        	$("#suppliesTypeUrl").val(node.id);
        	$('#officeGoodsManagedg').datagrid({
        		url:'../../admin/selectOfficeSupplies.do?getMs='+getMS(),
        		queryParams:{
        			suppliesTypeUrl:suppliesTypeUrl
        		},
        	});
        },
        onContextMenu : function(e,node){
        	e.preventDefault();
        	var suppliesTypeUrl = $('#suppliesTypeUrl').val(node.id);
        	var flag = node.id;
        	$('#suppliesTypetg').tree('select', node.target);
        	if(flag == 0){
        		$('#addSuppliesType').menu('show', {
        			left: e.pageX,
        			top: e.pageY
        		});
        	}else{
        		$('#editSuppliesType').menu('show', {
        			left: e.pageX,
        			top: e.pageY
        		});
        	}
    		
		}
       
    });
	//点击确定添加办公用品类型
	$('#officeGoodsManage .addSuppliesType .confirm').click(function(){
		var suppliesTypeName = $('#officeGoodsManage .addSuppliesType .suppliesTypeName').val();
		var suppliesTypeUrl = $("#suppliesTypeUrl").val();
		if(suppliesTypeName == null || suppliesTypeName == ""){
			windowControl("请输入新增分类名称");
			return;
		}else{
			$.ajax({
				data:{
					suppliesTypeUrl:suppliesTypeUrl,
					suppliesTypeName:suppliesTypeName,
					action:'添加'
				},
				url:"../../admin/addSuppliesType.do?getMs="+getMS(),
				method:"post",
				success: function(data){
					$('#suppliesTypetg').tree('reload');
					$('#officeGoodsManage .addSuppliesType .popuparea input[type=text]').val('');
					$('#officeGoodsManage .addSuppliesType').css('display','none');
					$('#officeGoodsManagedg').datagrid('reload');
					if(data == 200){
						windowControl('添加成功');
					}else{
						windowControl('添加失败');
					}
				}
			})
		}
	})
	//点击确定修改办公用品类型
	$('#officeGoodsManage .editSuppliesType .confirm').click(function(){
		var suppliesTypeName = $('#officeGoodsManage .editSuppliesType .suppliesTypeName').val();
		var suppliesTypeUrl = $("#suppliesTypeUrl").val();
		if(suppliesTypeName == null || suppliesTypeName == ""){
			windowControl("请输入修改后的分类名称");
		}else{
			$.ajax({
				data:{
					suppliesTypeUrl:suppliesTypeUrl,
					suppliesTypeName:suppliesTypeName,
					action:'修改'
				},
				url:"../../admin/editSuppliesType.do?getMs="+getMS(),
				method:"post",
				success: function(data){
					$('#suppliesTypetg').tree('reload');
					$('#officeGoodsManage .editSuppliesType .popuparea input[type=text]').val('');
					$('#officeGoodsManage .editSuppliesType').css('display','none');
					$('#officeGoodsManagedg').datagrid('reload');
					if(data == 200){
						windowControl('修改成功');
					}else{
						windowControl('修改失败');
					}
				}
			})
		}
	})	
	//点击确定删除办公用品类型
	$('#officeGoodsManage .removeSuppliesType .confirm').click(function(){
		var suppliesTypeUrl = $("#suppliesTypeUrl").val();
			$.ajax({
				data:{
					suppliesTypeUrl:suppliesTypeUrl,
					action:'删除'
				},
				url:"../../admin/removeSuppliesType.do?getMs="+getMS(),
				method:"post",
				success: function(data){
					$('#suppliesTypetg').tree('reload');
					$('#officeGoodsManage .removeSuppliesType').css('display','none');
					$('#officeGoodsManagedg').datagrid('reload');
					if(data == 200){
						windowControl('删除成功');
					}else{
						windowControl('删除失败');
					}
				}
			})
	});
	/*--------------------------------tree end------------------------------*/
	//物品数据网格
	$('#officeGoodsManagedg').datagrid({
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#officeGoodsManage .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
				{
					field:'suppliesTypeName',
					title:'所属分类',
					width:100,
					align:"center"
				},    
				{
					field:'suppliesName',
					title:'物品名称',
					width:100,
					align:"center"
				},
				{
					field:'suppliesNo',
					title:'编号',
					width:120,
					align:"center"
				},
				{
					field:'specifications',
					title:'规格',
					width:100,
					align:"center"
				},
				{
					field:'unit',
					title:'计量单位',
					width:100,
					align:"center"
				},
				{
					field:'isWarning',
					title:'是否启用库存警示',
					width:120,
					align:"center",
					formatter:function(value,row,index){
						var isHtml = '';
						if(value == 0){
							isHtml += '否'
						}else{
							isHtml += '是'
						}
						return isHtml;
					}
				},
				{
					field:'notes',
					title:'备注',
					width:100,
					align:"center"
				},
				{
					field:'stockCounts',
					title:'库存总数',
					width:100,
					align:"center",
					formatter:function(value,row,index){
						var NumberHtml = '';
						if(row.isWarning == 1 && value < row.warnCounts){
							NumberHtml = '<span style="color:red;">'+ value +'</span>';
						}else{
							NumberHtml = '<span>'+ value +'</span>';
						}
						return NumberHtml;
					}
				},
				{
					field:"_opera",
					title:"管理",
					width:60,
					align:"center",
					formatter:function(value,row,index){
						var opera = '';
						var suppliesId = "'" + row.suppliesId + "'";
						var suppliesNo = "'" + row.suppliesNo + "'";
						var unit = "'" + row.unit + "'";
						var suppliesName = "'" + row.suppliesName + "'";
						var stockCounts = "'" + row.stockCounts + "'";
						var suppliesTypeUrl = "'" + row.suppliesTypeUrl + "'";
						var suppliesTypeName = "'" + row.suppliesTypeName + "'";
						var isWarning = "'" + row.isWarning + "'";
						var specifications = "'" + row.specifications + "'";
						var warnCounts = "'" + row.warnCounts + "'";
						var notes = "'" + row.notes + "'";
						
						opera = '<div class="imgBox">'+
								'<span style="float:left;" class="small-button edit" title="修改" onclick="updataSupplies('+ suppliesId +
								','+ suppliesNo +
								','+ unit +
								','+ suppliesName +
								','+ stockCounts +
								','+ suppliesTypeUrl +
								','+ suppliesTypeName +
								','+ isWarning +
								','+ specifications +
								','+ warnCounts +
								','+ notes +')"></span>'+
								'<span style="float:left;" class="small-button delete" title="删除" onclick="deleteSupplies('+ suppliesId +')"></span>'+
								'</div>';
						return opera;
					}
				}
		  ]]
	});
	
	//条件查询
	$('#officeGoodsManage .invitetop .select').click(function(){
		var suppliesName = $('#officeGoodsManage .invitetop input[name=suppliesName]').val();
		var suppliesTypeName = $('#officeGoodsManage .invitetop input[name=suppliesTypeName]').val();
		var suppliesTypeUrl = $("#suppliesTypeUrl").val();
		var dataInfo = {
			suppliesTypeUrl:suppliesTypeUrl,
			suppliesName:suppliesName,
			suppliesTypeName:suppliesTypeName,
		};
		$('#officeGoodsManagedg').datagrid({
			url:'../../admin/selectOfficeSupplies.do?getMs='+getMS(),
			queryParams:dataInfo
		});
	});
	
	//添加办公用品
	$('#officeGoodsManage .maintop .addSupplies').click(function(){
		if($('#suppliesTypetg').tree('getSelected') == null){
			windowControl("请在左侧选择办公用品类型");
			return ;
		}
		$('#officeGoodsManage .popups .addSupplies').css('display','block');
		var suppliesTypeUrl = $('#suppliesTypetg').tree('getSelected').id;
		var suppliesTypeName = $('#suppliesTypetg').tree('getSelected').text;
		$('#officeGoodsManage .popups .addSupplies .suppliesType').attr('suppliestypeurl',suppliesTypeUrl);
		$('#officeGoodsManage .popups .addSupplies .suppliesType').val(suppliesTypeName);
		
	});
	//系统自动生成编号
	$('#officeGoodsManage .popups .addSupplies .sysgen').click(function(){
		var myDate = new Date();
        var myYear = myDate.getFullYear();
        var myMonth = myDate.getMonth();
        var myHour= myDate.getHours();
        var myMinute = myDate.getMinutes();
        var mySecond = myDate.getSeconds();
        var suppliesNo = "MD"+myYear+myMonth+myHour+myMinute+mySecond;
        $('#officeGoodsManage  .popups .addSupplies .suppliesNo').val(suppliesNo);
	})
	//确定添加办公用品
	$('#officeGoodsManage .popups .addSupplies .confirm').click(function(){
		var suppliesNo = $('#officeGoodsManage .popups .addSupplies .suppliesNo').val()//物品编号
		var unit = $('#officeGoodsManage .popups .addSupplies .unit').val()//计量单位
		var suppliesName = $('#officeGoodsManage .popups .addSupplies .suppliesName').val()//物品名称
		var stockCounts = $('#officeGoodsManage .popups .addSupplies .stockCounts').val()//库存总数
		var suppliesTypeUrl = $('#officeGoodsManage .popups .addSupplies .suppliesType').attr('suppliestypeurl')//所属分类
		var isWarning = $('#officeGoodsManage .popups .addSupplies .isWarning').val()//是否启用库存警示
		var specifications = $('#officeGoodsManage .popups .addSupplies .specifications').val()//规格
		var warnCounts = $('#officeGoodsManage .popups .addSupplies .warnCounts').val()//警报库存数
		var notes = $('#officeGoodsManage .popups .addSupplies .notes').val();//备注
		
		
		if(suppliesNo == ''||suppliesNo == null){
			windowControl('请为物品生成编号');
			return false;
		}else if(unit == ''||unit == null){
			windowControl('计量单位不能为空');
			return false;
		}else if(suppliesName == ''||suppliesName == null){
			windowControl('物品名称不能为空');
			return false;
		}else if(stockCounts == ''||stockCounts == null){
			windowControl('库存总数不能为空');
			return false;
		}else if(specifications == ''||specifications == null){
			windowControl('规格不能为空');
			return false;
		}else if(warnCounts == ''||warnCounts == null){
			windowControl('警报库存数不能为空');
			return false;
		}else{
			var info = {
				suppliesNo:suppliesNo,
				unit:unit,
				suppliesName:suppliesName,
				stockCounts:stockCounts,
				suppliesTypeUrl:suppliesTypeUrl,
				isWarning:isWarning,
				specifications:specifications,
				warnCounts:warnCounts,
				notes:notes
			}
			$.ajax({
				url:'../../admin/insertOfficeSupplies.do?getMs='+getMS(),
				data:info,
				success:function(data){
					if(data == 200){
						$('#officeGoodsManage .popups .addSupplies').css('display','none');
						$('#officeGoodsManage .popups .addSupplies .popuparea input[type=text]').val(null);
						$('#officeGoodsManage .popups .addSupplies .popuparea select').val(null);
						$('#officeGoodsManage .popups .addSupplies .popuparea textarea').val(null);
						$('#officeGoodsManagedg').datagrid('reload');
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
//修改物品信息
function updataSupplies(suppliesId,suppliesNo,unit,suppliesName,stockCounts,suppliesTypeUrl,suppliesTypeName,isWarning,specifications,warnCounts,notes){
	$('#officeGoodsManage .popups .editSupplies').css('display','block');
	$('#officeGoodsManage .popups .editSupplies .suppliesNo').val(suppliesNo)//物品编号
	$('#officeGoodsManage .popups .editSupplies .unit').val(unit)//计量单位
	$('#officeGoodsManage .popups .editSupplies .suppliesName').val(suppliesName)//物品名称
	$('#officeGoodsManage .popups .editSupplies .stockCounts').val(stockCounts)//库存总数
	$('#officeGoodsManage .popups .editSupplies .suppliesType').attr('suppliestypeurl',suppliesTypeUrl)//所属分类
	$('#officeGoodsManage .popups .editSupplies .suppliesType').val(suppliesTypeName);
	$('#officeGoodsManage .popups .editSupplies .isWarning').val(isWarning)//是否启用库存警示
	$('#officeGoodsManage .popups .editSupplies .specifications').val(specifications)//规格
	$('#officeGoodsManage .popups .editSupplies .warnCounts').val(warnCounts)//警报库存数
	$('#officeGoodsManage .popups .editSupplies .notes').val(notes);//备注
	
	//确定修改办公用品
	$('#officeGoodsManage .popups .editSupplies .confirm').unbind('click');
	$('#officeGoodsManage .popups .editSupplies .confirm').click(function(){
		var suppliesNo = $('#officeGoodsManage .popups .editSupplies .suppliesNo').val()//物品编号
		var unit = $('#officeGoodsManage .popups .editSupplies .unit').val()//计量单位
		var suppliesName = $('#officeGoodsManage .popups .editSupplies .suppliesName').val()//物品名称
		var stockCounts = $('#officeGoodsManage .popups .editSupplies .stockCounts').val()//库存总数
		var suppliesTypeUrl = $('#officeGoodsManage .popups .editSupplies .suppliesType').attr('suppliestypeurl')//所属分类
		var isWarning = $('#officeGoodsManage .popups .editSupplies .isWarning').val()//是否启用库存警示
		var specifications = $('#officeGoodsManage .popups .editSupplies .specifications').val()//规格
		var warnCounts = $('#officeGoodsManage .popups .editSupplies .warnCounts').val()//警报库存数
		var notes = $('#officeGoodsManage .popups .editSupplies .notes').val();//备注
		
		if(suppliesNo == ''||suppliesNo == null){
			windowControl('请为物品生成编号');
			return false;
		}else if(unit == ''||unit == null){
			windowControl('计量单位不能为空');
			return false;
		}else if(suppliesName == ''||suppliesName == null){
			windowControl('物品名称不能为空');
			return false;
		}else if(stockCounts == ''||stockCounts == null){
			windowControl('库存总数不能为空');
			return false;
		}else if(specifications == ''||specifications == null){
			windowControl('规格不能为空');
			return false;
		}else if(warnCounts == ''||warnCounts == null){
			windowControl('警报库存数不能为空');
			return false;
		}else{
			var info = {
				suppliesId:suppliesId,	
				suppliesNo:suppliesNo,
				unit:unit,
				suppliesName:suppliesName,
				stockCounts:stockCounts,
				suppliesTypeUrl:suppliesTypeUrl,
				isWarning:isWarning,
				specifications:specifications,
				warnCounts:warnCounts,
				notes:notes
			}
			$.ajax({
				url:'../../admin/updateOfficeSupplies.do?getMs='+getMS(),
				data:info,
				success:function(data){
					if(data == 200){
						$('#officeGoodsManage .popups .editSupplies').css('display','none');
						$('#officeGoodsManage .popups .editSupplies .popuparea input[type=text]').val(null);
						$('#officeGoodsManage .popups .editSupplies .popuparea select').val(null);
						$('#officeGoodsManage .popups .editSupplies .popuparea textarea').val(null);
						$('#officeGoodsManagedg').datagrid('reload');
						windowControl('修改成功');
					}else{
						windowControl('修改失败');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	});
}
//删除办公用品
function deleteSupplies(id){
	ui.confirm('确认要删除信该办公用品吗?',function(z){
		if(z){
			$.ajax({
				url:'../../admin/deleteOfficeSupplies.do?getMs='+getMS(),
				data:{
					suppliesId:id
				},
				success:function(data){
					$('#suppliesTypetg').tree('reload');
					$('#officeGoodsManagedg').datagrid('reload');
					if(data == 200){
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
//添加办公用品类型
function addSuppliesType(){
	$('#officeGoodsManage .addSuppliesType').css('display','block');
}
//删除办公用品类型
function deleteSuppliesType(){
	$('#officeGoodsManage .removeSuppliesType').css('display','block');
}
//修改办公用品类型
function editSuppliesType(){
	$('#officeGoodsManage .editSuppliesType').css('display','block');
}
