$(function(){
	/*设置页面高100%*/
	$('#goodspriceForm').css('height',$('#loadarea').height()-31+'px');
	/*设置list的宽度*/
	$('#goodspriceForm .listForm').css('width',$('#loadarea').width()-202+'px');
	/*设置chart的宽度*/
	$('#goodspriceForm .chartArea').css({
		'width':$('#loadarea').width()+'px',
		'height':$('#loadarea').height()-31+'px',
	});
	$('#goodspriceForm #container').css({
		'height':$('#loadarea').height()*.8+'px',
		'width':($('#loadarea').width()-31)*.8+'px',
	});
	/*设置表格的高度*/
	$('#goodspriceFormdg').css('height',$('#goodspriceForm .listForm').height()-30+'px');
	/*表格数据的加载*/
	$('#goodspriceFormdg').datagrid({
		//url:'../../repertory/selectGoodsByTime.do?getMs='+getMS(),
		toolbar:'#goodspriceForm .queryForm',
	    pagination:true,
		columns:[[
			{field:'_op',title:'操作',width:100,align:'center',width:100,
				formatter:function(value,row,index){
					var id = "'"+row.goodsId+"'";
					var name = "'"+row.goodsName+"'";
					return '<span class="small-button look" title="查看价格走势图" onclick="lookGoodsPriceForm('+id+','+name+')"></span>';
			}},
			{field:'goodsName',title:'物品名',width:100,align:'center',},
			{field:'goodsSize',title:'规格',width:100,align:'center',},
			{field:'totalNumber',title:'数量',width:50,align:'center',},
			{field:'unit',title:'单位',width:50,align:'center',},
			{field:'warnNumber',title:'警示数量',width:80,align:'center',},
			{field:'latestUnitPrice',title:'最新价格',width:80,align:'center',formatter:function(value,row,index){
					return keepDecimals(value);
				}
			 },
			{field:'updateTimeStr',title:'更新日期',width:140,align:'center',},
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
	/*条件查询*/
	$('#goodspriceForm .query').click(function(){
		var goodsName = $.trim($('#goodspriceForm .goodsName').val());
		var goodsSize = $.trim($('#goodspriceForm .goodsSize').val());
		var goodsNumSm = $.trim($('#goodspriceForm .goodsNumSm').val());
		var goodsNumBg = $.trim($('#goodspriceForm .goodsNumBg').val());
		var goodsPosition = $.trim($('#goodspriceForm .goodsPosition').val());
		var goodsTypeUrl = $("#goodspriceForm .goodsTypeUrl").val();
		var dataInfo = {
			goodsName:goodsName,
			goodsSize:goodsSize,
			beginNumber:goodsNumSm,
			endNumber:goodsNumBg,
			goodsPosition:goodsPosition,
			goodsTypeUrl:goodsTypeUrl||'0'
		};
		$('#goodspriceFormdg').datagrid({
			url:"../../repertory/selectGoodsByTime.do?getMs="+getMS(),
			queryParams:dataInfo
		});
	});
	/*刷新*/
	$('#goodspriceForm .refresh').click(function(){
		$('#goodspriceFormdg').datagrid({
			url:"../../repertory/selectGoodsByTime.do?getMs="+getMS(),
		});
		$('#goodspriceForm .queryForm input').val('');
		$('#goodspriceForm .query').val('查询');
		$('#goodspriceForm .queryForm select option:eq(0)').attr('selected',true);
	});
	$('#goodspriceForm .chartArea .goback').click(function(){
		$('#goodspriceForm .listForm').css('display','block');
		$('#goodspriceForm .treearea').css('display','block');
		$('#goodspriceForm .chartArea').css('display','none');
		$('#goodspriceForm .chartArea #container').html('');
	});
	/*--------------------------------tree------------------------------*/
	var goodsTypeIds=[];
	$('#goodspriceFormtg').tree({
        url: "../../treeController/queryTree.do?getMs="+getMS(),
        method:"post",
        animate: false,
        //checkbox : true,//是否显示复选框  
        cascadeCheck: false,
        dnd:true,
        onClick: function(node){
        	var goodsTypeUrl = $("#goodspriceForm .goodsTypeUrl").val(node.id);
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
        	var targetUrl = $('#goodspriceFormtg').tree('getNode', target).id;
        	var targetName = $('#goodspriceFormtg').tree('getNode', target).text;
        	//console.log("targetId="+targetId+"source="+source.text+"point="+point);
        	$.ajax({
    			data:{targetUrl:targetUrl,targetName:targetName,sourceUrl:source.id,sourceName:source.text,point:point},
    			url:"../../treeController/dragRepertoryType.do?getMs="+getMS(),
    			method:"post",
    			success: function(data){
    				$('#goodspriceFormtg').tree('reload');
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
        /*onContextMenu : function(e,node){
        	e.preventDefault();
        	var goodsTypeUrl = $('#goodspriceForm .goodsTypeUrl').val(node.id);
        	$('#goodspriceFormtg').tree('select', node.target);
    		$('#goodspriceFormmm').menu('show', {
    			left: e.pageX,
    			top: e.pageY
    		});
		}*/
    });
	
	//点击确定添加物品类
	/*$('#goodspriceForm .addWindow .quedingadd').click(function(){
		var goodsTypeName = $('#goodspriceForm .addWindow .goodsTypeName').val();
		var goodsTypeUrl = $("#goodspriceForm .goodsTypeUrl").val();
		
		if(goodsTypeName == null || goodsTypeName == ""){
			windowControl("请输入新增类名");
		}else{
			$.ajax({
				data:{goodsTypeUrl:goodsTypeUrl,goodsTypeName:goodsTypeName},
				url:"../../treeController/addRepertoryType.do?getMs="+getMS(),
				method:"post",
				success: function(data){
					$('#goodspriceFormtg').tree('reload');
					$('#goodspriceForm .addWindow').css('display','none');
					$('#goodspriceForm .addWindow input[type=text]').val('');
				}
			});
		}
	});
	//点击确定删除物品类
	$('#goodspriceForm .removeWindow .quedingremove').click(function(){
		var goodsTypeUrl = $("#goodspriceForm .goodsTypeUrl").val();
		$.ajax({
			data:{goodsTypeUrl:goodsTypeUrl},
			url:"../../treeController/removeRepertoryType.do?getMs="+getMS(),
			method:"post",
			success: function(data){
				$('#goodspriceFormtg').tree('reload');
				$('#goodspriceForm .removeWindow').css('display','none');
				$('#goodspriceForm .removeWindow input[type=text]').val('');
			}
		})
	});
	//点击确定修改物品类
	$('#goodspriceForm .editWindow .quedingedit').click(function(){
		var goodsTypeUrl = $("#goodspriceForm .goodsTypeUrl").val();
		var goodsTypeName = $('#goodspriceForm .editWindow .goodsTypeName').val();
		$.ajax({
			data:{goodsTypeUrl:goodsTypeUrl,goodsTypeName:goodsTypeName},
			url:"../../treeController/editRepertoryType.do?getMs="+getMS(),
			method:"post",
			success: function(data){
				$('#goodspriceFormtg').tree('reload');
				$('#goodspriceForm .editWindow').css('display','none');
				$('#goodspriceForm .editWindow input[type=text]').val('');
			}
		})
	});*/
});
/*---------------------------------tree函数-----------------------------------*/
/*function add(){
	$('#goodspriceForm .addWindow').css('display','block');
}
function remove(){
	$('#goodspriceForm .removeWindow').css('display','block');
}
function edit(){
	$('#goodspriceForm .editWindow').css('display','block');
}*/
/*查看走势图*/
function lookGoodsPriceForm(id,name){
	$('#goodspriceForm .listForm').css('display','none');
	$('#goodspriceForm .treearea').css('display','none');
	$('#goodspriceForm .chartArea').css('display','block');
	$.ajax({
		data:{goodsId:id,goodsName:name},
		url:"../../reportForms/getPriceTrendData.do?getMs="+getMS(),
		success:function(data){
			var jsonObject = JSON.parse(data);
			var data = jsonObject.data;
			var categories = jsonObject.categories;
			var name = jsonObject.name;
			var distance = data.length - categories.length;
			var flag = false;
			var flag1 = false;  	
			var categoriesz = [];
			var dataz = []; 
			for (var i = categories.length-1; i > -1; i--) {
			    categoriesz.push(categories[i]);
			}
			for (var i = data.length-1; i > -1; i--) {
			    dataz.push(data[i]);
			}
			if(distance<0){
				for (var i = 0; i <categoriesz.length; i++) {
					if(i == Math.abs(distance)-1){
						flag = true;
						categoriesz.splice(0,Math.abs(distance));
					}
				}
			}
			var chart = new Highcharts.Chart('container', {
				credits: { 
					enabled: false //不显示LOGO 
					},
			    title: {
			        text: '物品价格走势图',
			        x: -20
			    },
			    subtitle: {
			        text: '数据来源: 数据库',
			        x: -20
			    },
			    xAxis: {
			        categories: categoriesz//['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
			    },
			    yAxis: {
			        title: {
			            text: '价格(¥)'
			        },
			        plotLines: [{
			            value: 0,
			            width: 1,
			            color: '#808080'
			        }]
			    },
			    tooltip: {
			        valueSuffix: '¥'
			    },
			    legend: {
			        layout: 'vertical',
			        align: 'right',
			        verticalAlign: 'middle',
			        borderWidth: 0
			    },
			    series: [{
			        name: name,
			        data:  dataz //[7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
			    }]
			});
		}
	});
}



