$(function(){
	if(existPermission('admin:personnel:trainManage:train:add'))
		$('#train .maintop').append('<div><span class="maintopicon mainicon2"></span> <span class="add">添加</span></div>');

	/**设置内部网格内容的高度**/
	$("#train .traindg").css('height',$('#loadarea').height()-64);
	
	/******创建数据培训信息网格******/
	$('#train .traindg').datagrid({
	    //url:'../../train/queryTrainApplyO.do?getMs='+getMS(),
	    method:"post",
	    columns:[[
			{field:'_operate',title:'操作',align:'center',width:100,formatter:function(value,row,index){
				var id = "'"+row.trainId+"'";;
				var opera = '';
				if(existPermission('admin:personnel:trainManage:train:select'))
					opera +='<span class="small-button look" title="查看" onclick="selectTrainMessage('+id+')"/>';
			    if(existPermission('admin:personnel:trainManage:train:delete')){
			    	if(row.applyState == 1 || row.applyState == 3)
			    		opera +='<span class="small-button recall" title="撤回" onclick="withdrawTrain('+id+')"/>';
			    	if(row.applyState == 3)
			    		opera +='<span class="small-button finish" title="完成培训" onclick="trainFinish('+id+')"/>';
			    }
			    if(existPermission('admin:personnel:trainManage:train:select'))
				    opera +='<span class="small-button lookflow" title="查看流程" onclick="queryTrainStream('+id+')"/>';
				return opera;
			}},
			{field:'trainName',title:'培训名称',sortable:true,width:100},
			{field:'trainReason',title:'培训原因',sortable:true,width:100},
			{field:'startTimeStr',title:'培训开始时间',sortable:true,width:100,align:'right'},
			{field:'endTimeStr',title:'培训结束时间',sortable:true,width:100,align:'right'},
			{field:'trainDetail',title:'培训描述',sortable:true,width:100,align:'center'},
			{field:'apply_state',title:'培训状态',sortable:true,width:100,align:'center',formatter:function(value,row,index){
				 return getValueFromKey("plan_status",row.applyState);
			}},
	    ]],
	    toolbar:'#train .invitetop',
	    striped:true,
	    loadMsg:'数据加载中',
	    //checkbox:true,
	    singleSelect:true,
	    pagination:true,
    	rownumbers:true
	});
	
	/*$.ajax({
		method:'post',
		url:'../../train/queryTrainApply.do?getMs='+getMS(),
		success:function(data){
			console.log(data);
		}
		
	});*/
	//查询
	$('#train .invitetop .query').click(function(){
		$('#train .traindg').datagrid({
			url:'../../train/queryTrainApplyO.do?getMs='+getMS(),
			queryParams: {
	    		createUserName:function(){
	    			return $('#train input[name=createUserName]').val();
	    		},
				trainName:function(){
					return $('#train input[name=trainName]').val();
				}
	    	},
		});
	});
	/******当修改下拉菜单时添加培训对象*******/
	$('#trainobj').change(function(){
		var trainobj = $('#trainobj option:selected').val();
		var dom = null;
		if($('.department').attr("checked") == "checked"){
			dom = '<span class="useobj">'+trainobj+'</span>';
		}else if($('.post').attr("checked") == "checked"){
			dom = '<i class="useobj">'+trainobj+'</i>';
		}
		$('#trainobjshow').append(dom);
	});

	/******监听事件，如果点击了返回按钮，离开流程页面，返回数据网格页面*******/
	$('#train .flow .back').click(function(){
		$('#train .flow').css('display','none');
		$('#train .main').css('display','block');
	});
	/**************监听事件 点击添加按钮以后，弹出流程发起窗口************/
	$('#train .main .maintop .add').click(function(){
		$('#train .popups .addTrainPlan input').not('.button').not('.radio').val(null);
		$('#train .popups .addTrainPlan textarea').not('.button').val(null);
		$('#train .popups .addTrainPlan').css('display','block');
	});
	
	/*********添加培训计划监听事件*********/
	$('#train .addTrainPlan .confirm').click(function(){
		//获取输入框中的内容
		var trainName = $('#train .addTrainPlan input[name=trainName]').val();
		var startTime = $('#train .addTrainPlan input[name=startTime]').val();
		var endTime = $('#train .addTrainPlan input[name=endTime]').val();
		var examineUserId = $('#train .addTrainPlan input[name=examineUserId]').val();
		var examineUserName = $('#train .addTrainPlan input[name=examineUserName]').val();
		var trainReason = $('#train .addTrainPlan textarea[name=trainReason]').val();
		var trainDetail = $('#train .addTrainPlan textarea[name=trainDetail]').val();
		//非空验证
		if(trainName == null || trainName == ''){
			windowControl('培训名不能为空');
			return ;
		}else if(trainReason == null || trainReason == ''){
			windowControl('培训原因不能为空');
			return ;
		}else if(trainDetail == null || trainDetail == ''){
			windowControl('培训详情不能为空');
			return ;
		}else if(startTime == null || startTime== ''){
			windowControl('培训开时间不能为空');
			return ;
		}else if(endTime == null　|| endTime == null){
			windowControl('培训结束时间不能为空');
			return ;
		}else if(examineUserName == null || examineUserName == ''){
			windowControl('请选择审批人');
			return ;
		}
		//定义不同的对象
		var userId = '';
		var userName = '';
		//根据对象类型，设定需要的发送至后台的参数
		$.ajax({
			url:'../../train/startTrainApply.do?getMs='+getMS(),
			data:{
				trainName:trainName,
				startTimeStr:startTime,
				endTimeStr:endTime,
				userId:userId,
				userName:userName,
				trainReason:trainReason,
				trainDetail:trainDetail,
				examineUserId:examineUserId,
				examineUserName:examineUserName,
			},
			type:'post',
			success:function(data){
				if(data == 200){
					windowControl('添加培训申请成功');
					$('#train .addTrainPlan').css('display','none');
					$('#train .traindg').datagrid({
						url:'../../train/queryTrainApplyO.do?getMs='+getMS(),
					});
				}else{
					windowControl('添加培训申请失败')
				}
			},
			error:function(){
				windowControl("访问异常");
			}
		});
	})
	
	/************选择审批人监听事件*********/
	$('#train .addTrainPlan .chooseUser').click(function(){
		chooseUser();
		$('#chooseUser .confirm').click(function(){
			selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
			$('#train .addTrainPlan input[name=examineUserId]').val(selectUser[0].userId);
	    	$('#train .addTrainPlan input[name=examineUserName]').val(selectUser[0].userName);
	    	$('#chooseUser').css('display','none');
			$('#chooseUser .confirm').unbind('click');
		});
	});
	
	/*********选择目标类别*********/
	$('#train .addTrainPlan input[name=objType]').change(function(){
		$('#train .addTrainPlan input[name=selectNames]').val(null);
    	$('#train .addTrainPlan input[name=selectIds]').val(null);
	})
	
	/************选择 培训对象 监听事件*********/
	$('#train .addTrainPlan .chooseObj').click(function(){
		var objType = $('#train .addTrainPlan input[name=objType]:checked').index();
		if(objType == '0'){
			chooseDept();
		    $('#chooseDept .confirm').click(function(){
		    	$('#chooseDept').css('display','none');
		    	var chooseDept = $('#chooseDept .dept').tree('getSelected');
		    	$('#train .addTrainPlan input[name=selectNames]').val('"'+chooseDept.text+'"');
		    	$('#train .addTrainPlan input[name=selectIds]').val('"'+chooseDept.id+'"');
		    	$('#chooseDept .confirm').unbind('click');
		    })
		}else if(objType == '1'){
			choosePost();
			$('#choosePost .confirm').click(function(){
		    	$('#choosePost').css('display','none');
		    	var selectPost = $('#choosePost .popuparea .post').datagrid('getSelections');
		    	var postNames = '';
		    	var postIds = '';
		    	for(var i = 0 ; i<selectPost.length ; i++ ){
		    		postNames = postNames + '"' + selectPost[i].postName + '",';
		    		postIds = postIds + '"' + selectPost[i].postId + '",';
		    	}
		    	postNames = postNames.substring(0, postNames.length - 1);
		    	postIds = postIds.substring(0, postIds.length - 1);
		    	$('#train .addTrainPlan input[name=selectNames]').val(postNames);
		    	$('#train .addTrainPlan input[name=selectIds]').val(postIds);
		    	$('#choosePost .confirm').unbind('click');
		    })
		}else if(objType == '2'){
			chooseUsers();
			$('#chooseUsers .confirm').click(function(){
				$('#chooseUsers').css('display','none');
				var userNames = '';
		    	var userIds = '';
				selectUsers = $('#chooseUsers .popuparea .user').datagrid('getSelections');
				for(var i = 0 ; i<selectUsers.length ; i++ ){
					userNames = userNames + '"' + selectUsers[i].userName + '",';
					userIds = userIds + '"' + selectUsers[i].userId + '",';
				}
				userNames = userNames.substring(0, userNames.length - 1);
				userIds = userIds.substring(0, userIds.length - 1);
				$('#train .addTrainPlan input[name=selectNames]').val(userNames);
		    	$('#train .addTrainPlan input[name=selectIds]').val(userIds);
				$('#chooseUsers .confirm').unbind('click');
			})
		}
	});
});	

