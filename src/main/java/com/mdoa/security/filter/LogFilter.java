package com.mdoa.security.filter;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.mdoa.security.annotation.ExistPermissions;
import com.mdoa.security.annotation.HasPermissions;
import com.mdoa.system.controller.SystemLogController;
import com.mdoa.system.dao.SystemDao;
import com.mdoa.system.model.SystemLog;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.HttpUtil;

public class LogFilter implements HandlerInterceptor{

	@Autowired
	private SystemLogController systemLogController;
	
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception arg3)
			throws Exception {
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView arg3)
			throws Exception {
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		boolean operaTab = request.getParameter("operaTab") != null && request.getParameter("operaTab") != "";
		boolean operaInfo = request.getParameter("operaInfo") != null && request.getParameter("operaInfo") != "";
		if (operaTab && operaInfo && !request.getParameter("operaTab").equals("进入") && !request.getParameter("operaTab").equals("退出")) {
			String ip = HttpUtil.getIpAddr(request);
			SystemLog systemLog = new SystemLog();
			systemLog.setOperaTab(request.getParameter("operaTab"));
			systemLog.setOperaInfo(request.getParameter("operaInfo"));
			systemLog.setIp(ip);
			systemLogController.addSystemLog(systemLog, request);
		}
		return true ;
	}
}
