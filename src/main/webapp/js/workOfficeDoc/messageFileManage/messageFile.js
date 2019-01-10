$(function(){	
	if(existPermission('admin:workOfficeDoc:messageFileManage:messageFile:addFolder'))
		$('#messageFile .opera').append('<input type="button" class="button addFolder" value="新建文件夹"/>');
	if(existPermission('admin:workOfficeDoc:messageFileManage:messageFile:addFile')){
		$('#messageFile .opera').append('<input type="button" class="button addFilet" value="上传文件"/>');
		$('#messageFile .opera').append('<input type="file" class="filet" style="width:167px;"/>');
	}
	if(existPermission('admin:workOfficeDoc:messageFileManage:messageFile:delete'))
		$('#messageFile .rightPopup').append('<li class="delfolder">删除</li>');
	if(existPermission('admin:workOfficeDoc:messageFileManage:messageFile:update'))
		$('#messageFile .rightPopup').append('<li class="update">重命名</li>');
	//内容高度
	$('#messageFile .content').css('height',$('#loadarea').height()-60 + 'px');
	//部门展示
	$('#messageFile .dept').tree({
	    url:'../../department/getFramework.do?getMs='+getMS(),
	    lines:true,
		onDblClick:function(){	
			var departmentUrl = $('#messageFile .dept').tree('getSelected').id;
			var text = $('#messageFile .dept').tree('getSelected').text;
			$('#messageFile .filePath .opera').attr('name',text);
			var str = '<li data="'+ departmentUrl +'"><span>'+ text +'&nbsp;&gt;&nbsp;</span></li>';
			$('#messageFile .content .filePath ul').html(str);			
			$('#messageFile .filePath .opera').attr('data',departmentUrl);
			//展示部门根文件夹
			$('#messageFile .filePath .opera').show();
			messageFileGetData(departmentUrl,0);
		}
    });
	
	//点击去除右键菜单
	$(document).click(function(){
		$('#messageFile .rightPopup').hide();
		$('#messageFile .rightPopup').removeAttr('data');
	})
	//阻止右键默认菜单弹出
	$('#messageFile .rightPopup').bind("contextmenu" , function(){
		return false;
	})
	// 返回上一个文件夹
	$('#messageFile .filePath .opera .prev').click(function(){
		var number = $('#messageFile .filePath ul li').length - 2;
		if(number >= 0){				
			var id = $('#messageFile .filePath ul li').eq(number).attr('data');
			$('#messageFile .content .filePath ul li').last().remove();
			if(number==0){				
				messageFileGetData(id,0);
			}else{
				messageFileGetData(id,1);
			}
		}else if(number < 0){
			$('#messageFile .content .filePath ul').html('');
			$('#messageFile .content .list').html('');
			$('#messageFile .filePath .opera').hide();
		}
	})
	//上传文件
	$('#messageFile .filePath .opera .addFilet').click(function(){
		messageFileAdd(0);
	})
	//新建文件夹
	$('#messageFile .filePath .opera .addFolder').click(function(){
		messageFileAdd(1);		
	})
	//重命名文件或文件夹
	$('#messageFile .rightPopup .update').click(function(){
		var fileFolderId = $('#messageFile .rightPopup').attr('data');
		var typeFlag = $('#messageFile .rightPopup').attr('typeflag');
		var url = $('#messageFile .rightPopup').attr('url');
		var departmentName = $('#messageFile .filePath .opera').attr('name');
		var path = $('#messageFile .filePath ul li').length;
		var text = $('#messageFile .rightPopup').attr('name');
		var hz = '';
		//若是文件，则截取可改的文件名
		if(typeFlag == 0){
			var len = text.lastIndexOf('.');
			if(len >= 0){
				hz = text.substr(len,text.length);
				text = text.substr(0,len);
			}
		}		
		var name = prompt("请输入新的名称",text)
		if (name!=null && name!=""){
			$.ajax({
				url:'../../messageFile/updateFileFolder.do?getMs='+getMS(),
				data:{
					url:url,
					departmentName:departmentName,
					fileFolderId:fileFolderId,
					oldFileFolderName:text+hz,
					newFileFolderName:name+hz,
					typeFlag:typeFlag
				},
				type:'post',
				dataType:'json',
				success:function(data){
					if(data == 200){
						if(path == 1){							
							messageFileGetData($('#messageFile .content .filePath ul li').last().attr('data'),0)
						}else{
							messageFileGetData($('#messageFile .content .filePath ul li').last().attr('data'),1)
						}
					}
				},
				error:function(error){
					windowControl(error.status);
				}
			})
		}
		
	})
	//删除
	$('#messageFile .rightPopup .delfolder').click(function(){
		var url = $('#messageFile .rightPopup').attr('url');
		var path = $('#messageFile .filePath ul li').length;
		var departmentName = $('#messageFile .filePath .opera').attr('name');
		var text = $('#messageFile .rightPopup').attr('name');
		if (confirm("真的要删除吗?")){
			$.ajax({
				url:'../../messageFile/deleteFileFolder.do?getMs='+getMS(),
				data:{
					url:url,
					departmentName:departmentName,
					fileFolderName:text
				},
				type:'post',
				dataType:'json',
				success:function(data){
					if(data == 200){
						if(path == 1){
							messageFileGetData($('#messageFile .content .filePath ul li').last().attr('data'),0)
						}else{
							messageFileGetData($('#messageFile .content .filePath ul li').last().attr('data'),1)
						}
					}
				},
				error:function(error){
					windowControl(error.status);
				}
			})
		}
		
	})
	
})
//添加文件夹 上传文件
function messageFileAdd(sign){
	var departmentUrl = $('#messageFile .filePath .opera').attr('data');
	var departmentName = $('#messageFile .filePath .opera').attr('name');
	var previd = $('#messageFile .content .filePath ul li').last().attr('data');
	var prevUrl = $('#messageFile .content .filePath ul li').last().attr('url') || '';
	var path = $('#messageFile .filePath ul li').length;
	if(path == 1){
		previd = ''
	}
	var data = {
		departmentName:departmentName,
		departmentUrl:departmentUrl,
		previousFileFolderId:previd,
		url:prevUrl,	
	};
	if(sign == 1){
		//新建文件夹
		var name = prompt("请输入文件夹的名称","")
		if (name!=null && name!=""){
			data.fileFolderName = name;
			data.typeFlag = 1;			
			$.ajax({
				url:'../../messageFile/addFolder.do?getMs='+getMS(),
				data:data,
				type:'post',
				dataType:'json',
				success:function(data){
					if(data == 200){
						if(path == 1){							
							messageFileGetData($('#messageFile .content .filePath ul li').last().attr('data'),0)
						}else{
							messageFileGetData(previd,1)
						}
					}
				},
				error:function(error){
					windowControl(error.status);
				}
			});
		}
	}else if(sign == 0){
		//上传文件
		data.typeFlag = 0;
		var fileUrl = $('#messageFile .filePath .opera .filet').val();
		if(fileUrl == '' || fileUrl == null){
			windowControl('请先选择上传的附件！');
			return ;
		}else{
			$('#messageFile .filePath .opera .filet').upload({
				url:'../../messageFile/addFile.do?getMs='+getMS(),
				params:data,
				onComplate: function (data) {
					if(data == 200){
						$('#messageFile .filePath .opera .filet').val('');
						if(path == 1){							
							messageFileGetData($('#messageFile .content .filePath ul li').last().attr('data'),0)
						}else{
							messageFileGetData(previd,1)
						}
					}
						
				}
			});
			$('#messageFile .filePath .opera .filet').upload("ajaxSubmit");
		}
	}
	
}
//获取文件
function messageFileGetData(id,sign){
	var data = '';
	if(sign == 0){
		//获取部门下文件和文件夹
		data = {
			departmentUrl:id
		}
	}else if(sign == 1){
		data = {
			fileFolderId:id
		}
	}
	$.ajax({
		url:'../../messageFile/queryFileFolder.do?getMs='+getMS(),
		data:data,
		type:'post',
		dataType:'json',
		success:function(data){
			var list = data.rows;					
			if(list.length >= 0){
				//清空页面
				$('#messageFile .content .list').html('');
				messageFileHtml(list);
			}
		},
		error:function(error){
			windowControl(error.status);
		}
	});
}
//画文件和文件夹 并绑定事件
function messageFileHtml(list){
	if(list.length == 0){
		return;
	}
	var str = '';
	for(var i=0; i<list.length; i++){
		var name = list[i].fileFolderName;		
		if(list[i].typeFlag == 1){
			str += '<li data="'+ list[i].fileFolderId +'" type="'+ list[i].typeFlag +'" url="'+ list[i].url +'"><span class="pic folder"></span><p>'+ name +'</p></li>'
		}else if(list[i].typeFlag == 0){
			str += '<li data="'+ list[i].fileFolderId +'" type="'+ list[i].typeFlag +'" url="'+ list[i].url +'"><span class="pic filet"></span><p>'+ name +'</p></li>'
		}
		
	}
	$('#messageFile .content .list').html(str);	
	//阻止默认事件
	$('#messageFile .content .list li').bind("contextmenu" , function(){
		return false;
	})	
	$('#messageFile .content .list li').mousedown(function(e) {
	    if(e.which == 3){ //右键为3
	    	var e = e || window.event;
	    	var typeFlag = $(this).attr('type');
	    	var url = $(this).attr('url');
	    	var fileFolderId = $(this).attr('data');
	    	var text = $(this).find('p').text();
	    	$('#messageFile .rightPopup').show();
	        $('#messageFile .rightPopup').css({'top':e.clientY,'left':e.clientX});
	        $('#messageFile .rightPopup').attr('typeflag',typeFlag);
	        $('#messageFile .rightPopup').attr('url',url);
	        $('#messageFile .rightPopup').attr('data',fileFolderId);
	        $('#messageFile .rightPopup').attr('name',text);
	    }
	})
	
	//双击进入文件夹
	$('#messageFile .content .list li').dblclick(function(){
		var type = $(this).attr('type');
		var fileFolderId = $(this).attr('data');
		var url = $(this).attr('url');		
		
		if(type==1){//文件夹
			var text = $(this).find('p').text();
			var textHtml = '<li data="'+ fileFolderId +'" url="'+ url +'"><span>'+ text +'&nbsp;&gt;&nbsp;</span></li>';
			$('#messageFile .content .filePath ul').append(textHtml);			
			messageFileGetData(fileFolderId,1);
		}else if(type==0){//文件
			var url = $(this).attr('url');
			var departmentName = $('#messageFile .filePath .opera').attr('name');
			var fileName = $(this).find('p').text();
			var href = "../../messageFile/downLoadMessageFile.do?url="+url+"&departmentName="+departmentName+"&fileFolderName="+fileName;
			$('#messageFile #messageFileLoad').attr('href',href);
			document.getElementById('messageFileLoad').click();
		}
	})
	
}

