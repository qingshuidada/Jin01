package com.mdoa.qywx.bo;

/**
 * 点击菜单拉取消息的事件推送消息 CLICK
 * @author Administrator
 *
 */
public class ClickEventMessage {
	
	private String toUserName;//企业微信corpId
	private String fromUserName;//成员userId
	private Long createTime;//消息创建时间
	private String msgType;//消息类型 event
	private String event;//事件类型 click
	private String eventKey;//事件KEY值，与自定义菜单接口中KEY值对应
	private Integer agentID;//企业应用的ID
	
	@Override
	public String toString() {
		return "ClickEventMessage [toUserName=" + toUserName + ", fromUserName=" + fromUserName + ", createTime="
				+ createTime + ", msgType=" + msgType + ", event=" + event + ", eventKey=" + eventKey + ", agentID="
				+ agentID + "]";
	}

	public String getToUserName() {
		return toUserName;
	}
	public void setToUserName(String toUserName) {
		this.toUserName = toUserName;
	}
	public String getFromUserName() {
		return fromUserName;
	}
	public void setFromUserName(String fromUserName) {
		this.fromUserName = fromUserName;
	}
	public Long getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}
	public String getMsgType() {
		return msgType;
	}
	public void setMsgType(String msgType) {
		this.msgType = msgType;
	}
	public String getEvent() {
		return event;
	}
	public void setEvent(String event) {
		this.event = event;
	}
	public String getEventKey() {
		return eventKey;
	}
	public void setEventKey(String eventKey) {
		this.eventKey = eventKey;
	}
	public Integer getAgentID() {
		return agentID;
	}
	public void setAgentID(Integer agentID) {
		this.agentID = agentID;
	}
	
	
}
