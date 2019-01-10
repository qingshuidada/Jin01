package com.mdoa.work.model;

import java.util.Date;

import com.mdoa.util.DateUtil;

public class ContractPayRecord {

	private String payrecordId;//合同支付id
	private String contractId;//合同id
	private Double payAmount;//支付金额
	private String payFlag;//支付方式标志位
	private String remark;//备注
	private Date recordTime;//记录时间
	private String recordTimeStr;
	private String aliveFlag;
	public String getPayrecordId() {
		return payrecordId;
	}
	public void setPayrecordId(String payrecordId) {
		this.payrecordId = payrecordId;
	}
	public String getContractId() {
		return contractId;
	}
	public void setContractId(String contractId) {
		this.contractId = contractId;
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
	public Date getRecordTime() {
		return recordTime;
	}
	public void setRecordTime(Date recordTime) {
		this.recordTime = recordTime;
		this.recordTimeStr = DateUtil.dateToStr(recordTime);
	}
	public String getRecordTimeStr() {
		return recordTimeStr;
	}
	public void setRecordTimeStr(String recordTimeStr) {
		this.recordTimeStr = recordTimeStr;
		this.recordTime = DateUtil.strToDate(recordTimeStr);
	}
	public String getAliveFlag() {
		return aliveFlag;
	}
	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}
	
}
