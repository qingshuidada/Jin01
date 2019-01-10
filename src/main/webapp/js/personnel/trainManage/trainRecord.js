$(function(){
	/**设置内部网格内容的高度**/
	$("#trainRecord .traindg").css('height',$('#loadarea').height()-64);
	$("#trainRecord .flow").css('height',$('#loadarea').height()-64);
	
	/******创建数据培训信息网格******/
	$('#trainRecord .traindg').datagrid({
	   // url:'../../train/queryTrainRecordStream.do?getMs='+getMS(),
	    method:"post",
	    columns:[[
			{field:'_operate',title:'操作',align:'center',width:100,formatter:function(value,row,index){
				var id = "'"+row.trainId+"'";
				var opera = '';
				  if(existPermission('admin:personnel:trainManage:trainRecord:select'))
						opera +='<span class="small-button lookflow" title="查看流程" onclick="selectTrainRecordMessage('+id+')"/>';
				 return opera;
			}},
			{field:'trainName',title:'培训名称',sortable:true,width:100},
			{field:'trainReason',title:'培训原因',sortable:true,width:100},
			{field:'startTimeStr',title:'培训开始时间',sortable:true,width:100,align:'right'},
			{field:'endTimeStr',title:'培训结束时间',sortable:true,width:100,align:'right'},
			{field:'trainDetail',title:'培训描述',sortable:true,width:100,align:'center'},
			{field:'createTimeStr',title:'申请备案时间',sortable:true,width:100,align:'center'},
	    ]],
	    toolbar:'#trainRecord .invitetop',
	    striped:true,
	    loadMsg:'数据加载中', 
	    //checkbox:true,
	    singleSelect:true,
	    pagination:true,
    	rownumbers:true
	});
	//查询
	$('#trainRecord .invitetop .query').click(function(){
		$('#trainRecord .traindg').datagrid({
			url:'../../train/queryTrainRecordStream.do?getMs='+getMS(),
			queryParams: {
	    		createUserName:function(){
	    			return $('#trainRecord input[name=createUserName]').val();
	    		},
				trainName:function(){
					return $('#trainRecord input[name=trainName]').val();
				}
	    	},
		});
	});
	
	/*********如果点击了返回按钮，则返回到列表********/
	$('#trainRecord .flow .flowbar .back').click(function(){
		$('#trainRecord .list').css('display','block');
		$('#trainRecord .flow').css('display','none');
	});
	
	/******通过，驳回，备案按钮相对应的监听事件*******/
	$("#trainRecord .reject").click(function(){
		$("#trainRecord .rejectWindow").css('display','block');
	});
	$("#trainRecord .reference").click(function(){
		$("#trainRecord .referenceWindow").css('display','block');
	});
	$("#trainRecord .past").click(function(){
		$("#trainRecord .pastWindow .nextpeople").html('下级审批人：'+$('#trainRecord input[name=nextExamineName]').val());
		$("#trainRecord .pastWindow").css('display','block');
	});
	
	/******选择下一级审批人*******/
	$('#trainRecord .flow .flowbar .chooseUser').click(function(){
		chooseUser();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUsers = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#trainRecord .flow .flowbar input[name="nextExamineUserName"]')
	    		.val(selectUsers[0].userName);
	    	$('#trainRecord .flow .flowbar input[name="nextExamineUser"]')
	    		.val(selectUsers[0].userId);
	    	$('#chooseUser .confirm').unbind();
	    });
	});
	
	
	/********通过，驳回，备案操作事件********/
	//驳回
	$("#trainRecord .rejectWindow .save").click(function(){
		var text = $('#trainRecord .rejectWindow textarea').val();
		var trainId = $('#trainRecord .flow .flowplan .trainId').val();
		var trainStreamId = $('#trainRecord .flow .flowplan .trainStreamId').val();
		$.ajax({
			url:'../../train/rejectTrainApply.do?getMs='+getMS(),
			type:'post',
			data:{
				examineIdea:text,
				trainId:trainId,
				trainStreamId:trainStreamId
			},
			success:function(data){
				windowControl(data);
			}
		})
	});
	//备案
	$("#trainRecord .referenceWindow .save").click(function(){
		var text = $('#trainRecord .referenceWindow textarea').val();
		var trainId = $('#trainRecord .flow .flowplan .trainId').val();
		var trainStreamId = $('#trainRecord .flow .flowplan .trainStreamId').val();
		windowControl(trainStreamId);
		$.ajax({
			url:'../../train/hrRecordTrain.do?getMs='+getMS(),
			data:{
				examineIdea:text,
				trainId:trainId,
				trainStreamId:trainStreamId
			},
			success:function(data){
				windowControl(data);
			}
		})
	});
	//驳回并给下一级审批
	$("#trainRecord .pastWindow .save").click(function(){
		var text = $('#trainRecord .pastWindow textarea').val();
		var trainId = $('#trainRecord .flow .flowplan .trainId').val();
		var nextExamineUserName = $('#trainRecord .flow .flowbar input[name=nextExamineUserName]').val();
		var nextExamineUser = $('#trainRecord .flow .flowbar input[name=nextExamineUser]').val();
		var trainStreamId = $('#trainRecord .flow .flowplan .trainStreamId').val();
		$.ajax({
			url:'../../train/rejectAndNextTrainApply.do?getMs='+getMS(),
			data:{
				examineIdea:text,
				nextExamineUser:nextExamineId,
				nextExamineUserName:nextExamineName,
				trainStreamId:trainStreamId,
				trainId:trainId
			},
			success:function(data){
				windowControl(data);
			}
		})
	});
})

