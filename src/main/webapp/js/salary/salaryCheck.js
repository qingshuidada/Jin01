$(function(){

	//登录
	$('#salaryCheck .loginBg .loginArea p .Login').click(function(){
		var password = $('#salaryCheck .loginBg .loginArea .loginPassword').val();
		if(password == ''||password == null){
			$("#salaryCheck .loginBg .loginArea p .errortishi .errorWords").text('口令为空');
        	$("#salaryCheck .loginBg .loginArea p .errortishi").show();
        	$('#salaryCheck .loginBg .loginArea .loginPassword').focus();
        	return;
		}else{
			//验证口令
			$.ajax({
                url : '../../salary/login.salary?getMs='+getMS(),
                data: {password:password},
                success:function(data){
                	if(data == 400||data == 500){
                		alert("口令错误！");
                	}else{
                		window.location.href='../salary/salaryManage/readData.html?';
                	}
                },
                error:function(err){
                }
            });
		}
	});
});

function getMS(){
	var date = new Date();
	return date.getTime();
}