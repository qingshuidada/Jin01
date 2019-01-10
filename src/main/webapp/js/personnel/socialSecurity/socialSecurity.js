var socialExcel = [];
$(function(){
//	<span class="maintopicon mainicon2"></span><span>定义社保类型</span> exporttoExcel
	if(existPermission('admin:personnel:socialSecurity:socialSecurity:add'))
		$('#socialSecurity .maintop').append(
			'<div><span class="maintopicon mainicon2"></span><span class="add">添加社保</span></div>'
		   +'<div><span class="maintopicon mainicon2"></span><span class="batchAdd">批量添加社保</span></div>'
		   +'<div><span class="maintopicon mainicon2"></span><span class="batchupdate">批量修改社保</span></div>'
		   +'<div><span class="maintopicon mainicon2"></span><span class="exportExcel">导出查询结果到Excel</span></div>'
		   +'<div class="defined"></div>');
	//存储社保类型信息的数组
	var insTypes = [];
	var socialIdList = "";
	refreshType();
	//选择部门
	$('#socialSecurity .invitetop .departmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#socialSecurity .invitetop input[name=departmentName]').val(chooseDept.text);
		     $('#socialSecurity .invitetop input[name=departmentUrl]').val(chooseDept.id);
		     $('#chooseDept .confirm').unbind();
		})
	})
	//弹框的选择部门
	$('#socialSecurity #batchAddUserInfo .departmentChooseObj').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#socialSecurity #batchAddUserInfo input[name=departmentName]').val(chooseDept.text);
		     $('#socialSecurity #batchAddUserInfo input[name=departmentUrl]').val(chooseDept.id);
		     $('#chooseDept .confirm').unbind();
		})
	})
	//批量添加社保
	//添加社保信息 点击事件
	$('#socialSecurity .maintop .batchAdd').click(function(){
		batchAddUserInfo();
		$('#socialSecurity #batchAddUserInfo .confirm').unbind('click');
		$('#socialSecurity #batchAddUserInfo .confirm').click(function(){
			var selectUser = addUserInfo.rows;
			var superType = $('#socialSecurity #batchAddUserInfo select[name=superType] option:selected').val();
			if(selectUser == null){
				windowControl('员工不能为空');
				return;
			}else if(superType == null || superType == ""){
				windowControl('社保类型不能为空');
				return;
			}else{
				var submitOBJ = {
						superType:superType,
						list:selectUser
				};
				$.ajax({
					url:'../../insurance/batchAddUserInfo.do?getMs='+getMS(),
				    dataType:'json',
				    data:{json:JSON.stringify(submitOBJ)},
				    async:true,
				    type:'POST',
				    success:function(data){
				        //请求成功时处理
				    	if(data == 500){
				    		windowControl('服务器异常！');
				    	}else if(data == 400){
				    		windowControl('数据异常！');
				    	}else{
				    		$('#socialSecurity #batchAddUserInfo').css('display','none');
				    		$('#socialSecurity #batchAddUserInfo select').val('');
				    		windowControl('批量添加社保成功！');	
				    		$('#socialSecuritydg').datagrid('reload');
				    		addUserInfo = {'total':100,'rows':[]};
				    	}
				    },
				    error:function(){
				        //请求出错处理
				    }
				});
			}
		});
	});
	/*****************设置上下移span的title****************/
	$("#socialSecurity .popups .exporttoExcel .upset").attr("title","上移");
	$("#socialSecurity .popups .exporttoExcel .downset").attr("title","下移");
	//导出Excel
	$('#socialSecurity .maintop .exportExcel').click(function(){
		$('#socialSecurity .popups .exporttoExcel').css('display','block');
		excelplugin.excel({
			dom:$('#socialSecurity .popups .exporttoExcel .popuparea'),
			width:'372px',
			columns:[
			         {propertyName:'userName',tableHeader:'姓名',date:false},
			         {propertyName:'departmentName',tableHeader:'部门',date:false},
			         {propertyName:'idCard',tableHeader:'身份证号',date:false},
			         {propertyName:'insuranceSuperType',tableHeader:'社保类型',date:false},
			         {propertyName:'createTimeStr',tableHeader:'创建时间',date:true}
				 ]
		})
	});
	/*******************重置按钮点击事件***********************/
	$("#socialSecurity .popups .exporttoExcel .btnarea input[name=reset]").click(function(){
		$("#socialSecurity .maintop .exportExcel").click();
	});
	
	/*******************取消按钮点击事件***********************/
	$("#socialSecurity .popups .exporttoExcel .btnarea input[name=cancel]").click(function(){
		$("#socialSecurity .popups .exporttoExcel").css("display","none");
	});
	/*******************导出按钮点击事件***********************/
	$("#socialSecurity .popups .exporttoExcel .btnarea input[name=ensure]").click(function(){
		//获取json
		var jsonString = excelplugin.getJson($("#socialSecurity .popups .exporttoExcel"));
		var socialExcel2 = [];
		for(var i = 0 ; i < socialExcel.length ; i++){
			socialExcel2.push(socialExcel[i]);
		}
		socialExcel2.push({
			name:'jsonString',value:jsonString
		})
		//提交导出excel所需要的参数
		excelplugin.submit({
			type:'post',
			array:socialExcel2,
			action:'../../insurance/exporttoExcel.do?'
		})
	});
	//批量修改社保
	$('#socialSecurity .maintop .batchupdate').click(function(){
		var selRow = $('#socialSecuritydg').datagrid('getSelections');
		if(selRow.length==0){
			windowControl('请选择要修改的员工信息！');	
		}else{
			$('#socialSecurity .popups .batchEditsocialsecurity').css('display','block');
			for (i = 0;i<selRow.length;i++){
				if(socialIdList == ""){
					socialIdList = selRow[i].insuranceId ;
				}else{
					socialIdList = selRow[i].insuranceId +"," + socialIdList;
				}
			}
		}
	});
	//批量修改的确定事件
	$('#socialSecurity .popups .batchEditsocialsecurity .confirm').click(function(){
		var superType = $('#socialSecurity .popups .batchEditsocialsecurity select[name=superType]').val();
		if(superType == null){
			windowControl('社保类型不能为空');
		}else{
			var submitOBJ = {
					superType:superType,
					socialIdList:socialIdList
			}
			$.ajax({
				url:'../../insurance/batchUpdateUserInfo.do?getMs='+getMS(),
			    dataType:'json',
			    data:{json:JSON.stringify(submitOBJ)},
			    async:true,
			    type:'POST',
			    success:function(data){
			        //请求成功时处理
			    	if(data == 500){
			    		windowControl('服务器异常！');
			    	}else if(data == 400){
			    		windowControl('数据异常！');
			    	}else{
			    		windowControl('批量修改社保成功！');	
			    		$('#socialSecurity .popups .batchEditsocialsecurity').css('display','none');
			    		$('#socialSecuritydg').datagrid('reload');
			    		socialIdList = "";
			    	}
			    },
			    error:function(){
			        //请求出错处理
			    }
			});
			
		}
	});
	$("#socialSecurity a[name=search]").click(function(){
		var superType = $("#socialSecurity .invitetop select[name=superType] option:selected").val();
		var insuranceTypeId = $("#socialSecurity .invitetop select[name=typeName] option:selected").val();
		var userName = $("#socialSecurity .invitetop input[name=peopleName]").val();
		var idCard = $("#socialSecurity .invitetop input[name=idCard]").val();
		var departmentName = $('#socialSecurity .invitetop input[name=departmentName]').val();
		$('#socialSecuritydg').datagrid({
			url:'../../insurance/findInsuranceByCondition.do?getMs='+getMS(),
			queryParams:{
				insuranceSuperType:superType,
				//insuranceTypeId:insuranceTypeId,
				userName:userName,
				idCard:idCard,
				departmentName:departmentName
			}
		})
	})
	
	//搜索条件superType下拉框的onchange事件
	$('#socialSecurity .invitetop select[name=superType]').change(function(){
		var superType = $(this).find("option:selected").val();
		if(superType == '' || superType == null){
			$('#socialSecurity .invitetop select[name=typeName]').html("<option value=''></option>");
			return false;
		}else{
			var str = '';
			for(var i = 0;i<insTypes.length;i++){
				var insType = insTypes[i];
				if(insType.superType == superType){
					str += '<option value="'+insType.insuranceTypeId+'">'+insType.typeName+'</option>'
				}else continue;
			}
			$('#socialSecurity .invitetop select[name=typeName]').html("<option value=''></option>");
			$('#socialSecurity .invitetop select[name=typeName]').append(str);
		}
	})
	
	$('#socialSecuritydg').datagrid({
		   url:'../../insurance/findInsuranceByCondition.do?getMs='+getMS(),
		   rownumbers:"true",
		   pagination:true,
		   toolbar:"#toolbar",
		   method:"post",
		   toolbar:"#socialSecurity .invitetop",
		   fit: true, 
		   columns:[[
		        {field:"ck",checkbox:true },
		     	{field:"_op",title:"管理",width:100,resizable:true,width:100,align:"center",sortable:true,formatter:function(value,row,index){
		    	   var id = "'"+row.insuranceId+"'";
		    	   var userName = "'"+row.userName+"'";
		    	   var opera = '';
		    	   opera +='<span class="small-button delete" onclick="deleteInsurance('+id+')" title="删除"></span>';
		    	   opera +='<span class="small-button edit" onclick="editInsurance('+id+','+userName+')" title="修改"></span>';
		    	   return opera;
		       }},
		       {field:"userName",title:"所属员工姓名",fitColumns:true,resizable:true,align:"center",sortable:true,width:90},
		       {field:"departmentName",title:"部门",fitColumns:true,resizable:true,align:"center",sortable:true,width:90},
		       {field:"idCard",title:"身份证号",fitColumns:true,sortable:true,align:"center",sortable:true,width:140},
		       {field:"insuranceSuperType",title:"社保大类型",fitColumns:true,sortable:true,align:"center",sortable:true,width:100,formatter:function(value,row,index){
		    	   return getValueFromKey('super_type',value);
		       }},
		       {field:"createTimeStr",title:"创建时间",fitColumns:true,resizable:true,align:"center",sortable:true,width:130},
		    ]]
	}); 
	
	$('#socialSecurity .defined').click(function(){
		$('#socialSecurity .defineissue').css('display','block');
	});
	
	$('#socialSecurity .inviteissue .socChoose textarea').css({
		'width':'100%',
		'height':'100%',
	});
	
	//添加社保信息 点击事件
	$('#socialSecurity .maintop .add').click(function(){
		$('#socialSecurity .popups .savesocialsecurity').css('display','block');
	});
	
	//添加社保信息 选择人员点击事件
	$('#socialSecurity .savesocialsecurity .chooseUser').click(function(){
		chooseUser();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#socialSecurity .savesocialsecurity input[name=peopleName]').val(selectUser[0].userName);
	    	$('#socialSecurity .savesocialsecurity input[name=userId]').val(selectUser[0].userId);
	    })
	})
	
	//superType下拉框的onchange事件
