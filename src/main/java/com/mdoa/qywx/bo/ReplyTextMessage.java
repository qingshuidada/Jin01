package com.mdoa.qywx.bo;

/**
 * 被动回复文本消息
 * @author Administrator
 *
 */
public class ReplyTextMessage {
	
	private String ToUserName;//成员userId
	private String FromUserName;//企业微信corpId
	private Long CreateTime;//消息创建时间
	private String MsgType;//消息类型 text
	private String Content;//文本消息内容
	
	public String getToUserName() {
		return ToUserName;
	}
	public void setToUserName(String toUserName) {
		ToUserName = toUserName;
	}
	public String getFromUserName() {
		return FromUserName;
	}
	public void setFromUserName(String fromUserName) {
		FromUserName = fromUserName;
	}
	public Long getCreateTime() {
		return CreateTime;
	}
	public void setCreateTime(Long createTime) {
		CreateTime = createTime;
	}
	public String getMsgType() {
		return MsgType;
	}
	public void setMsgType(String msgType) {
		MsgType = msgType;
	}
	public String getContent() {
		return Content;
	}
	public void setContent(String content) {
		Content = content;
	}
	
}	
