var userManageExcel = [];
$(function(){	
	$('#userManage .staffRecord').css('height',$('#loadarea').height()-32 +'px');
	if(existPermission('admin:personnel:staffRecord:userManage:add')){
		//'<div><input type="button" value="员工批量调动" class="button userTransfers" /></div>';
		var topHtml = 	'<div style="margin-right:6px;"><input type="button" value="添加" class="button adduser" /></div>';
		$('#userManage .maintop').append(topHtml);
	}
	if(existPermission('admin:personnel:staffRecord:userManage:export')){
		var	excelHtml = '<div style="margin-right:6px;"><input type="button" value="导出查询结果到Excel" class="button write" /></div>';
		$('#userManage .maintop').append(excelHtml);
	}
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
			if(data.departmentName != '人事部' && data.userId != 'admin'){
				$("#userManage .invitetop .departmentChooseObj").attr("disabled", true);
				$('#userManage .invitetop input[name=departmentName]').val(data.departmentName);
				$('#userManage .invitetop input[name=departmentUrl]').val(data.departmentUrl);
			}
		},
		error:function(error){
			windowControl(error.status);
		}
	});
	//清空按钮的点击事件
	$('#userManage .invitetop .qingkong').click(function(){
		var departmentName = $('#userManage .invitetop input[name=departmentName]').val();
		if( departmentName == '厂部'){
			$('#userManage .invitetop input[type!=button]').val(null);
		}else{
  			$('#userManage .invitetop input[name=postName]').val(null);
			$('#userManage .invitetop input[name=postId]').val(null);
			$('#userManage .invitetop input[name=peopleName]').val(null);
			$('#userManage .invitetop input[name=idCard]').val(null);
			$('#userManage .invitetop input[name=userAccount]').val(null);
			$('#userManage .invitetop input[name=workTimeStartStr]').val(null);
			$('#userManage .invitetop input[name=dimissionTimeStart]').val(null);
			$('#userManage .invitetop input[name=workTimeEndStr]').val(null);
		}
		$('#userManage .invitetop select').val(null);
	})
	//点击事件
	$('#userManage .maintop .adduser').click(function(){
		userManageUpdateUserInfo();
	})
	//打印身份证按钮的点击事件
	$('#userManage .printIdCardBtn').click(function(){
		var wx = $(window).width();   //获取可视区屏幕的宽度
		var wy = $(window).height();  //获取可视区屏幕的高度
		var w = $('#userManage .printIdCard').width();
		var h = $('#userManage .printIdCard').height();
		//console.log((wx-w)/2+":"+(wy-h)/2);
		$('#userManage .printIdCard').css({
			'left':(wx-w)/2,
			'top':(wy-h)/2
		});
		$('#userManage .printIdCard').css('display','block');
		$('#userManage .printIdCard img:eq(0)').attr('src',$('#userManage .basic .pic2').attr('src'));
		$('#userManage .printIdCard img:eq(1)').attr('src',$('#userManage .basic .pic3').attr('src'));
	})
	//打印身份证
	$('#userManage .printIdCard .confirm').click(function(){
		$('#userManage .printIdCard').css('display','none');
		$('#userManage .printIdCard .popuparea').jqprint();
	});
	//搜索条 读取身份证
	//$('#userManage .invitetop #readIdCard').click(function(){
	$('#userManage .invitetop .idCardIcon').click(function(){
		var result;
		//注意：第一个参数为对应的设备端口，USB型为1001-1016，串口型为1至16
		//第二个参数为文件保存路径及文件名，当为“”时，保存在系统临时目录(由API GetTempPath获得)
		//ReadCard函数调用示例如下：
		result=WidControl.ReadCard(1001,"C:\\wid\\photo.bmp");
		if (result==1){
			var idCard = WidControl.GetCode();
			$('#userManage .invitetop input[name="idCard"]').val(idCard);
			$('#userManagedg').datagrid({
				url:'../../userInfo/selectUserInfo.do?getMs='+getMS(),
				queryParams:{
					idCard:idCard,
				}
			});
		}else{
			if (result==-1)
				windowControl("端口初始化失败！");
			if (result==-2)
				windowControl("请重新将卡片放到读卡器上！");
			if (result==-3)
				windowControl("读取数据失败！");
			if (result==-4)
				//windowControl("生成照片文件失败，请检查设定路径和磁盘空间！");
			if(result == -5)
				windowControl("加载动态库失败");
		}
	});
	//存放数据
	var data = [];
	//点击员工批量调动
	$('#userManage .maintop .userTransfers').click(function(){
		$('#userManage .popups .userTransfers').css('display','block');
		var iStr = '';
		var dStr = '';
		var pStr = '';
		for(var i=0;i<data.length;i++){
			iStr+=data[i].userId+",";
			dStr+=data[i].departmentUrl+",";
			pStr+=data[i].postId+",";
		}
		if(iStr.length>0){
			iStr = iStr.substring(0,iStr.length-1);
			dStr = dStr.substring(0,dStr.length-1);
			pStr = pStr.substring(0,pStr.length-1);
		}
		
		var dom = $('#userManage .popups .userTransfers');
		dom.find('input').not('.button').val(null);
		dom.find('textarea').val(null);
		dom.find('input[name=userId]').val(iStr);
		dom.find('input[name=oldDepartmentUrl]').val(dStr);
		dom.find('input[name=oldPostId]').val(pStr);
		//选择岗位
		dom.find('.choosePost').click(function(){
			choosePost();
			$('#choosePost .confirm').unbind();
			$('#choosePost .confirm').click(function(){
				$('#choosePost').css('display','none');
				var selectPost = $('#choosePost .popuparea .post').datagrid('getSelections');
				dom.find('input[name=newPostName]').val(selectPost[0].postName);
				dom.find('input[name=newPostId]').val(selectPost[0].postId);
				$('#choosePost').css('display','none');
			});
		});
		//选择部门
		dom.find('.chooseDept').click(function(){
			chooseDept();
			$('#chooseDept .confirm').click(function(){
				var chooseDeptObj = $('#chooseDept .dept').tree('getSelected');
				dom.find('input[name=newDepartmentName]').val(chooseDeptObj.text);
				dom.find('input[name=newDepartmentUrl]').val(chooseDeptObj.id);
				$('#chooseDept').css('display','none');
				$('#chooseDept .confirm').unbind();
			});
		});
	})	
	//员工批量调动调动事件
	$('#userManage .popups .userTransfers .comfirm').click(function(){
		var dom = $('#userManage .popups .userTransfers');
		$.ajax({
			url:'../../userInfo/userTransfers.do?getMs='+getMS(),
			data:{
				operaTab:'修改',
				operaInfo:'进行了员工批量调动',
				userId:dom.find('input[name=userId]').val(),
				oldPostId:dom.find('input[name=oldPostId]').val(),
				oldDepartmentUrl:dom.find('input[name=oldDepartmentUrl]').val(),
				newPostId:dom.find('input[name=newPostId]').val(),
				newPostName:dom.find('input[name=newPostName]').val(),
				newDepartmentUrl:dom.find('input[name=newDepartmentUrl]').val(),
				newDepartmentName:dom.find('input[name=newDepartmentName]').val(),
				transferTimeStr:dom.find('input[name=transferTime]').val(),
				remark:dom.find('textarea[name=remark]').val()
			},
			type:'post',
			success:function(data){
				if(data == 200){
					dom.css('display','none');
					windowControl("员工调动成功");
				}else{
					windowControl("员工调动失败");
				}
			},
			error:function(){
				windowControl("服务器未响应");
			}
		})
	});
	
	
	//为了能使查看员工信息使高度不会低于loadarea的高度
	$('#loadarea .tabs-panels').css({
		'height':$('#loadarea').height()-31+'px',
		'overflow-y':'auto',
	});
	/*****返回列表点击事件*****/
	$('#userManage .staffRecord .back').click(function(){
		$('#userManage .staffRecord').css('display','none');
		$('#userManage .main').css('display','block');
		$('#userManage .staffRecord .otherInfo .display-otherInfo').html('');
		$('#userManage .staffRecord .work .display-work').html('');
		$('#userManage .staffRecord .edu .display-edu').html('');
		$('#userManage .staffRecord .dispatch').hide();
		$('#userManage .staffRecord .userdimission').hide();	
		$('#userManage .staffRecord .basic').find('input').not("input[type=button]").val(null);
		$('#userManage .staffRecord .basic').find('select').val(null);
		$('#userManage .staffRecord .idCard-img input').val(null);
		$('#userManage .staffRecord .idCard-img img').attr('src',null);
		$('#userManagedg').datagrid('reload');
	});
	//选择部门
	$('#userManage .invitetop .departmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#userManage .invitetop input[name=departmentName]').val(chooseDept.text);
		     $('#userManage .invitetop input[name=departmentUrl]').val(chooseDept.id);
		     $('#chooseDept .confirm').unbind();
		})
	})
	//选择岗位
	$('#userManage .invitetop .postChooseObj').click(function(){
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
	    	$('#userManage .invitetop input[name=postName]').val(postNames);
	    	$('#userManage .invitetop input[name=postId]').val(postIds);
	    	$('#userManage .invitetop input[name=postId]').attr("postNames",postNames);
	    	$('#choosePost .confirm').unbind();
	    })
	})
	/**************民族****************/
	$('#userManage .staffRecord select[name=volk]').html(getDataBySelectKey("volk"));
	$('#userManage .advancedQuery select[name=volk]').append(getDataBySelectKeyNo("volk"));
	/*********************学历**********************/
	$('#userManage .staffRecord select[name=education]').html(getDataBySelectKey("education"));
	$('#userManage .invitetop select[name=education]').html(getDataBySelectKeyNo("education"));
	$('#userManage .advancedQuery select[name=education]').append(getDataBySelectKeyNo("education"));
	/*******************婚姻状态**************************/
	$('#userManage .staffRecord select[name=marriageFlag]').html(getDataBySelectKey("marriage_flag"));
	$('#userManage .advancedQuery select[name=marriageFlag]').append(getDataBySelectKeyNo("marriage_flag"));
	/*******************政治面貌**************************/
	$('#userManage .staffRecord select[name=politicalStatus]').html(getDataBySelectKey("political_status"));
	$('#userManage .invitetop select[name=politicalStatus]').html(getDataBySelectKeyNo("political_status"));
	$('#userManage .advancedQuery select[name=politicalStatus]').append(getDataBySelectKeyNo("political_status"));
	
	 
	/************高级查询***************/
	//高级查询按钮点击事件
	$('#userManage .invitetop .advancedQueryBtn').click(function(){
		$('#userManage .advancedQuery').css('display','block');
	});
	$('#userManage .advancedQuery .close').click(function(){
		$('#userManage .advancedQuery').css('display','none');
	});
	//advancedQuery   选择部门
	$('#userManage .advancedQuery .popuparea input[name=chooseDepartment]').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#userManage .advancedQuery .popuparea input[name=departmentName]').val(chooseDept.text);
		     $('#userManage .advancedQuery .popuparea input[name=departmentUrl]').val(chooseDept.id);
		     $('#chooseDept .confirm').unbind();
		});
	});
	//advancedQuery    选择岗位
	$('#userManage .advancedQuery .popuparea input[name=choosePost]').click(function(){
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
	    	$('#userManage .advancedQuery .popuparea input[name=postName]').val(postNames);
	    	$('#userManage .advancedQuery .popuparea input[name=postId]').val(postIds);
	    	$('#userManage .advancedQuery .popuparea input[name=postId]').attr("postNames",postNames);
	    	$('#choosePost .confirm').unbind();
	    });
	});
	//清空
	$('#userManage .advancedQuery .clean').click(function(){
		$('#userManage .advancedQuery .popuparea input[type=text]').val(null);
		$('#userManage .advancedQuery .popuparea select').val(null);
	});
	$('#userManage .advancedQuery .confirm').click(function(){
		var userName = $('#userManage .advancedQuery .popuparea input[name=peopleName]').val();
		var idCard = $('#userManage .advancedQuery .popuparea input[name=idCard]').val();
		var sex = $('#userManage .advancedQuery .popuparea select[name=sex]').val();
		var volk = $('#userManage .advancedQuery .popuparea select[name=volk]').val();
		var education = $('#userManage .advancedQuery .popuparea select[name=education]').val();
		var address = $('#userManage .advancedQuery .popuparea input[name=address]').val();
		var marriageFlag = $('#userManage .advancedQuery .popuparea select[name=marriageFlag]').val();
		var nativePlace = $('#userManage .advancedQuery .popuparea input[name=nativePlace]').val();
		var politicalStatus = $('#userManage .advancedQuery .popuparea select[name=politicalStatus]').val();
		var userAccount = $('#userManage .advancedQuery .popuparea input[name=userAccount]').val();
		var workTimeStartStr = $('#userManage .advancedQuery .popuparea input[name=workTimeStartStr]').val();
		var workTimeEndStr = $('#userManage .advancedQuery .popuparea input[name=workTimeEndStr]').val();
		var dimissionTimeStart = $('#userManage .advancedQuery .popuparea input[name=dimissionTimeStart]').val();
		var dimissionTimeEnd = $('#userManage .advancedQuery .popuparea input[name=dimissionTimeEnd]').val();
		var departmentName = $('#userManage .advancedQuery .popuparea input[name=departmentName]').val();
		var departmentUrl = $('#userManage .advancedQuery .popuparea input[name=departmentUrl]').val();
		var postName = $('#userManage .advancedQuery .popuparea input[name=postName]').val();
		var postId = $('#userManage .advancedQuery .popuparea input[name=postId]').val();
		var leaderFlag = $('#userManage .advancedQuery .popuparea select[name=leaderFlag]').val();
		var wageAccount = $('#userManage .advancedQuery .popuparea input[name=wageAccount]').val();
		var englishLevel = $('#userManage .advancedQuery .popuparea input[name=englishLevel]').val();
		var dormFlag = $('#userManage .advancedQuery .popuparea select[name=dormFlag]').val();
		var dorm = $('#userManage .advancedQuery .popuparea input[name=dorm]').val();
		var inviteFlag = $('#userManage .advancedQuery .popuparea select[name=inviteFlag]').val();
		var retireFlag = $('#userManage .advancedQuery .popuparea select[name=retireFlag]').val();
		var readIdcardFlag = $('#userManage .advancedQuery .popuparea select[name=readIdcardFlag]').val();
		var birthdayStartStr = $('#userManage .advancedQuery .popuparea input[name=birthdayStartStr]').val();
		var birthdayEndStr = $('#userManage .advancedQuery .popuparea input[name=birthdayEndStr]').val();
		userManageExcel = [
   		    {name:'userName',value:userName},
   		    {name:'idCard',value:idCard},
	   		{name:'sex',value:sex},
	   		{name:'volk',value:volk},
	   		{name:'education',value:education},
	   		{name:'address',value:address},
	   		{name:'marriageFlag',value:marriageFlag},
	   		{name:'nativePlace',value:nativePlace},
	   		{name:'politicalStatus',value:politicalStatus},
	   		{name:'userAccount',value:userAccount},
	   		{name:'workTimeStartStr',value:workTimeStartStr},
	   		{name:'dimissionTimeStart',value:dimissionTimeStart},
	   		{name:'workTimeEndStr',value:workTimeEndStr},
	   		{name:'departmentName',value:departmentName},
	   		{name:'departmentUrl',value:departmentUrl},
	   		{name:'postName',value:postName},
	   		{name:'postId',value:postId},
	   		{name:'leaderFlag',value:leaderFlag},
	   		{name:'wageAccount',value:wageAccount},
	   		{name:'englishLevel',value:englishLevel},
	   		{name:'dormFlag',value:dormFlag},
	   		{name:'dorm',value:dorm},
	   		{name:'inviteFlag',value:inviteFlag},
	   		{name:'retireFlag',value:retireFlag},
	   		{name:'readIdcardFlag',value:readIdcardFlag},
	   		{name:'birthdayStartStr',value:birthdayStartStr},
	   		{name:'birthdayEndStr',value:birthdayEndStr}
   		   ];
		$('#userManagedg').datagrid({
			url:'../../userInfo/selectUserInfo.do?getMs='+getMS(),
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
				userAccount:userAccount,
				workTimeStartStr:workTimeStartStr,
				workTimeEndStr:workTimeEndStr,
				dimissionTimeStart:dimissionTimeStart,
				dimissionTimeEnd:dimissionTimeEnd,
				departmentUrl:departmentUrl,
				postName:postName,
				postId:postId,
				leaderFlag:leaderFlag,
				wageAccount:wageAccount,
				englishLevel:englishLevel,
				dormFlag:dormFlag,
				dorm:dorm,
				retireFlag:retireFlag,
				inviteFlag:inviteFlag,
				readIdcardFlag:readIdcardFlag,
				birthdayStartStr:birthdayStartStr,
				birthdayEndStr:birthdayEndStr
			}
		});
		$('#userManage .advancedQuery').css('display','none');
	});
	
	//添加合同 提交点击事件
	$('#userManage .popups .savePact .confirm').click(function(){
		//获取输入框的内容
		var packFlag = $('#userManage .savePact input[type=radio]:checked').val();
		var userName = $('#userManage .savePact input[name=peopleName]').val();
		var userId = $('#userManage .savePact input[name=userId]').val();
		var startTime = $('#userManage .savePact input[name=startTime]').val();
		var endTime = $('#userManage .savePact input[name=endTime]').val();
		var tryStarTime = $('#userManage .savePact input[name=tryStarTime]').val();
		var tryEndTime = $('#userManage .savePact input[name=tryEndTime]').val();
		if(userName == null || userName == ''){
			windowControl('用户名不能为空');
			return ;  
		}else if(packFlag == null || packFlag == ''){
			windowControl('合同类型不能为空');
			return ;
		}else if(startTime == null || startTime == ''){
			windowControl('合同开始时间不能为空');
			return ;
		}else if(endTime == null || endTime == ''){
			windowControl('合同结束不能为空');
			return ;
		}else{
			$.ajax({
				data:{
					userName:userName,
					packFlag:packFlag,
					userId:userId,
					strStarTime:startTime,
					strEndTime:endTime,
					strTryStarTime:tryStarTime,
					strTryEndTime:tryEndTime
					},
				type:"post",
				url:"../../personnel/insertPack.do?getMs="+getMS(),
				success:function(data){
					if(data == 200){
						$('#userManage .savePact').css('display','none');
						$('#userManage .savePact .popuparea input[name!=pactType]').val(null);
						$('#userManage .savePact .popuparea text').val(null);
						//$('#userManage #pactdg').datagrid('reload');
						windowControl('添加合同信息成功');
					}else{
						windowControl('添加合同信息失败');
					}
					
				},
				error:function(){
			    	windowControl("请求失败!");
			    }
			})	
		}
	})
	
	//添加社保信息 提交点击事件
	$('#userManage .savesocialsecurity .confirm').click(function(){
		var userId = $.trim($('#userManage .savesocialsecurity input[name=userId]').val());
		var userName = $.trim($('#userManage .savesocialsecurity input[name=peopleName]').val());
		var superType = $('#userManage .savesocialsecurity select[name=superType]').find("option:selected").val();
//		var typeId = $.trim($('#socialSecurity .savesocialsecurity select[name=typeName]').find("option:selected").val());
//		var typeName = $.trim($('#socialSecurity .savesocialsecurity select[name=typeName]').find("option:selected").text());
		if(userName == '' || userName == null|| userId == '' || userId == null){
			windowControl('员工信息有误');
		}else{
			$.ajax({
				data:{
					userId:userId,
					insuranceSuperType:superType
//					insuranceTypeName:typeName,
//					insuranceTypeId:typeId,
				},
				url : '../../insurance/insertInsurance.do?getMs='+getMS(),
				type : 'post',
				success : function(data){
					if(data == '200'){
						windowControl('为员工添加社保成功');
						$('#userManage .popup').css('display','none');
						$('#userManage .popup input[type!=radio]').not('.button').val(null);
						$('#userManage .popup textarea').val(null);
						$('#userManage .popup select').children('option:first-child').attr('selected',true);
						//$('#socialSecuritydg').datagrid('reload')
					}else windowControl("为该员工添加社保失败，请检查是否已存在社保");
				},
				error : function(err) {
					windowControl(err.status);
				}
			});
		}
	});
	
	//填充添加社保类型弹窗社保大类型
	$('#userManage .popups .savesocialsecurity select[name=superType]').html(getDataBySelectKeyNo("super_type"));
	
	//主页面产生数据网格
	$('#userManagedg').datagrid({
//		   url:'../../userInfo/selectUserInfo.do?getMs='+getMS(),
		   rownumbers:"true",
		   pagination:true,
		   toolbar:"#userManage .invitetop",
		   method:"post",
		   pageSize:20,
		   fit: true,		   
		   columns:[[
		       {field:"ck",checkbox:true },
		       {field:"_opera",title:"管理",width:86,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
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
	    		   opera += '<div class="imgBox">'
    			   if(existPermission('admin:personnel:staffRecord:userManage:look'))
    				   opera += '<span style="float:left;" class="small-button look" title="查看" onclick="userManageLookUserInfo('+id+','+idCard+')"></span>'
		    	   if(existPermission('admin:personnel:staffRecord:userManage:update'))
		    		   opera += '<span style="float:left;" class="small-button edit" title="修改" onclick="userManageUpdateUserInfo('+id+','+idCard+','+userName+')"></span>'
	    		   if(existPermission('admin:personnel:staffRecord:userManage:delete'))
		    		   opera += '<span style="float:left;" class="small-button delete" title="删除" onclick="userManageDeleteUserInfo('+id+','+userName+')"></span>';
		    	   if(existPermission('admin:personnel:staffRecord:userManage:manage')){
		    		   opera += '<span style="float:left;" class="small-button govern" title="管理" onclick="governUserInfo('+id+','+departmentUrl+','+departmentName+','
		    		   		+postId+','+postName+','+inviteFlag+','+retireFlag+','+userName+','+idCard+')"></span>';
		    	   }
		    	   opera += '</div>'
		    	   return opera;
		       }},
			   {field:"userAccount",title:"员工编号",width:100,fitColumns:true,sortable:true,align:"center"},
		       {field:"userName",title:"员工名字",width:100,fitColumns:true,sortable:true,align:"center"},
		       {field:"idCard",title:"身份证号码",width:150,fitColumns:true,resizable:true,align:"center",sortable:true},
		       {field:"sex",title:"性别",fitColumns:true,resizable:true,align:"center",width:50,sortable:true,formatter:function(value,row,index){
		    	   var sex = row.sex;
		    	   if(sex == 1){
		    		   return '男';
		    	   }else{
		    		   return '女';
		    	   }
		       }},
		       {field:"birthdayStr",title:"出生日期",width:100,fitColumns:true,resizable:true,align:"center",sortable:true},
		       {field:"education",title:"学历",width:50,fitColumns:true,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
		    	   var education = row.education;
		    	   return getValueFromKey("education",education);
		       }},
		       {field:"workTimeStr",title:"入职时间",width:100,fitColumns:true,resizable:true,align:"center",sortable:true,formatter:status},
		       {field:"departmentName",title:"所属部门",width:100,fitColumns:true,resizable:true,align:"center",sortable:true},
		       {field:"postName",title:"所属岗位",width:100,fitColumns:true,resizable:true,align:"center",sortable:true},
		       {field:"invite_flag",title:"在职状态",width:100,fitColumns:true,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
		    	   if(row.inviteFlag == '1')
		    		   return '在职';
		    	   else if(row.inviteFlag == '2')
		    		   return '正常离职无手续';
		    	   else if(row.inviteFlag == '3')
		    		   return '正常离职有手续';
		    	   else if(row.inviteFlag == '4')
		    		   return '试用期';
		    	   else if(row.inviteFlag == '5')
		    		   return '工伤';
		    	   else if(row.inviteFlag == '6')
		    		   return '非正常离职无手续';
		    	   else if(row.inviteFlag == '7')
		    		   return '非正常离职有手续';
		       }},
		       {field:"political_Status",title:"政治面貌",width:60,fitColumns:true,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
		    	   var politicalStatus = row.politicalStatus;
		    	   return getValueFromKey("political_status",politicalStatus);
		       }},
		       {field:"retire_flag",title:"退休状态",width:100,fitColumns:true,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
		    	   if(row.retireFlag == '1')
		    		   return '正常';
		    	   else if(row.retireFlag == '2')
		    		   return '退休';
		    	   else if(row.retireFlag == '3')
		    		   return '返聘';
		       }},
		       {field:"phoneNum",title:"联系方式",width:100,fitColumns:true,resizable:true,align:"center",sortable:true},
		       {field:"accidentPhoneNum",width:100,title:"紧急联系方式",fitColumns:true,resizable:true,align:"center",sortable:true},
		       {field:"address",title:"地址",width:100,fitColumns:true,resizable:true,align:"center",sortable:true,formatter:status},
		   ]],
	})
	
		$('#userManage .invitetop .selectUserInfo').click(function(){
			if(existPermission('admin:personnel:staffRecord:userManage:select')){
				userManageExcel = [
				    {name:'userName',value:$('#userManage .invitetop input[name=peopleName]').val()},
					{name:'idCard',value:$('#userManage .invitetop input[name=idCard]').val()},
					{name:'userAccount',value:$('#userManage .invitetop input[name=userAccount]').val()},
					{name:'departmentUrl',value:$('#userManage .invitetop input[name=departmentUrl]').val()},
					{name:'workTimeStartStr',value:$('#userManage .invitetop input[name=workTimeStartStr]').val()},
					{name:'workTimeEndStr',value:$('#userManage .invitetop input[name=workTimeEndStr]').val()},
					{name:'dimissionTimeStart',value:$('#userManage .invitetop input[name=dimissionTimeStart]').val()},
					{name:'dimissionTimeEnd',value:$('#userManage .invitetop input[name=dimissionTimeEnd]').val()},
					{name:'postId',value:$('#userManage .invitetop input[name=postId]').val()},
					{name:'inviteFlag',value:$('#userManage .invitetop select[name=inviteFlag]').val()},
					{name:'retireFlag',value:$('#userManage .invitetop select[name=retireFlag]').val()}
				   ];
				$('#userManagedg').datagrid({
					url:'../../userInfo/selectUserInfo.do?getMs='+getMS(),
					queryParams: {
						userName: function(){
							return $('#userManage .invitetop input[name=peopleName]').val();
						},
						idCard: function(){
							return $('#userManage .invitetop input[name=idCard]').val();
						},
						userAccount: function(){
							return $('#userManage .invitetop input[name=userAccount]').val();
						},
						departmentUrl: function(){
							return $('#userManage .invitetop input[name=departmentUrl]').val();
						},
						workTimeStartStr: function(){
							return $('#userManage .invitetop input[name=workTimeStartStr]').val();
						},
						workTimeEndStr: function(){
							return $('#userManage .invitetop input[name=workTimeEndStr]').val();
						},
						dimissionTimeStart: function(){
							return $('#userManage .invitetop input[name=dimissionTimeStart]').val();
						},
						dimissionTimeEnd: function(){
							return $('#userManage .invitetop input[name=dimissionTimeEnd]').val();
						},
						postId:function(){
							return $('#userManage .invitetop input[name=postId]').val();
						},
						postName: function(){
							return $('#userManage .invitetop input[name=postName]').val();
						},
						inviteFlag: function(){
							return $('#userManage .invitetop select[name=inviteFlag]').val();
						},
						retireFlag: function(){
							return $('#userManage .invitetop select[name=retireFlag]').val();
						},
					}
				});
			}else{
				windowControl('无访问权限');
			}
		});
	
	
	/*****修改员工信息*****/
	//添加各种窗体内的点击事件
	userManageAddUpdateEvent()
	//选择上级
	$('#userManage .basicInformation .chooseUser').click(function(){
		chooseUser();
		$('#chooseUser .confirm').unbind();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUsers = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#userManage .basicInformation input[name=leadName]').val(selectUsers[0].userName);
	    	$('#userManage .basicInformation input[name=leadId]').val(selectUsers[0].userId);
	    	$('#chooseUser .confirm').unbind();
	    });
	});
	
	/************当点击读取身份证时，对身份证中的信息进行读取**************/
	$('#userManage .read-idCard').click(function(){
		var result;
		//注意：第一个参数为对应的设备端口，USB型为1001-1016，串口型为1至16
		//第二个参数为文件保存路径及文件名，当为“”时，保存在系统临时目录(由API GetTempPath获得)
		//ReadCard函数调用示例如下：
		result=WidControl.ReadCard(1001,"C:\\wid\\photo.bmp");
		var uesrManageReadIdcard = function(){
			$('#userManage .basicInformation input[name=peopleName]').val(WidControl.GetName());
			$('#userManage .basicInformation select[name="sex"]').val(WidControl.GetSexN());
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
			$('#userManage .basicInformation input[name="birthday"]').val(birthday);
			$('#userManage .basicInformation input[name="idCard"]').val(idCard);
			$('#userManage .basicInformation input[name="idCardValid"]').val(idCardValid);
			$('#userManage .basicInformation input[name="idCardIssued"]').val(idCardIssued);
			var address = $('#userManage .basicInformation input[name="address"]').val();
			if(address == ''){
				$('#userManage .basicInformation input[name="nativePlace"]').val(WidControl.GetAddress());
				$('#userManage .basicInformation input[name="address"]').val(WidControl.GetAddress());
			}else{
				$('#userManage .basicInformation input[name="nativePlace"]').val(WidControl.GetAddress());
			}
			if(WidControl.GetFolk() == '汉'){
				var volk = $('#userManage .basicInformation select[name="volk"]').val(1);
			}else{
				$('#userManage .basicInformation select[name="volk"]').val(2);
			}
			$('#userManage .basicInformation .pic1').attr("src",'data:image/bmp;base64,' + WidControl.GetPhotobuf());
			$('#userManage .basicInformation .pic2').attr("src",'data:image/bmp;base64,' + WidControl.GetFrontJPGBuf());
			$('#userManage .basicInformation .pic3').attr("src",'data:image/bmp;base64,' + WidControl.GetBackJPGBuf());
			$('#userManage .basicInformation input[name=pic1]').val(WidControl.GetPhotobuf());
			$('#userManage .basicInformation input[name=pic2]').val(WidControl.GetFrontJPGBuf());
			$('#userManage .basicInformation input[name=pic3]').val(WidControl.GetBackJPGBuf());
		}
		if (result==1){
			var userId = $('#userManage .staffRecord input[name=userId]').val();
			var idCard = WidControl.GetCode();
			if(userId){
				$.ajax({
					url:'../../userInfo/checkedIdCard.do?getMs='+getMS(),
					data:{
						userId:userId,
						idCard:idCard
					},
					success:function(data){
						var rows = eval('(' + data + ')').rows;
						if(rows.length > 0){
							var f = true;
							for(var i = 0 ; i< rows.length ; i++){
								if(rows[i].inviteFlag == 1 || rows[i].inviteFlag == 4 || rows[i].inviteFlag == 5){
									windowControl('该身份证信息为其他在职员工的身份证信息<br>'
											+'姓名：'+WidControl.GetName()
											+'<br>身份证号：'+idCard);
									f = false;
									break;
								}
							}
							if(f){
								uesrManageReadIdcard();
							}
						}else{
							uesrManageReadIdcard();
						}
					},
					error:function(){
						windowControl('验证身份证信息失败');
					}
				})
			}else{
				uesrManageReadIdcard();
				//如果员工Id是空的，则对身份证号进行验证	
				userManageSelectData(null,'update',idCard,"checked");
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
			if (result == -5)
				windowControl("加载动态库失败");
		}
	});
	
	
	//添加员工点击事件
	$('#userManage .expsame .addMessage').click(function(){
		var userAccount = $('#userManage .basicInformation input[name="userAccount"]').val();
		var userName = $('#userManage .basicInformation input[name=peopleName]').val();
		var departmentName = $('#userManage .basicInformation input[name="departmentName"]').val();
		var departmentUrl = $('#userManage .basicInformation input[name="departmentUrl"]').val();
		var postName = $('#userManage .basicInformation input[name="postName"]').val();
		var postId = $('#userManage .basicInformation input[name="postId"]').val();
		var leadName = $('#userManage .basicInformation input[name="leadName"]').val();
		var leadId = $('#userManage .basicInformation input[name="leadId"]').val();
		var roleNames = $('#userManage .basicInformation input[name="roleNames"]').val();
		var roleIds = $('#userManage .basicInformation input[name="roleIds"]').val();
		var phoneNum = $('#userManage .basicInformation input[name="phoneNum"]').val();
		var accidentPhoneNum = $('#userManage .basicInformation input[name="accidentPhoneNum"]').val();
		var birthday = $('#userManage .basicInformation input[name="birthday"]').val();
		var idCard = $('#userManage .basicInformation input[name="idCard"]').val();
		var sex = $('#userManage .basicInformation select[name="sex"]').val();
		var workTime = $('#userManage .basicInformation input[name="workTime"]').val();
		var address = $('#userManage .basicInformation input[name="address"]').val();
		var leaderFlag = $('#userManage .basicInformation select[name="leaderFlag"]').val();
		var education = $('#userManage .basicInformation select[name="education"]').val();
		var volk = $('#userManage .basicInformation select[name="volk"]').val();
		var nativePlace = $('#userManage .basicInformation input[name="nativePlace"]').val();
		var politicalStatus = $('#userManage .basicInformation select[name="politicalStatus"]').val();
		var marriageFlag = $('#userManage .basicInformation select[name="marriageFlag"]').val();
		var photo  = $('#userManage .basicInformation .image1').val();
		var photo1 = $('#userManage .basicInformation .image2').val();
		var photo2 = $('#userManage .basicInformation .image3').val();
		var dormFlag = $('#userManage .basicInformation select[name="dormFlag"]').val();
		var dorm = $('#userManage .basicInformation input[name="dorm"]').val();
		var diseaseHistoryFlag = $('#userManage .basicInformation select[name="diseaseHistoryFlag"]').val();
		var diseaseHistory = $('#userManage .basicInformation input[name="diseaseHistory"]').val();
		
		var wageAccount = $('#userManage .basicInformation input[name="wageAccount"]').val();//工资账户
		var englishLevel = $('#userManage .basicInformation input[name="englishLevel"]').val();//外语水平
		var idCardValid = $('#userManage .staffRecord .basicInformation input[name="idCardValid"]').val();//身份证有效日期
		var idCardIssued = $('#userManage .staffRecord .basicInformation input[name="idCardIssued"]').val();//身份证发证日期
		
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
			url:'../../userInfo/saveUserInfo.do?getMs='+getMS(),
			data:{
				operaTab:'添加',
				operaInfo:'添加了'+userName+"的员工信息",
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
				nativePlace:nativePlace,
				politicalStatus:politicalStatus,
				marriageFlag:marriageFlag,
				inviteFlag:'1',
				retireFlag:'1',
				dorm:dorm,
				wageAccount:wageAccount,
				englishLevel:englishLevel,
				idCardValid:idCardValid,
				idCardIssued:idCardIssued,
				dormFlag:dormFlag,
				diseaseHistoryFlag:diseaseHistoryFlag,
				diseaseHistory:diseaseHistory,
				photoBase: $('#userManage .basicInformation input[name=pic1]').val(),
				idCardUpImgBase: $('#userManage .basicInformation input[name=pic2]').val(),
				idCardDownImgBase: $('#userManage .basicInformation input[name=pic3]').val(),
			},
			type:'post',
			success:function(data){
				if(data == 400){
					windowControl("数据添加失败");
				}else if(data == 500){
					windowControl("数据添加失败");
				}else{
//					idCardUpload(data,photo,idCard);
//					idCardUpImage(data,photo1,idCard);
//					idCardDownImage(data,photo2,idCard);
					$('#userManage .staffRecord .basicInformation .addMessage').parent().css('display','none');		
					$('#userManage .staffRecord .basicInformation .updateMessage').parent().css('display','block');					
					windowControl("添加数据成功");	
					$('#userManage .staffRecord input[name=userId]').val(data);
				}
			}	
		});
	});
	//下一位员工
	$('#userManage .staffRecord .basicInformation .next').click(function(){
		ui.confirm('是否确定添加下一位员工？',function(z){
			if(z){
				$('#userManage .expsame .addMessage').parent().css('display','block');
				$('#userManage .expsame .updateMessage').parent().css('display','none');
				$('#userManage .staffRecord .otherInfo .display-otherInfo').html('');
				$('#userManage .staffRecord .work .display-work').html('');
				$('#userManage .staffRecord .edu .display-edu').html('');
				$('#userManage .staffRecord .dispatch').hide();
				$('#userManage .staffRecord .userdimission').hide();				
				$('#userManage .staffRecord .basic').find('input').not("input[type=button]").val(null);
				$('#userManage .staffRecord .basic').find('select').val(null);
				$('#userManage .staffRecord .idCard-img input').val(null);
				$('#userManage .staffRecord .idCard-img img').attr('src',null);
				$('#userManage .basicInformation input[name="idCard"]').blur(function(){
					//验证该员工是否在此工作过
					var idCard = $('#userManage .basicInformation input[name="idCard"]').val();
					if(!idCard) return ;
					userManageSelectData(null,'update',idCard,"checked");
				});
			}
		})
	});
	/*********添加员工开启页面时，添加选择部门与岗位的点击事件*********/
	//选择部门
	$('#userManage .basicInformation .chooseDept').click(function(){
		chooseDept();
	    $('#chooseDept .confirm').click(function(){
	    	$('#chooseDept').css('display','none');
	    	var chooseDept = $('#chooseDept .dept').tree('getSelected');
	    	$('#userManage .basicInformation input[name=departmentName]').val(chooseDept.text);
	    	$('#userManage .basicInformation input[name=departmentUrl]').val(chooseDept.id);
	    	$('#chooseDept .confirm').unbind();
	    })
	});
	//选择岗位
	$('#userManage .basicInformation .choosePost').click(function(){
		choosePost();
		$('#choosePost .confirm').click(function(){
	    	$('#choosePost').css('display','none');
	    	var selectPost = $('#choosePost .popuparea .post').datagrid('getSelections');
	    	$('#userManage .basicInformation input[name=postName]').val(selectPost[0].postName);
	    	$('#userManage .basicInformation input[name=postId]').val(selectPost[0].postId);
	    	$('#choosePost .confirm').unbind();
	    })
	});
	
	/*******************离职类型**************************/
	$('#userManage .popups .dimission select[name=dimissionFlag]').html(getDataBySelectKey("dimission_flag"));
	/*******************记录打开窗口***********************/
	$.ajax({
			data:{operaTab:"进入",operaInfo:"人员管理模块"},
			url:'../../systemLog/addSystemLog.do'
		});
})

