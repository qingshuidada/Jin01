$(function(){
	/**/
	$('#inviterecords .staffRecord').css('height',$('#inviterecords .main').height()-28+'px');
	
	/*********开启页面时，添加选择部门与岗位的点击事件*********/
	//选择部门
	$('#inviterecords .staffRecord .basicInformation .chooseDept').click(function(){
		chooseDept();
	    $('#chooseDept .confirm').click(function(){
	    	$('#chooseDept').css('display','none');
	    	var chooseDept = $('#chooseDept .dept').tree('getSelected');
	    	$('#inviterecords .staffRecord .basicInformation input[name=departmentName]').val(chooseDept.text);
	    	$('#inviterecords .staffRecord .basicInformation input[name=departmentUrl]').val(chooseDept.id);
	    	$('#chooseDept .confirm').unbind();
	    })
	});
	//选择岗位
	$('#inviterecords .staffRecord .basicInformation .choosePost').click(function(){
		choosePost();
		$('#choosePost .confirm').click(function(){
	    	$('#choosePost').css('display','none');
	    	var selectPost = $('#choosePost .popuparea .post').datagrid('getSelections');
	    	$('#inviterecords .staffRecord .basicInformation input[name=postName]').val(selectPost[0].postName);
	    	$('#inviterecords .staffRecord .basicInformation input[name=postId]').val(selectPost[0].postId);
	    	$('#choosePost .confirm').unbind();
	    })
	});
	//选择上级
	$('#inviterecords .staffRecord .basicInformation .chooseUser').click(function(){
		chooseUser();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUsers = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#inviterecords .staffRecord .basicInformation input[name=leadName]').val(selectUsers[0].userName);
	    	$('#inviterecords .staffRecord .basicInformation input[name=leadId]').val(selectUsers[0].userId);
	    	$('#chooseUser .confirm').unbind();
	    });
	});
	
	/***********动态设置身份证以及一寸照img的margin-left使其规范显示************/
	console.log($('#inviterecords .staffRecord .user-message img').parent().width());
	$('#inviterecords .staffRecord .user-message img').css('margin-left', 
			 205 - $('#inviterecords .staffRecord .user-message img').parent().width());
	
	$('#inviterecordsdg').datagrid({
	  // url:'../../userInfo/selectUserInfo.do?getMs='+getMS(),
	   rownumbers:"true",
	   singleSelect:true,
	   pagination:true,
	   toolbar:"#inviterecords .invitetop",
	   method:"post",
	   fit: true,
	   columns:[[
	       {field:"userName",title:"员工名字",fitColumns:true,sortable:true,align:"center",sortable:true,width:100 },
	       {field:"userAccount",title:"个人账户",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"departmentName",title:"部门",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"postName",title:"岗位",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"phoneNum",title:"电话号码",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"accidentPhoneNum",title:"紧急联系方式",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"birthdayStr",title:"出生日期",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"idCard",title:"身份证号码",fitColumns:true,resizable:true,align:"center",sortable:true},
	       {field:"sex",title:"性别",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
	    	   var sex = row.sex;
	    	   if(sex == 1){
	    		   return '男';
	    	   }else{
	    		   return '女';
	    	   }
	       }},
	       {field:"invite_flag",title:"在职状态",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
	    	   var inviteFlag = row.inviteFlag;
	    	   return getValueFromKey("invite_flag",row.inviteFlag);
	       }},
	       {field:"retire_flag",title:"退休状态",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
	    	   return getValueFromKey("retire_flag",row.retireFlag);
	       }},
	       {field:"workTimeStr",title:"入职时间",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:status},
	       {field:"address",title:"地址",fitColumns:true,resizable:true,align:"center",sortable:true,formatter:status},
	       {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
	    	   var id = "'"+row.userId+"'";
	    	   var userAccount = "'"+row.userAccount+"'";
	    	   var name = "'"+row.userName+"'";
	    	   var opera = '';
	    	   if(existPermission('admin:personnel:inviteManage:inviterecords:update'))
		    		opera +='<span class="small-button edit" title="修改" onclick="updateInviteRecord('+id+')"></span>';
	    	   if(existPermission('admin:personnel:inviteManage:inviterecords:select'))
	    		   opera +='<span class="small-button look" title="查看" onclick="lookInviteRecord('+id+')"></span>';
	    	   if(existPermission('admin:personnel:inviteManage:inviterecords:delete'))
	    		   opera +='<span class="small-button delete" title="删除" onclick="deleteInviteRecord('+id+')"></span>';
	    	   if(existPermission('admin:personnel:inviteManage:inviterecords:manage'))
	    		   opera +='<span class="small-button hire" title="录用" onclick="inviterecordsOffer('+id+","+name+","+userAccount+')"></span>';
	    	   return opera;
	       }},
	   ]],
	  
	})
	
	/*******清空按钮清空事件******/
	cleanQuery($('#inviterecordsdg .invitetop .clean-query'));
	
	/*****返回列表点击事件*****/
	$('#inviterecords .staffRecord .back').click(function(){
		$('#inviterecords .staffRecord').css('display','none');
		$('#inviterecords .main').css('display','block');
		$('#inviterecords .staffRecord .train .display-train').html('');
		$('#inviterecords .staffRecord .work .display-work').html('');
		$('#inviterecords .staffRecord .edu .display-edu').html('');
	});
	
	$('#inviterecords .invitetop .selectUserInfo').click(function(){
		$('#inviterecordsdg').datagrid({
			url:'../../userInfo/selectUserInfo.do?getMs='+getMS(),
			 queryParams: {
					userName: function(){
						return $('#inviterecords .invitetop input[name=peopleName]').val();
					},
					idCard: function(){
						return $('#inviterecords .invitetop input[name=idCard]').val();
					},
					inviteFlag: '0'
				}
		});
	});
	
	/**************volk****************/
	$('#inviterecords .staffRecord select[name=volk]').html(getDataBySelectKey("volk"));
	/**************education****************/
	$('#inviterecords .staffRecord select[name=education]').html(getDataBySelectKey("education"));
	/**************marriageFlag****************/
	$('#inviterecords .staffRecord select[name=marriageFlag]').html(getDataBySelectKey("marriage_flag"));
	/**************politicalStatus****************/
	$('#inviterecords .staffRecord select[name=politicalStatus]').html(getDataBySelectKey("political_status"));
	/**************leaderFlag****************/
	$('#inviterecords .staffRecord select[name=leaderFlag]').html(getDataBySelectKey("leader_flag"));
});
/*---------删除招聘记录----------*/
function deleteInviteRecord(id){
	ui.confirm('确定要删除招聘记录？',function(z){
		if(z){
			$.ajax({
				data:{
					userId:id,
					aliveFlag:'0'
				},
				url:'../../userInfo/updateUserInfo.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == '200'){
						$("#inviterecords #inviterecordsdg").datagrid("reload");
						windowControl("删除成功");
					}else{
						windowControl("删除失败");
					}
				},
				error:function(err){
					windowControl("访问服务器出错");
				}
			});
		}
	},false);
}

//录用员工
function inviterecordsOffer(userId, userName, userAccount){
	ui.confirm('确定要录用该员工？',function(z){
		if(z){
			$('#inviterecords .popups .inviterecordsOffer').css('display','block');
			var dom = $('#inviterecords .popups .inviterecordsOffer');
			dom.find('input[name=userAccount]').val(userAccount);
			dom.find('input[name=userId]').val(userId);
			dom.find('input[name=peopleName]').val(userName);
			dom.find('.chooseUser').click(function(){
				chooseUser();
			    $('#chooseUser .confirm').click(function(){
			    	$('#chooseUser').css('display','none');
			    	selectUsers = $('#chooseUser .popuparea .user').datagrid('getSelections');
			    	dom.find('input[name=leadName]').val(selectUsers[0].userName);
			    	dom.find('input[name=leadId]').val(selectUsers[0].userId);
			    	$('#chooseUser .confirm').unbind();
			    });
			});
		}
	},false);
	
}

