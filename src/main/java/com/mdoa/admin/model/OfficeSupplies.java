package com.mdoa.admin.model;

import com.mdoa.base.model.BaseModel;

public class OfficeSupplies extends BaseModel{

	private String suppliesId;
	private String suppliesTypeId;
	private String suppliesTypeName;
	private String suppliesTypeUrl;
	private String suppliesName;
	private String suppliesNo;
	private String specifications;
	private String unit;
	private String isWarning;
	private String notes;
	private Integer stockCounts;
	private Integer warnCounts;
	private String aliveFlag;
	
	
	
	public String getSuppliesTypeName() {
		return suppliesTypeName;
	}
	public void setSuppliesTypeName(String suppliesTypeName) {
		this.suppliesTypeName = suppliesTypeName;
	}
	public String getSuppliesId() {
		return suppliesId;
	}
	public void setSuppliesId(String suppliesId) {
		this.suppliesId = suppliesId;
	}
	public String getSuppliesTypeId() {
		return suppliesTypeId;
	}
	public void setSuppliesTypeId(String suppliesTypeId) {
		this.suppliesTypeId = suppliesTypeId;
	}
	public String getSuppliesTypeUrl() {
		return suppliesTypeUrl;
	}
	public void setSuppliesTypeUrl(String suppliesTypeUrl) {
		this.suppliesTypeUrl = suppliesTypeUrl;
	}
	public String getSuppliesName() {
		return suppliesName;
	}
	public void setSuppliesName(String suppliesName) {
		this.suppliesName = suppliesName;
	}
	public String getSuppliesNo() {
		return suppliesNo;
	}
	public void setSuppliesNo(String suppliesNo) {
		this.suppliesNo = suppliesNo;
	}
	public String getSpecifications() {
		return specifications;
	}
	public void setSpecifications(String specifications) {
		this.specifications = specifications;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getIsWarning() {
		return isWarning;
	}
	public void setIsWarning(String isWarning) {
		this.isWarning = isWarning;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public Integer getStockCounts() {
		return stockCounts;
	}
	public void setStockCounts(Integer stockCounts) {
		this.stockCounts = stockCounts;
	}
	public Integer getWarnCounts() {
		return warnCounts;
	}
	public void setWarnCounts(Integer warnCounts) {
		this.warnCounts = warnCounts;
	}
	public String getAliveFlag() {
		return aliveFlag;
	}
	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}

	
}
