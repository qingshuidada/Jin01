var process_plugin = {}

/**
 * 加载流程审批与抄送节点信息
 *  参数信息 
 *  dom jq的dom节点对象 
 *	data 向后台进行发送的信息
 *  readOnly 是否只读,不允许添加删除流程节点
 */
process_plugin.loadingProcess = function(param){
	var dom = param.dom;
	//清空这部分的html
	dom.html('');
	var typeId = param.data.typeId;
	var readonly = param.readonly;
	$.ajax({
		type:'post',
		data:param.data,
		url:param.getUrl,
		dataType:'json',
		success:function(data){
			if(data == '500'){
				alert('服务器异常');
				return;
			}else{
				var next = '<img class="next" src="../../img/index/arrows-right.png"/>';
				var noCheck = '<img class="noCheck" src="../../img/index/noCheck.png" />';
				//添加审批人
				var process = $('<div>');
				process.attr('typeId',typeId);
				process.attr('class','process');
				process.append('<div class="text">审批人：</div>');
				var excuteUserHead = data.excuteUserHead;
				if(excuteUserHead && excuteUserHead.length > 0){
					for(var i = 0 ; i < excuteUserHead.length ; i++){
						var nextTask = excuteUserHead[i];
						var executorUser = $('<span>');
						executorUser.attr('class','executorUser');
						executorUser.append(nextTask.executorName);
						if(readonly == false){
							executorUser.append(noCheck);
							executorUser.click(function(){
								process_plugin.deleteExecute(this);
							})
						}
						executorUser.attr('taskId',nextTask.taskId);
						process.append(executorUser);
						process.append(next);
					}
					if(readonly != false){
						process.find(':last').remove();
					}
				}
				dom.append(process);
				//如果不是只读则添加添加审批人按钮，然后添加必须的审批人
				if(readonly == false){
					process.append('<span class="executorUser addExecutorUser" onclick="process_plugin.addExecute(this)">添加</span>');
					var mustExcuteUserHead = data.mustExcuteUserHead;
					if(mustExcuteUserHead && mustExcuteUserHead.length > 0){
						var mustProcess = $('<div>');
						mustProcess.attr('typeId',typeId);
						mustProcess.attr('class','process');
						mustProcess.append('<div class="text">必须的审批人：</div>');
						for(var i = 0 ; i < mustExcuteUserHead.length ; i++){
							var executorUser = $('<span>');
							executorUser.attr('class','executorUser');
							executorUser.append(mustExcuteUserHead[i].executorName);
							executorUser.attr('taskId',mustExcuteUserHead[i].taskId);
							mustProcess.append(executorUser);
							mustProcess.append(next);
						}
						mustProcess.find(':last').remove();
						dom.append(mustProcess);
					}
				}
				//添加抄送人
				var copyto = $('<div>');
				copyto.attr('typeId',typeId);
				copyto.attr('class','copyto');
				copyto.append('<div class="text">抄送人：</div>');
				if(data.copyToUsers && data.copyToUsers.length > 0){
					for(var i = 0 ; i < data.copyToUsers.length ; i++){
						var executorUser = $('<span>');
						executorUser.attr('class','executorUser');
						executorUser.append(data.copyToUsers[i].executorName);
						if(readonly == false){
							executorUser.append(noCheck);
							executorUser.click(function(){
								process_plugin.deleteExecute(this);
							});
						}
						executorUser.attr('taskId',data.copyToUsers[i].taskId);
						copyto.append(executorUser);
					}
				}
				dom.append(copyto);
				//如果不是只读状态，则添加必须的抄送人
				if(readonly == false){
					copyto.append('<span class="executorUser addExecutorUser" onclick="process_plugin.addExecute(this)">添加</span>');
					var mustCopyToUsers = data.mustCopyToUsers;
					if(mustCopyToUsers && mustCopyToUsers.length > 0){
						var mustCopyto = $('<div>');
						mustCopyto.attr('typeId',typeId);
						mustCopyto.attr('class','copyto');
						mustCopyto.append('<div class="text">必须的抄送人：</div>');
						for(var i = 0 ; i < mustCopyToUsers.length ; i++){
							var executorUser = $('<span>');
							executorUser.attr('class','executorUser');
							executorUser.append(mustCopyToUsers[i].executorName);
							executorUser.attr('taskId',mustCopyToUsers[i].taskId);
							mustCopyto.append(executorUser);
						}
						dom.append(mustCopyto);
					}
				}
				dom.parents('.processMessage').animate({
					'height':dom.height()+10,
				},200);
			}
		},
		error:function(){
			alert('服务器未响应');
		}
	})
}


