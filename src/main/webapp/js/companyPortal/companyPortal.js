$(function(){
	$('#companyPortal .companyMain').css('height',$('#loadarea').height()-31+"px");
	$('#companyPortal .companyContent').css('height',$('#loadarea').height()-31+"px");
	$('#companyPortal .companyBanner .imgnum div').eq(0).addClass('onselect');
	$('#companyPortal .companyBanner .img img').eq(0).css('opacity','1');
	//banner
	$('#companyPortal .companyBanner .imgnum div').hover(function(){
		$(this).addClass('onselect');
		$(this).siblings('div').removeClass('onselect');
	});
	lala();
	//
	//
	$('#companyPortal .moduleBox .slideDown').click(function(){
		var dom = $(this).parents('.moduleBox');
		var that = $(this);
		if(that.attr('class') == 'slideDown'){
			dom.animate({
				'height':"23px"
			},300,function(){
				that.removeClass('slideDown').addClass('slideUp');
			});
		}else{
			dom.animate({
				'height':47+dom.find('.contentArea').height()+'px',
			},300,function(){
				that.removeClass('slideUp').addClass('slideDown');
			});
		}
		
	});
	
	//返回
	$('#companyPortal .companyContent .back').click(function(){
		$('#companyPortal .companyMain').show();
		$('#companyPortal .companyContent').hide();
	})
	
});
//产生文档
function createDocumnet(id){
	var docStr = '';
	$.ajax({
		url:'../../know/queryDoc.do?getMs='+getMS(),
		data:{secondCategoryId:id,typeFlag:1},
		success:function(data){
			data = $.parseJSON(data).rows;
			for(var i=0;i<data.length;i++){
				docStr += '<p id="'+data[i].docId+'" onclick="lookCompanyDoc(this)">'+(i+1)+'.'+data[i].titleName+'</p>';
			}
			$('.'+id).append(docStr);
		}
	})
}
//加载
$.ajax({
	 data:{openness:'1'},
	 url:'../../know/queryFirstAndSecondCategory.do?getMs='+getMS(),
	 type:'post',
	 success:function(data){
		 console.log(data);
		 data = $.parseJSON(data).rows;
		 var fristStr = '';
		 var len = 0;
		 var secondStr = '';
		 var thirdStr = '';
		 for( var i = 0;i< data.length;i++){
			 fristStr += '<div class="moduleBox"><div class="title"><i></i>'
				 +	'<h2>'+data[i].firstCategoryName+'</h2>'
				 +	'<span title="刷新" class="refresh"></span>'
				 +	'<span class="slideDown"></span></div>';
			 secondStr = '<ul>';
			 thirdStr = '<div class="contentArea">';
			 if(data[i].list){
				 len = data[i].list.length;
				 for(var j=0;j<len;j++){
					 if(j==0){
						 secondStr += '<li class="now">'+data[i].list[j].secondCategoryName+'</li>';
						 thirdStr += '<div class="on '+data[i].list[j].secondCategoryId+'"></div>';
					 }else{
						 secondStr += '<li>'+data[i].list[j].secondCategoryName+'</li>';
						 thirdStr += '<div class="'+data[i].list[j].secondCategoryId+'"></div>';
					 } 
					 createDocumnet(data[i].list[j].secondCategoryId)
				 }
			 }
			 fristStr += secondStr +'</ul>'+thirdStr+'</div>';
			 fristStr +='</div>';
		 }
		 $('#companyPortal .companyMain').append(fristStr);
		 $('#companyPortal .moduleBox:last').css('margin-bottom','30px')
		 $('#companyPortal .moduleBox ul li').click(function(){
			var dom = $(this).parent().next();
			$(this).css('color','rgb(3, 122, 207)');
			$(this).siblings('li').css('color','rgb(189, 189, 189)');
			var index = $(this).index();
			dom.find('div').eq(index).css('display','block').siblings('div').css('display','none');
		});
		 $('#companyPortal .moduleBox .slideDown').click(function(){
			var dom = $(this).parents('.moduleBox');
			var that = $(this);
			if(that.attr('class') == 'slideDown'){
				dom.animate({
					'height':"23px"
				},300,function(){
					that.removeClass('slideDown').addClass('slideUp');
				});
			}else{
				dom.animate({
					'height':47+dom.find('.contentArea').height()+'px',
				},300,function(){
					that.removeClass('slideUp').addClass('slideDown');
				});
			}
			
		});
	 },
	 error:function(data){
		 
	 }
});
//
function lookCompanyDoc(ele){
	var docId = $(ele).attr('id');
	$.ajax({
		url:'../../know/queryDocDetail.do?getMs='+getMS(),
		data:{docId:docId},
		success:function(data){
			list = $.parseJSON(data).list;
			data = $.parseJSON(data).pageModel.rows[0];
			$('#companyPortal .companyContent .knowContent').html(data.text);
			$('#companyPortal .companyContent .knowContent').attr('docId',docId);
			$('#companyPortal .companyContent .knowTitle .content').text(data.titleName);
			$('#companyPortal .companyContent .knowCategory .content').text(data.firstCategoryName+' '+data.secondCategoryName);
			$('#companyPortal .companyContent .knowData .clickAmount .content').text(data.clickAmount);
			$('#companyPortal .companyContent .knowData>.content').text(data.createUserName);
			var str = '';
			for(var i=0;i<list.length;i++){
				str += '<div class="oneComment"><h3>'
					+list[i].commentUserName+'</h3><div class="commentCon">'
					+list[i].content+'</div></div>';
			}
			$('#companyPortal .companyContent .comment').html(str);
			$('#companyPortal .companyMain').hide();
			$('#companyPortal .companyContent').show();
		}
	});
		
}
//banner 定时器
function lala(){
	var i = 1;
	var len = $('#companyPortal .companyBanner .imgnum div').length;
	var timer = setInterval(function(){
		if(i == len){
			i = 0;
		}
		$('#companyPortal .companyBanner .imgnum .onselect').removeClass('onselect');
		$('#companyPortal .companyBanner .imgnum div').eq(i).addClass('onselect');
		$('#companyPortal .companyBanner .img img').css('opacity','0');
		$('#companyPortal .companyBanner .img img').eq(i).animate({
			'opacity':'1',
		},100);
		i++;
	},3000);
}