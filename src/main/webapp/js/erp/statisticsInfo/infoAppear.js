$(function(){
	//内容高度
	$('#infoAppear .content').css('height',$('#loadarea').height()-60 + 'px');
	//获取用户的上报数据项	
	$.ajax({
		url:'../../ErpStatistics/queryStatisticsUser.do?getMs='+getMS(),
		type:'post',
		dataType:'json',
		success:function(data){
			var list = data.rows;
			if(list.length > 0){
				infoAppearHTML(list);
			}
		},
		error:function(error){
			windowControl(error.status);
		}
	});
	//返回
	$('#infoAppear .outPut .back').click(function(){
		$('#infoAppear .outPut .mydata').show();
		$(this).hide();
		$('#infoAppear .content').show();
		$('#infoAppear .list').hide();
	})
	//点击我查看我提交的数据	
	$('#infoAppear .outPut .mydata').click(function(){
		$('#infoAppear .outPut .back').show();
		$(this).hide();
		$('#infoAppear .content').hide();
		$('#infoAppear .list').show();
		$("#infoAppeardg").datagrid({
			url:"../../ErpStatistics/queryStatisticsMessage.do?getMs="+getMS()
		});
	})
	$("#infoAppeardg").datagrid({
	    rownumbers:"true",
	    singleSelect:true,
	    pagination:true,
	    toolbar:"#infoAppear .list .filtCondition",
	    method:"post",
	    fit: true,
	    queryParams:{
	    	yourselfFlag:1
	    },
	    columns:[[
  	        {
  	        	field:"workshopName",
  	        	title:"车间",
  	        	align:"center",
  	        	width:100
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
  	        	width:100,
  	        	formatter:function(value,row,index){
  	        		return value.substr(0,10);
				}
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
  	        }  	        
  	    ]]
	});
	//查询
	$('#infoAppear .filtCondition .query').click(function(){
		var shopName = $('#infoAppear .filtCondition .shopName').val();
		var targetName = $('#infoAppear .filtCondition .targetName').val();
		var dateStartTime = $('#infoAppear .filtCondition .dateStartTime').val();
		var dateEndTime = $('#infoAppear .filtCondition .dateEndTime').val();
		
		$("#infoAppeardg").datagrid({
			queryParams: {
				workshopId:shopName,
				economicId:targetName,
				dateStartTime:dateStartTime,
				dateEndTime:dateEndTime,
				yourselfFlag:1
			}
		})
	});
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
		    $('#infoAppear .filtCondition .shopName').html(str);
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
		    $('#infoAppear .filtCondition .targetName').html(str);
		},
		error:function(error){
			windowControl(error.status);
		}
	});
	//清空
	$('#infoAppear .filtCondition .reset').click(function(){
		$('#infoAppear .filtCondition input[type=text]').val('');
		$('#infoAppear .filtCondition select').val('');
	})
	
	
})

function infoAppearHTML(list){
	var str = '';
	for(var i=0; i<list.length; i++){
		str += '<div class="item">'+
					'<ul>'+
						'<li>'+
							'<span>日期</span>'+
							'<input type="text" readonly class="dateTime" onclick="testShow(this);" />'+
						'</li>'+
						'<li>'+
							'<span>车间</span>'+
							'<input type="text" readonly class="workshop" data="'+ list[i].workshopId +'" value="'+ list[i].workshopName +'" />'+
						'</li>'+
						'<li>'+
							'<span>指标</span>'+
							'<input type="text" readonly class="economic" data="'+ list[i].economicId +'" value="'+ list[i].economicName +'" />'+
						'</li>'+
						'<li>'+
							'<span>数值</span>'+
							'<input type="text" class="count" />'+
						'</li>';
			if(existPermission('admin:erp:statisticsInfo:infoAppear:manage')){
				str += 	'<li>';
				str += 		'<input type="button"  class="button submit" data="'+ list[i].userId +'" value="提交" />';
				str += 	'</li>';
			}
				str += 	'</ul>';
				str += 	'</div>';
	}
	$('#infoAppear .content').html(str);
	
	//单个提交数据
	$('#infoAppear .content .item .submit').click(function(){
		var el = this;
		var dateTime = $(this).parents('.item').find('.dateTime').val();
		var workshopId = $(this).parents('.item').find('.workshop').attr('data');
		var economicId = $(this).parents('.item').find('.economic').attr('data');
		var userId = $(this).parents('.item').find('.submit').attr('data');
		var count = $(this).parents('.item').find('.count').val();
		if(dateTime == null || dateTime == ''){
			windowControl('请选择日期！');
			return ;
		}else if(count == null || count == ''){
			windowControl('请选择数值！');
			return ;
		}
		$.ajax({
			url:'../../ErpStatistics/addStatisticsMessage.do?getMs='+getMS(),
			data:{
				dateTime:dateTime,
				workshopId:workshopId,
				economicId:economicId,
				userId:userId,
				count:count
			},
			type:'post',
			dataType:'json',
			success:function(data){
				if(data == '200'){
					windowControl('提交成功！');
					$(el).parents('.item').find('.dateTime').val(null);
					$(el).parents('.item').find('.count').val(null);
				}
			},
			error:function(error){
				windowControl(error.status);
			}
		});
	});
	
}