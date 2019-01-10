var repertorylistExcel = [];
$(function(){
	/*设置页面高100%*/
	$('#repertorylist').css('height',$('#loadarea').height()-31+'px');	
	/*设置list的宽度*/
	$('#repertorylist .listForm').css('width',$('#loadarea').width()-202+'px');
	/*设置表格的高度*/
	$('#repertorylistdg').css('height',$('#repertorylist .listForm').height()-31+'px');
	$(window).resize(function() {
		$('#repertorylist').css('height',$('#loadarea').height()-31+'px');
		$('#repertorylist .listForm').css('width',$('#loadarea').width()-202+'px');
	});
	//cento
	/*****************设置上下移span的title****************/
	$("#repertorylist .popups .writetoexcel .upset").attr("title","上移");
	$("#repertorylist .popups .writetoexcel .downset").attr("title","下移");
	
	/*****************导出到Excel点击弹窗******************/
	$("#repertorylist .toolbar .write").click(function(){
		$('#repertorylist .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#repertorylist .popups .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'goodsPositionName',tableHeader:'仓位',date:false},
			         {propertyName:'goodsName',tableHeader:'物品名称',date:false},
			         {propertyName:'goodsSize',tableHeader:'物品规格',date:false},
			         {propertyName:'totalNumber',propertyType:'Integer',tableHeader:'总数量',date:false},
			         {propertyName:'goodsNumber',propertyType:'Integer',tableHeader:'当前仓位数量',date:false},
			         {propertyName:'unit',tableHeader:'单位',date:false},
			         {propertyName:'repertoryName',tableHeader:'仓库',date:false}
				 ]
		})
	})
	
	/*******************重置按钮点击事件***********************/
	$("#repertorylist .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#repertorylist .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#repertorylist .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#repertorylist .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#repertorylist .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#repertorylist .popups .writetoexcel"));
		
		var repertorylistExcel2 = [];
		for(var i = 0 ; i < repertorylistExcel.length ; i++){
			repertorylistExcel2.push(repertorylistExcel[i]);
		}
		repertorylistExcel2.push({
			name:'jsonString',value:jsonString
		})
		//提交导出excel所需要的参数
		excelplugin.submit({
			type:'post',
			array:repertorylistExcel2,
			action:'../../repertory/writePositionToExcel.do?'
		})
	});
	/*表格数据的加载*/
	$('#repertorylistdg').datagrid({
		//url:'../../repertory/selectRepertoryPosition.do?getMs='+getMS(),
		singleSelect:true,
		columns:[[
 	       // {checkbox:true},
 	       	{field:'_op',title:'操作',width:100,align:'center',
				formatter:function(value,row,index){
					var gpId = "'"+row.goodsPositionId+"'";
					var gpName = "'"+row.goodsPositionName+"'";
					var gName = "'"+row.goodsName+"'";
					var num = "'"+row.totalNumber+"'";
					var rName = "'"+row.repertoryName+"'";
					var gId = "'"+row.goodsId+"'";
					var goodsNumber = "'"+row.goodsNumber+"'";
					if(goodsNumber='undefined'){
						goodsNumber = '0';
					}
					return '<span class="small-button edit" title="修改仓位" onclick="repertorylistupDate('+gpId+','+gpName+','+gName+','+num+','+rName+','+gId+')"></span>'
						+'<span class="small-button delete" title="删除仓位" onclick="repertorylistDel('+gpId+','+goodsNumber+')" delId="'+gpId+'"></span>';
			}},
			{field:'goodsPositionName',title:'仓位',align:'center',width:100},
	        {field:'goodsName',title:'物品名称',align:'center',width:100},
	        {field:'goodsSize',title:'物品规格',align:'center',width:100},
			{field:'totalNumber',title:'总数量',align:'center',width:80},
			{field:'goodsNumber',title:'当前仓位数量',align:'center',width:80,formatter:function(value,row,index){
				var goodsNumber = row.goodsNumber;
				if(goodsNumber == null){
					return '0';
				}else{
					return value;
				}
			}},
			//{field:'warnNumber',title:'警示数量',align:'center',width:80},
			{field:'unit',title:'单位',align:'center',width:50},
			{field:'repertoryName',title:'仓库',align:'center',width:100},
	    ]],
	    toolbar:'#repertorylist .queryForm',
	    pagination:true
	});
	/*条件查询*/
	$('#repertorylist .query').click(function(){
		Query();
	});
	/*******清空按钮清空事件******/
	cleanQuery($('#repertorylist .listForm .queryForm input[type=button]'));
	/*刷新*/
	$('#repertorylist .refresh').click(function(){
		$('#repertorylistdg').datagrid('reload');
		$('#repertorylist .queryForm input').val('');
		$('#repertorylist .query').val('查询');
		$('#repertorylist .queryForm select option:eq(0)').attr('selected',true);
	});
	/*-------------------------------tree---------------------------*/
	var goodsTypeIds=[];
	$('#repertorylisttg').tree({
        url: "../../treeController/queryTree.do?getMs="+getMS(),
        method:"post",
        animate: false,
        checkbox :false,//是否显示复选框  
        cascadeCheck: false,
        dnd:true,
        onClick: function(node){
        	//var goodsTypeUrl =node.id;
        	$("#repertorylist .goodsTypeUrl").val(node.id);
        	/*$('#repertorylistdg').datagrid({
        		url:'../../repertory/selectRepertoryPosition.do?getMs='+getMS(),
        		queryParams:{goodsTypeUrl:goodsTypeUrl},
        	});*/
        },
        onCollapse:function(node){
        	$("#repertorylist .goodsTypeUrl").val(node.id);
        	$.ajax({
        		data:{goodsTypeUrl:$("#goodsTypeUrl").val(),state:"onCollapse"},
    			url:"../../treeController/updateTreeState.do?getMs="+getMS(),
    			method:"post"
    		})
        },
        onExpand:function(node){
        	$("#repertorylist .goodsTypeUrl").val(node.id);
        	$.ajax({
        		data:{goodsTypeUrl:$("#goodsTypeUrl").val(),state:"onExpand"},
    			url:"../../treeController/updateTreeState.do?getMs="+getMS(),
    			method:"post"
    		})
        },
        onDrop: function(target,source,point){
        	var targetUrl = $('#repertorylisttg').tree('getNode', target).id;
        	var targetName = $('#repertorylisttg').tree('getNode', target).text;
        	//console.log("targetId="+targetId+"source="+source.text+"point="+point);
        	$.ajax({
    			data:{targetUrl:targetUrl,targetName:targetName,sourceUrl:source.id,sourceName:source.text,point:point},
    			url:"../../treeController/dragRepertoryType.do?getMs="+getMS(),
    			method:"post",
    			success: function(data){
    				$('#repertorylisttg').tree('reload');
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
        	var goodsTypeUrl = $('#repertorylist .goodsTypeUrl').val(node.id);
        	$('#repertorylisttg').tree('select', node.target);
    		$('#repertorylistmm').menu('show', {
    			left: e.pageX,
    			top: e.pageY
    		});
		}*/
    });
	
	//点击确定添加物品类
	/*$('#repertorylist .addWindow .quedingadd').click(function(){
		var goodsTypeName = $('#findgoods .addWindow .goodsTypeName').val();
		var goodsTypeUrl = $("#findgoods .goodsTypeUrl").val();
		
		if(goodsTypeName == null || goodsTypeName == ""){
			windowControl("请输入新增类名");
		}else{
			$.ajax({
				data:{goodsTypeUrl:goodsTypeUrl,goodsTypeName:goodsTypeName},
				url:"../../treeController/addRepertoryType.do?getMs="+getMS(),
				method:"post",
				success: function(data){
					$('#repertorylisttg').tree('reload');
					$('#repertorylist .addWindow').css('display','none');
					$('#repertorylist .addWindow input[type=text]').val('');
				}
			});
		}
	});
	//点击确定删除物品类
	$('#repertorylist .removeWindow .quedingremove').click(function(){
		var goodsTypeUrl = $("#findgoods .goodsTypeUrl").val();
		$.ajax({
			data:{goodsTypeUrl:goodsTypeUrl},
			url:"../../treeController/removeRepertoryType.do?getMs="+getMS(),
			method:"post",
			success: function(data){
				$('#repertorylisttg').tree('reload');
				$('#repertorylist .removeWindow').css('display','none');
				$('#repertorylist .removeWindow input[type=text]').val('');
			}
		})
	});
	//点击确定修改物品类
	$('#repertorylist .editWindow .quedingedit').click(function(){
		var goodsTypeUrl = $("#findgoods .goodsTypeUrl").val();
		var goodsTypeName = $('#findgoods .editWindow .goodsTypeName').val();
		$.ajax({
			data:{goodsTypeUrl:goodsTypeUrl,goodsTypeName:goodsTypeName},
			url:"../../treeController/editRepertoryType.do?getMs="+getMS(),
			method:"post",
			success: function(data){
				$('#repertorylisttg').tree('reload');
				$('#repertorylist .editWindow').css('display','none');
				$('#repertorylist .editWindow input[type=text]').val('');
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
	$('#repertorylist .listForm .repertoryName').html(str);
	},
	error:function(error){
		windowControl(error.status);
	}
})
/*---------------------------------tree函数-----------------------------------*/
/*function add(){
	$('#repertorylist .addWindow').css('display','block');
}
function remove(){
	$('#repertorylist .removeWindow').css('display','block');
}
function edit(){
	$('#repertorylist .editWindow').css('display','block');
}*/
/*定义一个全局变量*/
var dataInfo;
/*------操作函数---------*/
/*仓位信息的修改*/
function repertorylistupDate(gpId,gpName,gName,num,rName,gId){
	$('#repertorylist .popups .update').css('display','block');
	$('#repertorylist .popups .update .gpName').val(gpName);
	$('#repertorylist .popups .update .gName').val(gName);
	$('#repertorylist .popups .update .num').val(num);
	$('#repertorylist .popups .update .rName').val(rName);
	$('#repertorylist .popups .update .confirm').unbind('click');
	$('#repertorylist .popups .update .confirm').click(function(){
		var goodsPositionName = $('#repertorylist .popups .update .gpName').val();
		var totalNumber = $('#repertorylist .popups .update .num').val();
		var dataInfo = {
			goodsPositionId:gpId,
			goodsPositionName:goodsPositionName
			//goodsName:gName,
			//repertoryName:rName,
		}
		$.ajax({
			data:dataInfo,
			url:'../../repertory/updateRepertoryPosition.do?getMs='+getMS(),
			type:'post',
			success:function(data){
				console.log(data);
				if(data == 500){
					windowControl('服务器异常');
				}else if(data == 400){
					windowControl('仓位修改信息失败');
				}else{
					windowControl('仓位修改信息成功');
					$('#repertorylist .popups .update').css('display','none');
					$('#repertorylist .popups .update .popuparea input[type=text]').val('');
					$('#repertorylist .popups .update .popuparea textarea').val('');
					$('#repertorylistdg').datagrid('reload');
					
				}
				
			},
			error:function(err){
				windowControl('网络异常');
			}
		});
	});
}
/*仓位信息删除*/
function repertorylistDel(gpId,goodsNumber){
	if(goodsNumber <= 0){
		var dataInfo = {goodsPositionId:gpId};
		ui.confirm('确定删除该仓位吗?',function(z){
			if(z){
				$.ajax({
					data:dataInfo,
					url:'../../repertory/deleteRepertoryPosition.do?getMs='+getMS(),
					type:'post',
					success:function(data){
						if(data == 500){
							windowControl('服务器异常');
						}else if(data == 400){
							windowControl('删除仓位失败');
						}else{
							windowControl('删除仓位成功');
							$('#repertorylistdg').datagrid("reload");
						}
					},
					error:function(err){
						windowControl('网络异常');
					}
				});
			}
		},false);
	}else{
		windowControl('该仓位还有物品不能删除');
	}
	
}
/* 查询*/
function Query(){
	var goodsName = $.trim($('#repertorylist .goodsName').val());
	var gooosSize = $.trim($('#repertorylist .goodsSize').val());
	var goodsNumSm = $.trim($('#repertorylist .goodsNumSm').val());
	var goodsNumBg = $.trim($('#repertorylist .goodsNumBg').val());
	var goodsPositionName = $.trim($('#repertorylist .goodsPosition').val());
	var repertoryId = $('#repertorylist .listForm .repertoryName').val();
	var goodsTypeUrl = $("#repertorylist .goodsTypeUrl").val()||'';
	var dataInfo;
	/*判断数量区间是否只有写了一个 写了一个补齐*/
	if(goodsNumSm == ''&&goodsNumBg >= 0){  
		goodsNumSm = '0';
	}else if(goodsNumSm >= 0&&goodsNumBg == ''){
		goodsNumSm = '100000000000000000';
	}
	if(repertoryId == '--请选择--'){
		dataInfo = {
			goodsName:goodsName,
			goodsSize:gooosSize,
			beginNumber:goodsNumSm,
			endNumber:goodsNumBg,
			goodsPositionName:goodsPositionName,
			goodsTypeUrl:goodsTypeUrl
		};
	}else {
		dataInfo = {
			goodsName:goodsName,
			goodsSize:gooosSize,
			beginNumber:goodsNumSm,
			endNumber:goodsNumBg,
			goodsPositionName:goodsPositionName,
			repertoryId:repertoryId,
			goodsTypeUrl:goodsTypeUrl
		};
	}
	repertorylistExcel = [
		{name:'goodsName',value:goodsName},
	   {name:'goodsSize',value:gooosSize},
		{name:'beginNumber',value:goodsNumSm},
		{name:'endNumber',value:goodsNumBg},
		{name:'repertoryId',value:repertoryId},
		{name:'goodsPositionName',value:goodsPositionName},
		{name:'goodsTypeUrl',value:goodsTypeUrl}
	];
	$('#repertorylistdg').datagrid({
		url:"../../repertory/selectRepertoryPosition.do?getMs="+getMS(),
		queryParams:dataInfo
	});
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
    var inputArryTk= $(".popuparea input[disabled!='disabled'][type!='button']");
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