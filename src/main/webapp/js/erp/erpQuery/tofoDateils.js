$(function(){
	//网格加载
	$('#tofoDateilsdg').datagrid({
		   //url:'../../erpSelect/queryVbprkmxOA.erp?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#tofoDateils .invitetop",
		   method:"post",
		   fit: true, 
		   queryParams:{
			   dataSourceKey:$('#tofoDateils .workshopSelect').val()
		   },
		   columns:[[
		       {field:"ywman",title:'业务员',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"kehu",title:'客户',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'riqi',title:'入库日期',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'dingzi',title:'订字',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"peiliao",title:'品名规格',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'Pitem',title:'加工别',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'pishu',title:'匹数',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'mishu',title:'米数(m)',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"peizhong",title:'重量(kg)',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'mkzh',title:'克重量',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"cnote",title:'摘要',resizable:true,fitColumns:true,align:"center",width:100},
		    ]]
	});
	//查询
	$('#tofoDateils .query').click(function(){
		var dataSourceKey = $('#tofoDateils .workshopSelect').val();
		var ywman = $('#tofoDateils .ywman').val();
		var kehu = $('#tofoDateils .kehu').val();
		var peiliao = $('#tofoDateils .peiliao').val();
		var startriqi = $('#tofoDateils .startriqi').val();
		var endriqi = $('#tofoDateils .endriqi').val();
		var dingzi = $('#tofoDateils .dingzi').val();
		$('#tofoDateilsdg').datagrid({
			url:'../../erpSelect/queryVbprkmxOA.erp?getMs='+getMS(),
			queryParams:{
				dataSourceKey:dataSourceKey,
				ywman:ywman,
				kehu:kehu,
				peiliao:peiliao,
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
		$('#tofoDateils .workshopSelect').html(str);
	}
});