package com.mdoa.work.model;

import java.util.Date;

import com.mdoa.util.DateUtil;

public class MissionHead {

	private String headId;
	private String missionId;
	private String headUserId;
	private String headUserName;
	private String missionState;
	private Date realityEndTime;
	private String realityEndTimeStr;
	private String realityValue;
	private String aliveFlag;
	
	public Date getRealityEndTime() {
		return realityEndTime;
	}
	public void setRealityEndTime(Date realityEndTime) {
		this.realityEndTime = realityEndTime;
		this.realityEndTimeStr = DateUtil.dateToStr(realityEndTime,"yyyy-MM-dd");
	}
	public String getRealityEndTimeStr() {
		return realityEndTimeStr;
	}
	public void setRealityEndTimeStr(String realityEndTimeStr) {
		this.realityEndTimeStr = realityEndTimeStr;
		this.realityEndTime = DateUtil.strToDate(realityEndTimeStr, "yyyy-MM-dd");
	}
	public String getHeadId() {
		return headId;
	}
	public void setHeadId(String headId) {
		this.headId = headId;
	}
	public String getMissionId() {
		return missionId;
	}
	public void setMissionId(String missionId) {
		this.missionId = missionId;
	}
	public String getHeadUserId() {
		return headUserId;
	}
	public void setHeadUserId(String headUserId) {
		this.headUserId = headUserId;
	}
	public String getHeadUserName() {
		return headUserName;
	}
	public void setHeadUserName(String headUserName) {
		this.headUserName = headUserName;
	}
	public String getMissionState() {
		return missionState;
	}
	public void setMissionState(String missionState) {
		this.missionState = missionState;
	}
	public String getRealityValue() {
		return realityValue;
	}
	public void setRealityValue(String realityValue) {
		this.realityValue = realityValue;
	}
	public String getAliveFlag() {
		return aliveFlag;
	}
	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}
	
	
}
