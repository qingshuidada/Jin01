package com.mdoa.admin.model;

import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

public class SuppliesApply extends BaseModel{

	private String applyId;
	private String suppliesId;
	private String suppliesName;
	private Date applyDate;
	private String applyDateStr;
	private String applyNo;
	private Integer useCounts;
	private String proposer;
	private String notes;
	private String approvalStatus;
	private String aliveFlag;
	
	
	public String getSuppliesName() {
		return suppliesName;
	}
	public void setSuppliesName(String suppliesName) {
		this.suppliesName = suppliesName;
	}
	public String getApplyId() {
		return applyId;
	}
	public void setApplyId(String applyId) {
		this.applyId = applyId;
	}
	public String getSuppliesId() {
		return suppliesId;
	}
	public void setSuppliesId(String suppliesId) {
		this.suppliesId = suppliesId;
	}
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
	public String getApplyNo() {
		return applyNo;
	}
	public void setApplyNo(String applyNo) {
		this.applyNo = applyNo;
	}
	public Integer getUseCounts() {
		return useCounts;
	}
	public void setUseCounts(Integer useCounts) {
		this.useCounts = useCounts;
	}
	public String getProposer() {
		return proposer;
	}
	public void setProposer(String proposer) {
		this.proposer = proposer;
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
	
	
	

}
