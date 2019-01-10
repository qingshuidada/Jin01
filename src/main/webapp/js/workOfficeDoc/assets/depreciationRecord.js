$(function(){
	//折旧记录数据网格加载
	$('#depreciationRecorddg').datagrid({
		   url:'../../admin/selectDepreRcord.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#depreciationRecord .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"assetsName",title:"资产名称",resizable:true,fitColumns:true,align:"center",sortable:true,width:100},
		       {field:"deperTypeName",title:"折算类型",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"workCapacity",title:"工作量",resizable:true,fitColumns:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
		    	   if(row.workCapacity&&row.workGrossUnit){
		    		   return row.workCapacity + row.workGrossUnit;  
		    	   }else if(row.workGrossUnit){
		    		   return '0' + row.workGrossUnit; 
		    	   }else{
		    		   return '0';
		    	   }
		       }}, 
		       {field:"depreAmount",title:"折旧值",resizable:true,fitColumns:true,align:"center",sortable:true,width:60},
		       {field:"calTimeStr",title:"计算时间",width:100,resizable:true,align:"center",fitColumns:true,width:130,sortable:true,},
		  ]],
		  queryParam:{
			  
		  }
	});
	//条件查询
	$('#depreciationRecord .invitetop .query').click(function(){
		var assetsName = $('#depreciationRecord input[name=assetsName]').val();
		var beginTime = $('#depreciationRecord input[name=beginTime]').val();
		var endTime = $('#depreciationRecord input[name=endTime]').val();
		var dataInfo;
		dataInfo = {
			assetsName:assetsName,
			beginTime : beginTime,
			endTime : endTime,
		};
		$('#depreciationRecorddg').datagrid({
			url:'../../admin/selectDepreRcord.do?getMs='+getMS(),
			queryParams:dataInfo
		});
	});	
});
