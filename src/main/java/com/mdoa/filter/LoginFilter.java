package com.mdoa.filter;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

import com.github.pagehelper.util.StringUtil;
import com.mdoa.user.model.UserInfo;
import com.mdoa.user.service.UserService;

/**
 * Servlet Filter implementation class LoginFilter
 */
@Resource
public class LoginFilter implements Filter {
	
	@Autowired
	private UserService userService;

    /**
     * Default constructor. 
     */ 
    public LoginFilter() {
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
		resp.setHeader("Access-Control-Allow-Origin", "*");
		resp.setHeader("Access-Control-Allow-Methods", "POST");
		resp.setHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");
		//获取访问的url
		String url = req.getRequestURL().toString();
		System.out.println("loginUrl="+url);
		//获取url中的最后一段
		String lastUrl = url.substring(url.lastIndexOf("/"));
		if(url.indexOf("/html/salary") >= 0){
			chain.doFilter(request, response);
			return ;
		}
		if(url.indexOf("/html/erp") >= 0 && url.indexOf("/html/erp/erpRegister") < 0){
			chain.doFilter(request, response);
			return ;
		}
		if(url.indexOf("/html/dist/") >= 0 || url.indexOf("/html/qywx/") >= 0){
			chain.doFilter(request, response);
			return ;
		}
		if(lastUrl.equals("/login")){
			System.out.println("用户登录访问--ip:"+req.getHeader("x-forwarded-for"));
			String respUrl = "html/user/login.html";
			int length = url.split("/").length;
			for(int i = 0; i< length - 5 ; i++){
				respUrl = "../" + respUrl;
			}
			resp.sendRedirect(respUrl);
			return ;
		}
		//如果访问的页面为登录页面，则放行
		if(lastUrl.equals("/login.html") || lastUrl.equals("/login.do") || lastUrl.equals("/remaber.do")){
			chain.doFilter(request, response);
			return ;
		}
		if(url.indexOf("/sort/") >= 0 || url.indexOf("/homePage/") >= 0 || url.indexOf("/secondPage/") >= 0 || url.indexOf("/thirdPage/") >= 0 || 
				url.indexOf("/fourthPage/") >= 0 || url.indexOf("/fifthPage/") >= 0 || url.indexOf("/sixthPage/") >= 0 || url.indexOf("/seventhPage/") >= 0){
			chain.doFilter(request, response);
			return ;
		}
		//进行登录请求转发
		Cookie[] cookies = req.getCookies();
		UserInfo user = (UserInfo)req.getSession().getAttribute("userInfo");
		if((user == null || user.getUserId() == null) && cookies != null){
			String reqUrl = "/user/remaber.do";
			/*int length = url.split("/").length;
			for(int i = 0; i< length - 5 ; i++){
				reqUrl = "../" + reqUrl;
			}*/
			//reqUrl = "localhost:8080"+req.getContextPath()+reqUrl;
			req.getRequestDispatcher(reqUrl).forward(request, response);
			return ;
		}
		
		//判断最后访问的是否是html，如果是html则进行拦截
		String suffix = url.substring(url.lastIndexOf("."));
		if(suffix.equals(".html") || suffix.equals(".do")){
			HttpSession session = req.getSession();
			if(user == null || user.getUserId() == null){
				System.out.println("用户非法访问--ip:"+req.getHeader("x-forwarded-for"));
				System.out.println("用户非法访问--url:"+url);
				//定义跳转的页面Url
				String respUrl = "/mdoa/html/user/login.html";
				/*int length = url.split("/").length;
				for(int i = 0; i< length - 5 ; i++){
					respUrl = "../" + respUrl;
				}*/
				//respUrl = req.getContextPath()+respUrl;
				resp.sendRedirect(respUrl);
				return ;
			}
		}
		chain.doFilter(request, response);
		
	}
	
	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
	}
	
	
}
