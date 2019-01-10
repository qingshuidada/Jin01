$(function(){
	
	//产生数据网格
	$('#welfareAdddg').datagrid({
	  // url:'../../userInfo/selectUserInfo.do?getMs='+getMS(),
	   rownumbers:"true",
	   singleSelect:true,
	   pagination:true,
	   toolbar:"#welfareAdd .invitetop",
	   method:"post",
	   fit: true, 
	   queryParams:{
		   inviteFlag:'1'
	   },
	   columns:[[
		   {field:"userAccount",title:"员工编号",fitColumns:true,sortable:true,align:"center",sortable:true,width:100},
	       {field:"userName",title:"员工名字",fitColumns:true,sortable:true,align:"center",sortable:true,width:100 },
	       {field:"idCard",title:"身份证号码",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"sex",title:"性别",fitColumns:true,resizable:true,align:"center",width:50,sortable:true,formatter:function(value,row,index){
	    	   var sex = row.sex;
	    	   if(sex == 1){
	    		   return '男';
	    	   }else{
	    		   return '女';
	    	   }
	       }},
	       {field:"birthdayStr",title:"出生日期",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"education",title:"学历",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
	    	   var education = row.education;
	    	   return getValueFromKey("education",education);
	       }},
	       {field:"workTimeStr",title:"入职时间",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:status},
	       {field:"departmentName",title:"所属部门",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"postName",title:"所属岗位",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"invite_flag",title:"在职状态",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
	    	   var inviteFlag = row.inviteFlag;
	    	   return getValueFromKey("invite_flag",inviteFlag);
	       }},
	       {field:"political_Status",title:"政治面貌",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
	    	   var politicalStatus = row.politicalStatus;
	    	   return getValueFromKey("political_status",politicalStatus);
	       }},
	       {field:"retire_flag",title:"退休状态",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
	    	   var retireFlag = row.retireFlag;
	    	   return getValueFromKey("retire_flag",retireFlag);
	       }},
	       {field:"phoneNum",title:"联系方式",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"accidentPhoneNum",title:"紧急联系方式",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"address",title:"地址",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:status},
	   ]],
	})
	//查询
	$('#welfareAdd .invitetop .selectUserInfo').click(function(){
		welfareAdvancedQuery();
	});
	//选择部门
	$('#welfareAdd .invitetop .departmentChooseObj').click(function(){
		welfareChooseDept();
	});
	$('#welfareAdd .advancedQuery .popuparea input[name=chooseDepartment]').click(function(){
		welfareChooseDept();
	});
	//选择岗位
	$('#welfareAdd .invitetop .postChooseObj').click(function(){
		welfareChoosePost();
	});
	$('#welfareAdd .advancedQuery .popuparea input[name=choosePost]').click(function(){
		welfareChoosePost();
	});
	/*//选择上级
	$('#welfareAdd .advancedQuery .popuparea input[name=chooseLead]').click(function(){
		chooseUser();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUsers = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#welfareAdd .advancedQuery .popuparea input[name=leadName]').val(selectUsers[0].userName);
	    	$('#welfareAdd .advancedQuery .popuparea input[name=leadId]').val(selectUsers[0].userId);
	    	$('#chooseUser .confirm').unbind();
	    });
	});*/
	//调用人员的接口
	$("#welfareAdd .initiateWelfare .popuparea .examBtn").click(function(){
		chooseUser();
		$('#chooseUser .confirm').one('click',function(){
			$('#chooseUser').css('display','none');	
			selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
			$('#welfareAdd .initiateWelfare .popuparea input[name=examineUserName]').val(selectUser[0].userName);
			$('#welfareAdd .initiateWelfare .popuparea input[name=examineUserName]').attr('examId',selectUser[0].userId);
		});
	});
	$('#welfareAdd .advancedQuery .clean').click(function(){
		$('#welfareAdd .advancedQuery .popuparea input[type=text]').val('');
		$('#welfareAdd .advancedQuery .popuparea select').val('');
		$('#welfareAdd .invitetop input[name=postName]').val('');
		$('#welfareAdd .invitetop input[name=departmentName]').val('');
	});
	/*------------------高级查询-------------------*/
	$('#welfareAdd .invitetop .advancedQueryBtn').click(function(){
		$('#welfareAdd .advancedQuery').css('display','block');
	});
	$('#welfareAdd .advancedQuery .confirm').click(function(){
		welfareAdvancedQuery();
		$('#welfareAdd .advancedQuery').css('display','none');
	})
	/*---------------添加福利信息按钮---------------*/
	$('#welfareAdd .maintop .add').click(function(){
		$('#welfareAdd .initiateWelfare').css('display','block');
		$('#welfareAdd .initiateWelfare .popuparea input[name=population]').val($('#welfareAdd input[name=populationo]').val());
		
	});
	/*---------------取消高级查询------------------*/
	$('#welfareAdd .cannell').click(function(){
		$(this).parents(".popup").css('display','none');
	})
	/*-----------------添加福利信息---------------*/
	$('#welfareAdd .initiateWelfare .confirm').click(function(){
		var welfareName = $.trim($('#welfareAdd .initiateWelfare input[name=welfarename]').val());
		var welfareText = $.trim($('#welfareAdd .initiateWelfare textarea[name=welfaretext]').val());
		var reason = $.trim($('#welfareAdd .initiateWelfare textarea[name=welfarereason]').val());
		var givetime = $.trim($('#welfareAdd .initiateWelfare input[name=givetime]').val());
		var budgetAmount = $.trim($('#welfareAdd .initiateWelfare input[name=budgetAmount]').val());
		var population = $.trim($('#welfareAdd .initiateWelfare input[name=population]').val());
		var n = Number(budgetAmount);
		var m = Number(population);
		if(welfareName==''||welfareName==null){
			windowControl("福利名字不能为空");
			return;
		}else if(welfareText==''||welfareText==null){
			windowControl("福利内容不能为空");
			return;
		}else if(givetime==''||givetime==null){
			windowControl("发放时间不能为空");
			return;
		}/*else if(budgetAmount == ''||budgetAmount == null){
			windowControl("福利金额不能为空");
			return;
		}*/else if(isNaN(n)){
			windowControl("请输入正确的福利金额");
			return;
		}else if(isNaN(m)||(!isNaN(m)&&population.indexOf('.') != -1)){
			windowControl("请输入正确的福利金额");
			return;
		}/*else if(population == ''||population == null){
			windowControl("发放人数不能为空");
			return;
		}*/else{
			var info = {
				budgetAmount:budgetAmount,	
				population:population,	
				welfareName:welfareName,
				text:welfareText,
				reason:reason,
				giveTimeStr:givetime,
				userName:$('#welfareAdd .advancedQuery .popuparea input[name=peopleName]').val(),
				idCard:$('#welfareAdd .advancedQuery .popuparea input[name=idCard]').val(),
				sex:$('#welfareAdd .advancedQuery .popuparea select[name=sex]').val(),
				volk:$('#welfareAdd .advancedQuery .popuparea select[name=volk]').val(),
				education:$('#welfareAdd .advancedQuery .popuparea select[name=education]').val(),
				address:$('#welfareAdd .advancedQuery .popuparea input[name=address]').val(),
				marriageFlag:$('#welfareAdd .advancedQuery .popuparea select[name=marriageFlag]').val(),
				nativePlace:$('#welfareAdd .advancedQuery .popuparea input[name=nativePlace]').val(),
				politicalStatus:$('#welfareAdd .advancedQuery .popuparea select[name=politicalStatus]').val(),
				userAccount:$('#welfareAdd .advancedQuery .popuparea input[name=userAccount]').val(),
				workTimeStartStr:$('#welfareAdd .advancedQuery .popuparea input[name=workTimeStartStr]').val(),
				workTimeEndStr:$('#welfareAdd .advancedQuery .popuparea input[name=workTimeEndStr]').val(),
				departmentName:$('#welfareAdd .advancedQuery .popuparea input[name=departmentName]').val(),
				departmentUrl:$('#welfareAdd .advancedQuery .popuparea input[name=departmentUrl]').val(),
				postName:$('#welfareAdd .advancedQuery .popuparea input[name=postName]').val(),
				postId:$('#welfareAdd .advancedQuery .popuparea input[name=postId]').val(),
				leaderFlag:$('#welfareAdd .advancedQuery .popuparea select[name=leaderFlag]').val(),
				wageAccount:$('#welfareAdd .advancedQuery .popuparea input[name=wageAccount]').val(),
				englishLevel:$('#welfareAdd .advancedQuery .popuparea input[name=englishLevel]').val(),
				dormFlag:$('#welfareAdd .advancedQuery .popuparea select[name=dormFlag]').val(),
				dorm:$('#welfareAdd .advancedQuery .popuparea input[name=dorm]').val(),
			};
			$.ajax({
				data :info,
				url : '../../welfare/addWelfareApply.do?getMs='+getMS(),
				type : 'post',
				success : function(data) {
					if(data == 200){
						windowControl("保存成功");
						$('#welfareAdd .initiateWelfare').css('display', 'none');
						$('#welfareAdd .initiateWelfare .popuparea input').not('.button').val(null);
						$('#welfareAdd .initiateWelfare .popuparea textarea').val(null);
					}else{
						windowControl("保存失败");
					}
				},
				error : function(err) {
					windowControl('服务器异常');
				}
			})
		}
	});
	$('#welfareAdd .advancedQuery .btnarea .close').click(function(){
		$('#welfareAdd .advancedQuery').css('display','none');
	});
	$('#welfareAdd .advancedQuery .turnoffo').click(function(){
		$('#welfareAdd .advancedQuery').css('display','none');
	});
	
	
});
/**************民族****************/
$('#welfareAdd .advancedQuery select[name=volk]').append(getDataBySelectKeyNo("volk"));
/*********************学历**********************/
$('#welfareAdd .advancedQuery select[name=education]').append(getDataBySelectKeyNo("education"));
/*******************婚姻状态**************************/
$('#welfareAdd .advancedQuery select[name=marriageFlag]').append(getDataBySelectKeyNo("marriage_flag"));
/*******************政治面貌**************************/
$('#welfareAdd .advancedQuery select[name=politicalStatus]').append(getDataBySelectKeyNo("political_status"));
/*******************员工类型**************************/
$('#welfareAdd .advancedQuery select[name=leaderFlag]').append(getDataBySelectKeyNo("leader_flag"));
/*******************在职状态**************************/
$('#welfareAdd .advancedQuery select[name=inviteFlag]').append(getDataBySelectKeyNo("invite_flag"));
/*-------------高级查询函数----------------------*/
function welfareAdvancedQuery(){
	var userName = $('#welfareAdd .advancedQuery .popuparea input[name=peopleName]').val();
	var idCard = $('#welfareAdd .advancedQuery .popuparea input[name=idCard]').val();
	var sex = $('#welfareAdd .advancedQuery .popuparea select[name=sex]').val();
	var volk = $('#welfareAdd .advancedQuery .popuparea select[name=volk]').val();
	var education = $('#welfareAdd .advancedQuery .popuparea select[name=education]').val();
	var address = $('#welfareAdd .advancedQuery .popuparea input[name=address]').val();
	var marriageFlag = $('#welfareAdd .advancedQuery .popuparea select[name=marriageFlag]').val();
	var nativePlace = $('#welfareAdd .advancedQuery .popuparea input[name=nativePlace]').val();
	var politicalStatus = $('#welfareAdd .advancedQuery .popuparea select[name=politicalStatus]').val();
	//var phoneNum = $('#welfareAdd .advancedQuery .popuparea input[name=phoneNum]').val();
	var userAccount = $('#welfareAdd .advancedQuery .popuparea input[name=userAccount]').val();
	//var accidentPhoneNum = $('#welfareAdd .advancedQuery .popuparea input[name=accidentPhoneNum]').val();
	var workTimeStartStr = $('#welfareAdd .advancedQuery .popuparea input[name=workTimeStartStr]').val();
	var workTimeEndStr = $('#welfareAdd .advancedQuery .popuparea input[name=workTimeEndStr]').val();
	var departmentName = $('#welfareAdd .advancedQuery .popuparea input[name=departmentName]').val();
	var departmentUrl = $('#welfareAdd .advancedQuery .popuparea input[name=departmentUrl]').val();
	var postName = $('#welfareAdd .advancedQuery .popuparea input[name=postName]').val();
	var postId = $('#welfareAdd .advancedQuery .popuparea input[name=postId]').val();
	//var leadName = $('#welfareAdd .advancedQuery .popuparea input[name=leadName]').val();
	//var leadId = $('#welfareAdd .advancedQuery .popuparea input[name=leadId]').val();
	var leaderFlag = $('#welfareAdd .advancedQuery .popuparea select[name=leaderFlag]').val();
	var wageAccount = $('#welfareAdd .advancedQuery .popuparea input[name=wageAccount]').val();
	var englishLevel = $('#welfareAdd .advancedQuery .popuparea input[name=englishLevel]').val();
	var dormFlag = $('#welfareAdd .advancedQuery .popuparea select[name=dormFlag]').val();
	$('#welfareAdddg').datagrid({
		 url:'../../userInfo/selectUserInfo.do?getMs='+getMS(),
		 queryParams:{
			inviteFlag:'1',
			userName:userName,
			idCard:idCard,
			sex:sex,
			volk:volk,
			education:education,
			address:address,
			marriageFlag:marriageFlag,
			nativePlace:nativePlace,
			politicalStatus:politicalStatus,
			//phoneNum:phoneNum,
			userAccount:userAccount,
			//accidentPhoneNum:accidentPhoneNum,
			workTimeStartStr:workTimeStartStr,
			workTimeEndStr:workTimeEndStr,
			departmentName:departmentName,
			departmentUrl:departmentUrl,
			postName:postName,
			postId:postId,
			//leadName:leadName,
			//leadId:leadId,
			leaderFlag:leaderFlag,
			wageAccount:wageAccount,
			englishLevel:englishLevel,
			dormFlag:dormFlag
		},
		onLoadSuccess:function(data){
			$('#welfareAdd .initiateWelfare .popuparea input[name=population]').val(data.total);
			$('#welfareAdd input[name=populationo]').val(data.total);
		}
	});
	
}
/*------选择部门-----*/
function welfareChooseDept(){
	chooseDept();
	$('#chooseDept .confirm').click(function(){
	     $('#chooseDept').css('display','none');
	     var chooseDept = $('#chooseDept .dept').tree('getSelected');
	     $('#welfareAdd .invitetop input[name=departmentName]').val(chooseDept.text);
	     $('#welfareAdd .advancedQuery .popuparea input[name=departmentName]').val(chooseDept.text);
	     $('#welfareAdd .advancedQuery .popuparea input[name=departmentUrl]').val(chooseDept.id);
	     //$('#welfareAdd .invitetop input[name=departmentUrl]').attr("departmentText",chooseDept.text);
	     $('#chooseDept .confirm').unbind();
	});
}
function welfareChoosePost(){
	choosePost();
	$('#choosePost .confirm').click(function(){
    	$('#choosePost').css('display','none');
    	var selectPost = $('#choosePost .popuparea .post').datagrid('getSelections');
    	var postNames = '';
    	var postIds = '';
    	for(var i = 0 ; i<selectPost.length ; i++ ){
    		postNames = postNames  + selectPost[i].postName + ',';
    		postIds = postIds + selectPost[i].postId + ',';
    	}
    	postNames = postNames.substring(0, postNames.length - 1);
    	postIds = postIds.substring(0, postIds.length - 1);
    	$('#welfareAdd .invitetop input[name=postName]').val(postNames);
    	//$('#welfareAdd .invitetop input[name=postId]').val(postIds);
    	//$('#welfareAdd .invitetop input[name=postId]').attr("postNames",postNames);
    	$('#welfareAdd .advancedQuery .popuparea input[name=postName]').val(postNames);
	    $('#welfareAdd .advancedQuery .popuparea input[name=postId]').val(postIds);
    	$('#choosePost .confirm').unbind();
    })
}