$(function(){
	/*内容高度*/
	$('#goodsDeptUseGetForm .listBody').css('height',$('#loadarea').height()-62 + 'px');
	
	//初始化
	goodsDsptUseGetFormGetData('xixi');//为了只显示表头

	//点击查询
	$('#goodsDeptUseGetForm .filtCondition .query').click(function(){		
		var start = $('#goodsDeptUseGetForm .filtCondition input[name=startTime]').val();
		var end = $('#goodsDeptUseGetForm .filtCondition input[name=endTime]').val();
		var startC = start.replace(/-/g, "/");
		var endC = end.replace(/-/g, "/");
		if(startC&&endC){
			if(startC<endC){
				$('#goodsDeptUseGetFormList').html('');
				goodsDsptUseGetFormGetData(start,end);
			}else{
				windowControl('开始日期必须早于结束日期！');
			}
		}else{
			if(startC && endC){
				$('#goodsDeptUseGetFormList').html('');
				goodsDsptUseGetFormGetData(start,end);
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
	$('#goodsDeptUseGetForm .print').click(function(){
		$('#goodsDeptUseGetFormList').css('width',$('#goodsDeptUseGetFormList').width()+'px');
		$('#goodsDeptUseGetFormList td').css('text-align','center');
		$('#goodsDeptUseGetFormList').jqprint();
	});
	$('#goodsDeptUseGetForm .exportExcel').click(function(){
		var start = $('#goodsDeptUseGetForm .filtCondition input[name=startTime]').val();
		var end = $('#goodsDeptUseGetForm .filtCondition input[name=endTime]').val();
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
			action:'../../reportForms/exportGoodsDeptGetExcel.do',
			array:[
			       {name:'startTime',value:start},
			       {name:'endTime',value:end},
			       ],
			type:'post'
		})
	})
})

//表格数据获取
function goodsDsptUseGetFormGetData(startTime,endTime){
	$.ajax({
		url:'../../reportForms/goodsDeptGetForm.do?getMs='+getMS(),
		data:{
			'startTime':startTime,
			'endTime':endTime
		},
	    dataType:'json',
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
			    	$('#goodsDeptUseGetFormList').append(tempHtml);
			    	$('#goodsDeptUseGetForm .rigthH').show();
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
			    		var deptUseList = dept.deptUseModels;
			    		for(var j=0;j<deptUseList.length;j++){
			    			var deptuse = deptUseList[j];
			    			tempHtml += '<tr><td class="fwnormal">'+deptuse.useTypeValue+'</td>'
			    			var typeUseDataList = deptuse.typeUseDataModels;
			    			var sum = 0;
			    			for(var y=0;y<typeUseDataList.length;y++){
			    				typeUseDataList[y].amount = keepDecimals(typeUseDataList[y].amount);
			    				tempHtml += '<td class="fwnormal">'+typeUseDataList[y].amount+'</td>'
			    				sum += Number(typeUseDataList[y].amount);
			    			}
			    			tempHtml += '<td>'+sum+'</td></tr>'
			    		}
			    		tempHtml += '<tr><td>'+dept.departmentName+'</td>'
			    		var sum2 = 0;
			    		for(var x=0;x<dept.typeUseDatas.length;x++){		    			
			    			var typeUseData = keepDecimals(dept.typeUseDatas[x].amount);
			    			tempHtml += '<td>'+typeUseData+'</td>';	    			
			    			sum2 += Number(typeUseData);
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
			    	$('#goodsDeptUseGetFormList').append(tempHtml);
			    	$('#goodsDeptUseGetForm .rigthH').show();
		    	}else{
		    		$('#goodsDeptUseGetForm .rigthH').hide();
		    	}
	    	}
	    },
	    error:function(){
	        //请求出错处理
	    }
	})
}

