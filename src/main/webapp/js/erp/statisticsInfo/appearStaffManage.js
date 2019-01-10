$(function(){
	//内容高度
	$('#appearStaffManage .content').css('height',$('#loadarea').height()-94 + 'px');
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
		    $('#appearStaffManage .filtCondition .shopName').html(str);
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
		    $('#appearStaffManage .filtCondition .targetName').html(str);
		},
		error:function(error){
			windowControl(error.status);
		}
	});
	//上报人员管理查询
	appearStaffManageQuery(null,null);
	//查询
	$('#appearStaffManage .filtCondition .query').click(function(){
		var shopId = $('#appearStaffManage .filtCondition .shopName').val();
		var targetId = $('#appearStaffManage .filtCondition .targetName').val();
		appearStaffManageQuery(shopId,targetId);
	})
})
//添加内容
function appearStaffManageHTML(list){
	var str = '';
	for(var i=0; i<list.length; i++){
		var userId =  list[i].userId || '';
		var userName = list[i].userName || '';
		str += '<div class="item">'+
					'<ul>'+
						'<li>'+
							'<span>车间</span>'+
							'<input type="text" readonly class="workshop" data="'+ list[i].workshopId +'" value="'+ list[i].workshopName +'" />'+
						'</li>'+
						'<li>'+
							'<span>指标</span>'+
							'<input type="text" readonly class="economic" data="'+ list[i].economicId +'" value="'+ list[i].economicName +'" />'+
						'</li>'+
						'<li>'+
							'<span>人员</span>'+
							'<input type="text" readonly class="people" data="'+ userId +'"  value="'+ userName +'" />'+
							'<input type="button" class="button select" value="选择" />'+
						'</li>';
		if(existPermission('admin:erp:statisticsInfo:appearStaffManage:manage')){
			str += '<li>';
			str += '<input type="button" class="button submit" value="提交" />';
			str += '</li>';
		}
				str += '</ul>';
				str += '</div>';
	}
	$('#appearStaffManage .content').html(str);
	//选择人员
	$('#appearStaffManage .content .item .select').click(function(){
		chooseUser();
		var el = this;
		$('#chooseUser .confirm').unbind('click');
		$('#chooseUser .confirm').one('click',function(){
			$('#chooseUser').css('display','none');	
			var selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
			$(el).siblings('.people').val(selectUser[0].userName);
			$(el).siblings('.people').attr('data',selectUser[0].userId);
		});
	});
	//单个提交配置的人员
	$('#appearStaffManage .content .item .submit').click(function(){
		var workshopId = $(this).parents('.item').find('.workshop').attr('data');
		var economicId = $(this).parents('.item').find('.economic').attr('data');
		var userId = $(this).parents('.item').find('.people').attr('data');
		if(userId == null || userId == ''){
			windowControl('请选择人员！');
			return ;
		}
		$.ajax({
			url:'../../ErpStatistics/reportUserFromWE.do?getMs='+getMS(),
			data:{
				workshopId:workshopId,
				economicId:economicId,
				userId:userId
			},
			type:'post',
			dataType:'json',
			success:function(data){
				if(data == '200'){
					windowControl('提交成功！');
				}
			},
			error:function(error){
				windowControl(error.status);
			}
		});
	});
}
//查询人员配置
function appearStaffManageQuery(shopId,targetId){
	$.ajax({
		url:'../../ErpStatistics/queryUserFromWE.do?getMs='+getMS(),
		data:{
			workshopId:shopId,
			economicId:targetId
		},
		type:'post',
		dataType:'json',
		success:function(data){
			console.log(data)
			var list = data.rows;
			if(list.length > 0){
				appearStaffManageHTML(list);
			}
		},
		error:function(error){
			windowControl(error.status);
		}
	});
}

