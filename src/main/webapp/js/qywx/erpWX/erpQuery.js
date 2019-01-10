var account;
$(function(){
	
	$('html').css('font-size','80px');
	LineHeight($('h1'));
	//获取信息
	var url = window.location.href;
	url = decodeURI(decodeURI(url));
	var arr = url.split('&');
	account = arr[0].split('=')[1];
	var flag = arr[1].split('=')[1];
	var type = arr[2].split('=')[1];
	//加载车间(数据库名)
	$.ajax({
		url:'../../../authority/queryAuthorityByUser.erp',
		data:{userId:flag},
		success:function(data){
			data = $.parseJSON(data).rows;
			var str = '';
			for(var i=0;i<data.length;i++){
				str += '<option value="'+data[i].dataSourceKey+'">'+data[i].dataSourceName+'</option>';
			}
			$('.content .queryArea .workshopSelect').html(str);
		}
	})
	if(type == 'QueryClient'){
		$('.content .queryArea .kehuP').show();
		$('.content .queryArea .otherP').hide();
		$('h1').text('客户查询');
		QueryClient();
	}else if(type == 'tofoDateils'){
		$('h1').text('白坯入库明细');
		tofoDateils();
	}else if(type == 'tofoStock'){
		$('h1').text('白胚库存');
		tofoStock();
	}else if(type == 'orderQuery'){
		$('h1').text('订单查询');
		orderQuery();
	}else if(type == 'productionProgress'){
		$('h1').text('进度查询');
		productionProgress();
	}else if(type == 'productDateils'){
		$('h1').text('成品入库明细');
		productDateils();
	}else if(type == 'productStock'){
		$('h1').text('成品库存');
		productStock();
	}
	//返回
	$('.content .back').click(function(){
		window.location.href='index.html?user='+account+'&flag='+flag;
	});
	
	//查询
	$('.content .query').click(function(){
		var key = $('.content .queryArea .workshopSelect').val();
		var startriqi = $('.content .queryArea #startriqi').val();
		var endriqi = $('.content .queryArea #endriqi').val();
		var dingzi = $('.content .queryArea .dingzi').val();
		var peiliao = $('.content .queryArea .peiliao').val();
		var kehu = $('.content .queryArea .kehu').val();
		var queryParams = {
			dataSourceKey:key,
			startriqi:startriqi,
			endriqi:endriqi,
			dingzi:dingzi,
			peiliao:peiliao,
			customerName:kehu
		}
		loadMdDateGrid(queryParams);
	});
	//返回表单
	$('.content .backData').click(function(){
		$('.content .datails').hide();
		$('.content .dataArea').show();
	});
	//时间
	$('#startriqi').mobiscroll().date({
	       theme: 'mobiscroll',
	       lang: 'zh',
	       display: 'bottom',
	       dateFormat: 'yyyy-mm-dd',
	       select: 'multiple'
	});
	$('#endriqi').mobiscroll().date({
	       theme: 'mobiscroll',
	       lang: 'zh',
	       display: 'bottom',
	       dateFormat: 'yyyy-mm-dd',
	       select: 'multiple'
	});
	
});
//设置行高
function LineHeight(ele){
	var liH = ele.height();
	ele.css("line-height",liH+"px");
}
//查看流程
function lookProcedct(ele){
	var kahao = $(ele).text();
	var key = $('.content .queryArea .workshopSelect').val();
	var info = {
		kahao:kahao,
		dataSourceKey:key
	}
	$.ajax({
		url:'../../../erpSelect/queryVkashenggxOA.erp',
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
			$('.content .dataArea').hide();
			$('.content .datails').show();
		},
		error:function(err){
			
		}
	})
}
//各类datagrid加载
var option;
//加载orderQuery
function loadMdDateGrid(queryParams){
	option.queryParams= {};
	$.extend(option.queryParams,queryParams);
	//console.log(option.queryParams);
	$('#mdDateGrid').mddatagrid(option);
}
//修改option
//1.客户查询
function QueryClient(){
	option = {
		url:'../../../erpSelect/queryCustomerBySalesmanOA.erp',//数据url
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
}
//2.白坯入库
function tofoDateils(){
	option = {
			url:'../../../erpSelect/queryVbprkmxOA.erp',//数据url
			//sumUrl:'assets/json/numberTotal.json',//合计数据
			fClumnWidth:0,//百分比，固定列
			sClumnWidth:100,//百分比,可移动列
			rowsLenght:20,//每页数量
			sClumn:[//可移动列
		        {
					fileds:'ywman',
					title:'业务员',
					sumFileds:'a'
				},
				{
					fileds:'riqi',
					title:'入库日期',
					sumFileds:'b'
				},
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
}
//3.白胚库存
function tofoStock(){
	option = {
		url:'../../../erpSelect/queryVbpkcOA.erp',//数据url
		//sumUrl:'assets/json/numberTotal.json',//合计数据
		fClumnWidth:0,//百分比，固定列
		sClumnWidth:100,//百分比,可移动列
		rowsLenght:20,//每页数量
		sClumn:[//可移动列
	        {
				fileds:'ywman',
				title:'业务员',
				sumFileds:'a',
			},
	        {
				fileds:'kehu',
				title:'客户',
				sumFileds:'b'
			},
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
}
//4.订单查询
function orderQuery(){
	option = {
		url:'../../../erpSelect/queryVsaleordermxOA.erp',//数据url
		//sumUrl:'assets/json/numberTotal.json',//合计数据
		fClumnWidth:0,//百分比，固定列
		sClumnWidth:100,//百分比,可移动列
		rowsLenght:20,//每页数量
		sClumn:[//可移动列
	        {
				fileds:'ywman',
				title:'业务员',
				sumFileds:'a'
			},
			{
				fileds:'ddriqi',
				title:'订单日期',
				sumFileds:'b'
			},
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
				fileds:'kpishu',
				title:'开卡匹数',
				sumFileds:'c',
			},
			{
				fileds:'mkzh',
				title:'克重量',
				sumFileds:'d'
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
}
//5.进度查询
function productionProgress(){
	option = {
		url:'../../../erpSelect/queryVkashengOA.erp',//数据url
		//sumUrl:'assets/json/numberTotal.json',//合计数据
		fClumnWidth:0,//百分比，固定列
		sClumnWidth:100,//百分比,可移动列
		rowsLenght:20,//每页数量
	sClumn:[//可移动列
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
			fileds:'kkriqi',
			title:'开卡日期',
			sumFileds:'f'
		},
		{
			fileds:'kehu',
			title:'客户',
			sumFileds:'b'
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
}
//6.成品入库明细
function productDateils(){
	option = {
		url:'../../../erpSelect/queryVspinputOA.erp',//数据url
		//sumUrl:'assets/json/numberTotal.json',//合计数据
		fClumnWidth:0,//百分比，固定列
		sClumnWidth:100,//百分比,可移动列
		rowsLenght:20,//每页数量
		sClumn:[//可移动列
	        {
				fileds:'riqi',
				title:'入库日期',
				sumFileds:'b'
			},
		    {
				fileds:'kahao',
				title:'流程卡号',
				sumFileds:'a',
			},
	        {
				fileds:'dingzi',
				title:'订字',
				sumFileds:'d'
			},
			{
				fileds:'peiliao',
				title:'品名规格',
				sumFileds:'c',
			},
			{
				fileds:'Pitem',
				title:'加工类别',
				sumFileds:'f'
			},
			{
				fileds:'色号',
				title:'花色号',
				sumFileds:'c',
			},
			{
				fileds:'yanse',
				title:'颜色',
				sumFileds:'c',
			},
			{
				fileds:'pishu',
				title:'匹数',
				sumFileds:'e'
			},
			{
				fileds:'mishu',
				title:'米数',
				sumFileds:'e'
			},
			{
				fileds:'peizhong',
				title:'重量(kg)',
				sumFileds:'e'
			},
			{
				fileds:'cfukuan',
				title:'成品门幅',
				sumFileds:'e'
			},
			{
				fileds:'mkzh',
				title:'成品克重',
				sumFileds:'e'
			},
			{
				fileds:'cnote',
				title:'加工摘要',
				sumFileds:'f'
			},
			{
				fileds:'okpsw',
				title:'进出状态',
				sumFileds:'f'
			},
			{
				fileds:'ckplace',
				title:'仓位',
				sumFileds:'f'
			},
			{
				fileds:'yewuman',
				title:'业务员',
				sumFileds:'f'
			},
			{
				fileds:'kehu',
				title:'客户',
				sumFileds:'f'
			}
		]
	}
}
//7.成品库存
function productStock(){
	option = {
		url:'../../../erpSelect/queryVspkcOA.erp',//数据url
		//sumUrl:'assets/json/numberTotal.json',//合计数据
		fClumnWidth:0,//百分比，固定列
		sClumnWidth:100,//百分比,可移动列
		rowsLenght:20,//每页数量
		sClumn:[//可移动列
	        {
				fileds:'riqi',
				title:'进仓日期',
				sumFileds:'e'
			},
			{
				fileds:'kahao',
				title:'卡编号',
				sumFileds:'e'
			},
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
}
