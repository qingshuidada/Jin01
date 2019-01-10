$(function(){
	/*设置页面高100%*/
	$('#goodsdetails').css('height',$('#loadarea').height()-31+'px');
	/*设置list的宽度*/
	$('#goodsdetails .listForm').css('width',$('#loadarea').width()-202+'px');
	/*设置表格的高度*/
	$('#goodsdetailsdg').css('height',$('#goodsdetails .listForm').height()-31+'px');
	$(window).resize(function() {
		$('#goodsdetails').css('height',$('#loadarea').height()-31+'px');
		$('#goodsdetails .listForm').css('width',$('#loadarea').width()-202+'px');
	});
	/*----表格化----*/
	$('#goodsdetailsdg').datagrid({
		//url:'',
	    singleSelect:true,
	    toolbar:'#goodsdetails .queryForm',
	    pagination:true,
		columns:[[
			{field:'物品名',title:'物品名称',width:100},
			{field:'规格',title:'物品规格',width:100},
			{field:'数量',title:'数量',width:50},
			{field:'单位',title:'单位',width:50},
			{field:'上期余量',title:'上期余量',width:80},
			{field:'上期余额',title:'上期余额',width:80},
			{field:'本期入库数量',title:'本期入库数量',width:80},
			{field:'本期入库金额',title:'本期入库金额',width:80},
			{field:'本期出库数量',title:'本期出库数量',width:80},
			{field:'本期出库金额',title:'本期出库金额',width:80},
			{field:'本期余量',title:'本期余量',width:80},
			{field:'本期余额',title:'本期余额',width:80,align:'center'},
			{field:'updateTime',title:'跟新时间',width:100,align:'center',width:100},
			{field:'_op',title:'操作',width:100,align:'center',width:100,
				formatter:function(value,row,index){
					return '<span class="small-button edit" onclick="findgoodsupDate('+id+')">修改</span>'
					+'<span class="small-button delete" onclick="findgoodsDel('+id+')">删除</span>';
			}}
	    ]],
	});
	/*条件查询*/
	$('#goodsdetails .query').click(function(){
		var goodsName = $.trim($('#goodsdetails .goodsName').val());
		var gooosSize = $.trim($('#goodsdetails .goodsSize').val());
		var goodsNumSm = $.trim($('#goodsdetails .goodsNumSm').val());
		var goodsNumBg = $.trim($('#goodsdetails .goodsNumBg').val());
		var getDepartmentName = $.trim($('#goodsdetails .departmentName option:selected').val());
		var repertoryId = $('#goodsdetails .listForm .repertoryName').val();
		var dataInfo = {
				goodsName:goodsName,
				gooosSize:gooosSize,
				goodsNumSm:goodsNumSm,
				goodsNumBg:goodsNumBg,
				getDepartmentName:getDepartmentName,
				repertoryId:repertoryId
			};
		/*$('#goodsdetailsdg').datagrid({
			url:"../../personnel/queryInviteApply.do?getMs="+getMS(),
			queryParams:dataInfo
		});*/
	});
	/*刷新*/
	$('#goodsdetails .refresh').click(function(){
		/*$('##goodsdetailsdg').datagrid({
			url:"../../personnel/queryInviteApply.do?getMs="+getMS(),
		});*/
		$('#goodsdetails .queryForm input').val('');
		$('#goodsdetails .query').val('查询');
		$('#goodsdetails .queryForm select option:eq(0)').attr('selected',true);
	});
	/*测试*/
	/*$.ajax({
		data:{},
		url:'../../repertory/selectRepertoryPosition.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			console.log(data);
			$(this).css('display','none');
		},
		error:function(err){
			windowControl(err.status);
		}
	})*/
	/*--------------------------------tree------------------------------*/
	var goodsTypeIds=[];
	$('#goodsdetailstg').tree({
        url: "../../treeController/queryTree.do?getMs="+getMS(),
        method:"post",
        animate: false,
        checkbox : false,//是否显示复选框  
        cascadeCheck: false,
        dnd:true,
        onClick: function(node){
        	var goodsTypeUrl = node.id;
        	$('#findgoodsdg').datagrid({
        		url:'../../repertory/selectGoodsByTime.do?getMs='+getMS(),
        		queryParams:{goodsTypeUrl:goodsTypeUrl},
        	});
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
        	var targetUrl = $('#goodsdetailstg').tree('getNode', target).id;
        	var targetName = $('#goodsdetailstg').tree('getNode', target).text;
        	//console.log("targetId="+targetId+"source="+source.text+"point="+point);
        	$.ajax({
    			data:{targetUrl:targetUrl,targetName:targetName,sourceUrl:source.id,sourceName:source.text,point:point},
    			url:"../../treeController/dragRepertoryType.do?getMs="+getMS(),
    			method:"post",
    			success: function(data){
    				$('#goodsdetailstg').tree('reload');
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
        	var goodsTypeUrl = $('#goodsdetails .goodsTypeUrl').val(node.id);
        	$('#goodsdetailstg').tree('select', node.target);
    		$('#goodsdetailsmm').menu('show', {
    			left: e.pageX,
    			top: e.pageY
    		});
		}*/
    });
	//点击确定添加物品类
	/*$('#goodsdetails .addWindow .quedingadd').click(function(){
		var goodsTypeName = $('#goodsdetails .addWindow .goodsTypeName').val();
		var goodsTypeUrl = $("#goodsdetails .goodsTypeUrl").val();
		
		if(goodsTypeName == null || goodsTypeName == ""){
			windowControl("请输入新增类名");
		}else{
			$.ajax({
				data:{goodsTypeUrl:goodsTypeUrl,goodsTypeName:goodsTypeName},
				url:"../../treeController/addRepertoryType.do?getMs="+getMS(),
				method:"post",
				success: function(data){
					$('#goodsdetailstg').tree('reload');
					$('#goodsdetails .addWindow').css('display','none');
					$('#goodsdetails .addWindow input[type=text]').val('');
				}
			});
		}
	});
	//点击确定删除物品类
	$('#goodsdetails .removeWindow .quedingremove').click(function(){
		var goodsTypeUrl = $("#goodsdetails .goodsTypeUrl").val();
		$.ajax({
			data:{goodsTypeUrl:goodsTypeUrl},
			url:"../../treeController/removeRepertoryType.do?getMs="+getMS(),
			method:"post",
			success: function(data){
				$('#goodsdetailstg').tree('reload');
				$('#goodsdetails .removeWindow').css('display','none');
				$('#goodsdetails .removeWindow input[type=text]').val('');
			}
		})
	});
	//点击确定修改物品类
	$('#goodsdetails .editWindow .quedingedit').click(function(){
		var goodsTypeUrl = $("#goodsdetails .goodsTypeUrl").val();
		var goodsTypeName = $('#goodsdetails .editWindow .goodsTypeName').val();
		$.ajax({
			data:{goodsTypeUrl:goodsTypeUrl,goodsTypeName:goodsTypeName},
			url:"../../treeController/editRepertoryType.do?getMs="+getMS(),
			method:"post",
			success: function(data){
				$('#goodsdetailstg').tree('reload');
				$('#goodsdetails .editWindow').css('display','none');
				$('#goodsdetails .editWindow input[type=text]').val('');
			}
		})
	});*/
});
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
	$('#goodsdetails .listForm .repertoryName').html(str);
	},
	error:function(error){
		windowControl(error.status);
	}
})
/*---------------------------------tree函数-----------------------------------*/
/*function add(){
	$('#goodsdetails .addWindow').css('display','block');
}
function remove(){
	$('#goodsdetails .removeWindow').css('display','block');
}
function edit(){
	$('#goodsdetails .editWindow').css('display','block');
}*/