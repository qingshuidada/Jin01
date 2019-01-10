package com.mdoa.personnel.bo;

import java.util.Date;

import com.mdoa.util.DateUtil;

public class ProcessClockForm {
	
	private String userId;
	private String userName;
	private Date startTime;
	private String startTimeStr;
	private Date endTime;
	private String endTimeStr;
	private String replaceRecordDate;
	private String replaceType;
	private String replaceTime;
	

	public String getReplaceRecordDate() {
		return replaceRecordDate;
	}
	public void setReplaceRecordDate(String replaceRecordDate) {
		this.replaceRecordDate = replaceRecordDate;
	}
	public String getReplaceType() {
		return replaceType;
	}
	public void setReplaceType(String replaceType) {
		this.replaceType = replaceType;
	}
	public String getReplaceTime() {
		return replaceTime;
	}
	public void setReplaceTime(String replaceTime) {
		this.replaceTime = replaceTime;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
		this.startTimeStr = DateUtil.dateToStrNoS(startTime);
	}
	public String getStartTimeStr() {
		return startTimeStr;
	}
	public void setStartTimeStr(String startTimeStr) {
		this.startTimeStr = startTimeStr;
		this.startTime = DateUtil.strToDateNoS(startTimeStr);
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
		this.endTimeStr = DateUtil.dateToStrNoS(endTime);
	}
	public String getEndTimeStr() {
		return endTimeStr;
	}
	public void setEndTimeStr(String endTimeStr) {
		this.endTimeStr = endTimeStr;
		this.endTime = DateUtil.strToDateNoS(endTimeStr);
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
	
}
