var userInviteManageExcel = [];
$(function(){  
	$('#userInviteManage .staffRecord').css('height',$('#loadarea').height()-32);
	if(existPermission('admin:personnel:inviteManage:userInviteManage:add')){
		var topHtml = '<div style="margin-right:6px;"><input type="button" value="添加" class="button adduser" /></div>';
		$('#userInviteManage .maintop').append(topHtml);
	}
	if(existPermission('admin:personnel:inviteManage:userInviteManage:export')){
		var excelHtml = '<div style="margin-right:6px;"><input type="button" value="导出查询结果到Excel" class="button write" /></div>';
		$('#userInviteManage .maintop').append(excelHtml);
	}//点击事件
	$('#userInviteManage .maintop .adduser').click(function(){
			userIntviteUpdateUserInfo();
	})
	//为了能使查看员工信息使高度不会低于loadarea的高度	
	$('#loadarea .tabs-panels').css({
		'height':$('#loadarea').height()-31+'px',
		'overflow-y':'auto',
	});
	$.ajax({
		url:'../../user/getUserInfo.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			if(data == '500')
				return ;
			var data = eval('(' + data + ')');
			userInfo = data;
			$('#userInviteManage .invitetop input[name=departmentName]').val(data.departmentName);
			$('#userInviteManage .invitetop input[name=departmentUrl]').val(data.departmentUrl);
			if(data.departmentName != '厂部'){
				$("#userInviteManage .invitetop .departmentChooseObj").attr("disabled", true); 
			}
		},
		error:function(error){
			windowControl(error.status);
		}
	});
	/*****返回列表点击事件*****/
	$('#userInviteManage .staffRecord .back').click(function(){
		$('#userInviteManage .staffRecord').css('display','none');
		$('#userInviteManage .main').css('display','block');
		$('#userInviteManage .staffRecord .otherInfo .display-otherInfo').html('');
		$('#userInviteManage .staffRecord .work .display-work').html('');
		$('#userInviteManage .staffRecord .edu .display-edu').html('');
		$('#userInviteManage .staffRecord .dispatch').hide();
		$('#userInviteManage .staffRecord .userdimission').hide();	
		$('#userInviteManage .staffRecord .basic').find('input').not("input[type=button]").val(null);
		$('#userInviteManage .staffRecord .basic').find('select').val(null);
		$('#userInviteManage .staffRecord .idCard-img input').val(null);
		$('#userInviteManage .staffRecord .idCard-img img').attr('src',null);
		$('#userInviteManagedg').datagrid('reload');
	});
	//选择部门
	$('#userInviteManage .invitetop .departmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#userInviteManage .invitetop input[name=departmentName]').val(chooseDept.text);
		     $('#userInviteManage .invitetop input[name=departmentUrl]').val(chooseDept.id);
		     $('#chooseDept .confirm').unbind();
		})
	})
	//选择岗位
	$('#userInviteManage .invitetop .postChooseObj').click(function(){
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
	    	$('#userInviteManage .invitetop input[name=postName]').val(postNames);
	    	$('#userInviteManage .invitetop input[name=postId]').val(postIds);
	    	$('#userInviteManage .invitetop input[name=postId]').attr("postNames",postNames);
	    	$('#choosePost .confirm').unbind();
	    })
	})
	/**************volk****************/
	$('#userInviteManage .staffRecord select[name=volk]').html(getDataBySelectKey("volk"));
	$('#userInviteManage .advancedQuery select[name=volk]').append(getDataBySelectKeyNo("volk"));
	/*********************学历**********************/
	$('#userInviteManage .staffRecord select[name=education]').html(getDataBySelectKey("education"));
	$('#userInviteManage .invitetop select[name=education]').html(getDataBySelectKeyNo("education"));
	$('#userInviteManage .advancedQuery select[name=education]').append(getDataBySelectKeyNo("education"));
	/*******************婚姻状态**************************/
	$('#userInviteManage .staffRecord select[name=marriageFlag]').html(getDataBySelectKey("marriage_flag"));
	$('#userInviteManage .advancedQuery select[name=marriageFlag]').append(getDataBySelectKeyNo("marriage_flag"));
	/*******************政治面貌**************************/
	$('#userInviteManage .staffRecord select[name=politicalStatus]').html(getDataBySelectKey("political_status"));
	$('#userInviteManage .invitetop select[name=politicalStatus]').html(getDataBySelectKeyNo("political_status"));
	$('#userInviteManage .advancedQuery select[name=politicalStatus]').append(getDataBySelectKeyNo("political_status"));
	 
	/************高级查询***************/
	//高级查询按钮点击事件
	$('#userInviteManage .invitetop .advancedQueryBtn').click(function(){
		$('#userInviteManage .advancedQuery').css('display','block');
	});
	$('#userInviteManage .advancedQuery .close').click(function(){
		$('#userInviteManage .advancedQuery').css('display','none');
	});
	//advancedQuery   选择部门
	$('#userInviteManage .advancedQuery .popuparea input[name=chooseDepartment]').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#userInviteManage .advancedQuery .popuparea input[name=departmentName]').val(chooseDept.text);
		     $('#userInviteManage .advancedQuery .popuparea input[name=departmentUrl]').val(chooseDept.id);
		     $('#chooseDept .confirm').unbind();
		});
	});
	//advancedQuery    选择岗位
	$('#userInviteManage .advancedQuery .popuparea input[name=choosePost]').click(function(){
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
	    	$('#userInviteManage .advancedQuery .popuparea input[name=postName]').val(postNames);
	    	$('#userInviteManage .advancedQuery .popuparea input[name=postId]').val(postIds);
	    	$('#userInviteManage .advancedQuery .popuparea input[name=postId]').attr("postNames",postNames);
	    	$('#choosePost .confirm').unbind();
	    });
	});
	//清空
	$('#userInviteManage .advancedQuery .clean').click(function(){
		$('#userInviteManage .advancedQuery .popuparea input[type=text]').val(null);
		$('#userInviteManage .advancedQuery .popuparea select').val(null);
	});
	$('#userInviteManage .advancedQuery .confirm').click(function(){
		if(existPermission('admin:personnel:inviteManage:userInviteManage:select')){
			var userName = $('#userInviteManage .advancedQuery .popuparea input[name=peopleName]').val();
			var idCard = $('#userInviteManage .advancedQuery .popuparea input[name=idCard]').val();
			var sex = $('#userInviteManage .advancedQuery .popuparea select[name=sex]').val();
			var volk = $('#userInviteManage .advancedQuery .popuparea select[name=volk]').val();
			var education = $('#userInviteManage .advancedQuery .popuparea select[name=education]').val();
			var address = $('#userInviteManage .advancedQuery .popuparea input[name=address]').val();
			var marriageFlag = $('#userInviteManage .advancedQuery .popuparea select[name=marriageFlag]').val();
			var nativePlace = $('#userInviteManage .advancedQuery .popuparea input[name=nativePlace]').val();
			var politicalStatus = $('#userInviteManage .advancedQuery .popuparea select[name=politicalStatus]').val();
			var departmentName = $('#userInviteManage .advancedQuery .popuparea input[name=departmentName]').val();
			var departmentUrl = $('#userInviteManage .advancedQuery .popuparea input[name=departmentUrl]').val();
			var postName = $('#userInviteManage .advancedQuery .popuparea input[name=postName]').val();
			var postId = $('#userInviteManage .advancedQuery .popuparea input[name=postId]').val();
			var englishLevel = $('#userInviteManage .advancedQuery .popuparea input[name=englishLevel]').val();
			userInviteManageExcel = [
	        		{name:'userName',value:userName},
	        		{name:'idCard',value:idCard},
	     	   		{name:'sex',value:sex},
	     	   		{name:'volk',value:volk},
	     	   		{name:'education',value:education},
	     	   		{name:'address',value:address},
	     	   		{name:'marriageFlag',value:marriageFlag},
	     	   		{name:'nativePlace',value:nativePlace},
	     	   		{name:'politicalStatus',value:politicalStatus},
	     	   		{name:'departmentName',value:departmentName},
	     	   		{name:'departmentUrl',value:departmentUrl},
	     	   		{name:'postName',value:postName},
	     	   		{name:'postId',value:postId},
	     	   		{name:'englishLevel',value:englishLevel}
	  		];
			$('#userInviteManagedg').datagrid({
				url:'../../userInviteInfo/selectUserInfo.do?getMs='+getMS(),
				queryParams:{
					userName:userName,
					idCard:idCard,
					sex:sex,
					volk:volk,
					education:education,
					address:address,
					marriageFlag:marriageFlag,
					nativePlace:nativePlace,
					politicalStatus:politicalStatus,
					//userAccount:userAccount,
					departmentName:departmentName,
					departmentUrl:departmentUrl,
					postName:postName,
					postId:postId,
					englishLevel:englishLevel,
				}
			});
			$('#userInviteManage .advancedQuery').css('display','none');
			$('#userInviteManage .advancedQuery .popuparea input[type=text]').val(null);
			$('#userInviteManage .advancedQuery .popuparea select').val(null);
		}
	});
	//打印身份证按钮的点击事件
	$('#userInviteManage .printIdCardBtn').click(function(){
		var wx = $(window).width();   //获取可视区屏幕的宽度
		var wy = $(window).height();  //获取可视区屏幕的高度
		var w = $('#userInviteManage .printIdCard').width();
		var h = $('#userInviteManage .printIdCard').height();
		console.log((wx-w)/2+":"+(wy-h)/2);
		$('#userInviteManage .printIdCard').css({
			'left':(wx-w)/2,
			'top':(wy-h)/2
		});
		$('#userInviteManage .printIdCard').css('display','block');
		$('#userInviteManage .printIdCard img:eq(0)').attr('src',$('#userInviteManage .basic .pic2').attr('src'));
		$('#userInviteManage .printIdCard img:eq(1)').attr('src',$('#userInviteManage .basic .pic3').attr('src'));
	})
	//打印身份证
	$('#userInviteManage .printIdCard .confirm').click(function(){
		$('#userInviteManage .printIdCard').css('display','none');
		$('#userInviteManage .printIdCard .popuparea:eq(0)').jqprint();
	});
	//主页面产生数据网格
	$('#userInviteManagedg').datagrid({
		   //url:'../../userInviteInfo/selectUserInfo.do?getMs='+getMS(),
		   rownumbers:"true",
		   pagination:true,
		   toolbar:"#userInviteManage .invitetop",
		   method:"post",
		   fit: true,	
		   singleSelect:true,
		   columns:[[
		       {field:"_opera",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
		    	   var opera = '';
		    	   var id = "'"+row.userId+"'";
		    	   var departmentUrl = "'"+row.departmentUrl+"'";
		    	   var departmentName = "'"+row.departmentName+"'";
		    	   var postId = "'"+row.postId+"'";
		    	   var postName = "'"+row.postName+"'";
		    	   var inviteFlag = "'"+row.inviteFlag+"'";
	    		   var retireFlag = "'"+row.retireFlag+"'";
	    		   var userName = "'"+row.userName+"'";
	    		   var idCard = "'"+row.idCard+"'";
	    		   var employFlag = row.employFlag;
	    		   opera += '<div class="imgBox">'
    			   if(existPermission('admin:personnel:inviteManage:userInviteManage:look'))
    				   opera += '<span style="float:left;" class="small-button look" title="查看" onclick="userIntviteLookUserInfo('+id+','+idCard+')"></span>'
		    	   if(existPermission('admin:personnel:inviteManage:userInviteManage:update'))
		    		   opera += '<span style="float:left;" class="small-button edit" title="修改" onclick="userIntviteUpdateUserInfo('+id+','+idCard+')"></span>'
	    		   /*if(existPermission('admin:personnel:inviteManage:userInviteManage:delete'))
		    		   if(row.inviteFlag != 1){
		    			   opera += '<span style="float:left;" class="small-button delete" title="删除" onclick="userIntvitedeleteUserInfo('+id+','+userName+')"></span>';
		    		   }*/
		    	   if(existPermission('admin:personnel:inviteManage:userInviteManage:manage')){
		    		   if(row.inviteFlag == 0){
		    			   opera += '<span style="float:left;" class="small-button govern" title="录用" onclick="userInvite('+id+','+userName+','+employFlag+')"></span>';
		    		   }		    		   
		    	   }
		    	   opera += '</div>'
		    	   return opera;
		       }},
		       {field:"inviteFlag",title:"录用状态",fitColumns:true,resizable:true,align:"center",width:60,sortable:true,formatter:function(value,row,index){
		    	   var inviteFlag = row.inviteFlag;
		    	   if(inviteFlag == 1){
		    		   return '在职';
		    	   }else{
		    		   return '未聘用';
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
	})
	$('#userInviteManage .invitetop .selectUserInfo').click(function(){
		userInviteManageExcel = [
   		    {name:'userName',value:$('#userInviteManage .invitetop input[name=peopleName]').val()},
   			{name:'idCard',value:$('#userInviteManage .invitetop input[name=idCard]').val()},
   			{name:'departmentUrl',value:$('#userInviteManage .invitetop input[name=departmentUrl]').val()},
   			{name:'postId',value:$('#userInviteManage .invitetop input[name=postId]').val()},
   			{name:'inviteFlag',value:$('#userInviteManage .invitetop select[name=inviteFlag]').val()},
   			{name:'education',value:$('#userInviteManage .invitetop select[name=education]').val()},
   			{name:'politicalStatus',value:$('#userInviteManage .invitetop select[name=politicalStatus]').val()}
   		];
		$('#userInviteManagedg').datagrid({
			 url:'../../userInviteInfo/selectUserInfo.do?getMs='+getMS(),
			 queryParams: {
				userName: function(){
					return $('#userInviteManage .invitetop input[name=peopleName]').val();
				},
				idCard: function(){
					return $('#userInviteManage .invitetop input[name=idCard]').val();
				},
				departmentUrl: function(){
					return $('#userInviteManage .invitetop input[name=departmentUrl]').val();
				},
				postId:function(){
					return $('#userInviteManage .invitetop input[name=postId]').val();
				},
				inviteFlag: function(){
					return $('#userInviteManage .invitetop select[name=inviteFlag]').val();
				},
				education: function(){
					return $('#userInviteManage .invitetop select[name=education]').val();
				},
				politicalStatus: function(){
					return $('#userInviteManage .invitetop select[name=politicalStatus]').val();
				},
				workTimeStartStr: function(){
					return $('#userInviteManage .invitetop input[name=workTimeStartStr]').val();
				},
				workTimeEndStr: function(){
					return $('#userInviteManage .invitetop input[name=workTimeEndStr]').val();
				},				
			}
		});
	});
	
	/*****修改员工信息*****/
	//添加各种窗体内的点击事件
	userIntviteManageAddUpdateEvent()
	
	/************当点击读取身份证时，对身份证中的信息进行读取**************/
	$('#userInviteManage .read-idCard').click(function(){
		var result;
		//注意：第一个参数为对应的设备端口，USB型为1001-1016，串口型为1至16
		//第二个参数为文件保存路径及文件名，当为“”时，保存在系统临时目录(由API GetTempPath获得)
		//ReadCard函数调用示例如下：
		result=WidControl.ReadCard(1001,"C:\\wid\\photo.bmp");
		if (result==1){
			$('#userInviteManage .basicInformation input[name="peopleName"]').val(WidControl.GetName());
			$('#userInviteManage .basicInformation select[name="sex"]').val(WidControl.GetSexN());
			var idCard = WidControl.GetCode();
			var birthday = idCard.substring(6, 10) + '-' + idCard.substring(10, 12) + '-' +idCard.substring(12, 14);
			var validEnd = WidControl.GetValidEnd();
			var idCardValid = '';
			if(validEnd == "长期"){ //长期就变成2100-01-01
				idCardValid = "2100-01-01";
			}else{
				idCardValid = validEnd.substring(0, 4) + '-' + validEnd.substring(4, 6) + '-' +validEnd.substring(6, 8);
			}
			var validBegin = WidControl.GetValidBegin();
			var idCardIssued = validBegin.substring(0, 4) + '-' + validBegin.substring(4, 6) + '-' +validBegin.substring(6, 8);
			$('#userInviteManage .basicInformation input[name="birthday"]').val(birthday);
			$('#userInviteManage .basicInformation input[name="idCard"]').val(idCard);
			$('#userInviteManage .basicInformation input[name="idCardValid"]').val(idCardValid);
			$('#userInviteManage .basicInformation input[name="idCardIssued"]').val(idCardIssued);
			var address = $('#userInviteManage .basicInformation input[name="address"]').val();
			if(address == ''){
				$('#userInviteManage .basicInformation input[name="nativePlace"]').val(WidControl.GetAddress());
				$('#userInviteManage .basicInformation input[name="address"]').val(WidControl.GetAddress());
			}else{
				$('#userInviteManage .basicInformation input[name="nativePlace"]').val(WidControl.GetAddress());
			}
			if(WidControl.GetFolk() == '汉'){
				var volk = $('#userInviteManage .basicInformation select[name="volk"]').val(1);
			}else{
				$('#userInviteManage .basicInformation select[name="volk"]').val(2);
			}
			$('#userInviteManage .basicInformation .pic1').attr("src",'data:image/bmp;base64,' + WidControl.GetPhotobuf());
			$('#userInviteManage .basicInformation .pic2').attr("src",'data:image/bmp;base64,' + WidControl.GetFrontJPGBuf());
			$('#userInviteManage .basicInformation .pic3').attr("src",'data:image/bmp;base64,' + WidControl.GetBackJPGBuf());
			$('#userInviteManage .basicInformation input[name=pic1]').val(WidControl.GetPhotobuf());
			$('#userInviteManage .basicInformation input[name=pic2]').val(WidControl.GetFrontJPGBuf());
			$('#userInviteManage .basicInformation input[name=pic3]').val(WidControl.GetBackJPGBuf());
			//如果员工Id是空的，则对身份证号进行验证
			var id = $('#userInviteManage .staffRecord input[name=userId]').val();
			if(!id){
				userIntviteManageSelectData(null,'update',idCard);
			}
		}else{
			if (result==-1)
				windowControl("端口初始化失败！");
			if (result==-2)
				windowControl("请重新将卡片放到读卡器上！");
			if (result==-3)
				windowControl("读取数据失败！");
			if (result==-4)
				windowControl("生成照片文件失败，请检查设定路径和磁盘空间！");
			if(result == -5)
				windowControl("加载动态库失败");
		}
	});
	
	//添加员工点击事件
	$('#userInviteManage .expsame .addMessage').click(function(){
		var userName = $('#userInviteManage .basicInformation input[name="peopleName"]').val();
		var departmentName = $('#userInviteManage .basicInformation input[name="departmentName"]').val();
		var departmentUrl = $('#userInviteManage .basicInformation input[name="departmentUrl"]').val();
		var postName = $('#userInviteManage .basicInformation input[name="postName"]').val();
		var postId = $('#userInviteManage .basicInformation input[name="postId"]').val();
		var phoneNum = $('#userInviteManage .basicInformation input[name="phoneNum"]').val();
		var accidentPhoneNum = $('#userInviteManage .basicInformation input[name="accidentPhoneNum"]').val();
		var birthday = $('#userInviteManage .basicInformation input[name="birthday"]').val();
		var idCard = $('#userInviteManage .basicInformation input[name="idCard"]').val();
		var sex = $('#userInviteManage .basicInformation select[name="sex"]').val();
		var address = $('#userInviteManage .basicInformation input[name="address"]').val();
		var education = $('#userInviteManage .basicInformation select[name="education"]').val();
		var volk = $('#userInviteManage .basicInformation select[name="volk"]').val();
		var nativePlace = $('#userInviteManage .basicInformation input[name="nativePlace"]').val();
		var politicalStatus = $('#userInviteManage .basicInformation select[name="politicalStatus"]').val();
		var marriageFlag = $('#userInviteManage .basicInformation select[name="marriageFlag"]').val();
		var diseaseHistoryFlag = $('#userInviteManage .basicInformation select[name="diseaseHistoryFlag"]').val();
		var diseaseHistory = $('#userInviteManage .basicInformation input[name="diseaseHistory"]').val();
		var englishLevel = $('#userInviteManage .basicInformation input[name="englishLevel"]').val();//外语水平
		var idCardValid = $('#userInviteManage .staffRecord .basicInformation input[name="idCardValid"]').val();//身份证有效日期
		var idCardIssued = $('#userInviteManage .staffRecord .basicInformation input[name="idCardIssued"]').val();//身份证发证日期
		
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
		}else if(politicalStatus == null || politicalStatus == ''){
			windowControl('政治面貌不能为空');
			return ;
		}else if(phoneNum == null || phoneNum ==''){
			windowControl('联系方式不能为空');
			return ;
		}else if(departmentUrl == null || departmentUrl ==''){
			windowControl('所属部门不能为空');
			return ;
		}else if(postId == null || postId ==''){
			windowControl('所属岗位不能为空');
			return ;
		}
		$.ajax({
			url:'../../dimission/selectUserMaxDimissionTime.do?getMs='+getMS(),
			data:{
				idCard:idCard
			},
			type:'post',
			success:function(data){
				var obj = eval('(' + data + ')');
				if(obj != null){
					windowControl("招聘的员工曾在公司离职过，交由人事部经理审批才可录用！");	
					addUser('1');
				}else{
					addUser('0');
				}
			}
		});
		function addUser(employFlag){
			$.ajax({
				url:'../../userInviteInfo/saveUserInfo.do?getMs='+getMS(),
				data:{
					userName:userName,
					departmentName:departmentName,
					departmentUrl:departmentUrl,
					postName:postName,
					postId:postId,
					phoneNum:phoneNum,
					accidentPhoneNum:accidentPhoneNum,
					birthdayStr:birthday,
					idCard:idCard,
					sex:sex,
					address:address,
					education:education,
					volk:volk,
					nativePlace:nativePlace,
					politicalStatus:politicalStatus,
					marriageFlag:marriageFlag,
					inviteFlag:'0',
					englishLevel:englishLevel,
					idCardValid:idCardValid,
					idCardIssued:idCardIssued,
					diseaseHistoryFlag:diseaseHistoryFlag,
					diseaseHistory:diseaseHistory,
					photoBase: $('#userInviteManage .basicInformation input[name=pic1]').val(),
					idCardUpImgBase: $('#userInviteManage .basicInformation input[name=pic2]').val(),
					idCardDownImgBase: $('#userInviteManage .basicInformation input[name=pic3]').val(),
					employFlag:employFlag,
				},
				type:'post',
				success:function(data){
					if(data == 400){
						windowControl("数据添加失败");
					}else if(data == 500){
						windowControl("数据添加失败");
					}else{
						$('#userInviteManage .staffRecord .basicInformation .addMessage').parent().css('display','none');		
						$('#userInviteManage .staffRecord .basicInformation .updateMessage').parent().css('display','block');	
						windowControl("添加数据成功");	
						$('#userInviteManage .staffRecord input[name=userId]').val(data);
					}
				}	
			});
		}
		
	});
	//下一位员工
	$('#userInviteManage .staffRecord .basicInformation .next').click(function(){
		ui.confirm('是否确定添加下一位员工？',function(z){
			if(z){
				$('#userInviteManage .expsame .addMessage').parent().css('display','block');
				$('#userInviteManage .expsame .updateMessage').parent().css('display','none');
				$('#userInviteManage .staffRecord .otherInfo .display-otherInfo').html('');
				$('#userInviteManage .staffRecord .work .display-work').html('');
				$('#userInviteManage .staffRecord .edu .display-edu').html('');
				$('#userInviteManage .staffRecord .dispatch').hide();
				$('#userInviteManage .staffRecord .userdimission').hide();				
				$('#userInviteManage .staffRecord .basic').find('input').not("input[type=button]").val(null);
				$('#userInviteManage .staffRecord .basic').find('select').val(null);
				$('#userInviteManage .staffRecord .idCard-img input').val(null);
				$('#userInviteManage .staffRecord .idCard-img img').attr('src',null);
				$('#userInviteManage .basicInformation input[name="idCard"]').blur(function(){
					//验证该员工是否在此工作过
					var idCard = $('#userInviteManage .basicInformation input[name="idCard"]').val();
					if(!idCard) return ;
					userIntviteManageSelectData(null,'update',idCard);
				});
			}
		})
	});
	/*********添加员工开启页面时，添加选择部门与岗位的点击事件*********/
	//选择部门
	$('#userInviteManage .basicInformation .chooseDept').click(function(){
		chooseDept();
	    $('#chooseDept .confirm').click(function(){
	    	$('#chooseDept').css('display','none');
	    	var chooseDept = $('#chooseDept .dept').tree('getSelected');
	    	$('#userInviteManage .basicInformation input[name=departmentName]').val(chooseDept.text);
	    	$('#userInviteManage .basicInformation input[name=departmentUrl]').val(chooseDept.id);
	    	$('#chooseDept .confirm').unbind();
	    })
	});
	//选择岗位
	$('#userInviteManage .basicInformation .choosePost').click(function(){
		choosePost();
		$('#choosePost .confirm').click(function(){
	    	$('#choosePost').css('display','none');
	    	var selectPost = $('#choosePost .popuparea .post').datagrid('getSelections');
	    	$('#userInviteManage .basicInformation input[name=postName]').val(selectPost[0].postName);
	    	$('#userInviteManage .basicInformation input[name=postId]').val(selectPost[0].postId);
	    	$('#choosePost .confirm').unbind();
	    })
	});
})

/*-------------------点击修改员工信息-----------------*/
function userIntviteUpdateUserInfo(id,idcard){
	//必填* 出现
	$('#userInviteManage .userInfo .basic table span').css('display','inline');
	//设定该页面的userID
	$('#userInviteManage .staffRecord input[name=userId]').val(id);
	//切换显示的页面
	$('#userInviteManage .staffRecord').css('display','block');
	$('#userInviteManage .main').css('display','none');
	//打开添加窗口
	$('#userInviteManage .staffRecord .otherInfo').css('display','block');
	$('#userInviteManage .staffRecord .work').css('display','block');
	$('#userInviteManage .staffRecord .edu').css('display','block');
	//打开添加窗口
	$('#userInviteManage .staffRecord .otherInfo .otherInfo-table').css('display','block');
	$('#userInviteManage .staffRecord .work .work-table').css('display','block');
	$('#userInviteManage .staffRecord .edu .edu-table').css('display','block');
	//解除锁定输入
	$('#userInviteManage .staffRecord .userInfo .cap').hide();
	//打开添加修改按钮
	$('#userInviteManage .staffRecord .addexp').parent().css('display','block');
	$('#userInviteManage .staffRecord .updateexp').parent().css('display','none');
	//如果id为空，则添加员工，如果不为空则修改员工信息
	if(id){
		$('#userInviteManage .staffRecord .basicInformation .read-idCard').css('display','inline');
		$('#userInviteManage .staffRecord .basicInformation .next').css('display','none');
		//打开修改按钮
		$('#userInviteManage .staffRecord .basicInformation .addMessage').parent().css('display','none');		
		$('#userInviteManage .staffRecord .basicInformation .updateMessage').parent().css('display','block');
		$('#userInviteManage .staffRecord .basicInformation .next').css('display','none');
		//解绑身份证验证
		$('#userInviteManage .staffRecord .basicInformation input[name=idCard]').unbind();
		userIntviteManageSelectData(id,'update', idcard);
	}else{
		$('#userInviteManage .staffRecord .basicInformation .read-idCard').css('display','inline');
		$('#userInviteManage .staffRecord .basicInformation .next').css('display','inline');
		//打开添加按钮
		$('#userInviteManage .staffRecord .basicInformation .addMessage').parent().css('display','block');
		$('#userInviteManage .staffRecord .basicInformation .updateMessage').parent().css('display','none');
		$('#userInviteManage .basicInformation .chooseDept').removeAttr('disabled');
		$('#userInviteManage .basicInformation .choosePost').removeAttr('disabled');
		/********当用户输入了员工的身份证号码的时候进行触发**********/
		$('#userInviteManage .basicInformation input[name="idCard"]').unbind();
		$('#userInviteManage .basicInformation input[name="idCard"]').blur(function(){
			//验证该员工是否在此工作过
			var idCard = $('#userInviteManage .basicInformation input[name="idCard"]').val();
			if(!idCard) return ;
			userIntviteManageSelectData(null,'update',idCard);
		});
	}
}
/*-------------------点击查看员工信息-----------------*/
function userIntviteLookUserInfo(id,idcard){
	//必填* 消失
	$('#userInviteManage .userInfo .basic table span').css('display','none');
	//设定该页面的userID
	$('#userInviteManage .staffRecord input[name=userId]').val(id);
	//关闭添加窗口
	$('#userInviteManage .staffRecord .otherInfo').css('display','none');
	$('#userInviteManage .staffRecord .work').css('display','none');
	$('#userInviteManage .staffRecord .edu').css('display','none');
	//关闭添加窗口
	$('#userInviteManage .staffRecord .otherInfo .otherInfo-table').css('display','none');
	$('#userInviteManage .staffRecord .work .work-table').css('display','none');
	$('#userInviteManage .staffRecord .edu .edu-table').css('display','none');
	//关闭添加修改按钮
	$('#userInviteManage .staffRecord .addexp').parent().css('display','none');
	$('#userInviteManage .staffRecord .updateexp').parent().css('display','none');
	//切换显示的页面
	$('#userInviteManage .staffRecord').css('display','block');
	$('#userInviteManage .main').css('display','none');
	//取消身份证的验证
	$('#userInviteManage .staffRecord .basicInformation input[name=idCard]').unbind();
	//关闭下一位员工及读取身份证
	$('#userInviteManage .staffRecord .next').css('display','none');
	$('#userInviteManage .staffRecord .read-idCard').css('display','none');
	//锁定输入，不可修改
	$('#userInviteManage .staffRecord .userInfo .cap').show();
	//填充数据
	userIntviteManageSelectData(id,'look',idcard);
}

//查询员工信息
function userIntviteManageSelectData(id,flag,idCard){
	var url = '';
	if(id)
		url = '../../userInviteInfo/selectUserInfo.do?getMs='+getMS();
	else
		url = '../../userInfo/selectUserInfo.do?getMs='+getMS();
	/***获取基本信息****/
	$.ajax({
		url:url,
		data:{
			userId:id,
			idCard:idCard
		},
		type:'post',
		success:function(data){
			var rows = eval('('+data+')').rows;
			if(rows.length == 0) return ;
			var obj = rows[0];			
			if(id){
				$('#userInviteManage .staffRecord .basicInformation input[name="userAccount"]').val(obj.userAccount);
				$('#userInviteManage .staffRecord .basicInformation input[name="peopleName"]').val(obj.userName);
				$('#userInviteManage .staffRecord .basicInformation input[name="departmentName"]').val(obj.departmentName);
				$('#userInviteManage .staffRecord .basicInformation input[name="departmentUrl"]').val(obj.departmentUrl);
				$('#userInviteManage .staffRecord .basicInformation input[name="postName"]').val(obj.postName);
				$('#userInviteManage .staffRecord .basicInformation input[name="postId"]').val(obj.postId);
				$('#userInviteManage .staffRecord .basicInformation input[name="phoneNum"]').val(obj.phoneNum);
				$('#userInviteManage .staffRecord .basicInformation input[name="accidentPhoneNum"]').val(obj.accidentPhoneNum);
				$('#userInviteManage .staffRecord .basicInformation input[name="birthday"]').val(obj.birthdayStr);
				$('#userInviteManage .staffRecord .basicInformation input[name="idCard"]').val(obj.idCard);
				$('#userInviteManage .staffRecord .basicInformation select[name="sex"]').val(obj.sex);
				$('#userInviteManage .staffRecord .basicInformation input[name="workTime"]').val(obj.workTimeStr);
				$('#userInviteManage .staffRecord .basicInformation input[name="address"]').val(obj.address);
				$('#userInviteManage .staffRecord .basicInformation select[name="leaderFlag"]').val(obj.leaderFlag);
				$('#userInviteManage .staffRecord .basicInformation select[name="education"]').val(obj.education);
				$('#userInviteManage .staffRecord .basicInformation select[name="volk"]').val(obj.volk);
				$('#userInviteManage .staffRecord .basicInformation select[name="politicalStatus"]').val(obj.politicalStatus);
				$('#userInviteManage .staffRecord .basicInformation input[name="nativePlace"]').val(obj.nativePlace);
				$('#userInviteManage .staffRecord .basicInformation select[name="marriageFlag"]').val(obj.marriageFlag);
				$('#userInviteManage .staffRecord .basicInformation select[name="diseaseHistoryFlag"]').val(obj.diseaseHistoryFlag);
				$('#userInviteManage .staffRecord .basicInformation input[name="diseaseHistory"]').val(obj.diseaseHistory);			
				$('#userInviteManage .staffRecord .basicInformation input[name="wageAccount"]').val(obj.wageAccount);
				$('#userInviteManage .staffRecord .basicInformation input[name="englishLevel"]').val(obj.englishLevel);
				$('#userInviteManage .staffRecord .basicInformation input[name="idCardValid"]').val(obj.idCardValid);
				$('#userInviteManage .staffRecord .basicInformation input[name="idCardIssued"]').val(obj.idCardIssued);
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
							$('#userInviteManage .basicInformation input[name=leadId]').val(obj.userId);
				        	$('#userInviteManage .basicInformation input[name=leadName]').val(obj.userName);
						}			
					}
				});
				Record();
			}else{
				for(var i = 0 ; i < rows.length ; i++){
					var inviteFlag = rows[i].inviteFlag;
					if(inviteFlag == '1' || inviteFlag == '4' || inviteFlag == '5'){
						windowControl('该员工为在职员工，无法进行录用');	
						break ;
					}else if(inviteFlag == '2'){
						windowControl('该员工曾在本公司离职，但未办理手续，离职记录和调动记录已自动导入');
						break;
					}else if(inviteFlag == '3'){
						windowControl('该员工曾在本公司离职，离职记录和调动记录已自动导入');
						break;
					}
				}
				Record();
				//解绑身份证验证
				if(inviteFlag == '1' || inviteFlag == '4' || inviteFlag == '5'){
					$('#userInviteManage .staffRecord .basicInformation .addMessage').parent().css('display','none');
				}else{
					$('#userInviteManage .staffRecord .basicInformation .addMessage').parent().css('display','block');
				}
				$('#userInviteManage .staffRecord .basicInformation .updateMessage').parent().css('display','none');
			}
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
					$('#userInviteManage .staffRecord .userdimission').hide();
				}else{
					$('#userInviteManage .staffRecord .userdimission').css('display','block');
				}
				$('#userInviteManage .staffRecord .userdimission .display-dimission').html('');			
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
					var html =  '<table style="text-align:right;height:50px;width:100%;">'
						+'<tr><td></td><td></td><td></td><td></td><td></td></tr>'
						+'<tr>'
						+'<td style="width:9.3%;">离职类型：</td>'
						+'<td style="width:26.2%;text-align:left;">'+ obj[i].dimissionFlag +'</td>'
						+'<td style="width:15%;">离职时间：</td>'
						+'<td style="width:26.2%;text-align:left;">'+ obj[i].dimissionTime +'</td>'
						+'</tr>'
						+'<tr>'
						+'<td style="width:9.3%;">备注：</td>'
						+'<td style="width:26.2%;text-align:left;">'+ obj[i].remark +'</td>'
						+'<td style="width:15%;"></td>'
						+'<td style="width:26.2%;text-align:left;"></td>'
						+'</tr>'
					html += '</table>';
					if(i == obj.length-1){
						html = html;
					}else{
						html = html + '<hr/>';
					}
					$('#userInviteManage .staffRecord .userdimission .display-dimission').append(html);
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
					$('#userInviteManage .staffRecord .dispatch').hide();
				}else{
					$('#userInviteManage .staffRecord .dispatch').css('display','block');
					
				}
				$('#userInviteManage .staffRecord .dispatch .display-dispatch').html('');			
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
					$('#userInviteManage .staffRecord .dispatch .display-dispatch').append(html);
				}
			}
		});
	}
 	//如果id为空，是添加
	if(id){
		/***获取其他信息****/
		$.ajax({
			url:'../../userInfo/selectOtherInfo.do?getMs='+getMS(),
			data:{
				userId:id
			},
			type:'post',
			success:function(data){
				var obj = eval('('+data+')');
				if(flag == 'look' && obj.length == 0){
					$('#userInviteManage .staffRecord .otherInfo').css('display','none');
				}else{
					$('#userInviteManage .staffRecord .otherInfo').css('display','block');
				}
				for(var i = 0;i<obj.length;i++){
					var html = '<table style="text-align:right;height:50px;width:100%;">'
						+'<tr><td></td><td></td><td></td><td></td><td></td></tr>'
						+'<tr>'
							+'<td style="width:9.3%;">信息名：</td>'
							+'<td style="width:26.2%;text-align:left;">'+ obj[i].type +'</td>'
							+'<td style="width:15%;">信息内容：</td>'
							+'<td style="width:26.2%;text-align:left;">'+ obj[i].message +'</td>'
							+'<td>'
					if(flag == 'update'){
						html += '<input style="display:none"/>'
								+'<label>修改<span class="small-button edit"></span></label>'
								+'<label>删除<span class="small-button delete"></span></label>';
					}
								
					html += '</td></tr></table>';
					if(i != obj.length-1){
						html = html + '<hr/>';
					}else if(flag == 'update'){
						html = html + '<hr/>';
					}
					$('#userInviteManage .otherInfo .display-otherInfo').append(html);
					$('#userInviteManage .otherInfo .display-otherInfo').find("table:last input").val(obj[i].userInfoOtherId);
				}
				userIntviteAddOtherInfoEven();
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
					$('#userInviteManage .staffRecord .work').css('display','none');
				}else{
					$('#userInviteManage .staffRecord .work').css('display','block');
				}
				for(var i = 0;i<obj.length;i++){
					var html = '<table>'
						+'<tr><td width="240px"></td><td width="800px"></td><td width="800px"></td><td width="800px"></td></tr>'
						+'<tr height="40px"><td colspan="1" style="text-align: right;">公司名称：</td><td colspan="2">'+obj[i].componyName+'</td>'
						+'<td style="text-align:right"><input style="display:none"/>';
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
					$('#userInviteManage .staffRecord .work .display-work').append(html);
					$('#userInviteManage .staffRecord .work .display-work').find("table:last input").val(obj[i].workId);
				}
				userIntviteAddWorkEvent();
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
					$('#userInviteManage .staffRecord .edu').css('display','none');
				}else{
					$('#userInviteManage .staffRecord .edu').css('display','block');
				}
				for(var i = 0;i<obj.length;i++){
					var html = '<table>'
						+'<tr><td width="240px"></td><td width="800px"></td><td width="800px"></td><td width="800px"></td></tr>'
						+'<tr height="40px"><td colspan="1" style="text-align: right;">学校名称：</td><td colspan="2">'+obj[i].schoolName+'</td>'
						+'<td style="text-align:right"><input style="display:none"/>';
					if(flag == 'update'){
						html = html + '<label>修改<span class="small-button edit"></span></label><label>删除<span class="small-button delete"></span></label>';
					}	
					html = html +'</td></tr>'
						+'<tr height="40px"><td style="text-align: right;">入学时间：</td><td>'+obj[i].startTimeStr+'</td><td style="text-align: right;">毕业时间：</td><td>'+obj[i].endTimeStr+'</td></tr>'
						+'<tr height="40px"><td colspan="1" style="text-align: right;">专业名称：</td><td colspan="3">'+obj[i].specialty+'</td></tr>'
						+'</table>';
					if(i != obj.length-1){
						html = html + '<hr/>';
					}else if(flag == 'update'){
						html = html + '<hr/>';
					}
					$('#userInviteManage .staffRecord .edu .display-edu').append(html);
					$('#userInviteManage .staffRecord .edu .display-edu').find("table:last input").val(obj[i].educationId);
				}
				userIntviteAddEduEvent();
			}
		});
		
	}
	
}
/**********************************添加页面所需的各种事件**************************************/
//添加修改和删除所需的点击事件
function userIntviteManageAddUpdateEvent(){
	//====================================修改信息页面中的各种点击事件================================================
	/********当用户点击保存基本信息时的点击事件*******/
	$('#userInviteManage .staffRecord .expsame .updateMessage').click(function(){
		var userId = $('#userInviteManage .staffRecord input[name=userId]').val();
		var userName = $('#userInviteManage .staffRecord .basicInformation input[name="peopleName"]').val();
		var departmentName = $('#userInviteManage .basicInformation input[name="departmentName"]').val();
		var departmentUrl = $('#userInviteManage .basicInformation input[name="departmentUrl"]').val();
		var postName = $('#userInviteManage .basicInformation input[name="postName"]').val();
		var postId = $('#userInviteManage .basicInformation input[name="postId"]').val();
		var phoneNum = $('#userInviteManage .staffRecord .basicInformation input[name="phoneNum"]').val();
		var accidentPhoneNum = $('#userInviteManage .staffRecord .basicInformation input[name="accidentPhoneNum"]').val();
		var birthday = $('#userInviteManage .staffRecord .basicInformation input[name="birthday"]').val();
		var idCard = $('#userInviteManage .staffRecord .basicInformation input[name="idCard"]').val();
		var sex = $('#userInviteManage .staffRecord .basicInformation select[name="sex"]').val();
		var address = $('#userInviteManage .staffRecord .basicInformation input[name="address"]').val();
		var education = $('#userInviteManage .staffRecord .basicInformation select[name="education"]').val();
		var volk = $('#userInviteManage .staffRecord .basicInformation select[name="volk"]').val();
		var nativePlace = $('#userInviteManage .staffRecord .basicInformation input[name="nativePlace"]').val();
		var politicalStatus = $('#userInviteManage .staffRecord .basicInformation select[name="politicalStatus"]').val();
		var marriageFlag = $('#userInviteManage .staffRecord .basicInformation select[name="marriageFlag"]').val();
		var diseaseHistoryFlag = $('#userInviteManage .staffRecord .basicInformation select[name="diseaseHistoryFlag"]').val();
		var diseaseHistory = $('#userInviteManage .staffRecord .basicInformation input[name="diseaseHistory"]').val();
		
		var englishLevel = $('#userInviteManage .staffRecord .basicInformation input[name="englishLevel"]').val();//外语水平
		var idCardValid = $('#userInviteManage .staffRecord .basicInformation input[name="idCardValid"]').val();//身份证有效日期
		var idCardIssued = $('#userInviteManage .staffRecord .basicInformation input[name="idCardIssued"]').val();//身份证发证日期
		
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
		}else if(politicalStatus == null || politicalStatus == ''){
			windowControl('政治面貌不能为空');
			return ;
		}else if(phoneNum == null || phoneNum ==''){
			windowControl('联系方式不能为空');
			return ;
		}else if(departmentUrl == null || departmentUrl ==''){
			windowControl('所属部门不能为空');
			return ;
		}else if(postId == null || postId ==''){
			windowControl('所属岗位不能为空');
			return ;
		}
		
		$.ajax({
			url:'../../userInviteInfo/updateUserInfo.do?getMs='+getMS(),
			data:{
				userId:userId,
				userName:userName,
				phoneNum:phoneNum,
				accidentPhoneNum:accidentPhoneNum,
				birthdayStr:birthday,
				idCard:idCard,
				sex:sex,
				address:address,
				education:education,
				volk:volk,
				nativePlace:nativePlace,
				politicalStatus:politicalStatus,
				marriageFlag:marriageFlag,
				englishLevel:englishLevel,
				idCardValid:idCardValid,
				idCardIssued:idCardIssued,
				diseaseHistoryFlag:diseaseHistoryFlag,
				diseaseHistory:diseaseHistory,
				departmentName:departmentName,
				departmentId:departmentUrl,
				postName:postName,
				postId:postId,
				photoBase: $('#userInviteManage .basicInformation input[name=pic1]').val(),
				idCardUpImgBase: $('#userInviteManage .basicInformation input[name=pic2]').val(),
				idCardDownImgBase: $('#userInviteManage .basicInformation input[name=pic3]').val(),
			},
			type:'post',
			success:function(data){
				if(data == 400){
					windowControl("修改员工基本信息失败");
				}else if(data == 500){
					windowControl("修改员工基本信息失败");
				}else{
					windowControl("修改员工基本信息成功");
				}
			}
		});
	});
	
	/******保存额外信息按钮点击事件，保存额外信息，并且显示出保存成功的额外信息******/
	$('#userInviteManage .staffRecord .otherInfo .addexp').click(function(){
		var userId = $('#userInviteManage .staffRecord input[name=userId]').val();		
		var otherInfoName = $('#userInviteManage .staffRecord .otherInfo input[name=otherInfoName]').val();
		var otherInfoContent = $('#userInviteManage .staffRecord .otherInfo input[name=otherInfoContent]').val();
		if(userId == null || userId == ''){
			windowControl("请先保存员工基本信息");
			return ;
		}else if(otherInfoName == null || otherInfoName == ''){
			windowControl('信息名称不能为空');
			return ;
		}else if(otherInfoContent == null || otherInfoContent == ''){
			windowControl('信息内容不能为空');
			return ;
		}
		$.ajax({
			url:'../../userInfo/addOtherInfo.do?getMs='+getMS(),
			type:'post',
			data:{
				userId:userId,
				type:otherInfoName,
				message:otherInfoContent
			},
			success:function(data){
				if(data == 400){
					windowControl('额外信息添加失败');
				}else if(data == 500){
					windowControl('额外信息添加失败');
				}else{
					var html = '<table style="text-align:right;height:50px;width:100%;">'
						+'<tr><td></td><td></td><td></td><td></td><td></td></tr>'
						+'<tr>'
							+'<td style="width:9.3%;">信息名：</td>'
							+'<td style="width:26.2%;text-align:left;">'+ otherInfoName +'</td>'
							+'<td style="width:15%;">信息内容：</td>'
							+'<td style="width:26.2%;text-align:left;">'+ otherInfoContent +'</td>'
							+'<td>'
							+'<input style="display:none"/>'
								+'<label>修改<span class="small-button edit"></span></label>'
								+'<label>删除<span class="small-button delete"></span></label>'
							+'</td>'
						+'</tr>'
						+'</table><hr />';
					$('#userInviteManage .staffRecord .otherInfo .display-otherInfo').append(html);
					$('#userInviteManage .staffRecord .otherInfo .otherInfo-table input').val(null);
					$('#userInviteManage .staffRecord .otherInfo .display-otherInfo').find("table:last input").val(data);
					//添加删除修改点击事件
					userIntviteAddOtherInfoEven();
				}
			}
		});
	});
	/******按钮点击事件，修改额外信息，并且显示出保存成功的额外信息******/
	$('#userInviteManage .staffRecord .otherInfo .updateexp').click(function(){
		var userInfoOtherId = $('#userInviteManage .staffRecord .otherInfo input[name=userInfoOtherId]').val();
		var userId = $('#userInviteManage .staffRecord input[name=userId]').val();
		var otherInfoName = $('#userInviteManage .staffRecord .otherInfo input[name=otherInfoName]').val();
		var otherInfoContent = $('#userInviteManage .staffRecord .otherInfo input[name=otherInfoContent]').val();;
		
		if(userId == null || userId == ''){
			windowControl("请先保存员工基本信息");
			return ;
		}else if(otherInfoName == null || otherInfoName == ''){
			windowControl('信息名称不能为空');
			return ;
		}else if(otherInfoContent == null || otherInfoContent == ''){
			windowControl('信息内容不能为空');
			return ;
		}else if(userInfoOtherId == null || userInfoOtherId == ''){
			windowControl('修改信息异常');
			return ;
		}
		
		$.ajax({
			url:'../../userInfo/updateOtherInfo.do?getMs='+getMS(),
			data:{
				userId:userId,
				type:otherInfoName,
				message:otherInfoContent,
				userInfoOtherId:userInfoOtherId
			},
			type:'post',
			success:function(data){
				if(data == 400 || data == 500){
					windowControl('修改员工工作信息失败');
					return ;
				}
				var html = '<table style="text-align:right;height:50px;width:100%;">'
					+'<tr><td></td><td></td><td></td><td></td><td></td></tr>'
					+'<tr>'
						+'<td style="width:9.3%;">信息名：</td>'
						+'<td style="width:26.2%;text-align:left;">'+ otherInfoName +'</td>'
						+'<td style="width:15%;">信息内容：</td>'
						+'<td style="width:26.2%;text-align:left;">'+ otherInfoContent +'</td>'
						+'<td>'
						+'<input style="display:none"/>'
							+'<label>修改<span class="small-button edit"></span></label>'
							+'<label>删除<span class="small-button delete"></span></label>'
						+'</td>'
					+'</tr>'
					+'</table><hr />';
				$('#userInviteManage .staffRecord .otherInfo .display-otherInfo').append(html);
				$('#userInviteManage .staffRecord .otherInfo .otherInfo-table input').val(null);
				$('#userInviteManage .staffRecord .otherInfo .display-otherInfo').find("table:last input").val(userInfoOtherId);
				$('#userInviteManage .staffRecord .otherInfo .addexp').parent().css('display','block');
				$('#userInviteManage .staffRecord .otherInfo .updateexp').parent().css('display','none');
				//添加删除修改点击事件
				userIntviteAddOtherInfoEven();
			}
		})
	});
	
	
	/******保存工作经历按钮点击事件，保存工作经历，并且显示出保存成功的工作经历******/
	$('#userInviteManage .staffRecord .work .addexp').click(function(){
		var userId = $('#userInviteManage .staffRecord input[name=userId]').val();
		var postName = $('#userInviteManage .staffRecord .work input[name=postName]').val();
		var componyName = $('#userInviteManage .staffRecord .work input[name=componyName]').val();
		var startTime = $('#userInviteManage .staffRecord .work input[name=startTime]').val();
		var endTime = $('#userInviteManage .staffRecord .work input[name=endTime]').val();
		var workDescribe = $('#userInviteManage .staffRecord .work textarea[name=workDescribe]').val();
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
					$('#userInviteManage .staffRecord .work .display-work').append(html);
					$('#userInviteManage .staffRecord .work .work-table input').val(null);
					$('#userInviteManage .staffRecord .work .work-table textarea').val(null);
					$('#userInviteManage .staffRecord .work .display-work').find("table:last input").val(data);
					/************************修改点击事件***********************/
					$('#userInviteManage .staffRecord .work .display-work table label .edit').click(function(){
						var id = $(this).parent().parent().find('input').val();
						var thisDom = $(this);
						$.ajax({
							url:'../../userInfo/selectWork.do?getMs='+getMS(),
							data:{
								workId:id
							},
							success:function(data){
								var obj = eval('('+data+')').rows[0];
								$('#userInviteManage .staffRecord .work input[name=workId]').val(obj.workId);
								$('#userInviteManage .staffRecord input[name=userId]').val(obj.userId);
								$('#userInviteManage .staffRecord .work input[name=postName]').val(obj.postName);
								$('#userInviteManage .staffRecord .work input[name=componyName]').val(obj.componyName);
								$('#userInviteManage .staffRecord .work input[name=startTime]').val(obj.startTimeStr);
								$('#userInviteManage .staffRecord .work input[name=endTime]').val(obj.endTimeStr);
								$('#userInviteManage .staffRecord .work textarea[name=workDescribe]').val(obj.workDescribe);
								$('#userInviteManage .staffRecord .work .addexp').parent().css('display','none');
								$('#userInviteManage .staffRecord .work .updateexp').parent().css('display','block');
								thisDom.parents('table').next().remove();
								thisDom.parents('table').remove();
							}
						});
					});
					
					/************************删除工作 点击事件***********************/
					$('#userInviteManage .staffRecord .work .display-work table label .delete').click(function(){
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
	$('#userInviteManage .staffRecord .work .updateexp').click(function(){
		var userId = $('#userInviteManage .staffRecord input[name=userId]').val();
		var workId = $('#userInviteManage .staffRecord input[name=workId]').val();
		var postName = $('#userInviteManage .staffRecord .work input[name=postName]').val();
		var componyName = $('#userInviteManage .staffRecord .work input[name=componyName]').val();
		var startTime = $('#userInviteManage .staffRecord .work input[name=startTime]').val();
		var endTime = $('#userInviteManage .staffRecord .work input[name=endTime]').val();
		var workDescribe = $('#userInviteManage .staffRecord .work textarea[name=workDescribe]').val();
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
				$('#userInviteManage .staffRecord .work .display-work').append(html);
				$('#userInviteManage .staffRecord .work .work-table input').val(null);
				$('#userInviteManage .staffRecord .work .work-table textarea').val(null);
				$('#userInviteManage .staffRecord .work .display-work').find("table:last input").val(workId);
				$('#userInviteManage .staffRecord .work .addexp').parent().css('display','block');
				$('#userInviteManage .staffRecord .work .updateexp').parent().css('display','none');
				
				/************************修改点击事件***********************/
				$('#userInviteManage .staffRecord .work .display-work table label .edit').click(function(){
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
							$('#userInviteManage .staffRecord .work input[name=workId]').val(obj.workId);
							$('#userInviteManage .staffRecord input[name=userId]').val(obj.userId);
							$('#userInviteManage .staffRecord .work input[name=postName]').val(obj.postName);
							$('#userInviteManage .staffRecord .work input[name=componyName]').val(obj.componyName);
							$('#userInviteManage .staffRecord .work input[name=startTime]').val(obj.startTimeStr);
							$('#userInviteManage .staffRecord .work input[name=endTime]').val(obj.endTimeStr);
							$('#userInviteManage .staffRecord .work textarea[name=workDescribe]').val(obj.workDescribe);
							$('#userInviteManage .staffRecord .work .addexp').parent().css('display','none');
							$('#userInviteManage .staffRecord .work .updateexp').parent().css('display','block');
							thisDom.parents('table').next().remove();
							thisDom.parents('table').remove();
						}
					});
				});
				
				/************************删除工作 点击事件***********************/
				$('#userInviteManage .staffRecord .work .display-work table label .delete').click(function(){
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
	
	/******教育经历按钮点击事件，保存工教育经历，并且显示出保存成功的教育经历******/
	$('#userInviteManage .staffRecord .edu .addexp').click(function(){
		var userId = $('#userInviteManage .staffRecord input[name=userId]').val();
		var schoolName = $('#userInviteManage .staffRecord .edu input[name=schoolName]').val();
		var startTime = $('#userInviteManage .staffRecord .edu input[name=startTime]').val();
		var endTime = $('#userInviteManage .staffRecord .edu input[name=endTime]').val();
		var specialty = $('#userInviteManage .staffRecord .edu input[name=specialty]').val();
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
					$('#userInviteManage .staffRecord .edu .display-edu').append(html);
					$('#userInviteManage .staffRecord .edu .edu-table input').val(null);
					$('#userInviteManage .staffRecord .edu .display-edu').find("table:last input").val(data);
					/************************修改点击事件***********************/
					$('#userInviteManage .staffRecord .edu .display-edu table label .edit').click(function(){
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
								$('#userInviteManage .staffRecord .edu input[name=eduId]').val(id);
								$('#userInviteManage .staffRecord .edu input[name=schoolName]').val(obj.schoolName);
								$('#userInviteManage .staffRecord .edu input[name=specialty]').val(obj.specialty);
								$('#userInviteManage .staffRecord .edu input[name=startTime]').val(obj.startTimeStr);
								$('#userInviteManage .staffRecord .edu input[name=endTime]').val(obj.endTimeStr);
								$('#userInviteManage .staffRecord .edu .addexp').parent().css('display','none');
								$('#userInviteManage .staffRecord .edu .updateexp').parent().css('display','block');
								thisDom.parents('table').next().remove();
								thisDom.parents('table').remove();
							},
						})
					});
					
					/************************删除教育 信息***********************/
					$('#userInviteManage .staffRecord .edu .display-edu table label .delete').click(function(){
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
	$('#userInviteManage .staffRecord .edu .updateexp').click(function(){
		var userId = $('#userInviteManage .staffRecord input[name=userId]').val();
		var schoolName = $('#userInviteManage .staffRecord .edu input[name=schoolName]').val();
		var startTime = $('#userInviteManage .staffRecord .edu input[name=startTime]').val();
		var endTime = $('#userInviteManage .staffRecord .edu input[name=endTime]').val();
		var specialty = $('#userInviteManage .staffRecord .edu input[name=specialty]').val();
		var educationId = $('#userInviteManage .staffRecord .edu input[name=eduId]').val();
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
					$('#userInviteManage .staffRecord .edu .display-edu').append(html);
					$('#userInviteManage .staffRecord .edu .edu-table input').val(null);
					$('#userInviteManage .staffRecord .edu .display-edu').find("table:last input").val(educationId);
					$('#userInviteManage .staffRecord .edu .addexp').parent().css('display','block');
					$('#userInviteManage .staffRecord .edu .updateexp').parent().css('display','none');
					/************************修改点击事件***********************/
					$('#userInviteManage .staffRecord .edu .display-edu table label .edit').click(function(){
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
								$('#userInviteManage .staffRecord .edu input[name=eduId]').val(id);
								$('#userInviteManage .staffRecord .edu input[name=schoolName]').val(obj.schoolName);
								$('#userInviteManage .staffRecord .edu input[name=specialty]').val(obj.specialty);
								$('#userInviteManage .staffRecord .edu input[name=startTime]').val(obj.startTimeStr);
								$('#userInviteManage .staffRecord .edu input[name=endTime]').val(obj.endTimeStr);
								$('#userInviteManage .staffRecord .edu .addexp').parent().css('display','none');
								$('#userInviteManage .staffRecord .edu .updateexp').parent().css('display','block');
								thisDom.parents('table').next().remove();
								thisDom.parents('table').remove();
							},
						})
					});
					
					/************************删除教育 信息***********************/
					$('#userInviteManage .staffRecord .edu .display-edu table label .delete').click(function(){
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
	
	
	//cento
	/*****************设置上下移span的title****************/
	$("#userInviteManage .popups .writetoexcel .upset").attr("title","上移");
	$("#userInviteManage .popups .writetoexcel .downset").attr("title","下移");
	
	/*****************导出到Excel点击弹窗******************/
	$("#userInviteManage .write").click(function(){
		$('#userInviteManage .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#userInviteManage .popups .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'userName',tableHeader:'员工姓名',date:false},
			         {propertyName:'idCard',tableHeader:'身份证号',date:false},
			         {propertyName:'sex',tableHeader:'性别',date:false},
			         {propertyName:'phoneNum',tableHeader:'联系电话',date:false},
			         {propertyName:'accidentPhoneNum',tableHeader:'紧急联系方式',date:false},
			         {propertyName:'birthdayStr',tableHeader:'出生日期',date:true},
			         {propertyName:'workTimeStr',tableHeader:'入职时间',date:true},
			         {propertyName:'address',tableHeader:'家庭地址',date:false},
			         {propertyName:'education',tableHeader:'学历',date:false},
			         {propertyName:'volk',tableHeader:'民族',date:false},
			         {propertyName:'departmentName',tableHeader:'所属部门',date:false},
			         {propertyName:'postName',tableHeader:'所属岗位',date:false},
			         {propertyName:'inviteFlag',tableHeader:'在职状态',date:false},
			         {propertyName:'politicalStatus',tableHeader:'政治面貌',date:false},
			         {propertyName:'nativePlace',tableHeader:'籍贯',date:false},
			         {propertyName:'marriageFlag',tableHeader:'婚姻状态',date:false},
			         {propertyName:'englishLevel',tableHeader:'外语水平',date:false}
				 ]
		})
	})
	
	/*******************重置按钮点击事件***********************/
	$("#userInviteManage .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#userInviteManage .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#userInviteManage .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#userInviteManage .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#userInviteManage .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#userInviteManage .popups .writetoexcel"));
		userInviteManageExcel.push({
			name:'jsonString',value:jsonString
		})
		//提交导出excel所需要的参数
		excelplugin.submit({
			type:'post',
			array:userInviteManageExcel,
			action:'../../userInviteInfo/writeToExcel.do?getMs='+getMS()
		})
	});
}

//为额外信息添加点击事件
function userIntviteAddOtherInfoEven(){
	/************************修改点击事件***********************/
	$('#userInviteManage .staffRecord .otherInfo .display-otherInfo table label .edit').click(function(){
		var id = $(this).parent().parent().find('input').val();
		var thisDom = $(this);
		$.ajax({
			url:'../../userInfo/selectOtherInfo.do?getMs='+getMS(),
			type:"post",
			data:{
				userInfoOtherId:id
			},
			success:function(data){
				var obj = eval('('+data+')')[0];
				$('#userInviteManage .staffRecord .otherInfo input[name=userInfoOtherId]').val(obj.userInfoOtherId);
				$('#userInviteManage .staffRecord .otherInfo input[name=otherInfoName]').val(obj.type);
				$('#userInviteManage .staffRecord .otherInfo input[name=otherInfoContent]').val(obj.message);
				$('#userInviteManage .staffRecord .otherInfo .addexp').parent().css('display','none');
				$('#userInviteManage .staffRecord .otherInfo .updateexp').parent().css('display','block');
				thisDom.parents('table').next().remove();
				thisDom.parents('table').remove();
			}
		});
	});
	
	/************************删除 点击事件***********************/
	$('#userInviteManage .staffRecord .otherInfo .display-otherInfo table label .delete').click(function(){
		var id = $(this).parent().parent().find('input').val();
		var thisDom = $(this);
		$.ajax({
			url:'../../userInfo/updateOtherInfo.do?getMs='+getMS(),
			type:'post',
			data:{
				userInfoOtherId:id,
				aliveFlag:'0'
			},
			success:function(data){
				if(data == 400 || data == 500){
					windowControl('删除额外信息失败');
					return ;
				}
				thisDom.parents('table').next().remove();
				thisDom.parents('table').remove();
			}
		});
	});
}
//工作经历添加点击事件
function userIntviteAddWorkEvent(){
	/************************修改点击事件***********************/
	$('#userInviteManage .staffRecord .work .display-work table label .edit').click(function(){
		var id = $(this).parent().parent().find('input').val();
		var thisDom = $(this);
		$.ajax({
			url:'../../userInfo/selectWork.do?getMs='+getMS(),
			data:{
				workId:id
			},
			success:function(data){
				var obj = eval('('+data+')').rows[0];
				$('#userInviteManage .staffRecord .work input[name=workId]').val(obj.workId);
				$('#userInviteManage .staffRecord input[name=userId]').val(obj.userId);
				$('#userInviteManage .staffRecord .work input[name=postName]').val(obj.postName);
				$('#userInviteManage .staffRecord .work input[name=componyName]').val(obj.componyName);
				$('#userInviteManage .staffRecord .work input[name=startTime]').val(obj.startTimeStr);
				$('#userInviteManage .staffRecord .work input[name=endTime]').val(obj.endTimeStr);
				$('#userInviteManage .staffRecord .work textarea[name=workDescribe]').val(obj.workDescribe);
				$('#userInviteManage .staffRecord .work .addexp').parent().css('display','none');
				$('#userInviteManage .staffRecord .work .updateexp').parent().css('display','block');
				thisDom.parents('table').next().remove();
				thisDom.parents('table').remove();
			}
		});
	});
	
	/************************删除工作 点击事件***********************/
	$('#userInviteManage .staffRecord .work .display-work table label .delete').click(function(){
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
//教育经历添加点击事件
function userIntviteAddEduEvent(){
	/************************修改点击事件***********************/
	$('#userInviteManage .staffRecord .edu .display-edu table label .edit').click(function(){
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
				$('#userInviteManage .staffRecord .edu input[name=eduId]').val(id);
				$('#userInviteManage .staffRecord .edu input[name=schoolName]').val(obj.schoolName);
				$('#userInviteManage .staffRecord .edu input[name=specialty]').val(obj.specialty);
				$('#userInviteManage .staffRecord .edu input[name=startTime]').val(obj.startTimeStr);
				$('#userInviteManage .staffRecord .edu input[name=endTime]').val(obj.endTimeStr);
				$('#userInviteManage .staffRecord .edu .addexp').parent().css('display','none');
				$('#userInviteManage .staffRecord .edu .updateexp').parent().css('display','block');
				thisDom.parents('table').next().remove();
				thisDom.parents('table').remove();
			},
		})
	});
	
	/************************删除教育 信息***********************/
	$('#userInviteManage .staffRecord .edu .display-edu table label .delete').click(function(){
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

/***************************************************员工管理部分*****************************************/
/*-------------------点击删除员工信息-----------------*/
function userIntvitedeleteUserInfo(id, userName){
	ui.confirm('确认删除'+userName+'的员工信息？',function(z){
		if(z){
			$.ajax({
				data:{
					userId:id,
					aliveFlag:'0'
				},
				url:'../../userInviteInfo/updateUserInfo.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == '200'){
						$("#userInviteManage #userInviteManagedg").datagrid("reload");
						windowControl("删除成功");
					}else{
						windowControl("删除失败");
					}
				},
				error:function(err){
					windowControl(err.status);
				}
			})
		}
	},false);
}
/*-------------------点击录用员工-----------------*/
function userInvite(id,userName,employFlag){
	if(employFlag == 1){
		windowControl("此招聘人员在本厂离职过，人事经理还未审批通过！");
	}else if(employFlag == 3){
		windowControl("此招聘人员在本厂离职过，审批被人事经理驳回！");
	}else{
		var flag = false;	
		$('#userInviteManage .popups .userInvite').show();
		$('#userInviteManage .popups .userInvite input[name=userId]').val(id);
		$('#userInviteManage .popups .userInvite input[name=peopleName]').val(userName);
		$('#userInviteManage .popups .userInvite .chooseUser').unbind();
		//选择上级
		$('#userInviteManage .popups .userInvite .chooseUser').click(function(){
			chooseUser();
		    $('#chooseUser .confirm').click(function(){
		    	$('#chooseUser').css('display','none');
		    	selectUsers = $('#chooseUser .popuparea .user').datagrid('getSelections');
		    	$('#userInviteManage .popups .userInvite input[name=leadName]').val(selectUsers[0].userName);
		    	$('#userInviteManage .popups .userInvite input[name=leadId]').val(selectUsers[0].userId);
		    	$('#chooseUser .confirm').unbind();
		    });
		});
		//校验员工编号
		$('#userInviteManage .popups .userInvite input[name=userAccount]').unbind();
		$('#userInviteManage .popups .userInvite input[name=userAccount]').blur(function(){	
			var userAccount = $('#userInviteManage .popups .userInvite input[name=userAccount]').val();
			if(userAccount==''||userAccount==null){
				return ;
			}else{
				flag = false;
				$.ajax({
					data:{
						userAccount:userAccount
					},
					url:'../../userInfo/selectUserInfo.do?getMs='+getMS(),
					type:'post',
					success:function(data){
						if(data == 500){
							windowControl("服务器异常");
						}
						var rows = eval('('+data+')').rows;
						if(rows.length > 0){
							windowControl("已有该员工编号");
						}else{
							flag = true;
						}
					},
					error:function(err){
						windowControl("服务器未响应");
					}
				})
			}
		})
		//确定录用
		$('#userInviteManage .popups .userInvite .btnarea .comfirm').unbind();
		$('#userInviteManage .popups .userInvite .btnarea .comfirm').click(function(){
			var userAccount = $('#userInviteManage .popups .userInvite input[name=userAccount]').val();
			var workTime = $('#userInviteManage .popups .userInvite input[name=workTime]').val();
			if(userAccount==''||userAccount==null){
				windowControl("员工编号不能为空");
			}else if(workTime==''||workTime==null){
				windowControl("入职时间不能为空");
			}else if(flag){
				$.ajax({
					data:{
						userId:id,
						userAccount:userAccount,
						workTimeStr:workTime,
						leadName:$('#userInviteManage .popups .userInvite input[name=leadName]').val(),
						leadId:$('#userInviteManage .popups .userInvite input[name=leadId]').val(),
						leaderFlag:$('#userInviteManage .popups .userInvite select[name=leaderFlag]').val(),
						dormFlag:$('#userInviteManage .popups .userInvite select[name=dormFlag]').val(),
						dorm:$('#userInviteManage .popups .userInvite input[name=dorm]').val(),
						wageAccount:$('#userInviteManage .popups .userInvite input[name=wageAccount]').val(),
						inviteFlag:$('#userInviteManage .popups .userInvite select[name=inviteFlag]').val()
					},
					url:'../../userInviteInfo/hireUser.do?getMs='+getMS(),
					type:'post',
					success:function(data){
						if(data == '200'){
							windowControl("聘用成功");
							$('#userInviteManage .popups .userInvite').hide();
							$('#userInviteManagedg').datagrid('reload');
						}else{
							windowControl("聘用失败");
						}
					},
					error:function(err){
						windowControl("服务器未响应");
					}
				})
			}		
		})
	}
}

