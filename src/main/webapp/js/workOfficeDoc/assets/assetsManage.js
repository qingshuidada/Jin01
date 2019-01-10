$(function(){
	/*设置页面高100%*/
	$('#assetsManage').css('height',$('#loadarea').height()-31+'px');
	//
	$('#assetsManage .listForm').css('width',$('#loadarea').width()-202);
	//资财折旧数据网格
	$('#assetsManagedg').datagrid({
		   //url:'../../admin/selectFixedAssets.do?getMs='+getMS(),
		   rownumbers:"true",
		   singleSelect:true,
		   pagination:true,
		   toolbar:"#assetsManage .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"assetsNo",title:"资产编号",resizable:true,fitColumns:true,align:"center",sortable:true,width:100},
		       {field:"assetsName",title:"资产名称",resizable:true,fitColumns:true,align:"center",sortable:true,width:100},
		       {field:"depreTypeName",title:"折旧类型",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"startDepreStr",title:"开始折旧日期",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"assetValue",title:"资产值",resizable:true,fitColumns:true,align:"center",sortable:true,width:150},
		       {field:"assetCurValue",title:"资产当前值",resizable:true,fitColumns:true,align:"center",sortable:true,width:80},
		       {field:"_op",title:"管理",width:100,resizable:true,align:"center",fitColumns:true,width:100,sortable:true,formatter:function(value,row,index){
		    		var id = "'"+row.assetsId+"'";
		    		var flag = row.calMethod;
		    		var opera = '';
		    	//	var rows = row;
		    		if(flag == 2){
		    			opera +='<span class="small-button calculate" title="折旧计算" onclick="depreciation('+id+','+index+')"></span>';
		    		}else{
		    			opera +='<span class="small-button calculate" title="折旧计算" onclick="depreciationAssets('+id+')"></span>';
		    		}
			    	opera +='<span class="small-button edit" title="修改" onclick="editAssets('+id+')"></span>';
			    	opera +='<span class="small-button delete" title="删除" onclick="deleteAssets('+id+')"></span>';
		    		return opera;
		    	}},
		  ]]
	});
	
	//条件查询
	$('#assetsManage .invitetop .query').click(function(){
		var assetsName = $('#assetsManage input[name=assetsName]').val();
		var beDep = $('#assetsManage input[name=bedep]').val();
		var assetsTypeUrl = $("#assetTypeUrl").val();
		var dataInfo;
		dataInfo = {
			assetsName:assetsName,
			beDep : beDep,
			assetsTypeUrl:assetsTypeUrl
		};
		$('#assetsManagedg').datagrid({
			url:'../../admin/selectFixedAssets.do?getMs='+getMS(),
			queryParams:dataInfo
		});
	});
	
	/*--------------------------------tree------------------------------*/
	//资产类型树
	$('#assetTypetg').tree({
        url: "../../admin/queryTree.do?getMs="+getMS(),
        method:"post",
        animate: false,
        checkbox : false,//是否显示复选框 
        cascadeCheck: false,
        dnd:true,
        onClick: function(node){
        	var assetsTypeUrl = $('#assetTypetg').tree('getSelected').id;
        	$("#assetTypeUrl").val(node.id);
        	$('#assetsManagedg').datagrid({
        		url:'../../admin/selectFixedAssets.do?getMs='+getMS(),
        		queryParams:{assetsTypeUrl:assetsTypeUrl},
        	});
        },
        onCollapse:function(node){
        	$("#assetTypeUrl").val(node.id);
        	$.ajax({
        		data:{url:$("#assetTypeId").val(),state:"onCollapse"},
    			url:"../../admin/updateTreeState.do?getMs="+getMS(),
    			method:"post"
    		})
        },
        onExpand:function(node){
        	$("#assetTypeUrl").val(node.id);
        	$.ajax({
        		data:{url:$("#assetTypeUrl").val(),state:"onExpand"},
    			url:"../../admin/updateTreeState.do?getMs="+getMS(),
    			method:"post"
    		})
        },
        onDrop: function(target,source,point){
        	var targetUrl = $('#assetTypetg').tree('getNode', target).id;
        	var targetName = $('#assetTypetg').tree('getNode', target).text;
        	var attributes = $('#assetTypetg').tree('getNode', target).attributes;
        	if(attributes == '1' && point == "append"){
        		windowControl("无效操作呦");
        		$.ajax({
        			url:"../../document/queryTree.do?getMs="+getMS(),
        			method:"post",
        			success: function(data){
        				$('#assetTypetg').tree('reload');
        			}
        		})
        	}else{
        		$.ajax({
        			data:{targetUrl:targetUrl,targetName:targetName,sourceUrl:source.id,sourceName:source.text,point:point},
        			url:"../../admin/dragAssetsType.do?getMs="+getMS(),
        			method:"post",
        			success: function(data){
        				$('#assetTypetg').tree('reload');
        			}
        		})
        	}
        },
        onContextMenu : function(e,node){
        	e.preventDefault();
        	var assetsTypeUrl = $('#assetTypeUrl').val(node.id);
        	var flag = node.id;
        	$('#assetTypetg').tree('select', node.target);
        	if(flag == 0){
        		$('#addAssetType').menu('show', {
        			left: e.pageX,
        			top: e.pageY
        		});
        	}else{
        		$('#editAssetType').menu('show', {
        			left: e.pageX,
        			top: e.pageY
        		});
        		//$('#assetsManage .editAssetType .assetsTypeName]').val(node.text);
        	}
    		
		}
       
    });
	//系统自动生成编号
	$('#assetsManage .addAssets .sysgen').click(function(){
		var myDate = new Date();
        var myYear = myDate.getFullYear();
        var myMonth = myDate.getMonth();
        var myHour= myDate.getHours();
        var myMinute = myDate.getMinutes();
        var mySecond = myDate.getSeconds();
        var assetsNo = "MD"+myYear+myMonth+myHour+myMinute+mySecond;
        $('#assetsManage .addAssets .assetsNo').val(assetsNo);
	})
