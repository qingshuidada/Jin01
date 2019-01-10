$(function(){	
	$('#checkGroupManage #checkGroupManagedg').css('height',$('#loadarea').height()-64 + 'px');
	$('#checkGroupManage .rightTime').css('height',$('#loadarea').height()-64 + 'px');
	if(existPermission('admin:personnel:attendanceManage:checkGroupManage:add'))
		$('#checkGroupManage .maintop').append('<div><span class="maintopicon mainicon2"></span> <span class="addCheckGroup">添加</span></div>');
	//产生数据网格
	$('#checkGroupManagedg').datagrid({
		url:'../../attendance/findGroupByCondition.do?getMs='+getMS(),
		singleSelect:true,
		toolbar:"#checkGroupManage .invitetop",
		method:"post",
		onDblClickRow:function(rowIndex,rowData){
			//加载时间控件
			var groupName = rowData.groupName;
			var groupId = rowData.groupId;
			var toWorkTime = rowData.defaultOnTime;
			var outWorkTime = rowData.defaultOffTime;
			$('#checkGroupManage .rightTime input[name=groupId]').val(groupId);
			checkGroupManageTimeWidget(groupName,toWorkTime,outWorkTime,groupId);
		},
		columns:[[			
			{
				field:'groupName',
				title:'考勤组名称',
				width:100,
				align:"center"
			},
			{
				field:'defaultOnTime',
				title:'默认上班时间',
				width:100,
				align:"center"
			},
			{
				field:'defaultOffTime',
				title:'默认下班时间',
				width:100,
				align:"center"
			},
			{
				field:"_opera",
				title:"操作",
				width:60,
				align:"center",
				formatter:function(value,row,index){
				   var opera = '';
				   var groupId = "'"+ row.groupId +"'";
				   var groupName = "'"+ row.groupName +"'";
				   var defaultOnTime = "'"+ row.defaultOnTime +"'";
				   var defaultOffTime = "'"+ row.defaultOffTime +"'";
				   opera += '<div class="imgBox">'
				   if(existPermission('admin:personnel:attendanceManage:checkGroupManage:update'))
					   opera += '<span style="float:left;" class="small-button edit" title="修改" onclick="checkGroupManageUpdate('+ groupId +','+ groupName +','+ defaultOnTime +','+ defaultOffTime +')"></span>'
				   if(existPermission('admin:personnel:attendanceManage:checkGroupManage:delete')) 
					  opera += '<span style="float:left;" class="small-button delete" title="删除" onclick="checkGroupManageDel('+ groupId +','+ groupName +')"></span>';
				   opera += '</div>'
				   return opera;
				}
			}
	    ]]
	});
	//查询
	$('#checkGroupManage .invitetop .selectGroup').click(function(){
		$('#checkGroupManagedg').datagrid({
			queryParams: {
				groupName: function(){
					return $('#checkGroupManage .invitetop input[name=groupName]').val();
				}
			}
		});
	});
	
	//点击添加事件
	$('#checkGroupManage .maintop .addCheckGroup').click(function(){
		$('#checkGroupManage .popups .addGroup').show();
	})
	$('#checkGroupManage .popups .addGroup .comfirm').click(function(){
		var groupName = $('#checkGroupManage .popups .addGroup input[name=groupName]').val();
		var defaultOnTime = $('#checkGroupManage .popups .addGroup input[name=defaultOnTime]').val();
		var defaultOffTime = $('#checkGroupManage .popups .addGroup input[name=defaultOffTime]').val();
		if(groupName == null || groupName == ''){
			windowControl("考勤组名称不能为空！")
			return ;
		}
		else if(defaultOnTime == null || defaultOnTime == ''){
			windowControl("上班时间不能为空！")
			return ;
		}else if(defaultOffTime ==null || defaultOffTime == ''){
			windowControl("下班时间不能为空！")
			return ;
		}
		var list = {
			groupName:groupName,
			defaultOnTime:defaultOnTime,
			defaultOffTime:defaultOffTime
		};
		$('#checkGroupManage .popups .addGroup').hide();
		$('#checkGroupManage .popups .addGroup .popuparea input').val(null);
		checkGroupManageAdd(list);
	})
	
	
})
//添加考勤组
function checkGroupManageAdd(obj){
	$.ajax({
		url:'../../attendance/insertGroup.do?getMs='+getMS(),
		data:obj,
		type:'post',
		success:function(data){
			if(data == 200){
				windowControl("添加成功！")
				$('#checkGroupManagedg').datagrid("reload");
			}else{
				windowControl("添加失败！")
			}	
		},
		error:function(){
			windowControl("服务器未响应");
		}
	})
}
//删除考勤组
function checkGroupManageDel(groupId,groupName){
	ui.confirm('确定将 '+groupName+' 删除吗？',function(z){
		if(z){
			$.ajax({
				url:'../../attendance/deleteGroup.do?getMs='+getMS(),
				data:{
					groupId:groupId,
				},
				type:'post',
				success:function(data){
					if(data == 200){
						windowControl("删除成功！")
						$('#checkGroupManagedg').datagrid("reload");
						$('#checkGroupManage .Calendar').html('');//清除右边
					}else{
						windowControl("删除失败！")
					}					
				},
				error:function(){
					windowControl("服务器未响应");
				}
			})
		}		
	},false)
}
//修改考勤组
function checkGroupManageUpdate(groupId,groupName,defaultOnTime,defaultOffTime){
	$('#checkGroupManage .popups .updateGroup').show();
	$('#checkGroupManage .popups .updateGroup input[name=groupName]').val(groupName);
	$('#checkGroupManage .popups .updateGroup input[name=defaultOnTime]').val(defaultOnTime);
	$('#checkGroupManage .popups .updateGroup input[name=defaultOffTime]').val(defaultOffTime);
	$('#checkGroupManage .popups .updateGroup .update').unbind();
	$('#checkGroupManage .popups .updateGroup .update').click(function(){
		var groupName = $('#checkGroupManage .popups .updateGroup input[name=groupName]').val();
		var defaultOnTime = $('#checkGroupManage .popups .updateGroup input[name=defaultOnTime]').val();
		var defaultOffTime = $('#checkGroupManage .popups .updateGroup input[name=defaultOffTime]').val();
		if(groupName == null || groupName == ''){
			windowControl("考勤组名称不能为空！")
			return ;
		}
		else if(defaultOnTime == null || defaultOnTime == ''){
			windowControl("上班时间不能为空！")
			return ;
		}else if(defaultOffTime ==null || defaultOffTime == ''){
			windowControl("下班时间不能为空！")
			return ;
		}
		var list = {
			groupId:groupId,
			groupName:groupName,
			defaultOnTime:defaultOnTime,
			defaultOffTime:defaultOffTime
		};
		$('#checkGroupManage .popups .updateGroup').hide();
		$('#checkGroupManage .popups .updateGroup .popuparea input').val(null);
		$.ajax({
			url:'../../attendance/updateGroupByCondition.do?getMs='+getMS(),
			data:list,
			type:'post',
			success:function(data){
				if(data == 200){
					windowControl("修改成功！")
					$('#checkGroupManagedg').datagrid("reload");
					$('#checkGroupManage .Calendar').html('');//清除右边
				}else{
					windowControl("修改失败！")
				}	
			},
			error:function(){
				windowControl("服务器未响应");
			}
		})
	})

}

