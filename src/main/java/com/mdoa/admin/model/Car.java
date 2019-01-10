package com.mdoa.admin.model;

import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

public class Car extends BaseModel{

	private String carId;
	private String carNo;
	private String carType;
	private String engineNo;
	private String notes;
	private String factoryModel;
	private String driver;
	private String status;
	private String aliveFlag;
	
	private Date buyInsureTime;
	private String buyInsureTimeStr;
	private Date auditTime;
	private String auditTimeStr;
	private Date buyDate;
	private String buyDateStr;
	public String getCarId() {
		return carId;
	}
	public void setCarId(String carId) {
		this.carId = carId;
	}
	public String getCarNo() {
		return carNo;
	}
	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}
	public String getCarType() {
		return carType;
	}
	public void setCarType(String carType) {
		this.carType = carType;
	}
	public String getEngineNo() {
		return engineNo;
	}
	public void setEngineNo(String engineNo) {
		this.engineNo = engineNo;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public String getFactoryModel() {
		return factoryModel;
	}
	public void setFactoryModel(String factoryModel) {
		this.factoryModel = factoryModel;
	}
	public String getDriver() {
		return driver;
	}
	public void setDriver(String driver) {
		this.driver = driver;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getAliveFlag() {
		return aliveFlag;
	}
	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}
	/**
	 * ========================================================
	 */
	public Date getBuyInsureTime() {
		return buyInsureTime;
	}
	public void setBuyInsureTime(Date buyInsureTime) {
		this.buyInsureTime = buyInsureTime;
		this.buyInsureTimeStr = DateUtil.dateToStr(buyInsureTime,"yyyy-MM-dd");
	}
	public String getBuyInsureTimeStr() {
		return buyInsureTimeStr;
	}
	public void setBuyInsureTimeStr(String buyInsureTimeStr) {
		this.buyInsureTimeStr = buyInsureTimeStr;
		this.buyInsureTime = DateUtil.strToDate(buyInsureTimeStr,"yyyy-MM-dd");
	}
	public Date getAuditTime() {
		return auditTime;
	}
	public void setAuditTime(Date auditTime) {
		this.auditTime = auditTime;
		this.auditTimeStr = DateUtil.dateToStr(auditTime,"yyyy-MM-dd");
	}
	public String getAuditTimeStr() {
		return auditTimeStr;
	}
	public void setAuditTimeStr(String auditTimeStr) {
		this.auditTimeStr = auditTimeStr;
		this.auditTime = DateUtil.strToDate(auditTimeStr,"yyyy-MM-dd");
	}
	public Date getBuyDate() {
		return buyDate;
	}
	public void setBuyDate(Date buyDate) {
		this.buyDate = buyDate;
		this.buyDateStr = DateUtil.dateToStr(buyDate,"yyyy-MM-dd");
	}
	public String getBuyDateStr() {
		return buyDateStr;
	}
	public void setBuyDateStr(String buyDateStr) {
		this.buyDateStr = buyDateStr;
		this.buyDate = DateUtil.strToDate(buyDateStr,"yyyy-MM-dd");
	}
	
	
	
}
