var str = '';
for(var i=1;i<13;i++){
	str +='<option value='+i+'>'+i+'月</option>'
}
$('#startMonth').append(str);
$('#endMonth').append(str);
str = '';
for(var i=1;i<32;i++){
	str +='<option value='+i+'>'+i+'日</option>'
}
$('#startDate').append(str);
$('#endDate').append(str);

var staffBirthdayExcel = [];
$(function(){
	//设置生日最初时间
	var beginDate = new Date();
	//var beginy = beginDate.getFullYear();
	var beginm = beginDate.getMonth()+1;
	var begind = beginDate.getDate();
	var beginMs = beginDate.getTime();
	beginMs += 864000000;
	var endDate = new Date(beginMs);
	//var endY = endDate.getFullYear();
	var endM = endDate.getMonth()+1;
	var endD = endDate.getDate();
	if(beginm < 10){
		beginm = '0' + beginm;
	}
	if(endM < 10){
		endM = '0' + endM;
	}
	$('#staffBirthday .dateBox #startMonth option').eq(beginm-1).attr('selected',true);
	$('#staffBirthday .dateBox #startDate option').eq(begind-1).attr('selected',true);
	$('#staffBirthday .dateBox #endMonth option').eq(endM-1).attr('selected',true);
	$('#staffBirthday .dateBox #endDate option').eq(endD-1).attr('selected',true);
	var beginTime = beginm +'-'+ begind;
	var endTime = endM +'-'+ endD;
	//设置数据网格窗体的大小
	$('#staffBirthdaydg').parent().css('height',$('#loadarea').height()-61);
	/*员工生日*/
	$('#staffBirthdaydg').datagrid({
		  	//url:'../../welfare/findUserInfoByBirth.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#staffBirthday .dateBox",
		   method:"post",
		   fit: true,
		   queryParams:{
				startDate:beginTime,
				endDate:endTime, 
			},
		   columns:[[
		       {field:"userName",title:"姓名",fitColumns:true,resizable:true,align:"center",sortable:true,width:60},
		       {field:"sex",title:"性别",fitColumns:true,resizable:true,align:"center",sortable:true,width:35,formatter:function(value,row,index){
		    	   if(value == '01'){
		    		   return '男';
		    	   }else if(value == '02'){
		    		   return '女';
		    	   }
		       }},
		       {field:"departmentName",title:"所属部门",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"postName",title:"所属岗位",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"birthdayStr",title:"生日",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"phoneNum",title:"手机号",fitColumns:true,resizable:true,align:"center",sortable:true,width:90},
		       {field:"idCard",title:"身份证号",fitColumns:true,resizable:true,align:"center",sortable:true,width:140},
		       {field:"workTimeStr",title:"入职时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		  ]]
	}); 
	//
	$('#staffBirthday .dateBox #startMonth').change(function(){
		var opval = $(this).children('option:selected').val();
		if(opval==2){
			for(var i=29;i<32;i++){
				$('#staffBirthday .dateBox #startDate option').eq(i).css('display','none');
			}
			var childVal = $('#staffBirthday .dateBox #startDate').children('option:selected').val();
			if(childVal >29){
				$('#staffBirthday .dateBox #startDate option').eq(28).attr('selected',true);
			}
		}else if(opval==4||opval==6||opval==9||opval==11){
			for(var i=29;i<32;i++){
				if(i<30){
					$('#staffBirthday .dateBox #startDate option').eq(i).css('display','block');
				}else{
					$('#staffBirthday .dateBox #startDate option').eq(i).css('display','none');
				}
			}
			var childVal = $('#staffBirthday .dateBox #startDate').children('option:selected').val();
			if(childVal >29){
				$('#staffBirthday .dateBox #startDate option').eq(29).attr('selected',true);
			}
		}else{
			$('#staffBirthday .dateBox #startDate option').css('display','block');
		}
	});
	$('#staffBirthday .dateBox #endMonth').change(function(){
		var opval = $(this).children('option:selected').val();
		if(opval==2){
			for(var i=29;i<32;i++){
				$('#staffBirthday .dateBox #endDate option').eq(i).css('display','none');
			}
			var childVal = $('#staffBirthday .dateBox #endDate').children('option:selected').val();
			if(childVal >29){
				$('#staffBirthday .dateBox #startDate option').eq(28).attr('selected',true);
			}
		}else if(opval==4||opval==6||opval==9||opval==11){
			for(var i=29;i<32;i++){
				if(i<30){
					$('#staffBirthday .dateBox #endDate option').eq(i).css('display','block');
				}else{
					$('#staffBirthday .dateBox #endDate option').eq(i).css('display','none');
				}
			}
			var childVal = $('#staffBirthday .dateBox #endDate').children('option:selected').val();
			if(childVal >29){
				$('#staffBirthday .dateBox #endDate option').eq(29).attr('selected',true);
			}
		}else{
			$('#staffBirthday .dateBox #endDate option').css('display','block');
		}
	});
	//
	$('#staffBirthday .dateBox form select').change(function(){
		$('#staffBirthday .dateBox>select option:eq(0)').attr('selected',true);
	});
	//
	$('#staffBirthday .dateBox>select').change(function(){
		var opval = $(this).children('option:selected').val();
		$('#staffBirthday .dateBox #startMonth option').eq(beginm-1).attr('selected',true);
		$('#staffBirthday .dateBox #startDate option').eq(begind-1).attr('selected',true);
		var otherMs = beginDate.getTime()+86400000 * opval;
		var otherDate = new Date(otherMs);
		$('#staffBirthday .dateBox #endMonth option').eq(otherDate.getMonth()).attr('selected',true);
		$('#staffBirthday .dateBox #endDate option').eq(otherDate.getDate()-1).attr('selected',true);
	})
	$('#staffBirthday .dateBox .button:eq(0)').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
	    	$('#chooseDept').css('display','none');
	    	var selectDept = $('#chooseDept .popuparea .dept').tree('getSelected');
	    	$('#staffBirthday .dateBox input:eq(0)').val(selectDept.text);
	    	$('#staffBirthday .dateBox input:eq(1)').val(selectDept.id);
	    })
	});
	$('#staffBirthday .dateBox .button:eq(1)').click(function(){
		choosePost();
		$('#choosePost .confirm').click(function(){
	    	$('#choosePost').css('display','none');
	    	var selectPost = $('#choosePost .popuparea .post').datagrid('getSelections');
	    	$('#staffBirthday .dateBox input:eq(3)').val(selectPost[0].postName);
	    	$('#staffBirthday .dateBox input:eq(4)').val(selectPost[0].postId);
	    })
	});


	/*****************导出到Excel点击弹窗******************/
	$("#staffBirthday .maintop .write").click(function(){
		$('#staffBirthday .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#staffBirthday .popups .writetoexcel .popuparea'),
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
	$("#staffBirthday .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#staffBirthday .maintop .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#staffBirthday .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#staffBirthday .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#staffBirthday .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#staffBirthday .popups .writetoexcel"));
		
		var staffBirthdayExcel2 = [];
		for(var i = 0 ; i < staffBirthdayExcel.length ; i++){
			staffBirthdayExcel2.push(staffBirthdayExcel[i]);
		}
		staffBirthdayExcel2.push({
			name:'jsonString',value:jsonString
		})
		//提交导出excel所需要的参数
		excelplugin.submit({
			type:'post',
			array:staffBirthdayExcel2,
			action:'../../welfare/writeToExcelForBirthday.do?'
		})
	});
	
})
	function findByBirth(){
		var startBirthdayM = $("#startMonth").val();
		var startBirthdayD = $("#startDate").val();
		var endBirthdayM = $("#endMonth").val();
		var endBirthdayD = $("#endDate").val();
		if(startBirthdayM<10){
			startBirthdayM = '0'+startBirthdayM;
		}
		if(startBirthdayD<10){
			startBirthdayD = '0'+startBirthdayD;
		}
		if(endBirthdayM<10){
			endBirthdayM = '0'+endBirthdayM;
		}
		if(endBirthdayD<10){
			endBirthdayD = '0'+endBirthdayD;
		}
		var startBirthdayTime = startBirthdayM +'-'+startBirthdayD;
		var endBirthdayTime = endBirthdayM +'-'+endBirthdayD;
		var deptName = $('#staffBirthday .dateBox input:eq(0)').val();
		var postName = $('#staffBirthday .dateBox input:eq(3)').val();
		staffBirthdayExcel = [
			{name:'startDate',value:startBirthdayTime},
			{name:'endDate',value:endBirthdayTime},
			{name:'departmentName',value:deptName},
			{name:'postName',value:postName}
		]
		$("#staffBirthdaydg").datagrid({
			url:'../../welfare/findUserInfoByBirth.do?getMs='+getMS(),
			queryParams:{
				startDate:startBirthdayTime,
				endDate:endBirthdayTime,
				departmentName:deptName,
				postName:postName,
			}
		});
	}
	/*function YYYYMMDDstart(){
        MonHead = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        
        //赋月份的下拉框
        for (var i = 1; i < 13; i++)
        document.reg_testdate.firstMonth.options.add(new Option(" " + i + " 月", i));
        document.reg_testdate.firstMonth.value = new Date().getMonth() + 1;
        var n = MonHead[new Date().getMonth()];
        if (new Date().getMonth() ==1 && IsPinYear(YYYYvalue)) n++;
        writeDay(n); //赋日期下拉框
        document.reg_testdate.firstDate.value = new Date().getDate();

        //赋月份的下拉框
        for (var i = 1; i < 13; i++)
        document.reg_testdate.secondMonth.options.add(new Option(" " + i + " 月", i));
        var beginMs = new Date().getTime();
    	beginMs += 864000000;
    	var endDate = new Date(beginMs);
        document.reg_testdate.secondMonth.value = endDate.getMonth() + 1;
        var m = MonHead[new Date().getMonth()];
        if (endDate.getMonth() ==1 && IsPinYear(YYYYvalue)) m++;
        writeDays(m); //赋日期下拉框
        document.reg_testdate.secondDate.value = endDate.getDate();
    }
	YYYYMMDDstart()
    if(document.attachEvent)
        window.attachEvent("onload", YYYYMMDDstart);
    else
        window.addEventListener('load', YYYYMMDDstart, false);

    function MMDD(str)   //月发生变化时日期联动
    {
        var YYYYvalue = document.reg_testdate
        if (YYYYvalue == ""){ var e = document.reg_testdate.firstDate; optionsClear(e); return;}
        var n = MonHead[str - 1];
        if (str ==2) n++;
        writeDay(n)
    }
    function writeDay(n)   //据条件写日期的下拉框
    {
        var e = document.reg_testdate.firstDate; optionsClear(e);
        for (var i=1; i<(n+1); i++)
            e.options.add(new Option(" "+ i + " 日", i));
    }
    function MMDDs(str)   //月发生变化时日期联动
    {
        var YYYYvalue = document.reg_testdate
        if (YYYYvalue == ""){ var e = document.reg_testdate.firstDate; optionsClear(e); return;}
        var m = MonHead[str - 1];
        if (str ==2) m++;
        writeDays(m)
    }
    function writeDays(m)   //据条件写日期的下拉框
    {
        var e = document.reg_testdate.secondDate; optionsClear(e);
        for (var j=1; j<(m+1); j++)
            e.options.add(new Option(" "+ j + " 日", j));
    }
    function optionsClear(e)
    {
        e.options.length = 1;
    }*/