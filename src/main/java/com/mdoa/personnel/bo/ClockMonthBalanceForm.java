package com.mdoa.personnel.bo;

import com.mdoa.util.StringUtil;

public class ClockMonthBalanceForm {
	
	private String userId;
	private String userName;
	private String sex;
	private String attendanceGroupName;
	private String idCard;
	private String userAccount;
	private String departmentName;
	private String postName;
	private Integer attendanceDays;//出勤天数
	private Integer restDays;//休息天数
	private Integer lateTimes;//迟到次数
	private Integer earlyTimes;//早退次数
	private Integer missTimes;//缺卡次数
	private Integer absentDays;//旷工天数
	private Integer fieldTimes;//外勤次数
	private Double outHours;//外出时长
	private Double businessLeaveDays;//事假天数
	private Double sickLeaveDays;//病假天数
	private Double averWorkingHours;//本月平均工时
	private Integer outCount;//外出打卡次数
	private Double leaveDays;//请假天数
	private Double outBusinessDays;//公出天数
	
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
	public String getAttendanceGroupName() {
		return attendanceGroupName;
	}
	public void setAttendanceGroupName(String attendanceGroupName) {
		this.attendanceGroupName = attendanceGroupName;
	}
	public String getUserAccount() {
		return userAccount;
	}
	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getPostName() {
		return postName;
	}
	public void setPostName(String postName) {
		this.postName = postName;
	}
	public Integer getAttendanceDays() {
		return attendanceDays;
	}
	public void setAttendanceDays(Integer attendanceDays) {
		this.attendanceDays = attendanceDays;
	}
	public Integer getRestDays() {
		return restDays;
	}
	public void setRestDays(Integer restDays) {
		this.restDays = restDays;
	}
	public Integer getLateTimes() {
		return lateTimes;
	}
	public void setLateTimes(Integer lateTimes) {
		this.lateTimes = lateTimes;
	}
	public Integer getEarlyTimes() {
		return earlyTimes;
	}
	public void setEarlyTimes(Integer earlyTimes) {
		this.earlyTimes = earlyTimes;
	}
	public Integer getMissTimes() {
		return missTimes;
	}
	public void setMissTimes(Integer missTimes) {
		this.missTimes = missTimes;
	}
	public Integer getAbsentDays() {
		return absentDays;
	}
	public void setAbsentDays(Integer absentDays) {
		this.absentDays = absentDays;
	}
	public Integer getFieldTimes() {
		return fieldTimes;
	}
	public void setFieldTimes(Integer fieldTimes) {
		this.fieldTimes = fieldTimes;
	}
	public Double getOutHours() {
		return outHours;
	}
	public void setOutHours(Double outHours) {
		this.outHours = outHours;
	}
	public Double getBusinessLeaveDays() {
		return businessLeaveDays;
	}
	public void setBusinessLeaveDays(Double businessLeaveDays) {
		this.businessLeaveDays = businessLeaveDays;
	}
	public Double getSickLeaveDays() {
		return sickLeaveDays;
	}
	public void setSickLeaveDays(Double sickLeaveDays) {
		this.sickLeaveDays = sickLeaveDays;
	}
	public Double getAverWorkingHours() {
		return averWorkingHours;
	}
	public void setAverWorkingHours(Double averWorkingHours) {
		this.averWorkingHours = averWorkingHours;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getIdCard() {
		return idCard;
	}
	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}
	public void parseSex() {
		if(StringUtil.isEmpty(sex)){
			sex="";
		}else if(sex.equals("1")){
			sex="男";
		}else{
			sex="女";
		}
		
	}
	public Integer getOutCount() {
		return outCount;
	}
	public void setOutCount(Integer outCount) {
		this.outCount = outCount;
	}
	public Double getLeaveDays() {
		return leaveDays;
	}
	public void setLeaveDays(Double leaveDays) {
		this.leaveDays = leaveDays;
	}
	public Double getOutBusinessDays() {
		return outBusinessDays;
	}
	public void setOutBusinessDays(Double outBusinessDays) {
		this.outBusinessDays = outBusinessDays;
	}
	
	
}
