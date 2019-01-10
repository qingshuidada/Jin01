$(function(){	
	$('#officeGoodsAudit #officeGoodsAuditdg').css('height',$('#loadarea').height()-64 + 'px');
	
	//办公用品申请列表
	$('#officeGoodsAuditdg').datagrid({
		url:'../../admin/selectSuppliesApply.do?getMs='+getMS(),
		singleSelect:true,
		pagination:true,
		toolbar:"#officeGoodsAudit .invitetop",
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
					var approvalStatus = "'"+row.approvalStatus+"'";
					var suppliesId = "'"+row.suppliesId+"'";
					var opera = '';
					opera += '<div class="imgBox">';
					if(row.approvalStatus == 0){
						opera +='<span style="float:left;" class="small-button govern" title="审核" onclick="officeGoodsAuditApproval('+ applyId +','+ approvalStatus +','+suppliesId+')"></span>';
					}
					opera += '</div>';
					return opera;
			   }
			}
		]]
	});
	
	//条件查询
	$('#officeGoodsAudit .invitetop .select').click(function(){
		var suppliesName = $('#officeGoodsAudit .invitetop .suppliesName').val();
		var applyNo = $('#officeGoodsAudit .invitetop .applyNo').val();
		var proposer = $('#officeGoodsAudit .invitetop .proposer').val();
		var dataInfo = {
				suppliesName:suppliesName,
				applyNo:applyNo,
				userName:proposer
		};
		$('#officeGoodsAuditdg').datagrid({			
			queryParams:dataInfo
		});
	});
	
})
//管理办公用品，进行审核
function officeGoodsAuditApproval(applyId,approvalStatus,suppliesId){
	$('#officeGoodsAudit .popups .addAudit').show();
	$('#officeGoodsAudit .popups .addAudit select[name=approvalStatus]').val(approvalStatus);
	
	$('#officeGoodsAudit .popups .addAudit .comfirm').unbind('click');
	$('#officeGoodsAudit .popups .addAudit .comfirm').click(function(){
		var approvalStatus = $('#officeGoodsAudit .popups .addAudit select[name=approvalStatus]').val();
		$.ajax({
			url:'../../admin/updateSuppliesApply.do?getMs='+getMS(),
			data:{
				applyId:applyId,
				approvalStatus:approvalStatus,
				suppliesId:suppliesId
			},
			type:'post',
			success:function(data){
				if(data == 200){
					$('#officeGoodsAudit .popups .addAudit').hide();
					$('#officeGoodsAuditdg').datagrid("reload");
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



