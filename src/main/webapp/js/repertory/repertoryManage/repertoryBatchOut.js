$(function(){
	/*内容高度*/
	$('#repertoryBatchOut .listBody').css('height',$('#loadarea').height()-62 + 'px');
	//初始化
	repertoryBatchOutGetDocumentMaker();
	/*************************下拉框选择物品领用用途*********************************************/
	$('#repertoryBatchOut .filtCondition .useType').html(getDataBySelectKeyNo("use_type"));
	/*************************下拉框选择仓库信息********************************/
	$.ajax({
		url:'../../repertory/selectRepertoryType.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var str = "";
			var data = eval('(' + data + ')'); 
			for(var i=0;i<data.length;i++){
				str += "<option value=" + data[i].repertoryId + ">" + data[i].repertoryName + "</option>"; 
			}
		    $('#repertoryBatchOut .filtCondition .repertoryId').html(str);	    
		},
		error:function(error){
			windowControl(error.status);
		}
	});
	/*************************下拉框选择领用部门信息********************************/
	//$('#repertoryBatchOut .filtCondition .getDepartmentName').html(getDataBySelectKeyNo("repertoryDepartment"));
	$.ajax({
		url:'../../repertory/selectGetDepartment.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			data = $.parseJSON(data).rows;
			var str = '';
			for(var i=0;i<data.length;i++){
				str += "<option value=" + data[i].departmentId + ">" + data[i].departmentName + "</option>";  
			}
			$('#repertoryBatchOut .filtCondition .getDepartmentName').html(str);
		},
		error:function(error){
			windowControl(error.status);
		}
	});
	
	
	//添加物品
	$('#repertoryBatchOut .outPut .delArticle').click(function(){
		delArticle();
		$('#repertoryBatchOut #delArticle .confirm').unbind(); 
	    $('#repertoryBatchOut #delArticle .confirm').click(function(){
	    	$('#repertoryBatchOut #delArticle').css('display','none');
	    	//var selectGoods = $('#repertoryBatchOut #delArticle .popuparea #findGoodsdg').datagrid('getSelections');
	    	var selectGoods = outGoods.rows;
	    	var startpoint = $('#repertoryBatchOut #waitSubmitIn tr').length;
	    	//拼接数据
	    	var tempHtml = '';
	    	for(var i = 0 ; i<selectGoods.length ; i++){
	    		if(selectGoods[i].movingAverPrice == undefined){
	    			selectGoods[i].movingAverPrice = 0;
	    		}
	    		tempHtml += '<tr data='+ selectGoods[i].goodsId +'>'+
	    			    		'<td class="goodsName">'+ selectGoods[i].goodsName +'</td>'+//物品名
	    			    		'<td class="goodsSize">'+ selectGoods[i].goodsSize +'</td>'+//规格
	    			    		'<td>'+ selectGoods[i].unit +'</td>'+//单位
	    			    		'<td class="goodsNumber"></td>'+//仓位现有数量
	    			    		'<td><select class="goodsPosition"></select></td>'+//出库仓位
	    			    		'<td data="'+ selectGoods[i].movingAverPrice +'"><input type="text" name="outNumber"/></td>'+//出库数量
	    			    		'<td>'+ selectGoods[i].movingAverPrice +'</td>'+//单价
	    			    		'<td name="taxAmount" data=""></td>'+//领用金额
	    			    		'<td><input type="text" name="record"/></td>'+//出库备注
	    			    		'<td class="del">删除</td>'+//操作
	    					'</tr>';
	    	};
	    	$('#repertoryBatchOut #waitSubmitIn').append(tempHtml);
	    	//清空出库库数组
	    	outGoods.rows = [];
	    	/*************************下拉框选择领用部门信息********************************/	
	    	var currentIndex = startpoint;
	    	var getSelectGoodsPosition = function(){
	    		if(currentIndex >= selectGoods.length+startpoint){   
	    	        return;  
	    	    }
    	    	$.ajax({
    	    		url:'../../repertory/selectGoodsPosition.do?getMs='+getMS(),
    	    		type:'post',
    	    		data:{goodsId:selectGoods[currentIndex-startpoint].goodsId},
    	    		success:function(data){
    	    			var str = '<option></option>';
    	    			var data = eval('(' + data + ')'); 
    	    			for(var j=0;j<data.length;j++){
    	    				str += "<option goodsNumber="+data[j].goodsNumber+" value=" + data[j].goodsPositionId + ">" + data[j].goodsPositionName + "</option>";  
    	    			}
    	    			$('#repertoryBatchOut #waitSubmitIn tr:eq('+ currentIndex +')').find('.goodsPosition').html(str);
    	    			$('#repertoryBatchOut #waitSubmitIn tr:eq('+ currentIndex +')').find('.goodsPosition').change(function(){
    	    				$(this).parents('tr').find('.goodsNumber').text($(this).find('option:selected').attr('goodsNumber'));
    	    			})
    	    			currentIndex++;
    	    			getSelectGoodsPosition();
    	    		},
    	    		error:function(error){
    	    			windowControl(error.status);
    	    		}
    	    	});
	    	}
	    	getSelectGoodsPosition();
	    	
	    	$('#repertoryBatchOut #waitSubmitIn td.del').on('click',function(){
	    		$(this).parent('tr').remove();
	    	})
	    	//单条数据计算
	    	$('#repertoryBatchOut #waitSubmitIn td input[name=outNumber]').blur(function(){
	    		var val = $(this).val();	    		
	    		var movingAverPrice = $(this).parent('td').attr('data');
	    		var goodsNumber = $(this).parents('tr').find('.goodsNumber').text();
	    		if(val>Number(goodsNumber)){
	    			$(this).val(0);
	    			val = 0;
	    			windowControl('出库数量不能大于库内现有数量！');
	    		}
	    		$(this).parents('tr').find('td[name=taxAmount]').attr('data',val*movingAverPrice);
	    		$(this).parents('tr').find('td[name=taxAmount]').text((val*movingAverPrice).toFixed(8));
	    	});
	    });
	    
	});
	
	//点击批量上传	
	$('#repertoryBatchOut .outPut .batchOut').click(function(){
		var element = $('#repertoryBatchOut .filtCondition ul');
		var getUserName = $.trim(element.find('input[name=getUserName]').val());//领用人
		var repertoryId = element.find('.repertoryId option:selected').val();
		var repertoryName = element.find('.repertoryId option:selected').text();//出库仓库
		var getDepartmentId = element.find('.getDepartmentName option:selected').val();
		var getDepartmentName = element.find('.getDepartmentName option:selected').text();//出库部门
		var useType = element.find('.useType option:selected').val();//出库部门
		var outTime = $.trim(element.find('input[name=outTime]').val());//出库时间
		var batchText = $.trim(element.find('input[name=batchText]').val());//批次备注
		var goodsList = [];
		var trDom = $('#repertoryBatchOut #waitSubmitIn').find('tr');
		//验证物品+规格+仓位为唯一所使用的的数组
		var goods = [];
		for(var i=0; i<trDom.length; i++){
			var tr = trDom.eq(i);
			var str = '';
			str += tr.find('.goodsName').text();
			str += tr.find('.goodsSize').text();
			str += tr.find('.goodsPosition').val();
			var goodOut = {
				goodsName:tr.find('.goodsName').text(),
				str:str
			}
			goods.push(goodOut);
			
			var obj = {
				goodsId : tr.attr('data'),
				goodsPositionId:tr.find(".goodsPosition option:selected").val(),
				goodsPositionName:tr.find(".goodsPosition option:selected").text(),
				outNumber:tr.find('input[name=outNumber]').val(),	
				taxAmount:tr.find('td[name=taxAmount]').attr('data'),
				record:tr.find('input[name=record]').val()
			}
			goodsList.push(obj);
		}
		for(var i = 0; i<goods.length; i++){
			for(var j = 0; j<goods.length; j++){
				if(i != j && goods[i].str == goods[j].str){
					windowControl('同一物品同一仓位存在两条出库/n'+goods[i].goodsName);
					return;
				}
			}
		}
		var flag = false;
		for(var i=0;i < goodsList.length;i++){
			if(goodsList[i].outNumber == null||goodsList[i].outNumber == ''){
				if(goodsList[i].goodsPositionId==null||goodsList[i].goodsPositionId==''){
					goodsList.splice(i,1);
					i--;
				}else{
					flag = true;
				}				
			};
		};
		if(getUserName == null||getUserName == ''){
			windowControl('领用人不能为空');
			return false;
		}else if(outTime == null||outTime == ''){
			windowControl('出库时间不能为空');
			return false;
		}else if(flag){
			windowControl('出库数量不能为空');
		}else{
			var submitOBj = {		
				getUserName:getUserName,
				repertoryId:repertoryId,
				repertoryName:repertoryName,
				getDepartmentId:getDepartmentId,
				getDepartmentName:getDepartmentName,
				useType:useType,
				outTime:outTime,
				batchText:batchText,
				list:goodsList
			};			
			$.ajax({
				url:'../../repertory/batchGoodsOut.do?getMs='+getMS(),
			    dataType:'json',
			    data:{json:JSON.stringify(submitOBj)},
			    async:true,
			    type:'POST',
			    success:function(data){
			        //请求成功时处理
			    	console.log(data);
			    	if(data == 500){
			    		windowControl('服务器异常！');
			    	}else if(data == 400){
			    		windowControl('数据异常！');
			    	}else{
			    		$('#repertoryBatchOut #waitSubmitIn').html('');
			    		$('#repertoryBatchOut .filtCondition ul').find('input[name=getUserName]').val('');
			    		$('#repertoryBatchOut .filtCondition ul').find('input[name=outTime]').val('');
			    		$('#repertoryBatchOut .filtCondition ul').find('input[name=batchText]').val('');
			    		$('#repertoryBatchOut .filtCondition ul select').find('option:eq(0)').attr('selected',true);
			    		windowControl('批量出库成功！');				    		
			    	}
			    },
			    error:function(){
			        //请求出错处理
			    }
			});
		}
		
		
	});
	
	
	//弹窗点击查询事件
	$('#repertoryBatchOut .query').click(function(){
		var goodsName = $.trim($('#repertoryBatchOut .goodsName').val());
		var gooosSize = $.trim($('#repertoryBatchOut .goodsSize').val());
		var dataInfo = {
			goodsName:goodsName,
			goodsSize:gooosSize
		};
		$('#repertoryBatchOut #findGoodsdg').datagrid({
			url:"../../repertory/selectGoodsByTime.do?getMs="+getMS(),
			queryParams:dataInfo
		});
	});
	
})
var outGoods = {'total':100,'rows':[]}; //定义一个 出库物品的数组
//添加弹窗
function delArticle(){
	$('#repertoryBatchOut #delArticle').css('display','block');
	$('#repertoryBatchOut #delArticle .articleClumn').tree({
        url: "../../treeController/queryTree.do?getMs="+getMS(),
        method:"post",
        cascadeCheck: false,
        onClick: function(node){
        	var goodsTypeUrl = node.id;
        	$('#repertoryBatchOut #findGoodsdg').datagrid({
        		url:'../../repertory/selectGoodsByTime.do?getMs='+getMS(),
        		queryParams:{goodsTypeUrl:goodsTypeUrl},
        	});
        }
    });
	$('#repertoryBatchOut #findGoodsdg').datagrid({
		url:'../../repertory/selectGoodsByTime.do?getMs='+getMS(),
	    toolbar:'#repertoryBatchOut .queryForm',
	    pagination:true,
	    queryParams:{goodsTypeUrl:''},
	    onCheck: function(rowIndex, rowData){
	    	if($('#repertoryBatchOut input[type=checkbox]').eq(rowIndex+1).attr('checked')){
		    	outGoods.rows.push(rowData);
		    	$('#repertoryBatchOut .gooutDoodsList').datagrid('loadData',outGoods);
	    	}
	    },
	    onCheckAll: function(rows){
	    	$.extend(outGoods.rows,rows);
	    	$('#repertoryBatchOut .gooutDoodsList').datagrid('loadData',outGoods);
	    },
		columns:[[
		    {checkbox:true},
			{field:'goodsName',title:'物品名',width:100,align:'center',},
			{field:'goodsSize',title:'规格',width:100,align:'center',},
			{field:'totalNumber',title:'数量',width:50,align:'center',},
			{field:'warnNumber',title:'警示数量',width:80,align:'center',},
			{field:'record',title:'备注',width:100,align:'center',width:100}
	    ]],
	});
	$('#repertoryBatchOut #findGoodsdg').datagrid('getPager').pagination({
		displayMsg:''
	});
	$('#repertoryBatchOut .gooutDoodsList').datagrid({
		toolbar:'#repertoryBatchOut .addTitle',
		columns:[[
			{field:'goodsName',title:'物品名',width:100,align:'center',},
			{field:'goodsSize',title:'规格',width:100,align:'center',},
			{field:'_op',title:'管理',width:100,align:'center',formatter:function(value,row,index){
				return '<span class="small-button delete" title="删除" onclick="deletegooutGoods('+index+')"></span>'
			}}
			]]
	});
	$('#repertoryBatchOut .gooutDoodsList').datagrid('loadData',{'total':100,'rows':[]});
}
//删除 出库物品数组的数据
function deletegooutGoods(index){
	outGoods.rows.splice(index,1);
	$('#repertoryBatchOut .gooutDoodsList').datagrid('loadData',outGoods);
}
/*************************制单人********************************/
function repertoryBatchOutGetDocumentMaker(){
	$.ajax({
		url:'../../user/getUserInfo.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var str = '';
			var data = eval('(' + data + ')'); 
			$('#repertoryBatchOut .filtCondition input[name=peopleName]').val(data.userName);			
		},
		error:function(error){
			windowControl(error.status);
		}
	});
}
