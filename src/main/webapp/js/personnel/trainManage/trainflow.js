$(function(){
	/**设置内部网格内容的高度**/
	$("#trainflow .traindg").css('height',$('#loadarea').height()-64);
	$("#trainflow .flow").css('height',$('#loadarea').height()-64);
	
	/******创建数据培训信息网格******/
	$('#trainflow .traindg').datagrid({
	    //url:'../../train/queryMyTrainStream.do?getMs='+getMS(),
	    method:"post",
	    columns:[[
			{field:'_operate',title:'操作',align:'center',width:100,formatter:function(value,row,index){
				var id = "'"+row.trainId+"'";
				var examineStatus = "'"+row.examineStatus+"'";
				var opera = '';
				  if(existPermission('admin:personnel:trainManage:trainflow:select'))
						opera +='<span class="small-button lookflow" title="查看流程" onclick="selectTrainFlowMessage('+id+','+examineStatus+')"/>';
				 return opera;
				
			}},
			{field:'trainName',title:'培训名称',sortable:true,width:100},
			{field:'trainReason',title:'培训原因',sortable:true,width:100},
			{field:'startTimeStr',title:'培训开始时间',sortable:true,width:130,align:'right'},
			{field:'endTimeStr',title:'培训结束时间',sortable:true,width:130,align:'right'},
			{field:'trainDetail',title:'培训描述',sortable:true,width:100,align:'center'},
			{field:'apply_state',title:'审批状态',sortable:true,width:100,align:'center',formatter:function(value,row,index){
				 return getValueFromKey("apply_state",row.applyState);
			}},
			{field:'examine_status',title:'我的审批',sortable:true,width:100,align:'center',formatter:function(value,row,index){
				 return getValueFromKey("examine_status",row.examineStatus);
			}},
			{field:'examineTimeStr',title:'审批时间',sortable:true,width:130,align:'center'},
			{field:'createTimeStr',title:'申请审批时间',sortable:true,width:130,align:'center'},
	    ]],
	    toolbar:'#trainflow .invitetop',
	    striped:true,
	    loadMsg:'数据加载中',
	   // checkbox:true,
	    singleSelect:true,
	    pagination:true,
    	rownumbers:true
	});
	//查询
	$('#trainflow .invitetop .query').click(function(){
		$('#trainflow .traindg').datagrid({
			url:'../../train/queryMyTrainStream.do?getMs='+getMS(),
			queryParams: {
	    		createUserName:function(){
	    			return $('#trainflow input[name=createUserName]').val();
	    		},
				trainName:function(){
					return $('#trainflow input[name=trainName]').val();
				},
				examineStatus:function(){
					return $('#trainflow input[name=examineStatus]').val();
				},
				applyState:function(){
					return $('#trainflow input[name=applyState]').val();
				}
	    	},
		});
	});
	/*********如果点击了返回按钮，则返回到列表********/
	$('#trainflow .flow .flowbar .back').click(function(){
		$('#trainflow .flow .flowbar input[name=nextExamineUser]').val(null);
		$('#trainflow .flow .flowbar input[name=nextExamineUserName]').val(null);
		$('#trainflow .pastWindow textarea').val(null);
		$('#trainflow .flow .flowplan .trainId').val(null);
		$('#trainflow .flow .flowplan .trainStreamId').val(null);
		
		$('#trainflow .referenceWindow textarea').val(null);
		
		$('#trainflow .flow .flowplan .trainStreamId').val(null);
		
		$('#trainflow .list').css('display','block');
		$('#trainflow .flow').css('display','none');
	});
	
	/******通过，驳回，备案按钮相对应的监听事件*******/
	$("#trainflow .reject").click(function(){
		$("#trainflow .rejectWindow").css('display','block');
	})
	$("#trainflow .reference").click(function(){
		$("#trainflow .referenceWindow").css('display','block');
	})
	$("#trainflow .past").click(function(){
		$("#trainflow .pastWindow").css('display','block');
	})
	
	/********通过，驳回，备案操作事件********/
	//驳回
	$("#trainflow .rejectWindow .save").click(function(){
		var text = $('#trainflow .rejectWindow textarea').val();
		var trainId = $('#trainflow .flow .flowplan .trainId').val();
		var trainStreamId = $('#trainflow .flow .flowplan .trainStreamId').val();
		$.ajax({
			url:'../../train/rejectTrainApply.do?getMs='+getMS(),
			type:'post',
			data:{
				examineIdea:text,
				trainId:trainId,
				trainStreamId:trainStreamId
			},
			success:function(data){
				if(data == 200){
					windowControl('审批成功');
					$('#trainflow .list').css('display','block');
					$('#trainflow .flow').css('display','none');
					$('#trainflow .traindg').datagrid('reload');
					$('#trainflow .rejectWindow textarea').val(null);
					$('#trainflow .popops .rejectWindow').css('display','none');
				}else{
					windowControl('审批失败');
				}
			}
		})
	});
	//备案
	$("#trainflow .referenceWindow .save").click(function(){
		var text = $('#trainflow .referenceWindow textarea').val();
		var trainId = $('#trainflow .flow .flowplan .trainId').val();
		var trainStreamId = $('#trainflow .flow .flowplan .trainStreamId').val();
		$.ajax({
			url:'../../train/joinTrainRecordStream.do?getMs='+getMS(),
			type:'post',
			data:{
				examineIdea:text,
				trainId:trainId,
				trainStreamId:trainStreamId
			},
			success:function(data){
				if(data == 200){
					windowControl('审批成功');
					$('#trainflow .list').css('display','block');
					$('#trainflow .flow').css('display','none');
					$('#trainflow .traindg').datagrid('reload');
					$('#trainflow .referenceWindow textarea').val();
					$('#trainflow .popops .referenceWindow').css('display','none');
				}else{
					windowControl('审批失败');
				}
			}
		});
	});
	//通过
	$("#trainflow .pastWindow .save").click(function(){
		var text = $('#trainflow .pastWindow textarea').val();
		var trainId = $('#trainflow .flow .flowplan .trainId').val();
		var trainStreamId = $('#trainflow .flow .flowplan .trainStreamId').val();
		var nextExamineUserName = $('#trainflow .flow .flowbar input[name=nextExamineUserName]').val();
		var nextExamineUser = $('#trainflow .flow .flowbar input[name=nextExamineUser]').val();
		$.ajax({
			url:'../../train/passAndNextTrainApply.do?getMs='+getMS(),
			type:'post',
			data:{
				examineIdea:text,
				trainId:trainId,
				trainStreamId:trainStreamId,
				nextExamineUser:nextExamineUser,
				nextExamineUserName:nextExamineUserName
			},
			success:function(data){
				if(data == 200){
					windowControl('审批成功');
					$('#trainflow .list').css('display','block');
					$('#trainflow .flow').css('display','none');
					$('#trainflow .traindg').datagrid('reload');
					$('#trainflow .flow .flowbar input[name=nextExamineUser]').val(null);
					$('#trainflow .flow .flowbar input[name=nextExamineUserName]').val(null);
					$('#trainflow .pastWindow textarea').val(null);
					$('#trainflow .popops .pastWindow').css('display','none');
				}else{
					windowControl('审批失败');
				}
			}
		});
	});
	
	/******选择下一级审批人*******/
	$('#trainflow .flow .flowbar .examine .chooseUser').click(function(){
		chooseUser();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUsers = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#trainflow .flow .flowbar .examine input[name="nextExamineUserName"]')
	    		.val(selectUsers[0].userName);
	    	$('#trainflow .flow .flowbar .examine input[name="nextExamineUser"]')
	    		.val(selectUsers[0].userId);
	    	$('#chooseUser .confirm').unbind('click');
	    });
	});
})