function selectTrainRecordMessage(id){
	$('#trainRecord .list').css('display','none');
	$('#trainRecord .flow').css('display','block');
	/*******从服务器获取培训的流程审批信息*******/
	$.ajax({
		url:'../../train/queryTrainApplyStream.do?getMs='+getMS(),
		data:{
			trainId:id
		},
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')');
			var html = '';
			for(var i = 0; i<obj.length-1 ; i++){
				if(typeof obj[i].nextExamineUserName == 'undefined'){
					obj[i].nextExamineUserName = '';
				}
				if(typeof obj[i].examineIdea == 'undefined'){
					obj[i].examineIdea = '';
				}
				if(typeof obj[i].examineTimeStr == 'undefined'){
					obj[i].examineTimeStr = '';
				}
				html = html + '<div class="process"><div class="processbox">'
					 + '<p><span class="jiachu expeop" style="margin-left: 2px;">&ensp;&nbsp;审批人：'+obj[i].examineUserName+'</span>'
					 + '<span class="righttime">&ensp;&ensp;&ensp;&nbsp;审批时间：'+obj[i].examineTimeStr+'</span></p>'
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
			$('#trainRecord .flow .flowplan .trainStreamId').val(obj[obj.length-1].trainStreamId);
			$('#trainRecord .flow .showView').html(html);
		}
	})
	
	/*******从服务器获取培训的描述原因等信息*******/
	$.ajax({
		url:'../../train/queryTrainApply.do?getMs='+getMS(),
		data:{
			trainId:id
		},
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			$('#trainRecord .flow .flowplan .trainId').val(obj[0].trainId);
			$('#trainRecord .flow .flowplan .trainName').val(obj[0].trainName);
			$('#trainRecord .flow .flowplan .createUserName').val(obj[0].createUserName);
			$('#trainRecord .flow .flowplan .createTime').val(obj[0].createTimeStr);
			$('#trainRecord .flow .flowplan .startTime').val(obj[0].startTimeStr);
			$('#trainRecord .flow .flowplan .endTime').val(obj[0].endTimeStr);
			if(obj[0].applyState == 1)
				$('#trainRecord .flow .flowplan .examineStatus').val('待审');
			else if(obj[0].applyState == 2)
				$('#trainRecord .flow .flowplan .examineStatus').val('撤回');
			else if(obj[0].applyState == 3)
				$('#trainRecord .flow .flowplan .examineStatus').val('通过');
			else if(obj[0].applyState == 4)
				$('#trainRecord .flow .flowplan .examineStatus').val('驳回');
			else if(obj[0].applyState == 5)
				$('#trainRecord .flow .flowplan .examineStatus').val('完成');
			$('#trainRecord .flow .flowplan .detail').html(obj[0].trainDetail);
			$('#trainRecord .flow .flowplan .reason').html(obj[0].trainReason);
		}
	})
}