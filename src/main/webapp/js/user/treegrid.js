$(function() {  
	var goodsTypeIds=[];
	$.ajax({
		url:"../../invoice/saveInvoiceRegister.do?getMs="+getMS(),
		success:function(data){
			windowControl(data);
		}
	})
	$('#tg').tree({
        url: "../../treeController/queryTree.do?getMs="+getMS(),
        method:"post",
        animate: false,
        checkbox : true,//是否显示复选框 
        cascadeCheck: false,
        
        dnd:true,
        onClick: function(node){
        	$("#goodsTypeUrl").val(node.id);
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
        	var targetUrl = $('#tg').tree('getNode', target).id;
        	var targetName = $('#tg').tree('getNode', target).text;
        	$.ajax({
    			data:{targetUrl:targetUrl,targetName:targetName,sourceUrl:source.id,sourceName:source.text,point:point,action:"拖动"},
    			url:"../../treeController/dragRepertoryType.do?getMs="+getMS(),
    			method:"post",
    			success: function(data){
    				$('#tg').tree('reload');
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
        	var goodsTypeUrl = $('#goodsTypeUrl').val(node.id);
        	$('#tg').tree('select', node.target);
    		$('#mm').menu('show', {
    			left: e.pageX,
    			top: e.pageY
    		});
		}
    });
	
	//点击确定添加物品类
	$('#tree .addWindow .quedingadd').click(function(){
		var goodsTypeName = $('#tree .addWindow .goodsTypeName').val();
		var goodsTypeUrl = $("#goodsTypeUrl").val();
		
		if(goodsTypeName == null || goodsTypeName == ""){
			windowControl("请输入新增类名");
		}else{
		$.ajax({
			data:{goodsTypeUrl:goodsTypeUrl,goodsTypeName:goodsTypeName,action:"添加"},
			url:"../../treeController/addRepertoryType.do?getMs="+getMS(),
			method:"post",
			success: function(data){
				$('#tg').tree('reload');
				$('#tree .addWindow').css('display','none');
			}
		})
	}
	})
	//点击确定删除物品类
	$('#tree .removeWindow .quedingremove').click(function(){
		var goodsTypeUrl = $("#goodsTypeUrl").val();
		$.ajax({
			data:{goodsTypeUrl:goodsTypeUrl,action:"删除"},
			url:"../../treeController/removeRepertoryType.do?getMs="+getMS(),
			method:"post",
			success: function(data){
				$('#tg').tree('reload');
				$('#tree .removeWindow').css('display','none');
			}
		})
	})
	//点击确定修改物品类
	$('#tree .editWindow .quedingedit').click(function(){
		var goodsTypeUrl = $("#goodsTypeUrl").val();
		var goodsTypeName = $('#tree .editWindow .goodsTypeName').val();
		$.ajax({
			data:{goodsTypeUrl:goodsTypeUrl,goodsTypeName:goodsTypeName,action:"修改"},
			url:"../../treeController/editRepertoryType.do?getMs="+getMS(),
			method:"post",
			success: function(data){
				$('#tg').tree('reload');
				$('#tree .editWindow').css('display','none');
			}
		})
	})
	
	$('#tree .test .test').click(function(){
		$.ajax({
			url:"../../treeController/testState.do?getMs="+getMS(),
			success:function(data){
				windowControl(data);
			}
		})
	})
	
	$('#tree .addWindow .cancel').click(function(){
		$('#tree .addWindow').css('display','none');
	})
	$('#tree .removeWindow .cancel').click(function(){
		$('#tree .removeWindow').css('display','none');
	})
	$('#tree .editWindow .cancel').click(function(){
		$('#tree .editWindow').css('display','none');
	})
	
});  
function add(){
	$('#tree .addWindow').css('display','block');
}
 
function remove(){
	$('#tree .removeWindow').css('display','block');
}

function edit(){
	$('#tree .editWindow').css('display','block');
}

