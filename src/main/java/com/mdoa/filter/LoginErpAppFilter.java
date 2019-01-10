package com.mdoa.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.security.session.PhSession;
import com.mdoa.security.session.SessionContainer;
import com.mdoa.util.StringUtil;

public class LoginErpAppFilter implements Filter{

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest)request;
		HttpServletResponse resp = (HttpServletResponse)response;
		resp.setHeader("Access-Control-Allow-Origin", "*");
		resp.setHeader("Access-Control-Allow-Methods", "POST");
		resp.setHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");
		String key = (String)req.getParameter("sessionId");
		PhSession session = SessionContainer.getSession(key);
		//获取访问的url
		String url = req.getRequestURL().toString();
		System.out.println("用户访问erp:"+url);
		//获取url中的最后一段
		String lastUrl = url.substring(url.lastIndexOf("/"));
		//如果访问的页面为登录页面，则放行
		if(lastUrl.equals("/salesmanLogin.app") || lastUrl.equals("/customerLogin.app")){
			chain.doFilter(request, response);
			return ;
		}else{
			if(StringUtil.isEmpty(key) || session == null){
				session = SessionContainer.createSession();
				request.setAttribute("sessionId", session.getSessionKey());
				JsonReturnObject jro = new JsonReturnObject();
				jro.setSessionId(session.getSessionKey());
				jro.setSuccess(false);
				jro.setMessage("您的登录已经过期，请重新登录");
				request.setAttribute("jsonReturnObject", jro);
				request.getRequestDispatcher("/loginAppErp/error.app").forward(request, response);
			}else{
				chain.doFilter(request, response);
			}
		}
		
		
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	
}
