package com.mdoa.base.controller;

import javax.servlet.http.HttpServletRequest;

import com.mdoa.security.session.PhSession;
import com.mdoa.security.session.SessionContainer;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.StringUtil;

public class BaseController {
	/**
	 * 获取当前登录的员工的信息
	 * @return
	 */
	protected UserInfo getUser(HttpServletRequest request){
		return (UserInfo)request.getSession().getAttribute("userInfo");
	}
	
	protected String catchException(Exception e){
		if(StringUtil.isEmpty(e.getMessage()))
			return "500";
		else
			return e.getMessage();
	}
	
	/**
	 * 获取当前的Session信息
	 * @param request
	 * @return
	 */
	protected PhSession getPhSession(HttpServletRequest request){
		String key = (String)request.getParameter("sessionId");
		PhSession session = SessionContainer.getSession(key);
		return session;
	}
}
