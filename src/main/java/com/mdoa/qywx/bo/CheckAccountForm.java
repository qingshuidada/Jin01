package com.mdoa.qywx.bo;

public class CheckAccountForm {
	
	private String isChecked;//账号密码是否匹配
	private String isBound;//账号是否已绑定企业微信
	private String bindingUserId;//若已绑定时，返回已绑定的企业微信UserId
	private String userAccount;//返回正绑定的userAccount
	private String userId;//返回正绑定的userId
	private String userName;//返回正绑定的userName
	private String reportAuthorityFlag;//是否有权限查看报表
	public String getIsChecked() {
		return isChecked;
	}
	public void setIsChecked(String isChecked) {
		this.isChecked = isChecked;
	}
	public String getIsBound() {
		return isBound;
	}
	public void setIsBound(String isBound) {
		this.isBound = isBound;
	}
	public String getBindingUserId() {
		return bindingUserId;
	}
	public void setBindingUserId(String bindingUserId) {
		this.bindingUserId = bindingUserId;
	}
	public String getUserAccount() {
		return userAccount;
	}
	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getReportAuthorityFlag() {
		return reportAuthorityFlag;
	}
	public void setReportAuthorityFlag(String reportAuthorityFlag) {
		this.reportAuthorityFlag = reportAuthorityFlag;
	}
	@Override
	public String toString() {
		return "CheckAccountForm [isChecked=" + isChecked + ", isBound=" + isBound + ", bindingUserId=" + bindingUserId
				+ ", userAccount=" + userAccount + ", userId=" + userId + ", userName=" + userName + "]";
	}
	
}
