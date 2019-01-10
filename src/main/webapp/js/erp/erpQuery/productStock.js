$(function(){
	//网格加载
	$('#productStockdg').datagrid({
		   //url:'../../erpSelect/queryVspkcOA.erp?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#productStock .invitetop",
		   method:"post",
		   fit: true, 
		   queryParams:{
			   dataSourceKey:$('#productStock .workshopSelect').val()
		   },
		   columns:[[
		       {field:"ywman",title:'业务员',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'kehu',title:'客户',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'riqi',title:'进仓日期',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'kahao',title:'卡编号',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'dingzi',title:'订字',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"peiliao",title:'品名规格',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"sehao",title:'色号',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'yanse',title:'颜色',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"pishu",title:'匹数',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'mishu',title:'米数(m)',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"peizhong",title:'重量(kg)/缸',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'ckplace',title:'仓位',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'Pitem',title:'加工别',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'cfukuan',title:'门幅',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'mkzh',title:'克重量',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"cnote",title:'加工摘要',resizable:true,fitColumns:true,align:"center",width:100},
		    ]]

	});
	//查询
	$('#productStock .query').click(function(){
		var dataSourceKey = $('#productStock .workshopSelect').val();
		var ywman = $('#productStock .ywman').val();
		var kehu = $('#productStock .kehu').val();
		var peiliao = $('#productStock .peiliao').val();
		var sehao = $('#productStock .sehao').val();
		var yanse = $('#productStock .yanse').val();
		var startriqi = $('#productStock .startriqi').val();
		var endriqi = $('#productStock .endriqi').val();
		var dingzi = $('#productStock .dingzi').val();
		$('#productStockdg').datagrid({
			url:'../../erpSelect/queryVspkcOA.erp?getMs='+getMS(),
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
});
$.ajax({
	url:'../../erpSelect/queryDataResourceName1.erp?getMs='+getMS(),
	success:function(data){
		data = $.parseJSON(data);
		var str = '';
		for(var i=0;i<data.length;i++){
			str += '<option value="'+data[i].dataSourceKey+'">'+data[i].dataSourceName+'</option>';
		}
		$('#productStock .workshopSelect').html(str);
	}
});