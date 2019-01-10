$(function(){
	//设置验证码
	$('#salesmanLogin .verificationCodeArea img').attr('src','/mdoa/ErpLogin/getVerify.erp');
	//登录
	$('#salesmanLogin .loginBg .loginArea p .Login').click(function(){
		var accent = $('#salesmanLogin .loginBg .loginArea .loginAccent').val();
		var password = $('#salesmanLogin .loginBg .loginArea .loginPassword').val();
		var typeFlag = 'salesman';
		if(accent == ''||accent ==  null){
			$(".loginBg .loginArea p .errortishi .errorWords").text('账户为空');
        	$(".loginBg .loginArea p .errortishi").show();
        	$('#salesmanLogin .loginBg .loginArea .loginAccent').focus();
        	return;
		}else if(password == ''||password == null){
			$(".loginBg .loginArea p .errortishi .errorWords").text('密码为空');
        	$(".loginBg .loginArea p .errortishi").show();
        	$('#salesmanLogin .loginBg .loginArea .loginPassword').focus();
        	return;
		}else{
			checkSum(accent,password,typeFlag);
		}
	});
});
function getVerify(ele){
	$(ele).parents('p').find('img').attr('src','/mdoa/ErpLogin/getVerify.erp?'+getMS());
}