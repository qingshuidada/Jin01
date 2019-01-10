package com.mdoa.personnel.model;

import java.text.DecimalFormat;
import java.util.Date;

import com.mdoa.util.DateUtil;
import com.mdoa.util.StringUtil;

public class LeaveRecord {
	
	private String leaveRecordId;
	private String processRecordId;
	private String userId;
	private String userName;
	private String reason;
	private String leaveType;
	private Date startTime;
	private String startTimeStr;
	private Date endTime;
	private String endTimeStr;
	private Date createTime;
	private String createTimeStr;
	private Double lastHours;
	
	public String getLeaveRecordId() {
		return leaveRecordId;
	}
	public void setLeaveRecordId(String leaveRecordId) {
		this.leaveRecordId = leaveRecordId;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getLeaveType() {
		return leaveType;
	}
	public void setLeaveType(String leaveType) {
		this.leaveType = leaveType;
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
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
		this.createTimeStr = DateUtil.dateToStr(createTime);
	}
	public String getCreateTimeStr() {
		return createTimeStr;
	}
	public void setCreateTimeStr(String createTimeStr) {
		this.createTimeStr = createTimeStr;
		this.createTime = DateUtil.strToDate(createTimeStr);
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
		this.startTimeStr = DateUtil.dateToStr(startTime);
	}
	public String getStartTimeStr() {
		return startTimeStr;
	}
	public void setStartTimeStr(String startTimeStr) {
		this.startTimeStr = startTimeStr;
		this.startTime = DateUtil.strToDate(startTimeStr);
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
		this.endTimeStr = DateUtil.dateToStr(endTime);
	}
	public String getEndTimeStr() {
		return endTimeStr;
	}
	public void setEndTimeStr(String endTimeStr) {
		this.endTimeStr = endTimeStr;
		this.endTime = DateUtil.strToDate(endTimeStr);
	}
	public String getProcessRecordId() {
		return processRecordId;
	}
	public void setProcessRecordId(String processRecordId) {
		this.processRecordId = processRecordId;
	}
	public Double getLastHours() {
		return lastHours;
	}
	public void setLastHours(Double lastHours) {
		if(lastHours != null){
        	lastHours = StringUtil.subZeroAndDot(lastHours, new DecimalFormat("#.0"));
		}
		this.lastHours = lastHours;
	}
}
