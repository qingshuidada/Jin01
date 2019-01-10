$(function(){
	//网格加载
	$('#productDateilsdg').datagrid({
		   //url:'../../erpSelect/queryVspinputOA.erp?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#productDateils .invitetop",
		   method:"post",
		   fit: true, 
		   queryParams:{
			   dataSourceKey:$('#productDateils .workshopSelect').val()
		   },
		   columns:[[
		       {field:'ywman',title:'业务员',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'kehu',title:'客户',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'riqi',title:'入库日期',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'kahao',title:'流程卡号',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'dingzi',title:'订字',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'peiliao',title:'品名规格',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'Pitem',title:'加工别',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"sehao",title:'色号',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'yanse',title:'颜色',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'pishu',title:'匹数',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"gangshu",title:'缸数',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'mishu',title:'米数(m)',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'cfukuan',title:'成品门幅',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"peizhong",title:'重量(kg)',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:'mkzh',title:'成品克重',resizable:true,fitColumns:true,align:"center",width:100},
		       {field:"cnote",title:'加工摘要',resizable:true,fitColumns:true,align:"center",width:100},
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
		       {field:"ckplace",title:'仓位',resizable:true,fitColumns:true,align:"center",width:100},
		       
		    ]]
	});
	//查询
	$('#productDateils .query').click(function(){
		var dataSourceKey = $('#productDateils .workshopSelect').val();
		var ywman = $('#productDateils .ywman').val();
		var kehu = $('#productDateils .kehu').val();
		var peiliao = $('#productDateils .peiliao').val();
		var sehao = $('#productDateils .sehao').val();
		var yanse = $('#productDateils .yanse').val();
		var startriqi = $('#productDateils .startriqi').val();
		var endriqi = $('#productDateils .endriqi').val();
		var dingzi = $('#productDateils .dingzi').val();
		$('#productDateilsdg').datagrid({
			url:'../../erpSelect/queryVspinputOA.erp?getMs='+getMS(),
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
		$('#productDateils .workshopSelect').html(str);
	}
});