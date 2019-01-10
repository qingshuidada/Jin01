var phone_form = {};

/**
 * 参数对象模板
 */
phone_form.templateObj = {
	dom:'#aa',//
	title:'填写表单',//表单的标题
	queryUrl:'',//查询信息使用的地址，如果为空则不进行信息的查询
	queryParams:{//进行查询时所携带的参数，可以不进行设置
		userId:'userid'
	},
	id:{//进行提交表单的时候所带的id，该值可以不设定
		name:'userId',
		value:'12345'
	},
	colums:[//列的数组
	    {
			name:'userName', //该字段的数据库名，必填项
			columName:'工作时间',//显示在左侧的字段的名称
			defaultValue:'无名',//默认值，如果不填则为空
			must:false,//是否为必填项，如果为必填项，则在未填写时，会弹出提示 默认值为 false
			readOnly:true,//是否为只读，如果为只读形式则无法进行修改 默认值是 false
			verify:function(value){//验证value值的方式，返回值为true或者false，如果该项为空则进行自定义验证
				if(value == ''){
					return false;
				}else{
					return true;
				}
			},
			type:'String',//输入的类型，当为String字符类型时，不做任何处理，在进行其他处理时需要进行处理，比如date日期。
			lookType:'look',//显示类型，look：仅查看，input：以input的形式进行显示，可操作，textarea：文本框形式
			show:true, //是否进行显示，默认值为true
	    }
	],
	type:'post',//对象进行提交时的类型设置
	submitUrl:'www.baidu.com',//提交表单的地址
	data:{//提交数据时的表单信息外的额外信息，被从后台查询出来的数据不会进行提交
		testData:'123456'
	},
	check:{//自定义的选择方式，如果不定义则会使用默认的方法进行选择，如时间
		Date:function(){//自定义时间选择
			alert("自定义的时间选择");
		},
		user:function(){//自定义的用户选择
			
		}
	}
}

//创建填写用表单
phone_form.createForm = function(plugin){
	var dom = $(plugin.dom);
	var out = $('<div>');
	out.attr('class','form-out');
	out.css('border-radius',dom.width()*0.01+'px');
	dom.html(out);
	dom = dom.find(':first');
	if(plugin.title){
		dom.append('<div class="form-middle">'+plugin.title+'</div>');
		dom.append('<div class="form-hr-solid"></div>');
	}
	
	var lookArray = [];
	
	for(var i = 0; i < plugin.colums.length ; i++){
		var colum = plugin.colums[i];
		
		var middle = $("<div >");
		middle.attr('class','form-middle');
		if(colum.show == false){
			middle.css('display', 'none');
		}
		var interior_left = $("<div >");
		interior_left.html(colum.columName);
		interior_left.attr('class','form-interior-left');
		middle.append(interior_left);
		
		var interior_right = $("<div >");
		interior_right.attr('name',colum.name);
		interior_right.attr('class','form-interior-right');
		if(colum.lookType == 'look' || colum.lookType == null){
			interior_right.append(colum.defaultValue);
			lookArray.push(colum.name);
		}else if(colum.lookType == 'input'){
			var input = $('<input>');
			input.attr('name', colum.name);
			input.attr('value', colum.defaultValue);
			input.attr('class', 'form-input');
			if(colum.readonly == true){
				input.attr('readonly', 'readonly');
			}
			interior_right.append(input);
			if(colum.type == 'Date'){
				if(plugin.check.Date){
					input.click(function(){
						plugin.check.Date(this);
					});
				}else{
					input.click(function(){
						phone_form.defualtCheck.Date(this);
					});			
				}
			}
		}else if(colum.lookType == 'text'){
			var textarea = $('<textarea>');
			textarea.attr('name', colum.name);
			textarea.attr('value', colum.value);
			textarea.attr('class', 'form-input');
			if(colum.readonly == true){
				input.attr('readonly', 'readonly');
			}
			interior_right.append(textarea);
		}
		middle.append(interior_right);
		
		dom.append(middle);
		
		if(i != plugin.colums.length - 1 && colum.show == true)
			dom.append('<div class="form-hr-solid"></div>');
	}
	//填入数据
	if(plugin.queryUrl){
		$.ajax({
			type: 'post',
			url: plugin.queryUrl,
			data: plugin.queryParam,
			success: function(data){
				var obj = eval('(' + data + ')').rows[0];
				for(name in lookArray){
					var target = dom.find('div[name='+name+']');
					target.html(obj[name]);
				}
			}
		})
	}
}


//提交填写用表单
phone_form.submit = function(submit){
	if(!submit.type){
		submit.type = "post";
	}
	//进行data数据的深层次复制，以防止原本的参数对象造成影响
	var data = {};
	for(item in submit.data){
		data[item] = submit.data[item];
	}
	//获取dom节点，然后对在前面定义的字段进行处理
	var dom = $(submit.dom);
	for(var i = 0 ; i < submit.colums.length ; i++){
		var colum = submit.colums[i];
		//获取input框或者是textarea，如果均为空，则不提交该数据到后台
		var input = dom.find('input[name='+colum.name+']');
		var textarea = dom.find('textarea[name='+colum.name+']');
		var value = null;
		if(input.val()){
			value = input.val();
		}else if(textarea.val()){
			value = textarea.val();
		}else{
			continue ;
		}
		//如果必填项为true则进行验证是否为空，然后提示某列信息不能为空
		if(colum.must == true){
			if(!value){
				alert(colum.columName + "不能为空");
				return ;
			}
		}
		//采用自定义的字段验证方式进行验证，最后的返回值为true或者false，如果出现false，则终止方法
		if(colum.verify){
			if(!colum.verify(value))
				return ;
		}
		//将数据填充到data中
		data[colum.name] = value;
	}
	//验证是否存在id，如果存在则填入data中，不存在则跳过
	if(submit.id){
		data[submit.id.name] = submit.id.value;
	}
	//实际进行数据的提交处理
	$.ajax({
		type: 'post',
		url: submit.submitUrl,
		data: data,
		success:function(data){
			if(data == 200){
				alert("表单提交成功");
			}else{
				alert("表单提交失败");
			}
		},
		error:function(){
			alert("未响应");
		}
	})
}

phone_form.defualtCheck = {};

//默认的日期类型选择
phone_form.defualtCheck.Date = function(dom){
	alert("选择日期");
}

//默认的用户类型选择
phone_form.defualtCheck.User = function(dom){
	
}