/********************************选择员工*****************************************/	
	$('#assetsManage .addAssets .chooseUser').click(function(){
		chooseUser();
	    $('#chooseUser .confirm').click(function(){
	    	$('#chooseUser').css('display','none');
	    	selectUser = $('#chooseUser .popuparea .user').datagrid('getSelections');
	    	$('#assetsManage .addAssets .custodian').val(selectUser[0].userName);
	    })
	});
/********************************选择部门*****************************************/
	$('#assetsManage .addAssets .chooseDepartment').click(function(){
		chooseDept();
		$('#chooseDept .confirm').click(function(){
		     $('#chooseDept').css('display','none');
		     var chooseDept = $('#chooseDept .dept').tree('getSelected');
		     $('#assetsManage .addAssets .beDep').val(chooseDept.text);
		     $('#chooseDept .confirm').unbind();
		});
	});
/********************************选择部门*****************************************/
$('#assetsManage .listForm .invitetop .choosePost').click(function(){
	chooseDept();
	$('#chooseDept .confirm').click(function(){
	     $('#chooseDept').css('display','none');
	     var chooseDept = $('#chooseDept .dept').tree('getSelected');
	     $('#assetsManage .listForm .invitetop input[name=bedep]').val(chooseDept.text);
	     $('#chooseDept .confirm').unbind();
	});
});
/************************************固定资产*****************************************/
	//添加资产
	$('#assetsManage .maintop .add').click(function(){
		if($('#assetTypetg').tree('getSelected') == null){
			windowControl("请在左侧选择资产类型");
			return ;
		}
		var assetsTypeId = $('#assetTypetg').tree('getSelected').id;
		var assetsTypeName = $('#assetTypetg').tree('getSelected').text;
		$('#assetsManage .addAssets .assetsTypeName').val(assetsTypeName);
		var calMethod = $('#assetsManage .addAssets .depreTypeName option:selected').attr('calMethod');
		console.log(calMethod);
		if(calMethod == '2'){
			$('#assetsManage .addAssets .workLoad').show();
			$('#assetsManage .addAssets .serviceLife').hide();
		}else{
			$('#assetsManage .addAssets .workLoad').hide();
			$('#assetsManage .addAssets .serviceLife').show();
		}
		$('#assetsManage .addAssets').css('display','block');
	});
	$('#assetsManage .addAssets .confirm').click(function(){
		var assetsTypeId = $("#assetTypeUrl").val();
		var assetsName = $.trim($('#assetsManage .addAssets .assetsName').val());
		var assetsNo = $.trim($('#assetsManage .addAssets .assetsNo').val());
		var buyDate = $.trim($('#assetsManage .addAssets input[name=buyDate]').val());
		var beDep = $.trim($('#assetsManage .addAssets .beDep').val());
		var custodian = $.trim($('#assetsManage .addAssets .custodian').val());
		var depreTypeId = $.trim($('#assetsManage .addAssets .depreTypeName').val());
		var calMethod = $('#assetsManage .addAssets .depreTypeName option:selected').attr('calMethod');
		var startDepre = $.trim($('#assetsManage .addAssets input[name=startDepre]').val());
		var intendWorkGross = $.trim($('#assetsManage .addAssets .intendWorkGross').val());
		var workGrossUnit = $.trim($('#assetsManage .addAssets .workGrossUnit').val());
		var defPevWorkGross = $.trim($('#assetsManage .addAssets .defPevWorkGross').val());
		var remainValRate0 = $.trim($('#assetsManage .addAssets .workLoad .remainValRate').val());
		var intendTerm = $.trim($('#assetsManage .addAssets .intendTerm').val());
		var remainValRate1 = $.trim($('#assetsManage .addAssets .serviceLife .remainValRate').val());
		var assetValue = $.trim($('#assetsManage .addAssets .assetValue').val());
		var assetCurValue = $.trim($('#assetsManage .addAssets .assetCurValue').val());
		var model = $.trim($('#assetsManage .addAssets .model').val());
		var manuFacturer = $.trim($('#assetsManage .addAssets .manuFacturer').val());
		var manuDate = $.trim($('#assetsManage .addAssets input[name=manuDate]').val());
		var notes = $.trim($('#assetsManage .addAssets .notes').val());
		var remainValRate;
		if(remainValRate0==''||remainValRate0==null){
			remainValRate = remainValRate1;
		}else{
			remainValRate = remainValRate0;
		}
		if(assetsName == ''||assetsName == null){
			windowControl('资产名称不能为空');
			return false;
		}else if(assetsNo == ''||assetsNo == null){
			windowControl('资产编号不能为空');
			return false;
		}else if(buyDate == ''||buyDate == null){
			windowControl('置办日期不能为空');
			return false;
		}else if(beDep == ''||beDep == null){
			windowControl('所属部门不能为空');
			return false;
		}else if(custodian == ''||custodian == null){
			windowControl('保管人不能为空');
			return false;
		}else if(depreTypeId == ''||depreTypeId == null){
			windowControl('折旧类型不能为空');
			return false;
		}else if(startDepre == ''||startDepre == null){
			windowControl('开始折旧日期不能为空');
			return false;
		}else if(remainValRate == ''||remainValRate == null){
			windowControl('残值率不能为空');
			return false;
		}else if(assetValue == ''||assetValue == null){
			windowControl('资产值不能为空');
			return false;
		}else if(manuDate == ''||manuDate == null){
			windowControl('出厂日期不能为空');
			return false;
		}else{
			if(calMethod==2){
				if(intendWorkGross == ''||intendWorkGross == null){
					windowControl('预计使用总工作量不能为空');
					return false;
				}else if(workGrossUnit == ''||workGrossUnit == null){
					windowControl('工作量计算单位不能为空');
					return false;
				}else if(defPevWorkGross == ''||defPevWorkGross == null){
					windowControl('默认周期工作量不能为空');
					return false;
				}else{
					var info = {
						assetsName:assetsName,
						assetsNo:assetsNo,
						assetsTypeUrl:assetsTypeId,
						buyDateStr:buyDate,
						beDep:beDep,
						custodian:custodian,
						depreTypeId:depreTypeId,
						startDepreStr:startDepre,
						intendWorkGross:intendWorkGross,
						workGrossUnit:workGrossUnit,
						defPerWorkGross:defPevWorkGross,
						remainValRate:remainValRate,
						assetValue:assetValue,
						assetCurValue:assetCurValue,
						model:model,
						manuFacturer:manuFacturer,
						manuDateStr:manuDate,
						notes:notes,
					}
				}
			}else if(calMethod==1){
				//（1－预计净利残值率）/预计使用年限×100％
				var depreRate = ((100-remainValRate)/intendTerm)/100;
				var info = {
						assetsName:assetsName,
						assetsNo:assetsNo,
						assetsTypeUrl:assetsTypeId,
						buyDateStr:buyDate,
						beDep:beDep,
						depreRate:depreRate,
						custodian:custodian,
						depreTypeId:depreTypeId,
						startDepreStr:startDepre,
						intendTerm:intendTerm,
						remainValRate:remainValRate,
						assetValue:assetValue,
						assetCurValue:assetCurValue,
						model:model,
						manuFacturer:manuFacturer,
						manuDateStr:manuDate,
						notes:notes,
					}
			}else{
				if(intendTerm == ''||intendTerm == null){
					windowControl('预计试用期限不能为空');
					return false;
				}else{
					var info = {
						assetsName:assetsName,
						assetsNo:assetsNo,
						assetsTypeUrl:assetsTypeId,
						buyDateStr:buyDate,
						beDep:beDep,
						custodian:custodian,
						depreTypeId:depreTypeId,
						startDepreStr:startDepre,
						intendTerm:intendTerm,
						remainValRate:remainValRate,
						assetValue:assetValue,
						assetCurValue:assetCurValue,
						model:model,
						manuFacturer:manuFacturer,
						manuDateStr:manuDate,
						notes:notes,
					}
				}
			}
			$.ajax({
				url:'../../admin/insertFixedAssets.do?getMs='+getMS(),
				data:info,
				success:function(data){
					if(data == 200){
						$('#assetsManage .addAssets').css('display','none');
						$('#assetsManage .addAssets .popuparea input[type=text]').val('');
						$('#assetsManage .addAssets .popuparea select').val('');
						$('#assetsManage .addAssets .popuparea textarea').val('');
						$('#assetsManagedg').datagrid('reload');
						windowControl('添加成功');
					}else{
						windowControl('添加失败');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	});
	/************************************折旧类型变化折旧计算方式改变创建固定资产项的弹窗的计算方式**********************************/
	$('#assetsManage .addAssets .depreTypeName').change(function(){
		var xx = $(this).find('option:selected').attr('calMethod');
		xx = getValueFromKey('cal_method',xx);
		if(xx == '工作量法'){
			$('#assetsManage .addAssets .workLoad').show();
			$('#assetsManage .addAssets .serviceLife').hide();
			$('#assetsManage .addAssets .serviceLife input[type=text]').val('');
		}else{
			$('#assetsManage .addAssets .serviceLife').show();
			$('#assetsManage .addAssets .workLoad input[type=text]').val('');
			$('#assetsManage .addAssets .workLoad').hide();
		}
	});
	/************************************折旧类型变化折旧计算方式改变创建固定资产项的弹窗的计算方式**********************************/
	$('#assetsManage .editAssets .depreTypeName').change(function(){
		var xx = $(this).find('option:selected').attr('calMethod');
		xx = getValueFromKey('cal_method',xx);
		if(xx == '工作量法'){
			$('#assetsManage .editAssets .workLoad').show();
			$('#assetsManage .editAssets .normal').hide();
			$('#assetsManage .editAssets .normal input[type=text]').val('');
		}else{
			$('#assetsManage .editAssets .normal').show();
			$('#assetsManage .editAssets .workLoad input[type=text]').val('');
			$('#assetsManage .editAssets .workLoad').hide();
		}
	});
/**********************************资产类型*********************************************/	
	//点击确定添加资产类型
	$('#assetsManage .addAssetType .confirm').click(function(){
		var assetsTypeName = $('#assetsManage .addAssetType .assetsTypeName').val();
		var assetsTypeUrl = $("#assetTypeUrl").val();
		if(assetsTypeName == null || assetsTypeName == ""){
			windowControl("请输入新增分类名称");
			return;
		}else{
			$.ajax({
				data:{assetsTypeUrl:assetsTypeUrl,assetsTypeName:assetsTypeName,action:'添加'},
				url:"../../admin/addAssetsType.do?getMs="+getMS(),
				method:"post",
				success: function(data){
					$('#assetTypetg').tree('reload');
					$('#assetsManage .addAssetType .popuparea input[type=text]').val('');
					$('#assetsManage .addAssetType').css('display','none');
					$('#assetsManagedg').datagrid('reload');
					if(data == 200){
						windowControl('添加成功');
					}else{
						windowControl('添加失败');
					}
				}
			})
		}
	})
	
	//点击确定修改资产类型
	$('#assetsManage .editAssetType .confirm').click(function(){
		var assetsTypeName = $('#assetsManage .editAssetType .assetsTypeName').val();
		var assetsTypeUrl = $("#assetTypeUrl").val();
		if(assetsTypeName == null || assetsTypeName == ""){
			windowControl("请输入修改后的分类名称");
		}else{
			$.ajax({
				data:{assetsTypeUrl:assetsTypeUrl,assetsTypeName:assetsTypeName,action:'修改'},
				url:"../../admin/editAssetsType.do?getMs="+getMS(),
				method:"post",
				success: function(data){
					$('#assetTypetg').tree('reload');
					$('#assetsManage .editAssetType .popuparea input[type=text]').val('');
					$('#assetsManage .editAssetType').css('display','none');
					$('#assetsManagedg').datagrid('reload');
					if(data == 200){
						windowControl('修改成功');
					}else{
						windowControl('修改失败');
					}
				}
			})
		}
	})	
		//点击确定删除资产类型
	$('#assetsManage .removeAssetType .confirm').click(function(){
		var assetsTypeUrl = $("#assetTypeUrl").val();
			$.ajax({
				data:{assetsTypeUrl:assetsTypeUrl,action:'删除'},
				url:"../../admin/removeAssetsType.do?getMs="+getMS(),
				method:"post",
				success: function(data){
					$('#assetTypetg').tree('reload');
					$('#assetsManage .removeAssetType').css('display','none');
					$('#assetsManagedg').datagrid('reload');
					if(data == 200){
						windowControl('删除成功');
					}else{
						windowControl('删除失败');
					}
				}
			})
	});
	
	//工作量折旧计算
	$('#assetsManage .addDepreRecord .confirm').click(function(){
		var workCapacity = $('#assetsManage .addDepreRecord .popuparea .workCapacity').val();
		var assetsId = $('#assetsManage .addDepreRecord .popuparea .assetsId').val();
		var cruCalDateStr = $('#assetsManage .addDepreRecord .popuparea .cruCalDate').val();
		$.ajax({
			url:'../../admin/depreciate.do?getMs='+getMS(),
			data:{workCapacity:workCapacity,assetsId:assetsId,cruCalDateStr:cruCalDateStr},
			success:function(data){
				if(data == 200){
					$('#assetsManage .addDepreRecord').css('display','none');
					$('#assetsManagedg').datagrid('reload');
					windowControl('折旧计算成功');
				}else if(data == 400){
					windowControl('折旧时间还没到');
				}else{
					windowControl('折旧计算失败');
				}
			},
			error:function(err){
				windowControl('服务器异常');
			}
		})
	});
	
});
//添加固定资产类型
function addAssetType(){
	$('#assetsManage .addAssetType').css('display','block');
}
//删除固定资产类型
function deleteAssetType(){
	$('#assetsManage .removeAssetType').css('display','block');
}
//修改固定资产类型
function editAssetType(){
	$('#assetsManage .editAssetType').css('display','block');
}

//工作量折旧计算方法
function depreciation(id,index){
	$('#assetsManage .addDepreRecord').css('display','block');
	var row = $('#assetsManagedg').datagrid('getRows')[index];
	$('#assetsManage .addDepreRecord .popuparea input[name=startDepre]').val(row.startDepreStr);
	var deprePeriod = Number(row.deprePeriod);
	var arr = row.startDepreStr.split('-');
	var m = deprePeriod + Number(arr[1]);
	var n = Math.floor(m/12);
	var y = n + Number(arr[0]);
	m -= n*12;
	if(m<10){
		m = '0'+m;
	}
	var str = y + '-' + m + '-' + arr[2];
	$('#assetsManage .addDepreRecord .popuparea .cruCalDate').val(str);
	//$('#assetsManage .addDepreRecord .popuparea .defPevWorkGross').val(row.defPevWorkGross);
	$('#assetsManage .addDepreRecord .popuparea .assetsId').val(id);
}
//其他折旧计算方法
function depreciationAssets(id,index){
	ui.confirm('确定要开始折旧计算吗?',function(z){
		if(z){
			$.ajax({
				url:'../../admin/depreciate.do?getMs='+getMS(),
				data:{assetsId:id},
				success:function(data){
					$('#assetTypetg').tree('reload');
					$('#assetsManagedg').datagrid('reload');
					if(data == 200){
						windowControl('折旧计算已完成');
					}else if(data == 400){
						windowControl('折旧时间还未到');
					}else{
						windowControl('折旧计算失败');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	},false);
}
/****************下拉框折旧类型*******************************/
$.ajax({
	url:'../../admin/selectDepreType.do?getMs='+getMS(),
	type:'post',
	success:function(data){
		var str = '';
		var data = eval('(' + data + ')');
		for(var i=0;i<data.rows.length;i++){
			str += "<option value=" + data.rows[i].depreTypeId + " calMethod="+ data.rows[i].calMethod +">" + data.rows[i].depreTypeName + "</option>";  
		}
		$('#assetsManage .addAssets .depreTypeName').html(str);
		$('#assetsManage .editAssets .depreTypeName').html(str);
		
		var calMethod = $('#assetsManage .addAssets .depreTypeName option:eq(0)').attr('calMethod')
		if(calMethod==2){
			$('#assetsManage .addAssets .workLoad').show();
			$('#assetsManage .addAssets .serviceLife').hide();
		}else{
			$('#assetsManage .addAssets .workLoad').show();
			$('#assetsManage .addAssets .serviceLife').show();
		}
	},
	error:function(error){
		//windowControl(error.status);
	}
});
/*---------右键树出现easyui-menu------------*/

//修改固定资产
function editAssets(id){
	$('#assetsManage .editAssets').css('display','block');
	$.ajax({
		url:'../../admin/selectFixedAssets.do?getMs='+getMS(),
		data:{assetsId:id},
		type:'post',
		success:function(data){
			var data = eval('(' + data + ')');
			console.log(data);
			var flag = data.rows[0].calMethod;
			$('#assetsManage .editAssets .assetsName').val(data.rows[0].assetsName);
			$('#assetsManage .editAssets .assetsNo').val(data.rows[0].assetsNo);
			$('#assetsManage .editAssets input[name=buyDate]').val(data.rows[0].buyDateStr);
			$('#assetsManage .editAssets .beDep').val(data.rows[0].beDep);
			$('#assetsManage .editAssets .custodian').val(data.rows[0].custodian);
			$('#assetsManage .editAssets .depreTypeName').val(data.rows[0].depreTypeName);
			$('#assetsManage .editAssets input[name=startDepre]').val(data.rows[0].startDepreStr);
			$('#assetsManage .editAssets .remainValRate').val(data.rows[0].remainValRate);
			$('#assetsManage .editAssets .assetValue').val(data.rows[0].assetValue);
			$('#assetsManage .editAssets .assetCurValue').val(data.rows[0].assetCurValue);
			$('#assetsManage .editAssets .model').val(data.rows[0].model);
			$('#assetsManage .editAssets .manuFacturer').val(data.rows[0].manuFacturer);
			$('#assetsManage .editAssets input[name=manuDate]').val(data.rows[0].manuDateStr);
			$('#assetsManage .editAssets .notes').val(data.rows[0].notes);	
			if(flag == 2){
				$('#assetsManage .editAssets .workLoad').show();
				$('#assetsManage .editAssets .normal').hide();
				$('#assetsManage .editAssets .intendWorkGross').val(data.rows[0].intendWorkGross);
				$('#assetsManage .editAssets .workGrossUnit').val(data.rows[0].workGrossUnit);
				$('#assetsManage .editAssets .defPevWorkGross').val(data.rows[0].defPerWorkGross);
			}else{
				$('#assetsManage .editAssets .normal').show();
				$('#assetsManage .editAssets .workLoad').hide();
				$('#assetsManage .editAssets .intendTerm').val(data.rows[0].intendTerm);
			}
		},
		error:function(error){
			//windowControl(error.status);
		}
	});
	//修改固定资产的信息
	$('#assetsManage .editAssets .confirm').click(function(){
		var assetsName = $.trim($('#assetsManage .editAssets .assetsName').val());
		var assetsNo = $.trim($('#assetsManage .editAssets .assetsNo').val());
		var buyDate = $.trim($('#assetsManage .editAssets input[name=buyDate]').val());
		var beDep = $.trim($('#assetsManage .editAssets .beDep').val());
		var custodian = $.trim($('#assetsManage .editAssets .custodian').val());
		var depreTypeId = $.trim($('#assetsManage .editAssets .depreTypeName').val());
		var calMethod = $('#assetsManage .editAssets .depreTypeName').attr('calMethod');
		var startDepre = $.trim($('#assetsManage .editAssets input[name=startDepre]').val());
		var intendWorkGross = $.trim($('#assetsManage .editAssets .intendWorkGross').val());
		var workGrossUnit = $.trim($('#assetsManage .editAssets .workGrossUnit').val());
		var defPevWorkGross = $.trim($('#assetsManage .editAssets .defPevWorkGross').val());
		var intendTerm = $.trim($('#assetsManage .editAssets .intendTerm').val());
		var remainValRate = $.trim($('#assetsManage .editAssets .remainValRate').val());
		var assetValue = $.trim($('#assetsManage .editAssets .assetValue').val());
		var assetCurValue = $.trim($('#assetsManage .editAssets .assetCurValue').val());
		var model = $.trim($('#assetsManage .editAssets .model').val());
		var manuFacturer = $.trim($('#assetsManage .editAssets .manuFacturer').val());
		var manuDate = $.trim($('#assetsManage .editAssets input[manuDate]').val());
		var notes = $.trim($('#assetsManage .addAssets .notes').val());
		if(assetsName == ''||assetsName == null){
			windowControl('资产名称不能为空');
			return false;
		}else if(assetsNo == ''||assetsNo == null){
			windowControl('资产编号不能为空');
			return false;
		}else if(buyDate == ''||buyDate == null){
			windowControl('置办日期不能为空');
			return false;
		}else if(beDep == ''||beDep == null){
			windowControl('所属部门不能为空');
			return false;
		}else if(custodian == ''||custodian == null){
			windowControl('保管人不能为空');
			return false;
		}else if(depreTypeId == ''||depreTypeId == null){
			windowControl('折旧类型不能为空');
			return false;
		}else if(startDepre == ''||startDepre == null){
			windowControl('开始折旧日期不能为空');
			return false;
		}else if(remainValRate == ''||remainValRate == null){
			windowControl('残值率不能为空');
			return false;
		}else if(assetValue == ''||assetValue == null){
			windowControl('资产值不能为空');
			return false;
		}else{
			if(calMethod == 2){
				if(intendWorkGross == ''||intendWorkGross == null){
					windowControl('预计使用总工作量不能为空');
					return false;
				}else if(workGrossUnit == ''||workGrossUnit == null){
					windowControl('工作量计算单位不能为空');
					return false;
				}else if(defPevWorkGross == ''||defPevWorkGross == null){
					windowControl('默认周期工作量不能为空');
					return false;
				}else{
					var info = {
						assetsName:assetsName,
						assetsNo:assetsNo,
						assetsTypeUrl:assetsTypeId,
						buyDateStr:buyDate,
						beDep:beDep,
						custodian:custodian,
						depreTypeId:depreTypeId,
						startDepreStr:startDepre,
						intendWorkGross:intendWorkGross,
						workGrossUnit:workGrossUnit,
						defPerWorkGross:defPevWorkGross,
						remainValRate:remainValRate,
						assetValue:assetValue,
						assetCurValue:assetCurValue,
						model:model,
						manuFacturer:manuFacturer,
						manuDateStr:manuDate,
						notes:notes,
					}
				}
			}else if(calMethod == 1){
				//（1－预计净利残值率）/预计使用年限×100％
				var depreRate = (100-remainValRate)/intendTerm;
				var info = {
						assetsId:id,
						assetsName:assetsName,
						assetsNo:assetsNo,
						buyDateStr:buyDate,
						beDep:beDep,
						custodian:custodian,
						depreRate:depreRate,
						depreTypeId:depreTypeId,
						startDepreStr:startDepre,
						intendTerm:intendTerm,
						remainValRate:remainValRate,
						assetValue:assetValue,
						assetCurValue:assetCurValue,
						model:model,
						manuFacturer:manuFacturer,
						manuDateStr:manuDate,
						notes:notes,
				}
			
			}else{
				if(intendTerm == ''||intendTerm == null){
					windowControl('预计试用期限不能为空');
					return false;
				}else{
					var info = {
							assetsId:id,
							assetsName:assetsName,
							assetsNo:assetsNo,
							buyDateStr:buyDate,
							beDep:beDep,
							custodian:custodian,
							depreTypeId:depreTypeId,
							startDepreStr:startDepre,
							intendTerm:intendTerm,
							remainValRate:remainValRate,
							assetValue:assetValue,
							assetCurValue:assetCurValue,
							model:model,
							manuFacturer:manuFacturer,
							manuDateStr:manuDate,
							notes:notes,
					}
				}
				
			}
				$.ajax({
				url:'../../admin/updateFixedAssets.do?getMs='+getMS(),
				data:info,
				success:function(data){
					if(data == 200){
						$('#assetsManage .editAssets').css('display','none');
						$('#assetsManage .editAssets .popuparea input[type=text]').val('');
						$('#assetsManage .editAssets .popuparea select').val('');
						$('#assetsManage .editAssets .popuparea textarea').val('');
						$('#assetsManagedg').datagrid('reload');
						windowControl('修改成功');
					}else{
						windowControl('修改失败');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	});
	
}
//删除固定资产
function deleteAssets(id){
	ui.confirm('确认要删除这条固定资产信息吗?',function(z){
		if(z){
			$.ajax({
				url:'../../admin/deleteFixedAssets.do?getMs='+getMS(),
				data:{assetsId:id},
				success:function(data){
					$('#assetTypetg').tree('reload');
					$('#assetsManagedg').datagrid('reload');
					if(data == 200){
						windowControl('删除成功');
					}else{
						windowControl('删除失败');
					}
				},
				error:function(err){
					windowControl('网络异常');
				}
			});
		}
	},false);
}
