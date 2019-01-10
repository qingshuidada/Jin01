/**
 * 一、拓展jquery的方法
 * 二、根据用户传过来的参数渲染table（独立，页面可渲染多个）
 * 三、根据用户传过来的参数，做不定数的固定表头
 * 四、可分页（根据pageSize查询 total总数）
 * 用户传过来的参数为option对象
 * 事件源ele
 *
 */
$.fn.mddatagrid = function(options){
	var defaults = {
		//默认值，可添加
		fClumnWidth:40,
		sClumnWidth:60,
	}
	var options = $.extend(defaults, options);//用户参数
	var ele = this.selector;
	//画表头
	drawThead(ele,options);
	//获取数据
	getdata(ele,options,1);
};
//画表头
function drawThead(ele,options){
	var element = $(ele);
	var fThead = '<div style="float:left;width:'+ options.fClumnWidth +'%;overflow-x:scroll;">'+
					'<table cellspacing="1" cellpadding="0" border="0" class="fTable"><thead><tr><th>&nbsp;</th>';
	var sThead = '<div style="float:left;width:'+ options.sClumnWidth +'%;overflow-x:scroll;">'+
					'<table cellspacing="1" cellpadding="0" border="0" class="sTable"><thead><tr>';
	var	fListClumn = options.fClumn;
	var sListClumn = options.sClumn;
	for(var th in fListClumn)
		fThead += '<th>'+ fListClumn[th].title +'</th>';
	for(var th in sListClumn)
		sThead += '<th>'+ sListClumn[th].title +'</th>';
	fThead += '</tr></thead></table></div>';
	sThead += '</tr></thead></table></div>';
	element.html(fThead+sThead);
}
//获取数据
function getdata(ele,options,pageSize){
	var data = options.queryParams || {};
	data.page = pageSize;
	data.rows = options.rowsLenght;
	$.ajax({
		url:options.url,
		data:data,
		async:true,
		type:'POST',
		dataType:'json',
		success:function(data){
			//画table,画分页			
			if(options.sumUrl){//是否合计
				$.ajax({
					url:options.sumUrl,
					async:true,
					type:'POST',
					dataType:'json',
					success:function(obj){
						//画合计
						drawTable(ele,options,data,obj);
					},
					error:function(){
						//请求出错处理
					}
				})
			}else{				
				drawTable(ele,options,data,null);
			}
		},
		error:function(){
			//请求出错处理
		}
	})
	
}

//画table,画分页
function drawTable(ele,options,data,obj){
	var dataList = data.rows;
	var element = $(ele);
	var	fListClumn = options.fClumn;
	var sListClumn = options.sClumn;

	var fTbody = '<tbody>';
	var sTbody = '<tbody>';
	for(var i=0 ; i<dataList.length ; i++){
		fTbody += '<tr><td>'+ (i+1) +'</td>';
		sTbody += '<tr>';
		for(var j in fListClumn){
			if(fListClumn[j].formatter){
				fTbody += '<td>'+ fListClumn[j].formatter(dataList[i][fListClumn[j].fileds],dataList[i],i) +'</td>';
			}else{
				var A = dataList[i][fListClumn[j].fileds] || '&nbsp;';
				fTbody += '<td>'+ A +'</td>';
			}								
		};
		for(var j in sListClumn){
			if(sListClumn[j].formatter){
				sTbody += '<td>'+ sListClumn[j].formatter(dataList[i][sListClumn[j].fileds],dataList[i],i) +'</td>';
			}else{
				var B = dataList[i][sListClumn[j].fileds] || '&nbsp;';
				sTbody += '<td>'+ B +'</td>';
			}				
		};
		fTbody += '</tr>';
		sTbody += '</tr>';
	};
	if(obj != null){
		//合计
		fTbody += '<tr><td>合计</td>';
		sTbody += '<tr>';
		for(var j in fListClumn){
			var a = obj[fListClumn[j].sumFileds] || '';
			fTbody += '<td>'+ a +'</td>';			
		};
		for(var j in sListClumn){
			var a = obj[sListClumn[j].sumFileds] || '';
			sTbody += '<td>'+ a +'</td>';
		};
		fTbody += '</tr>';
		sTbody += '</tr>';	
	}	
	fTbody += '</tbody>';
	sTbody += '</tbody>';
	var totalPage = Math.ceil(Number(data.total)/options.rowsLenght);//共有多少页
	if(data.rows.length>0){
		var pageHtml = '<div class="page"><ul>'+
		'<li><a href="javascript:;" class="first">第一页</a></li>'+
		'<li><a href="javascript:;" class="prev">上一页</a></li>'+
		'<li><input type="text" value="'+ data.page +'" class="skip" /></li>'+
		'<li><a href="javascript:;" class="next">下一页</a></li>'+
		'<li><a href="javascript:;"  class="last">尾页</a></li>'+
		'<li>共'+ totalPage +'页</li>'+
		'</ul></div>';
		
		element.find('.page').remove();
		element.append(pageHtml);
		
		//首页
		element.find('.page .first').on('click',function(){		
			getdata(ele,options,1);
		})
		//上一页
		element.find('.page .prev').on('click',function(){
			if(data.page > 1){
				getdata(ele,options,data.page-1);
			}else{
				alert('已经是第一页了!');
			}
		})
		//下一页
		element.find('.page .next').on('click',function(){
			if(data.page < totalPage){
				getdata(ele,options,data.page+1);
			}else{
				alert('已经是最后一页了!');
			}
			
		})
		//尾页
		element.find('.page .last').on('click',function(){		
			getdata(ele,options,totalPage);
		})
		//跳转
		element.find('.page .skip').on('change',function(){
			var pageSize = $(this).val();
			if(pageSize > totalPage){
				getdata(ele,options,totalPage);
			}else{
				getdata(ele,options,pageSize);
			}
		})
	}
	element.find('.fTable tbody').remove();
	element.find('.sTable tbody').remove();
	element.find('.fTable').append(fTbody);
	element.find('.sTable').append(sTbody);
}

//