/**************录用员工点击事件******************/
$('#inviterecords .popups .inviterecordsOffer .save').click(function(){
	var dom = $('#inviterecords .popups .inviterecordsOffer');
	var userId = dom.find('input[name=userId]').val();
	var leadId = dom.find('input[name=leadId]').val();
	var leadName = dom.find('input[name=leadName]').val();
	var dorm = dom.find('input[name=dorm]').val();
	var dormFlag = dom.find('select[name=dormFlag]').val();
	var userAccount = dom.find('input[name=userAccount]').val();
	var testFlag = dom.find('select[name=testFlag]').val();
	if(testFlag == '是'){
		testFlag = '4';
	}else{
		testFlag = '1';
	}
	$.ajax({
		data:{
			userId:userId,
			leadName:leadName,
			leadId:leadId,
			inviteFlag:testFlag,
			userAccount:userAccount,
			dorm:dorm,
			dormFlag:dormFlag
		},
		url:'../../userInfo/updateUserInfo.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			$("#inviterecords .popups .inviterecordsOffer").css('display','none');
			if(data == '200'){
				$("#inviterecords #inviterecordsdg").datagrid("reload");
				windowControl("录用成功");
			}else{
				windowControl("录用失败");
			}
		},
		error:function(err){
			windowControl("访问服务器出错");
		}
	})	
});

//==============================修改员工档案页面=============================
function updateInviteRecord(id){
	//设定该页面的userID
	$('#inviterecords .staffRecord input[name=userId]').val(id);
	//关闭添加窗口
	$('#inviterecords .staffRecord .train .train-table').css('display','block');
	$('#inviterecords .staffRecord .work .work-table').css('display','block');
	$('#inviterecords .staffRecord .edu .edu-table').css('display','block');
	//关闭添加修改按钮
	$('#inviterecords .staffRecord .addexp').parent().css('display','block');
	$('#inviterecords .staffRecord .updateexp').parent().css('display','none');
	//锁定输入栏
	$('#inviterecords .staffRecord .userInfo input').removeAttr('readonly');
	$('#inviterecords .staffRecord .userInfo select').removeAttr('readonly');
	//切换显示的页面
	$('#inviterecords .staffRecord').css('display','block');
	$('#inviterecords .main').css('display','none');
	//填充数据
	inviterecordsSelectData(id,'update');
	inviterecordsAddUpdateEvent();
}

function lookInviteRecord(id){
	//设定该页面的userID
	$('#inviterecords .staffRecord input[name=userId]').val(id);
	//关闭添加窗口
	$('#inviterecords .staffRecord .train .train-table').css('display','none');
	$('#inviterecords .staffRecord .work .work-table').css('display','none');
	$('#inviterecords .staffRecord .edu .edu-table').css('display','none');
	//关闭添加修改按钮
	$('#inviterecords .staffRecord .addexp').parent().css('display','none');
	$('#inviterecords .staffRecord .updateexp').parent().css('display','none');
	//锁定输入栏
	$('#inviterecords .staffRecord .userInfo input').attr('readonly','readonly');
	$('#inviterecords .staffRecord .userInfo select').attr('readonly','readonly');
	//切换显示的页面
	$('#inviterecords .staffRecord').css('display','block');
	$('#inviterecords .main').css('display','none');
	//不显示所有的横线
	$('#inviterecords hr').css('display','none');
	//填充数据
	inviterecordsSelectData(id,'look');
}