//	$('#socialSecurity .savesocialsecurity select[name=superType]').change(function(){
//		var superType = $(this).find("option:selected").val();
//		if(superType == '' || superType == null){
//			$('#socialSecurity .savesocialsecurity select[name=typeName]').html("<option value=''></option>");
//			return false;
//		}else{
//			var str = '';
//			for(var i = 0;i<insTypes.length;i++){
//				var insType = insTypes[i];
//				if(insType.superType == superType){
//					str += '<option value="'+insType.insuranceTypeId+'">'+insType.typeName+'</option>'
//				}else continue;
//			}
//			console.log("insType.typeName="+insType.typeName);
//			$('#socialSecurity .savesocialsecurity select[name=typeName]').html("<option value=''></option>");
//			$('#socialSecurity .savesocialsecurity select[name=typeName]').append(str);
//			$('#socialSecurity .savesocialsecurity textarea[name=typeText]').val(null);
//		}
//	})
	
	//typeName下拉框的onchange事件
	$('#socialSecurity .savesocialsecurity select[name=typeName]').change(function(){
		var typeId = $(this).find("option:selected").val();
		var text;
		if(typeId == '' || typeId == null){
			$('#socialSecurity .savesocialsecurity textarea[name=typeText]').val("");
			return false;
		}else{
			for(var i = 0;i<insTypes.length;i++){
				if(insTypes[i].insuranceTypeId == typeId){
					text = insTypes[i].text;
				}else continue;
			}
			$('#socialSecurity .savesocialsecurity textarea[name=typeText]').val(text);
		}
	})
	
	//添加社保信息 弹窗 确定点击事件
	$('#socialSecurity .savesocialsecurity .confirm').click(function(){
		var userId = $.trim($('#socialSecurity .savesocialsecurity input[name=userId]').val());
		var userName = $.trim($('#socialSecurity .savesocialsecurity input[name=peopleName]').val());
		var superType = $('#socialSecurity .savesocialsecurity select[name=superType]').find("option:selected").val();
//		var typeId = $.trim($('#socialSecurity .savesocialsecurity select[name=typeName]').find("option:selected").val());
//		var typeName = $.trim($('#socialSecurity .savesocialsecurity select[name=typeName]').find("option:selected").text());
		if(userName == '' || userName == null|| userId == '' || userId == null){
			windowControl('员工信息有误');
		}else{
			$.ajax({
				data:{
					userId:userId,
					insuranceSuperType:superType
//					insuranceTypeName:typeName,
//					insuranceTypeId:typeId,
				},
				url : '../../insurance/insertInsurance.do?getMs='+getMS(),
				type : 'post',
				success : function(data){
					if(data == '200'){
						windowControl('为员工添加社保成功');
						$('#socialSecurity .popup').css('display','none');
						$('#socialSecurity .popup input').not('.button').val(null);
						$('#socialSecurity .popup textarea').val(null);
						$('#socialSecurity .popup select').children('option:first-child').attr('selected',true);
						$('#socialSecuritydg').datagrid('reload')
					}else windowControl("为该员工添加社保失败，请检查是否已存在社保");
				},
				error : function(err) {
					windowControl(err.status);
				}
			});
		}
	});
	
	//设置数据网格窗体的大小
	$('#socialSecuritydg').parent().css('height',$('#loadarea').height()-62);
	
	//定义社保类型 点击事件
	$('#socialSecurity .maintop .defined').click(function(){
		$('.popups .definedsocialsecurity').css('display','block');
	});
	//定义社保类型弹窗 确定按钮点击事件
	$('#socialSecurity .popups .definedsocialsecurity .confirm').click(function(){
		var typeName = $.trim($('#socialSecurity .definedsocialsecurity input[name=typeName]').val());
		var socialS = $.trim($('#socialSecurity .definedsocialsecurity select').find('option:selected').val());
		var socialDis = $.trim($('#socialSecurity textarea[name=socialDis]').val());
		if(typeName == "" || typeName == null){
			windowControl('社保类型名字不能为空');
		}else if(socialDis == "" && socialDis == null){
			windowControl('描述不能为空');
		}else{
			if(socialS == '养老保险'){
				socialS = '01';
			}else if(socialS == '医疗保险'){
				socialS = '02';
			}else if(socialS == '失业保险'){
				socialS = '03';
			}else if(socialS == '工伤保险'){
				socialS = '04';
			}else if(socialS == '生育保险'){
				socialS = '05';
			}else if(socialS == '住房公积金'){
				socialS = '06';
			}
			$.ajax({
				data:{
					typeName:typeName,
					superType:socialS,
					text:socialDis,
				},
				url : '../../insurance/insertInsuranceType.do?getMs='+getMS(),
				type : 'post',
				success : function(data){
					windowControl('保存成功');
					refreshType();
					$('#socialSecurity .popup').css('display','none');
					$('#socialSecurity .popup input').not(".button").val(null);
					$('#socialSecurity .popup textarea').val(null);
					$('#socialSecurity .popup select').children('option:first-child').attr('selected',true);
				},
				error : function(err) {
					windowControl(err.status);
				}
			});
		}
	});
	/*刷新社保类型*/
	function refreshType(){
		$.ajax({
			url:"../../insurance/findTypeByCondition.do?getMs="+getMS(),
			type:"post",
			success:function(data){
				insTypes = [];
				var content = $.parseJSON(data);
				for(var i=0;i<content.rows.length;i++){
					insTypes.push(content.rows[i]);
				}
			}
		})
	}
	
	/**************superType****************/
	$('#socialSecurity .invitetop select[name=superType]').html(getDataBySelectKeyNo("super_type"));
	/**************superType****************/
	$('#socialSecurity .popups .savesocialsecurity select[name=superType]').html(getDataBySelectKeyNo("super_type"));
	/**************superType****************/
	$('#socialSecurity .popups .definedsocialsecurity select[name=superType]').html(getDataBySelectKey("super_type"));
	
	$('#socialSecurity .popups .editsocialsecurity select[name=superType]').html(getDataBySelectKey("super_type"));
	
	$('#socialSecurity .popups .batchEditsocialsecurity select[name=superType]').html(getDataBySelectKey("super_type"));
	
	$('#socialSecurity .popups #batchAddUserInfo select[name=superType]').html(getDataBySelectKey("super_type"));
	//弹窗点击查询事件
	$('#socialSecurity .query').click(function(){
		var userName = $.trim($('#socialSecurity #batchAddUserInfo input[name=userName]').val());
		var departmentName = $.trim($('#socialSecurity #batchAddUserInfo input[name=departmentName]').val());
		var idCard = $.trim($('#socialSecurity #batchAddUserInfo input[name=idCard]').val());
		var dataInfo = {
			userName:userName,
			departmentName:departmentName,
			idCard:idCard
		};
		$('#socialSecurity #findUserInfodg').datagrid({
			url:"../../insurance/findAMRRUserInfo.do?getMs="+getMS(),
			queryParams:dataInfo
		});
	});
	
	//修改社保的确定事件
	$('#socialSecurity .popups .editsocialsecurity .confirm').click(function(){
		var insuranceId = $('#socialSecurity .popups .editsocialsecurity input[name=insuranceId]').val();
		var insuranceSuperType = $('#socialSecurity .popups .editsocialsecurity select[name=superType] option:selected').val();
		if(insuranceSuperType == null && insuranceSuperType == ''){
			windowControl('社保类型不能为空');
		}else{
			$.ajax({
				url:"../../insurance/updateInsurance.do?getMs="+getMS(),
				data:{
					insuranceId:insuranceId,
					insuranceSuperType:insuranceSuperType
				},
				type:"post",
				success:function(data){
					if(data == '200'){
						$('#socialSecuritydg').datagrid('reload');
						$('#socialSecurity .popups .editsocialsecurity').css('display','none');
						$('#socialSecurity .popups .editsocialsecurity input').not(".button").val(null);
						$('#socialSecurity .popups .editsocialsecurity textarea').val(null);
						$('#socialSecurity .popups .editsocialsecurity select').children('option:first-child').attr('selected',true);
						windowControl('修改成功');
					}else{
						windowControl('修该失败');
					}
				}
			})
		}
		
	});
});
//删除社保
function deleteInsurance(id){
	var insuranceId = id;
	ui.confirm('确定要删除此社保信息？',function(z){
		$.ajax({
			url:"../../insurance/deleteInsurance.do?getMs="+getMS(),
			data:{insuranceId:insuranceId},
			type:"post",
			success:function(data){
				if(data == '200'){
					$('#socialSecuritydg').datagrid('reload');
					windowControl('删除成功');
				}else{
					windowControl('删除失败');
				}
			}
		})
	},false);
}
//修改社保
function editInsurance(id,userName){
	$('#socialSecurity .popups .editsocialsecurity').css('display','block');
	$('#socialSecurity .popups .editsocialsecurity input[name=insuranceId]').val(id);
	$('#socialSecurity .popups .editsocialsecurity input[name=userName]').val(userName);
}

