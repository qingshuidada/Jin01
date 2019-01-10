$(function(){
	$('#myCheckInfo').css('height',$('#loadarea').height()-30 +'px');
	
	myCheckInfoTimeWidget();
	
	// 点击日期，展示右边详细的考勤信息
	$('#myCheckInfo .calendarTable .currentMonth').click(function(){
		$('#myCheckInfo .myCheckInfoDetail ul').show();
		var day = $(this).attr('data');
		var recordDateStr = day.substr(0,4) + '-' + day.substr(4,2) + '-' + day.substr(6,2);
		var str = day.substr(0,4) + '年' + day.substr(4,2) + '月' + day.substr(6,2) + '日的考勤信息';
		var isLeave = $(this).attr('isLeave');
		$('#myCheckInfo .myCheckInfoDetail .title').text(str);
		$('#myCheckInfo .myCheckInfoDetail .title').attr('day',recordDateStr);
		$.ajax({
    		url:'../../clock/getMyClockDayDetail.do?getMs='+getMS(),
    		data:{
    			recordDateStr:recordDateStr,
    			isLeave:isLeave
    		},
    		type:'post',
    		success:function(data){
    			var objData = JSON.parse(data)
    			$('#myCheckInfo .myCheckInfoDetail ul li p').text('');
    			if(objData.attendanceRecord){    				
    				obj = objData.attendanceRecord;    				
    				if(obj.leaveFlag == 0){
    					if(!obj.clockInTime && !obj.clockOutTime){
    						$('#myCheckInfo .myCheckInfoDetail .leaveFlag').text('旷工');
    					}else{
    						$('#myCheckInfo .myCheckInfoDetail .leaveFlag').text('正常上班');
    					};
    					if(obj.beLateFlag == 0){
    						$('#myCheckInfo .myCheckInfoDetail .beLateFlag').text("否");
    					}else if(obj.beLateFlag == 1){
    						$('#myCheckInfo .myCheckInfoDetail .beLateFlag').text("是");
    					}else if(obj.beLateFlag == 2){
    						$('#myCheckInfo .myCheckInfoDetail .beLateFlag').html('<input type="button" id="forgetCardIn" value="补卡" />')
    					}
    					if(obj.leaveEarlyFlag == 0){
    						$('#myCheckInfo .myCheckInfoDetail .leaveEarlyFlag').text("否");
    					}else if(obj.leaveEarlyFlag == 1){
    						$('#myCheckInfo .myCheckInfoDetail .leaveEarlyFlag').text("是");
    					}else if(obj.leaveEarlyFlag == 2){
    						$('#myCheckInfo .myCheckInfoDetail .leaveEarlyFlag').html('<input type="button" id="forgetCardOut" value="补卡" />')
    					};
    				}else if(obj.leaveFlag == 1){
    					$('#myCheckInfo .myCheckInfoDetail .leaveFlag').text('病假');
    				}else if(obj.leaveFlag == 2){
    					$('#myCheckInfo .myCheckInfoDetail .leaveFlag').text('事假');
    				}else if(obj.leaveFlag == 3){
    					$('#myCheckInfo .myCheckInfoDetail .leaveFlag').text('外出');
    				}else if(obj.leaveFlag == 4){
    					$('#myCheckInfo .myCheckInfoDetail .leaveFlag').text('休息');
    				}else if(obj.leaveFlag == 5){
    					$('#myCheckInfo .myCheckInfoDetail .leaveFlag').text('放假');
    				};
    				$('#myCheckInfo .myCheckInfoDetail .onDutyTime').text(obj.onDutyTime);
    				$('#myCheckInfo .myCheckInfoDetail .offDutyTime').text(obj.offDutyTime);//当天班次时间
    				if(obj.clockInTime){
    					$('#myCheckInfo .myCheckInfoDetail .clockInTime').text(obj.clockInTime);						
					};
    				if(obj.clockOutTime){
						$('#myCheckInfo .myCheckInfoDetail .clockOutTime').text(obj.clockOutTime);
					};
    			}
    			/**
    			 * 点击跳转到补卡流程
    			 */
    			//上班缺卡
    			$('#myCheckInfo #forgetCardIn').click(function(){
    				var day = $(this).parents('.myCheckInfoDetail').find('.title').attr('day');
    				var time = $(this).parents('.myCheckInfoDetail').find('.onDutyTime').text();
    				clockReplace.start('007','../../processForm/clockReplace.html','false', 'false',{
    					replaceRecordDate:day,
    					replaceTime:time,
    					replaceType:'1'
    				});
    			})
    			//下班缺卡
    			$('#myCheckInfo #forgetCardOut').click(function(){
    				var day = $(this).parents('.myCheckInfoDetail').find('.title').attr('day');
    				var time = $(this).parents('.myCheckInfoDetail').find('.offDutyTime').text();
    				clockReplace.start('007','../../processForm/clockReplace.html','false', 'false',{
    					replaceRecordDate:day,
    					replaceTime:time,
    					replaceType:'2'
    				});
    			})
    			
    		},
    		error:function(){
    			windowControl("服务器未响应");
    		}
		})
	})
	
	//====================================================================================================

	var clockReplace = {};


	/**
	 * 切换到启动流程页面
	 */
	clockReplace.start = function(typeId,formUrl,hasUsers, hasFile,data){
		$('#myCheckInfo').css('display', 'none');
		$('#clockReplace .processStart').css('display', 'block');
		process_plugin.loadingForm({
			dom:$('#clockReplace .include-form'),
			formUrl:formUrl,
			typeId:typeId,
			readonly:false,
			loadingData:false,
			hasUsers:hasUsers,
			hasFile:hasFile,
			data:data
		});
		process_plugin.loadingProcess({
			getUrl:'../../myProcess/getProcessMessage.do',
			data:{
				typeId:typeId,
			},
			readonly:false,
			dom:$('#clockReplace .processStart .processMessage .box')
		});
		if(typeId == '005'){
			setTimeout(function(){
				process_function.presentContract($('.process-form table select[name=executorContract]'));
			},1000);
		}
	}
	
	$('#clockReplace').css('height',$('#loadarea').height()-31+"px");
	$('#clockReplace .desktopArea').css('height',$('#loadarea').height()-62+"px");
	$('#clockReplace .processStart').css('height',$('#loadarea').height()-32+"px");
	/**
	 * 发起按钮点击事件
	 */
	$('#clockReplace .processStart .submitProcess').click(function(){
		process_plugin.submitForm({
			dom:$('#clockReplace .processStart .include-form'),
			success:function(data){
				if(data == '200'){
					$('#myCheckInfo').css('display', 'block');
					$('#clockReplace .processStart').css('display', 'none');
					windowControl('发起流程成功');
				}else{
					windowControl('发起流程失败');
				}
			},
			error:function(){
				windowControl('服务器未响应');
			}
		})
	});	
	/**
	 * 返回按钮点击事件
	 */
	$('#clockReplace .processStart .backUp').click(function(){
		$('#myCheckInfo').css('display', 'block');
		$('#clockReplace .processStart').css('display', 'none');
	});
	
	
});
//时间控件
function myCheckInfoTimeWidget(){
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
    
    // 绑定事件
    //点击上下月
    $("#myCheckInfo .calendarTop .prevMonth").click(function(){
    	var date = dateObj.getDate();
        dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
        showCalendarData();
        var currentMonth = getDateStr(dateObj.getDate()).substr(0,4)+'-'+getDateStr(dateObj.getDate()).substr(4,2);
        getMonthCheckDetail(currentMonth);
    })
    $("#myCheckInfo .calendarTop .nextMonth").click(function(){
    	 var date = dateObj.getDate();
         dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
         showCalendarData();
         var currentMonth = getDateStr(dateObj.getDate()).substr(0,4)+'-'+getDateStr(dateObj.getDate()).substr(4,2);
         getMonthCheckDetail(currentMonth);
    })
    
    //年月输入框变化事件
    $("#myCheckInfo .calendarTop .yearsSelect").change(function(){
    	var date = dateObj.getDate();
        dateObj.setDate(new Date($(this).val(), date.getMonth(), 1));
        showCalendarData();
        var currentMonth = getDateStr(dateObj.getDate()).substr(0,4)+'-'+getDateStr(dateObj.getDate()).substr(4,2);
        getMonthCheckDetail(currentMonth);
    });
    $("#myCheckInfo .calendarTop .monthsSelect").change(function(){
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
    		url:'../../clock/getMyClockMonthForm.do?getMs='+getMS(),
    		data:{
    			balanceMonth:balanceMonth
    		},
    		type:'post',
    		success:function(obj){
    			var data = JSON.parse(obj);
    			if(data.clockMonthBalanceForm){
    				$('#myCheckInfo .monthCheckInfoDetail .attendanceDays').text(data.clockMonthBalanceForm.attendanceDays);//出勤天数
    				$('#myCheckInfo .monthCheckInfoDetail .restDays').text(data.clockMonthBalanceForm.restDays);//休息天数
    				$('#myCheckInfo .monthCheckInfoDetail .lateTimes').text(data.clockMonthBalanceForm.lateTimes);//迟到次数
    				$('#myCheckInfo .monthCheckInfoDetail .earlyTimes').text(data.clockMonthBalanceForm.earlyTimes);//早退次数
    				$('#myCheckInfo .monthCheckInfoDetail .missTimes').text(data.clockMonthBalanceForm.missTimes);//缺卡次数
    				$('#myCheckInfo .monthCheckInfoDetail .absentDays').text(data.clockMonthBalanceForm.absentDays);//旷工天数
    				$('#myCheckInfo .monthCheckInfoDetail .leaveDays').text(data.clockMonthBalanceForm.leaveDays);//请假天数
    				//$('#myCheckInfo .monthCheckInfoDetail .businessLeaveDays').text(data.clockMonthBalanceForm.businessLeaveDays);//事假天数
    				//$('#myCheckInfo .monthCheckInfoDetail .sickLeaveDays').text(data.clockMonthBalanceForm.sickLeaveDays);//病假天数
    			}else{
    				$('#myCheckInfo .monthCheckInfoDetail .attendanceDays').text('0');//出勤天数
    				$('#myCheckInfo .monthCheckInfoDetail .restDays').text('0');//休息天数
    				$('#myCheckInfo .monthCheckInfoDetail .lateTimes').text('0');//迟到次数
    				$('#myCheckInfo .monthCheckInfoDetail .earlyTimes').text('0');//早退次数
    				$('#myCheckInfo .monthCheckInfoDetail .missTimes').text('0');//缺卡次数
    				$('#myCheckInfo .monthCheckInfoDetail .absentDays').text('0');//旷工天数
    				$('#myCheckInfo .monthCheckInfoDetail .leaveDays').text('0');//旷工天数
    				//$('#myCheckInfo .monthCheckInfoDetail .businessLeaveDays').text('0');//事假天数
    				//$('#myCheckInfo .monthCheckInfoDetail .sickLeaveDays').text('0');//病假天数
    			}
    			var list = data.clockDayForms;
    			for(var i = 0 ; i < list.length ; i++){
    				var recordDateStr = list[i].recordDateStr.substr(0,4) + list[i].recordDateStr.substr(5,2) + list[i].recordDateStr.substr(8,2);
    				for(var j = 0 ; j < $("#myCheckInfo .calendarTable").find("td").length ; j++){
    					var dom = $("#myCheckInfo .calendarTable").find("td").eq(j);
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
			            "<select class='yearsSelect'>"+ yearsOptions +"</select>"+
			            "<span class='prevMonth'>&lt;</span>" +
			            "<select class='monthsSelect'>"+ monthOptions +"</select>"+
			            "<span class='nextMonth'>&gt;</span>"+
			            "<dl><dt>注：</dt><dd style='color:#049cfd'>正常上班</dd>" +
			            "<dd style='color:#fdb51b'>非正常上班</dd><dd style='color:red'>旷工</dd></dl>"
			          "</div></div>";       
          
        $("#myCheckInfo .Calendar").append(titleBox);    // 添加到calendar div中

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
        $("#myCheckInfo .Calendar").append(bodyBox);
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
        var yearsSelect = $("#myCheckInfo .yearsSelect").find('option');
        var monthsSelect = $("#myCheckInfo .monthsSelect").find('option');
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
        var _table = $("#myCheckInfo .calendarTable");
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



