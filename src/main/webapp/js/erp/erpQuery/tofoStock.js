$(function(){
	//网格加载
	$('#tofoStockdg').datagrid({
		   //url:'../../erpSelect/queryVbpkcOA.erp?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#tofoStock .invitetop",
		   method:"post",
		   fit: true, 
		   queryParams:{
			   dataSourceKey:$('#tofoStock .workshopSelect').val()
		   },
		   columns:[[
		       {field:"ywman",title:'业务员',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"kehu",title:'客户',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"peiliao",title:'品名规格',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'dingzi',title:'订字',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'Pitem',title:'加工别',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'pishu',title:'匹数',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'kashu',title:'可开卡数',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'mishu',title:'米数(m)',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"peizhong",title:'重量(kg)',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'zhrktime',title:'最近入库日期',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'zhkaiktime',title:'最近开卡日期',resizable:true,fitColumns:true,align:"center",width:100},
		    ]]
	});
	//查询
	$('#tofoStock .query').click(function(){
		var dataSourceKey = $('#tofoStock .workshopSelect').val();
		var ywman = $('#tofoStock .ywman').val();
		var kehu = $('#tofoStock .kehu').val();
		var peiliao = $('#tofoStock .peiliao').val();
		var dingzi = $('#tofoStock .dingzi').val();
		$('#tofoStockdg').datagrid({
			url:'../../erpSelect/queryVbpkcOA.erp?getMs='+getMS(),
			queryParams:{
				dataSourceKey:dataSourceKey,
				ywman:ywman,
				kehu:kehu,
				peiliao:peiliao,
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
		$('#tofoStock .workshopSelect').html(str);
	}
});