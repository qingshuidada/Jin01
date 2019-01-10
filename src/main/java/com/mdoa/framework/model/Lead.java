package com.mdoa.framework.model;

import java.util.Date;

import com.mdoa.util.DateUtil;

public class Lead {
	private String leadUserId;
	private String userId;
	private String leadId;
	private String userName;
	private String leadName;
	private String createUserId;
	private String createUserName;
	private Date createTime;
	private String createTimeStr;
	private String updateUserId;
	private String updateUserName;
	private Date updateTime;
	private String updateTimeStr;
	private String aliveFlag;
	private String leadDepartmentName;
	private String userDepartmentName;
	private String leadDepartmentId;
	private String userDepartmentId;
	
	public Lead(){
		
	}
	
	public Date getCreateTime() {
		return createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public String getCreateTimeStr() {
		return createTimeStr;
	}

	public void setCreateTimeStr(String createTimeStr) {
		this.createTimeStr = createTimeStr;
	}

	public String getUpdateTimeStr() {
		return updateTimeStr;
	}

	public void setUpdateTimeStr(String updateTimeStr) {
		this.updateTimeStr = updateTimeStr;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
		this.createTimeStr = DateUtil.dateToStr(createTime);
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
		this.updateTimeStr = DateUtil.dateToStr(updateTime);
	}

	public String getLeadDepartmentName() {
		return leadDepartmentName;
	}
	public void setLeadDepartmentName(String leadDepartmentName) {
		this.leadDepartmentName = leadDepartmentName;
	}
	public String getUserDepartmentName() {
		return userDepartmentName;
	}
	public void setUserDepartmentName(String userDepartmentName) {
		this.userDepartmentName = userDepartmentName;
	}

	public String getLeadUserId() {
		return leadUserId;
	}

	public void setLeadUserId(String leadUserId) {
		this.leadUserId = leadUserId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getLeadId() {
		return leadId;
	}

	public void setLeadId(String leadId) {
		this.leadId = leadId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getLeadName() {
		return leadName;
	}

	public void setLeadName(String leadName) {
		this.leadName = leadName;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}

	public String getCreateUserName() {
		return createUserName;
	}

	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
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


	public String getAliveFlag() {
		return aliveFlag;
	}

	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}

	public String getLeadDepartmentId() {
		return leadDepartmentId;
	}

	public void setLeadDepartmentId(String leadDepartmentId) {
		this.leadDepartmentId = leadDepartmentId;
	}

	public String getUserDepartmentId() {
		return userDepartmentId;
	}

	public void setUserDepartmentId(String userDepartmentId) {
		this.userDepartmentId = userDepartmentId;
	}
	
}
