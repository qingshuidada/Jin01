package com.mdoa.work.model;

import java.util.Date;

import com.mdoa.util.DateUtil;

public class WorkOfficeVote {

	private String voteId;
	private String voteName;
	private Date startTime;
	private String startTimeStr;
	private Date endTime;
	private String endTimeStr;
	private String status;
	private String detail;
	private Date createTime;
	private String createTimeStr;
	private String createUserId;
	private String createUserName;
	private Date updateTime;
	private String updateTimeStr;
	private String updateUserId;
	private String updateUserName;
	private String aliveFlag;
	
	public String getVoteId() {
		return voteId;
	}
	public void setVoteId(String voteId) {
		this.voteId = voteId;
	}
	public String getVoteName() {
		return voteName;
	}
	public void setVoteName(String voteName) {
		this.voteName = voteName;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
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

	
}