/*-------------------点击修改员工信息-----------------*/
function userManageUpdateUserInfo(id,idcard,userName){
	//centojs
	//必填* 出现
	$('#userManage .userInfo .basic table span').css('display','inline');
	//设定该页面的userID
	$('#userManage .staffRecord input[name=userId]').val(id);	
	//切换显示的页面
	$('#userManage .staffRecord').css('display','block');
	$('#userManage .main').css('display','none');
	//打开添加窗口
	$('#userManage .staffRecord .otherInfo').css('display','block');
	$('#userManage .staffRecord .work').css('display','block');
	$('#userManage .staffRecord .edu').css('display','block');
	//打开添加窗口
	$('#userManage .staffRecord .otherInfo .otherInfo-table').css('display','block');
	$('#userManage .staffRecord .work .work-table').css('display','block');
	$('#userManage .staffRecord .edu .edu-table').css('display','block');
	//解除锁定输入
	$('#userManage .staffRecord .userInfo .cap').hide()
	//打开添加修改按钮
	$('#userManage .staffRecord .addexp').parent().css('display','block');
	$('#userManage .staffRecord .updateexp').parent().css('display','none');
	//隐藏添加合同按钮
	$('#userManage .staffRecord .basicInformation .addPact').css('display','none');
	//隐藏添加社保按钮
	$('#userManage .staffRecord .basicInformation .addInsurance').css('display','none');
	
	//如果id为空，则添加员工，如果不为空则修改员工信息
	if(id){
		$.ajax({
			url:'../../personnel/selectPackInfo.do?getMs='+getMS(),
			data:{idCard:idcard},
			success:function(data){
				console.log(data);
				data = $.parseJSON(data);
				if(data.length != 0){
					$('#userManage .staffRecord .basicInformation .addPact').css('display','none');
				}else{
					$('#userManage .staffRecord .basicInformation .addPact').css('display','block');
				}
			}
		})
		
		$.ajax({
			url:'../../insurance/findInsuranceByCondition.do?getMs='+getMS(),
			data:{userId:id},
			success:function(data){
				data = $.parseJSON(data);
				data=data.rows;
				if(data.length != 0){
					$('#userManage .staffRecord .basicInformation .addInsurance').css('display','none');
				}else{
					$('#userManage .staffRecord .basicInformation .addInsurance').css('display','block');
				}
			}
		})

		//添加合同
		$('#userManage .staffRecord .basicInformation .addPact').click(function(){
			userManageAddPact(id,idcard,userName);
		})
		
		//添加社保
		$('#userManage .staffRecord .basicInformation .addInsurance').click(function(){
			userManageAddInsurance(id,idcard,userName);
		})
		
		$('#userManage .staffRecord input[name=userId]').attr("data",id);
		$('#userManage .staffRecord .basicInformation .next').css('display','none');
		$('#userManage .staffRecord .basicInformation .read-idCard').css('display','inline');
		//打开添加修改按钮
		$('#userManage .staffRecord .basicInformation .addMessage').parent().css('display','none');		
		$('#userManage .staffRecord .basicInformation .updateMessage').parent().css('display','block');
		$('#userManage .staffRecord .basicInformation .next').css('display','none');
		$('#userManage .basicInformation .chooseDept').attr('disabled','disabled');
		$('#userManage .basicInformation .choosePost').attr('disabled','disabled');
		//解绑身份证验证
		$('#userManage .staffRecord .basicInformation input[name=idCard]').unbind();
		$('#userManage .basicInformation input[name="idCard"]').blur(function(){
			//验证该员工是否在此工作过
			var idCard = $('#userManage .basicInformation input[name="idCard"]').val();
			if(!idCard) 
				return ;
			userManageSelectData(null,'update',idCard,"checked");
		});
		userManageSelectData(id,'update', idcard);
	}else{
		//------添加员工信息-----
		$('#userManage .staffRecord .basicInformation .next').css('display','inline');
		$('#userManage .staffRecord .basicInformation .read-idCard').css('display','inline');
		$('#userManage .staffRecord .basicInformation .addMessage').parent().css('display','block');
		$('#userManage .staffRecord .basicInformation .updateMessage').parent().css('display','none');
		$('#userManage .basicInformation .chooseDept').removeAttr('disabled');
		$('#userManage .basicInformation .choosePost').removeAttr('disabled');
		/********当用户输入了员工的身份证号码的时候进行触发**********/
		$('#userManage .basicInformation input[name="idCard"]').unbind();
		$('#userManage .basicInformation input[name="idCard"]').blur(function(){
			//验证该员工是否在此工作过
			var idCard = $('#userManage .basicInformation input[name="idCard"]').val();
			if(!idCard) 
				return ;
			userManageSelectData(null,'update',idCard,"checked");
		});
	}
}
/*-------------------点击查看员工信息-----------------*/
function userManageLookUserInfo(id,idcard){
	//必填* 消失
	$('#userManage .userInfo .basic table span').css('display','none');
	//设定该页面的userID
	$('#userManage .staffRecord input[name=userId]').val(id);
	//关闭添加窗口
	$('#userManage .staffRecord .otherInfo').css('display','none');
	$('#userManage .staffRecord .work').css('display','none');
	$('#userManage .staffRecord .edu').css('display','none');
	//关闭添加窗口
	$('#userManage .staffRecord .otherInfo .otherInfo-table').css('display','none');
	$('#userManage .staffRecord .work .work-table').css('display','none');
	$('#userManage .staffRecord .edu .edu-table').css('display','none');
	//关闭添加修改按钮
	$('#userManage .staffRecord .addexp').parent().css('display','none');
	$('#userManage .staffRecord .updateexp').parent().css('display','none');
	//锁定输入
	$('#userManage .staffRecord .userInfo .cap').show();
	//切换显示的页面
	$('#userManage .staffRecord').css('display','block');
	$('#userManage .main').css('display','none');
	//取消身份证的验证
	$('#userManage .staffRecord .basicInformation input[name=idCard]').unbind();
	
	$('#userManage .staffRecord .basicInformation .next').css('display','none');
	$('#userManage .staffRecord .basicInformation .read-idCard').css('display','none');
	$('#userManage .staffRecord .basicInformation .addPact').css('display','none');
	//填充数据
	userManageSelectData(id,'look',idcard);
}

