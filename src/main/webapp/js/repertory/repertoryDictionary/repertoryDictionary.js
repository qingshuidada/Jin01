$(function(){
	var leftCellWidth = $('#repertoryDictionary .dictionaryType').width()-3;
	var rightCellWidth = $('#repertoryDictionary .dictionaryDetail').width()-3;
	$('#repertoryDictionary .dictionaryMain #repertoryDictionaryTypeDg').parent().css('height',$('#loadarea').height()-63+'px');
	$("#repertoryDictionaryTypeDg").datagrid({
		url:"../../dictionary/queryDictionaryType.do?getMs="+getMS(),
		queryParams:{typeFlag:'1'},
		singleSelect:true,
		method:"post",
		fit: true,
		pagination:false,
		onLoadSuccess:function(){
			$('#repertoryDictionary .dictionaryType .datagrid-cell:eq(0)').css({'height':'32px','line-height':'32px','font-size':'14px'});
			$('#repertoryDictionary .dictionaryMain #repertoryDictionaryDetailDg').parent().css('height',$('#loadarea').height()-63+'px');
		},
		onDblClickRow:function(rowIndex, rowData){
			var selectedRow = $('#repertoryDictionaryTypeDg').datagrid('getSelected');
			var selectedKey = selectedRow.selectKey;
			$('#repertoryDictionaryDetailDg').datagrid({
				url:"../../dictionary/queryDictionary.do?getMs="+getMS(),
				queryParams:{
					selectKey:selectedKey
				},
				singleSelect:true,
				method:"post",
				fit: true,
				pagination:false,
				onLoadSuccess:function(data){
					$('#repertoryDictionary .dictionaryDetail .datagrid-cell:eq(0)').css({'height':'32px','line-height':'32px','font-size':'14px'});
					$('#repertoryDictionary .dictionaryDetail .downsetDictionary:last').remove();
					$('#repertoryDictionary .dictionaryDetail .upsetDictionary:last').before('<span class="last-button"></span>');
				},
				columns:[[
				    {field:"optionKey",title:"编号",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
				    {field:"optionValue",title:"名称",fitColumns:true,resizable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
				    	if(row.isDefault == 1){
				    		return '<span style="color:green;">'+value+'</span>';
				    	}else{
				    		return '<span>'+value+'</span>';
				    	}
				    }},
				    {field:"createUserName",title:"创建人",fitColumns:true,resizable:true,align:"center",sortable:true,width:175},
				    {field:"createTimeStr",title:"创建时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:175},
				    {field:"updateUserName",title:"修改人",fitColumns:true,resizable:true,align:"center",sortable:true,width:175},
				    {field:"updateTimeStr",title:"修改时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:175},
				    {field:"aliveFlag",title:"是否有效",fitColumns:true,resizable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
				    	if(row.aliveFlag == 1){
				    		return "有效";
				    	}else{
				    		return "无效";
				    	}
				    }},
				    {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
				    	   var id ="'"+row.dictionaryId+"'";
				    	   var selectKey = "'"+row.selectKey+"'";
				    	   var optionKey = "'"+row.optionKey+"'";
				    	   var optionValue = "'"+row.optionValue+"'";
				    	   var operation = '';
				    	   operation +='<span class="small-button edit" onclick="editDictionary('+id+','+selectKey+','+optionKey+','+optionValue+')" title="编辑"></span>';
				    	   operation +='<span class="small-button delete" onclick="deleteDictionary('+id+','+selectKey+','+optionKey+','+index+')" title="弃用"></span>';
				    	   //operation +='<span class="empty-button"></span>';
				    	   operation +='<span class="downset downsetDictionary" onclick="downsetDictionary('+index+')" title="下移"></span>';
				    	   if(row.isDefault == 1){
				    		   operation +='<span class="empty-button"></span>';
				    	   }else{
				    		   operation +='<span class="small-button defaultSet" onclick="setDefault('+id+')"></span>';
				    	   }
				    	   if(index != 0){
				    		   operation +='<span class="upset upsetDictionary" onclick="upsetDictionary('+index+')" title="上移"></span>';
				    	   }else{
				    		   operation +='<span class="empty-button"></span>';
				    	   }
				    	   return operation;
				     }},
				    {field:"dictionaryId",hidden:true},
				    {field:"orderCode",hidden:true},
				    {field:"isDefault",hidden:true}
				]]
			});
			$('#repertoryDictionary .maintop input[name=addDictionary]').css('display','inline');
		},
		columns:[[
		     {field:"selectName",title:"数据类别",fitColumns:true,resizable:true,align:"center",sortable:true,width:leftCellWidth},
		]]
	});
	
	/*********************************确认修改数据项点击事件******************************************/
	$('#repertoryDictionary .popups .editDictionary input[type=button][name=ensure]').click(function(){
		var optionKey = $('#repertoryDictionary .popups input[type=text][name=optionKey]').val();
		var optionValue = $('#repertoryDictionary .popups input[type=text][name=optionValue]').val();
		var selectKey = $('#repertoryDictionary .popups input[name=selectKey]').val();
		var id = $('#repertoryDictionary .popups .hidden[name=id]').val();
		$('#repertoryDictionary .popups input[type=text]').val(null);
		$('#repertoryDictionary .popups .editDictionary').css('display','none');
		$.ajax({
			data:{
				dictionaryId:id,
				selectKey:selectKey,
				optionKey:optionKey,
				optionValue:optionValue
			},
			url:"../../dictionary/updateDictionary.do?getMs="+getMS(),
			success:function(data){
				if(data == '200'){
					windowControl("修改成功");
				}else{
					windowControl("修改失败");
				}
				$('#repertoryDictionaryDetailDg').datagrid('reload');
			},
			fail:function(){
				windowControl("服务器未响应");
			}
		})
	})
	/*-----------------------添加数据项按钮-------------------------------*/
	$('#repertoryDictionary .maintop input[name=addDictionary]').click(function(){
		$('#repertoryDictionary .popups .addDictionary').css('display','block');
	});
	/*-----------------------添加数据项----------------------------------*/
	$('#repertoryDictionary .popups .addDictionary .confirm').click(function(){
		var optionKey = $.trim($('#repertoryDictionary .addDictionary .popuparea input[name=optionKey]').val());
 		var optionValue = $.trim($('#repertoryDictionary .addDictionary .popuparea input[name=optionValue]').val());
 		var selectKey = $('#repertoryDictionaryDetailDg').datagrid('getRows')[0].selectKey;
 		var selectName = $('#repertoryDictionaryDetailDg').datagrid('getRows')[0].selectName;
 		if(optionKey == ''||optionKey == null){
 			windowControl('数据项编号不能为空');
 			return false;
 		}else if(optionValue == ''||optionValue == null){
 			windowControl('数据项名称不能为空');
 			return false;
 		}else{
 			var info = {
 				optionKey:optionKey,
 				selectKey:selectKey,
 				selectName:selectName,
 				optionValue:optionValue,
 				isDefault:'0',
 				typeFlag:'1'
 			}
 			$.ajax({
 	 			url:'../../dictionary/addDictionary.do?getMs='+getMS(),
 	 			data:info,
 	 			success:function(data){
 	 				if(data == 200){
 	 					windowControl('添加数据项成功');
 	 					$('#repertoryDictionary .popups .addDictionary').css('display','none');
 	 					$('#repertoryDictionary .popups .addDictionary .popuparea input[type=text]').val(null);
 	 					$('#repertoryDictionaryDetailDg').datagrid('reload');
 	 				}else{
 	 					windowControl('添加数据项失败');
 	 				}
 	 			},
 	 			error:function(err){
 	 				windowControl('网络异常');
 	 			}
 	 		});
 		}
	});
	/*********************************取消修改数据项点击事件******************************************/
	$('#repertoryDictionary .popups .editDictionary input[type=button][name=cancel]').click(function(){
		$('#repertoryDictionary .popups input[type=text]').val(null);
		$('#repertoryDictionary .popups .editDictionary').css('display','none');
	})
	
	/*******************************确认修改数据字典顺序的方法************************************/
	$('#repertoryDictionary .maintop input[name=sortDictionary]').click(function(){
		ui.confirm('确认是否修改数据字典顺序',function(z){
			var rows = $('#repertoryDictionaryDetailDg').datagrid('getRows');
			var dictionaries = [];
			for(var i = 0;i < rows.length;i++){
				var dictionary = {
					dictionaryId:rows[i].dictionaryId,
					orderCode:rows[i].orderCode
				};
				dictionaries.push(dictionary);
			}
			var params = JSON.stringify(dictionaries);
			$.ajax({
				url:'../../dictionary/updateDictionaryOrder.do?getMs='+getMS(),
				data:{jsonString:params},
				success:function(data){
					if(data=='200'){
						windowControl("修改顺序成功");
						$('#repertoryDictionary .maintop input[name=sortDictionary]').css('display','none');
					}else{
						windowControl("修改顺序失败");
					}
				},
				fail:function(){
					windowControl("服务器未响应");
				}
			})
		});
	});
})