//jedate
function checkGroupManageHms(elem){                            // jedeta 函数 时分秒
	 $.jeDate(elem,{
		trigger:false,
		isClear:false,
	    format: 'hh:mm:ss',
	    okfun:function(val) {
	    	//上班时间或下班时间修改后提交插入或更新班次
	    	var groupId = $('#checkGroupManage .rightTime input[name=groupId]').val();
	    	var td = $(elem).parents("td")
	    	var onValue = td.find('.onDutyTime').val();
	    	var offValue = td.find('.offDutyTime').val();
        	var aleady = td.attr('aleady');
        	var today = td.attr('data');
        	var url = '';
        	if(aleady == 1){
        		url = '../../attendance/updateClassByCondition.do?getMs='+getMS();        		
        	}else{
        		url = '../../attendance/insertClass.do?getMs='+getMS();
        		if(val[0].defaultValue == onValue || val[0].defaultValue == offValue){
        			return ;
        		}
        	}
        	$.ajax({
        		url:url,
        		data:{
        			groupId:groupId,
        			workFlag:'1',
        			onDutyTime:onValue,
        			offDutyTime:offValue,
        			classDateStr:today.substr(0,4)+'-'+today.substr(4,2)+'-'+today.substr(6,2)
        		},
        		type:'post',
        		success:function(data){
        			if(data==200){
        				td.attr('aleady',1);
        				windowControl("添加修改班次成功");
        			}else{
        				windowControl("插入班次或修改失败");
        			}        			
        		},
        		error:function(){
        			windowControl("服务器未响应");
        		}
        	})

	    }
	  });
}

