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
	//返回
	$('#dataArea .datails .back').click(function(){
		$('#dataArea .datails').hide();
		$('#dataArea .data').show();
	});
})
//查看流程
function lookProcedct(ele){
	var kahao = $(ele).text();
	var key = $('#dataArea .dataSelect h3').attr('key');
	var info = {
		kahao:kahao,
		dataSourceKey:key,
		ywmanFlag:1,
	}
	$.ajax({
		url:'../../../erpSelect/queryVkashenggx.erp',
		data:info,
		success:function(data){
			data = $.parseJSON(data);
			$('.datails .dataBar .danhao').text(data[0].danhao);
			$('.datails .dataBar .ddriqi').text(data[0].ddriqi);
			$('.datails .dataBar .peiliao').text(data[0].peiliao);
			$('.datails .dataBar .kahao').text(data[0].kahao);
			$('.datails .dataBar .kkriqi').text(data[0].kkriqi);
			$('.datails .dataBar .Pitem').text(data[0].Pitem);
			$('.datails .dataBar .sehao').text(data[0].sehao);
			$('.datails .dataBar .yanse').text(data[0].yanse);
			var str = '<tr><th>序号</th>'
				+ '<th>工序名称</th>'
				+ '<th>加工时间</th>'
				+ '<th>布车号</th>'
				+ '<th>机台号</th></tr><tr>';
			for(var i = 0;i<data.length;i++){
				//cname = 工序名称
				str +='<td>'+data[i].idxid+'</td>';
				str += '<td>'+data[i].cname+'</td>';
				str +='<td>'+data[i].xjtime+'</td>';
				str += '<td>'+data[i].chehao+'</td>';
				str +='<td>'+data[i].jihao+'</td>';
				str += '</tr>';
			}
			$('.datails .dataTable table').html(str);
			$('#dataArea .data').hide();
			$('#dataArea .datails').show();
		},
		error:function(err){
			
		}
	})
}
//加载mdDateGrid
function loadMdDateGrid(){
	option = {
		url:'../../../erpSelect/queryVkasheng.erp',//数据url
		//sumUrl:'assets/json/numberTotal.json',//合计数据
		fClumnWidth:30,//百分比，固定列
		sClumnWidth:70,//百分比,可移动列
		rowsLenght:20,//每页数量
		fClumn:[//固定列
			{
				fileds:'kahao',
				title:'卡编号',
				sumFileds:'a',
				formatter:function(value,row,index){
					var opera = '';
					opera += '<span class="pointer" title="查看工序" onclick="lookProcedct(this)" style="color:blue">'+value+'</span>'
					return opera;
				}
			},
			{
				fileds:'kehu',
				title:'客户',
				sumFileds:'b'
			}
		],	
	sClumn:[//可移动列
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
			fileds:'sehao',
			title:'花色号',
			sumFileds:'d'
		},
		{
			fileds:'yanse',
			title:'颜色',
			sumFileds:'e'
		},
		{
			fileds:'cfukuan',
			title:'成品门幅',
			sumFileds:'f'
		},
		{
			fileds:'mkzh',
			title:'成品克重',
			sumFileds:'f'
		},
		{
			fileds:'status',
			title:'状态',
			sumFileds:'f'
		},
		{
			fileds:'dstime',
			title:'下道工序',
			sumFileds:'f'
		},
		{
			fileds:'Pitem',
			title:'加工别',
			sumFileds:'f'
		},
		{
			fileds:'quick',
			title:'加急',
			sumFileds:'f'
		},
		{
			fileds:'kpishu',
			title:'开卡匹数',
			sumFileds:'f'
		},
		{
			fileds:'pishu',
			title:'翻布匹数',
			sumFileds:'f'
		},
		{
			fileds:'mishu',
			title:'米数',
			sumFileds:'f'
		},
		{
			fileds:'peizhong',
			title:'重量(kg)',
			sumFileds:'f'
		},
		{
			fileds:'kkriqi',
			title:'开卡日期',
			sumFileds:'f'
		},
		{
			fileds:'pctime',
			title:'排产时间',
			sumFileds:'f'
		},
		{
			fileds:'fbtime',
			title:'翻布时间',
			sumFileds:'f'
		},
		{
			fileds:'oktime',
			title:'染色时间',
			sumFileds:'f'
		},
		{
			fileds:'dxtime',
			title:'登记时间',
			sumFileds:'f'
		},
		{
			fileds:'cpitime',
			title:'成品入库',
			sumFileds:'f'
		},
		{
			fileds:'cpotime',
			title:'成品出库',
			sumFileds:'f'
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