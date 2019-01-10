var findGoodsExcel = [];
$(function(){
	/*设置页面高100%*/
	$('#findgoods').css('height',$('#loadarea').height()-31+'px');
	/*设置list的宽度*/
	$('#findgoods .listForm').css('width',$('#loadarea').width()-502+'px');
	/*设置表格的高度*/
	$('#findgoodsdg').css('height',$('#findgoods .listForm').height()-31+'px');
	/*----表格化----*/
	$('#findgoodsdg').datagrid({
		//url:'../../repertory/selectGoodsByTime.do?getMs='+getMS(),
	    singleSelect:true,
	    toolbar:'#findgoods .queryForm',
	    pagination:true,
	    onLoadSuccess:function(data){
			$.ajax({
				url:'../../repertory/findSum.do?getMs='+getMS(),
				data:{goodsTypeUrl:$("#findgoods .goodsTypeUrl").val()},
				success:function(data){
					adjustsumBar('findgoods');
					addsumBar('findgoods',data);
				},
				error:function(err){
					
				}
			})
		},
	    onClickRow: function (rowIndex){	
	    	var row = $('#findgoodsdg').datagrid('getSelected');
            var info = row.goodsId;
            /*暂存列表*/
        	$('#findgoods .rightarea .temporary').datagrid({
        		url:'../../repertory/selectRecordAndRepertoryById.do?getMs='+getMS(),
        		 queryParams:{
 	    			goodsId:info,
 	    		},
 	    		onLoadSuccess:function(){
 	    			/*对数据进行筛选*/
 	        		var cangweiData = [],streamData = [];
 	        		var gridData = $("#findgoods .rightarea .temporary").datagrid('getData');//获取当前grid的所有数据
 	        		for(var i =0;i<gridData.total;i++){
 	        		    if (gridData.rows[i].operation == 'repertory') {
 	        		    	cangweiData.push(gridData.rows[i]);
 	        		    }else{
 	        		    	streamData.push(gridData.rows[i]);
 	        		    }
 	        		}
 	        		$("#findgoods .cangwei-list").datagrid('loadData',cangweiData);//重载数据
 	        		$("#findgoods .inout-stream").datagrid('loadData',streamData);//重载数据
 	    		},
        	})   		
        },
		columns:[[
			{field:'_op',title:'操作',width:100,align:'center',width:100,
				formatter:function(value,row,index){
					var id = "'"+row.goodsId+"'";
					var goodsName = "'"+row.goodsName+"'";
					return '<span class="small-button edit" title="修改" onclick="findgoodsupDate('+id+')"></span>'
					+'<span class="small-button delete" title="删除" onclick="findgoodsDel('+id+','+goodsName+')"></span>';
			}},
			{field:'goodsName',title:'物品名',width:100,align:'center',},
			{field:'goodsSize',title:'规格',width:100,align:'center',},
			{field:'totalNumber',title:'数量',width:100,align:'center',},
			{field:'unit',title:'单位',width:50,align:'center',},
			{field:'warnNumber',title:'警示数量',width:80,align:'center',},
			{field:'latestUnitPrice',title:'最新价格(元)',width:80,align:'center',formatter:function(value,row,index){
					return keepDecimals(value);
				}
			},
			{field:'movingAverPrice',title:'移动平均价(元)',width:90,align:'center',formatter:function(value,row,index){
					return keepDecimals(value);
				}
			},
			{field:'updateTimeStr',title:'更新日期',width:140,align:'center'},
			{field:'是否缺货',title:'是否缺货',width:80,align:'center',
				formatter:function(value,row,index){
					var i= row.warnNumber;
					var j= row.totalNumber;
					if(i>j){
						return '<span style="color:red">缺货</span>';
					}else{
						return '不缺货';					
					}
				}
			},
			{field:'record',title:'备注',width:100,align:'center',width:100},
	    ]],
	});
	/*物品仓位,进出库流水内容高度设置*/
	$('#findgoods .lump .cangwei-list').css('height',$('#findgoods .treearea').height()/2+'px');
	$('#findgoods .lump .inout-stream').css('height',$('#findgoods .treearea').height()/2+'px');
	 /*仓位列表*/
	$('#findgoods .cangwei-list').datagrid({
		url:'../../repertory/selectRecordAndRepertoryById.do?getMs='+getMS(),
		singleSelect:true,
		toolbar:'#findgoods .lump:eq(0) p',
		onClickRow: function (rowIndex){
			var rows = $('#findgoodsdg').datagrid('getSelected');
        	$('#findgoods .get .popuparea input[name=goodsName]').val(rows.goodsName);
        	$('#findgoods .get .popuparea input[name=goodsSize]').val(rows.goodsSize);
        	$('#findgoods .put .popuparea input[name=goodsName]').val(rows.goodsName);
        	$('#findgoods .put .popuparea input[name=goodsSize]').val(rows.goodsSize);
        	$('#findgoods .move .popuparea input[name=goodsName]').val(rows.goodsName);
        	$('#findgoods .move .popuparea input[name=goodsSize]').val(rows.goodsSize);
        	getDocumentMaker();
		},
	    columns:[[
			{field:'_op',title:'操作',width:130,align:'center',
				formatter:function(value,row,index){
					var goodsPositionName = "'"+row.goodsPositionName+"'";
					var totalNumber = "'"+row.inNumber+"'";
					var repertoryName = "'"+row.repertoryName+"'";
					return '<a href="#" onclick="putPosition('+goodsPositionName+','+repertoryName+')" class="_op">入库</a>'
						+'<a href="#" onclick="getPosition('+goodsPositionName+','+repertoryName+')" class="_op">出库</a>'
						+'<a href="#" onclick="movePosition('+goodsPositionName+','+totalNumber+','+repertoryName+')" class="_op">移库</a>';
			}},
	        {field:'goodsPositionName',title:'仓位',width:80,align:'center'},
			{field:'inNumber',title:'数量',width:50,align:'center'},
	    ]],
	});
	 /*流水列表*/
	$('#findgoods .inout-stream').datagrid({
		url:'../../repertory/selectRecordAndRepertoryById.do?getMs='+getMS(),
		singleSelect:true,
		onClickRow: function (rowIndex){
			var row = $('#findgoods .inout-stream').datagrid('getSelected');
        	if(row.operation == "inRecord"){
        		$('#findgoods .update4 .popuparea input[name=inTime]').val(row.strInTime);
				$('#findgoods .update4 .popuparea input[name=inNumber]').val(row.inNumber);
				$('#findgoods .update4 .popuparea input[name=putUserName]').val(row.putUserName);
				$('#findgoods .update4 .popuparea input[name=goodsPositionName]').val(row.goodsPositionName);
				$('#findgoods .update4 .popuparea textarea[name=record]').val(row.record);
        	}else if(row.operation == "outRecord"){
				$('#findgoods .update3 .popuparea input[name=outTime]').val(row.strInTime);
				$('#findgoods .update3 .popuparea input[name=outNumber]').val(row.inNumber);
				$('#findgoods .update3 .popuparea input[name=getUserName]').val(row.putUserName);
				$('#findgoods .update3 .popuparea textarea[name=record]').val(row.record);
        	}
        	getDocumentMaker();
		},
	    columns:[[
			{field:'_op',title:'操作',width:80,align:'center',
				formatter:function(value,row,index){
					if(row.operation == "inRecord"){
						var id = "'"+row.inRecordId+"'";
						return '<span class="small-button edit" title="修改入库记录" onclick="inStreamPut('+id+')"></span>'
						+'<span class="small_button delete" title="删除入库记录" onclick="inStreamDel('+id+')"></span>';
					}else if(row.operation == "outRecord"){
						var id = "'"+row.inRecordId+"'";
						return '<span class="small-button edit" title="修改出库记录" onclick="outStreamPut('+id+')"></span>'
						+'<span class="small_button delete" title="删除出库记录" onclick="outStreamDel('+id+')"></span>';
					}
			}},
			{field:'operation',title:'进出库',width:50,align:'center',formatter:function(value,row,index){
					if(row.operation == "outRecord"){
						return '出库'
					}else if(row.operation == "inRecord"){
						return '入库';
					}
			}},
			{field:'inNumber',title:'数量',width:50,align:'center',},
			{field:'putUserName',title:'领用人/入库人',width:100,align:'center'},
			{field:'operateUserName',title:'领取部门/操作人',width:100,align:'center'},
	    ]],
	});
	/*******清空按钮清空事件******/
	cleanQuery($('#findgoods .listForm .queryForm input[type=button]'));
	/*添加物品信息*/
	$('#findgoods .addGoods').click(function(){
		if($('#findgoodstg').tree('getSelected') == null){
			windowControl("请在左侧选择物品所属类别");
			return ;
		}
		var goodsTypeName = $('#findgoodstg').tree('getSelected').text;
		var goodsTypeUrl = $('#findgoodstg').tree('getSelected').id;
		$('#findgoods .insert .goodsTypeName').val(goodsTypeName);
		$('#findgoods .insert').css('display','block'); 
		$('#findgoods .insert .confirm').unbind();
		$('#findgoods .insert .confirm').click(function(){
			var goodsName = $.trim($('#findgoods .insert .goodsName').val());
			var goodsSize = $.trim($('#findgoods .insert .goodsSize').val());
			var unit = $.trim($('#findgoods .insert .unit').val());
			var warnNumber = $.trim($('#findgoods .insert .warnNumber').val());
			var record = $.trim($('#findgoods .insert .record').val());
			if(goodsName == ""){
				windowControl('物品名字不能为空');
			}else if(goodsSize == ""){
				windowControl('物品规格不能为空');                                                                       
			}else if(unit == ""){
				windowControl('物品单位不能为空');
			}else if(warnNumber == ""){
				windowControl('警示数量不能为空');
			}/*else if(record == ""){
				windowControl('备注不能为空');
			}*/else{
				$.ajax({
					data:{goodsName:goodsName,
						goodsSize:goodsSize,
						unit:unit,
						warnNumber:warnNumber,
						goodsTypeUrl:goodsTypeUrl,
						record:record,
					},
					url:'../../repertory/insertGoods.do?getMs='+getMS(),
					type:'post',
					success:function(data){
						if(data == 200){
							$('#findgoods .insert').css('display','none');
							$('#findgoods .insert .popuparea input').val('');
							$('#findgoods .insert .popuparea textarea').val('');
							$('#findgoodsdg').datagrid('reload');
							windowControl("添加物品成功");
						}else{
							windowControl("添加物品失败");
						}
					},
					error:function(err){
						windowControl("服务器未响应");
					}
				});
			}
		});
	});
	
	//打印
	$('#findgoods .print').click(function(){
		var goodsName = $.trim($('#findgoods .goodsName').val());
		var goodsSize = $.trim($('#findgoods .goodsSize').val());
		var beginNumber = $.trim($('#findgoods .goodsNumSm').val());
		var endNumber = $.trim($('#findgoods .goodsNumBg').val());
		var repertoryId = $('#findgoods .listForm .repertoryName').val();
		var goodsLack = $('#findgoods .goodsLack option:selected').val() || '';
		var goodsTypeUrl = $("#findgoods .goodsTypeUrl").val() || '0';
		if(goodsLack == ''){
			
		}else{
			if(goodsLack == "缺货"){
				goodsLack = '1';
			}else if(goodsLack == "不缺货"){
				goodsLack = '0';
			}
		}
		var url = "../../repertory/printGoods.do?" + "goodsName=" + goodsName + "&goodsSize=" + goodsSize + "&beginNumber=" + beginNumber
		 			+ "&endNumber=" + endNumber  + "&repertoryId=" + repertoryId  + "&goodsLack=" + goodsLack + "&goodsTypeUrl=" + goodsTypeUrl;
		$('#findgoods .printGoods').attr("action",url);
		$('#findgoods .printGoods').submit();
	});
	
	/*条件查询*/
	$('#findgoods .query').click(function(){
		var goodsName = $.trim($('#findgoods .goodsName').val());
		var goodsSize = $.trim($('#findgoods .goodsSize').val());
		var beginNumber = $.trim($('#findgoods .goodsNumSm').val());
		var endNumber = $.trim($('#findgoods .goodsNumBg').val());
		var repertoryId = $('#findgoods .listForm .repertoryName').val();
		var goodsLack = $('#findgoods .goodsLack option:selected').val();
		var goodsTypeUrl = $("#findgoods .goodsTypeUrl").val();
		var dataInfo;
		if(goodsLack == ""){
			dataInfo = {
				goodsName:goodsName,
				goodsSize:goodsSize,
				beginNumber:beginNumber,
				endNumber:endNumber,
				repertoryId:repertoryId,
				goodsTypeUrl:goodsTypeUrl||'0'
			};
		}else{
			if(goodsLack == "缺货"){
				goodsLack = '1';
			}else if(goodsLack == "不缺货"){
				goodsLack = '0';
			}
			dataInfo = {
				goodsName:goodsName,
				goodsSize:goodsSize,
				beginNumber:beginNumber,
				endNumber:endNumber,
				repertoryId:repertoryId,
				goodsLack:goodsLack,
				goodsTypeUrl:goodsTypeUrl||'0'
			};
		}
		findGoodsExcel = [
 		    {name:'goodsName',value:goodsName},
   		    {name:'goodsSize',value:goodsSize},
	   		{name:'beginNumber',value:beginNumber},
	   		{name:'endNumber',value:endNumber},
	   		{name:'repertoryId',value:repertoryId},
	   		{name:'goodsLack',value:goodsLack},
	   		{name:'goodsTypeUrl',value:goodsTypeUrl}
   		   ];
		$('#findgoodsdg').datagrid({
			url:"../../repertory/selectGoodsByTime.do?getMs="+getMS(),
			queryParams:dataInfo
		});
		$('#findgoods .cangwei-list').datagrid('reload');
		$('#findgoods .inout-stream').datagrid('reload');
	});
	/*修改物品信息*/
	$('#findgoods .update .confirm').click(function(){
		var goodsId = $('#findgoods .update .goodsName').attr('goodsId');
		var goodsName = $.trim($('#findgoods .update .goodsName').val());
		var goodsSize = $.trim($('#findgoods .update .goodsSize').val());
		var unit = $.trim($('#findgoods .update .unit').val());
		var warnNumber = $.trim($('#findgoods .update .warnNumber').val());
		var record = $.trim($('#findgoods .update .record').val());
		if(goodsName == ""){
			windowControl('物品名字不能为空');
		}else if(goodsSize == ""){
			windowControl('物品规格不能为空');
		}else if(unit == ""){
			windowControl('物品单位不能为空');
		}else if(warnNumber == ""){
			windowControl('警示数量不能为空');
		}else{
			$.ajax({
				data:{goodsId:goodsId,
					goodsName:goodsName,
					goodsSize:goodsSize,
					unit:unit,
					warnNumber:warnNumber,
					record:record,
				},
				url:'../../repertory/updateGoods.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == 200){
						$('#findgoodsdg').datagrid('reload');
						$('#findgoods .update').css('display','none');
						$('#findgoods .update .popuparea input').val('');
						windowControl('修改物品成功');
					}else if(data == 400){
						windowControl('物品修改失败');
					}else{
						windowControl('服务器异常');
					}
				},
				error:function(err){
					windowControl('服务器未响应');
				}
			});
		}
	});
	/*刷新*/
	$('#findgoods .refresh').click(function(){
		$('#findgoodsdg').datagrid({
			url:"../../repertory/selectGoodsByTime.do?getMs="+getMS(),
		});
		$('#findgoods .queryForm input').val('');
		$('#findgoods .query').val('查询');
		$('#findgoods .queryForm select option:eq(0)').attr('selected',true);
	});
	/*--------------------------------tree------------------------------*/
	var goodsTypeIds=[];
	$('#findgoodstg').tree({
        url: "../../treeController/queryTree.do?getMs="+getMS(),
        method:"post",
        animate: false,
        checkbox : false,//是否显示复选框  
        cascadeCheck: false,
        dnd:true,
        onClick: function(node){
        	var goodsTypeUrl = node.id;
        	/*$('#findgoodsdg').datagrid({
        		url:'../../repertory/selectGoodsByTime.do?getMs='+getMS(),
        		queryParams:{goodsTypeUrl:goodsTypeUrl},
        	});*/
        	$("#findgoods .goodsTypeUrl").val(node.id);
        	//findgoodsdg 数据重载 仓位 与 近7日流水 数据设置为空
        	$("#findgoods .cangwei-list").datagrid('loadData',{ total: 0, rows: [] });
     		$("#findgoods .inout-stream").datagrid('loadData',{ total: 0, rows: [] });
        },
        onCollapse:function(node){
        	$("#findgoods .goodsTypeUrl").val(node.id);
        	$.ajax({
        		data:{goodsTypeUrl:$("#findgoods .goodsTypeUrl").val(),state:"onCollapse"},
    			url:"../../treeController/updateTreeState.do?getMs="+getMS(),
    			method:"post"
    		})
        },
        onExpand:function(node){
        	$("#findgoods .goodsTypeUrl").val(node.id);
        	$.ajax({
        		data:{goodsTypeUrl:$("#findgoods .goodsTypeUrl").val(),state:"onExpand"},
    			url:"../../treeController/updateTreeState.do?getMs="+getMS(),
    			method:"post"
    		});
        },
        onDrop: function(target,source,point){
        	var targetUrl = $('#findgoodstg').tree('getNode', target).id;
        	var targetName = $('#findgoodstg').tree('getNode', target).text;
        	//console.log("targetId="+targetId+"source="+source.text+"point="+point);
        	$.ajax({
    			data:{
    				targetUrl:targetUrl,
    				targetName:targetName,
    				sourceUrl:source.id,
    				sourceName:source.text,
    				point:point,
    				action:'拖动'
    			},
    			url:"../../treeController/dragRepertoryType.do?getMs="+getMS(),
    			method:"post",
    			success: function(data){
    				$('#findgoodstg').tree('reload');
    			}
    		})
        },
        onCheck: function(node,checked){
        	if(checked == true){
        		goodsTypeIds.push(node.id);
        	}else if(checked == false){
        		for(var i=0;i<goodsTypeIds.length;i++){
        			if(goodsTypeIds[i] == node.id){
        				goodsTypeIds.splice(i,1);
        			}
        		}
        	}
        },
        onContextMenu : function(e,node){
        	e.preventDefault();
        	var goodsTypeUrl = $('#findgoods .goodsTypeUrl').val(node.id);
        	$('#findgoodstg').tree('select', node.target);
    		$('#findgoodsmm').menu('show', {
    			left: e.pageX,
    			top: e.pageY
    		});
		}
    });
	
	//点击确定添加物品类
	$('#findgoods .addWindow .quedingadd').click(function(){
		var goodsTypeName = $('#findgoods .addWindow .goodsTypeName').val();
		var goodsTypeUrl = $("#findgoods .goodsTypeUrl").val();
		
		if(goodsTypeName == null || goodsTypeName == ""){
			windowControl("请输入新增类名");
		}else{
			$.ajax({
				data:{
					goodsTypeUrl:goodsTypeUrl,
					goodsTypeName:goodsTypeName,
					action:'添加'
				},
				url:"../../treeController/addRepertoryType.do?getMs="+getMS(),
				method:"post",
				success: function(data){
					$('#findgoodstg').tree('reload');
					$('#findgoods .addWindow').css('display','none');
					$('#findgoods .addWindow input[type=text]').val('');
				}
			});
		}
	});
	//点击确定删除物品类
	$('#findgoods .removeWindow .quedingremove').click(function(){
		var goodsTypeUrl = $("#findgoods .goodsTypeUrl").val();
		$.ajax({
			data:{
				goodsTypeUrl:goodsTypeUrl,
				action:'删除'
			},
			url:"../../treeController/removeRepertoryType.do?getMs="+getMS(),
			method:"post",
			success: function(data){
				$('#findgoodstg').tree('reload');
				$('#findgoods .removeWindow').css('display','none');
				$('#findgoods .removeWindow input[type=text]').val('');
			}
		})
	});
	//点击确定修改物品类
	$('#findgoods .editWindow .quedingedit').click(function(){
		var goodsTypeUrl = $("#findgoods .goodsTypeUrl").val();
		var goodsTypeName = $('#findgoods .editWindow .goodsTypeName').val();
		$.ajax({
			data:{
				goodsTypeUrl:goodsTypeUrl,
				goodsTypeName:goodsTypeName,
				action:'修改'
			},
			url:"../../treeController/editRepertoryType.do?getMs="+getMS(),
			method:"post",
			success: function(data){
				$('#findgoodstg').tree('reload');
				$('#findgoods .editWindow').css('display','none');
				$('#findgoods .editWindow input[type=text]').val('');
			}
		})
	});
	
	/************入库操作的供应商*********/
	$('#findgoods .put .chooseProvider').click(function(){
		chooseProvider();
		$('#chooseProvider .confirm').click(function(){
			selectProvider = $('#chooseProvider .popuparea .provider').datagrid('getSelections');
			$('#findgoods .put input[name=providerCode]').val(selectProvider[0].providerCode);
			$('#findgoods .put input[name=providerName]').val(selectProvider[0].providerName);
	    	$('#chooseProvider').css('display','none');
			$('#chooseProvider .confirm').unbind('click');
		});
	});
	/**********新仓位入库的供应商*********/
	$('#findgoods .newInsert .chooseProvider').click(function(){
		chooseProvider();
		$('#chooseProvider .confirm').click(function(){
			selectProvider = $('#chooseProvider .popuparea .provider').datagrid('getSelections');
			$('#findgoods .newInsert input[name=providerCode]').val(selectProvider[0].providerCode);
			$('#findgoods .newInsert input[name=providerName]').val(selectProvider[0].providerName);
	    	$('#chooseProvider').css('display','none');
			$('#chooseProvider .confirm').unbind('click');
		});
	});
	/**********修改物品入库的供应商*********/
	$('#findgoods .update4 .chooseProvider').click(function(){
		chooseProvider();
		$('#chooseProvider .confirm').click(function(){
			selectProvider = $('#chooseProvider .popuparea .provider').datagrid('getSelections');
			$('#findgoods .update4 input[name=providerCode]').val(selectProvider[0].providerCode);
			$('#findgoods .update4 input[name=providerName]').val(selectProvider[0].providerName);
			$('#chooseProvider').css('display','none');
			$('#chooseProvider .confirm').unbind('click');
		});
	});
	//新仓位入库的弹窗的显示
	$('#findgoods .rightarea .newInsertBtn').click(function(){
		var row = $('#findgoodsdg').datagrid('getSelected');
		if(row){
            $('#findgoods .newInsert .popuparea input[name=goodsName]').val(row.goodsName);
        	$('#findgoods .newInsert .popuparea input[name=goodsSize]').val(row.goodsSize);
			$('#findgoods .newInsert').css('display','block');
			$('#findgoods .newInsert input[name=inTime]').val(nowTime());
			$('#findgoods .newInsert input[name=taxRate]').val('17');
			$('#findgoods .newInsert input[name=unit]').val(row.unit);
			getDocumentMaker();
		}else{
			windowControl('并未选择物品，无法新仓位入库');
		}
		
	});
	//计算税后的一系列
	$('#findgoods .newInsert .popuparea input[name=inNumber]').blur(function(){
		calculate($(this));
	});
	$('#findgoods .newInsert .popuparea input[name=pretaxAmount]').blur(function(){
		calculate($(this));
	});
	$('#findgoods .newInsert .popuparea input[name=taxRate]').blur(function(){
		calculate($(this));
	});
	$('#findgoods .newInsert .popuparea input[name=pretaxAverPrice]').blur(function(){
		calculate($(this));
	});
	//新仓位入库的操作
	$('#findgoods .newInsert .confirm').click(function(){
		var row = $('#findgoodsdg').datagrid('getSelected');
		var goodsId = row.goodsId;
		var inTime = $.trim($('#findgoods .newInsert .popuparea input[name=inTime]').val());
		var putUserName = $.trim($('#findgoods .newInsert .popuparea input[name=putUserName]').val());
		var repertoryId = $('#findgoods .newInsert .popuparea .repertoryId option:selected').val();
		var repertoryName = $('#findgoods .newInsert .popuparea .repertoryId option:selected').text();
		var goodsPositionName = $.trim($('#findgoods .newInsert .popuparea input[name=goodsPositionName]').val());
		var inNumber = $.trim($('#findgoods .newInsert .popuparea input[name=inNumber]').val());
		var pretaxAmount = $.trim($('#findgoods .newInsert .popuparea input[name=pretaxAmount]').attr('realyMoney')||$('#findgoods .newInsert .popuparea input[name=pretaxAmount]').val());
		var taxRate = $.trim($('#findgoods .newInsert .popuparea input[name=taxRate]').val());
		var pretaxAverPrice = $.trim($('#findgoods .newInsert .popuparea input[name=pretaxAverPrice]').val());
		//var taxAmount = $.trim($('#findgoods .newInsert .popuparea input[name=taxAmount]').val());
		var taxAverPrice = $.trim($('#findgoods .newInsert .popuparea input[name=taxAverPrice]').val());
		var record = $.trim($('#findgoods .newInsert .popuparea textarea[name=record]').val());
		var batchText = $.trim($('#findgoods .newInsert .popuparea textarea[name=batchText]').val());
		var providerCode = $('#findgoods .newInsert .popuparea input[name=providerCode]').val();
		if(putUserName == null||putUserName == ''){
			windowControl('经办人不能为空');
			return false;
		}else if(goodsPositionName == null||goodsPositionName == ''){
			windowControl('仓位不能为空');
			return false;
		}else if(inNumber == null||inNumber == ''){
			windowControl('入库数量不能为空');
			return false;
		}else if(taxRate == null||taxRate == ''){
			windowControl('税率不能为空');
			return false;
		}/*else if(record == null||record == ''){
			windowControl('入库备注不能为空');
			return false;
		}*/else if(inTime == null||inTime == ''){
			windowControl('入库时间不能为空');
			return false;
		}else if(providerCode == null||providerCode == ''){
			windowControl('供应商不能为空');
			return false;
		}else{
			var taxAmount = pretaxAmount*(1-taxRate/100);
			var info = {
				goodsId:goodsId,
				putUserName:putUserName,
				repertoryId:repertoryId,
				repertoryName:repertoryName,
				goodsPositionName:goodsPositionName,
				inNumber:inNumber||'0',
				inTimeStr:inTime,
				pretaxAmount:pretaxAmount||'0',
				taxRate:taxRate||'0',
				pretaxAverPrice:pretaxAverPrice||'0',
				taxAmount:taxAmount||'0',
				taxAverPrice:taxAverPrice||'0',
				record:record,  
				batchText:batchText,
				providerCode:providerCode
			}
			$.ajax({
				url:'../../repertory/newGoodsPositionPut.do?getMs='+getMS(),
				data:info,
				type:'post',
				success:function(data){
					if(data==500){
						windowControl('服务器异常');
					}else if(data==400){
						windowControl('新仓位入库失败');
					}else{
						windowControl('新仓位入库成功');
						$('#findgoods .newInsert').css('display','none');
						$('#findgoods .newInsert .popuparea input[type=text]').val('');
						$('#findgoods .newInsert .popuparea textarea').val('');
						$('#findgoodsdg').datagrid('reload');
						$('#findgoods .rightarea .temporary').datagrid('reload');
						$('#findgoods .cangwei-list').datagrid('reload');
						$('#findgoods .inout-stream').datagrid('reload');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	});
	//计算税率
	$('#findgoods .put .popuparea input[name=inNumber]').blur(function(){
		calculate($(this));
	});
	$('#findgoods .put .popuparea input[name=pretaxAmount]').blur(function(){
		calculate($(this));
	});
	$('#findgoods .put .popuparea input[name=taxRate]').blur(function(){
		calculate($(this));
	});
	$('#findgoods .put .popuparea input[name=pretaxAverPrice]').blur(function(){
		calculate($(this));
	});
	//入库操作
	$('#findgoods .put .confirm').click(function(){
		var row = $('#findgoodsdg').datagrid('getSelected');
		var row1 = $('#findgoods .cangwei-list').datagrid('getSelected');
		var goodsId = row.goodsId;
		var goodsPositionId = row1.goodsPositionId;
		var inTime = $.trim($('#findgoods .put .popuparea input[name=inTime]').val());
		var putUserName = $.trim($('#findgoods .put .popuparea input[name=putUserName]').val());
		var repertoryId = $('#findgoods .put .popuparea .repertoryId option:selected').val();
		var repertoryName = $('#findgoods .put .popuparea .repertoryId option:selected').text();
		var goodsPositionName = $.trim($('#findgoods .put .popuparea input[name=goodsPositionName]').val());
		var inNumber = $.trim($('#findgoods .put .popuparea input[name=inNumber]').val());
		var pretaxAmount = $.trim($('#findgoods .put .popuparea input[name=pretaxAmount]').attr('realyMoney')||$('#findgoods .put .popuparea input[name=pretaxAmount]').val());
		var taxRate = $.trim($('#findgoods .put .popuparea input[name=taxRate]').val());
		var pretaxAverPrice = $.trim($('#findgoods .put .popuparea input[name=pretaxAverPrice]').val());
		//var taxAmount = $.trim($('#findgoods .put .popuparea input[name=taxAmount]').val());
		var taxAverPrice = $.trim($('#findgoods .put .popuparea input[name=taxAverPrice]').val());
		var record = $.trim($('#findgoods .put .popuparea textarea[name=record]').val());
		var batchText = $.trim($('#findgoods .put .popuparea textarea[name=batchText]').val());
		var providerCode = $('#findgoods .put .popuparea input[name=providerCode]').val();
		if(putUserName == null||putUserName == ''){
			windowControl('经办人不能为空');
			return false;
		}else if(goodsPositionName == null||goodsPositionName == ''){
			windowControl('仓位不能为空');
			return false;
		}else if(inNumber == null||inNumber == ''){
			windowControl('入库数量不能为空');
			return false;
		}else if(taxRate == null||taxRate == ''){
			windowControl('税率不能为空');
			return false;
		}/*else if(record == null||record == ''){
			windowControl('入库备注不能为空');
			return false;
		}*/else if(inTime == null||inTime == ''){
			windowControl('入库时间不能为空');
			return false;
		}else if(providerCode == null||providerCode == ''){
			windowControl('供应商不能为空');
			return false;
		}else{
			var taxAmount = pretaxAmount*(1-taxRate/100);
			var info = {
				goodsId:goodsId,
				putUserName:putUserName,
				repertoryId:repertoryId,
				repertoryName:repertoryName,
				goodsPositionName:goodsPositionName,
				goodsPositionId:goodsPositionId,
				inNumber:inNumber||'0',
				inTimeStr:inTime,
				pretaxAmount:pretaxAmount||'0',
				taxRate:taxRate||'0',
				pretaxAverPrice:pretaxAverPrice||'0',
				taxAmount:taxAmount||'0',
				taxAverPrice:taxAverPrice||'0',
				record:record,
				batchText:batchText,
				providerCode:providerCode,
			}
			$.ajax({
				url:'../../repertory/putInStorageRecord.do?getMs='+getMS(),
				data:info,
				type:'post',
				success:function(data){
					if(data==500){
						windowControl('服务器异常');
					}else if(data==400){
						windowControl('物品入库失败');
					}else{
						windowControl('物品入库成功');
						$('#findgoods .put').css('display','none');
						$('#findgoods .put .popuparea input').val('');
						$('#findgoods .put .popuparea .chooseProvider').val('选择');
						$('#findgoods .put .popuparea textarea').val('');
						$('#findgoodsdg').datagrid('reload');
						$('#findgoods .rightarea .temporary').datagrid('reload');
						$('#findgoods .cangwei-list').datagrid('reload');
						$('#findgoods .inout-stream').datagrid('reload');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	});
	//计算领用金额
	$('#findgoods .get .popuparea input[name=outNumber]').blur(function(){
		var val = $(this).val();
		var row = $('#findgoodsdg').datagrid('getSelected');
		var movingAverPrice = row.movingAverPrice;
		$('#findgoods .get .popuparea input[name=taxAmount]').val(val*movingAverPrice);
	});
	//出库
	$('#findgoods .get .confirm').click(function(){
		var row = $('#findgoodsdg').datagrid('getSelected');
		var row1 = $('#findgoods .cangwei-list').datagrid('getSelected');
		var repertoryName = row1.repertoryName;
		var repertoryId = row1.repertoryId;
		var goodsId = row.goodsId;
		var goodsPositionId = row1.goodsPositionId;
		var goodsPositionName = row1.goodsPositionName;
		var outTime = $.trim($('#findgoods .get .popuparea input[name=outTime]').val());
		var outNumber = $.trim($('#findgoods .get .popuparea input[name=outNumber]').val());
		var getDepartmentId = $('#findgoods .get .popuparea .getDepartmentName option:selected').val();
		var getDepartmentName = $('#findgoods .get .popuparea .getDepartmentName option:selected').text();
		var getUserName = $.trim($('#findgoods .get .popuparea input[name=getUserName]').val());
		var taxAmount = $.trim($('#findgoods .get .popuparea input[name=taxAmount]').val());
		var useType = $('#findgoods .get .popuparea .useType option:selected').val();
		var record = $.trim($('#findgoods .get .popuparea textarea[name=record]').val());
		var batchText = $.trim($('#findgoods .get .popuparea textarea[name=batchText]').val());
		if(outNumber == null||outNumber == ''){
			windowControl('出库数量不能为空');
			return false;
		}else if(getUserName == null||getUserName == ''){
			windowControl('领取人不能为空');
			return false;
		}/*else if(record == null||record == ''){
			windowControl('出库备注不能为空');
			return false;
		}*/else if(outTime == null||outTime == ''){
			windowControl('出库时间不能为空');
			return false;
		}else{
			var info = {
				goodsId:goodsId,
				outNumber:outNumber||'0',
				outTimeStr:outTime,
				repertoryId:repertoryId,
				repertoryName:repertoryName,
				getDepartmentId:getDepartmentId,
				getDepartmentName:getDepartmentName,
				goodsPositionName:goodsPositionName,
				goodsPositionId:goodsPositionId,
				getUserName:getUserName,
				taxAmount:taxAmount||'0',
				useType:useType,
				record:record,
				batchText:batchText
			}
			$.ajax({
				url:'../../repertory/putOutStorageRecord.do?getMs='+getMS(),
				data:info,
				type:'post',
				success:function(data){
					if(data==500){
						windowControl('服务器异常');
						
					}else if(data==400){
						windowControl('物品出库失败');
					}else{
						windowControl('物品出库成功');
						$('#findgoods .get').css('display','none');
						$('#findgoods .get .popuparea input').val('');
						$('#findgoods .get .popuparea textarea').val('');
						$('#findgoodsdg').datagrid('reload');
						$('#findgoods .rightarea .temporary').datagrid('reload');
						$('#findgoods .cangwei-list').datagrid('reload');
						$('#findgoods .inout-stream').datagrid('reload');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	});
	//移库
	$('#findgoods .move .confirm').click(function(){
		var row = $('#findgoodsdg').datagrid('getSelected');
		var row1 = $('#findgoods .cangwei-list').datagrid('getSelected');
		var goodsId = row.goodsId;
		var goodsPositionId = row1.goodsPositionId;
		var goodsPositionName = row1.goodsPositionName;
		var repertoryId = row1.repertoryId;
		var repertoryName = row1.repertoryName;
		var inTime = $.trim($('#findgoods .move .popuparea input[name=inTime]').val());
		var putUserName = $.trim($('#findgoods .move .popuparea input[name=putUserName]').val());
		var newRepertoryId = $('#findgoods .move .popuparea .repertoryName option:selected').val();
		var newRepertoryName = $('#findgoods .move .popuparea .repertoryName option:selected').text();
		var newGoodsPositionName = $.trim($('#findgoods .move .popuparea input[name=newGoodsPositionName]').val());
		var record = $.trim($('#findgoods .move .popuparea .record').val());
		var moveNumber = $.trim($('#findgoods .move .popuparea input[name=moveNumber]').val());
		if(putUserName == null||putUserName == ''){
			windowControl('移库人不能为空');
			return false;
		}else if(newGoodsPositionName == null||newGoodsPositionName == ''){
			windowControl('新仓位不能为空');
			return false;
		}/*else if(record == null||record == ''){
			windowControl('备注不能为空');
			return false;
		}*/else if(moveNumber == null||moveNumber == ''){
			windowControl('移动数量不能为空');
			return false;
		}else if(inTime == null||inTime == ''){
			windowControl('移库时间不能为空');
			return false;
		}else{
			var info = {
					goodsId:goodsId,
					putUserName:putUserName,
					goodsPositionId:goodsPositionId,
					moveNumber:moveNumber,
					repertoryId:repertoryId,
					repertoryName:repertoryName,
					newRepertoryId:newRepertoryId,
					newRepertoryName:newRepertoryName,
					newGoodsPositionName:newGoodsPositionName,
					inTimeStr:inTime,
					outTimeStr:inTime,
					record:record,
				}
				$.ajax({
					url:'../../repertory/moveGoodsRepertoryByOutIn.do?getMs='+getMS(),
					data:info,
					type:'post',
					success:function(data){
						if(data==500){
							windowControl('服务器异常');
						}else if(data==400){
							windowControl('物品移库失败');
						}else{
							windowControl('物品移库成功');
							$('#findgoods .move').css('display','none');
							$('#findgoods .move .popuparea input').val('');
							$('#findgoods .move .popuparea textarea').val('');
							$('#findgoodsdg').datagrid('reload');
							$('#findgoods .rightarea .temporary').datagrid('reload');
							$('#findgoods .cangwei-list').datagrid('reload');
							$('#findgoods .inout-stream').datagrid('reload');
						}
					},
					error:function(err){
						windowControl('网络异常');
					}
				});
		}
	});
	//修改入库明细
	$('#findgoods .update4 .confirm').click(function(){
		var inRecordId = $('#findgoods .update4 input[name=putUserName]').attr('inRecordId');
		var putUserName = $.trim($('#findgoods .update4 input[name=putUserName]').val());
		var totalNumber = $.trim($('#findgoods .update4 input[name=totalNumber]').val());
		var inNumber = $.trim($('#findgoods .update4 input[name=inNumber]').val());
		var pretaxAmount = $.trim($('#findgoods .update4 input[name=pretaxAmount]').val());
		var taxRate = $.trim($('#findgoods .update4 input[name=taxRate]').val());
		var pretaxAverPrice = $.trim($('#findgoods .update4 input[name=pretaxAverPrice]').val());
		var taxAmount = $.trim($('#findgoods .update4 input[name=taxAmount]').val());
		var taxAverPrice = $.trim($('#findgoods .update4 input[name=taxAverPrice]').val());
		var repertoryName = $.trim($('#findgoods .update4 input[name=repertoryName]').val());
		var record = $.trim($('#findgoods .update4 textarea[name=record]').val());
		var supplier = $.trim($('#findgoods .update4 .supplier').val());
		var goodsId = $.trim($('#findgoods .update4 .goodsId').val());
		var goodsPositionId = $.trim($('#findgoods .update4 .goodsPositionId').val());
		//var provider = $('#findgoods .put .popuparea .supplier option:selected').val();
		var provider = $('#findgoods .update4 input[name=providerCode]').val();
		if(putUserName == ''||putUserName == null){
			windowControl('入库人不能为空');
			return false;
		}else if(inNumber == ''||inNumber == null){
			windowControl('入库数量不能为空');
			return false;
		}else if(pretaxAmount == ''||pretaxAmount == null){
			windowControl('入库总额(含税)不能为空');
			return false;
		}else if(taxRate == ''||taxRate == null){
			windowControl('税率不能为空');
			return false;
		}/*else if(supplier == ''||supplier == null){
			windowControl('供应商不能为空');
			return false;
		}else if(record == ''||record == null){
			windowControl('入库备注不能为空');
			return false;
		}*/else{
			var info ={
					inRecordId:inRecordId,
					putUserName:putUserName,
					inNumber:inNumber,
					goodsId:goodsId,
					goodsPositionId:goodsPositionId,
					pretaxAmount:pretaxAmount,
					taxRate:taxRate,
					pretaxAverPrice:pretaxAverPrice,
					taxAmount:taxAmount,
					repertoryName:repertoryName,
					record:record,
					providerCode:provider,
				}
			$.ajax({
				data:info,
				url:'../../repertory/editGoodsInRecord.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data==500){
						windowControl('服务器异常');
					}else if(data==400){
						windowControl('修改出库明细失败');
					}else{
						windowControl('修改出库明细成功');
						$('#findgoods .popups .update4').css('display','none');
						$('#findgoods .popups .update4 .popuparea input').val('');
						$('#findgoods .popups .update4 .popuparea .chooseProvider').val('选择');
						$('#findgoods .popups .update4 .popuparea textarea').val('');
						$('#findgoodsdg').datagrid('reload');
						$('#findgoods .rightarea .temporary').datagrid('reload');
						$('#findgoods .cangwei-list').datagrid('reload');
						$('#findgoods .inout-stream').datagrid('reload');
					}
				},
				error:function(err){
					windowControl(err.status);
				}
			});
		}
	});
	//修改出库明细
	$('#findgoods .update3 .confirm').click(function(){
		var outRecordId = $('#findgoods .update3 .repertoryName').attr('outRecordId');
		var repertoryName = $.trim($('#findgoods .update3 .repertoryName').val());
		var repertoryId = $('#findgoods .update3 .repertoryName').attr('repertoryId');
		var goodsPositionId = $('#findgoods .update3 .goodsPositionName').attr('goodsPositionId');
		var goodsPositionName = $.trim($('#findgoods .update3 .goodsPositionName').val());
		var getUserName = $.trim($('#findgoods .update3 .getUserName').val());
		var getDepartmentName = $('#findgoods .update3 .getDepartmentName option:selected').text();
		var getDepartmentId = $('#findgoods .update3 .getDepartmentName option:selected').val();
		var outNumber = $.trim($('#findgoods .update3 .outNumber').val());
		var taxAmount = $.trim($('#findgoods .update3 .taxAmount').val());
		var useType = $.trim($('#findgoods .update3 .useType option:selected').val());
		var record = $.trim($('#findgoods .update3 .record').val());
		var goodsId = $.trim($('#findgoods .update3 .goodsId').val());
		if(getUserName == null||getUserName == ''){
			windowControl('领取人不能为空');
			return false;
		}else if(outNumber == null||outNumber == ''){
			windowControl('领取数量不能为空');
			return false;
		}/*else if(useType == null||useType == ''){
			windowControl('领取用途不能为空');
			return false;
		}else if(record == null||record == ''){
			windowControl('备注不能为空');
			return false;
		}*/else{
			var info = {
				outRecordId:outRecordId,
				outNumber:outNumber,
				goodsId:goodsId,
				repertoryId:repertoryId,
				repertoryName:repertoryName,
				getDepartmentId:getDepartmentId,
				getDepartmentName:getDepartmentName,
				goodsPositionName:goodsPositionName,
				goodsPositionId:goodsPositionId,
				getUserName:getUserName,
				taxAmount:taxAmount,
				useType:useType,
				record:record,
			}
			$.ajax({
				data:info,
				url:'../../repertory/editGoodsOutRecord.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data==500){
						windowControl('服务器异常');
						
					}else if(data==400){
						windowControl('修改出库失败');
					}else{
						windowControl('修改出库成功');
						$('#findgoods .popups .update3').css('display','none');
						$('#findgoods .popups .update3 .popuparea input').val('');
						$('#findgoods .popups .update3 .popuparea textarea').val('');
						$('#findgoodsdg').datagrid("reload");
						$('#findgoods .rightarea .temporary').datagrid('reload');
						$('#findgoods .cangwei-list').datagrid('reload');
						$('#findgoods .inout-stream').datagrid('reload');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	});
	//显示隐藏汇总bar
	var controlFlag = true;
	$('#findgoods .controlSumBar').click(function(){
		if($(this).val() == '隐藏' && controlFlag){
			controlFlag = false;
			$('#findgoods .sumBar').animate({
				'bottom':'-=30px',
				'opacity':0,
			},500,function(){
				controlFlag = true;
				$('#findgoods .sumBar').css('display','none');
				$('#findgoods .controlSumBar').val('显示');
			});
		}else if($(this).val() == '显示' && controlFlag){
			controlFlag = false;
			$('#findgoods .sumBar').css('display','block');
			$('#findgoods .sumBar').animate({
				'bottom':'+=30px',
				'opacity':1,
			},500,function(){
				controlFlag = true;
				$('#findgoods .controlSumBar').val('隐藏');
			});
		}
	});
	
	//cento
	/*****************设置上下移span的title****************/
	$("#findgoods .popups .writetoexcel .upset").attr("title","上移");
	$("#findgoods .popups .writetoexcel .downset").attr("title","下移");
	
	/*****************导出到Excel点击弹窗******************/
	$("#findgoods .toolbar .write").click(function(){
		$('#findgoods .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#findgoods .popups .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'goodsName',tableHeader:'物品名',date:false},
			         {propertyName:'goodsSize',tableHeader:'规格',date:false},
			         {propertyName:'totalNumber',propertyType:'Integer',tableHeader:'数量',date:false},
			         {propertyName:'unit',tableHeader:'单位',date:false},
			         {propertyName:'warnNumber',propertyType:'Integer',tableHeader:'警示数量',date:false},
			         {propertyName:'latestUnitPrice',propertyType:'Double',tableHeader:'最新价格（元）',date:false},
			         {propertyName:'movingAverPrice',propertyType:'Double',tableHeader:'移动平均价（元）',date:false},
			         {propertyName:'updateTimeStr',tableHeader:'更新日期',date:true},
			         {propertyName:'isLack',tableHeader:'是否缺货',date:false},
			         {propertyName:'record',tableHeader:'备注',date:false}
				 ]
		})
	})
	
	/*******************重置按钮点击事件***********************/
	$("#findgoods .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#findgoods .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#findgoods .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#findgoods .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#findgoods .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#findgoods .popups .writetoexcel"));
		
		var findGoodsExcel2 = [];
		for(var i = 0 ; i < findGoodsExcel.length ; i++){
			findGoodsExcel2.push(findGoodsExcel[i]);
		}
		findGoodsExcel2.push({
			name:'jsonString',value:jsonString
		})
		//提交导出excel所需要的参数
		excelplugin.submit({
			type:'post',
			array:findGoodsExcel2,
			action:'../../repertory/writeGoodsToExcel.do?'
		})
	});
});
/*$('#findgoods .put .supplier').html(getDataBySelectKeyNo("provider"));*/
/*------------------------------*/
$('#findgoods .get .useType').html(getDataBySelectKeyNo("use_type"));
$('#findgoods .update3 .useType').html(getDataBySelectKeyNo("use_type"));
/*$('#findgoods .put .supplier').html(getDataBySelectKeyNo("provider"));*/
$('#findgoods .newInsert .supplier').html(getDataBySelectKeyNo("provider"));
$('#findgoods .update4 .supplier').html(getDataBySelectKeyNo("provider"));
/*************************下拉框选择仓库信息********************************/
$.ajax({
	url:'../../repertory/selectRepertoryType.do?getMs='+getMS(),
	type:'post',
	success:function(data){
		var str = "<option  value=''></option>";
		var str1 = '';
		var data = eval('(' + data + ')'); 
		for(var i=0;i<data.length;i++){
			str += "<option value=" + data[i].repertoryId + ">" + data[i].repertoryName + "</option>";  
			str1 += "<option value=" + data[i].repertoryId + ">" + data[i].repertoryName + "</option>";
		}
	    $('#findgoods .listForm .repertoryName').html(str);
	    $('#findgoods .put .repertoryId').html(str1);
	    //$('#findgoods .get .repertoryName').html(str1);
	    $('#findgoods .move .repertoryName').html(str1);
	    $('#findgoods .newInsert .repertoryId').html(str1);
	    $('#findgoods .update4 .repertoryName').html(str1);
	},
	error:function(error){
		windowControl(error.status);
	}
});
/*加载部门*/
//$('#findgoods .get .getDepartmentName').html(getDataBySelectKeyNo("repertoryDepartment"));
//$('#findgoods .update3 .getDepartmentName').html(getDataBySelectKeyNo("repertoryDepartment"));
$.ajax({
	data:{},
	url:'../../repertory/selectGetDepartment.do?getMs='+getMS(),
	type:'post',
	success:function(data){
		data = $.parseJSON(data).rows;
		var str = '<option></option>';
		for(var i = 0;i<data.length;i++){
			str +='<option value="'+data[i].departmentId+'">'+data[i].departmentName+'</option>'
		}
		$('#findgoods .get .getDepartmentName').html(str);
	    $('#findgoods .update3 .getDepartmentName').html(str);
	},
	error:function(err){
		windowControl(err.status);
	}
});
/*************************制单人********************************/
function getDocumentMaker(){
	$.ajax({
		url:'../../user/getUserInfo.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var str = '';
			var data = eval('(' + data + ')'); 
			$('#findgoods .put input[name=peopleName]').val(data.userName);
			$('#findgoods .get input[name=peopleName]').val(data.userName);
			$('#findgoods .move input[name=peopleName]').val(data.userName);
			$('#findgoods .newInsert input[name=peopleName]').val(data.userName);
		},
		error:function(error){
			windowControl(error.status);
		}
	});
}
getDocumentMaker();
/*---------------------------------tree函数-----------------------------------*/
function add(){
	$('#findgoods .addWindow').css('display','block');
}
function remove(){
	$('#findgoods .removeWindow').css('display','block');
}
function edit(){
	$('#findgoods .editWindow').css('display','block');
}
/*-------------操作函数--------*/
/*修改物品表函数*/
function findgoodsupDate(id){
	$('#findgoods .update').css('display','block');
	$.ajax({
		data:{},
		url:'../../repertory/selectGoodsByTime.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var data = $.parseJSON(data).rows; 
			for(var i=0;i<data.length;i++){
				if(data[i].goodsId == id){
					$('#findgoods .update .goodsName').attr('goodsId',id);
					$('#findgoods .update .goodsName').val(data[i].goodsName);
					$('#findgoods .update .goodsSize').val(data[i].goodsSize);
					$('#findgoods .update .unit').val(data[i].unit);
					$('#findgoods .update .warnNumber').val(data[i].warnNumber);
					$('#findgoods .update .record').val(data[i].record);
				}
			}
		},
		error:function(err){
			windowControl(err.status);
		}
	});
}
/*删除物品表函数*/
function findgoodsDel(id,goodsName){
	ui.confirm('确定要删除'+goodsName+'该物品么？',function(z){
		if(z){
			$.ajax({
				data:{goodsId:id},
				url:'../../repertory/deleteGoods.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == 200){
						windowControl('删除物品成功');
						$('#findgoodsdg').datagrid('reload');
					}else if(data == 400){
						windowControl('删除物品失败');
					}else{
						windowControl('服务器异常');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	},false);
}
/*修改入库明细*/
function inStreamPut(id){
	$.ajax({
		data:{inRecordId:id},
		url:'../../repertory/selectGoodsInRecord.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var data = $.parseJSON(data);
			for(var i=0;i<data.rows.length;i++){
				if(data.rows[i].inRecordId == id){
					$('#findgoods .update4 input[name=putUserName]').attr('inRecordId',id);
					$('#findgoods .update4 input[name=putUserName]').val(data.rows[i].putUserName);
					$('#findgoods .update4 input[name=providerCode]').val(data.rows[i].providerCode);
					$('#findgoods .update4 input[name=providerName]').val(data.rows[i].providerName);
					$('#findgoods .update4 input[name=totalNumber]').val(data.rows[i].totalNumber);
					$('#findgoods .update4 input[name=repertoryName]').val(data.rows[i].repertoryName);
					$('#findgoods .update4 input[name=inNumber]').val(data.rows[i].inNumber);
					$('#findgoods .update4 .goodsId').val(data.rows[i].goodsId);
					$('#findgoods .update4 .goodsPositionId').val(data.rows[i].goodsPositionId);
					$('#findgoods .update4 input[name=pretaxAmount]').val(data.rows[i].pretaxAmount);
					$('#findgoods .update4 input[name=taxRate]').val(data.rows[i].taxRate);
					$('#findgoods .update4 input[name=goodsPositionName]').attr('goodsPositionId',data.rows[i].goodsPositionId);
					$('#findgoods .update4 input[name=goodsPositionName]').val(data.rows[i].goodsPositionName);
					$('#findgoods .update4 input[name=pretaxAverPrice]').val(data.rows[i].pretaxAverPrice);
					$('#findgoods .update4 input[name=taxAmount]').val(data.rows[i].taxAmount);
					$('#findgoods .update4 input[name=taxAverPrice]').val(data.rows[i].taxAverPrice);
					$('#findgoods .update4 input[name=repertoryName]').val(data.rows[i].repertoryName);
					$('#findgoods .update4 input[name=record]').val(data.rows[i].record);
					calculate($('#findgoods .update4 input[pretaxAverPrice]'));
					var row = $('#findgoodsdg').datagrid('getSelected');
					$('#findgoods .update4 .popuparea input[name=goodsSize]').val(row.goodsSize);
					$('#findgoods .update4 .popuparea input[name=goodsName]').val(row.goodsName);
					$('#findgoods .update4 .popuparea input[name=unit]').val(row.unit);
					$('#findgoods .update4').css('display','block');
				}
			}
		},
		error:function(err){
			windowControl(err.status);
		}
	});	
}
/*删除入库明细*/
function inStreamDel(id){
	ui.confirm('确定要删除这条入库记录么？',function(z){
		if(z){
			$.ajax({
				data:{json:[{inRecordId:id}]},
				url:'../../repertory/deleteGoodsInRecord.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == 200){
						windowControl('删除入库记录成功');
					}else if(data == 400){
						windowControl('删除入库记录失败');
					}else{
						windowControl('服务器异常');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	},false);
}
/*修改出库明细*/
function outStreamPut(id){
	$.ajax({
		data:{outRecordId:id},
		url:'../../repertory/selectGoodsOutRecord.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var data = $.parseJSON(data);
			for(var i=0;i<data.rows.length;i++){
				if(data.rows[i].outRecordId == id){
					//console.log(data.rows[i].repertoryName);
					$('#findgoods .update3 .repertoryName').attr('outRecordId',id);
					$('#findgoods .update3 .repertoryName').val(data.rows[i].repertoryName);
					$('#findgoods .update3 .getDepartmentName').val(data.rows[i].getDepartmentId);
					$('#findgoods .update3 .useType').val(data.rows[i].useType);
					$('#findgoods .update3 .goodsPositionName').attr('goodsPositionId',data.rows[i].goodsPositionId);
					$('#findgoods .update3 .goodsPositionName').val(data.rows[i].goodsPositionName);
					$('#findgoods .update3 .getUserName').val(data.rows[i].getUserName);
					$('#findgoods .update3 .outNumber').val(data.rows[i].outNumber);
					$('#findgoods .update3 .goodsId').val(data.rows[i].goodsId);
					$('#findgoods .update3 .taxAmount').val(data.rows[i].taxAmount);
					$('#findgoods .update3 .taxRate').val(data.rows[i].taxRate);
					$('#findgoods .update3 .record').val(data.rows[i].record);
					var row = $('#findgoodsdg').datagrid('getSelected');
					$('#findgoods .update3 .popuparea input[name=goodsSize]').val(row.goodsSize);
					$('#findgoods .update3 .popuparea input[name=goodsName]').val(row.goodsName);
					$('#findgoods .update3 .popuparea input[name=unit]').val(row.unit);
					$('#findgoods .update3').css('display','block');
					var department = $('#repertoryout .update3 .getDepartmentName');
					var name = data.rows[i].getDepartmentName;
					if(data.rows[i].getDepartmentName){
						for(var i=0;i < department.find('option').length;i++){
							if(department.find('option').eq(i).text() == name){
								department.find('option').eq(i).attr('selected','true');
								return false;
							}
						}
						return false;
					}
					return false;
				}
			}
		},
		error:function(err){
			windowControl(err.status);
		}
	});	
	
}
/*删除出库明细*/
function outStreamDel(id){
	ui.confirm('确定要删除这条出库明细记录么？',function(z){
		if(z){
			$.ajax({
				data:{json:[{outRecordId:id}]},
				url:'../../repertory/deleteGoodsOutRecord.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == 200){
						windowControl('删除出库记录成功');
					}else if(data == 400){
						windowControl('删除出库记录失败');
					}else{
						windowControl('服务器异常');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	},false);
}
/*仓位入库*/
function putPosition(name,rName){
	$('#findgoods .put').css('display','block');
	$('#findgoods .put .popuparea input[name=goodsPositionName]').val(name);
	$('#findgoods .put .popuparea input[name=repertoryName]').val(rName);
	$('#findgoods .put .popuparea input[name=inTime]').val(nowTime());
	$('#findgoods .put .popuparea input[name=taxRate]').val('17');
	var row = $('#findgoodsdg').datagrid('getSelected');
	$('#findgoods .put .popuparea input[name=unit]').val(row.unit);
	getDocumentMaker();
}
/*仓位出库*/
function getPosition(name,rName){
	$('#findgoods .get').css('display','block');
	$('#findgoods .get .popuparea input[name=goodsPositionName]').val(name);
	$('#findgoods .get .popuparea input[name=repertoryName]').val(rName);
	$('#findgoods .get .popuparea input[name=outTime]').val(nowTime());
	var row = $('#findgoodsdg').datagrid('getSelected');
	var movingAverPrice = row.movingAverPrice;
	$('#findgoods .get .popuparea input[name=movingAverPrice]').val(movingAverPrice);
	$('#findgoods .get .popuparea input[name=unit]').val(row.unit);
	getDocumentMaker();
}
/*仓位移库*/
function movePosition(name,num,repertoryName){
	$('#findgoods .move').css('display','block');
	$('#findgoods .move .popuparea input[name=goodsPositionName]').val(name);
	$('#findgoods .move .popuparea input[name=totalNumber]').val(num);
	$('#findgoods .move .popuparea input[name=repertoryName]').val(repertoryName);
	$('#findgoods .move .popuparea input[name=inTime]').val(nowTime());
	var row = $('#findgoodsdg').datagrid('getSelected');
	$('#findgoods .move .popuparea input[name=unit]').val(row.unit);
	getDocumentMaker();
}
//计算
function calculate(ele){
	var dom = ele.parents('table');
	var inNumber = $.trim(dom.find('input[name=inNumber]').val());
	var pretaxAmount = $.trim(dom.find('input[name=pretaxAmount]').val());
	var taxRate = $.trim(dom.find('input[name=taxRate]').val());
	dom.find('input[name=pretaxAmount]').attr('realyMoney',pretaxAmount);
	if((pretaxAmount != ''&&pretaxAmount != null)&&(taxRate != ''&&taxRate != null)&&(inNumber!=''&&inNumber!=null)){
		dom.find('input[name=taxAverPrice]').val(((pretaxAmount/inNumber)*(1-taxRate/100)).toFixed(8));
	}
	if(ele.attr('name')!='pretaxAverPrice'){
		if((pretaxAmount != ''&&pretaxAmount != null)&&(inNumber!=''&&inNumber!=null)){
			dom.find('input[name=pretaxAverPrice]').val((pretaxAmount/inNumber).toFixed(8));
		}
		var pretaxAverPrice = $.trim(dom.find('input[name=pretaxAverPrice]').val());
		if((pretaxAmount != ''&&pretaxAmount != null)&&(pretaxAverPrice !=''&&pretaxAverPrice !=null)&&(!inNumber)){
			dom.find('input[name=inNumber]').val((pretaxAmount/pretaxAverPrice).toFixed(2))
		}
	}
	if(taxRate != ''&&taxRate != null){
		dom.find('input[name=taxAmount]').val((pretaxAmount*(taxRate/100)).toFixed(2));
	}
	if((ele.attr('name')=='pretaxAverPrice')||(ele.attr('name')=='inNumber')){
		var pretaxAverPrice = $.trim(dom.find('input[name=pretaxAverPrice]').val());
		if((pretaxAverPrice !=''&&pretaxAverPrice !=null)&&(inNumber!=''&&inNumber!=null)){
			dom.find('input[name=pretaxAmount]').val((pretaxAverPrice*inNumber).toFixed(2));
			dom.find('input[name=pretaxAmount]').attr('realyMoney',(pretaxAverPrice*inNumber));
		}
		if((pretaxAverPrice !=''&&pretaxAverPrice !=null)&&(taxRate !=''&&taxRate != null)){
			dom.find('input[name=taxAverPrice]').val((pretaxAverPrice*(1-taxRate/100)).toFixed(8));
		}
		if((pretaxAmount != ''&&pretaxAmount != null)&&(pretaxAverPrice !=''&&pretaxAverPrice !=null)&&(!inNumber)){
			dom.find('input[name=inNumber]').val((pretaxAmount/pretaxAverPrice).toFixed(2))
		}
		if((pretaxAverPrice !=''&&pretaxAverPrice !=null)&&(taxRate != ''&&taxRate != null)&&(inNumber!=''&&inNumber!=null)){
			dom.find('input[name=taxAmount]').val((pretaxAverPrice*inNumber*(taxRate/100)).toFixed(2));
			dom.find('input[name=taxAverPrice]').val((pretaxAverPrice*(1-taxRate/100)).toFixed(8));
		}
	}
}
/********************************修改入库记录的时候的计算************************/
$('#findgoods .update4 input[name=pretaxAmount]').blur(function(){
	calculate($(this));
});
$('#findgoods .update4 input[name=taxRate]').blur(function(){
	calculate($(this));
});
$('#findgoods .update4 input[name=inNumber]').blur(function(){
	calculate($(this));
});
$('#findgoods .update4 input[name=pretaxAverPrice]').blur(function(){
	calculate($(this));
});
//计算时间
function nowTime(){
	var cento = new Date();
	var y = cento.getFullYear(); //获取完整的年份(4位,2014) 
	var m = cento.getMonth()+1; //获取当前月份(0-11,0代表1月) 
	var d = cento.getDate();
	var h = cento.getHours();       //获取当前小时数(0-23)
	var mm = cento.getMinutes();     //获取当前分钟数(0-59)
	var s = cento.getSeconds();  
	if(m<10){
		m = '0'+m;
	}
	if(d<10){
		d = '0'+d;
	}
	if(h < 10){
		h = '0'+h;
	}
	if(mm < 10){
		mm = '0'+mm;
	}
	if(s < 10){
		s = '0'+s;
	}
	return y+'-'+m+'-'+'-'+d+' '+h+':'+mm+':'+s;
}
/*----------汇总-----------------*/
function addsumBar(id,data){
	$('#'+id).find('.sumBar').css({
		'width':$('#'+id).find('.toolbar').width()+6+'px',
	});
	$('#'+id).find('.controlSumBar').css({
		'right':'302px',
	});
	var node = $('#findgoodstg').tree('getSelected');
	var str = '<table><tr>';
	data = $.parseJSON(data);
	if(data && node){
		str +='<td style="font-weight:800;">物品类别：</td>';
		str +='<td style="">'+node.text+'</td>';
		str +='<td style="font-weight:800;">总数量：</td>';
		str +='<td style="">'+data.totalNumber+'</td>';
		str += '</tr></table>';
	}else{
		str = '';
	}
	$('#'+id).find('.sumBar').html(str);
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
    var inputArryTk= $(".popuparea input[disabled!='disabled'][type!='button'][readonly!='readonly'][name!='providerCode'],textarea");
    for(var i =0 ;i<=inputArryTk.length-1;i++){  
    	inputArryTk[i].index = i;  
    	inputArryTk[i].onkeydown=function  (e){   
            //e = e ? e : window.event;     //可写可不写  
        	obj=e.srcElement?e.srcElement:e.target;
        	if(e.keyCode==13 && obj.type!= 'button'){
        		inputArryTk[this.index+1].focus();  
        		if(this.index==i){
            		alert(1)
            		inputArryTk[inputArryTk.length-1].onkeydown=function(e){
            			$(".popuparea textarea").focus()
            		}
            	}
            }  
        	
        }  
    	
    } 
    console.log(inputArryTk)
}
goNextInput()