/**
 * 加载流程审批与抄送节点信息
 *  参数信息 
 *  dom jq的dom节点对象 
 *	data 向后台进行发送的信息
 *  readOnly 是否只读,不允许添加删除流程节点
 *  getUrl: 获取数据所使用的Url
 */
process_plugin.loadingMustTask = function(param){
	var dom = param.dom;
	//清空这部分的html
	dom.html('');
	var typeId = param.processTypeId;
	var readonly = param.readonly;
	$.ajax({
		type:'post',
		data:param.data,
		url:param.getUrl,
		dataType:'json',
		success:function(data){
			if(data == '500'){
				alert('服务器异常');
				return;
			}else{
				var next = '<img class="next" src="../../img/index/arrows-right.png"/>';
				var noCheck = '<img class="noCheck" src="../../img/index/noCheck.png" />';
				//如果不是只读则添加添加审批人按钮，然后添加必须的审批人
				if(readonly == false){
					var mustExcuteUserHead = data.mustExcuteUserHead;
					var mustProcess = $('<div>');
					mustProcess.attr('typeId',typeId);
					mustProcess.attr('class','process');
					mustProcess.append('<div class="text">必须的审批人：</div>');
					if(mustExcuteUserHead && mustExcuteUserHead.length > 0){
						for(var i = 0 ; i < mustExcuteUserHead.length ; i++){
							var executorUser = $('<span>');
							executorUser.attr('class','executorUser');
							executorUser.append(mustExcuteUserHead[i].executorName);
							executorUser.attr('taskId',mustExcuteUserHead[i].taskId);
							if(readonly == false){
								executorUser.append(noCheck);
								executorUser.click(function(){
									process_plugin.deleteMustExecute(this);
								})
							}
							mustProcess.append(executorUser);
							mustProcess.append(next);
						}
					}
					mustProcess.append('<span class="executorUser addExecutorUser" onclick="process_plugin.addMustExecute(this,\''+param.groupId+'\')">添加</span>');
					dom.append(mustProcess);
				}
				//如果不是只读状态，则添加必须的抄送人
				if(readonly == false){
					var mustCopyToUsers = data.mustCopyToUsers;
					var mustCopyto = $('<div>');
					mustCopyto.attr('typeId',typeId);
					mustCopyto.attr('class','copyto');
					mustCopyto.append('<div class="text">必须的抄送人：</div>');
					if(mustCopyToUsers && mustCopyToUsers.length > 0){
						for(var i = 0 ; i < mustCopyToUsers.length ; i++){
							var executorUser = $('<span>');
							executorUser.attr('class','executorUser');
							executorUser.append(mustCopyToUsers[i].executorName);
							executorUser.attr('taskId',mustCopyToUsers[i].taskId);
							if(readonly == false){
								executorUser.append(noCheck);
								executorUser.click(function(){
									process_plugin.deleteMustExecute(this);
								});
							}
							mustCopyto.append(executorUser);
						}
					}
					dom.append(mustCopyto);
					mustCopyto.append('<span class="executorUser addExecutorUser" onclick="process_plugin.addMustExecute(this,\''+param.groupId+'\')">添加</span>');
				}
				dom.parents('.processMessage').animate({
					'height':dom.height()+10,
				},200);
			}
		},
		error:function(){
			alert('服务器未响应');
		}
	})
}

/**
 * 添加审批的流程信息或者抄送信息 节点（点击事件调用）
 * 参数信息 ele js的dom节点对象
 */
process_plugin.addExecute = function(ele){
	//选择上级
	chooseUser();
	$('#chooseUser .confirm').unbind();
    $('#chooseUser .confirm').click(function(){
    	$('#chooseUser').css('display','none');
    	selectUsers = $('#chooseUser .popuparea .user').datagrid('getSelections');
    	$('#chooseUser .confirm').unbind();
    
		var dom = $(ele);
		var userId = selectUsers[0].userId;
		var userName = selectUsers[0].userName;
		var url = '';
		if(dom.parent().attr('class') == 'process'){
			url = '../../myProcess/addExecute.do';
		}else{
			url = '../../myProcess/addCopyTo.do';
		}
		$.ajax({
			url:url,
			type:'post',
			data:{
				typeId : dom.parent().attr('typeId'),
				userId:userId,
				userName:userName
			},
			success:function(data){
				if(data == 500){
					alert('添加失败');
					return ;
				}else{
					var parent = dom.parent();
					parent.children().last().remove();
					var executorUser = $('<span>');
					executorUser.attr('class','executorUser');
					executorUser.attr('taskId',data);
					executorUser.click(function(){
						process_plugin.deleteExecute(this);
					});
					executorUser.append(userName);
					executorUser.append('<img class="noCheck" src="../../img/index/noCheck.png" />');
					parent.append(executorUser);
					if(url == '../../myProcess/addExecute.do'){
						parent.append('<img class="next" src="../../img/index/arrows-right.png"/>');
					}
					parent.append('<span class="executorUser addExecutorUser" onclick="process_plugin.addExecute(this)">添加</span>');
					
					parent.parents('.processMessage').animate({
						'height':parent.parents('.box').height()+10,
					},200);
				}
			},
			error:function(){
				alert('服务器未响应');
			}
		});
    });
}

