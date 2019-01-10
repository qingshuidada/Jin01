var myEditorH = $('#loadarea').height()-143-41;
var myEditorW = $('#loadarea').width()-202;
if(existPermission('admin:workOfficeDoc:documentManage:documentManage:addtree')){
	$('#mmm .add').show();
}
if(existPermission('admin:workOfficeDoc:documentManage:documentManage:deletetree')){
	$('#mmm .remove').show();
}
if(existPermission('admin:workOfficeDoc:documentManage:documentManage:updatetree')){
	$('#mmm .update').show();
}
	
	
documentManage.deleteDoc = function(docId){
	ui.confirm('确定将此公文删除吗？',function(z){
		if(z){
			$.ajax({
				url:'../../document/deleteDoc.do?getMs='+getMS(),
				data:{
					docId:docId
				},
				type:'post',
				success:function(data){
					if(data == '200'){
						windowControl('删除公文成功');
						$('#documentManagedg').datagrid('reload');
					}else{
						windowControl('删除公文失败');
					}
				}
			});
		}
	},false)
	
}

$(function(){
	//加载datagrid
	/*-----------设置公文编辑区-----------*/
	$('#documentManage').css('height',$('#loadarea').height()-31);
	$('#documentManage .listForm').css('width',myEditorW);
	$('#documentManagedg').parent({
		'height':myEditorH,
		'width':myEditorW
	});
	$('#documentManagedg').datagrid({
	    rownumbers:"true",
	    singleSelect:true,
	    pagination:true,
	    toolbar:"#documentManage .invitetop",
	    method:"post",
	    fit: true, 
	    columns:[[
	        {field:"docName",title:"公文名称",resizable:true,fitColumns:true,align:"center",width:160}, 
	        {field:"docDescribe",title:"公文描述",resizable:true,fitColumns:true,align:"center",width:250}, 
	        {field:"createTime",title:"创建时间",resizable:true,fitColumns:true,align:"center",width:130}, 
	        {field:"createUserName",title:"创建人",resizable:true,fitColumns:true,align:"center",width:80}, 
	        {field:"_op",title:"操作",resizable:true,fitColumns:true,align:"center",width:80,formatter:function(value,row,index){
	        	var fileUrl = row.fileUrl;
	        	var docId = "'"+ row.docId +"'";
	        	var opera = '';
	        	if(existPermission('admin:workOfficeDoc:documentManage:documentManage:load'))
	        		opera += '<a class="small-button downset" href="../../document/downloadFile.do?fileUrl='+fileUrl+'"></a>';
	        	if(existPermission('admin:workOfficeDoc:documentManage:documentManage:delete'))
	        		opera += '<span class="small-button delete" title="删除" onclick="documentManage.deleteDoc('+docId+')"></span>';
	        	opera += '<a class="small-button look" target="_blank" href="../../document/showWord.do?path='+fileUrl+'"></a>';
	        	return opera;
	        }}, 
	    ]]
	});
	//查询
	$('#documentManage .listForm .query').click(function(){
		$('#documentManagedg').datagrid({
			url:'../../document/queryDoc.do?getMs='+getMS(),
			queryParams: {
				catalogUrl:$("#catalogUrl").val(),
		    	createTimeStart: $('#documentManage .listForm .invitetop .createTimeStart').val(),
		    	createTimeEnd: $('#documentManage .listForm .invitetop .createTimeEnd').val(),
				docName: $('#documentManage .listForm .invitetop .docName').val()
			}
		});
	});
	//公文树
	$('#ddd').tree({
        url: "../../document/deptTree.do?getMs="+getMS(),
        method:"post",
        animate: false,
        checkbox : false,//是否显示复选框 
        cascadeCheck: false,
        dnd:true,
        /*onCollapse:function(node){
        	$("#catalogUrl").val(node.id);
        	$.ajax({
        		data:{url:$("#catalogUrl").val(),state:"onCollapse"},
    			url:"../../document/updateTreeState.do?getMs="+getMS(),
    			method:"post"
    		})
        },
        onExpand:function(node){
        	$("#catalogUrl").val(node.id);
        	$.ajax({
        		data:{url:$("#catalogUrl").val(),state:"onExpand"},
    			url:"../../document/updateTreeState.do?getMs="+getMS(),
    			method:"post"
    		})
        },
        onDrop: function(target,source,point){
        	var targetUrl = $('#ddd').tree('getNode', target).id;
        	var targetName = $('#ddd').tree('getNode', target).text;
        	var attributes = $('#ddd').tree('getNode', target).attributes;
        	if(attributes == '1' && point == "append"){
        		windowControl("无效操作呦");
        		$.ajax({
        			url:"../../document/deptTree.do?getMs="+getMS(),
        			method:"post",
        			success: function(data){
        				$('#ddd').tree('reload');
        			}
        		})
        	}else{
        		$.ajax({
        			data:{targetUrl:targetUrl,targetName:targetName,sourceUrl:source.id,sourceName:source.text,point:point},
        			url:"../../document/dragDocument.do?getMs="+getMS(),
        			method:"post",
        			success: function(data){
        				$('#ddd').tree('reload');
        			}
        		})
        	}
        },*/
        onContextMenu : function(e,node){
        	e.preventDefault();
        	var catalogUrl = $('#catalogUrl').val(node.id);
        	console.log(catalogUrl);
        	$("#catalogUrl").attr("docFlag",node.attributes);
        	$('#ddd').tree('select', node.target);
        	if(node.attributes == "0"){
        		$('#mmm').menu('show', {
        			left: e.pageX,
        			top: e.pageY
        		});
        	}else{
        		$('#mmd').menu('show', {
        			left: e.pageX,
        			top: e.pageY
        		});
        	}
		}
    });
	//点击确定删除物品类
	$('#documentManage .removeWindow .quedingremove').click(function(){
		var catalogUrl = $("#catalogUrl").val();
		$.ajax({
			data:{url:catalogUrl},
			url:"../../document/removeDocument.do?getMs="+getMS(),
			method:"post",
			success: function(data){
				if(data == '200'){
					$('#ddd').tree('reload');
					$('#documentManage .removeWindow .popuparea input[type=text]').val('');
					$('#documentManage .removeWindow').css('display','none');
				}else if(data == '500'){
					windowControl("删除公文类别失败");
				}else{
					windowControl(data);
				}
			}
		})
	})
	//点击确定修改物品类
	$('#documentManage .editWindow .quedingedit').click(function(){
		var catalogUrl = $("#catalogUrl").val();
		var catalogName = $('#documentManage .editWindow .catalogName').val();
		$.ajax({
			data:{url:catalogUrl,catalogName:catalogName},
			url:"../../document/updateDocument.do?getMs="+getMS(),
			method:"post",
			success: function(data){
				$('#ddd').tree('reload');
				$('#documentManage .editWindow .popuparea input[type=text]').val('');
				$('#documentManage .editWindow').css('display','none');
			}
		})
	})
	
	/*--------------编辑公文---------------*/
	$('#documentManage .listForm .editDocument').click(function(){
		$('#documentManage .lookdocument').css('display','none');
		UE.delEditor("myEditor");
		UE.getEditor('myEditor', {
		    theme:"default", //皮肤
		    lang:'zh-cn',//语言
		    autoHeightEnabled:false,  //不长高
		    initialFrameWidth:myEditorW,  //初始化编辑器宽度,默认1000
	        initialFrameHeight:myEditorH, //初始化编辑器高度,默认320
	        enableAutoSave: false,      //去掉保存
		});
		$('#documentManage .editorarea').css('display','block');
	});
	
	//点击确定添加目录
	$('#documentManage .addcatalogueWindow .quedingadd').click(function(){
		var catalogName = $('#documentManage .addcatalogueWindow .catalogName').val();
		var catalogUrl = $("#catalogUrl").val();
		var	documentType = "0";
		if(catalogName == null || catalogName == ""){
			windowControl("请输入目录名");
		}else{
			$.ajax({
				data:{url:catalogUrl,catalogName:catalogName,docFlag:documentType},
				url:"../../document/addDocument.do?getMs="+getMS(),
				method:"post",
				success: function(data){
					$('#ddd').tree('reload');
					$('#documentManage .addcatalogueWindow .popuparea input[type=text]').val('');
					$('#documentManage .addcatalogueWindow').css('display','none');
				}
			})
		}
	})
	$('#ddd').tree({
		 onClick: function(node,e){
			 if(node.id != $("#catalogUrl").val()){
	        		$('#documentManage .editorarea').css('display','none');
	        	}
        	$("#catalogUrl").val(node.id);
        	$("#catalogUrl").attr("docFlag",node.attributes);
        	//select();
        	$('#documentManage .listForm .query').click();
	        },
	})
	/*$('#documentManage .listForm .toolbar .addDocument').click(function(){
		windowControl("发布功能暂定");
		//submit();
	});*/
	/*$('#documentManage .listForm .toolbar .saveDocument').click(function(){
		bianJi();
	});*/
	
   
   
});
/*目录*/
function addcatalogue(){
	$('#documentManage .addcatalogueWindow').css('display','block');
}
/*文件删除*/
function remove(){
	$('#documentManage .removeWindow').css('display','block');
}
/*文件修改*/
function edit(){
	$('#documentManage .editWindow').css('display','block');
}
//保存
function bianJi(){
    var text = UE.getEditor('myEditor').getContent();
    $.ajax({
    	data:{text:text,url:$("#catalogUrl").val(),titleName:$("#documentManage .editorarea input[name=titleName]").val()},
    	url:"../../document/updateText.do?getMs="+getMS(),
    	success:function(data){
    		if(data == 200){
    			windowControl('保存成功');
    		}else{
    			windowControl('保存失败');
    		}
    	},
    	error:function(err){
    		windowControl('服务器异常');
    	}
    })
}
//提交
function submit(){
	ui.confirm("是否确定发布公文",function(z){
        var text = UE.getEditor('myEditor').getContent();
        var catalogName = $('#ddd').tree('getSelected').text;
        var url = $("#catalogUrl").val();
        $.ajax({
        	data:{text:text,catalogName:catalogName,url:url,docFlag:"1"},
        	url:"../../document/addDocument.do?getMs="+getMS(),
        	method:"post",
        	success:function(data){
        		if(data == 200){
        			windowControl('保存成功');
        		}else{
        			windowControl('保存失败');
        		}
        	},
        	error:function(err){
        		windowControl('服务器异常');
        	}
        })
    },false);
}
function select(){
    /*$.ajax({
    		data:{url:$("#catalogUrl").val()},
     	url:"../../document/selectDocumentText.do?getMs="+getMS(),
     	method:"post",
     	success:function(data){
     		var obj = $.parseJSON(data);
     		$('#documentManage .lookdocument').html('');
     		$('#documentManage .lookdocument').css('display','block');
     		$('#documentManage .editorarea').css('display','none');
 			$('#documentManage .lookdocument').css({
 				'height':myEditorH+'px',
 				'width':myEditorW+'px',
 			});
     		if(obj[0]){
	        		$('#documentManage .lookdocument').html(obj[0].text);
     		 	$('#documentManage .listForm .toolbar .editDocument').click(function(){
     				$('#documentManage .lookdocument').css('display','none');
     				$('#documentManage .editorarea').css('display','block');
     	 			UE.getEditor('myEditor').setContent($('#documentManage .lookdocument').html());
     	 		});
     		}
     	},
     	error:function(err){
     		windowControl('服务器异常');
     	}
     }) */
 }