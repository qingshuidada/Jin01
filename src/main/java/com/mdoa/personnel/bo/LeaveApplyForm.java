package com.mdoa.personnel.bo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

public class LeaveApplyForm extends BaseModel {
	private String leaveApplyId;//请假申请id
	private String leaveStreamId;//请假审核流程id
	private String reason;
	private Date startTime;
	private String startTimeStr;
	private Date overTime;
	private String overTimeStr;
	private String examineUserId;//审核人id
	private String examineUserName;//审核人姓名
	private String examineStatus;
	private String streamType;
	private String leaveType;

	public String getLeaveApplyId() {
		return leaveApplyId;
	}

	public void setLeaveApplyId(String leaveApplyId) {
		this.leaveApplyId = leaveApplyId;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
		startTimeStr = DateUtil.dateToStr(startTime);
	}

	public String getStartTimeStr() {
		return startTimeStr;
	}

	public void setStartTimeStr(String startTimeStr) {
		this.startTimeStr = startTimeStr;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			startTime=sdf.parse(startTimeStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}

	public Date getOverTime() {
		return overTime;
	}

	public void setOverTime(Date overTime) {
		this.overTime = overTime;
		overTimeStr = DateUtil.dateToStr(overTime);
	}

	public String getOverTimeStr() {
		return overTimeStr;
	}

	public void setOverTimeStr(String overTimeStr) {
		this.overTimeStr = overTimeStr;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			overTime = sdf.parse(overTimeStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}

	public String getExamineUserId() {
		return examineUserId;
	}

	public void setExamineUserId(String examineUserId) {
		this.examineUserId = examineUserId;
	}

	public String getExamineUserName() {
		return examineUserName;
	}

	public void setExamineUserName(String examineUserName) {
		this.examineUserName = examineUserName;
	}

	public String getExamineStatus() {
		return examineStatus;
	}

	public void setExamineStatus(String examineStatus) {
		this.examineStatus = examineStatus;
	}

	public String getStreamType() {
		return streamType;
	}

	public void setStreamType(String streamType) {
		this.streamType = streamType;
	}

	public String getLeaveStreamId() {
		return leaveStreamId;
	}

	public void setLeaveStreamId(String leaveStreamId) {
		this.leaveStreamId = leaveStreamId;
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

}
