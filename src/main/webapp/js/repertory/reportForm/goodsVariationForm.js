var goodsVariationFormExcel = [];
$(function(){
	/*设置页面高100%*/
	$('#goodsVariationForm').css('height',$('#loadarea').height()-31+'px');
	/*设置list的宽度*/
	$('#goodsVariationForm .listForm').css('width',$('#loadarea').width()-202+'px');
	$('#goodsVariationForm .listForm').css('height',$('#loadarea').height()-31+'px');
	/*设置chart的宽度*/
	$('#goodsVariationForm .chartArea').css({
		'width':$('#loadarea').width()+'px',
		'height':$('#loadarea').height()-31+'px'
	});
	/*设置表格的高度*/
	$('#goodsVariationFormdg').css('height',$('#loadarea').height()-61+'px');
	$(window).resize(function() {
		$('#goodsVariationForm').css('height',$('#loadarea').height()-31+'px');
		$('#goodsVariationForm .listForm').css('width',$('#loadarea').width()-202+'px');
	});	
	
	/*****************设置上下移span的title****************/
	$("#goodsVariationForm .popups .writetoexcel .upset").attr("title","上移");
	$("#goodsVariationForm .popups .writetoexcel .downset").attr("title","下移");
	
	/*****************导出到Excel点击弹窗******************/
	$("#goodsVariationForm .toolbar .write").click(function(){
		$('#goodsVariationForm .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#goodsVariationForm .popups .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'goodsName',tableHeader:'物品名称',date:false},
			         {propertyName:'goodsSize',tableHeader:'物品规格',date:false},
			         {propertyName:'lastBalanceNumber',propertyType:'Integer',tableHeader:'上期余量',date:false},
			         {propertyName:'lastBalanceAmount',propertyType:'Double',tableHeader:'上期余额',date:false},
			         {propertyName:'currentOutNumber',propertyType:'Integer',tableHeader:'本期出库数量',date:false},
			         {propertyName:'currentOutAmount',propertyType:'Double',tableHeader:'本期出库金额',date:false},
			         {propertyName:'currentInNumber',propertyType:'Integer',tableHeader:'本期入库数量',date:false},
			         {propertyName:'currentInAmount',propertyType:'Double',tableHeader:'本期入库金额',date:false},
			         {propertyName:'currentBalanceNumber',propertyType:'Integer',tableHeader:'本期余量',date:false},
			         {propertyName:'currentBalanceAmount',propertyType:'Double',tableHeader:'本期余额',date:false}			         
				 ]
		})
	})
	
	/*******************重置按钮点击事件***********************/
	$("#goodsVariationForm .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#goodsVariationForm .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#goodsVariationForm .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#goodsVariationForm .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#goodsVariationForm .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#goodsVariationForm .popups .writetoexcel"));
		
		var goodsVariationFormExcel2 = [];
		for(var i = 0 ; i < goodsVariationFormExcel.length ; i++){
			goodsVariationFormExcel2.push(goodsVariationFormExcel[i]);
		}
		goodsVariationFormExcel2.push({
			name:'jsonString',value:jsonString
		})
		//提交导出excel所需要的参数
		excelplugin.submit({
			type:'post',
			array:goodsVariationFormExcel2,
			action:'../../reportForms/writeVariationFormToExcel.do?'
		})
	});
	
	//打印
	$('#goodsVariationForm .print').click(function(){
		var goodsName = $.trim($('#goodsVariationForm .queryForm input[name=goodsName]').val());
		var goodsSize = $.trim($('#goodsVariationForm .queryForm input[name=goodsSize]').val());
		var startTime = $.trim($('#goodsVariationForm .queryForm input[name=balanceStartTime]').val());
		var endTime = $.trim($('#goodsVariationForm .queryForm input[name=balanceEndTime]').val());
		var urls = goodsTypeIds;
		var goodsTypeUrls = "";
		for(var i=0;i<urls.length;i++){
			if(i == urls.length-1){
				goodsTypeUrls += "'"+urls[i]+"'";
			}else{
				goodsTypeUrls = goodsTypeUrls + "'" + urls[i] + "',"
			}
		}
		goodsTypeUrls = $.trim(goodsTypeUrls);
		if(startTime == '' || endTime == ''){
			windowControl("请确认已选择结算起止时间");
			return;
		}else if(startTime.replace('-','/')>endTime.replace('-','/')){
			windowControl("结算开始时间应不大于结束时间");
			return;
		}else{
			$('#goodsVariationForm .printGoodsVariationForm input[name=goodsName]').val(goodsName);
			$('#goodsVariationForm .printGoodsVariationForm input[name=goodsSize]').val(goodsSize);
			$('#goodsVariationForm .printGoodsVariationForm input[name=startTime]').val(startTime);
			$('#goodsVariationForm .printGoodsVariationForm input[name=endTime]').val(endTime);
			$('#goodsVariationForm .printGoodsVariationForm input[name=goodsTypeUrls]').val(goodsTypeUrls);
			$('#goodsVariationForm .printGoodsVariationForm').submit();
		}
	});
	
	/*网格数据加载*/
	$('#goodsVariationFormdg').datagrid({
		//url:'../../reportForms/findDynamicBalance.do?getMs='+getMS(),
		pagination:true,
		toolbar:'#goodsVariationForm .queryForm',
		onLoadSuccess:function(data){
			var goodsName = $.trim($('#goodsVariationForm .queryForm input[name=goodsName]').val());
			var goodsSize = $.trim($('#goodsVariationForm .queryForm input[name=goodsSize]').val());
			var startTime = $.trim($('#goodsVariationForm .queryForm input[name=balanceStartTime]').val());
			var endTime = $.trim($('#goodsVariationForm .queryForm input[name=balanceEndTime]').val());
			var urls = goodsTypeIds;
			var goodsTypeUrls = "";
			for(var i=0;i<urls.length;i++){
				if(i == urls.length-1){
					goodsTypeUrls += "'"+urls[i]+"'";
				}else{
					goodsTypeUrls = goodsTypeUrls + "'" + urls[i] + "',"
				}
			}
			goodsTypeUrls = $.trim(goodsTypeUrls);
			if(startTime == '' || endTime == ''){
				windowControl("请确认已选择结算起止时间");
			}else if(startTime.replace('-','/')>endTime.replace('-','/')){
				windowControl("结算开始时间应不大于结束时间");
			}else{
				var info = {
						goodsName:goodsName,
						goodsSize:goodsSize,
						startTime:startTime,
						endTime:endTime,
						goodsTypeUrls:goodsTypeUrls
					};
			}
			$.ajax({
				url:'../../reportForms/findSumDynamicBalance.do?getMs='+getMS(),
				data:info,
				success:function(data){
					adjustsumBar('goodsVariationForm');
					addsumBerVariationForm('goodsVariationForm',data);
				},
				error:function(err){
				}
			})
		},
		columns:[[
	       {
	    	   field:"goodsName",
	    	   title:"物品名称",
	    	   fitColumns:true,
	    	   resizable:true,
	    	   align:"center",
	    	   width:100
	       },
	       {
	    		field:"goodsSize",
	    		title:"物品规格",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:100
	    	},
	    	{
	    		field:"lastBalanceNumber",
	    		title:"上期余量",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    	},
	    	{
	    		field:"lastBalanceAmount",
	    		title:"上期余额",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    		,formatter:function(value,row,index){
					return keepDecimals(value);
				}
			 },
	    	{
	    		field:"currentOutNumber",
	    		title:"本期出库数量",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    	},
	    	{
	    		field:"currentOutAmount",
	    		title:"本期出库金额",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    		,formatter:function(value,row,index){
					return keepDecimals(value);
				}
			 },
	    	{
	    		field:"currentInNumber",
	    		title:"本期入库数量",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    	},
	    	{
	    		field:"currentInAmount",
	    		title:"本期入库金额",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    		,formatter:function(value,row,index){
					return keepDecimals(value);
				}
			 },
	    	{
	    		field:"currentBalanceNumber",
	    		title:"本期余量",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    	},
	    	{
	    		field:"currentBalanceAmount",
	    		title:"本期余额",
	    		fitColumns:true,
	    		resizable:true,
	    		align:"center",
	    		width:80
	    		,formatter:function(value,row,index){
					return keepDecimals(value);
				}
			 },
	    ]]
	});
	/*--------------------------------tree------------------------------*/
	var goodsTypeIds=[];//存放多个url的数组
	$('#goodsVariationFormtg').tree({
        url: "../../treeController/queryTree.do?getMs="+getMS(),
        method:"post",
        animate: false,
        checkbox : true,//是否显示复选框  
        cascadeCheck: false,
        dnd:true,
        onClick: function(node){
        	//$("#goodsVariationForm .goodsTypeUrl").val(node.id);
        },
        onCollapse:function(node){
        	$("#goodsVariationForm .goodsTypeUrl").val(node.id);
        	$.ajax({
        		data:{goodsTypeUrl:$("#goodsTypeUrl").val(),state:"onCollapse"},
    			url:"../../treeController/updateTreeState.do?getMs="+getMS(),
    			method:"post"
    		})
        },
        onExpand:function(node){
        	$("#goodsVariationForm .goodsTypeUrl").val(node.id);
        	$.ajax({
        		data:{goodsTypeUrl:$("#goodsTypeUrl").val(),state:"onExpand"},
    			url:"../../treeController/updateTreeState.do?getMs="+getMS(),
    			method:"post"
    		})
        },
        onDrop: function(target,source,point){
        	var targetUrl = $('#goodsVariationFormtg').tree('getNode', target).id;
        	var targetName = $('#goodsVariationFormtg').tree('getNode', target).text;
        	//console.log("targetId="+targetId+"source="+source.text+"point="+point);
        	$.ajax({
    			data:{targetUrl:targetUrl,targetName:targetName,sourceUrl:source.id,sourceName:source.text,point:point},
    			url:"../../treeController/dragRepertoryType.do?getMs="+getMS(),
    			method:"post",
    			success: function(data){
    				$('#goodsVariationFormtg').tree('reload');
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
    });
	/*查询*/
	$('#goodsVariationForm .queryForm .query').click(function(){
		var goodsName = $.trim($('#goodsVariationForm .queryForm input[name=goodsName]').val());
		var goodsSize = $.trim($('#goodsVariationForm .queryForm input[name=goodsSize]').val());
		var startTime = $.trim($('#goodsVariationForm .queryForm input[name=balanceStartTime]').val());
		var endTime = $.trim($('#goodsVariationForm .queryForm input[name=balanceEndTime]').val());
		var urls = goodsTypeIds;
		var goodsTypeUrls = "";
		for(var i=0;i<urls.length;i++){
			if(i == urls.length-1){
				goodsTypeUrls += "'"+urls[i]+"'";
			}else{
				goodsTypeUrls = goodsTypeUrls + "'" + urls[i] + "',"
			}
		}
		goodsTypeUrls = $.trim(goodsTypeUrls);
		if(startTime == '' || endTime == ''){
			windowControl("请确认已选择结算起止时间");
		}else if(startTime.replace('-','/')>endTime.replace('-','/')){
			windowControl("结算开始时间应不大于结束时间");
		}else{
			var info = {
					goodsName:goodsName,
					goodsSize:goodsSize,
					startTime:startTime,
					endTime:endTime,
					goodsTypeUrls:goodsTypeUrls
				};
			$('#goodsVariationFormdg').datagrid({
				url:'../../reportForms/findDynamicBalance.do?getMs='+getMS(),
				queryParams:info
			})
			goodsVariationFormExcel = [
						       		    {name:'goodsName',value:goodsName},
						         		{name:'goodsSize',value:goodsSize},
						      	   		{name:'startTime',value:startTime},
						      	   		{name:'endTime',value:endTime},
						      	   		{name:'goodsTypeUrls',value:goodsTypeUrls}
					         ];
		}
	});
	//显示隐藏汇总bar
	var controlFlag = true;
	$('#goodsVariationForm .controlSumBar').click(function(){
		if($(this).val() == '隐藏' && controlFlag){
			controlFlag = false;
			$('#goodsVariationForm .sumBar').animate({
				'bottom':'-=30px',
				'opacity':0,
			},500,function(){
				controlFlag = true;
				$('#goodsVariationForm .sumBar').css('display','none');
				$('#goodsVariationForm .controlSumBar').val('显示');
			});
		}else if($(this).val() == '显示' && controlFlag){
			controlFlag = false;
			$('#goodsVariationForm .sumBar').css('display','block');
			$('#goodsVariationForm .sumBar').animate({
				'bottom':'+=30px',
				'opacity':1,
			},500,function(){
				controlFlag = true;
				$('#goodsVariationForm .controlSumBar').val('隐藏');
			});
		}
	});
	//打印
//	$('#goodsVariationForm .print').click(function(){
//		var goodsName = $.trim($('#goodsVariationForm .queryForm .goodsName').val());
//		var goodsSize = $.trim($('#goodsVariationForm .queryForm .goodsSize').val());
//		var startTime = $.trim($('#goodsVariationForm .queryForm input[name=balanceStartTime]').val());
//		var endTime = $.trim($('#goodsVariationForm .queryForm input[name=balanceEndTime]').val());
//		var urls = goodsTypeIds;
//		var goodsTypeUrls = "";
//		for(var i=0;i<urls.length;i++){
//			if(i == urls.length-1){
//				goodsTypeUrls += "'"+urls[i]+"'";
//			}else{
//				goodsTypeUrls = goodsTypeUrls + "'" + urls[i] + "',"
//			}
//		}
//		printObject ={
//			url:'../../reportForms/findDynamicBalance.do?getMs='+getMS(),
//			data:{
//				goodsName:goodsName,
//				goodsSize:goodsSize,
//				startTime:startTime,
//				endTime:endTime,
//				goodsTypeUrls:goodsTypeUrls
//			},	
//			column:[
//			        {
//			    	   field:"goodsName",
//			    	   title:"物品名称"
//			       },
//			       {
//			    		field:"goodsSize",
//			    		title:"物品规格"
//			    	},
//			    	{
//			    		field:"movingAverPrice",
//			    		title:"移动平均价"
//			    	},
//			    	{
//			    		field:"lastBalanceNumber",
//			    		title:"上期余量"
//			    	},
//			    	{
//			    		field:"lastBalanceAmount",
//			    		title:"上期余额"
//			    	},
//			    	{
//			    		field:"currentOutNumber",
//			    		title:"本期出库数量"
//			    	},
//			    	{
//			    		field:"currentOutAmount",
//			    		title:"本期出库金额"
//			    	},
//			    	{
//			    		field:"currentInNumber",
//			    		title:"本期入库数量"
//			    	},
//			    	{
//			    		field:"currentInAmount",
//			    		title:"本期入库金额"
//			    	},
//			    	{
//			    		field:"weightedAverPrice ",
//			    		title:"加权平均价"
//			    	},
//			    	{
//			    		field:"currentBalanceNumber",
//			    		title:"本期余量"
//			    	},
//			    	{
//			    		field:"currentBalanceAmount",
//			    		title:"本期余额"
//			    	}
//			 ],
//			width: 1200
//		}
//		setUpAdjustPrint(printObject);
//	});
//
//	$('.printWindow .confirm').click(function(){
//		lookPrint(printObject);
//		$('.printLook .confir').unbind('click');
//		$('.printLook .confir').click(function(){
//			$('.printLook .popuparea').jqprint();
//		});
//	});
});
/*--------汇总---------*/
function addsumBerVariationForm(id,data){
	$('#'+id).find('.sumBar').css({
		'width':$('#'+id).find('.toolbar').width()+6+'px',
	});
	//var node = $('#goodsVariationFormtg').tree('getSelected');
	data = $.parseJSON(data);
	var str = '';
	if(data){
		/*str +='<span style="font-weight:800;">物品类别：</span>';
		str +='<span>'+node.text+'</span>';*/
		str +='<span style="font-weight:800;">上期余量：</span>';
		str +='<span>'+data.lastBalanceNumber+'</span>';
		str +='<span style="font-weight:800;">上期余额：</span>';
		str +='<span>'+keepDecimals(data.lastBalanceAmount)+'</span>';
		str +='<span style="font-weight:800;">本期出库数量：</span>';
		str +='<span>'+data.currentOutNumber+'</span>';
		str +='<span style="font-weight:800;">本期出库金额：</span>';
		str +='<span>'+keepDecimals(data.currentOutAmount)+'</span>';
		str +='<span style="font-weight:800;">本期入库数量：</span>';
		str +='<span>'+data.currentInNumber+'</span>';
		str +='<span style="font-weight:800;">本期入库金额：</span>';
		str +='<span>'+keepDecimals(data.currentInAmount)+'</span>';
		str +='<span style="font-weight:800;">本期余量：</span>';
		str +='<span>'+data.currentBalanceNumber+'</span>';
		str +='<span style="font-weight:800;">本期余额：</span>';
		str +='<span>'+keepDecimals(data.currentBalanceAmount)+'</span>';
	}
	$('#'+id).find('.sumBar').html(str);
}