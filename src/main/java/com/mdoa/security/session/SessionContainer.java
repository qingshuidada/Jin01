package com.mdoa.security.session;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.mdoa.util.Md5Util;

public class SessionContainer {
	private static SessionContainer sessionContainer = null;
	
	static{
		sessionContainer = new SessionContainer();
	}
	
	private static Map<String, PhSession> sessionMap = new HashMap<String, PhSession>();
	
	public static PhSession createSession(){
		String key = getKey();
		PhSession session = new PhSession();
		session.setSessionKey(key);
		sessionMap.put(key, session);
		return session;
	}
	
	public static PhSession getSession(String key){
		PhSession session = sessionContainer.sessionMap.get(key);
		if(session == null){
			return null;
		}if(session.getPeriodTime().getTime() < System.currentTimeMillis()){
			sessionMap.remove(key);
			return null;
		}else{
			session.setPeriodTime(new Date(System.currentTimeMillis() + session.getPeriod()*1000*60));
			return session;
		}
	}
	
	public static String getKey(){
		String key = "" + System.currentTimeMillis() + (int)Math.random()*10000;
		key = Md5Util.getMd5Str(key);
		return key;
	}
}
