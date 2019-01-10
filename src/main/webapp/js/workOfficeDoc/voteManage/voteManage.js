$(function(){
	if(existPermission('admin:workOfficeDoc:voteManage:voteManage:add'))
		$("#voteManage .maintop").append('<input type="button" class="button addVote" value="发起投票"/>');
	$("#voteManagedg").datagrid({
		url:"../../vote/queryVote.do?getMs="+getMS(),
	    rownumbers:"true",
	    singleSelect:true,
	    pagination:true,
	    toolbar:"#voteManage .invitetop",
	    method:"post",
	    fit: true,
	    columns:[[
  	        {field:"voteName",title:"投票名称",resizable:true,fitColumns:true,align:"left",width:($('#loadarea').width()-616)},     
  	        {field:"createTimeStr",title:"发起时间",resizable:true,fitColumns:true,align:"center",width:120}, 
  	        {field:"endTimeStr",title:"结束时间",resizable:true,fitColumns:true,align:"center",width:120}, 
  	        {field:"status",title:"状态",resizable:true,fitColumns:true,align:"center",width:120,formatter:function(value,row,index){
  	        	if(value == 0){
  	        		return '关闭';
  	        	}else if(value == 1){
  	        		return '投票中';
  	        	}else{
  	        		return '已结束';
  	        	}
  	        }}, 
  	        {field:"amount",title:"已参与的人数",resizable:true,fitColumns:true,align:"center",width:120},
  	        {field:"_op",title:"操作",resizable:true,fitColumns:true,align:"center",width:100,formatter:function(value,row,index){
  	        	var opera = '';
  	        	id = "'"+row.voteId+"'";
  	        	if(row.status == 1 && row.isClose){
  	        		if(existPermission('admin:workOfficeDoc:voteManage:voteManage:close'))
  	        			opera += '<span class="small-button edit" title="关闭" onclick="closeVote('+id+')"></span>';
  	        	}
  	        	opera += '<span class="small-button look" title="查看" onclick="voteManageLook('+id+')"></span>';
  	        	return opera;
  	        }}, 
  	    ]]
	});
	//查询
	$('#voteManage .query').click(function(){
		var voteName = $('#voteManage .invitetop .voteName').val();
		var createStartTimeStr = $('#voteManage .invitetop .createStartTimeStr').val();
		var createEndTimeStr = $('#voteManage .invitetop .createEndTimeStr').val();
		var finishStartTimeStr = $('#voteManage .invitetop .finishStartTimeStr').val();
		var finishEndTimeStr = $('#voteManage .invitetop .finishEndTimeStr').val();
		var status = $('#voteManage .invitetop .status').val();
		$("#voteManagedg").datagrid({
			queryParams: {
				voteName:voteName,
				createStartTimeStr:createStartTimeStr,
				createEndTimeStr:createEndTimeStr,
				finishStartTimeStr:finishStartTimeStr,
				finishEndTimeStr:finishEndTimeStr,
				status:status
			}
		})
	});
	//发起投票弹窗
	$('#voteManage .addVote').click(function(){
		$('#voteManage .launchVote').css('display','block');
	});
	//添加投票选项
	$('#voteManage .launchVote .addVoteItem').click(function(){
		var text = $.trim($(this).prev().val());
		if(text == '' || text == null){
			windowControl('请先输入投票选项');
		}else{
			$(this).prev().val('');
			var str = '<tr>'
			if($('#voteManage .launchVote .voteItemName').length == 1){
				str	+= '<td>投票选项：</td>';
				$('#voteManage .launchVote .addVote td:eq(0)').text('');
			}else{
				str	+= '<td></td>';
			}	
			str += '<td>'
				+ '<input  type="text" class="voteItemName" disabled value="'+text+'" flag="'+text+'"/>'
				+ '<input type="button" class="button" onclick="deleteVoteItem(this)" value="删除"/>'
				+ '</td>'		
				+ '</tr>';
			$('#voteManage .launchVote .addVote').before(str);
		}
			
		
		
	});
	//发起投票
	$('#voteManage .launchVote .confirm').click(function(){
		var voteName = $.trim($('#voteManage .launchVote .voteName').val());
		var detail = $.trim($('#voteManage .launchVote .detail').val());
		var endTimeStr = $('#voteManage .launchVote .endTimeStr').val();
		var len = $('#voteManage .launchVote .voteItemName').length-1;
		var itemList = [];
		var list;
		for(var i=0;i<len;i++){
			var voteItemName = $('#voteManage .launchVote .voteItemName').eq(i).val();
			list = {voteItemName:voteItemName,}
			itemList.push(list);
		}
		if(voteName == ''||voteName == null){
			windowControl('投票名称不能为空');
			return;
		}else if(endTimeStr == ''||endTimeStr == null){
			windowControl('投票结束时间不能为空');
			return;
		}else if(len = 0){
			windowControl('请设置投票选项');
			return;
		}else{
			var info = {
				voteName:voteName,
				detail:detail,
				endTimeStr:endTimeStr,
				itemList:itemList,
			}
			info = JSON.stringify(info);
			$.ajax({
				data:{jsonString:info},
				url:"../../vote/addVote.do?getMs="+getMS(),
				success:function(data){
					if(data == 200){
						windowControl('发起投票成功');
					}else{
						windowControl('发起投票失败');
					}
					$('#voteManage .launchVote').css('display','none');
					$('#voteManage .launchVote .popuparea input[type=text]').val('');
					$('#voteManage .launchVote .popuparea textarea').val('');
					var tr = $('#voteManage .launchVote .popuparea .voteItemName').parents('tr');
					for(var i=1;i<tr.length;i++){
						tr.eq(i).remove();
					}
					$("#voteManagedg").datagrid('reload');
					$('#voteManage .launchVote .addVote td:eq(0)').text('投票选项：');
				},
				error:function(err){
					windowControl('网络异常');
				}
			})
		}
	});
});
//
//删除添加托票选择项
function deleteVoteItem(ele){
	var dom = $(ele).parents('tr');
	dom.remove();
	if($('#voteManage .launchVote .voteItemName').length == 1){
		$('#voteManage .launchVote .addVote td:eq(0)').text('投票选项：');
	}else{
		$('#voteManage .launchVote .voteItemName').eq(0).parents('tr').find('td:eq(0)').text('投票选项：');
	}
}
//
function closeVote(id){
	ui.confirm('确认要关闭该投票',function(z){
		if(z){
			$.ajax({
				data:{voteId:id,status:0},
				url:"../../vote/updateVote.do?getMs="+getMS(),
				success:function(data){
					if(data == 200){
						windowControl('关闭投票成功');
					}else{
						windowControl('关闭投票失败');
					}
					$("#voteManagedg").datagrid('reload');
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	},false);
}
function voteManageLook(id){
	toVote = id;
	would = false;
	loadPage('workOfficeDoc/voteManage','vote','投票页面');
}