/**
 * 添加审批的流程信息或者抄送信息 节点（点击事件调用）
 * 参数信息 ele js的dom节点对象
 */
process_plugin.addMustExecute = function(ele, groupId){
	//选择上级
	chooseUser();
	$('#chooseUser .confirm').unbind();
    $('#chooseUser .confirm').click(function(){
    	$('#chooseUser').css('display','none');
    	selectUsers = $('#chooseUser .popuparea .user').datagrid('getSelections');
    	$('#chooseUser .confirm').unbind();
		var dom = $(ele);
		var userId = selectUsers[0].userId;
		var userName = selectUsers[0].userName;
		var url = '';
		if(dom.parent().attr('class') == 'process'){
			url = '../../processManage/addMustTask.do';
		}else{
			url = '../../processManage/addMustCopyToTask.do';
		}
		$.ajax({
			url:url,
			type:'post',
			data:{
				processTypeId : dom.parent().attr('typeId'),
				executorId:userId,
				executorName:userName,
				groupId:groupId
			},
			success:function(data){
				if(data == 500){
					alert('添加失败');
					return ;
				}else{
					var parent = dom.parent();
					parent.children().last().remove();
					var executorUser = $('<span>');
					executorUser.attr('class','executorUser');
					executorUser.attr('taskId',data);
					executorUser.click(function(){
						process_plugin.deleteMustExecute(this);
					});
					executorUser.append(userName);
					executorUser.append('<img class="noCheck" src="../../img/index/noCheck.png" />');
					parent.append(executorUser);
					if(url == '../../processManage/addMustTask.do'){
						parent.append('<img class="next" src="../../img/index/arrows-right.png"/>');
					}
					parent.append('<span class="executorUser addExecutorUser" onclick="process_plugin.addMustExecute(this,\''+groupId+'\')">添加</span>');
					
					parent.parents('.processMessage').animate({
						'height':parent.parents('.box').height()+10,
					},200);
				}
			},
			error:function(){
				alert('服务器未响应');
			}
		});
    });
}

/**
 * 删除流程节点
 */
process_plugin.deleteExecute = function(ele){
	var dom = $(ele);
	var url = '';
	if(dom.parent().attr('class') == 'process'){
		url = '../../myProcess/deleteExecute.do';
	}else{
		url = '../../myProcess/deleteCopyTo.do';
	}
	$.ajax({
		url:url,
		type:'post',
		data:{
			taskId : dom.attr('taskId'),
		},
		success:function(data){
			if(data == 500){
				alert('删除失败');
				return ;
			}else{
				var parent = dom.parent();
				if(url == '../../myProcess/deleteExecute.do'){
					dom.next().remove();
				}
				dom.remove();
				parent.parents('.processMessage').animate({
					'height':parent.parents('.box').height()+10,
				},200);
			}
		},
		error:function(){
			alert('服务器未响应');
		}
	});
}

process_plugin.deleteMustExecute = function(ele){
	var dom = $(ele);
	var url = '';
	if(dom.parent().attr('class') == 'process'){
		url = '../../processManage/deleteMustExecute.do';
	}else{
		url = '../../processManage/deleteMustCopyTo.do';
	}
	$.ajax({
		url:url,
		type:'post',
		data:{
			taskId : dom.attr('taskId'),
		},
		success:function(data){
			if(data == 500){
				alert('删除失败');
				return ;
			}else{
				var parent = dom.parent();
				if(url == '../../processManage/deleteExecute.do'){
					dom.next().remove();
				}
				dom.next().remove();
				dom.remove();
				parent.parents('.processMessage').animate({
					'height':parent.parents('.box').height()+10,
				},200);
			}
		},
		error:function(){
			alert('服务器未响应');
		}
	});
}


/**
 * 加载表单
 * 参数信息：
 *  dom 节点参数，jquery的dom对象节点
 *  data 直接填入到表单中的data信息
 *  dictionary 数据字典对象
 *  readonly 是否只读，默认为true
 *  typeId 所需要加载的表单的id
 *  formUrl 所要进行加载的表单的地址
 *  typeId 类型Id
 *  loadingData 是否加载数据，默认为true
 *  hasUser 是否有用户
 *  hasFile 是否有文件
 */
