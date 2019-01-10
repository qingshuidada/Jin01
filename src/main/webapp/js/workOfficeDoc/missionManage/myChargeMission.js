$(function(){
	$('#myChargeMissiondg').datagrid({
		   url:'../../mission/selectMyChargeMission.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:false,
		   pagination:true,
		   toolbar:"#myChargeMission .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"ck",checkbox:true },
		       {field:"missionName",title:"任务名称",resizable:true,fitColumns:true,align:"center",sortable:true,width:100},
		       {field:"launchUserName",title:"发起人",resizable:true,fitColumns:true,align:"center",sortable:true,width:100},
		       {field:"headUserName",title:"负责人",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"startTimeStr",title:"开始时间",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"expectEndTimeStr",title:"预计结束时间",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"realityEndTimeStr",title:"实际结束时间",resizable:true,fitColumns:true,align:"center",sortable:true,width:80},
		       {field:"missionState",title:"任务状态",resizable:true,fitColumns:true,align:"center",sortable:true,width:80,formatter:function(value,row,index){
			    	  if(value == 1){
			    		  return '<span style="color: red">处理中<span>';
			    	  }else if(value == 2){
			    		  return '<span style="color: blue">审核中<span>';
			    	  }else if(value == 3){
			    		  return '<span style="color: red">驳回<span>';
			    	  }else if(value == 4){
			    		  return '<span style="color: green">已完成<span>';
			    	  }
			   }},
		       {field:"_op",title:"管理",width:100,resizable:true,align:"center",fitColumns:true,width:100,sortable:true,formatter:function(value,row,index){
		    		var opera = '';
		    		var id = "'"+row.missionId+"'";
		    		var headId = "'"+row.headId+"'";
		    		var state = row.missionState;
		    		var launchUserId = "'"+row.launchUserId+"'";
		    		var headUserId = "'"+row.headUserId+"'";
		    		var headUserName = "'"+row.headUserName+"'";
		    		var realityValue = row.realityValue;
		    		var fileUrl = row.fileUrl;
		    	   if(existPermission('admin:workOfficeDoc:missionManage:missionManage:look'))
		        		opera += '<span class="small-button look" title="查看" onclick="lookChargeMission('+id+')"></span>';
		    	  /* if(state == 1 || state == 3){
		    		   opera += '<span class="small-button edit" title="确定任务完成" onclick="editChargeMission('+headId+','+launchUserId+','+headUserId+','+headUserName+')"></span>';
		    	   }*/
		    	   if(realityValue != 100){
		    		   opera += '<span class="small-button edit" title="填写任务进度值" onclick="editRealityValue('+headId+')"></span>';
		    	   }
		    	   if(typeof(fileUrl) == "undefined"){
		    		   opera += '<span class="small-button addbtn" title="上传文件" onclick="submitFile('+headId+')"></span>';
		    	   }
		    	   return opera;
		    	}},
		  ]]	
	});
	//查看任务的编辑器
	UE.delEditor('chargeMissionEditor');
	UE.getEditor('chargeMissionEditor', {
	    theme:"default", //皮肤
	    lang:'zh-cn',//语言
	    autoHeightEnabled:false,  //不长高
	    initialFrameWidth:960,  //初始化编辑器宽度,默认1000
        initialFrameHeight:200, //初始化编辑器高度,默认320
        enableAutoSave: false,      //去掉保存
	});
	//查询
	$('#myChargeMission .invitetop .select').click(function(){
		var missionName = $('#myChargeMission .invitetop .missionName').val();
		var launchUserName = $('#myChargeMission .invitetop .launchUserName').val();
		var headUserName = $('#myChargeMission .invitetop .headUserName').val();
			$('#myChargeMissiondg').datagrid({
				url:'../../mission/selectMyChargeMission.do?getMs='+getMS(),
				queryParams: {
					missionName:missionName,
					launchUserName:launchUserName,
					headUserName:headUserName
				},
			});
	});
	//返回按钮
	$('#myChargeMission .maintop .back').click(function(){
		$('#myChargeMission .list').show();
		$('#myChargeMission .maintop .back').hide();
		$("#myChargeMissiondg").datagrid('reload');
		$('#myChargeMission .lookChargeMission .record').html("");
	});
	$('#myChargeMission .editRealityValue .confirm').click(function(){
		var reg = new RegExp("^(\\d|[1-9]\\d|100)$");
		var id = $('#myChargeMission .editRealityValue .id').val();
		var realityValue = $('#myChargeMission .editRealityValue .realityValue').val();
		if(!reg.test(realityValue)){
			windowControl('请输入1-100的整数!');
		}else{
			$.ajax({
				url:'../../mission/updateMissionState.do?getMs='+getMS(),
				data:{
						headId:id,
						realityValue:realityValue
				},
				success:function(data){
					if(data == 200){
						windowControl('更改任务进度成功!');
						$("#myChargeMissiondg").datagrid('reload');
						$('#myChargeMission .editRealityValue').css('display','none');
						$('#myChargeMission .editRealityValue input').val(null);
					}else{
						windowControl('更改任务进度失败!');
					}
				},
				error:function(data){
					windowControl('网络异常');
				}
			});
		}
	});
	$('#myChargeMission .submitFile .confirm').click(function(){
		$('#myChargeMission .submitFile input[type=file]').upload({
			url:"../../certificate/uploadAttachmentFile.do?getMs="+getMS(),
			onComplate: function (data) {
			if(data){
				var headId = $('#myChargeMission .submitFile .headId').val();
				var fileName = data.attachmentFileName;
				var fileUrl = data.attachmentFileUrl;
				$.ajax({
					url:'../../mission/updateMissionHead.do?getMs='+getMS(),
					data:{
							headId:headId,
							fileName:fileName,
							fileUrl:fileUrl
					},
					success:function(data){
						if(data == 200){
							windowControl('上传任务文件成功!');
							$("#myChargeMissiondg").datagrid('reload');
							$('#myChargeMission .submitFile').css('display','none');
							$('#myChargeMission .submitFile input').val(null);
						}else{
							windowControl('上传任务文件失败!');
						}
					},
					error:function(data){
						windowControl('网络异常');
					}
				});
				}
			}
		});
		$('#myChargeMission .submitFile input[type=file]').upload("ajaxSubmit");
	});
})
function lookChargeMission(id){
	$('#myChargeMission .list').hide();
	$('#myChargeMission .maintop .back').show();
	$('#myChargeMission .lookChargeMission').show();
	$.ajax({
		url:'../../mission/selectMyChargeMission.do?getMs='+getMS(),
		data:{
			missionId:id
		},
		success:function(data){
			var data = eval('(' + data + ')');
			$('#myChargeMission .lookChargeMission .missionName').val(data.rows[0].missionName);
			$('#myChargeMission .lookChargeMission .launchUserName').val(data.rows[0].launchUserName);
			$('#myChargeMission .lookChargeMission .startTime').val(data.rows[0].startTimeStr);
			$('#myChargeMission .lookChargeMission .expectEndTime').val(data.rows[0].expectEndTimeStr);
			$('#myChargeMission .lookChargeMission .realityEndTime').val(data.rows[0].realityEndTimeStr);
			UE.getEditor('chargeMissionEditor').setContent(data.rows[0].missionDescribe);
			$('#chargeTwo').progressbar({
			    value: data.rows[0].realityValue
			});
			var startTime = data.rows[0].startTimeStr;
			var expectEndTime = data.rows[0].expectEndTimeStr;
			var dayOne = DateDiff(startTime,expectEndTime);
			var today = new Date().format("yyyy-MM-dd")
			var dayTwo = DateDiff(startTime,today);
			if(dayTwo == 0){
				$('#chargeOne').progressbar({
				    value: 0
				});
			}else{
				var value = Math.floor(dayTwo/dayOne*100);
				$('#chargeOne').progressbar({
				    value: value
				});
			}
			if(data.rows[0].readFlag == '0'){
				var headId = data.rows[0].headId;
				var readTime = new Date;
				$.ajax({
					url:'../../mission/updateMissionHead.do?getMs='+getMS(),
					data:{
							headId:headId,
							readFlag:'1',
							readTime:readTime
					},
					success:function(data){
						alert('阅读状态变为已读');
					},
					error:function(data){
						windowControl('网络异常');
					}
				});
			}
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
				$('#myChargeMission .lookChargeMission .userName').val(userNames);
			}else{
				$('#myChargeMission .lookChargeMission .userName').val("无");
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
				$('#myChargeMission .lookChargeMission .headUserName').val(userNames);
			}else{
				$('#myChargeMission .lookChargeMission .headUserName').val("无");
			}
			
		},
		error:function(err){
			windowControl('网络异常');
		}
	});
	
}
/*function editChargeMission(headId,headUserId,launchUserId,headUserName){
	ui.confirm('确定此任务已完成吗? ',function(z){
		if(z){
			$.ajax({
				url:'../../mission/updateMissionState.do?getMs='+getMS(),
				data:{
						headId:headId,
						missionState:'2',
						headUserId:headUserId,
						launchUserId:launchUserId,
						headUserName:headUserName
				},
				success:function(data){
					if(data == 200){
						windowControl('确定任务成功，交由发起人审核！');
						$("#myChargeMissiondg").datagrid('reload');
					}else{
						windowControl('确定任务失败!');
					}
				},
				error:function(data){
					windowControl('网络异常');
				}
			});
		}
	},false);
}*/
function editRealityValue(headId){
	$('#myChargeMission .editRealityValue').css('display','block');
	$('#myChargeMission .editRealityValue .id').val(headId);
}
function submitFile(headId){
	$('#myChargeMission .submitFile').css('display','block');
	$('#myChargeMission .submitFile .headId').val(headId);
}