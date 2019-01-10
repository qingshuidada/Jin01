package com.mdoa.personnel.bo;

import java.util.List;

public class ClockMonthForm {
	
	private String userId;
	private String userName;
	ClockMonthBalanceForm clockMonthBalanceForm;//月统计数据
	private List<ClockDayForm> clockDayForms;//每天打卡记录
	
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
	public ClockMonthBalanceForm getClockMonthBalanceForm() {
		return clockMonthBalanceForm;
	}
	public void setClockMonthBalanceForm(ClockMonthBalanceForm clockMonthBalanceForm) {
		this.clockMonthBalanceForm = clockMonthBalanceForm;
	}
	public List<ClockDayForm> getClockDayForms() {
		return clockDayForms;
	}
	public void setClockDayForms(List<ClockDayForm> clockDayForms) {
		this.clockDayForms = clockDayForms;
	}
	
	
}
