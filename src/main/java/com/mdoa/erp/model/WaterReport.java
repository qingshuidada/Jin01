package com.mdoa.erp.model;

import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

public class WaterReport extends BaseModel{

	private String reportId;
	private Date   reportDate;
	private String reportDateStr;
	private String reportEndTimeStr;
	private Double phValue;
	private Double hardness;
	private Double alkalinity;
	private Double chlorineRoot;
	private String reportName;
	private String text;
	private String typeFlag;
	
	public String getReportId() {
		return reportId;
	}
	public void setReportId(String reportId) {
		this.reportId = reportId;
	}
	public Double getPhValue() {
		return phValue;
	}
	public void setPhValue(Double phValue) {
		this.phValue = phValue;
	}
	public Double getHardness() {
		return hardness;
	}
	public void setHardness(Double hardness) {
		this.hardness = hardness;
	}
	public Double getAlkalinity() {
		return alkalinity;
	}
	public void setAlkalinity(Double alkalinity) {
		this.alkalinity = alkalinity;
	}
	public Double getChlorineRoot() {
		return chlorineRoot;
	}
	public void setChlorineRoot(Double chlorineRoot) {
		this.chlorineRoot = chlorineRoot;
	}
	public String getReportName() {
		return reportName;
	}
	public void setReportName(String reportName) {
		this.reportName = reportName;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getTypeFlag() {
		return typeFlag;
	}
	public void setTypeFlag(String typeFlag) {
		this.typeFlag = typeFlag;
	}
	
	
	public Date getReportDate() {
		return reportDate;
	}
	public void setReportDate(Date reportDate) {
		this.reportDate = reportDate;
		this.reportDateStr = DateUtil.dateToStr(reportDate);
	}
	public String getReportDateStr() {
		return reportDateStr;
	}
	public void setReportDateStr(String reportDateStr) {
		this.reportDateStr = reportDateStr;
		this.reportDate = DateUtil.strToDate(reportDateStr);
	}
	public String getReportEndTimeStr() {
		return reportEndTimeStr;
	}
	public void setReportEndTimeStr(String reportEndTimeStr) {
		this.reportEndTimeStr = reportEndTimeStr;
		this.reportDate = DateUtil.strToDate(reportEndTimeStr);
	}
	
	
	
}
