var rewardPenaltiesExcel = [];
$(function(){

	//打印
	$('#readData .tabHeader .printSalaryInfo').click(function(){
		var monthDate = $('#readData .dataTop select[name=monthDate] option:selected').val();
		var url = "../../../salary/printSalaryInfo.salary?" + "monthDate=" + monthDate;
		$('#readData .tabHeader .printSalaryInfo').attr("action",url);
		$('#readData .tabHeader .printSalaryInfo').submit();
	});
	
	//退出
	$('#readData .salaryTop .salaryHeader input[name=exit]').click(function(){
		$.ajax({
			url:"../../../salary/exit.salary",
			success:function(data){
				window.location.href='../salaryCheck.html';
			}
		})
	});
	
	//加载工资日期
	$.ajax({
		url:"../../../salary/findMonthDate.salary?getMs="+getMS(),
		//data:{insuranceId:insuranceId},
		type:"post",
		success:function(data){
			if(data == '500'){
				console.log(data);
				alert(data);
			}else{
				data = $.parseJSON(data);
				var str = '';
				for(var i = 0;i<data.length;i++){
					var monthDate = data[i].monthDate;
					str += '<option value="'+monthDate+'">'+monthDate+'</option>'
				}
				console.log(str);
				$('#readData .dataTop select[name=monthDate]').html("<option value=''></option>");
				$('#readData .dataTop select[name=monthDate]').append(str);
			}
		}
	})
	
	//查询
	$('#readData .dataTop input[name=querySalary]').click(function(){
		var userName = $('#readData .dataTop input[name=peopleName]').val();
		var userAccount = $('#readData .dataTop input[name=userAccount]').val();
		var ensureFlag = $('#readData .dataTop select[name=ensureFlag] option:selected').val();
		var monthDate = $('#readData .dataTop select[name=monthDate] option:selected').val();
		$('#salaryDg').datagrid({
			url:"../../../salary/findSalaryInfoByCondition.salary?getMs="+getMS(),
			queryParams:{
				userName:userName,
				userAccount:userAccount,
				ensureFlag:ensureFlag,
				monthDate:monthDate
			},
			columns:[[
				{field:'userAccount',title:'账号',width:70},
				{field:'userName',title:'姓名',width:55},
				{field:'finalPayAmount',title:'实发金额',width:55,formatter:function(value,row,index){
					finalPayAmountErr = row.finalPayAmountErr;
					if(finalPayAmountErr == 1){
						return '<span style="color:red">'+ value +'</span>';
					}else{
						return value;
					}
				}},
				{field:'classLevel',title:'等级',width:55},
				{field:'dailyWage',title:'日工资',width:55},
				{field:'monthlyPay',title:'月工资',width:55},
				{field:'days',title:'天数',width:55},
				{field:'totalPayAmount',title:'应发工资',width:55,formatter:function(value,row,index){
					totalPayAmountErr = row.totalPayAmountErr;
					if(totalPayAmountErr == 1){
						return '<span style="color:red">'+ value +'</span>';
					}else{
						return value;
					}
				}},
				{field:'nightShift',title:'夜班',width:55},
				{field:'nightShiftAmount',title:'夜班费',width:55,formatter:function(value,row,index){
					nightShiftAmountErr = row.nightShiftAmountErr;
					if(nightShiftAmountErr == 1){
						return '<span style="color:red">'+ value +'</span>';
					}else{
						return value;
					}
				}},
				{field:'subsidyAmount',title:'医、餐补',width:55},
				{field:'actualPayAmount',title:'实发工资',width:55,formatter:function(value,row,index){
					actualPayAmountErr = row.actualPayAmountErr;
					if(actualPayAmountErr == 1){
						return '<span style="color:red">'+ value +'</span>';
					}else{
						return value;
					}
				}},
				{field:'awardAmount',title:'工奖',width:55},
				{field:'overtimePayAmount',title:'加班费',width:55},
				{field:'communicationAmount',title:'通讯费',width:55},
				{field:'otherAmount',title:'出勤奖',width:55},
				{field:'withholdAmount',title:'扣款',width:55},
				{field:'insuranceAmount',title:'养老保险',width:55},
				{field:'departmentName',title:'部门',width:55},
				{field:'postName',title:'岗位',width:55},
				{field:'monthDate',title:'日期',width:80},
				{field:'_op',title:'操作',width:100,align:'center',width:120,
					formatter:function(value,row,index){
						id = "'" + row.salaryInfoId + "'";
						userName = "'" + row.userName + "'";
						monthDate = "'" + row.monthDate + "'";
						totalPayAmountErr = row.totalPayAmountErr;
						finalPayAmountErr = row.finalPayAmountErr;
						nightShiftAmountErr = row.nightShiftAmountErr;
						actualPayAmountErr = row.actualPayAmountErr;
						if(totalPayAmountErr || finalPayAmountErr || nightShiftAmountErr || actualPayAmountErr){
							return '<span class="small-button edit" title="修改" onclick="showUpdateWindow('+id+','+userName+','+monthDate+')"></span>'
						}else{
							return '';
						}
						/*+'<span class="small-button delete" title="删除" onclick="showDeleteWindow('+id+')"></span>'*/;
				}},
		    ]],
		    singleSelect:true,
		    toolbar:'#readData .dataArea .dataTop',
		    pagination:true
		});
	})
	
	//纠错查询
	$('#readData .dataTop input[name=errorQuery]').click(function(){
		var userName = $('#readData .dataTop input[name=peopleName]').val();
		var userAccount = $('#readData .dataTop input[name=userAccount]').val();
		var ensureFlag = $('#readData .dataTop select[name=ensureFlag] option:selected').val();
		var monthDate = $('#readData .dataTop select[name=monthDate] option:selected').val();
		$('#salaryDg').datagrid({
			url:"../../../salary/findSalaryInfoForError.salary?getMs="+getMS(),
			queryParams:{
				userName:userName,
				userAccount:userAccount,
				ensureFlag:ensureFlag,
				monthDate:monthDate
			},
			columns:[[
				{field:'userAccount',title:'账号',width:70},
				{field:'userName',title:'姓名',width:55},
				{field:'finalPayAmount',title:'实发金额',width:55,formatter:function(value,row,index){
					finalPayAmountErr = row.finalPayAmountErr;
					if(finalPayAmountErr == 1){
						return '<span style="color:red">'+ value +'</span>';
					}else{
						return value;
					}
				}},
				{field:'classLevel',title:'等级',width:55},
				{field:'dailyWage',title:'日工资',width:55},
				{field:'monthlyPay',title:'月工资',width:55},
				{field:'days',title:'天数',width:55},
				{field:'totalPayAmount',title:'应发工资',width:55,formatter:function(value,row,index){
					totalPayAmountErr = row.totalPayAmountErr;
					if(totalPayAmountErr == 1){
						return '<span style="color:red">'+ value +'</span>';
					}else{
						return value;
					}
				}},
				{field:'nightShift',title:'夜班',width:55},
				{field:'nightShiftAmount',title:'夜班费',width:55,formatter:function(value,row,index){
					nightShiftAmountErr = row.nightShiftAmountErr;
					if(nightShiftAmountErr == 1){
						return '<span style="color:red">'+ value +'</span>';
					}else{
						return value;
					}
				}},
				{field:'subsidyAmount',title:'医、餐补',width:55},
				{field:'actualPayAmount',title:'实发工资',width:55,formatter:function(value,row,index){
					actualPayAmountErr = row.actualPayAmountErr;
					if(actualPayAmountErr == 1){
						return '<span style="color:red">'+ value +'</span>';
					}else{
						return value;
					}
				}},
				{field:'awardAmount',title:'工奖',width:55},
				{field:'overtimePayAmount',title:'加班费',width:55},
				{field:'communicationAmount',title:'通讯费',width:55},
				{field:'otherAmount',title:'出勤奖',width:55},
				{field:'withholdAmount',title:'扣款',width:55},
				{field:'insuranceAmount',title:'养老保险',width:55},
				{field:'departmentName',title:'部门',width:55},
				{field:'postName',title:'岗位',width:55},
				{field:'monthDate',title:'日期',width:80},
				{field:'_op',title:'操作',width:100,align:'center',width:120,
					formatter:function(value,row,index){
						id = "'" + row.salaryInfoId + "'";
						userName = "'" + row.userName + "'";
						monthDate = "'" + row.monthDate + "'";
						totalPayAmountErr = row.totalPayAmountErr;
						finalPayAmountErr = row.finalPayAmountErr;
						nightShiftAmountErr = row.nightShiftAmountErr;
						actualPayAmountErr = row.actualPayAmountErr;
						if(totalPayAmountErr || finalPayAmountErr || nightShiftAmountErr || actualPayAmountErr){
							return '<span class="small-button edit" title="修改" onclick="showUpdateWindow('+id+','+userName+','+monthDate+')"></span>'
						}else{
							return '';
						}
						/*+'<span class="small-button delete" title="删除" onclick="showDeleteWindow('+id+')"></span>'*/;
				}},
		    ]],
		    singleSelect:true,
		    toolbar:'#readData .dataArea .dataTop',
		    pagination:true
		});
	});
	
	//统计查询
	$('#readData .dataTop input[name=totalQuery]').click(function(){
		var userName = $('#readData .dataTop input[name=peopleName]').val();
		var userAccount = $('#readData .dataTop input[name=userAccount]').val();
		var yearDate = $('#readData .dataTop input[name=yearDate]').val();
		var departmentName = $('#readData .dataTop input[name=departmentName]').val();
		var monthDate = $('#readData .dataTop select[name=monthDate] option:selected').val();
		$('#salaryDg').datagrid({
			url:"../../../salary/findSalaryInfoByTotal.salary",
			queryParams:{
				userName:userName,
				userAccount:userAccount,
				yearDate:yearDate,
				departmentName:departmentName,
				monthDate:monthDate
			},
			columns:[[
			    {field:'yearDate',title:'年份',width:40},
				{field:'userAccount',title:'账号',width:60},
				{field:'userName',title:'姓名',width:60},
				{field:'classLevel',title:'等级',width:55},
				{field:'dailyWage',title:'日工资',width:55},
				{field:'days',title:'天数(总)',width:65},
				{field:'finalPayAmount',title:'实发金额(总)',width:80},
				{field:'monthlyPay',title:'月工资(总)',width:80},
				{field:'totalPayAmount',title:'应发工资(总)',width:80},
				{field:'nightShift',title:'夜班(总)',width:65},
				{field:'nightShiftAmount',title:'夜班费(总)',width:70},
				{field:'subsidyAmount',title:'医、餐补(总)',width:70},
				{field:'actualPayAmount',title:'实发工资(总)',width:70},
				{field:'awardAmount',title:'工奖(总)',width:70},
				{field:'overtimePayAmount',title:'加班费(总)',width:70},
				{field:'communicationAmount',title:'通讯费(总)',width:70},
				{field:'otherAmount',title:'出勤奖(总)',width:70},
				{field:'withholdAmount',title:'扣款(总)',width:70},
				{field:'insuranceAmount',title:'养老保险(总)',width:70},
				{field:'departmentName',title:'部门',width:55},
				{field:'postName',title:'岗位',width:55}
		    ]],
		    singleSelect:true,
		    toolbar:'#readData .dataArea .dataTop',
		    pagination:true
		});
	});
	
	//清空查询条件
	$('#readData .dataTop input[name=cleanSalary]').click(function(){
		$('#readData .dataTop input[type!=button]').val(null);
		$('#readData .dataTop select[name=monthDate]').val("");
	});
	
	$('#salaryDg').datagrid({
		//url:"../../../salary/findSalaryInfoByCondition.salary",
		columns:[[
			{field:'userAccount',title:'账号',width:70},
			{field:'userName',title:'姓名',width:55},
			{field:'finalPayAmount',title:'实发金额',width:55,formatter:function(value,row,index){
				finalPayAmountErr = row.finalPayAmountErr;
				if(finalPayAmountErr == 1){
					return '<span style="color:red">'+ value +'</span>';
				}else{
					return value;
				}
			}},
			{field:'classLevel',title:'等级',width:55},
			{field:'dailyWage',title:'日工资',width:55},
			{field:'monthlyPay',title:'月工资',width:55},
			{field:'days',title:'天数',width:55},
			{field:'totalPayAmount',title:'应发工资',width:55,formatter:function(value,row,index){
				totalPayAmountErr = row.totalPayAmountErr;
				if(totalPayAmountErr == 1){
					return '<span style="color:red">'+ value +'</span>';
				}else{
					return value;
				}
			}},
			{field:'nightShift',title:'夜班',width:55},
			{field:'nightShiftAmount',title:'夜班费',width:55,formatter:function(value,row,index){
				nightShiftAmountErr = row.nightShiftAmountErr;
				if(nightShiftAmountErr == 1){
					return '<span style="color:red">'+ value +'</span>';
				}else{
					return value;
				}
			}},
			{field:'subsidyAmount',title:'医、餐补',width:55},
			{field:'actualPayAmount',title:'实发工资',width:55,formatter:function(value,row,index){
				actualPayAmountErr = row.actualPayAmountErr;
				if(actualPayAmountErr == 1){
					return '<span style="color:red">'+ value +'</span>';
				}else{
					return value;
				}
			}},
			{field:'awardAmount',title:'工奖',width:55},
			{field:'overtimePayAmount',title:'加班费',width:55},
			{field:'communicationAmount',title:'通讯费',width:55},
			{field:'otherAmount',title:'出勤奖',width:55},
			{field:'withholdAmount',title:'扣款',width:55},
			{field:'insuranceAmount',title:'养老保险',width:55},
			{field:'departmentName',title:'部门',width:55},
			{field:'postName',title:'岗位',width:55},
			{field:'monthDate',title:'日期',width:80},
			{field:'_op',title:'操作',width:100,align:'center',width:120,
				formatter:function(value,row,index){
					id = "'" + row.salaryInfoId + "'";
					userName = "'" + row.userName + "'";
					monthDate = "'" + row.monthDate + "'";
					totalPayAmountErr = row.totalPayAmountErr;
					finalPayAmountErr = row.finalPayAmountErr;
					nightShiftAmountErr = row.nightShiftAmountErr;
					actualPayAmountErr = row.actualPayAmountErr;
					if(totalPayAmountErr || finalPayAmountErr || nightShiftAmountErr || actualPayAmountErr){
						return '<span class="small-button edit" title="修改" onclick="showUpdateWindow('+id+','+userName+','+monthDate+')"></span>'
					}else{
						return '';
					}
					/*+'<span class="small-button delete" title="删除" onclick="showDeleteWindow('+id+')"></span>'*/;
			}},
	    ]],
	    singleSelect:true,
	    toolbar:'#readData .dataArea .dataTop',
	    pagination:true
	});
	
	//弹出导入excel弹窗
	$('#readData .tabHeader input[name=readFromExcel]').click(function(){
		$('#readData .dataArea .popups .readSalaryFromExcel').css('display','block');
	})
	
	//确认工资信息
	$('#readData .tabHeader input[name=ensureData]').click(function(){
		$.ajax({
			url:"../../../salary/ensureSalaryInfo.salary",
			success:function(data){
				if(data == '200'){
					alert('确认信息成功');
				}
			}
		})
	})
	
	//删除未确认工资信息
	$('#readData .tabHeader input[name=deleteNotSureData]').click(function(){
		$.ajax({
			url:"../../../salary/deleteNotSureData.salary",
			success:function(data){
				if(data == '200'){
					alert('删除未确认信息成功');
				}
			}
		})
	})
	
	$('#readData .tabHeader input[name=readFromExcel]').click(function(){
		$('#readData .dataArea .popups .readSalaryFromExcel').css('display','block');
	})
	
	//确定修改工资信息点击事件
	$('#readData .dataArea .popups .updateSalaryInfo .confirm').click(function(){
		var salaryInfoId = $('#readData .dataArea .popups .updateSalaryInfo input[name=salaryInfoId]').val();
		var finalPayAmount = $('#readData .dataArea .popups .updateSalaryInfo input[name=finalPayAmount]').val();
		var totalPayAmount = $('#readData .dataArea .popups .updateSalaryInfo input[name=totalPayAmount]').val();
		var nightShiftAmount = $('#readData .dataArea .popups .updateSalaryInfo input[name=nightShiftAmount]').val();
		var actualPayAmount = $('#readData .dataArea .popups .updateSalaryInfo input[name=actualPayAmount]').val();
		
		if( !finalPayAmount && !totalPayAmount && !nightShiftAmount && !actualPayAmount){
			alert("请选填至少一项才能修改！");
		}else{
			$.ajax({
				url:"../../../salary/updateSalaryInfo.salary",
				data:{
					salaryInfoId:salaryInfoId,
					finalPayAmount:finalPayAmount,
					totalPayAmount:totalPayAmount,
					nightShiftAmount:nightShiftAmount,
					actualPayAmount:actualPayAmount
				},
				success:function(data){
					if(data == '200'){
						$('#readData .dataArea .popups .updateSalaryInfo').css('display','none');
						$('#salaryDg').datagrid('reload');
						alert('修改成功！');
					}else{
						alert('修改失败！');
					}
				}
			})
		}
		
	})
	
	//确定导入excel点击事件
	$('#readData .dataArea .popups .readSalaryFromExcel .confirm').click(function(){
		var excelPath = $('#readData .dataArea .popups .readSalaryFromExcel input[type=file]').val();
		if(excelPath == ''){  
            alert("请选择excel,再上传");  
        }else if(excelPath.lastIndexOf(".xls")<0){//可判断以.xls和.xlsx结尾的excel  
            alert("只能上传Excel文件");  
        }else{
        	var excel = $('#readData .dataArea .popups .readSalaryFromExcel input[type=file]');
    		excel.upload({
    			url:"../../../salary/readSalaryFromExcel.salary?getMs="+getMS(),
    			params: {},
    			onComplate: function (data) {
    				if(data ==200){
    					alert('导入成功');
    					$('#readData .dataArea .popups .readSalaryFromExcel').css('display','none');
    				}else{
    					alert('导入失败');
    				}				
    			}
    		})
    		excel.upload("ajaxSubmit");	
        }
	});
	/*****************设置上下移span的title****************/
	$('#readData .dataArea .popups .writetoexcel .upset').attr("title","上移");
	$('#readData .dataArea .popups .writetoexcel .downset').attr("title","下移");
	//导出excel
	$('#readData .tabHeader input[name=writeToExcel]').click(function(){
		$('#readData .dataArea .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#readData .dataArea .popups .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'userAccount',tableHeader:'账号',date:false},
			         {propertyName:'userName',tableHeader:'姓名',date:false},
			         {propertyName:'finalPayAmount',propertyType:'Double',tableHeader:'实发金额',date:false},
			         {propertyName:'classLevel',propertyType:'Double',tableHeader:'等级',date:false},
			         {propertyName:'dailyWage',propertyType:'Double',tableHeader:'日工资',date:false},
			         {propertyName:'monthlyPay',propertyType:'Double',tableHeader:'月工资',date:false},
			         {propertyName:'days',propertyType:'Integer',tableHeader:'天数',date:false},
			         {propertyName:'totalPayAmount',propertyType:'Integer',propertyType:'Integer',tableHeader:'应发工资',date:false},
			         {propertyName:'nightShift',propertyType:'Integer',tableHeader:'夜班',date:false},
			         {propertyName:'nightShiftAmount',propertyType:'Integer',tableHeader:'夜班费',date:false},
			         {propertyName:'subsidyAmount',propertyType:'Double',tableHeader:'医、餐补',date:false},
			         {propertyName:'actualPayAmount',propertyType:'Double',tableHeader:'实发工资',date:false},
			         {propertyName:'awardAmount',propertyType:'Double',tableHeader:'工奖',date:false},
			         {propertyName:'overtimePayAmount',propertyType:'Double',tableHeader:'加班费',date:false},
			         {propertyName:'communicationAmount',propertyType:'Double',tableHeader:'通讯费',date:false},
			         {propertyName:'otherAmount',propertyType:'Double',tableHeader:'出勤奖',date:false},
			         {propertyName:'withholdAmount',propertyType:'Double',tableHeader:'扣款',date:false},
			         {propertyName:'insuranceAmount',propertyType:'Double',tableHeader:'养老保险',date:false},
			         {propertyName:'departmentName',tableHeader:'部门',date:false},
			         {propertyName:'postName',tableHeader:'岗位',date:false},
			         {propertyName:'monthDate',tableHeader:'日期',date:false}
				 ]
		})
	});
	/*******************重置按钮点击事件***********************/
	$("#readData .dataArea .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#readData .tabHeader input[name=writeToExcel]").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#readData .dataArea .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#readData .dataArea .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#readData .dataArea .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#readData .dataArea .popups .writetoexcel"));
		var rewardPenaltiesExcel2 = [];
		for(var i = 0 ; i < rewardPenaltiesExcel.length ; i++){
			rewardPenaltiesExcel2.push(pactExcel[i]);
		}
		rewardPenaltiesExcel2.push({
			name:'jsonString',value:jsonString
		})
		//提交导出excel所需要的参数
		excelplugin.submit({
			type:'post',
			array:rewardPenaltiesExcel2,
			action:'../../../salary/writeSalaryToExcel.salary?'
		})
	});
});
function getMS(){
	var date = new Date();
	return date.getTime();
}

//显示修改工资信息弹窗
function showUpdateWindow(id,userName,monthDate){
	$('#readData .dataArea .popups .updateSalaryInfo').css('display','block');
	$('#readData .dataArea .popups .updateSalaryInfo input[name=salaryInfoId]').val(id);
	$('#readData .dataArea .popups .updateSalaryInfo input[name=peopleName]').val(userName+"  "+monthDate);
}