package com.mdoa.erp.bo;

import com.mdoa.base.model.BaseModel;

public class ErpStatisticsForm extends BaseModel{

	//经济指标
	private String economicId;
	private String economicName;
	//车间
	private String workshopId;
	private String workshopName;
	//用户
	private String statisticsUserId;
	//信息
	private String statisticsMessageId;
	private Double count;
	private String dateTime;
	private String submitTime;
	
	private String yourselfFlag;
	private String submitStartTime;
	private String submitEndTime;
	private String dateStartTime;
	private String dateEndTime;
	private String deleteFlag;
	private String createTime;
	private String createUserId;
	private String createUserName;
	private String updateTime;
	private String updateUserId;
	private String updateUserName;
	private String aliveFlag;
	
	private String countRate;//是否计算率 0否1是
	private String outputValue;//是否为产值
	private String ensureFlag;
	private String ecnomicUnit;//经济指标单位
	private String countFlag;//是否计入公司统计
	private String countValue;//是否计入总公司统计
	
	public String getYourselfFlag() {
		return yourselfFlag;
	}
	public void setYourselfFlag(String yourselfFlag) {
		this.yourselfFlag = yourselfFlag;
	}
	public String getSubmitStartTime() {
		return submitStartTime;
	}
	public void setSubmitStartTime(String submitStartTime) {
		this.submitStartTime = submitStartTime;
	}
	public String getSubmitEndTime() {
		return submitEndTime;
	}
	public void setSubmitEndTime(String submitEndTime) {
		this.submitEndTime = submitEndTime;
	}
	public String getDateStartTime() {
		return dateStartTime;
	}
	public void setDateStartTime(String dateStartTime) {
		this.dateStartTime = dateStartTime;
	}
	public String getDateEndTime() {
		return dateEndTime;
	}
	public void setDateEndTime(String dateEndTime) {
		this.dateEndTime = dateEndTime;
	}
	public String getDeleteFlag() {
		return deleteFlag;
	}
	public void setDeleteFlag(String deleteFlag) {
		this.deleteFlag = deleteFlag;
	}
	public String getEconomicId() {
		return economicId;
	}
	public void setEconomicId(String economicId) {
		this.economicId = economicId;
	}
	public String getEconomicName() {
		return economicName;
	}
	public void setEconomicName(String economicName) {
		this.economicName = economicName;
	}
	public String getWorkshopId() {
		return workshopId;
	}
	public void setWorkshopId(String workshopId) {
		this.workshopId = workshopId;
	}
	public String getWorkshopName() {
		return workshopName;
	}
	public void setWorkshopName(String workshopName) {
		this.workshopName = workshopName;
	}
	public String getStatisticsUserId() {
		return statisticsUserId;
	}
	public void setStatisticsUserId(String statisticsUserId) {
		this.statisticsUserId = statisticsUserId;
	}
	public String getStatisticsMessageId() {
		return statisticsMessageId;
	}
	public void setStatisticsMessageId(String statisticsMessageId) {
		this.statisticsMessageId = statisticsMessageId;
	}
	public Double getCount() {
		return count;
	}
	public void setCount(Double count) {
		this.count = count;
	}
	public String getDateTime() {
		return dateTime;
	}
	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}
	public String getSubmitTime() {
		return submitTime;
	}
	public void setSubmitTime(String submitTime) {
		this.submitTime = submitTime;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}
	public String getCreateUserName() {
		return createUserName;
	}
	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public String getUpdateUserId() {
		return updateUserId;
	}
	public void setUpdateUserId(String updateUserId) {
		this.updateUserId = updateUserId;
	}
	public String getUpdateUserName() {
		return updateUserName;
	}
	public void setUpdateUserName(String updateUserName) {
		this.updateUserName = updateUserName;
	}
	public String getAliveFlag() {
		return aliveFlag;
	}
	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}
	public String getCountRate() {
		return countRate;
	}
	public void setCountRate(String countRate) {
		this.countRate = countRate;
	}
	public String getOutputValue() {
		return outputValue;
	}
	public void setOutputValue(String outputValue) {
		this.outputValue = outputValue;
	}
	public String getEnsureFlag() {
		return ensureFlag;
	}
	public void setEnsureFlag(String ensureFlag) {
		this.ensureFlag = ensureFlag;
	}
	public String getEcnomicUnit() {
	    return ecnomicUnit;
	}
	public void setEcnomicUnit(String ecnomicUnit) {
	    this.ecnomicUnit = ecnomicUnit;
	}
	public String getCountFlag() {
	    return countFlag;
	}
	public void setCountFlag(String countFlag) {
	    this.countFlag = countFlag;
	}
	public String getCountValue() {
		return countValue;
	}
	public void setCountValue(String countValue) {
		this.countValue = countValue;
	}
	

}
