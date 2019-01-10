$(function(){
	if($('#welfare #gotowelfarepay').val() == ''||$('#welfare #gotowelfarepay').val() == null){
		welfareId = '';
	}else{
		welfareId = $('#welfare #gotowelfarepay').val();
		$('#welfarepaydg').datagrid({
			 url:'../../welfare/findRecordByCondition.do?getMs='+getMS(),
			 queryParams:{
			   welfareId:welfareId
			 },
		});
	}
	/*福利发放记录*/
	$('#welfarepaydg').datagrid({
		   //url:'../../welfare/findRecordByCondition.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#welfarepay .invitetop",
		   method:"post",
		   fit: true, 
		   /*queryParams:{
			   welfareId:welfareId
		   },*/
		   columns:[[
		        {field:"_op",title:"管理",width:100,resizable:true,width:100,align:"center",sortable:true,formatter:function(value,row,index){
		    	   var id = "'"+row.welfareRecordId+"'";
		    	   var name = "'"+row.getUserName+"'";
		    	   var opera = '';
		    	   if(row.getFlag == 0){
		    		   if(existPermission('admin:personnel:socialSecurity:welfareAdd:update')){
		    			   if($('#welfare #gotowelfarepay').attr('status') == '3' ||$('#welfare #gotowelfarepay').attr('status') == null){
		    				opera +='<span class="small-button edit" onclick="editwelfarepay('+id+')" title="领取"></span>';
		    			   }
		    		   }
		    		   /*if($('#welfare #gotowelfarepay').attr('status') == '0' ||$('#welfare #gotowelfarepay').attr('status') == null){
		    			   opera +='<span class="small-button delete" onclick="deletewelfarepay('+id+')" title="删除"></span>';
		    		   }*/
		    	   }else if(row.getFlag == 1){
		    		   if(existPermission('admin:personnel:socialSecurity:welfareAdd:select'))
			    			  opera +='<span class="small-button look" onclick="lookwelfarepay('+id+','+name+')" title="查看"></span>';
		    	   }
		    	   return opera;
		       }},
		       {field:"welfareName",title:"福利名称",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"welfareCode",title:"福利编码",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"text",title:"描述",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"reason",title:"原因",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"getUserName",title:"姓名",fitColumns:true,resizable:true,align:"center",sortable:true,width:75},
		       {field:"departmentName",title:"所属部门",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"postName",title:"所属岗位",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"getUserIdCard",title:"身份证",fitColumns:true,resizable:true,align:"center",sortable:true,width:140},
		       {field:"giveTimeStr",title:"发放时间",fitColumns:true,sortable:true,align:"center",sortable:true,width:130},
		       {field:"getTimeStr",title:"领取时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		       {field:"getFlag",title:"是否领取",fitColumns:true,resizable:true,align:"center",width:60,sortable:true,formatter:function(value,row,index){
		    	   if(value ==0){
		     		   return "未领取";
		     	   }else if(value ==1){
		     		  return "已领取";
		     	   }
		       }},
		    ]]
	}); 
/*-------------------------------选择后的内容-----------------------------------------*/	
	//查询
	$('#welfarepay a[name=queryWelfare]').click(function(){
		var welfareName = $('#welfarepay .invitetop input[name=welfareName]').val();
		var getUserName = $('#welfarepay .invitetop input[name=getUserName]').val();
		var welfareCode = $('#welfarepay .invitetop input[name=welfareCode]').val();
		var getFlag = $('#welfarepay .invitetop select[name=getFlag] option:selected').val();
		//var objFlag = $('#welfarepay .invitetop select[name=objFlag] option:selected').val();
		$('#welfarepaydg').datagrid({
			url:'../../welfare/findRecordByCondition.do?getMs='+getMS(),
			queryParams:{
				getUserName:getUserName,
				getFlag:getFlag,
				welfareName:welfareName,
				welfareCode:welfareCode,
				finishFlag:'1'
				/*objFlag:objFlag*/
			}
		});
	});
	/*****************导出到Excel点击弹窗******************/
	$("#welfarepay .write").click(function(){
		$('#welfarepay .popups .writetoexcel').css('display','block');
		excelplugin.excel({
			dom:$('#welfarepay .popups .writetoexcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'welfareName',tableHeader:'福利名称',date:false},
			         {propertyName:'welfareCode',tableHeader:'福利编号',date:false},
			         {propertyName:'text',tableHeader:'描述',date:false},
			         {propertyName:'reason',tableHeader:'原因',date:false},
			         {propertyName:'getUserName',tableHeader:'姓名',date:false},
			         {propertyName:'departmentName',tableHeader:'所属部门',date:false},
			         {propertyName:'postName',tableHeader:'所属岗位',date:false},
			         {propertyName:'getUserIdCard',tableHeader:'身份证',date:false},
			         {propertyName:'giveTimeStr',tableHeader:'发放时间',date:true},
			         {propertyName:'getTimeStr',tableHeader:'领取时间',date:true},
			         {propertyName:'getFlag',tableHeader:'是否领取',date:false}
				 ]
		})
	})
	
	/*******************重置按钮点击事件***********************/
	$("#welfarepay .popups .writetoexcel .btnarea input[name=reset]").click(function(){
		$("#welfarepay .write").click();
	})
	
	/*******************取消按钮点击事件***********************/
	$("#welfarepay .popups .writetoexcel .btnarea input[name=cancel]").click(function(){
		$("#welfarepay .popups .writetoexcel").css("display","none");
	})
	
	/*******************导出按钮点击事件***********************/
	$("#welfarepay .popups .writetoexcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#welfarepay .popups .writetoexcel"));
		//提交导出excel所需要的参数
		//alert($('#welfarepay .invitetop select[name=getFlag] option:selected').val());
		excelplugin.submit({
			type:'post',
			array:[
		       {name:'getUserName', value:$('#welfarepay .invitetop input[name=getUserName]').val()},
		       {name:'welfareName', value:$('#welfarepay .invitetop input[name=welfareName]').val()},
		       {name:'welfareCode',value:$('#welfarepay .invitetop input[name=welfareCode]').val()},
		       {name:'getFlag', value:$('#welfarepay .invitetop select[name=getFlag]').val()},
		       {name:'jsonString', value:jsonString}
		    ],
			action:'../../welfare/writeToExcel.do?'
		})
	});
	//
	$('#pSelect').change(function(){
		var box=$('#pSelect option:selected').val();
		var dom = '<span class="close">'+box+'</span>';
		$('.choose').append(dom);
		$('.close').css({"padding":"5px 10px","display":"inline-block","background":"url(../../img/personnel/socialSecurity/remove_03.png)no-repeat","background-size":"10px","background-position":"47px 5px"});
		flag=true;
		$('.close').click(function(){
			$(this).remove();
		})
	})
	/*-----------------------------------发放------------------------------------------*/
	$('#welfarepay .look .confirm').click(function(){
		var flag = $('#welfarepay .look .get').find("option:selected").text();
		if(flag == '领取'){
			var welfareId = $('#welfarepay .look .getUseName').attr('welfareId');
			var getUserId = $('#welfarepay .look .getUseName').attr('getUserId');
			$.ajax({
				data:{welfareId:welfareId,getUserId:getUserId,getFlag:flag},
				url:'../../welfare/updateRecordForGet.do?getMs='+getMS(),
				type:'post',
				success:function(data){
					if(data == 200){
						windowControl('领取成功');
						$('#welfarepay .popups .look').css('display','none');
						$('#welfarepay .look .popuparea input').val('');
						$('#welfarepay .look .popuparea textarea').val('');
						$('#welfarepay .look .popuparea select').html('');
						$('#welfarepaydg').datagrid('reload');
					}else {
						windowControl('领取失败');
					}
				},
				error:function(err){
					windowControl('服务器异常');
				}
			});
		}else if(flag == '还未领取'){
			$('#welfarepay .popups .look').css('display','none');
			$('#welfarepay .look .popuparea input').val('');
			$('#welfarepay .look .popuparea textarea').val('');
			$('#welfarepay .look .popuparea select').html('');
		}
	});
	//清除
	$('#welfarepay .popups .look .cannel').click(function(){
		$('#welfarepay .popups .look').css('display','none');
		$('#welfarepay .look .popuparea input').val('');
		$('#welfarepay .look .popuparea textarea').val('');
		$('#welfarepay .look .popuparea select').html('');
	});
	$('#welfarepay .popups .look .turnoff').click(function(){
		$('#welfarepay .popups .look').css('display','none');
		$('#welfarepay .look .popuparea input').val('');
		$('#welfarepay .look .popuparea textarea').val('');
		$('#welfarepay .look .popuparea select').html('');
	});
	/**************objFlag****************/
	//$('#welfarepay .invitetop select[name=objFlag]').html(getDataBySelectKeyNo("provide_obj_flag"));
})
/*---------------------------------------------查看福利领取----------------------------------------*/
function lookwelfarepay(id,name){               
	$.ajax({
		data:{welfareRecordId:id},
		type:"post",
		url:'../../welfare/findWelfareByCondition.do?getMs='+getMS(),
		success:function(data){
			var content = $.parseJSON(data);
			$('#welfarepay .look h3').text('领取福利详情');
			$('#welfarepay .look .popuparea input').attr('readonly','true');
			$('#welfarepay .look .popuparea textarea').attr('readonly','true');
			$('#welfarepay .look .popuparea input').css('border','none');
			$('#welfarepay .look .popuparea textarea').attr('border','none');
			$('#welfarepay .look .getUseName').val(name);
			$('#welfarepay .look .givetime').val(content.rows[0].giveTimeStr);
			$('#welfarepay .look .flag').show();
			$('#welfarepay .look .flag input').val('已领取');
			$('#welfarepay .look .huoqu').css('display','none');
			$('#welfarepay .look .text').val(content.rows[0].text);
			$('#welfarepay .look .reason').val(content.rows[0].reason);
			$('#welfarepay .look .confirm').css('display','none');
			$('#welfarepay .popups .look').css('display','block');
		},
		error:function(err){
			windowControl('服务器异常');
		}
	});
}
function deletewelfarepay(id){//删除福利发放对象
	ui.confirm('确认删除福利发放对象',function(z){
		if(z){
			$.ajax({
				data:{welfareRecordId:id},
				url:'../../welfare/deleteRecordForGet.do?getMs='+getMS(),
				success:function(data){
					if(data == 200){
						windowControl("删除成功");
						$('#welfarepaydg').datagrid('reload');
					}else if(data == 400){
						windowControl("数据异常");
					}else{
						windowControl("服务器异常");
					}
				}
			});
		}
	},false);
}
function editwelfarepay(id){     //修改福利领取
	$.ajax({
		data:{welfareRecordId:id},
		type:"post",
		url:'../../welfare/findRecordByCondition.do?getMs='+getMS(),
		success:function(data){
			var content = $.parseJSON(data);
			$('#welfarepay .look h3').text('领取福利');
			$('#welfarepay .look .popuparea input').attr('readonly','true');
			$('#welfarepay .look .popuparea textarea').attr('readonly','true');
			$('#welfarepay .look .popuparea input').css('border','none');
			$('#welfarepay .look .popuparea textarea').attr('border','none');
			$('#welfarepay .look .welfareName').val(content.rows[0].welfareName);
			$('#welfarepay .look .getUseName').val(content.rows[0].getUserName);
			$('#welfarepay .look .getUseName').attr('welfareId',content.rows[0].welfareId);
			$('#welfarepay .look .getUseName').attr('getUserId',content.rows[0].getUserId);
			$('#welfarepay .look .givetime').val(content.rows[0].giveTimeStr);
			$('#welfarepay .look .flag').css('display','none');
			$('#welfarepay .look .huoqu').show();
			var str = '<option>还未领取</option><option>领取</option>';
			$('#welfarepay .look .get').append(str);
			$('#welfarepay .look .text').val(content.rows[0].text);
			$('#welfarepay .look .reason').val(content.rows[0].reason);
			$('#welfarepay .look .confirm').css('display','inline');
			$('#welfarepay .popups .look').css('display','block');
		},
		error:function(err){
			windowControl('服务器异常');
		}
	});
}