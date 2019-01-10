package com.mdoa.personnel.model;

/**
 * 补卡记录
 * @author Administrator
 *
 */
public class ClockReplace {
	
	private String clockReplaceId;
	private String userId;
	private String replaceRecordDate;
	private String replaceType;
	private String replaceTime;
	private String createTime;
	
	public String getClockReplaceId() {
		return clockReplaceId;
	}
	public void setClockReplaceId(String clockReplaceId) {
		this.clockReplaceId = clockReplaceId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
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
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

}
