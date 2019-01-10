$(function(){	
	$('#carAudit #carAuditdg').css('height',$('#loadarea').height()-64 + 'px');
	
	//产生数据网格
	$('#carAuditdg').datagrid({
		url:'../../admin/selectCarApplyNote.do?getMs='+getMS(),
		singleSelect:true,
		pagination:true,
		toolbar:"#carAudit .invitetop",
		method:"post",
		columns:[[
			{
				field:'carNo',
				title:'车牌号码',
				width:100,
				align:"center"
			},
			{
				field:'department',
				title:'用车部门',
				width:100,
				align:"center"
			},
			{
				field:'userFullName',
				title:'用车人',
				width:100,
				align:"center"
			},
			{
				field:'applyDateStr',
				title:'申请日期',
				width:100,
				align:"center"
			},
			{
				field:'reason',
				title:'申请理由',
				width:100,
				align:"center"
			},
			{
				field:'startTimeStr',
				title:'开始时间',
				width:100,
				align:"center"
			},
			{
				field:'endTimeStr',
				title:'结束时间',
				width:100,
				align:"center"
			},
			{
				field:'proposer',
				title:'申请人',
				width:100,
				align:"center"
			},
			{
				field:'mileage',
				title:'里程',
				width:80,
				align:"center"
			},
			{
				field:'oilUse',
				title:'油耗',
				width:80,
				align:"center"
			},
			{
				field:'approvalStatus',
				title:'审批状态',
				width:100,
				align:"center",
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
				field:"_opera",
				title:"操作",
				width:60,
				align:"center",
				formatter:function(value,row,index){
					var opera = '';
					var applyId = "'" + row.applyId + "'";	
					var approvalStatus = "'" + row.approvalStatus + "'";	
					opera += '<div class="imgBox">';
					if(row.approvalStatus == 0){
						opera += '<span style="float:left;" class="small-button govern" title="审核" onclick="carAuditApproval('+ applyId +','+ approvalStatus +')"></span>';
					}
					opera += '</div>';
					return opera;
				}
			}
	    ]]
	});
	//查询
	$('#carAudit .invitetop .select').click(function(){
		var carNo = $('#carAudit .invitetop .carNo').val();
		var approvalStatus = $('#carAudit .invitetop .approvalStatus').val();
		$('#carAuditdg').datagrid({					
			queryParams: {
				carNo:carNo,
				approvalStatus:approvalStatus
			}
		});
		
	});
	
})
//管理申请单，进行审核
function carAuditApproval(applyId,approvalStatus){
	$('#carAudit .popups .addAudit').show();
	$('#carAudit .popups .addAudit select[name=approvalStatus]').val(approvalStatus);
	
	$('#carAudit .popups .addAudit .comfirm').unbind('click');
	$('#carAudit .popups .addAudit .comfirm').click(function(){
		var approvalStatus = $('#carAudit .popups .addAudit select[name=approvalStatus]').val();
		$.ajax({
			url:'../../admin/updateCarApplyNote.do?getMs='+getMS(),
			data:{
				applyId:applyId,
				approvalStatus:approvalStatus
			},
			type:'post',
			success:function(data){
				if(data == 200){
					$('#carAudit .popups .addAudit').hide();
					$('#carAuditdg').datagrid("reload");
				}else{
					windowControl("操作失败！")
				}	
			},
			error:function(){
				windowControl("服务器未响应");
			}
		})
	})
	
		

	
}