/***查看培训信息**/
function selectTrainMessage(id){
	$.ajax({
		url:'../../train/queryTrainMessage.do?getMs='+getMS(),
		type:'post',
		data:{
			trainId:id
		},
		success:function(data){
			console.log(data);
			var train = eval('('+data+')');
			console.log("train="+train.trainName);
			$('#train .selectTrainPlan').css('display','block');
			$('#train .selectTrainPlan input').attr('readonly','readonly');
			$('#train .selectTrainPlan textarea').attr('readonly','readonly');
			$('#train .selectTrainPlan input[name=trainName]').val(train.trainName);
			$('#train .selectTrainPlan input[name=startTime]').val(train.startTimeStr);
			$('#train .selectTrainPlan input[name=endTime]').val(train.endTimeStr);
			$('#train .selectTrainPlan input[name=createUserName]').val(train.createUserName);
			$('#train .selectTrainPlan textarea[name=trainReason]').val(train.trainReason);
			$('#train .selectTrainPlan textarea[name=trainDetail]').val(train.trainDetail);
			$('#train .selectTrainPlan textarea[name=trainDetail]').val(train.trainDetail);
			var domRight = $('#train .selectTrainPlan .right');
			var html = '';
			var trainObjs = train.objList;
			if(train.objTypeFlag == 1){
				domRight.find('span').text('部门');
				for(var i = 0 ; i < trainObjs.length ; i++){
					html = html+'<tr><td style="padding:5px;border: 1px #A9A9A9 solid;">'+trainObjs[i].departmentName+'</td></tr>'
				}
				domRight.find('table').html(html);
			}else if(train.objTypeFlag == 2){
				domRight.find('span').text('岗位');
				for(var i = 0 ; i < trainObjs.length ; i++){
					html = html+'<tr><td style="padding:5px;border: 1px #A9A9A9 solid;">'+trainObjs[i].postName+'</td></tr>'
				}
				domRight.find('table').html(html);
			}else if(train.objTypeFlag == 3){
				domRight.find('span').text('人员');
				for(var i = 0 ; i < trainObjs.length ; i++){
					html = html+'<tr><td style="padding:5px;border: 1px #A9A9A9 solid;">'+trainObjs[i].userName+'</td></tr>'
				}
				domRight.find('table').html(html);
			}
		}
	})
}

