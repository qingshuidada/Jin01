$(function(){
	//获取当前登陆人
	$.ajax({
		url:'../../user/getUserInfo.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			if(data == '500')
				return ;
			var data = eval('(' + data + ')');
			userInfo = data;
			if(data.userId != 'admin'){
				$('#punchCard').show();
				$('#punchCard').attr('data',data.userId);
			}
			$('#userInvite .invitetop input[name=departmentName]').val(data.departmentName);
			$('#userInvite .invitetop input[name=departmentUrl]').val(data.departmentUrl);
			if(data.departmentName != '厂部'){
				$("#userInvite .invitetop .departmentChooseObj").attr("disabled", true); 
			}
		},
		error:function(error){
			windowControl(error.status);
		}
	});
	//选择部门
	$('#userInvite .invitetop .departmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#userInvite .invitetop input[name=departmentName]').val(chooseDept.text);
		     $('#userInvite .invitetop input[name=departmentUrl]').val(chooseDept.id);
		     $('#chooseDept .confirm').unbind();
		})
	})
	//选择岗位
	$('#userInvite .invitetop .postChooseObj').click(function(){
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
	    	$('#userInvite .invitetop input[name=postName]').val(postNames);
	    	$('#userInvite .invitetop input[name=postId]').val(postIds);
	    	$('#userInvite .invitetop input[name=postId]').attr("postNames",postNames);
	    	$('#choosePost .confirm').unbind();
	    })
	})
	//主页面产生数据网格
	$('#userInvitedg').datagrid({
		   //url:'../../userInviteInfo/selectInviteUser.do?getMs='+getMS(), admin:personnel:inviteManage:userInvite:edit
		   queryParams:{
			   employFlag:'0'
		   },
		   rownumbers:"true",
		   pagination:true,
		   toolbar:"#userInvite .invitetop",
		   method:"post",
		   fit: true,	
		   singleSelect:true,
		   columns:[[
		       {field:"_opera",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
		    	   var opera = '';
		    	   var id = "'"+row.userId+"'";
	    		   var idCard = "'"+row.idCard+"'";
	    		   var employFlag = row.employFlag;
	    		   opera += '<div class="imgBox">'
	    		   if(existPermission('admin:personnel:inviteManage:userInvite:look'))
	    			   opera += '<span style="float:center;" class="small-button look" title="查看" onclick="userInviteLook('+id+','+idCard+','+employFlag+')"></span>'
	    		   if(existPermission('admin:personnel:inviteManage:userInvite:edit')){
	    			   if(employFlag == 1){
	    				   opera += '<span style="float:center;" class="small-button edit" title="审批" onclick="userInviteEdit('+id+')"></span>';
	    			   } 
	    		   }
		    	   opera += '</div>'
		    	   return opera;
		       }},
		       {field:"employFlag",title:"审批状态",fitColumns:true,resizable:true,align:"center",width:60,sortable:true,formatter:function(value,row,index){
		    	   var employFlag = row.employFlag;
		    	   if(employFlag == 1){
		    		   return '<span style="color:green">审批中</span>';
		    	   }else if(employFlag == 2){
		    		   return '<span style="color:blue">已通过</span>';
		    	   }else if(employFlag == 3){
		    		   return '<span style="color:red">驳回</span>s';
		    	   }
		       }},
		       {field:"userName",title:"员工名字",fitColumns:true,sortable:true,align:"center",sortable:true,width:100 },
		       {field:"idCard",title:"身份证号码",fitColumns:true,resizable:true,align:"center",sortable:true,width:135},
		       {field:"sex",title:"性别",fitColumns:true,resizable:true,align:"center",width:50,sortable:true,formatter:function(value,row,index){
		    	   var sex = row.sex;
		    	   if(sex == 1){
		    		   return '男';
		    	   }else{
		    		   return '女';
		    	   }
		       }},
		       {field:"birthdayStr",title:"出生日期",fitColumns:true,width:75,resizable:true,align:"center",sortable:true},
		       {field:"education",title:"学历",fitColumns:true,resizable:true,width:36,align:"center",sortable:true,formatter:function(value,row,index){
		    	   var education = row.education;
		    	   return getValueFromKey("education",education);
		       }},
		       {field:"departmentName",title:"所属部门",fitColumns:true,width:60,resizable:true,align:"center",sortable:true},
		       {field:"postName",title:"所属岗位",fitColumns:true,resizable:true,width:60,align:"center",sortable:true},
		       {field:"political_Status",title:"政治面貌",fitColumns:true,resizable:true,width:60,align:"center",sortable:true,formatter:function(value,row,index){
		    	   return getValueFromKey("political_status",row.politicalStatus);
		    	   return getValueFromKey("political_status",politicalStatus);
		       }},
		       {field:"createTimeStr",title:"登记时间",fitColumns:true,resizable:true,width:120,align:"center",sortable:true},
		       {field:"phoneNum",title:"联系方式",fitColumns:true,resizable:true,width:86,align:"center",sortable:true},
		       {field:"accidentPhoneNum",title:"紧急联系方式",fitColumns:true,resizable:true,width:86,align:"center",sortable:true},
		       {field:"address",title:"地址",fitColumns:true,resizable:true,width:220,align:"center",sortable:true,formatter:status},
		   ]],
	});
	$('#userInvite .invitetop .selectUserInfo').click(function(){
		if(existPermission('admin:personnel:inviteManage:userInvite:select')){
			$('#userInvitedg').datagrid({
				 url:'../../userInviteInfo/selectInviteUser.do?getMs='+getMS(),
				 queryParams: {
					userName: function(){
						return $('#userInvite .invitetop input[name=peopleName]').val();
					},
					idCard: function(){
						return $('#userInvite .invitetop input[name=idCard]').val();
					},
					departmentUrl: function(){
						return $('#userInvite .invitetop input[name=departmentUrl]').val();
					},
					postId:function(){
						return $('#userInvite .invitetop input[name=postId]').val();
					},
					employFlag: function(){
						return $('#userInvite .invitetop select[name=employFlag]').val();
					},
					workTimeStartStr: function(){
						return $('#userInvite .invitetop input[name=workTimeStartStr]').val();
					},
					workTimeEndStr: function(){
						return $('#userInvite .invitetop input[name=workTimeEndStr]').val();
					},				
				}
			});
		}else{
			windowControl('无权限查看!');
		}
	});
	/*****返回列表点击事件*****/
	$('#userInvite .staffRecord .back').click(function(){
		$('#userInvite .staffRecord').css('display','none');
		$('#userInvite .main').css('display','block');
		$('#userInvite .staffRecord .otherInfo .display-otherInfo').html('');
		$('#userInvite .staffRecord .work .display-work').html('');
		$('#userInvite .staffRecord .edu .display-edu').html('');
		$('#userInvite .staffRecord .dispatch').hide();
		$('#userInvite .staffRecord .userdimission').hide();	
		$('#userInvite .staffRecord .basic').find('input').not("input[type=button]").val(null);
		$('#userInvite .staffRecord .basic').find('select').val(null);
		$('#userInvite .staffRecord .idCard-img input').val(null);
		$('#userInvite .staffRecord .idCard-img img').attr('src',null);
		$('#userInvitedg').datagrid('reload');
	});
	/**审批的确定事件 **/
	$('#userInvite .editInvite .confirm').click(function(){
		var employFlag = $("input[name='btn']:checked").attr("data-type");
		var userId = $('#userInvite .editInvite .userId').val();
		$.ajax({
			url:'../../userInviteInfo/updateUserInfo.do?getMs='+getMS(),
			data:{
				userId:userId,
				employFlag:employFlag
			},
			success:function(data){
				if(data == 200){
					$("#userInvitedg").datagrid('reload');
					$('#userInvite .editInvite').css('display','none');
					windowControl('审批成功!');
				}else{
					windowControl('审批失败!');
				}
			},
			error:function(data){
				windowControl('网络异常');
			}
		});
	});
	
	
});
/*-------------------点击查看员工信息-----------------*/
function userInviteLook(id,idcard,employFlag){
	//必填* 消失
	$('#userInvite .userInfo .basic table span').css('display','none');
	//设定该页面的userID
	$('#userInvite .staffRecord input[name=userId]').val(id);
	//关闭添加窗口
	$('#userInvite .staffRecord .otherInfo').css('display','none');
	$('#userInvite .staffRecord .work').css('display','none');
	$('#userInvite .staffRecord .edu').css('display','none');
	//关闭添加窗口
	$('#userInvite .staffRecord .otherInfo .otherInfo-table').css('display','none');
	$('#userInvite .staffRecord .work .work-table').css('display','none');
	$('#userInvite .staffRecord .edu .edu-table').css('display','none');
	//关闭添加修改按钮
	$('#userInvite .staffRecord .addexp').parent().css('display','none');
	$('#userInvite .staffRecord .updateexp').parent().css('display','none');
	//切换显示的页面
	$('#userInvite .staffRecord').css('display','block');
	$('#userInvite .main').css('display','none');
	//取消身份证的验证
	$('#userInvite .staffRecord .basicInformation input[name=idCard]').unbind();
	//关闭下一位员工及读取身份证
	$('#userInvite .staffRecord .next').css('display','none');
	$('#userInvite .staffRecord .read-idCard').css('display','none');
	//锁定输入，不可修改
	$('#userInvite .staffRecord .userInfo .cap').show();
	//填充数据
	userIntviteManageSelectData(id,idcard,employFlag);
}
//查询员工信息
function userIntviteManageSelectData(id,idCard,employFlag){
	/***获取基本信息****/
	$.ajax({
		url:'../../userInviteInfo/selectUserInfo.do?getMs='+getMS(),
		data:{
			userId:id,
			idCard:idCard,
			employFlag:employFlag
		},
		type:'post',
		success:function(data){
			console.log(data)
			var rows = eval('('+data+')').rows;
			if(rows.length == 0) return ;
			var obj = rows[0];			
			$('#userInvite .staffRecord .basicInformation input[name="userAccount"]').val(obj.userAccount);
			$('#userInvite .staffRecord .basicInformation input[name="peopleName"]').val(obj.userName);
			$('#userInvite .staffRecord .basicInformation input[name="departmentName"]').val(obj.departmentName);
			$('#userInvite .staffRecord .basicInformation input[name="departmentUrl"]').val(obj.departmentUrl);
			$('#userInvite .staffRecord .basicInformation input[name="postName"]').val(obj.postName);
			$('#userInvite .staffRecord .basicInformation input[name="postId"]').val(obj.postId);
			$('#userInvite .staffRecord .basicInformation input[name="phoneNum"]').val(obj.phoneNum);
			$('#userInvite .staffRecord .basicInformation input[name="accidentPhoneNum"]').val(obj.accidentPhoneNum);
			$('#userInvite .staffRecord .basicInformation input[name="birthday"]').val(obj.birthdayStr);
			$('#userInvite .staffRecord .basicInformation input[name="idCard"]').val(obj.idCard);
			$('#userInvite .staffRecord .basicInformation select[name="sex"]').val(obj.sex);
			$('#userInvite .staffRecord .basicInformation input[name="workTime"]').val(obj.workTimeStr);
			$('#userInvite .staffRecord .basicInformation input[name="address"]').val(obj.address);
			$('#userInvite .staffRecord .basicInformation select[name="leaderFlag"]').val(obj.leaderFlag);
			$('#userInvite .staffRecord .basicInformation select[name="education"]').val(obj.education);
			$('#userInvite .staffRecord .basicInformation select[name="volk"]').val(obj.volk);
			$('#userInvite .staffRecord .basicInformation select[name="politicalStatus"]').val(obj.politicalStatus);
			$('#userInvite .staffRecord .basicInformation input[name="nativePlace"]').val(obj.nativePlace);
			$('#userInvite .staffRecord .basicInformation select[name="marriageFlag"]').val(obj.marriageFlag);
			$('#userInvite .staffRecord .basicInformation select[name="diseaseHistoryFlag"]').val(obj.diseaseHistoryFlag);
			$('#userInvite .staffRecord .basicInformation input[name="diseaseHistory"]').val(obj.diseaseHistory);			
			$('#userInvite .staffRecord .basicInformation input[name="wageAccount"]').val(obj.wageAccount);
			$('#userInvite .staffRecord .basicInformation input[name="englishLevel"]').val(obj.englishLevel);
			$('#userInvite .staffRecord .basicInformation input[name="idCardValid"]').val(obj.idCardValid);
			$('#userInvite .staffRecord .basicInformation input[name="idCardIssued"]').val(obj.idCardIssued);
			//显示身份证的照片信息
			var url1 = obj.photo;
			var photo = '../../personnel/downLoadImage.do?url='+url1+'&getMs='+getMS();
			$("#userInviteManage .staffRecord .basicInformation .pic1").attr("src",photo);
			var url2 = obj.idCardUpImg;
			var idCardUpImg = '../../personnel/downLoadImage.do?url='+url2+'&getMs='+getMS();
			$("#userInviteManage .staffRecord .basicInformation .pic2").attr("src",idCardUpImg);
			var url3 = obj.idCardDownImg;
			var idCardDownImg = '../../personnel/downLoadImage.do?url='+url3+'&getMs='+getMS();
			$("#userInviteManage .staffRecord .basicInformation .pic3").attr("src",idCardDownImg);
			/*******获取员工上级********/
			$.ajax({
				url:'../../lead/getLeader.do?getMs='+getMS(),
				type:'post',
				data:{
					idCard:idCard
				},
				success:function(data){
					var obj = eval("("+data+")");
					if(obj){
						$('#userInvite .basicInformation input[name=leadId]').val(obj.userId);
			        	$('#userInvite .basicInformation input[name=leadName]').val(obj.userName);
					}			
				}
			});
			Record();
		}
	});
	var Record = function(){
		/**********************获取员工离职信息**********************/
		$.ajax({
			url:'../../dimission/getDimissionList.do?getMs='+getMS(),
			data:{
				idCard:idCard
			},
			type:'post',
			success:function(data){
				var obj = eval('('+data+')').rows;
				if(obj.length==0){
					$('#userInvite .staffRecord .userdimission').hide();
				}else{
					$('#userInvite .staffRecord .userdimission').css('display','block');
				}
				$('#userInvite .staffRecord .userdimission .display-dimission').html('');			
				for(var i = 0;i<obj.length;i++){
					/*if(obj[i].dimissionFlag == '01')
						obj[i].dimissionFlag == '离职';
					if(obj[i].dimissionFlag == '02')
						obj[i].dimissionFlag == '急辞';
					if(obj[i].dimissionFlag == '03')
						obj[i].dimissionFlag == '辞职';
					if(obj[i].dimissionFlag == '04')
						obj[i].dimissionFlag == '辞退';*/
					obj[i].dimissionFlag = getValueFromKey("dimission_flag",obj[i].dimissionFlag);
					obj[i].inviteFlag = getValueFromKey("invite_flag",obj[i].inviteFlag);
					var html =  '<table style="text-align:right;height:50px;width:100%;">'
						+'<tr><td></td><td></td><td></td><td></td><td></td></tr>'
						+'<tr>'
						+'<td style="width:9.3%;">离职类型：</td>'
						+'<td style="width:26.2%;text-align:left;">'+ obj[i].dimissionFlag +'</td>'
						+'<td style="width:15%;">离职时间：</td>'
						+'<td style="width:26.2%;text-align:left;">'+ obj[i].dimissionTime +'</td>'
						+'</tr>'
						+'<tr>'
						+'<td style="width:9.3%;">离职状态：</td>'
						+'<td style="width:26.2%;text-align:left;">'+ obj[i].inviteFlag +'</td>'
						+'<td style="width:15%;">备注：</td>'
						+'<td style="width:26.2%;text-align:left;">'+ obj[i].remark +'</td>'
						+'</tr>'
					html += '</table>';
					if(i == obj.length-1){
						html = html;
					}else{
						html = html + '<hr/>';
					}
					$('#userInvite .staffRecord .userdimission .display-dimission').append(html);
				}
			}
		});
		/**********************获取员工调度信息**********************/
		$.ajax({
			url:'../../userInfo/selectUserTransfer.do?getMs='+getMS(),
			data:{
				idCard:idCard
			},
			type:'post',
			success:function(data){
				var obj = eval('('+data+')').rows;
				if(obj.length==0){
					$('#userInvite .staffRecord .dispatch').hide();
				}else{
					$('#userInvite .staffRecord .dispatch').css('display','block');
					
				}
				$('#userInvite .staffRecord .dispatch .display-dispatch').html('');			
				for(var i = 0;i<obj.length;i++){				
					var html =  '<table style="text-align:right;height:50px;width:100%;">'
							+'<tr><td></td><td></td><td></td><td></td><td></td></tr>'
							+'<tr>'
							+'<td style="width:9.3%;">原部门：</td>'
							+'<td style="width:26.2%;text-align:left;">'+ obj[i].oldDepartmentName +'</td>'
							+'<td style="width:15%;">原岗位：</td>'
							+'<td style="width:26.2%;text-align:left;">'+ obj[i].oldPostName +'</td>'
							+'</tr>'
							+'<tr>'
							+'<td style="width:9.3%;">新部门：</td>'
							+'<td style="width:26.2%;text-align:left;">'+ obj[i].newDepartmentName +'</td>'
							+'<td style="width:15%;">新岗位：</td>'
							+'<td style="width:26.2%;text-align:left;">'+ obj[i].newPostName +'</td>'
							+'</tr>'
							+'<tr>'
							+'<td style="width:9.3%;">调度时间：</td>'
							+'<td style="width:26.2%;text-align:left;">'+ obj[i].transferTimeStr +'</td>'
							+'<td style="width:15%;"></td>'
							+'<td style="width:26.2%;text-align:left;"></td>'
							+'</tr>'
					html += '</table>';
					if(i == obj.length-1){
						html = html;
					}else{
						html = html + '<hr/>';
					}				
					$('#userInvite .staffRecord .dispatch .display-dispatch').append(html);
				}
			}
		});
	}
}
function userInviteEdit(id){
	$.ajax({
		url:'../../user/getUserInfo.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			if(data == '500')
				return ;
			var userInfo = eval('(' + data + ')');
			if(userInfo.userAccount != '8000024'){
				windowControl("您没有权限执行当前操作！");
			}else{
				$('#userInvite .editInvite').css('display','block');
				$('#userInvite .editInvite .userId').val(id);
			}
		},
		error:function(error){
			windowControl(error.status);
		}
	});
}

//学历
$('#userInvite .invitetop select[name=education]').html(getDataBySelectKey("education"));
$('#userInvite .invitetop select[name=politicalStatus]').html(getDataBySelectKeyNo("political_status"));
