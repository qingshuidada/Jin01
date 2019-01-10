$(function(){
	/*if(existPermission('admin:personnel:socialSecurity:welfare:add'))
		$('#welfare .maintop').append('<div class="add"><span class="maintopicon mainicon2"></span> <span>添加</span></div>');*/

	$('#welfare .flow').css('height',$('#loadarea').height()-31+'px');
	$('#welfare .welfareGiveObj .giveObjdg').parent().css('height',$('#loadarea').height()-64+'px');
	$('#welfare .welfareLookObj .lookObjdg').parent().css('height',$('#loadarea').height()-64+'px');
	/*-------------------------------福利计划-----------------------------------------*/
	$('#welfaredg').datagrid({
		   url:'../../welfare/findWelfareByCondition.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#welfare .list .invitetop",
		   method:"post",
		   fit: true,
		   columns:[[
		      /* {field:"_op",title:"管理",width:100,resizable:true,align:"center",width:100,sortable:true,formatter:function(value,row,index){
		    	   var id ="'"+row.welfareId+"'";
		    	   var status = "'"+row.examineStatus+"'";
		    	   var opera = '';
		    	   if(row.examineStatus == 0){
		    		   if(existPermission('admin:personnel:socialSecurity:welfare:recall'))
		    			   opera +='<span class="small-button edit" onclick="amendWelfarePlan('+id+','+index+')" title="修改福利计划"></span>';
		    			   opera +='<span class="small-button xiugai" onclick="updateGiveObj('+id+','+status+')" title="修改发放对象"></span>';
		    		   	   opera +='<span class="small-button addbtn" onclick="insertWelfareStream('+id+')" title="发起福利流程"></span>';
		    	   }else if(row.examineStatus == 1){
		    		       opera +='<span class="small-button recall" onclick="withdrawwelfare('+id+')" title="撤回"></span>';
		    		   if(existPermission('admin:personnel:socialSecurity:welfare:select'))
		    			   opera +='<span class="small-button lookflow" onclick="lookwelfare('+id+')" title="查看流程"></span>';
		    		   if(existPermission('admin:personnel:socialSecurity:welfare:select'))
		    			   opera +='<span class="small-button look" onclick="lookwelfareObj('+id+','+status+')" title="查看发放对象"></span>';
		    	   }else if(row.examineStatus == 3){
		    		   if(existPermission('admin:personnel:socialSecurity:welfare:select'))
		    			   opera +='<span class="small-button lookflow" onclick="lookwelfare('+id+')" title="查看流程"></span>';
		    		   if(existPermission('admin:personnel:socialSecurity:welfare:select'))
		    			   opera +='<span class="small-button look" onclick="lookwelfareObj('+id+','+status+')" title="查看发放对象"></span>';
		    	   }else{
		    		   if(existPermission('admin:personnel:socialSecurity:welfare:select'))
		    			   opera +='<span class="small-button lookflow" onclick="lookwelfare('+id+')" title="查看流程"></span>';
		    	   }
		    	   //return opera;
		       }},*/
		       {field:"welfareName",title:"福利名称",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"welfareCode",title:"福利编码",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"population",title:"人数",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
		       {field:"budgetAmount",title:"预算金额",fitColumns:true,resizable:true,align:"center",sortable:true,width:80},
		       {field:"giveTimeStr",title:"发放时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:110},
		       {field:"text",title:"发放内容",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		       {field:"reason",title:"发放原因",fitColumns:true,resizable:true,align:"center",sortable:true,width:150},
		       {field:"createUserName",title:"申请人",fitColumns:true,sortable:true,align:"center",sortable:true,width:75},
		       {field:"createTimeStr",title:"申请日期",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		      /* {field:"updateTimeStr",title:"更新日期",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"examineStatus",title:"审批状态",fitColumns:true,resizable:true,align:"center",width:60,sortable:true,formatter:function(value,row,index){
		    	   if(row.examineStatus == '1'){
		    		   return "待审";
		    	   }else if(row.examineStatus == '2'){
		    		   return "撤回";
		    	   }else if(row.examineStatus == '3'){
		    		   return "备案";
		    	   }else if(row.examineStatus == '4'){
		    		   return "驳回";
		    	   }else if(row.examineStatus == '0'){
		    		   return "计划中";
		    	   }
		    	   
		    	  // return getValueFromKey("examine_status",row.examineStatus);
		       }},*/
		    ]]
	});
/*-------------------------------福利具体内容&申请理由-----------------------------------------*/
	//$('#welfare .apply').css('width','475px');
	
	//添加福利信息点击事件
	/*$("#welfare .maintop .add").click(function(){
		$("#welfare .popups .savewelfare").css("display","block");
		var mydate = new Date();
		var year = mydate.getYear(); //获取年份
		var mon = mydate.getMonth()+1; //获取当前月份
		var day = mydate.getDate(); //获取当前日
		var h = mydate.getHours(); //获取当前小时数
		var m = mydate.getMinutes(); //获取当前分钟数
		var s = mydate.getSeconds(); //获取当前秒数
		if(mon < 10){
			mon = '0'+mon;
		}
		if(h < 10){
			h = '0'+h;
		}
		if(m < 10){
			m = '0'+m;
		}
		if(s < 10){
			s = '0' +s;
		}
		year -= 100;
		var num = year + mon + day + h + m +s;
		$('#welfare .popups .savewelfare input[name=serialNum]').val(num);
	});*/
	//部门or职位or离职选择
	$("#welfare .popups .savewelfare .radio").change(function(){
		var index = $(this).index();
		objflag = index+1;
		if(index == 2){
			$("#welfare .popups .savewelfare .showdepart").hide();
			$("#welfare .popups .savewelfare .popuparea .deptBtn").css('visibility','hidden');
		}else if(index == 1){
			$("#welfare .popups .savewelfare .showdepart .selectTishi").html("所选岗位:");
			$("#welfare .popups .savewelfare .showdepart").show();
			$("#welfare .popups .savewelfare .popuparea .deptBtn").css('visibility','visible');
			$("#welfare .popups .savewelfare .popuparea .deptBtn").attr('index',index);
			$('#welfare .popups .savewelfare input[name=selective]').val(null);
		}else if(index == 0){
			$("#welfare .popups .savewelfare .showdepart .selectTishi").html("所选部门:");
			$("#welfare .popups .savewelfare .showdepart").show();
			$("#welfare .popups .savewelfare .popuparea .deptBtn").css('visibility','visible');
			$("#welfare .popups .savewelfare .popuparea .deptBtn").attr('index',index);
			$('#welfare .popups .savewelfare input[name=selective]').val(null);
		}
	});
	//调用选择的接口
	$("#welfare .popups .savewelfare .popuparea .deptBtn").click(function(){
		if($(this).attr('index') == 0){
			chooseDept();
			$('#chooseDept .confirm').one('click',function(){
				$('#chooseDept').css('display','none');
				selectUser = $('#chooseDept .popuparea .dept').tree('getSelected');
		    	$('#welfare .popups .savewelfare input[name=selective]').val('"'+selectUser.text+'"');
		    	$('#welfare .popups .savewelfare input[name=deptId]').val(selectUser.id);
			});
		}else if($(this).attr('index') == 1){
			choosePost();
			$('#choosePost .confirm').one('click',function(){
				$('#choosePost').css('display','none');	
				selectUser = $('#choosePost .popuparea .post').datagrid('getSelections');
		    	$('#welfare .popups .savewelfare input[name=selective]').val('"'+selectUser[0].postName+'"');
		    	$('#welfare .popups .savewelfare input[name=postId]').val(selectUser[0].postId);
			});
		}else {
			windowControl("请选择福利对象");
		}
	})
	//调用人员的接口
	$("#welfare .popups .savewelfare .popuparea .examBtn").click(function(){
		chooseUser();
		$('#chooseUser .confirm').one('click',function(){
			$('#chooseUser').css('display','none');	
			selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#welfare .popups .savewelfare input[name=examineUserName]').val(selectUser[0].userName);
	    	$('#welfare .popups .savewelfare input[name=examineUserName]').attr('examId',selectUser[0].userId);
		});
	});
	//调用福利名称的接口
	$("#welfare .invitetop .welBtn").click(function(){
		$('#welfarechooseUser').css('display','block');
		$('#welfarechooseUser .popuparea .user').datagrid({
			title:'福利名称',
		    url:'../../welfare/queryWelfareNameAll.do?getMs='+getMS(),
		    method:"post",
		    columns:[[
				{field:'welfareName',title:'福利名称',width:120},
		    ]],
		   	singleSelect:true,
		   	toolbar:'#welfarechooseUser .queryForm',
		   	queryParams:{
		   		welfareName:function(){
		   			return $('#welfarechooseUser .queryForm input[name=welfareName]').val();
		   		},
		   	}
		})
		$('#welfarechooseUser .popuparea .queryForm input[name=query]').click(function(){
			$.ajax({
				url:'../../welfare/queryWelfareNameAll.do?getMs='+getMS(),
				success:function(data){
					if(data == 500){
						windowControl("服务器异常");
					}else{
						$('#welfarechooseUser .popuparea .user').datagrid('reload');
					}
				}
			})
			$('#welfarechooseUser .popuparea .user').datagrid('reload');
		});
		$('#welfarechooseUser .confirm').one('click',function(){
			$('#welfarechooseUser').css('display','none');	
			selectUser = $('#welfarechooseUser .popuparea .user').datagrid('getSelections');
	    	$('#welfare .invitetop input[name=welfareName]').val(selectUser[0].welfareName);
	    	//$('#welfarechooseUser .invitetop input[name=welfareName]').attr('welfareId',selectUser[0].welfareId);
		});
	});
	//保存福利事件
	$("#welfare .popups .savewelfare .confirm").click(function(){
		var departmentId = $.trim($('#welfare .popups .savewelfare input[name=deptId]').val());
		var postId = $.trim($('#welfare .popups .savewelfare input[name=postId]').val());
		//var welfareCode = $.trim($('#welfare .popups .savewelfare input[name=serialNum]').val());
		var welfareName = $.trim($('#welfare .popups .savewelfare input[name=welfarename]').val());
		var welfareText = $.trim($('#welfare .popups .savewelfare textarea[name=welfaretext]').val());
		var reason = $.trim($('#welfare .popups .savewelfare textarea[name=welfarereason]').val());
		var givetime = $.trim($('#welfare .popups .savewelfare input[name=givetime]').val());
		var examineUserName = $.trim($('#welfare .popups .savewelfare input[name=examineUserName]').val());
		var examineUserId = $.trim($('#welfare .popups .savewelfare input[name=examineUserName]').attr('examId'));
		
		if(departmentId == '' ||departmentId == null){
			var departmentName = '';
			var postName = $.trim($('#welfare .popups .savewelfare input[name=selective]').val());
		}else{
			var departmentName = $.trim($('#welfare .popups .savewelfare input[name=selective]').val());
			var postName = '';
		}
		//console.log("departmentName="+departmentName+",departmentId="+departmentId);
		if(welfareText==''||welfareText==null){
			windowControl("福利内容不能为空");
		}else if(reason==''||reason==null){
			windowControl("申请理由不能为空");
		}else if(givetime==''||givetime==null){
			windowControl("发放时间不能为空");
		}/*else if(welfareCode == ''||welfareCode == null){
			windowControl("福利编码不能为空");
		}*/else if(examineUserName == ''||examineUserName == null){
			windowControl("审批人不能为空");
		}else if(objflag == ""||objflag == null){
			windowControl("请选择福利对象");
		}else{
			var info = {
				departmentId:departmentId,
				departmentName:departmentName,
				postName:postName,
				postId:postId,
				//welfareCode:welfareCode,
				welfareName:welfareName,
				text:welfareText,
				reason:reason,
				giveTimeStr:givetime,
				objFlag:objflag,
				examineUserName:examineUserName,
				examineUserId:examineUserId
			}
			$.ajax({
				data :info,
				url : '../../welfare/applyForWelfare.do?getMs='+getMS(),
				type : 'post',
				success : function(data) {
					windowControl("发起成功");
					$('.popup').css('display', 'none');
					$('.popup input').not('.button').val(null);
					$('.popup textarea').val(null);
					$('#welfaredg').datagrid('reload');
				},
				error : function(err) {
					windowControl(err.status);
				}
			})
		}
	});
/*-------------------------------选择后的内容-----------------------------------------*/
	
	$('#pSelect').change(function(){
		var box=$('#pSelect option:selected').val();
		var dom = '<span class="close">'+box+'</span>';
		$('.choose').append(dom);
		$('.close').css({"padding":"5px 10px","display":"inline-block","background":"url(../../img/personnel/socialSecurity/remove_03.png)no-repeat","background-size":"10px","background-position":"47px 5px"});
		flag=true;
		$('.close').click(function(){
			$(this).remove();
		})
	});

/*-------------------------------------查询---------------------------------------------------*/
	$('#welfare a[name=queryWelfare]').click(function(){
		var createUserName = $('#welfare .people').val();
		var welfareName = $('#welfare .invitetop input[name=welfareName]').val();
		var welfareCode = $('#welfare .invitetop input[name=welfareCode]').val();
		var examineStatus = $('#welfare .invitetop select[name=examineStatus] option:selected').val();
		var objFlag = $('#welfare .invitetop select[name=objFlag] option:selected').val();
		var startCreateTime = $('#welfare .invitetop input[name=startCreateTime]').val();
		var endCreateTime = $('#welfare .invitetop input[name=endCreateTime]').val();
		if(startCreateTime != null && startCreateTime != ""){
			startCreateTime += " 00:00:00"
		}
		if(endCreateTime != null && endCreateTime != ""){
			endCreateTime += " 23:59:59"
		}
		$('#welfaredg').datagrid({
			queryParams:{
				createUserName:createUserName,
				examineStatus:examineStatus,
				welfareName:welfareName,
				welfareCode:welfareCode,
				objFlag:objFlag,
				startCreateTimeStr:startCreateTime,
				endCreateTimeStr:endCreateTime
			}
		});
	});
	/*-------返回----*/
	$('#welfare .maintop .back').click(function(){
		$('#welfare #welfaredg').datagrid('reload');
		$('#welfare .list').css('display','block');
		$('#welfare .welfareGiveObj').css('display','none');
		$('#welfare .welfareLookObj').css('display','none');
		//$('#welfare .welfareLookObj .lookObjdg').datagrid('loadData',{total:0,rows:[]});
	});
	$('#welfare .flow .flowbar .back').click(function(){
		$('#welfare .list').css('display','block');
		$('#welfare .flow').css('display','none');
	});
	
	
	/**************examineStatus****************/
	//$('#welfare .invitetop select[name=examineStatus]').html(getDataBySelectKeyNo("examine_status"));
	/**************examineStatus****************/
	//$('#welfare .invitetop select[name=objFlag]').html(getDataBySelectKeyNo("provide_obj_flag"));
	/**************inviteFlag****************/
	$('#welfare .invitetop select[name=inviteFlag]').html(getDataBySelectKeyNo("invite_flag"));
	
	$('#welfare .amendWelfarePlan .confirm').click(function(){
		var welfareName = $.trim($('#welfare .amendWelfarePlan .popuparea input[name=welfareName]').val());
		var text = $.trim($('#welfare .amendWelfarePlan .popuparea textarea[name=welfareText]').val());
		var population = $.trim($('#welfare .amendWelfarePlan .popuparea input[name=population]').val());
		var budgetAmount = $.trim($('#welfare .amendWelfarePlan .popuparea input[name=budgetAmount]').val());	
		var reason = $.trim($('#welfare .amendWelfarePlan .popuparea textarea[name=welfareReason]').val());
		var giveTime = $.trim($('#welfare .amendWelfarePlan .popuparea input[name=giveTime]').val());
		var welfareId = $('#welfare .amendWelfarePlan .popuparea input[name=welfareName]').attr('welfareId');
		console.log("giveTime="+giveTime);
		if(welfareName==''||welfareName==null){
			windowControl("福利名不能为空");
			return;
		}else if(text==''||text==null){
			windowControl("福利内容不能为空");
			return;
		}else if(population==''||population==null){
			windowControl("福利人数不能为空");
			return;
		}else if(budgetAmount==''||budgetAmount==null){
			windowControl("福利金额不能为空");
			return;
		}else if(reason==''||reason==null){
			windowControl("福利原因不能为空");
			return;
		}else if(giveTime==''||giveTime==null){
			windowControl("发放时间不能为空");
			return;
		}else{
			var info = {
				welfareId:welfareId,
				welfareName:welfareName,
				text:text,
				population:population,
				budgetAmount:budgetAmount,
				reason:reason,
				giveTimeStr:giveTime
			}
			$.ajax({
				url:'../../welfare/updateWelfareo.do?getMs='+getMS(),
				data:info,
				success:function(data){
					if(data == 200){
						windowControl('修改福利计划成功');
					}else{
						windowControl('修改福利计划失败');
					}
					$('#welfare .amendWelfarePlan').css('display','none');
					$('#welfare .amendWelfarePlan .popuparea textarea').val(null);
					$('#welfare .amendWelfarePlan .popuparea input[type=text]').val(null);
					$('#welfare #welfaredg').datagrid('reload');
				},
				error:function(err){
					windowControl('服务器异常');
				}
			})
		}
	});
	$('#welfare .welfareLookObj .lookObjdg').datagrid({
		   url:'../../welfare/findRecordByCondition.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#welfare .welfareLookObj .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       //{field:"ck",checkbox:true },
		       {field:"getUserName",title:"姓名",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"getUserIdCard",title:"身份证",fitColumns:true,resizable:true,align:"center",sortable:true,width:135},
		       {field:"welfareName",title:"福利名称",fitColumns:true,resizable:true,align:"center",sortable:true,width:120},
		       {field:"welfareCode",title:"福利编码",fitColumns:true,resizable:true,align:"center",sortable:true,width:90},
		       {field:"text",title:"描述",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"reason",title:"原因",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"departmentName",title:"所属部门",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"postName",title:"所属岗位",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"giveTimeStr",title:"发放时间",fitColumns:true,sortable:true,align:"center",sortable:true,width:130},
		       {field:"getTimeStr",title:"领取时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"getFlag",title:"是否领取",fitColumns:true,resizable:true,align:"center",width:60,sortable:true,formatter:function(value,row,index){
		    	   if(value ==0){
		     		   return "未领取";
		     	   }else if(value ==1){
		     		  return "已领取";
		     	   }
		       }},
		       /*{field:"_op",title:"管理",width:100,resizable:true,width:100,align:"center",sortable:true,formatter:function(value,row,index){
		    	   var id = "'"+row.welfareRecordId+"'";
		    	   var opera = "";
		    	   opera +='<span class="small-button delete" onclick="deleteGiveObj('+id+')" title="删除"></span>';
		    	   return opera;
		       }},*/
		    ]]
		}); 
	$('#welfare .welfareGiveObj .giveObjdg').datagrid({
		   url:'../../welfare/findRecordByCondition.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#welfare .welfareGiveObj .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"_op",title:"管理",width:100,resizable:true,width:100,align:"center",sortable:true,formatter:function(value,row,index){
		    	   var id = "'"+row.welfareRecordId+"'";
		    	   var welfareId = "'"+row.welfareId+"'";
		    	   var budgetAmount = "'"+row.budgetAmount+"'";
		    	   var opera = "";
		    	   opera +='<span class="small-button delete" onclick="deleteGiveObj('+id+','+welfareId+','+budgetAmount+')" title="删除"></span>';
		    	   return opera;
		       }},
		       {field:"getUserName",title:"姓名",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"getUserIdCard",title:"身份证",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"welfareName",title:"福利名称",fitColumns:true,resizable:true,align:"center",sortable:true,width:120},
		       {field:"welfareCode",title:"福利编码",fitColumns:true,resizable:true,align:"center",sortable:true,width:90},
		       {field:"text",title:"描述",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"reason",title:"原因",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"departmentName",title:"所属部门",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"postName",title:"所属岗位",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"giveTimeStr",title:"发放时间",fitColumns:true,sortable:true,align:"center",sortable:true,width:130},
		       {field:"getTimeStr",title:"领取时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"getFlag",title:"是否领取",fitColumns:true,resizable:true,align:"center",width:60,sortable:true,formatter:function(value,row,index){
		    	   if(value ==0){
		     		   return "未领取";
		     	   }else if(value ==1){
		     		  return "已领取";
		     	   }
		       }},
		    ]],
		    onLoadSuccess:function(data){
		    	   $('#welfare input[name=total]').val(data.total);
		      }
		}); 
})

