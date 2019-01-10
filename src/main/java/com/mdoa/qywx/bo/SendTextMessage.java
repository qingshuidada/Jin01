package com.mdoa.qywx.bo;

import com.mdoa.util.StringUtil;

public class SendTextMessage {
	
	private String touser;//成员ID列表（消息接收者，多个接收者用‘|’分隔，最多支持1000个）。特殊情况：指定为@all，则向该企业应用的全部成员发送
	private String toparty;//部门ID列表，多个接收者用‘|’分隔，最多支持100个。当touser为@all时忽略本参数
	private String totag;//标签ID列表，多个接收者用‘|’分隔，最多支持100个。当touser为@all时忽略本参数
	private String safe;//表示是否是保密消息，0表示否，1表示是，默认0
	
	private String msgtype;//消息类型 此时固定为text
	private String agentid;//企业应用的id，整型。可在应用的设置页面查看
	private SendText text;
	
	public String getTouser() {
		return touser;
	}
	public void setTouser(String touser) {
		this.touser = touser;
	}
	public String getToparty() {
		return toparty;
	}
	public void setToparty(String toparty) {
		this.toparty = toparty;
	}
	public String getTotag() {
		return totag;
	}
	public void setTotag(String totag) {
		this.totag = totag;
	}
	public String getSafe() {
		return safe;
	}
	public void setSafe(String safe) {
		this.safe = safe;
	}
	public String getMsgtype() {
		return msgtype;
	}
	public void setMsgtype(String msgtype) {
		this.msgtype = msgtype;
	}
	public String getAgentid() {
		return agentid;
	}
	public void setAgentid(String agentid) {
		this.agentid = agentid;
	}

	
	public String getRequestBody(){
		String requestBody = "";
		if(!StringUtil.isEmpty(touser)){
			requestBody = requestBody + "touser=" + touser +"&&";
		}
		if(!StringUtil.isEmpty(toparty)){
			requestBody = requestBody + "toparty=" + toparty +"&&";
		}
		if(!StringUtil.isEmpty(totag)){
			requestBody = requestBody + "totag=" + totag +"&&";
		}
		if(!StringUtil.isEmpty(safe)){
			requestBody = requestBody + "safe=" + safe +"&&";
		}
		if(!StringUtil.isEmpty(msgtype)){
			requestBody = requestBody + "msgtype=" + msgtype +"&&";
		}
		if(!StringUtil.isEmpty(agentid)){
			requestBody = requestBody + "agentid=" + agentid +"&&";
		}
		if(requestBody.length()>0){
			int index = requestBody.lastIndexOf("&&");
			requestBody.substring(index);
		}
		return requestBody;
	}
	@Override
	public String toString() {
		return "SendTextMessage [touser=" + touser + ", toparty=" + toparty + ", totag=" + totag + ", safe=" + safe
				+ ", msgtype=" + msgtype + ", agentid=" + agentid + ", content=" + text.getContent() + "]";
	}
	public SendText getText() {
		return text;
	}
	public void setText(SendText text) {
		this.text = text;
	}
	
	

}