process_plugin.loadingForm = function(param){
	if(!param.data)
		param.data = {};
	$.ajax({
		url:param.formUrl,
		success:function(html){
			param.dom.html(html);
			if(param.dom.find('input[name=userName]'))
				param.dom.find('input[name=userName]').val(userInfo.userName);
			if(param.dom.find('input[name=userId]'))
				param.dom.find('input[name=userId]').val(userInfo.userId);
			if(param.dom.find('input[name=departmentName]'))
				param.dom.find('input[name=departmentName]').val(userInfo.departmentName);
			var input = $('<input>');
			input.css('display', 'none');
			input.attr('name','typeId');
			input.attr('value',param.typeId);
			param.dom.find('.process-form').append(input);
			if(param.readonly == true){
				var selects = param.dom.find('select');
				for(var i = 0 ; i < selects.length ; i++){
					var td = selects.eq(i).parents('td');
					var input = $('<input>');
					input.attr('name',selects.eq(i).attr('name')+'Value');
					td.html('');
					td.append(input);
				}
				param.dom.find('input,textarea').attr('readonly', 'readonly');
				var inputs = param.dom.find('input');
				inputs.removeAttr('onclick');
			}else{
				var selects = param.dom.find('select');
				//加载数据字典中的下拉菜单
				process_plugin.loadingDirc(selects, 0);
			}
			//加载自定义的data数据信息
			for(idx in param.data){
				if(param.dom.find('[name='+idx+']'))
					param.dom.find('[name='+idx+']').val(param.data[idx]);
			}
			//加载数据库的表单信息
			if(param.loadingData == true){
				$.ajax({
					url:'../../relatedProcess/getProcessFormMessage.do',
					type:'post',
					data:param.data,
					dataType:'json',
					success:function(data){
						for(idx in data){
							if(data[idx] && param.dom.find('[name='+idx+']'))
								param.dom.find('[name='+idx+']').val(data[idx]);
						}
						//加载下载部分和相关用户部分
						process_plugin.fillDataToForm(param,data);
					}
				})
			}else{
				//加载文件上传和用户选择部分
				process_plugin.addOtherMsg(param);
			}
		}
	})
}

/**
 * 获取数据字典
 */
process_plugin.loadingDirc = function(selects,idx){
	if(selects.eq(idx).attr('dirc')){
		var select = selects.eq(idx);
		$.ajax({
			url:'../../process/getDirc.do?getMS='+getMS(),
			data:{
				selectKey:select.attr('dirc')
			},
			dateType:'json',
			success:function(data){
				data = eval("("+data+")");
				for(var j = 0 ; j < data.length ; j++){
					var option = $('<option>');
					option.attr('value',data[j].optionKey);
					option.html(data[j].optionValue);
					select.append(option);
				}
				if(selects.eq(idx+1)){
					process_plugin.loadingDirc(selects, idx+1);
				}
			},
			error:function(){
				alert('加载'+select.selectName+'失败');
				if(selects.eq(idx+1)){
					process_plugin.loadingDirc(selects, idx+1);
				}
			}
		});
	}
}

/**
 * 填充数据到界面的form中
 */