/*********************************编辑数据字典行的方法******************************************/
function editDictionary(id,selectKey,optionKey,optionValue){
	$('#repertoryDictionary .popups .editDictionary').css('display','block');
	$('#repertoryDictionary .popups .editDictionary input[type=text][name=optionKey]').val(optionKey);
	$('#repertoryDictionary .popups .editDictionary input[type=text][name=optionValue]').val(optionValue);
	$('#repertoryDictionary .popups .editDictionary input[name=selectKey]').val(selectKey);
	$('#repertoryDictionary .popups .hidden[name=id]').val(id);
}

/*********************************弃用数据字典行的方法******************************************/
function deleteDictionary(id,selectKey,optionKey,index){
	ui.confirm('是否确认弃用该数据项？',function(z){ 
		if(z){
			$.ajax({
				data:{dictionaryId:id,selectKey:selectKey,optionKey:optionKey},
				url:"../../dictionary/deleteDictionary.do?getMs="+getMS(),
				success:function(data){
					if(data == '200'){
						windowControl("弃用成功");
					}else{
						windowControl("弃用失败");
					}
					$('#repertoryDictionaryDetailDg').datagrid('reload');
				},
				fail:function(){
					windowControl("服务器未响应");
				}
			})
		}
	},false)
}

/*********************************下移数据字典行的方法******************************************/
function downsetDictionary(index,row){
	var rows = $('#repertoryDictionaryDetailDg').datagrid('getRows');
	var total = rows.length;
	var curRow = rows[index];
	var nextRow = rows[index+1];
	var curParam = {
			optionKey:nextRow.optionKey||"",
			optionValue:nextRow.optionValue||"",
			createTimeStr:nextRow.createTimeStr||"",
			createUserName:nextRow.createUserName||"",
			updateTimeStr:nextRow.updateTimeStr||"",
			updateUserName:nextRow.updateUserName||"",
			dictionaryId:nextRow.dictionaryId||"",
			isDefault:nextRow.isDefault||""
	};
	nextParam = {
			optionKey:curRow.optionKey||"",
			optionValue:curRow.optionValue||"",
			createTimeStr:curRow.createTimeStr||"",
			createUserName:curRow.createUserName||"",
			updateTimeStr:curRow.updateTimeStr||"",
			updateUserName:curRow.updateUserName||"",
			dictionaryId:curRow.dictionaryId||"",
			isDefault:curRow.isDefault||""
	};
	$('#repertoryDictionaryDetailDg').datagrid('updateRow',{
		index:index,
		row:curParam
	});
	$('#repertoryDictionaryDetailDg').datagrid('updateRow',{
		index:index+1,
		row:nextParam
	});
	var rows2 = $('#repertoryDictionaryDetailDg').datagrid('getRows');
	if(index == total-1 || index+1 == total-1){
		$('#repertoryDictionary .dictionaryDetail .downsetDictionary:last').remove();
		$('#repertoryDictionary .dictionaryDetail .upsetDictionary:last').before('<span class="last-button"></span>');
	}
	var display = $('#repertoryDictionary .maintop input[name=sortDictionary]').css('display');
	if(display == 'none'){
		$('#repertoryDictionary .maintop input[name=sortDictionary]').css('display','inline');
	}
}

