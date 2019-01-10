package com.mdoa.security.session;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class PhSession {
	private Map<String, Object> map = new HashMap<String, Object>();
	
	private Date createTime;
	
	private Date periodTime;
	
	private String sessionKey;
	
	private static int defaultPeriod = 30;
	
	private int period;
	
	public PhSession(){
		this(defaultPeriod);
	}
	
	public PhSession(int period) {
		this.period = period;
		this.createTime = new Date();
		this.periodTime = new Date(createTime.getTime() + period*60*1000);
	}
	
	public Object getAttribute(String key){
		return map.get(key);
	}
	
	public void setAttribut(String key, Object value){
		map.put(key, value);
	}
	
	public void remove(String key){
		map.remove(key);
	}

	public Date getPeriodTime() {
		return periodTime;
	}

	public void setPeriodTime(Date periodTime) {
		this.periodTime = periodTime;
	}

	public String getSessionKey() {
		return sessionKey;
	}

	public void setSessionKey(String sessionKey) {
		this.sessionKey = sessionKey;
	}

	public int getPeriod() {
		return period;
	}

	public void setPeriod(int period) {
		this.period = period;
	}
	
}