/****撤回培训信息***/
function withdrawTrain(id){
	ui.confirm('确定要撤回这条培训信息？',function(z){
		if(z){
			$.ajax({
				url:'../../train/backTrainApply.do?getMs='+getMS(),
				data:{
					trainId:id
				},
				type:'post',
				success:function(data){
					if(data == '200'){
						windowControl('操作已成功');
					}else{
						windowControl('操作失败');
					}
				},
				error:function(data){
					windowControl('服务器未响应');
				}
			});
		}
	},false);
}

/*****创建显示列表********/
function createTrainObjTable(columType, objData, id){
	var filed1 = '';
	var filed2 = '';
	var title1 = '';
	var title2 = '';
	if(columType == 1){
		filed1 = 'departmentId';
		filed2 = 'departmentName';
		title1 = '部门Id';
		title2 = '部门名称';
	}else if(columType == 2){
		filed1 = 'postId';
		filed2 = 'postName';
		title1 = '岗位Id';
		title2 = '岗位名称';
	}else if(columType == 3){
		filed1 = 'userId';
		filed2 = 'userName';
		title1 = '用户Id';
		title2 = '用户名称';
	}
	$('#train .select-Message-table').datagrid({
		columns:[[
		          {field:filed1,title:title1,width:100},
		          {field:filed2,title:title2,width:100}
		          ]],
		rownumbers:true,
		url:'../../train/queryTrainObj.do?getMs='+getMS(),
		method:"post",
		queryParams: {
			trainId: id,
			objTypeFlag: columType
		}
	});
}

