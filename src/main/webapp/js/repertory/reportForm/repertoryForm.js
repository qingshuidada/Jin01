$(function(){
	/*设置页面高100%*/
	$('#repertoryForm').css('height',$('#loadarea').height()-31+'px');
	/*设置list的宽度*/
	$('#repertoryForm .listForm').css('width',$('#loadarea').width()-202+'px');
	/*设置表格的高度*/
	$('#repertoryFormdg').css('height',$('#repertoryForm .listForm').height()-31+'px');
	/*表格数据的加载*/
	$('#repertoryFormdg').datagrid({
		//url:'',
	    toolbar:'#repertoryForm .queryForm',
	    pagination:true,
		columns:[[
 	        {checkbox:true},
 	        {field:'_op',title:'操作',width:100,align:'center',
				formatter:function(value,row,index){
					var id = "'"+row.Id+"'";
					return '<span class="small-button edit" title="查看折线走势图" onclick="repertoryFormChart('+id+')"></span>'
			}},
			{field:'仓位',title:'仓位',align:'center',width:100},
	        {field:'物品名称',title:'物品名称',align:'center',width:100},
	        {field:'物品规格',title:'物品规格',align:'center',width:100},
			{field:'领用数量',title:'数量',align:'center',width:50},
			{field:'领用数量',title:'总数量',align:'center',width:50},
			{field:'单位',title:'单位',align:'center',width:50},
			{field:'仓库',title:'仓库',width:100,align:'center',
				formatter:function(value,row,index){
					return '1仓库';
			}},
	    ]]
	});
	/*刷新*/
	$('#repertoryForm .refresh').click(function(){
		/*$('#repertoryoutdg').datagrid({
			url:"../../personnel/queryInviteApply.do?getMs="+getMS(),
		});*/
		$('#repertoryForm .queryForm input').val('');
		$('#repertoryForm .query').val('查询');
		$('#repertoryForm .queryForm select option:eq(0)').attr('selected',true);
	});
	/*--------------------------------tree------------------------------*/
	var goodsTypeIds=[];
	$('#repertoryFormtg').tree({
        url: "../../treeController/queryTree.do?getMs="+getMS(),
        method:"post",
        animate: false,
        checkbox : true,//是否显示复选框  
        cascadeCheck: false,
        dnd:true,
        onClick: function(node){
        	var goodsTypeUrl = $("#repertoryForm .goodsTypeUrl").val(node.id);
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
        	var targetUrl = $('#repertoryFormtg').tree('getNode', target).id;
        	var targetName = $('#repertoryFormtg').tree('getNode', target).text;
        	//console.log("targetId="+targetId+"source="+source.text+"point="+point);
        	$.ajax({
    			data:{targetUrl:targetUrl,targetName:targetName,sourceUrl:source.id,sourceName:source.text,point:point},
    			url:"../../treeController/dragRepertoryType.do?getMs="+getMS(),
    			method:"post",
    			success: function(data){
    				$('#repertoryFormtg').tree('reload');
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
      /*  onContextMenu : function(e,node){
        	e.preventDefault();
        	var goodsTypeUrl = $('#repertoryForm .goodsTypeUrl').val(node.id);
        	$('#repertoryFormtg').tree('select', node.target);
    		$('#repertoryFormmm').menu('show', {
    			left: e.pageX,
    			top: e.pageY
    		});
		}*/
    });
	
	//点击确定添加物品类
	$('#repertoryForm .addWindow .quedingadd').click(function(){
		var goodsTypeName = $('#repertoryForm .addWindow .goodsTypeName').val();
		var goodsTypeUrl = $("#repertoryForm .goodsTypeUrl").val();
		
		if(goodsTypeName == null || goodsTypeName == ""){
			windowControl("请输入新增类名");
		}else{
			$.ajax({
				data:{goodsTypeUrl:goodsTypeUrl,goodsTypeName:goodsTypeName},
				url:"../../treeController/addRepertoryType.do?getMs="+getMS(),
				method:"post",
				success: function(data){
					$('#repertoryFormtg').tree('reload');
					$('#repertoryForm .addWindow').css('display','none');
					$('#repertoryForm .addWindow input[type=text]').val('');
				}
			});
		}
	});
	//点击确定删除物品类
	$('#repertoryForm .removeWindow .quedingremove').click(function(){
		var goodsTypeUrl = $("#repertoryForm .goodsTypeUrl").val();
		$.ajax({
			data:{goodsTypeUrl:goodsTypeUrl},
			url:"../../treeController/removeRepertoryType.do?getMs="+getMS(),
			method:"post",
			success: function(data){
				$('#repertoryFormtg').tree('reload');
				$('#repertoryForm .removeWindow').css('display','none');
				$('#repertoryForm .removeWindow input[type=text]').val('');
			}
		})
	});
	//点击确定修改物品类
	$('#repertoryForm .editWindow .quedingedit').click(function(){
		var goodsTypeUrl = $("#repertoryForm .goodsTypeUrl").val();
		var goodsTypeName = $('#repertoryForm .editWindow .goodsTypeName').val();
		$.ajax({
			data:{goodsTypeUrl:goodsTypeUrl,goodsTypeName:goodsTypeName},
			url:"../../treeController/editRepertoryType.do?getMs="+getMS(),
			method:"post",
			success: function(data){
				$('#repertoryFormtg').tree('reload');
				$('#repertoryForm .editWindow').css('display','none');
				$('#repertoryForm .editWindow input[type=text]').val('');
			}
		})
	});
});
/*---------------------------------tree函数-----------------------------------*/
/*function add(){
	$('#repertoryForm .addWindow').css('display','block');
}
function remove(){
	$('#repertoryForm .removeWindow').css('display','block');
}
function edit(){
	$('#repertoryForm .editWindow').css('display','block');
}*/
/*查看折线图函数*/
function repertoryFormChart(id){
	
}