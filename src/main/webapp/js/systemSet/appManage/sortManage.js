$(function(){
	$("#sortManagedg").datagrid({
		  url:'../../sort/selectAllSort.do?getMs='+getMS(),
		   rownumbers:"true",
		   pagination:true,
		   toolbar:"#sortManage .invitetop",
		   method:"post",
		   fit: true, 
		   columns:[[
		       {field:"sortId",title:"类别id",fitColumns:true,resizable:true,align:"center",sortable:true,width:70},
		       {field:"title",title:"类别名称",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"sortDescribe",title:"类别描述",fitColumns:true,resizable:true,align:"center",sortable:true,width:100},
		       {field:"_op",title:"管理",width:100,resizable:true,align:"center",sortable:true,formatter:function(value,row,index){
		    	   var id="'"+row.sortId+"'";
		    	   var title = "'"+row.title+"'";
		    	   var sortDescribe = "'"+row.sortDescribe+"'";
		    	   var imageUrl = "'"+row.imageUrl+"'";
		    	   var opera = '';
		    	   if(existPermission('admin:personnel:pactManage:pact:update'))
		    			opera +='<span class="small-button edit" title="修改类别" onclick="editSort('+id+','+title+','+sortDescribe+')"></span>';
		    	   if(existPermission('admin:personnel:pactManage:pact:delete'))
		    		   opera +='<span class="small-button look" title="查看信息" onclick="lookSort('+id+','+title+','+sortDescribe+','+imageUrl+')"></span>';
		    	   return opera;
		       }},
		    ]]		
	});
//**************************公司简介********************************
	//公司简介的编辑器
	UE.delEditor('appComponyAbstract');
	UE.getEditor('appComponyAbstract', {
	    theme:"default", //皮肤
	    lang:'zh-cn',//语言
	    autoHeightEnabled:false,  //不长高
	    initialFrameWidth:1000,  //初始化编辑器宽度,默认1000
        initialFrameHeight:400, //初始化编辑器高度,默认320
        enableAutoSave: false,      //去掉保存
	});
	var height = $('#sortManage .list').css('height');
	$('#sortManage .editAppCompony').css('height',height);
	//公司简介的返回
	$('#sortManage .maintop .back').click(function(){
		$('#sortManage .list').show();
		$('#sortManage .back').hide();
		$('#sortManage .editAppCompony').hide();
		$('#sortManage .editAppFirm').hide();
		$("#sortManagedg").datagrid('reload');
	});
//****************************修改类别确定事件************************************
	$('#sortManage .popups .editSort .confirm').click(function(){
		var title = $('#sortManage .popups .editSort .sortName').val();
		var sortDescribe = $('#sortManage .popups .editSort .sortDescribe').val();
		var id = $('#sortManage .popups .editSort .sortId').val();
		alert(id);
		if(title == null || title == ''){
			windowControl('类别名字不能为空');
			return;
		}else if(sortDescribe == null || sortDescribe == ''){
			windowControl('类别描述不能为空');
			return;
		}else{
			$.ajax({
				data:{
					title:title,
					sortDescribe:sortDescribe,
					sortId:id
				},
				method:"post",
				url:"../../sort/updateSort.do?getMs="+getMS(),
				success: function(data){
					console.log(data);
					if(data == 200){
						
						$('#sortManage .popups .editSort').css('display','none');
						$('#sortManage .popups .editSort input[type=text]').val(null);
						$('#sortManage .sortManagedg').datagrid('reload');
						windowControl('修改成功');
					}else{
						windowControl('修改失败');
					}
				},
				error:function(){
			    	windowControl("请求失败!");
			    }
			});
		}
	});
//****************************公司简介************************************
//上传图片
	//选择附件1	
	$('#sortManage .editAppCompony .selectFile').click(function(){
		$('#sortManage .editAppCompony .inputFile').click();		
	});
	$('#sortManage .editAppCompony .inputFile').change(function(){
		var fileName = $('#sortManage .editAppCompony .inputFile').val();
		$('#sortManage .editAppCompony .fileName').val(fileName);
		$('#sortManage .editAppCompony .fileName').removeAttr('name');
		$('#sortManage .editAppCompony .fileName').removeAttr('url');
	});
//提交修改
	$('#sortManage .editAppCompony .submit').click(function(){
		var companyId = $('#sortManage .editAppCompony .companyId').val();
		var companyTitle = $('#sortManage .editAppCompony .companyTitle').val();
		var companyEnglishTitle = $('#sortManage .editAppCompony .companyEnglishTitle').val();
		var componyAbstract = UE.getEditor('appComponyAbstract').getContent();
		var componyAddress = $('#sortManage .editAppCompony .componyAddress').val();
		var componyPhone = $('#sortManage .editAppCompony .componyPhone').val();
		var componyFax = $('#sortManage .editAppCompony .componyFax').val();
		var componyEmail = $('#sortManage .editAppCompony .componyEmail').val();
		var coordinate = $('#sortManage .editAppCompony .coordinate').val();
		var file = $('#sortManage .editAppCompony .inputFile').val();
		if(companyTitle == null || companyTitle == ''){
			windowControl('公司标题不能为空');
			return;
		}else if(companyEnglishTitle == null || companyEnglishTitle == ''){
			windowControl('公司英文标题不能为空');
			return;
		}else if(componyAbstract == null || componyAbstract == ''){
			windowControl('公司简介不能为空');
			return;
		}else if(componyAddress == null || componyAddress == ''){
			windowControl('公司地址不能为空');
			return;
		}else if(componyPhone == null || componyPhone == ''){
			windowControl('公司电话不能为空');
			return;
		}else if(componyFax == null || componyFax == ''){
			windowControl('公司传真不能为空');
			return;
		}else if(componyEmail == null || componyEmail == ''){
			windowControl('公司邮箱不能为空');
			return;
		}else if(coordinate == null || coordinate == ''){
			windowControl('公司经纬度不能为空');
			return;
		}else if(file == null || file == ''){
			windowControl('请选择图片');
			return;
		}else {
			$('#sortManage .editAppCompony .inputFile').upload({
				url:"../../secondPage/updateCompony.do?getMs="+getMS(),
				params:{
					companyId:companyId,					
					companyTitle:companyTitle,
					companyEnglishTitle:companyEnglishTitle,
					componyAbstract:componyAbstract
				},
				onComplate: function (data) {
					if(data == 200){
						windowControl('修改成功，请返回查看');
					}else{
						windowControl('修改失败');
					}
				}
			});
			$('#sortManage .editAppCompony .inputFile').upload("ajaxSubmit");
		}
	});
//****************************修改组织架构片************************************	
	$('#sortManage .popups .editOrganization .confirm').click(function(){
		var file = $('#sortManage .popups .editOrganization .imageFile').val();
		var sortId = $('#sortManage .popups .editOrganization .sortId').val();
		if(file == null || file == ''){
			windowControl('如需修改图片，请选择图片');
		}else{
			$('#sortManage .popups .editOrganization .imageFile').upload({
				url:"../../secondPage/updateImage.do?getMs="+getMS(),
				params:{
					sortId:sortId
				},
				onComplate: function (data) {
					if(data == 200){
						windowControl('修改成功，请返回查看');
						$('#sortManage .popups .editOrganization').css('display','none')
					}else{
						windowControl('修改失败');
					}
				}
			});
			$('#sortManage .popups .editOrganization .imageFile').upload("ajaxSubmit");
		}
	});
//*************************************首页的公司信息****************************************
	UE.delEditor('appFirmAbstract');
	UE.getEditor('appFirmAbstract', {
	    theme:"default", //皮肤
	    lang:'zh-cn',//语言
	    autoHeightEnabled:false,  //不长高
	    initialFrameWidth:1000,  //初始化编辑器宽度,默认1000
        initialFrameHeight:400, //初始化编辑器高度,默认320
        enableAutoSave: false,      //去掉保存
	});
	$('#sortManage .editAppFirm').css('height',height);
	//提交修改
	$('#sortManage .editAppFirm .submit').click(function(){
		var firmId = $('#sortManage .editAppFirm .firmId').val();
		var firmTitle = $('#sortManage .editAppFirm .firmTitle').val();
		var firmStockCode = $('#sortManage .editAppFirm .firmStockCode').val();
		var firmRegistFund = $('#sortManage .editAppFirm .firmRegistFund').val();
		var firmYear = $('#sortManage .editAppFirm .firmYear').val();
		var componyAbstract = UE.getEditor('appFirmAbstract').getContent();
		alert(firmId);
		alert(firmTitle);
		alert(firmStockCode);
		alert(firmRegistFund);
		alert(firmYear);
		alert(componyAbstract);
		if(firmTitle == null || firmTitle == ''){
			windowControl('公司标题不能为空');
			return;
		}else if(firmStockCode == null || firmStockCode == ''){
			windowControl('股票代码不能为空');
			return;
		}else if(firmRegistFund == null || firmRegistFund == ''){
			windowControl('注册资金不能为空');
			return;
		}else if(firmYear == null || firmYear == ''){
			windowControl('成立年份不能为空');
			return;
		}else if(componyAbstract == null || componyAbstract == ''){
			windowControl('公司简介不能为空');
			return;
		}else {
			$.ajax({
				url:"../../homePage/updateAppFirm.do?getMs="+getMS(),
				data:{
					firmId:firmId,					
					firmTitle:firmTitle,
					firmStockCode:firmStockCode,
					firmRegistFund:firmRegistFund,
					firmYear:firmYear,
					componyAbstract:componyAbstract
				},
				success: function (data) {
					if(data == 200){
						windowControl('修改成功，请返回查看');
					}else{
						windowControl('修改失败');
					}
				},
				error:function(){
			    	windowControl("请求失败!");
			    }
			});
		}
	});
});
//修改类别
function editSort(id,title,sortDescribe){
	$('#sortManage .popups .editSort').css('display','block');
	$('#sortManage .popups .editSort .sortName').val(title);
	$('#sortManage .popups .editSort .sortDescribe').val(sortDescribe);
	$("#sortManage .popups .editSort .sortId").val(id);
}
//查看
function lookSort(id,title,sortDescribe,imageUrl){
	toSort = id;
	if(id == '2' || id == '3' || id == '5' || id == '6'){
		$('#sortManage .popups .lookSort').css('display','block');
		$('#sortManage .popups .lookSort .sortName').val(title);
		$('#sortManage .popups .lookSort .sortDescribe').val(sortDescribe);
		
	}
	if(id == '1'){
		$('#sortManage .list').hide();
		$('#sortManage .editAppFirm').show();
		$('#sortManage .maintop .back').show();
		$.ajax({
			method:"post",
			url:"../../homePage/selectAppFirm.do?getMs="+getMS(),
			success: function(data){
				var data = eval('(' + data + ')');
				$('#sortManage .editAppFirm .firmId').val(data.firmId);
				$('#sortManage .editAppFirm .firmTitle').val(data.firmTitle);
				$('#sortManage .editAppFirm .firmStockCode').val(data.firmStockCode);
				$('#sortManage .editAppFirm .firmRegistFund').val(data.firmRegistFund);
				$('#sortManage .editAppFirm .firmYear').val(data.firmYear);
				UE.getEditor('appFirmAbstract').setContent(data.firmAbstract);
			},
			error:function(){
		    	windowControl("请求失败!");
		    }
		});
	}else if(id =='8'){//公司信息
		$('#sortManage .list').hide();
		$('#sortManage .editAppCompony').show();
		$('#sortManage .maintop .back').show();
		$.ajax({
			data:{
				title:id
			},
			method:"post",
			url:"../../secondPage/seletAppCompony.do?getMs="+getMS(),
			success: function(data){
				var data = eval('(' + data + ')');
				$('#sortManage .editAppCompony .companyId').val(data.companyId);
				$('#sortManage .editAppCompony .companyTitle').val(data.companyTitle);
				$('#sortManage .editAppCompony .companyEnglishTitle').val(data.companyEnglishTitle);
				$('#sortManage .editAppCompony .componyAddress').val(data.componyAddress);
				$('#sortManage .editAppCompony .componyPhone').val(data.componyPhone);
				$('#sortManage .editAppCompony .componyFax').val(data.componyFax);
				$('#sortManage .editAppCompony .componyEmail').val(data.componyEmail);
				$('#sortManage .editAppCompony .coordinate').val(data.coordinate);
				UE.getEditor('appComponyAbstract').setContent(data.componyAbstract);
				$('#sortManage .editAppCompony .companyImage').attr('src','../..'+data.componyImageUrl);
			},
			error:function(){
		    	windowControl("请求失败!");
		    }
		});
	}else if(id == '9'){
		loadPage('systemSet/appManage','componyCulture','公司文化');
	}else if(id == '10'){
		$('#sortManage .popups .editOrganization').css('display','block');
		$.ajax({
			method:"post",
			url:"../../secondPage/selectComponyFramework.do?getMs="+getMS(),
			success: function(data){
				var data = eval('(' + data + ')');
				$('#sortManage .popups .editOrganization .organizationImage').attr('src','../..'+data.imageUrl);
			},
			error:function(){
		    	windowControl("请求失败!");
		    }
		});
		$('#sortManage .popups .editOrganization .sortId').val(id);
	}else if(id == '7'){
		loadPage('systemSet/appManage','contact','联系方式');
	}else if(id == '11'){
		loadPage('systemSet/appManage','componyCulture','企业风采');
	}else if(id == '12'){
		loadPage('systemSet/appManage','componyHonnor','公司荣誉');
	}else if(id == '23'){
		loadPage('systemSet/appManage','componyCulture','员工关怀');
	}else if(id =='24'){
		loadPage('systemSet/appManage','componyCulture','环境保护');
	}else if(id =='14'){
		loadPage('systemSet/appManage','product','针织车间');
	}else if(id =='15'){
		loadPage('systemSet/appManage','product','后车间');
	}else if(id =='16'){
		loadPage('systemSet/appManage','product','精二车间');
	}else if(id =='17'){
		loadPage('systemSet/appManage','product','精品车间');
	}else if(id =='18'){
		loadPage('systemSet/appManage','product','外贸车间');
	}else if(id =='19'){
		loadPage('systemSet/appManage','product','印花车间');
	}else if(id =='20'){
		loadPage('systemSet/appManage','product','轧染车间');
	}else if(id =='4'){
		loadPage('systemSet/appManage','newProduct','新品展示');
	}
}