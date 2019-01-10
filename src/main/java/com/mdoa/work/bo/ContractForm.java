package com.mdoa.work.bo;

import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

/**
 * 企业合同
 * @author Administrator
 *
 */
public class ContractForm extends BaseModel{
	
	private String contractId;//合同id
	private String processRecordId;//流程记录id
	private String contractName;
	private String contractDescribe;
	private String text;//证书信息
	private String attachmentName;//附件名
	private String attachmentUrl;//附件url
	private String orderExecutorId;//跟单人id
	private String orderExecutorName;
	private Date startTime;
	private String startTimeStr;
	private Date endTime;
	private String endTimeStr;
	private String createUserId;//创建人id
	private String createUserName;
	private Date createTime;
	private String createTimeStr;
	private String updateUserId;
	private String updateUserName;
	private Date updateTime;
	private String updateTimeStr;
	private String contractStatus;//合同状态 0未交单 已交单1 关闭2
	private String aliveFlag;//有效标志
	
	private Double noInvoiceAmount;//未开票金额
	private Double invoiceAmount;//开票金额
	private Double unpaidAmount;//未付金额
	private Double spendAmount;//已付金额
	private Double contractAmount;//合同总金额
	private String secondName;//乙方名称
	private String unit;//金额单位
	
	private String payrecordId;//合同支付id
	private Double payAmount;//支付金额
	private String payFlag;//支付方式标志位
	private String remark;//备注
	private String departmentName;//部门名称
	private String contractSort;//合同类别
	public String getContractId() {
		return contractId;
	}
	public void setContractId(String contractId) {
		this.contractId = contractId;
	}
	public String getContractName() {
		return contractName;
	}
	public void setContractName(String contractName) {
		this.contractName = contractName;
	}
	public String getOrderExecutorId() {
		return orderExecutorId;
	}
	public void setOrderExecutorId(String orderExecutorId) {
		this.orderExecutorId = orderExecutorId;
	}
	public String getOrderExecutorName() {
		return orderExecutorName;
	}
	public void setOrderExecutorName(String orderExecutorName) {
		this.orderExecutorName = orderExecutorName;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
		this.startTimeStr = DateUtil.dateToStr(startTime);
	}
	public String getStartTimeStr() {
		return startTimeStr;
	}
	public void setStartTimeStr(String startTimeStr) {
		this.startTimeStr = startTimeStr;
		this.startTime = DateUtil.strToDate(startTimeStr);
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
		this.endTimeStr = DateUtil.dateToStr(endTime);
	}
	public String getEndTimeStr() {
		return endTimeStr;
	}
	public void setEndTimeStr(String endTimeStr) {
		this.endTimeStr = endTimeStr;
		this.endTime = DateUtil.strToDate(endTimeStr);
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
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
		this.createTimeStr = DateUtil.dateToStr(createTime);
	}
	public String getCreateTimeStr() {
		return createTimeStr;
	}
	public void setCreateTimeStr(String createTimeStr) {
		this.createTimeStr = createTimeStr;
		this.createTime = DateUtil.strToDate(createTimeStr);
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
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
		this.updateTimeStr = DateUtil.dateToStr(updateTime);
	}
	public String getUpdateTimeStr() {
		return updateTimeStr;
	}
	public void setUpdateTimeStr(String updateTimeStr) {
		this.updateTimeStr = updateTimeStr;
		this.updateTime = DateUtil.strToDate(updateTimeStr);
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getAliveFlag() {
		return aliveFlag;
	}
	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}
	public String getAttachmentUrl() {
		return attachmentUrl;
	}
	public void setAttachmentUrl(String attachmentUrl) {
		this.attachmentUrl = attachmentUrl;
	}
	public String getContractDescribe() {
		return contractDescribe;
	}
	public void setContractDescribe(String contractDescribe) {
		this.contractDescribe = contractDescribe;
	}
	public String getContractStatus() {
		return contractStatus;
	}
	public void setContractStatus(String contractStatus) {
		this.contractStatus = contractStatus;
	}
	public String getProcessRecordId() {
		return processRecordId;
	}
	public void setProcessRecordId(String processRecordId) {
		this.processRecordId = processRecordId;
	}
	public String getAttachmentName() {
		return attachmentName;
	}
	public void setAttachmentName(String attachmentName) {
		this.attachmentName = attachmentName;
	}

	public Double getNoInvoiceAmount() {
		return noInvoiceAmount;
	}
	public void setNoInvoiceAmount(Double noInvoiceAmount) {
		this.noInvoiceAmount = noInvoiceAmount;
	}
	public Double getInvoiceAmount() {
		return invoiceAmount;
	}
	public void setInvoiceAmount(Double invoiceAmount) {
		this.invoiceAmount = invoiceAmount;
	}
	public Double getUnpaidAmount() {
		return unpaidAmount;
	}
	public void setUnpaidAmount(Double unpaidAmount) {
		this.unpaidAmount = unpaidAmount;
	}
	public Double getSpendAmount() {
		return spendAmount;
	}
	public void setSpendAmount(Double spendAmount) {
		this.spendAmount = spendAmount;
	}
	public Double getContractAmount() {
		return contractAmount;
	}
	public void setContractAmount(Double contractAmount) {
		this.contractAmount = contractAmount;
	}
	public String getSecondName() {
		return secondName;
	}
	public void setSecondName(String secondName) {
		this.secondName = secondName;
	}
	public String getPayrecordId() {
		return payrecordId;
	}
	public void setPayrecordId(String payrecordId) {
		this.payrecordId = payrecordId;
	}
	public Double getPayAmount() {
		return payAmount;
	}
	public void setPayAmount(Double payAmount) {
		this.payAmount = payAmount;
	}
	public String getPayFlag() {
		return payFlag;
	}
	public void setPayFlag(String payFlag) {
		this.payFlag = payFlag;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getContractSort() {
		return contractSort;
	}
	public void setContractSort(String contractSort) {
		this.contractSort = contractSort;
	}
	
	
}
