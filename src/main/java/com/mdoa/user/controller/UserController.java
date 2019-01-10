package com.mdoa.user.controller;

import java.io.IOException;
import java.util.Set;

import javax.management.RuntimeErrorException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.util.StringUtil;
import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.constant.Constant;
import com.mdoa.user.model.UserInfo;
import com.mdoa.user.service.UserService;
import com.mdoa.util.Md5Util;


@Controller
@RequestMapping("/user")
public class UserController extends BaseController{
	
	@Autowired
	private UserService userService;
	
	@ResponseBody
	@RequestMapping("/login.do")
	public String login(UserInfo userInfo, String reamberMe, HttpServletRequest request, HttpServletResponse response){
		try{
			Gson gson = new Gson();
			Cookie cookies1[] = request.getCookies();
			System.err.println(gson.toJson(cookies1));
			userService.login(userInfo, request);
			if("1".equals(reamberMe)){
				Cookie userAccountCookie = new Cookie("userAccount",userInfo.getUserAccount());
				Cookie passwordCookie = new Cookie("password",Md5Util.getMd5Str(userInfo.getPassword()));
				passwordCookie.setPath("/");
				userAccountCookie.setPath("/");
				response.addCookie(userAccountCookie);
				response.addCookie(passwordCookie);
				System.out.println("添加进cookie");
			}else{
				Cookie[] cookies = request.getCookies();
				if(cookies != null){
					for (Cookie cookie : cookies) {
						Cookie cookie2 = new Cookie(cookie.getName(),"");
						cookie2.setPath("/");
						cookie2.setMaxAge(0);
						response.addCookie(cookie2);
					}
				}
			}
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@ResponseBody
	@RequestMapping("/remaber.do")
	public void remaber(HttpServletRequest req, HttpServletResponse resp) throws IOException{
		String url = "" + req.getRequestURL();
		System.out.println("建立了="+url);
		try{
			Cookie[] cookies = req.getCookies();
			UserInfo userInfo = new UserInfo();
			for(Cookie cookie : cookies){
				if(cookie.getName().equals("userAccount"))
					userInfo.setUserAccount(cookie.getValue());
				if(cookie.getName().equals("password"))
					userInfo.setPassword(cookie.getValue());
			}
			if(StringUtil.isNotEmpty(userInfo.getUserAccount()) && StringUtil.isNotEmpty(userInfo.getPassword())){
				System.out.println("2");
				userService.loginMd5(userInfo, userInfo.getPassword(), req);
				String respUrl = (String)req.getAttribute("sendUrl");
				System.out.println("ress="+respUrl);
				resp.sendRedirect(respUrl);
			}else{
				 String respUrl = "/mdoa/html/user/login.html";
				resp.sendRedirect(respUrl);
			}
		}catch(Exception e){
			e.printStackTrace();
			String respUrl = "html/user/login.html";
			int length = url.split("/").length;
			for(int i = 0; i< length - 4 ; i++){
				respUrl = "../" + respUrl;
			}
			resp.sendRedirect(respUrl);
		}
	}
	
	
	/**
	 * 修改密码
	 * @param newPassword
	 */
	@ResponseBody
	@RequestMapping("/updatePassword.do")
	public String updatePassword(String oldPassword,String newPassword, HttpServletRequest request){
		try{
			//Subject subject = SecurityUtils.getSubject();
			UserInfo userInfo = getUser(request);
			String nowPassword=userInfo.getPassword();
			userService.updatePassword(oldPassword,newPassword,nowPassword,userInfo.getUserId(), request);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	
	/**
	 * 获取用户的权限接口
	 */
	@ResponseBody
	@RequestMapping("getPermissions.do")
	public String getPermissions(HttpServletRequest request){
		try{
			UserInfo userInfo = getUser(request);
			Set<String> set = userInfo.getPermissions();
			Gson gson = new Gson();
			return gson.toJson(set);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 获取用户的权限接口
	 */
	@ResponseBody
	@RequestMapping("getUserInfo.do")
	public String getUserInfo(HttpServletRequest request){
		try{
			UserInfo userInfo = getUser(request);
			Gson gson = new Gson();
			return gson.toJson(userInfo);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 退出登录
	 */
	@ResponseBody
	@RequestMapping("/outLogin.do")
	public String outLogin(HttpServletRequest request,HttpServletResponse response){
		try {
			request.setAttribute("userInfo", null);
			Cookie cookies[] = request.getCookies();
			for (Cookie cookie : cookies) {
				Cookie cookie2 = new Cookie(cookie.getName(),"");
				cookie2.setPath("/");
				cookie2.setMaxAge(0);
				response.addCookie(cookie2);
			}
			return Constant.SUCCESS_CODE;
		} catch (Exception e) {
			return Constant.SERVER_ERROR_CODE;
		}
		
	}
}
