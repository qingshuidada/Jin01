var checkInfoQueryExcel = [];
$(function(){
	if(existPermission('admin:personnel:attendanceManage:checkInfoQuery:export'))
		$('#checkInfoQuery .maintop').append('<input type="button" value="导出查询结果到Excel" class="button write" />');
	$('#checkInfoQuery').css('height',$('#loadarea').height()-31+'px');
	/*设置表格的高度*/
	$('#checkInfoQuerydg').css('height',$('#loadarea').height()-62+'px');
	/*网格数据加载*/
	$('#checkInfoQuerydg').datagrid({
		pagination:true,
		toolbar:'#checkInfoQuery .queryForm',
		columns:[[
			{field:"_opera",title:"管理",width:50,align:"center",formatter:function(value,row,index){
				   var opera = '';
				   var id = "'"+row.userId+"'";
				   var userName = "'"+row.userName+"'";
				   var attendanceGroupName = "'"+row.attendanceGroupName+"'";
				   opera += '<div class="imgBox">';
				   opera += '<span style="float:left;margin:0px;" class="small-button lookAttendance" title="查看" onclick="checkInfoQueryTimeWidget('+ id +','+ userName +','+ attendanceGroupName +')"></span>'
				   opera += '</div>'
				   return opera;
			}},
			{field:'userAccount',title:'员工编号',width:60,align:'center'},
			{field:'userName',title:'姓名',width:60,align:'center'},
			{field:'idCard',title:'身份证',width:150,align:'center'},
			{field:"sex",title:"性别",align:'center',width:50,formatter:function(value,row,index){
				var sex = row.sex;
				if(sex == 1){
					return '男';
				}else{
					return '女';
				}
			}},
			{field:'departmentName',title:'部门',width:60,align:'center'},
			{field:'postName',title:'岗位',width:60,align:'center'},
			{field:'attendanceGroupName',title:'考勤组',width:80,align:'center'},
			{field:'attendanceDays',title:'出勤天数',width:60,align:'center'},
			{field:'restDays',title:'休息天数',width:60,align:'center'},
			{field:'lateTimes',title:'迟到次数',width:60,align:'center'},
			{field:'earlyTimes',title:'早退次数',width:60,align:'center'},
			{field:'missTimes',title:'缺卡次数',width:60,align:'center'},
			{field:'absentDays',title:'旷工天数',width:60,align:'center'},
			{field:'businessLeaveDays',title:'事假天数',width:60,align:'center'},
			{field:'sickLeaveDays',title:'病假天数',width:60,align:'center'}
	    ]]
	});
	/*查询*/
	$('#checkInfoQuery .queryForm .query').click(function(){
		var balanceMonth = $.trim($('#checkInfoQuery .queryForm .balanceMonth').val());
		var attendanceGroupId = $.trim($('#checkInfoQuery .queryForm .attendanceGroupId').val());
		var departmentUrl = $.trim($('#checkInfoQuery .queryForm input[name=departmentUrl]').val());
		var postId = $.trim($('#checkInfoQuery .queryForm input[name=postId]').val());
		var peopleName = $.trim($('#checkInfoQuery .queryForm input[name=peopleName]').val());
		var idCard = $.trim($('#checkInfoQuery .queryForm input[name=idCard]').val());
		var userAccount = $.trim($('#checkInfoQuery .queryForm input[name=userAccount]').val());
		var info = {
			balanceMonth:balanceMonth,
			attendanceGroupId:attendanceGroupId,
			departmentUrl:departmentUrl,
			postId:postId,
			userName:peopleName,
			idCard:idCard,
			userAccount:userAccount
		};
		checkInfoQueryExcel = [
     		{name:'balanceMonth',value:balanceMonth},
     		{name:'attendanceGroupId',value:attendanceGroupId},
  	   		{name:'departmentUrl',value:departmentUrl},
  	   		{name:'postId',value:postId},
  	   		{name:'userName',value:peopleName},
  	   		{name:'idCard',value:idCard},
  	   		{name:'userAccount',value:userAccount}
   		];
		$('#checkInfoQuerydg').datagrid({
			url:'../../clock/getMonthFormByCondition.do?getMs='+getMS(),
			queryParams:info
		})
	});
	//获取月份
	$.ajax({
		url:'../../clock/getBalanceMonth.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var obj = JSON.parse(data);
			var monthHtml = '';
			if(obj.length == 0){
				monthHtml += '<option>当前无考勤信息！</option>'
			}			
			for(i = 0 ; i < obj.length ; i++){
				monthHtml += '<option value="'+ obj[i] +'">'+ obj[i] +'</option>';
			}
			$('#checkInfoQuery .queryForm .balanceMonth').html(monthHtml);
		},
		error:function(){
			windowControl("服务器未响应");
		}
	});
	//获取考勤组
	$.ajax({
		url:'../../attendance/findGroupByCondition.do?getMs='+getMS(),
		type:'post',
		success:function(data){
			var rows = eval('('+data+')').rows
			var groupHtml = '<option value=""></option>';
			for(i = 0 ; i < rows.length ; i++){
				groupHtml += '<option value="'+ rows[i].groupId +'">'+ rows[i].groupName +'</option>';
			}
			$('#checkInfoQuery .queryForm .attendanceGroupId').html(groupHtml);
		},
		error:function(){
			windowControl("服务器未响应");
		}
	});
	//选择部门
	$('#checkInfoQuery .queryForm .departmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#checkInfoQuery .queryForm input[name=departmentName]').val(chooseDept.text);
		     $('#checkInfoQuery .queryForm input[name=departmentUrl]').val(chooseDept.id);
		     $('#chooseDept .confirm').unbind();
		})
	})
	//选择岗位
	$('#checkInfoQuery .queryForm .postChooseObj').click(function(){
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
	    	$('#checkInfoQuery .queryForm input[name=postName]').val(postNames);
	    	$('#checkInfoQuery .queryForm input[name=postId]').val(postIds);
	    	$('#choosePost .confirm').unbind();
	    })
	})
	//清空
	$('#checkInfoQuery .queryForm .reset').click(function(){
		$('#checkInfoQuery .queryForm').find('input[type!=button]').val(null);
	})
	
	// 查看员工考勤信息
	$('#checkInfoQuery #oneBodyCheckInfo').css('height',$('#loadarea').height()-30 +'px');
	
	//导出excel start
	/*****************设置上下移span的title****************/
	$("#checkInfoQuery .popups .writetoexcel .upset").attr("title","上移");
	$("#checkInfoQuery .popups .writetoexcel .downset").attr("title","下移");
	
	/*****************导出到Excel点击弹窗******************/
	$("#checkInfoQuery .write").click(function(){
		$('#checkInfoQuery .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#checkInfoQuery .popups .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'userAccount',tableHeader:'员工编号',date:false,propertyType:'String'},
			         {propertyName:'userName',tableHeader:'姓名',date:false,propertyType:'String'},
			         {propertyName:'idCard',tableHeader:'身份证',date:false,propertyType:'String'},
			         {propertyName:'sex',tableHeader:'性别',date:false,propertyType:'String'},
			         {propertyName:'departmentName',tableHeader:'部门',date:false,propertyType:'String'},
			         {propertyName:'postName',tableHeader:'岗位',date:false,propertyType:'String'},
			         {propertyName:'attendanceGroupName',tableHeader:'考勤组',date:false,propertyType:'String'},
			         {propertyName:'attendanceDays',tableHeader:'出勤天数',date:false,propertyType:'Integer'},
			         {propertyName:'restDays',tableHeader:'休息天数',date:false,propertyType:'Integer'},
			         {propertyName:'lateTimes',tableHeader:'迟到次数',date:false,propertyType:'Integer'},
			         {propertyName:'earlyTimes',tableHeader:'早退次数',date:false,propertyType:'Integer'},
			         {propertyName:'missTimes',tableHeader:'缺卡次数',date:false,propertyType:'Integer'},
			         {propertyName:'absentDays',tableHeader:'旷工天数',date:false,propertyType:'Integer'},
			         {propertyName:'businessLeaveDays',tableHeader:'事假天数',date:false,propertyType:'Double'},
			         {propertyName:'sickLeaveDays',tableHeader:'病假天数',date:false,propertyType:'Double'}
				 ]
		})
	})
	
	/*******************重置按钮点击事件***********************/
	$("#checkInfoQuery .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#checkInfoQuery .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#checkInfoQuery .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#checkInfoQuery .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#checkInfoQuery .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#checkInfoQuery .popups .writetoexcel"));
		
		var checkInfoQueryExcel2 = [];
		for(var i = 0 ; i < checkInfoQueryExcel.length ; i++){
			checkInfoQueryExcel2.push(checkInfoQueryExcel[i]);
		}
		checkInfoQueryExcel2.push({
			name:'jsonString',value:jsonString
		})
		//提交导出excel所需要的参数
		excelplugin.submit({
			type:'post',
			array:checkInfoQueryExcel2,
			action:'../../clock/writeToExcel.do?getMs='+getMS()
		})
	});
	//导出excel end
	
})