process_plugin.fillDataToForm = function(param, data){
	if(data.fileUrl){
		var otherBox = $('<div>');
		otherBox.attr('class','process-othersBox');
		param.dom.append(otherBox);
		otherBox.height(48);
		var downLoadImg = $('<span>');
		downLoadImg.attr('class','downLoadImg');
		otherBox.append(downLoadImg);
		otherBox.append('<span>'+data.fileName+'</span>');
		var downLoada = $('<a>');
		downLoada.attr('href','../../process/downloadFile.do?fileUrl='+data.fileUrl+'&fileName='+data.fileName);
		downLoada.html('下载附件');
		otherBox.append(downLoada);
	}
	if(data.userGroup){
		var userGroup = $('<input>');
		userGroup.attr('name','userGroup');
		userGroup.css('display','none');
		userGroup.attr('value',data.userGroup);
		param.dom.find('.process-form').append(userGroup);
		
		var otherBox = $('<div>');
		otherBox.attr('class','process-othersBox');
		param.dom.append(otherBox);
		
		var dgSelectUser = $('<div>');
		dgSelectUser.attr('class','process-usersBox dgSelectUser');
		otherBox.append(dgSelectUser);
		
		var toolbarSelectUser = $('<div>');
		var toolbarId = 'a'+getMS()+'1';
		toolbarSelectUser.attr('id',toolbarId);
		toolbarId = '#'+toolbarId;
		otherBox.append(toolbarSelectUser);
		process_plugin.createSelectUserToolBar(toolbarSelectUser,param.dom.find('.dgSelectUser'));
		
		
		param.dom.find('.dgSelectUser').datagrid({
			url:'../../process/getSelectedUserList.do?getMs='+getMS(),
			queryParams: {
				groupId: data.groupId,
			},
			toolbar:toolbarId,
			columns:[[
			          {field:'userName',title:'员工姓名',width:100,align:'center'},
			          {field:'departmentName',title:'部门',width:100,align:'center'},
			          {field:'postName',title:'岗位',width:100,align:'center'},
			          {field:'workTimeStr',title:'入职时间',width:150,align:'center'},
			          {field:'sex',title:'性别',width:70,align:'center',formatter: function(value,row,index){
							if (row.sex == '1'){
								return '男';
							} else {
								return '女';
							}
					  }},
			          ]],
			pagination:true,
			queryParams:{
				departmentUrl:function(){
					return $(toolbarId).find('input[name=departmentUrl]').val();
				},
				userName:function(){
					return $(toolbarId).find('input[name=userName]').val();
				},
				postId:function(){
					return $(toolbarId).find('input[name=postId]').val();
				},
				workTimeStartStr:function(){
					return $(toolbarId).find('input[name=workTimeStartStr]').val();
				},
				workTimeEndStr:function(){
					return $(toolbarId).find('input[name=workTimeEndStr]').val();
				},
				sex:function(){
					return $(toolbarId).find('select[name=sex]').val();
				},
				groupId:function(){
					return param.dom.find('.process-form input[name=userGroup]').val();
				}
			}
		});
	}
}

/**
 * 添加选择用户与文件界面
 */