/*******填充数据*******/
function inviterecordsSelectData(id, flag){
	/***获取基本信息****/
	$.ajax({
		url:'../../userInfo/selectUserInfo.do?getMs='+getMS(),
		data:{
			userId:id,
			inviteFlag:'0'
		},
		type:'post',
		success:function(data){
			$('#inviterecords hr').eq(0).css('display','block');
			var obj = eval('('+data+')').rows[0];
			$('#inviterecords .staffRecord .basicInformation input[name="userAccount"]').val(obj.userAccount);
			$('#inviterecords .staffRecord .basicInformation input[name="peopleName"]').val(obj.userName);
			$('#inviterecords .staffRecord .basicInformation input[name="phoneNum"]').val(obj.phoneNum);
			$('#inviterecords .staffRecord .basicInformation input[name="accidentPhoneNum"]').val(obj.accidentPhoneNum);
			$('#inviterecords .staffRecord .basicInformation input[name="birthday"]').val(obj.birthdayStr);
			$('#inviterecords .staffRecord .basicInformation input[name="idCard"]').val(obj.idCard);
			$('#inviterecords .staffRecord .basicInformation select[name="sex"]').val(obj.sex);
			$('#inviterecords .staffRecord .basicInformation input[name="workTime"]').val(obj.workTimeStr);
			$('#inviterecords .staffRecord .basicInformation input[name="address"]').val(obj.address);
			$('#inviterecords .staffRecord .basicInformation select[name="leaderFlag"]').val(obj.leaderFlag);
			$('#inviterecords .staffRecord .basicInformation select[name="education"]').val(obj.education);
			$('#inviterecords .staffRecord .basicInformation select[name="volk"]').val(obj.volk);
			$('#inviterecords .staffRecord .basicInformation select[name="marriageFlag"]').val(obj.marriageFlag);
			$('#inviterecords .staffRecord .basicInformation select[name="education"]').val(obj.education);
			$('#inviterecords .staffRecord .basicInformation select[name="politicalStatus"]').val(obj.politicalStatus);
			$('#inviterecords .staffRecord .basicInformation input[name="nativePlace"]').val(obj.nativePlace);
			$('#inviterecords .staffRecord .basicInformation input[name="departmentName"]').val(obj.departmentName);
			$('#inviterecords .staffRecord .basicInformation input[name="departmentUrl"]').val(obj.departmentUrl);
			$('#inviterecords .staffRecord .basicInformation input[name="postName"]').val(obj.postName);
			$('#inviterecords .staffRecord .basicInformation input[name="postId"]').val(obj.postId);
			//显示身份证的照片信息
			var url1 = obj.photo;
			var photo = '../../personnel/downLoadImage.do?url='+url1+'';
			$("#inviterecords .staffRecord .basicInformation .pic1").attr("src",photo);
			var url2 = obj.idCardUpImg;
			var idCardUpImg = '../../personnel/downLoadImage.do?url='+url2+'';
			$("#inviterecords .staffRecord .basicInformation .pic2").attr("src",idCardUpImg);
			var url3 = obj.idCardDownImg;
			var idCardDownImg = '../../personnel/downLoadImage.do?url='+url3+'';
			$("#inviterecords .staffRecord .basicInformation .pic3").attr("src",idCardDownImg);
			$('#inviterecords .staffRecord .basicInformation input[name="dorm"]').val(obj.dorm);
			$('#inviterecords .staffRecord .basicInformation select[name="dormFlag"]').val(obj.dormFlag);

			
			
		}
	});
	/**
	 * 获取上级领导信息
	 */
	$.ajax({
		url:'../../lead/getLeader.do?getMs='+getMS(),
		data:{
			userId:id
		},
		type:'post',
		success:function(data){
			var obj = eval('('+data+')');
			$('#inviterecords .staffRecord .basicInformation input[name="leadName"]').val(obj.userName);
			$('#inviterecords .staffRecord .basicInformation input[name="leadId"]').val(obj.userId);
			
			
		}
	});
	
	/***获取工作信息****/
	$.ajax({
		url:'../../userInfo/selectWork.do?getMs='+getMS(),
		data:{
			userId:id
		},
		type:'post',
		success:function(data){
			var obj = eval('('+data+')').rows;
			if(flag == 'look' && obj.length == 0){
				$('#inviterecords .staffRecord .work').css('display','none');
			}else{
				$('#inviterecords hr').eq(1).css('display','block');
				$('#inviterecords .staffRecord .work').css('display','block');
			}
			for(var i = 0;i<obj.length;i++){
				var html = '<table>'
					+'<tr><td width="240px"></td><td width="800px"></td><td width="800px"></td><td width="800px"></td></tr>'
					+'<tr height="40px"><td colspan="1" style="text-align: right;">公司名称：</td><td colspan="2">'+obj[i].componyName+'</td>'
					+'<td style="text-align:right"><input style="display:none"/>'
					if(flag == 'update'){
						html = html + '<label>修改<span class="small-button edit"></span></label><label>删除<span class="small-button delete"></span></label>';
					}
					html = html + '</td></tr>'
					+'<tr height="40px"><td style="text-align: right;">入职时间：</td><td>'+obj[i].startTimeStr+'</td><td style="text-align: right;">离职时间：</td><td>'+obj[i].endTimeStr+'</td></tr>'
					+'<tr height="40px"><td colspan="1" style="text-align: right;">岗位名称：</td><td colspan="3">'+obj[i].postName+'</td></tr>'
					+'<tr height="40px"><td colspan="1"  style="text-align: right;">岗位描述：</td>'
					+'<td colspan="3"><div style="width:100%">'+obj[i].workDescribe+'</div></td></tr>'
					+'</table>';
				if(i != obj.length-1){
					html = html + '<hr/>';
				}else if(flag == 'update'){
					html = html + '<hr/>';
				}
				$('#inviterecords .staffRecord .work .display-work').append(html);
				$('#inviterecords .staffRecord .work .display-work').find("table:last input").val(obj[i].workId);
			}
			inviterecordsAddWorkEvent();
		}
	});
	
	/***获取培训信息****/
	$.ajax({
		url:'../../userInfo/selectTrain.do?getMs='+getMS(),
		data:{
			userId:id
		},
		type:'post',
		success:function(data){
			var obj = eval('('+data+')').rows;
			if(flag == 'look' && obj.length == 0){
				$('#inviterecords .staffRecord .train').css('display','none');
			}else{
				$('#inviterecords hr').eq(2).css('display','block');
				$('#inviterecords .staffRecord .train').css('display','block');
			}
			for(var i = 0;i<obj.length;i++){
				//var endTimeStr = obj[i].endTimeStr.substring(0,obj[i].endTimeStr.lastIndexOf(" ")+1);
				var html = '<table>'
					+'<tr><td width="240px"></td><td width="800px"></td><td width="800px"></td><td width="800px"></td></tr>'
					+'<tr height="40px"><td colspan="1" style="text-align: right;">培训名称：</td><td colspan="3">'+obj[i].trainName+'</td></tr>'
					+'<tr height="40px"><td colspan="1" style="text-align: right;">公司名称：</td><td colspan="2">'+obj[i].trainCompany+'</td>'
					+'<td style="text-align:right"><input style="display:none"/>'
					if(flag == 'update'){
						html = html + '<label>修改<span class="small-button edit"></span></label><label>删除<span class="small-button delete"></span></label>';
					}
					html = html + '</td></tr>'
					+'<tr height="40px"><td style="text-align: right;">开始时间：</td><td>'+obj[i].startTimeStr+'</td><td style="text-align: right;">结束时间：</td><td>'+obj[i].endTimeStr+'</td></tr>'
					+'<tr height="40px"><td colspan="1"  style="text-align: right;">培训描述：</td>'
					+'<td colspan="3"><div style="width:100%">'+obj[i].trainDescribe+'</div></td></tr>'
					+'</table>';
				if(i != obj.length-1){
					html = html + '<hr/>';
				}else if(flag == 'update'){
					html = html + '<hr/>';
				}
				$('#inviterecords .staffRecord .train .display-train').append(html);
				$('#inviterecords .staffRecord .train .display-train').find("table:last input").val(obj[i].trainDocId);
			}
			inviterecordsAddTrainEvent();
		}
	});
	
	/***获取教育信息****/
	$.ajax({
		url:'../../userInfo/selectEdu.do?getMs='+getMS(),
		data:{
			userId:id
		},
		type:'post',
		success:function(data){
			var obj = eval('('+data+')').rows;
			if(flag == 'look' && obj.length == 0){
				$('#inviterecords .staffRecord .edu').css('display','none');
			}else{
				$('#inviterecords hr').eq(3).css('display','block');
				$('#inviterecords .staffRecord .edu').css('display','block');
			}
			for(var i = 0;i<obj.length;i++){
				var html = '<table>'
					+'<tr><td width="240px"></td><td width="800px"></td><td width="800px"></td><td width="800px"></td></tr>'
					+'<tr height="40px"><td colspan="1" style="text-align: right;">学校名称：</td><td colspan="2">'+obj[i].schoolName+'</td>'
					+'<td style="text-align:right"><input style="display:none"/>'
					if(flag == 'update'){
						html = html + '<label>修改<span class="small-button edit"></span></label><label>删除<span class="small-button delete"></span></label>';
					}
					html = html + '</td></tr>'
					+'<tr height="40px"><td style="text-align: right;">入学时间：</td><td>'+obj[i].startTimeStr+'</td><td style="text-align: right;">毕业时间：</td><td>'+obj[i].endTimeStr+'</td></tr>'
					+'<tr height="40px"><td colspan="1" style="text-align: right;">专业名称：</td><td colspan="3">'+obj[i].specialty+'</td></tr>'
					+'</table>';
				if(i != obj.length-1){
					html = html + '<hr/>';
				}else if(flag == 'update'){
					html = html + '<hr/>';
				}
				$('#inviterecords .staffRecord .edu .display-edu').append(html);
				$('#inviterecords .staffRecord .edu .display-edu').find("table:last input").val(obj[i].educationId);
			}
			inviterecordsAddEduEvent();
		}
	});
}


