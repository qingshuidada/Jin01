package com.mdoa.base.model;

public class JsonReturnObject {
	/**
	 * 传递给前台的错误信息
	 */
	private String message;
	/**
	 * 是否成功
	 */
	private boolean success;
	/**
	 * session会话的Id，如果存在，则为新的sessionId，新的session
	 */
	private String sessionId;
	/**
	 * 返回对象
	 */
	private Object returnObj;
	
	public JsonReturnObject(){
		
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean getSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public Object getReturnObj() {
		return returnObj;
	}

	public void setReturnObj(Object returnObj) {
		this.returnObj = returnObj;
	}
	
}	
