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

import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.security.session.PhSession;
import com.mdoa.security.session.SessionContainer;
import com.mdoa.util.StringUtil;

public class LoginPhFilter implements Filter{

	/**
     * Default constructor. 
     */
    public LoginPhFilter() {
    }
	
    /**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
	}
	
	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletResponse resp = (HttpServletResponse)response;
		HttpServletRequest req = (HttpServletRequest)request;
		StringBuffer url = req.getRequestURL();
		resp.setHeader("Access-Control-Allow-Origin", "*");
		resp.setHeader("Access-Control-Allow-Methods", "POST");
		resp.setHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");
		String key = (String)req.getParameter("sessionId");
		PhSession session = SessionContainer.getSession(key);
		
		if(url.substring(url.length()-8).equals("login.ph") || url.substring(url.length()-8).equals("error.ph")){
			chain.doFilter(request, response);
		}else if(url.substring(url.length()-20).equals("checkBossPassword.ph") || url.substring(url.length()-24).equals("getEcoWorkshopTabData.ph") ){
			System.out.println("手机端访问：" + url);
			chain.doFilter(request, response);
		}else{
			if(StringUtil.isEmpty(key) || session == null){
				session = SessionContainer.createSession();
				request.setAttribute("sessionId", session.getSessionKey());
				JsonReturnObject jro = new JsonReturnObject();
				jro.setSessionId(session.getSessionKey());
				jro.setSuccess(false);
				jro.setMessage("您的登录已经过期，请重新登录");
				request.setAttribute("jsonReturnObject", jro);
				request.getRequestDispatcher("/phUser/error.ph").forward(request, response);
			}else if(session.getAttribute("userInfo") == null){
				JsonReturnObject jro = new JsonReturnObject();
				jro.setSessionId(session.getSessionKey());
				jro.setSuccess(false);
				jro.setMessage("您的登录已经过期，请重新登录");
				request.setAttribute("jsonReturnObject", jro);
				request.getRequestDispatcher("/phUser/error.ph").forward(request, response);
			}else{
				chain.doFilter(request, response);
			}
		}
		
	}

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}
}
