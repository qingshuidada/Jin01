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

import com.mdoa.constant.FileConstant;

public class LoginSalaryFilter implements Filter{

    /**
     * Default constructor. 
     */
    public LoginSalaryFilter() {
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest)request;
		HttpServletResponse resp = (HttpServletResponse)response;
		//获取访问的url
		String url = req.getRequestURL().toString();
		System.out.println("用户访问salary:"+url);
		
		//获取url中的最后一段
		String lastUrl = url.substring(url.lastIndexOf("/"));
		
		if(url.indexOf("salary/check") > 0 && "/check".equals(lastUrl)){
			String respUrl = "html/salary/salaryCheck.html";
			int length = url.split("/").length;
			for(int i = 0; i< length - 5 ; i++){
				respUrl = "../" + respUrl;
			}
			resp.sendRedirect(respUrl);
			return;
		}
		
		//如果是口令验证页面或是验证接口则放行
		if("/salaryCheck.html".equals(lastUrl)|| "/login.salary".equals(lastUrl) ){
			chain.doFilter(request, response);
			return;
		}
		//判断最后访问的是否是html，如果是html则进行拦截
		HttpSession session = req.getSession();
		String salaryPassword = (String) session.getAttribute("salaryPassword");
		if(!FileConstant.SALARY_PASSWORD.equals(salaryPassword)){
			System.out.println("用户非法访问--ip:"+req.getHeader("x-forwarded-for"));
			System.out.println("用户非法访问--url:"+url);
			//定义跳转的页面Url
			String respUrl = "html/salary/salaryCheck.html";
			int length = url.split("/").length;
			for(int i = 0; i< length - 5 ; i++){
				respUrl = "../" + respUrl;
			}
			resp.sendRedirect(respUrl);
			return;
		}
		chain.doFilter(request, response);
	}
	
	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
	}
	
	
}
