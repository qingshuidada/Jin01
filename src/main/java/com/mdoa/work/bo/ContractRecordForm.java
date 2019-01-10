package com.mdoa.work.bo;

import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

public class ContractRecordForm extends BaseModel{
	
	private String recordId;//记录id
	private String contractId;//合同id
	private String orderExecutorId;//跟单人id
	private String content;//记录内容
	private Date recordTime;//记录时间
	private String recordTimeStr;

	public String getRecordId() {
		return recordId;
	}
	public void setRecordId(String recordId) {
		this.recordId = recordId;
	}
	public String getContractId() {
		return contractId;
	}
	public void setContractId(String contractId) {
		this.contractId = contractId;
	}
	public String getOrderExecutorId() {
		return orderExecutorId;
	}
	public void setOrderExecutorId(String orderExecutorId) {
		this.orderExecutorId = orderExecutorId;
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
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}

}