//时间控件
function checkGroupManageTimeWidget(groupName,toWorkTime,outWorkTime,groupId){
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
    
    // 初始化dom
    renderHtml();
    //初始化日期
    init();
    
    // 绑定事件
    //点击上下月
    $("#checkGroupManage .calendarTop .prevMonth").click(function(){
    	var date = dateObj.getDate();
        dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
        init();
    })
    $("#checkGroupManage .calendarTop .nextMonth").click(function(){
    	 var date = dateObj.getDate();
         dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
         init();
    })
    //年月输入框变化事件
    $("#checkGroupManage .calendarTop .yearsSelect").change(function(){
    	var date = dateObj.getDate();
        dateObj.setDate(new Date($(this).val(), date.getMonth(), 1));
        init();
    });
    $("#checkGroupManage .calendarTop .monthsSelect").change(function(){
    	var date = dateObj.getDate();
        dateObj.setDate(new Date(date.getFullYear(), $(this).val(), 1));
        init();
    });
    //确定修改上班状态
    $('#checkGroupManage .popups .workStatus .comfirm').unbind('click');
	$('#checkGroupManage .popups .workStatus .comfirm').click(function(){
		var workFlag = $('#checkGroupManage .popups .workStatus .workFlag').val();
		var datetime = $('#checkGroupManage .popups .workStatus .thatDay').attr('datetime');
		var aleady = $('#checkGroupManage .popups .workStatus .thatDay').attr('aleady');
		var toWorkTime = $('#checkGroupManage .Calendar .belongGroup').attr('toWorkTime');
		var outWorkTime = $('#checkGroupManage .Calendar .belongGroup').attr('outWorkTime');
		var groupId = $('#checkGroupManage .Calendar .belongGroup').attr('datagroup');
		var groupName = $('#checkGroupManage .Calendar .belongGroup').text();
		if(workFlag == '' || workFlag == null){
			windowControl("状态选择不能为空！");
			return ;
		}
		var obj = {
			groupId:groupId,
			workFlag:workFlag,
			classDateStr:datetime.substr(0,4)+'-'+datetime.substr(4,2)+'-'+datetime.substr(6,2)
    	}
		if(aleady == 1){
    		url = '../../attendance/updateClassByCondition.do?getMs='+getMS();
    	}else{
    		url = '../../attendance/insertClass.do?getMs='+getMS();
    		obj.onDutyTime = toWorkTime;
    		obj.offDutyTime = outWorkTime;
    	};
		$.ajax({
			url:url,
			data:obj,
			type:'post',
			success:function(data){
				if(data == 200){
					windowControl("修改成功！");
					$('#checkGroupManage .popups .workStatus').hide();
					$('#checkGroupManage .popups .workStatus .workFlag').val(null);
					init();
				}else{
					windowControl("修改失败！")
				}	
			},
			error:function(){
				windowControl("服务器未响应");
			}
		})
	});
 
    
    /**
     * 初始化日期
     */
    function init(){
    	var dateStr = getDateStr(dateObj.getDate());
	    var queryMonth = dateStr.substr(0,4) + '-' + dateStr.substr(4,2);
	    showCalendarData();
	    getCurrentMonthClass(queryMonth);
    }
    
    /**
     * 获取当月班次信息
     */
    function getCurrentMonthClass(queryMonth){
    	// 获取班次信息
        $.ajax({
    		url:'../../attendance/findClassByCondition.do?getMs='+getMS(),
    		data:{
    			groupId:groupId,
    			queryMonth:queryMonth
    		},
    		type:'post',
    		success:function(data){
    			var dataObj = eval('('+data+')').rows;
    			for(var i = 0 ; i < dataObj.length ; i++){
    				var classDateStr = dataObj[i].classDateStr.substr(0,4)+dataObj[i].classDateStr.substr(5,2)+dataObj[i].classDateStr.substr(8,2);
    				for(var j = 0 ; j < $("#checkGroupManage .calendarTable").find("td").length ; j++){
    					if(classDateStr == $("#checkGroupManage .calendarTable").find("td").eq(j).attr('data')){
    						//做个该天不是默认上班时间和下班时间的标记，data属性值为1，则说明该天有班次记录
    						$("#checkGroupManage .calendarTable").find("td").eq(j).attr('aleady',1);
    						$("#checkGroupManage .calendarTable").find("td").eq(j).find('.onDutyTime').val(dataObj[i].onDutyTime);
    						$("#checkGroupManage .calendarTable").find("td").eq(j).find('.offDutyTime').val(dataObj[i].offDutyTime);
    						if(dataObj[i].workFlag == 0){
    							$("#checkGroupManage .calendarTable").find("td").eq(j).find('.workTime input').hide();
    							$("#checkGroupManage .calendarTable").find("td").eq(j).find('.workTime span').show();
    						}else{
    							$("#checkGroupManage .calendarTable").find("td").eq(j).find('.workTime input').show();
    							$("#checkGroupManage .calendarTable").find("td").eq(j).find('.workTime span').hide();
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
			            //"<input type='button' class='save' value='保存'style='float:left;margin:10px 10px 0 15px;'/>"+
			            "<span class='belongGroup' datagroup="+ groupId +" toWorkTime="+ toWorkTime +" outWorkTime="+ outWorkTime +">"+ groupName +"</span>"+
			          "</div></div>";       
          
        $("#checkGroupManage .Calendar").html(titleBox);    // 添加到calendar div中

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
        $("#checkGroupManage .Calendar").append(bodyBox);
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
        var yearsSelect = $("#checkGroupManage .yearsSelect").find('option');
        var monthsSelect = $("#checkGroupManage .monthsSelect").find('option');
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
        var _table = $("#checkGroupManage .calendarTable");
        var _tds = _table.find("td");
        var _firstDay = new Date(_year, _month - 1, 1);  // 当前月第一天
        for(var i = 0; i < _tds.length; i++) {
          var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
          var _thisDayStr = getDateStr(_thisDay);
          //在td中添加dom结构
          var str = '<span class="dateNumber">' + _thisDay.getDate() + '</span>';
          if(_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)){
    		  str += '<div class="workTime">' +
				'<input type="text" onclick="checkGroupManageHms(this)" readonly="readonly" class="onDutyTime" value="'+ toWorkTime +'"/>' +
				'<input type="text" onclick="checkGroupManageHms(this)" readonly="readonly" class="offDutyTime" value="'+ outWorkTime +'"/>' +
				'<span style="line-height:40px;display:none;color:#999;">休息</span>' +
			 '</div>';    		 
          }	
          _tds.eq(i).html(str);
          if(_thisDayStr <= getDateStr(new Date())){
			  _table.find('input[type=text]').attr('disabled','disabled');
		  }else{
			  //绑定一个修改状态的点击事件
			  $('#checkGroupManage .dateNumber').eq(i).click(function(){
				 var str = $(this).parent().attr('data');
				 var aleady = $(this).parent().attr('aleady');
				 var dateStr = str.substr(4,2) + '月' + str.substr(6,2) + '日的上班状态选择：';
				 $('#checkGroupManage .popups .workStatus .thatDay').text(dateStr);
				 $('#checkGroupManage .popups .workStatus .thatDay').attr('datetime',str);
				 $('#checkGroupManage .popups .workStatus .thatDay').attr('aleady',aleady);
				 $('#checkGroupManage .popups .workStatus').show();
			  });
		  }
          
          _tds.eq(i).attr('data', _thisDayStr);
          _tds.eq(i).attr('aleady',0);
          if(_thisDayStr == getDateStr(new Date())) { // 当前天
            _tds.eq(i).attr('class','currentDay');
            if(_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)){
            	_tds.eq(i).css('visibility','visible')
            }else{
            	_tds.eq(i).css('visibility','hidden')
            }
          }else if(_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)) {// 当前月
        	  _tds.eq(i).attr('class','currentMonth');  
          }else {    // 其他月
        	  _tds.eq(i).attr('class','otherMonth');            
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