/********查询培训流程*********/
function queryTrainStream(id){
	$('#train .flow').css('display','block');
	$('#train .main').css('display','none');
	/*******从服务器获取培训的描述原因等信息*******/
	$.ajax({
		url:'../../train/queryTrainApplyStream.do?getMs='+getMS(),
		data:{
			trainId:id
		},
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')');
			var html = '';
			for(var i = 0; i<obj.length ; i++){
				if(typeof obj[i].nextExamineUserName == 'undefined')
					obj[i].nextExamineUserName = '';
				if(typeof obj[i].examineTimeStr == 'undefined')
					obj[i].examineTimeStr = '';
				if(typeof obj[i].examineIdea == 'undefined')
					obj[i].examineIdea = '';
				html = html + '<div class="process"><div class="processbox">'
					 + '<p><span class="jiachu expeop" style="margin-left: 2px;">&ensp;&nbsp;审批人：'+obj[i].examineUserName+'</span>'
					 + '<span class="righttime">&ensp;&ensp;&ensp;&nbsp;审批时间：'+obj[i].examineTimeStr+'</span></p>'
					 + '<p><span class="expeop">审批类型：';
				if(obj[i].streamType == '1'){
					html = html + "审批";
				}else if(obj[i].streamType == '2'){
					html = html + "备案";
				}
				html = html +'</span><span class="righttime">下一级审批人：'+obj[i].nextExamineUserName+'</span></p>'
					 + '<div class="opinionbox"><div class="opiniontit">审批意见：'+obj[i].examineIdea+'</div>'
					 + '<div class="opinionarea"></div></div>'
					 + '</div></div><div class="arrdown"><span></span></div>'
			}
			$('#train .flow .showView').html(html);
		}
	});
	
	/*******从服务器获取培训的流程审批信息*******/
	$.ajax({
		url:'../../train/queryTrainMessage.do?getMs='+getMS(),
		data:{
			trainId:id
		},
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')');
			console.log("data="+data);
			$('#train .flow .flowplan .trainName').val(obj.trainName);
			$('#train .flow .flowplan .createUserName').val(obj.createUserName);
			$('#train .flow .flowplan .createTime').val(obj.createTimeStr);
			$('#train .flow .flowplan .startTime').val(obj.startTimeStr);
			$('#train .flow .flowplan .endTime').val(obj.endTimeStr);
			if(obj[0].applyState == 1)
				$('#train .flow .flowplan .examineStatus').val('待审');
			else if(obj[0].applyState == 2)
				$('#train .flow .flowplan .examineStatus').val('撤回');
			else if(obj[0].applyState == 3)
				$('#train .flow .flowplan .examineStatus').val('通过');
			else if(obj[0].applyState == 4)
				$('#train .flow .flowplan .examineStatus').val('驳回');
			else if(obj[0].applyState == 5)
				$('#train .flow .flowplan .examineStatus').val('完成');
			
			$('#train .flow .flowplan .detail').html(obj.trainDetail);
			$('#train .flow .flowplan .reason').html(obj.trainReason);
		}
	})
}

function trainFinish(id){
	$.ajax({
		url:'../../train/addTrainRecordBySoso.do?getMs='+getMS(),
		data:{
			trainId:id
		},
		type:'post',
		success:function(data){
			if(data == 200){
				windowControl('完成培训成功');
			}else{
				windowControl('完成培训失败');
			}
		},
		error:function(){
			windowControl('服务器未响应');
		}
	})
}


