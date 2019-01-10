package com.mdoa.work.bo;

import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

public class LogForm extends BaseModel{

	private String workOfficeLogId;
	private String titleName;
	private String text;
	private Date logTime;
	private String logTimeStr;
	private Date createTime;
	private String createTimeStr;
	private String createUserId;
	private String createUserName;
	private Date updateTime;
	private String updateTimeStr;
	private String updateUserId;
	private String updateUserName;
	private String aliveFlag;
	
	private String leadUserId;
	private String leadId;
	private String leadName;

	private String startTimeStr;
	private String endTimeStr;
	
	private String yourSelfFlag;
	
	
	
	public String getYourSelfFlag() {
		return yourSelfFlag;
	}
	public void setYourSelfFlag(String yourSelfFlag) {
		this.yourSelfFlag = yourSelfFlag;
	}
	public String getStartTimeStr() {
		return startTimeStr;
	}
	public void setStartTimeStr(String startTimeStr) {
		this.startTimeStr = startTimeStr;
	}
	public String getEndTimeStr() {
		return endTimeStr;
	}
	public void setEndTimeStr(String endTimeStr) {
		this.endTimeStr = endTimeStr;
	}
	public String getWorkOfficeLogId() {
		return workOfficeLogId;
	}
	public void setWorkOfficeLogId(String workOfficeLogId) {
		this.workOfficeLogId = workOfficeLogId;
	}
	public String getTitleName() {
		return titleName;
	}
	public void setTitleName(String titleName) {
		this.titleName = titleName;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	
	public Date getLogTime() {
		return logTime;
	}
	public void setLogTime(Date logTime) {
		this.logTime = logTime;
		this.logTimeStr = DateUtil.dateToStr(logTime,"yyyy-MM-dd");
	}
	public String getLogTimeStr() {
		return logTimeStr;
	}
	public void setLogTimeStr(String logTimeStr) {
		this.logTimeStr = logTimeStr;
		this.logTime = DateUtil.strToDate(logTimeStr,"yyyy-MM-dd");
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
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
		this.updateTimeStr = DateUtil.dateToStr(updateTime);
	}
	public String getUpdateTimeStr() {
		return updateTimeStr;
	}
	public void setUpdateTimeStr(String updateTimeStr) {
		this.updateTimeStr = updateTimeStr;
		this.updateTime = DateUtil.strToDate(updateTimeStr);
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
	public String getLeadUserId() {
		return leadUserId;
	}
	public void setLeadUserId(String leadUserId) {
		this.leadUserId = leadUserId;
	}
	public String getLeadId() {
		return leadId;
	}
	public void setLeadId(String leadId) {
		this.leadId = leadId;
	}
	public String getLeadName() {
		return leadName;
	}
	public void setLeadName(String leadName) {
		this.leadName = leadName;
	}
	
	
	
}