//查询员工信息
function userManageSelectData(id,flag,idCard,checked){
	var url = '';
	if(checked == "checked"){
		id = $('#userManage .staffRecord input[name=userId]').val();
		url = "../../userInfo/checkedIdCard.do?getMs="+getMS();
	}else{
		url = "../../userInfo/selectUserInfo.do?getMs="+getMS();
	}
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
			if(id && checked != 'checked'){
				$('#userManage .staffRecord .basicInformation input[name="userAccount"]').val(obj.userAccount);
				$('#userManage .staffRecord .basicInformation input[name="peopleName"]').val(obj.userName);
				$('#userManage .staffRecord .basicInformation input[name="departmentName"]').val(obj.departmentName);
				$('#userManage .staffRecord .basicInformation input[name="departmentUrl"]').val(obj.departmentUrl);
				$('#userManage .staffRecord .basicInformation input[name="postName"]').val(obj.postName);
				$('#userManage .staffRecord .basicInformation input[name="postId"]').val(obj.postId);
				$('#userManage .staffRecord .basicInformation input[name="phoneNum"]').val(obj.phoneNum);
				$('#userManage .staffRecord .basicInformation input[name="accidentPhoneNum"]').val(obj.accidentPhoneNum);
				$('#userManage .staffRecord .basicInformation input[name="birthday"]').val(obj.birthdayStr);
				$('#userManage .staffRecord .basicInformation input[name="idCard"]').val(obj.idCard);
				$('#userManage .staffRecord .basicInformation select[name="sex"]').val(obj.sex);
				$('#userManage .staffRecord .basicInformation input[name="workTime"]').val(obj.workTimeStr);
				$('#userManage .staffRecord .basicInformation input[name="address"]').val(obj.address);
				$('#userManage .staffRecord .basicInformation select[name="leaderFlag"]').val(obj.leaderFlag);
				$('#userManage .staffRecord .basicInformation select[name="education"]').val(obj.education);
				$('#userManage .staffRecord .basicInformation select[name="volk"]').val(obj.volk);
				$('#userManage .staffRecord .basicInformation select[name="politicalStatus"]').val(obj.politicalStatus);
				$('#userManage .staffRecord .basicInformation input[name="nativePlace"]').val(obj.nativePlace);
				$('#userManage .staffRecord .basicInformation select[name="marriageFlag"]').val(obj.marriageFlag);
				$('#userManage .staffRecord .basicInformation select[name="diseaseHistoryFlag"]').val(obj.diseaseHistoryFlag);
				$('#userManage .staffRecord .basicInformation input[name="diseaseHistory"]').val(obj.diseaseHistory);			
				$('#userManage .staffRecord .basicInformation input[name="wageAccount"]').val(obj.wageAccount);
				$('#userManage .staffRecord .basicInformation input[name="englishLevel"]').val(obj.englishLevel);
				$('#userManage .staffRecord .basicInformation input[name="idCardValid"]').val(obj.idCardValid);
				$('#userManage .staffRecord .basicInformation input[name="idCardIssued"]').val(obj.idCardIssued);
				$('#userManage .staffRecord .basicInformation input[name="dorm"]').val(obj.dorm);
				$('#userManage .staffRecord .basicInformation select[name="dormFlag"]').val(obj.dormFlag);
				//显示身份证的照片信息
				var url1 = obj.photo;
				var photo = '../../personnel/downLoadImage.do?url='+url1;
				$("#userManage .staffRecord .basicInformation .pic1").attr("src",photo);
				var url2 = obj.idCardUpImg;
				var idCardUpImg = '../../personnel/downLoadImage.do?url='+url2;
				$("#userManage .staffRecord .basicInformation .pic2").attr("src",idCardUpImg);
				var url3 = obj.idCardDownImg;
				var idCardDownImg = '../../personnel/downLoadImage.do?url='+url3;
				$("#userManage .staffRecord .basicInformation .pic3").attr("src",idCardDownImg);
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
							$('#userManage .basicInformation input[name=leadId]').val(obj.userId);
				        	$('#userManage .basicInformation input[name=leadName]').val(obj.userName);
						}			
					}
				});
				Record();
			}else{
				var flg = 0;
				for(var i = 0 ; i < rows.length ; i++){
					var inviteFlag = rows[i].inviteFlag;
					if(inviteFlag == '1' || inviteFlag == '4' || inviteFlag == '5'){	
						flg = 1;
						break ;
					}else if(inviteFlag == '2'){
						flg = 2;
					}else if(inviteFlag == '3'){
						flg = 3;
					}
				}
				if(flg == 1){
					if(id == null){
						windowControl('该身份证信息为其他在职员工的身份证信息')
					}else{
						if(flag == 'update'){
							windowControl('该身份证为在职员工身份证，不可重复添加'+'<br>姓名：'+ obj.userName +'<br>身份证号：'+idCard);
							$('#userManage .basicInformation input[name=idCard]').val(null);
						}else{
							windowControl('该员工为在职员工，无法进行录用');
							$('#userManage .basicInformation input[name=idCard]').val(null);
						}
					}
				}else if(flg == 2){
					windowControl('该员工曾在本公司离职，但未办理手续，离职记录和调动记录已自动导入');
					Record();
				}else if(flg == 3){
					windowControl('该员工曾在本公司离职，离职记录和调动记录已自动导入');
					Record();
				}
				if(checked == 'checked'){
					return ;
				}
				//解绑身份证验证
				if(inviteFlag == '1' || inviteFlag == '4' || inviteFlag == '5'){
					$('#userManage .staffRecord .basicInformation .addMessage').parent().css('display','none');
				}else{
					$('#userManage .staffRecord .basicInformation .addMessage').parent().css('display','block');
				}
				$('#userManage .staffRecord .basicInformation .updateMessage').parent().css('display','none');
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
					$('#userManage .staffRecord .userdimission').hide();
				}else{
					$('#userManage .staffRecord .userdimission').css('display','block');
				}
				$('#userManage .staffRecord .userdimission .display-dimission').html('');			
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
					$('#userManage .staffRecord .userdimission .display-dimission').append(html);
				}
			}
		});
		/**********************获取员工调动信息**********************/
		$.ajax({
			url:'../../userInfo/selectUserTransfer.do?getMs='+getMS(),
			data:{
				idCard:idCard
			},
			type:'post',
			success:function(data){
				var obj = eval('('+data+')').rows;
				if(obj.length==0){
					$('#userManage .staffRecord .dispatch').hide();
				}else{
					$('#userManage .staffRecord .dispatch').css('display','block');
					
				}
				$('#userManage .staffRecord .dispatch .display-dispatch').html('');			
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
							+'<td style="width:9.3%;">调动时间：</td>'
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
					$('#userManage .staffRecord .dispatch .display-dispatch').append(html);
				}
			}
		});
