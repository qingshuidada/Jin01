$(function(){
	$('#myToviewMissiondg').datagrid({
		   url:'../../mission/selectUserToviewMission.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:false,
		   pagination:true,
		   toolbar:"#myToviewMission .invitetop",
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
		        		opera += '<span class="small-button look" title="查看" onclick="lookToviewMission('+id+')"></span>';
		    	   return opera;
		    	}},
		  ]]	
	});
	//查看任务的编辑器
	UE.delEditor('toviewMissionEditor');
	UE.getEditor('toviewMissionEditor', {
	    theme:"default", //皮肤
	    lang:'zh-cn',//语言
	    autoHeightEnabled:false,  //不长高
	    initialFrameWidth:960,  //初始化编辑器宽度,默认1000
        initialFrameHeight:200, //初始化编辑器高度,默认320
        enableAutoSave: false,      //去掉保存
	});
	//查询
	$('#myToviewMission .invitetop .select').click(function(){
		var missionName = $('#myToviewMission .invitetop .missionName').val();
		var launchUserName = $('#myToviewMission .invitetop .launchUserName').val();
		var headUserName = $('#myToviewMission .invitetop .headUserName').val();
			$('#myToviewMissiondg').datagrid({
				url:'../../mission/selectUserToviewMission.do?getMs='+getMS(),
				queryParams: {
					missionName:missionName,
					launchUserName:launchUserName,
					headUserName:headUserName
				},
			});
	});
	//返回按钮
	$('#myToviewMission .maintop .back').click(function(){
		$('#myToviewMission .list').show();
		$('#myToviewMission .maintop .back').hide();
		$("#myToviewMissiondg").datagrid('reload');
		$('#myToviewMission .lookToviewMission .record').html("");
	});
})
function lookToviewMission(id){
	$('#myToviewMission .list').hide();
	$('#myToviewMission .maintop .back').show();
	$('#myToviewMission .lookToviewMission').show();
	$.ajax({
		url:'../../mission/selectMissionByMissionId.do?getMs='+getMS(),
		data:{
			missionId:id
		},
		success:function(data){
			var data = eval('(' + data + ')');
			$('#myToviewMission .lookToviewMission .missionName').val(data.rows[0].missionName);
			$('#myToviewMission .lookToviewMission .launchUserName').val(data.rows[0].launchUserName);
			$('#myToviewMission .lookToviewMission .startTime').val(data.rows[0].startTimeStr);
			$('#myToviewMission .lookToviewMission .expectEndTime').val(data.rows[0].expectEndTimeStr);
			UE.getEditor('toviewMissionEditor').setContent(data.rows[0].missionDescribe);
			var str = '<table border="1"><tr><td><span>执行人</span></td><td><span>实际完成时间</span></td><td><span>任务状态</span></td><td><span>实际任务进度</span></td><td></tr>';
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
				str += '<tr><td><span style="width: 82px;">'+data.rows[i].headUserName+'</td></span><td><span style="width: 120px;" class="realityEndTimeStr">'+realityEndTimeStr+'</span></td><td><span style="width: 82px;">'+missionState+'</span></td><td><span style="width: 82px;">'+data.rows[i].realityValue+'%</span></td>';
				str +='</table>';
			}
			$('#myToviewMission .lookToviewMission .record').append(str);
			/*$('#toViewTwo').progressbar({
			    value: data.rows[0].realityValue
			});
			var startTime = data.rows[0].startTimeStr;
			var expectEndTime = data.rows[0].expectEndTimeStr;
			var dayOne = DateDiff(startTime,expectEndTime);
			var today = new Date().format("yyyy-MM-dd")
			var dayTwo = DateDiff(startTime,today);
			if(dayTwo == 0){
				$('#toVieweOne').progressbar({
				    value: 0
				});
			}else{
				var value = dayTwo/dayOne*100;
				$('#toVieweOne').progressbar({
				    value: value
				});
			}*/
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
				$('#myToviewMission .lookToviewMission .userName').val(userNames);
			}else{
				$('#myToviewMission .lookToviewMission .userName').val("无");
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
				$('#myToviewMission .lookToviewMission .headUserName').val(userNames);
			}else{
				$('#myLaunchMission .lookToviewMission .headUserName').val("无");
			}
			
		},
		error:function(err){
			windowControl('网络异常');
		}
	});
}