var addUserInfo = {'total':100,'rows':[]}; //定义一个的数组
function  batchAddUserInfo(){
	$('#socialSecurity #batchAddUserInfo').css('display','block');
	$('#socialSecurity #findUserInfodg').datagrid({
		url:'../../insurance/findAMRRUserInfo.do?getMs='+getMS(),
		toolbar:'#socialSecurity .listForm .queryForm',
	    pagination:true,
	    queryParams:{},
	    onCheck: function(rowIndex, rowData){
	    	if($('#batchAddUserInfo input[type=checkbox]').eq(rowIndex+1).attr('checked')){
	    		if(addUserInfo.rows.length == 0){
	    			addUserInfo.rows.push(rowData);
	    			$('#socialSecurity #batchAddUserInfo .addUserInfoList').datagrid('loadData',addUserInfo);
	    		}else{
	    			for(var i=0;i<addUserInfo.rows.length;i++){
	    				var check = rowData.userId;
	    				var xunhuan = addUserInfo.rows[i].userId;
	    				if(check == xunhuan){
	    					break;
	    				}else if( i == addUserInfo.rows.length-1 ){
	    					addUserInfo.rows.push(rowData);
	    	    			$('#socialSecurity #batchAddUserInfo .addUserInfoList').datagrid('loadData',addUserInfo);
	    	    			break;
	    				}
	    			}	
	    		}
	    	}
	    	
	    }, 
	    onCheckAll: function(rows){
	    	$.extend(addUserInfo.rows,rows);
	    	$('#socialSecurity #batchAddUserInfo .addUserInfoList').datagrid('loadData',addUserInfo);
	    },
	    columns:[[
	  		    {checkbox:true},
	  			{field:'userName',title:'员工姓名',width:100,align:'center',},
	  			{field:'departmentName',title:'部门名称',width:100,align:'center',},
	  			{field:'idCard',title:'身份证号',width:200,align:'center',},
	  	    ]],
	 });
	 $('#socialSecurity .addUserInfoList').datagrid({
		toolbar:'#socialSecurity .addTitle',
		columns:[[
			{field:'userName',title:'员工姓名',width:100,align:'center',},
			{field:'departmentName',title:'部门名称',width:100,align:'center',},
			{field:'_op',title:'管理',width:100,align:'center',formatter:function(value,row,index){
				return '<span class="small-button delete" title="删除" onclick="deleteAddUserInfo('+index+')"></span>'
			}}
			]]
	 });
	 $('#socialSecurity .addUserInfoList').datagrid('loadData',{'total':100,'rows':[]});
}
//删除 入库物品数组的数据
function deleteAddUserInfo(index){
	addUserInfo.rows.splice(index,1);
	$('#socialSecurity .addUserInfoList').datagrid('loadData',addUserInfo);
}
