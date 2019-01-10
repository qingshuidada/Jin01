var process_function = {}

process_function.presentContract = function(thisDom){
	var userId =  $('#punchCard').attr('data');
	$.ajax({
		url:'../../contract/selectContract.do?getMs='+getMS(),
		data:{orderExecutorId:userId},
		success:function(data){
			data = $.parseJSON(data).rows;
			str = '';
			for(var i = 0;i<data.length;i++){
				str += '<option value="'+i+'">'+data[i].contractName+'</option>';
			}
			
			
			$('.process-form table .textarea textarea[name=contractDescribe]').val(data[0].contractDescribe);
			$(thisDom).html(str);
			process_function.loadDescribe(thisDom,data);
		},
		error:function(err){
			
		}
	})
}

process_function.loadDescribe = function(thisDom,data){
	$(thisDom).change(function(){
		var i = $(this).val();
		$('.process-form table .textarea textarea[name=contractDescribe]').val(data[i].contractDescribe);
	});
}

process_function.loadDocumentDoc = function(thisDom){
	thisDom = $(thisDom);
	$('#chooseCatalog .catalog').tree('reload'); 
	$('#chooseCatalog').css('display','block');;
	$('#chooseCatalog').find('.confrim').unbind();
	$('#chooseCatalog').find('.confirm').click(function(){
		var chooseCatalogObj = $('#chooseCatalog .catalog').tree('getSelected');
		var dom = thisDom.parent();
		dom.find('input[name=catalogUrl]').val(chooseCatalogObj.id);
		dom.find('input[name=catalogName]').val(chooseCatalogObj.text);
		$('#chooseCatalog').css('display','none');
	})
}
//物资申请 的物品类型选择
process_function.loadGoodsType = function(thisDom){
	thisDom = $(thisDom);
	$('#chooseGoodsType .goodsType').tree('reload'); 
	$('#chooseGoodsType').css('display','block');
	$('#chooseGoodsType').find('.confirm').click(function(){
		var chooseGoodsType = $('#chooseGoodsType .goodsType').tree('getSelected');
		var dom = thisDom.parent();
		dom.find('input[name=goodsTypeName]').val(chooseGoodsType.text);
		dom.find('input[name=goodsTypeUrl]').val(chooseGoodsType.id);
		$('#chooseGoodsType').css('display','none');
	})
}

