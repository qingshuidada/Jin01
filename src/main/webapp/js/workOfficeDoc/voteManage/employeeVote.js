$(function(){
	$("#employeeVotedg").datagrid({
		url:"../../vote/queryVote.do?getMs="+getMS(),
	    rownumbers:"true",
	    singleSelect:true,
	    pagination:true,
	    toolbar:"#employeeVote .invitetop",
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
  	        	if(row.status == 1 && !row.voteRecordId){
  	        		opera += '<span class="small-button edit" title="投票" onclick="vote('+id+')"></span>';
  	        	}
  	        	opera += '<span class="small-button look" title="查看" onclick="voteLook('+id+')"></span>';
  	        	return opera;
  	        }}, 
  	    ]]
	});
	//查询
	$('#employeeVote .query').click(function(){
		var voteName = $('#employeeVote .invitetop .voteName').val();
		var createStartTimeStr = $('#employeeVote .invitetop .createStartTimeStr').val();
		var createEndTimeStr = $('#employeeVote .invitetop .createEndTimeStr').val();
		var finishStartTimeStr = $('#employeeVote .invitetop .finishStartTimeStr').val();
		var finishEndTimeStr = $('#employeeVote .invitetop .finishEndTimeStr').val();
		var status = $('#employeeVote .invitetop .status').val();
		$("#employeeVotedg").datagrid({
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
});
//
function vote(id){
	toVote = id;
	would = true;
	loadPage('workOfficeDoc/voteManage','vote','投票页面');
}
function voteLook(id){
	toVote = id;
	would = false;
	loadPage('workOfficeDoc/voteManage','vote','投票页面');
}