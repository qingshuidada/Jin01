$(function(){
	//查询
	$('#dataArea .datagrid .toolBar .query').click(function(){
		//var ywman = $('#dataArea .datagrid .toolBar .ywman').val();
		var kehu = $('#dataArea .datagrid .toolBar .kehu').val();
		var peiliao = $('#dataArea .datagrid .toolBar .peiliao').val();
		var sehao = $('#dataArea .datagrid .toolBar .sehao').val();
		var yanse = $('#dataArea .datagrid .toolBar .yanse').val();
		var startriqi = $('#dataArea .datagrid .toolBar .startriqi').val();
		var endriqi = $('#dataArea .datagrid .toolBar .endriqi').val();
		var dingzi = $('#dataArea .datagrid .toolBar .dingzi').val();
		var key = $('#dataArea .dataSelect h3').attr('key');
		option.queryParams = {
				ywmanFlag:1,
				dataSourceKey:key,
				//ywman:ywman,
				kehu:kehu,
				peiliao:peiliao,
				sehao:sehao,
				yanse:yanse,
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
		url:'../../../erpSelect/queryVspkc.erp',//数据url
		//sumUrl:'assets/json/numberTotal.json',//合计数据
		fClumnWidth:35,//百分比，固定列
		sClumnWidth:65,//百分比,可移动列
		rowsLenght:20,//每页数量
		fClumn:[//固定列
		        {
					fileds:'riqi',
					title:'进仓日期',
					sumFileds:'e'
				},
				{
					fileds:'kahao',
					title:'卡编号',
					sumFileds:'e'
				}
			],	
		sClumn:[//可移动列
	        {
				fileds:'dingzi',
				title:'订字',
				sumFileds:'d'
			},
			{
				fileds:'peiliao',
				title:'品名规格',
				sumFileds:'c'
			},
			{
				fileds:'sehao',
				title:'色号',
				sumFileds:'c'
			},
			{
				fileds:'yanse',
				title:'颜色',
				sumFileds:'c'
			},
			{
				fileds:'pishu',
				title:'匹数',
				sumFileds:'c'
			},
			{
				fileds:'mishu',
				title:'米数',
				sumFileds:'c'
			},
			{
				fileds:'peizhong',
				title:'重量',
				sumFileds:'c'
			},
			{
				fileds:'ckplace',
				title:'仓位',
				sumFileds:'c'
			},
			{
				fileds:'Pitem',
				title:'加工类别',
				sumFileds:'f'
			},
			{
				fileds:'cfukuan',
				title:'门幅',
				sumFileds:'c'
			},
			{
				fileds:'mkzh',
				title:'成品克重',
				sumFileds:'f'
			},
			{
				fileds:'cnote',
				title:'加工摘要',
				sumFileds:'f'
			},
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
		]
	}
	var key = $('#dataArea .dataSelect h3').attr('key');
	option.queryParams = {
			ywmanFlag:1,
			dataSourceKey:key
	}
	$('#mdDateGrid').mddatagrid(option);
}