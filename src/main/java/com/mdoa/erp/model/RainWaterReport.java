package com.mdoa.erp.model;

import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

public class RainWaterReport extends BaseModel{
	
	private String rainId;
	private Date   reportDate;
	private String reportDateStr;
	private String reportEndTimeStr;
	private Double phValue;
	private Double codValue;
	private String samplingPoint;
	private String reportName;
	private String text;
	public String getRainId() {
		return rainId;
	}
	public void setRainId(String rainId) {
		this.rainId = rainId;
	}
	public Double getPhValue() {
		return phValue;
	}
	public void setPhValue(Double phValue) {
		this.phValue = phValue;
	}
	public Double getCodValue() {
		return codValue;
	}
	public void setCodValue(Double codValue) {
		this.codValue = codValue;
	}
	public String getSamplingPoint() {
		return samplingPoint;
	}
	public void setSamplingPoint(String samplingPoint) {
		this.samplingPoint = samplingPoint;
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
