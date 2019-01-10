$(function(){
	//查询
	$('#dataArea .datagrid .toolBar .query').click(function(){
		var ywman = $('#dataArea .datagrid .toolBar .ywman').val();
		alert(ywman);
		//var kehu = $('#dataArea .datagrid .toolBar .kehu').val();
		var peiliao = $('#dataArea .datagrid .toolBar .peiliao').val();
		var sehao = $('#dataArea .datagrid .toolBar .sehao').val();
		var yanse = $('#dataArea .datagrid .toolBar .yanse').val();
		var startddriqi = $('#dataArea .datagrid .toolBar .startddriqi').val();
		var endddriqi = $('#dataArea .datagrid .toolBar .endddriqi').val();
		var dingzi = $('#dataArea .datagrid .toolBar .dingzi').val();
		var key = $('#dataArea .dataSelect h3').attr('key');
		option.queryParams = {
				kehuFlag:1,
				dataSourceKey:key,
				ywman:ywman,
				//kehu:kehu,
				peiliao:peiliao,
				sehao:sehao,
				yanse:yanse,
				startddriqi:startddriqi,
				endddriqi:endddriqi,
				dingzi:dingzi,
		}
		$('#mdDateGrid').mddatagrid(option);
	});
});
//加载mdDateGrid
function loadMdDateGrid(){
	option = {
		url:'../../../erpSelect/queryVsaleordermx.erp',//数据url
		//sumUrl:'assets/json/numberTotal.json',//合计数据
		fClumnWidth:20,//百分比，固定列
		sClumnWidth:80,//百分比,可移动列
		rowsLenght:20,//每页数量
		fClumn:[//固定列
			{
				fileds:'ywman',
				title:'业务员',
				sumFileds:'a'
			},
			{
				fileds:'ddriqi',
				title:'订单日期',
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
				fileds:'sehao',
				title:'色号',
				sumFileds:'c',
			},
			{
				fileds:'yanse',
				title:'颜色',
				sumFileds:'c',
			},
			{
				fileds:'gangshu',
				title:'缸数',
				sumFileds:'c',
			},
			{
				fileds:'mishu',
				title:'米数(m)/缸',
				sumFileds:'c',
			},
			{
				fileds:'peizhong',
				title:'重量(kg)/缸',
				sumFileds:'c',
			},
			{
				fileds:'mkzh',
				title:'克重量',
				sumFileds:'d'
			},
			{
				fileds:'kpishu',
				title:'开卡匹数',
				sumFileds:'c',
			},
			{
				fileds:'okpsw',
				title:'卡开',
				sumFileds:'e',
				formatter:function(value,row,index){
					var opera = '';
					value = $.trim(value);
					if(value == 'Y'){
						opera = '<input type="checkbox" checked/>';
						return opera;
					}else{
						opera = '<input type="checkbox"/>';
						return opera;
					}
					/*var opera = '';
					opera += '<span class="pointer" title="查看工序" onclick="lookProcedct(this)" style="color:blue">'+value+'</span>'
					return opera;*/
				}
			},
			{
				fileds:'cnote',
				title:'备注',
				sumFileds:'e'
			},
			{
				fileds:'danhao',
				title:'订单号',
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