process_plugin.addOtherMsg = function(param){
	if(param.hasFile == 'true'){
		var fileUrl = $('<input>');
		fileUrl.attr('name','fileUrl');
		fileUrl.css('display','none');
		param.dom.find('.process-form').append(fileUrl);
		
		var fileName = $('<input>');
		fileName.attr('name','fileName');
		fileName.css('display','none');
		param.dom.find('.process-form').append(fileName);
		
		var otherBox = $('<div>');
		otherBox.attr('class','process-othersBox');
		param.dom.append(otherBox);
		var file = $('<input>');
		file.attr('type','file');
		var subFile = $('<input>');
		subFile.attr('type','button');
		subFile.val('上传');
		subFile.click(function(){
			file.upload({
				url:"../../process/upLoadFile.do?getMs="+getMS(),
				onComplate: function (data) {
					alert('文件上传成功！');	
					fileUrl.val(data.fileUrl);
					fileName.val(data.fileName);
				},
			});
			file.upload("ajaxSubmit");
		})
		otherBox.append(file);
		otherBox.append(subFile);
	}
	if(param.hasUsers == 'true'){
		var userGroup = $('<input>');
		userGroup.attr('name','userGroup');
		userGroup.css('display','none');
		param.dom.find('.process-form').append(userGroup);
		
		var otherBox = $('<div>');
		otherBox.attr('class','process-othersBox');
		param.dom.append(otherBox);
		
		var dgSelectUser = $('<div>');
		dgSelectUser.attr('class','process-usersBox dgSelectUser');
		otherBox.append(dgSelectUser);
		
		var toolbarSelectUser = $('<div>');
		var toolbarId = 'a'+getMS()+'1';
		toolbarSelectUser.attr('id',toolbarId);
		toolbarId = '#'+toolbarId;
		process_plugin.createSelectUserToolBar(toolbarSelectUser,param.dom.find('.dgSelectUser'));
		otherBox.append(toolbarSelectUser);
		
		param.dom.find('.dgSelectUser').datagrid({
			url:'../../process/getUserList.do?getMs='+getMS(),
			toolbar:toolbarId,
			columns:[[
			          {field:'userName',title:'员工姓名',width:100,align:'center'},
			          {field:'departmentName',title:'部门',width:100,align:'center'},
			          {field:'postName',title:'岗位',width:100,align:'center'},
			          {field:'workTimeStr',title:'入职时间',width:150,align:'center'},
			          {field:'sex',title:'性别',width:70,align:'center',formatter: function(value,row,index){
							if (row.sex == '1'){
								return '男';
							} else {
								return '女';
							}
					  }},
					  {field:'_opera',title:'操作',width:70,align:'center',formatter: function(value,row,index){
						  return '<a href="#" onclick="process_plugin.addUser(\''+row.userId+'\',this)">添加</a>';
					  }}
			          ]],
			pagination:true,
			queryParams:{
				departmentUrl:function(){
					return $(toolbarId).find('input[name=departmentUrl]').val();
				},
				userName:function(){
					return $(toolbarId).find('input[name=userName]').val();
				},
				postId:function(){
					return $(toolbarId).find('input[name=postId]').val();
				},
				workTimeStartStr:function(){
					return $(toolbarId).find('input[name=workTimeStartStr]').val();
				},
				workTimeEndStr:function(){
					return $(toolbarId).find('input[name=workTimeEndStr]').val();
				},
				sex:function(){
					return $(toolbarId).find('select[name=sex]').val();
				},
			}
		});
		
		var addAllUser = $('<input>');
		addAllUser.attr('type','button');
		addAllUser.val('全部添加');
		addAllUser.attr('class','addUser');
		otherBox.append(addAllUser);
		addAllUser.click(function(){
			$.ajax({
				url:'../../process/addAllUser.do?getMs='+getMS(),
				type:'post',
				data:{
					departmentUrl:$(toolbarId).find('input[name=departmentUrl]').val(),
					userName:$(toolbarId).find('input[name=userName]').val(),
					postId:$(toolbarId).find('input[name=postId]').val(),
					workTimeStartStr:$(toolbarId).find('input[name=workTimeStartStr]').val(),
					workTimeEndStr:$(toolbarId).find('input[name=workTimeEndStr]').val(),
					sex:$(toolbarId).find('select[name=sex]').val(),
					groupId:$(toolbarId2).parents('.include-form').find('.process-form input[name=userGroup]').val()
				},
				success:function(data){
					if(data == '500'){
						alert('添加员工失败');
					}else{
						$(toolbarId2).parents('.include-form').find('.dgHasUser').datagrid('reload');
						$(toolbarId2).parents('.include-form').find('.process-form input[name=userGroup]').val(data);
					}
				},
				error:function(){
					alert('服务器未响应');
				}
			})
		})
		
		var dgHasUser = $('<div>');
		dgHasUser.attr('class','process-usersBox dgHasUser');
		otherBox.append(dgHasUser);
		
		var toolbarHasUser = $('<div>');
		var toolbarId2 = 'a'+getMS()+'2';
		toolbarHasUser.attr('id',toolbarId2);
		toolbarId2 = '#'+toolbarId2;
		process_plugin.createSelectUserToolBar(toolbarHasUser,param.dom.find('.dgHasUser'));
		otherBox.append(toolbarHasUser);
		
		param.dom.find('.dgHasUser').datagrid({
			url:'../../process/getSelectedUserList.do?getMs='+getMS(),
			toolbar:toolbarId2,
			columns:[[
			          {field:'userName',title:'员工姓名',width:100,align:'center'},
			          {field:'departmentName',title:'部门',width:100,align:'center'},
			          {field:'postName',title:'岗位',width:100,align:'center'},
			          {field:'workTimeStr',title:'入职时间',width:150,align:'center'},
			          {field:'sex',title:'性别',width:70,align:'center',formatter: function(value,row,index){
							if (row.sex == '1'){
								return '男';
							} else {
								return '女';
							}
					  }},
					  {field:'_opera',title:'操作',width:70,align:'center',formatter: function(value,row,index){
						  return '<a href="#" onclick="process_plugin.deleteUser(\''+row.userId+'\',this)">删除</a>';
					  }}
			          ]],
			pagination:true,
			queryParams:{
				departmentUrl:function(){
					return $(toolbarId2).find('input[name=departmentUrl]').val();
				},
				userName:function(){
					return $(toolbarId2).find('input[name=userName]').val();
				},
				postId:function(){
					return $(toolbarId2).find('input[name=postId]').val();
				},
				workTimeStartStr:function(){
					return $(toolbarId2).find('input[name=workTimeStartStr]').val();
				},
				workTimeEndStr:function(){
					return $(toolbarId2).find('input[name=workTimeEndStr]').val();
				},
				sex:function(){
					return $(toolbarId2).find('select[name=sex]').val();
				},
				groupId:function(){
					return $(toolbarId2).parents('.include-form').find('.process-form input[name=userGroup]').val();
				}
			}
		});
	}
}

/**
 * 添加用户到组
 */
process_plugin.addUser = function(userId, thisDom){
	$.ajax({
		url:'../../process/addUser.do?getMs='+getMS(),
		type:'post',
		data:{
			userId:userId,
			groupId:$(thisDom).parents('.include-form').find('.process-form input[name=userGroup]').val()
		},
		success:function(data){
			if(data == '500'){
				alert('添加员工失败');
			}else{
				$(thisDom).parents('.include-form').find('.process-form input[name=userGroup]').val(data);
				$(thisDom).parents('.include-form').find('.dgHasUser').datagrid('reload');
			}
		},
		error:function(){
			alert('服务器未响应');
		}
	});
}
/**
 * 从组中删除用户
 */
