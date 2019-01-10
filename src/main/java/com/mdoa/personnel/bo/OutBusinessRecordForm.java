package com.mdoa.personnel.bo;

import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

/**
 * 公出记录
 * @author Administrator
 *
 */
public class OutBusinessRecordForm extends BaseModel{
	
	private String outBusinessRecordId;//公出记录id
	private String reason;
	private String processRecordId;
	private Date startTime;
	private String timeFlag;
	private String startTimeStr;
	private Date endTime;
	private String endTimeStr;
	private Date createTime;
	private String createTimeStr;
	private Date locationTime;
	private String locationTimeStr;
	private String outAddress;//公出位置
	private String outLocation;//公出经纬度
	private String title;
	
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getTimeFlag() {
		return timeFlag;
	}
	public void setTimeFlag(String timeFlag) {
		this.timeFlag = timeFlag;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
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
	public String getOutBusinessRecordId() {
		return outBusinessRecordId;
	}
	public void setOutBusinessRecordId(String outBusinessRecordId) {
		this.outBusinessRecordId = outBusinessRecordId;
	}
	public Date getLocationTime() {
		return locationTime;
	}
	public void setLocationTime(Date locationTime) {
		this.locationTime = locationTime;
		this.locationTimeStr = DateUtil.dateToStr(locationTime);
	}
	public String getLocationTimeStr() {
		return locationTimeStr;
	}
	public void setLocationTimeStr(String locationTimeStr) {
		this.locationTimeStr = locationTimeStr;
		this.locationTime = DateUtil.strToDate(locationTimeStr);
	}
	public String getProcessRecordId() {
		return processRecordId;
	}
	public void setProcessRecordId(String processRecordId) {
		this.processRecordId = processRecordId;
	}
	@Override
	public String toString() {
		return "OutBusinessRecordForm [outBusinessRecordId=" + outBusinessRecordId + ", reason=" + reason
				+ ", processRecordId=" + processRecordId + ", startTime=" + startTime + ", startTimeStr=" + startTimeStr
				+ ", endTime=" + endTime + ", endTimeStr=" + endTimeStr + ", createTime=" + createTime
				+ ", createTimeStr=" + createTimeStr + ", locationTime=" + locationTime + ", locationTimeStr="
				+ locationTimeStr + "]";
	}
	public String getOutAddress() {
		return outAddress;
	}
	public void setOutAddress(String outAddress) {
		this.outAddress = outAddress;
	}
	public String getOutLocation() {
		return outLocation;
	}
	public void setOutLocation(String outLocation) {
		this.outLocation = outLocation;
	}
	
	
}