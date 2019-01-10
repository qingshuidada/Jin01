$(function(){
	//网格加载
	$('#productionProgressdg').datagrid({
		   //url:'../../erpSelect/queryVkashengOA.erp?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#productionProgress .invitetop",
		   method:"post",
		   fit: true,
		   queryParams:{
			   dataSourceKey:$('#productionProgress .workshopSelect').val()
		   },
		   columns:[[
		       {field:'kahao',title:'卡编号',resizable:true,fitColumns:true,align:"center",width:100,formatter:function(value,row,index){
					var opera = '';
					opera += '<span class="pointer" title="查看工序" onclick="lookProcedct(this)" style="color:blue">'+value+'</span>'
					return opera;
				}},
		       {field:"ywman",title:'业务员',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"kehu",title:'客户',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'kkriqi',title:'开卡日期',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'dingzi',title:'订字',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"peiliao",title:'品名规格',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'Pitem',title:'加工别',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"sehao",title:'色号',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'yanse',title:'颜色',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"gangshu",title:'缸数',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'mishu',title:'米数(m)/缸',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"peizhong",title:'重量(kg)/缸',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'mkzh',title:'克重量',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"kpishu",title:'开卡匹数',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'okpsw',title:'卡开',resizable:true,fitColumns:true,align:"center",width:20,formatter:function(value,row,index){
					var opera = '';
					value = $.trim(value);
					if(value == 'Y'){
						opera = '<input type="checkbox" checked/>';
						return opera;
					}else{
						opera = '<input type="checkbox"/>';
						return opera;
					}
				}},
		       {field:"cnote",title:'备注',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'danhao',title:'订单号',resizable:true,fitColumns:true,align:"center",width:100},
		    ]]
	});
	//查询
	$('#productionProgress .query').click(function(){
		var dataSourceKey = $('#productionProgress .workshopSelect').val();
		var ywman = $('#productionProgress .ywman').val();
		var kehu = $('#productionProgress .kehu').val();
		var peiliao = $('#productionProgress .peiliao').val();
		var sehao = $('#productionProgress .sehao').val();
		var yanse = $('#productionProgress .yanse').val();
		var startriqi = $('#productionProgress .startriqi').val();
		var endriqi = $('#productionProgress .endriqi').val();
		var dingzi = $('#productionProgress .dingzi').val();
		$('#productionProgressdg').datagrid({
			url:'../../erpSelect/queryVkashengOA.erp?getMs='+getMS(),
			queryParams:{
				dataSourceKey:dataSourceKey,
				ywman:ywman,
				kehu:kehu,
				peiliao:peiliao,
				sehao:sehao,
				yanse:yanse,
				startriqi:startriqi,
				endriqi:endriqi,
				dingzi:dingzi
			}
		})
	});
	//设置datails 的高度
	$('#productionProgress .datails').css('height',$('#loadarea').height()-31+'px');
	//back
	$('#productionProgress .back').click(function(){
		$('#productionProgress .list').show();
		$('#productionProgress .datails').hide();
	});
});
$.ajax({
	url:'../../erpSelect/queryDataResourceName1.erp?getMs='+getMS(),
	success:function(data){
		data = $.parseJSON(data);
		var str = '';
		for(var i=0;i<data.length;i++){
			str += '<option value="'+data[i].dataSourceKey+'">'+data[i].dataSourceName+'</option>';
		}
		$('#productionProgress .workshopSelect').html(str);
	}
});
//查看进度
function lookProcedct(ele){
	var kahao = $(ele).text();
	var key = $('#productionProgress .workshopSelect').val();
	var info = {
		kahao:kahao,
		dataSourceKey:key,
		ywmanFlag:1,
	}
	$.ajax({
		url:'../../erpSelect/queryVkashenggxOA.erp',
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
			$('#productionProgress .list').hide();
			$('#productionProgress .datails').show();
		},
		error:function(err){
			
		}
	})
}