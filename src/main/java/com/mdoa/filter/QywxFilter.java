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

public class QywxFilter implements Filter {

	/**
	 * Default constructor.
	 */
	public QywxFilter() {
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
		HttpServletResponse resp = (HttpServletResponse) response;
		HttpServletRequest req = (HttpServletRequest) request;
		StringBuffer url = req.getRequestURL();
		System.out.println("用户访问url=" + url);
		if (url.indexOf("wxClock.qywx") <= 0 && url.indexOf("wxReport.qywx") <= 0 && url.indexOf("wxErp.qywx") <= 0) {
			chain.doFilter(request, response);
			return;
		}
		if (req.getMethod().equals("GET")) {
			if(url.lastIndexOf("wxClock.qywx") > -1){
				System.out.println("请求跳转到" + "wxClockCheck.qywx");
				req.getRequestDispatcher("wxClockCheck.qywx").forward(req, resp);
			}
			if(url.lastIndexOf("wxReport.qywx") > -1){
				System.out.println("请求跳转到" + "wxReportCheck.qywx");
				req.getRequestDispatcher("wxReportCheck.qywx").forward(req, resp);
			}
			if(url.lastIndexOf("wxErp.qywx") > -1){
				System.out.println("请求跳转到" + "wxErpCheck.qywx");
				req.getRequestDispatcher("wxErpCheck.qywx").forward(req, resp);
			}
			return;
		}
		if (req.getMethod().equals("POST")) {
			if(url.lastIndexOf("wxClock.qywx") > -1){
				System.out.println("请求跳转到=" + "clickListener.qywx");
				req.getRequestDispatcher("clickListener.qywx").forward(req, resp);
			}
			if(url.lastIndexOf("wxReport.qywx") > -1){
				System.out.println("请求跳转到" + "reportClickListener.qywx");
				req.getRequestDispatcher("reportClickListener.qywx").forward(req, resp);
			}
			if(url.lastIndexOf("wxErp.qywx") > -1){
				System.out.println("请求跳转到" + "erpClickListener.qywx");
				req.getRequestDispatcher("erpClickListener.qywx").forward(req, resp);
			}
			return;
		}
		chain.doFilter(request, response);
	}

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
	}
}
