package com.mdoa.salary.bo;

import java.lang.reflect.Method;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Column;

import org.springframework.beans.factory.annotation.Value;

import com.mdoa.salary.interfaces.ExcelReadable;

public class SalaryInfoForm implements ExcelReadable{
	
	private Integer page;
	private Integer rows;
	private String salaryInfoId;//主键
	private String userAccount;//账号
	private String userName;//姓名
	private Double finalPayAmount;//实发金额 = 实发工资+工奖+加班费+通讯费+其它-扣款-养老保险
	private Double classLevel;//等级
	private Double dailyWage;//日工资
	private Double monthlyPay;//月工资
	private Double days;//天数
	private Integer totalPayAmount;//应发工资 = 天数*日工资（ 四舍五入取整）
	private Double nightShift;//夜班
	private Double nightShiftAmount;//夜班费 = 夜班*2（或者5）
	private Double subsidyAmount;//医、餐贴
	private Double actualPayAmount;//实发工资 = 应发工资+夜班费+医、餐贴
	private Double awardAmount;//工奖
	private Double overtimePayAmount;//加班费
	private Double communicationAmount;//通讯费
	private Double otherAmount;//出勤奖
	private Double withholdAmount;//扣款
	private Double insuranceAmount;//养老保险
	private String departmentName;//部门
	private String postName;//岗位
	private String monthDate;//日期
	private String yearDate;
	private String ensureFlag;//确认标志
	
	private String finalPayAmountErr;//实发金额错误 0否 1是
	private String totalPayAmountErr;//应发工资错误  0否 1是
	private String nightShiftAmountErr;//夜班费错误  0否 1是
	private String actualPayAmountErr;//实发工资错误  0否 1是
	
