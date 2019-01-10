//获取毫秒数
function getMS(){
	var date = new Date();
	return date.getTime();
}
//是否是pc
function browserRedirect() {  
    var sUserAgent = navigator.userAgent.toLowerCase();  
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";  
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";  
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";  
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";  
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";  
    var bIsAndroid = sUserAgent.match(/android/i) == "android";  
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";  
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";  
    document.writeln("您的浏览设备为：");  
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {  
        return true;
    } else {  
        return false;
    }  
}
//比较验证码
function checkSum(accent,password,typeFlag){
    var inputStr = $(".loginBg .loginArea p .verificationCode").val();
    if(inputStr!=null && inputStr!=""){
        inputStr = inputStr.toUpperCase();//将输入的字母全部转换成大写
       /* $.ajax({
            url : '../../ErpLogin/checkVerify.do?getMs='+getMS(),
            data: {inputStr:inputStr},
            success : function(data) {
            	//console.log(data);
               if(data){*/ 
                	if(typeFlag == 'client'){
                		$.ajax({
                            url : '../../ErpLogin/customerLogin.erp?getMs='+getMS(),
                            data: {phoneNumber:accent,password:password,inputStr:inputStr},
                            success:function(data){
                            	if(data == 400||data == 500){
                            		$(".loginBg .loginArea p .errortishi .errorWords").text('密码或账户错误');
                                	$(".loginBg .loginArea p .errortishi").show();
                            	}else if(data == 300){
                            		$(".loginBg .loginArea p .errortishi .errorWords").text('验证码错误');
                                	$(".loginBg .loginArea p .errortishi").show();
                            	}else{
                            		data = $.parseJSON(data)[0];
                            		var account = encodeURI(encodeURI(data.customerName));
                            		var a = browserRedirect();
                            		if(a){
                            			window.location.href='erpWX/index.html?user='+account+'&flag='+0;
                            		}else{
                            			window.location.href='clientManage/orderQuery.html?user='+account+'&flag='+0;
                            		}
                            		
                            	}
                            },
                            error:function(err){
                            }
                        });
                	}else{
                		$.ajax({
                            url : '../../ErpLogin/salesmanLogin.erp?getMs='+getMS(),
                            data: {userAccount:accent,password:password,inputStr:inputStr},
                            success:function(data){
                            	if(data == 400||data == 500){
                            		$(".loginBg .loginArea p .errortishi .errorWords").text('密码或账户错误');
                                	$(".loginBg .loginArea p .errortishi").show();
                            	}else if(data == 300){
                            		$(".loginBg .loginArea p .errortishi .errorWords").text('验证码错误');
                                	$(".loginBg .loginArea p .errortishi").show();
                            	}else{
                            		data = $.parseJSON(data)[0];
                            		var account = encodeURI(encodeURI(data.salesmanName));
                            		var a = browserRedirect();
                            		if(a){
                            			window.location.href='erpWX/index.html?user='+account+'&flag='+1;
                            		}else{
                            			window.location.href='salesmanManage/salesmanQueryClient.html?user='+account+'&flag='+1;
                            		}
                            	}
                            },
                            error:function(err){
                            }
                        });
                	}
               /* }else{
                	$(".loginBg .loginArea p .verificationCode").val('');
                	$(".loginBg .loginArea p .verificationCode")[0].focus();
                	$(".loginBg .loginArea p .errortishi .errorWords").text("验证码输入错误");
                	$(".loginBg .loginArea p .errortishi").show();
                }
            }
        });*/
    }else{
    	$(".loginBg .loginArea p .verificationCode").val('');
    	$(".loginBg .loginArea p .verificationCode")[0].focus();
    	$(".loginBg .loginArea p .errortishi .errorWords").text("验证码输入错误");
    	$(".loginBg .loginArea p .errortishi").show();
    }
}