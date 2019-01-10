package com.mdoa.personnel.bo;

import java.util.Date;

import com.mdoa.personnel.model.AttendanceToday;
import com.mdoa.personnel.model.AttendanceWifi;
import com.mdoa.util.DateUtil;

public class ClockState {
	
	private Date serverTime;
	private String serverTimeStr;
	private String userName;
	private AttendanceToday attendanceToday;
	private String canClock;//是否进入考勤范围
	private String wifiName;
	private String wifiId;
	 
	
	public Date getServerTime() {
		return serverTime;
	}
	public void setServerTime(Date serverTime) {
		this.serverTime = serverTime;
		this.serverTimeStr = DateUtil.dateToStr(serverTime,"HH:mm:ss");
	}
	public String getServerTimeStr() {
		return serverTimeStr;
	}
	public void setServerTimeStr(String serverTimeStr) {
		this.serverTimeStr = serverTimeStr;
		this.serverTime = DateUtil.strToDate(serverTimeStr,"HH:mm:ss");
	}
	public AttendanceToday getAttendanceToday() {
		return attendanceToday;
	}
	public void setAttendanceToday(AttendanceToday attendanceToday) {
		this.attendanceToday = attendanceToday;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getWifiName() {
		return wifiName;
	}
	public void setWifiName(String wifiName) {
		this.wifiName = wifiName;
	}
	public String getWifiId() {
		return wifiId;
	}
	public void setWifiId(String wifiId) {
		this.wifiId = wifiId;
	}
	public String getCanClock() {
		return canClock;
	}
	public void setCanClock(String canClock) {
		this.canClock = canClock;
	}	
	
}
