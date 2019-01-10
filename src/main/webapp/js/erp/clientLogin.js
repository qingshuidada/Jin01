$(function(){
	//设置验证码
	$('#clientLogin .verificationCodeArea img').attr('src','/mdoa/ErpLogin/getVerify.erp');
	//登录
	$('#clientLogin .loginBg .loginArea p .Login').click(function(){
		var accent = $('#clientLogin .loginBg .loginArea .loginAccent').val();
		var password = $('#clientLogin .loginBg .loginArea .loginPassword').val();
		var typeFlag = 'client';
		if(accent == ''||accent ==  null){
			$(".loginBg .loginArea p .errortishi .errorWords").text('账户为空');
        	$(".loginBg .loginArea p .errortishi").show();
        	$('#clientLogin .loginBg .loginArea .loginAccent').focus();
        	return;
		}else if(password == ''||password == null){
			$(".loginBg .loginArea p .errortishi .errorWords").text('密码为空');
        	$(".loginBg .loginArea p .errortishi").show();
        	$('#clientLogin .loginBg .loginArea .loginPassword').focus();
        	return;
		}else{
			checkSum(accent,password,typeFlag);
		}
	});
});
function getVerify(ele){
	$(ele).parents('p').find('img').attr('src','/mdoa/ErpLogin/getVerify.erp?'+getMS());
}