$(function(){
	/*内容高度*/
	$('#goodsDeptGetForm .listBody').css('height',$('#loadarea').height()-62 + 'px');
	
	//初始化
	goodsDeptGetFormGetData('xixi');//为了只显示表头

	//点击查询
	$('#goodsDeptGetForm .filtCondition .query').click(function(){		
		var start = $('#goodsDeptGetForm .filtCondition input[name=startTime]').val();
		var end = $('#goodsDeptGetForm .filtCondition input[name=endTime]').val();
		var startC = start.replace(/-/g, "/");
		var endC = end.replace(/-/g, "/");
		if(startC&&endC){
			if(startC<endC){
				$('#goodsDeptGetFormList').html('');
				goodsDeptGetFormGetData(start,end);
			}else{
				windowControl('开始日期必须早于结束日期！');
			}
		}else{
			if(startC && endC){
				$('#goodsDeptGetFormList').html('');
				goodsDeptGetFormGetData(start,end);
			}else if(!startC && !endC){
				windowControl('请选择开始结束时间');
			}else if(!startC){
				windowControl('请选择开始时间');
			}else if(!endC){
				windowControl('请选择结束时间');
			}
		}
	})	
	//打印
	$('#goodsDeptGetForm .print').click(function(){
		$('#goodsDeptGetFormList').css('width',$('#goodsDeptGetFormList').width()+'px');
		$('#goodsDeptGetFormList td').css('text-align','center');
		$('#goodsDeptGetFormList').jqprint();
	});
	$('#goodsDeptGetForm .exportExcel').click(function(){
		var start = $('#goodsDeptGetForm .filtCondition input[name=startTime]').val();
		var end = $('#goodsDeptGetForm .filtCondition input[name=endTime]').val();
		var startC = start.replace(/-/g, "/");
		var endC = end.replace(/-/g, "/");
		if(startC&&endC){
			if(startC<endC){
				
			}else{
				windowControl('开始日期必须早于结束日期！');
				return ;
			}
		}else{
			if(startC && endC){
				
			}else if(!startC && !endC){
				windowControl('请选择开始结束时间');
				return ;
			}else if(!startC){
				windowControl('请选择开始时间');
				return ;
			}else if(!endC){
				windowControl('请选择结束时间');
				return ;
			}
		}
		excelplugin.submit({
			action:'../../reportForms/exportAmountByDepartmentIdExcel.do',
			array:[
			       {name:'startTime',value:start},
			       {name:'endTime',value:end},
			       ],
			type:'post'
		})
	})
	
})

//表格数据获取
function goodsDeptGetFormGetData(startTime,endTime){
	$.ajax({
		url:'../../reportForms/selectAmountByDepartmentId.do?getMs='+getMS(),
	    dataType:'json',
	    data:{
			'startTime':startTime,
			'endTime':endTime
		},
	    async:true,
	    type:'POST',
	    success:function(data){
	        //请求成功时处理
	    	if(startTime == 'xixi'){
	    		if(data){
		    		var tempHtml = '<thead><tr><th>用途</th>';
			    	for(var i=0;i<data.goodsTypes.length;i++){
			    		tempHtml += '<th>'+ data.goodsTypes[i].goodsTypeName +'</th>';
			    	}
			    	tempHtml += '<th>统计</th></tr></thead>';
			    	$('#goodsDeptGetFormList').append(tempHtml);
			    	$('#goodsDeptGetForm .rigthH').show();
	    		}
	    	}else{
		    	if(data){
		    		var tempHtml = '<thead><tr><th>用途</th>';
			    	for(var i=0;i<data.goodsTypes.length;i++){
			    		tempHtml += '<th>'+ data.goodsTypes[i].goodsTypeName +'</th>';
			    	}
			    	tempHtml += '<th>合计</th></tr></thead>';
			    	for(var i = 0 ; i<data.deptDatas.length ; i++){
			    		var dept = data.deptDatas[i];
			    		tempHtml += '<tr><td>'+dept.departmentName+'</td>'
			    		var sum2 = 0;
			    		for(var x=0;x<dept.typeUseDatas.length;x++){		    			
			    			var typeUseData = dept.typeUseDatas[x];
			    			typeUseData.amount = keepDecimals(typeUseData.amount);
			    			tempHtml += '<td>'+typeUseData.amount+'</td>';	    			
			    			sum2 += Number(typeUseData.amount);
			    		}		    		
			    		tempHtml += '<td>'+sum2+'</td></tr>'
			    	};
			    	tempHtml += '<tr><td>合计</td>';
			    	var sum3 = 0;
			    	for(var i = 0 ; i<data.typeAmounts.length ; i++){
			    		data.typeAmounts[i].amount = keepDecimals(data.typeAmounts[i].amount);
			    		tempHtml += '<td>'+data.typeAmounts[i].amount+'</td>';
			    		sum3 += Number(data.typeAmounts[i].amount);
			    	}
			    	tempHtml += '<td>'+sum3+'</td></tr>';
			    	$('#goodsDeptGetFormList').append(tempHtml);
			    	$('#goodsDeptGetForm .rigthH').show();
		    	}else{
		    		$('#goodsDeptGetForm .rigthH').hide();
		    	}
	    	}
	    },
	    error:function(){
	        //请求出错处理
	    }
	})
}