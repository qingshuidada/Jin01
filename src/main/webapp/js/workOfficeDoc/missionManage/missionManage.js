$(function(){
	$('#missionManagedg').datagrid({
		   url:'../../mission/selectMission.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:false,
		   pagination:true,
		   toolbar:"#missionManage .invitetop",
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
		        		opera += '<span class="small-button look" title="查看" onclick="lookMission('+id+')"></span>';
		    	   /*if(existPermission('admin:workOfficeDoc:missionManage:missionManage:update'))
		        		opera += '<span class="small-button edit" title="修改" onclick="editMission('+id+')"></span>';
		    	   if(existPermission('admin:workOfficeDoc:missionManage:missionManage:delete'))
		        		opera += '<span class="small-button delete" title="删除" onclick="deleteMission('+id+')"></span>';*/
		    	   return opera;
		    	}},
		  ]]	
	});
	//查看任务的编辑器
	UE.delEditor('missionEditorSecond');
	UE.getEditor('missionEditorSecond', {
	    theme:"default", //皮肤
	    lang:'zh-cn',//语言
	    autoHeightEnabled:false,  //不长高
	    initialFrameWidth:960,  //初始化编辑器宽度,默认1000
        initialFrameHeight:200, //初始化编辑器高度,默认320
        enableAutoSave: false,      //去掉保存
	});
	//修改任务的编辑器
	UE.delEditor('missionEditorThree');
	UE.getEditor('missionEditorThree', {
	    theme:"default", //皮肤
	    lang:'zh-cn',//语言
	    autoHeightEnabled:false,  //不长高
	    initialFrameWidth:960,  //初始化编辑器宽度,默认1000
        initialFrameHeight:200, //初始化编辑器高度,默认320
        enableAutoSave: false,      //去掉保存
	});
	//查询
	$('#missionManage .invitetop .select').click(function(){
		var missionName = $('#missionManage .invitetop .missionName').val();
		var launchUserName = $('#missionManage .invitetop .launchUserName').val();
		var headUserName = $('#missionManage .invitetop .headUserName').val();
			$('#missionManagedg').datagrid({
				url:'../../mission/selectMission.do?getMs='+getMS(),
				queryParams: {
					missionName:missionName,
					launchUserName:launchUserName,
					headUserName:headUserName
				},
			});
	});
	//返回按钮
	$('#missionManage .maintop .back').click(function(){
		$('#missionManage .list').show();
		$('#missionManage .maintop .back').hide();
		$('#missionManage .lookMission').hide();
		$('#missionManage .editMission').hide();
		$("#missionManagedg").datagrid('reload');
		$('#missionManage .lookMission .record').html("");
	});
	//修改任务信息
	$('#missionManage .editMission .submit').click(function(){
		var missionId = $('#missionManage .editMission .missionId').val();
		var missionName = $('#missionManage .editMission .missionName').val();
		var startTime = $('#missionManage .editMission .startTime').val();
		var expectEndTime = $('#missionManage .editMission .expectEndTime').val();
		var missionDescribe = UE.getEditor('missionEditorThree').getContent();
		if(missionName == '' || missionName == null){
			windowControl('请填写任务名称！');
			return ;
		}else if(startTime == '' || startTime == null){
			windowControl('请选择开始时间！');
			return ;
		}else if(expectEndTime == '' || expectEndTime == null){
			windowControl('请选择预计结束时间！');
			return ;
		}else{
			var data = {
					missionId:missionId,
					missionName:missionName,
					startTimeStr:startTime,
					expectEndTimeStr:expectEndTime,
					missionDescribe:missionDescribe
			}
			$.ajax({
				url:'../../mission/updateMission.do?getMs='+getMS(),
				data:data,
				type:'post',
				dataType:'json',
				success:function(data){
					if(data == '200'){
						windowControl('修改成功,请点击返回');
					}else{
						windowControl('修改失败！');
					}
				},
				error:function(error){
					windowControl(error.status);
				}
			});
		}
		
	});
});
//查看一条任务
function lookMission(id){
	$('#missionManage .list').hide();
	$('#missionManage .maintop .back').show();
	$('#missionManage .lookMission').show();
	$.ajax({
		url:'../../mission/selectMissionByMissionId.do?getMs='+getMS(),
		data:{
			missionId:id
		},
		success:function(data){
			var data = eval('(' + data + ')');
			$('#missionManage .lookMission .missionName').val(data.rows[0].missionName);
			$('#missionManage .lookMission .launchUserName').val(data.rows[0].launchUserName);
			$('#missionManage .lookMission .headUserName').val(data.rows[0].headUserName);
			$('#missionManage .lookMission .startTime').val(data.rows[0].startTimeStr);
			$('#missionManage .lookMission .expectEndTime').val(data.rows[0].expectEndTimeStr);
			$('#missionManage .lookMission .realityEndTime').val(data.rows[0].realityEndTimeStr);
			UE.getEditor('missionEditorSecond').setContent(data.rows[0].missionDescribe);
			var str = '<tr><td><span>执行人</span></td><td><span>实际完成时间</span></td><td><span>任务状态</span></td><td><span>实际任务进度</span></td></tr>';
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
/*				str +='<td><span class="pointer" style="width: 82px;" id="'+data.rows[i].headId+'" missionState="'+data.rows[i].missionState+'" headUserId="'+data.rows[i].headUserId+'"  launchUserId="'+data.rows[i].launchUserId+'" launchUserName="'+data.rows[i].launchUserName+'"  onclick=examine(this)>审批</span></td></tr>';*/
			}
			$('#missionManage .lookMission .record').append(str);
			/*$('#missionTwo').progressbar({
			    value: data.rows[0].realityValue
			});
			var startTime = data.rows[0].startTimeStr;
			var expectEndTime = data.rows[0].expectEndTimeStr;
			var dayOne = DateDiff(startTime,expectEndTime);
			var today = new Date().format("yyyy-MM-dd")
			var dayTwo = DateDiff(startTime,today);
			if(dayTwo == 0){
				$('#missionOne').progressbar({
				    value: 0
				});
			}else{
				var value = dayTwo/dayOne*100;
				$('#missionOne').progressbar({
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
				$('#missionManage .lookMission .userName').val(userNames);
			}else{
				$('#missionManage .lookMission .userName').val("无");
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
				$('#missionManage .lookMission .headUserName').val(userNames);
			}else{
				$('#missionManage .lookMission .headUserName').val("无");
			}
			
		},
		error:function(err){
			windowControl('网络异常');
		}
	});
}
//修改任务
function editMission(id){
	$('#missionManage .list').hide();
	$('#missionManage .maintop .back').show();
	$('#missionManage .editMission').show();
	$.ajax({
		url:'../../mission/selectMission.do?getMs='+getMS(),
		data:{
			missionId:id
		},
		success:function(data){
			var data = eval('(' + data + ')');
			$('#missionManage .editMission .missionName').val(data.rows[0].missionName);
			$('#missionManage .editMission .launchUserName').val(data.rows[0].launchUserName);
			$('#missionManage .editMission .headUserName').val(data.rows[0].headUserName);
			$('#missionManage .editMission .startTime').val(data.rows[0].startTimeStr);
			$('#missionManage .editMission .expectEndTime').val(data.rows[0].expectEndTimeStr);
			$('#missionManage .editMission .realityEndTime').val(data.rows[0].realityEndTimeStr);
			UE.getEditor('missionEditorThree').setContent(data.rows[0].missionDescribe);
			$('#missionManage .editMission .missionId').val(id);
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
				$('#missionManage .editMission .userName').val(userNames);
			}else{
				$('#missionManage .editMission .userName').val("无");
			}
			
		},
		error:function(err){
			windowControl('网络异常');
		}
	});
}
//删除任务
function deleteMission(id){
	ui.confirm('确定此任务删除吗? ',function(z){
		if(z){
			$.ajax({
				url:'../../mission/deleteMission.do?getMs='+getMS(),
				data:{
						missionId:id,
				},
				success:function(data){
					if(data == 200){
						windowControl('删除任务成功!');
						$("#missionManagedg").datagrid('reload');
					}else{
						windowControl('删除任务失败!');
					}
				},
				error:function(data){
					windowControl('网络异常');
				}
			});
		}
	},false);
}