/******从服务器查询相关的培训流程信息，然后显示在前端页面******/
function selectTrainFlowMessage(id, examineStatus){
	$('#trainflow .list').css('display','none');
	$('#trainflow .flow').css('display','block');
	if(examineStatus != '1'){
		$('#trainflow .flow .flowbar .examine').css('display','none');
	}else{
		$('#trainflow .flow .flowbar .examine').css('display','block');
	}
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
				if(typeof obj[i].examineTimeStr == 'undefined'){
					obj[i].examineTimeStr = '';
				}
				if(typeof obj[i].nextExamineUserName == 'undefined'){
					obj[i].nextExamineUserName = '';
				}
				if(typeof obj[i].examineIdea == 'undefined'){
					obj[i].examineIdea = '';
				}
				html = html + '<div class="process"><div class="processbox">'
					 + '<p><span class="jiachu expeop" style="margin-left: 2px;">&ensp;&nbsp;审批人：'+obj[i].examineUserName+'</span>'
					 + '<span class="righttime">&ensp;&ensp;&ensp;&nbsp;审批时间：'
					 +obj[i].examineTimeStr
					 +'</span></p>'
					 + '<p><span class="expeop">审批类型：';
				 if(obj[i].streamType == '1'){
					 html = html + "审批";
				 }else if(obj.streamType == '2'){
					 html = html + "备案";
				 }
				html = html +'</span><span class="righttime">下一级审批人：'+obj[i].nextExamineUserName+'</span></p>'
					 + '<div class="opinionbox"><div class="opiniontit">审批意见：'+obj[i].examineIdea+'</div>'
					 + '<div class="opinionarea"></div></div>'
					 + '</div></div><div class="arrdown"><span></span></div>'
			}
			$('#trainflow .flow .flowplan .trainStreamId').val(obj[obj.length-1].trainStreamId);
			$('#trainflow .flow .showView').html(html);
		}
	});
	
	/*******从服务器获取培训的流程审批信息*******/
	$.ajax({
		url:'../../train/queryTrainApply.do?getMs='+getMS(),
		data:{
			trainId:id
		},
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			$('#trainflow .flow .flowplan .trainId').val(obj[0].trainId);
			$('#trainflow .flow .flowplan .trainName').val(obj[0].trainName);
			$('#trainflow .flow .flowplan .createUserName').val(obj[0].createUserName);
			$('#trainflow .flow .flowplan .createTime').val(obj[0].createTimeStr);
			$('#trainflow .flow .flowplan .startTime').val(obj[0].startTimeStr);
			$('#trainflow .flow .flowplan .endTime').val(obj[0].endTimeStr);
			if(obj[0].applyState == 1)
				$('#trainflow .flow .flowplan .examineStatus').val('待审');
			else if(obj[0].applyState == 2)
				$('#trainflow .flow .flowplan .examineStatus').val('撤回');
			else if(obj[0].applyState == 3)
				$('#trainflow .flow .flowplan .examineStatus').val('通过');
			else if(obj[0].applyState == 4)
				$('#trainflow .flow .flowplan .examineStatus').val('驳回');
			else if(obj[0].applyState == 5)
				$('#trainflow .flow .flowplan .examineStatus').val('完成');
			$('#trainflow .flow .flowplan .detail').html(obj[0].trainDetail);
			$('#trainflow .flow .flowplan .reason').html(obj[0].trainReason);
		}
	})
}