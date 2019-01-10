$(function(){
	$('#erpPowerdg').datagrid({
		   url:'../../authority/queryAuthorityPerson.erp?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#erpPower>.invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"userName",title:"姓名",resizable:true,fitColumns:true,align:"center",sortable:true,width:100},
		       {field:"dataSourceName",title:"所属车间名",resizable:true,fitColumns:true,align:"center",sortable:true,width:100},
		       {field:"_op",title:"操作",resizable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
		    	   var opera = '';
		    	   var id = "'"+row.userId+"'";
	    		   opera += '<span class="small-button edit" title="修改" onclick=editErpPower('+id+')></span>';
	    		   opera += '<span class="small-button delete" title="删除" onclick="deleteErpPower('+id+')"></span>';
		    	   return opera;
		       }},
		    ]]
	});
	//添加按钮
	
	
	
	
	        
	$('#erpPower .addErpPower').click(function(){
		$('#erpPower .addErpPowerWind').show();
	});
	//选择人员
	$('#erpPower .addErpPowerWind .addUser').click(function(){
		chooseUser();
		$('#chooseUser .confirm').unbind();
	    $('#chooseUser .confirm').click(function(){
	    	selectUsers = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#chooseUser .confirm').unbind();
			$('#erpPower .addErpPowerWind .userName').attr('userId',selectUsers[0].userId)
			$('#erpPower .addErpPowerWind .userName').val(selectUsers[0].userName);
			$('#chooseUser').css('display','none');
	    });
	});
	//添加权限
	$('#erpPower .addErpPowerWind .confirm').click(function(){
		var userId = $('#erpPower .addErpPowerWind .userName').attr('userId');
		var userName = $('#erpPower .addErpPowerWind .userName').val();
		var shopArr = $('#erpPower .addErpPowerWind .addShopSpace input:checked');
		if(userName == ''|| userName == null){
			windowControl('请先选择人员');
			return false;
		}else if(shopArr.length <= 0){
			windowControl('请先选择车间');
			return false;
		}else{
			var dataSourceKey = ''
			var dataSourceName = ''
			for(var i=0;i<shopArr.length;i++){
				dataSourceKey += shopArr.eq(i).prop("class")+',';
				dataSourceName += shopArr.eq(i).next().text()+',';
			}
			dataSourceKey=dataSourceKey.substring(0,dataSourceKey.length-1);
			dataSourceName=dataSourceName.substring(0,dataSourceName.length-1);
			$.ajax({
				url:'../../authority/insertAuthority.erp?getMs='+getMS(),
				data:{
					userId:userId,
					userName:userName,
					dataSourceKeys:dataSourceKey,
					dataSourceNames:dataSourceName
				},
				success:function(data){
					if(data == 200){
						windowControl('添加权限成功');
						$('#erpPower .addErpPowerWind').hide();
						$('#erpPowerdg').datagrid('reload');
					}else{
						$('#erpPower .addErpPowerWind').hide();
						windowControl('添加权限失败');
					}
				}
			});
		}
	})
	//选择人员
	/*$('#erpPower .editErpPowerWind .addUser').click(function(){
		chooseUser();
		$('#chooseUser .confirm').unbind();
	    $('#chooseUser .confirm').click(function(){
	    	selectUsers = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#chooseUser .confirm').unbind();
			$('#erpPower .editErpPowerWind .userName').attr('userId',selectUsers[0].userId)
			$('#erpPower .editErpPowerWind .userName').val(selectUsers[0].userName);
			$('#chooseUser').css('display','none');
	    });
	});*/
	//修改
	$('#erpPower .editErpPowerWind .confirm').click(function(){
		var userId = $('#erpPower .editErpPowerWind .userName').attr('userId');
		var userName = $('#erpPower .editErpPowerWind .userName').val();
		var shopArr = $('#erpPower .editErpPowerWind .addShopSpace input:checked');
		console.log(shopArr);
		if(userName == ''|| userName == null){
			windowControl('请先选择人员');
			return false;
		}else if(shopArr.length <= 0){
			windowControl('请先选择车间');
			return false;
		}else{
			var dataSourceKey = ''
			var dataSourceName = ''
			console.log(shopArr);
			for(var i=0;i<shopArr.length;i++){
				dataSourceKey += shopArr.eq(i).prop("class")+',';
				dataSourceName += shopArr.eq(i).next().text()+',';
			}
			dataSourceKey=dataSourceKey.substring(0,dataSourceKey.length-1);
			dataSourceName=dataSourceName.substring(0,dataSourceName.length-1);
			$.ajax({
				url:'../../authority/insertAuthority.erp?getMs='+getMS(),
				data:{
					userId:userId,
					userName:userName,
					dataSourceKeys:dataSourceKey,
					dataSourceNames:dataSourceName
				},
				success:function(data){
					if(data == 200){
						windowControl('修改权限成功');
						$('#erpPower .editErpPowerWind').hide();
						$('#erpPowerdg').datagrid('reload');
					}else{
						$('#erpPower .editErpPowerWind').hide();
						windowControl('修改权限失败');
					}
				}
			});
		}
	})
	//查询
	/*$('#erpPower .query').click(function(){
		$('#erpPowerdg').datagrid({
			 queryParams:{
				 userName:$('#erpPower .invitetop .userName').val(),
				 dataSourceName:$('#erpPower .invitetop .dataSourceName').val()
			   }
		});
	});*/
});
//加载车间
$.ajax({
	url:'../../erpSelect/queryDataResourceName1.erp?getMs='+getMS(),
	success:function(data){
		data = $.parseJSON(data);
		var str = '';
		for(var i=0;i<data.length;i++){
			if(i%2==0&&i==0){
				str +='<p>';
			}else if(i%2==0&&i!=0){
				str +='</p><p>';
			}
			str += '<input type="checkbox" class="'+data[i].dataSourceKey+'" value="'+data[i].dataSourceKey+'" /><span>'+data[i].dataSourceName+'</span>';
//			str += '<option value="'+data[i].dataSourceKey+'">'+data[i].dataSourceName+'</option>';
		}
		str += '</p>';
		$('#erpPower .addErpPowerWind .addShopSpace').html(str);
		$('#erpPower .addErpPowerWind .addShopSpace p input:nth-child(2)').css('margin-left','40px');
		$('#erpPower .editErpPowerWind .addShopSpace').html(str);
		$('#erpPower .editErpPowerWind .addShopSpace p input:nth-child(2)').css('margin-left','40px');
	}
});
//删除
function deleteErpPower(id){
	ui.confirm('你确认要删除权限吗?',function(z){
		if(z){
			$.ajax({
				url:'../../authority/deleteAuthority.erp?getMs='+getMS(),
				data:{userId:id},
				success:function(data){
					if(data){
						windowControl('删除权限成功');
						$('#erpPowerdg').datagrid('reload');
					}else{
						windowControl('删除权限失败');
					}
				}
			})
		}
	},true);
}
//修改
function editErpPower(id){
	$.ajax({
		url:'../../authority/queryAuthorityByUser.erp?getMs='+getMS(),
		data:{userId:id},
		success:function(data){
			data = $.parseJSON(data).rows;
			var input = $('#erpPower .editErpPowerWind .addShopSpace p input');
			console.log(input);
			input.attr('checked',false);
			for(var i=0;i<data.length;i++){
				for(var j=0;j<input.length;j++){
					if(data[i].dataSourceKey == input.eq(j).prop("class")){
						input.eq(j).attr('checked','checked');
					}
				}
			}
			$('#erpPower .editErpPowerWind .userName').attr('userId',data[0].userId);
			$('#erpPower .editErpPowerWind .userName').val(data[0].userName);
			$('#erpPower .editErpPowerWind').show();
		}
	})
}