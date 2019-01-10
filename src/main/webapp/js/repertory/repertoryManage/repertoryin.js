var repertoryinExcel = [];
$(function(){
	/*设置页面高100%*/
	$('#repertoryin').css('height',$('#loadarea').height()-31+'px');
	/*设置list的宽度*/
	$('#repertoryin .listForm').css('width',$('#loadarea').width()-202+'px');
	$('#repertoryin .materialsForm').css('width',$('#loadarea').width()-202+'px');
	/*设置表格的高度*/
	$('#repertoryindg').css('height',$('#repertoryin .listForm').height()-31+'px');
	$('#inMaterialsForm').css({
		'height':$('#repertoryin .listForm').height()-31+'px',
		'width':$('#loadarea').width()-202+'px'
	});
	/**********供应商*********/
	$('#repertoryin .queryForm .chooseProvider').click(function(){
		chooseProvider();
		$('#chooseProvider .confirm').click(function(){
			selectProvider = $('#chooseProvider .popuparea .provider').datagrid('getSelections');
			$('#repertoryin .queryForm input[name=providerCode]').val(selectProvider[0].providerCode);
			$('#repertoryin .queryForm input[name=providerName]').val(selectProvider[0].providerName);
	    	$('#chooseProvider').css('display','none');
			$('#chooseProvider .confirm').unbind('click');
		});
	});
	/*******清空按钮清空事件******/
	cleanQuery($('#repertoryin .listForm .queryForm input:last'));
	
	/*****************设置上下移span的title****************/
	$("#repertoryin .popups .writetoexcel .upset").attr("title","上移");
	$("#repertoryin .popups .writetoexcel .downset").attr("title","下移");
	
	/*****************导出到Excel点击弹窗******************/
	$("#repertoryin .toolbar .write").click(function(){
		$('#repertoryin .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#repertoryin .popups .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'goodsName',tableHeader:'物品名称',date:false},
			         {propertyName:'goodsSize',tableHeader:'物品规格',date:false},
			         {propertyName:'inNumber',propertyType:'Integer',tableHeader:'入库数量',date:false},
			         {propertyName:'unit',tableHeader:'单位',date:false},
			         {propertyName:'goodsPositionName',tableHeader:'仓位',date:false},
			         {propertyName:'pretaxAmount',propertyType:'Double',tableHeader:'金额（元）',date:false},
			         {propertyName:'pretaxAverPrice',propertyType:'Double',tableHeader:'单价（元）',date:false},
			         {propertyName:'taxRate',propertyType:'Double',tableHeader:'税率（%）',date:false},
			         {propertyName:'taxAmount',propertyType:'Double',tableHeader:'无税金额（元）',date:false},
			         {propertyName:'taxAverPrice',propertyType:'Double',tableHeader:'无税单价（元）',date:false},
			         {propertyName:'putUserName',tableHeader:'经办人',date:false},
			         {propertyName:'providerCode',tableHeader:'供应商',date:false},
			         {propertyName:'inBatchFlowCode',tableHeader:'入库流水号',date:false},
			         {propertyName:'inTimeStr',tableHeader:'进库时间',date:true},
			         {propertyName:'record',tableHeader:'备注',date:false}
				 ]
		})
	})
	
	/*******************重置按钮点击事件***********************/
	$("#repertoryin .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#repertoryin .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#repertoryin .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#repertoryin .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#repertoryin .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#repertoryin .popups .writetoexcel"));
		
		var repertoryinExcel2 = [];
		for(var i = 0 ; i < repertoryinExcel.length ; i++){
			repertoryinExcel2.push(repertoryinExcel[i]);
		}
		repertoryinExcel2.push({
			name:'jsonString',value:jsonString
		})
		//提交导出excel所需要的参数
		excelplugin.submit({
			type:'post',
			array:repertoryinExcel2,
			action:'../../repertory/writeInToExcel.do?'
		})
	});
	
	/*表格数据的加载*/
	$('#repertoryindg').datagrid({
		//url:'../../repertory/selectGoodsInRecord.do?getMs='+getMS(),
		 onLoadSuccess:function(data){
				$.ajax({
					url:'../../repertory/findSumInRecord.do?getMs='+getMS(),
					data:{goodsTypeUrl:$("#repertoryin .goodsTypeUrl").val()},
					success:function(data){
						adjustsumBar('repertoryin');
						addsumBarIn('repertoryin',data);
					},
					error:function(err){
					}
				})
			},
		columns:[[
 	       {checkbox:true},
 	       {field:'_op',title:'操作',width:100,align:'center',
				formatter:function(value,row,index){
					var id = "'"+row.inRecordId+"'";
					row = JSON.stringify(row)
					return '<span class="small-button edit" title="修改" onclick="repertoryinupDate('+id+')"></span>'
						+'<span class="small-button delete" title="删除" onclick="repertoryinDel('+id+')" delId="'+id+'"></span>';
			}},
 	        {field:'goodsName',title:'物品名称',align:'center',width:100},
	        {field:'goodsSize',title:'物品规格',align:'center',width:100},
	        {field:'inNumber',title:'入库数量',align:'center',width:100},
			{field:'unit',title:'单位',align:'center',width:50},
			{field:'goodsPositionName',title:'仓位',align:'center',width:80},
			//{field:'pretaxAmount',title:'金额(元)',align:'center',width:100},
			{field:'pretaxAmount',title:'金额(元)',align:'center',width:100,formatter:function(value,row,index){
					return keepDecimals(value);
				}
			},
			//{field:'pretaxAverPrice',title:'单价(元)',align:'center',width:100},
			{field:'pretaxAverPrice',title:'单价(元)',align:'center',width:100,formatter:function(value,row,index){
					return keepDecimals(value);
				}
			},
			{field:'taxRate',title:'税率(%)',align:'center',width:50},
			//{field:'taxAmount',title:'无税金额(元)',align:'center',width:100},
			{field:'taxAmount',title:'无税金额(元)',align:'center',width:100,formatter:function(value,row,index){
					return keepDecimals(value);
				}
			},
			//{field:'taxAverPrice',title:'无税单价(元)',align:'center',width:100},
			{field:'taxAverPrice',title:'无税单价(元)',align:'center',width:100,formatter:function(value,row,index){
					return keepDecimals(value);
				}
			},
			{field:'putUserName',title:'经办人',align:'center',width:100},
			{field:'providerCode',title:'供应商',align:'center',width:100},
			{field:'inBatchFlowCode',title:'入库流水号',align:'center',width:120},
			{field:'inTimeStr',title:'进库时间',align:'center',width:150},
			{field:'record',title:'备注',align:'center',width:100},
	    ]],
	    toolbar:'#repertoryin .listForm .queryForm',
	    pagination:true
	});
	
	//打印
	$('#repertoryin .print').click(function(){
		var beginNumber = $.trim($('#repertoryin .goodsNumSm').val());
		var endNumber = $.trim($('#repertoryin .goodsNumBg').val());
		var goodsPositionName = $.trim($('#repertoryin .goodsPosition').val());
		var putUserName = $.trim($('#repertoryin .putUserName').val());
		var repertoryId = $('#repertoryin .listForm .repertoryName').val();
		var beginTime = $.trim($('#repertoryin .startTime').val());
		var endTime = $.trim($('#repertoryin .endTime').val());
		var providerCode = $.trim($('#repertoryin .queryForm input[name=providerCode]').val());
		var goodsName = $.trim($('#repertoryin .goodsName').val());
		var goodsSize = $.trim($('#repertoryin .goodsSize').val());
		var goodsTypeUrl = $("#repertoryin .goodsTypeUrl").val();
		var url = "../../repertory/printInRecord.do?" + "goodsName=" + goodsName + "&goodsSize=" + goodsSize + "&beginNumber=" + beginNumber
					+ "&endNumber=" + endNumber  + "&repertoryId=" + repertoryId + "&goodsTypeUrl=" + goodsTypeUrl + "&beginTime=" + beginTime
					+ "&goodsPositionName=" + goodsPositionName  + "&putUserName=" + putUserName + "&providerCode=" + providerCode
					+ "&endTime=" + endTime;
		$('#repertoryin .printInRecord').attr("action",url);
		$('#repertoryin .printInRecord').submit();
	});
	
	/*条件查询*/
	$('#repertoryin .query').click(function(){
		var beginNumber = $.trim($('#repertoryin .goodsNumSm').val());
		var endNumber = $.trim($('#repertoryin .goodsNumBg').val());
		var goodsPositionName = $.trim($('#repertoryin .goodsPosition').val());
		var putUserName = $.trim($('#repertoryin .putUserName').val());
		var repertoryId = $('#repertoryin .listForm .repertoryName').val();
		var beginTime = $.trim($('#repertoryin .startTime').val());
		var endTime = $.trim($('#repertoryin .endTime').val());
		var providerCode = $.trim($('#repertoryin .queryForm input[name=providerCode]').val());
		var goodsName = $.trim($('#repertoryin .goodsName').val());
		var goodsSize = $.trim($('#repertoryin .goodsSize').val());
		var inBatchFlowCode = $.trim($('#repertoryin .inBatchFlowCode').val());
		var goodsTypeUrl = $("#repertoryin .goodsTypeUrl").val();
		var dataInfo = {
				beginNumber:beginNumber,
				endNumber:endNumber,
				goodsPositionName:goodsPositionName,
				putUserName:putUserName,
				repertoryId:repertoryId,
				beginTime:beginTime,
				endTime:endTime,
				providerCode:providerCode,
				goodsName:goodsName,
				goodsSize:goodsSize,
				inBatchFlowCode:inBatchFlowCode,
				goodsTypeUrl:goodsTypeUrl||'0',
			};
		repertoryinExcel = [
  		     {name:'goodsName',value:goodsName},
     		 {name:'goodsSize',value:goodsSize},
  	   		{name:'beginNumber',value:beginNumber},
  	   		{name:'endNumber',value:endNumber},
  	   		{name:'goodsPositionName',value:goodsPositionName},
  	   		{name:'putUserName',value:putUserName},
  	   		{name:'repertoryId',value:repertoryId},
  	   		{name:'beginTime',value:beginTime},
  	   		{name:'endTime',value:endTime},
  	   		{name:'inBatchFlowCode',value:inBatchFlowCode},
  	   		{name:'goodsTypeUrl',value:goodsTypeUrl||'0'},
  	   		{name:'providerCode',value:providerCode},
  	   		
		 ];
		$('#repertoryindg').datagrid({
			url:"../../repertory/selectGoodsInRecord.do?getMs="+getMS(),
			queryParams:dataInfo
		});
	});
	//显示隐藏汇总bar
	var controlFlag = true;
	$('#repertoryin .controlSumBar').click(function(){
		if($(this).val() == '隐藏' && controlFlag){
			controlFlag = false;
			$('#repertoryin .sumBar').animate({
				'bottom':'-=30px',
				'opacity':0,
			},500,function(){
				controlFlag = true;
				$('#repertoryin .sumBar').css('display','none');
				$('#findgoods .controlSumBar').val('显示');
			});
		}else if($(this).val() == '显示' && controlFlag){
			controlFlag = false;
			$('#repertoryin .sumBar').css('display','block');
			$('#repertoryin .sumBar').animate({
				'bottom':'+=30px',
				'opacity':1,
			},500,function(){
				controlFlag = true;
				$('#repertoryin .controlSumBar').val('隐藏');
			});
		}
	});
	/*修改入库明细*/
	$('#repertoryin .popups .update .confirm').click(function(){
		var inRecordId = $('#repertoryin .update .putUserName').attr('inRecordId');
		var putUserName = $.trim($('#repertoryin .update .putUserName').val());
		var totalNumber = $.trim($('#repertoryin .update .totalNumber').val());
		var inNumber = $.trim($('#repertoryin .update .inNumber').val());
		var pretaxAmount = $.trim($('#repertoryin .update .pretaxAmount').val());
		var taxRate = $.trim($('#repertoryin .update .taxRate').val());
		var pretaxAverPrice = $.trim($('#repertoryin .update .pretaxAverPrice').val());
		var taxAmount = $.trim($('#repertoryin .update .taxAmount').val());
		var taxAverPrice = $.trim($('#repertoryin .update .taxAverPrice').val());
		var repertoryName = $.trim($('#repertoryin .update .repertoryName').val());
		var record = $.trim($('#repertoryin .update .record').val());
		var supplier = $.trim($('#repertoryin .update .supplier').val());
		var goodsId = $.trim($('#repertoryin .update .goodsId').val());
		var goodsPositionId = $.trim($('#repertoryin .update .goodsPositionId').val());
		var providerCode = $.trim($('#repertoryin .update .popuparea .providerCode').val());
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
		}*/else if(record == ''||record == null){
			windowControl('入库备注不能为空');
			return false;
		}else{
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
					providerCode:providerCode
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
					}else if(data==200){
						windowControl('修改出库明细成功');
						$('#repertoryin .popups .update').css('display','none');
						$('#repertoryin .popups .update .popuparea input').val('');
						$('#repertoryin .popups .update .popuparea textarea').val('');
						$('#repertoryindg').datagrid('reload');
					}else{
						windowControl(data);
					}
				},
				error:function(err){
					windowControl(err.status);
				}
			});
		}
		
	});
	/*批量删除*/
	$('#repertoryin .batchRemove').click(function(){
		var selRow = $('#repertoryindg').datagrid("getSelections");//返回选中多行 
		if(selRow.length == 0){
			windowControl('请至少选择一行数据!');
			return false;
		}
		var ids = [];
		for (var i = 0;i < selRow.length;i++){
			var id = $('#repertoryin .delete').eq(i).attr('delId');
			ids.push(id);
		}
		repertoryinDel(ids);
	});
	/*删除弹窗*/
	$('#repertoryin .popups .del .confirm').click(function(){
		$.ajax({
			data:{json:dataInfo},
			url:'../../repertory/deleteGoodsInRecord.do?getMs='+getMS(),
			type:'post',
			success:function(data){
				$('#repertoryin .popups .del').css('display','none');
				$('#repertoryindg').datagrid("reload");
				dataInfo = [];
			},
			error:function(err){
				windowControl(err.status);
			}
		});
	});
	/*刷新*/
	$('#repertoryin .refresh').click(function(){
		$('#repertoryindg').datagrid({
			url:"../../repertory/selectGoodsInRecord.do?getMs="+getMS(),
		});
		$('#repertoryin .queryForm input').val('');
		$('#repertoryin .query').val('查询');
		$('#repertoryin .queryForm select option:eq(0)').attr('selected',true);
	});
	/*计算总价与均价*/
	$('#repertoryin .update .pretaxAmount').blur(function(){
		cal();
	});
	$('#repertoryin .update .taxRate').blur(function(){
		cal();
	});
	$('#repertoryin .update .inNumber').blur(function(){
		cal();
	});
	/*--------------------------------tree------------------------------*/
	var goodsTypeIds=[];
	$('#repertoryintg').tree({
        url: "../../treeController/queryTree.do?getMs="+getMS(),
        method:"post",
        animate: false,
        checkbox : false,//是否显示复选框  
        cascadeCheck: false,
        dnd:true,
        onClick: function(node){
        	//var goodsTypeUrl = node.id;
        	$("#repertoryin .goodsTypeUrl").val(node.id);
        	/*$('#repertoryindg').datagrid({
        		url:'../../repertory/selectGoodsInRecord.do?getMs='+getMS(),
        		queryParams:{goodsTypeUrl:goodsTypeUrl},
        	});*/
        },
        onCollapse:function(node){
        	$("#repertoryin .goodsTypeUrl").val(node.id);
        	$.ajax({
        		data:{goodsTypeUrl:$("#goodsTypeUrl").val(),state:"onCollapse"},
    			url:"../../treeController/updateTreeState.do?getMs="+getMS(),
    			method:"post"
    		})
        },
        onExpand:function(node){
        	$("#repertoryin .goodsTypeUrl").val(node.id);
        	$.ajax({
        		data:{goodsTypeUrl:$("#goodsTypeUrl").val(),state:"onExpand"},
    			url:"../../treeController/updateTreeState.do?getMs="+getMS(),
    			method:"post"
    		})
        },
        onDrop: function(target,source,point){
        	var targetUrl = $('#repertoryintg').tree('getNode', target).id;
        	var targetName = $('#repertoryintg').tree('getNode', target).text;
        	//console.log("targetId="+targetId+"source="+source.text+"point="+point);
        	$.ajax({
    			data:{targetUrl:targetUrl,targetName:targetName,sourceUrl:source.id,sourceName:source.text,point:point},
    			url:"../../treeController/dragRepertoryType.do?getMs="+getMS(),
    			method:"post",
    			success: function(data){
    				$('#repertoryintg').tree('reload');
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
       /* onContextMenu : function(e,node){
        	e.preventDefault();
        	var goodsTypeUrl = $('#repertoryin .goodsTypeUrl').val(node.id);
        	$('#repertoryintg').tree('select', node.target);
    		$('#repertoryinmm').menu('show', {
    			left: e.pageX,
    			top: e.pageY
    		});
		}*/
    });
	//点击打印物料入库单按钮
	$('#repertoryin .listForm .printMaterialsForm').click(function(){
		$('#repertoryin .listForm').hide();
		$('#repertoryin .materialsForm').show();
	});
	//选择入库流水号
	$('#repertoryin .materialsForm .selectFlowCode').click(function(){
		inBatchFlowCodeForm();
		$('#inBatchFlowCodeForm .confirm').unbind('click');
		$('#inBatchFlowCodeForm .confirm').click(function(){
			$('#inBatchFlowCodeForm').css('display','none');	
			var info = $('#inBatchFlowCodeForm .popuparea .inBatchFlowCode').datagrid('getSelected');
			$('#repertoryin .materialsForm input[name=inBatchFlowCode]').val(info.inBatchFlowCode);
			$('#repertoryin .materialsForm input[name=inBatchFlowCode]').attr('id',info.inBatchFlowId);	    	
		});
	});
	//查询物料入库单
	$('#repertoryin .materialsForm .testLook').click(function(){
		$('#inMaterialsForm').datagrid('reload');
	});
	//数据加载
	$('#inMaterialsForm').datagrid({
		url:'../../repertory/selectInRecordForPrint.do?getMs='+getMS(),
		columns:[[
 	        {field:'inBatchFlowCode',title:'入库流水号',align:'center',width:100},
 	        {field:'makerUserName',title:'制单人',align:'center',width:100},
	        {field:'putUserName',title:'业务员',align:'center',width:100},
	        {field:'repertoryName',title:'仓库名',align:'center',width:100},
			{field:'providerName',title:'供应商',align:'center',width:120},
			{field:'goodsName',title:'物品名',align:'center',width:100},
			{field:'goodsSize',title:'规格型号',align:'center',width:100},
			{field:'unit',title:'单位',align:'center',width:50},
			{field:'inNumber',title:'入库数量',align:'center',width:100},
 	     	{field:'pretaxAverPrice',title:'单价',align:'center',width:100},
 	     	{field:'pretaxAmount',title:'金额',align:'center',width:100},
 	     	{field:'taxRate',title:'税率',align:'center',width:100},
 	     	{field:'taxedAmount',title:'税额',align:'center',width:100},
 	     	{field:'invoiceNumber',title:'发票号',align:'center',width:100},
 	        {field:'makerUserName',title:'制单人',align:'center',width:100},
 	        {field:'inTime',title:'入库时间',align:'center',width:120},
			{field:'batchText',title:'批次备注',align:'center',width:150}
	    ]],
	    toolbar:'#repertoryin .materialsForm .queryForm',
	    pagination:true,
	    queryParams:{
	       inBatchFlowCode:function(){
	    	   return $('#repertoryin .materialsForm input[name=inBatchFlowCode]').val();
	       }
	    }
	});
	//打印
	$('#repertoryin .printInMaterialsBtn').click(function(){
		inBatchFlowCode = $('#repertoryin .materialsForm input[name=inBatchFlowCode]').val();
		var url = "../../repertory/printMaterialStorage.do?" + "inBatchFlowCode=" + inBatchFlowCode;
		$('#repertoryin .printInMaterialsForm').attr("action",url);
		$('#repertoryin .printInMaterialsForm').submit();
	});
	//点击返回
	$('#repertoryin .materialsForm .back').click(function(){
		$('#repertoryin .materialsForm').hide();
		$('#repertoryin .listForm').show();
	});
});
/***************************下拉框选择供应商**************************/
$('#repertoryin .update .supplier').html(getDataBySelectKeyNo("provider"));
$('#repertoryin .listForm .provider').html(getDataBySelectKeyNo("provider"));
/*************************下拉框选择仓库信息********************************/
$.ajax({
	url:'../../repertory/selectRepertoryType.do?getMs='+getMS(),
	type:'post',
	success:function(data){
		var str = "<option value=''></option>";
		var data = eval('(' + data + ')'); 
		for(var i=0;i<data.length;i++){
			str += "<option class='repertoryName' value=" + data[i].repertoryId + ">" + data[i].repertoryName + "</option>";  
		}
	$('#repertoryin .listForm .repertoryName').html(str);
	},
	error:function(error){
		windowControl(error.status);
	}
})
/*---------------------------------tree函数-----------------------------------*/
/*function add(){
	$('#repertoryin .addWindow').css('display','block');
}
function remove(){
	$('#repertoryin .removeWindow').css('display','block');
}
function edit(){
	$('#repertoryin .editWindow').css('display','block');
}*/
var dataInfo = []; //定义一个批量删除的数组接受id
/*-----------操作函数------------*/
/*修改入库记录*/
function repertoryinupDate(id){
	$('#repertoryin .popups .update').css('display','block');
	$.ajax({
		data:{},
		url:'../../repertory/selectGoodsInRecord.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var data = $.parseJSON(data);
			for(var i=0;i<data.rows.length;i++){
				if(data.rows[i].inRecordId == id){
					$('#repertoryin .update .putUserName').attr('inRecordId',id);
					$('#repertoryin .update .putUserName').val(data.rows[i].putUserName);
					$('#repertoryin .update .totalNumber').val(data.rows[i].totalNumber);
					$('#repertoryin .update .inNumber').val(data.rows[i].inNumber);
					$('#repertoryin .update .goodsId').val(data.rows[i].goodsId);
					$('#repertoryin .update .goodsPositionId').val(data.rows[i].goodsPositionId);
					$('#repertoryin .update .pretaxAmount').val(data.rows[i].pretaxAmount);
					$('#repertoryin .update .taxRate').val(data.rows[i].taxRate);
					$('#repertoryin .update .providerCode').val(data.rows[i].providerCode);
					cal();
					$('#repertoryin .update .goodsPositionName').attr('goodsPositionId',data.rows[i].goodsPositionId);
					$('#repertoryin .update .goodsPositionName').val(data.rows[i].goodsPositionName);
					$('#repertoryin .update .pretaxAverPrice').val(data.rows[i].pretaxAverPrice);
					$('#repertoryin .update .taxAmount').val(data.rows[i].taxAmount);
					$('#repertoryin .update .taxAverPrice').val(data.rows[i].taxAverPrice);
					$('#repertoryin .update .repertoryName').val(data.rows[i].repertoryName);
					$('#repertoryin .update .record').val(data.rows[i].record);
				}
			}
		},
		error:function(err){
			windowControl(err.status);
		}
	});
}
/*删除入库记录*/
function repertoryinDel(id){
	$('#repertoryin .popups .del').css('display','block');
	if(typeof(id) == "object"){
		$('#repertoryin .popups .del h3').text('批量删除提示');
		$('#repertoryin .popups .del .delarea').text('确定要批量删除所选的信息吗？');
		for(var i = 0;i < id.length ;i++){
			var info = {inRecordId:id[i]};
			dataInfo.push(info);
		}
	}else{
		$('#repertoryin .popups .del h3').text('删除入库信息');
		$('#repertoryin .popups .del .delarea').text('确定要删除这条入库信息吗？');
		var info = {inRecordId:id};
		dataInfo.push(info);
	}
	dataInfo = JSON.stringify(dataInfo);
}
/*计算总价与均价函数*/
function cal(){
	var pretaxAmount = $.trim($('#repertoryin .update .pretaxAmount').val());
	var taxRate = $.trim($('#repertoryin .update .taxRate').val());
	var inNumber = $.trim($('#repertoryin .update .inNumber').val());
	if(pretaxAmount != '' && taxRate != ''){
		if(inNumber == ''){
			$('#repertoryin .update .pretaxAverPrice').val(pretaxAmount);
			$('#repertoryin .update .taxAmount').val(pretaxAmount*(1-(taxRate/100)));
			$('#repertoryin .update .taxAverPrice').val(pretaxAmount*(1-(taxRate/100)));
		}else{
			$('#repertoryin .update .pretaxAverPrice').val(pretaxAmount/inNumber);
			$('#repertoryin .update .taxAmount').val(pretaxAmount*(1-(taxRate/100)));
			$('#repertoryin .update .taxAverPrice').val((pretaxAmount*(1-(taxRate/100)))/inNumber);
		}
	}
}
/*------汇总--------*/
function addsumBarIn(id,data){
	$('#'+id).find('.sumBar').css({
		'width':$('#'+id).find('.toolbar').width()+6+'px',
	});
	var node = $('#repertoryintg').tree('getSelected');
	var str = '';
	data = $.parseJSON(data);
	if(data){
		str +='<span style="font-weight:800;">物品类别：</span>';
		if(node){
			str +='<span>'+node.text+'</span>';
		}else{
			str +='<span>'+'物品总类别'+'</span>';
		}
		str +='<span style="font-weight:800;">入库数量：</span>';
		str +='<span>'+data.inTotalNumber+'</span>';
		str +='<span style="font-weight:800;">入库金额(税前)：</span>';
		str +='<span>'+keepDecimals(data.inTotalPretaxAmount)+'</span>';
		str +='<span style="font-weight:800;">入库金额(无税)：</span>';
		str +='<span>'+keepDecimals(data.inTotalTaxAmount)+'</span>';
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
    var inputArryTk= $(".popuparea input[disabled!='disabled'][type!='button'][readonly!='readonly'][name!='providerCode'][display!='none'][class!='goodsId'][class!='goodsPositionId'],textarea");
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
