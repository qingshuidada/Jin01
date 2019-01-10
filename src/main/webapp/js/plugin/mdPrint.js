/*
 * printObject ={
 *    url:          数据路径
 * 	  data:         访问的参数
 * 	  dom:          加载数据的地方 默认 $('.printWindow')
 * 	  lookDom:      加载查看数据的地方 $('.printLook')
 *    column:[
 * 				{
 * 					field:'sex',
 *					title:'性别',
 *					formatter:function(value,row,index){
 *					}
 *				}
 *			]				
 *					设置表头
 * 	  width: 1000       表格的宽度 默认值1000
 * 
 * 
 * }
 * 
*/
function setUpAdjustPrint(printObject){
	if(!printObject.dom){
		printObject.dom = $('.printWindow');
	}
	if(!printObject.width){
		printObject.width = 1000;
	}
	$.ajax({
		url:printObject.url,
		data:printObject.data,
		success:function(data){
			data = $.parseJSON(data).rows;
			var thStr = '';
			var inputStr = '';
			thStr += '<table class="table table-bordered printTable" data-resizable-columns-id="demo-table" style="max-width:'+printObject.width+'px;"><tr>';
			for(var i=0;i<printObject.column.length;i++){
				thStr += ' <th data-resizable-column-id="'+printObject.column[i].field+'" >'+printObject.column[i].title+'</th>';
				inputStr += '<input class="checkbox" style="width:13px" type="checkbox" checked column="'+i+'"/><span style="padding:0px 3px;">'+printObject.column[i].title+'<span>';
			}
			thStr += '</tr>';
			var len = data.length>20?20:data.length;
			for(var i=0;i<len;i++){
				thStr += '<tr>'
				for(var index in printObject.column){
					if(printObject.column[index].formatter){
						thStr += '<td>'+printObject.column[index].formatter(data[i][printObject.column[index].field],data[i],i)+'</td>';
					}else{
						if(data[i][printObject.column[index].field]=='0'){
							thStr += '<td>'+(data[i][printObject.column[index].field])+'</td>';
						}else{
							thStr += '<td>'+(data[i][printObject.column[index].field]||'')+'</td>';
						}
						
					}
				}
			}
			thStr += '</table>';
			printObject.dom.find('.container').html(inputStr+thStr);
			printObject.dom.show();
			printObject.dom.find('.printTable').resizableColumns({
		        store: store
		    });
			printObject.dom.find('.checkbox').change(function(){
				var column = Number($(this).attr('column'));
				if($(this).attr('checked')){
					printObject.dom.find('.popuparea .container th').eq(column).show();
					printObject.dom.find('.popuparea .container tr').find('td:nth-child('+(1+column)+')').show();
				}else{
					printObject.dom.find('.popuparea .container th').eq(column).hide();
					printObject.dom.find('.popuparea .container tr').find('td:nth-child('+(1+column)+')').hide();
				}
			});
		}
	});
}

function lookPrint(printObject){
	if(!printObject.lookDom){
		printObject.lookDom = $('.printLook');
	}
	$.ajax({
		url:printObject.url,
		data:printObject.data,
		success:function(data){
			data = $.parseJSON(data).rows;
			var thStr = '';
			var width = 0;
			thStr += '<table class="printTable" style="table-layout:fixed;"><tr>';
			for(var i=0;i<printObject.column.length;i++){
				width += printObject.dom.find('th').eq(i).width()+4;
				thStr +='<th style="width:'+(printObject.dom.find('th').eq(i).width()+4)+'px; data-resizable-column-id="'+i+'">'+printObject.column[i].title+'</th>';
			}
			thStr += '</tr>';
			for(var i=0;i<data.length;i++){
				thStr += '<tr>'
				var j = 0;
				for(var index in printObject.column){
					if(printObject.column[index].formatter){
						thStr += '<td style="width:'+(printObject.dom.find('th').eq(j).width())+'px;">'+printObject.column[index].formatter(data[i][printObject.column[index].field],data[i],i)+'</td>';
					}else{
						if(data[i][printObject.column[index].field]=='0'){
							thStr += '<td style="width:'+(printObject.dom.find('th').eq(j).width())+'px;">'+(data[i][printObject.column[index].field])+'</td>';
						}else{
							thStr += '<td style="width:'+(printObject.dom.find('th').eq(j).width())+'px;">'+(data[i][printObject.column[index].field]||'')+'</td>';
						}
						
					}
					j++;
				}
			}
			thStr += '</table>';
			printObject.lookDom.find('.printPopup').html(thStr);
			printObject.lookDom.find('.printPopup').css('width',(width+printObject.column.length+1)+'px');
			for(var i=0;i<printObject.column.length;i++){
				if(printObject.dom.find('th').eq(i).css('display') == 'none'){
					printObject.lookDom.find('.printPopup th').eq(i).hide();
					printObject.lookDom.find('.printPopup tr').find('td:nth-child('+(1+i)+')').hide();
				}
			}
			var w = printObject.lookDom.width();
			var h = printObject.lookDom.height();
			printObject.lookDom.css({
				'left':(wx-w)/2,
				'top':(wy-h)/2
			});
			printObject.lookDom.show();
		}
	});
}