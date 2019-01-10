package com.mdoa.erp.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.constant.Constant;
import com.mdoa.erp.bo.ErpRegisterForm;
import com.mdoa.erp.service.ErpLoginService;
import com.mdoa.util.IdentifyCodeUtil.RandomValidateCode;

@RequestMapping("/ErpLogin")
@RestController
public class ErpLoginController {

	@Autowired
	private ErpLoginService erpLoginService;
	
	/**
     * 登录页面生成验证码
     */
    @RequestMapping("/getVerify.erp")
    public void getVerify(HttpServletRequest request, HttpServletResponse response){
        response.setContentType("image/jpeg");//设置相应类型,告诉浏览器输出的内容为图片  
        response.setHeader("Pragma", "No-cache");//设置响应头信息，告诉浏览器不要缓存此内容  
        response.setHeader("Cache-Control", "no-cache"); 
        response.setDateHeader("Expire", 0);
        RandomValidateCode randomValidateCode = new RandomValidateCode(); 
        try {
            randomValidateCode.getRandcode(request, response);//输出验证码图片方法  
        } catch (Exception e) {
            e.printStackTrace();
        } 
    }
    /**
     * 登录页面校验验证码
     */
    @RequestMapping("/checkVerify.erp")
    public boolean checkVerify(String inputStr, HttpSession session){
        //从session中获取随机数
        String random = (String) session.getAttribute("RANDOMVALIDATECODEKEY");
        if(random.equals(inputStr)){
            return true;//验证码正确
        }else{
            return false;//验证码错误
        }
    }
    /**
     * 客户登录
     */
    @RequestMapping("/customerLogin.erp")
    public String customerLogin(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
    	try {
    		if (erpRegisterForm.getFlag() == null && !checkVerify(erpRegisterForm.getInputStr(),request.getSession())) 
    			return Constant.DATA_ERROR_CODE;
    		List<ErpRegisterForm> list = erpLoginService.customerLogin(erpRegisterForm,request);
			Gson gson = new Gson();
			String jsonString = gson.toJson(list);
    		return jsonString;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
    }
    /**
     * 业务员登录
     */
    @RequestMapping("/salesmanLogin.erp")
    public String salesmanLogin(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
    	try {
    		System.out.println("flag="+erpRegisterForm.getFlag()+erpRegisterForm.getInputStr()+",session="+(String) request.getSession().getAttribute("RANDOMVALIDATECODEKEY"));
    		if (erpRegisterForm.getFlag() == null && !checkVerify(erpRegisterForm.getInputStr(),request.getSession())) 
    			return "300";
    		List<ErpRegisterForm> list = erpLoginService.salesmanLogin(erpRegisterForm,request);
    		Gson gson = new Gson();
			String jsonString = gson.toJson(list);
    		return jsonString;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
    }
    
    /**
     * 企业微信账号登录erp查询
     */
    @RequestMapping("/wxErpLogin.erp")
    public String wxErpLogin(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
    	try {
    		System.out.println("flag="+erpRegisterForm.getFlag()+erpRegisterForm.getInputStr()+",session="+(String) request.getSession().getAttribute("RANDOMVALIDATECODEKEY"));
    		List<ErpRegisterForm> list = erpLoginService.wxErpLogin(erpRegisterForm,request);
    		Gson gson = new Gson();
		String jsonString = gson.toJson(list);
    		return jsonString;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
    }
    
//    /**
//     * 业务员登录
//     */
//    @RequestMapping("/salesmanLogin.erp")
//    public String salesmanLogin(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
//    	try {
//    		System.out.println("flag="+erpRegisterForm.getFlag()+erpRegisterForm.getInputStr()+",session="+(String) request.getSession().getAttribute("RANDOMVALIDATECODEKEY"));
//    		if (erpRegisterForm.getFlag() == null && !checkVerify(erpRegisterForm.getInputStr(),request.getSession())) 
//    			return "300";
//    		List<ErpRegisterForm> list = erpLoginService.salesmanLogin(erpRegisterForm,request);
//    		Gson gson = new Gson();
//			String jsonString = gson.toJson(list);
//    		return jsonString;
//		} catch (RuntimeException e) {
//			e.printStackTrace();
//			return Constant.DATA_ERROR_CODE;
//		} catch (Exception e) {
//			e.printStackTrace();
//			return Constant.SERVER_ERROR_CODE;
//		}
//    } 
    
    /**
   	 * 清除缓存
   	 */
   	@RequestMapping("/removeSession.erp")
   	public void removeSession(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
   		try {
   			erpLoginService.removeSession(request);
   			System.out.println("数据库缓存清除成功");
   		} catch (Exception e) {
   			e.printStackTrace();
   		}
   	} 
}
