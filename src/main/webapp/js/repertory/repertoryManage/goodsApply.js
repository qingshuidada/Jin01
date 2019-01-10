$(function(){
	/*表格数据的加载*/
	$('#goodsApplydg').datagrid({
		rownumbers:"true",
		singleSelect:true,
		pagination:true,
		method:"post",
		toolbar:'#goodsApply .invitetop',
		fit:true,
		columns:[[
			{field:'userName',title:'申请人',align:'center',width:100},
	        {field:'departmentName',title:'部门',align:'center',width:100},
	        {field:'goodsSize',title:'物品规格',align:'center',width:100},
			{field:'totalNumber',title:'数量',align:'center',width:80},
			{field:'unit',title:'单位',align:'center',width:50},
			{field:'record',title:'备注',align:'center',width:100},
	    ]],
	});
	//查询
	$('#goodsApply .invitetop .query').click(function(){
		var userName = $('#goodsApply .invitetop .userName').val();
		var departmentName = $('#goodsApply .invitetop .departmentName').val();
		var dataInfo = {
				userName:userName,
				departmentName:departmentName
		}
		$('#goodsApplydg').datagrid({
			url:"../../repertory/selectGoodsApply.do?getMs="+getMS(),
			queryParams:dataInfo
		});
	});
	
});