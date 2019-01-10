$(function(){
	console.log(toflow);
	var flowindex = $('.flowplan').length-1;
	var flowcontent = $.parseJSON(toflow);
	var len = flowcontent.rows.length-1;
	var content = null;
	var Status = null;
	var dom = null;
	$.ajax({
		data:{inviteId:flowcontent.rows[0].inviteId,},
		url:'../../personnel/queryInviteApply.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			content = $.parseJSON(data);
			if(content.rows[len].inviteStatus == 1){//1审批中2撤回3招聘中4驳回5招满
				Status = "审批中";
			}else if(content.rows[len].inviteStatus == 2){
				Status = "撤回";
			}else if(content.rows[len].inviteStatus == 3){
				Status = "招聘中";
			}else if(content.rows[len].inviteStatus == 4){
				Status = "驳回";
			}else if(content.rows[len].inviteStatus == 5){
				Status = "招满";
			}
			var str = '<p class="jiachu">流程名：</p><p><input type="text"  class="flowName" value="'+content.rows[0].planName+'"/></p><p class="jiachu">发起人：</p><p><input type="text" class="applyName" value="'+content.rows[0].applyUserName+'"/></p><p class="jiachu">发起时间：</p><p><input type="text" class="startTime" value="'+content.rows[0].createTimeStr+'"/></p><p class="jiachu">审批状态：</p><p><input type="text" class="examineStatus" value="'+Status+'"/></p><p class="jiachu">发起理由：</p><div class="applyDescribe">'+content.rows[0].reason+'</div>';
			$('.flowplan:eq('+flowindex+')').append(str);
		},
		error:function(err){
			windowControl(err.status);
		}
	});
	
	/*for(var i = 0;i <= len;i++){
		dom =ss;
	}*/
	
});