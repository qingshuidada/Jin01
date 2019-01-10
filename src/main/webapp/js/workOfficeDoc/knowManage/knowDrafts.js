$(function(){
	var lW = $('#loadarea').width()*.944;
	var lH = $('#loadarea').height()-31;
	$('#knowDrafts .knowEdit').css('height',lH+'px');
	$('#knowDrafts .knowEdit .KnowTitleName input').css('width',lW-129+'px');
	$('#knowDrafts .knowEdit .knowClass>select').css('width',(lW-252)/2+'px');
	$('#knowDrafts .knowEdit .knowUeditor').css('width',lW-127+'px');
	$('#knowDraftsdg').datagrid({
		url:"../../know/queryDoc.do?getMs="+getMS(),
	    rownumbers:"true",
	    singleSelect:true,
	    pagination:true,
	    toolbar:"#knowDrafts .invitetop",
	    method:"post",
	    fit: true,
	    queryParams: {
	    	typeFlag:0,
	    	createUserId:$('body').attr('useraccount')
	    },
	    columns:[[
	        {field:"titleName",title:"草稿名",resizable:true,fitColumns:true,align:"left",width:($('#loadarea').width()-266)},     
	        {field:"updateTimeStr",title:"修改时间",resizable:true,fitColumns:true,align:"center",width:120}, 
	        {field:"_op",title:"操作",resizable:true,fitColumns:true,align:"center",width:100,formatter:function(value,row,index){
	        	var opera = '';
	        	id = "'"+row.docId+"'";
	        	var textFlag = false;
	        	var titleNameFlag = false;
	        	if(row.text !=''&&row.text != null){
	        		textFlag = true;
	        	}
	        	if(row.titleName != '未命名'){
	        		titleNameFlag = true;
	        	}
	        	opera += '<span class="small-button edit" title="修改" onclick="editDrafts('+id+')"></span>';
	        	opera += '<span class="small-button publish" title="发布" onclick="publishDrafts('+id+','+textFlag+','+titleNameFlag+')"></span>';
	        	opera += '<span class="small-button delete" title="删除" onclick="deleteDrafts('+id+')"></span>';
	        	return opera;
	        }}, 
	    ]]
	});
	//查询
	$('#knowDrafts .invitetop .query').click(function(){
		var titleName = $('#knowDrafts .invitetop .titleName').val();
		var startTimeStr = $('#knowDrafts .invitetop .startTime').val();
		var endTimeStr = $('#knowDrafts .invitetop .endTime').val();
		$('#knowDraftsdg').datagrid({
			queryParams: {
		    	typeFlag:0,
		    	createUserId:$('body').attr('userId'),
		    	titleName:titleName,
		    	startTimeStr:startTimeStr,
		    	endTimeStr:endTimeStr
		    },
		});
	});
	UE.delEditor("knowDraftsEditor");
	UE.getEditor('knowDraftsEditor', {
	    theme:"default", //皮肤
	    lang:'zh-cn',//语言
	    autoHeightEnabled:false,  //不长高,出现滚动条
	    initialFrameWidth:lW-127,  //初始化编辑器宽度,默认1000
	    initialFrameHeight:lH-250, //初始化编辑器高度,默认320
	    //elementPathEnabled : false,　　//是否启用元素路径，默认是true显示
	    wordCount:false,          //是否开启字数统计
	    enableAutoSave: false, 
	   // enableContextMenu: false,     //关闭右键菜单功能
	});
	//动态加载2级类别
	$('#knowDrafts .knowEdit .knowClass .firstCategoryId').change(function(){
		var firstCategoryId = $(this).val();
		if(firstCategoryId){
			draftsAddSecondCategory(firstCategoryId);
		}
	});
	//保存
	$('#knowDrafts .knowEdit .editBtn .confirm').click(function(){
		var docId = $('#knowDrafts .knowEdit .knowTitle .titleName').attr('docId');
		var titleName = $.trim($('#knowDrafts .knowEdit .knowTitle .KnowTitleName .titleName').val());
		var firstCategoryId = $('#knowDrafts .knowEdit .knowClass .firstCategoryId').val();
		var secondCategoryId = $('#knowDrafts .knowEdit .knowClass .secondCategoryId').val();
		var text = $.trim(UE.getEditor('knowDraftsEditor').getContent());
		var typeFlag = '';
		if(titleName == ''||titleName == null){
			windowControl('标题不能为空');
			return;
		}else if(text == ''||text == null){
			windowControl('内容不能为空');
			return;
		}else{
			var info = {
				docId:docId,
				titleName:titleName,
				firstCategoryId:firstCategoryId,
				secondCategoryId:secondCategoryId,
				typeFlag:typeFlag,
				text:text
			}
			console.log(info);
			$.ajax({
				data:info,
				url:'../../know/updateDoc.do?getMs='+getMS(),
				success:function(data){
					if(data == 200){
						windowControl('修改成功');
						UE.getEditor('knowDraftsEditor').setContent('');
						$('#knowEdit .knowTitle .KnowTitleName .titleName').val('');
						$('#knowDrafts .list').show();
						$('#knowDrafts .knowEdit').hide();
						$('#knowDraftsdg').datagrid('reload');
					}else{
						windowControl('修改失败');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	}); 
	//取消关闭
	$('#knowDrafts .knowEdit .editBtn .cannel').click(function(){
		$('#knowDrafts .list').show();
		$('#knowDrafts .knowEdit').hide();
	});
});
//修改草稿
function editDrafts(id){
	$('#knowDrafts .list').hide();
	$('#knowDrafts .knowEdit').show();
	$.ajax({
		data:{docId:id},
		url:"../../know/queryDoc.do?getMs="+getMS(),
		success:function(data){
			data = $.parseJSON(data).rows;
			$('#knowDrafts .knowEdit .knowTitle .titleName').attr('docId',id);
			$('#knowDrafts .knowEdit .knowTitle .titleName').val(data[0].titleName);
			$('#knowDrafts .knowEdit .knowClass .firstCategoryId').val(data[0].firstCategoryId);
			$('#knowDrafts .knowEdit .knowClass .secondCategoryId').val(data[0].secondCategoryId);
			UE.getEditor('knowDraftsEditor').setContent(data[0].text);
		}
	})
}
//发布草稿
function publishDrafts(id,textFlag,titleNameFlag){
	if(textFlag&&titleNameFlag){
		ui.confirm('确定要发布该草稿吗?',function(z){
			if(z){
				$.ajax({
					data:{docId:id,typeFlag:1},
					url:"../../know/updateDoc.do?getMs="+getMS(),
					type:'get',
					success:function(data){
						if(data == 200){
							$('#knowDraftsdg').datagrid("reload");
							windowControl('发布草稿成功');
						}else{
							windowControl('发布草稿失败');
						}	
					},
					error:function(){
						windowControl('网络异常');
					}
				});
			}
		},false);
	}else if(!textFlag){
		windowControl('该草稿内容为空不能发布');
	}else if(!titleNameFlag){
		windowControl('该草稿标题为空不能发布');
	}
	
}
//删除草稿
function deleteDrafts(id){
	ui.confirm('确定要删除该草稿吗?',function(z){
		$.ajax({
			data:{docId:id,aliveFlag:'0'},
			url:"../../know/updateDoc.do?getMs="+getMS(),
			type:'get',
			success:function(data){
				if(data == 200){
					windowControl('删除草稿成功');
					$('#knowDraftsdg').datagrid('reload');
				}else{
					windowControl('删除草稿失败');
				}	
			},
			error:function(){
				windowControl('网络异常');
			}
		});
	},false);
}
//加载一级类别
$.ajax({
	url:'../../know/queryFirstCategory.do?getMs='+getMS(),
	success:function(data){
		data = $.parseJSON(data).rows;
		var str = '';
		for(var i=0;i<data.length;i++){
			str += '<option value="'+data[i].firstCategoryId+'">'+data[i].firstCategoryName+'</option>'
		}
		$('#knowDrafts .knowEdit .knowClass .firstCategoryId').html(str);
		draftsAddSecondCategory(data[0].firstCategoryId);
	}
});

//加载2级类别
function draftsAddSecondCategory(id){
	$.ajax({
		data:{firstCategoryId:id},
		url:'../../know/querySecondCategory.do?getMs='+getMS(),
		success:function(data){
			data = $.parseJSON(data).rows;
			var str = '';
			for(var i=0;i<data.length;i++){
				str += '<option value="'+data[i].secondCategoryId+'">'+data[i].secondCategoryName+'</option>'
			}
			$('#knowDrafts .knowEdit .knowClass .secondCategoryId').html(str);
		}
	});
}