package com.mdoa.personnel.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.mdoa.util.DateUtil;

public class AttendanceRecord {
	
	private String recordId;
	private String userId;
	private Date recordDate;//记录时间
	private String recordDateStr;
	private String onDutyTime;//上班时间
	private String offDutyTime;//00:00:00 下班时间
	private String clockInTime;//实际上班时间
	private String clockOutTime;//00:00:00 实际下班时间
	private String leaveFlag;//请假状态 0正常 1病假 2事假 3外出 4休息 5放假
	private String beLateFlag;//是否迟到
	private String leaveEarlyFlag;//是否早退
	private String createUserId;
	private String createUserName;
	private Date createTime;
	private String createTimeStr;
	private String updateUserId;
	private String updateUserName;
	private Date updateTime;
	private String updateTimeStr;
	private String aliveFlag;
	private String onDutyOutAdress;
	private String offDutyOutAdress;
	private String onDutyOutLocation;
	private String offDutyOutLocation;
	private String onDutyWifiId;
	private String offDutyWifiId;
	private String onDutyWifiName;
	private String offDutyWifiName;
	

	public String getOnDutyOutAdress() {
		return onDutyOutAdress;
	}
	public void setOnDutyOutAdress(String onDutyOutAdress) {
		this.onDutyOutAdress = onDutyOutAdress;
	}
	public String getOffDutyOutAdress() {
		return offDutyOutAdress;
	}
	public void setOffDutyOutAdress(String offDutyOutAdress) {
		this.offDutyOutAdress = offDutyOutAdress;
	}
	public String getOnDutyOutLocation() {
		return onDutyOutLocation;
	}
	public void setOnDutyOutLocation(String onDutyOutLocation) {
		this.onDutyOutLocation = onDutyOutLocation;
	}
	public String getOffDutyOutLocation() {
		return offDutyOutLocation;
	}
	public void setOffDutyOutLocation(String offDutyOutLocation) {
		this.offDutyOutLocation = offDutyOutLocation;
	}
	public String getOnDutyWifiId() {
		return onDutyWifiId;
	}
	public void setOnDutyWifiId(String onDutyWifiId) {
		this.onDutyWifiId = onDutyWifiId;
	}
	public String getOffDutyWifiId() {
		return offDutyWifiId;
	}
	public void setOffDutyWifiId(String offDutyWifiId) {
		this.offDutyWifiId = offDutyWifiId;
	}
	public String getOnDutyWifiName() {
		return onDutyWifiName;
	}
	public void setOnDutyWifiName(String onDutyWifiName) {
		this.onDutyWifiName = onDutyWifiName;
	}
	public String getOffDutyWifiName() {
		return offDutyWifiName;
	}
	public void setOffDutyWifiName(String offDutyWifiName) {
		this.offDutyWifiName = offDutyWifiName;
	}
	public void setClockInTime(String clockInTime) {
		this.clockInTime = clockInTime;
	}
	public void setClockOutTime(String clockOutTime) {
		this.clockOutTime = clockOutTime;
	}
	public String getOffDutyTime() {
		return offDutyTime;
	}
	public void setOffDutyTime(String offDutyTime) {
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		try {
			sdf.parse(offDutyTime);
		} catch (ParseException e) {
			e.printStackTrace();
			offDutyTime = null;
		}finally{	
			this.offDutyTime = offDutyTime;
		}
	}
	public String getOnDutyTime() {
		return onDutyTime;
	}
	public void setOnDutyTime(String onDutyTime) {
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		try {
			sdf.parse(onDutyTime);
		} catch (ParseException e) {
			e.printStackTrace();
			onDutyTime = null;
		}finally{	
			this.onDutyTime = onDutyTime;
		}
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
	public String getAliveFlag() {
		return aliveFlag;
	}
	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}
	public String getRecordId() {
		return recordId;
	}
	public void setRecordId(String recordId) {
		this.recordId = recordId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public Date getRecordDate() {
		return recordDate;
	}
	public void setRecordDate(Date recordDate) {
		this.recordDate = recordDate;
		this.recordDateStr = DateUtil.dateToStr(recordDate,"yyyy-MM-dd");
	}
	public String getRecordDateStr() {
		return recordDateStr;
	}
	public void setRecordDateStr(String recordDateStr) {
		this.recordDateStr = recordDateStr;
		this.recordDate = DateUtil.strToDate(recordDateStr,"yyyy-MM-dd");
	}
	public String getClockInTime() {
		return clockInTime;
	}
	public void setRealOnTime(String clockInTime) {
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		try {
			sdf.parse(clockInTime);
		} catch (ParseException e) {
			e.printStackTrace();
			clockInTime = null;
		}finally{	
			this.clockInTime = clockInTime;
		}
	}
	public String getClockOutTime() {
		return clockOutTime;
	}
	public void setRealOffTime(String clockOutTime) {
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		try {
			sdf.parse(clockOutTime);
		} catch (ParseException e) {
			e.printStackTrace();
			clockOutTime = null;
		}finally{	
			this.clockOutTime = clockOutTime;
		}
	}
	public String getBeLateFlag() {
		return beLateFlag;
	}
	public void setBeLateFlag(String beLateFlag) {
		this.beLateFlag = beLateFlag;
	}
	public String getLeaveEarlyFlag() {
		return leaveEarlyFlag;
	}
	public void setLeaveEarlyFlag(String leaveEarlyFlag) {
		this.leaveEarlyFlag = leaveEarlyFlag;
	}
	public String getLeaveFlag() {
		return leaveFlag;
	}
	public void setLeaveFlag(String leaveFlag) {
		this.leaveFlag = leaveFlag;
	}

}