//查看员工考勤信息
//时间控件
function checkInfoQueryTimeWidget(id,userName,attendanceGroupName){
	//标记属于员工姓名以及所属考勤组
	var belongGrounpHtml = '<dd>员工姓名：'+ userName +'</dd><dd>所在考勤组：'+ attendanceGroupName +'</dd>';
	$("#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail .belongGrounp").html(belongGrounpHtml);
	$("#checkInfoQuery .listForm").hide();
	$("#checkInfoQuery #oneBodyCheckInfo").show();
	/******************时间控件*************************/
	/*
	1.声明dateObj变量，并赋初值为当前系统时间
	2.给div中渲染html元素
	3.通过dateObj获取当月1号的信息，并以此遍历出表格中所有日期
	4.绑定事件
	*/
    /*
    * 用于记录日期，显示的时候，根据dateObj中的日期的年月显示
    */
    var dateObj = (function(){
        var _date = new Date();    // 默认为当前系统时间
        return {
          getDate : function(){
            return _date;
          },
          setDate : function(date) {
            _date = date;
          }
        };
    })();
 
    // 初始化
    renderHtml();
    showCalendarData();
    var currentMonth = getDateStr(dateObj.getDate()).substr(0,4)+'-'+getDateStr(dateObj.getDate()).substr(4,2);
    getMonthCheckDetail(currentMonth);
    
    //解绑点击事件
    $('#checkInfoQuery #oneBodyCheckInfo .calendarTable .currentMonth').unbind('click');
    $("#checkInfoQuery #oneBodyCheckInfo .calendarTop .prevMonth").unbind('click');
    $("#checkInfoQuery #oneBodyCheckInfo .calendarTop .nextMonth").unbind('click');
    $("#checkInfoQuery #oneBodyCheckInfo .calendarTop .yearsSelect").unbind('click');
    $("#checkInfoQuery #oneBodyCheckInfo .calendarTop .monthsSelect").unbind('click');  
    $("#checkInfoQuery #oneBodyCheckInfo .calendarTop .back").unbind('click')
	//点击返回
    $("#checkInfoQuery #oneBodyCheckInfo .calendarTop .back").click(function(){
    	$("#checkInfoQuery .listForm").show();
    	$("#checkInfoQuery #oneBodyCheckInfo").hide();
    })
    // 点击日期，展示右边详细的考勤信息
	$('#checkInfoQuery #oneBodyCheckInfo .calendarTable .currentMonth').click(function(){
		$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail ul').show();
		var day = $(this).attr('data');
		var recordDateStr = day.substr(0,4) + '-' + day.substr(4,2) + '-' + day.substr(6,2);
		var str = day.substr(0,4) + '年' + day.substr(4,2) + '月' + day.substr(6,2) + '日的考勤信息';
		var isLeave = $(this).attr('isLeave');
		$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail .title').text(str);
		$.ajax({
    		url:'../../clock/getClockDayDetail.do?getMs='+getMS(),
    		data:{
    			recordDateStr:recordDateStr,
    			userId:id,
    			isLeave:isLeave
    		},
    		type:'post',
    		success:function(data){
    			var objData = JSON.parse(data)
    			$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail ul li p').text('');
    			if(objData.attendanceRecord){    				
    				obj = objData.attendanceRecord;    				
    				if(obj.leaveFlag == 0){
    					if(!obj.clockInTime && !obj.clockOutTime){
    						$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail .leaveFlag').text('旷工');
    					}else{
    						$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail .leaveFlag').text('正常上班');
    					};
    					if(obj.beLateFlag == 0){
    						$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail .beLateFlag').text("否");
    					}else if(obj.beLateFlag == 1){
    						$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail .beLateFlag').text("是");
    					};
    					if(obj.leaveEarlyFlag == 0){
    						$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail .leaveEarlyFlag').text("否");
    					}else if(obj.leaveEarlyFlag == 1){
    						$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail .leaveEarlyFlag').text("是");
    					};
    				}else if(obj.leaveFlag == 1){
    					$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail .leaveFlag').text('病假');
    				}else if(obj.leaveFlag == 2){
    					$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail .leaveFlag').text('事假');
    				}else if(obj.leaveFlag == 3){
    					$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail .leaveFlag').text('外出');
    				}else if(obj.leaveFlag == 4){
    					$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail .leaveFlag').text('休息');
    				}else if(obj.leaveFlag == 5){
    					$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail .leaveFlag').text('放假');
    				};
    				$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail .onDutyTime').text(obj.onDutyTime);
    				$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail .offDutyTime').text(obj.offDutyTime);//当天班次时间
    				if(obj.clockInTime){
    					$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail .clockInTime').text(obj.clockInTime);						
					};
    				if(obj.clockOutTime){
						$('#checkInfoQuery #oneBodyCheckInfo .myCheckInfoDetail .clockOutTime').text(obj.clockOutTime);
					};
    			}
    		},
    		error:function(){
    			windowControl("服务器未响应");
    		}
		})
	})
    
    // 绑定事件
    //点击上下月
    $("#checkInfoQuery #oneBodyCheckInfo .calendarTop .prevMonth").click(function(){
    	var date = dateObj.getDate();
        dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
        showCalendarData();
        var currentMonth = getDateStr(dateObj.getDate()).substr(0,4)+'-'+getDateStr(dateObj.getDate()).substr(4,2);
        getMonthCheckDetail(currentMonth);
    })
    $("#checkInfoQuery #oneBodyCheckInfo .calendarTop .nextMonth").click(function(){
    	 var date = dateObj.getDate();
         dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
         showCalendarData();
         var currentMonth = getDateStr(dateObj.getDate()).substr(0,4)+'-'+getDateStr(dateObj.getDate()).substr(4,2);
         getMonthCheckDetail(currentMonth);
    })
    
    //年月输入框变化事件
    $("#checkInfoQuery #oneBodyCheckInfo .calendarTop .yearsSelect").change(function(){
    	var date = dateObj.getDate();
        dateObj.setDate(new Date($(this).val(), date.getMonth(), 1));
        showCalendarData();
        var currentMonth = getDateStr(dateObj.getDate()).substr(0,4)+'-'+getDateStr(dateObj.getDate()).substr(4,2);
        getMonthCheckDetail(currentMonth);
    });
    $("#checkInfoQuery #oneBodyCheckInfo .calendarTop .monthsSelect").change(function(){
    	var date = dateObj.getDate();
        dateObj.setDate(new Date(date.getFullYear(), $(this).val(), 1));
        showCalendarData();
        var currentMonth = getDateStr(dateObj.getDate()).substr(0,4)+'-'+getDateStr(dateObj.getDate()).substr(4,2);
        getMonthCheckDetail(currentMonth);
    });
    
    /**
     * 获取当月考勤信息
     */
    function getMonthCheckDetail(balanceMonth){
    	$.ajax({
    		url:'../../clock/getClockMonthForm.do?getMs='+getMS(),
    		data:{
    			balanceMonth:balanceMonth,
    			userId:id
    		},
    		type:'post',
    		success:function(obj){
    			var data = JSON.parse(obj);
    			if(data.clockMonthBalanceForm){
    				$('#checkInfoQuery #oneBodyCheckInfo .monthCheckInfoDetail .attendanceDays').text(data.clockMonthBalanceForm.attendanceDays);//出勤天数
    				$('#checkInfoQuery #oneBodyCheckInfo .monthCheckInfoDetail .restDays').text(data.clockMonthBalanceForm.restDays);//休息天数
    				$('#checkInfoQuery #oneBodyCheckInfo .monthCheckInfoDetail .lateTimes').text(data.clockMonthBalanceForm.lateTimes);//迟到次数
    				$('#checkInfoQuery #oneBodyCheckInfo .monthCheckInfoDetail .earlyTimes').text(data.clockMonthBalanceForm.earlyTimes);//早退次数
    				$('#checkInfoQuery #oneBodyCheckInfo .monthCheckInfoDetail .missTimes').text(data.clockMonthBalanceForm.missTimes);//缺卡次数
    				$('#checkInfoQuery #oneBodyCheckInfo .monthCheckInfoDetail .absentDays').text(data.clockMonthBalanceForm.absentDays);//旷工天数
    				$('#checkInfoQuery #oneBodyCheckInfo .monthCheckInfoDetail .businessLeaveDays').text(data.clockMonthBalanceForm.businessLeaveDays);//事假天数
    				$('#checkInfoQuery #oneBodyCheckInfo .monthCheckInfoDetail .sickLeaveDays').text(data.clockMonthBalanceForm.sickLeaveDays);//病假天数
    			}else{
    				$('#checkInfoQuery #oneBodyCheckInfo .monthCheckInfoDetail .attendanceDays').text('0');//出勤天数
    				$('#checkInfoQuery #oneBodyCheckInfo .monthCheckInfoDetail .restDays').text('0');//休息天数
    				$('#checkInfoQuery #oneBodyCheckInfo .monthCheckInfoDetail .lateTimes').text('0');//迟到次数
    				$('#checkInfoQuery #oneBodyCheckInfo .monthCheckInfoDetail .earlyTimes').text('0');//早退次数
    				$('#checkInfoQuery #oneBodyCheckInfo .monthCheckInfoDetail .missTimes').text('0');//缺卡次数
    				$('#checkInfoQuery #oneBodyCheckInfo .monthCheckInfoDetail .absentDays').text('0');//旷工天数
    				$('#checkInfoQuery #oneBodyCheckInfo .monthCheckInfoDetail .businessLeaveDays').text('0');//事假天数
    				$('#checkInfoQuery #oneBodyCheckInfo .monthCheckInfoDetail .sickLeaveDays').text('0');//病假天数
    			}
    			var list = data.clockDayForms;
    			for(var i = 0 ; i < list.length ; i++){
    				var recordDateStr = list[i].recordDateStr.substr(0,4) + list[i].recordDateStr.substr(5,2) + list[i].recordDateStr.substr(8,2);
    				for(var j = 0 ; j < $("#checkInfoQuery #oneBodyCheckInfo .calendarTable").find("td").length ; j++){
    					var dom = $("#checkInfoQuery #oneBodyCheckInfo .calendarTable").find("td").eq(j);
    					if(recordDateStr == dom.attr('data')){
    						if(list[i].leaveFlag == 0){
    							dom.find('.workStatus').siblings('.dateNember').css('color','#049cfd');//正常上班颜色
    							var str = '';
    							var str1 = '';
    							if(list[i].beLateFlag == 0){
    								str += '<span>'+ list[i].clockInTime +'</span>';
    							}else if(list[i].beLateFlag == 1){
    								str += '<span>'+ list[i].clockInTime +'</span>';
    							}else if(list[i].beLateFlag == 2){
    								str += '<span>&nbsp;</span>';
    							};
    							if(list[i].leaveEarlyFlag == 0){
    								str1 += '<span>'+ list[i].clockOutTime +'</span>';
    							}else if(list[i].leaveEarlyFlag == 1){
    								str1 += '<span>'+ list[i].clockOutTime +'</span>';
    							}else if(list[i].leaveEarlyFlag == 2){
    								str1 += '<span>&nbsp;</span>';
    							};
    							var strHtml = str + str1;
    							if(list[i].beLateFlag == 2 && list[i].leaveEarlyFlag == 2){
    								dom.find('.workStatus').siblings('.dateNember').css('color','red');//旷工
    							};
    							dom.find('.workStatus').html('<li>' + strHtml + '</li>');
    						}else if(list[i].leaveFlag == 1 || list[i].leaveFlag == 2 || list[i].leaveFlag == 3){
    							dom.find('.workStatus').siblings('.dateNember').css('color','#fdb51b');//非正常上班颜色
    							if(list[i].leaveFlag == 1 || list[i].leaveFlag == 2){
    								dom.attr('isLeave',1)
    							}    							
    						}else if(list[i].leaveFlag == 4 || list[i].leaveFlag == 5){
    							dom.find('.workStatus').siblings('.dateNember').css('color','#ccc');//休息，放假颜色
    						}
    						if((list[i].clockInTime || list[i].clockOutTime) && list[i].leaveFlag != 0){
    							var html = '';
    							if(list[i].clockInTime){
    								html += '<span>' + list[i].clockInTime + '</span>'
    							}else{
    								html += '<span>&nbsp;</span>'
    							};
    							if(list[i].clockOutTime){
    								html += '<span>' + list[i].clockOutTime + '</span>'
    							}else{
    								html += '<span>&nbsp;</span>'
    							};
								dom.find('.workStatus').html('<li>' + html + '</li>');
							}else if(list[i].leaveFlag != 0){
								dom.find('.workStatus').html('<li><span>&nbsp;</span><span>&nbsp;</span></li>');
							}
    						
    					}
    				}
    			}
    			
    		},
    		error:function(){
    			windowControl("服务器未响应");
    		}
    	})
    }
 
    /**
    * 渲染html结构
    */
    function renderHtml() {
    	$("#checkInfoQuery #oneBodyCheckInfo .Calendar").html('');
        var titleBox = "<div class='calendarTitle'>";
        var bodyBox = "<div class='calendarBody'>";

        // 设置顶部盒子中的html
        var yearsOptions = '';
        var monthOptions = '';
        //生成年份
        for (var i = 2000; i < 2051; i++) {
          yearsOptions += '<option value="'+ i +'">'+ i +'年</option>'
        };
        //生成月份
        for (var i = 0; i < 12; i++) {
          monthOptions += '<option value="'+ i +'">'+ (i+1) +'月</option>'
        };
        titleBox += "<div class='calendarTop'>"+
        				"<input type='button' value='返回' class='back' />"+
			            "<select class='yearsSelect'>"+ yearsOptions +"</select>"+
			            "<span class='prevMonth'>&lt;</span>" +
			            "<select class='monthsSelect'>"+ monthOptions +"</select>"+
			            "<span class='nextMonth'>&gt;</span>"+
			            "<dl><dt>注：</dt><dd style='color:#049cfd'>正常上班</dd>" +
			            "<dd style='color:#fdb51b'>非正常上班</dd><dd style='color:red'>旷工</dd></dl>"
			          "</div></div>";       
          
        $("#checkInfoQuery #oneBodyCheckInfo .Calendar").append(titleBox);    // 添加到calendar div中

        // 设置表格区的html结构
        var _headHtml = "<tr>" + 
                  "<th>日</th>" +
                  "<th>一</th>" +
                  "<th>二</th>" +
                  "<th>三</th>" +
                  "<th>四</th>" +
                  "<th>五</th>" +
                  "<th>六</th>" +
                "</tr>";
        var _bodyHtml = "";

        // 一个月最多31天，所以一个月最多占6行表格
        for(var i = 0; i < 6; i++) {  
          _bodyHtml += "<tr>" +
                  "<td></td>" +
                  "<td></td>" +
                  "<td></td>" +
                  "<td></td>" +
                  "<td></td>" +
                  "<td></td>" +
                  "<td></td>" +
                "</tr>";
        }
        bodyBox += "<table class='calendarTable'>" +
                  _headHtml + _bodyHtml +
                  "</table></div>";
        // 添加到calendar div中
        $("#checkInfoQuery #oneBodyCheckInfo .Calendar").append(bodyBox);
    }
 
    /**
    * 表格中显示数据，并设置类名
    */
    function showCalendarData() {
        var _year = dateObj.getDate().getFullYear();
        var _month = dateObj.getDate().getMonth() + 1;
        var _dateStr = getDateStr(dateObj.getDate());

        // 设置顶部标题栏中的 年、月信息
        //年
        var yearsSelect = $("#checkInfoQuery #oneBodyCheckInfo .yearsSelect").find('option');
        var monthsSelect = $("#checkInfoQuery #oneBodyCheckInfo .monthsSelect").find('option');
        for(var data in yearsSelect){
          if(_dateStr.substr(0,4) == yearsSelect[data].value){
            yearsSelect[data].selected = true;
            break ;
          }
        }
        //月
        for(var data in monthsSelect){
          if(Number(_dateStr.substr(4,2)) == Number(monthsSelect[data].value)+1){
            monthsSelect[data].selected = true;
            break ;
          }
        }

        // 设置表格中的日期数据
        var _table = $("#checkInfoQuery #oneBodyCheckInfo .calendarTable");
        var _tds = _table.find("td");
        var _firstDay = new Date(_year, _month - 1, 1);  // 当前月第一天

        
        for(var i = 0; i < _tds.length; i++) {
          var workStatus = '';
          var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
          var _thisDayStr = getDateStr(_thisDay);
          var str = '<span class="dateNember">' + _thisDay.getDate() + '</span>'+
          			'<ul class="workStatus"><li><span>&nbsp;</span><span>&nbsp;</span></li></ul>';
          
          _tds.eq(i).html(str);          
          _tds.eq(i).attr('data', _thisDayStr);
          _tds.eq(i).attr('isLeave', 0);
         
          if(_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)) { // 当前月
        	 _tds.eq(i).attr('class','currentMonth');       	 
          }else{    // 其他月
        	 _tds.eq(i).attr('class','otherMonth'); 
          }
          if(_thisDayStr == getDateStr(new Date())) {    // 当前天
          	 _tds.eq(i).addClass('currentDay');
          }
          
        }
    }

    /**
    * 日期转化为字符串， 4位年+2位月+2位日
    */
    function getDateStr(date) {
        var _year = date.getFullYear();
        var _month = date.getMonth() + 1;    // 月从0开始计数
        var _d = date.getDate();
         
        _month = (_month > 9) ? ("" + _month) : ("0" + _month);
        _d = (_d > 9) ? ("" + _d) : ("0" + _d);
        return _year + _month + _d;
    }
}

