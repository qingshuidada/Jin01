var goodsmonthFormExcel = [];
$(function(){
	/*设置页面高100%*/
	//$('#goodsmonthForm').css('height',$('#loadarea').height()-31+'px');
	/*设置list的宽度*/
	$('#goodsmonthForm .listForm').css('width',$('#loadarea').width()-4+'px');
	$('#goodsmonthForm .listForm').css('height',$('#loadarea').height()-32+'px');
	/*设置chart的宽度*/
	/*$('#goodsmonthForm .chartArea').css({
		'width':$('#loadarea').width()+'px',
		'height':$('#loadarea').height()-31+'px'
	});*/
	/*设置表格的高度*/
	$('#goodsmonthFormdg').css('height',$('#loadarea').height()-62+'px');
	
	/*****************设置上下移span的title****************/
	$("#goodsmonthForm .popups .writetoexcel .upset").attr("title","上移");
	$("#goodsmonthForm .popups .writetoexcel .downset").attr("title","下移");
	
	/*****************导出到Excel点击弹窗******************/
	$("#goodsmonthForm .toolbar .write").click(function(){
		$('#goodsmonthForm .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#goodsmonthForm .popups .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'goodsName',tableHeader:'物品名称',date:false},
			         {propertyName:'goodsSize',tableHeader:'物品规格',date:false},
			         {propertyName:'lastBalanceNumber',propertyType:'Integer',tableHeader:'上期余量',date:false},
			         {propertyName:'lastBalanceAmount',propertyType:'Double',tableHeader:'上期余额',date:false,formatter:function(value,row,index){
							return keepDecimals(value);
						}
					 },
			         {propertyName:'currentOutNumber',propertyType:'Integer',tableHeader:'本期出库数量',date:false},
			         {propertyName:'currentOutAmount',propertyType:'Double',tableHeader:'本期出库金额',date:false,formatter:function(value,row,index){
							return keepDecimals(value);
						}
					 },
			         {propertyName:'currentInNumber',propertyType:'Integer',tableHeader:'本期入库数量',date:false},
			         {propertyName:'currentInAmount',propertyType:'Double',tableHeader:'本期入库金额',date:false,formatter:function(value,row,index){
							return keepDecimals(value);
						}
					 },
			         {propertyName:'currentBalanceNumber',propertyType:'Integer',tableHeader:'本期余量',date:false},
			         {propertyName:'currentBalanceAmount',propertyType:'Double',tableHeader:'本期余额',date:false,formatter:function(value,row,index){
							return keepDecimals(value);
						}
					 },
			         {propertyName:'monthBalanceTimeStr',tableHeader:'月结日期',date:true},
			         {propertyName:'startTimeStr',tableHeader:'开始日期',date:true},
			         {propertyName:'endTimeStr',tableHeader:'结束日期',date:true}
				 ]
		})
	})
	
	/*******************重置按钮点击事件***********************/
	$("#goodsmonthForm .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#goodsmonthForm .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#goodsmonthForm .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#goodsmonthForm .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#goodsmonthForm .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#goodsmonthForm .popups .writetoexcel"));
		
		var goodsmonthFormExcel2 = [];
		for(var i = 0 ; i < goodsmonthFormExcel.length ; i++){
			goodsmonthFormExcel2.push(goodsmonthFormExcel[i]);
		}
		goodsmonthFormExcel2.push({
			name:'jsonString',value:jsonString
		})
		//提交导出excel所需要的参数
		excelplugin.submit({
			type:'post',
			array:goodsmonthFormExcel2,
			action:'../../reportForms/writeMonthFormToExcel.do?'
		})
	});
	
	//打印
	$('#goodsmonthForm .print').click(function(){
		var monthBalanceTime = $('#goodsmonthForm .queryForm .monthBalanceTimeStr option:selected').val()||'%';
		var goodsName = $("#goodsmonthForm .goodsName").val();
		var goodsSize = $("#goodsmonthForm .goodsSize").val();
		$('#goodsmonthForm .printGoodsMonthForm input[name=goodsName]').val(goodsName);
		$('#goodsmonthForm .printGoodsMonthForm input[name=goodsSize]').val(goodsSize);
		$('#goodsmonthForm .printGoodsMonthForm input[name=monthBalanceTime]').val(monthBalanceTime);
		$('#goodsmonthForm .printGoodsMonthForm').submit();
	});
	/*网格数据加载*/
	$('#goodsmonthFormdg').datagrid({
		//url:'../../reportForms/findGoodsMonthBalanceByCondition.do?getMs='+getMS(),
		pagination:true,
		toolbar:'#goodsmonthForm .queryForm',
		onLoadSuccess:function(data){
			var goodsName = $.trim($('#goodsmonthForm .queryForm .goodsName').val());
			var goodsSize = $.trim($('#goodsmonthForm .queryForm .goodsSize').val());
			var monthBalanceTimeStr = $.trim($('#goodsmonthForm .queryForm .monthBalanceTimeStr').val());
			var info = {
				goodsName:goodsName,
				goodsSize:goodsSize,
				monthBalanceTimeStr:monthBalanceTimeStr,
			}
			$.ajax({
				url:'../../reportForms/findSumGoodsMonthBalance.do?getMs='+getMS(),
				data:info,
				success:function(data){
					adjustsumBar('goodsmonthForm');
					addsumBarMonthForm('goodsmonthForm',data);
				},
				error:function(err){
				}
			})
		},
		columns:[[
	       {field:"goodsName",title:"物品名称",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
	       {field:"goodsSize",title:"物品规格",fitColumns:true,sortable:true,align:"center",sortable:true,width:100},
	       {field:"lastBalanceNumber",title:"上期余量",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
	       {field:"lastBalanceAmount",title:"上期余额",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
	       {field:"currentOutNumber",title:"本期出库数量",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
	       {field:"currentOutAmount",title:"本期出库金额",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
	       {field:"currentInNumber",title:"本期入库数量",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
	       {field:"currentInAmount",title:"本期入库金额",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
	       {field:"currentBalanceNumber",title:"本期余量",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
	       {field:"currentBalanceAmount",title:"本期余额",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
	       {field:"monthBalanceTimeStr",title:"月结日期",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
	       {field:"startTimeStr",title:"开始日期",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
	       {field:"endTimeStr",title:"结束日期",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
	    ]]
	});
	//显示隐藏汇总bar
	var controlFlag = true;
	$('#goodsmonthForm .controlSumBar').click(function(){
		if($(this).val() == '隐藏' && controlFlag){
			controlFlag = false;
			$('#goodsmonthForm .sumBar').animate({
				'bottom':'-=30px',
				'opacity':0,
			},500,function(){
				controlFlag = true;
				$('#goodsmonthForm .sumBar').css('display','none');
				$('#goodsmonthForm .controlSumBar').val('显示');
			});
		}else if($(this).val() == '显示' && controlFlag){
			controlFlag = false;
			$('#goodsmonthForm .sumBar').css('display','block');
			$('#goodsmonthForm .sumBar').animate({
				'bottom':'+=30px',
				'opacity':1,
			},500,function(){
				controlFlag = true;
				$('#goodsmonthForm .controlSumBar').val('隐藏');
			});
		}
	});
	/*查询*/
	$('#goodsmonthForm .queryForm .query').click(function(){
		var goodsName = $.trim($('#goodsmonthForm .queryForm .goodsName').val());
		var goodsSize = $.trim($('#goodsmonthForm .queryForm .goodsSize').val());
		var monthBalanceTimeStr = $.trim($('#goodsmonthForm .queryForm .monthBalanceTimeStr').val());
		var info = {
			goodsName:goodsName,
			goodsSize:goodsSize,
			monthBalanceTimeStr:monthBalanceTimeStr
		}
		$('#goodsmonthFormdg').datagrid({
			url:'../../reportForms/findGoodsMonthBalanceByCondition.do?getMs='+getMS(),
			queryParams:info
		})
		goodsmonthFormExcel = [
					       		    {name:'goodsName',value:goodsName},
					         		{name:'goodsSize',value:goodsSize},
					      	   		{name:'monthBalanceTimeStr',value:monthBalanceTimeStr}
				         ];
	});
	/*月结*/
	$('#goodsmonthForm .toolbar .startMonthBalance').click(function(){
		$.ajax({
			url:'../../reportForms/findLastMonthBalanceTime.do?getMs='+getMS(),
			type:'post',
			success:function(data){
				if(data == 500){
					windowControl('服务器异常');
				}else if(data == 400){
					windowControl('获取月结开始日期失败');
				}else{
					$('#goodsmonthForm .popups .startMonthBalance').css('display','block');
					if(data){
						$('#goodsmonthForm .popups .startMonthBalance input[type=text]:eq(0)').val(data);
					}else{
						var startDate = new Date().setMonth(new Date().getMonth()-1);
						startDate = new Date(startDate);
						$('#goodsmonthForm .popups .startMonthBalance input[type=text]:eq(0)').val(startDate.Format('yyyy-MM-dd'));
					}
					
				}
			},
			error:function(err){
				windowControl('网络异常');
			}
		});
	});
	$('#goodsmonthForm .popups .startMonthBalance .confirm').click(function(){
		var startTime = $.trim($('#goodsmonthForm .popups .startMonthBalance input[name=startTime]').val());
		var endTime = $.trim($('#goodsmonthForm .popups .startMonthBalance input[name=endTime]').val());
		if(endTime == ''||endTime == null){
			windowControl('月结结束日期不能为空');
			return false;
		}else if(startTime >= endTime){
			windowControl('结束日期不能小于等于开始日期');
			return false;
		}else if(new Date(endTime) > new Date()){
			windowControl('结束日期不能大于当前日期');
			return false;
		}else{
			$.ajax({
				url:'../../reportForms/startMonthBalance.do?getMs='+getMS(),
				data:{
					startTime:startTime,
					endTime:endTime,
					lastBalanceTime:startTime,
				},
				type:'post',
				success:function(data){
					if(data == 500){
						windowControl('服务器异常');
					}else if(data == 400){
						windowControl('设置月结日期失败');
					}else{
						windowControl('已开始月结');
						$('#goodsmonthForm .popups .startMonthBalance').css('display','none');
						$('#goodsmonthForm .popups .startMonthBalance input[type=text]').val('');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	});
	//撤销月结
	$('#goodsmonthForm .toolbar .withdrawMonthBalance').click(function(){
		ui.confirm('是否要撤销上次月结',function(z){
			if(z){
				$.ajax({
					url:'../../reportForms/withdrawLastMonthBalance.do?getMs='+getMS(),
					success:function(data){
						if(data==200){
							windowControl('撤销上次月结成功');
						}else{
							windowControl('撤销上次月结失败');
						}
					},
					error:function(err){
						windowControl('网络异常');
					}
				});
			}
		},false);
	})
	//显示隐藏汇总bar
	$('#goodsmonthForm .controlSumBar').click(function(){
		if($(this).val() == '隐藏'){
			$('#goodsmonthForm .sumBar').animate({
				'bottom':'-=30px',
				'opacity':0,
			},500,function(){
				$('#goodsmonthForm .controlSumBar').val('显示');
			});
		}else{
			$('#goodsmonthForm .sumBar').animate({
				'bottom':'+=30px',
				'opacity':1,
			},500,function(){
				$('#goodsmonthForm .controlSumBar').val('隐藏');
			});
		}
	});
	/*--------------------------------tree------------------------------*/
	var goodsTypeIds=[];
	$('#goodsmonthFormtg').tree({
        url: "../../treeController/queryTree.do?getMs="+getMS(),
        method:"post",
        animate: false,
        checkbox : true,//是否显示复选框  
        cascadeCheck: false,
        dnd:true,
        onClick: function(node){
        	var goodsTypeUrl = $("#goodsmonthForm .goodsTypeUrl").val(node.id);
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
        	var targetUrl = $('#goodsmonthFormtg').tree('getNode', target).id;
        	var targetName = $('#goodsmonthFormtg').tree('getNode', target).text;
        	//console.log("targetId="+targetId+"source="+source.text+"point="+point);
        	$.ajax({
    			data:{targetUrl:targetUrl,targetName:targetName,sourceUrl:source.id,sourceName:source.text,point:point},
    			url:"../../treeController/dragRepertoryType.do?getMs="+getMS(),
    			method:"post",
    			success: function(data){
    				$('#goodsmonthFormtg').tree('reload');
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
        	var goodsTypeUrl = $('#goodsmonthForm .goodsTypeUrl').val(node.id);
        	$('#goodsmonthFormtg').tree('select', node.target);
    		$('#goodsmonthFormmm').menu('show', {
    			left: e.pageX,
    			top: e.pageY
    		});
		}*/
    });
	//打印
//	$('#goodsmonthForm .print').click(function(){
//		var goodsName = $.trim($('#goodsmonthForm .queryForm .goodsName').val());
//		var goodsSize = $.trim($('#goodsmonthForm .queryForm .goodsSize').val());
//		var monthBalanceTimeStr = $.trim($('#goodsmonthForm .queryForm .monthBalanceTimeStr').val());
//		printObject ={
//				url:'../../reportForms/findGoodsMonthBalanceByCondition.do?getMs='+getMS(),
//			data:{
//				goodsName:goodsName,
//				goodsSize:goodsSize,
//				monthBalanceTimeStr:monthBalanceTimeStr
//			},	
//			column:[
//			         {field:'goodsName',title:'物品名称'},
//			         {field:'goodsSize',title:'物品规格'},
//			         {field:'lastBalanceNumber',title:'上期余量'},
//			         {field:'lastBalanceAmount',title:'上期余额'},
//			         {field:'currentOutNumber',title:'本期出库数量'},
//			         {field:'currentOutAmount',title:'本期出库金额'},
//			         {field:'currentInNumber',title:'本期入库数量'},
//			         {field:'currentInAmount',title:'本期入库金额'},
//			         {field:'currentBalanceNumber',title:'本期余量'},
//			         {field:'currentBalanceAmount',title:'本期余额'},
//			         {field:'monthBalanceTimeStr',title:'月结日期'},
//			         {field:'startTimeStr',title:'开始日期'},
//			         {field:'endTimeStr',title:'结束日期'}
//			 ],
//			width: 1200
//		}
//		setUpAdjustPrint(printObject);
//	});

//	$('.printWindow .confirm').click(function(){
//		lookPrint(printObject);
//		$('.printLook .confir').unbind('click');
//		$('.printLook .confir').click(function(){
//			$('.printLook .popuparea').jqprint();
//		});
//	});
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
		$('#goodsmonthForm .monthBalanceTimeStr').append(str);
	},
	error:function(err){
		windowControl(err.status);
	}
});
/*查询是否有月结日期*/
$.ajax({
	url:'../../reportForms/findLastMonthBalanceTime.do?getMs='+getMS(),
	type:'post',
	success:function(data){
		if(data!=400&&data!=500){
			if(!data){
				$('#goodsmonthForm .popups .withdrawLastMonthBalance').css('display','none');
			}

		}
	}
});
/*----------汇总-----------------*/
function addsumBarMonthForm(id,data){
	$('#'+id).find('.sumBar').css({
		'width':$('#'+id).find('.toolbar').width()+6+'px',
	});
	data = $.parseJSON(data);
	var str = '';
	if(data){
		str +='<span style="font-weight:800;>上期余量：</span>';
		str +='<span>'+data.lastBalanceNumber+'</span>';
		str +='<span style="font-weight:800;>上期余额：</span>';
		str +='<span>'+keepDecimals(data.lastBalanceAmount)+'</span>';
		str +='<span style="font-weight:800;>本期出库数量：</span>';
		str +='<span>'+data.currentOutNumber+'</span>';
		str +='<span style="font-weight:800;>本期出库金额：</span>';
		str +='<span>'+keepDecimals(data.currentOutAmount)+'</span>';
		str +='<span style="font-weight:800;>本期入库数量：</span>';
		str +='<span>'+data.currentInNumber+'</span>';
		str +='<span style="font-weight:800;>本期入库金额：</span>';
		str +='<span>'+keepDecimals(data.currentInAmount)+'</span>';
		str +='<span style="font-weight:800;>本期余量：</span>';
		str +='<span>'+data.currentBalanceNumber+'</span>';
		str +='<span style="font-weight:800;>本期余额：</span>';
		str +='<span>'+keepDecimals(data.currentBalanceAmount)+'</span>';
	}
	$('#'+id).find('.sumBar').html(str);
}