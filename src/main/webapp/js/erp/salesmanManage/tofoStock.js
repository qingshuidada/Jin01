$(function(){
	//查询
	$('#dataArea .datagrid .toolBar .query').click(function(){
		//var ywman = $('#dataArea .datagrid .toolBar .ywman').val();
		var kehu = $('#dataArea .datagrid .toolBar .kehu').val();
		var peiliao = $('#dataArea .datagrid .toolBar .peiliao').val();
		var dingzi = $('#dataArea .datagrid .toolBar .dingzi').val();
		var key = $('#dataArea .dataSelect h3').attr('key');
		option.queryParams = {
				ywmanFlag:1,
				dataSourceKey:key,
				//ywman:ywman,
				kehu:kehu,
				peiliao:peiliao,
				dingzi:dingzi,
		}
		$('#mdDateGrid').mddatagrid(option);
	});
});
//加载mdDateGrid
function loadMdDateGrid(){
	option = {
		url:'../../../erpSelect/queryVbpkc.erp',//数据url
		//sumUrl:'assets/json/numberTotal.json',//合计数据
		fClumnWidth:35,//百分比，固定列
		sClumnWidth:65,//百分比,可移动列
		rowsLenght:20,//每页数量
		fClumn:[//固定列
	        {
				fileds:'ywman',
				title:'业务员',
				sumFileds:'a',
			},
	        {
				fileds:'kehu',
				title:'客户',
				sumFileds:'b'
			}
		],	
		sClumn:[//可移动列
			{
				fileds:'peiliao',
				title:'品名规格',
				sumFileds:'c',
			},
			{
				fileds:'dingzi',
				title:'订字',
				sumFileds:'d'
			},
			{
				fileds:'Pitem',
				title:'加工类别',
				sumFileds:'f'
			},
			{
				fileds:'pishu',
				title:'匹数',
				sumFileds:'f'
			},
			{
				fileds:'kashu',
				title:'可开卡数',
				sumFileds:'f'
			},
			{
				fileds:'mishu',
				title:'米数',
				sumFileds:'f'
			},
			{
				fileds:'peizhong',
				title:'重量',
				sumFileds:'f'
			},
			{
				fileds:'zhrktime',
				title:'最近入库日期',
				sumFileds:'e'
			},
			{
				fileds:'zhkaiktime',
				title:'最近开卡日期',
				sumFileds:'e'
			}
		]
	}
	var key = $('#dataArea .dataSelect h3').attr('key');
	option.queryParams = {
			ywmanFlag:1,
			dataSourceKey:key
	}
	$('#mdDateGrid').mddatagrid(option);
}