package com.mdoa.work.model;

import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

/**
 * 任务
 * @author Administrator
 *
 */
public class Mission extends BaseModel{

	private String missionId;
	private String missionName;
	private Date startTime;
	private String startTimeStr;
	private Date expectEndTime;
	private String expectEndTimeStr;
	private Date realityEndTime;
	private String realityEndTimeStr;
	private Date createTime;
	private String createTimeStr;
	private String launchUserId;
	private String launchUserName;
	private String headUserId;
	private String headUserName;
	private String missionState;
	private String missionType;
	private String missionDescribe;
	private String realityValue;
	private String aliveFlag;
	private String userIds;
	private String headId;
	private String headUserIds;
	public String getMissionId() {
		return missionId;
	}
	public void setMissionId(String missionId) {
		this.missionId = missionId;
	}
	public String getMissionName() {
		return missionName;
	}
	public void setMissionName(String missionName) {
		this.missionName = missionName;
	}
	public String getLaunchUserId() {
		return launchUserId;
	}
	public void setLaunchUserId(String launchUserId) {
		this.launchUserId = launchUserId;
	}
	public String getLaunchUserName() {
		return launchUserName;
	}
	public void setLaunchUserName(String launchUserName) {
		this.launchUserName = launchUserName;
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
	public String getMissionType() {
		return missionType;
	}
	public void setMissionType(String missionType) {
		this.missionType = missionType;
	}
	public String getMissionDescribe() {
		return missionDescribe;
	}
	public void setMissionDescribe(String missionDescribe) {
		this.missionDescribe = missionDescribe;
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
	public String getUserIds() {
		return userIds;
	}
	public void setUserIds(String userIds) {
		this.userIds = userIds;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
		this.startTimeStr = DateUtil.dateToStr(startTime,"yyyy-MM-dd");
	}
	public String getStartTimeStr() {
		return startTimeStr;
	}
	public void setStartTimeStr(String startTimeStr) {
		this.startTimeStr = startTimeStr;
		this.startTime = DateUtil.strToDate(startTimeStr, "yyyy-MM-dd");
	}
	public Date getExpectEndTime() {
		return expectEndTime;
	}
	public void setExpectEndTime(Date expectEndTime) {
		this.expectEndTime = expectEndTime;
		this.expectEndTimeStr = DateUtil.dateToStr(expectEndTime,"yyyy-MM-dd");
	}
	public String getExpectEndTimeStr() {
		return expectEndTimeStr;
	}
	public void setExpectEndTimeStr(String expectEndTimeStr) {
		this.expectEndTimeStr = expectEndTimeStr;
		this.expectEndTime = DateUtil.strToDate(expectEndTimeStr, "yyyy-MM-dd");
	}
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
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
		this.createTimeStr = DateUtil.dateToStr(createTime,"yyyy-MM-dd");
	}
	public String getCreateTimeStr() {
		return createTimeStr;
	}
	public void setCreateTimeStr(String createTimeStr) {
		this.createTimeStr = createTimeStr;
		this.createTime = DateUtil.strToDate(createTimeStr, "yyyy-MM-dd");
	}
	public String getHeadId() {
		return headId;
	}
	public void setHeadId(String headId) {
		this.headId = headId;
	}
	public String getHeadUserIds() {
		return headUserIds;
	}
	public void setHeadUserIds(String headUserIds) {
		this.headUserIds = headUserIds;
	}

	
	
	
	
}
