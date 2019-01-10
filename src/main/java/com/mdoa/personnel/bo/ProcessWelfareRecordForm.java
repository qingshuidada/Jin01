package com.mdoa.personnel.bo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ProcessWelfareRecordForm {
	
	private String welfareId;// id
	private String processRecordId;//相关流程id
	private Date giveTime;// 发放时间 没有时分秒
	private String giveTimeStr;
	private String userGroup;
	private String userId;
	private String userName;
	

	public String getWelfareId() {
		return welfareId;
	}

	public void setWelfareId(String welfareId) {
		this.welfareId = welfareId;
	}

	public Date getGiveTime() {
		return giveTime;
	}

	public void setGiveTime(Date giveTime) {
		this.giveTime = giveTime;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		giveTimeStr = sdf.format(giveTime);
	}

	public String getGiveTimeStr() {
		return giveTimeStr;
	}

	public void setGiveTimeStr(String giveTimeStr) {
		this.giveTimeStr = giveTimeStr;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			giveTime = sdf.parse(giveTimeStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
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

	public String getProcessRecordId() {
		return processRecordId;
	}

	public void setProcessRecordId(String processRecordId) {
		this.processRecordId = processRecordId;
	}

	@Override
	public String toString() {
		return "ProcessWelfareRecordForm [welfareId=" + welfareId + ", processRecordId=" + processRecordId
				+ ", giveTime=" + giveTime + ", giveTimeStr=" + giveTimeStr + ", userGroup=" + userGroup
				+ ", userId=" + userId + ", userName=" + userName + "]";
	}

	public String getUserGroup() {
		return userGroup;
	}

	public void setUserGroup(String userGroup) {
		this.userGroup = userGroup;
	}
	
	
}