//		/**********************获取员工合同信息**********************/
//		$.ajax({
//			url:'../../userInfo/selectPactInfo.do?getMs='+getMS(),
//			data:{
//				idCard:idCard
//			},
//			type:'post',
//			success:function(data){
//				alert(data);
//				var obj = $.parseJSON(data);
//				if(obj.length==0){
//					$('#userManage .staffRecord .pactTime').hide();
//				}else{
//					$('#userManage .staffRecord .pactTime').css('display','block');
//					
//				}
//				$('#userManage .staffRecord .pactTime .display-dispatch').html('');			
//				for(var i = 0;i<obj.length;i++){				
//					var html =  '<table style="text-align:right;height:50px;width:100%;">'
//							+'<tr><td></td><td></td><td></td><td></td><td></td></tr>'
//							+'<tr>'
//							+'<td style="width:9.3%;">合同开始时间：</td>'
//							+'<td style="width:26.2%;text-align:left;">'+ obj[i].startTimeStr +'</td>'
//							+'<td style="width:15%;">合同终止时间：</td>'
//							+'<td style="width:26.2%;text-align:left;">'+ obj[i].endTimeStr +'</td>'
//							+'</tr>'
//							+'<tr>'
//							+'<td style="width:9.3%;">试用期开始时间：</td>'
//							+'<td style="width:26.2%;text-align:left;">'+ obj[i].tryStartTimeStr +'</td>'
//							+'<td style="width:15%;">试用期终止时间：</td>'
//							+'<td style="width:26.2%;text-align:left;">'+ obj[i].trtEndTimeStr +'</td>'
//							+'</tr>'
//					html += '</table>';
//					if(i == obj.length-1){
//						html = html;
//					}else{
//						html = html + '<hr/>';
//					}				
//					$('#userManage .staffRecord .pactTime .display-dispatch').append(html);
//				}
//			}
//		});
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
					$('#userManage .staffRecord .otherInfo').css('display','none');
				}else{
					$('#userManage .staffRecord .otherInfo').css('display','block');
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
					$('#userManage .otherInfo .display-otherInfo').append(html);
					$('#userManage .otherInfo .display-otherInfo').find("table:last input").val(obj[i].userInfoOtherId);
				}
				userManageAddOtherInfoEven();
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
					$('#userManage .staffRecord .work').css('display','none');
				}else{
					$('#userManage .staffRecord .work').css('display','block');
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
					$('#userManage .staffRecord .work .display-work').append(html);
					$('#userManage .staffRecord .work .display-work').find("table:last input").val(obj[i].workId);
				}
				userManageAddWorkEvent();
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
					$('#userManage .staffRecord .edu').css('display','none');
				}else{
					$('#userManage .staffRecord .edu').css('display','block');
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
					$('#userManage .staffRecord .edu .display-edu').append(html);
					$('#userManage .staffRecord .edu .display-edu').find("table:last input").val(obj[i].educationId);
				}
				userManageAddEduEvent();
			}
		});
		
	}
	
}
/**********************************添加页面所需的各种事件**************************************/
//添加修改和删除所需的点击事件
function userManageAddUpdateEvent(){
	//====================================修改信息页面中的各种点击事件================================================
	/********当用户点击保存基本信息时的点击事件*******/
	$('#userManage .staffRecord .expsame .updateMessage').click(function(){
		var userId = $('#userManage .staffRecord input[name=userId]').val();
		var userAccount = $('#userManage .staffRecord .basicInformation input[name="userAccount"]').val();
		var password = $('#userManage .staffRecord .basicInformation input[name="password"]').val();
		var userName = $('#userManage .staffRecord .basicInformation input[name="peopleName"]').val();
		var departmentName = $('#userManage .basicInformation input[name="departmentName"]').val();
		var departmentUrl = $('#userManage .basicInformation input[name="departmentUrl"]').val();
		var postName = $('#userManage .basicInformation input[name="postName"]').val();
		var postId = $('#userManage .basicInformation input[name="postId"]').val();
		var leadName = $('#userManage .basicInformation input[name="leadName"]').val();
		var leadId = $('#userManage .basicInformation input[name="leadId"]').val();
		var roleNames = $('#userManage .basicInformation input[name="roleNames"]').val();
		var roleIds = $('#userManage .basicInformation input[name="roleIds"]').val();
		var phoneNum = $('#userManage .staffRecord .basicInformation input[name="phoneNum"]').val();
		var accidentPhoneNum = $('#userManage .staffRecord .basicInformation input[name="accidentPhoneNum"]').val();
		var birthday = $('#userManage .staffRecord .basicInformation input[name="birthday"]').val();
		var idCard = $('#userManage .staffRecord .basicInformation input[name="idCard"]').val();
		var sex = $('#userManage .staffRecord .basicInformation select[name="sex"]').val();
		var workTime = $('#userManage .staffRecord .basicInformation input[name="workTime"]').val();
		var address = $('#userManage .staffRecord .basicInformation input[name="address"]').val();
		var leaderFlag = $('#userManage .staffRecord .basicInformation select[name="leaderFlag"]').val();
		var education = $('#userManage .staffRecord .basicInformation select[name="education"]').val();
		var volk = $('#userManage .staffRecord .basicInformation select[name="volk"]').val();
		var nativePlace = $('#userManage .staffRecord .basicInformation input[name="nativePlace"]').val();
		var politicalStatus = $('#userManage .staffRecord .basicInformation select[name="politicalStatus"]').val();
		var remark = $('#userManage .staffRecord .basicInformation textarea[name="remark"]').val();
		var marriageFlag = $('#userManage .staffRecord .basicInformation select[name="marriageFlag"]').val();
		var dormFlag = $('#userManage .staffRecord .basicInformation select[name="dormFlag"]').val();
		var dorm = $('#userManage .staffRecord .basicInformation input[name="dorm"]').val();
		var diseaseHistoryFlag = $('#userManage .staffRecord .basicInformation select[name="diseaseHistoryFlag"]').val();
		var diseaseHistory = $('#userManage .staffRecord .basicInformation input[name="diseaseHistory"]').val();
		
		var wageAccount = $('#userManage .staffRecord .basicInformation input[name="wageAccount"]').val();//工资账户
		var englishLevel = $('#userManage .staffRecord .basicInformation input[name="englishLevel"]').val();//外语水平
		var idCardValid = $('#userManage .staffRecord .basicInformation input[name="idCardValid"]').val();//身份证有效日期
		var idCardIssued = $('#userManage .staffRecord .basicInformation input[name="idCardIssued"]').val();//身份证发证日期
		
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
				operaTab:'修改',
				operaInfo:'对员工'+userName+"的人员基本信息进行了修改",
				userId:userId,
				userAccount:userAccount,
				password:password,
				userName:userName,
				leadName:leadName,
				leadId:leadId,
				roleNames:roleNames,
				roleIds:roleIds,
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
				nativePlace:nativePlace,
				politicalStatus:politicalStatus,
				marriageFlag:marriageFlag,
				dorm:dorm,
				wageAccount:wageAccount,
				englishLevel:englishLevel,
				idCardValid:idCardValid,
				idCardIssued:idCardIssued,
				dormFlag:dormFlag,
				diseaseHistoryFlag:diseaseHistoryFlag,
				diseaseHistory:diseaseHistory,
				photoBase: $('#userManage .basicInformation input[name=pic1]').val(),
				idCardUpImgBase: $('#userManage .basicInformation input[name=pic2]').val(),
				idCardDownImgBase: $('#userManage .basicInformation input[name=pic3]').val(),
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
	$('#userManage .staffRecord .otherInfo .addexp').click(function(){
		var userName = $('#userManage .staffRecord .basicInformation input[name="peopleName"]').val();
		var userId = $('#userManage .staffRecord input[name=userId]').val();		
		var otherInfoName = $('#userManage .staffRecord .otherInfo input[name=otherInfoName]').val();
		var otherInfoContent = $('#userManage .staffRecord .otherInfo input[name=otherInfoContent]').val();
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
				operaTab:'添加',
				operaInfo:'对员工'+userName+'的额外信息进行了添加',
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
					$('#userManage .staffRecord .otherInfo .display-otherInfo').append(html);
					$('#userManage .staffRecord .otherInfo .otherInfo-table input').val(null);
					$('#userManage .staffRecord .otherInfo .display-otherInfo').find("table:last input").val(data);
					//添加删除修改点击事件
					userManageAddOtherInfoEven();
				}
			}
		});
	});
	/******按钮点击事件，修改额外信息，并且显示出保存成功的额外信息******/
	$('#userManage .staffRecord .otherInfo .updateexp').click(function(){
		var userInfoOtherId = $('#userManage .staffRecord .otherInfo input[name=userInfoOtherId]').val();
		var userId = $('#userManage .staffRecord input[name=userId]').val();
		var otherInfoName = $('#userManage .staffRecord .otherInfo input[name=otherInfoName]').val();
		var otherInfoContent = $('#userManage .staffRecord .otherInfo input[name=otherInfoContent]').val();;
		var userName = $('#userManage .staffRecord .basicInformation input[name="peopleName"]').val();
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
				operaTab:'修改',
				operaInfo:'对员工'+userName+'的额外信息进行了修改',
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
				$('#userManage .staffRecord .otherInfo .display-otherInfo').append(html);
				$('#userManage .staffRecord .otherInfo .otherInfo-table input').val(null);
				$('#userManage .staffRecord .otherInfo .display-otherInfo').find("table:last input").val(userInfoOtherId);
				$('#userManage .staffRecord .otherInfo .addexp').parent().css('display','block');
				$('#userManage .staffRecord .otherInfo .updateexp').parent().css('display','none');
				//添加删除修改点击事件
				userManageAddOtherInfoEven();
			}
		})
	});
	
	
	/******保存工作经历按钮点击事件，保存工作经历，并且显示出保存成功的工作经历******/
	$('#userManage .staffRecord .work .addexp').click(function(){
		var userId = $('#userManage .staffRecord input[name=userId]').val();
		var postName = $('#userManage .staffRecord .work input[name=postName]').val();
		var componyName = $('#userManage .staffRecord .work input[name=componyName]').val();
		var startTime = $('#userManage .staffRecord .work input[name=startTime]').val();
		var endTime = $('#userManage .staffRecord .work input[name=endTime]').val();
		var workDescribe = $('#userManage .staffRecord .work textarea[name=workDescribe]').val();
		var userName = $('#userManage .staffRecord .basicInformation input[name="peopleName"]').val();
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
				operaTab:'添加',
				operaInfo:'对员工'+userName+'的工作经历进行了添加',
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
					$('#userManage .staffRecord .work .display-work').append(html);
					$('#userManage .staffRecord .work .work-table input').val(null);
					$('#userManage .staffRecord .work .work-table textarea').val(null);
					$('#userManage .staffRecord .work .display-work').find("table:last input").val(data);
					//添加删除修改点击事件
					userManageAddWorkEvent();
				}
			}
		});
	});
	
	/******修改工作经历按钮点击事件，修改工作经历，并且显示出保存成功的工作经历******/
	$('#userManage .staffRecord .work .updateexp').click(function(){
		var userName = $('#userManage .staffRecord .basicInformation input[name="peopleName"]').val();
		var userId = $('#userManage .staffRecord input[name=userId]').val();
		var workId = $('#userManage .staffRecord input[name=workId]').val();
		var postName = $('#userManage .staffRecord .work input[name=postName]').val();
		var componyName = $('#userManage .staffRecord .work input[name=componyName]').val();
		var startTime = $('#userManage .staffRecord .work input[name=startTime]').val();
		var endTime = $('#userManage .staffRecord .work input[name=endTime]').val();
		var workDescribe = $('#userManage .staffRecord .work textarea[name=workDescribe]').val();
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
				operaTab:'修改',
				operaInfo:'对员工'+userName+'的工作经历进行了修改',
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
				$('#userManage .staffRecord .work .display-work').append(html);
				$('#userManage .staffRecord .work .work-table input').val(null);
				$('#userManage .staffRecord .work .work-table textarea').val(null);
				$('#userManage .staffRecord .work .display-work').find("table:last input").val(workId);
				$('#userManage .staffRecord .work .addexp').parent().css('display','block');
				$('#userManage .staffRecord .work .updateexp').parent().css('display','none');
				
				//添加删除修改点击事件
				userManageAddWorkEvent();
			}
		})
	});
	
	/******教育经历按钮点击事件，保存工教育经历，并且显示出保存成功的教育经历******/
	$('#userManage .staffRecord .edu .addexp').click(function(){
		var userName = $('#userManage .staffRecord .basicInformation input[name="peopleName"]').val();
		var userId = $('#userManage .staffRecord input[name=userId]').val();
		var schoolName = $('#userManage .staffRecord .edu input[name=schoolName]').val();
		var startTime = $('#userManage .staffRecord .edu input[name=startTime]').val();
		var endTime = $('#userManage .staffRecord .edu input[name=endTime]').val();
		var specialty = $('#userManage .staffRecord .edu input[name=specialty]').val();
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
				operaTab:'添加',
				operaInfo:'对员工'+userName+'的教育经历进行了添加',				
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
					$('#userManage .staffRecord .edu .display-edu').append(html);
					$('#userManage .staffRecord .edu .edu-table input').val(null);
					$('#userManage .staffRecord .edu .display-edu').find("table:last input").val(data);
					//添加删除修改点击事件
					userManageAddEduEvent();
					
				}
			}
		});
		
		
		
		
	});
	
	
	/******教育经历按钮点击事件，修改工教育经历，并且显示出修改成功的教育经历******/
	$('#userManage .staffRecord .edu .updateexp').click(function(){
		var userName = $('#userManage .staffRecord .basicInformation input[name="peopleName"]').val();
		var userId = $('#userManage .staffRecord input[name=userId]').val();
		var schoolName = $('#userManage .staffRecord .edu input[name=schoolName]').val();
		var startTime = $('#userManage .staffRecord .edu input[name=startTime]').val();
		var endTime = $('#userManage .staffRecord .edu input[name=endTime]').val();
		var specialty = $('#userManage .staffRecord .edu input[name=specialty]').val();
		var educationId = $('#userManage .staffRecord .edu input[name=eduId]').val();
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
				operaTab:'修改',
				operaInfo:'对员工'+userName+'的教育经历进行了修改',	
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
					$('#userManage .staffRecord .edu .display-edu').append(html);
					$('#userManage .staffRecord .edu .edu-table input').val(null);
					$('#userManage .staffRecord .edu .display-edu').find("table:last input").val(educationId);
					$('#userManage .staffRecord .edu .addexp').parent().css('display','block');
					$('#userManage .staffRecord .edu .updateexp').parent().css('display','none');
					//添加删除修改点击事件
					userManageAddEduEvent();
				}
			}
		});
		
		
	});
	
	
	//cento
	/*****************设置上下移span的title****************/
	$("#userManage .popups .writetoexcel .upset").attr("title","上移");
	$("#userManage .popups .writetoexcel .downset").attr("title","下移");
	
	/*****************导出到Excel点击弹窗******************/
	$("#userManage .write").click(function(){
		$('#userManage .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#userManage .popups .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'userName',tableHeader:'员工姓名',date:false},
			         {propertyName:'userAccount',tableHeader:'员工编号',date:false},
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
			         {propertyName:'retireFlag',tableHeader:'退休状态',date:false},
			         {propertyName:'politicalStatus',tableHeader:'政治面貌',date:false},
			         {propertyName:'nativePlace',tableHeader:'籍贯',date:false},
			         {propertyName:'marriageFlag',tableHeader:'婚姻状态',date:false},
			         {propertyName:'dormFlag',tableHeader:'是否住宿舍',date:false},
			         {propertyName:'dorm',tableHeader:'宿舍号',date:false},
			         {propertyName:'wageAccount',tableHeader:'工资账户',date:false},
			         {propertyName:'englishLevel',tableHeader:'外语水平',date:false}
				 ]
		})
	})
	
	/*******************重置按钮点击事件***********************/
	$("#userManage .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#userManage .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#userManage .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#userManage .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#userManage .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#userManage .popups .writetoexcel"));
		
		var userManageExcel2 = [];
		for(var i = 0 ; i < userManageExcel.length ; i++){
			userManageExcel2.push(userManageExcel[i]);
		}
		userManageExcel2.push({
			name:'jsonString',value:jsonString
		})
		//提交导出excel所需要的参数
		excelplugin.submit({
			type:'post',
			array:userManageExcel2,
			action:'../../userInfo/writeToExcel.do?'
		})
	});
}