	private static Map<Integer, String> methods;
	
	
	public Double getDays() {
		return days;
	}
	public void setDays(Double days) {
		this.days = days;
	}
	public String getSalaryInfoId() {
		return salaryInfoId;
	}
	public void setSalaryInfoId(String salaryInfoId) {
		this.salaryInfoId = salaryInfoId;
	}
	public String getUserAccount() {
		return userAccount;
	}
	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Double getFinalPayAmount() {
		return finalPayAmount;
	}
	public void setFinalPayAmount(Double finalPayAmount) {
		this.finalPayAmount = finalPayAmount;
	}
	public Double getClassLevel() {
		return classLevel;
	}
	public void setClassLevel(Double classLevel) {
		this.classLevel = classLevel;
	}
	public Double getDailyWage() {
		return dailyWage;
	}
	public void setDailyWage(Double dailyWage) {
		this.dailyWage = dailyWage;
	}
	public Double getMonthlyPay() {
		return monthlyPay;
	}
	public void setMonthlyPay(Double monthlyPay) {
		this.monthlyPay = monthlyPay;
	}
	public Integer getTotalPayAmount() {
		return totalPayAmount;
	}
	public void setTotalPayAmount(Integer totalPayAmount) {
		this.totalPayAmount = totalPayAmount;
	}
	public Double getNightShift() {
		return nightShift;
	}
	public void setNightShift(Double nightShift) {
		this.nightShift = nightShift;
	}
	public Double getNightShiftAmount() {
		return nightShiftAmount;
	}
	public void setNightShiftAmount(Double nightShiftAmount) {
		this.nightShiftAmount = nightShiftAmount;
	}
	public Double getSubsidyAmount() {
		return subsidyAmount;
	}
	public void setSubsidyAmount(Double subsidyAmount) {
		this.subsidyAmount = subsidyAmount;
	}
	public Double getActualPayAmount() {
		return actualPayAmount;
	}
	public void setActualPayAmount(Double actualPayAmount) {
		this.actualPayAmount = actualPayAmount;
	}
	public Double getAwardAmount() {
		return awardAmount;
	}
	public void setAwardAmount(Double awardAmount) {
		this.awardAmount = awardAmount;
	}
	public Double getOvertimePayAmount() {
		return overtimePayAmount;
	}
	public void setOvertimePayAmount(Double overtimePayAmount) {
		this.overtimePayAmount = overtimePayAmount;
	}
	public Double getCommunicationAmount() {
		return communicationAmount;
	}
	public void setCommunicationAmount(Double communicationAmount) {
		this.communicationAmount = communicationAmount;
	}
	public Double getOtherAmount() {
		return otherAmount;
	}
	public void setOtherAmount(Double otherAmount) {
		this.otherAmount = otherAmount;
	}
	public Double getWithholdAmount() {
		return withholdAmount;
	}
	public void setWithholdAmount(Double withholdAmount) {
		this.withholdAmount = withholdAmount;
	}
	public Double getInsuranceAmount() {
		return insuranceAmount;
	}
	public void setInsuranceAmount(Double insuranceAmount) {
		this.insuranceAmount = insuranceAmount;
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
	public String getMonthDate() {
		return monthDate;
	}
	public void setMonthDate(String monthDate) {
		this.monthDate = monthDate;
	}
	
	public static void setPropertyMethods(Map<Integer, String> methodsName) {
		methods = methodsName;
	}
	
	@Override
	public void setProperty(String value, int index) throws Exception{
		String methodName = methods.get(index);
		Class clazz = this.getClass();
		Method method = clazz.getDeclaredMethod(methods.get(index), String.class);
		method.invoke(this,new Object[]{value});
	}
	@Override
	public void setProperty(Integer value, int index) throws Exception {
		String methodName = methods.get(index);
		Class clazz = this.getClass();
		Method method = clazz.getDeclaredMethod(methods.get(index), Integer.class);
		method.invoke(this,new Object[]{value});
	}
	@Override
	public void setProperty(Double value, int index) throws Exception {
		String methodName = methods.get(index);
		Class clazz = this.getClass();
		Method method = clazz.getDeclaredMethod(methods.get(index), Double.class);
		method.invoke(this,new Object[]{value});
	}
	@Override
	public String toString() {
		return "SalaryInfoForm [salaryInfoId=" + salaryInfoId + ", userAccount=" + userAccount + ", userName="
				+ userName + ", finalPayAmount=" + finalPayAmount + ", classLevel=" + classLevel + ", dailyWage="
				+ dailyWage + ", monthlyPay=" + monthlyPay + ", days=" + days + ", totalPayAmount=" + totalPayAmount
				+ ", nightShift=" + nightShift + ", nightShiftAmount=" + nightShiftAmount + ", subsidyAmount="
				+ subsidyAmount + ", actualPayAmount=" + actualPayAmount + ", awardAmount=" + awardAmount
				+ ", overtimePayAmount=" + overtimePayAmount + ", communicationAmount=" + communicationAmount
				+ ", otherAmount=" + otherAmount + ", withholdAmount=" + withholdAmount + ", insuranceAmount="
				+ insuranceAmount + ", departmentName=" + departmentName + ", postName=" + postName + ", monthDate="
				+ monthDate + "]";
	}
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getRows() {
		return rows;
	}
	public void setRows(Integer rows) {
		this.rows = rows;
	}
	public String getFinalPayAmountErr() {
		return finalPayAmountErr;
	}
	public void setFinalPayAmountErr(String finalPayAmountErr) {
		this.finalPayAmountErr = finalPayAmountErr;
	}
	public String getTotalPayAmountErr() {
		return totalPayAmountErr;
	}
	public void setTotalPayAmountErr(String totalPayAmountErr) {
		this.totalPayAmountErr = totalPayAmountErr;
	}
	public String getNightShiftAmountErr() {
		return nightShiftAmountErr;
	}
	public void setNightShiftAmountErr(String nightShiftAmountErr) {
		this.nightShiftAmountErr = nightShiftAmountErr;
	}
	public String getActualPayAmountErr() {
		return actualPayAmountErr;
	}
	public void setActualPayAmountErr(String actualPayAmountErr) {
		this.actualPayAmountErr = actualPayAmountErr;
	}
	public String getEnsureFlag() {
		return ensureFlag;
	}
	public void setEnsureFlag(String ensureFlag) {
		this.ensureFlag = ensureFlag;
	}
	public String getYearDate() {
		return yearDate;
	}
	public void setYearDate(String yearDate) {
		this.yearDate = yearDate;
	}
	
	

}
