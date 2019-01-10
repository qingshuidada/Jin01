$(function(){
	//查询
	$('#dataArea .datagrid .toolBar .query').click(function(){
		var ywman = $('#dataArea .datagrid .toolBar .ywman').val();
		//var kehu = $('#dataArea .datagrid .toolBar .kehu').val();
		var peiliao = $('#dataArea .datagrid .toolBar .peiliao').val();
		var startriqi = $('#dataArea .datagrid .toolBar .startriqi').val();
		var endriqi = $('#dataArea .datagrid .toolBar .endriqi').val();
		var dingzi = $('#dataArea .datagrid .toolBar .dingzi').val();
		var key = $('#dataArea .dataSelect h3').attr('key');
		alert(key)
		option.queryParams = {
				kehuFlag:1,
				dataSourceKey:key,
				ywman:ywman,
				//kehu:kehu,
				peiliao:peiliao,
				startriqi:startriqi,
				endriqi:endriqi,
				dingzi:dingzi,
		}
		$('#mdDateGrid').mddatagrid(option);
	});
});
//加载mdDateGrid
function loadMdDateGrid(){
	option = {
		url:'../../../erpSelect/queryVbprkmx.erp',//数据url
		//sumUrl:'assets/json/numberTotal.json',//合计数据
		fClumnWidth:35,//百分比，固定列
		sClumnWidth:65,//百分比,可移动列
		rowsLenght:20,//每页数量
		fClumn:[//固定列
		        {
					fileds:'ywman',
					title:'业务员',
					sumFileds:'a'
				},
				{
					fileds:'riqi',
					title:'入库日期',
					sumFileds:'b'
				}
			],	
		sClumn:[//可移动列
	        {
				fileds:'kehu',
				title:'客户',
				sumFileds:'c'
			},
			{
				fileds:'dingzi',
				title:'订字',
				sumFileds:'f'
			},
			{
				fileds:'peiliao',
				title:'品名规格',
				sumFileds:'c',
			},
			{
				fileds:'Pitem',
				title:'加工别',
				sumFileds:'c',
			},
			{
				fileds:'pishu',
				title:'匹数',
				sumFileds:'c',
			},
			{
				fileds:'mishu',
				title:'米数(m)',
				sumFileds:'c',
			},
			{
				fileds:'peizhong',
				title:'重量(kg)',
				sumFileds:'c',
			},
			{
				fileds:'mkzh',
				title:'克重量',
				sumFileds:'d'
			},
			{
				fileds:'cnote',
				title:'摘要',
				sumFileds:'e'
			}
		]
	}
	var key = $('#dataArea .dataSelect h3').attr('key');
	option.queryParams = {
			kehuFlag:1,
			dataSourceKey:key
	}
	$('#mdDateGrid').mddatagrid(option);
}