/*********************************上移数据字典行的方法******************************************/
function upsetDictionary(index,row){
	var rows = $('#repertoryDictionaryDetailDg').datagrid('getRows');
	var total = rows.length;
	var curRow = rows[index];
	var lastRow = rows[index-1];
	var curParam = {
			optionKey:lastRow.optionKey||"",
			optionValue:lastRow.optionValue||"",
			createTimeStr:lastRow.createTimeStr||"",
			createUserName:lastRow.createUserName||"",
			updateTimeStr:lastRow.updateTimeStr||"",
			updateUserName:lastRow.updateUserName||"",
			dictionaryId:lastRow.dictionaryId||"",
			isDefault:lastRow.isDefault||""
	};
	lastParam = {
			optionKey:curRow.optionKey||"",
			optionValue:curRow.optionValue||"",
			createTimeStr:curRow.createTimeStr||"",
			createUserName:curRow.createUserName||"",
			updateTimeStr:curRow.updateTimeStr||"",
			updateUserName:curRow.updateUserName||"",
			dictionaryId:curRow.dictionaryId||"",
			isDefault:curRow.isDefault||""
	};
	$('#repertoryDictionaryDetailDg').datagrid('updateRow',{
		index:index,
		row:curParam
	});
	$('#repertoryDictionaryDetailDg').datagrid('updateRow',{
		index:index-1,
		row:lastParam
	});
	if(index == total-1 || index-1 == total-1){
		$('#repertoryDictionary .dictionaryDetail .downsetDictionary:last').remove();
		$('#repertoryDictionary .dictionaryDetail .upsetDictionary:last').before('<span class="last-button"></span>');
	}
	var display = $('#repertoryDictionary .maintop input[name=sortDictionary]').css('display');
	if(display == 'none'){
		$('#repertoryDictionary .maintop input[name=sortDictionary]').css('display','inline');
	}
}
/*-------------------------设置默认-----------------------*/
function setDefault(id){
	var selectKey = $('#repertoryDictionaryDetailDg').datagrid('getRows')[0].selectKey;
	ui.confirm('是否将这项设置为默认项',function(z){
		if(z){
			$.ajax({
				data:{dictionaryId:id,isDefault:'1',selectKey:selectKey},
				url:"../../dictionary/updateDictionary.do?getMs="+getMS(),
				success:function(data){
					if(data == '200'){
						windowControl("设置默认成功");
					}else{
						windowControl("设置默认失败");
					}
					$('#repertoryDictionaryDetailDg').datagrid('reload');
				},
				fail:function(){
					windowControl("服务器未响应");
				}
			});
		}
	});
}

