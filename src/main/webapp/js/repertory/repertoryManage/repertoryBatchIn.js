$(function(){
	/*内容高度*/
	$('#repertoryBatchIn .listBody').css('height',$('#loadarea').height()-62 + 'px');
	//初始化
	repertoryBatchInGetDocumentMaker();
	/**********新仓位入库的供应商*********/
	$('#repertoryBatchIn .filtCondition .chooseProvider').click(function(){
		chooseProvider();
		$('#chooseProvider .confirm').unbind('click');
		$('#chooseProvider .confirm').click(function(){
			$('#chooseProvider').css('display','none');	
			var selectProvider = $('#chooseProvider .popuparea .provider').datagrid('getSelected');
			$('#repertoryBatchIn .filtCondition input[name=providerCode]').val(selectProvider.providerCode);
			$('#repertoryBatchIn .filtCondition input[name=providerName]').val(selectProvider.providerName);	    	
		});
	});
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
		    $('#repertoryBatchIn .filtCondition .repertoryId').html(str);	    
		},
		error:function(error){
			windowControl(error.status);
		}
	});
	//添加物品
	$('#repertoryBatchIn .outPut .addArticle').click(function(){
		addArticle();
		$('#repertoryBatchIn #addArticle .confirm').unbind('click');
	    $('#repertoryBatchIn #addArticle .confirm').click(function(){
	    	$('#repertoryBatchIn #addArticle').css('display','none');
	    	//var selectGoods = $('#repertoryBatchIn #addArticle .popuparea #findGoodsdg').datagrid('getSelections');
	    	var selectGoods = addGoods.rows;
	    	var startpoint = $('#repertoryBatchIn #waitSubmitIn tr').length;
	    	//拼接数据
	    	var tempHtml = '';
	    	for(var i = 0 ; i<selectGoods.length ; i++){	    		
	    		tempHtml += '<tr data='+ selectGoods[i].goodsId +'>'+//物品Id
	    			    		'<td>'+ selectGoods[i].goodsName +'</td>'+//物品名
	    			    		'<td>'+ selectGoods[i].goodsSize +'</td>'+//规格
	    			    		'<td>'+ selectGoods[i].unit +'</td>'+//单位
	    			    		'<td>'+ selectGoods[i].totalNumber +'</td>'+//仓库现有数量
	    			    		'<td><input type="text" name="goodsPositionName" /></td>'+//新入库仓位
	    			    		'<td><select class="goodsPosition"></select></td>'+//入库仓位
	    			    		'<td><input type="text" name="inNumber" /></td>'+//入库数量
	    			    		'<td><input type="text" name="pretaxAverPrice"/></td>'+//单价含税
	    			    		'<td name="taxAverPrice"></td>'+//单价无税
	    			    		'<td><input type="text" name="pretaxAmount" /></td>'+//金额含税
	    			    		'<td><input type="text" name="taxRate" value="17"/></td>'+//税率
	    			    		'<td name="taxAmount" data=""></td>'+//税额
	    			    		'<td><input type="text" name="record"/></td>'+//入库备注
	    			    		'<td class="del">删除</td>'+//操作
	    					'</tr>';
	    	};
	    	$('#repertoryBatchIn #waitSubmitIn').append(tempHtml);	 
	    	//清空入库数组数据
	    	addGoods.rows = [];
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
    	    			var str = '<option value=""></option>';
    	    			var data = eval('(' + data + ')'); 
    	    			for(var j=0;j<data.length;j++){
    	    				str += "<option value=" + data[j].goodsPositionId + ">" + data[j].goodsPositionName + "</option>";  
    	    			}
    	    			$('#repertoryBatchIn #waitSubmitIn tr:eq('+ currentIndex +')').find('.goodsPosition').html(str);
    	    			currentIndex++;
    	    			getSelectGoodsPosition();
    	    		},
    	    		error:function(error){
    	    			windowControl(error.status);
    	    		}
    	    	});
	    	}
	    	getSelectGoodsPosition();
	    	    	
	    	$('#repertoryBatchIn #waitSubmitIn td.del').on('click',function(){
	    		$(this).parent('tr').remove();
	    	})
	    	//单条数据计算
	    	$('#repertoryBatchIn #waitSubmitIn td input[type=text]').blur(function(){
	    		repertoryBatchInCalculate($(this));
	    		var sum = 0;
	    		$('input[name=pretaxAmount]').each(function(){
	    			sum += Number($(this).val());
	    		});
	    		$('td[name=taxAmount]').each(function(){
	    			sum -= Number($(this).text());
	    		});
	    		$('#repertoryBatchIn .listBody .filtCondition .sum').text(sum);
	    	});	    	    	
	    });
	    
	});
	//进入直接触发
	$('#repertoryBatchIn .outPut .addArticle').click();
	
	//点击批量上传	
	$('#repertoryBatchIn .outPut .batchIn').click(function(){
		var element = $('#repertoryBatchIn .filtCondition ul');
		var putUserName = $.trim(element.find('input[name=putUserName]').val());//经办人
		var repertoryId = element.find('.repertoryId option:selected').val();
		var repertoryName = element.find('.repertoryId option:selected').text();//入库仓库
		var inTime = $.trim(element.find('input[name=inTime]').val());//入库时间
		var providerCode = element.find('input[name=providerCode]').val();
		var batchText = element.find('input[name=batchText]').val();
		if(putUserName == null||putUserName == ''){
			windowControl('经办人不能为空');
			return false;
		}else if(inTime == null||inTime == ''){
			windowControl('入库时间不能为空');
			return false;
		}else{
			var flag = true;
			var goodsList = [];
			var trDom = $('#repertoryBatchIn #waitSubmitIn').find('tr');
			for(var i=0; i<trDom.length; i++){
				var tr = trDom.eq(i);
				var obj = {
					sign:1,
					goodsId : tr.attr('data'),
					inNumber:tr.find('input[name=inNumber]').val(),
					pretaxAmount:tr.find('input[name=pretaxAmount]').val(),
					taxRate:tr.find('input[name=taxRate]').val(),
					pretaxAverPrice:tr.find('input[name=pretaxAverPrice]').val(),
					taxAmount:tr.find('td[name=taxAmount]').attr('data'),
					taxAverPrice:tr.find('td[name=taxAverPrice]').text(),
					record:tr.find('td[name=record]').val()
				}
				if(tr.find('input[name=goodsPositionName]').val()==null||tr.find('input[name=goodsPositionName]').val()==''){
					if(tr.find(".goodsPosition option:selected").val()==null||tr.find(".goodsPosition option:selected").val()==''){
						if(obj.inNumber==null||obj.inNumber==''){
							if(obj.pretaxAmount==null||obj.pretaxAmount==''){
								if(obj.pretaxAverPrice==null||obj.pretaxAverPrice=='')
									obj.sign = 0;
							}
						}else{
							windowControl('新入库仓位和入库仓位不能同时为空');
							flag = false;
							return false;
						}						
					}else{
						obj.goodsPositionId=tr.find(".goodsPosition option:selected").val();
						obj.goodsPositionName=tr.find(".goodsPosition option:selected").text();
					}
				}else{
					if(tr.find(".goodsPosition option:selected").val()==null||tr.find(".goodsPosition option:selected").val()==''){
						obj.goodsPositionName=tr.find('input[name=goodsPositionName]').val();
					}else{
						windowControl('新入库仓位和入库仓位不能同时填写');
						flag = false;
						return false;
					}
				}
				goodsList.push(obj);
			};
			for(var i=0;i < goodsList.length;i++){				
				if(goodsList[i].sign==0){
					goodsList.splice(i,1);
					i--;
				}else{
					if(goodsList[i].inNumber == null||goodsList[i].inNumber == ''){
						windowControl('入库数量不能为空');
						flag = false;
						return false;
					}else if(goodsList[i].pretaxAmount == null||goodsList[i].pretaxAmount == ''){
						windowControl('金额(含税)不能为空');
						flag = false;
						return false;
					}
				}
			};
			if(flag){
				var submitOBj = {		
					putUserName:putUserName,
					repertoryId:repertoryId,
					repertoryName:repertoryName,
					inTime:inTime,
					providerCode:providerCode,
					batchText:batchText,
					list:goodsList
				};			
				$.ajax({
					url:'../../repertory/batchGoodsIn.do?getMs='+getMS(),
				    dataType:'json',
				    data:{json:JSON.stringify(submitOBj)},
				    async:true,
				    type:'POST',
				    success:function(data){
				        //请求成功时处理
				    	if(data == 500){
				    		windowControl('服务器异常！');
				    	}else if(data == 400){
				    		windowControl('数据异常！');
				    	}else{
				    		$('#repertoryBatchIn #waitSubmitIn').html('');
				    		$('#repertoryBatchIn .filtCondition ul').find('input[name=putUserName]').val('');
				    		$('#repertoryBatchIn .filtCondition ul').find('input[name=inTime]').val('');
				    		$('#repertoryBatchIn .filtCondition ul').find('input[name=providerName]').val('');
				    		$('#repertoryBatchIn .filtCondition ul').find('input[name=batchText]').val('');
				    		$('#repertoryBatchIn .filtCondition ul').find('.sum').text('');
				    		windowControl('批量入库成功！');				    		
				    	}
				    },
				    error:function(){
				        //请求出错处理
				    }
				});
			}
			
		}
		
		
	});
	
	
	//弹窗点击查询事件
	$('#repertoryBatchIn .query').click(function(){
		var goodsName = $.trim($('#repertoryBatchIn .goodsName').val());
		var gooosSize = $.trim($('#repertoryBatchIn .goodsSize').val());
		var dataInfo = {
			goodsName:goodsName,
			goodsSize:gooosSize
		};
		$('#repertoryBatchIn #findGoodsdg').datagrid({
			url:"../../repertory/selectGoodsByTime.do?getMs="+getMS(),
			queryParams:dataInfo
		});
	});
	
})
var addGoods = {'total':100,'rows':[]}; //定义一个 入库物品的数组
//添加弹窗
function addArticle(){	
	$('#repertoryBatchIn #addArticle').css('display','block');
	$('#repertoryBatchIn #addArticle .articleClumn').tree({
        url: "../../treeController/queryTree.do?getMs="+getMS(),
        method:"post",
        cascadeCheck: false,
        onClick: function(node){
        	var goodsTypeUrl = node.id;
        	$('#repertoryBatchIn #findGoodsdg').datagrid({
        		url:'../../repertory/selectGoodsByTime.do?getMs='+getMS(),
        		queryParams:{goodsTypeUrl:goodsTypeUrl},
        	});
        }
    });
	$('#repertoryBatchIn #findGoodsdg').datagrid({
		url:'../../repertory/selectGoodsByTime.do?getMs='+getMS(),
	    toolbar:'#repertoryBatchIn .listForm .queryForm',
	    pagination:true,
	    queryParams:{goodsTypeUrl:''},
	    onCheck: function(rowIndex, rowData){
	    	if($('#repertoryBatchIn input[type=checkbox]').eq(rowIndex+1).attr('checked')){
	    		addGoods.rows.push(rowData);
		    	$('#repertoryBatchIn .addDoodsList').datagrid('loadData',addGoods);
	    	}
	    	
	    },
	    onCheckAll: function(rows){
	    	$.extend(addGoods.rows,rows);
	    	$('#repertoryBatchIn .addDoodsList').datagrid('loadData',addGoods);
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
	$('#repertoryBatchIn #findGoodsdg').datagrid('getPager').pagination({
		displayMsg:''
	});
	$('#repertoryBatchIn .addDoodsList').datagrid({
		toolbar:'#repertoryBatchIn .addTitle',
		columns:[[
			{field:'goodsName',title:'物品名',width:100,align:'center',},
			{field:'goodsSize',title:'规格',width:100,align:'center',},
			{field:'_op',title:'管理',width:100,align:'center',formatter:function(value,row,index){
				return '<span class="small-button delete" title="删除" onclick="deleteAddGoods('+index+')"></span>'
			}}
			]]
	});
	$('#repertoryBatchIn .addDoodsList').datagrid('loadData',{'total':100,'rows':[]});
}
//删除 入库物品数组的数据
function deleteAddGoods(index){
	addGoods.rows.splice(index,1);
	$('#repertoryBatchIn .addDoodsList').datagrid('loadData',addGoods);
}
//计算
function repertoryBatchInCalculate(ele){
	var dom = ele.parents('tr');
	
	var inNumber = Number($.trim(dom.find('input[name=inNumber]').val()));//入库数量
	var pretaxAmount = Number($.trim(dom.find('input[name=pretaxAmount]').val()));//入库总金额（含税）
	var taxRate = Number($.trim(dom.find('input[name=taxRate]').val()));//税率
	var pretaxAverPrice = Number($.trim(dom.find('input[name=pretaxAverPrice]').val()));//单价（含税）
	
	if(inNumber&&pretaxAmount){
		dom.find('input[name=pretaxAverPrice]').val((pretaxAmount/inNumber).toFixed(8));//单价（含税）		
		dom.find('td[name=taxAverPrice]').text(((pretaxAmount/inNumber)*(1-taxRate/100)).toFixed(8));//单价（无税）
		dom.find('td[name=taxAmount]').text((pretaxAmount*(taxRate/100)).toFixed(2));//税额
		dom.find('td[name=taxAmount]').attr('data',pretaxAmount*(1-taxRate/100));//入库总金额（无税）
		if(ele.attr('name')=='pretaxAverPrice'){
			dom.find('input[name=pretaxAmount]').val(pretaxAverPrice*inNumber);//入库总金额（含税）
			pretaxAmount = Number($.trim(dom.find('input[name=pretaxAmount]').val()));
			dom.find('input[name=pretaxAverPrice]').val((pretaxAmount/inNumber).toFixed(8));//单价（含税）
			dom.find('td[name=taxAverPrice]').text((pretaxAverPrice*(1-taxRate/100)).toFixed(8));//单价（无税）			
			dom.find('td[name=taxAmount]').text((pretaxAmount*(taxRate/100)).toFixed(2));//税额
			dom.find('td[name=taxAmount]').attr('data',pretaxAmount*(1-taxRate/100));//入库总金额（无税）
		}
	}else if(inNumber&&pretaxAverPrice){
		dom.find('input[name=pretaxAmount]').val(pretaxAverPrice*inNumber);//入库总金额（含税）		
		pretaxAmount = Number($.trim(dom.find('input[name=pretaxAmount]').val()));
		dom.find('td[name=taxAverPrice]').text((pretaxAverPrice*(1-taxRate/100)).toFixed(8));//单价（无税）
		dom.find('td[name=taxAmount]').text((pretaxAmount*(taxRate/100)).toFixed(2));//税额
		dom.find('td[name=taxAmount]').attr('data',pretaxAmount*(1-taxRate/100));//入库总金额（无税）
		
	}else if(pretaxAmount&&pretaxAverPrice){
		dom.find('input[name=inNumber]').val(pretaxAmount/pretaxAverPrice)//入库数量
		inNumber = Number($.trim(dom.find('input[name=inNumber]').val()));
		dom.find('td[name=taxAverPrice]').text((pretaxAverPrice*(1-taxRate/100)).toFixed(8));//单价（无税）
		dom.find('td[name=taxAmount]').text((pretaxAmount*(taxRate/100)).toFixed(2));//税额
		dom.find('td[name=taxAmount]').attr('data',pretaxAmount*(1-taxRate/100));//入库总金额（无税）
	}
	
	
	
	
	
}
/*************************制单人********************************/
function repertoryBatchInGetDocumentMaker(){
	$.ajax({
		url:'../../user/getUserInfo.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var str = '';
			var data = eval('(' + data + ')'); 
			$('#repertoryBatchIn .filtCondition input[name=peopleName]').val(data.userName);			
		},
		error:function(error){
			windowControl(error.status);
		}
	});
}
