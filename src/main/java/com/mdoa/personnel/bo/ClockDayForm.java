package com.mdoa.personnel.bo;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.mdoa.util.DateUtil;

public class ClockDayForm {
	
	private Date recordDate;
	private String recordDateStr;
	private String beLateFlag;
	private String leaveEarlyFlag;
	private String leaveFlag;
	private String clockInTime;
	private String clockOutTime;
	private String offDutyWifiName;//下班时的wifi名
	private String offDutyOutAddress;//下班时的打卡地址
	private String onDutyWifiName;//上班打卡wifi名
	private String onDutyOutAddress;//上班打卡地址
	
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
	public void setClockInTime(String clockInTime) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
			sdf.parse(clockInTime);
		} catch (Exception e) {
			clockInTime = null;
		}
		this.clockInTime = clockInTime;
	}
	public String getClockOutTime() {
		return clockOutTime;
	}
	public void setClockOutTime(String clockOutTime) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
			sdf.parse(clockOutTime);
		} catch (Exception e) {
			clockOutTime = null;
		}
		this.clockOutTime = clockOutTime;
	}
	public String getOffDutyWifiName() {
		return offDutyWifiName;
	}
	public void setOffDutyWifiName(String offDutyWifiName) {
		this.offDutyWifiName = offDutyWifiName;
	}
	public String getOffDutyOutAddress() {
		return offDutyOutAddress;
	}
	public void setOffDutyOutAddress(String offDutyOutAddress) {
		this.offDutyOutAddress = offDutyOutAddress;
	}
	public String getOnDutyWifiName() {
		return onDutyWifiName;
	}
	public void setOnDutyWifiName(String onDutyWifiName) {
		this.onDutyWifiName = onDutyWifiName;
	}
	public String getOnDutyOutAddress() {
		return onDutyOutAddress;
	}
	public void setOnDutyOutAddress(String onDutyOutAddress) {
		this.onDutyOutAddress = onDutyOutAddress;
	}

}