//为额外信息添加点击事件
function userManageAddOtherInfoEven(){
	/************************修改点击事件***********************/
	$('#userManage .staffRecord .otherInfo .display-otherInfo table label .edit').click(function(){
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
				$('#userManage .staffRecord .otherInfo input[name=userInfoOtherId]').val(obj.userInfoOtherId);
				$('#userManage .staffRecord .otherInfo input[name=otherInfoName]').val(obj.type);
				$('#userManage .staffRecord .otherInfo input[name=otherInfoContent]').val(obj.message);
				$('#userManage .staffRecord .otherInfo .addexp').parent().css('display','none');
				$('#userManage .staffRecord .otherInfo .updateexp').parent().css('display','block');
				thisDom.parents('table').next().remove();
				thisDom.parents('table').remove();
			}
		});
	});
	
	/************************删除 点击事件***********************/
	$('#userManage .staffRecord .otherInfo .display-otherInfo table label .delete').click(function(){
		var id = $(this).parent().parent().find('input').val();
		var thisDom = $(this);
		var userName = $('#userManage .staffRecord .basicInformation input[name="peopleName"]').val();
		$.ajax({
			url:'../../userInfo/updateOtherInfo.do?getMs='+getMS(),
			type:'post',
			data:{
				operaTab:'删除',
				operaInfo:'对员工'+userName+"的额外信息进行了删除",
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
function userManageAddWorkEvent(){
	/************************修改点击事件***********************/
	$('#userManage .staffRecord .work .display-work table label .edit').click(function(){
		var id = $(this).parent().parent().find('input').val();
		var thisDom = $(this);
		$.ajax({
			url:'../../userInfo/selectWork.do?getMs='+getMS(),
			data:{
				workId:id
			},
			success:function(data){
				var obj = eval('('+data+')').rows[0];
				$('#userManage .staffRecord .work input[name=workId]').val(obj.workId);
				$('#userManage .staffRecord input[name=userId]').val(obj.userId);
				$('#userManage .staffRecord .work input[name=postName]').val(obj.postName);
				$('#userManage .staffRecord .work input[name=componyName]').val(obj.componyName);
				$('#userManage .staffRecord .work input[name=startTime]').val(obj.startTimeStr);
				$('#userManage .staffRecord .work input[name=endTime]').val(obj.endTimeStr);
				$('#userManage .staffRecord .work textarea[name=workDescribe]').val(obj.workDescribe);
				$('#userManage .staffRecord .work .addexp').parent().css('display','none');
				$('#userManage .staffRecord .work .updateexp').parent().css('display','block');
				thisDom.parents('table').next().remove();
				thisDom.parents('table').remove();
			}
		});
	});
	
	/************************删除工作 点击事件***********************/
	$('#userManage .staffRecord .work .display-work table label .delete').click(function(){
		var id = $(this).parent().parent().find('input').val();
		var thisDom = $(this);
		var userName = $('#userManage .staffRecord .basicInformation input[name="peopleName"]').val();
		$.ajax({
			url:'../../userInfo/updateWork.do?getMs='+getMS(),
			type:'post',
			data:{
				operaTab:'删除',
				operaInfo:'对员工'+userName+"的工作经历进行了删除",
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
function userManageAddEduEvent(){
	/************************修改点击事件***********************/
	$('#userManage .staffRecord .edu .display-edu table label .edit').click(function(){
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
				$('#userManage .staffRecord .edu input[name=eduId]').val(id);
				$('#userManage .staffRecord .edu input[name=schoolName]').val(obj.schoolName);
				$('#userManage .staffRecord .edu input[name=specialty]').val(obj.specialty);
				$('#userManage .staffRecord .edu input[name=startTime]').val(obj.startTimeStr);
				$('#userManage .staffRecord .edu input[name=endTime]').val(obj.endTimeStr);
				$('#userManage .staffRecord .edu .addexp').parent().css('display','none');
				$('#userManage .staffRecord .edu .updateexp').parent().css('display','block');
				thisDom.parents('table').next().remove();
				thisDom.parents('table').remove();
			},
		})
	});
	
	/************************删除教育 信息***********************/
	$('#userManage .staffRecord .edu .display-edu table label .delete').click(function(){
		var id = $(this).parent().parent().find('input').val();
		var thisDom = $(this);
		var userName = $('#userManage .staffRecord .basicInformation input[name="peopleName"]').val();
		$.ajax({
			url:'../../userInfo/updateEdu.do?getMs='+getMS(),
			type:'post',
			data:{
				operaTab:'删除',
				operaInfo:'删除员工'+userName+"的一条教育信息",
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

//-----------------员工调动方法和批量调动方法------------------------------
function userTransfer(id,departmentUrl,departmentName,postId,postName,idCard,userName){
	//获取当前登录人的部门
	$.ajax({
		url:'../../user/getUserInfo.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			if(data == '500')
				return ;
			var data = eval('(' + data + ')');
			userInfo = data;
			console.log(data);
			if(data.userId != 'admin'){
				$('#punchCard').show();
				$('#punchCard').attr('data',data.userId);
			}
			$('#userManage .popups .userTransfer input[name=newDepartmentName]').val(data.departmentName);
			$('#userManage .popups .userTransfer input[name=newDepartmentUrl]').val(data.departmentUrl);
			if(data.departmentName != '厂部'){
				$("#userManage .popups .userTransfer .chooseDept").attr("disabled", true); 
			}
		},
		error:function(error){
			windowControl(error.status);
		}
	});
	var dom = $('#userManage .popups .userTransfer');
	dom.find('input').not('.button').val(null);
	dom.find('textarea').val(null);
	dom.find('input[name=userId]').val(id);
	dom.find('input[name=oldPostName]').val(postName);
	dom.find('input[name=oldPostId]').val(postId);
	dom.find('input[name=oldDepartmentName]').val(departmentName);
	dom.find('input[name=oldDepartmentUrl]').val(departmentUrl);
	dom.css('display','block');
	//选择岗位
	dom.find('.choosePost').unbind();
	dom.find('.choosePost').click(function(){
		choosePost();
		$('#choosePost .confirm').unbind();
		$('#choosePost .confirm').click(function(){
			$('#choosePost').css('display','none');
			var selectPost = $('#choosePost .popuparea .post').datagrid('getSelections');
			dom.find('input[name=newPostName]').val(selectPost[0].postName);
			dom.find('input[name=newPostId]').val(selectPost[0].postId);
			$('#choosePost').css('display','none');
		});
	});
	//选择部门
	dom.find('.chooseDept').unbind();
	dom.find('.chooseDept').click(function(){
		chooseDept();
		$('#chooseDept .confirm').unbind();
		$('#chooseDept .confirm').click(function(){
			var chooseDeptObj = $('#chooseDept .dept').tree('getSelected');
			dom.find('input[name=newDepartmentName]').val(chooseDeptObj.text);
			dom.find('input[name=newDepartmentUrl]').val(chooseDeptObj.id);
			$('#chooseDept').css('display','none');
		});
	});
	
	//单一员工调动点击事件
	$('#userManage .popups .userTransfer .comfirm').unbind();
	$('#userManage .popups .userTransfer .comfirm').click(function(){
		var dom = $('#userManage .popups .userTransfer');
		if(!dom.find('input[name=newPostId]').val()){
			windowControl("请选择调动岗位！");
		}else if(!dom.find('input[name=newDepartmentUrl]').val()){
			windowControl("请选择调动部门！");
		}else if(!dom.find('input[name=transferTime]').val()){
			windowControl("请选择调动时间！");
		}else{
			$.ajax({
				url:'../../userInfo/userTransfer.do?getMs='+getMS(),
				data:{
					operaTab:'修改',
					operaInfo:'对员工'+userName+"进行了调动",
					idCard:idCard,
					userId:id,
					oldPostId:dom.find('input[name=oldPostId]').val(),
					oldDepartmentUrl:dom.find('input[name=oldDepartmentUrl]').val(),
					newPostId:dom.find('input[name=newPostId]').val(),
					newPostName:dom.find('input[name=newPostName]').val(),
					newDepartmentUrl:dom.find('input[name=newDepartmentUrl]').val(),
					newDepartmentName:dom.find('input[name=newDepartmentName]').val(),
					transferTimeStr:dom.find('input[name=transferTime]').val(),
					remark:dom.find('textarea[name=remark]').val()
				},
				type:'post',
				success:function(data){
					if(data == 200){
						dom.css('display','none');
						windowControl("员工调动成功");
						$('#userManagedg').datagrid('reload');
					}else{
						windowControl("员工调动失败");
					}
				},
				error:function(){
					windowControl("服务器未响应");
				}
			})
		}	
	});
}
/***************************************************员工管理部分*****************************************/
/*-------------------点击员工管理------------------------------*/
function governUserInfo(id, departmentUrl, departmentName, postId, postName,
		inviteFlag, retireFlag, userName, idCard) {
	// 当为在职，试用，工伤时
	var opera = '';
	if ((inviteFlag == 1 || inviteFlag == 4) && retireFlag != 2) {
		opera = opera + '<option>员工调动</option>' + '<option>离职</option>'
				+ '<option>工伤</option>';
		if (inviteFlag == 4)
			opera = opera + '<option>转正</option>';
		// 判断退休状态
		if (retireFlag == 1) {
			opera = opera + '<option>退休</option>';
		} else if (retireFlag == 2) {
			opera = opera + '<option>返聘</option>' + '<option>取消退休</option>';
		} else if (retireFlag == 3) {
			opera = opera + '<option>退休</option>';
		}
	} else if (inviteFlag == 2) {
		opera = opera + '<option>完成离职</option>' + '<option>取消离职</option>';
		// 当离职有手续时
	} else if (inviteFlag == 3) {
		if (retireFlag == 2) {
			opera = opera + '<option>返聘</option>' + '<option>取消退休</option>';
		}else{
			opera = opera + '<option>再次聘用</option>';
		}
	} else if (inviteFlag == 5) {
		opera = opera + '<option>工伤复职</option>' + '<option>离职</option>';
		if (retireFlag == 1) {
			opera = opera + '<option>退休</option>';
		} else if (retireFlag == 2) {
			opera = opera + '<option>返聘</option>' + '<option>取消退休</option>';
		} else if (retireFlag == 3) {
			opera = opera + '<option>退休</option>';
		}	
	}
	$('#userManage #governType').html(opera);
	$('#userManage .governArea input[name=peopleName]').val(userName);
	$('#userManage .governArea').css('display', 'block');
	$('#userManage .governArea .comfirm').unbind('click');
	$('#userManage .governArea .comfirm').click(function() {
		$('#userManage .governArea').css('display', 'none');
		var governType = $('#userManage #governType option:selected').val();
		if (governType == '员工调动') {
			userTransfer(id, departmentUrl, departmentName, postId,
					postName, idCard,userName);
		} else if (governType == '离职') {
			fireUser(id, userName, departmentUrl, postId, idCard);
		} else if (governType == '工伤') {
			userInjury(id, userName);
		} else if (governType == '退休') {
			retire(id, userName);
		} else if (governType == '返聘') {
			employBack(id, userName);
		} else if (governType == '取消退休') {
			retireCancel(id, userName);
		} else if (governType == '退休') {
			retire(id, userName);
		} else if (governType == '完成离职') {
			fireFinish(id, userName);
		} else if (governType == '取消离职') {
			fireCancel(id, userName);
		} else if (governType == '再次聘用') {
			employAgain(id, userName);
		} else if (governType == '转正') {
			becomeOfficial(id, userName);
		} else if (governType == '工伤复职'){
			resumePost(id, userName);
		}
	})
}

/*-------------------点击删除员工信息-----------------*/
function userManageDeleteUserInfo(id, userName){
	ui.confirm('确认删除'+userName+'的员工信息？',function(z){
		if(z){
			$.ajax({
				data:{
					operaTab:'删除',
					operaInfo:'对员工'+userName+'进行了删除',
					userId:id,
					aliveFlag:'0'
				},
				url:'../../userInfo/updateUserInfo.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == '200'){
						$("#userManage #userManagedg").datagrid("reload");
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
//转正员工
function becomeOfficial(userId, userName){
	ui.confirm('确定要将员工 '+userName+' 转正吗？',function(z){
		if(z){
			$.ajax({
				url:'../../userInfo/updateUserInfo.do?getMs='+getMS(),
				data:{
					operaTab:'修改',
					operaInfo:'对员工'+userName+'进行了转正',
					inviteFlag:'1',
					userId:userId
				},
				success:function(data){
					if(data == 200){
						windowControl('员工转正成功');
						$('#userManagedg').datagrid('reload');
					}else{
						windowControl('员工转正失败');
					}
				},
				error:function(){
					windowControl('服务器未响应');
				}
			});
		}
	},false);
}

//离职员工
function fireUser(userId, userName, departmentUrl, postId,idCard){
	var dom = $('#userManage .popups .dimission');
	dom.find('table input[type!=radio]').val(null);
	dom.find('table textarea').val(null);
	dom.css('display','block');
	dom.find('input[name=peopleName]').val(userName);
	dom.find('.comfirm').unbind();
	dom.find('.comfirm').click(function(){		
		var val = dom.find('input[name=inviteFlag]:checked').val();
		var url = '';
		var inviteFlag = '';
		if(!dom.find('input[name=dimissionTime]').val()){
			windowControl("请选择离职时间！");
		}else{
			ui.confirm('确定要离职员工 '+userName+' 吗？',function(z){
				if(z){					
					if(val==2){
						url = '../../dimission/addDimissionRecord.do?getMs='+getMS();
						inviteFlag = '2';
					}else if(val==3){
						url = '../../dimission/fireUserFinish.do?getMs='+getMS();
						inviteFlag = '3';
					}else if(val==6){
						url = '../../dimission/improperFireUser.do?getMs='+getMS();
						inviteFlag = '6'
					}
					else if(val==7){
						url = '../../dimission/improperFireUser.do?getMs='+getMS();
						inviteFlag = '7'
					}
					$.ajax({
						url:url,
						data:{
							operaTab:'修改',
							operaInfo:'对员工'+userName+'进行了离职',
							inviteFlag:inviteFlag,
							userId:userId,
							remark:dom.find('textarea[name=remark]').val(),
							dimissionTime:dom.find('input[name=dimissionTime]').val(),
							departmentUrl:departmentUrl,
							postId:postId,
							idCard:idCard,
							dimissionFlag:dom.find('select[name=dimissionFlag]').val()
						},
						method:"post",
						success:function(data){
							if(data == 200){
								windowControl('离职员工成功');
								dom.css('display','none');
								$('#userManagedg').datagrid('reload');
							}else{
								windowControl('离职员工失败');
							}
						},
						error:function(){
							windowControl('服务器未响应');
						}
					});
				}
			},false);
		}
	})
}
//将员工转为工伤
function userInjury(userId,userName){
	ui.confirm('确定要将员工'+userName+'转为工伤？',function(z){
		if(z){
			$.ajax({
				url:'../../userInfo/updateUserInfo.do?getMs='+getMS(),
				data:{
					operaTab:'修改',
					operaInfo:'将员工'+userName+'转为工伤',
					inviteFlag:'5',
					userId:userId
				},
				success:function(data){
					if(data == 200){
						windowControl('转为工伤成功');
						$('#userManagedg').datagrid('reload');
					}else{
						windowControl('转为工伤成功');
					}
				},
				error:function(){
					windowControl('服务器未响应');
				}
			});
		}
	},false);
}

//工伤复职
function resumePost(userId,userName){
	ui.confirm('确定要将工伤员工'+userName+'恢复在职？',function(z){
		if(z){
			$.ajax({
				url:'../../userInfo/updateUserInfo.do?getMs='+getMS(),
				data:{
					operaTab:'修改',
					operaInfo:'将工伤员工'+userName+'恢复在职',
					inviteFlag:'1',
					userId:userId
				},
				success:function(data){
					if(data == 200){
						windowControl('转为工伤成功');
						$('#userManagedg').datagrid('reload');
					}else{
						windowControl('转为工伤成功');
					}
				},
				error:function(){
					windowControl('服务器未响应');
				}
			});
		}
	},false);
}
//离职手续完成
function fireFinish(userId, userName){
	ui.confirm('确定完成员工'+userName+'的离职吗？',function(z){
		if(z){
			var dom = $('#userManage .popups .dimission');
			$.ajax({
				url:'../../dimission/fireFinish.do?getMs='+getMS(),
				data:{
					operaTab:'修改',
					operaInfo:'完成了员工'+userName+'的离职手续',
					userId:userId
				},
				success:function(data){
					if(data == 200){
						windowControl('离职完成成功');
						$('#userManagedg').datagrid('reload');
					}else{
						windowControl('离职完成失败');
					}
				},
				error:function(){
					windowControl('服务器未响应');
				}
			})
		}
	})
}
//取消离职
function fireCancel(userId,userName){
	ui.confirm('取消离职员工'+userName+'？',function(z){
		if(z){
			$.ajax({
				url:'../../dimission/fireCancel.do?getMs='+getMS(),
				data:{
					operaTab:'修改',
					operaInfo:'取消了员工'+userName+'的离职',
					userId:userId
				},
				success:function(data){
					if(data == 200){
						windowControl('取消离职成功');
						$('#userManagedg').datagrid('reload');
					}else{
						windowControl('取消离职失败');
					}
				},
				error:function(){
					windowControl('服务器未响应');
				}
			});
		}
	},false);
}
//二次录用
function employAgain(userId, userName){
	ui.confirm('确定要再次录用员工'+userName+'吗？',function(z){
		if(z){
			$.ajax({
				url:'../../userInfo/updateUserInfo.do?getMs='+getMS(),
				data:{
					operaTab:'修改',
					operaInfo:'对员工'+userName+'进行了二次录用',
					inviteFlag:'1',
					userId:userId
				},
				success:function(data){
					if(data == 200){
						windowControl('再次应聘成功');
						$('#userManagedg').datagrid('reload');
					}else{
						windowControl('再次应聘失败');
					}
				},
				error:function(){
					windowControl('服务器未响应');
				}
			});
		}
	},false);
}
//员工退休
function retire(userId,userName){
	ui.confirm('确定要使员工'+userName+'退休吗？',function(z){
		if(z){
			$.ajax({
				url:'../../userInfo/updateUserInfo.do?getMs='+getMS(),
				data:{
					operaTab:'修改',
					operaInfo:'对员工'+userName+'进行了退休',
					retireFlag:'2',
					inviteFlag:'3',
					userId:userId
				},
				success:function(data){
					if(data == 200){
						windowControl('员工退休成功');
						$('#userManagedg').datagrid('reload');
					}else{
						windowControl('员工退休失败');
					}
				},
				error:function(){
					windowControl('服务器未响应');
				}
			});
		}
	},false);
}
//返聘
function employBack(userId,userName){
	ui.confirm('确定要返聘员工'+userName+'吗？',function(z){
		$.ajax({
			url:'../../userInfo/updateUserInfo.do?getMs='+getMS(),
			data:{
				operaTab:'修改',
				operaInfo:'对员工'+userName+'进行了返聘',
				retireFlag:'3',
				inviteFlag:'1',
				userId:userId
			},
			success:function(data){
				if(data == 200){
					windowControl('返聘成功');
					$('#userManagedg').datagrid('reload');
				}else{
					windowControl('返聘失败');
				}
			},
			error:function(){
				windowControl('服务器未响应');
			}
		});
	},false);
}
//取消退休
function retireCancel(userId,userName){
	ui.confirm('确定要取消员工'+userName+'退休吗？',function(z){
		if(z){
			$.ajax({
				url:'../../userInfo/updateUserInfo.do?getMs='+getMS(),
				data:{
					operaTab:'修改',
					operaInfo:'取消了员工'+userName+'的退休',
					retireFlag:'1',
					inviteFlag:'1',
					userId:userId
				},
				success:function(data){
					if(data == 200){
						windowControl('取消退休成功');
						$('#userManagedg').datagrid('reload');
					}else{
						windowControl('取消退休失败');
					}
				},
				error:function(){
					windowControl('服务器未响应');
				}
			})
		}
	},false);
}


function userManageAddPact(userId,idCard,userName){
	$.ajax({
		url:'../../personnel/selectPackInfo.do?getMs='+getMS(),
		data:{idCard:idCard},
		success:function(data){
			data = $.parseJSON(data);
			if(data.length != 0){
				//windowControl("该员工已有合同！")
			}else{
				$('#userManage .popups .savePact').css('display','block');
				$('#userManage .popups .savePact input[name=peopleName]').val(userName);
				$('#userManage .popups .savePact input[name=userId]').val(userId);
			}
		}
	})
}

function userManageAddInsurance(userId,idCard,userName){
	$.ajax({
		url:'../../insurance/findInsuranceByCondition.do?getMs='+getMS(),
		data:{userId:userId},
		success:function(data){
			data = $.parseJSON(data);
			data=data.rows;
			if(data.length != 0){
				//windowControl("该员工已有社保！")
			}else{
				$('#userManage .popups .savesocialsecurity').css('display','block');
				$('#userManage .popups .savesocialsecurity input[name=userId]').val(userId);
				$('#userManage .popups .savesocialsecurity input[name=peopleName]').val(userName);
			}
		}
	})
}


