$(function(){
	var lW = $('#loadarea').width()*.944;
	var lH = $('#loadarea').height()-31;
	$('#addMission').css('height',lH+'px');
	$('#addMission .missionUeditor').css('width',lW-600+'px');
	UE.delEditor("missionEditor");
	UE.getEditor('missionEditor', {
	    theme:"default", //皮肤
	    lang:'zh-cn',//语言
	    autoHeightEnabled:false,  //不长高,出现滚动条
	    initialFrameWidth:lW-590,//初始化编辑器宽度,默认1000
	    initialFrameHeight:lH-600, //初始化编辑器高度,默认320
	    enableAutoSave: false, 
	});
	$.ajax({
		url:'../../user/getUserInfo.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			if(data == '500')
				return ;
			var data = eval('(' + data + ')');
			$('#addMission .missionClass .launchUserName').val(data.userName);
			$('#addMission .missionClass .launchUserId').val(data.userId);
		},
		error:function(error){
			windowControl(error.status);
		}
	});
	//选择执行人
	$('#addMission .selArea .selectHeadUserName').click(function(){
		chooseUsers1();
		$('#chooseUsers1 .confirm').click(function(){
			$('#chooseUsers1').css('display','none');	
			selectUsers = $('#chooseUsers1 .popuparea .user').datagrid('getSelections');
			var headUserIds = '';
			var headUserNames = '';
			for(i = 0 ;i < selectUsers.length;i++){
				headUserIds = headUserIds + "" + selectUsers[i].userId + ",";
				headUserNames = headUserNames + "" + selectUsers[i].userName + ",";
	    	}
			$('#addMission .selArea .headUserName').val(headUserNames.substring(0, headUserNames.length - 1));
			$('#addMission .selArea .headUserId').val(headUserIds.substring(0, headUserIds.length - 1));
		});
	});
	//选择抄送人
	$('#addMission .selArea .selectUserName').click(function(){
		chooseUsers();
		$('#chooseUsers .confirm').click(function(){
			$('#chooseUsers').css('display','none');	
			var selectUsers = $('#chooseUsers .popuparea .user').datagrid('getSelections');
			var userIds = '';
			var userNames='';
			for(i = 0 ;i < selectUsers.length;i++){
				userIds = userIds + "" + selectUsers[i].userId + ",";
				userNames = userNames + "" + selectUsers[i].userName + ",";
	    	}
			$('#addMission .selArea .userName').val(userNames.substring(0, userNames.length - 1));
			$('#addMission .selArea .userId').val(userIds.substring(0, userIds.length - 1));
		});
	});
	//发起任务
	$('#addMission .btnArea .confirm').click(function(){
		var missionName = $('#addMission .missionClass .missionName').val();
		var launchUserId = $('#addMission .missionClass .launchUserId').val();
		var launchUserName = $('#addMission .missionClass .launchUserName').val();
		var startTime = $('#addMission .missionClass .startTime').val();
		var expectEndTime = $('#addMission .missionClass .expectEndTime').val();
		var userIds = $('#addMission .selArea .userId').val();
		var headUserIds = $('#addMission .selArea .headUserId').val();
		var missionDescribe = UE.getEditor('missionEditor').getContent();
		if(missionName == '' || missionName == null){
			windowControl('请填写任务名称！');
			return ;
		}else if(startTime == '' || startTime == null){
			windowControl('请选择开始时间！');
			return ;
		}else if(expectEndTime == '' || expectEndTime == null){
			windowControl('请选择预计结束时间！');
			return ;
		}else if(headUserIds == '' || headUserIds == null){
			windowControl('请选择执行人！');
			return ;
		}else{
			
			var data = {
					missionName:missionName,
					launchUserId:launchUserId,
					launchUserName:launchUserName,
					startTimeStr:startTime,
					expectEndTimeStr:expectEndTime,
					userIds:userIds,
					headUserIds:headUserIds,
					missionDescribe:missionDescribe
			}
			$.ajax({
				url:'../../mission/insertMission.do?getMs='+getMS(),
				data:data,
				type:'post',
				dataType:'json',
				success:function(data){
					if(data == '200'){
						windowControl('发布成功！');
						cleanMission();
					}else{
						windowControl('发布失败！');
					}
				},
				error:function(error){
					windowControl(error.status);
				}
			});
			
			
			
		}
	});
})
//清空添加合同
function cleanMission(){
	$('#addMission .missionName').val(null);
	$('#addMission .startTime').val(null);
	$('#addMission .expectEndTime').val(null);
	$('#addMission .userName').val(null);
	$('#addMission .userId').val(null);
	$('#addMission .headUserName').val(null);
	$('#addMission .headUserId').val(null);
	UE.getEditor('missionEditor').setContent('');					
}

