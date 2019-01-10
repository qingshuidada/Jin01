$(function(){
	/*if(existPermission('admin:personnel:attendanceManage:goout:add'))
		$('#goout .maintop').append('<div><span class="maintopicon mainicon2"></span> <span class="add">添加</span></div>');*/

	$('#goout .flow').css('height',$('#loadarea').height()-$('.tabs-header').height()-4+'px');
	$('#gooutdg').datagrid({
		   //url:'../../goout/findApplyByCondition.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#goout .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"userName",title:"公出人姓名",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"reason",title:"公出原因",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		       {field:"createTimeStr",title:"通过时间",fitColumns:true,resizable:true,align:"center",width:130,sortable:true},
		       {field:"startTimeStr",title:"开始时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"endTimeStr",title:"结束时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"locationTimeStr",title:"公出位置上传时间",fitColumns:true,resizable:true,align:"center",width:150,sortable:true},
		       {field:"outAddress",title:"公出位置",fitColumns:true,resizable:true,align:"center",width:130,sortable:true},
		       {field:"outLocation",title:"公出经纬度",fitColumns:true,resizable:true,width:100,align:"center",sortable:true},
		       /*{field:"_op",title:"管理",width:100,resizable:true,width:100,align:"center",sortable:true,formatter:function(value,row,index){
		    	   var id="'"+row.goOutApplyId+"'";
		    	   return'<span class="small-button lookflow" onclick="lookgoout('+id+')"></span>'
		       }},*/
		  ]]
	}); 
	cleanQuery($("#goout .list .invitetop .clean"));
	//添加外出申请点击事件
	$('#goout .maintop .add').click(function(){
		$('#goout .popups .saveleaveinformation').css('display','block');
		getDocumentMaker();
	});
	//查询
	$('#goout .invitetop .query').click(function(){
		var userName = $("#goout .invitetop .userName").val();
		/*var examineStatus=$("#goout .invitetop .examineStatus").val();
		if(examineStatus == "审批中")
			examineStatus = 1;
		if(examineStatus == "撤回")
			examineStatus = 2;
		if(examineStatus == "通过")
			examineStatus = 3;
		if(examineStatus == "驳回")
			examineStatus = 4;*/
		var inviteQueryInfo = {
				userName : userName
		}
		$('#gooutdg').datagrid({
			url:'../../outBusinessRecord/selectOutBusinessRecord.do?getMs='+getMS(),
			queryParams:inviteQueryInfo
		})
		
	});
	//选择审批人员
	$('#goout .popups .saveleaveinformation .chooseUser').click(function(){
		chooseUser();
		$('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#goout .popups .saveleaveinformation input[name=examineUserName]').val(selectUser[0].userName);
	    	$('#goout .popups .saveleaveinformation input[name=examineUserId]').val(selectUser[0].userId);
	    })	
	})
	//保存员工外出申请
	$('#goout .popups .saveleaveinformation .confirm').click(function(){
		var dom = $(this).parent().parent();
		var reason = $.trim(dom.find('input[name=gooutReason]').val());
		var gooutUserId = $.trim(dom.find('input[name=gooutUserId]').val());
		var gooutUserName = $.trim(dom.find('input[name=gooutUserName]').val());
		var starttime = $.trim(dom.find('input[name=gooutStartTime]').val());
		var endtime = $.trim(dom.find('input[name=gooutEndTime]').val());
		var examineUserId = $.trim(dom.find('input[name=examineUserId]').val());
		var examineUserName = $.trim(dom.find('input[name=examineUserName]').val());
		if(reason == null || reason == ''){
			windowControl("理由不能为空");
		}else if(starttime == null || starttime == ''){
			windowControl("起始时间不能为空");
		}else if(endtime == null || endtime == ''){
			windowControl("结束时间不能为空");
		}else if(examineUserId == null || examineUserId == ''){
			windowControl("审核人id不能为空");
		}else if(examineUserName == null || examineUserName == ''){
			windowControl("审核人姓名不能为空");
		}else if(gooutUserId == null || gooutUserId == ''){
			windowControl("外出人id不能为空");
		}else if(gooutUserName == null || gooutUserName == ''){
			windowControl("外出人姓名不能为空");
		}else{
			$.ajax({
				data:{
					reason:reason,
					goOutUserId:gooutUserId,
					goOutUserName:gooutUserName,
					startTimeStr:starttime,
					endTimeStr:endtime,
					examineUserId:examineUserId,
					examineUserName:examineUserName
				},
				url:"../../goout/applyForGoOut.do?getMs="+getMS(),
				success:function(data){
					if(data != 200){
						windowControl('添加员工外出申请失败');
						return ;
					}
					$('#goout .popups .saveleaveinformation .confirm').removeAttr('clicked');
					$('#goout .popup').css('display', 'none');
					$('#goout .popup input').not(".button").val(null);
					$('#goout .popup textarea').val(null);
					$('#gooutdg').datagrid('reload');
					windowControl('添加员工外出申请成功');
				},
				fail:function(){
					windowControl(err.status);
				}
			})
		}
	})
});
function lookgoout(id){
	$('#goout .list').css('display','none');
	$('#goout .flow').css('display','block');
	$.ajax({
		data:{goOutApplyId:id},
		url:'../../goout/findStream.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			var html = '';
			for(var i = 0; i<obj.length ; i++){
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
			$('#goout .flow .showView').html(html);
		}
	})
	
	$.ajax({
		data:{goOutApplyId:id},
		url:'../../goout/findApplyByCondition.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			$('#goout .flow .flowplan .createUserName').val(obj[0].goOutUserName);
			$('#goout .flow .flowplan .createTimeStr').val(obj[0].createTimeStr);
			if(obj[0].examineStatus == 1)
				$('#goout .flow .flowplan .inviteStatus').val('审批中');
			else if(obj[0].examineStatus == 2)
				$('#goout .flow .flowplan .inviteStatus').val('撤回');
			else if(obj[0].examineStatus == 3)
				$('#goout .flow .flowplan .inviteStatus').val('招聘中');
			else if(obj[0].examineStatus == 4)
				$('#goout .flow .flowplan .inviteStatus').val('驳回');
			else if(obj[0].examineStatus == 5)
				$('#goout .flow .flowplan .inviteStatus').val('招满');
			$('#goout .flow .flowplan .text').html(obj[0].text);
			$('#goout .flow .flowplan .reason').html(obj[0].reason);
		},
		error:function(err){
			windowControl(err.status);
		}
	})
}
/*********如果点击了返回按钮，则返回到列表********/
$('#goout .flow .flowbar .back').click(function(){
	$('#goout .list').css('display','block');
	$('#goout .flow').css('display','none');
});
/*************************当前外出申请人********************************/
function getDocumentMaker(){
	$.ajax({
		url:'../../user/getUserInfo.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var str = '';
			var data = eval('(' + data + ')');
			$('#goout .popups .saveleaveinformation input[name=gooutUserName]').val(data.userName);
			$('#goout .popups .saveleaveinformation input[name=gooutUserId]').val(data.userId);
		},
		error:function(error){
			windowControl(error.status);
		}
	});
}