function inviterecordsAddUpdateEvent(){
	//====================================修改信息页面中的各种点击事件================================================
	/********当用户点击保存基本信息时的点击事件*******/
	$('#inviterecords .staffRecord .expsame .updateMessage').click(function(){
		var userId = $('#inviterecords .staffRecord input[name=userId]').val();
		var userAccount = $('#inviterecords .staffRecord .basicInformation input[name="userAccount"]').val();
		var password = $('#inviterecords .staffRecord .basicInformation input[name="password"]').val();
		var userName = $('#inviterecords .staffRecord .basicInformation input[name="peopleName"]').val();
		var phoneNum = $('#inviterecords .staffRecord .basicInformation input[name="phoneNum"]').val();
		var accidentPhoneNum = $('#inviterecords .staffRecord .basicInformation input[name="accidentPhoneNum"]').val();
		var birthday = $('#inviterecords .staffRecord .basicInformation input[name="birthday"]').val();
		var idCard = $('#inviterecords .staffRecord .basicInformation input[name="idCard"]').val();
		var sex = $('#inviterecords .staffRecord .basicInformation select[name="sex"]').val();
		var workTime = $('#inviterecords .staffRecord .basicInformation input[name="workTime"]').val();
		var address = $('#inviterecords .staffRecord .basicInformation input[name="address"]').val();
		var leaderFlag = $('#inviterecords .staffRecord .basicInformation select[name="leaderFlag"]').val();
		var education = $('#inviterecords .staffRecord .basicInformation select[name="education"]').val();
		var volk = $('#inviterecords .staffRecord .basicInformation select[name="volk"]').val();
		var marriageFlag = $('#inviterecords .staffRecord .basicInformation select[name="marriageFlag"]').val();
		var leadName = $('#inviterecords .staffRecord .basicInformation input[name="leadName"]').val();
		var leadId = $('#inviterecords .staffRecord .basicInformation input[name="leadId"]').val();
		var postName = $('#inviterecords .staffRecord .basicInformation input[name="postName"]').val();
		var postId = $('#inviterecords .staffRecord .basicInformation input[name="postId"]').val();
		var departmentName = $('#inviterecords .staffRecord .basicInformation input[name="departmentName"]').val();
		var departmentUrl = $('#inviterecords .staffRecord .basicInformation input[name="departmentUrl"]').val();
		var politicalStatus = $('#inviterecords .staffRecord .basicInformation select[name="politicalStatus"]').val();
		var nativePlace = $('#inviterecords .staffRecord .basicInformation input[name="nativePlace"]').val();
		
		if(userName == null || userName ==''){
			windowControl('员工姓名不能为空');
			return ;
		}else if(idCard == null || !(idCard.length == 18 ||idCard.length == 15)){
			windowControl('请输入18位或15位身份证号');
			return ;
		}else if(birthday == null || birthday ==''){
			windowControl('出生日期不能为空');
			return ;
		}else if(education == null || education ==''){
			windowControl('学历不能为空');
			return ;
		}else if(address == null || address ==''){
			windowControl('家庭住址不能为空');
			return ;
		}else if(marriageFlag == null || marriageFlag == ''){
			windowControl('婚姻状态不能为空');
			return ;
		}else if(nativePlace == null || nativePlace == ''){
			windowControl('籍贯不能为空');
			return ;
		}else if(politicalStatus == null || politicalStatus == ''){
			windowControl('政治面貌不能为空');
			return ;
		}else if(phoneNum == null || phoneNum ==''){
			windowControl('联系方式不能为空');
			return ;
		}else if(phoneNum.length != '11'){
			windowControl('联系方式不等于11位');
			return ;
		}else if(accidentPhoneNum == null || accidentPhoneNum ==''){
			windowControl('紧急联系方式不能为空');
			return ;
		}else if(userAccount == null || userAccount ==''){
			windowControl('员工编号不能为空');
			return ;
		}else if(workTime == null || workTime ==''){
			windowControl('入职时间不能为空');
			return ;
		}else if(departmentUrl == null || departmentUrl ==''){
			windowControl('所属部门不能为空');
			return ;
		}else if(postId == null || postId ==''){
			windowControl('所属岗位不能为空');
			return ;
		}
		$.ajax({
			url:'../../userInfo/updateUserInfo.do?getMs='+getMS(),
			data:{
				userId:userId,
				userAccount:userAccount,
				userName:userName,
				departmentName:departmentName,
				departmentUrl:departmentUrl,
				postName:postName,
				postId:postId,
				leadName:leadName,
				leadId:leadId,
				phoneNum:phoneNum,
				accidentPhoneNum:accidentPhoneNum,
				birthdayStr:birthday,
				idCard:idCard,
				sex:sex,
				workTimeStr:workTime,
				address:address,
				leaderFlag:leaderFlag,
				education:education,
				volk:volk,
				inviteFlag:'0',
				retireFlag:'1',
				politicalStatus:politicalStatus,
				nativePlace:nativePlace,
				marriageFlag:marriageFlag
			},
			type:'post',
			success:function(data){
				if(data == 400){
					windowControl("修改招聘信息失败");
				}else if(data == 500){
					windowControl("修改招聘信息失败");
				}else{
					windowControl("修改招聘信息成功");
				}
			},
			error:function(data){
				windowControl("服务器未响应");
			}
		});
	});
	
	/******保存工作经历按钮点击事件，保存工作经历，并且显示出保存成功的工作经历******/
	$('#inviterecords .staffRecord .work .addexp').click(function(){
		var userId = $('#inviterecords .staffRecord input[name=userId]').val();
		var postName = $('#inviterecords .staffRecord .work input[name=postName]').val();
		var componyName = $('#inviterecords .staffRecord .work input[name=componyName]').val();
		var startTime = $('#inviterecords .staffRecord .work input[name=startTime]').val();
		var endTime = $('#inviterecords .staffRecord .work input[name=endTime]').val();
		var workDescribe = $('#inviterecords .staffRecord .work textarea[name=workDescribe]').val();
		if(postName == null || postName == ''){
			windowControl('岗位名称不能为空');
			return ;
		}else if(componyName == null || componyName == ''){
			windowControl('公司名称不能为空');
			return ;
		}else if(startTime == null || startTime == ''){
			windowControl('开始工作时间不能为空');
			return ;
		}else if(endTime == null || endTime == ''){
			windowControl('结束工作时间不能为空');
			return ;
		}else if(workDescribe == null || workDescribe == ''){
			windowControl('工作详情不能为空');
			return ;
		}
		if(userId == null || userId == ''){
			windowControl("请先保存员工基本信息");
			return ;
		}
		$.ajax({
			url:'../../userInfo/saveWork.do?getMs='+getMS(),
			type:'post',
			data:{
				userId:userId,
				postName:postName,
				componyName:componyName,
				startTimeStr:startTime,
				endTimeStr:endTime,
				workDescribe:workDescribe
			},
			success:function(data){
				if(data == 400){
					windowControl('工作经验添加失败');
				}else if(data == 500){
					windowControl('工作经验添加失败');
				}else{
					var html = '<table>'
						+'<tr><td width="240px"></td><td width="800px"></td><td width="800px"></td><td width="800px"></td></tr>'
						+'<tr height="40px"><td colspan="1" style="text-align: right;">公司名称：</td><td colspan="2">'+componyName+'</td>'
						+'<td style="text-align:right"><input style="display:none"/>'
						+'<label>修改<span class="small-button edit"></span></label><label>删除<span class="small-button delete"></span></label></td></tr>'
						+'<tr height="40px"><td style="text-align: right;">入职时间：</td><td>'+startTime+'</td><td style="text-align: right;">离职时间：</td><td>'+endTime+'</td></tr>'
						+'<tr height="40px"><td colspan="1" style="text-align: right;">岗位名称：</td><td colspan="3">'+postName+'</td></tr>'
						+'<tr height="40px"><td colspan="1"  style="text-align: right;">岗位描述：</td>'
						+'<td colspan="3"><div style="width:100%">'+workDescribe+'</div></td></tr>'
						+'</table><hr/>';
					$('#inviterecords .staffRecord .work .display-work').append(html);
					$('#inviterecords .staffRecord .work .work-table input').val(null);
					$('#inviterecords .staffRecord .work .work-table textarea').val(null);
					$('#inviterecords .staffRecord .work .display-work').find("table:last input").val(data);
					/************************修改点击事件***********************/
					$('#inviterecords .staffRecord .work .display-work table label .edit').click(function(){
						var id = $(this).parent().parent().find('input').val();
						var thisDom = $(this);
						$.ajax({
							url:'../../userInfo/selectWork.do?getMs='+getMS(),
							data:{
								workId:id
							},
							success:function(data){
								var obj = eval('('+data+')').rows[0];
								
								$('#inviterecords .staffRecord .work input[name=workId]').val(obj.workId);
								$('#inviterecords .staffRecord input[name=userId]').val(obj.userId);
								$('#inviterecords .staffRecord .work input[name=postName]').val(obj.postName);
								$('#inviterecords .staffRecord .work input[name=componyName]').val(obj.componyName);
								$('#inviterecords .staffRecord .work input[name=startTime]').val(obj.startTimeStr);
								$('#inviterecords .staffRecord .work input[name=endTime]').val(obj.endTimeStr);
								$('#inviterecords .staffRecord .work textarea[name=workDescribe]').val(obj.workDescribe);
								$('#inviterecords .staffRecord .work .addexp').parent().css('display','none');
								$('#inviterecords .staffRecord .work .updateexp').parent().css('display','block');
								thisDom.parents('table').next().remove();
								thisDom.parents('table').remove();
							}
						});
					});
					
					/************************删除工作 点击事件***********************/
					$('#inviterecords .staffRecord .work .display-work table label .delete').click(function(){
						var id = $(this).parent().parent().find('input').val();
						var thisDom = $(this);
						$.ajax({
							url:'../../userInfo/updateWork.do?getMs='+getMS(),
							type:'post',
							data:{
								workId:id,
								aliveFlag:'0'
							},
							success:function(data){
								if(data == 400 || data == 500){
									windowControl('删除工作信息失败');
									return ;
								}
								thisDom.parents('table').next().remove();
								thisDom.parents('table').remove();
							}
						});
					});
					
				}
			}
		});
	});
	
	/******修改工作经历按钮点击事件，修改工作经历，并且显示出保存成功的工作经历******/
	$('#inviterecords .staffRecord .work .updateexp').click(function(){
		var userId = $('#inviterecords .staffRecord input[name=userId]').val();
		var workId = $('#inviterecords .staffRecord input[name=workId]').val();
		var postName = $('#inviterecords .staffRecord .work input[name=postName]').val();
		var componyName = $('#inviterecords .staffRecord .work input[name=componyName]').val();
		var startTime = $('#inviterecords .staffRecord .work input[name=startTime]').val();
		var endTime = $('#inviterecords .staffRecord .work input[name=endTime]').val();
		var workDescribe = $('#inviterecords .staffRecord .work textarea[name=workDescribe]').val();
		if(postName == null || postName == ''){
			windowControl('岗位名称不能为空');
			return ;
		}else if(componyName == null || componyName == ''){
			windowControl('公司名称不能为空');
			return ;
		}else if(startTime == null || startTime == ''){
			windowControl('开始工作时间不能为空');
			return ;
		}else if(endTime == null || endTime == ''){
			windowControl('结束工作时间不能为空');
			return ;
		}else if(workDescribe == null || workDescribe == ''){
			windowControl('工作详情不能为空');
			return ;
		}
		if(userId == null || userId == ''){
			windowControl("请先保存员工基本信息");
			return ;
		}
		$.ajax({
			url:'../../userInfo/updateWork.do?getMs='+getMS(),
			data:{
				userId:userId,
				postName:postName,
				componyName:componyName,
				startTimeStr:startTime,
				endTimeStr:endTime,
				workDescribe:workDescribe,
				aliveFlag:1,
				workId:workId
			},
			type:'post',
			success:function(data){
				if(data == 400 || data == 500){
					windowControl('修改员工工作信息失败');
					return ;
				}
				var html = '<table>'
					+'<tr><td width="240px"></td><td width="800px"></td><td width="800px"></td><td width="800px"></td></tr>'
					+'<tr height="40px"><td colspan="1" style="text-align: right;">公司名称：</td><td colspan="2">'+componyName+'</td>'
					+'<td style="text-align:right"><input style="display:none"/>'
					+'<label>修改<span class="small-button edit"></span></label><label>删除<span class="small-button delete"></span></label></td></tr>'
					+'<tr height="40px"><td style="text-align: right;">入职时间：</td><td>'+startTime+'</td><td style="text-align: right;">离职时间：</td><td>'+endTime+'</td></tr>'
					+'<tr height="40px"><td colspan="1" style="text-align: right;">岗位名称：</td><td colspan="3">'+postName+'</td></tr>'
					+'<tr height="40px"><td colspan="1"  style="text-align: right;">岗位描述：</td>'
					+'<td colspan="3"><div style="width:100%">'+workDescribe+'</div></td></tr>'
					+'</table><hr/>';
				$('#inviterecords .staffRecord .work .display-work').append(html);
				$('#inviterecords .staffRecord .work .work-table input').val(null);
				$('#inviterecords .staffRecord .work .work-table textarea').val(null);
				$('#inviterecords .staffRecord .work .display-work').find("table:last input").val(workId);
				$('#inviterecords .staffRecord .work .addexp').parent().css('display','block');
				$('#inviterecords .staffRecord .work .updateexp').parent().css('display','none');
				
				/************************修改点击事件***********************/
				$('#inviterecords .staffRecord .work .display-work table label .edit').click(function(){
					var id = $(this).parent().parent().find('input').val();
					var thisDom = $(this);
					$.ajax({
						url:'../../userInfo/selectWork.do?getMs='+getMS(),
						data:{
							workId:id
						},
						success:function(data){
							if(data == 400 || data == 500){
								windowControl('修改信息失败');
								return ;
							}
							obj = eval('('+data+')').rows[0];
							$('#inviterecords .staffRecord .work input[name=workId]').val(obj.workId);
							$('#inviterecords .staffRecord input[name=userId]').val(obj.userId);
							$('#inviterecords .staffRecord .work input[name=postName]').val(obj.postName);
							$('#inviterecords .staffRecord .work input[name=componyName]').val(obj.componyName);
							$('#inviterecords .staffRecord .work input[name=startTime]').val(obj.startTimeStr);
							$('#inviterecords .staffRecord .work input[name=endTime]').val(obj.endTimeStr);
							$('#inviterecords .staffRecord .work textarea[name=workDescribe]').val(obj.workDescribe);
							$('#inviterecords .staffRecord .work .addexp').parent().css('display','none');
							$('#inviterecords .staffRecord .work .updateexp').parent().css('display','block');
							thisDom.parents('table').next().remove();
							thisDom.parents('table').remove();
						}
					});
				});
				
				/************************删除工作 点击事件***********************/
				$('#inviterecords .staffRecord .work .display-work table label .delete').click(function(){
					var id = $(this).parent().parent().find('input').val();
					var thisDom = $(this);
					$.ajax({
						url:'../../userInfo/updateWork.do?getMs='+getMS(),
						type:'post',
						data:{
							workId:id,
							aliveFlag:'0'
						},
						success:function(data){
							if(data == 400 || data == 500){
								windowControl('删除工作信息失败');
								return ;
							}
							thisDom.parents('table').next().remove();
							thisDom.parents('table').remove();
						}
					});
				});
			}
		})
	});
	
	/******保存培训经历按钮点击事件，保存培训经历，并且显示出保存成功的培训经历******/
	$('#inviterecords .staffRecord .train .addexp').click(function(){
		var userId = $('#inviterecords .staffRecord input[name=userId]').val();
		var trainName = $('#inviterecords .staffRecord .train input[name=trainName]').val();
		var trainCompany = $('#inviterecords .staffRecord .train input[name=trainCompany]').val();
		var startTime = $('#inviterecords .staffRecord .train input[name=startTime]').val();
		var endTime = $('#inviterecords .staffRecord .train input[name=endTime]').val();
		var trainDescribe = $('#inviterecords .staffRecord .train textarea[name=trainDescribe]').val();
		if(trainName == null || trainName == ''){
			windowControl('培训名称不能为空');
			return ;
		}else if(trainCompany == null || trainCompany == ''){
			windowControl('培训公司名称不能为空');
			return ;
		}else if(startTime == null || startTime == ''){
			windowControl('开始工作时间不能为空');
			return ;
		}else if(endTime == null || endTime == ''){
			windowControl('结束工作时间不能为空');
			return ;
		}else if(trainDescribe == null || trainDescribe == ''){
			windowControl('培训详情不能为空');
			return ;
		}
		$.ajax({
			url:'../../userInfo/saveTrain.do?getMs='+getMS(),
			type:'post',
			data:{
				userId:userId,
				trainName:trainName,
				trainCompany:trainCompany,
				startTimeStr:startTime,
				endTimeStr:endTime,
				trainDescribe:trainDescribe
			},
			success:function(data){
				if(data == 400 || data == 500){
					windowControl('修改信息失败');
					return ;
				}else{
					var html = '<table>'
						+'<tr><td width="240px"></td><td width="800px"></td><td width="800px"></td><td width="800px"></td></tr>'
						+'<tr height="40px"><td colspan="1" style="text-align: right;">培训名称：</td><td colspan="3">'+trainName+'</td></tr>'
						+'<tr height="40px"><td colspan="1" style="text-align: right;">公司名称：</td><td colspan="2">'+trainCompany+'</td>'
						+'<td style="text-align:right"><input style="display:none"/>'
						+'<label>修改<span class="small-button edit"></span></label><label>删除<span class="small-button delete"></span></label></td></tr>'
						+'<tr height="40px"><td style="text-align: right;">开始时间：</td><td>'+startTime+'</td><td style="text-align: right;">结束时间：</td><td>'+endTime+'</td></tr>'
						+'<tr height="40px"><td colspan="1"  style="text-align: right;">培训描述：</td>'
						+'<td colspan="3"><div style="width:100%">'+trainDescribe+'</div></td></tr>'
						+'</table><hr/>';
					$('#inviterecords .staffRecord .train .display-train').append(html);
					$('#inviterecords .staffRecord .train .train-table input').val(null);
					$('#inviterecords .staffRecord .train .train-table textarea').val(null);
					$('#inviterecords .staffRecord .train .display-train').find("table:last input").val(data);
					/************************修改点击事件***********************/
					$('#inviterecords .staffRecord .train .display-train table label .edit').click(function(){
						var id = $(this).parent().parent().find('input').val();
						var thisDom = $(this);
						$.ajax({
							url:'../../userInfo/selectTrain.do?getMs='+getMS(),
							data:{
								trainDocId:id
							},
							type:'post',
							success:function(data){
								var obj = eval('('+data+')').rows[0];
								$('#inviterecords .staffRecord .train input[name=trainId]').val(obj.trainDocId);
								$('#inviterecords .staffRecord input[name=userId]').val(obj.userId);
								$('#inviterecords .staffRecord .train input[name=trainName]').val(obj.trainName);
								$('#inviterecords .staffRecord .train input[name=trainCompany]').val(obj.trainCompany);
								$('#inviterecords .staffRecord .train input[name=startTime]').val(obj.startTimeStr);
								$('#inviterecords .staffRecord .train input[name=endTime]').val(obj.endTimeStr);
								$('#inviterecords .staffRecord .train textarea[name=trainDescribe]').val(obj.trainDescribe);
								$('#inviterecords .staffRecord .train .addexp').parent().css('display','none');
								$('#inviterecords .staffRecord .train .updateexp').parent().css('display','block');
								thisDom.parents('table').next().remove();
								thisDom.parents('table').remove();
							}
						})
					});
					
					/************************删除培训信息***********************/
					$('#inviterecords .staffRecord .train .display-train table label .delete').click(function(){
						var id = $(this).parent().parent().find('input').val();
						var thisDom = $(this);
						$.ajax({
							url:'../../userInfo/updateTrain.do?getMs='+getMS(),
							type:'post',
							data:{
								trainDocId:id,
								aliveFlag:'0'
							},
							success:function(data){
								if(data == 400 || data == 500){
									windowControl('删除培训信息失败');
									return ;
								}
								thisDom.parents('table').next().remove();
								thisDom.parents('table').remove();
							}
						});
					});
					
				}
			}
		});
	})
	
	/*******修改培训经历按钮点击事件，修改培训经历，并且显示出保存成功的培训经历*************/
	$('#inviterecords .staffRecord .train .updateexp').click(function(){
		var trainId = $('#inviterecords .staffRecord .train input[name=trainId]').val();
		var userId = $('#inviterecords .staffRecord input[name=userId]').val();
		var trainName = $('#inviterecords .staffRecord .train input[name=trainName]').val();
		var trainCompany = $('#inviterecords .staffRecord .train input[name=trainCompany]').val();
		var startTime = $('#inviterecords .staffRecord .train input[name=startTime]').val();
		var endTime = $('#inviterecords .staffRecord .train input[name=endTime]').val();
		var trainDescribe = $('#inviterecords .staffRecord .train textarea[name=trainDescribe]').val();
		if(trainName == null || trainName == ''){
			windowControl('培训名称不能为空');
			return ;
		}else if(trainCompany == null || trainCompany == ''){
			windowControl('培训公司名称不能为空');
			return ;
		}else if(startTime == null || startTime == ''){
			windowControl('开始工作时间不能为空');
			return ;
		}else if(endTime == null || endTime == ''){
			windowControl('结束工作时间不能为空');
			return ;
		}else if(trainDescribe == null || trainDescribe == ''){
			windowControl('培训详情不能为空');
			return ;
		}
		$.ajax({
			url:'../../userInfo/updateTrain.do?getMs='+getMS(),
			data:{
				trainDocId:trainId,
				userId:userId,
				trainName:trainName,
				trainCompany:trainCompany,
				startTimeStr:startTime,
				endTimeStr:endTime,
				trainDescribe:trainDescribe
			},
			success:function(data){
				if(data == 400 || data == 500){
					windowControl('修改信息失败');
					return ;
				}
				var html = '<table>'
					+'<tr><td width="240px"></td><td width="800px"></td><td width="800px"></td><td width="800px"></td></tr>'
					+'<tr height="40px"><td colspan="1" style="text-align: right;">培训名称：</td><td colspan="3">'+trainName+'</td></tr>'
					+'<tr height="40px"><td colspan="1" style="text-align: right;">公司名称：</td><td colspan="2">'+trainCompany+'</td>'
					+'<td style="text-align:right"><input style="display:none"/>'
					+'<label>修改<span class="small-button edit"></span></label><label>删除<span class="small-button delete"></span></label></td></tr>'
					+'<tr height="40px"><td style="text-align: right;">开始时间：</td><td>'+startTime+'</td><td style="text-align: right;">结束时间：</td><td>'+endTime+'</td></tr>'
					+'<tr height="40px"><td colspan="1"  style="text-align: right;">培训描述：</td>'
					+'<td colspan="3"><div style="width:100%">'+trainDescribe+'</div></td></tr>'
					+'</table><hr/>';
				$('#inviterecords .staffRecord .train .display-train').append(html);
				$('#inviterecords .staffRecord .train .train-table input').val(null);
				$('#inviterecords .staffRecord .train .train-table textarea').val(null);
				$('#inviterecords .staffRecord .train .display-train').find("table:last input").val(trainId);
				$('#inviterecords .staffRecord .train .addexp').parent().css('display','block');
				$('#inviterecords .staffRecord .train .updateexp').parent().css('display','none');
				/************************修改点击事件***********************/
				$('#inviterecords .staffRecord .train .display-train table label .edit').click(function(){
					var id = $(this).parent().parent().find('input').val();
					var thisDom = $(this);
					$.ajax({
						url:'../../userInfo/selectTrain.do?getMs='+getMS(),
						data:{
							trainDocId:id
						},
						type:'post',
						success:function(data){
							var obj = eval('('+data+')').rows[0];
							$('#inviterecords .staffRecord .train input[name=trainId]').val(obj.trainDocId);
							$('#inviterecords .staffRecord input[name=userId]').val(obj.userId);
							$('#inviterecords .staffRecord .train input[name=trainName]').val(obj.trainName);
							$('#inviterecords .staffRecord .train input[name=trainCompany]').val(obj.trainCompany);
							$('#inviterecords .staffRecord .train input[name=startTime]').val(obj.startTimeStr);
							$('#inviterecords .staffRecord .train input[name=endTime]').val(obj.endTimeStr);
							$('#inviterecords .staffRecord .train textarea[name=trainDescribe]').val(obj.trainDescribe);
							$('#inviterecords .staffRecord .train .addexp').parent().css('display','none');
							$('#inviterecords .staffRecord .train .updateexp').parent().css('display','block');
							thisDom.parents('table').next().remove();
							thisDom.parents('table').remove();
						}
					})
				});
				
				/************************删除培训信息***********************/
				$('#inviterecords .staffRecord .train .display-train table label .delete').click(function(){
					var id = $(this).parent().parent().find('input').val();
					var thisDom = $(this);
					$.ajax({
						url:'../../userInfo/updateTrain.do?getMs='+getMS(),
						type:'post',
						data:{
							trainDocId:id,
							aliveFlag:'0'
						},
						success:function(data){
							if(data == 400 || data == 500){
								windowControl('删除培训信息失败');
								return ;
							}
							thisDom.parents('table').next().remove();
							thisDom.parents('table').remove();
						}
					});
				});
			}
		})
	})
	
	/******教育经历按钮点击事件，保存工教育经历，并且显示出保存成功的教育经历******/
	$('#inviterecords .staffRecord .edu .addexp').click(function(){
		var userId = $('#inviterecords .staffRecord input[name=userId]').val();
		var schoolName = $('#inviterecords .staffRecord .edu input[name=schoolName]').val();
		var startTime = $('#inviterecords .staffRecord .edu input[name=startTime]').val();
		var endTime = $('#inviterecords .staffRecord .edu input[name=endTime]').val();
		var specialty = $('#inviterecords .staffRecord .edu input[name=specialty]').val();
		if(userId == null || userId == ''){
			windowControl("请先保存员工基本信息");
			return ;
		}else if(schoolName == null || schoolName == ''){
			windowControl('学校名称不能为空');
			return ;
		}else if(startTime == null || startTime == ''){
			windowControl('入学时间不能为空');
			return ;
		}else if(endTime == null || endTime == ''){
			windowControl('毕业时间不能为空');
			return ;
		}else if(specialty == null || specialty == ''){
			windowControl('学习专业不能为空');
			return ;
		}
		$.ajax({
			url:'../../userInfo/saveEdu.do?getMs='+getMS(),
			type:'post',
			data:{
				userId:userId,
				schoolName:schoolName,
				startTimeStr:startTime,
				endTimeStr:endTime,
				specialty:specialty
			},
			success:function(data){
				if(data == 500 || data == 400){
					windowControl('添加教育经历失败');
				}else{
					var html = '<table>'
						+'<tr><td width="240px"></td><td width="800px"></td><td width="800px"></td><td width="800px"></td></tr>'
						+'<tr height="40px"><td colspan="1" style="text-align: right;">学校名称：</td><td colspan="2">'+schoolName+'</td>'
						+'<td style="text-align:right"><input style="display:none"/>'
						+'<label>修改<span class="small-button edit"></span></label><label>删除<span class="small-button delete"></span></label></td></tr>'
						+'<tr height="40px"><td style="text-align: right;">入学时间：</td><td>'+startTime+'</td><td style="text-align: right;">毕业时间：</td><td>'+endTime+'</td></tr>'
						+'<tr height="40px"><td colspan="1" style="text-align: right;">专业名称：</td><td colspan="3">'+specialty+'</td></tr>'
						+'</table><hr/>';
					$('#inviterecords .staffRecord .edu .display-edu').append(html);
					$('#inviterecords .staffRecord .edu .edu-table input').val(null);
					$('#inviterecords .staffRecord .edu .display-edu').find("table:last input").val(data);
					/************************修改点击事件***********************/
					$('#inviterecords .staffRecord .edu .display-edu table label .edit').click(function(){
						var id = $(this).parent().parent().find('input').val();
						var thisDom = $(this);
						$.ajax({
							url:'../../userInfo/selectEdu.do?getMs='+getMS(),
							data:{
								educationId:id
							},
							type:'post',
							success:function(data){
								var obj = eval('('+data+')').rows[0];
								$('#inviterecords .staffRecord .edu input[name=eduId]').val(id);
								$('#inviterecords .staffRecord .edu input[name=schoolName]').val(obj.schoolName);
								$('#inviterecords .staffRecord .edu input[name=specialty]').val(obj.specialty);
								$('#inviterecords .staffRecord .edu input[name=startTime]').val(obj.startTimeStr);
								$('#inviterecords .staffRecord .edu input[name=endTime]').val(obj.endTimeStr);
								$('#inviterecords .staffRecord .edu .addexp').parent().css('display','none');
								$('#inviterecords .staffRecord .edu .updateexp').parent().css('display','block');
								thisDom.parents('table').next().remove();
								thisDom.parents('table').remove();
							},
						})
					});
					
					/************************删除教育 信息***********************/
					$('#inviterecords .staffRecord .edu .display-edu table label .delete').click(function(){
						var id = $(this).parent().parent().find('input').val();
						var thisDom = $(this);
						$.ajax({
							url:'../../userInfo/updateEdu.do?getMs='+getMS(),
							type:'post',
							data:{
								educationId:id,
								aliveFlag:'0'
							},
							success:function(data){
								if(data == 400 || data == 500){
									windowControl('删除教育信息失败');
									return ;
								}
								thisDom.parents('table').next().remove();
								thisDom.parents('table').remove();
							}
						});
					});
				}
			}
		});
	});
	
	
	/******教育经历按钮点击事件，修改工教育经历，并且显示出修改成功的教育经历******/
	$('#inviterecords .staffRecord .edu .updateexp').click(function(){
		var userId = $('#inviterecords .staffRecord input[name=userId]').val();
		var schoolName = $('#inviterecords .staffRecord .edu input[name=schoolName]').val();
		var startTime = $('#inviterecords .staffRecord .edu input[name=startTime]').val();
		var endTime = $('#inviterecords .staffRecord .edu input[name=endTime]').val();
		var specialty = $('#inviterecords .staffRecord .edu input[name=specialty]').val();
		var educationId = $('#inviterecords .staffRecord .edu input[name=eduId]').val();
		if(userId == null || userId == ''){
			windowControl("请先保存员工基本信息");
			return ;
		}else if(schoolName == null || schoolName == ''){
			windowControl('学校名称不能为空');
			return ;
		}else if(startTime == null || startTime == ''){
			windowControl('入学时间不能为空');
			return ;
		}else if(endTime == null || endTime == ''){
			windowControl('毕业时间不能为空');
			return ;
		}else if(specialty == null || specialty == ''){
			windowControl('学习专业不能为空');
			return ;
		}
		$.ajax({
			url:'../../userInfo/updateEdu.do?getMs='+getMS(),
			type:'post',
			data:{
				educationId:educationId,
				schoolName:schoolName,
				startTimeStr:startTime,
				endTimeStr:endTime,
				specialty:specialty
			},
			success:function(data){
				if(data == 500 || data == 400){
					windowControl('修改教育经历失败');
					return ;
				}else{	
					var html = '<table>'
						+'<tr><td width="240px"></td><td width="800px"></td><td width="800px"></td><td width="800px"></td></tr>'
						+'<tr height="40px"><td colspan="1" style="text-align: right;">学校名称：</td><td colspan="2">'+schoolName+'</td>'
						+'<td style="text-align:right"><input style="display:none"/>'
						+'<label>修改<span class="small-button edit"></span></label><label>删除<span class="small-button delete"></span></label></td></tr>'
						+'<tr height="40px"><td style="text-align: right;">入学时间：</td><td>'+startTime+'</td><td style="text-align: right;">毕业时间：</td><td>'+endTime+'</td></tr>'
						+'<tr height="40px"><td colspan="1" style="text-align: right;">专业名称：</td><td colspan="3">'+specialty+'</td></tr>'
						+'</table><hr/>';
					$('#inviterecords .staffRecord .edu .display-edu').append(html);
					$('#inviterecords .staffRecord .edu .edu-table input').val(null);
					$('#inviterecords .staffRecord .edu .display-edu').find("table:last input").val(educationId);
					$('#inviterecords .staffRecord .edu .addexp').parent().css('display','block');
					$('#inviterecords .staffRecord .edu .updateexp').parent().css('display','none');
					/************************修改点击事件***********************/
					$('#inviterecords .staffRecord .edu .display-edu table label .edit').click(function(){
						var id = $(this).parent().parent().find('input').val();
						var thisDom = $(this);
						$.ajax({
							url:'../../userInfo/selectEdu.do?getMs='+getMS(),
							data:{
								educationId:id
							},
							type:'post',
							success:function(data){
								if(data == 400 || data == 500){
									windowControl('修改信息失败');
									return ;
								}
								var obj = eval('('+data+')').rows[0];
								$('#inviterecords .staffRecord .edu input[name=eduId]').val(id);
								$('#inviterecords .staffRecord .edu input[name=schoolName]').val(obj.schoolName);
								$('#inviterecords .staffRecord .edu input[name=specialty]').val(obj.specialty);
								$('#inviterecords .staffRecord .edu input[name=startTime]').val(obj.startTimeStr);
								$('#inviterecords .staffRecord .edu input[name=endTime]').val(obj.endTimeStr);
								$('#inviterecords .staffRecord .edu .addexp').parent().css('display','none');
								$('#inviterecords .staffRecord .edu .updateexp').parent().css('display','block');
								thisDom.parents('table').next().remove();
								thisDom.parents('table').remove();
							},
						})
					});
					
					/************************删除教育 信息***********************/
					$('#inviterecords .staffRecord .edu .display-edu table label .delete').click(function(){
						var id = $(this).parent().parent().find('input').val();
						var thisDom = $(this);
						$.ajax({
							url:'../../userInfo/updateEdu.do?getMs='+getMS(),
							type:'post',
							data:{
								educationId:id,
								aliveFlag:'0'
							},
							success:function(data){
								if(data == 400 || data == 500){
									windowControl('删除教育信息失败');
									return ;
								}
								thisDom.parents('table').next().remove();
								thisDom.parents('table').remove();
							}
						});
					});
				}
			}
		});
	});
}


