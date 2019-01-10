$(function (){
	//加载mdDateGrid
	option = {
		url:'../../../erpSelect/queryCustomerBySalesman.erp',//数据url
		//sumUrl:'assets/json/numberTotal.json',//合计数据
		fClumnWidth:0,//百分比，固定列
		sClumnWidth:100,//百分比,可移动列
		rowsLenght:20,//每页数量
		sClumn:[//可移动列
			{
				fileds:'customerName',
				title:'客户',
				sumFileds:'c'
			},
			{
				fileds:'ywman',
				title:'业务员',
				sumFileds:'d',
				formatter:function(value,row,index){
					return decodeURI(decodeURI(account));
				}
			},
			{
				fileds:'phoneNumber',
				title:'手机号',
				sumFileds:'e'
			}
		]
	}
	option.queryParams = {
			ywmanFlag:1,
	}
	$('#mdDateGrid').mddatagrid(option);
	//查询
	$('#dataArea .datagrid .toolBar .query').click(function(){
		var kehu = $('#dataArea .datagrid .toolBar .kehu').val();
		option.queryParams = {
				ywmanFlag:1,
				customerName:kehu
		}
		$('#mdDateGrid').mddatagrid(option);
	});
});