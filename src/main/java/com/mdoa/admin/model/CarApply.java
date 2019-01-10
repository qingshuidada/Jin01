package com.mdoa.admin.model;

import java.math.BigDecimal;
import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

public class CarApply extends BaseModel{

	private String applyId;
	private String carId;
	private String department;
	private String userFullName;
	private String reason;
	private String proposer;
	private BigDecimal mileage;
	private BigDecimal oilUse;
	private String notes;
	private String approvalStatus;
	private String aliveFlag;
    private String carNo;
	private Date applyDate;
	private String applyDateStr;
	private Date startTime;
	private String startTimeStr;
	private Date endTime;
	private String endTimeStr;
	
	public String getCarNo() {
		return carNo;
	}
	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}
	public String getApplyId() {
		return applyId;
	}
	public void setApplyId(String applyId) {
		this.applyId = applyId;
	}
	public String getCarId() {
		return carId;
	}
	public void setCarId(String carId) {
		this.carId = carId;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getUserFullName() {
		return userFullName;
	}
	public void setUserFullName(String userFullName) {
		this.userFullName = userFullName;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getProposer() {
		return proposer;
	}
	public void setProposer(String proposer) {
		this.proposer = proposer;
	}
	public BigDecimal getMileage() {
		return mileage;
	}
	public void setMileage(BigDecimal mileage) {
		this.mileage = mileage;
	}
	public BigDecimal getOilUse() {
		return oilUse;
	}
	public void setOilUse(BigDecimal oilUse) {
		this.oilUse = oilUse;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public String getApprovalStatus() {
		return approvalStatus;
	}
	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}
	public String getAliveFlag() {
		return aliveFlag;
	}
	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}
	/**
	 * ==========================================================
	 */
	public Date getApplyDate() {
		return applyDate;
	}
	public void setApplyDate(Date applyDate) {
		this.applyDate = applyDate;
		this.applyDateStr = DateUtil.dateToStr(applyDate,"yyyy-MM-dd");
	}
	public String getApplyDateStr() {
		return applyDateStr;
	}
	public void setApplyDateStr(String applyDateStr) {
		this.applyDateStr = applyDateStr;
		this.applyDate = DateUtil.strToDate(applyDateStr,"yyyy-MM-dd");
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
		this.startTime = DateUtil.strToDate(startTimeStr,"yyyy-MM-dd");
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
		this.endTimeStr = DateUtil.dateToStr(endTime,"yyyy-MM-dd");
	}
	public String getEndTimeStr() {
		return endTimeStr;
	}
	public void setEndTimeStr(String endTimeStr) {
		this.endTimeStr = endTimeStr;
		this.endTime = DateUtil.strToDate(endTimeStr,"yyyy-MM-dd");
	}
	
	
	
}