function inviterecordsAddWorkEvent(){
	/************************修改点击事件***********************/
	$('#inviterecords .staffRecord .work .display-work table label .edit').click(function(){
		var id = $(this).parent().parent().find('input').val();
		var thisDom = $(this);
		$.ajax({
			url:'../../userInfo/selectWork.do?getMs='+getMS(),
			data:{
				workId:id
			},
			success:function(data){
				var obj = eval('('+data+')').rows[0];
				$('#inviterecords .staffRecord .work input[name=workId]').val(obj.workId);
				$('#inviterecords .staffRecord input[name=userId]').val(obj.userId);
				$('#inviterecords .staffRecord .work input[name=postName]').val(obj.postName);
				$('#inviterecords .staffRecord .work input[name=componyName]').val(obj.componyName);
				$('#inviterecords .staffRecord .work input[name=startTime]').val(obj.startTimeStr);
				$('#inviterecords .staffRecord .work input[name=endTime]').val(obj.endTimeStr);
				$('#inviterecords .staffRecord .work textarea[name=workDescribe]').val(obj.workDescribe);
				$('#inviterecords .staffRecord .work .addexp').parent().css('display','none');
				$('#inviterecords .staffRecord .work .updateexp').parent().css('display','block');
				thisDom.parents('table').next().remove();
				thisDom.parents('table').remove();
			}
		});
	});
	
	/************************删除工作 点击事件***********************/
	$('#inviterecords .staffRecord .work .display-work table label .delete').click(function(){
		var id = $(this).parent().parent().find('input').val();
		var thisDom = $(this);
		$.ajax({
			url:'../../userInfo/updateWork.do?getMs='+getMS(),
			type:'post',
			data:{
				workId:id,
				aliveFlag:'0'
			},
			success:function(data){
				if(data == 400 || data == 500){
					windowControl('删除工作信息失败');
					return ;
				}
				thisDom.parents('table').next().remove();
				thisDom.parents('table').remove();
			}
		});
	});
}


