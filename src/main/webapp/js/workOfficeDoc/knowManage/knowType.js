$(function(){
	if(existPermission('admin:workOfficeDoc:knowManage:knowType:add'))
		$('#knowType .maintop').append('<input type="button" value="添加类别" class="button addKnowType"/>');
	if(existPermission('admin:workOfficeDoc:knowManage:knowType:order'))
		$('#knowType .maintop').append('<input type="button" value="保存类别顺序" class="button saveOrderCode"/>');
	var lW = $('#loadarea').width();
	$('#knowTypedg').datagrid({
		url:'../../know/queryFirstCategory.do?getMs='+getMS(),
	    rownumbers:false,
	    singleSelect:true,
	    pagination:true,
	    //toolbar:"#know .invitetop",
	    method:"post",
	    fit: true, 
		onLoadSuccess:function(data){
			$('#knowType .downKnow:last').before('<span class="empty-button"></span>');
			$('#knowType .downKnow:last').remove();
		},
	    columns:[[ 
	        {field:"orderCode",title:"序号",resizable:true,fitColumns:true,align:"left"},     
	        {field:"firstCategoryName",title:"类别名",resizable:true,fitColumns:true,align:"left",width:(lW-364)},     
	        {field:"openness",title:"公开级别",resizable:true,fitColumns:true,align:"center",width:120,formatter:function(value,row,index){
	        	if(value == 0){
	        		return '普通';
	        	}else if(value == 1){
	        		return '公开';
	        	}
	        }}, 
	        {field:"_op",title:"操作",resizable:true,fitColumns:true,align:"center",width:200,formatter:function(value,row,index){
	        	var opera = '';
	        	var id = "'"+row.firstCategoryId+"'";
	        	if(existPermission('admin:workOfficeDoc:knowManage:knowType:manage'))
	        		opera += '<span class="small-button govern" title="字类别管理" onclick="editSonKnowType('+id+')"></span>';
	        	if(existPermission('admin:workOfficeDoc:knowManage:knowType:update'))
	        		opera += '<span class="small-button edit" title="修改" onclick="editKnowType('+id+')"></span>';
	        	if(existPermission('admin:workOfficeDoc:knowManage:knowType:update'))	
	        		opera += '<span class="small-button delete" title="删除" onclick="deleteKnowType('+id+')"></span>';
	        	if(index == 0){
	        		opera +='<span class="empty-button"></span>';
	        	}else{
	        		opera += '<span class="upset upsetKnow" title="上移" onclick="upKnowType('+index+')"></span>';
	        	}
	        	opera += '<span class="downset downKnow" title="下移" onclick="downKnowType('+index+')"></span>';
	        	return opera;
	        }}, 
	    ]]
	});
	//添加类别
	$('#knowType .addKnowType').click(function(){
		$('#knowType .addType').css('display','block');
	});
	$('#knowType .addType .confirm').click(function(){
		var firstCategoryName = $.trim($('#knowType .addType .firstCategoryName').val());
		var openness = $('#knowType .addType .openness').val();
		var info ={
			firstCategoryName:firstCategoryName,
			openness:openness
		}
		if(firstCategoryName == '' || firstCategoryName == null){
			windowControl("添加类别不能为空");
		}else{
			$.ajax({
				data:info,
				url:'../../know/addFirstCategory.do?getMs='+getMS(),
				type:'get',
				success:function(data){
					if(data == 200){
						windowControl('添加类别成功');
						$('#knowTypedg').datagrid('reload');
					}else{
						windowControl('添加类别失败');
					}
					$('#knowType .addType').css('display','none');
					$('#knowType .addType .firstCategoryName').val('');
					
				},
				error:function(){
					windowControl('网络异常');
				}
			});
		}
	});
	//修改类别 
	$('#knowType .eaitType .confirm').click(function(){
		var id = $('#knowType .eaitType .firstCategoryName').attr('id');
		var firstCategoryName = $.trim($('#knowType .eaitType .firstCategoryName').val());
		var openness = $('#knowType .eaitType .openness').val();
		if(firstCategoryName == ''&&firstCategoryName == null){
			windowControl('类别新名称不能为空');
			return;
		}else{
			var info = {
				firstCategoryId:id,
				firstCategoryName:firstCategoryName,
				openness:openness
			}
			$.ajax({
				data:info,
				url:'../../know/updateFirstCategory.do?getMs='+getMS(),
				type:'get',
				success:function(data){
					if(data == 200){
						windowControl('修改类别成功');
						$('#knowTypedg').datagrid('reload');
					}else{
						windowControl('修改类别失败');
					}
					$('#knowType .eaitType').css('display','none');
					$('#knowType .eaitType .firstCategoryName').val('');
					
				},
				error:function(){
					windowControl('网络异常');
				}
			});
		}
	});
	//保存子类别管理
	$('#knowType .eaitSonType .confirm').click(function(){
		var len = $('#knowType .eaitSonType .popuparea .typeBar').length-1;
		var category = [];
		var addflag = 1;
		var orderCode = 0;
		var secondCategoryId;
		var secondCategoryName;
		var info = {};
		for(var i=1;i<len;i++){
			orderCode = i;
			secondCategoryName = $('#knowType .eaitSonType .popuparea .typeBar').eq(i).find('input').val();
			if($('#knowType .eaitSonType .popuparea .typeBar').eq(i).find('input').attr('id')){
				secondCategoryId = $('#knowType .eaitSonType .popuparea .typeBar').eq(i).find('input').attr('id');
				info = {
					secondCategoryId:secondCategoryId,
					secondCategoryName:secondCategoryName,
					orderCode:orderCode,
					deleteFLag:0
				}
			}else{
				info = {
					addFlag:addflag,
					secondCategoryName:secondCategoryName,
					orderCode:orderCode,
					deleteFLag:0
				}
			}
			category.push(info);
		}
		info = {
			firstCategoryId:$('#knowType .eaitSonType').attr('id'),
			list:category.concat(deleteCategory),
		}
		info = JSON.stringify(info);
		var boolean = true;
		var obj = category.concat(deleteCategory);
		for(var i=0;i<obj.length;i++){
			if(($.trim(obj[i].secondCategoryName) == "" || $.trim(obj[i].secondCategoryName) == null)&&len>1&&obj[i].deleteFLag == 0){
				boolean = false;
				break;
			}
		}
		if(boolean){
			$.ajax({
				data:{jsonString:info},
				url:'../../know/updateSubCategory.do?getMs='+getMS(),
				type:'get',
				success:function(data){
					if(data==200){
						windowControl('保存成功');
						deleteCategory = [];
					}else{
						windowControl('保存失败');
					}
					$('#knowType .eaitSonType').css('display','none'); 
					$('#knowType .eaitSonType .popuparea .typeBar').remove();
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
			$('#knowType .eaitSonType').css('display','none');
		}else{
			windowControl("类别名不能为空");
		}
		
	});
	
	//修改类别
	$('#knowType .eaitType .confrim').click(function(){
		var firstCategoryName = $.trim($('#knowType .eaitType .firstCategoryName').val());
		var openness = $('#knowType .eaitType .openness').val();
		var firstCategoryId = $('#knowType .eaitType .firstCategoryName').attr('id');
		var info ={
				firstCategoryId:firstCategoryId,
				firstCategoryName:firstCategoryName,
				openness:openness
			}
		$.ajax({
			data:info,
			url:'../../know/updateFirstCategory.do?getMs='+getMS(),
			type:'get',
			success:function(data){
				if(data == 200){
					windowControl('修改类别成功');
				}else{
					windowControl('修改类别失败');
				}
				$('#knowType .eaitType').css('display','none');
				$('#knowType .eaitType .firstCategoryName').val('');
				
			},
			error:function(){
				windowControl('网络异常');
			}
		});
	});
	//
	$('#knowType .saveOrderCode').click(function(){
		knowArr = JSON.stringify(knowArr);
		$.ajax({
			data:{jsonString:knowArr},
			url:'../../know/upDownMoveForFirstCategory.do?getMs='+getMS(),
			success:function(data){
				if(data == 200){
					windowControl('修改顺序成功');
					$('#knowType .saveOrderCode').css('display','none');
				}else{
					windowControl('修改顺序失败');
				}
			},
			error:function(err){
				windowControl('网络异常');
			}
		})
	});
});
//子类别管理
function editSonKnowType(id){
	$.ajax({
		data:{firstCategoryId:id},
		url:'../../know/querySecondCategory.do?getMs='+getMS(),
		type:'get',
		success:function(data){
			data = $.parseJSON(data).rows;
			var str = '<div class="typeBar">'
				+ '<span class ="sortNum"></span>'
				+ '<div class="sonTypeName">'
				+ '子类别名称</div>'
				+ '<div class="operation">操作'
				+'</div></div>';
			if(data.length){
				for(var i=0;i<data.length;i++){
					str += '<div class="typeBar"><span class ="sortNum">'+(i+1)
						+ '</span><div class="sonTypeName"><input type="text"  flag="'+(i+1)+'"'
						+' value="'+data[i].secondCategoryName+'" id="'+data[i].secondCategoryId+'"/>'
						+ '</div>'
						+ '<div class="operation">'
						+ '<span class="small-button delete" title="删除" onclick="deleteSonKnowType(this)"></span>';
					if(i==0){
						str += '<span class="empty"></span>';
					}else{
						str += '<span class="upset" title="上移" onclick="upSonKnowType(this)"></span>';
					}
					if(i==data.length-1){
						str += '<span class="empty"></span>';
					}else{
						str += '<span class="downset" title="下移" onclick="downSonKnowType(this)"></span>';
					}
					str += '</div></div>';
				}
			}
			str += '<div class="typeBar"><span class ="sortNum">'
				+ (data.length+1) +'.</span>'
				+ '<div class="sonTypeName">'
				+ '<input type="text"  flag="'+ (data.length+1) +'" disabled/>'
				+ '</div><div class="operation">'
				+ '<input type="button" class="button addTypeBar" value="添加"/>'
				+ '</div></div>';
			$('#knowType .eaitSonType .popuparea').html(str);
			$('#knowType .eaitSonType').attr('id',id);
			$('#knowType .eaitSonType').css('display','block');
			//添加子类别
			$('#knowType .eaitSonType .addTypeBar').click(function(){
				var dom = $(this).parents('.typeBar');
				var val = dom.find('input[type=text]').val();
				dom.find('input[type=text]').val('');
				var index = dom.index();
				var empty = $('#knowType .eaitSonType .typeBar').eq(index-1).find('.empty');
				var strSpan = '<span class="downset" title="下移" onclick="downSonKnowType(this)"></span>';
				var str = '<div class="typeBar">'
				+ '<span class ="sortNum">'+index+'.</span>'
				+ '<div class="sonTypeName">'
				+ '<input type="text" flag="'+index+'" value="'+val+'"/>'
				+ '</div>'
				+ '<div class="operation">'
				+ '<span class="small-button delete" title="删除" onclick="deleteSonKnowType(this)"></span>'
				+ '<span class="upset" title="上移" onclick="upSonKnowType(this)"></span>'
				+ '<span class="empty"></span>'
				+ '</div>'
				+ '</div>';
				empty.before(strSpan);
				empty.remove();
				dom.before(str);
				dom.find('.sortNum').text((index+1)+'.');
				if($('#knowType .typeBar:eq(1) .downset').length>1){
					var downset = $('#knowType .typeBar:eq(1) .downset:eq(0)');
					var strSpan1 = '<span class="empty"></span>';
					downset.before(strSpan1);
					downset.remove();
				}
				if($('#knowType .typeBar').length == 3){
					var downset = $('#knowType .typeBar:eq(1) .downset');
					var strSpan1 = '<span class="empty"></span>';
					downset.before(strSpan1);
					downset.remove();
					var upset = $('#knowType .typeBar:eq(1) .upset');
					var strSpan2 = '<span class="empty"></span>';
					upset.before(strSpan2);
					upset.remove();
				}
			});
			
		},
		error:function(){
			windowControl('网络异常');
		}
	});
	
}
//修改
function editKnowType(id){
	$('#knowType .eaitType .firstCategoryName').attr('id',id);
	$('#knowType .eaitType').css('display','block');
}
//删除
function deleteKnowType(id,flag){
	if(flag == 1){
		windowControl('该类别下还有文档,不可删除');
	}else{
		ui.confirm('确认要删除该类别',function(z){
			if(z){
				$.ajax({
					data:{firstCategoryId:id,aliveFlag:'0'},
					url:'../../know/updateFirstCategory.do?getMs='+getMS(),
					type:'get',
					success:function(data){
						if(data == 200){
							windowControl('删除类别成功');
						}else{
							windowControl('删除类别失败');
						}
						$('#knowTypedg').datagrid('reload');
					},
					error:function(){
						windowControl('网络异常');
					}
				});
			}
		},false);
	}
}
/*//类别上移
function upKnowType(){
	
}
//类别下移
function downKnowType(){
	
}*/
/*********************************下移知识大类别行的方法******************************************/
function downKnowType(index){
	$('#knowType .saveOrderCode').show();
	var rows = $('#knowTypedg').datagrid('getRows');
	knowArr = rows;
	var total = rows.length;
	var curRow = rows[index];
	var nextRow = rows[index+1];
	var curParam = {
			aliveFlag:nextRow.aliveFlag||"",
			createTime:nextRow.createTime||"",
			createTimeStr:nextRow.createTimeStr||"",
			createUserId:nextRow.createUserId||"",
			createUserName:nextRow.createUserName||"",
			docId:nextRow.docId||"",
			firstCategoryId:nextRow.firstCategoryId||"",
			firstCategoryName:nextRow.firstCategoryName||"",
			isDeleteFlag:nextRow.isDeleteFlag||"",
			openness:nextRow.openness||"",
			orderCode:curRow.orderCode||"0",
			updateTimeStr:nextRow.updateTimeStr||"",
			updateUserName:nextRow.updateUserName||"",
			rows:100000,
			page:1
	};
	nextParam = {
			aliveFlag:curRow.aliveFlag||"",
			createTime:curRow.createTime||"",
			createTimeStr:curRow.createTimeStr||"",
			createUserId:curRow.createUserId||"",
			createUserName:curRow.createUserName||"",
			docId:curRow.docId||"",
			firstCategoryId:curRow.firstCategoryId||"",
			firstCategoryName:curRow.firstCategoryName||"",
			isDeleteFlag:curRow.isDeleteFlag||"",
			openness:curRow.openness||"",
			orderCode:nextRow.orderCode||"0",
			updateTimeStr:curRow.updateTimeStr||"",
			updateUserName:curRow.updateUserName||"",
			rows:100000,
			page:1
	};
	
	$('#knowTypedg').datagrid('updateRow',{
		index:index,
		row:curParam
	});
	$('#knowTypedg').datagrid('updateRow',{
		index:index+1,
		row:nextParam
	});
	knowArr[index] = curParam;
	knowArr[index+1] = nextParam;
	var rows2 = $('#knowTypedg').datagrid('getRows');
	if(index == total-1 || index+1 == total-1){
		$('#knowType .downKnow:last').before('<span class="empty-button"></span>');
		$('#knowType .downKnow:last').remove();
	}
}

/*********************************上移知识行的方法******************************************/
function upKnowType(index){
	$('#knowType .saveOrderCode').show();
	var rows = $('#knowTypedg').datagrid('getRows');
	knowArr = rows;
	console.log(knowArr);
	var total = rows.length;
	var curRow = rows[index];
	var lastRow = rows[index-1];
	var curParam = {
			aliveFlag:lastRow.aliveFlag||"",
			createTime:lastRow.createTime||"",
			createTimeStr:lastRow.createTimeStr||"",
			createUserId:lastRow.createUserId||"",
			createUserName:lastRow.createUserName||"",
			docId:lastRow.docId||"",
			firstCategoryId:lastRow.firstCategoryId||"",
			firstCategoryName:lastRow.firstCategoryName||"",
			isDeleteFlag:lastRow.isDeleteFlag||"",
			openness:lastRow.openness||"",
			orderCode:curRow.orderCode||"0",
			updateTimeStr:lastRow.updateTimeStr||"",
			updateUserName:lastRow.updateUserName||"",
			rows:100000,
			page:1
	};
	var lastParam = {
			aliveFlag:curRow.aliveFlag||"",
			createTime:curRow.createTime||"",
			createTimeStr:curRow.createTimeStr||"",
			createUserId:curRow.createUserId||"",
			createUserName:curRow.createUserName||"",
			docId:curRow.docId||"",
			firstCategoryId:curRow.firstCategoryId||"",
			firstCategoryName:curRow.firstCategoryName||"",
			isDeleteFlag:curRow.isDeleteFlag||"",
			openness:curRow.openness||"",
			orderCode:lastRow.orderCode||"0",
			updateTimeStr:curRow.updateTimeStr||"",
			updateUserName:curRow.updateUserName||"",
			rows:100000,
			page:1
	};
	
	$('#knowTypedg').datagrid('updateRow',{
		index:index,
		row:curParam
	});
	$('#knowTypedg').datagrid('updateRow',{
		index:index-1,
		row:lastParam
	});
	
	knowArr[index] = curParam;
	knowArr[index-1] = lastParam;
	console.log(knowArr);
	if(index == total-1 || index-1 == total-1){
		$('#knowType .downKnow:last').before('<span class="empty-button"></span>');
		$('#knowType .downKnow:last').remove();
	}
}
//子类别上移
function upSonKnowType(ele){
	var dom = $(ele).parents('.typeBar');
	var str1 = dom.find('.sonTypeName input').val();
	var str2 = dom.prev().find('.sonTypeName input').val();
	var flag1 = dom.find('.sonTypeName input').attr('flag');
	var flag2 = dom.prev().find('.sonTypeName input').attr('flag');
	var html = dom.find('.sonTypeName').html();
	dom.find('.sonTypeName').html(dom.prev().find('.sonTypeName').html());
	dom.prev().find('.sonTypeName').html(html);
	dom.find('.sonTypeName input').val(str2);
	dom.prev().find('.sonTypeName input').val(str1);
	dom.find('.sonTypeName input').attr('flag',flag1);
	dom.prev().find('.sonTypeName input').attr('flag',flag2);
}
//子类别下移
function downSonKnowType(ele){
	var dom = $(ele).parents('.typeBar');
	var str1 = dom.find('.sonTypeName input').val();
	var str2 = dom.next().find('.sonTypeName input').val();
	var flag1 = dom.find('.sonTypeName input').attr('flag');
	var flag2 = dom.next().find('.sonTypeName input').attr('flag');
	var html = dom.find('.sonTypeName').html();
	dom.find('.sonTypeName').html(dom.next().find('.sonTypeName').html());
	dom.next().find('.sonTypeName').html(html);
	dom.find('.sonTypeName input').val(str2);
	dom.next().find('.sonTypeName input').val(str1);
	dom.find('.sonTypeName input').attr('flag',flag1);
	dom.next().find('.sonTypeName input').attr('flag',flag2);
}
var deleteCategory = [];
//子类别删除
function deleteSonKnowType(ele){
	var dom = $(ele).parents('.typeBar');
	var input = dom.find('input');
	var index = dom.index();
	var length = $('#knowType .typeBar').length;
	if(input.attr('id') != ''&&input.attr('id') != null){
		var info ={
			aliveFlag:0,
			secondCategoryId:input.attr('id'),
			deleteFlag:1,
			orderCode:1
		}
		deleteCategory.push(info);
	}
	if(index == 1){
		var empty = $('#knowType .typeBar').eq(2).find('.upset');
		var strSpan = '<span class="empty"></span>';
		empty.before(strSpan);
		empty.remove();
	}else if(index == length-2){
		var empty = $('#knowType .typeBar').eq(length-3).find('.downset');
		var strSpan = '<span class="empty"></span>';
		empty.before(strSpan);
		empty.remove();
	}
	dom.remove();
	for(var i = 1;i <$('#knowType .typeBar').length;i++){
		$('#knowType .typeBar').eq(i).find('.sortNum').text(i+'.');
	}
}