$(function(){
	$('#knowLook').css('height',$('#loadarea').height()-31);
	$('#knowLook .writeComment .commentReport').click(function(){
		var content = $.trim($('#knowLook .writeComment textarea').val());
		var docId = $('#knowLook .knowContent').attr('docId');
		if((content != null || content != '')&& docId ){
			$.ajax({
				data:{content:content,docId:docId},
				url:'../../know/saveComment.do?getMs='+getMS(),
				success:function(data){
					if(data == 200){
						addText(toKnowLookDocId,false);
					}
					$('#knowLook .writeComment textarea').val('');
				}
			});
		}
	});
});
if(toKnowLookDocId){
	addText(toKnowLookDocId);
}
//加载知识文档和评论
function addText(toKnowLookDocId,flag){
   	flag = flag || true;
	$.ajax({
		data:{docId:toKnowLookDocId},
		url:'../../know/queryDocDetail.do?getMs='+getMS(),
		success:function(data){
			list = $.parseJSON(data).list;
			if(flag){
				data = $.parseJSON(data).pageModel.rows[0];
				$('#knowLook .knowContent').html(data.text);
				$('#knowLook .knowContent').attr('docId',toKnowLookDocId);
				$('#knowLook .knowTitle .content').text(data.titleName);
				$('#knowLook .knowCategory .content').text(data.firstCategoryName+' '+data.secondCategoryName);
				$('#knowLook .knowData .clickAmount .content').text(data.clickAmount);
				$('#knowLook .knowData>.content').text(data.createUserName);
			}
			var str = '';
			for(var i=0;i<list.length;i++){
				str += '<div class="oneComment"><h3>'
					+list[i].commentUserName+'</h3><div class="commentCon">'
					+list[i].content+'</div></div>';
			}
			$('#knowLook .comment').html(str);
		}
	});
}