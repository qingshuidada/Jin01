$(function(){
	/**设置内部网格内容的高度**/
	$("#trainDoc .traindg").css('height',$('#loadarea').height()-64);
	$("#trainDoc .flow").css('height',$('#loadarea').height()-64);
	
	/******创建数据培训信息网格******/
	$('#trainDoc .traindg').datagrid({
	 //   url:'../../train/queryTrainPersonMessage.do?getMs='+getMS(),
	    method:"post",
	    columns:[[
			{field:'_operate',title:'操作',align:'center',width:100,formatter:function(value,row,index){
				var trainId = "'"+row.trainId+"'";
				var trainDocId = "'"+row.trainDocId+"'";
				var userName = "'"+row.userName+"'";
				var trainName = "'"+row.trainName+"'";
				var startTimeStr = "'"+row.startTimeStr+"'";
				var endTimeStr = "'"+row.endTimeStr+"'";
				var trainDescribe = "'"+row.trainDescribe+"'";
				var joinFlag = "'"+row.joinFlag+"'";
				var opera = '';
				  if(existPermission('admin:personnel:trainManage:trainDoc:update'))
						opera +='<span class="small-button edit" onclick="editTrainJoinFlag('+trainDocId+','+userName+','+trainName+','+startTimeStr+','+endTimeStr+','+trainDescribe+','+joinFlag+')"/>';
				  if(existPermission('admin:personnel:trainManage:trainDoc:select'))
					  opera +='<span class="small-button look" onclick="queryUserTrainMessage('+trainDocId+','+userName+','+trainName+','+startTimeStr+','+endTimeStr+','+trainDescribe+','+joinFlag+')"/>';
				 return opera;
			}},
	        {field:'userName',title:'员工名',sortable:true,width:75},
	        {field:'departmentName',title:'部门',sortable:true,width:100},
			{field:'trainName',title:'培训名称',sortable:true,width:100},
			{field:'startTimeStr',title:'培训开始时间',sortable:true,width:100,align:'right'},
			{field:'endTimeStr',title:'培训结束时间',sortable:true,width:100,align:'right'},
			{field:'trainDescribe',title:'培训描述',sortable:true,width:100,align:'center'},
			{field:'train_company',title:'培训公司',sortable:true,align:'center',width:100,formatter:function(value,row,index){
				if(row.trainCompany == '0000'){
					return '本公司';
				}else{
					return row.trainCompany;
				}
			}},
			{field:'join_flag',title:'参与情况',align:'center',width:100,formatter:function(value,row,index){
				 return getValueFromKey("join_flag",row.joinFlag);
			}},
	    ]],
	    toolbar:'#trainDoc .invitetop',
	    striped:true,
	    loadMsg:'数据加载中',
	   // checkbox:true,
	    singleSelect:true,
	    pagination:true,
    	rownumbers:true
	});
//查询
	$('#trainDoc .invitetop .query').click(function(){
		$('#trainDoc .traindg').datagrid({
			url:'../../train/queryTrainPersonMessage.do?getMs='+getMS(),
			queryParams: {
	    		createUserName:function(){
	    			return $('#trainDoc input[name=createUserName]').val();
	    		},
				trainName:function(){
					return $('#trainDoc input[name=trainName]').val();
				},
				examineStatus:function(){
					return $('#trainDoc input[name=examineStatus]').val();
				},
				applyState:function(){
					return $('#trainDoc input[name=applyState]').val();
				}
	    	},
		});
	});
	/**********保存修改后的培训状态，然后关闭修改窗口**********/
	$("#trainDoc .popups .editTrainJoinFlag .confirm").click(function(){
		$("#trainDoc .editTrainJoinFlag").css('display','none');
		var id = $("#trainDoc .popups .editTrainJoinFlag input[name=trainDocId]").val();
		var joinFlag = $("#trainDoc .popups .editTrainJoinFlag .joinFlag").val();
		$.ajax({
			url:'../../train/updateTrainJoinFlag.do?getMs='+getMS(),
			data:{
				trainDocId:id,
				joinFlag:joinFlag
			},
			type:'post',
			success:function(data){
				if(data == 200){
					windowControl("修改成功");
					$('#trainDoc .traindg').datagrid({
						url:'../../train/queryTrainPersonMessage.do?getMs='+getMS(),
					});
				}else{
					windowControl("修改失败");
				}
			}
		});
	})
	
	/**********不保存修改后的培训状态，关闭窗口************/
	$("#trainDoc .editTrainJoinFlag .close").click(function(){
		$("#trainDoc .editTrainJoinFlag").css('display','none');
	})
	
	/**************joinFlag****************/
	$('#trainDoc .popuparea .joinFlag').html(getDataBySelectKey("join_flag"));
})
/*******修改培训状态方法********/
function editTrainJoinFlag(trainDocId,userName,trainName,startTimeStr,endTimeStr,trainDescribe,joinFlag){
	putTrainDocMessage(trainDocId,userName,trainName,startTimeStr,endTimeStr,trainDescribe,joinFlag);
	$("#trainDoc .popups .editTrainJoinFlag .joinFlag").removeAttr('disabled');
	$("#trainDoc .popups .editTrainJoinFlag .update").css('display','block');
	$("#trainDoc .popups .editTrainJoinFlag .select").css('display','none');
}

/*************查询员工培训详情方法*************/
function queryUserTrainMessage(trainDocId,userName,trainName,startTimeStr,endTimeStr,trainDescribe,joinFlag){
	putTrainDocMessage(trainDocId,userName,trainName,startTimeStr,endTimeStr,trainDescribe,joinFlag);
	console.log($("#trainDoc .popups .editTrainJoinFlag .joinFlag"))
	$("#trainDoc .popups .editTrainJoinFlag .joinFlag").attr('disabled','disabled');
	$("#trainDoc .popups .editTrainJoinFlag .update").css('display','none');
	$("#trainDoc .popups .editTrainJoinFlag .select").css('display','block');
}

function putTrainDocMessage(trainDocId,userName,trainName,startTimeStr,endTimeStr,trainDescribe,joinFlag){
	var dom = $("#trainDoc .popups .editTrainJoinFlag");
	//dom.find('input[name=peopleName]').val(trainDocId);
	dom.find('input[name=peopleName]').val(userName);
	dom.find('input[name=trainName]').val(trainName);
	dom.find('textarea[name=trainDescribe]').val(trainDescribe);
	dom.find('input[name=startTime]').val(startTimeStr);
	dom.find('input[name=endTime]').val(endTimeStr);
	dom.find('input[name=trainDocId]').val(trainDocId);
	dom.find('select[name=joinFlag]').val(joinFlag);
	dom.css('display','block');
}

