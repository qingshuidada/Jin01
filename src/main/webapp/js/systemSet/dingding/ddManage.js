$(function(){
	/*表格数据的加载*/
	$('#ddManagedg').datagrid({
		rownumbers:"true",
		singleSelect:true,
		pagination:true,
		method:"post",
		toolbar:'#ddManage .invitetop',
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

	$('#ddManage .invitetop .chooseDept').click(function(){
		chooseDDDepartment();
		$('#chooseDDDepartment .confirm').click(function(){
		     $('#chooseDDDepartment').css('display','none');
		     var department = $('#chooseDDDepartment .dept').tree('getSelected');
		     $('#ddManage .invitetop input[name=departmentName]').val(department.text);
		     $('#ddManage .invitetop input[name=departmentId]').val(department.id);
		     $('#chooseDDDepartment .confirm').unbind();
		})
		
	});
	
})
function chooseDDDepartment(){
	$('#chooseDDDepartment').css('display','block');
	$('#ddManage #chooseDDDepartment .dept').tree({
	    url:'../../dingding/getDDDepartment.do?getMs='+getMS(),
		lines:true
    });
}