process_plugin.deleteUser = function(userId, thisDom){
	$.ajax({
		url:'../../process/deleteUser.do?getMs='+getMS(),
		type:'post',
		data:{
			userId:userId,
			groupId:$(thisDom).parents('.include-form').find('.process-form input[name=userGroup]').val()
		},
		success:function(data){
			if(data == '500'){
				alert('删除员工失败');
			}else{
				$(thisDom).parents('.include-form').find('.dgHasUser').datagrid('reload');
			}
		},
		error:function(){
			alert('服务器未响应');
		}
	});
}

/**
 * 添加用户到组
 */
process_plugin.addMustUser = function(userId, groupId, thisDom){
	$.ajax({
		url:'../../processManage/addMustUser.do?getMs='+getMS(),
		type:'post',
		data:{
			userId:userId,
			groupId:groupId
		},
		success:function(data){
			if(data == '500'){
				alert('添加员工失败');
			}else{
				$(thisDom).parents('.selectUser').find('.dgHasUser').datagrid('reload');
			}
		},
		error:function(){
			alert('服务器未响应');
		}
	});
}
/**
 * 从组中删除用户
 */
process_plugin.deleteMustUser = function(userId, groupId, thisDom){
	$.ajax({
		url:'../../processManage/deleteMustUser.do?getMs='+getMS(),
		type:'post',
		data:{
			userId:userId,
			groupId:groupId
		},
		success:function(data){
			if(data == '500'){
				alert('删除员工失败');
			}else{
				$(thisDom).parents('.selectUser').find('.dgHasUser').datagrid('reload');
			}
		},
		error:function(){
			alert('服务器未响应');
		}
	});
}

/**
 * 创建一个与数据网格所关联的搜索条
 */
process_plugin.createSelectUserToolBar = function(dom, dgDom){
	dom.append(' 姓名：<input name="userName" style="width:70px; border: 1px gray solid" />');
	dom.append(' 部门：<input name="departmentName" style="width:70px; border: 1px gray solid" />');
	var chooseDepartment = $('<input>');
	chooseDepartment.val('选择');
	chooseDepartment.attr('type','button');
	chooseDepartment.css('width','50px');
	chooseDepartment.css('height','21px');
	chooseDepartment.css('margin','0px 5px');
	chooseDepartment.click(function(){
		chooseDept();
		$('#chooseDept .confirm').unbind();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     dom.find('input[name=departmentName]').val(chooseDept.text);
		     dom.find('input[name=departmentUrl]').val(chooseDept.id);
		});
	})
	dom.append(chooseDepartment);
	dom.append('<input name="departmentUrl" style="display:none" />');
	dom.append(' 岗位：<input name="postName" style="width:70px; border: 1px gray solid" />');
	var choosePostBt = $('<input>');
	choosePostBt.val('选择');
	choosePostBt.attr('type','button');
	choosePostBt.css('width','50px');
	choosePostBt.css('height','21px');
	choosePostBt.css('margin','0px 5px');
	choosePostBt.click(function(){
		choosePost();
		$('#choosePost .confirm').unbind();
		$('#choosePost .confirm').click(function(){
			$('#choosePost').css('display','none');
			var selectPost = $('#choosePost .popuparea .post').datagrid('getSelections');
			dom.find('input[name=postName]').val(selectPost[0].postName);
			dom.find('input[name=postId]').val(selectPost[0].postId);
		});
	})
	dom.append(choosePostBt);
	dom.append('<input name="postId" style="display:none" />');
	dom.append(' 入职时间：<input name="workTimeStartStr" style="width:90px; border: 1px gray solid" class="jqdate" onblur="testDate(this)" onclick="testShow(this);"/>');
	dom.append(' ~ <input name="workTimeEndStr" style="width:90px; border: 1px gray solid"  class="jqdate" onblur="testDate(this)" onclick="testShow(this);"/>');
	dom.append(' 性别：<select name="sex" style="width:50px;"><option value="">全部</option><option value="1">男</option><option value="2">女</option></select>');
	var select = $('<input>');
	select.val('查询');
	select.attr('type','button');
	select.css('width','50px');
	select.css('height','21px');
	select.css('margin-left','5px');
	select.click(function(){
		dgDom.datagrid('reload');
	})
	dom.append(select);
}

/**
 * 提交表单
 * 参数信息
 *  dom 节点参数 jquery中的用于生成form的dom节点
 *  success 当提交执行完毕以后所执行的方法,方法具有参数data，该参数为服务器所响应内容
 *  url 提交的路径，默认为本js中的对象default_submit_url
 *  data 提交信息时所携带的对象信息
 */
