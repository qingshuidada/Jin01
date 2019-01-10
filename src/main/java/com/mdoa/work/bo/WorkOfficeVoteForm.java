package com.mdoa.work.bo;

import java.util.Date;
import java.util.List;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

public class WorkOfficeVoteForm extends BaseModel{

	private String voteId;
	private String voteName;
	private Date startTime;
	private String startTimeStr;
	private Date endTime;
	private String endTimeStr;
	private String status;
	private String detail;
	
	private String voteItemId;
	private Integer voteItemNumber;
	private String voteItemName;
	
	private String voteRecordId;
	
	private Date createTime;
	private String createTimeStr;
	private String createUserId;
	private String createUserName;
	private Date updateTime;
	private String updateTimeStr;
	private String updateUserId;
	private String updateUserName;
	private String aliveFlag;
	
	private Integer amount;
	private String nowTimeStr;
	private Date nowTime;
	
	private String createStartTimeStr;
	private String createEndTimeStr;
	private String finishStartTimeStr;
	private String finishEndTimeStr;
	
	private List<WorkOfficeVoteForm> list;
	private boolean isClose;
	
	
	public boolean isClose() {
		return isClose;
	}
	public void setClose(boolean isClose) {
		this.isClose = isClose;
	}
	public List<WorkOfficeVoteForm> getList() {
		return list;
	}
	public void setList(List<WorkOfficeVoteForm> list) {
		this.list = list;
	}
	public String getCreateStartTimeStr() {
		return createStartTimeStr;
	}
	public void setCreateStartTimeStr(String createStartTimeStr) {
		this.createStartTimeStr = createStartTimeStr;
	}
	public String getCreateEndTimeStr() {
		return createEndTimeStr;
	}
	public void setCreateEndTimeStr(String createEndTimeStr) {
		this.createEndTimeStr = createEndTimeStr;
	}
	public String getFinishStartTimeStr() {
		return finishStartTimeStr;
	}
	public void setFinishStartTimeStr(String finishStartTimeStr) {
		this.finishStartTimeStr = finishStartTimeStr;
	}
	public String getFinishEndTimeStr() {
		return finishEndTimeStr;
	}
	public void setFinishEndTimeStr(String finishEndTimeStr) {
		this.finishEndTimeStr = finishEndTimeStr;
	}
	public String getNowTimeStr() {
		return nowTimeStr;
	}
	public void setNowTimeStr(String nowTimeStr) {
		this.nowTimeStr = nowTimeStr;
		this.nowTime = DateUtil.strToDate(nowTimeStr);
	}
	public Date getNowTime() {
		return nowTime;
	}
	public void setNowTime(Date nowTime) {
		this.nowTime = nowTime;
		this.nowTimeStr = DateUtil.dateToStr(nowTime);
	}
	public Integer getVoteItemNumber() {
		return voteItemNumber;
	}
	public void setVoteItemNumber(Integer voteItemNumber) {
		this.voteItemNumber = voteItemNumber;
	}
	public Integer getAmount() {
		return amount;
	}
	public void setAmount(Integer amount) {
		this.amount = amount;
	}
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
	public String getVoteItemId() {
		return voteItemId;
	}
	public void setVoteItemId(String voteItemId) {
		this.voteItemId = voteItemId;
	}
	public String getVoteItemName() {
		return voteItemName;
	}
	public void setVoteItemName(String voteItemName) {
		this.voteItemName = voteItemName;
	}
	public String getVoteRecordId() {
		return voteRecordId;
	}
	public void setVoteRecordId(String voteRecordId) {
		this.voteRecordId = voteRecordId;
	}
	
}
