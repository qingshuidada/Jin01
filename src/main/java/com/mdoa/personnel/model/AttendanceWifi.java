package com.mdoa.personnel.model;

public class AttendanceWifi {
	/**
	 * wifiId
	 * 非UUID，而是wifi的实际ID
	 */
	private String wifiId;
	/**
	 * wifi名称
	 */
	private String wifiName;
	private String androidIps;
	private String iosIps;
	
	private String createTime;
	private String createUser;
	private String createUserName;
	private String updateTime;
	private String updateUserId;
	private String updateUserName;
	
	public AttendanceWifi(){
		
	}

	public String getWifiId() {
		return wifiId;
	}

	public void setWifiId(String wifiId) {
		this.wifiId = wifiId;
	}

	public String getWifiName() {
		return wifiName;
	}

	public void setWifiName(String wifiName) {
		this.wifiName = wifiName;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public String getCreateUserName() {
		return createUserName;
	}

	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}

	public String getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}

	public String getUpdateUserId() {
		return updateUserId;
	}

	public void setUpdateUserId(String updateUserId) {
		this.updateUserId = updateUserId;
	}

	public String getUpdateUserName() {
		return updateUserName;
	}

	public void setUpdateUserName(String updateUserName) {
		this.updateUserName = updateUserName;
	}

	public String getAndroidIps() {
		return androidIps;
	}

	public void setAndroidIps(String androidIps) {
		this.androidIps = androidIps;
	}

	public String getIosIps() {
		return iosIps;
	}

	public void setIosIps(String iosIps) {
		this.iosIps = iosIps;
	}
	
	
}