function inviterecordsAddTrainEvent(){
	/************************修改点击事件***********************/
	$('#inviterecords .staffRecord .train .display-train table label .edit').click(function(){
		var id = $(this).parent().parent().find('input').val();
		var thisDom = $(this);
		$.ajax({
			url:'../../userInfo/selectTrain.do?getMs='+getMS(),
			data:{
				trainDocId:id
			},
			type:'post',
			success:function(data){
				var obj = eval('('+data+')').rows[0];
				$('#inviterecords .staffRecord .train input[name=trainId]').val(obj.trainDocId);
				$('#inviterecords .staffRecord input[name=userId]').val(obj.userId);
				$('#inviterecords .staffRecord .train input[name=trainName]').val(obj.trainName);
				$('#inviterecords .staffRecord .train input[name=trainCompany]').val(obj.trainCompany);
				$('#inviterecords .staffRecord .train input[name=startTime]').val(obj.startTimeStr);
				$('#inviterecords .staffRecord .train input[name=endTime]').val(obj.endTimeStr);
				$('#inviterecords .staffRecord .train textarea[name=trainDescribe]').val(obj.trainDescribe);
				$('#inviterecords .staffRecord .train .addexp').parent().css('display','none');
				$('#inviterecords .staffRecord .train .updateexp').parent().css('display','block');
				thisDom.parents('table').next().remove();
				thisDom.parents('table').remove();
			}
		})
	});
	
	/************************删除培训信息***********************/
	$('#inviterecords .staffRecord .train .display-train table label .delete').click(function(){
		var id = $(this).parent().parent().find('input').val();
		var thisDom = $(this);
		$.ajax({
			url:'../../userInfo/updateTrain.do?getMs='+getMS(),
			type:'post',
			data:{
				trainDocId:id,
				aliveFlag:'0'
			},
			success:function(data){
				if(data == 400 || data == 500){
					windowControl('删除培训信息失败');
					return ;
				}
				thisDom.parents('table').next().remove();
				thisDom.parents('table').remove();
			}
		});
	});
}


