$(function(){
	var raW = $('#loadarea').width()-202;
	$('#know .rightArea').css('width',raW);
	$('#know .main').css('height',$('#loadarea').height()-31);
	$('#knowdg').parent().css('height',$('#loadarea').height()-31);
	var lW = $('#loadarea').width()*.944;
	var lH = $('#loadarea').height()-31;
	$('#know .knowEdit').css('height',lH+'px');
	$('#knowdg').datagrid({
	    rownumbers:"true",
	    singleSelect:true,
	    pagination:true,
	    toolbar:"#know .invitetop",
	    method:"post",
	    fit: true, 
	    columns:[[
	        {field:"titleName",title:"知识文档标题",resizable:true,fitColumns:true,width:(raW-1000),formatter:function(value,row,index){
	        	var id = "'"+row.docId+"'";
	        	return '<span onclick="toKnowLook('+id+')">'+value+'</span>';
	        }},
	        {field:"departmentName",title:"部门",resizable:true,fitColumns:true,align:"center",width:120}, 
	        {field:"firstCategoryName",title:"一级类别",resizable:true,fitColumns:true,align:"center",width:120}, 
	        {field:"secondCategoryName",title:"二级类别",resizable:true,fitColumns:true,align:"center",width:120}, 
	        {field:"clickAmount",title:"点击数",resizable:true,fitColumns:true,align:"center",width:100,formatter:function(value,row,index){
	        	if(value){
	        		return value
	        	}else{
	        		return 0;
	        	}
	        }}, 
	        {field:"replyAmount",title:"评论数",resizable:true,fitColumns:true,align:"center",width:100,formatter:function(value,row,index){
	        	if(value){
	        		return value
	        	}else{
	        		return 0;
	        	}
	        }}, 
	        {field:"createTimeStr",title:"创建时间",resizable:true,fitColumns:true,align:"center",width:120}, 
	        {field:"_op",title:"操作",resizable:true,fitColumns:true,align:"center",width:100,formatter:function(value,row,index){
	        	var opera = '';
	        	var id = "'"+row.docId+"'";
	        	if(existPermission('admin:workOfficeDoc:knowManage:know:update'))
	        		opera += '<span class="small-button edit" title="修改" onclick="editKnow('+id+')"></span>';
	        	if(existPermission('admin:workOfficeDoc:knowManage:know:update'))
	        		opera += '<span class="small-button delete" title="删除" onclick="deleteKnow('+id+')"></span>';
	        	return opera;
	        	
	        }},
	    ]]
	});
	//公文树
	$('#knowD').tree({
        url: "../../department/getFramework.do?getMs="+getMS(),
        method:"post",
        animate: false,
        checkbox : false,//是否显示复选框 
        cascadeCheck: false,
        dnd:true,
        onClick: function(node,e){
        	$('#know .main .departmentUrl').val(node.id);
        	$('#know .rightArea .query').click();
	    },
    });
	//选择部门
	$('#know .knowEdit .knowClass .departmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#know .knowEdit .knowClass input[name=departmentName]').val(chooseDept.text);
		     $('#know .knowEdit .knowClass input[name=departmentUrl]').val(chooseDept.id);
		     $('#chooseDept .confirm').unbind();
		})
	});
	//查询
	$('#know .rightArea .query').click(function(){
		var departmentUrl = $('#know .main .departmentUrl').val();
		$('#knowdg').datagrid({
			url:'../../know/queryDoc.do?getMs='+getMS(),
			queryParams: {
				typeFlag:1,
				departmentUrl:departmentUrl,
				titleName: $('#know .rightArea .invitetop .titleName').val()
			},
		});
	});
	UE.delEditor("knowText");
	UE.getEditor('knowText', {
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
	$('#know .knowEdit .knowClass .firstCategoryId').change(function(){
		var firstCategoryId = $(this).val();
		if(firstCategoryId){
			knowAddSecondCategory(firstCategoryId);
		}
	});
	//保存
	$('#know .knowEdit .editBtn .confirm').click(function(){
		var docId = $('#know .knowEdit .knowClass .titleName').attr('docId');
		var titleName = $.trim($('#know .knowEdit .knowClass .titleName').val());
		var firstCategoryId = $('#know .knowEdit .knowClass .firstCategoryId').val();
		var secondCategoryId = $('#know .knowEdit .knowClass .secondCategoryId').val();
		var departmentName = $('#know .knowEdit .knowClass input[name=departmentName]').val();
		var departmentUrl = $('#know .knowEdit .knowClass input[name=departmentUrl]').val();
		var text = $.trim(UE.getEditor('knowText').getContent());
		var typeFlag = 1;
		if(titleName == ''||titleName == null){
			windowControl('标题不能为空');
			return;
		}else if(text == ''||text == null){
			windowControl('内容不能为空');
			return;
		}else if(departmentName == ''||departmentName == null){
			windowControl('部门不能为空');
			return;
		}else{
			var info = {
				docId:docId,
				titleName:titleName,
				firstCategoryId:firstCategoryId,
				secondCategoryId:secondCategoryId,
				typeFlag:typeFlag,
				text:text,
				departmentName:departmentName,
				departmentUrl:departmentUrl
			}
			$.ajax({
				data:info,
				url:'../../know/updateDoc.do?getMs='+getMS(),
				success:function(data){
					if(data == 200){
						windowControl('修改成功');
						UE.getEditor('knowText').setContent('');
						$('#know .knowEdit .knowTitle .KnowTitleName .titleName').val('');
						$('#know .knowEdit .knowClass input[name=departmentName]').val('');
						$('#know .main').show();
						$('#know .knowEdit').hide();
						$('#knowdg').datagrid('reload');
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
	$('#know .knowEdit .editBtn .cannel').click(function(){
		$('#know .main').show();
		$('#know .knowEdit').hide();
	});
});

/*--------加载知识类别-----------------
$.ajax({
	url:'../../know/queryFirstAndSecondCategory.do?getMs='+getMS(),
	success:function(data){
		data = $.parseJSON(data).rows;
		var str = '';
		var len = 0;
		for(var i = 0;i<data.length;i++){
			if(i==0){
				str += '<div class="knowNavBar"><h4 id="'+data[i].firstCategoryId+'">'+data[i].firstCategoryName+'</h4><ul>';
			}else{
				str += '<div class="knowNavBar"><h4 id="'+data[i].firstCategoryId+'">'+data[i].firstCategoryName+'</h4><ul>';
			}
			//str += '<div class="knowNavBar"><h4 id="'+data[i].firstCategoryId+'">'+data[i].firstCategoryName+'</h4><ul>';
			if(data[i].list){
				len = data[i].list.length;
				for(var j = 0;j<len;j++){
					if(j==0){
						str += '<li class="nowLi" id="'+data[i].list[j].secondCategoryId+'">'+data[i].list[j].secondCategoryId+'</li>';
					}else{
						str += '<li id="'+data[i].list[j].secondCategoryId+'">'+data[i].list[j].secondCategoryId+'</li>';
					}
					str += '<li id="'+data[i].list[j].secondCategoryId+'">'+data[i].list[j].secondCategoryName+'</li>';
				}
			}
			str += '</ul></div>';
		}
		$('#know .main .leftNav .knowNav').html(str);
		knowNavMove();
	}
});
-----------------------
function knowNavMove(){
	var navCord = true;
	$('#know .knowNavBar h4').click(function(){
		var ul = $(this).next();
		var liLen = ul.find('li').length;
		if($(this).parent().attr('class') == 'knowNavBar on'){
			$(this).parent().children('ul').stop().animate({"height":0},500);
			$(this).parent().removeClass('on');
			setTimeout(function(){
				$('#know .on').children('ul').css('overflow-y','auto');
			},500);
		}else if(navCord){
			$('.knowNavBar').stop();
			$('#know .on').children('ul').stop().animate({'height':0},500);
			$('.knowNavBar').removeClass('on');
			$(this).parent().children('ul').stop().animate({'height':(liLen*25)+'px'},500);
			$(this).parent().addClass('on');
			setTimeout(function(){
				$('#know .on').children('ul').css('overflow-y','auto');
			},500);
		}
		navCord = false;
		setTimeout(function(){navCord = true},500);
	});
	$('#know .knowNavBar ul li').click(function(){
		$('#know .nowLi').removeClass('nowLi');
		$(this).addClass('nowLi');
		var id = $(this).attr('id');
		$('#know .rightArea .invitetop .secondCategoryId').val(id);
		$('#knowdg').datagrid({
			url:'../../know/queryDoc.do?getMs='+getMS(),
			queryParams: {
				typeFlag:1,
		    	secondCategoryId: $('#know .rightArea .invitetop .secondCategoryId').val(),
				titleName: $('#know .rightArea .invitetop .titleName').val()
			},
		});
	});
}*/
/*-----------跳转------------*/
function toKnowLook(id){
	toKnowLookDocId = id;
	loadPage('workOfficeDoc/knowManage','knowLook','知识文档');
}
/*--------------------*/
function editKnow(id){
	$('#know .main').hide();
	$('#know .knowEdit').show();
	$.ajax({
		data:{docId:id},
		url:"../../know/queryDoc.do?getMs="+getMS(),
		success:function(data){
			data = $.parseJSON(data).rows;
			$('#know .knowEdit .knowClass .titleName').attr('docId',id);
			$('#know .knowEdit .knowClass .titleName').val(data[0].titleName);
			$('#know .knowEdit .knowClass input[name=departmentName]').val(data[0].departmentName);
			$('#know .knowEdit .knowClass .firstCategoryId').val(data[0].firstCategoryId);
			$('#know .knowEdit .knowClass .secondCategoryId').val(data[0].secondCategoryId);
			UE.getEditor('knowText').setContent(data[0].text);
		}
	})
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
		$('#know .knowEdit .knowClass .firstCategoryId').html(str);
		knowAddSecondCategory(data[0].firstCategoryId);
	}
});

//加载2级类别
function knowAddSecondCategory(id){
	$.ajax({
		data:{firstCategoryId:id},
		url:'../../know/querySecondCategory.do?getMs='+getMS(),
		success:function(data){
			data = $.parseJSON(data).rows;
			var str = '';
			for(var i=0;i<data.length;i++){
				str += '<option value="'+data[i].secondCategoryId+'">'+data[i].secondCategoryName+'</option>'
			}
			$('#know .knowEdit .knowClass .secondCategoryId').html(str);
		}
	});
}
function deleteKnow(id){
	ui.confirm('确定要删除这个文档吗?',function(z){
		if(z){
			$.ajax({
				data:{docId:id,aliveFlag:'0'},
				url:'../../know/updateDoc.do?getMs='+getMS(),
				success:function(data){
					if(data =200){
						windowControl('删除成功');
					}else{
						windowControl('删除失败');
					}
					$('#knowdg').datagrid('reload');
				},
				error:function(err){
					windowControl('服务器异常');
				}
			});
		}
	},false);
}