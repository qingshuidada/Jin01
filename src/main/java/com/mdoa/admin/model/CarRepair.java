package com.mdoa.admin.model;

import java.math.BigDecimal;
import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

public class CarRepair extends BaseModel{
	
	private String repairId;
	private String carId;
	private String reason;
	private String executant;
	private String notes;
	private String repairType;
	private BigDecimal fee;
	private String aliveFlag;
	private String carNo;
	private Date   repairDate;
	private String repairDateStr;
	
	
	public String getCarNo() {
		return carNo;
	}
	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}
	public String getRepairId() {
		return repairId;
	}
	public void setRepairId(String repairId) {
		this.repairId = repairId;
	}
	public String getCarId() {
		return carId;
	}
	public void setCarId(String carId) {
		this.carId = carId;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getExecutant() {
		return executant;
	}
	public void setExecutant(String executant) {
		this.executant = executant;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public String getRepairType() {
		return repairType;
	}
	public void setRepairType(String repairType) {
		this.repairType = repairType;
	}
	public BigDecimal getFee() {
		return fee;
	}
	public void setFee(BigDecimal fee) {
		this.fee = fee;
	}
	public String getAliveFlag() {
		return aliveFlag;
	}
	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}
	public Date getRepairDate() {
		return repairDate;
	}
	public void setRepairDate(Date repairDate) {
		this.repairDate = repairDate;
		this.repairDateStr = DateUtil.dateToStr(repairDate,"yyyy-MM-dd");
	}
	public String getRepairDateStr() {
		return repairDateStr;
	}
	public void setRepairDateStr(String repairDateStr) {
		this.repairDateStr = repairDateStr;
		this.repairDate = DateUtil.strToDate(repairDateStr,"yyyy-MM-dd");
	}
	
	
}
