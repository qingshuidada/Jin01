$(function(){
	//车间选择	
	$.ajax({
		url:'../../ErpStatistics/queryWorkshop.do?getMs='+getMS(),
		type:'post',
		dataType:'json',
		success:function(data){
			var str = '<option value=""></option>';			
			var data = data.rows;
			for(var i=0;i<data.length;i++){
				str += '<option value=' + data[i].workshopId + '>' + data[i].workshopName + '</option>';
			}
		    $('#infoQuery .filtCondition .shopName').html(str);
		},
		error:function(error){
			windowControl(error.status);
		}
	});
	//指标选择	
	$.ajax({
		url:'../../ErpStatistics/queryEconomic.do?getMs='+getMS(),
		type:'post',
		dataType:'json',
		success:function(data){
			var str = '<option value=""></option>';			
			var data = data.rows;
			for(var i=0;i<data.length;i++){
				str += '<option value=' + data[i].economicId + '>' + data[i].economicName + '</option>';
			}
		    $('#infoQuery .filtCondition .targetName').html(str);
		},
		error:function(error){
			windowControl(error.status);
		}
	});
	//选择提交人员
	$('#infoQuery .filtCondition .people').click(function(){
		chooseUser();
		var el = this;
		$('#chooseUser .confirm').unbind('click');
		$('#chooseUser .confirm').one('click',function(){
			$('#chooseUser').css('display','none');	
			var selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
			$('#infoQuery .filtCondition .people').val(selectUser[0].userName);
			$('#infoQuery .filtCondition .people').attr('data',selectUser[0].userId);
		});
	});	
	$("#infoQuerydg").datagrid({
		url:"../../ErpStatistics/queryStatisticsMessage.do?getMs="+getMS(),
	    rownumbers:"true",
	    singleSelect:true,
	    pagination:true,
	    toolbar:"#infoQuery .filtCondition",
	    method:"post",
	    fit: true,
	    columns:[[
  	        {
  	        	field:"workshopName",
  	        	title:"车间",
  	        	align:"center",
  	        	width:100,
  	        	formatter:function(value,row,index){
  	        		var str = '';
  	        		if(row.ensureFlag == 0){
  	        			str = '<span style="color:green;">'+ value +'</span>';
  	        		}else if(row.ensureFlag == 1){
  	        			str = value;
  	        		}
  	        		return str;
				}
  	        },
  	        {
  	        	field:"economicName",
  	        	title:"经济指标",
  	        	align:"center",
  	        	width:100
  	        },
  	        {
  	        	field:"dateTime",
  	        	title:"数据日期",
  	        	align:"center",
  	        	width:100
  	        },
  	        {
  	        	field:"count",
  	        	title:"数值",
  	        	align:"center",
  	        	width:100
  	        },
  	        {
  	        	field:"submitTime",
  	        	title:"提交日期",
  	        	align:"center",
  	        	width:100,
  	        	formatter:function(value,row,index){
  	        		return value.substr(0,10);
				}
  	        },
  	        {
  	        	field:"userName",
  	        	title:"提交人",
  	        	align:"center",
  	        	width:100
  	        },
  	        {
	    	   field:"_op",
	    	   title:"管理",
	    	   width:40,
	    	   align:"center",
	    	   formatter:function(value,row,index){
				   var opera = '';
				   var statisticsMessageId = "'"+ row.statisticsMessageId +"'";
				   var economicId = "'"+ row.economicId +"'";
				   var workshopId = "'"+ row.workshopId +"'";
				   var dateTime = "'"+ row.dateTime +"'";				   
				   opera += '<div class="imgBox">';
				   if(row.ensureFlag == 0){
					   opera += '<span style="float:left;" class="small-button govern" title="确定提交记录" onclick="infoQueryAffirm('+statisticsMessageId+','+economicId+','+workshopId+','+dateTime+')"></span>';
				   }
				   opera += '</div>';
				   return opera;
				}
	       },
  	        
  	    ]]
	});
	//查询
	$('#infoQuery .filtCondition .query').click(function(){
		var shopName = $('#infoQuery .filtCondition .shopName').val();
		var targetName = $('#infoQuery .filtCondition .targetName').val();
		var dateStartTime = $('#infoQuery .filtCondition .dateStartTime').val();
		var dateEndTime = $('#infoQuery .filtCondition .dateEndTime').val();
		var people = $('#infoQuery .filtCondition .people').attr('data');
		
		$("#infoQuerydg").datagrid({
			queryParams: {
				workshopId:shopName,
				economicId:targetName,
				dateStartTime:dateStartTime,
				dateEndTime:dateEndTime,
				userId:people
			}
		})
	});
	//清空
	$('#infoQuery .filtCondition .reset').click(function(){
		$('#infoQuery .filtCondition input[type=text]').val(null);
		$('#infoQuery .filtCondition select').val(null);
		$('#infoQuery .filtCondition .people').removeAttr('data');
	})


})
//确定记录
function infoQueryAffirm(statisticsMessageId,economicId,workshopId,dateTime){
	ui.confirm('确定指定该记录为提交数据吗？',function(z){
		if(z){
			$.ajax({
				url:'../../ErpStatistics/ensureStatisticsMessage.do?getMs='+getMS(),
				data:{
					statisticsMessageId:statisticsMessageId,
					economicId:economicId,
					workshopId:workshopId,
					dateTime:dateTime
				},
				type:'post',
				dataType:'json',
				success:function(data){
					if(data == '200'){
						windowControl('设置成功！');
						$("#infoQuerydg").datagrid('reload');
					}
				},
				error:function(error){
					windowControl(error.status);
				}
			});
		}		
	},false)
}
