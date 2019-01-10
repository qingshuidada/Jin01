$(function(){
	$('#myLaunchMissiondg').datagrid({
		   url:'../../mission/selectMyLaunchMission.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:false,
		   pagination:true,
		   toolbar:"#myLaunchMission .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"ck",checkbox:true },
		       {field:"missionName",title:"任务名称",resizable:true,fitColumns:true,align:"center",sortable:true,width:100},
		       {field:"launchUserName",title:"发起人",resizable:true,fitColumns:true,align:"center",sortable:true,width:100},
		       {field:"startTimeStr",title:"开始时间",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"expectEndTimeStr",title:"预计结束时间",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"_op",title:"管理",width:100,resizable:true,align:"center",fitColumns:true,width:100,sortable:true,formatter:function(value,row,index){
		    		var opera = '';
		    		var id = "'"+row.missionId+"'";
		    	   if(existPermission('admin:workOfficeDoc:missionManage:missionManage:look'))
		        		opera += '<span class="small-button look" title="查看" onclick="lookLaunchMission('+id+')"></span>';
		    	   return opera;
		    	}},
		  ]]	
	});
	//查看任务的编辑器
	UE.delEditor('launchMissionEditor');
	UE.getEditor('launchMissionEditor', {
	    theme:"default", //皮肤
	    lang:'zh-cn',//语言
	    autoHeightEnabled:false,  //不长高
	    initialFrameWidth:960,  //初始化编辑器宽度,默认1000
        initialFrameHeight:200, //初始化编辑器高度,默认320
        enableAutoSave: false,      //去掉保存
	});
	//查询
	$('#myLaunchMission .invitetop .select').click(function(){
		var missionName = $('#myLaunchMission .invitetop .missionName').val();
		var launchUserName = $('#myLaunchMission .invitetop .launchUserName').val();
		var headUserName = $('#myLaunchMission .invitetop .headUserName').val();
			$('#myLaunchMissiondg').datagrid({
				url:'../../mission/selectMyLaunchMission.do?getMs='+getMS(),
				queryParams: {
					missionName:missionName,
					launchUserName:launchUserName,
					headUserName:headUserName
				},
			});
	});
	//返回按钮
	$('#myLaunchMission .maintop .back').click(function(){
		$('#myLaunchMission .list').show();
		$('#myLaunchMission .maintop .back').hide();
		$("#myLaunchMissiondg").datagrid('reload');
		$('#myLaunchMission .lookLaunchMission .record').html("");
	});
	//审批
	$('#myLaunchMission .editLaunchMission .confirm').click(function(){
		var missionState = $("input[name='btn']:checked").attr("data-type");
		var id = $('#myLaunchMission .editLaunchMission .id').val();
		var headUserId = $('#myLaunchMission .editLaunchMission .headUserId').val();
		var launchUserId = $('#myLaunchMission .editLaunchMission .launchUserId').val();
		var launchUserName = $('#myLaunchMission .editLaunchMission .launchUserName').val();
		$.ajax({
			url:'../../mission/updateMissionState.do?getMs='+getMS(),
			data:{
					headId:id,
					missionState:missionState,
					headUserId:headUserId,
					launchUserId:launchUserId,
					launchUserName:launchUserName
			},
			success:function(data){
				if(data == 200){
					$('#myLaunchMission .editLaunchMission').css('display','none');
					$('#myLaunchMission .editLaunchMission input[type=hidden]').val(null);
					$('#myLaunchMission .list').show();
					$('#myLaunchMission .maintop .back').hide();
					$("#myLaunchMissiondg").datagrid('reload');
					$('#myLaunchMission .lookLaunchMission .record').html("");
					windowControl('审批任务成功,请点击查看!');
				}else{
					windowControl('审批任务失败!');
				}
			},
			error:function(data){
				windowControl('网络异常');
			}
		});
		
	});
	
})
function lookLaunchMission(id){
	$('#myLaunchMission .list').hide();
	$('#myLaunchMission .maintop .back').show();
	$('#myLaunchMission .lookLaunchMission').show();
	$.ajax({
		url:'../../mission/selectMissionByMissionId.do?getMs='+getMS(),
		data:{
			missionId:id
		},
		success:function(data){
			var data = eval('(' + data + ')');
			console.log(data);
			$('#myLaunchMission .lookLaunchMission .missionName').val(data.rows[0].missionName);
			$('#myLaunchMission .lookLaunchMission .launchUserName').val(data.rows[0].launchUserName);
			$('#myLaunchMission .lookLaunchMission .startTime').val(data.rows[0].startTimeStr);
			$('#myLaunchMission .lookLaunchMission .expectEndTime').val(data.rows[0].expectEndTimeStr);
			UE.getEditor('launchMissionEditor').setContent(data.rows[0].missionDescribe);
			var str = '<table border="1"><tr><td><span>执行人</span></td><td><span>实际完成时间</span></td><td><span>任务状态</span></td><td><span>实际任务进度</span></td><td><span>阅读状态</span></td><td><span>阅读时间</span></td><td><span>附件名称</span></td><td><span>操作</span></td></tr>';
			for(var i=0;i<data.rows.length;i++){
				var time = data.rows[i].realityEndTimeStr;
				if(typeof(time) == "undefined"){
					var realityEndTimeStr = "处理中";
				}else{
					var realityEndTimeStr = time;
				}
				var state  = data.rows[i].missionState;
				if(state == 1){
					var missionState = '<span style="color: red">处理中<span>';
				}else if(state == 2){
					var missionState = '<span style="color: red">审批中<span>';
				}else if(state == 3){
					var missionState = '<span style="color: red">驳回<span>';
		    	}else if(state == 4){
		    		var missionState = '<span style="color: green">已完成<span>';
		    	}
				var flag = data.rows[i].readFlag;
				if(flag == 0){
					var readFlag = '<span style="color: red">未读<span>';
				}else if(flag == 1){
					var readFlag = '<span style="color: green">已读<span>';
				}
				
				var readTime = data.rows[i].readTimeStr;
				if(typeof(readTime) == "undefined"){
					var readTimeStr = "";
				}else{
					var readTimeStr = readTime;
				}
				
				var file = data.rows[i].fileName;
				if(typeof(file) == "undefined"){
					var fileName = "";
				}else{
					var fileName = file;
				}
				str += '<tr><td><span style="width: 82px;">'+data.rows[i].headUserName+'</td></span><td><span style="width: 120px;" class="realityEndTimeStr">'+realityEndTimeStr+'</span></td><td><span style="width: 82px;">'+missionState+'</span></td><td><span style="width: 82px;">'+data.rows[i].realityValue+'%</span></td>';
				str +='<td><span class="readFlag">'+readFlag+'</span></td><td><span>'+readTimeStr+'</span></td>';
				str +='<td><a href="../../document/showWord.do?path='+data.rows[i].fileUrl+'">'+fileName+'</a></td>';
				str +='<td><input type="button" value="审批" id="'+data.rows[i].headId+'" missionState="'+data.rows[i].missionState+'" headUserId="'+data.rows[i].headUserId+'"  launchUserId="'+data.rows[i].launchUserId+'" launchUserName="'+data.rows[i].launchUserName+'"  onclick=examine(this)></input></td></tr>';
				
			}
				str +='</table>';
			$('#myLaunchMission .lookLaunchMission .record').append(str);
		},
		error:function(err){
			windowControl('网络异常');
		}
	});
	$.ajax({
		url:'../../mission/selectMissionUserName.do?getMs='+getMS(),
		data:{
			missionId:id
		},
		success:function(data){
			var data = eval('(' + data + ')');
			if(data.rows.length != 0){
				var userNames = '';
				for(i = 0 ;i < data.rows.length;i++){
					userNames = userNames + "" + data.rows[i].userName + ",";
		    	}
				$('#myLaunchMission .lookLaunchMission .userName').val(userNames);
			}else{
				$('#myLaunchMission .lookLaunchMission .userName').val("无");
			}
			
		},
		error:function(err){
			windowControl('网络异常');
		}
	});
	$.ajax({
		url:'../../mission/selectMissionHeadUser.do?getMs='+getMS(),
		data:{
			missionId:id
		},
		success:function(data){
			var data = eval('(' + data + ')');
			if(data.rows.length != 0){
				var userNames = '';
				for(i = 0 ;i < data.rows.length;i++){
					userNames = userNames + "" + data.rows[i].userName + ",";
		    	}
				$('#myLaunchMission .lookLaunchMission .headUserName').val(userNames);
			}else{
				$('#myLaunchMission .lookLaunchMission .headUserName').val("无");
			}
			
		},
		error:function(err){
			windowControl('网络异常');
		}
	});
}
function examine(ele){
	var id = $(ele).attr('id');
	var missionState = $(ele).attr('missionState');
	var headUserId = $(ele).attr('headUserId');
	var launchUserId = $(ele).attr('launchUserId');
	var launchUserName = $(ele).attr('launchUserName');
	if(missionState == 2){
		$('#myLaunchMission .editLaunchMission').css('display','block');
		$('#myLaunchMission .editLaunchMission .id').val(id);
		$('#myLaunchMission .editLaunchMission .headUserId').val(headUserId);
		$('#myLaunchMission .editLaunchMission .launchUserId').val(launchUserId);
		$('#myLaunchMission .editLaunchMission .launchUserName').val(launchUserName);
		
	}else{
		windowControl('此任务状态未在审批中，不可审批');
	}
}