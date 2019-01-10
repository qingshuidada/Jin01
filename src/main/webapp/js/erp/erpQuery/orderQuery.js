$(function(){
	//网格加载
	$('#orderQuerydg').datagrid({
		  // url:'../../erpSelect/queryVsaleordermxOA.erp?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#orderQuery .invitetop",
		   method:"post",
		   fit: true, 
		   queryParams:{
			   dataSourceKey:$('#orderQuery .workshopSelect').val()
		   },
		   columns:[[
		       {field:"ywman",title:'业务员',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'ddriqi',title:'订单日期',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"kehu",title:'客户',resizable:true,fitColumns:true,align:"center",width:100},
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
		       {field:'okpsw',title:'卡开',resizable:true,fitColumns:true,align:"center",width:30,formatter:function(value,row,index){
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
	$('#orderQuery .query').click(function(){
		var dataSourceKey = $('#orderQuery .workshopSelect').val();
		var ywman = $('#orderQuery .ywman').val();
		var kehu = $('#orderQuery .kehu').val();
		var peiliao = $('#orderQuery .peiliao').val();
		var sehao = $('#orderQuery .sehao').val();
		var yanse = $('#orderQuery .yanse').val();
		var startddriqi = $('#orderQuery .startddriqi').val();
		var endddriqi = $('#orderQuery .endddriqi').val();
		var dingzi = $('#orderQuery .dingzi').val();
		$('#orderQuerydg').datagrid({
			url:'../../erpSelect/queryVsaleordermxOA.erp?getMs='+getMS(),
			queryParams:{
				dataSourceKey:dataSourceKey,
				ywman:ywman,
				kehu:kehu,
				peiliao:peiliao,
				sehao:sehao,
				yanse:yanse,
				startddriqi:startddriqi,
				endddriqi:endddriqi,
				dingzi:dingzi
			}
		})
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
		$('#orderQuery .workshopSelect').html(str);
	}
});