process_plugin.submitForm = function(param){
	console.log(param);
	if(!param.data)
		param.data = {};
	var fields = param.dom.find('.process-form').find('input,textarea');
	var flag = false;
	for(var i = 0 ; i < fields.length ; i++){
		var field = $(fields[i]);
		if(field.attr('must') != 'false' && !field.val()){
			if(field.attr('name') == 'userGroup'){
				alert('请选择流程相关人员信息');
				return;
			}else if(field.attr('name') == 'fileUrl'){
				alert('请上传流程的相关附件');
				return;
			}else{
				field.css('border-color','red');
				flag = true;
			}
		}else{
			field.css('border-color','gray');
		}
		param.data[field.attr('name')] = field.val();
	}
	if(flag){
		alert('请完整填写流程表单');
		return ;
	}
	var selects = param.dom.find('select');
	for(var i = 0 ; i < selects.length ; i++){
		var select = $(selects[i]);
		param.data[select.attr('name')] = select.val();
		param.data[select.attr('name')+"Value"] = select.find(':checked').text();
	}
	$.ajax({
		url:'../../myProcess/startProcess.do',
		data:param.data,
		type:'post',
		success:function(data){
			if(param.success)
				param.success(data);
		},
		error:function(){
			if(param.error)
				param.error();
		}
	})
}


process_plugin.processType = {};

process_plugin.examineIdeaModel = '';

/**
 * 为一个select标签内添加流程类型的options
 */
process_plugin.createTypeSelected = function(dom){
	var none = $('<option>');
	none.text('未选择');
	none.attr('value','');
	dom.append(none);
	for(var idx in process_plugin.processType){
		var option = $('<option>');
		option.attr('value',process_plugin.processType[idx].typeId);
		option.text(process_plugin.processType[idx].name);
		dom.append(option);
	}
}

/**
 * 生成审批意见
 *  dom 生成位置的节点
 *  processRecordId 流程Id
 *  isExamine 是否提供审批窗
 */
process_plugin.createExamineIdea = function(param){
	var processRecordId = param.processRecordId;
	var dom = param.dom;
	$.ajax({
		url:'../../myProcess/getExamineIdea.do',
		data:{
			processRecordId:processRecordId
		},
		type:'post',
		dataType:'json',
		success:function(data){
			if(process_plugin.examineIdeaModel){
				process_plugin.fillExamineIdea(data, dom, process_plugin.examineIdeaModel, param.isExamine);
			}else{
				$.ajax({
					url:'../../processForm/taskExecuteMessage.html',
					success:function(html){
						process_plugin.examineIdeaModel = html;
						process_plugin.fillExamineIdea(data, dom, process_plugin.examineIdeaModel, param.isExamine);
					}
				});
			}
			
		}
	})
}

/**
 * 在创建审批意见方法中所调用的方法
 */
process_plugin.fillExamineIdea = function(data, dom, modelHtml,isExamine){
	dom.html('');
	for(var i = 0 ; i < data.length ; i++){
		dom.append(modelHtml);
		var last = dom.find(".taskExecuteMessage:last");
		last.find('.executor').html(data[i].executorName);
		last.find('.examineTime').html(data[i].executorTime);
		last.find('.idea').html(data[i].executorIdea);
		dom.find('.idea').width(last.find('.idea').parent().width() - 84);
		if(data[i].examineStatus == '1'){
			last.find('.examineStatus').css('background-color','gray');
			last.find('.examineStatus').next().html("待审");
			last.find('.examineStatus').next().css('color','gray');
			if(isExamine == true){
				var parent = last.find('.idea').parent();
				last.find('.idea').remove();
				var textarea = $('<textarea>');
				textarea.attr('taskId',data[i].taskId);
				textarea.attr('name','idea');
				textarea.attr('class','idea');
				parent.append(textarea);
				textarea.width(textarea.parent().width() - 98);
			}
		}else if(data[i].examineStatus == '2'){
			last.find('.examineStatus').css('background-color','green');
			last.find('.examineStatus').next().html("通过");
			last.find('.examineStatus').next().css('color','green');
		}else if(data[i].examineStatus == '3'){
			last.find('.examineStatus').css('background-color','red');
			last.find('.examineStatus').next().html("驳回");
			last.find('.examineStatus').next().css('color','red');
		}
	}
}



$(function(){
	$.ajax({
		url:'../../myProcess/getProcesses.do',
		type:'post',
		dataType:'json',
		success:function(data){
			process_plugin.processType = data;
		},
		error:function(){
			alert('服务器未响应');
		}
	});
})