$(function(){
	var lW = $('#loadarea').width()*.944;
	var lH = $('#loadarea').height()-31;
	$('#knowEdit').css('height',lH+'px');
	UE.delEditor("knowEditor");
	UE.getEditor('knowEditor', {
	    theme:"default", //皮肤
	    lang:'zh-cn',//语言
	    autoHeightEnabled:false,  //不长高,出现滚动条
	    initialFrameWidth:1000,  //初始化编辑器宽度,默认1000
	    initialFrameHeight:300, //初始化编辑器高度,默认320
	    //elementPathEnabled : false,　　//是否启用元素路径，默认是true显示
	    wordCount:false,          //是否开启字数统计
	    enableAutoSave: false, 
	   // enableContextMenu: false,     //关闭右键菜单功能
	});
	//动态加载2级类别
	$('#knowEdit .knowClass .firstCategoryId').change(function(){
		var firstCategoryId = $(this).val();
		if(firstCategoryId){
			addSecondCategory(firstCategoryId);
		}
	});
	//选择部门
	$('#knowEdit .knowClass .departmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#knowEdit .knowClass input[name=departmentName]').val(chooseDept.text);
		     $('#knowEdit .knowClass input[name=departmentUrl]').val(chooseDept.id);
		     $('#chooseDept .confirm').unbind();
		})
	});
	//发布
	$('#knowEdit .btnArea .confirm').click(function(){
		var titleName = $.trim($('#knowEdit .knowClass .titleName').val());
		var firstCategoryId = $('#knowEdit .knowClass .firstCategoryId').val();
		var secondCategoryId = $('#knowEdit .knowClass .secondCategoryId').val();
		var text = $.trim(UE.getEditor('knowEditor').getContent());
		var departmentUrl = $('#knowEdit .knowClass input[name=departmentUrl]').val();
		var departmentName = $('#knowEdit .knowClass input[name=departmentName]').val();
		if(titleName == ''||titleName == null){
			windowControl('标题不能为空');
			return;
		}else if(text == ''||text == null){
			windowControl('内容不能为空');
			return;
		}else if(firstCategoryId == ''|| firstCategoryId == null){
			windowControl('一级类别不能为空');
			return;
		}else if(secondCategoryId == ''|| secondCategoryId == null){
			windowControl('二级类别不能为空');
			return;
		}else if(departmentName == ''|| departmentName == null){
			windowControl('部门不能为空');
			return;
		}else{
			var info = {
				titleName:titleName,
				firstCategoryId:firstCategoryId,
				secondCategoryId:secondCategoryId,
				typeFlag:1,
				text:text,
				departmentName:departmentName,
				departmentUrl:departmentUrl
			}
			$.ajax({
				data:info,
				url:'../../know/saveDoc.do?getMs='+getMS(),
				success:function(data){
					console.log(data);
					if(data ==200){
						windowControl('发布成功');
						$('#knowEdit .knowTitle .KnowTitleName .titleName').val('');
						UE.getEditor('knowEditor').setContent('');
					}else{
						windowControl('发布失败');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	});
	//保存到草稿
	$('#knowEdit .btnArea .save').click(function(){
		var titleName = $.trim($('#knowEdit .knowClass .titleName').val());
		var firstCategoryId = $('#knowEdit .knowClass .firstCategoryId').val();
		var secondCategoryId = $('#knowEdit .knowClass .secondCategoryId').val();
		var text = $.trim(UE.getEditor('knowEditor').getContent());
		var departmentName = $('#knowEdit .knowClass input[name=departmentName]').val();
		var info = {
			titleName:titleName,
			firstCategoryId:firstCategoryId,
			secondCategoryId:secondCategoryId,
			typeFlag:0,
			text:text,
			departmentName:departmentName
		}
		$.ajax({
			data:info,
			url:'../../know/saveDoc.do?getMs='+getMS(),
			success:function(data){
				if(data ==200){
					windowControl('保存草稿成功');
					$('#knowEdit .knowTitle .KnowTitleName .titleName').val('');
					UE.getEditor('knowEditor').setContent('');
				}else{
					windowControl('保存草稿失败');
				}
			},
			error:function(err){
				windowControl('网络异常');
			}
		});
	});
});
//加载一级类别
$.ajax({
	url:'../../know/queryFirstCategory.do?getMs='+getMS(),
	success:function(data){
		data = $.parseJSON(data).rows;
		var str = '';
		for(var i=0;i<data.length;i++){
			str += '<option value="'+data[i].firstCategoryId+'">'+data[i].firstCategoryName+'</option>'
		}
		$('#knowEdit .knowClass .firstCategoryId').html(str);
		addSecondCategory(data[0].firstCategoryId);
	}
});

//加载2级类别
function addSecondCategory(id){
	$.ajax({
		data:{firstCategoryId:id},
		url:'../../know/querySecondCategory.do?getMs='+getMS(),
		success:function(data){
			data = $.parseJSON(data).rows;
			var str = '';
			for(var i=0;i<data.length;i++){
				str += '<option value="'+data[i].secondCategoryId+'">'+data[i].secondCategoryName+'</option>'
			}
			$('#knowEdit .knowClass .secondCategoryId').html(str);
		}
	});
}