/*---------------------------------------------查看福利-----------------------------------------------------------------*/
var objflag; //福利对象
function lookwelfare(id){
	$('#welfare .list').css('display','none');
	$('#welfare .flow').css('display','block');
	$('#welfare .welfareGiveObj').css('display','none');
	$('#welfare .welfareLookObj').css('display','none');
	$.ajax({
		data:{welfareId:id},
		url:'../../welfare/findStreamByCondition.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			var html = '';
			for(var i = 0; i<obj.length ; i++){
				if(typeof obj[i].nextExamineUserName == 'undefined'){
					obj[i].nextExamineUserName = '';
				}
				if(typeof obj[i].examineIdea == 'undefined'){
					obj[i].examineIdea = '';
				}
				if(typeof obj[i].examineTimeStr == 'undefined'){
					obj[i].examineTimeStr = '';
				}
				if(typeof obj[i].examineUserName == 'undefined'){
					obj[i].examineUserName = '';
				}
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
			$('#welfare .flow .showView').html(html);
			$('#welfare .flow .flowplan .planName').val(obj[0].welfareName);
			$('#welfare .flow .flowplan .createUserName').val(obj[0].createUserName);
			$('#welfare .flow .flowplan .createTimeStr').val(obj[0].createTimeStr);
			$('#welfare .flow .flowplan .giveTime').val(obj[0].giveTimeStr);
			if(obj[0].examineStatus == "1")
				$('#welfare .flow .flowplan .welfareStatus').val("待审");
			if(obj[0].examineStatus == "2")
				$('#welfare .flow .flowplan .welfareStatus').val("撤回");
			if(obj[0].examineStatus == "3")
				$('#welfare .flow .flowplan .welfareStatus').val("通过");
			if(obj[0].examineStatus == "4")
				$('#welfare .flow .flowplan .welfareStatus').val("驳回");
			
			$('#welfare .flow .flowplan .text').html(obj[0].text);
			$('#welfare .flow .flowplan .reason').html(obj[0].reason);
			
		},
		error:function(err){
			windowControl(err.status);
		}
	})
	/*$.ajax({
		data:{welfareId:id},
		url:'../../welfare/findStreamByCondition.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var obj = eval('(' + data + ')').rows;
			$('#welfare .flow .flowplan .planName').val(obj[0].welfareName);
			$('#welfare .flow .flowplan .createUserName').val(obj[0].createUserName);
			$('#welfare .flow .flowplan .createTimeStr').val(obj[0].createTimeStr);
			$('#welfare .flow .flowplan .giveTime').val(obj[0].giveTimeStr);
			$('#welfare .flow .flowplan .welfareStatus').val(getValueFromKey("examine_status",obj[0].examineStatus));
			$('#welfare .flow .flowplan .text').html(obj[0].text);
			$('#welfare .flow .flowplan .reason').html(obj[0].reason);
			
		},
		error:function(err){
			windowControl(err.status);
		}
	})*/
}
/*-----------撤回福利-----------*/
function withdrawwelfare(id){
	ui.confirm('你确认要撤回吗？',function(z){
        if(z){
        	$.ajax({
        		data:{welfareId:id,examineStatus:'2'},
        		url:'../../welfare/withdrawWelfareApply.do?getMs='+getMS(),
        		success:function(data){
        			if(data == 200){
        				windowControl("撤回成功");
        				$('#welfaredg').datagrid('reload');
        			}else{
        				windowControl("撤回失败");
        			}
        		},
        		error:function(err){
        			windowControl(err.status);
        		}
        	});
        }
	},true);
}
//调用人员的接口
$("#welfare .initiateWelfare .popuparea .examBtn").click(function(){
	chooseUser();
	$('#chooseUser .confirm').one('click',function(){
		$('#chooseUser').css('display','none');	
		selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
		$('#welfare .initiateWelfare .popuparea input[name=examineUserName]').val(selectUser[0].userName);
		$('#welfare .initiateWelfare .popuparea input[name=examineUserName]').attr('examId',selectUser[0].userId);
	});
});
/*-------修改福利计划-----------------*/
function amendWelfarePlan(id,index){
	var row = $('#welfare #welfaredg').datagrid('getData').rows[index];
	$('#welfare .amendWelfarePlan .popuparea input[name=welfareName]').attr('welfareId',id);
	$('#welfare .amendWelfarePlan .popuparea input[name=welfareName]').val(row.welfareName);
	$('#welfare .amendWelfarePlan .popuparea textarea[name=welfareText]').val(row.text);
	$('#welfare .amendWelfarePlan .popuparea input[name=population]').val(row.population);
	$('#welfare .amendWelfarePlan .popuparea input[name=budgetAmount]').val(row.budgetAmount);
	$('#welfare .amendWelfarePlan .popuparea textarea[name=welfareReason]').val(row.reason);
	$('#welfare .amendWelfarePlan .popuparea input[name=giveTime]').val(row.giveTimeStr);
	$('#welfare .amendWelfarePlan').css('display','block');
}

