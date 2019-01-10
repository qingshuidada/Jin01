package com.mdoa.filter;

import java.io.IOException;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dom4j.DocumentException;

import com.mdoa.constant.WxSessionConstant;
import com.mdoa.weixin.util.MessageUtil;

import me.chanjar.weixin.common.session.StandardSessionManager;




public class WeixinFilter implements Filter{

	/**
     * Default constructor. 
     */
    public WeixinFilter() {
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
		System.out.println("用户访问url="+url);
		String lastUrl = url.substring(url.lastIndexOf("/"));
		/*if (lastUrl.equals("/createMenu.wx")) {
			chain.doFilter(request, response);
			return ;
		}*/
		if (url.indexOf("weixinCenter.wx") <= 0) {
			chain.doFilter(request, response);
			return ;
		}
		if (req.getMethod().equals("GET")) {
			System.out.println("请求跳转到="+"weixinLogin.wx");
			req.getRequestDispatcher("weixinLogin.wx").forward(req, resp);
			return ;
		}
		if (req.getMethod().equals("POST")) {
			if (WxSessionConstant.standardSessionManager == null) {
				synchronized(this){
					if (WxSessionConstant.standardSessionManager == null) {
						WxSessionConstant.standardSessionManager = new StandardSessionManager();
						WxSessionConstant.standardSessionManager.getSession("accessToken");
					}
				}
			}
			System.out.println("用户post访问");
			req.getRequestDispatcher("messageCenter.wx").forward(req, resp);
			return ;
		}
		chain.doFilter(request, response);
	}
	
	
	
	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}
}