function inviterecordsAddEduEvent(){
	/************************修改点击事件***********************/
	$('#inviterecords .staffRecord .edu .display-edu table label .edit').click(function(){
		var id = $(this).parent().parent().find('input').val();
		var thisDom = $(this);
		$.ajax({
			url:'../../userInfo/selectEdu.do?getMs='+getMS(),
			data:{
				educationId:id
			},
			type:'post',
			success:function(data){
				var obj = eval('('+data+')').rows[0];
				$('#inviterecords .staffRecord .edu input[name=eduId]').val(id);
				$('#inviterecords .staffRecord .edu input[name=schoolName]').val(obj.schoolName);
				$('#inviterecords .staffRecord .edu input[name=specialty]').val(obj.specialty);
				$('#inviterecords .staffRecord .edu input[name=startTime]').val(obj.startTimeStr);
				$('#inviterecords .staffRecord .edu input[name=endTime]').val(obj.endTimeStr);
				$('#inviterecords .staffRecord .edu .addexp').parent().css('display','none');
				$('#inviterecords .staffRecord .edu .updateexp').parent().css('display','block');
				thisDom.parents('table').next().remove();
				thisDom.parents('table').remove();
			},
		})
	});
	
	/************************删除教育 信息***********************/
	$('#inviterecords .staffRecord .edu .display-edu table label .delete').click(function(){
		var id = $(this).parent().parent().find('input').val();
		var thisDom = $(this);
		$.ajax({
			url:'../../userInfo/updateEdu.do?getMs='+getMS(),
			type:'post',
			data:{
				educationId:id,
				aliveFlag:'0'
			},
			success:function(data){
				if(data == 400 || data == 500){
					windowControl('删除教育信息失败');
					return ;
				}
				thisDom.parents('table').next().remove();
				thisDom.parents('table').remove();
			}
		});
	});
}


