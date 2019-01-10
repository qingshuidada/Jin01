var goodstypemonthFormExcel = [];
$(function(){
	/*设置页面高100%*/
	$('#goodstypemonthForm').css('height',$('#loadarea').height()-31+'px');
	/*设置list的宽度*/
	$('#goodstypemonthForm .listForm').css('width',$('#loadarea').width()-202+'px');
	$('#goodstypemonthForm .listForm').css('height',$('#loadarea').height()-31+'px');
	/*设置chart的宽度*/
	$('#goodstypemonthForm .chartArea').css({
		'width':$('#loadarea').width()+'px',
		'height':$('#loadarea').height()-31+'px'
	});
	/*设置表格的高度*/
	$('#goodstypemonthFormdg').css('height',$('#loadarea').height()-60+'px');
	
	/*****************设置上下移span的title****************/
	$("#goodstypemonthForm .popups .writetoexcel .upset").attr("title","上移");
	$("#goodstypemonthForm .popups .writetoexcel .downset").attr("title","下移");
	
	/*****************导出到Excel点击弹窗******************/
	$("#goodstypemonthForm .toolbar .write").click(function(){
		$('#goodstypemonthForm .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#goodstypemonthForm .popups .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'goodsTypeName',tableHeader:'物品类别名称',date:false},
			         {propertyName:'monthBalanceTimeStr',tableHeader:'月结日期',date:true},
			         {propertyName:'startTimeStr',tableHeader:'开始日期',date:true},
			         {propertyName:'endTimeStr',tableHeader:'结束日期',date:true},
			         {propertyName:'lastBalanceAmount',propertyType:'Double',tableHeader:'上期余额',date:false},
			         {propertyName:'currentOutAmount',propertyType:'Double',tableHeader:'本期出库金额',date:false},
			         {propertyName:'currentInAmount',propertyType:'Double',tableHeader:'本期入库金额',date:false},
			         {propertyName:'currentBalanceAmount',propertyType:'Double',tableHeader:'本期余额',date:false}		         
				 ]
		})
	})

	/*******************重置按钮点击事件***********************/
	$("#goodstypemonthForm .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#goodstypemonthForm .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#goodstypemonthForm .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#goodstypemonthForm .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#goodstypemonthForm .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#goodstypemonthForm .popups .writetoexcel"));
		
		var goodstypemonthFormExcel2 = [];
		for(var i = 0 ; i < goodstypemonthFormExcel.length ; i++){
			goodstypemonthFormExcel2.push(goodstypemonthFormExcel[i]);
		}
		goodstypemonthFormExcel2.push({
			name:'jsonString',value:jsonString
		})
		//提交导出excel所需要的参数
		excelplugin.submit({
			type:'post',
			array:goodstypemonthFormExcel2,
			action:'../../reportForms/writeTypeMonthFormToExcel.do?'
		})
	});
	
	/*网格数据加载*/
	$('#goodstypemonthFormdg').datagrid({
		//url:'../../reportForms/findTypeMonthBalanceByCondition.do?getMs='+getMS(),
		rownumbers:true,
		pagination:true,
		singleSelect:true,
		toolbar:'#goodstypemonthForm .queryForm',
		columns:[[
		   {field:"_op",title:"管理",width:65,resizable:true,align:"center",width:65,sortable:true,formatter:function(value,row,index){
	    	   var url ="'"+row.goodsTypeUrl+"'";
	    	   return '<span class="small-button look" onclick="lookTypeReportGraphic('+url+')" title="查看图"></span>'
	       }},
	       {field:"goodsTypeName",title:"物品类别名称",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
	       {field:"monthBalanceTimeStr",title:"月结日期",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
	       {field:"startTimeStr",title:"开始日期",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
	       {field:"endTimeStr",title:"结束日期",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
	       {field:"lastBalanceAmount",title:"上期余额",fitColumns:true,resizable:true,align:"center",sortable:true,width:80,formatter:function(value,row,index){
				return keepDecimals(value);
			}
		 },
	       {field:"currentOutAmount",title:"本期出库金额",fitColumns:true,resizable:true,align:"center",sortable:true,width:80,formatter:function(value,row,index){
				return keepDecimals(value);
			}
		 },
	       {field:"currentInAmount",title:"本期入库金额",fitColumns:true,resizable:true,align:"center",sortable:true,width:80,formatter:function(value,row,index){
				return keepDecimals(value);
			}
		 },
	       {field:"currentBalanceAmount",title:"本期余额",fitColumns:true,resizable:true,align:"center",sortable:true,width:80,formatter:function(value,row,index){
				return keepDecimals(value);
			}
		 },
	    ]]
	});
	/*查询*/
	$('#goodstypemonthForm .query').click(function(){
		var monthBalanceTimeStr = $('#goodstypemonthForm .queryForm .monthBalanceTimeStr option:selected').val();
		var goodsTypeUrl = $("#goodstypemonthForm .goodsTypeUrl").val();
		/*for(var i=0;i<goodsTypeIds.length;i++){
			if(i == goodsTypeIds.length-1){
				goodsTypeUrls += goodsTypeIds[i];
			}else{
				goodsTypeUrls = goodsTypeUrls + goodsTypeIds[i] + ","
			}
		}
		goodsTypeUrls = $.trim(goodsTypeUrls);*/
		var info = {
			monthBalanceTimeStr:monthBalanceTimeStr,
			goodsTypeUrl:goodsTypeUrl
		}
		$('#goodstypemonthFormdg').datagrid({
			url:'../../reportForms/findTypeMonthBalanceByCondition.do?getMs='+getMS(),
			queryParams:info
		})
		goodstypemonthFormExcel = [
				       		    {name:'goodsTypeUrl',value:goodsTypeUrl},
				      	   		{name:'monthBalanceTimeStr',value:monthBalanceTimeStr}
			         ];
	});
	//打印
	$('#goodstypemonthForm .print').click(function(){
		var monthBalanceTime = $('#goodstypemonthForm .queryForm .monthBalanceTimeStr option:selected').val();
		if(!monthBalanceTime){
			windowControl('请选择一个月结日期');
			return;
		}
		//var goodsTypeUrl = $("#goodstypemonthForm .goodsTypeUrl").val()||'0';
		//$('#goodstypemonthForm .printTypeMonthForm input[name=goodsTypeUrl]').val(goodsTypeUrl);
		$('#goodstypemonthForm .printTypeMonthForm input[name=monthBalanceTime]').val(monthBalanceTime);
		$('#goodstypemonthForm .printTypeMonthForm').submit();
	});

	/*返回*/
	$('#goodstypemonthForm .goback').click(function(){
		$('#goodstypemonthForm .listForm').css('display','block');
		$('#goodstypemonthForm .treearea').css('display','block');
		$('#goodstypemonthForm .chartArea').css('display','none');
		$('#goodstypemonthForm .chartArea #goodstypemonth').html('');
	});
	/*--------------------------------tree------------------------------*/
	var goodsTypeIds=[];
	$('#goodstypemonthFormtg').tree({
        url: "../../treeController/queryTree.do?getMs="+getMS(),
        method:"post",
        animate: false,
        checkbox : false,//是否显示复选框  
        cascadeCheck: false,
        dnd:true,
        onClick: function(node){
        	var goodsTypeUrl = $("#goodstypemonthForm .goodsTypeUrl").val(node.id);
        },
        onCollapse:function(node){
        	$("#goodsTypeUrl").val(node.id);
        	$.ajax({
        		data:{goodsTypeUrl:$("#goodsTypeUrl").val(),state:"onCollapse"},
    			url:"../../treeController/updateTreeState.do?getMs="+getMS(),
    			method:"post"
    		})
        },
        onExpand:function(node){
        	$("#goodsTypeUrl").val(node.id);
        	$.ajax({
        		data:{goodsTypeUrl:$("#goodsTypeUrl").val(),state:"onExpand"},
    			url:"../../treeController/updateTreeState.do?getMs="+getMS(),
    			method:"post"
    		})
        },
        onDrop: function(target,source,point){
        	var targetUrl = $('#goodstypemonthFormtg').tree('getNode', target).id;
        	var targetName = $('#goodstypemonthFormtg').tree('getNode', target).text;
        	//console.log("targetId="+targetId+"source="+source.text+"point="+point);
        	$.ajax({
    			data:{targetUrl:targetUrl,targetName:targetName,sourceUrl:source.id,sourceName:source.text,point:point},
    			url:"../../treeController/dragRepertoryType.do?getMs="+getMS(),
    			method:"post",
    			success: function(data){
    				$('#goodstypemonthFormtg').tree('reload');
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
	
});
/*加载月结日期*/
$.ajax({
	data:{},
	url:'../../reportForms/findMonthBalanceTime.do?getMs='+getMS(),
	type:'post',
	success:function(data){
		var data = $.parseJSON(data);
		var str = '<option></option>';
		for(var i=0;i<data.length;i++){
			str += '<option>'+data[i]+'</option>'
		}
		$('#goodstypemonthForm .monthBalanceTimeStr').append(str);
	},
	error:function(err){
		windowControl(err.status);
	}
});
/*---------------------------------tree函数-----------------------------------*/
function add(){
	$('#goodstypemonthForm .addWindow').css('display','block');
}
function remove(){
	$('#goodstypemonthForm .removeWindow').css('display','block');
}
function edit(){
	$('#goodstypemonthForm .editWindow').css('display','block');
}
/*查看走势图的函数*/
function lookTypeReportGraphic(url){
	$('#goodstypemonthForm .listForm').css('display','none');
	$('#goodstypemonthForm .treearea').css('display','none');
	$('#goodstypemonthForm .chartArea').css('display','block');
	$.ajax({
		url:'../../reportForms/findTypeReportByCondition.do?getMs='+getMS(),
		data:{goodsTypeUrl:url},
		success:function(data){
			var jsonObject = JSON.parse(data);
			var goodsTypeName = jsonObject.goodsTypeName;
			var categories = jsonObject.categories;
			var series = jsonObject.series;
			var chart = new Highcharts.Chart('goodstypemonth',{
				credits: { 
					enabled: false //不显示LOGO 
					},
			    title: {
			        text: '物品类别领用数量走势报表',                                                                                
			        x: -20
			    },
			    subtitle: {
			        text: '物品组别:'+goodsTypeName,
			        x: -20
			    },
			    xAxis: {
			        categories: categories
			    },
			    yAxis: {
			        title: {
			            text: '金额 (元)'
			        },
			        plotLines: [{
			            value: 0,
			            width: 1,
			            color: '#808080'
			        }]
			    },
			    tooltip: {
			        valueSuffix: '元'
			    },
			    legend: {
			        layout: 'vertical',
			        align: 'right',
			        verticalAlign: 'middle',
			        borderWidth: 0
			    },
			    series:series
			});
		},
		fail:function(){
			window.control("无响应");
		}
	});
}