/*-------发起福利流程-----------------*/
function insertWelfareStream(id){
	$('#welfare .initiateWelfare').css('display','block');
	$('#welfare .flow .flowplan .planName').attr('welfareId',id);
}
/*-------确定发起福利流程-----------------*/
$('#welfare .initiateWelfare .confirm').click(function(){
	var examineUserName = $.trim($('#welfare .initiateWelfare input[name=examineUserName]').val());
	var examineUserId = $.trim($('#welfare .initiateWelfare input[name=examineUserName]').attr('examId'));
	var welfareId = $.trim($('#welfare .flow .flowplan .planName').attr('welfareId'));
	if(examineUserName == null || examineUserName == ""){
		windowControl("请填写审批人");
	}else{
		$.ajax({
			data:{examineUserName:examineUserName,examineUserId:examineUserId,welfareId:welfareId},
			url:'../../welfare/insertWelfareStream.do?getMs='+getMS(),
			success:function(data){
				if(data == 200){
					windowControl("发起福利流程成功");
					$('#welfare .initiateWelfare').css('display','none');
					$('#welfare .initiateWelfare .popuparea input').not('.button').val(null);
					$('#welfaredg').datagrid('reload');
				}else{
					windowControl("发起福利流程失败");
				}
			},
			error : function(err) {
				windowControl('服务器异常');
			}
		})
	}
	
})
/*-------跳转进入福利发放记录-----------*/
function lookwelfareObj(id,status){
	$('#welfare .list').css('display','none');
	$('#welfare .welfareLookObj').css('display','block');
	$('#welfare .welfareGiveObj').css('display','none');
	$('#welfare .welfareLookObj .lookObjdg').datagrid({
		queryParams:{
		   welfareId:id
	   },
	});
}
function updateGiveObj(id,status){
	$('#welfare .list').css('display','none');
	$('#welfare .welfareGiveObj').css('display','block');
	$('#welfare .welfareLookObj').css('display','none');
	$('#welfare .welfareGiveObj .giveObjdg').datagrid({
		 queryParams:{
			   welfareId:id,
			   finishFlag:'0'
		   },
	});
}

function deleteGiveObj(id,welfareId,budgetAmount){//删除福利发放对象
	var total = $('#welfare input[name=total]').val();
	ui.confirm('确认删除福利发放对象',function(z){
		if(z){
			$.ajax({
				data:{welfareRecordId:id,population:(total-1),welfareId:welfareId,budgetAmount:budgetAmount},
				url:'../../welfare/deleteRecordForGet.do?getMs='+getMS(),
				success:function(data){
					if(data == 200){
						windowControl("删除成功");
						$('#welfare input[name=total]').val(total-1);
						$('#welfare .welfareGiveObj .giveObjdg').datagrid('reload');
					}else if(data == 400){
						windowControl("数据异常");
					}else{
						windowControl("服务器异常");
					}
				}
			});
		}
	},false);
}