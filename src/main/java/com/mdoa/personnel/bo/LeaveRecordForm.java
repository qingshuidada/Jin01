package com.mdoa.personnel.bo;

import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

public class LeaveRecordForm extends BaseModel{
	
	private String leaveRecordId;
	private String reason;
	private String leaveType;
	private String processRecordId;
	private Date startTime;
	private String startTimeStr;
	private Date endTime;
	private String endTimeStr;
	private Date createTime;
	private String createTimeStr;
	
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
	@Override
	public String toString() {
		return "LeaveRecordForm [leaveRecordId=" + leaveRecordId + ", reason=" + reason + ", leaveType=" + leaveType
				+ ", processRecordId=" + processRecordId + ", startTime=" + startTime + ", startTimeStr=" + startTimeStr
				+ ", endTime=" + endTime + ", endTimeStr=" + endTimeStr + ", createTime=" + createTime
				+ ", createTimeStr=" + createTimeStr + "]";
	}
	
	
}
