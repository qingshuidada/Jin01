package com.mdoa.filter;

import java.io.IOException;
import java.net.UnknownHostException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.java_websocket.WebSocketImpl;

import com.mdoa.constant.Constant;
import com.mdoa.plugin.websocketInstantMsg.ChatServer;
import com.mdoa.plugin.websocketOnline.OnlineChatServer;
import com.mdoa.util.Tools;
public class StartFilter implements Filter{

	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		//暂时先注释
		//this.startWebsocketInstantMsg();
		//this.startWebsocketOnline();
	}
	
	/**
	 * 启动即时聊天服务
	 */
	public void startWebsocketInstantMsg(){
		WebSocketImpl.DEBUG = false;
		ChatServer s;
		try {
			String strWEBSOCKET = Tools.readTxtFile(Constant.WEBSOCKET);//读取WEBSOCKET配置,获取端口配置
			if(null != strWEBSOCKET && !"".equals(strWEBSOCKET)){
				String strIW[] = strWEBSOCKET.split(",fh,");
				if(strIW.length == 5){
					s = new ChatServer(Integer.parseInt(strIW[1]));
					s.start();
					System.out.println( "websocket服务器启动,端口" + s.getPort() );
				}
			}
			
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
	}
	
	public void startWebsocketOnline() {
		WebSocketImpl.DEBUG = false;
		OnlineChatServer s;
		try {
			String strWEBSOCKET = Tools.readTxtFile(Constant.WEBSOCKET);//读取WEBSOCKET配置,获取端口配置
			if(null != strWEBSOCKET && !"".equals(strWEBSOCKET)){
				String strIW[] = strWEBSOCKET.split(",fh,");
				if(strIW.length == 5){
					s = new OnlineChatServer(Integer.parseInt(strIW[3]));
					s.start();
				}
			}
			//System.out.println( "websocket服务器启动,端口" + s.getPort() );
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
	}

	@Override
	public void destroy() {
		
	}
	

}
