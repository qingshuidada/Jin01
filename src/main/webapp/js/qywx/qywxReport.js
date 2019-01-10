$(function(){
	//时间
	$('.filtCondition input[name=reportFormsDate]').mobiscroll().date({
	       theme: 'mobiscroll',
	       lang: 'zh',
	       display: 'bottom',
	       dateFormat: 'yyyy-mm-dd',
	       select: 'multiple'
	});
	//初始化
	var time = new Date().Format('yyyy-MM-dd');
	var number = new Date().Format('dd');
	currentReportGetData(time,number);//为了只显示表头
	$('.filtCondition .currentDate').html(new Date().Format('yyyy年MM月dd日'));
	$('.filtCondition input[name=reportFormsDate]').val(time);
	//点击查询
	$('.filtCondition .query').click(function(){		
		var reportFormsDate = $('.filtCondition input[name=reportFormsDate]').val();
		var number = reportFormsDate.substr(8,2);
		var currentDate = reportFormsDate.substr(0,4) + '年' + reportFormsDate.substr(5,2) + '月' + reportFormsDate.substr(8,2) + '日';
		$('.filtCondition .currentDate').html(currentDate);
		currentReportGetData(reportFormsDate,number);
	});
	
	
	
})
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//表格数据获取
function currentReportGetData(reportFormsDate,number){
	var monthNumber = Number(number);
	$.ajax({
		url:'../../phErpStatistics/getEcoWorkshopTabData.ph',
		data:{
			reportFormsDate:reportFormsDate
		},
	    dataType:'json',
	    async:true,
	    type:'POST',
	    success:function(data){
	        //请求成功时处理
	    	if(data){
	    		//表头
	    		var outPutEconomicId = '';
	    		data=data.returnObj;
	    		var tempHtml = '<thead><tr><th rowspan="2" colspan="2">经济指标</th>';
		    	for(var i=0; i<data.workshopTabDatas.length; i++){
		    		tempHtml += '<th colspan="2" id='+ data.workshopTabDatas[i].workshopId +'>'+ data.workshopTabDatas[i].workshopName +'</th>';
		    	}   	
		    	tempHtml += '<th colspan="2">全公司</th></tr><tr>';
		    	for(var i=0; i<data.workshopTabDatas.length; i++){
		    		tempHtml += '<th>日量</th><th>月累计</th>';
		    	}
		    	tempHtml += '<th>日量</th><th>月累计</th></tr></thead>';
		    	//内容
		    	tempHtml += '<tbody>';
		    	//取出没有比率的指标
		    	for(var i=0; i<data.economicTabDatas.length; i++){
		    		if(data.economicTabDatas[i].countRate == 0 && data.economicTabDatas[i].outputValue == 0){
		    			tempHtml += '<tr>';
		    			tempHtml += '<td colspan="2">'+ data.economicTabDatas[i].economicName +'</td>';
		    			for(var j=0; j<data.workshopTabDatas.length; j++){
		    				var strDay = data.workshopTabDatas[j].workshopId+ '_' +data.economicTabDatas[i].economicId+'_day';
		    				var strMonth = data.workshopTabDatas[j].workshopId+ '_' +data.economicTabDatas[i].economicId+'_month';
		    				if(data.numberDatas){
		    					tempHtml += '<td>'+ data.numberDatas[strDay] +'</td><td>'+ data.numberDatas[strMonth] +'</td>';
		    				}else{
		    					tempHtml += '<td>&nbsp;</td><td>&nbsp;</td>';
		    				}
				    	}
		    			var strDayTotal = data.economicTabDatas[i].economicId+'_day_total';
		    			var strMonthTotal = data.economicTabDatas[i].economicId+'_month_total';
		    			if(data.numberDatas){
		    				tempHtml += '<td>'+ data.numberDatas[strDayTotal] +'</td><td>'+ data.numberDatas[strMonthTotal] +'</td></tr>';
	    				}else{
	    					tempHtml += '<td>&nbsp;</td><td>&nbsp;</td></tr>';
	    				}		    			
		    		} 		
		    	}
		    	//画产值
		    	for(var i=0; i<data.economicTabDatas.length; i++){		    		
		    		if(data.economicTabDatas[i].outputValue == 1){
		    			outPutEconomicId = data.economicTabDatas[i].economicId;
		    			tempHtml += '<tr>';
		    			tempHtml += '<td colspan="2">'+ data.economicTabDatas[i].economicName +'</td>';
		    			for(var j=0; j<data.workshopTabDatas.length; j++){
		    				var strDay = data.workshopTabDatas[j].workshopId+ '_' +data.economicTabDatas[i].economicId+'_output_day';
		    				var strMonth = data.workshopTabDatas[j].workshopId+ '_' +data.economicTabDatas[i].economicId+'_output_month';
		    				if(data.numberDatas){
		    					tempHtml += '<td>'+ data.numberDatas[strDay] +'</td><td>'+ data.numberDatas[strMonth] +'</td>';
		    				}else{
		    					tempHtml += '<td>&nbsp;</td><td>&nbsp;</td>';
		    				}
				    	}
		    			var strDayTotal = data.economicTabDatas[i].economicId+'_day_total';
		    			var strMonthTotal = data.economicTabDatas[i].economicId+'_month_total';
		    			if(data.numberDatas){
		    				tempHtml += '<td>'+ data.numberDatas[strDayTotal] +'</td><td>'+ data.numberDatas[strMonthTotal] +'</td></tr>';
	    				}else{
	    					tempHtml += '<td>&nbsp;</td><td>&nbsp;</td></tr>';
	    				}
		    		}
		    	}
		    	//取出有比率的指标
		    	for(var i=0; i<data.economicTabDatas.length; i++){
		    		if(data.economicTabDatas[i].countRate == 1){
		    			tempHtml += '<tr>';
		    			tempHtml += '<td rowspan="2">'+ data.economicTabDatas[i].economicName +'</td><td>数值</td>';
		    			for(var j=0; j<data.workshopTabDatas.length; j++){
		    				var strDay = data.workshopTabDatas[j].workshopId+ '_' +data.economicTabDatas[i].economicId+'_day';
		    				var strMonth = data.workshopTabDatas[j].workshopId+ '_' +data.economicTabDatas[i].economicId+'_month';
		    				if(data.numberDatas){
		    					tempHtml += '<td>'+ data.numberDatas[strDay] +'</td><td>'+ data.numberDatas[strMonth] +'</td>';
		    				}else{
		    					tempHtml += '<td>&nbsp;</td><td>&nbsp;</td>';
		    				}
				    	}
		    			var strDayTotal = data.economicTabDatas[i].economicId+'_day_total';
		    			var strMonthTotal = data.economicTabDatas[i].economicId+'_month_total';
		    			if(data.numberDatas){
		    				tempHtml += '<td>'+ data.numberDatas[strDayTotal] +'</td><td>'+ data.numberDatas[strMonthTotal] +'</td></tr>';
	    				}else{
	    					tempHtml += '<td>&nbsp;</td><td>&nbsp;</td></tr>';
	    				}
		    			tempHtml += '<tr>';
		    			tempHtml += '<td>比率</td>';
		    			for(var j=0; j<data.workshopTabDatas.length; j++){
		    				/*-------------计算比率拼接dom start----------------*/
		    				if(outPutEconomicId == ''){
		    					tempHtml += '<td>&nbsp;</td><td>&nbsp;</td>';
		    				}else{
		    					var strDay = data.workshopTabDatas[j].workshopId+ '_' +data.economicTabDatas[i].economicId+'_day';
			    				var strMonth = data.workshopTabDatas[j].workshopId+ '_' +data.economicTabDatas[i].economicId+'_month';//分子
		    					var day = data.workshopTabDatas[j].workshopId +'_'+ outPutEconomicId + '_output_day';
		    					var month = data.workshopTabDatas[j].workshopId +'_'+ outPutEconomicId + '_output_month';//分母
		    					var perA = 0;
		    					var perM = 0;
		    					if(data.numberDatas){
		    						if(data.numberDatas[day] == 0 || data.numberDatas[strDay] == 0){
			    						perA = '0.00%';		    						
			    					}else{
			    						perA = (Number(data.numberDatas[strDay])/Number(data.numberDatas[day]))*100;		    						
				    					perA = perA.toFixed(2)+'%';			    							    						
			    					}
			    					if(data.numberDatas[month] == 0 || data.numberDatas[strMonth] == 0){
			    						perM = '0.00%';
			    					}else{
			    						perM = (Number(data.numberDatas[strMonth])/Number(data.numberDatas[month]))*100;
			    						perM = perM.toFixed(2)+'%';
			    					}
		    					}else{
		    						perA = '&nbsp;';
		    						perM = '&nbsp;'
		    					}		    							    					
		    					tempHtml += '<td>'+ perA +'</td><td>'+ perM +'</td>';
		    				}
		    				/*-------------计算比率拼接dom end----------------*/
				    	}
		    			/*-------------计算比率拼接全公司dom start----------------*/
		    			if(outPutEconomicId == ''){
		    				tempHtml += '<td>&nbsp;</td><td>&nbsp;</td>';
		    			}else{
		    				var strDay = data.economicTabDatas[i].economicId+'_day_total';
		    				var strMonth = data.economicTabDatas[i].economicId+'_month_total';//分子
	    					var day = outPutEconomicId + '_day_total';
	    					var month = outPutEconomicId + '_month_total';//分母
	    					var perA = 0;
	    					var perM = 0;
	    					if(data.numberDatas){
	    						if(data.numberDatas[day] == 0 || data.numberDatas[strDay] == 0){
		    						perA = '0.00%';		    						
		    					}else{
		    						perA = (Number(data.numberDatas[strDay])/Number(data.numberDatas[day]))*100;		    						
			    					perA = perA.toFixed(2)+'%';			    							    						
		    					}
		    					if(data.numberDatas[month] == 0 || data.numberDatas[strMonth] == 0){
		    						perM = '0.00%';
		    					}else{
		    						perM = (Number(data.numberDatas[strMonth])/Number(data.numberDatas[month]))*100;
		    						perM = perM.toFixed(2)+'%';
		    					}
	    					}else{
	    						perA = '&nbsp;';
	    						perM = '&nbsp;'
	    					}					
	    					tempHtml += '<td>'+ perA +'</td><td>'+ perM +'</td>';
		    			}
		    			/*-------------计算比率拼接全公司dom end----------------*/
		    			tempHtml += '</tr>';
		    		}		    		
		    	}
		    	//合计
		    	tempHtml += '<tr>';
    			tempHtml += '<td rowspan="2">合计</td><td>数值</td>';
    			for(var j=0; j<data.workshopTabDatas.length; j++){
    				var strDayTotal = data.workshopTabDatas[j].workshopId+'_day_total';
    				var strMonthTotal = data.workshopTabDatas[j].workshopId+'_month_total';
    				if(data.numberDatas){
    					tempHtml += '<td>'+ data.numberDatas[strDayTotal] +'</td><td>'+ data.numberDatas[strMonthTotal] +'</td>';
    				}else{
    					tempHtml += '<td>&nbsp;</td><td>&nbsp;</td>';
    				}
		    	}
    			if(data.numberDatas){
    				tempHtml += '<td>'+ data.numberDatas['all_day_total'] +'</td><td>'+ data.numberDatas['all_month_total'] +'</td></tr>';
				}else{
					tempHtml += '<td>&nbsp;</td><td>&nbsp;</td></tr>';
				}    			
    			tempHtml += '<tr>';
    			tempHtml += '<td>比率</td>';
    			for(var j=0; j<data.workshopTabDatas.length; j++){
    				/*-------------计算比率拼接合计dom start----------------*/
    				if(outPutEconomicId == ''){
    					tempHtml += '<td>&nbsp;</td><td>&nbsp;</td>';
    				}else{
    					var strDay = data.workshopTabDatas[j].workshopId+'_day_total';
	    				var strMonth = data.workshopTabDatas[j].workshopId+'_month_total';//分子
    					var day = data.workshopTabDatas[j].workshopId +'_'+ outPutEconomicId + '_output_day';
    					var month = data.workshopTabDatas[j].workshopId +'_'+ outPutEconomicId + '_output_month';//分母
    					var perA = 0;
    					var perM = 0;
    					if(data.numberDatas){
    						if(data.numberDatas[day] == 0 || data.numberDatas[strDay] == 0){
	    						perA = '0.00%';		    						
	    					}else{
	    						perA = (Number(data.numberDatas[strDay])/Number(data.numberDatas[day]))*100;		    						
		    					perA = perA.toFixed(2)+'%';			    							    						
	    					}
	    					if(data.numberDatas[month] == 0 || data.numberDatas[strMonth] == 0){
	    						perM = '0.00%';
	    					}else{
	    						perM = (Number(data.numberDatas[strMonth])/Number(data.numberDatas[month]))*100;
	    						perM = perM.toFixed(2)+'%';
	    					}
    					}else{
    						perA = '&nbsp;';
    						perM = '&nbsp;'
    					}					
    					tempHtml += '<td>'+ perA +'</td><td>'+ perM +'</td>';
    				}
    				/*-------------计算比率拼接合计dom end----------------*/
		    	}
    			/*-------------计算比率拼接全公司合计dom start----------------*/
    			if(outPutEconomicId == ''){
    				tempHtml += '<td>&nbsp;</td><td>&nbsp;</td>';
    			}else{
    				var strDay = 'all_day_total';
    				var strMonth = 'all_month_total';//分子
					var day = outPutEconomicId + '_day_total';
					var month = outPutEconomicId + '_month_total';//分母
					var perA = 0;
					var perM = 0;
					if(data.numberDatas){
						if(data.numberDatas[day] == 0 || data.numberDatas[strDay] == 0){
    						perA = '0.00%';		    						
    					}else{
    						perA = (Number(data.numberDatas[strDay])/Number(data.numberDatas[day]))*100;		    						
	    					perA = perA.toFixed(2)+'%';			    							    						
    					}
    					if(data.numberDatas[month] == 0 || data.numberDatas[strMonth] == 0){
    						perM = '0.00%';
    					}else{
    						perM = (Number(data.numberDatas[strMonth])/Number(data.numberDatas[month]))*100;
    						perM = perM.toFixed(2)+'%';
    					}
					}else{
						perA = '&nbsp;';
						perM = '&nbsp;'
					}    					
					tempHtml += '<td>'+ perA +'</td><td>'+ perM +'</td>';
    			}
    			/*-------------计算比率拼接全公司合计dom end----------------*/
    			tempHtml += '</tr>';
    			//备注
    			tempHtml += '<tr>';
    			tempHtml += '<td colspan="2">备注(万)</td>';
    			for(var j=0; j<data.workshopTabDatas.length; j++){
    				var strMonthTotal = data.workshopTabDatas[j].workshopId+'_month_total';
    				var strMonth = data.workshopTabDatas[j].workshopId+ '_' +outPutEconomicId+'_output_month';
    				if(data.numberDatas){
    					var A = Number(data.numberDatas[strMonth])/(monthNumber*10000);
        				var B = A.toFixed(2);
    				}else{
    					B = '&nbsp;';
    				}    				
    				tempHtml += '<td>&nbsp;</td><td>'+ B +'</td>';
		    	}
    			var strMonthTotal =outPutEconomicId + '_month_total';
    			if(data.numberDatas){
    				var A = Number(data.numberDatas[strMonthTotal])/(monthNumber*10000);
    				var B = A.toFixed(2);
    			}else{
    				B = '&nbsp;';
    			}    			
    			tempHtml += '<td>&nbsp;</td><td>'+ B +'</td>';
    			tempHtml += '</tr>';
		    	//填充
		    	$('#currentReportList').html(tempHtml);
	    	}
	    	
	    },
	    error:function(){
	        //请求出错处理
	    }
	})
}

