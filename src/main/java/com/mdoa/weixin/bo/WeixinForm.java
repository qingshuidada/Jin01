package com.mdoa.weixin.bo;

public class WeixinForm {

	private String openId;
	private String implementName;
	private String customerId;
	private String phoneNumber;
	private String userAccount;
	private String erpWeixinId;
	private String password;
	private String csFlag;
	private String nickName;
	
	
	public String getNickName() {
	    return nickName;
	}
	public void setNickName(String nickName) {
	    this.nickName = nickName;
	}
	public String getCsFlag() {
		return csFlag;
	}
	public void setCsFlag(String csFlag) {
		this.csFlag = csFlag;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getOpenId() {
		return openId;
	}
	public void setOpenId(String openId) {
		this.openId = openId;
	}
	public String getImplementName() {
		return implementName;
	}
	public void setImplementName(String implementName) {
		this.implementName = implementName;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getUserAccount() {
		return userAccount;
	}
	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}
	public String getErpWeixinId() {
		return erpWeixinId;
	}
	public void setErpWeixinId(String erpWeixinId) {
		this.erpWeixinId = erpWeixinId;
	}
	
}
