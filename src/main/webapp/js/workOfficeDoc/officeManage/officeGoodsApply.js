$(function(){
	$('#officeGoodsApply #officeApplydg').css('height',$('#loadarea').height()-62 + 'px');
	//选择申请人
	$('#officeGoodsApply .addApply input[name=selectProposer]').click(function(){
		chooseUser();
		$('#chooseUser .confirm').unbind();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	var selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	if(selectUser.length == 0){
	    		$('#officeGoodsApply .popups .addApply input[name=proposer]').val(null);
		    	$('#officeGoodsApply .popups .addApply input[name=proposer]').attr('userid',null);
	    	}else{
	    		$('#officeGoodsApply .popups .addApply input[name=proposer]').val(selectUser[0].userName);
		    	$('#officeGoodsApply .popups .addApply input[name=proposer]').attr('userid',selectUser[0].userId);
	    	}
	    })
	});
	//添加办公用品
	$('#officeGoodsApply .popups .addApply input[name=selectSupplies]').click(function(){
		chooseSupplies()
		$('#chooseSupplies .confirm').unbind();
	    $('#chooseSupplies .confirm').click(function(){
	    	$('#chooseSupplies').css('display','none');
	    	var chooseSupplies = $('#chooseSupplies .popuparea .supplies').datagrid('getSelections');
	    	if(chooseSupplies.length == 0){
	    		$('#officeGoodsApply .popups .addApply input[name=suppliesName]').val(null);
		    	$('#officeGoodsApply .popups .addApply input[name=suppliesName]').attr('suppliesid',null);
	    	}else{
	    		$('#officeGoodsApply .popups .addApply input[name=suppliesName]').val(chooseSupplies[0].suppliesName);
		    	$('#officeGoodsApply .popups .addApply input[name=suppliesName]').attr('suppliesid',chooseSupplies[0].suppliesId);	
	    	}
	    })
	})	
	//系统自动生成编号
	$('#officeGoodsApply .addApply input[name=generateApplyNo]').click(function(){
		var myDate = new Date();
        var myYear = myDate.getFullYear();
        var myMonth = myDate.getMonth();
        var myHour= myDate.getHours();
        var myMinute = myDate.getMinutes();
        var mySecond = myDate.getSeconds();
        var applyNo = "GA"+myYear+myMonth+myHour+myMinute+mySecond;
        $('#officeGoodsApply .addApply input[name=applyNo]').val(applyNo);
	});
	//添加申请单 确定
	$('#officeGoodsApply .maintop .operate').click(function(){
		$('#officeGoodsApply .popups .addApply').css('display','block');		
	});
	$('#officeGoodsApply .addApply .comfirm').click(function(){
		var applyNo = $('#officeGoodsApply .addApply input[name=applyNo]').val();//申请号*
		var suppliesId = $('#officeGoodsApply .addApply input[name=suppliesName]').attr('suppliesid');//商品名称*
		var applyDate = $('#officeGoodsApply .addApply input[name=applyDate]').val();//申请日期*
		var proposer = $('#officeGoodsApply .addApply input[name=proposer]').val();//申请人*
		var userId = $('#officeGoodsApply .addApply input[name=proposer]').attr('userid'); 
		var useCounts = $('#officeGoodsApply .addApply input[name=useCounts]').val();//申请数量*
		var notes = $('#officeGoodsApply .addApply input[name=notes]').val();//备注		

		if(applyNo == null || applyNo == ''){
			windowControl("申请号不能为空");
		}else if(suppliesId == null || suppliesId == ''){
			windowControl("商品名称不能为空");
		}else if(applyDate == null || applyDate == ''){
			windowControl("申请日期不能为空");
		}else if(proposer == null || proposer == ''){
			windowControl("申请人不能为空");
		}else if(useCounts == null || useCounts == ''){
			windowControl("申请数量不能为空");
		}else{
			$.ajax({
				url:"../../admin/addSuppliesApply.do?getMs="+getMS(),
				data:{
					suppliesId:suppliesId,
					applyNo:applyNo,
					applyDateStr:applyDate,
					proposer:proposer,
					userId:userId,
					useCounts:useCounts,
					notes:notes
				},				
				method:"post",
				success: function(data){
					$('#officeGoodsApply .addApply .popuparea input[type=text]').val('');
					$('#officeApplydg').datagrid('reload');
					if(data==200){
						windowControl('添加成功');
					}else{
						windowControl('添加失败');
					}
				},
			})	
		}
		$('#officeGoodsApply .popups .addApply').hide();
	});
	//办公用品申请列表
	$('#officeApplydg').datagrid({
		url:'../../admin/selectSuppliesApply.do?getMs='+getMS(),
		singleSelect:true,
		pagination:true,
		toolbar:"#officeGoodsApply .invitetop",
		method:"post",
		columns:[[
			{
			   field:"applyNo",
			   title:"申请号",
			   align:"center",
			   width:120
			},
			{
			   field:"suppliesName",
			   title:"商品名称",
			   align:"center",
			   width:100
			},
			{
			   field:"applyDateStr",
			   title:"申请日期",
			   align:"center",
			   width:100
			},
			{
			   field:"useCounts",
			   title:"申请数量",
			   align:"center",
			   width:100
			},
			{
			   field:"userName",
			   title:"申请人",
			   align:"center",
			   width:100
			},
			{
			   field:"notes",
			   title:"备注",
			   align:"center",
			   width:80
			},
			{
			   field:"approvalStatus",
			   title:"审批状态",
			   align:"center",
			   width:100,
			   formatter:function(value,row,index){
					var status = '';
					if(value == 0){
						status = '审批中'
					}else if(value == 1){
						status = '审批通过'
					}else if(value == 2){
						status = '审批未通过'
					}
					return status;
			   }
			},
			{
			   field:"_op",
			   title:"管理",
			   width:60,
			   align:"center",
			   formatter:function(value,row,index){
					var applyId = "'"+row.applyId+"'";
					var opera = '<div class="imgBox">'+						
								'<span style="float:left;" class="small-button delete" title="删除" onclick="officeGoodsApplyDelete('+ applyId +')"></span>'+
								'</div>';
					return opera;
			   }
			}
		]]
	});
	
	//条件查询
	$('#officeGoodsApply .invitetop .select').click(function(){
		var suppliesName = $('#officeGoodsApply .invitetop input[name=suppliesName]').val();
		var applyNo = $('#officeGoodsApply .invitetop input[name=applyNo]').val();
		var proposer = $('#officeGoodsApply .invitetop input[name=proposer]').val();
		var dataInfo = {
				suppliesName:suppliesName,
				applyNo:applyNo,
				userName:proposer
		};
		$('#officeApplydg').datagrid({			
			queryParams:dataInfo
		});
	});

});
//删除申请单
function officeGoodsApplyDelete(applyId){
	ui.confirm('确定删除该申请单吗？',function(z){
		if(z){
			$.ajax({
				url:'../../admin/deleteSuppliesApply.do?getMs='+getMS(),
				data:{
					applyId:applyId,
					aliveFlag:0
				},
				type:'post',
				success:function(data){
					if(data == 200){
						windowControl("删除成功！")
						$('#officeApplydg').datagrid("reload");
					}else{
						windowControl("删除失败！")
					}	
				},
				error:function(){
					windowControl("服务器未响应");
				}
			})
		}
	})
	
}
